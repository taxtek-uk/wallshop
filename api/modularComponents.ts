// modularComponents.ts - Modular Email Template Components for Wall Shop
// Reusable, customizable email components with advanced theming support

import type { QuoteModalData, QuoteModalAnalysis } from './sendQuote';
import type { BrandConfig, CTALinks, ThemeVariant } from './emailTemplate';

/* ===============================
   EXTENDED THEME VARIANTS
   =============================== */

export const EXTENDED_THEME_VARIANTS: ThemeVariant[] = [
  {
    name: 'default',
    primaryColor: '#2C3E50',
    accentColor: '#E67E22',
    neutralBg: '#F8F9FA',
    textColor: '#2C3E50',
    description: 'Professional navy and orange theme'
  },
  {
    name: 'pastel',
    primaryColor: '#6C7B7F',
    accentColor: '#F39C12',
    neutralBg: '#FDF6E3',
    textColor: '#5D4E75',
    description: 'Soft pastel theme with warm tones'
  },
  {
    name: 'dark',
    primaryColor: '#1A1A1A',
    accentColor: '#FF6B35',
    neutralBg: '#2D2D2D',
    textColor: '#FFFFFF',
    description: 'Dark mode with vibrant accent'
  },
  {
    name: 'high-contrast',
    primaryColor: '#000000',
    accentColor: '#FFD700',
    neutralBg: '#FFFFFF',
    textColor: '#000000',
    description: 'High contrast for accessibility'
  },
  {
    name: 'luxury',
    primaryColor: '#1B1B1B',
    accentColor: '#D4AF37',
    neutralBg: '#F5F5DC',
    textColor: '#2F2F2F',
    description: 'Luxury gold and black theme'
  },
  {
    name: 'modern-blue',
    primaryColor: '#0F4C75',
    accentColor: '#3282B8',
    neutralBg: '#BBE1FA',
    textColor: '#0F3460',
    description: 'Modern blue gradient theme'
  },
  {
    name: 'earth-tone',
    primaryColor: '#8B4513',
    accentColor: '#CD853F',
    neutralBg: '#F5DEB3',
    textColor: '#654321',
    description: 'Warm earth tone theme'
  },
  {
    name: 'minimalist',
    primaryColor: '#333333',
    accentColor: '#007BFF',
    neutralBg: '#FAFAFA',
    textColor: '#333333',
    description: 'Clean minimalist theme'
  }
];

/* ===============================
   MODULAR COMPONENT SYSTEM
   =============================== */

export class EmailComponentBuilder {
  private brandConfig: BrandConfig;
  private ctaLinks: CTALinks;

  constructor(brandConfig: BrandConfig, ctaLinks: CTALinks) {
    this.brandConfig = brandConfig;
    this.ctaLinks = ctaLinks;
  }

  /**
   * Generate header component with logo and branding
   */
  generateHeaderComponent(options: {
    language?: string;
    showTagline?: boolean;
    customTitle?: string;
  } = {}): string {
    const { language = 'en', showTagline = true, customTitle } = options;

    return `
    <!-- EMAIL HEADER COMPONENT -->
    <div class="email-header" style="
      background: linear-gradient(135deg, ${this.brandConfig.primaryColor} 0%, ${this.brandConfig.accentColor} 100%);
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
      border-radius: 12px 12px 0 0;
    ">
      <!-- Logo -->
      <img src="${this.brandConfig.logoUrl}" 
           alt="${this.brandConfig.companyName}" 
           style="
             max-width: 200px;
             height: auto;
             margin-bottom: 15px;
             display: block;
             margin-left: auto;
             margin-right: auto;
           ">
      
      <!-- Company Name -->
      <h1 style="
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 8px 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        ${customTitle || this.brandConfig.companyName}
      </h1>
      
      <!-- Tagline -->
      ${showTagline ? `
      <p style="
        font-size: 16px;
        opacity: 0.9;
        font-weight: 300;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        ${this.brandConfig.tagline}
      </p>
      ` : ''}
    </div>
    `;
  }

