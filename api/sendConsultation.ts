import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

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
const RATE_LIMIT_MAX_REQUESTS = 2;
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/* ===============
   DOMAIN MODELS
   =============== */
export interface ConsultationData {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message?: string;
  preferredContactMethod: 'email' | 'phone';
  hearAboutUs?: string;
  submittedAt: string;
  source?: string;
  ipAddress?: string;
  userAgent?: string;
}

interface ValidationResult {
  isValid: boolean;
  data?: ConsultationData;
  errors?: Record<string, string>;
}

interface EmailResults {
  success: boolean;
  error?: string;
  consultationId: string;
  emailIds?: {
    admin?: string;
    customer?: string;
  };
}

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
      message: "This endpoint only accepts POST requests for consultation submissions.",
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
        message: "Too many consultation submissions. Please wait before submitting another request.",
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
        message: "Consultation submission service is temporarily unavailable. Please try again later or contact us directly.",
        contact: { phone: "+44 141 739 3377", email: "stephen@thewallshop.co.uk" },
      });
    }

    // Parse and validate
    const body = await parseRequestBody(req);
    const validation = validateConsultationData(body);
    if (!validation.isValid || !validation.data) {
      return res.status(400).json({
        error: "Consultation Validation Failed",
        message: "Please review and correct the highlighted fields before resubmitting your consultation request.",
        fields: validation.errors || {},
        timestamp: new Date().toISOString(),
      });
    }

    const data = validation.data;
    
    // Generate consultation-specific email content
    const consultationId = generateConsultationId();
    const adminHtml = generateAdminConsultationEmailHtml(data, consultationId);
    const adminText = generateAdminConsultationEmailText(data, consultationId);
    const customerHtml = generateCustomerConsultationEmailHtml(data, consultationId);
    const customerText = generateCustomerConsultationEmailText(data, consultationId);

    // Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send emails
    const emailResults = await sendConsultationEmails(resend, data, {
      adminHtml,
      adminText,
      customerHtml,
      customerText
    }, consultationId);
    
    if (!emailResults.success) throw new Error(emailResults.error || "Failed to process consultation submission");

    // SUCCESS response
    return res.status(200).json({
      success: true,
      message: "Consultation request submitted successfully! Our team will contact you soon to discuss your project.",
      referenceId: emailResults.consultationId,
      consultationId: emailResults.consultationId,
      details: {
        consultationId: emailResults.consultationId,
        submittedAt: new Date().toISOString(),
        priority: getConsultationPriority(data.timeline),
        estimatedResponse: getConsultationResponseTimeEstimate(data.timeline),
        nextSteps: [
          "Initial consultation review and project assessment",
          "Contact via your preferred method within 24-48 hours",
          "Detailed discussion of your requirements and vision",
          "Custom proposal preparation with design concepts",
        ],
        contact: {
          phone: "+44 141 739 3377",
          email: "stephen@thewallshop.co.uk",
          hours: "Monday - Friday, 9:00 AM - 6:00 PM GMT",
          emergency: "stephen@thewallshop.co.uk",
        },
      },
      tracking: {
        emailIds: emailResults.emailIds,
        referenceId: emailResults.consultationId,
        trackingEnabled: true
      },
    });
  } catch (error) {
    console.error("Consultation Submission Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      userAgent: req.headers["user-agent"],
      origin: req.headers.origin,
      ip: getClientIP(req),
    });

    return res.status(500).json({
      error: "Consultation Processing Error",
      message:
        "We're experiencing technical difficulties processing your consultation request. Please try again or contact us directly.",
      details: {
        timestamp: new Date().toISOString(),
        supportContact: {
          phone: "+44 141 739 3377",
          email: "stephen@thewallshop.co.uk",
          emergencyEmail: "stephen@thewallshop.co.uk",
        },
        alternativeOptions: [
          "Call us directly for immediate assistance",
          "Email your requirements to stephen@thewallshop.co.uk",
          "Use our comprehensive consultation form on the website",
          "Schedule a consultation via our contact page",
        ],
      },
    });
  }
}

/* ===============================
   HELPER FUNCTIONS
   =============================== */

function getClientIP(req: VercelRequest): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    (req.headers["x-real-ip"] as string) ||
    req.connection?.remoteAddress ||
    "unknown"
  );
}

function checkRateLimit(clientIP: string): { allowed: boolean; resetTime: number } {
  const now = Date.now();
  const existing = rateLimitMap.get(clientIP);

  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, resetTime: now + RATE_LIMIT_WINDOW };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: existing.resetTime };
  }

  existing.count++;
  return { allowed: true, resetTime: existing.resetTime };
}

