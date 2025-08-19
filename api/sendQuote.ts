// sendQuote_enhanced.ts — Enhanced Professional Quote Modal Handler with Modern Email Templates
// Integrated with Wall Shop branding, multilingual support, and modular email components

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// Import our new email template system
import { 
  generateWallShopEmailTemplate,
  getThemeVariants,
  getDefaultBrandConfig,
  type EmailTemplateOptions,
  type BrandConfig,
  type CTALinks
} from './emailTemplate.js';

import {
  generateModularEmail,
  EmailComponentBuilder,
  EXTENDED_THEME_VARIANTS,
  applyThemeToBrandConfig
} from './modularComponents.js';

/* =========================
   CORS / SECURITY / LIMITS
   ========================= */
const ALLOWED_ORIGINS = [
  "https://thewallshop.co.uk",
  "https://www.thewallshop.co.uk",
  "https://staging.thewallshop.co.uk",
  "http://localhost:5173",
  "http://localhost:3000",
];

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 2;   // testing-protective
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/* ===============
   DOMAIN MODELS
   =============== */
enum ModalQuotePriority {
  STANDARD = "standard",
  URGENT = "urgent",
  PREMIUM = "premium",
}

export interface QuoteModalData {
  fullName: string;
  email: string;
  phone: string;
  installationAddress?: string;
  additionalNotes?: string;

  entryPoint: "home" | "smart-walls" | "smart-devices" | "wall-panels" | "carbon-rock-boards";
  productCategory?: string;

  smartWalls?: any;
  smartDevices?: any;
  wallPanels?: any;
  carbonRockBoards?: any;

  clientMeta?: {
    urlPath?: string;
    userAgent?: string;
    submittedAt?: string;
  };
}

interface ValidationResult {
  isValid: boolean;
  data?: QuoteModalData;
  errors?: Record<string, string>;
}

export interface QuoteModalAnalysis {
  priority: ModalQuotePriority;
  estimatedValue: number;
  productCount: number;
  complexity: string;
  specialRequirements: string[];
}

interface EmailContent {
  adminHtml: string;
  adminText: string;
  customerHtml: string;
  customerText: string;
}

interface EmailResults {
  success: boolean;
  error?: string;
  quoteId: string;
  emailIds?: {
    admin?: string;
    customer?: string;
  };
}

/* ===============================
   ENHANCED EMAIL CONFIGURATION
   =============================== */

// Enhanced brand configuration with Wall Shop specifics
const WALL_SHOP_BRAND_CONFIG: BrandConfig = {
  primaryColor: '#2C3E50', // Deep navy/charcoal from website analysis
  accentColor: '#E67E22',  // Vibrant orange/gold from website analysis
  neutralBg: '#F8F9FA',    // Light grey
  textColor: '#2C3E50',    // Dark text for light backgrounds
  logoUrl: '{{logoUrl}}',  // Placeholder for logo
  companyName: 'The Wall Shop',
  tagline: 'Elevate your walls with style',
  website: 'https://thewallshop.co.uk',
  address: 'SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK',
  phone: '+44 141 739 3377',
  email: 'info@thewallshop.co.uk',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/thewallshop',
    instagram: 'https://instagram.com/thewallshop',
    website: 'https://thewallshop.co.uk'
  }
};

// Enhanced CTA links with actual Wall Shop URLs
const WALL_SHOP_CTA_LINKS: CTALinks = {
  viewLink: '{{viewLink}}', // Dynamic placeholder - will be populated with actual quote URL
  pdfLink: '{{pdfLink}}', // Dynamic placeholder - will be populated with PDF download URL
  approveLink: '{{approveLink}}', // Dynamic placeholder - will be populated with approval URL
  requestChangesLink: '{{requestChangesLink}}', // Dynamic placeholder - will be populated with changes URL
  requestCallbackLink: 'https://thewallshop.co.uk/contact', // Actual contact page
  forwardLink: '{{forwardLink}}', // Dynamic placeholder - internal forwarding
  scheduleConsultationLink: 'https://thewallshop.co.uk/contact', // Actual contact page for scheduling
  exploreSmartWallsLink: 'https://thewallshop.co.uk/smart-walls', // Actual smart walls page
  contactLink: 'https://thewallshop.co.uk/contact' // Actual contact page
};

