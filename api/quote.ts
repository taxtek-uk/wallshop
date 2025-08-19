// api/contact.ts - Enhanced Professional Contact Form Handler
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// Comprehensive CORS configuration for production and development environments
const ALLOWED_ORIGINS = [
  "https://thewallshop.co.uk",
  "https://www.thewallshop.co.uk",
  "https://staging.thewallshop.co.uk",
  "http://localhost:5173", // Vite development server
  "http://localhost:3000", // Alternative development port
];

// Rate limiting configuration (requests per IP per minute)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enhanced CORS handling with security headers
  const origin = String(req.headers.origin || "");
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);
  
  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours
  
  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Method validation
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ 
      error: "Method Not Allowed",
      message: "This endpoint only accepts POST requests.",
      allowedMethods: ["POST", "OPTIONS"]
    });
  }

  // Content type validation
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    // Rate limiting implementation
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        error: "Rate Limit Exceeded",
        message: "Too many requests. Please wait before submitting again.",
        retryAfter: Math.ceil(rateLimitResult.resetTime / 1000),
        details: {
          limit: RATE_LIMIT_MAX_REQUESTS,
          window: RATE_LIMIT_WINDOW / 1000,
          remaining: 0
        }
      });
    }

    // Environment validation
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return res.status(500).json({
        error: "Service Configuration Error",
        message: "Email service is temporarily unavailable. Please try again later.",
        details: "Missing email service configuration"
      });
    }

    // Enhanced request body parsing with validation
    const body = await parseRequestBody(req);
    
    // Comprehensive input validation and sanitization
    const validationResult = validateContactForm(body);
    
    if (!validationResult.isValid) {
      return res.status(400).json({
        error: "Validation Failed",
        message: "Please correct the highlighted fields and try again.",
        fields: validationResult.errors,
        timestamp: new Date().toISOString()
      });
    }

    const contactData = validationResult.data;

    // Enhanced email content generation
    const emailContent = generateEmailContent(contactData);
    
    // Initialize Resend client with error handling
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Send emails with comprehensive error handling
    const emailResults = await sendContactEmails(resend, contactData, emailContent);
    
    if (!emailResults.success) {
      throw new Error(emailResults.error || "Failed to send contact emails");
    }

    // Success response with detailed information
    return res.status(200).json({
      success: true,
      message: "Thank you for contacting us! We'll respond within 2 business hours.",
      details: {
        submittedAt: new Date().toISOString(),
        referenceId: generateReferenceId(),
        estimatedResponse: "Within 2 business hours",
        nextSteps: [
          "We'll review your inquiry and requirements",
          "A specialist will contact you to discuss your project",
          "We'll provide a detailed consultation and quote"
        ]
      },
      emailIds: emailResults.emailIds
    });

  } catch (error) {
    // Comprehensive error logging
    console.error("Contact Form Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      userAgent: req.headers["user-agent"],
      origin: req.headers.origin
    });

    // User-friendly error response
    return res.status(500).json({
      error: "Internal Server Error",
      message: "We're experiencing technical difficulties. Please try again or contact us directly.",
      details: {
        timestamp: new Date().toISOString(),
        supportEmail: "support@thewallshop.co.uk",
        supportPhone: "+44 141 739 3377"
      }
    });
  }
}

// Enhanced utility functions

function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const realIP = req.headers["x-real-ip"];
  
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
    // Reset or initialize rate limit
    rateLimitMap.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, resetTime: now + RATE_LIMIT_WINDOW };
  }
  
  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: rateLimitData.resetTime };
  }
  
  // Increment count
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
    throw new Error("Invalid JSON in request body");
  }
}

interface ContactData {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  source?: string;
  newsletter?: boolean;
  smartWalls?: any; // Added for smart walls data
}

interface ValidationResult {
  isValid: boolean;
  data?: ContactData;
  errors?: Record<string, string>;
}