  /**
   * Generate footer component with contact info and social links
   */
  generateFooterComponent(options: {
    includeDisclaimer?: boolean;
    includeSocialLinks?: boolean;
    customDisclaimer?: string;
  } = {}): string {
    const { includeDisclaimer = true, includeSocialLinks = true, customDisclaimer } = options;

    return `
    <!-- EMAIL FOOTER COMPONENT -->
    <div class="email-footer" style="
      background-color: ${this.brandConfig.primaryColor};
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
      border-radius: 0 0 12px 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <!-- Company Information -->
      <div style="margin-bottom: 25px;">
        <h4 style="
          margin: 0 0 15px 0;
          font-size: 18px;
          font-weight: 600;
        ">
          ${this.brandConfig.companyName}
        </h4>
        <p style="margin: 0 0 8px 0; opacity: 0.9; font-size: 14px;">${this.brandConfig.address}</p>
        <p style="margin: 0 0 8px 0; opacity: 0.9; font-size: 14px;">Phone: ${this.brandConfig.phone}</p>
        <p style="margin: 0 0 8px 0; opacity: 0.9; font-size: 14px;">Email: ${this.brandConfig.email}</p>
        <p style="margin: 0; opacity: 0.9; font-size: 14px;">Website: ${this.brandConfig.website}</p>
      </div>

      ${includeSocialLinks ? `
      <!-- Social Links -->
      <div style="margin: 20px 0;">
        ${this.brandConfig.socialLinks.linkedin ? `
        <a href="${this.brandConfig.socialLinks.linkedin}" style="
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
          font-weight: bold;
          font-size: 14px;
        ">in</a>
        ` : ''}
        ${this.brandConfig.socialLinks.instagram ? `
        <a href="${this.brandConfig.socialLinks.instagram}" style="
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
          font-weight: bold;
          font-size: 14px;
        ">ig</a>
        ` : ''}
        ${this.brandConfig.socialLinks.website ? `
        <a href="${this.brandConfig.socialLinks.website}" style="
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
          font-weight: bold;
          font-size: 12px;
        ">web</a>
        ` : ''}
      </div>
      ` : ''}

      ${includeDisclaimer ? `
      <!-- Legal Disclaimer -->
      <div style="
        font-size: 12px;
        opacity: 0.8;
        margin-top: 20px;
        line-height: 1.5;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
      ">
        <p style="margin: 0 0 15px 0;">
          ${customDisclaimer || 'This email and its attachments are confidential and intended solely for the addressee. If you have received this email in error, please notify the sender immediately and delete it. Any unauthorized use, disclosure, or distribution is strictly prohibited.'}
        </p>
        
        <div>
          <a href="${this.brandConfig.website}/privacy" style="color: #ffffff; text-decoration: underline; margin: 0 10px; font-size: 12px;">Privacy Policy</a>
          <a href="${this.brandConfig.website}/terms" style="color: #ffffff; text-decoration: underline; margin: 0 10px; font-size: 12px;">Terms of Service</a>
          <a href="${this.brandConfig.website}/unsubscribe" style="color: #ffffff; text-decoration: underline; margin: 0 10px; font-size: 12px;">Unsubscribe</a>
        </div>
      </div>
      ` : ''}
    </div>
    `;
  }

