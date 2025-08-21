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
    
    // Generate route-specific email content
    const content = generateRouteSpecificEmailContent(data, analysis);

    // Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send emails
    const emailResults = await sendQuoteModalEmails(resend, data, content, analysis);
    if (!emailResults.success) throw new Error(emailResults.error || "Failed to process quote modal submission");

    // SUCCESS response
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
   ROUTE-SPECIFIC EMAIL GENERATION
   =============================== */

/**
 * Generate route-specific email content based on the entry point
 */
function generateRouteSpecificEmailContent(
  data: QuoteModalData,
  analysis: QuoteModalAnalysis
): EmailContent {
  const quoteId = generateQuoteModalId();
  
  // Generate route-specific content based on entry point
  let productSpecificContent = '';
  let customerProductContent = '';
  
  switch (data.entryPoint) {
    case 'smart-walls':
      if (data.smartWalls) {
        productSpecificContent = generateSmartWallsContent(data.smartWalls);
        customerProductContent = generateCustomerSmartWallsContent(data.smartWalls);
      }
      break;
    case 'smart-devices':
      if (data.smartDevices) {
        productSpecificContent = generateSmartDevicesContent(data.smartDevices);
        customerProductContent = generateCustomerSmartDevicesContent(data.smartDevices);
      }
      break;
    case 'wall-panels':
      if (data.wallPanels) {
        productSpecificContent = generateWallPanelsContent(data.wallPanels);
        customerProductContent = generateCustomerWallPanelsContent(data.wallPanels);
      }
      break;
    case 'carbon-rock-boards':
      if (data.carbonRockBoards) {
        productSpecificContent = generateCarbonRockBoardsContent(data.carbonRockBoards);
        customerProductContent = generateCustomerCarbonRockBoardsContent(data.carbonRockBoards);
      }
      break;
    default:
      productSpecificContent = '<p>General inquiry - no specific product data provided.</p>';
      customerProductContent = '<p>Thank you for your general inquiry. Our team will contact you to discuss your requirements.</p>';
  }

  // Generate admin email
  const adminHtml = generateAdminEmailHtml(data, analysis, productSpecificContent, quoteId);
  const adminText = generateAdminEmailText(data, analysis, quoteId);

  // Generate customer email
  const customerHtml = generateCustomerEmailHtml(data, analysis, customerProductContent, quoteId);
  const customerText = generateCustomerEmailText(data, analysis, quoteId);

  return {
    adminHtml,
    adminText,
    customerHtml,
    customerText
  };
}

/* ===============================
   PRODUCT-SPECIFIC CONTENT GENERATORS
   =============================== */