async function parseRequestBody(req: VercelRequest): Promise<any> {
  if (req.body) return req.body;
  
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON in request body"));
      }
    });
    req.on("error", reject);
  });
}

function validateConsultationData(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Required fields validation
  if (!data.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.fullName.trim())) {
    errors.fullName = 'Full name contains invalid characters';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email address format';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, '');
    // Accept either E.164 (+44...) OR local 0-prefixed (07...)
    const e164 = /^\+[1-9]\d{9,14}$/; // + followed by 10-15 digits total, first non-zero
    const local = /^0\d{9,14}$/;       // 0 followed by 9-14 digits (10-15 total)

    if (!(e164.test(cleanPhone) || local.test(cleanPhone))) {
      errors.phone = 'Invalid phone number format';
    }
  }

  if (!data.projectType) {
    errors.projectType = 'Project type is required';
  }

  if (!data.budget) {
    errors.budget = 'Budget range is required';
  }

  if (!data.timeline) {
    errors.timeline = 'Project timeline is required';
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  // Create validated data object
  const validatedData: ConsultationData = {
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    company: data.company?.trim() || undefined,
    projectType: data.projectType,
    budget: data.budget,
    timeline: data.timeline,
    message: data.message?.trim() || undefined,
    preferredContactMethod: data.preferredContactMethod || 'email',
    hearAboutUs: data.hearAboutUs || undefined,
    submittedAt: new Date().toISOString(),
    source: data.source || 'Consultation Modal',
    ipAddress: data.ipAddress,
    userAgent: data.userAgent,
  };

  return { isValid: true, data: validatedData };
}

