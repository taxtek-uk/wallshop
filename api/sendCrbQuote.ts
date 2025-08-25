import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from '@vercel/node';

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
export interface CrbQuoteData {
  // Project dimensions
  width: string;
  height: string;
  totalArea: number;
  
  // Board specifications
  thickness: string;
  boardWidth: string;
  boardHeight: string;
  totalBoards: number;
  efficiency: number;
  waste: number;
  
  // Style and finish
  style: string;
  finish: string;
  
  // Installation preference
  installation: string;
  
  // Contact information
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/* ===============
   VALIDATION
   =============== */
function validateCrbQuoteData(data: any): ValidationResult {
  const errors: string[] = [];

  // Required fields validation
  if (!data.width || isNaN(parseFloat(data.width)) || parseFloat(data.width) <= 0) {
    errors.push("Width must be a positive number");
  }
  
  if (!data.height || isNaN(parseFloat(data.height)) || parseFloat(data.height) <= 0) {
    errors.push("Height must be a positive number");
  }
  
  if (!data.thickness) {
    errors.push("Thickness is required");
  }
  
  if (!data.boardWidth) {
    errors.push("Board width is required");
  }
  
  if (!data.boardHeight) {
    errors.push("Board height is required");
  }
  
  if (!data.style) {
    errors.push("Style is required");
  }
  
  if (!data.installation) {
    errors.push("Installation preference is required");
  }
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email address is required");
  }
  
  if (!data.phone || data.phone.trim().length < 10) {
    errors.push("Valid phone number is required");
  }
  
