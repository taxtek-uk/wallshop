// api/subscribe.ts - Enhanced Professional Newsletter Subscription Handler
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

// Enhanced rate limiting for subscription requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Moderate limit for subscriptions
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Subscription preference categories
enum SubscriptionCategory {
  NEWSLETTER = 'newsletter',
  PRODUCT_UPDATES = 'product_updates',
  DESIGN_INSPIRATION = 'design_inspiration',
  SPECIAL_OFFERS = 'special_offers',
  PROJECT_SHOWCASE = 'project_showcase'
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
      message: "This endpoint only accepts POST requests for newsletter subscriptions.",
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
        message: "Too many subscription requests. Please wait before trying again.",
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
        message: "Newsletter subscription service is temporarily unavailable. Please try again later.",
        contact: {
          phone: "+44 141 739 3377",
          email: "info@thewallshop.co.uk"
        }
      });
    }

    // Enhanced request parsing and validation
    const body = await parseRequestBody(req);
    const validationResult = validateSubscriptionData(body);
    
    if (!validationResult.isValid) {
      return res.status(400).json({
        error: "Subscription Validation Failed",
        message: "Please review and correct the highlighted fields before resubmitting.",
        fields: validationResult.errors,
        timestamp: new Date().toISOString()
      });
    }

    const subscriptionData = validationResult.data;
    
    // Analyze subscription preferences
    const subscriptionAnalysis = analyzeSubscriptionPreferences(subscriptionData);
    
    // Generate comprehensive email content
    const emailContent = generateSubscriptionEmailContent(subscriptionData, subscriptionAnalysis);
    
    // Initialize Resend with enhanced error handling
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Send subscription emails with comprehensive tracking
    const emailResults = await sendSubscriptionEmails(resend, subscriptionData, emailContent, subscriptionAnalysis);
    
    if (!emailResults.success) {
      throw new Error(emailResults.error || "Failed to process newsletter subscription");
    }

    // Enhanced success response with detailed information
    return res.status(200).json({
      success: true,
      message: "Welcome to The Wall Shop newsletter! Check your email for confirmation.",
      details: {
        subscriptionId: emailResults.subscriptionId,
        subscribedAt: new Date().toISOString(),
        preferences: subscriptionAnalysis.selectedCategories,
        frequency: subscriptionAnalysis.frequency,
        nextNewsletter: getNextNewsletterDate(),
        benefits: [
          "Exclusive design inspiration and trends",
          "Early access to new products and collections",
          "Special subscriber-only discounts and offers",
          "Behind-the-scenes project showcases",
          "Expert tips and installation guides"
        ],
        contact: {
          phone: "+44 141 739 3377",
          email: "newsletter@thewallshop.co.uk",
          unsubscribe: "You can unsubscribe at any time using the link in our emails"
        }
      },
      tracking: {
        emailIds: emailResults.emailIds,
        referenceId: emailResults.subscriptionId
      }
    });

  } catch (error) {
    // Comprehensive error logging with context
    console.error("Newsletter Subscription Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      userAgent: req.headers["user-agent"],
      origin: req.headers.origin,
      ip: getClientIP(req)
    });

    return res.status(500).json({
      error: "Subscription Processing Error",
      message: "We're experiencing technical difficulties processing your subscription. Please try again or contact us directly.",
      details: {
        timestamp: new Date().toISOString(),
        supportContact: {
          phone: "+44 141 739 3377",
          email: "support@thewallshop.co.uk",
          newsletterEmail: "newsletter@thewallshop.co.uk"
        },
        alternativeOptions: [
          "Try subscribing again in a few minutes",
          "Email us directly to be added manually",
          "Call us to subscribe over the phone",
          "Follow us on social media for updates"
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

interface SubscriptionData {
  // Contact information
  email: string;
  firstName?: string;
  lastName?: string;
  
  // Preferences
  categories: SubscriptionCategory[];
  frequency: 'weekly' | 'biweekly' | 'monthly';
  
  // Optional information
  interests?: string[];
  projectType?: string;
  company?: string;
  
  // Source tracking
  source?: string;
  referralCode?: string;
  
  // GDPR compliance
  gdprConsent: boolean;
  marketingConsent: boolean;
}

interface ValidationResult {
  isValid: boolean;
  data?: SubscriptionData;
  errors?: Record<string, string>;
}

interface SubscriptionAnalysis {
  selectedCategories: string[];
  frequency: string;
  profileType: 'individual' | 'professional' | 'business';
  interests: string[];
}

function validateSubscriptionData(body: any): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Enhanced validation with comprehensive checks
  const email = sanitizeString(body?.email || "").trim().toLowerCase();
  const firstName = sanitizeString(body?.firstName || "").trim();
  const lastName = sanitizeString(body?.lastName || "").trim();
  const company = sanitizeString(body?.company || "").trim();
  const projectType = sanitizeString(body?.projectType || "").trim();
  const source = sanitizeString(body?.source || "").trim();
  const referralCode = sanitizeString(body?.referralCode || "").trim();
  
  // Parse arrays and booleans
  const categories = Array.isArray(body?.categories) ? 
    body.categories.filter((cat: any) => Object.values(SubscriptionCategory).includes(cat)) : 
    [SubscriptionCategory.NEWSLETTER];
  
  const interests = Array.isArray(body?.interests) ? 
    body.interests.map((interest: any) => sanitizeString(String(interest)).trim()).filter(Boolean) : [];
  
  const frequency = ['weekly', 'biweekly', 'monthly'].includes(body?.frequency) ? 
    body.frequency : 'monthly';
  
  const gdprConsent = Boolean(body?.gdprConsent);
  const marketingConsent = Boolean(body?.marketingConsent);

  // Enhanced validation rules
  if (!email) {
    errors.email = "Email address is required for newsletter subscription";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address";
  } else if (email.length > 254) {
    errors.email = "Email address is too long";
  }

  // Name validation (optional but enhanced when provided)
  if (firstName && firstName.length > 50) {
    errors.firstName = "First name must be less than 50 characters";
  } else if (firstName && !/^[a-zA-Z\s\-'\.]+$/.test(firstName)) {
    errors.firstName = "First name contains invalid characters";
  }

  if (lastName && lastName.length > 50) {
    errors.lastName = "Last name must be less than 50 characters";
  } else if (lastName && !/^[a-zA-Z\s\-'\.]+$/.test(lastName)) {
    errors.lastName = "Last name contains invalid characters";
  }

  // Company validation (optional)
  if (company && company.length > 100) {
    errors.company = "Company name must be less than 100 characters";
  }

  // Categories validation
  if (categories.length === 0) {
    errors.categories = "Please select at least one newsletter category";
  }

  // GDPR compliance validation
  if (!gdprConsent) {
    errors.gdprConsent = "GDPR consent is required to subscribe to our newsletter";
  }

  // Interests validation
  if (interests.length > 10) {
    errors.interests = "Please select no more than 10 interests";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    data: {
      email,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      categories,
      frequency,
      interests: interests.length > 0 ? interests : undefined,
      projectType: projectType || undefined,
      company: company || undefined,
      source: source || undefined,
      referralCode: referralCode || undefined,
      gdprConsent,
      marketingConsent
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
    .substring(0, 1000);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

function analyzeSubscriptionPreferences(data: SubscriptionData): SubscriptionAnalysis {
  const selectedCategories = data.categories.map(cat => 
    cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  );

  let profileType: 'individual' | 'professional' | 'business' = 'individual';
  
  if (data.company) {
    profileType = 'business';
  } else if (data.projectType && (
    data.projectType.toLowerCase().includes('commercial') ||
    data.projectType.toLowerCase().includes('office') ||
    data.projectType.toLowerCase().includes('hospitality')
  )) {
    profileType = 'professional';
  }

  const interests = data.interests || [];

  return {
    selectedCategories,
    frequency: data.frequency,
    profileType,
    interests
  };
}

function getNextNewsletterDate(): string {
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return nextWeek.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function generateSubscriptionId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `SUB-${timestamp}-${random}`.toUpperCase();
}

interface EmailContent {
  adminHtml: string;
  adminText: string;
  customerHtml: string;
  customerText: string;
}

function generateSubscriptionEmailContent(data: SubscriptionData, analysis: SubscriptionAnalysis): EmailContent {
  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const subscriptionId = generateSubscriptionId();
  const esc = escapeHtml;
  const displayName = data.firstName ? data.firstName : data.email.split('@')[0];

  // Professional admin notification
  const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Newsletter Subscription - The Wall Shop</title>
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
      max-width: 700px; 
      margin: 20px auto; 
      background: #ffffff; 
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header { 
      background: linear-gradient(135deg, #059669 0%, #047857 100%); 
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
    .categories {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .category-tag {
      background: #dcfce7;
      color: #166534;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
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
      <h1>New Newsletter Subscription</h1>
      <p>Profile: ${analysis.profileType.toUpperCase()}</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h3>Subscriber Information</h3>
        <div class="field">
          <div class="field-label">Email:</div>
          <div class="field-value">${esc(data.email)}</div>
        </div>
        ${data.firstName ? `
        <div class="field">
          <div class="field-label">First Name:</div>
          <div class="field-value">${esc(data.firstName)}</div>
        </div>
        ` : ''}
        ${data.lastName ? `
        <div class="field">
          <div class="field-label">Last Name:</div>
          <div class="field-value">${esc(data.lastName)}</div>
        </div>
        ` : ''}
        ${data.company ? `
        <div class="field">
          <div class="field-label">Company:</div>
          <div class="field-value">${esc(data.company)}</div>
        </div>
        ` : ''}
        ${data.projectType ? `
        <div class="field">
          <div class="field-label">Project Type:</div>
          <div class="field-value">${esc(data.projectType)}</div>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <h3>Subscription Preferences</h3>
        <div class="field">
          <div class="field-label">Frequency:</div>
          <div class="field-value">${data.frequency.charAt(0).toUpperCase() + data.frequency.slice(1)}</div>
        </div>
        <div class="field">
          <div class="field-label">Categories:</div>
          <div class="field-value">
            <div class="categories">
              ${analysis.selectedCategories.map(category => 
                `<span class="category-tag">${esc(category)}</span>`
              ).join('')}
            </div>
          </div>
        </div>
        ${data.interests && data.interests.length > 0 ? `
        <div class="field">
          <div class="field-label">Interests:</div>
          <div class="field-value">${data.interests.map(esc).join(', ')}</div>
        </div>
        ` : ''}
        ${data.source ? `
        <div class="field">
          <div class="field-label">Source:</div>
          <div class="field-value">${esc(data.source)}</div>
        </div>
        ` : ''}
        ${data.referralCode ? `
        <div class="field">
          <div class="field-label">Referral Code:</div>
          <div class="field-value">${esc(data.referralCode)}</div>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <h3>Compliance</h3>
        <div class="field">
          <div class="field-label">GDPR Consent:</div>
          <div class="field-value">${data.gdprConsent ? 'Yes' : 'No'}</div>
        </div>
        <div class="field">
          <div class="field-label">Marketing Consent:</div>
          <div class="field-value">${data.marketingConsent ? 'Yes' : 'No'}</div>
        </div>
      </div>

      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin-top: 24px;">
        <strong>Subscription ID:</strong> ${subscriptionId}<br>
        <strong>Subscribed:</strong> ${timestamp}<br>
        <strong>Profile Type:</strong> ${analysis.profileType.toUpperCase()}
      </div>
    </div>

    <div class="footer">
      <p>The Wall Shop - Newsletter Management</p>
    </div>
  </div>
</body>
</html>`;

  // Professional customer welcome email
  const customerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Wall Shop Newsletter</title>
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
      background: linear-gradient(135deg, #059669 0%, #047857 100%); 
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
    .welcome-box {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border: 2px solid #86efac;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      text-align: center;
    }
    .preferences-summary {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin: 32px 0;
    }
    .categories {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .category-tag {
      background: #dcfce7;
      color: #166534;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
    }
    .benefits {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 24px;
      margin: 32px 0;
    }
    .benefit-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }
    .benefit-bullet {
      width: 6px;
      height: 6px;
      background: #f59e0b;
      border-radius: 50%;
      margin-top: 8px;
      flex-shrink: 0;
    }
    .footer { 
      background: #f8fafc; 
      border-top: 1px solid #e2e8f0; 
      padding: 32px; 
      text-align: center; 
    }
    .unsubscribe {
      font-size: 12px;
      color: #64748b;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome!</h1>
      <p>You're now part of The Wall Shop community</p>
    </div>
    
    <div class="content">
      <div style="font-size: 20px; margin-bottom: 24px;">
        Hello ${esc(displayName)},
      </div>
      
      <p>Thank you for subscribing to The Wall Shop newsletter! We're thrilled to have you join our community of design enthusiasts and wall solution experts.</p>

      <div class="welcome-box">
        <div style="font-size: 20px; font-weight: 700; color: #166534; margin-bottom: 8px;">
          Subscription Confirmed
        </div>
        <div style="color: #15803d;">
          Your preferences have been saved and you'll receive our ${data.frequency} newsletter
        </div>
      </div>

      <div class="preferences-summary">
        <h3>Your Newsletter Preferences</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 16px;">
          <div>
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Frequency</div>
            <div style="font-weight: 600;">${data.frequency.charAt(0).toUpperCase() + data.frequency.slice(1)}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Categories</div>
            <div style="font-weight: 600;">${analysis.selectedCategories.length} Selected</div>
          </div>
        </div>
        
        <div>
          <div style="font-size: 14px; color: #64748b; margin-bottom: 8px;">Your Selected Categories</div>
          <div class="categories">
            ${analysis.selectedCategories.map(category => 
              `<span class="category-tag">${esc(category)}</span>`
            ).join('')}
          </div>
        </div>
      </div>

      <div class="benefits">
        <h3>What You'll Receive</h3>
        <div class="benefit-item">
          <div class="benefit-bullet"></div>
          <div>
            <strong>Exclusive Design Inspiration</strong><br>
            Latest trends, color palettes, and innovative wall solutions
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-bullet"></div>
          <div>
            <strong>Early Product Access</strong><br>
            Be the first to discover new collections and premium materials
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-bullet"></div>
          <div>
            <strong>Subscriber-Only Offers</strong><br>
            Special discounts and exclusive promotions just for our community
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-bullet"></div>
          <div>
            <strong>Project Showcases</strong><br>
            Behind-the-scenes looks at stunning installations and transformations
          </div>
        </div>
        <div class="benefit-item">
          <div class="benefit-bullet"></div>
          <div>
            <strong>Expert Tips & Guides</strong><br>
            Professional advice on installation, maintenance, and design choices
          </div>
        </div>
      </div>

      <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin: 32px 0;">
        <h4>Next Newsletter</h4>
        <div>
          Your next newsletter will arrive on <strong>${getNextNewsletterDate()}</strong>. 
          Keep an eye on your inbox for exclusive content and special offers!
        </div>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <p>Have questions or want to update your preferences?</p>
        <div style="margin-top: 16px;">
          <strong>Email:</strong> newsletter@thewallshop.co.uk<br>
          <strong>Phone:</strong> +44 141 739 3377<br>
          <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT
        </div>
      </div>
    </div>

    <div class="footer">
      <p><strong>The Wall Shop</strong> - Premium Wall Solutions</p>
      <div style="font-size: 14px; color: #64748b; margin-top: 8px;">
        SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
      </div>
      <div class="unsubscribe">
        You can unsubscribe at any time using the link in our newsletters.<br>
        Subscription ID: ${subscriptionId}
      </div>
    </div>
  </div>
</body>
</html>`;

  // Text versions
  const adminText = `
NEW NEWSLETTER SUBSCRIPTION - THE WALL SHOP

Subscription ID: ${subscriptionId}
Profile Type: ${analysis.profileType.toUpperCase()}

SUBSCRIBER:
Email: ${data.email}
${data.firstName ? `First Name: ${data.firstName}` : ''}
${data.lastName ? `Last Name: ${data.lastName}` : ''}
${data.company ? `Company: ${data.company}` : ''}
${data.projectType ? `Project Type: ${data.projectType}` : ''}

PREFERENCES:
Frequency: ${data.frequency}
Categories: ${analysis.selectedCategories.join(', ')}
${data.interests && data.interests.length > 0 ? `Interests: ${data.interests.join(', ')}` : ''}
${data.source ? `Source: ${data.source}` : ''}
${data.referralCode ? `Referral: ${data.referralCode}` : ''}

COMPLIANCE:
GDPR Consent: ${data.gdprConsent ? 'Yes' : 'No'}
Marketing Consent: ${data.marketingConsent ? 'Yes' : 'No'}

SUBSCRIBED: ${timestamp}
  `.trim();

  const customerText = `
WELCOME TO THE WALL SHOP NEWSLETTER

Hello ${displayName},

Thank you for subscribing! You're now part of our community of design enthusiasts.

SUBSCRIPTION CONFIRMED
Frequency: ${data.frequency}
Categories: ${analysis.selectedCategories.join(', ')}
Next Newsletter: ${getNextNewsletterDate()}

WHAT YOU'LL RECEIVE:
- Exclusive design inspiration and trends
- Early access to new products
- Subscriber-only discounts and offers
- Behind-the-scenes project showcases
- Expert tips and installation guides

CONTACT US:
Email: newsletter@thewallshop.co.uk
Phone: +44 141 739 3377
Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT

You can unsubscribe at any time using the link in our newsletters.
Subscription ID: ${subscriptionId}

The Wall Shop - Premium Wall Solutions
SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
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
  subscriptionId: string;
  emailIds?: {
    admin?: string;
    customer?: string;
  };
}

async function sendSubscriptionEmails(
  resend: any, 
  data: SubscriptionData, 
  content: EmailContent,
  analysis: SubscriptionAnalysis
): Promise<EmailResults> {
  const subscriptionId = generateSubscriptionId();
  
  try {
    // Send both emails in parallel
    const [adminResult, customerResult] = await Promise.allSettled([
      // Admin notification
      resend.emails.send({
        from: "The Wall Shop Newsletter <newsletter@thewallshop.co.uk>",
        to: ["stephen@thewallshop.co.uk"],
        subject: `New Newsletter Subscription: ${analysis.profileType.toUpperCase()} - ${data.email} [${subscriptionId}]`,
        html: content.adminHtml,
        text: content.adminText
      }),
      
      // Customer welcome
      resend.emails.send({
        from: "The Wall Shop <newsletter@thewallshop.co.uk>",
        to: [data.email],
        subject: `Welcome to The Wall Shop Newsletter - ${subscriptionId}`,
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
      subscriptionId,
      emailIds: {
        admin: adminSuccess ? adminResult.value.data?.id : undefined,
        customer: customerSuccess ? customerResult.value.data?.id : undefined
      }
    };

  } catch (error) {
    return {
      success: false,
      subscriptionId,
      error: error instanceof Error ? error.message : "Unknown email error"
    };
  }
}
