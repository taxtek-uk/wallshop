// api/sendQuote.ts - Enhanced Professional Quote Modal Handler
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// Comprehensive CORS and security configuration
const ALLOWED_ORIGINS = [
  "https://thewallshop.co.uk",
  "https://www.thewallshop.co.uk",
  "https://staging.thewallshop.co.uk",
  "http://localhost:5173", // Vite development
  "http://localhost:3000", // Alternative development port
];

// Enhanced rate limiting for quote modal submissions
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 2; // Very restrictive for quote modals
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Quote modal priority levels
enum ModalQuotePriority {
  STANDARD = 'standard',
  URGENT = 'urgent',
  PREMIUM = 'premium'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enhanced CORS and security headers
  const origin = String(req.headers.origin || "");
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);
  
  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
  
  // Enhanced security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Content-Security-Policy", "default-src 'none'; img-src data: https:; style-src 'unsafe-inline'");
  
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ 
      error: "Method Not Allowed",
      message: "This endpoint only accepts POST requests for quote modal submissions.",
      allowedMethods: ["POST", "OPTIONS"]
    });
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    // Enhanced rate limiting
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        error: "Rate Limit Exceeded",
        message: "Too many quote submissions. Please wait before submitting another request.",
        retryAfter: Math.ceil(rateLimitResult.resetTime / 1000),
        details: {
          limit: RATE_LIMIT_MAX_REQUESTS,
          window: RATE_LIMIT_WINDOW / 1000,
          remaining: 0,
          resetTime: new Date(rateLimitResult.resetTime).toISOString()
        }
      });
    }

    // Environment validation
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return res.status(500).json({
        error: "Service Configuration Error",
        message: "Quote submission service is temporarily unavailable. Please try again later or contact us directly.",
        contact: {
          phone: "+44 141 739 3377",
          email: "quotes@thewallshop.co.uk"
        }
      });
    }

    // Enhanced request parsing and validation
    const body = await parseRequestBody(req);
    const validationResult = validateQuoteModalData(body);
    
    if (!validationResult.isValid) {
      return res.status(400).json({
        error: "Quote Modal Validation Failed",
        message: "Please review and correct the highlighted fields before resubmitting your quote.",
        fields: validationResult.errors,
        timestamp: new Date().toISOString()
      });
    }

    const quoteModalData = validationResult.data!;
    
    // Analyze quote complexity and priority
    const quoteAnalysis = analyzeQuoteModal(quoteModalData);
    
    // Generate comprehensive email content
    const emailContent = generateQuoteModalEmailContent(quoteModalData, quoteAnalysis);
    
    // Initialize Resend with enhanced error handling
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Send quote modal emails with comprehensive tracking
    const emailResults = await sendQuoteModalEmails(resend, quoteModalData, emailContent, quoteAnalysis);
    
    if (!emailResults.success) {
      throw new Error(emailResults.error || "Failed to process quote modal submission");
    }

    // Enhanced success response with detailed information
    return res.status(200).json({
      success: true,
      message: "Quote request submitted successfully! Our team will prepare your personalized proposal.",
      details: {
        quoteId: emailResults.quoteId,
        submittedAt: new Date().toISOString(),
        priority: quoteAnalysis.priority,
        estimatedValue: quoteAnalysis.estimatedValue,
        estimatedResponse: getModalResponseTimeEstimate(quoteAnalysis.priority),
        nextSteps: [
          "Immediate technical review and feasibility assessment",
          "Detailed cost analysis with material specifications", 
          "Custom proposal preparation with visual mockups",
          "Priority consultation with our design specialists"
        ],
        contact: {
          phone: "+44 141 739 3377",
          email: "quotes@thewallshop.co.uk",
          hours: "Monday - Friday, 9:00 AM - 6:00 PM GMT",
          emergency: "urgent@thewallshop.co.uk"
        }
      },
      tracking: {
        emailIds: emailResults.emailIds,
        referenceId: emailResults.quoteId
      }
    });

  } catch (error) {
    // Comprehensive error logging with context
    console.error("Quote Modal Submission Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      userAgent: req.headers["user-agent"],
      origin: req.headers.origin,
      ip: getClientIP(req)
    });

    return res.status(500).json({
      error: "Quote Modal Processing Error",
      message: "We're experiencing technical difficulties processing your quote request. Please try again or contact us directly.",
      details: {
        timestamp: new Date().toISOString(),
        supportContact: {
          phone: "+44 141 739 3377",
          email: "support@thewallshop.co.uk",
          emergencyEmail: "urgent@thewallshop.co.uk"
        },
        alternativeOptions: [
          "Call us directly for immediate assistance",
          "Email your requirements to quotes@thewallshop.co.uk",
          "Use our comprehensive quote form on the website",
          "Schedule a consultation via our contact page"
        ]
      }
    });
  }
}