/* ==============
   MAIN HANDLER
   ============== */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = String(req.headers.origin || "");
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
  
  // Enhanced Security Headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Content-Security-Policy", "default-src 'none'; img-src data: https:; style-src 'unsafe-inline'");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "This endpoint only accepts POST requests for quote modal submissions.",
      allowedMethods: ["POST", "OPTIONS"],
    });
  }

  try {
    // Rate limit
    const clientIP = getClientIP(req);
    const rl = checkRateLimit(clientIP);
    if (!rl.allowed) {
      return res.status(429).json({
        error: "Rate Limit Exceeded",
        message: "Too many quote submissions. Please wait before submitting another request.",
        retryAfter: Math.ceil(rl.resetTime / 1000),
        details: {
          limit: RATE_LIMIT_MAX_REQUESTS,
          window: RATE_LIMIT_WINDOW / 1000,
          remaining: 0,
          resetTime: new Date(rl.resetTime).toISOString(),
        },
      });
    }

    // Environment check
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return res.status(500).json({
        error: "Service Configuration Error",
        message: "Quote submission service is temporarily unavailable. Please try again later or contact us directly.",
        contact: { phone: "+44 141 739 3377", email: "quotes@thewallshop.co.uk" },
      });
    }

    // Parse and validate
    const body = await parseRequestBody(req);
    const validation = validateQuoteModalData(body);
    if (!validation.isValid || !validation.data) {
      return res.status(400).json({
        error: "Quote Modal Validation Failed",
        message: "Please review and correct the highlighted fields before resubmitting your quote.",
        fields: validation.errors || {},
        timestamp: new Date().toISOString(),
      });
    }

    const data = validation.data;
    const analysis = analyzeQuoteModal(data);
    
    // Generate enhanced email content using our new template system
    const content = generateQuoteModalEmailContent(data, analysis, {
      theme: body.emailTheme || 'default', // Allow theme selection from request
      language: body.language || 'en', // Allow language selection from request
      variant: 'external', // Customer-facing email
      trackingPixel: generateTrackingPixelUrl(data, analysis)
    });

    // Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send enhanced emails
    const emailResults = await sendQuoteModalEmails(resend, data, content, analysis);
    if (!emailResults.success) throw new Error(emailResults.error || "Failed to process quote modal submission");

    // Enhanced SUCCESS response
    return res.status(200).json({
      success: true,
      message: "Quote request submitted successfully! Our team will prepare your personalized proposal.",
      referenceId: emailResults.quoteId,
      quoteId: emailResults.quoteId,
      details: {
        quoteId: emailResults.quoteId,
        submittedAt: new Date().toISOString(),
        priority: analysis.priority,
        estimatedValue: analysis.estimatedValue,
        estimatedResponse: getModalResponseTimeEstimate(analysis.priority),
        availableThemes: EXTENDED_THEME_VARIANTS.map(t => ({ name: t.name, description: t.description })),
        nextSteps: [
          "Immediate technical review and feasibility assessment",
          "Detailed cost analysis with material specifications",
          "Custom proposal preparation with visual mockups",
          "Priority consultation with our design specialists",
        ],
        contact: {
          phone: "+44 141 739 3377",
          email: "info@thewallshop.co.uk",
          hours: "Monday - Friday, 9:00 AM - 6:00 PM GMT",
          emergency: "stephen@thewallshop.co.uk",
        },
        links: {
          exploreSmartWalls: WALL_SHOP_CTA_LINKS.exploreSmartWallsLink,
          scheduleConsultation: WALL_SHOP_CTA_LINKS.scheduleConsultationLink,
          contact: WALL_SHOP_CTA_LINKS.contactLink
        }
      },
      tracking: {
        emailIds: emailResults.emailIds,
        referenceId: emailResults.quoteId,
        trackingEnabled: true
      },
    });
  } catch (error) {
    console.error("Quote Modal Submission Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      userAgent: req.headers["user-agent"],
      origin: req.headers.origin,
      ip: getClientIP(req),
    });

    return res.status(500).json({
      error: "Quote Modal Processing Error",
      message:
        "We're experiencing technical difficulties processing your quote request. Please try again or contact us directly.",
      details: {
        timestamp: new Date().toISOString(),
        supportContact: {
          phone: "+44 141 739 3377",
          email: "support@thewallshop.co.uk",
          emergencyEmail: "stephen@thewallshop.co.uk",
        },
        alternativeOptions: [
          "Call us directly for immediate assistance",
          "Email your requirements to stephen@thewallshop.co.uk",
          "Use our comprehensive quote form on the website",
          "Schedule a consultation via our contact page",
        ],
      },
    });
  }
}

/* ===============================
   ENHANCED EMAIL GENERATION
   =============================== */

/**
 * Generate enhanced email content using the new template system
 */
