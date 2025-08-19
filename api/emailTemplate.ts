// emailTemplate.ts - Modern Wall Shop Email Template System
// Professional, branded email templates with multilingual support and dark/light mode compatibility

import type { QuoteModalData, QuoteModalAnalysis, BrandConfig, CTALinks, ThemeVariant, EmailTemplateOptions } from './types';

/* ===============================
   BRAND CONFIGURATION SYSTEM
   =============================== */

// Default Wall Shop brand configuration
const DEFAULT_BRAND_CONFIG: BrandConfig = {
  primaryColor: '#2C3E50', // Deep navy/charcoal
  accentColor: '#754921', // Vibrant orange/gold
  neutralBg: '#F8F9FA',   // Light grey
  textColor: '#2C3E50',   // Dark text for light backgrounds
  logoUrl: '{{logoUrl}}', // Placeholder for logo
  companyName: 'The Wall Shop',
  tagline: 'Elevate your walls with style',
  website: 'https://thewallshop.co.uk',
  address: 'SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK',
  phone: '+44 141 739 3377',
  email: 'info@thewallshop.co.uk',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/thewallshop',
    instagram: 'https://instagram.com/thewallshop',
    website: 'https://thewallshop.co.uk'
  }
};

/* ===============================
   MULTILINGUAL SUPPORT SYSTEM
   =============================== */

interface MultilingualContent {
  greeting: {
    en: string;
    fr: string;
    es: string;
    ar: string;
    ur: string;
  };
  subject: {
    en: string;
    fr: string;
    es: string;
    ar: string;
    ur: string;
  };
  thankYou: {
    en: string;
    fr: string;
    es: string;
    ar: string;
    ur: string;
  };
  nextSteps: {
    en: string;
    fr: string;
    es: string;
    ar: string;
    ur: string;
  };
}

const MULTILINGUAL_CONTENT: MultilingualContent = {
  greeting: {
    en: 'Dear {{customerName}},',
    fr: 'Cher {{customerName}},',
    es: 'Estimado {{customerName}},',
    ar: 'عزيزي {{customerName}}،',
    ur: 'محترم {{customerName}}،'
  },
  subject: {
    en: 'Your Quote Request - {{quoteId}} | The Wall Shop',
    fr: 'Votre demande de devis - {{quoteId}} | The Wall Shop',
    es: 'Su solicitud de cotización - {{quoteId}} | The Wall Shop',
    ar: 'طلب عرض الأسعار الخاص بك - {{quoteId}} | The Wall Shop',
    ur: 'آپ کی قیمت کی درخواست - {{quoteId}} | The Wall Shop'
  },
  thankYou: {
    en: 'Thank you for your interest in our premium wall solutions.',
    fr: 'Merci de votre intérêt pour nos solutions murales premium.',
    es: 'Gracias por su interés en nuestras soluciones de pared premium.',
    ar: 'شكرًا لك على اهتمامك بحلول الجدران المتميزة لدينا.',
    ur: 'ہمارے پریمیم وال سلوشنز میں آپ کی دلچسپی کا شکریہ۔'
  },
  nextSteps: {
    en: 'Our expert team will review your requirements and prepare a detailed proposal.',
    fr: 'Notre équipe d\'experts examinera vos exigences et préparera une proposition détaillée.',
    es: 'Nuestro equipo de expertos revisará sus requisitos y preparará una propuesta detallada.',
    ar: 'سيقوم فريق الخبراء لدينا بمراجعة متطلباتك وإعداد اقتراح مفصل.',
    ur: 'ہماری ماہر ٹیم آپ کی ضروریات کا جائزہ لے گی اور تفصیلی تجویز تیار کرے گی۔'
  }
};

/* ===============================
   CTA LINKS CONFIGURATION
   =============================== */

