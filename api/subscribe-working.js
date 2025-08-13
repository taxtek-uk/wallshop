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
        <div style="max-width: 680px; margin: 0 auto; background: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #231c14 0%, #2a1f17 50%, #1a1410 100%); padding: 40px 30px; text-align: center;">
            <div style="background: linear-gradient(135deg, #b69777, #907252); width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 32px; font-weight: bold;">W</span>
            </div>
            <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0 0 10px;">The Wall Shop</h1>
            <p style="color: #b69777; font-size: 18px; margin: 0;">New Newsletter Subscription</p>
          </div>

          <!-- Main content -->
          <div style="padding: 40px 30px; background: white;">
            
            <!-- Subscriber Information -->
            <div style="background: #f8f6f3; border: 2px solid #e2d5c4; border-radius: 20px; padding: 30px; margin-bottom: 25px;">
              <h3 style="color: #231c14; font-size: 22px; font-weight: 700; margin: 0 0 20px;">New Subscriber</h3>
              <div style="padding: 15px; background: rgba(182, 151, 119, 0.08); border-radius: 12px;">
                <span style="font-weight: 600; color: #231c14;">Email: </span>
                <span style="color: #6b5c47;"><a href="mailto:${esc(email)}" style="color: #b69777;">${esc(email)}</a></span>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #f8f6f3; padding: 30px; text-align: center; border-top: 1px solid #d1c7b7;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              This subscription was made through <a href="https://thewallshop.co.uk" style="color: #b69777;">thewallshop.co.uk</a>
            </p>
            <p style="margin: 5px 0 0; font-size: 12px; color: #9ca3af;">
              Subscribed on ${new Date().toLocaleDateString('en-GB', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
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
        <div style="max-width: 680px; margin: 0 auto; background: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #231c14 0%, #2a1f17 50%, #1a1410 100%); padding: 50px 30px; text-align: center;">
            <div style="background: linear-gradient(135deg, #b69777, #907252); width: 100px; height: 100px; border-radius: 25px; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 40px; font-weight: bold;">W</span>
            </div>
            <h1 style="color: #ffffff; font-size: 36px; font-weight: 800; margin: 0 0 10px;">Welcome to The Wall Shop!</h1>
            <p style="color: #b69777; font-size: 20px; margin: 0;">Premium Wall Solutions & Smart Home Technology</p>
          </div>

          <!-- Main content -->
          <div style="padding: 50px 30px; background: white;">
            
            <!-- Welcome Message -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #231c14; font-size: 28px; font-weight: 700; margin: 0 0 15px;">Thank You for Subscribing!</h2>
              <p style="color: #6b5c47; font-size: 18px; margin: 0; line-height: 1.6;">We're thrilled to have you join our community of design enthusiasts and smart home innovators.</p>
            </div>

            <!-- Call to Action -->
            <div style="background: #e8f4f8; border: 2px solid #b6e0f7; border-radius: 20px; padding: 35px; margin-bottom: 35px; text-align: center;">
              <h3 style="color: #1e40af; font-size: 22px; font-weight: 700; margin: 0 0 15px;">Ready to Transform Your Space?</h3>
              <p style="color: #475569; font-size: 16px; margin: 0 0 25px; line-height: 1.6;">Explore our premium wall solutions and smart home technology to create the space of your dreams.</p>
              <a href="https://thewallshop.co.uk" style="display: inline-block; background: linear-gradient(135deg, #b69777, #907252); color: white; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 16px;">
                🏠 Explore Our Products
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #f8f6f3; padding: 40px 30px; text-align: center; border-top: 1px solid #d1c7b7;">
            <div style="margin-bottom: 25px;">
              <h4 style="color: #231c14; font-size: 20px; font-weight: 700; margin: 0 0 10px;">The Wall Shop</h4>
              <p style="color: #6b5c47; font-size: 16px; margin: 0;">Premium wall solutions and smart home technology</p>
            </div>
          </div>

        </div>
      </body>
      </html>
    `;

    const resend = new Resend(process.env.RESEND_API_KEY);

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
    
    return res.status(500).json({ 
      error: 'Failed to process newsletter subscription',
      details: err.message
    });
  }
};