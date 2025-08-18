/**
 * Consultation Request Handler
 * Handles form submission and email notifications for consultation requests
 * Email: stephen@thewallshop.co.uk
 */

// Types for consultation data

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

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
}

// Email configuration
const EMAIL_CONFIG = {
  recipientEmail: 'stephen@thewallshop.co.uk',
  fromEmail: 'noreply@thewallshop.co.uk',
  fromName: 'The Wall Shop - Consultation System',
  replyToEmail: '', // Will be set to customer's email
};

/**
 * Validates consultation form data
 */
export function validateConsultationData(data: Partial<ConsultationData>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required fields validation
  if (!data.fullName?.trim()) {
    errors.push('Full name is required');
  } else if (data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.fullName.trim())) {
    errors.push('Full name contains invalid characters');
  }

  if (!data.email?.trim()) {
    errors.push('Email address is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email address format');
  }

  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  } else {
    const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, '');
    if (!/^[\+]?[1-9][\d]{0,15}$/.test(cleanPhone) || cleanPhone.length < 10) {
      errors.push('Invalid phone number format');
    }
  }

  if (!data.projectType) {
    errors.push('Project type is required');
  }

  if (!data.budget) {
    errors.push('Budget range is required');
  }

  if (!data.timeline) {
    errors.push('Project timeline is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Formats consultation data for email
 */
export function formatConsultationForEmail(data: ConsultationData): EmailTemplate {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getProjectTypeDisplay = (type: string): string => {
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
  };

  const getBudgetDisplay = (budget: string): string => {
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
  };

  const getTimelineDisplay = (timeline: string): string => {
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
  };

  const getHearAboutUsDisplay = (source: string): string => {
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
  };

  const subject = `New Consultation Request - ${data.fullName} (${getProjectTypeDisplay(data.projectType)})`;

  const html = `
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
            display: flex;
            align-items: center;
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
        .btn-email:hover {
            background: #2563eb;
        }
        .btn-phone:hover {
            background: #059669;
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
                ${data.ipAddress ? `<div><strong>IP Address:</strong> ${data.ipAddress}</div>` : ''}
                ${data.userAgent ? `<div><strong>User Agent:</strong> ${data.userAgent.substring(0, 50)}...</div>` : ''}
            </div>
        </div>
    </div>
</body>
</html>`;

  const text = `
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
${data.ipAddress ? `- IP Address: ${data.ipAddress}` : ''}

QUICK ACTIONS:
- Reply to: ${data.email}
- Call: ${data.phone}

Priority Level: ${data.timeline === 'asap' ? 'URGENT' : data.timeline.includes('1-3') ? 'HIGH' : 'STANDARD'}
`;

  return {
    to: EMAIL_CONFIG.recipientEmail,
    subject,
    html,
    text
  };
}

/**
 * Sends consultation data via email (Node.js/Server-side implementation)
 */
export async function sendConsultationEmail(data: ConsultationData): Promise<void> {
  const emailTemplate = formatConsultationForEmail(data);
  
  // For Node.js environments with nodemailer
  if (typeof window === 'undefined') {
    try {
      // Dynamic import for server-side only
      const nodemailer = (await import('nodemailer')).default;
        if (!nodemailer) {
            throw new Error('Nodemailer module not found');
        }
      
      // Create transporter (configure with your email service)
      const transporter = nodemailer.default.createTransporter({
        // Gmail configuration (replace with your email service)
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || EMAIL_CONFIG.fromEmail,
          pass: process.env.EMAIL_PASS || 'your-app-password'
        }
      });

      // Send email
      await transporter.sendMail({
        from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
        to: EMAIL_CONFIG.recipientEmail,
        replyTo: data.email,
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html
      });

      console.log('Consultation email sent successfully to:', EMAIL_CONFIG.recipientEmail);
    } catch (error) {
      console.error('Failed to send consultation email:', error);
      throw new Error('Failed to send email notification');
    }
  }
}

/**
 * Saves consultation data to database/storage
 */
export async function saveConsultationData(data: ConsultationData): Promise<void> {
  try {
    // In a real application, you would save to a database
    // For now, we'll log the data and save to a JSON file
    
    const timestamp = new Date().toISOString();
    const filename = `consultation_${timestamp.replace(/[:.]/g, '-')}.json`;
    
    const consultationRecord = {
      id: `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      status: 'new',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    // Log for debugging
    console.log('Consultation data received:', consultationRecord);

    // In a real application, replace this with database storage
    // Example: await db.consultations.insert(consultationRecord);
    
    // For file-based storage (development/testing)
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      
      const dataDir = path.join(process.cwd(), 'data', 'consultations');
      await fs.promises.mkdir(dataDir, { recursive: true });
      
      const filePath = path.join(dataDir, filename);
      await fs.promises.writeFile(filePath, JSON.stringify(consultationRecord, null, 2));
      
      console.log('Consultation data saved to:', filePath);
    }
  } catch (error) {
    console.error('Failed to save consultation data:', error);
    throw new Error('Failed to save consultation data');
  }
}

/**
 * Main function to handle consultation submission
 */
export async function sendConsultation(data: ConsultationData): Promise<{
  success: boolean;
  message: string;
  consultationId?: string;
}> {
  try {
    // Validate the data
    const validation = validateConsultationData(data);
    if (!validation.isValid) {
      return {
        success: false,
        message: `Validation failed: ${validation.errors.join(', ')}`
      };
    }

    // Save consultation data
    await saveConsultationData(data);

    // Send email notification
    await sendConsultationEmail(data);

    // Send auto-response to customer (optional)
    await sendCustomerConfirmation(data);

    return {
      success: true,
      message: 'Consultation request submitted successfully',
      consultationId: `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  } catch (error) {
    console.error('Error processing consultation:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to process consultation request'
    };
  }
}

/**
 * Sends confirmation email to customer
 */
export async function sendCustomerConfirmation(data: ConsultationData): Promise<void> {
  const confirmationTemplate = {
    to: data.email,
    subject: 'Thank you for your consultation request - The Wall Shop',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultation Request Confirmation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        .content {
            padding: 30px;
        }
        .confirmation-badge {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            display: inline-block;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .next-steps {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .contact-info {
            background: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>The Wall Shop</h1>
            <p>Premium Wall Solutions & Design</p>
        </div>
        
        <div class="content">
            <div class="confirmation-badge">
                Request Received Successfully
            </div>
            
            <h2>Dear ${data.fullName},</h2>
            
            <p>Thank you for your interest in our services! We've received your consultation request for <strong>${data.projectType}</strong> and are excited to help bring your vision to life.</p>
            
            <div class="next-steps">
                <h3>What happens next?</h3>
                <ul>
                    <li><strong>Within 24 hours:</strong> Our team will review your requirements and contact you via your preferred method (${data.preferredContactMethod})</li>
                    <li><strong>Initial consultation:</strong> We'll schedule a free consultation to discuss your project in detail</li>
                    <li><strong>Custom proposal:</strong> Based on our discussion, we'll provide a tailored solution and quote</li>
                </ul>
            </div>
            
            <p>In the meantime, feel free to browse our portfolio and recent projects on our website. If you have any urgent questions, don't hesitate to reach out.</p>
            
            <div class="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> stephen@thewallshop.co.uk<br>
                <strong>Phone:</strong> Available during consultation<br>
                <strong>Website:</strong> www.thewallshop.co.uk</p>
            </div>
            
            <p>We look forward to working with you!</p>
            
            <p>Best regards,<br>
            <strong>Stephen & The Wall Shop Team</strong></p>
        </div>
    </div>
</body>
</html>`,
    text: `
Dear ${data.fullName},

Thank you for your consultation request with The Wall Shop!

We've received your request for ${data.projectType} and will contact you within 24 hours via ${data.preferredContactMethod}.

What happens next:
1. Our team will review your requirements
2. We'll schedule a free consultation
3. We'll provide a custom proposal

Contact us: stephen@thewallshop.co.uk

Best regards,
Stephen & The Wall Shop Team
`
  };

  // Send confirmation email using the same email service
  if (typeof window === 'undefined') {
    try {
      const nodemailer = await import('nodemailer');
      
      const transporter = nodemailer.default.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || EMAIL_CONFIG.fromEmail,
          pass: process.env.EMAIL_PASS || 'your-app-password'
        }
      });

      await transporter.sendMail({
        from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
        to: confirmationTemplate.to,
        subject: confirmationTemplate.subject,
        text: confirmationTemplate.text,
        html: confirmationTemplate.html
      });

      console.log('Confirmation email sent to customer:', data.email);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Don't throw error for confirmation email failure
    }
  }
}

/**
 * API endpoint handler for Next.js or Express
 */
export async function handleConsultationAPI(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const consultationData: ConsultationData = req.body;
    
    // Add server-side metadata
    consultationData.ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    consultationData.userAgent = req.headers['user-agent'] || 'unknown';
    
    const result = await sendConsultation(consultationData);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

// Export default for ES modules
export default {
  sendConsultation,
  validateConsultationData,
  formatConsultationForEmail,
  sendConsultationEmail,
  saveConsultationData,
  sendCustomerConfirmation,
  handleConsultationAPI
};