const DEFAULT_CTA_LINKS: CTALinks = {
  viewLink: '{{viewLink}}', // Dynamic placeholder
  pdfLink: '{{pdfLink}}', // Dynamic placeholder
  approveLink: '{{approveLink}}', // Dynamic placeholder
  requestChangesLink: '{{requestChangesLink}}', // Dynamic placeholder
  requestCallbackLink: 'https://thewallshop.co.uk/contact',
  forwardLink: '{{forwardLink}}', // Dynamic placeholder
  scheduleConsultationLink: 'https://thewallshop.co.uk/contact',
  exploreSmartWallsLink: 'https://thewallshop.co.uk/smart-walls',
  contactLink: 'https://thewallshop.co.uk/contact'
};

/* ===============================
   THEME VARIANTS SYSTEM
   =============================== */

const THEME_VARIANTS: ThemeVariant[] = [
  {
    name: 'default',
    primaryColor: "#8B5A2B", // leather[500]
    accentColor: "#D1A678", // leather[300]
    neutralBg: "#F5E6DA",   // leather[100]
    textColor: "#2C1A0C",   // leather[900]
    description: 'Classic leather brown theme'
  },
  {
    name: 'dark',
    primaryColor: "#432913", // leather[800]
    accentColor: "#B97D47", // leather[400]
    neutralBg: "#2C1A0C",   // leather[900]
    textColor: "#F5E6DA",   // leather[100]
    description: 'Dark leather theme with warm highlights'
  },
  {
    name: 'luxury',
    primaryColor: "#754921", // leather[600]
    accentColor: "#FFD700",  // gold accent
    neutralBg: "#EAD0B8",    // leather[200]
    textColor: "#2C1A0C",    // leather[900]
    description: 'Luxury leather & gold theme'
  }
];

/* ===============================
   EMAIL TEMPLATE GENERATOR
   =============================== */

class WallShopEmailTemplate {
  private brandConfig: BrandConfig;
  private ctaLinks: CTALinks;
  private multilingualContent: MultilingualContent;

  constructor(options: EmailTemplateOptions = {}) {
    this.brandConfig = { ...DEFAULT_BRAND_CONFIG, ...options.brandConfig };
    this.ctaLinks = { ...DEFAULT_CTA_LINKS, ...options.ctaLinks };
    this.multilingualContent = MULTILINGUAL_CONTENT;

    // Apply theme variant if specified
    if (options.theme && options.theme !== 'default') {
      const theme = THEME_VARIANTS.find(t => t.name === options.theme);
      if (theme) {
        this.brandConfig.primaryColor = theme.primaryColor;
        this.brandConfig.accentColor = theme.accentColor;
        this.brandConfig.neutralBg = theme.neutralBg;
        this.brandConfig.textColor = theme.textColor;
      }
    }
  }

  /**
   * Generate the complete email template with all components
   */
  generateEmailTemplate(
    data: QuoteModalData,
    analysis: QuoteModalAnalysis,
    options: EmailTemplateOptions = {}
  ): { html: string; text: string } {
    const variant = options.variant || 'external';
    const language = options.language || 'en';
    const trackingPixel = options.trackingPixel || '{{trackingPixel}}';

    if (variant === 'internal') {
      return this.generateInternalTemplate(data, analysis, language);
    }

    return this.generateExternalTemplate(data, analysis, language, trackingPixel);
  }

  /**
   * Generate external customer-facing email template
   */
  private generateExternalTemplate(
    data: QuoteModalData,
    analysis: QuoteModalAnalysis,
    language: 'en' | 'fr' | 'es' | 'ar' | 'ur',
    trackingPixel: string
  ): { html: string; text: string } {
    const quoteId = this.generateQuoteId();
    const currentDate = new Date().toLocaleDateString('en-GB');
    const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');

    const html = `
<!DOCTYPE html>
<html lang="${language}" dir="${language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <title>${this.multilingualContent.subject[language].replace('{{quoteId}}', quoteId)}</title>
  <style>
    ${this.generateEmailCSS()}
  </style>
</head>
<body>
  <div class="email-container">
    ${this.generateHeader(language)}
    ${this.generateGreeting(data.fullName, language)}
    ${this.generateQuoteTable(quoteId, currentDate, expiryDate, analysis)}
    ${this.generateProductSummary(data, analysis)}
    ${this.generateNextSteps(language)}
    ${this.generateFooter()}
  </div>
  
  <!-- Analytics Tracking Pixel -->
  <img src="${trackingPixel}" width="1" height="1" style="display:none;" alt="">
</body>
</html>`.trim();

    const text = this.generatePlainTextVersion(data, analysis, quoteId, currentDate, expiryDate, language);

    return { html, text };
  }