function validateContactForm(body: any): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Enhanced validation with detailed error messages
  const fullName = sanitizeString(body?.fullName || body?.name || "").trim();
  const email = sanitizeString(body?.email || "").trim().toLowerCase();
  const phone = sanitizeString(body?.phone || "").trim();
  const company = sanitizeString(body?.company || "").trim();
  const subject = sanitizeString(body?.subject || "").trim();
  const message = sanitizeString(body?.message || "").trim();
  const projectType = sanitizeString(body?.projectType || "").trim();
  const budget = sanitizeString(body?.budget || "").trim();
  const timeline = sanitizeString(body?.timeline || "").trim();
  const source = sanitizeString(body?.source || "").trim();
  const newsletter = Boolean(body?.newsletter);

  // Name validation
  if (!fullName) {
    errors.fullName = "Full name is required";
  } else if (fullName.length < 2) {
    errors.fullName = "Name must be at least 2 characters long";
  } else if (fullName.length > 100) {
    errors.fullName = "Name must be less than 100 characters";
  } else if (!/^[a-zA-Z\s\-\'\.]+$/.test(fullName)) {
    errors.fullName = "Name contains invalid characters";
  }

  // Email validation
  if (!email) {
    errors.email = "Email address is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address";
  } else if (email.length > 254) {
    errors.email = "Email address is too long";
  }

  // Phone validation
  if (!phone) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  // Subject validation
  if (!subject) {
    errors.subject = "Subject is required";
  } else if (subject.length < 5) {
    errors.subject = "Subject must be at least 5 characters long";
  } else if (subject.length > 200) {
    errors.subject = "Subject must be less than 200 characters";
  }

  // Message validation
  if (!message) {
    errors.message = "Message is required";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters long";
  } else if (message.length > 5000) {
    errors.message = "Message must be less than 5000 characters";
  }

  // Company validation (optional)
  if (company && company.length > 100) {
    errors.company = "Company name must be less than 100 characters";
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
      subject,
      message,
      projectType: projectType || undefined,
      budget: budget || undefined,
      timeline: timeline || undefined,
      source: source || undefined,
      newsletter,
      smartWalls: body?.smartWalls || undefined, // Pass smartWalls data
    }
  };
}

function sanitizeString(value: any): string {
  if (typeof value !== "string") return "";
  
  return value
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>'"&]/g, (match) => { // Escape dangerous characters
      const escapeMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return escapeMap[match] || match;
    })
    .substring(0, 5000); // Prevent extremely long inputs
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

function generateReferenceId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `TWS-${timestamp}-${random}`.toUpperCase();
}

interface EmailContent {
  adminHtml: string;
  adminText: string;
  customerHtml: string;
  customerText: string;
}

