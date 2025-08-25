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
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #865d36, #93785b);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #865d36;
        }
        .section h3 {
            margin: 0 0 15px 0;
            color: #865d36;
            font-size: 18px;
            font-weight: 600;
        }
        .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }
        .detail-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-label {
            font-weight: 500;
            color: #6c757d;
        }
        .detail-value {
            font-weight: 600;
            color: #2c3e50;
        }
        .highlight-box {
            background: linear-gradient(135deg, #865d36, #93785b);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .highlight-box h4 {
            margin: 0 0 10px 0;
            font-size: 20px;
        }
        .contact-info {
            background: #2c3e50;
            color: white;
            padding: 25px;
            text-align: center;
        }
        .contact-info h4 {
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .contact-details {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 15px;
        }
        .contact-item {
            text-align: center;
        }
        .contact-item strong {
            display: block;
            margin-bottom: 5px;
            color: #93785b;
        }
        @media (max-width: 600px) {
            .detail-grid {
                grid-template-columns: 1fr;
            }
            .contact-details {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Carbon Rock Boards Quote Request</h1>
            <p>Professional Wall Solutions by The Wall Shop</p>
        </div>
        
        <div class="content">
            <p>Dear Stephen,</p>
            <p>We have received a new Carbon Rock Boards quote request. Please find the details below:</p>
            
            <div class="section">
                <h3>Project Dimensions</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Width:</span>
                        <span class="detail-value">${data.width}m</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Height:</span>
                        <span class="detail-value">${data.height}m</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Total Area:</span>
                        <span class="detail-value">${data.totalArea.toFixed(2)} m²</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h3>📋 Board Specifications</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Thickness:</span>
                        <span class="detail-value">${data.thickness}mm</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Board Size:</span>
                        <span class="detail-value">${data.boardWidth} × ${data.boardHeight}mm</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Boards Needed:</span>
                        <span class="detail-value">${data.totalBoards}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Efficiency:</span>
                        <span class="detail-value">${data.efficiency}%</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Waste:</span>
                        <span class="detail-value">${data.waste}%</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h3>Style & Finish</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Style Category:</span>
                        <span class="detail-value">${data.style}</span>
                    </div>
                    ${data.finish ? `
                    <div class="detail-item">
                        <span class="detail-label">Specific Finish:</span>
                        <span class="detail-value">${data.finish}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="section">
                <h3>🔧 Installation</h3>
                <div class="detail-item">
                    <span class="detail-label">Preference:</span>
                    <span class="detail-value">${data.installation === 'professional' ? 'Professional Installation' : 'DIY Installation Kit'}</span>
                </div>
            </div>
            
            <div class="highlight-box">
                <h4>📍 Project Location</h4>
                <p style="margin: 0; font-size: 18px;">${data.location}</p>
            </div>
            
            <div class="section">
                <h3>👤 Customer Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">${data.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${data.email}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value">${data.phone}</span>
                    </div>
                    ${data.company ? `
                    <div class="detail-item">
                        <span class="detail-label">Company:</span>
                        <span class="detail-value">${data.company}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <p style="margin-top: 30px; padding: 20px; background: #e8f4f8; border-radius: 8px; border-left: 4px solid #17a2b8;">
                <strong>Submitted:</strong> ${currentDate}<br>
                <strong>Response Time:</strong> We aim to respond within 24 hours with a detailed quotation.
            </p>
        </div>
        
        <div class="contact-info">
            <h4>The Wall Shop Contact Information</h4>
            <div class="contact-details">
                <div class="contact-item">
                    <strong>Phone</strong>
                    +44 141 739 3377
                </div>
                <div class="contact-item">
                    <strong>Email</strong>
                    stephen@thewallshop.co.uk
                </div>
                <div class="contact-item">
                    <strong>Website</strong>
                    thewallshop.co.uk
                </div>
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
      from: 'quotes@thewallshop.co.uk',
      to: ['stephen@thewallshop.co.uk'],
      cc: [data.email],
      subject: 'New Carbon Rock Boards Quote Request',
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
      message: 'Quote request submitted successfully',
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