function generateConsultationId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CONS-${timestamp}-${random}`.toUpperCase();
}

function getConsultationPriority(timeline: string): string {
  if (timeline === 'asap') return 'URGENT';
  if (timeline.includes('1-3')) return 'HIGH';
  return 'STANDARD';
}

function getConsultationResponseTimeEstimate(timeline: string): string {
  if (timeline === 'asap') return 'Within 4-8 hours';
  if (timeline.includes('1-3')) return 'Within 24 hours';
  return 'Within 48 hours';
}

async function sendConsultationEmails(
  resend: Resend,
  data: ConsultationData,
  content: { adminHtml: string; adminText: string; customerHtml: string; customerText: string },
  consultationId: string
): Promise<EmailResults> {
  try {
    const emailIds: { admin?: string; customer?: string } = {};

    // Send admin notification
    const adminResult = await resend.emails.send({
      from: "The Wall Shop Consultations <consultations@thewallshop.co.uk>",
      to: ["stephen@thewallshop.co.uk"],
      subject: `New Consultation Request - ${data.fullName} (${getProjectTypeDisplay(data.projectType)})`,
      html: content.adminHtml,
      text: content.adminText,
      replyTo: data.email,
    });

    if (adminResult.error) {
      throw new Error(`Admin email failed: ${adminResult.error.message}`);
    }
    emailIds.admin = adminResult.data?.id;

    // Send customer confirmation
    const customerResult = await resend.emails.send({
      from: "The Wall Shop <noreply@thewallshop.co.uk>",
      to: [data.email],
      subject: "Consultation Request Received - The Wall Shop",
      html: content.customerHtml,
      text: content.customerText,
      replyTo: "stephen@thewallshop.co.uk",
    });

    if (customerResult.error) {
      console.warn("Customer email failed:", customerResult.error);
      // Don't fail the entire request if customer email fails
    } else {
      emailIds.customer = customerResult.data?.id;
    }

    return {
      success: true,
      consultationId,
      emailIds,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
      consultationId,
    };
  }
}

/* ===============================
   EMAIL CONTENT GENERATORS
   =============================== */

function getProjectTypeDisplay(type: string): string {
  const types: Record<string, string> = {
    'smart-walls': 'Smart Interactive Walls',
    'luxury-wallpapers': 'Premium Luxury Wallpapers',
    'acoustic-panels': 'Acoustic Sound Panels',
    'carbon-rock-boards': 'Carbon Rock Boards',
    'digital-displays': 'Digital Display Solutions',
    'full-renovation': 'Complete Wall Renovation',
    'consultation-only': 'Design Consultation Only',
    'other': 'Other (See message for details)'
  };
  return types[type] || type;
}

function getBudgetDisplay(budget: string): string {
  const budgets: Record<string, string> = {
    'under-5k': 'Under £5,000',
    '5k-15k': '£5,000 - £15,000',
    '15k-30k': '£15,000 - £30,000',
    '30k-50k': '£30,000 - £50,000',
    '50k-100k': '£50,000 - £100,000',
    'over-100k': 'Over £100,000',
    'consultation-first': 'Consultation First'
  };
  return budgets[budget] || budget;
}

function getTimelineDisplay(timeline: string): string {
  const timelines: Record<string, string> = {
    'asap': 'As Soon As Possible',
    '1-3-months': '1-3 Months',
    '3-6-months': '3-6 Months',
    '6-12-months': '6-12 Months',
    'over-12-months': 'Over 12 Months',
    'flexible': 'Flexible Timeline',
    'planning-phase': 'Still in Planning Phase'
  };
  return timelines[timeline] || timeline;
}

function getHearAboutUsDisplay(source: string): string {
  const sources: Record<string, string> = {
    'google-search': 'Google Search',
    'social-media': 'Social Media',
    'referral': 'Referral from Friend/Colleague',
    'website': 'Company Website',
    'trade-show': 'Trade Show/Exhibition',
    'advertisement': 'Advertisement',
    'other': 'Other'
  };
  return sources[source] || source;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

function generateAdminConsultationEmailHtml(data: ConsultationData, consultationId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Consultation Request</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px;
        }
        .priority-badge {
            display: inline-block;
            background: linear-gradient(135deg, #dc2626, #ef4444);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .info-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
        }
        .info-card h3 {
            margin: 0 0 15px 0;
            color: #1e293b;
            font-size: 18px;
            font-weight: 600;
        }
        .info-item {
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .info-item:last-child {
            margin-bottom: 0;
        }
        .info-label {
            font-weight: 600;
            color: #475569;
            min-width: 120px;
            margin-right: 15px;
        }
        .info-value {
            color: #1e293b;
            flex: 1;
            text-align: right;
        }
        .message-section {
            background: #fefce8;
            border: 1px solid #fde047;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .message-section h3 {
            margin: 0 0 15px 0;
            color: #a16207;
            font-size: 18px;
            font-weight: 600;
        }
        .message-content {
            color: #713f12;
            white-space: pre-wrap;
            font-size: 15px;
            line-height: 1.6;
        }
        .urgency-high {
            background: linear-gradient(135deg, #dc2626, #ef4444);
        }
        .urgency-medium {
            background: linear-gradient(135deg, #ea580c, #f97316);
        }
        .urgency-low {
            background: linear-gradient(135deg, #059669, #10b981);
        }
        .contact-actions {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
            text-align: center;
        }
        .contact-actions h3 {
            margin: 0 0 15px 0;
            color: #1e293b;
        }
        .action-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .action-btn {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s;
        }
        .btn-email {
            background: #3b82f6;
            color: white;
        }
        .btn-phone {
            background: #10b981;
            color: white;
        }
        .metadata {
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            padding: 20px 30px;
            font-size: 13px;
            color: #64748b;
        }
        .metadata-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .content {
                padding: 20px;
            }
            .info-grid {
                grid-template-columns: 1fr;
            }
            .action-buttons {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Consultation Request</h1>
            <p>A potential client has submitted a consultation request</p>
        </div>
        
        <div class="content">
            <div class="priority-badge ${data.timeline === 'asap' ? 'urgency-high' : data.timeline.includes('1-3') ? 'urgency-medium' : 'urgency-low'}">
                ${data.timeline === 'asap' ? 'URGENT REQUEST' : data.timeline.includes('1-3') ? 'HIGH PRIORITY' : 'STANDARD PRIORITY'}
            </div>
            
            <div class="info-grid">
                <div class="info-card">
                    <h3>Contact Information</h3>
                    <div class="info-item">
                        <span class="info-label">Name:</span>
                        <span class="info-value"><strong>${data.fullName}</strong></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value"><a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Phone:</span>
                        <span class="info-value"><a href="tel:${data.phone}" style="color: #10b981;">${data.phone}</a></span>
                    </div>
                    ${data.company ? `
                    <div class="info-item">
                        <span class="info-label">Company:</span>
                        <span class="info-value"><strong>${data.company}</strong></span>
                    </div>
                    ` : ''}
                    <div class="info-item">
                        <span class="info-label">Preferred Contact:</span>
                        <span class="info-value">
                            ${data.preferredContactMethod === 'email' ? 'Email' : 'Phone'}
                        </span>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3>Project Details</h3>
                    <div class="info-item">
                        <span class="info-label">Project Type:</span>
                        <span class="info-value"><strong>${getProjectTypeDisplay(data.projectType)}</strong></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Budget Range:</span>
                        <span class="info-value"><strong>${getBudgetDisplay(data.budget)}</strong></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Timeline:</span>
                        <span class="info-value"><strong>${getTimelineDisplay(data.timeline)}</strong></span>
                    </div>
                    ${data.hearAboutUs ? `
                    <div class="info-item">
                        <span class="info-label">Heard About Us:</span>
                        <span class="info-value">${getHearAboutUsDisplay(data.hearAboutUs)}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            ${data.message ? `
            <div class="message-section">
                <h3>Project Details & Requirements</h3>
                <div class="message-content">${data.message}</div>
            </div>
            ` : ''}
            
            <div class="contact-actions">
                <h3>Quick Actions</h3>
                <div class="action-buttons">
                    <a href="mailto:${data.email}?subject=Re: Your Consultation Request - The Wall Shop&body=Dear ${data.fullName},%0D%0A%0D%0AThank you for your interest in our ${getProjectTypeDisplay(data.projectType)} services.%0D%0A%0D%0AI'd be delighted to schedule a consultation to discuss your project in detail.%0D%0A%0D%0ABest regards,%0D%0AStephen%0D%0AThe Wall Shop" 
                       class="action-btn btn-email">
                        Reply via Email
                    </a>
                    <a href="tel:${data.phone}" class="action-btn btn-phone">
                        Call ${data.phone}
                    </a>
                </div>
            </div>
        </div>
        
        <div class="metadata">
            <div class="metadata-grid">
                <div><strong>Submitted:</strong> ${formatDate(data.submittedAt)}</div>
                <div><strong>Source:</strong> ${data.source || 'Consultation Modal'}</div>
                <div><strong>Reference:</strong> ${consultationId}</div>
                ${data.ipAddress ? `<div><strong>IP Address:</strong> ${data.ipAddress}</div>` : ''}
                ${data.userAgent ? `<div><strong>User Agent:</strong> ${data.userAgent.substring(0, 50)}...</div>` : ''}
            </div>
        </div>
    </div>