// Enhanced utility functions

function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const realIP = req.headers["x-real-ip"];
  const cfConnectingIP = req.headers["cf-connecting-ip"];
  
  if (typeof cfConnectingIP === "string") {
    return cfConnectingIP.trim();
  }
  
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  
  if (typeof realIP === "string") {
    return realIP.trim();
  }
  
  return req.connection?.remoteAddress || "unknown";
}

function checkRateLimit(clientIP: string): { allowed: boolean; resetTime: number } {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(clientIP);
  
  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitMap.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, resetTime: now + RATE_LIMIT_WINDOW };
  }
  
  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: rateLimitData.resetTime };
  }
  
  rateLimitData.count++;
  rateLimitMap.set(clientIP, rateLimitData);
  
  return { allowed: true, resetTime: rateLimitData.resetTime };
}

async function parseRequestBody(req: VercelRequest): Promise<any> {
  try {
    if (typeof req.body === "string") {
      return JSON.parse(req.body);
    }
    return req.body || {};
  } catch (error) {
    throw new Error("Invalid JSON format in request body");
  }
}

interface QuoteModalData {
  // Contact information
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  
  // Project basics
  projectType: string;
  budget: string;
  timeline: string;
  
  // Quote modal specific data
  selectedProducts: string[];
  totalEstimate: number;
  urgency?: string;
  additionalRequirements?: string;
  consultationPreference?: string;
  
  // Source tracking
  source?: string;
  referralCode?: string;
  newsletter?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  data?: QuoteModalData;
  errors?: Record<string, string>;
}

interface QuoteModalAnalysis {
  priority: ModalQuotePriority;
  estimatedValue: number;
  productCount: number;
  complexity: string;
  specialRequirements: string[];
}