  if (!data.location || data.location.trim().length < 3) {
    errors.push("Project location is required");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/* ===============
   RATE LIMITING
   =============== */
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  clientData.count++;
  return true;
}

/* ===============
   EMAIL TEMPLATE
   =============== */
function generateCrbQuoteEmailTemplate(data: CrbQuoteData): string {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carbon Rock Boards Quote Request</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
            margin: 20px;
        }
        .header {
            background: linear-gradient(135deg, #f43f5e 0%, #be185d 50%, #831843 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(244, 63, 94, 0.9) 0%, rgba(190, 24, 93, 0.9) 50%, rgba(131, 24, 67, 0.9) 100%);
        }
        .header-content {
            position: relative;
            z-index: 1;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.95;
            font-size: 16px;
            font-weight: 400;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #f43f5e;
        }
        .section h3 {
            margin: 0 0 15px 0;
            color: #831843;
            font-size: 18px;
            font-weight: 600;
        }
        .detail-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        .detail-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #e9ecef;
            vertical-align: top;
        }
        .detail-table td:first-child {
            font-weight: 500;
            color: #6c757d;
            width: 40%;
        }
        .detail-table td:last-child {
            font-weight: 600;
            color: #2c3e50;
        }
        .highlight-box {
            background: linear-gradient(135deg, #f43f5e 0%, #be185d 50%, #831843 100%);
            color: white;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 25px 0;
            box-shadow: 0 4px 15px rgba(244, 63, 94, 0.3);
        }
        .highlight-box h4 {
            margin: 0 0 10px 0;
            font-size: 20px;
            font-weight: 600;
        }
        .contact-info {
            background: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .contact-info h4 {
            margin: 0 0 20px 0;
            font-size: 20px;
            font-weight: 600;
        }
        .contact-details {
            display: table;
            width: 100%;
            margin-bottom: 20px;
        }
        .contact-row {
            display: table-row;
        }
        .contact-item {
            display: table-cell;
            text-align: center;
            padding: 10px;
            vertical-align: top;
        }
        .contact-item strong {
            display: block;
            margin-bottom: 8px;
            color: #f43f5e;
            font-weight: 600;
        }
        .company-signature {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #495057;
            font-size: 14px;
            line-height: 1.5;
        }
        .disclaimer {
            background: #f8f9fa;
            color: #6c757d;
            padding: 20px;
            font-size: 12px;
            line-height: 1.4;
            border-top: 1px solid #dee2e6;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            .header, .content, .contact-info {
                padding: 20px;
            }
            .contact-details {
                display: block;
            }
            .contact-item {
                display: block;
                margin-bottom: 15px;
            }
            .detail-table td {
                padding: 8px 10px;
            }
        }
    </style>
</head>
<body style="margin:0; padding:0; background:#f7f7f7; font-family:Arial, Helvetica, sans-serif; color:#333; line-height:1.6;">
  <div class="container" style="max-width:700px; margin:30px auto; background:#fff; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden;">

    <!-- Header -->
    <div class="header" style="background:linear-gradient(135deg,#f43f5e,#be185d,#831843); padding:30px; text-align:center; color:#fff;">
      <h1 style="margin:0; font-size:26px;">Carbon Rock Boards Quote Request</h1>
      <p style="margin:5px 0 0; font-size:15px;">Professional Wall Solutions by The Wall Shop</p>
    </div>

    <!-- Content -->
    <div class="content" style="padding:30px;">
      <p>Dear Team,</p>
      <p>We have received a new <strong>Carbon Rock Boards</strong> quote request. Please find the complete details below:</p>

      <!-- Section -->
      <div class="section" style="margin:25px 0;">
        <h3 style="margin:0 0 12px; font-size:18px; border-bottom:2px solid #f43f5e; padding-bottom:6px; color:#222;">Project Dimensions</h3>
        <table class="detail-table" style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr style="background:#fafafa;">
            <td style="padding:8px; font-weight:bold; width:180px;">Width:</td>
            <td style="padding:8px;">${data.width}m</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Height:</td>
            <td style="padding:8px;">${data.height}m</td>
          </tr>
          <tr style="background:#fafafa;">
            <td style="padding:8px; font-weight:bold;">Total Area:</td>
            <td style="padding:8px;"><strong>${data.totalArea.toFixed(2)} m²</strong></td>
          </tr>
        </table>
      </div>

      <!-- Board Specs -->
      <div class="section" style="margin:25px 0;">
        <h3 style="margin:0 0 12px; font-size:18px; border-bottom:2px solid #f43f5e; padding-bottom:6px; color:#222;">Board Specifications</h3>
        <table class="detail-table" style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:8px; font-weight:bold; width:180px;">Thickness:</td>
            <td style="padding:8px;">${data.thickness}mm</td>
          </tr>
          <tr style="background:#fafafa;">
            <td style="padding:8px; font-weight:bold;">Board Dimensions:</td>
            <td style="padding:8px;">${data.boardWidth} × ${data.boardHeight}mm</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Total Boards Required:</td>
            <td style="padding:8px;"><strong>${data.totalBoards} boards</strong></td>
          </tr>
          <tr style="background:#fafafa;">
            <td style="padding:8px; font-weight:bold;">Material Efficiency:</td>
            <td style="padding:8px;">${data.efficiency}%</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Estimated Waste:</td>
            <td style="padding:8px;">${data.waste}%</td>
          </tr>
        </table>
      </div>

      <!-- Style & Finish -->
      <div class="section" style="margin:25px 0;">
        <h3 style="margin:0 0 12px; font-size:18px; border-bottom:2px solid #f43f5e; padding-bottom:6px; color:#222;">Style & Finish Selection</h3>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:8px; font-weight:bold; width:180px;">Style Category:</td>
            <td style="padding:8px;"><strong>${data.style}</strong></td>
          </tr>
          ${data.finish ? `
          <tr style="background:#fafafa;">
            <td style="padding:8px; font-weight:bold;">Specific Finish:</td>
            <td style="padding:8px;"><strong>${data.finish}</strong></td>
          </tr>` : ''}
        </table>
      </div>

      <!-- Installation -->
      <div class="section" style="margin:25px 0;">
        <h3 style="margin:0 0 12px; font-size:18px; border-bottom:2px solid #f43f5e; padding-bottom:6px; color:#222;">Installation Requirements</h3>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:8px; font-weight:bold; width:180px;">Installation Preference:</td>
            <td style="padding:8px;"><strong>${data.installation === 'professional' ? 'Professional Installation Required' : 'DIY Installation Kit'}</strong></td>
          </tr>
        </table>
      </div>

      <!-- Project Location -->
      <div class="highlight-box" style="background:#fef6f6; padding:20px; border-left:5px solid #f43f5e; border-radius:6px; margin:25px 0;">
        <h4 style="margin:0 0 6px; font-size:16px; color:#222;">Project Location</h4>
        <p style="margin:0; font-size:16px; font-weight:500;">${data.location}</p>
      </div>

      <!-- Customer Info -->
      <div class="section" style="margin:25px 0;">
        <h3 style="margin:0 0 12px; font-size:18px; border-bottom:2px solid #f43f5e; padding-bottom:6px; color:#222;">Customer Information</h3>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:8px; font-weight:bold; width:180px;">Full Name:</td>
            <td style="padding:8px;"><strong>${data.name}</strong></td>
          </tr>
          <tr style="background:#fafafa;">
            <td style="padding:8px; font-weight:bold;">Email Address:</td>
            <td style="padding:8px;"><a href="mailto:${data.email}" style="color:#be185d; text-decoration:none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Phone Number:</td>
            <td style="padding:8px;"><a href="tel:${data.phone}" style="color:#be185d; text-decoration:none;">${data.phone}</a></td>
          </tr>
          ${data.company ? `
          <tr style="background:#fafafa;">
            <td style="padding:8px; font-weight:bold;">Company:</td>
            <td style="padding:8px;"><strong>${data.company}</strong></td>
          </tr>` : ''}
        </table>
      </div>

      <!-- Submission Info -->
      <p style="margin-top:30px; padding:20px; background:linear-gradient(135deg,#e8f4f8,#f0f9ff); border-radius:8px; border-left:4px solid #17a2b8; font-size:14px;">
        <strong>Submission Date:</strong> ${currentDate}<br>
        <strong>Response Commitment:</strong> We aim to respond within 24 hours with a detailed quotation and next steps.
      </p>
    </div>

    <!-- Contact Info -->
    <div style="max-width:640px; margin:0 auto 20px; font-family:Arial, Helvetica, sans-serif; color:#333; line-height:1.6; border-top:1px solid #eee; padding:20px 30px; background:#fafafa;">
      <h4 style="margin:0 0 15px; font-size:18px; color:#111; border-bottom:2px solid #7e3b0e; padding-bottom:8px;">Contact Information</h4>
      <table style="width:100%; border-collapse:collapse; margin-bottom:20px; font-size:14px;">
        <tr>
          <td style="padding:6px 0; width:150px; font-weight:bold; color:#444;">Phone</td>
          <td style="padding:6px 0; color:#555;">+44 141 739 3377</td>
        </tr>
        <tr>
          <td style="padding:6px 0; font-weight:bold; color:#444;">Email</td>
          <td style="padding:6px 0; color:#555;">stephen@thewallshop.co.uk</td>
        </tr>
        <tr>
          <td style="padding:6px 0; font-weight:bold; color:#444;">Business Hours</td>
          <td style="padding:6px 0; color:#555;">Monday – Friday<br>9:00 AM – 6:00 PM GMT</td>
        </tr>
      </table>
      <div style="border-top:1px solid #ddd; padding-top:12px; font-size:13px; color:#555;">
        <p style="margin:0 0 6px;"><strong>Best regards,</strong></p>
        <p style="margin:0 0 6px;"><strong>The Wall Shop Team</strong></p>
        <p style="margin:0;">SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK<br>
          Phone: +44 141 739 3377 &nbsp;|&nbsp; Email: stephen@thewallshop.co.uk
        </p>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="disclaimer" style="background:#f9f9f9; color:#666; font-size:12px; padding:20px; border-top:1px solid #ddd; line-height:1.4;">
      <strong>CONFIDENTIALITY NOTICE:</strong> This email and any attachments are confidential and may be legally privileged. If you are not the intended recipient, please notify the sender immediately and delete this email. Any unauthorized use, disclosure, or distribution is strictly prohibited. The Wall Shop Ltd accepts no liability for any damage caused by any virus transmitted by this email.
    </div>

  </div>
</body>
</html>
  `;
}

/* ===============
   MAIN HANDLER
   =============== */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    // Rate limiting
    const clientId = req.headers['x-forwarded-for'] as string || req.connection?.remoteAddress || 'unknown';
    if (!checkRateLimit(clientId)) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.'
      });
    }

    // Validate request body
    const validation = validateCrbQuoteData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const data: CrbQuoteData = req.body;

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    // Generate email content
    const emailHtml = generateCrbQuoteEmailTemplate(data);

    // Send email to stephen@thewallshop.co.uk with CC to client
    const emailResult = await resend.emails.send({
      from: "The Wall Shop Quotes <quotes@thewallshop.co.uk>",
      to: ['stephen@thewallshop.co.uk'],
      cc: [data.email],
      subject: `New Carbon Rock Boards Quote Request - ${data.name}`,
      html: emailHtml,
      replyTo: data.email,
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      throw new Error('Failed to send email');
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Quote request submitted successfully. You will receive a copy of your request via email.',
      emailId: emailResult.data?.id
    });

  } catch (error) {
    console.error('CRB Quote API Error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
}