</body>
</html>`;
}

function generateAdminConsultationEmailText(data: ConsultationData, consultationId: string): string {
  return `
NEW CONSULTATION REQUEST - The Wall Shop

CONTACT INFORMATION:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
${data.company ? `- Company: ${data.company}` : ''}
- Preferred Contact: ${data.preferredContactMethod === 'email' ? 'Email' : 'Phone'}

PROJECT DETAILS:
- Project Type: ${getProjectTypeDisplay(data.projectType)}
- Budget Range: ${getBudgetDisplay(data.budget)}
- Timeline: ${getTimelineDisplay(data.timeline)}
${data.hearAboutUs ? `- Heard About Us: ${getHearAboutUsDisplay(data.hearAboutUs)}` : ''}

${data.message ? `PROJECT DETAILS & REQUIREMENTS:
${data.message}

` : ''}SUBMISSION DETAILS:
- Submitted: ${formatDate(data.submittedAt)}
- Source: ${data.source || 'Consultation Modal'}
- Reference: ${consultationId}
${data.ipAddress ? `- IP Address: ${data.ipAddress}` : ''}

QUICK ACTIONS:
- Reply to: ${data.email}
- Call: ${data.phone}

Priority Level: ${data.timeline === 'asap' ? 'URGENT' : data.timeline.includes('1-3') ? 'HIGH' : 'STANDARD'}
`;
}

function generateCustomerConsultationEmailHtml(data: ConsultationData, consultationId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultation Request Received</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px;
        }
        .summary-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .summary-card h3 {
            margin: 0 0 15px 0;
            color: #1e293b;
            font-size: 18px;
            font-weight: 600;
        }
        .summary-item {
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
        }
        .summary-label {
            font-weight: 600;
            color: #475569;
        }
        .summary-value {
            color: #1e293b;
        }
        .next-steps {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .next-steps h3 {
            margin: 0 0 15px 0;
            color: #0369a1;
            font-size: 18px;
            font-weight: 600;
        }
        .next-steps ul {
            margin: 0;
            padding-left: 20px;
            color: #0c4a6e;
        }
        .contact-info {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            text-align: center;
        }
        .contact-info h3 {
            margin: 0 0 15px 0;
            color: #1e293b;
        }
        .contact-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .footer {
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            padding: 20px;
            text-align: center;
            font-size: 13px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Consultation Request Received</h1>
            <p>Thank you for your interest in The Wall Shop</p>
        </div>
        
        <div class="content">
            <p>Dear ${data.fullName},</p>
            
            <p>Thank you for submitting your consultation request. We've received your inquiry about <strong>${getProjectTypeDisplay(data.projectType)}</strong> and are excited to help bring your vision to life.</p>
            
            <div class="summary-card">
                <h3>Your Consultation Request Summary</h3>
                <div class="summary-item">
                    <span class="summary-label">Project Type:</span>
                    <span class="summary-value">${getProjectTypeDisplay(data.projectType)}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Budget Range:</span>
                    <span class="summary-value">${getBudgetDisplay(data.budget)}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Timeline:</span>
                    <span class="summary-value">${getTimelineDisplay(data.timeline)}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Preferred Contact:</span>
                    <span class="summary-value">${data.preferredContactMethod === 'email' ? 'Email' : 'Phone'}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Reference ID:</span>
                    <span class="summary-value">${consultationId}</span>
                </div>
            </div>
            
            <div class="next-steps">
                <h3>What Happens Next?</h3>
                <ul>
                    <li>Our team will review your consultation request within the next few hours</li>
                    <li>We'll contact you via your preferred method (${data.preferredContactMethod}) within ${getConsultationResponseTimeEstimate(data.timeline)}</li>
                    <li>We'll discuss your project requirements and vision in detail</li>
                    <li>We'll prepare a custom proposal with design concepts and pricing</li>
                </ul>
            </div>
            
            <p>In the meantime, feel free to browse our portfolio and case studies on our website to get inspired by our previous projects.</p>
            
            <div class="contact-info">
                <h3>Need to reach us sooner?</h3>
                <p>If you have any urgent questions or need to modify your request, don't hesitate to contact us directly:</p>
                <div class="contact-details">
                    <div>
                        <strong>Phone:</strong><br>
                        <a href="tel:+441417393377" style="color: #3b82f6;">+44 141 739 3377</a>
                    </div>
                    <div>
                        <strong>Email:</strong><br>
                        <a href="mailto:stephen@thewallshop.co.uk" style="color: #3b82f6;">stephen@thewallshop.co.uk</a>
                    </div>
                </div>
                <p style="margin-top: 15px; font-size: 14px; color: #64748b;">
                    Business Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT
                </p>
            </div>
            
            <p>Thank you for choosing The Wall Shop. We look forward to working with you!</p>
            
            <p>Best regards,<br>
            <strong>The Wall Shop Team</strong></p>
        </div>
        
        <div class="footer">
            <p>This is an automated confirmation email. Please save your reference ID: <strong>${consultationId}</strong></p>
            <p>© ${new Date().getFullYear()} The Wall Shop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
}

function generateCustomerConsultationEmailText(data: ConsultationData, consultationId: string): string {
  return `