  /**
   * Generate internal admin email template
   */
  private generateInternalTemplate(
    data: QuoteModalData,
    analysis: QuoteModalAnalysis,
    language: 'en' | 'fr' | 'es' | 'ar' | 'ur'
  ): { html: string; text: string } {
    const quoteId = this.generateQuoteId();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Internal Quote Alert - ${quoteId}</title>
  <style>
    ${this.generateSimpleCSS()}
  </style>
</head>
<body>
  <div class="internal-container">
    <h1>New Quote Request - ${quoteId}</h1>
    <div class="quick-info">
      <p><strong>Customer:</strong> ${this.escapeHtml(data.fullName)}</p>
      <p><strong>Email:</strong> ${this.escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${this.escapeHtml(data.phone)}</p>
      ${data.installationAddress ? `<p><strong>Installation Address:</strong> ${this.escapeHtml(data.installationAddress)}</p>` : ''}
      ${data.additionalNotes ? `<p><strong>Additional Notes:</strong> ${this.escapeHtml(data.additionalNotes)}</p>` : ''}
      <p><strong>Entry Point:</strong> ${data.entryPoint.replace('-',' ').toUpperCase()}</p>
      ${data.productCategory ? `<p><strong>Product Category:</strong> ${this.escapeHtml(data.productCategory)}</p>` : ''}
      ${data.smartWalls ? `<p><strong>Smart Walls Data:</strong> ${this.escapeHtml(JSON.stringify(data.smartWalls))}</p>` : ''}
      ${data.smartDevices ? `<p><strong>Smart Devices Data:</strong> ${this.escapeHtml(JSON.stringify(data.smartDevices))}</p>` : ''}
      ${data.wallPanels ? `<p><strong>Wall Panels Data:</strong> ${this.escapeHtml(JSON.stringify(data.wallPanels))}</p>` : ''}
      ${data.carbonRockBoards ? `<p><strong>Carbon Rock Boards Data:</strong> ${this.escapeHtml(JSON.stringify(data.carbonRockBoards))}</p>` : ''}
      <p><strong>Priority:</strong> ${analysis.priority.toUpperCase()}</p>
      <p><strong>Estimated Value:</strong> £${analysis.estimatedValue.toLocaleString()}</p>
    </div>
    <p><strong>View Full Quote Details:</strong> <a href="${this.ctaLinks.viewLink}">${this.ctaLinks.viewLink}</a></p>
    <p><strong>Reply to Customer:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
  </div>
</body>
</html>`.trim();

    const text = `
New Quote Request - ${quoteId}

Customer: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
${data.installationAddress ? `Installation Address: ${data.installationAddress}` : ''}
${data.additionalNotes ? `Additional Notes: ${data.additionalNotes}` : ''}
Entry Point: ${data.entryPoint.replace('-',' ').toUpperCase()}
${data.productCategory ? `Product Category: ${data.productCategory}` : ''}
${data.smartWalls ? `Smart Walls Data: ${JSON.stringify(data.smartWalls)}` : ''}
${data.smartDevices ? `Smart Devices Data: ${JSON.stringify(data.smartDevices)}` : ''}
${data.wallPanels ? `Wall Panels Data: ${JSON.stringify(data.wallPanels)}` : ''}
${data.carbonRockBoards ? `Carbon Rock Boards Data: ${JSON.stringify(data.carbonRockBoards)}` : ''}
Priority: ${analysis.priority.toUpperCase()}
Estimated Value: £${analysis.estimatedValue.toLocaleString()}

View Full Quote Details: ${this.ctaLinks.viewLink}
Reply to Customer: mailto:${data.email}
    `.trim();

    return { html, text };
  }

  /**
   * Generate comprehensive CSS for email compatibility
   */
  private generateEmailCSS(): string {
    return `
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: ${this.brandConfig.textColor};
      background-color: ${this.brandConfig.neutralBg};
      margin: 0;
      padding: 20px;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1a1a1a;
        color: #ffffff;
      }
      
      .email-container {
        background-color: #2d2d2d !important;
        border: 1px solid #404040 !important;
      }
      
      .header {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%) !important;
      }
      