  /**
   * Generate CTA button block component
   */
  generateCTABlockComponent(options: {
    title?: string;
    buttons?: Array<{
      text: string;
      url: string;
      type: 'primary' | 'secondary';
    }>;
    layout?: 'grid' | 'inline' | 'stacked';
  } = {}): string {
    const { 
      title = 'Take Action on Your Quote',
      buttons = [
        { text: 'View Quote Online', url: this.ctaLinks.viewLink, type: 'primary' },
        { text: 'Download PDF', url: this.ctaLinks.pdfLink, type: 'secondary' },
        { text: 'Approve Quote', url: this.ctaLinks.approveLink, type: 'primary' },
        { text: 'Request Changes', url: this.ctaLinks.requestChangesLink, type: 'secondary' },
        { text: 'Request Callback', url: this.ctaLinks.requestCallbackLink, type: 'primary' },
        { text: 'Schedule Consultation', url: this.ctaLinks.scheduleConsultationLink, type: 'secondary' }
      ],
      layout = 'grid'
    } = options;

    const layoutStyles = {
      grid: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;',
      inline: 'display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;',
      stacked: 'display: flex; flex-direction: column; gap: 15px; max-width: 300px; margin: 0 auto;'
    };

    const buttonElements = buttons.map(button => {
      const isPrimary = button.type === 'primary';
      return `
      <a href="${button.url}" style="
        display: inline-block;
        padding: 14px 28px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        border: 2px solid ${isPrimary ? this.brandConfig.accentColor : this.brandConfig.primaryColor};
        background-color: ${isPrimary ? this.brandConfig.accentColor : 'transparent'};
        color: ${isPrimary ? '#ffffff' : this.brandConfig.primaryColor};
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transition: all 0.3s ease;
      " onmouseover="
        this.style.backgroundColor='${this.brandConfig.primaryColor}';
        this.style.borderColor='${this.brandConfig.primaryColor}';
        this.style.color='#ffffff';
        this.style.transform='translateY(-2px)';
      " onmouseout="
        this.style.backgroundColor='${isPrimary ? this.brandConfig.accentColor : 'transparent'}';
        this.style.borderColor='${isPrimary ? this.brandConfig.accentColor : this.brandConfig.primaryColor}';
        this.style.color='${isPrimary ? '#ffffff' : this.brandConfig.primaryColor}';
        this.style.transform='translateY(0)';
      ">
        ${button.text}
      </a>
      `;
    }).join('');

    return `
    <!-- CTA BLOCK COMPONENT -->
    <div class="cta-section" style="
      padding: 30px;
      text-align: center;
      background-color: ${this.brandConfig.neutralBg};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <h3 style="
        color: ${this.brandConfig.primaryColor};
        margin: 0 0 20px 0;
        font-size: 20px;
        font-weight: 600;
      ">
        ${title}
      </h3>
      
      <div style="${layoutStyles[layout]}">
        ${buttonElements}
      </div>
    </div>
    `;
  }