function generateQuoteModalEmailContent(
  data: QuoteModalData,
  analysis: QuoteModalAnalysis,
  options: {
    theme?: string;
    language?: 'en' | 'fr' | 'es' | 'ar' | 'ur';
    variant?: 'external' | 'internal';
    trackingPixel?: string;
  } = {}
): EmailContent {
  const { theme = 'default', language = 'en', variant = 'external', trackingPixel } = options;

  // Generate customer email using new template system
  const customerEmailOptions: EmailTemplateOptions = {
    variant: 'external',
    theme,
    language,
    brandConfig: WALL_SHOP_BRAND_CONFIG,
    ctaLinks: WALL_SHOP_CTA_LINKS,
    trackingPixel
  };

  const customerEmail = generateWallShopEmailTemplate(data, analysis, customerEmailOptions);

  // Generate admin email using modular system
  const adminEmailOptions: EmailTemplateOptions = {
    variant: 'internal',
    theme: 'default', // Always use default theme for internal emails
    language: 'en', // Always use English for internal emails
    brandConfig: WALL_SHOP_BRAND_CONFIG,
    ctaLinks: WALL_SHOP_CTA_LINKS
  };

  const adminEmail = generateWallShopEmailTemplate(data, analysis, adminEmailOptions);

  return {
    customerHtml: customerEmail.html,
    customerText: customerEmail.text,
    adminHtml: adminEmail.html,
    adminText: adminEmail.text
  };
}

/**
 * Generate tracking pixel URL with analytics data
 */