      .quote-table {
        background-color: #2d2d2d !important;
        border: 1px solid #404040 !important;
      }
      
      .quote-table th,
      .quote-table td {
        border-bottom: 1px solid #404040 !important;
      }
      
      .quote-table tr:nth-child(even) {
        background-color: #333333 !important;
      }
    }

    /* Container */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, ${this.brandConfig.primaryColor} 0%, ${this.brandConfig.accentColor} 100%);
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
    }

    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 15px;
    }

    .company-name {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .tagline {
      font-size: 16px;
      opacity: 0.9;
      font-weight: 300;
    }

    /* Content sections */
    .content-section {
      padding: 30px;
    }

    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: ${this.brandConfig.textColor};
    }

    .thank-you {
      font-size: 16px;
      margin-bottom: 25px;
      color: #666666;
      line-height: 1.7;
    }

    /* Quote table */
    .quote-table {
      width: 100%;
      border-collapse: collapse;
      margin: 25px 0;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .quote-table th,
    .quote-table td {
      padding: 15px 20px;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    .quote-table th {
      background-color: ${this.brandConfig.neutralBg};
      font-weight: 600;
      color: ${this.brandConfig.textColor};
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .quote-table tr:nth-child(even) {
      background-color: ${this.brandConfig.neutralBg};
    }

    .quote-table tr:hover {
      background-color: #f1f3f4;
    }

    .quote-table .total-row {
      background-color: ${this.brandConfig.accentColor} !important;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 16px;
    }

    .quote-table .total-row td {
      border-bottom: none;
    }

    /* CTA Buttons */
    .cta-section {
      padding: 30px;
      text-align: center;
      background-color: ${this.brandConfig.neutralBg};
    }

    .cta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }

    .cta-button {
      display: inline-block;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      cursor: pointer;
    }

    .cta-primary {
      background-color: ${this.brandConfig.accentColor};
      color: #ffffff;
      border-color: ${this.brandConfig.accentColor};
    }

    .cta-primary:hover {
      background-color: ${this.brandConfig.primaryColor};
      border-color: ${this.brandConfig.primaryColor};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .cta-secondary {
      background-color: transparent;
      color: ${this.brandConfig.primaryColor};
      border-color: ${this.brandConfig.primaryColor};
    }

    .cta-secondary:hover {
      background-color: ${this.brandConfig.primaryColor};
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* Product summary */
    .product-summary {
      padding: 30px;
      background-color: #ffffff;
    }

    .product-summary h3 {
      color: ${this.brandConfig.primaryColor};
      margin-bottom: 15px;
      font-size: 20px;
    }

    .product-item {
      margin-bottom: 15px;
      padding: 15px;
      background-color: ${this.brandConfig.neutralBg};
      border-radius: 6px;
      border-left: 4px solid ${this.brandConfig.accentColor};
    }

    .product-item h4 {
      color: ${this.brandConfig.primaryColor};
      margin-bottom: 8px;
      font-size: 16px;
    }

    .product-item p {
      color: #666666;
      font-size: 14px;
      margin: 0;
    }

    /* Next steps */
    .next-steps {
      padding: 30px;
      background-color: ${this.brandConfig.neutralBg};
    }

    .next-steps h3 {
      color: ${this.brandConfig.primaryColor};
      margin-bottom: 15px;
      font-size: 20px;
    }

    .next-steps ul {
      list-style: none;
      padding: 0;
    }

    .next-steps li {
      padding: 10px 0;
      padding-left: 25px;
      position: relative;
      color: #666666;
    }

    .next-steps li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: ${this.brandConfig.accentColor};
      font-weight: bold;
    }

    /* Footer */
    .footer {
      background-color: ${this.brandConfig.primaryColor};
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
    }

    .footer-content {
      margin-bottom: 25px;
    }

    .footer h4 {
      margin-bottom: 15px;
      font-size: 18px;
    }

    .footer p {
      margin-bottom: 8px;
      opacity: 0.9;
    }

    .social-links {
      margin: 20px 0;
    }

    .social-link {
      display: inline-block;
      margin: 0 10px;
      padding: 10px;
      background-color: ${this.brandConfig.accentColor};
      color: #ffffff;
      text-decoration: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      line-height: 20px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background-color: #ffffff;
      color: ${this.brandConfig.primaryColor};
      transform: translateY(-2px);
    }

    .legal-disclaimer {
      font-size: 12px;
      opacity: 0.8;
      margin-top: 20px;
      line-height: 1.5;
    }

    .legal-links {
      margin-top: 15px;
    }

    .legal-links a {
      color: #ffffff;
      text-decoration: underline;
      margin: 0 10px;
      font-size: 12px;
    }

    /* Mobile responsiveness */
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }

      .email-container {
        border-radius: 0;
      }

      .header,
      .content-section,
      .cta-section,
      .product-summary,
      .next-steps,
      .footer {
        padding: 20px;
      }

      .company-name {
        font-size: 24px;
      }

      .cta-grid {
        grid-template-columns: 1fr;
      }

      .quote-table th,
      .quote-table td {
        padding: 10px;
        font-size: 14px;
      }
    }

    /* Print styles */
    @media print {
      body {
        background: #ffffff;
        color: #000000;
      }

      .email-container {
        box-shadow: none;
        border: 1px solid #cccccc;
      }

      .cta-button {
        border: 1px solid #cccccc;
        background: #ffffff !important;
        color: #000000 !important;
      }
    }
    `;
  }

  /**
   * Generate simple CSS for internal emails
   */
  private generateSimpleCSS(): string {
    return `
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .internal-container {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #ddd;
    }

    h1 {
      color: ${this.brandConfig.primaryColor};
      margin-bottom: 20px;
    }

    .quick-info {
      background: #fff;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .quick-info p {
      margin: 5px 0;
    }

    .actions {
      text-align: center;
    }

    .btn-primary,
    .btn-secondary {
      display: inline-block;
      padding: 10px 20px;
      margin: 0 10px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }

    .btn-primary {
      background: ${this.brandConfig.accentColor};
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    `;
  }

  /**
   * Generate header component
   */
  private generateHeader(language: string): string {
    return `
    <div class="header">
      <h1 class="company-name">${this.brandConfig.companyName}</h1>
      <p class="tagline">${this.brandConfig.tagline}</p>
    </div>
    `;
  }

  /**
   * Generate greeting component
   */
  private generateGreeting(customerName: string, language: 'en' | 'fr' | 'es' | 'ar' | 'ur'): string {
    const greeting = this.multilingualContent.greeting[language].replace('{{customerName}}', this.escapeHtml(customerName));
    const thankYou = this.multilingualContent.thankYou[language];

    return `
    <div class="content-section">
      <h2 class="greeting">${greeting}</h2>
      <p class="thank-you">${thankYou}</p>
    </div>
    `;
  }

  /**
   * Generate quote summary table
   */
  private generateQuoteTable(quoteId: string, currentDate: string, expiryDate: string, analysis: QuoteModalAnalysis): string {
    const subtotal = analysis.estimatedValue;
    const tax = Math.round(subtotal * 0.2); // 20% VAT
    const discount = 0; // No discount by default
    const total = subtotal + tax - discount;

    return `
    <div class="content-section">
      <table class="quote-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Quote ID</strong></td>
            <td>${quoteId}</td>
          </tr>
          <tr>
            <td><strong>Date</strong></td>
            <td>${currentDate}</td>
          </tr>
          <tr>
            <td><strong>Valid Until</strong></td>
            <td>${expiryDate}</td>
          </tr>
          <tr>
            <td><strong>Priority</strong></td>
            <td><span style="text-transform: uppercase; font-weight: bold; color: ${this.brandConfig.accentColor};">${analysis.priority}</span></td>
          </tr>
          <tr>
            <td><strong>Subtotal</strong></td>
            <td>£${subtotal.toLocaleString()}</td>
          </tr>
          <tr>
            <td><strong>VAT (20%)</strong></td>
            <td>£${tax.toLocaleString()}</td>
          </tr>
          <tr>
            <td><strong>Discount</strong></td>
            <td>£${discount.toLocaleString()}</td>
          </tr>
          <tr class="total-row">
            <td><strong>Total</strong></td>
            <td><strong>£${total.toLocaleString()}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
  }



  /**
   * Generate product summary section
   */
  private generateProductSummary(data: QuoteModalData, analysis: QuoteModalAnalysis): string {
    let productItems = '';

    if (data.smartWalls) {
      productItems += `
        <li>
          <h4>Smart Walls System</h4>
          <p>Pre-manufactured smart walls with integrated technology for TV, sound, gaming, security, and lighting control.</p>
        </li>
      `;
    }

    if (data.smartDevices) {
      productItems += `
        <li>
          <h4>Smart Devices Integration</h4>
          <p>Advanced IoT systems with AI control, security sensors, and home automation features.</p>
        </li>
      `;
    }

    if (data.wallPanels) {
      productItems += `
        <li>
          <h4>Wall Panels</h4>
          <p>Premium wall panels with luxury finishes and professional installation.</p>
        </li>
      `;
    }

    if (data.carbonRockBoards) {
      productItems += `
        <li>
          <h4>Carbon Rock Boards</h4>
          <p>A1 fire-resistant boards with exceptional thermal and acoustic insulation properties.</p>
        </li>
      `;
    }

    if (!productItems) {
      productItems = `
        <li>
          <h4>Custom Wall Solution</h4>
          <p>Tailored wall solution based on your specific requirements and preferences.</p>
        </li>
      `;
    }

    return `
    <div class="product-summary">
      <h3>Your Selected Products</h3>
      <ul>
        ${productItems}
      </ul>
      <p style="margin-top: 20px; color: #666; font-style: italic;">
        Estimated project complexity: ${analysis.complexity} | 
        Products included: ${analysis.productCount} | 
        Special requirements: ${analysis.specialRequirements.length || 'None'}
      </p>
    </div>
    `;
  }

  /**
   * Generate next steps section
   */
  private generateNextSteps(language: 'en' | 'fr' | 'es' | 'ar' | 'ur'): string {
    const nextStepsText = this.multilingualContent.nextSteps[language];

    return `
    <div class="next-steps">
      <h3>What Happens Next?</h3>
      <p style="margin-bottom: 20px;">${nextStepsText}</p>
      <ul>
        <li>Technical review and feasibility assessment within 2 business hours</li>
        <li>Detailed cost analysis with material specifications</li>
        <li>Custom proposal preparation with visual mockups</li>
        <li>Priority consultation with our design specialists</li>
        <li>Professional installation scheduling and coordination</li>
      </ul>
    </div>
    `;
  }

  /**
   * Generate footer component
   */
  private generateFooter(): string {
    return `
    <div class="footer">
      <div class="footer-content">
        <h4>${this.brandConfig.companyName}</h4>
        <p>${this.brandConfig.address}</p>
        <p>Phone: ${this.brandConfig.phone}</p>
        <p>Email: ${this.brandConfig.email}</p>
        <p>Website: ${this.brandConfig.website}</p>
      </div>



      <div class="legal-disclaimer">
        <p>This email and its attachments are confidential and intended solely for the addressee. 
        If you have received this email in error, please notify the sender immediately and delete it. 
        Any unauthorized use, disclosure, or distribution is strictly prohibited.</p>
        
        <div class="legal-links">
          <a href="${this.brandConfig.website}/privacy">Privacy Policy</a>
          <a href="${this.brandConfig.website}/terms">Terms of Service</a>
          <a href="${this.brandConfig.website}/unsubscribe">Unsubscribe</a>
        </div>
      </div>
    </div>
    `;
  }

  /**
   * Generate plain text version of the email
   */
  private generatePlainTextVersion(
    data: QuoteModalData,
    analysis: QuoteModalAnalysis,
    quoteId: string,
    currentDate: string,
    expiryDate: string,
    language: 'en' | 'fr' | 'es' | 'ar' | 'ur'
  ): string {
    const greeting = this.multilingualContent.greeting[language].replace('{{customerName}}', data.fullName);
    const thankYou = this.multilingualContent.thankYou[language];
    const nextSteps = this.multilingualContent.nextSteps[language];

    const subtotal = analysis.estimatedValue;
    const tax = Math.round(subtotal * 0.2);
    const total = subtotal + tax;

    return `
${this.brandConfig.companyName}
${this.brandConfig.tagline}

${greeting}

${thankYou}

QUOTE SUMMARY
=============
Quote ID: ${quoteId}
Date: ${currentDate}
Valid Until: ${expiryDate}
Priority: ${analysis.priority.toUpperCase()}

Subtotal: £${subtotal.toLocaleString()}
VAT (20%): £${tax.toLocaleString()}
TOTAL: £${total.toLocaleString()}

YOUR SELECTED PRODUCTS
======================
${this.generatePlainTextProductList(data)}

WHAT HAPPENS NEXT?
==================
${nextSteps}

• Technical review and feasibility assessment within 2 business hours
• Detailed cost analysis with material specifications  
• Custom proposal preparation with visual mockups
• Priority consultation with our design specialists
• Professional installation scheduling and coordination

TAKE ACTION
===========
View Quote Online: ${this.ctaLinks.viewLink}
Download PDF: ${this.ctaLinks.pdfLink}
Approve Quote: ${this.ctaLinks.approveLink}
Request Changes: ${this.ctaLinks.requestChangesLink}
Request Callback: ${this.ctaLinks.requestCallbackLink}
Schedule Consultation: ${this.ctaLinks.scheduleConsultationLink}

CONTACT INFORMATION
===================
${this.brandConfig.companyName}
${this.brandConfig.address}
Phone: ${this.brandConfig.phone}
Email: ${this.brandConfig.email}
Website: ${this.brandConfig.website}

This email and its attachments are confidential and intended solely for the addressee.

Privacy Policy: ${this.brandConfig.website}/privacy
Terms of Service: ${this.brandConfig.website}/terms
Unsubscribe: ${this.brandConfig.website}/unsubscribe
    `.trim();
  }

  /**
   * Generate plain text product list
   */
  private generatePlainTextProductList(data: QuoteModalData): string {
    const products: string[] = [];

    if (data.smartWalls) {
      products.push('• Smart Walls System - Pre-manufactured smart walls with integrated technology');
    }
    if (data.smartDevices) {
      products.push('• Smart Devices Integration - Advanced IoT systems with AI control');
    }
    if (data.wallPanels) {
      products.push('• Wall Panels - Premium wall panels with luxury finishes');
    }
    if (data.carbonRockBoards) {
      products.push('• Carbon Rock Boards - A1 fire-resistant boards with insulation');
    }

    return products.length > 0 ? products.join('\n') : '• Custom Wall Solution - Tailored solution for your requirements';
  }

  /**
   * Generate a unique quote ID
   */
  private generateQuoteId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `QTM-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Escape HTML characters for security
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    return String(text || '').replace(/[&<>"'\/]/g, (m) => map[m] || m);
  }
}

/* ===============================
   EXPORT FUNCTIONS
   =============================== */

/**
 * Generate Wall Shop branded email template
 */
export function generateWallShopEmailTemplate(
  data: QuoteModalData,
  analysis: QuoteModalAnalysis,
  options: EmailTemplateOptions = {}
): { html: string; text: string } {
  const template = new WallShopEmailTemplate(options);
  return template.generateEmailTemplate(data, analysis, options);
}

/**
 * Get available theme variants
 */
export function getThemeVariants(): ThemeVariant[] {
  return THEME_VARIANTS;
}

/**
 * Get default brand configuration
 */
export function getDefaultBrandConfig(): BrandConfig {
  return DEFAULT_BRAND_CONFIG;
}

/**
 * Get multilingual content
 */
export function getMultilingualContent(): MultilingualContent {
  return MULTILINGUAL_CONTENT;
}

export { WallShopEmailTemplate, type EmailTemplateOptions, type BrandConfig, type CTALinks, type ThemeVariant };