  /**
   * Generate quote table component
   */
  generateQuoteTableComponent(
    quoteId: string,
    analysis: QuoteModalAnalysis,
    options: {
      showVAT?: boolean;
      showDiscount?: boolean;
      customFields?: Array<{ label: string; value: string }>;
    } = {}
  ): string {
    const { showVAT = true, showDiscount = false, customFields = [] } = options;
    
    const currentDate = new Date().toLocaleDateString('en-GB');
    const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');
    
    const subtotal = analysis.estimatedValue;
    const vat = showVAT ? Math.round(subtotal * 0.2) : 0;
    const discount = showDiscount ? 0 : 0; // Can be customized
    const total = subtotal + vat - discount;

    const customFieldRows = customFields.map(field => `
      <tr>
        <td style="
          padding: 15px 20px;
          text-align: left;
          border-bottom: 1px solid #e9ecef;
          font-weight: 600;
          color: ${this.brandConfig.textColor};
        ">
          ${field.label}
        </td>
        <td style="
          padding: 15px 20px;
          text-align: left;
          border-bottom: 1px solid #e9ecef;
          color: ${this.brandConfig.textColor};
        ">
          ${field.value}
        </td>
      </tr>
    `).join('');

    return `
    <!-- QUOTE TABLE COMPONENT -->
    <div style="padding: 30px;">
      <table style="
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <thead>
          <tr>
            <th style="
              padding: 15px 20px;
              text-align: left;
              background-color: ${this.brandConfig.neutralBg};
              font-weight: 600;
              color: ${this.brandConfig.textColor};
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              border-bottom: 1px solid #e9ecef;
            ">
              Description
            </th>
            <th style="
              padding: 15px 20px;
              text-align: left;
              background-color: ${this.brandConfig.neutralBg};
              font-weight: 600;
              color: ${this.brandConfig.textColor};
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              border-bottom: 1px solid #e9ecef;
            ">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              font-weight: 600;
              color: ${this.brandConfig.textColor};
            ">
              Quote ID
            </td>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              color: ${this.brandConfig.textColor};
            ">
              ${quoteId}
            </td>
          </tr>
          <tr style="background-color: ${this.brandConfig.neutralBg};">
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              font-weight: 600;
              color: ${this.brandConfig.textColor};
            ">
              Date
            </td>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              color: ${this.brandConfig.textColor};
            ">
              ${currentDate}
            </td>
          </tr>
          <tr>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              font-weight: 600;
              color: ${this.brandConfig.textColor};
            ">
              Valid Until
            </td>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              color: ${this.brandConfig.textColor};
            ">
              ${expiryDate}
            </td>
          </tr>
          <tr style="background-color: ${this.brandConfig.neutralBg};">
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              font-weight: 600;
              color: ${this.brandConfig.textColor};
            ">
              Priority
            </td>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              color: ${this.brandConfig.textColor};
            ">
              <span style="
                text-transform: uppercase;
                font-weight: bold;
                color: ${this.brandConfig.accentColor};
              ">
                ${analysis.priority}
              </span>
            </td>
          </tr>
          ${customFieldRows}
          <tr>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              font-weight: 600;
              color: ${this.brandConfig.textColor};
            ">
              Subtotal
            </td>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              color: ${this.brandConfig.textColor};
            ">
              £${subtotal.toLocaleString()}
            </td>
          </tr>
          ${showVAT ? `
          <tr style="background-color: ${this.brandConfig.neutralBg};">
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              font-weight: 600;
              color: ${this.brandConfig.textColor};
            ">
              VAT (20%)
            </td>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              color: ${this.brandConfig.textColor};
            ">
              £${vat.toLocaleString()}
            </td>
          </tr>
          ` : ''}
          ${showDiscount ? `
          <tr>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              font-weight: 600;
              color: ${this.brandConfig.textColor};
            ">
              Discount
            </td>
            <td style="
              padding: 15px 20px;
              text-align: left;
              border-bottom: 1px solid #e9ecef;
              color: ${this.brandConfig.textColor};
            ">
              £${discount.toLocaleString()}
            </td>
          </tr>
          ` : ''}
          <tr style="
            background-color: ${this.brandConfig.accentColor} !important;
            color: #ffffff !important;
          ">
            <td style="
              padding: 15px 20px;
              text-align: left;
              font-weight: 700;
              font-size: 16px;
              color: #ffffff;
            ">
              Total
            </td>
            <td style="
              padding: 15px 20px;
              text-align: left;
              font-weight: 700;
              font-size: 16px;
              color: #ffffff;
            ">
              £${total.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
  }

  /**
   * Generate product summary component
   */
  generateProductSummaryComponent(
    data: QuoteModalData,
    analysis: QuoteModalAnalysis,
    options: {
      showComplexity?: boolean;
      showRequirements?: boolean;
      customProducts?: Array<{ name: string; description: string }>;
    } = {}
  ): string {
    const { showComplexity = true, showRequirements = true, customProducts } = options;

    let productItems = '';

    if (customProducts) {
      productItems = customProducts.map(product => `
        <div style="
          margin-bottom: 15px;
          padding: 15px;
          background-color: ${this.brandConfig.neutralBg};
          border-radius: 6px;
          border-left: 4px solid ${this.brandConfig.accentColor};
        ">
          <h4 style="
            color: ${this.brandConfig.primaryColor};
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
          ">
            ${product.name}
          </h4>
          <p style="
            color: #666666;
            font-size: 14px;
            margin: 0;
            line-height: 1.5;
          ">
            ${product.description}
          </p>
        </div>
      `).join('');
    } else {
      // Generate default product items based on data
      if (data.smartWalls) {
        productItems += `
          <div style="
            margin-bottom: 15px;
            padding: 15px;
            background-color: ${this.brandConfig.neutralBg};
            border-radius: 6px;
            border-left: 4px solid ${this.brandConfig.accentColor};
          ">
            <h4 style="
              color: ${this.brandConfig.primaryColor};
              margin: 0 0 8px 0;
              font-size: 16px;
              font-weight: 600;
            ">
              Smart Walls System
            </h4>
            <p style="
              color: #666666;
              font-size: 14px;
              margin: 0;
              line-height: 1.5;
            ">
              Pre-manufactured smart walls with integrated technology for TV, sound, gaming, security, and lighting control.
            </p>
          </div>
        `;
      }

      if (data.smartDevices) {
        productItems += `
          <div style="
            margin-bottom: 15px;
            padding: 15px;
            background-color: ${this.brandConfig.neutralBg};
            border-radius: 6px;
            border-left: 4px solid ${this.brandConfig.accentColor};
          ">
            <h4 style="
              color: ${this.brandConfig.primaryColor};
              margin: 0 0 8px 0;
              font-size: 16px;
              font-weight: 600;
            ">
              Smart Devices Integration
            </h4>
            <p style="
              color: #666666;
              font-size: 14px;
              margin: 0;
              line-height: 1.5;
            ">
              Advanced IoT systems with AI control, security sensors, and home automation features.
            </p>
          </div>
        `;
      }

      if (data.wallPanels) {
        productItems += `
          <div style="
            margin-bottom: 15px;
            padding: 15px;
            background-color: ${this.brandConfig.neutralBg};
            border-radius: 6px;
            border-left: 4px solid ${this.brandConfig.accentColor};
          ">
            <h4 style="
              color: ${this.brandConfig.primaryColor};
              margin: 0 0 8px 0;
              font-size: 16px;
              font-weight: 600;
            ">
              Wall Panels
            </h4>
            <p style="
              color: #666666;
              font-size: 14px;
              margin: 0;
              line-height: 1.5;
            ">
              Premium wall panels with luxury finishes and professional installation.
            </p>
          </div>
        `;
      }

      if (data.carbonRockBoards) {
        productItems += `
          <div style="
            margin-bottom: 15px;
            padding: 15px;
            background-color: ${this.brandConfig.neutralBg};
            border-radius: 6px;
            border-left: 4px solid ${this.brandConfig.accentColor};
          ">
            <h4 style="
              color: ${this.brandConfig.primaryColor};
              margin: 0 0 8px 0;
              font-size: 16px;
              font-weight: 600;
            ">
              Carbon Rock Boards
            </h4>
            <p style="
              color: #666666;
              font-size: 14px;
              margin: 0;
              line-height: 1.5;
            ">
              A1 fire-resistant boards with exceptional thermal and acoustic insulation properties.
            </p>
          </div>
        `;
      }

      if (!productItems) {
        productItems = `
          <div style="
            margin-bottom: 15px;
            padding: 15px;
            background-color: ${this.brandConfig.neutralBg};
            border-radius: 6px;
            border-left: 4px solid ${this.brandConfig.accentColor};
          ">
            <h4 style="
              color: ${this.brandConfig.primaryColor};
              margin: 0 0 8px 0;
              font-size: 16px;
              font-weight: 600;
            ">
              Custom Wall Solution
            </h4>
            <p style="
              color: #666666;
              font-size: 14px;
              margin: 0;
              line-height: 1.5;
            ">
              Tailored wall solution based on your specific requirements and preferences.
            </p>
          </div>
        `;
      }
    }

    return `
    <!-- PRODUCT SUMMARY COMPONENT -->
    <div style="
      padding: 30px;
      background-color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <h3 style="
        color: ${this.brandConfig.primaryColor};
        margin: 0 0 15px 0;
        font-size: 20px;
        font-weight: 600;
      ">
        Your Selected Products
      </h3>
      
      ${productItems}
      
      ${showComplexity || showRequirements ? `
      <p style="
        margin-top: 20px;
        color: #666;
        font-style: italic;
        font-size: 14px;
        line-height: 1.5;
      ">
        ${showComplexity ? `Estimated project complexity: ${analysis.complexity}` : ''}
        ${showComplexity && showRequirements ? ' | ' : ''}
        ${showRequirements ? `Products included: ${analysis.productCount}` : ''}
        ${showRequirements && analysis.specialRequirements.length ? ` | Special requirements: ${analysis.specialRequirements.length}` : ''}
      </p>
      ` : ''}
    </div>
    `;
  }

  /**
   * Generate tracking pixel component
   */
  generateTrackingPixelComponent(trackingUrl: string, options: {
    customAttributes?: Record<string, string>;
  } = {}): string {
    const { customAttributes = {} } = options;
    
    const attributes = Object.entries(customAttributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    return `
    <!-- TRACKING PIXEL COMPONENT -->
    <img src="${trackingUrl}" 
         width="1" 
         height="1" 
         style="display:none;" 
         alt=""
         ${attributes}>
    `;
  }

  /**
   * Generate responsive email wrapper
   */
  generateEmailWrapper(content: string, options: {
    maxWidth?: string;
    backgroundColor?: string;
    fontFamily?: string;
  } = {}): string {
    const { 
      maxWidth = '600px',
      backgroundColor = this.brandConfig.neutralBg,
      fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    } = options;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>The Wall Shop</title>
      <style>
        /* Reset */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        /* Base */
        body {
          font-family: ${fontFamily};
          line-height: 1.6;
          color: ${this.brandConfig.textColor};
          background-color: ${backgroundColor};
          margin: 0;
          padding: 20px;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          body { background-color: #1a1a1a; color: #ffffff; }
          .email-container { background-color: #2d2d2d !important; border: 1px solid #404040 !important; }
        }
        
        /* Mobile */
        @media only screen and (max-width: 600px) {
          body { padding: 10px; }
          .email-container { border-radius: 0; }
        }
      </style>
    </head>
    <body>
      <div class="email-container" style="
        max-width: ${maxWidth};
        margin: 0 auto;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      ">
        ${content}
      </div>
    </body>
    </html>
    `;
  }
}