function generateEmailContent(data: ContactData): EmailContent {
  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const referenceId = generateReferenceId();
  const esc = escapeHtml;

  let smartWallsHtml = '';
  let smartWallsText = '';

  if (data.smartWalls) {
    smartWallsHtml = generateSmartWallsEmailContent(data.smartWalls);
    smartWallsText = generateSmartWallsTextContent(data.smartWalls);
  }

  // Enhanced admin notification email
  let adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Inquiry - The Wall Shop</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      background: #f8fafc; 
      color: #1f2937; 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
      color: #ffffff; 
      padding: 32px 28px;
      text-align: center;
    }
    .brand-logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #b69777 0%, #907252 100%);
      border-radius: 12px;
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 24px;
      color: #ffffff;
    }
    .header h1 { 
      margin: 0 0 8px; 
      font-size: 28px; 
      font-weight: 700;
      letter-spacing: -0.025em;
    }
    .header p { 
      margin: 0; 
      color: #cbd5e1; 
      font-size: 16px;
    }
    .content { 
      padding: 32px 28px; 
    }
    .priority-badge {
      display: inline-block;
      background: #dc2626;
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 24px;
    }
    .section { 
      background: #f8fafc;
      border: 1px solid #e2e8f0; 
      border-radius: 12px; 
      padding: 24px; 
      margin-bottom: 24px; 
    }
    .section-title { 
      margin: 0 0 16px; 
      font-size: 18px; 
      color: #0f172a; 
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-icon {
      width: 20px;
      height: 20px;
      background: #3b82f6;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 12px;
    }
    .field-row { 
      display: flex; 
      gap: 16px; 
      padding: 12px 16px; 
      background: #ffffff; 
      border: 1px solid #e2e8f0; 
      border-radius: 8px; 
      margin-bottom: 8px;
      align-items: flex-start;
    }
    .field-label { 
      min-width: 140px; 
      color: #475569; 
      font-weight: 600; 
      font-size: 14px;
    }
    .field-value { 
      color: #0f172a; 
      font-weight: 500;
      flex: 1;
      word-break: break-word;
    }
    .message-content {
      background: #ffffff;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin-top: 12px;
      white-space: pre-wrap;
      font-family: 'Georgia', serif;
      line-height: 1.7;
      color: #374151;
    }
    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #3b82f6;
      color: #ffffff;
    }
    .btn-secondary {
      background: #6b7280;
      color: #ffffff;
    }
    .metadata {
      background: #f1f5f9;
      border-left: 4px solid #3b82f6;
      padding: 16px 20px;
      margin-top: 24px;
      border-radius: 0 8px 8px 0;
    }
    .footer { 
      background: #f8fafc; 
      border-top: 1px solid #e2e8f0; 
      padding: 24px 28px; 
      text-align: center; 
    }
    .footer-text {
      margin: 0;
      color: #64748b;
      font-size: 14px;
    }
    .company-info {
      margin-top: 12px;
      color: #475569;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand-logo">TW</div>
      <h1>New Contact Inquiry</h1>
      <p>Priority customer inquiry received</p>
    </div>
    
    <div class="content">
      <div class="priority-badge">High Priority</div>
      
      <div class="section">
        <h3 class="section-title">
          <div class="section-icon">C</div>
          Contact Information
        </h3>
        <div class="field-row">
          <div class="field-label">Full Name</div>
          <div class="field-value">${esc(data.fullName)}</div>
        </div>
        <div class="field-row">
          <div class="field-label">Email Address</div>
          <div class="field-value"><a href="mailto:${esc(data.email)}" style="color: #3b82f6; text-decoration: none;">${esc(data.email)}</a></div>
        </div>
        <div class="field-row">
          <div class="field-label">Phone Number</div>
          <div class="field-value"><a href="tel:${esc(data.phone)}" style="color: #3b82f6; text-decoration: none;">${esc(data.phone)}</a></div>
        </div>
        ${data.company ? `
        <div class="field-row">
          <div class="field-label">Company</div>
          <div class="field-value">${esc(data.company)}</div>
        </div>
        ` : ''}
      </div>

      ${smartWallsHtml} <!-- Smart Walls Section -->

      <div class="section">
        <h3 class="section-title">
          <div class="section-icon">I</div>
          Inquiry Details
        </h3>
        <div class="field-row">
          <div class="field-label">Subject</div>
          <div class="field-value"><strong>${esc(data.subject)}</strong></div>
        </div>
        ${data.projectType ? `
        <div class="field-row">
          <div class="field-label">Project Type</div>
          <div class="field-value">${esc(data.projectType)}</div>
        </div>
        ` : ''}
        ${data.budget ? `
        <div class="field-row">
          <div class="field-label">Budget Range</div>
          <div class="field-value">${esc(data.budget)}</div>
        </div>
        ` : ''}
        ${data.timeline ? `
        <div class="field-row">
          <div class="field-label">Timeline</div>
          <div class="field-value">${esc(data.timeline)}</div>
        </div>
        ` : ''}
        ${data.source ? `
        <div class="field-row">
          <div class="field-label">How they found us</div>
          <div class="field-value">${esc(data.source)}</div>
        </div>
        ` : ''}
        <div class="field-row">
          <div class="field-label">Newsletter</div>
          <div class="field-value">${data.newsletter ? 'Yes, subscribed' : 'No subscription'}</div>
        </div>
        
        <div class="message-content">
          ${esc(data.message)}
        </div>
      </div>

      <div class="action-buttons">
        <a href="mailto:${esc(data.email)}?subject=Re: ${encodeURIComponent(data.subject)}" class="btn btn-primary">
          Reply to Customer
        </a>
        <a href="tel:${esc(data.phone)}" class="btn btn-secondary">
          Call Customer
        </a>
      </div>

      <div class="metadata">
        <strong>Reference ID:</strong> ${referenceId}<br>
        <strong>Submitted:</strong> ${timestamp}<br>
        <strong>Response SLA:</strong> Within 2 business hours
      </div>
    </div>

    <div class="footer">
      <p class="footer-text"><strong>The Wall Shop</strong> - Premium Wall Solutions</p>
      <p class="company-info">
        SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK<br>
        Phone: +44 141 739 3377 | Email: info@thewallshop.co.uk
      </p>
    </div>
  </div>
</body>
</html>`;

  // Enhanced customer confirmation email
  const customerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting The Wall Shop</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      background: #f8fafc; 
      color: #1f2937; 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
    .brand-logo {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #b69777 0%, #907252 100%);
      border-radius: 16px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 32px;
      color: #ffffff;
    }
    .header h1 { 
      margin: 0 0 12px; 
      font-size: 32px; 
      font-weight: 700;
      letter-spacing: -0.025em;
    }
    .header p { 
      margin: 0; 
      color: #cbd5e1; 
      font-size: 18px;
    }
    .content { 
      padding: 40px 32px; 
    }
    .greeting {
      font-size: 20px;
      color: #0f172a;
      margin-bottom: 24px;
      font-weight: 600;
    }
    .message {
      font-size: 16px;
      color: #374151;
      margin-bottom: 32px;
      line-height: 1.7;
    }
    .highlight-box {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border: 1px solid #93c5fd;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      text-align: center;
    }
    .highlight-title {
      font-size: 18px;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 8px;
    }
    .highlight-text {
      color: #1e3a8a;
      font-size: 16px;
    }
    .next-steps {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
    }
    .next-steps h3 {
      margin: 0 0 16px;
      color: #0f172a;
      font-size: 18px;
      font-weight: 700;
    }
    .step {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 16px;
    }
    .step-number {
      background: #3b82f6;
      color: #ffffff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step-text {
      color: #374151;
      font-size: 15px;
    }
    .contact-info {
      background: #f1f5f9;
      border-left: 4px solid #3b82f6;
      padding: 20px 24px;
      margin: 32px 0;
      border-radius: 0 8px 8px 0;
    }
    .contact-info h4 {
      margin: 0 0 12px;
      color: #0f172a;
      font-size: 16px;
      font-weight: 700;
    }
    .contact-details {
      color: #475569;
      font-size: 14px;
      line-height: 1.6;
    }
    .contact-details a {
      color: #3b82f6;
      text-decoration: none;
    }
    .footer { 
      background: #f8fafc; 
      border-top: 1px solid #e2e8f0; 
      padding: 32px; 
      text-align: center; 
    }
    .footer-text {
      margin: 0 0 16px;
      color: #0f172a;
      font-size: 16px;
      font-weight: 600;
    }
    .company-info {
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
    }
    .reference-id {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 12px 16px;
      margin: 24px 0;
      text-align: center;
      font-size: 14px;
      color: #92400e;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand-logo">TW</div>
      <h1>Thank You!</h1>
      <p>We've received your inquiry</p>
    </div>
    
    <div class="content">
      <div class="greeting">Hello ${esc(data.fullName.split(' ')[0])},</div>
      
      <div class="message">
        Thank you for contacting <strong>The Wall Shop</strong>. We've successfully received your inquiry about 
        "<em>${esc(data.subject)}</em>" and our team is already reviewing your requirements.
      </div>

      <div class="highlight-box">
        <div class="highlight-title">Priority Response Guaranteed</div>
        <div class="highlight-text">
          Our specialists will respond to your inquiry within <strong>2 business hours</strong>
        </div>
      </div>

      <div class="reference-id">
        <strong>Reference ID:</strong> ${referenceId}<br>
        Please keep this reference for your records
      </div>

      <div class="next-steps">
        <h3>What happens next?</h3>
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-text">
            <strong>Review & Analysis</strong><br>
            Our technical team will carefully review your requirements and project details
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-text">
            <strong>Expert Consultation</strong><br>
            A specialist will contact you to discuss your project and answer any questions
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-text">
            <strong>Detailed Proposal</strong><br>
            We'll provide a comprehensive quote and project timeline tailored to your needs
          </div>
        </div>
      </div>

      <div class="contact-info">
        <h4>Need immediate assistance?</h4>
        <div class="contact-details">
          <strong>Phone:</strong> <a href="tel:+441417393377">+44 141 739 3377</a><br>
          <strong>Email:</strong> <a href="mailto:info@thewallshop.co.uk">info@thewallshop.co.uk</a><br>
          <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT
        </div>
      </div>

      <div class="message">
        We're excited to help you transform your space with our premium wall solutions. 
        Our team has over 15 years of experience delivering exceptional results for residential 
        and commercial projects across the UK.
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">The Wall Shop - Premium Wall Solutions</p>
      <div class="company-info">
        SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK<br>
        Phone: +44 141 739 3377 | Email: info@thewallshop.co.uk<br>
        Website: <a href="https://thewallshop.co.uk" style="color: #3b82f6;">thewallshop.co.uk</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  // Text versions for better email client compatibility
  const adminText = `
NEW CONTACT INQUIRY - THE WALL SHOP
Reference: ${referenceId}

CONTACT INFORMATION:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
${data.company ? `Company: ${data.company}` : ''}

${smartWallsText} <!-- Smart Walls Section -->

INQUIRY DETAILS:
Subject: ${data.subject}
${data.projectType ? `Project Type: ${data.projectType}` : ''}
${data.budget ? `Budget: ${data.budget}` : ''}
${data.timeline ? `Timeline: ${data.timeline}` : ''}
${data.source ? `Source: ${data.source}` : ''}
Newsletter: ${data.newsletter ? 'Yes' : 'No'}

MESSAGE:
${data.message}

SUBMITTED: ${timestamp}
RESPONSE SLA: Within 2 business hours

Reply to customer: ${data.email}
Call customer: ${data.phone}
  `.trim();

  const customerText = `
Thank you for contacting The Wall Shop!

Hello ${data.fullName.split(' ')[0]},

We've received your inquiry about "${data.subject}" and our team will respond within 2 business hours.

Reference ID: ${referenceId}

WHAT HAPPENS NEXT:
1. Our technical team will review your requirements
2. A specialist will contact you for consultation  
3. We'll provide a detailed proposal and quote

NEED IMMEDIATE ASSISTANCE?
Phone: +44 141 739 3377
Email: info@thewallshop.co.uk
Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT

The Wall Shop - Premium Wall Solutions
SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
Website: thewallshop.co.uk
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
  
  return String(text || '').replace(/[&<>"'/]/g, (match) => escapeMap[match] || match);
}

interface EmailResults {
  success: boolean;
  error?: string;
  emailIds?: {
    admin?: string;
    customer?: string;
  };
}

async function sendContactEmails(
  resend: any, 
  data: ContactData, 
  content: EmailContent
): Promise<EmailResults> {
  try {
    // Send both emails in parallel for better performance
    const [adminResult, customerResult] = await Promise.allSettled([
      // Admin notification
      resend.emails.send({
        from: "The Wall Shop Contact Form <contact@thewallshop.co.uk>",
        to: ["stephen@thewallshop.co.uk"],
        subject: `New Contact Inquiry: ${data.subject} - ${data.fullName}`,
        html: content.adminHtml,
        text: content.adminText,
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high'
        }
      }),
      
      // Customer confirmation
      resend.emails.send({
        from: "The Wall Shop <info@thewallshop.co.uk>",
        to: [data.email],
        subject: "Thank you for contacting The Wall Shop - We'll respond within 2 hours",
        html: content.customerHtml,
        text: content.customerText
      })
    ]);

    // Check results
    const adminSuccess = adminResult.status === 'fulfilled' && !adminResult.value.error;
    const customerSuccess = customerResult.status === 'fulfilled' && !customerResult.value.error;

    if (!adminSuccess && !customerSuccess) {
      throw new Error("Failed to send both admin and customer emails");
    }

    if (!adminSuccess) {
      console.warn("Failed to send admin notification email:", 
        adminResult.status === 'rejected' ? adminResult.reason : adminResult.value.error);
    }

    if (!customerSuccess) {
      console.warn("Failed to send customer confirmation email:", 
        customerResult.status === 'rejected' ? customerResult.reason : customerResult.value.error);
    }

    return {
      success: true,
      emailIds: {
        admin: adminSuccess ? adminResult.value.data?.id : undefined,
        customer: customerSuccess ? customerResult.value.data?.id : undefined
      }
    };

  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error"
    };
  }
}