function validateQuoteModalData(body: any): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Enhanced validation with comprehensive checks
  const fullName = sanitizeString(body?.fullName || body?.name || "").trim();
  const email = sanitizeString(body?.email || "").trim().toLowerCase();
  const phone = sanitizeString(body?.phone || "").trim();
  const company = sanitizeString(body?.company || "").trim();
  const projectType = sanitizeString(body?.projectType || "").trim();
  const budget = sanitizeString(body?.budget || "").trim();
  const timeline = sanitizeString(body?.timeline || "").trim();
  const urgency = sanitizeString(body?.urgency || "").trim();
  const additionalRequirements = sanitizeString(body?.additionalRequirements || "").trim();
  const consultationPreference = sanitizeString(body?.consultationPreference || "").trim();
  const source = sanitizeString(body?.source || "").trim();
  const referralCode = sanitizeString(body?.referralCode || "").trim();
  const newsletter = Boolean(body?.newsletter);

  // Parse selected products and total estimate
  const selectedProducts = Array.isArray(body?.selectedProducts) ? 
    body.selectedProducts.map((p: any) => sanitizeString(String(p)).trim()).filter(Boolean) : [];
  const totalEstimate = parseFloat(String(body?.totalEstimate || 0)) || 0;

  // Enhanced validation rules
  if (!fullName) {
    errors.fullName = "Full name is required for quote processing";
  } else if (fullName.length < 2) {
    errors.fullName = "Name must be at least 2 characters long";
  } else if (fullName.length > 100) {
    errors.fullName = "Name must be less than 100 characters";
  } else if (!/^[a-zA-Z\s\-'\.]+$/.test(fullName)) {
    errors.fullName = "Name contains invalid characters";
  }

  if (!email) {
    errors.email = "Email address is required for quote delivery";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address";
  } else if (email.length > 254) {
    errors.email = "Email address is too long";
  }

  if (!phone) {
    errors.phone = "Phone number is required for project consultation";
  } else if (!isValidPhone(phone)) {
    errors.phone = "Please enter a valid UK or international phone number";
  }

  if (!projectType) {
    errors.projectType = "Project type is required for accurate quoting";
  }

  if (!budget) {
    errors.budget = "Budget range is required for proposal preparation";
  }

  if (!timeline) {
    errors.timeline = "Project timeline is required for scheduling";
  }

  // Validate selected products
  if (selectedProducts.length === 0) {
    errors.selectedProducts = "Please select at least one product for your quote";
  }

  // Validate total estimate
  if (totalEstimate <= 0) {
    errors.totalEstimate = "Invalid total estimate value";
  } else if (totalEstimate > 1000000) {
    errors.totalEstimate = "Total estimate exceeds maximum allowed value";
  }

  // Company validation (optional but enhanced)
  if (company && company.length > 100) {
    errors.company = "Company name must be less than 100 characters";
  }

  // Additional requirements validation
  if (additionalRequirements && additionalRequirements.length > 1000) {
    errors.additionalRequirements = "Additional requirements must be less than 1000 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    data: {
      fullName,
      email,
      phone,
      company: company || undefined,
      projectType,
      budget,
      timeline,
      selectedProducts,
      totalEstimate,
      urgency: urgency || undefined,
      additionalRequirements: additionalRequirements || undefined,
      consultationPreference: consultationPreference || undefined,
      source: source || undefined,
      referralCode: referralCode || undefined,
      newsletter
    }
  };
}