CONSULTATION REQUEST RECEIVED - The Wall Shop

Dear ${data.fullName},

Thank you for submitting your consultation request. We've received your inquiry about ${getProjectTypeDisplay(data.projectType)} and are excited to help bring your vision to life.

YOUR CONSULTATION REQUEST SUMMARY:
- Project Type: ${getProjectTypeDisplay(data.projectType)}
- Budget Range: ${getBudgetDisplay(data.budget)}
- Timeline: ${getTimelineDisplay(data.timeline)}
- Preferred Contact: ${data.preferredContactMethod === 'email' ? 'Email' : 'Phone'}
- Reference ID: ${consultationId}

WHAT HAPPENS NEXT?
1. Our team will review your consultation request within the next few hours
2. We'll contact you via your preferred method (${data.preferredContactMethod}) within ${getConsultationResponseTimeEstimate(data.timeline)}
3. We'll discuss your project requirements and vision in detail
4. We'll prepare a custom proposal with design concepts and pricing

In the meantime, feel free to browse our portfolio and case studies on our website to get inspired by our previous projects.

NEED TO REACH US SOONER?
If you have any urgent questions or need to modify your request, don't hesitate to contact us directly:

Phone: +44 141 739 3377
Email: stephen@thewallshop.co.uk
Business Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT

Thank you for choosing The Wall Shop. We look forward to working with you!

Best regards,
The Wall Shop Team

---
This is an automated confirmation email. Please save your reference ID: ${consultationId}
© ${new Date().getFullYear()} The Wall Shop. All rights reserved.
`;
}