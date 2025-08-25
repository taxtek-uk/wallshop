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
  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carbon Rock Boards Quote Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F3F4F6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%); padding: 30px 20px; text-align: center;">
      <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: bold;">Carbon Rock Boards Quote Request</h1>
      <p style="color: #E5E7EB; margin: 10px 0 0 0; font-size: 16px;">Professional Wall Solutions by The Wall Shop</p>
    </div>

    <!-- Content -->
    <div style="padding: 30px 20px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Dear Team,
      </p>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        We have received a new Carbon Rock Boards quote request. Please find the complete details below:
      </p>

      <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2C3E50; margin: 0 0 15px 0;">Project Dimensions</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Width:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.width}m</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Height:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.height}m</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Total Area:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>${data.totalArea.toFixed(2)} m²</strong></td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2C3E50; margin: 0 0 15px 0;">Board Specifications</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Thickness:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.thickness}mm</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Board Dimensions:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.boardWidth} × ${data.boardHeight}mm</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Total Boards Required:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>${data.totalBoards} boards</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Material Efficiency:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.efficiency}%</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Estimated Waste:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${data.waste}%</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2C3E50; margin: 0 0 15px 0;">Style & Finish Selection</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Style Category:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>${data.style}</strong></td>
          </tr>
          ${data.finish ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Specific Finish:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>${data.finish}</strong></td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2C3E50; margin: 0 0 15px 0;">Installation Requirements</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Installation Preference:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>${data.installation === 'professional' ? 'Professional Installation Required' : 'DIY Installation Kit'}</strong></td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #EFF6FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1E40AF; margin: 0 0 10px 0;">📍 Project Location</h3>
        <p style="margin: 0; color: #1F2937;">${data.location}</p>
      </div>
      
      <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2C3E50; margin: 0 0 15px 0;">👤 Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>${data.name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Email Address:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><a href="mailto:${data.email}" style="color: #1D4ED8;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><a href="tel:${data.phone}" style="color: #1D4ED8;">${data.phone}</a></td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold;">Company:</td>
            <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>${data.company}</strong></td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div style="background-color: #F0FDF4; padding: 15px; border-radius: 6px; border-left: 4px solid #10B981; margin: 20px 0;">
        <p style="margin: 0; color: #065F46;"><strong>Submission Date:</strong> ${currentDate}</p>
        <p style="margin: 0; color: #065F46;"><strong>Response Commitment:</strong> We aim to respond within 24 hours with a detailed quotation and next steps.</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
      <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;">The Wall Shop Ltd</p>
      <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 12px;">SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK</p>
      <p style="margin: 0; color: #6B7280; font-size: 12px;">Phone: +44 141 739 3377 | Email: info@thewallshop.co.uk</p>
      
      <!-- Footer Disclaimer -->
      <div style="border-top: 1px solid #E5E7EB; padding-top: 15px; margin-top: 15px;">
        <p style="margin: 0; color: #9CA3AF; font-size: 11px; line-height: 1.4;">
          CONFIDENTIALITY NOTICE: This email and any attachments are confidential and intended solely for the use of the individuals or entities to whom they are addressed. If you have received this email in error, please notify the sender immediately and delete this email. Any unauthorized use, disclosure, or distribution is strictly prohibited. The Wall Shop Ltd accepts no liability for any damage caused by any virus transmitted by this email.
        </p>
      </div>
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
        error: 'Too many requests, please try again later.'
      });
    }

    const { data } = req.body;

    // Validate incoming data
    const validation = validateCrbQuoteData(data);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'The Wall Shop Quotes <quotes@thewallshop.co.uk>',
      to: ['stephen@thewallshop.co.uk'],
      subject: `New Carbon Rock Boards Quote Request from ${data.name}`,
      html: generateCrbQuoteEmailTemplate(data),
    });

    return res.status(200).json({
      success: true,
      message: 'Carbon Rock Boards quote request sent successfully!'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
}