function sanitizeString(value: any): string {
  if (typeof value !== "string") return "";
  
  return value
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>'"&]/g, (match) => {
      const escapeMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return escapeMap[match] || match;
    })
    .substring(0, 5000);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  // Enhanced phone validation for UK and international numbers
  const phoneRegex = /^(?:\+44|0)(?:\d{10}|\d{3}\s?\d{3}\s?\d{4}|\d{4}\s?\d{6}|\d{2}\s?\d{4}\s?\d{4})$|^(?:\+\d{1,3})?[\s\-\(\)]?[\d\s\-\(\)]{7,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

function analyzeQuoteModal(data: QuoteModalData): QuoteModalAnalysis {
  let priority = ModalQuotePriority.STANDARD;
  let complexity = 'Standard';
  const specialRequirements: string[] = [];

  // Analyze priority based on various factors
  if (data.totalEstimate > 50000) {
    priority = ModalQuotePriority.PREMIUM;
    complexity = 'Premium';
  } else if (data.urgency === 'urgent' || data.timeline.toLowerCase().includes('urgent') || data.timeline.toLowerCase().includes('asap')) {
    priority = ModalQuotePriority.URGENT;
    complexity = 'Urgent';
  }

  // Analyze product complexity
  const productCount = data.selectedProducts.length;
  
  if (productCount > 3) {
    complexity = 'Complex';
    specialRequirements.push('Multi-product integration');
  }

  // Check for special requirements
  if (data.selectedProducts.some(p => p.toLowerCase().includes('smart'))) {
    specialRequirements.push('Smart technology integration');
  }

  if (data.selectedProducts.some(p => p.toLowerCase().includes('custom'))) {
    specialRequirements.push('Custom manufacturing');
  }

  if (data.projectType.toLowerCase().includes('commercial')) {
    specialRequirements.push('Commercial installation');
    if (priority === ModalQuotePriority.STANDARD) {
      priority = ModalQuotePriority.URGENT;
    }
  }

  if (data.additionalRequirements && data.additionalRequirements.length > 100) {
    specialRequirements.push('Detailed custom requirements');
  }

  return {
    priority,
    estimatedValue: data.totalEstimate,
    productCount,
    complexity,
    specialRequirements
  };
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

interface EmailContent {
  adminHtml: string;
  adminText: string;
  customerHtml: string;
  customerText: string;
}

function generateQuoteModalEmailContent(data: QuoteModalData, analysis: QuoteModalAnalysis): EmailContent {
  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const quoteId = generateQuoteModalId();
  const esc = escapeHtml;

  // Professional admin notification
  const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Modal Submission - The Wall Shop</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      background: #f8fafc; 
      color: #1f2937; 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }
    .container { 
      max-width: 800px; 
      margin: 20px auto; 
      background: #ffffff; 
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header { 
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
      color: #ffffff; 
      padding: 32px;
      text-align: center;
    }
    .header h1 { 
      margin: 0 0 8px; 
      font-size: 28px; 
      font-weight: 700;
    }
    .content { 
      padding: 32px; 
    }
    .section { 
      background: #f8fafc;
      border: 1px solid #e2e8f0; 
      border-radius: 8px; 
      padding: 24px; 
      margin-bottom: 24px; 
    }
    .section h3 { 
      margin: 0 0 16px; 
      font-size: 18px; 
      color: #0f172a; 
      font-weight: 600;
    }
    .field { 
      display: flex; 
      padding: 8px 0; 
      border-bottom: 1px solid #e2e8f0;
    }
    .field-label { 
      min-width: 120px; 
      color: #64748b; 
      font-weight: 500; 
    }
    .field-value { 
      color: #0f172a; 
      font-weight: 500;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-right: 12px;
    }
    .btn-primary {
      background: #3b82f6;
      color: #ffffff;
    }
    .footer { 
      background: #f8fafc; 
      padding: 24px; 
      text-align: center; 
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Quote Modal Submission</h1>
      <p>Priority: ${analysis.priority.toUpperCase()}</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h3>Customer Information</h3>
        <div class="field">
          <div class="field-label">Name:</div>
          <div class="field-value">${esc(data.fullName)}</div>
        </div>
        <div class="field">
          <div class="field-label">Email:</div>
          <div class="field-value">${esc(data.email)}</div>
        </div>
        <div class="field">
          <div class="field-label">Phone:</div>
          <div class="field-value">${esc(data.phone)}</div>
        </div>
        ${data.company ? `
        <div class="field">
          <div class="field-label">Company:</div>
          <div class="field-value">${esc(data.company)}</div>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <h3>Quote Details</h3>
        <div class="field">
          <div class="field-label">Project Type:</div>
          <div class="field-value">${esc(data.projectType)}</div>
        </div>
        <div class="field">
          <div class="field-label">Budget:</div>
          <div class="field-value">${esc(data.budget)}</div>
        </div>
        <div class="field">
          <div class="field-label">Timeline:</div>
          <div class="field-value">${esc(data.timeline)}</div>
        </div>
        <div class="field">
          <div class="field-label">Total Estimate:</div>
          <div class="field-value">£${analysis.estimatedValue.toLocaleString()}</div>
        </div>
      </div>

      <div class="section">
        <h3>Selected Products</h3>
        ${data.selectedProducts.map(product => `
          <div style="padding: 4px 0;">• ${esc(product)}</div>
        `).join('')}
      </div>

      <div style="margin-top: 24px;">
        <a href="mailto:${esc(data.email)}" class="btn btn-primary">Reply to Customer</a>
        <a href="tel:${esc(data.phone)}" class="btn btn-primary">Call Customer</a>
      </div>

      <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 6px;">
        <strong>Quote ID:</strong> ${quoteId}<br>
        <strong>Submitted:</strong> ${timestamp}<br>
        <strong>Response SLA:</strong> ${getModalResponseTimeEstimate(analysis.priority)}
      </div>
    </div>

    <div class="footer">
      <p>The Wall Shop - Premium Wall Solutions</p>
    </div>
  </div>
</body>
</html>`;

  // Professional customer confirmation
  const customerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Confirmed - The Wall Shop</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      background: #f8fafc; 
      color: #1f2937; 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }
    .container { 
      max-width: 650px; 
      margin: 20px auto; 
      background: #ffffff; 
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header { 
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
      color: #ffffff; 
      padding: 40px 32px;
      text-align: center;
    }
    .header h1 { 
      margin: 0 0 12px; 
      font-size: 32px; 
      font-weight: 700;
    }
    .content { 
      padding: 40px 32px; 
    }
    .highlight-box {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border: 2px solid #93c5fd;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      text-align: center;
    }
    .quote-summary {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin: 32px 0;
    }
    .next-steps {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 8px;
      padding: 24px;
      margin: 32px 0;
    }
    .step {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 16px;
    }
    .step-number {
      background: #22c55e;
      color: #ffffff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }
    .contact-info {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 20px;
      margin: 32px 0;
    }
    .footer { 
      background: #f8fafc; 
      border-top: 1px solid #e2e8f0; 
      padding: 32px; 
      text-align: center; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Quote Confirmed!</h1>
      <p>Your proposal is being prepared</p>
    </div>
    
    <div class="content">
      <div style="font-size: 20px; margin-bottom: 24px;">
        Hello ${esc(data.fullName.split(' ')[0])},
      </div>
      
      <p>Thank you for using our instant quote system! We've received your requirements and our team is preparing your personalized proposal.</p>

      <div class="highlight-box">
        <div style="font-size: 20px; font-weight: 700; color: #1e40af; margin-bottom: 8px;">
          ${analysis.priority.toUpperCase()} Priority Processing
        </div>
        <div style="color: #1e3a8a;">
          Your proposal will be ready ${getModalResponseTimeEstimate(analysis.priority).toLowerCase()}
        </div>
      </div>

      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
        <strong>Quote Reference:</strong> ${quoteId}
      </div>

      <div class="quote-summary">
        <h3>Your Quote Summary</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
          <div>
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Project Type</div>
            <div style="font-weight: 600;">${esc(data.projectType)}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Budget</div>
            <div style="font-weight: 600;">${esc(data.budget)}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Timeline</div>
            <div style="font-weight: 600;">${esc(data.timeline)}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Estimate</div>
            <div style="font-weight: 600;">£${analysis.estimatedValue.toLocaleString()}</div>
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <div style="font-size: 14px; color: #64748b; margin-bottom: 8px;">Selected Products</div>
          ${data.selectedProducts.map(product => `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <div style="width: 6px; height: 6px; background: #3b82f6; border-radius: 50%;"></div>
              <div>${esc(product)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="next-steps">
        <h3>What Happens Next?</h3>
        <div class="step">
          <div class="step-number">1</div>
          <div>
            <strong>Technical Review</strong><br>
            Our team reviews your requirements and may contact you for clarifications
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div>
            <strong>Proposal Preparation</strong><br>
            We prepare a detailed proposal with specifications and pricing
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div>
            <strong>Consultation</strong><br>
            A specialist contacts you to present the proposal and answer questions
          </div>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <div>
            <strong>Project Planning</strong><br>
            Upon approval, we finalize details and schedule installation
          </div>
        </div>
      </div>

      <div class="contact-info">
        <h4>Need immediate assistance?</h4>
        <div>
          <strong>Phone:</strong> +44 141 739 3377<br>
          <strong>Email:</strong> quotes@thewallshop.co.uk<br>
          <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT
        </div>
      </div>
    </div>

    <div class="footer">
      <p><strong>The Wall Shop</strong> - Premium Wall Solutions</p>
      <div style="font-size: 14px; color: #64748b;">
        SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
      </div>
    </div>
  </div>
</body>
</html>`;

  // Text versions
  const adminText = `
QUOTE MODAL SUBMISSION - THE WALL SHOP
${analysis.priority.toUpperCase()} PRIORITY

Quote ID: ${quoteId}
Estimated Value: £${analysis.estimatedValue.toLocaleString()}
Products: ${analysis.productCount}
Response SLA: ${getModalResponseTimeEstimate(analysis.priority)}

CUSTOMER:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
${data.company ? `Company: ${data.company}` : ''}

QUOTE DETAILS:
Type: ${data.projectType}
Budget: ${data.budget}
Timeline: ${data.timeline}
Total: £${analysis.estimatedValue.toLocaleString()}

PRODUCTS:
${data.selectedProducts.map(product => `- ${product}`).join('\n')}

SUBMITTED: ${timestamp}
  `.trim();

  const customerText = `
QUOTE CONFIRMED - THE WALL SHOP

Hello ${data.fullName.split(' ')[0]},

Thank you for using our instant quote system! Your personalized proposal is being prepared.

Quote Reference: ${quoteId}
Priority: ${analysis.priority.toUpperCase()}
Response Time: ${getModalResponseTimeEstimate(analysis.priority)}

YOUR SUMMARY:
- Project: ${data.projectType}
- Budget: ${data.budget}
- Timeline: ${data.timeline}
- Estimate: £${analysis.estimatedValue.toLocaleString()}

PRODUCTS:
${data.selectedProducts.map(product => `- ${product}`).join('\n')}

NEXT STEPS:
1. Technical review and clarifications
2. Detailed proposal preparation
3. Specialist consultation
4. Project planning and scheduling

CONTACT:
Phone: +44 141 739 3377
Email: quotes@thewallshop.co.uk
Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT

The Wall Shop - Premium Wall Solutions
  `.trim();

  return {
    adminHtml,
    adminText,
    customerHtml,
    customerText
  };
}

function escapeHtml(text: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return String(text || '').replace(/[&<>"'\/]/g, (match) => escapeMap[match] || match);
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

async function sendQuoteModalEmails(
  resend: any, 
  data: QuoteModalData, 
  content: EmailContent,
  analysis: QuoteModalAnalysis
): Promise<EmailResults> {
  const quoteId = generateQuoteModalId();
  
  try {
    // Send both emails in parallel
    const [adminResult, customerResult] = await Promise.allSettled([
      // Admin notification
      resend.emails.send({
        from: "The Wall Shop Quote Modal <quotes@thewallshop.co.uk>",
        to: ["stephen@thewallshop.co.uk"],
        subject: `${analysis.priority.toUpperCase()} Quote Modal: £${analysis.estimatedValue.toLocaleString()} - ${data.fullName} [${quoteId}]`,
        html: content.adminHtml,
        text: content.adminText
      }),
      
      // Customer confirmation
      resend.emails.send({
        from: "The Wall Shop <quotes@thewallshop.co.uk>",
        to: [data.email],
        subject: `Quote Confirmed - ${quoteId} | The Wall Shop`,
        html: content.customerHtml,
        text: content.customerText
      })
    ]);

    const adminSuccess = adminResult.status === 'fulfilled' && !adminResult.value.error;
    const customerSuccess = customerResult.status === 'fulfilled' && !customerResult.value.error;

    if (!adminSuccess && !customerSuccess) {
      throw new Error("Failed to send both emails");
    }

    return {
      success: true,
      quoteId,
      emailIds: {
        admin: adminSuccess ? adminResult.value.data?.id : undefined,
        customer: customerSuccess ? customerResult.value.data?.id : undefined
      }
    };

  } catch (error) {
    return {
      success: false,
      quoteId,
      error: error instanceof Error ? error.message : "Unknown email error"
    };
  }
}