function generateSmartWallsContent(smartWalls: any): string {
  return `
    <h3 style="color: #2C3E50; margin: 20px 0 10px 0;">Smart Walls Configuration</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Dimensions:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${smartWalls.dimensions?.width || 'N/A'}m (W) × ${smartWalls.dimensions?.height || 'N/A'}m (H) × ${smartWalls.dimensions?.depth || 'N/A'}</td>
      </tr>
      ${smartWalls.dimensions?.calculatedMaxWidth ? `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Calculated Max Width:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${smartWalls.dimensions.calculatedMaxWidth.toFixed(2)}m</td>
      </tr>
      ` : ''}
      ${smartWalls.selectedStyle ? `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Selected Style:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${smartWalls.selectedStyle.category} - ${smartWalls.selectedStyle.finish}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Accessories:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${Object.entries(smartWalls.accessories || {}).filter(([, value]) => value).map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)).join(', ') || 'None'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Smart Devices:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${(smartWalls.smartDevices?.selectedDevices || []).map(d => d.name).join(', ') || 'None'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Gaming System:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${smartWalls.gamingSystem?.type || 'None'}</td>
      </tr>
    </table>
  `;
}

function generateSmartDevicesContent(smartDevices: any): string {
  return `
    <h3 style="color: #2C3E50; margin: 20px 0 10px 0;">Smart Devices Configuration</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Control Panels:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${smartDevices.controlPanels ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Security Sensors:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${smartDevices.securitySensors ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Home Automation:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${smartDevices.homeAutomation ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Selected Devices:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${(smartDevices.selectedDevices || []).map(d => d.name).join(', ') || 'None specified'}</td>
      </tr>
    </table>
  `;
}

function generateWallPanelsContent(wallPanels: any): string {
  return `
    <h3 style="color: #2C3E50; margin: 20px 0 10px 0;">Wall Panels Configuration</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Panel Type:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${wallPanels.panelType || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Finish:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${wallPanels.finish || 'N/A'}</td>
      </tr>
      ${wallPanels.dimensions?.area ? `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Area:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${wallPanels.dimensions.area} m²</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Installation:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${wallPanels.installation === 'diy' ? 'DIY' : 'Professional Installation'}</td>
      </tr>
    </table>
  `;
}

function generateCarbonRockBoardsContent(carbonRockBoards: any): string {
  return `
    <h3 style="color: #2C3E50; margin: 20px 0 10px 0;">Carbon Rock Boards Configuration</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Board Type:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${carbonRockBoards.boardType || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Thickness:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${carbonRockBoards.thickness || 'N/A'}</td>
      </tr>
      ${carbonRockBoards.dimensions?.area ? `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Area:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${carbonRockBoards.dimensions.area} m²</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Installation:</td>
        <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${carbonRockBoards.installation === 'diy' ? 'DIY' : 'Professional Installation'}</td>
      </tr>
    </table>
  `;
}

/* ===============================
   CUSTOMER-FACING CONTENT GENERATORS
   =============================== */

function generateCustomerSmartWallsContent(smartWalls: any): string {
  return `
    <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #2C3E50; margin: 0 0 15px 0;">Your Smart Walls Configuration</h3>
      <p style="margin: 0 0 10px 0;"><strong>Dimensions:</strong> ${smartWalls.dimensions?.width || 'N/A'}m × ${smartWalls.dimensions?.height || 'N/A'}m × ${smartWalls.dimensions?.depth || 'N/A'}</p>
      ${smartWalls.selectedStyle ? `<p style="margin: 0 0 10px 0;"><strong>Style:</strong> ${smartWalls.selectedStyle.category} - ${smartWalls.selectedStyle.finish}</p>` : ''}
      <p style="margin: 0 0 10px 0;"><strong>Accessories:</strong> ${Object.entries(smartWalls.accessories || {}).filter(([, value]) => value).map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)).join(', ') || 'None'}</p>
      <p style="margin: 0;"><strong>Smart Features:</strong> ${(smartWalls.smartDevices?.selectedDevices || []).map(d => d.name).join(', ') || 'None'}</p>
    </div>
  `;
}

function generateCustomerSmartDevicesContent(smartDevices: any): string {
  return `
    <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #2C3E50; margin: 0 0 15px 0;">Your Smart Devices Configuration</h3>
      <p style="margin: 0 0 10px 0;"><strong>Control Panels:</strong> ${smartDevices.controlPanels ? 'Included' : 'Not included'}</p>
      <p style="margin: 0 0 10px 0;"><strong>Security Sensors:</strong> ${smartDevices.securitySensors ? 'Included' : 'Not included'}</p>
      <p style="margin: 0 0 10px 0;"><strong>Home Automation:</strong> ${smartDevices.homeAutomation ? 'Included' : 'Not included'}</p>
      <p style="margin: 0;"><strong>Selected Devices:</strong> ${(smartDevices.selectedDevices || []).map(d => d.name).join(', ') || 'To be discussed'}</p>
    </div>
  `;
}

function generateCustomerWallPanelsContent(wallPanels: any): string {
  return `
    <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #2C3E50; margin: 0 0 15px 0;">Your Wall Panels Configuration</h3>
      <p style="margin: 0 0 10px 0;"><strong>Panel Type:</strong> ${wallPanels.panelType || 'To be discussed'}</p>
      <p style="margin: 0 0 10px 0;"><strong>Finish:</strong> ${wallPanels.finish || 'To be discussed'}</p>
      ${wallPanels.dimensions?.area ? `<p style="margin: 0 0 10px 0;"><strong>Area:</strong> ${wallPanels.dimensions.area} m²</p>` : ''}
      <p style="margin: 0;"><strong>Installation:</strong> ${wallPanels.installation === 'diy' ? 'DIY (Supply only)' : 'Professional Installation'}</p>
    </div>
  `;
}

function generateCustomerCarbonRockBoardsContent(carbonRockBoards: any): string {
  return `
    <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #2C3E50; margin: 0 0 15px 0;">Your Carbon Rock Boards Configuration</h3>
      <p style="margin: 0 0 10px 0;"><strong>Board Type:</strong> ${carbonRockBoards.boardType || 'To be discussed'}</p>
      <p style="margin: 0 0 10px 0;"><strong>Thickness:</strong> ${carbonRockBoards.thickness || 'To be discussed'}</p>
      ${carbonRockBoards.dimensions?.area ? `<p style="margin: 0 0 10px 0;"><strong>Area:</strong> ${carbonRockBoards.dimensions.area} m²</p>` : ''}
      <p style="margin: 0;"><strong>Installation:</strong> ${carbonRockBoards.installation === 'diy' ? 'DIY (Supply only)' : 'Professional Installation'}</p>
    </div>
  `;
}

/* ===============================
   EMAIL HTML GENERATORS
   =============================== */

function generateAdminEmailHtml(data: QuoteModalData, analysis: QuoteModalAnalysis, productContent: string, quoteId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request - ${quoteId}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F3F4F6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%); padding: 30px 20px; text-align: center;">
      <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: bold;">New Quote Request</h1>
      <p style="color: #E5E7EB; margin: 10px 0 0 0; font-size: 16px;">Reference: ${quoteId}</p>
    </div>

    <!-- Content -->
    <div style="padding: 30px 20px;">
      <!-- Priority Alert -->
      <div style="background-color: ${analysis.priority === 'premium' ? '#FEF3C7' : analysis.priority === 'urgent' ? '#FEE2E2' : '#F0FDF4'}; 
                  border-left: 4px solid ${analysis.priority === 'premium' ? '#F59E0B' : analysis.priority === 'urgent' ? '#EF4444' : '#10B981'}; 
                  padding: 15px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 5px 0; color: #1F2937; font-size: 16px;">Priority: ${analysis.priority.toUpperCase()}</h3>
        <p style="margin: 0; color: #4B5563; font-size: 14px;">Estimated Value: £${analysis.estimatedValue.toLocaleString()}</p>
      </div>

      <!-- Customer Information -->
      <h2 style="color: #2C3E50; margin: 0 0 15px 0; font-size: 20px;">Customer Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><a href="mailto:${data.email}" style="color: #1D4ED8;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><a href="tel:${data.phone}" style="color: #1D4ED8;">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Address:</td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.installationAddress || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Entry Point:</td>
          <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.entryPoint.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
        </tr>
      </table>

      ${data.additionalNotes ? `
      <h3 style="color: #2C3E50; margin: 20px 0 10px 0;">Additional Notes</h3>
      <div style="background-color: #F9FAFB; padding: 15px; border-radius: 6px; border-left: 4px solid #6B7280;">
        <p style="margin: 0; color: #374151;">${data.additionalNotes}</p>
      </div>
      ` : ''}

      <!-- Product-specific content -->
      ${productContent}

      <!-- Action Required -->
      <div style="background-color: #EFF6FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1E40AF; margin: 0 0 10px 0;">Action Required</h3>
        <p style="margin: 0 0 10px 0; color: #1F2937;">Please review this quote request and respond within the estimated timeframe.</p>
        <p style="margin: 0; color: #6B7280; font-size: 14px;"><strong>Response Time:</strong> ${getModalResponseTimeEstimate(analysis.priority)}</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
      <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;">The Wall Shop Ltd</p>
      <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 12px;">SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK</p>
      <p style="margin: 0; color: #6B7280; font-size: 12px;">Phone: +44 141 739 3377 | Email: info@thewallshop.co.uk</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateCustomerEmailHtml(data: QuoteModalData, analysis: QuoteModalAnalysis, productContent: string, quoteId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Received - ${quoteId}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F3F4F6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%); padding: 30px 20px; text-align: center;">
      <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: bold;">Quote Request Received</h1>
      <p style="color: #E5E7EB; margin: 10px 0 0 0; font-size: 16px;">Reference: ${quoteId}</p>
    </div>

    <!-- Content -->
    <div style="padding: 30px 20px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Dear ${data.fullName},
      </p>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Thank you for your interest in our ${data.entryPoint.replace('-', ' ')} solutions. We have received your quote request and our team is already reviewing your requirements.
      </p>

      <!-- Product Configuration -->
      ${productContent}

      <!-- Next Steps -->
      <div style="background-color: #EFF6FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1E40AF; margin: 0 0 15px 0;">What Happens Next?</h3>
        <ul style="margin: 0; padding-left: 20px; color: #374151;">
          <li style="margin-bottom: 8px;">Our technical team will review your specifications</li>
          <li style="margin-bottom: 8px;">We'll prepare a detailed proposal with pricing</li>
          <li style="margin-bottom: 8px;">A specialist will contact you to discuss your project</li>
          <li style="margin-bottom: 0;">We'll schedule a consultation if required</li>
        </ul>
      </div>

      <!-- Response Time -->
      <div style="background-color: #F0FDF4; padding: 15px; border-radius: 6px; border-left: 4px solid #10B981; margin: 20px 0;">
        <p style="margin: 0; color: #065F46;"><strong>Expected Response:</strong> ${getModalResponseTimeEstimate(analysis.priority)}</p>
      </div>

      <!-- Contact Information -->
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0;">
        If you have any immediate questions or need to make changes to your request, please don't hesitate to contact us:
      </p>
      
      <div style="background-color: #F9FAFB; padding: 15px; border-radius: 6px;">
        <p style="margin: 0 0 5px 0; color: #374151;"><strong>Phone:</strong> <a href="tel:+441417393377" style="color: #1D4ED8; text-decoration: none;">+44 141 739 3377</a></p>
        <p style="margin: 0 0 5px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:info@thewallshop.co.uk" style="color: #1D4ED8; text-decoration: none;">info@thewallshop.co.uk</a></p>
        <p style="margin: 0; color: #374151;"><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
      </div>

      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
        Best regards,<br>
        <strong>The Wall Shop Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
      <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;"><strong>The Wall Shop Ltd</strong></p>
      <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 12px;">SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK</p>
      <p style="margin: 0 0 20px 0; color: #6B7280; font-size: 12px;">Phone: +44 141 739 3377 | Email: info@thewallshop.co.uk</p>
      
      <!-- Footer Disclaimer -->
      <div style="border-top: 1px solid #E5E7EB; padding-top: 15px; margin-top: 15px;">
        <p style="margin: 0; color: #9CA3AF; font-size: 11px; line-height: 1.4;">
          This email and any files transmitted with it are confidential and intended solely for the use of the individuals or entities to whom they are addressed. If you have received this email in error, please return it to the sender by forwarding it to them and deleting it from your computer. Please note that any views or opinions presented in this email are solely those of the author and do not necessarily represent those of The Wall Shop Ltd. Finally, the recipient should check this email and any attachments for the presence of viruses. The Wall Shop Ltd accepts no liability for any loss or damage caused by any virus transmitted by this email.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/* ===============================
   TEXT EMAIL GENERATORS
   =============================== */

function generateAdminEmailText(data: QuoteModalData, analysis: QuoteModalAnalysis, quoteId: string): string {
  return `
NEW QUOTE REQUEST - ${quoteId}
Priority: ${analysis.priority.toUpperCase()}
Estimated Value: £${analysis.estimatedValue.toLocaleString()}

CUSTOMER INFORMATION:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.installationAddress || 'Not provided'}
Entry Point: ${data.entryPoint.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}

${data.additionalNotes ? `ADDITIONAL NOTES:\n${data.additionalNotes}\n\n` : ''}

ACTION REQUIRED:
Please review this quote request and respond within: ${getModalResponseTimeEstimate(analysis.priority)}

---
The Wall Shop Ltd
SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
Phone: +44 141 739 3377 | Email: info@thewallshop.co.uk
  `;
}

function generateCustomerEmailText(data: QuoteModalData, analysis: QuoteModalAnalysis, quoteId: string): string {
  return `
QUOTE REQUEST RECEIVED - ${quoteId}

Dear ${data.fullName},

Thank you for your interest in our ${data.entryPoint.replace('-', ' ')} solutions. We have received your quote request and our team is already reviewing your requirements.

WHAT HAPPENS NEXT?
- Our technical team will review your specifications
- We'll prepare a detailed proposal with pricing  
- A specialist will contact you to discuss your project
- We'll schedule a consultation if required

EXPECTED RESPONSE: ${getModalResponseTimeEstimate(analysis.priority)}

CONTACT US:
Phone: +44 141 739 3377
Email: info@thewallshop.co.uk
Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT

Best regards,
The Wall Shop Team

---
The Wall Shop Ltd
SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK
Phone: +44 141 739 3377 | Email: info@thewallshop.co.uk

This email and any files transmitted with it are confidential and intended solely for the use of the individuals or entities to whom they are addressed. If you have received this email in error, please return it to the sender by forwarding it to them and deleting it from your computer. Please note that any views or opinions presented in this email are solely those of the author and do not necessarily represent those of The Wall Shop Ltd. Finally, the recipient should check this email and any attachments for the presence of viruses. The Wall Shop Ltd accepts no liability for any loss or damage caused by any virus transmitted by this email.
  `;
}

/* ===============================
   EMAIL SENDING
   =============================== */

async function sendQuoteModalEmails(
  resend: Resend,
  data: QuoteModalData,
  content: EmailContent,
  analysis: QuoteModalAnalysis
): Promise<EmailResults> {
  const quoteId = generateQuoteModalId();

  try {
    const [adminResult, customerResult] = await Promise.allSettled([
      // Admin email
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
          "X-Wall-Shop-System": "route-specific-v1"
        },
        tags: [
          { name: "type", value: "quote-admin" },
          { name: "priority", value: analysis.priority },
          { name: "entry-point", value: data.entryPoint }
        ]
      }),
      // Customer email with CC
      resend.emails.send({
        from: "The Wall Shop <quotes@thewallshop.co.uk>",
        to: [data.email],
        cc: [data.email], // CC the submitter to keep them in the loop
        subject: `Your Quote Request Received — ${quoteId} | The Wall Shop`,
        html: content.customerHtml,
        text: content.customerText,
        headers: {
          "X-Quote-ID": quoteId,
          "X-Entry-Point": data.entryPoint,
          "X-Wall-Shop-System": "route-specific-v1"
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
      throw new Error("Invalid JSON in request body");
    }
  }
  return req.body || {};
}

function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>]/g, "");
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
export { ModalQuotePriority };

