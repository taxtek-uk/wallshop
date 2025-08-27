// /api/sendSwQuote.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * ENV REQUIRED (set in Vercel Project Settings → Environment Variables)
 * - RESEND_API_KEY=...
 * - FROM_EMAIL="The Wall Shop <stephen@thewallshop.co.uk>"  // or a verified domain/sender in Resend
 * - TO_EMAIL="stephen@thewallshop.co.uk"                    // where you receive the leads
 *
 * Optional:
 * - CC_EMAIL, BCC_EMAIL
 *
 * Frontend: POST JSON payload from SwQuoteModal submit() to /api/sendSwQuote
 */

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic CORS allow-list (adjust origin if you want to restrict strictly)
const ALLOWED_ORIGINS = [
  "https://www.thewallshop.co.uk",
  "https://thewallshop.co.uk",
  "http://localhost:5173", // Vite dev
  "http://127.0.0.1:5173",
];

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

type Payload = {
  dimensions?: {
    widthMm: number;
    heightMm: number;
    moduleDepth: number;
    usableWidth: number;
    slotCount: number;
  };
  accessories?: {
    tv?: boolean;
    fireplace?: boolean;
    soundbar?: boolean;
    shelvingQty?: number;
  };
  gaming?: {
    mode?: "single" | "dual" | null;
    options?: string[]; // keys selected
  };
  devices?: string[]; // keys selected
  style?: {
    category?: string | null;
    finish?: { id: string; name: string; img?: string } | null;
  };
  aiSEO?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  domain?: string;
  // Contact fields from the modal:
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    message?: string;
  };
};

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function sanitizePayload(input: any): Payload {
  const p: Payload = {};
  if (input && typeof input === "object") {
    const d = input.dimensions || {};
    const a = input.accessories || {};
    const g = input.gaming || {};
    const s = input.style || {};
    const seo = input.aiSEO || {};
    const c = input.contact || {};

    p.dimensions = {
      widthMm: isFiniteNumber(d.widthMm) ? d.widthMm : 0,
      heightMm: isFiniteNumber(d.heightMm) ? d.heightMm : 0,
      moduleDepth: isFiniteNumber(d.moduleDepth) ? d.moduleDepth : 0,
      usableWidth: isFiniteNumber(d.usableWidth) ? d.usableWidth : 0,
      slotCount: isFiniteNumber(d.slotCount) ? d.slotCount : 0,
    };

    p.accessories = {
      tv: !!a.tv,
      fireplace: !!a.fireplace,
      soundbar: !!a.soundbar,
      shelvingQty: isFiniteNumber(a.shelvingQty) ? a.shelvingQty : 0,
    };

    p.gaming = {
      mode: g.mode === "dual" ? "dual" : g.mode === "single" ? "single" : null,
      options: Array.isArray(g.options) ? g.options.map(String) : [],
    };

    p.devices = Array.isArray(input.devices) ? input.devices.map(String) : [];

    p.style = {
      category: s.category ? String(s.category) : null,
      finish: s.finish
        ? {
            id: String(s.finish.id || ""),
            name: String(s.finish.name || ""),
            img: s.finish.img ? String(s.finish.img) : undefined,
          }
        : null,
    };

    p.aiSEO = {
      title: seo.title ? String(seo.title) : undefined,
      description: seo.description ? String(seo.description) : undefined,
      keywords: seo.keywords ? String(seo.keywords) : undefined,
    };

    p.domain = input.domain ? String(input.domain) : undefined;

    p.contact = {
      name: c.name ? String(c.name) : undefined,
      email: c.email ? String(c.email) : undefined,
      phone: c.phone ? String(c.phone) : undefined,
      address: c.address ? String(c.address) : undefined,
      message: c.message ? String(c.message) : undefined,
    };
  }
  return p;
}

