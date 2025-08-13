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
    console.log('Subscribe request started, checking environment variables...');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ 
        error: 'Email service not configured',
        details: 'Missing RESEND_API_KEY environment variable'
      });
    }

    const { email } = req.body;

    console.log('Subscribe request received:', { email });

    // Validate required fields
    if (!email) {
      console.log('Validation failed: missing email');
      return res.status(400).json({ error: 'Email address is required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // Send notification to admin
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Newsletter Subscription - The Wall Shop</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 680px; margin: 0 auto; background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%);">
          
          <!-- Header -->
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
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 25px; border-radius: 16px; margin-bottom: 35px; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.2);">
              <div style="display: flex; align-items: center; justify-content: center; text-align: center;">
                <div style="background: rgba(255,255,255,0.2); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                  <span style="color: white; font-size: 24px;">📬</span>
                </div>
                <div>
                  <h2 style="color: white; font-size: 24px; font-weight: 700; margin: 0 0 8px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">New Newsletter Subscription</h2>
                  <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Your audience is growing!</p>
                </div>
              </div>
            </div>

            <!-- Subscriber Information -->
            <div style="background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%); border: 2px solid #e2d5c4; border-radius: 20px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="background: linear-gradient(135deg, #b69777, #907252); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-size: 18px;">👤</span>
                </div>
                <h3 style="color: #231c14; font-size: 22px; font-weight: 700; margin: 0;">New Subscriber Details</h3>
              </div>
              <div style="display: flex; padding: 20px; background: rgba(182, 151, 119, 0.08); border-radius: 12px; border-left: 4px solid #b69777;">
                <span style="font-weight: 600; color: #231c14; min-width: 80px;">Email:</span>
                <span style="color: #6b5c47; font-weight: 500;"><a href="mailto:${esc(email)}" style="color: #b69777; text-decoration: none;">${esc(email)}</a></span>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #f8f6f3, #e2d5c4); padding: 30px; text-align: center; border-top: 1px solid #d1c7b7;">
            <div style="margin-bottom: 20px;">
              <h4 style="color: #231c14; font-size: 18px; font-weight: 700; margin: 0 0 10px;">The Wall Shop</h4>
              <p style="color: #6b5c47; font-size: 14px; margin: 0;">Premium wall solutions and smart home technology</p>
            </div>
            <div style="border-top: 1px solid #d1c7b7; padding-top: 20px; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">This subscription was made through the newsletter form on <a href="https://thewallshop.co.uk" style="color: #b69777; text-decoration: none;">thewallshop.co.uk</a></p>
              <p style="margin: 5px 0 0;">Subscribed on ${new Date().toLocaleDateString('en-GB', { 
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

    // Send welcome email to subscriber
    const welcomeHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to The Wall Shop Newsletter!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 680px; margin: 0 auto; background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%);">
          
          <!-- Header with branding -->
          <div style="background: linear-gradient(135deg, #231c14 0%, #2a1f17 50%, #1a1410 100%); padding: 50px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: relative; z-index: 1;">
              <div style="background: linear-gradient(135deg, #b69777, #907252); width: 100px; height: 100px; border-radius: 25px; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 15px 40px rgba(0,0,0,0.3);">
                <span style="color: white; font-size: 40px; font-weight: bold;">W</span>
              </div>
              <h1 style="color: #ffffff; font-size: 36px; font-weight: 800; margin: 0 0 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Welcome to The Wall Shop!</h1>
              <p style="color: #b69777; font-size: 20px; margin: 0; font-weight: 500;">Premium Wall Solutions & Smart Home Technology</p>
            </div>
          </div>

          <!-- Main content -->
          <div style="padding: 50px 30px; background: white;">
            
            <!-- Welcome Message -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="background: linear-gradient(135deg, #10b981, #059669); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);">
                <span style="color: white; font-size: 32px;">🎉</span>
              </div>
              <h2 style="color: #231c14; font-size: 28px; font-weight: 700; margin: 0 0 15px;">Thank You for Subscribing!</h2>
              <p style="color: #6b5c47; font-size: 18px; margin: 0; line-height: 1.6;">We're thrilled to have you join our community of design enthusiasts and smart home innovators.</p>
            </div>

            <!-- Call to Action -->
            <div style="background: linear-gradient(135deg, #e8f4f8 0%, #f0f9ff 100%); border: 2px solid #b6e0f7; border-radius: 20px; padding: 35px; margin-bottom: 35px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center;">
              <h3 style="color: #1e40af; font-size: 22px; font-weight: 700; margin: 0 0 15px;">Ready to Transform Your Space?</h3>
              <p style="color: #475569; font-size: 16px; margin: 0 0 25px; line-height: 1.6;">Explore our premium wall solutions and smart home technology to create the space of your dreams.</p>
              <a href="https://thewallshop.co.uk" style="display: inline-block; background: linear-gradient(135deg, #b69777, #907252); color: white; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(182, 151, 119, 0.4); transition: all 0.3s ease;">
                🏠 Explore Our Products
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #f8f6f3, #e2d5c4); padding: 40px 30px; text-align: center; border-top: 1px solid #d1c7b7;">
            <div style="margin-bottom: 25px;">
              <h4 style="color: #231c14; font-size: 20px; font-weight: 700; margin: 0 0 10px;">The Wall Shop</h4>
              <p style="color: #6b5c47; font-size: 16px; margin: 0;">Premium wall solutions and smart home technology</p>
              <p style="color: #6b5c47; font-size: 14px; margin: 10px 0 0;">SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK</p>
            </div>
            <div style="border-top: 1px solid #d1c7b7; padding-top: 25px; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0 0 10px;">You're receiving this email because you subscribed to our newsletter at <a href="https://thewallshop.co.uk" style="color: #b69777; text-decoration: none;">thewallshop.co.uk</a></p>
              <p style="margin: 0;">If you didn't subscribe or no longer wish to receive our emails, you can safely ignore this message.</p>
            </div>
          </div>

        </div>
      </body>
      </html>
    `;

    // Send both emails
    console.log('Sending admin notification email...');
    const adminResult = await resend.emails.send({
      from: 'The Wall Shop <subscribe@thewallshop.co.uk>',
      to: ["stephen@thewallshop.co.uk"],
      subject: `New Newsletter Subscriber: ${email}`,
      html: adminHtml,
    });

    console.log('Sending welcome email to subscriber...');
    const welcomeResult = await resend.emails.send({
      from: 'The Wall Shop <welcome@thewallshop.co.uk>',
      to: [email],
      subject: 'Welcome to The Wall Shop Newsletter! 🏠',
      html: welcomeHtml,
    });

    // Check for errors
    if (adminResult.error || welcomeResult.error) {
      console.error('Resend errors:', {
        admin: adminResult.error,
        welcome: welcomeResult.error
      });
      return res.status(500).json({
        error: 'Failed to process subscription',
        details: adminResult.error || welcomeResult.error
      });
    }

    console.log('Newsletter emails sent successfully:', {
      admin: adminResult.data?.id,
      welcome: welcomeResult.data?.id
    });

    return res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      ids: {
        admin: adminResult.data?.id,
        welcome: welcomeResult.data?.id
      }
    });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    console.error('Error details:', {
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });
    
    // Ensure we always send a JSON response
    return res.status(500).json({ 
      error: 'Failed to process newsletter subscription',
      details: err instanceof Error ? err.message : 'Unknown server error'
    });
  }
}