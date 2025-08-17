// api/sendQuote.ts - New Quote Modal API Handler
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const ALLOWED_ORIGINS = [
  "https://thewallshop.co.uk",
  "https://www.thewallshop.co.uk",
  "http://localhost:5173", // Vite dev
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- CORS ---
  const origin = String(req.headers.origin || "");
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  // --- Method guard ---
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST,OPTIONS");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  res.setHeader("Content-Type", "application/json");

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: "Email service not configured",
        details: "Missing RESEND_API_KEY environment variable",
      });
    }

    // --- Parse body ---
    const body = typeof req.body === "string" ? safeParseJson(req.body) : (req.body as any) ?? {};

    // --- Extract and validate contact data ---
    const contact = body?.contact || {};
    const fullName = sanitizeString(contact.fullName).trim();
    const email = sanitizeString(contact.email).trim().toLowerCase();
    const phone = sanitizeString(contact.phone).trim();
    const installationAddress = sanitizeString(contact.installationAddress).trim();
    const additionalNotes = sanitizeString(contact.additionalNotes).trim();

    const productCategory = sanitizeString(body?.productCategory).trim();

    // --- Validation ---
    const errors: Record<string, string> = {};
    if (!fullName) errors.fullName = "Full name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!isValidEmail(email)) errors.email = "Please provide a valid email address.";
    if (!phone) errors.phone = "Phone is required.";
    else if (!isValidPhone(phone)) errors.phone = "Please provide a valid phone number.";
    if (!productCategory) errors.productCategory = "Product category is required.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: "Validation failed", fields: errors });
    }

    // --- Extract product-specific data ---
    const productData = extractProductData(body, productCategory);

    // --- Build email content ---
    const timestamp = new Date().toLocaleString('en-GB', { 
      timeZone: 'Europe/London',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    const emailHtml = buildEmailHtml({
      fullName,
      email,
      phone,
      installationAddress,
      additionalNotes,
      productCategory,
      productData,
      timestamp,
    });

    const emailText = buildEmailText({
      fullName,
      email,
      phone,
      installationAddress,
      additionalNotes,
      productCategory,
      productData,
      timestamp,
    });

    // --- Send email ---
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: "quotes@thewallshop.co.uk",
      to: ["stephen@thewallshop.co.uk"],
      cc: email ? [email] : undefined,
      subject: `New ${formatProductCategory(productCategory)} Quote Request - ${fullName}`,
      html: emailHtml,
      text: emailText,
    });

    return res.status(200).json({ success: true, message: "Quote request submitted successfully" });

  } catch (error) {
    console.error("Quote API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}

// --- Utility Functions ---

function safeParseJson(str: string): any {
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
}

function sanitizeString(value: any): string {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").substring(0, 1000);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(phone);
}

function formatProductCategory(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractProductData(body: any, category: string): any {
  switch (category) {
    case 'smart-walls':
      return body.smartWalls || {};
    case 'smart-devices':
      return body.smartDevices || {};
    case 'wall-panels':
      return body.wallPanels || {};
    case 'carbon-rock-boards':
      return body.carbonRockBoards || {};
    default:
      return {};
  }
}

function buildEmailHtml(data: any): string {
  const { fullName, email, phone, installationAddress, additionalNotes, productCategory, productData, timestamp } = data;
  
  const productSectionHtml = buildProductSectionHtml(productCategory, productData);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request - The Wall Shop</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; margin: 0; padding: 0; background-color: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: #865D36; color: white; padding: 24px; text-align: center; }
    .content { padding: 24px; }
    .section { margin-bottom: 24px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; }
    .section h3 { margin: 0 0 12px 0; color: #3E362E; font-size: 18px; }
    .field { margin-bottom: 12px; }
    .field strong { color: #3E362E; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin-top: 8px; }
    .feature { background: #f3f4f6; padding: 8px 12px; border-radius: 4px; font-size: 14px; }
    .footer { background: #f9fafb; padding: 16px; text-align: center; font-size: 14px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Quote Request</h1>
      <p>The Wall Shop - ${formatProductCategory(productCategory)}</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h3>Contact Information</h3>
        <div class="field"><strong>Name:</strong> ${escapeHtml(fullName)}</div>
        <div class="field"><strong>Email:</strong> ${escapeHtml(email)}</div>
        <div class="field"><strong>Phone:</strong> ${escapeHtml(phone)}</div>
        ${installationAddress ? `<div class="field"><strong>Installation Address:</strong> ${escapeHtml(installationAddress)}</div>` : ''}
        ${additionalNotes ? `<div class="field"><strong>Additional Notes:</strong> ${escapeHtml(additionalNotes)}</div>` : ''}
      </div>

      ${productSectionHtml}

      <div class="section">
        <h3>Request Details</h3>
        <div class="field"><strong>Product Category:</strong> ${formatProductCategory(productCategory)}</div>
        <div class="field"><strong>Submitted:</strong> ${timestamp}</div>
      </div>
    </div>

    <div class="footer">
      <p>This quote request was submitted via thewallshop.co.uk</p>
    </div>
  </div>
</body>
</html>`;
}

function buildProductSectionHtml(category: string, data: any): string {
  switch (category) {
    case 'smart-walls':
      return buildSmartWallsHtml(data);
    case 'smart-devices':
      return buildSmartDevicesHtml(data);
    case 'wall-panels':
      return buildWallPanelsHtml(data);
    case 'carbon-rock-boards':
      return buildCarbonRockBoardsHtml(data);
    default:
      return '';
  }
}

function buildSmartWallsHtml(data: any): string {
  let html = '<div class="section"><h3>Smart Walls Configuration</h3>';

  // Project Details
  if (data.projectDetails) {
    html += '<div class="field"><strong>Project Details:</strong></div>';
    html += `<div class="field"><strong>Property Type:</strong> ${escapeHtml(String(data.projectDetails.propertyType || '-'))}</div>`;
    html += `<div class="field"><strong>Purpose:</strong> ${escapeHtml(String(data.projectDetails.purpose || '-'))}</div>`;
    if (data.projectDetails.location) html += `<div class="field"><strong>Location:</strong> ${escapeHtml(String(data.projectDetails.location))}</div>`;
    html += `<div class="field"><strong>Installation:</strong> ${escapeHtml(String(data.projectDetails.installation || '-'))}</div>`;
  }

  // Wall Specifications
  if (data.wallSpecifications) {
    html += '<div class="field"><strong>Wall Specifications:</strong></div>';
    if (typeof data.wallSpecifications.width === 'number') html += `<div class="field"><strong>Width:</strong> ${data.wallSpecifications.width} m</div>`;
    if (typeof data.wallSpecifications.height === 'number') html += `<div class="field"><strong>Height:</strong> ${data.wallSpecifications.height} m</div>`;
    if (data.wallSpecifications.thickness) html += `<div class="field"><strong>Thickness:</strong> ${escapeHtml(String(data.wallSpecifications.thickness))}</div>`;
    if (data.wallSpecifications.layout) html += `<div class="field"><strong>Layout:</strong> ${escapeHtml(String(data.wallSpecifications.layout))}</div>`;
  }
  
  // Technical Needs
  if (data.technicalNeeds) {
    html += '<div class="field"><strong>Technical Needs:</strong></div>';
    html += `<div class="field"><strong>Soundproofing:</strong> ${data.technicalNeeds.soundproofing ? 'Yes' : 'No'}</div>`;
    html += `<div class="field"><strong>Fire Rating:</strong> ${data.technicalNeeds.fireRating ? 'Yes' : 'No'}</div>`;
    html += `<div class="field"><strong>Accessibility:</strong> ${data.technicalNeeds.accessibility ? 'Yes' : 'No'}</div>`;
    html += `<div class="field"><strong>Eco-materials:</strong> ${data.technicalNeeds.ecoMaterials ? 'Yes' : 'No'}</div>`;
  }
  
  // Existing feature sections
  if (data.tvIntegration) {
    html += '<div class="field"><strong>TV Integration:</strong> Yes</div>';
    if (data.screenSize) html += `<div class="field"><strong>Screen Size:</strong> ${escapeHtml(data.screenSize)}</div>`;
    if (data.mountType) html += `<div class="field"><strong>Mount Type:</strong> ${escapeHtml(data.mountType)}</div>`;
    if (data.avEquipment) html += `<div class="field"><strong>AV Equipment:</strong> ${escapeHtml(data.avEquipment)}</div>`;
    if (data.consoles) html += `<div class="field"><strong>Gaming Consoles:</strong> ${escapeHtml(data.consoles)}</div>`;
  }
  
  if (data.speakers) {
    html += '<div class="field"><strong>Audio System:</strong> Yes</div>';
    if (data.speakerType) html += `<div class="field"><strong>Speaker Type:</strong> ${escapeHtml(data.speakerType)}</div>`;
    if (data.speakerQuantity) html += `<div class="field"><strong>Speaker Quantity:</strong> ${data.speakerQuantity}</div>`;
    if (data.surroundSetup) html += `<div class="field"><strong>Surround Setup:</strong> ${escapeHtml(data.surroundSetup)}</div>`;
  }
  
  if (data.lighting) {
    html += '<div class="field"><strong>Smart Lighting:</strong> Yes</div>';
    if (data.lightingType) html += `<div class="field"><strong>Lighting Type:</strong> ${escapeHtml(data.lightingType)}</div>`;
    if (data.colorControl) html += '<div class="field"><strong>Color Control:</strong> Yes</div>';
  }
  
  if (data.additionalFeatures && data.additionalFeatures.length > 0) {
    html += '<div class="field"><strong>Additional Features:</strong><div class="features">';
    data.additionalFeatures.forEach((feature: string) => {
      html += `<div class="feature">${escapeHtml(feature)}</div>`;
    });
    html += '</div></div>';
  }
  
  html += '</div>';
  return html;
}

function buildSmartDevicesHtml(data: any): string {
  let html = '<div class="section"><h3>Smart Devices Configuration</h3>';
  
  if (data.controlPanels) {
    html += '<div class="field"><strong>Control Panels:</strong> Yes</div>';
    if (data.panelModel) html += `<div class="field"><strong>Panel Model:</strong> ${escapeHtml(data.panelModel)}</div>`;
    if (data.panelRoom) html += `<div class="field"><strong>Primary Room:</strong> ${escapeHtml(data.panelRoom)}</div>`;
    if (data.panelMountType) html += `<div class="field"><strong>Mount Type:</strong> ${escapeHtml(data.panelMountType)}</div>`;
  }
  
  if (data.securitySensors) {
    html += '<div class="field"><strong>Security & Sensors:</strong> Yes</div>';
    if (data.motionDetection) html += '<div class="field"><strong>Motion Detection:</strong> Yes</div>';
    if (data.smokeDetection) html += '<div class="field"><strong>Smoke Detection:</strong> Yes</div>';
    
    if (data.securityFeatures && data.securityFeatures.length > 0) {
      html += '<div class="field"><strong>Security Features:</strong><div class="features">';
      data.securityFeatures.forEach((feature: string) => {
        html += `<div class="feature">${escapeHtml(feature)}</div>`;
      });
      html += '</div></div>';
    }
  }
  
  if (data.homeAutomation && data.automationFeatures && data.automationFeatures.length > 0) {
    html += '<div class="field"><strong>Home Automation:</strong> Yes</div>';
    html += '<div class="field"><strong>Automation Features:</strong><div class="features">';
    data.automationFeatures.forEach((feature: string) => {
      html += `<div class="feature">${escapeHtml(feature)}</div>`;
    });
    html += '</div></div>';
  }
  
  html += '</div>';
  return html;
}

function buildWallPanelsHtml(data: any): string {
  let html = '<div class="section"><h3>Wall Panels Configuration</h3>';
  
  if (data.panelType) html += `<div class="field"><strong>Panel Type:</strong> ${formatProductCategory(data.panelType)}</div>`;
  
  if (data.panelType === 'fluted') {
    if (data.flutedGrooveDepth) html += `<div class="field"><strong>Groove Depth:</strong> ${escapeHtml(data.flutedGrooveDepth)}</div>`;
    if (data.flutedSpacing) html += `<div class="field"><strong>Groove Spacing:</strong> ${escapeHtml(data.flutedSpacing)}</div>`;
  }
  
  if (data.panelType === 'hd-printing' && data.hdPrintingPattern) {
    html += `<div class="field"><strong>HD Printing Pattern:</strong> ${escapeHtml(data.hdPrintingPattern)}</div>`;
  }
  
  if (data.panelType === 'textured' && data.textureType) {
    html += `<div class="field"><strong>Texture Type:</strong> ${escapeHtml(data.textureType)}</div>`;
  }
  
  if (data.finish) html += `<div class="field"><strong>Finish:</strong> ${escapeHtml(data.finish)}</div>`;
  
  if (data.dimensions) {
    html += `<div class="field"><strong>Dimensions:</strong> ${data.dimensions.width}m × ${data.dimensions.height}m (${data.dimensions.area.toFixed(2)}m²)</div>`;
  }
  
  if (data.installation) html += `<div class="field"><strong>Installation:</strong> ${formatProductCategory(data.installation)}</div>`;
  
  html += '</div>';
  return html;
}

function buildCarbonRockBoardsHtml(data: any): string {
  let html = '<div class="section"><h3>Carbon Rock Boards Configuration</h3>';
  
  if (data.boardType) html += `<div class="field"><strong>Board Type:</strong> ${formatProductCategory(data.boardType)}</div>`;
  
  if (data.boardType === 'acoustic') {
    if (data.acousticNrcRating) html += `<div class="field"><strong>NRC Rating:</strong> ${escapeHtml(data.acousticNrcRating)}</div>`;
    if (data.acousticFabricColor) html += `<div class="field"><strong>Fabric Color:</strong> ${escapeHtml(data.acousticFabricColor)}</div>`;
  }
  
  if (data.boardType === 'mirror' && data.mirrorTint) {
    html += `<div class="field"><strong>Mirror Tint:</strong> ${escapeHtml(data.mirrorTint)}</div>`;
  }
  
  if (data.thickness) html += `<div class="field"><strong>Thickness:</strong> ${escapeHtml(data.thickness)}</div>`;
  
  if (data.dimensions) {
    html += `<div class="field"><strong>Dimensions:</strong> ${data.dimensions.width}m × ${data.dimensions.height}m (${data.dimensions.area.toFixed(2)}m²)</div>`;
  }
  
  if (data.installation) html += `<div class="field"><strong>Installation:</strong> ${formatProductCategory(data.installation)}</div>`;
  
  html += '</div>';
  return html;
}

function buildEmailText(data: any): string {
  const { fullName, email, phone, installationAddress, additionalNotes, productCategory, timestamp } = data;
  
  return `
New Quote Request - The Wall Shop

CONTACT INFORMATION
Name: ${fullName}
Email: ${email}
Phone: ${phone}
${installationAddress ? `Installation Address: ${installationAddress}` : ''}
${additionalNotes ? `Additional Notes: ${additionalNotes}` : ''}

PRODUCT CATEGORY
${formatProductCategory(productCategory)}

REQUEST DETAILS
Submitted: ${timestamp}

This quote request was submitted via thewallshop.co.uk
`;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