// New functions for Smart Walls email content generation
export function generateSmartWallsEmailContent(smartWallsData: any): string {
  const { dimensions, selectedStyle, accessories, smartDevices, gamingSystem } = smartWallsData;
  
  // Format accessories list
  const accessoryList = accessories ? Object.entries(accessories)
    .filter(([key, value]) => value)
    .map(([key, value]) => {
      const labels = {
        tv: 'TV Integration',
        fireplace: 'Fireplace',
        soundbar: 'Soundbar',
        shelving: 'Shelving'
      };
      return labels[key] || key;
    }) : [];

  // Format smart devices list
  const devicesList = smartDevices?.selectedDevices || [];
  
  // Format gaming system
  const gamingSystemText = gamingSystem?.type ? 
    `${gamingSystem.type}${gamingSystem.specifications ? ` - ${gamingSystem.specifications}` : ''}` : 
    'None selected';

  return `
    <div class="section">
      <h3 class="section-title">
        <div class="section-icon">SW</div>
        Smart Wall Specifications
      </h3>
      
      ${dimensions ? `
      <div class="field-row">
        <div class="field-label">Dimensions (W×H)</div>
        <div class="field-value">${dimensions.width}m × ${dimensions.height}m</div>
      </div>
      <div class="field-row">
        <div class="field-label">Depth</div>
        <div class="field-value">${dimensions.depth}${dimensions.customDepth ? ` (${dimensions.customDepth}mm)` : ''}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Calculated Max Width</div>
        <div class="field-value">${dimensions.calculatedMaxWidth?.toFixed(2) || 'Not calculated'}m</div>
      </div>
      ${dimensions.warnings && dimensions.warnings.length > 0 ? `
      <div class="field-row">
        <div class="field-label">Warnings</div>
        <div class="field-value" style="color: #dc2626;">${dimensions.warnings.join(', ')}</div>
      </div>
      ` : ''}
      ` : ''}
      
      ${selectedStyle ? `
      <div class="field-row">
        <div class="field-label">Selected Style</div>
        <div class="field-value">${selectedStyle.category} - ${selectedStyle.finish}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Style Description</div>
        <div class="field-value">${selectedStyle.finishDescription}</div>
      </div>
      ` : ''}
      
      ${accessoryList.length > 0 ? `
      <div class="field-row">
        <div class="field-label">Accessories</div>
        <div class="field-value">${accessoryList.join(', ')}</div>
      </div>
      ` : ''}
      
      ${devicesList.length > 0 ? `
      <div class="field-row">
        <div class="field-label">Smart Devices</div>
        <div class="field-value">
          ${devicesList.map(device => `${device.name} (${device.category})`).join(', ')}
        </div>
      </div>
      ` : ''}
      
      <div class="field-row">
        <div class="field-label">Gaming System</div>
        <div class="field-value">${gamingSystemText}</div>
      </div>
    </div>
  `;
}

