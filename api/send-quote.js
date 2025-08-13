import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML escape function
const esc = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Ensure JSON response for all cases
  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log('Quote request started, checking environment variables...');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ 
        error: 'Email service not configured',
        details: 'Missing RESEND_API_KEY environment variable'
      });
    }

    const {
      name, email, phone, address,
      projectType, area, message, urgency, selectedProduct
    } = req.body;

    console.log('Quote request received:', { name, email, phone, projectType });

    // Validate required fields
    if (!name || !email || !phone) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Quote Request - The Wall Shop</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 680px; margin: 0 auto; background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%);">
          
          <!-- Header with branding -->
          <div style="background: linear-gradient(135deg, #231c14 0%, #2a1f17 50%, #1a1410 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: relative; z-index: 1;">
              <div style="background: linear-gradient(135deg, #b69777, #907252); width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <span style="color: white; font-size: 32px; font-weight: bold;">W</span>
              </div>
              <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0 0 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">The Wall Shop</h1>
              <p style="color: #b69777; font-size: 18px; margin: 0; font-weight: 500;">Premium Wall Solutions</p>
            </div>
          </div>

          <!-- Main content -->
          <div style="padding: 40px 30px; background: white;">
            
            <!-- Alert banner -->
            <div style="background: linear-gradient(135deg, #b69777, #907252); padding: 25px; border-radius: 16px; margin-bottom: 35px; box-shadow: 0 8px 25px rgba(182, 151, 119, 0.2);">
              <div style="display: flex; align-items: center; justify-content: center; text-align: center;">
                <div style="background: rgba(255,255,255,0.2); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                  <span style="color: white; font-size: 24px;">💬</span>
                </div>
                <div>
                  <h2 style="color: white; font-size: 24px; font-weight: 700; margin: 0 0 8px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">New Quote Request</h2>
                  <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">A potential customer is interested in your services</p>
                </div>
              </div>
            </div>

            <!-- Customer Information Card -->
            <div style="background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%); border: 2px solid #e2d5c4; border-radius: 20px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="background: linear-gradient(135deg, #b69777, #907252); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-size: 18px;">👤</span>
                </div>
                <h3 style="color: #231c14; font-size: 22px; font-weight: 700; margin: 0;">Customer Information</h3>
              </div>
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px; border-left: 4px solid #b69777;">
                  <span style="font-weight: 600; color: #231c14; min-width: 80px;">Name:</span>
                  <span style="color: #6b5c47; font-weight: 500;">${esc(name)}</span>
                </div>
                <div style="display: flex; padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px; border-left: 4px solid #b69777;">
                  <span style="font-weight: 600; color: #231c14; min-width: 80px;">Email:</span>
                  <span style="color: #6b5c47; font-weight: 500;"><a href="mailto:${esc(email)}" style="color: #b69777; text-decoration: none;">${esc(email)}</a></span>
                </div>
                <div style="display: flex; padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px; border-left: 4px solid #b69777;">
                  <span style="font-weight: 600; color: #231c14; min-width: 80px;">Phone:</span>
                  <span style="color: #6b5c47; font-weight: 500;"><a href="tel:${esc(phone)}" style="color: #b69777; text-decoration: none;">${esc(phone)}</a></span>
                </div>
                ${address ? `
                <div style="display: flex; padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px; border-left: 4px solid #b69777;">
                  <span style="font-weight: 600; color: #231c14; min-width: 80px;">Address:</span>
                  <span style="color: #6b5c47; font-weight: 500;">${esc(address)}</span>
                </div>
                ` : ''}
              </div>
            </div>

            <!-- Project Details Card -->
            <div style="background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%); border: 2px solid #e2d5c4; border-radius: 20px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="background: linear-gradient(135deg, #b69777, #907252); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-size: 18px;">🏗️</span>
                </div>
                <h3 style="color: #231c14; font-size: 22px; font-weight: 700; margin: 0;">Project Details</h3>
              </div>
              <div style="display: grid; gap: 15px;">
                ${projectType ? `
                <div style="display: flex; padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px; border-left: 4px solid #b69777;">
                  <span style="font-weight: 600; color: #231c14; min-width: 100px;">Project Type:</span>
                  <span style="color: #6b5c47; font-weight: 500;">${esc(projectType)}</span>
                </div>
                ` : ''}
                ${area ? `
                <div style="display: flex; padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px; border-left: 4px solid #b69777;">
                  <span style="font-weight: 600; color: #231c14; min-width: 100px;">Area:</span>
                  <span style="color: #6b5c47; font-weight: 500;">${esc(area)} m²</span>
                </div>
                ` : ''}
                <div style="display: flex; padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px; border-left: 4px solid #b69777;">
                  <span style="font-weight: 600; color: #231c14; min-width: 100px;">Urgency:</span>
                  <span style="display: inline-flex; align-items: center; padding: 6px 12px; background: ${urgency === 'urgent' ? '#ef4444' : urgency === 'flexible' ? '#10b981' : '#b69777'}; color: white; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                    ${esc(urgency || 'standard')}
                  </span>
                </div>
              </div>
            </div>

            ${selectedProduct ? `
            <!-- Selected Product Card -->
            <div style="background: linear-gradient(135deg, #e8f4f8 0%, #f0f9ff 100%); border: 2px solid #b6e0f7; border-radius: 20px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="background: linear-gradient(135deg, #0ea5e9, #0284c7); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-size: 18px;">⭐</span>
                </div>
                <h3 style="color: #1e40af; font-size: 22px; font-weight: 700; margin: 0;">Selected Product</h3>
              </div>
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; padding: 15px; background: rgba(14, 165, 233, 0.08); border-radius: 12px; border-left: 4px solid #0ea5e9;">
                  <span style="font-weight: 600; color: #1e40af; min-width: 80px;">Product:</span>
                  <span style="color: #475569; font-weight: 600;">${esc(selectedProduct.name)}</span>
                </div>
                <div style="display: flex; padding: 15px; background: rgba(14, 165, 233, 0.08); border-radius: 12px; border-left: 4px solid #0ea5e9;">
                  <span style="font-weight: 600; color: #1e40af; min-width: 80px;">Price:</span>
                  <span style="color: #475569; font-weight: 600; font-size: 18px;">${esc(selectedProduct.price)}</span>
                </div>
              </div>
            </div>
            ` : ''}

            ${message ? `
            <!-- Additional Message Card -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%); border: 2px solid #dbeafe; border-radius: 20px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-size: 18px;">💬</span>
                </div>
                <h3 style="color: #1e40af; font-size: 22px; font-weight: 700; margin: 0;">Additional Message</h3>
              </div>
              <div style="background: rgba(59, 130, 246, 0.08); padding: 20px; border-radius: 16px; border-left: 4px solid #3b82f6; line-height: 1.7; color: #374151; font-size: 16px;">
                ${esc(message).replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : ''}

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="mailto:${esc(email)}" style="display: inline-block; background: linear-gradient(135deg, #b69777, #907252); color: white; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(182, 151, 119, 0.4); margin: 0 10px; transition: all 0.3s ease;">
                📧 Reply to Customer
              </a>
              <a href="tel:${esc(phone)}" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); margin: 0 10px; transition: all 0.3s ease;">
                📞 Call Now
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #f8f6f3, #e2d5c4); padding: 30px; text-align: center; border-top: 1px solid #d1c7b7;">
            <div style="margin-bottom: 20px;">
              <h4 style="color: #231c14; font-size: 18px; font-weight: 700; margin: 0 0 10px;">The Wall Shop</h4>
              <p style="color: #6b5c47; font-size: 14px; margin: 0;">Premium wall solutions and smart home technology</p>
            </div>
            <div style="border-top: 1px solid #d1c7b7; padding-top: 20px; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">This quote request was submitted through <a href="https://thewallshop.co.uk" style="color: #b69777; text-decoration: none;">thewallshop.co.uk</a></p>
              <p style="margin: 5px 0 0;">Received on ${new Date().toLocaleDateString('en-GB', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</p>
            </div>
          </div>

        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'The Wall Shop <quotes@thewallshop.co.uk>',
      to: ["stephen@thewallshop.co.uk"],
      replyTo: email,
      subject: `New Quote Request from ${name}${selectedProduct?.name ? ` — ${selectedProduct.name}` : ''}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send quote request' });
    }

    console.log('Quote email sent successfully:', data?.id);
    return res.json({ success: true, message: 'Quote request sent successfully', id: data?.id });
  } catch (err) {
    console.error('Quote request error:', err);
    console.error('Error details:', {
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });
    
    // Ensure we always send a JSON response
    return res.status(500).json({ 
      error: 'Failed to process quote request',
      details: err instanceof Error ? err.message : 'Unknown server error'
    });
  }
}