/* ===============================
   UTILITY FUNCTIONS
   =============================== */

/**
 * Apply theme to brand configuration
 */
export function applyThemeToBrandConfig(
  brandConfig: BrandConfig,
  themeName: string
): BrandConfig {
  const theme = EXTENDED_THEME_VARIANTS.find(t => t.name === themeName);
  if (!theme) return brandConfig;

  return {
    ...brandConfig,
    primaryColor: theme.primaryColor,
    accentColor: theme.accentColor,
    neutralBg: theme.neutralBg,
    textColor: theme.textColor
  };
}

/**
 * Generate complete modular email
 */
export function generateModularEmail(
  data: QuoteModalData,
  analysis: QuoteModalAnalysis,
  brandConfig: BrandConfig,
  ctaLinks: CTALinks,
  options: {
    theme?: string;
    trackingPixel?: string;
    customComponents?: {
      header?: any;
      footer?: any;
      cta?: any;
      table?: any;
      products?: any;
    };
  } = {}
): string {
  // Apply theme if specified
  const themedBrandConfig = options.theme 
    ? applyThemeToBrandConfig(brandConfig, options.theme)
    : brandConfig;

  const builder = new EmailComponentBuilder(themedBrandConfig, ctaLinks);
  const quoteId = `QTM-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase();

  // Generate components
  const header = builder.generateHeaderComponent(options.customComponents?.header);
  const greeting = `
    <div style="padding: 30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <h2 style="font-size: 18px; margin-bottom: 20px; color: ${themedBrandConfig.textColor};">
        Dear ${data.fullName},
      </h2>
      <p style="font-size: 16px; margin-bottom: 25px; color: #666666; line-height: 1.7;">
        Thank you for your interest in our premium wall solutions. Our expert team will review your requirements and prepare a detailed proposal.
      </p>
    </div>
  `;
  const quoteTable = builder.generateQuoteTableComponent(quoteId, analysis, options.customComponents?.table);
  const ctaBlock = builder.generateCTABlockComponent(options.customComponents?.cta);
  const productSummary = builder.generateProductSummaryComponent(data, analysis, options.customComponents?.products);
  const footer = builder.generateFooterComponent(options.customComponents?.footer);
  const trackingPixel = options.trackingPixel 
    ? builder.generateTrackingPixelComponent(options.trackingPixel)
    : '';

  // Combine components
  const content = header + greeting + quoteTable + ctaBlock + productSummary + footer + trackingPixel;

  // Wrap in responsive container
  return builder.generateEmailWrapper(content);
}



