const { Resend } = require('resend');

const esc = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

module.exports = async (req, res) => {
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
        <div style="max-width: 680px; margin: 0 auto; background: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #231c14 0%, #2a1f17 50%, #1a1410 100%); padding: 40px 30px; text-align: center;">
            <div style="background: linear-gradient(135deg, #b69777, #907252); width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 32px; font-weight: bold;">W</span>
            </div>
            <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0 0 10px;">The Wall Shop</h1>
            <p style="color: #b69777; font-size: 18px; margin: 0;">New Quote Request</p>
          </div>

          <!-- Main content -->
          <div style="padding: 40px 30px; background: white;">
            
            <!-- Customer Information -->
            <div style="background: #f8f6f3; border: 2px solid #e2d5c4; border-radius: 20px; padding: 30px; margin-bottom: 25px;">
              <h3 style="color: #231c14; font-size: 22px; font-weight: 700; margin: 0 0 20px;">Customer Information</h3>
              <div style="display: grid; gap: 15px;">
                <div style="padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #231c14;">Name: </span>
                  <span style="color: #6b5c47;">${esc(name)}</span>
                </div>
                <div style="padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #231c14;">Email: </span>
                  <span style="color: #6b5c47;"><a href="mailto:${esc(email)}" style="color: #b69777;">${esc(email)}</a></span>
                </div>
                <div style="padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #231c14;">Phone: </span>
                  <span style="color: #6b5c47;"><a href="tel:${esc(phone)}" style="color: #b69777;">${esc(phone)}</a></span>
                </div>
                ${address ? `
                <div style="padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #231c14;">Address: </span>
                  <span style="color: #6b5c47;">${esc(address)}</span>
                </div>
                ` : ''}
              </div>
            </div>

            <!-- Project Details -->
            ${projectType || area || urgency ? `
            <div style="background: #f8f6f3; border: 2px solid #e2d5c4; border-radius: 20px; padding: 30px; margin-bottom: 25px;">
              <h3 style="color: #231c14; font-size: 22px; font-weight: 700; margin: 0 0 15px;">Project Details</h3>
              <div style="display: grid; gap: 15px;">
                ${projectType ? `
                <div style="padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #231c14;">Project Type: </span>
                  <span style="color: #6b5c47;">${esc(projectType)}</span>
                </div>
                ` : ''}
                ${area ? `
                <div style="padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #231c14;">Area: </span>
                  <span style="color: #6b5c47;">${esc(area)} m²</span>
                </div>
                ` : ''}
                <div style="padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #231c14;">Urgency: </span>
                  <span style="color: #6b5c47;">${esc(urgency || 'standard')}</span>
                </div>
              </div>
            </div>
            ` : ''}

            ${selectedProduct ? `
            <div style="background: #e8f4f8; border: 2px solid #b6e0f7; border-radius: 20px; padding: 30px; margin-bottom: 25px;">
              <h3 style="color: #1e40af; font-size: 22px; font-weight: 700; margin: 0 0 15px;">Selected Product</h3>
              <div style="display: grid; gap: 15px;">
                <div style="padding: 15px; background: rgba(14, 165, 233, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #1e40af;">Product: </span>
                  <span style="color: #475569; font-weight: 600;">${esc(selectedProduct.name)}</span>
                </div>
                <div style="padding: 15px; background: rgba(14, 165, 233, 0.08); border-radius: 12px;">
                  <span style="font-weight: 600; color: #1e40af;">Price: </span>
                  <span style="color: #475569; font-weight: 600;">${esc(selectedProduct.price)}</span>
                </div>
              </div>
            </div>
            ` : ''}

            ${message ? `
            <div style="background: #f0f9ff; border: 2px solid #dbeafe; border-radius: 20px; padding: 30px; margin-bottom: 25px;">
              <h3 style="color: #1e40af; font-size: 22px; font-weight: 700; margin: 0 0 15px;">Additional Message</h3>
              <div style="background: rgba(59, 130, 246, 0.08); padding: 20px; border-radius: 16px; line-height: 1.7; color: #374151;">
                ${esc(message).replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : ''}

          </div>

        </div>
      </body>
      </html>
    `;

    console.log('Sending quote email...');
    const resend = new Resend(process.env.RESEND_API_KEY);
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
    
    return res.status(500).json({ 
      error: 'Failed to process quote request',
      details: err.message
    });
  }
};