function generateTrackingPixelUrl(data: QuoteModalData, analysis: QuoteModalAnalysis): string {
  const baseUrl = 'https://analytics.thewallshop.co.uk/pixel.gif';
  const params = new URLSearchParams({
    event: 'quote_email_opened',
    customer: data.email,
    priority: analysis.priority,
    value: analysis.estimatedValue.toString(),
    entry_point: data.entryPoint,
    timestamp: Date.now().toString()
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Send enhanced emails using the Resend API
 */
async function sendQuoteModalEmails(
  resend: Resend,
  data: QuoteModalData,
  content: EmailContent,
  analysis: QuoteModalAnalysis
): Promise<EmailResults> {
  const quoteId = generateQuoteModalId();

  try {
    const [adminResult, customerResult] = await Promise.allSettled([
      // Admin email with enhanced subject and headers
      resend.emails.send({
        from: "The Wall Shop Quotes <quotes@thewallshop.co.uk>",
        to: ["stephen@thewallshop.co.uk"],
        subject: `[${analysis.priority.toUpperCase()}] New Quote Request — £${analysis.estimatedValue.toLocaleString()} — ${data.fullName} [${quoteId}]`,
        html: content.adminHtml,
        text: content.adminText,
        headers: {
          "X-Quote-ID": quoteId,
          "X-Entry-Point": data.entryPoint,
          "X-Priority": analysis.priority,
          "X-Customer-Email": data.email,
          "X-Estimated-Value": analysis.estimatedValue.toString(),
          "X-Wall-Shop-System": "enhanced-v2"
        },
        tags: [
          { name: "type", value: "quote-admin" },
          { name: "priority", value: analysis.priority },
          { name: "entry-point", value: data.entryPoint }
        ]
      }),
      // Customer email with enhanced subject and headers
      resend.emails.send({
        from: "The Wall Shop <quotes@thewallshop.co.uk>",
        to: [data.email],
        subject: `Your Quote Request Received — ${quoteId} | The Wall Shop`,
        html: content.customerHtml,
        text: content.customerText,
        headers: {
          "X-Quote-ID": quoteId,
          "X-Entry-Point": data.entryPoint,
          "X-Wall-Shop-System": "enhanced-v2"
        },
        tags: [
          { name: "type", value: "quote-customer" },
          { name: "priority", value: analysis.priority },
          { name: "entry-point", value: data.entryPoint }
        ]
      }),
    ]);

    const adminSuccess = adminResult.status === "fulfilled" && !(adminResult as any).value?.error;
    const customerSuccess = customerResult.status === "fulfilled" && !(customerResult as any).value?.error;

    if (!adminSuccess && !customerSuccess) {
      throw new Error("Failed to send both emails");
    }

    return {
      success: true,
      quoteId,
      emailIds: {
        admin: adminSuccess ? (adminResult as any).value?.data?.id : undefined,
        customer: customerSuccess ? (customerResult as any).value?.data?.id : undefined,
      },
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      quoteId,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}

/* =========================
   UTILITIES / VALIDATION
   (Keeping existing functions but with enhanced error handling)
   ========================= */

function getClientIP(req: VercelRequest): string {
  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string") return cf.trim();
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  const real = req.headers["x-real-ip"];
  if (typeof real === "string") return real.trim();
  // @ts-ignore - Node adapter
  return req.connection?.remoteAddress || "unknown";
}

function checkRateLimit(clientIP: string): { allowed: boolean; resetTime: number } {
  const now = Date.now();
  const rec = rateLimitMap.get(clientIP);
  if (!rec || now > rec.resetTime) {
    const resetTime = now + RATE_LIMIT_WINDOW;
    rateLimitMap.set(clientIP, { count: 1, resetTime });
    return { allowed: true, resetTime };
  }
  if (rec.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: rec.resetTime };
  }
  rec.count++;
  rateLimitMap.set(clientIP, rec);
  return { allowed: true, resetTime: rec.resetTime };
}

async function parseRequestBody(req: VercelRequest): Promise<any> {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      throw new Error("Invalid JSON format in request body");
    }
  }
  return req.body || {};
}

function sanitizeString(value: any): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>'"&]/g, (m) => {
      const map: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
      };
      return map[m] || m;
    })
    .substring(0, 5000)
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex =
    /^(?:\+44|0)(?:\d{10}|\d{3}\s?\d{3}\s?\d{4}|\d{4}\s?\d{6}|\d{2}\s?\d{4}\s?\d{4})$|^(?:\+\d{1,3})?[\s\-\(\)]?[\d\s\-\(\)]{7,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

function validateQuoteModalData(body: any): ValidationResult {
  const errors: Record<string, string> = {};
  const fullName = sanitizeString(body?.fullName || "");
  const email = sanitizeString(body?.email || "").toLowerCase();
  const phone = sanitizeString(body?.phone || "");
  const installationAddress = sanitizeString(body?.installationAddress || "");
  const additionalNotes = sanitizeString(body?.additionalNotes || "");
  const entryPoint = body?.entryPoint || "home";
  const productCategory = sanitizeString(body?.productCategory || "");

  if (!fullName) errors.fullName = "Full name is required for quote processing";
  else if (fullName.length < 2) errors.fullName = "Name must be at least 2 characters long";
  else if (fullName.length > 100) errors.fullName = "Name must be less than 100 characters";
  else if (!/^[a-zA-Z\s\-'\.]+$/.test(fullName)) errors.fullName = "Name contains invalid characters";

  if (!email) errors.email = "Email address is required for quote delivery";
  else if (!isValidEmail(email)) errors.email = "Please enter a valid email address";
  else if (email.length > 254) errors.email = "Email address is too long";

  if (!phone) errors.phone = "Phone number is required for project consultation";
  else if (!isValidPhone(phone)) errors.phone = "Please enter a valid UK or international phone number";

  const validEntryPoints = ["home", "smart-walls", "smart-devices", "wall-panels", "carbon-rock-boards"];
  if (!validEntryPoints.includes(entryPoint)) errors.entryPoint = "Invalid entry point";

  if (Object.keys(errors).length) return { isValid: false, errors };

  return {
    isValid: true,
    data: {
      fullName,
      email,
      phone,
      installationAddress: installationAddress || undefined,
      additionalNotes: additionalNotes || undefined,
      entryPoint,
      productCategory: productCategory || undefined,
      smartWalls: body?.smartWalls || null,
      smartDevices: body?.smartDevices || null,
      wallPanels: body?.wallPanels || null,
      carbonRockBoards: body?.carbonRockBoards || null,
      clientMeta: body?.clientMeta || {},
    },
  };
}

function analyzeQuoteModal(data: QuoteModalData): QuoteModalAnalysis {
  let priority: ModalQuotePriority = ModalQuotePriority.STANDARD;
  let complexity = "Standard";
  const specialRequirements: string[] = [];
  let estimatedValue = 5000; // base
  let productCount = 0;

  if (data.smartWalls) {
    productCount++;
    estimatedValue += 15000;
    specialRequirements.push("Smart wall integration");
  }
  if (data.smartDevices) {
    productCount++;
    estimatedValue += 8000;
    specialRequirements.push("Smart device installation");
  }
  if (data.wallPanels) {
    productCount++;
    estimatedValue += 5000;
    specialRequirements.push("Wall panel installation");
  }
  if (data.carbonRockBoards) {
    productCount++;
    estimatedValue += 10000;
    specialRequirements.push("Carbon rock board installation");
  }

  if (estimatedValue > 30000) {
    priority = ModalQuotePriority.PREMIUM;
    complexity = "Premium";
  } else if (productCount > 2) {
    priority = ModalQuotePriority.URGENT;
    complexity = "Complex";
  }

  return { priority, estimatedValue, productCount, complexity, specialRequirements };
}

function getModalResponseTimeEstimate(priority: ModalQuotePriority): string {
  switch (priority) {
    case ModalQuotePriority.PREMIUM:
      return "Within 2 business hours with dedicated project manager";
    case ModalQuotePriority.URGENT:
      return "Within 4 business hours";
    case ModalQuotePriority.STANDARD:
    default:
      return "Within 12 business hours";
  }
}

function generateQuoteModalId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `QTM-${timestamp}-${random}`.toUpperCase();
}

// Export types for external use
export { ModalQuotePriority, WALL_SHOP_BRAND_CONFIG, WALL_SHOP_CTA_LINKS, EXTENDED_THEME_VARIANTS };