function renderHtmlEmail(p: Payload) {
  const d = p.dimensions!;
  const a = p.accessories!;
  const g = p.gaming!;
  const s = p.style!;
  const devices = p.devices || [];
  const contact = p.contact || {};

  const fmt = (n: number) => new Intl.NumberFormat("en-GB").format(n);

  // Corporate gradient background - fallback to inline CSS for email compatibility
 const gradientStyle = `
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%);
  background: -webkit-linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%);
  background: -moz-linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%);
  padding: 30px 20px;
  text-align: center;
`;


  return /* html */ `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Smart Wall Quote - The Wall Shop</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc;">
  <tr>
    <td align="center" style="padding: 20px 0;">
      <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header with Gradient Background -->
        <tr>
          <td style="background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%);
                     background: -webkit-linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%);
                     background: -moz-linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #111827 100%);
                     padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              New Smart Wall Quote
            </h1>
            <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
              The Wall Shop - Premium Smart Wall Solutions
            </p>
          </td>
        </tr>

        <!-- Domain Info -->
        <tr>
          <td style="padding: 20px 40px 0 40px;">
            <div style="background-color: #f1f5f9; border-left: 4px solid #1d4ed8; padding: 12px 16px; border-radius: 6px;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">
                <strong>Submission Source:</strong> ${escapeHtml(p.domain || "thewallshop.co.uk")}
              </p>
            </div>
          </td>
        </tr>

        ${contact.name || contact.email || contact.phone || contact.address ? `
        <!-- Contact Information -->
        <tr>
          <td style="padding: 30px 40px 20px 40px;">
            <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px; font-weight: 600; border-bottom: 2px solid #1d4ed8; padding-bottom: 8px;">
              Customer Contact Details
            </h2>
            <table cellpadding="8" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
              ${contact.name ? `
              <tr>
                <td style="width: 120px; font-weight: 600; color: #475569; font-size: 14px; vertical-align: top; padding: 8px 0;">Name:</td>
                <td style="color: #1e293b; font-size: 14px; padding: 8px 0;">${escapeHtml(contact.name)}</td>
              </tr>` : ""}
              ${contact.email ? `
              <tr>
                <td style="width: 120px; font-weight: 600; color: #475569; font-size: 14px; vertical-align: top; padding: 8px 0;">Email:</td>
                <td style="color: #1e293b; font-size: 14px; padding: 8px 0;">
                  <a href="mailto:${escapeHtml(contact.email)}" style="color: #1d4ed8; text-decoration: none;">${escapeHtml(contact.email)}</a>
                </td>
              </tr>` : ""}
              ${contact.phone ? `
              <tr>
                <td style="width: 120px; font-weight: 600; color: #475569; font-size: 14px; vertical-align: top; padding: 8px 0;">Phone:</td>
                <td style="color: #1e293b; font-size: 14px; padding: 8px 0;">
                  <a href="tel:${escapeHtml(contact.phone.replace(/\s/g, ''))}" style="color: #1d4ed8; text-decoration: none;">${escapeHtml(contact.phone)}</a>
                </td>
              </tr>` : ""}
              ${contact.address ? `
              <tr>
                <td style="width: 120px; font-weight: 600; color: #475569; font-size: 14px; vertical-align: top; padding: 8px 0;">Address:</td>
                <td style="color: #1e293b; font-size: 14px; padding: 8px 0; line-height: 1.5;">${escapeHtml(contact.address).replace(/\n/g, '<br>')}</td>
              </tr>` : ""}
            </table>
          </td>
        </tr>` : ""}

        ${contact.message ? `
        <!-- Customer Message -->
        <tr>
          <td style="padding: 0 40px 20px 40px;">
            <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Customer Message:</h3>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
              <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>
            </div>
          </td>
        </tr>` : ""}

        <!-- Quote Details -->
        <tr>
          <td style="padding: 20px 40px;">
            <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px; font-weight: 600; border-bottom: 2px solid #1d4ed8; padding-bottom: 8px;">
              Smart Wall Configuration
            </h2>

            <!-- Dimensions -->
            <h3 style="margin: 20px 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">Dimensions</h3>
            <table cellpadding="8" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background-color: #f8fafc; border-radius: 6px;">
              <tr>
                <td style="width: 150px; font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px;">Width (mm):</td>
                <td style="color: #1e293b; font-size: 14px; font-weight: 600; padding: 8px 12px;">${fmt(d.widthMm)}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px;">Height (mm):</td>
                <td style="color: #1e293b; font-size: 14px; font-weight: 600; padding: 8px 12px;">${fmt(d.heightMm)}</td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px;">Module Depth (mm):</td>
                <td style="color: #1e293b; font-size: 14px; font-weight: 600; padding: 8px 12px;">${fmt(d.moduleDepth)}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px;">Usable Width (mm):</td>
                <td style="color: #1e293b; font-size: 14px; font-weight: 600; padding: 8px 12px;">${fmt(d.usableWidth)}</td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px;">Slot Count:</td>
                <td style="color: #1e293b; font-size: 14px; font-weight: 600; padding: 8px 12px;">${fmt(d.slotCount)}</td>
              </tr>
            </table>

            <!-- Accessories -->
            <h3 style="margin: 20px 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">Accessories</h3>
            <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px;">
              ${[
                a.tv ? "✓ TV Module" : null,
                a.fireplace ? "✓ Electric Fireplace" : null,
                a.soundbar ? "✓ Soundbar" : null,
                a.shelvingQty ? `✓ Shelving × ${fmt(a.shelvingQty)}` : null,
              ].filter(Boolean).length > 0 ? 
                [
                  a.tv ? "✓ TV Module" : null,
                  a.fireplace ? "✓ Electric Fireplace" : null,
                  a.soundbar ? "✓ Soundbar" : null,
                  a.shelvingQty ? `✓ Shelving × ${fmt(a.shelvingQty)}` : null,
                ].filter(Boolean).map(item => `<p style="margin: 4px 0; color: #059669; font-size: 14px; font-weight: 500;">${item}</p>`).join('') :
                '<p style="margin: 0; color: #6b7280; font-size: 14px; font-style: italic;">No accessories selected</p>'
              }
            </div>

            <!-- Gaming -->
            <h3 style="margin: 20px 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">Gaming Configuration</h3>
            <table cellpadding="8" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background-color: #f8fafc; border-radius: 6px;">
              <tr>
                <td style="width: 150px; font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px;">Mode:</td>
                <td style="color: #1e293b; font-size: 14px; padding: 8px 12px;">${g.mode ? (g.mode === "dual" ? "Dual Screen" : "Single Screen") : "Not selected"}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px; vertical-align: top;">Options:</td>
                <td style="color: #1e293b; font-size: 14px; padding: 8px 12px;">
                  ${(g.options || []).length > 0 ? 
                    (g.options || []).map(opt => `<span style="display: inline-block; background-color: #dbeafe; color: #1d4ed8; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin: 2px 4px 2px 0;">${opt.replace(/([A-Z])/g, ' $1').trim()}</span>`).join('') :
                    '<span style="color: #6b7280; font-style: italic;">None selected</span>'
                  }
                </td>
              </tr>
            </table>

           <!-- Smart Devices -->
            <h3 style="margin: 20px 0 12px 0; color: #111827; font-size: 16px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 4px;">
              Smart Devices
            </h3>
            <div style="background: linear-gradient(to right, #f1f5f9, #f8fafc); border-radius: 8px; padding: 12px 14px; border: 1px solid #e5e7eb;">
              ${devices.length > 0 ? 
                devices.map(device => `
                  <span style="
                    display: inline-block; 
                    background: linear-gradient(to right, #dbeafe, #bfdbfe); 
                    color: #1e40af; 
                    padding: 5px 14px; 
                    border-radius: 20px; 
                    font-size: 13px; 
                    margin: 4px 6px 4px 0; 
                    font-weight: 500; 
                    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
                  ">
                    ${device.replace(/([A-Z])/g, ' $1').trim()}
                  </span>`
                ).join('') :
                '<p style="margin: 0; color: #6b7280; font-size: 14px; font-style: italic;">No smart devices selected</p>'
              }
            </div>

          <!-- Style Selection -->
          <h3 style="margin: 24px 0 12px 0; color: #111827; font-size: 16px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 4px;">
            Style & Finish
          </h3>
          <table cellpadding="8" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background: linear-gradient(to bottom, #f9fafb, #ffffff); border-radius: 8px; border: 1px solid #e5e7eb;">
            <tr>
              <td style="width: 150px; font-weight: 600; color: #475569; font-size: 14px; padding: 10px 12px; background-color: #f8fafc;">Category:</td>
              <td style="color: #1e293b; font-size: 14px; padding: 10px 12px; text-transform: capitalize;">${s.category || "—"}</td>
            </tr>
            <tr>
              <td style="font-weight: 600; color: #475569; font-size: 14px; padding: 10px 12px; background-color: #f8fafc;">Finish:</td>
              <td style="color: #1e293b; font-size: 14px; padding: 10px 12px;">
                ${s.finish ? `<strong>${escapeHtml(s.finish.name)}</strong> <span style="color: #6b7280;">(${escapeHtml(s.finish.id)})</span>` : "—"}
              </td>
            </tr>
          </table>

          ${s.finish?.img ? `
          <div style="margin-top: 14px; text-align: center;">
            <img 
              src="https://www.thewallshop.co.uk${s.finish.img}" 
              alt="${escapeHtml(s.finish.name)}" 
              style="max-width: 220px; height: auto; border-radius: 10px; border: 2px solid #e5e7eb; box-shadow: 0 3px 6px rgba(0,0,0,0.12);" 
            />
            <p style="margin: 10px 0 0 0; font-size: 13px; color: #6b7280; font-style: italic;">
              Selected Finish: <span style="color: #111827; font-weight: 500;">${escapeHtml(s.finish.name)}</span>
            </p>
          </div>` : ""}


            ${p.aiSEO?.title || p.aiSEO?.description || p.aiSEO?.keywords ? `
            <!-- AI-SEO Information -->
            <tr>
              <td style="padding: 20px 40px;">
                <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">SEO Metadata</h3>
                <table cellpadding="8" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background-color: #f8fafc; border-radius: 6px;">
                  ${p.aiSEO?.title ? `
                  <tr>
                    <td style="width: 100px; font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px; vertical-align: top;">Title:</td>
                    <td style="color: #1e293b; font-size: 14px; padding: 8px 12px;">${escapeHtml(p.aiSEO.title)}</td>
                  </tr>` : ""}
                  ${p.aiSEO?.keywords ? `
                  <tr>
                    <td style="font-weight: 600; color: #475569; font-size: 14px; padding: 8px 12px; vertical-align: top;">Keywords:</td>
                    <td style="color: #1e293b; font-size: 14px; padding: 8px 12px;">${escapeHtml(p.aiSEO.keywords)}</td>
                  </tr>` : ""}
                </table>
              </td>
            </tr>` : ""}

            <!-- Contact Information -->
              <tr>
                <td style="padding: 30px 40px 20px 40px;">
                  <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px; font-weight: 600; border-bottom: 2px solid #1d4ed8; padding-bottom: 8px;">
                    Contact Information
                  </h2>
                  <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">Phone</p>
                          <p style="margin: 4px 0 0 0; color: #475569; font-size: 14px;">
                            <a href="tel:+441417393377" style="color: #1d4ed8; text-decoration: none; font-weight: 500;">+44 141 739 3377</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">Email</p>
                          <p style="margin: 4px 0 0 0; color: #475569; font-size: 14px;">
                            <a href="mailto:stephen@thewallshop.co.uk" style="color: #1d4ed8; text-decoration: none; font-weight: 500;">stephen@thewallshop.co.uk</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">Business Hours</p>
                          <p style="margin: 4px 0 0 0; color: #475569; font-size: 14px;">Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>

            <!-- Signature -->
              <tr>
                <td style="padding: 20px 40px 30px 40px;">
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                    <p style="margin: 0 0 8px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Best regards,</p>
                    <p style="margin: 0 0 4px 0; color: #1d4ed8; font-size: 18px; font-weight: bold;">The Wall Shop Team</p>
                    <p style="margin: 0 0 12px 0; color: #475569; font-size: 14px; line-height: 1.5;">
                      SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK<br>
                      Phone: <a href="tel:+441417393377" style="color: #1d4ed8; text-decoration: none;">+44 141 739 3377</a> | 
                      Email: <a href="mailto:stephen@thewallshop.co.uk" style="color: #1d4ed8; text-decoration: none;">stephen@thewallshop.co.uk</a>
                    </p>
                  </div>
                </td>
              </tr>

            <!-- Footer with Disclaimer -->
            <tr>
              <td style="background-color: #f8fafc; padding: 20px 40px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 11px; color: #6b7280; line-height: 1.4;">
                  <strong>CONFIDENTIALITY NOTICE:</strong> This email and any attachments are for the exclusive and confidential use of the intended recipient. If you are not the intended recipient, please do not read, distribute, or take action based on this message. If you have received this in error, please notify the sender immediately and delete all copies of this message. The Wall Shop does not accept liability for any errors or omissions in the contents of this message which arise as a result of email transmission.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function renderTextEmail(p: Payload) {
  const d = p.dimensions!;
  const a = p.accessories!;
  const g = p.gaming!;
  const s = p.style!;
  const contact = p.contact || {};
  const fmt = (n: number) => new Intl.NumberFormat("en-GB").format(n);
  
  return [
    "NEW SMART WALL QUOTE - THE WALL SHOP",
    "=" .repeat(50),
    "",
    `Submission Source: ${p.domain || "thewallshop.co.uk"}`,
    "",
    ...(contact.name || contact.email || contact.phone || contact.address ? [
      "CUSTOMER CONTACT DETAILS:",
      "-" .repeat(30),
      contact.name ? `Name: ${contact.name}` : "",
      contact.email ? `Email: ${contact.email}` : "",
      contact.phone ? `Phone: ${contact.phone}` : "",
      contact.address ? `Address: ${contact.address}` : "",
      "",
    ].filter(Boolean) : []),
    ...(contact.message ? [
      "CUSTOMER MESSAGE:",
      "-" .repeat(20),
      contact.message,
      "",
    ] : []),
    "SMART WALL CONFIGURATION:",
    "-" .repeat(30),
    "",
    "Dimensions:",
    `- Width (mm): ${d.widthMm}`,
    `- Height (mm): ${d.heightMm}`,
    `- Module Depth (mm): ${fmt(d.moduleDepth)}`,   `- Usable Width (mm): ${d.usableWidth}`,
    `- Slot Count: ${d.slotCount}`,
    "",
    "Accessories:",
    a.tv ? "- ✓ TV Module" : "",
    a.fireplace ? "- ✓ Electric Fireplace" : "",
    a.soundbar ? "- ✓ Soundbar" : "",
    a.shelvingQty ? `- ✓ Shelving × ${a.shelvingQty}` : "",
    !a.tv && !a.fireplace && !a.soundbar && !a.shelvingQty ? "- None selected" : "",
    "",
    "Gaming Configuration:",
    `- Mode: ${g.mode ? (g.mode === "dual" ? "Dual Screen" : "Single Screen") : "Not selected"}`,
    `- Options: ${(g.options || []).join(", ") || "None"}`,
    "",
    "Smart Devices:",
    (p.devices || []).length > 0 ? (p.devices || []).map(d => `- ✓ ${d.replace(/([A-Z])/g, ' $1').trim()}`).join('\n') : "- None selected",
    "",
    "Style & Finish:",
    `- Category: ${s.category || "—"}`,
    `- Finish: ${s.finish ? `${s.finish.name} (${s.finish.id})` : "—"}`,
    s.finish?.img ? `- Image: ${s.finish.img}` : "",
    "",
    ...(p.aiSEO?.title || p.aiSEO?.description || p.aiSEO?.keywords ? [
      "SEO METADATA (Generated):",
      "-" .repeat(25),
      p.aiSEO?.title ? `Title: ${p.aiSEO.title}` : "",
      p.aiSEO?.description ? `Description: ${p.aiSEO.description}` : "",
      p.aiSEO?.keywords ? `Keywords: ${p.aiSEO.keywords}` : "",
      "",
    ].filter(Boolean) : []),
    "CONTACT INFORMATION:",
    "-" .repeat(25),
    "Phone: +44 141 739 3377",
    "Email: stephen@thewallshop.co.uk", 
    "Hours: Monday - Friday, 9:00 AM - 6:00 PM GMT",
    "",
    "Best regards,",
    "The Wall Shop Team",
    "SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK",
    "Phone: +44 141 739 3377 | Email: stephen@thewallshop.co.uk",
    "",
    "CONFIDENTIALITY NOTICE:",
    "This email and any attachments are for the exclusive and confidential use of the intended recipient. If you are not the intended recipient, please do not read, distribute, or take action based on this message. If you have received this in error, please notify the sender immediately and delete all copies of this message. The Wall Shop does not accept liability for any errors or omissions in the contents of this message which arise as a result of email transmission.",
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(str: string) {
  // ES5+ compatible escaping without using String.prototype.replaceAll
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (ch) => map[ch]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Validate env
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }
  const from = process.env.FROM_EMAIL || "The Wall Shop <no-reply@thewallshop.co.uk>";
  const to = process.env.TO_EMAIL || "stephen@thewallshop.co.uk";
  const bcc = process.env.BCC_EMAIL;

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const payload = sanitizePayload(body);

    // Basic required checks: width/height must exist
    if (!payload.dimensions || payload.dimensions.widthMm <= 0 || payload.dimensions.heightMm <= 0) {
      return res.status(400).json({ error: "Invalid dimensions" });
    }

    // Validate contact information is present
    if (!payload.contact || !payload.contact.name || !payload.contact.email) {
      return res.status(400).json({ error: "Contact information (name and email) is required" });
    }

    const customerName = payload.contact.name;
    const finishName = payload.style?.finish?.name || "Custom Configuration";
    const slotCount = payload.dimensions.slotCount;
    
    const subject = `Smart Wall Quote — ${customerName} — ${finishName} (${slotCount} slots)`;
    const ccRecipient = payload.contact?.email || process.env.CC_EMAIL;

    const { data, error } = await resend.emails.send({
      from,
      to,
      ...(ccRecipient ? { cc: ccRecipient } : {}),
      ...(bcc ? { bcc } : {}),
      subject,
      html: renderHtmlEmail(payload),
      text: renderTextEmail(payload),
      headers: {
        "X-TheWallShop-Form": "SwQuoteModal",
        "X-Customer-Email": payload.contact.email,
        "X-Customer-Name": payload.contact.name,
      },
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Email send failed", details: error });
    }

    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (e: any) {
    console.error("sendSwQuote error:", e);
    return res.status(400).json({ error: "Bad Request", details: String(e?.message || e) });
  }
}

