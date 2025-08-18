// api/sendQuote.ts — Enhanced Professional Quote Modal Handler (Consolidated & Fixed)
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

interface QuoteModalData {
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

interface QuoteModalAnalysis {
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
  // Security
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

    // Env check
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return res.status(500).json({
        error: "Service Configuration Error",
        message: "Quote submission service is temporarily unavailable. Please try again later or contact us directly.",
        contact: { phone: "+44 141 739 3377", email: "quotes@thewallshop.co.uk" },
      });
    }

    // Parse + validate
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
    const content = generateQuoteModalEmailContent(data, analysis);

    // Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send Emails (admin + customer) & return IDs
    const emailResults = await sendQuoteModalEmails(resend, data, content, analysis);
    if (!emailResults.success) throw new Error(emailResults.error || "Failed to process quote modal submission");

    // SUCCESS
    return res.status(200).json({
      success: true,
      message: "Quote request submitted successfully! Our team will prepare your personalized proposal.",
      // Top-level IDs for the modal UI:
      referenceId: emailResults.quoteId,
      quoteId: emailResults.quoteId,
      details: {
        quoteId: emailResults.quoteId,
        submittedAt: new Date().toISOString(),
        priority: analysis.priority,
        estimatedValue: analysis.estimatedValue,
        estimatedResponse: getModalResponseTimeEstimate(analysis.priority),
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
      },
      tracking: {
        emailIds: emailResults.emailIds,
        referenceId: emailResults.quoteId,
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

/* =========================
   UTILITIES / VALIDATION
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

/* ==================
   ANALYSIS & IDs
   ================== */
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

/* =========================
   EMAIL CONTENT (HTML/TXT)
   ========================= */
function generateQuoteModalEmailContent(data: QuoteModalData, analysis: QuoteModalAnalysis): EmailContent {
  const ts = new Date().toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" });
  const entry = data.entryPoint.replace("-", " ").toUpperCase();

  const productSections = buildProductSections(data);

  // ADMIN HTML
  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request - ${escapeHtml(data.fullName)}</title>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;margin:0;padding:20px;background:#f8f9fa}
    .container{max-width:800px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);overflow:hidden}
    .header{background:linear-gradient(135deg,#8B4513 0%,#A0522D 100%);color:#fff;padding:30px;text-align:center}
    .content{padding:30px}
    .section{margin-bottom:25px;padding:20px;background:#f8f9fa;border-radius:8px;border-left:4px solid #8B4513}
    .field{margin-bottom:12px}
    .label{font-weight:600;color:#495057;margin-bottom:4px}
    .value{color:#212529}
    .footer{background:#f8f9fa;padding:20px;text-align:center;color:#6c757d;font-size:14px}
    .badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;background:#e9ecef;color:#495057}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Quote Request</h1>
      <p>Entry Point: ${entry}</p>
      <span class="badge">${analysis.priority.toUpperCase()}</span>
    </div>
    <div class="content">
      <div class="section">
        <h2>Contact Information</h2>
        <div class="field"><div class="label">Name:</div><div class="value">${escapeHtml(data.fullName)}</div></div>
        <div class="field"><div class="label">Email:</div><div class="value">${escapeHtml(data.email)}</div></div>
        <div class="field"><div class="label">Phone:</div><div class="value">${escapeHtml(data.phone)}</div></div>
        ${data.installationAddress ? `<div class="field"><div class="label">Installation Address:</div><div class="value">${escapeHtml(data.installationAddress)}</div></div>` : ""}
        ${data.additionalNotes ? `<div class="field"><div class="label">Additional Notes:</div><div class="value">${escapeHtml(data.additionalNotes)}</div></div>` : ""}
      </div>

      ${productSections}

      <div class="section">
        <h2>Quote Analysis</h2>
        <div class="field"><div class="label">Priority:</div><div class="value">${analysis.priority.toUpperCase()}</div></div>
        <div class="field"><div class="label">Estimated Value:</div><div class="value">£${analysis.estimatedValue.toLocaleString()}</div></div>
        <div class="field"><div class="label">Product Count:</div><div class="value">${analysis.productCount}</div></div>
        <div class="field"><div class="label">Complexity:</div><div class="value">${analysis.complexity}</div></div>
        ${analysis.specialRequirements.length ? `<div class="field"><div class="label">Special Requirements:</div><div class="value">${analysis.specialRequirements.map(escapeHtml).join(", ")}</div></div>` : ""}
      </div>
    </div>
    <div class="footer">
      <p>Submitted: ${ts}</p>
      <p>Response Time Target: ${getModalResponseTimeEstimate(analysis.priority)}</p>
    </div>
  </div>
</body>
</html>`.trim();

  // CUSTOMER HTML
  const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Received - The Wall Shop</title>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;margin:0;padding:20px;background:#f8f9fa}
    .container{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);overflow:hidden}
    .header{background:linear-gradient(135deg,#8B4513 0%,#A0522D 100%);color:#fff;padding:30px;text-align:center}
    .content{padding:30px}
    .section{margin-bottom:20px}
    .footer{background:#f8f9fa;padding:20px;text-align:center;color:#6c757d;font-size:14px}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You, ${escapeHtml(data.fullName)}!</h1>
      <p>Your quote request has been received</p>
    </div>

    <div class="content">
      <div class="section">
        <h2>What happens next?</h2>
        <p>Our expert team will review your requirements and prepare a detailed, personalized quote for you.</p>
        <p><strong>Expected response time:</strong> ${getModalResponseTimeEstimate(analysis.priority)}</p>
      </div>

      <div class="section">
        <h2>Your Request Summary</h2>
        <p><strong>Entry Point:</strong> ${entry}</p>
        <p><strong>Estimated Project Value:</strong> £${analysis.estimatedValue.toLocaleString()}</p>
        ${analysis.specialRequirements.length ? `<p><strong>Special Requirements:</strong> ${analysis.specialRequirements.map(escapeHtml).join(", ")}</p>` : ""}
      </div>

      <div class="section">
        <h2>Need immediate assistance?</h2>
        <p><strong>Phone:</strong> +44 141 739 3377</p>
        <p><strong>Email:</strong> stephen@thewallshop.co.uk</p>
        <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
      </div>
    </div>

    <div class="footer">
      <p>The Wall Shop - Premium Wall Solutions</p>
      <p>This email was sent in response to your quote request on ${ts}</p>
    </div>
  </div>
</body>
</html>`.trim();

  // TEXT
  const adminText = `
New Quote Request - ${data.fullName}
Entry Point: ${entry}
Priority: ${analysis.priority.toUpperCase()}

CONTACT INFORMATION:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
${data.installationAddress ? `Installation Address: ${data.installationAddress}` : ""}
${data.additionalNotes ? `Additional Notes: ${data.additionalNotes}` : ""}

QUOTE ANALYSIS:
Priority: ${analysis.priority.toUpperCase()}
Estimated Value: £${analysis.estimatedValue.toLocaleString()}
Product Count: ${analysis.productCount}
Complexity: ${analysis.complexity}
${analysis.specialRequirements.length ? `Special Requirements: ${analysis.specialRequirements.join(", ")}` : ""}

Submitted: ${ts}
Response Time Target: ${getModalResponseTimeEstimate(analysis.priority)}
  `.trim();

  const customerText = `
Thank You, ${data.fullName}!

Your quote request has been received and our expert team will review your requirements.

Expected response time: ${getModalResponseTimeEstimate(analysis.priority)}

Your Request Summary:
- Entry Point: ${entry}
- Estimated Project Value: £${analysis.estimatedValue.toLocaleString()}
${analysis.specialRequirements.length ? `- Special Requirements: ${analysis.specialRequirements.join(", ")}` : ""}

Need immediate assistance?
Phone: +44 141 739 3377
Email: stephen@thewallshop.co.uk
Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT

The Wall Shop - Premium Wall Solutions
Submitted: ${ts}
  `.trim();

  return { adminHtml, adminText, customerHtml, customerText };
}

function buildProductSections(data: QuoteModalData): string {
  const sections: string[] = [];
  const push = (html: string) => sections.push(html);

  if (data.entryPoint === "home") {
    if (data.smartWalls) push(generateSmartWallsSection(data.smartWalls));
    if (data.smartDevices) push(generateSmartDevicesSection(data.smartDevices));
    if (data.wallPanels) push(generateWallPanelsSection(data.wallPanels));
    if (data.carbonRockBoards) push(generateCarbonRockBoardsSection(data.carbonRockBoards));
  } else {
    switch (data.entryPoint) {
      case "smart-walls":
        if (data.smartWalls) push(generateSmartWallsSection(data.smartWalls));
        break;
      case "smart-devices":
        if (data.smartDevices) push(generateSmartDevicesSection(data.smartDevices));
        break;
      case "wall-panels":
        if (data.wallPanels) push(generateWallPanelsSection(data.wallPanels));
        break;
      case "carbon-rock-boards":
        if (data.carbonRockBoards) push(generateCarbonRockBoardsSection(data.carbonRockBoards));
        break;
    }
  }
  return sections.join("\n\n");
}

function generateSmartWallsSection(smartWalls: any): string {
  return `
    <div class="section">
      <h2>Smart Walls Configuration</h2>
      <div class="field"><div class="label">TV Integration:</div><div class="value">${smartWalls.tvIntegration ? "Yes" : "No"}</div></div>
      <div class="field"><div class="label">Speakers:</div><div class="value">${smartWalls.speakers ? "Yes" : "No"}</div></div>
      <div class="field"><div class="label">Lighting:</div><div class="value">${smartWalls.lighting ? "Yes" : "No"}</div></div>
      ${smartWalls.additionalFeatures?.length ? `<div class="field"><div class="label">Additional Features:</div><div class="value">${smartWalls.additionalFeatures.join(", ")}</div></div>` : ""}
    </div>
  `.trim();
}

function generateSmartDevicesSection(smartDevices: any): string {
  return `
    <div class="section">
      <h2>Smart Devices Configuration</h2>
      <div class="field"><div class="label">Control Panels:</div><div class="value">${smartDevices.controlPanels ? "Yes" : "No"}</div></div>
      <div class="field"><div class="label">Security Sensors:</div><div class="value">${smartDevices.securitySensors ? "Yes" : "No"}</div></div>
      <div class="field"><div class="label">Home Automation:</div><div class="value">${smartDevices.homeAutomation ? "Yes" : "No"}</div></div>
      ${smartDevices.selectedDevices?.length ? `<div class="field"><div class="label">Selected Devices:</div><div class="value">${smartDevices.selectedDevices.map((d: any) => d.name || d).join(", ")}</div></div>` : ""}
    </div>
  `.trim();
}

function generateWallPanelsSection(wallPanels: any): string {
  return `
    <div class="section">
      <h2>Wall Panels Configuration</h2>
      ${wallPanels.panelType ? `<div class="field"><div class="label">Panel Type:</div><div class="value">${wallPanels.panelType}</div></div>` : ""}
      ${wallPanels.finish ? `<div class="field"><div class="label">Finish:</div><div class="value">${wallPanels.finish}</div></div>` : ""}
      ${wallPanels.dimensions?.area ? `<div class="field"><div class="label">Area:</div><div class="value">${wallPanels.dimensions.area} m²</div></div>` : ""}
      ${wallPanels.installation ? `<div class="field"><div class="label">Installation:</div><div class="value">${wallPanels.installation}</div></div>` : ""}
    </div>
  `.trim();
}

function generateCarbonRockBoardsSection(carbonRockBoards: any): string {
  return `
    <div class="section">
      <h2>Carbon Rock Boards Configuration</h2>
      ${carbonRockBoards.boardType ? `<div class="field"><div class="label">Board Type:</div><div class="value">${carbonRockBoards.boardType}</div></div>` : ""}
      ${carbonRockBoards.thickness ? `<div class="field"><div class="label">Thickness:</div><div class="value">${carbonRockBoards.thickness}</div></div>` : ""}
      ${carbonRockBoards.dimensions?.area ? `<div class="field"><div class="label">Area:</div><div class="value">${carbonRockBoards.dimensions.area} m²</div></div>` : ""}
      ${carbonRockBoards.installation ? `<div class="field"><div class="label">Installation:</div><div class="value">${carbonRockBoards.installation}</div></div>` : ""}
    </div>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return String(text || "").replace(/[&<>"'\/]/g, (m) => map[m] || m);
}

/* ===========================
   EMAIL SENDER (RESEND)
   =========================== */
async function sendQuoteModalEmails(
  resend: Resend,
  data: QuoteModalData,
  content: EmailContent,
  analysis: QuoteModalAnalysis
): Promise<EmailResults> {
  const quoteId = generateQuoteModalId();

  try {
    const [adminResult, customerResult] = await Promise.allSettled([
      resend.emails.send({
        from: "The Wall Shop <quotes@thewallshop.co.uk>",
        to: ["stephen@thewallshop.co.uk"],
        subject: `[${analysis.priority.toUpperCase()}] New Quote Request — £${analysis.estimatedValue.toLocaleString()} — ${data.fullName} [${quoteId}]`,
        html: content.adminHtml,
        text: content.adminText,
        headers: {
          "X-Quote-ID": quoteId,
          "X-Entry-Point": data.entryPoint,
          "X-Priority": analysis.priority,
        },
      }),
      resend.emails.send({
        from: "The Wall Shop <quotes@thewallshop.co.uk>",
        to: [data.email],
        subject: `Quote Request Received — ${quoteId} | The Wall Shop`,
        html: content.customerHtml,
        text: content.customerText,
        headers: {
          "X-Quote-ID": quoteId,
          "X-Entry-Point": data.entryPoint,
        },
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