export function generateSmartWallsTextContent(smartWallsData: any): string {
  const { dimensions, selectedStyle, accessories, smartDevices, gamingSystem } = smartWallsData;
  
  let content = '\nSMART WALL SPECIFICATIONS:\n';
  
  if (dimensions) {
    content += `Dimensions: ${dimensions.width}m × ${dimensions.height}m\n`;
    content += `Depth: ${dimensions.depth}${dimensions.customDepth ? ` (${dimensions.customDepth}mm)` : ''}\n`;
    content += `Calculated Max Width: ${dimensions.calculatedMaxWidth?.toFixed(2) || 'Not calculated'}m\n`;
    
    if (dimensions.warnings && dimensions.warnings.length > 0) {
      content += `Warnings: ${dimensions.warnings.join(', ')}\n`;
    }
  }
  
  if (selectedStyle) {
    content += `Selected Style: ${selectedStyle.category} - ${selectedStyle.finish}\n`;
    content += `Style Description: ${selectedStyle.finishDescription}\n`;
  }
  
  const accessoryList = accessories ? Object.entries(accessories)
    .filter(([key, value]) => value)
    .map(([key, value]) => {
      const labels = {
        tv: 'TV Integration',
        fireplace: 'Fireplace',
        soundbar: 'Soundbar',
        shelving: 'Shelving'
      };
      return labels[key] || key;
    }) : [];
    
  if (accessoryList.length > 0) {
    content += `Accessories: ${accessoryList.join(', ')}\n`;
  }
  
  const devicesList = smartDevices?.selectedDevices || [];
  if (devicesList.length > 0) {
    content += `Smart Devices: ${devicesList.map(device => `${device.name} (${device.category})`).join(', ')}\n`;
  }
  
  const gamingSystemText = gamingSystem?.type ? 
    `${gamingSystem.type}${gamingSystem.specifications ? ` - ${gamingSystem.specifications}` : ''}` : 
    'None selected';
  content += `Gaming System: ${gamingSystemText}\n`;
  
  return content;
}

