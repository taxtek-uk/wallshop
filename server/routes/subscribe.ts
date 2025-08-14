import { Request, Response } from 'express';
import { Resend } from 'resend';

export async function handleSubscribe(req: Request, res: Response) {
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
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Escape HTML for safety
    const esc = (s: string) => String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const resend = new Resend(process.env.RESEND_API_KEY as string);

    // Send notification to admin
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Newsletter Subscription - The Wall Shop</title>
        <style>
          /* Basic, robust reset for email clients */
          body { margin:0; padding:0; background:#f7f7f7; color:#111827; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
          a { color:#7a5f43; text-decoration:none; }
          .container { max-width:680px; margin:0 auto; background:#ffffff; }
          .header { padding:24px 28px; border-bottom:1px solid #e5e7eb; background:#0f172a; }
          .brand { display:flex; align-items:center; gap:12px; }
          .brand-mark { width:44px; height:44px; border-radius:8px; background:linear-gradient(135deg,#b69777,#907252); }
          .brand-title { color:#ffffff; font-weight:700; font-size:18px; letter-spacing:0.3px; margin:0; }
          .muted { color:#6b7280; }
          .content { padding:28px; }
          .section { border:1px solid #e5e7eb; border-radius:10px; padding:18px; margin-bottom:16px; background:#fafafa; }
          .section-title { margin:0 0 12px; font-size:16px; color:#111827; font-weight:600; }
          .row { display:flex; gap:12px; padding:10px 12px; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; }
          .label { width:120px; color:#374151; font-weight:600; }
          .value { color:#111827; }
          .note { padding:16px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; }
          .footer { padding:22px 28px; border-top:1px solid #e5e7eb; background:#fafafa; text-align:center; }
          .small { font-size:12px; color:#6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">
              <div class="brand-mark"></div>
              <div>
                <p class="brand-title">The Wall Shop</p>
                <p style="margin:2px 0 0; color:#cdb294; font-size:12px;">Premium Wall Solutions</p>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="section" style="background:#eef2ff; border-color:#e0e7ff;">
              <h2 class="section-title" style="color:#1f2937;">New Newsletter Subscription</h2>
              <p class="muted" style="margin:0;">A new contact has subscribed to your newsletter.</p>
            </div>

            <div class="section">
              <h3 class="section-title">Subscriber Details</h3>
              <div class="row">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${esc(email)}">${esc(email)}</a></div>
              </div>
            </div>

            <div class="note">
              <p style="margin:0; color:#374151;">Consider adding this contact to your CRM and sending a tailored welcome sequence.</p>
            </div>
          </div>
          <div class="footer">
            <p style="margin:0 0 6px; color:#111827; font-weight:600;">The Wall Shop</p>
            <p class="small" style="margin:0;">SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK</p>
            <p class="small" style="margin:10px 0 0;">Subscribed on ${new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
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
        <title>Welcome to The Wall Shop Newsletter</title>
        <style>
          body { margin:0; padding:0; background:#f7f7f7; color:#111827; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
          a { color:#7a5f43; text-decoration:none; }
          .container { max-width:680px; margin:0 auto; background:#ffffff; }
          .header { padding:28px; border-bottom:1px solid #e5e7eb; background:#0f172a; }
          .brand { display:flex; align-items:center; gap:12px; }
          .brand-mark { width:52px; height:52px; border-radius:10px; background:linear-gradient(135deg,#b69777,#907252); }
          .brand-title { color:#ffffff; font-weight:700; font-size:20px; letter-spacing:0.3px; margin:0; }
          .content { padding:30px; }
          .h1 { font-size:24px; font-weight:700; margin:0 0 8px; }
          .muted { color:#6b7280; }
          .feature { display:flex; gap:14px; padding:14px; background:#fafafa; border:1px solid #e5e7eb; border-radius:10px; }
          .feature-title { margin:0 0 4px; font-weight:600; }
          .cta { text-align:center; padding:24px; background:#fafafa; border:1px solid #e5e7eb; border-radius:10px; }
          .btn { display:inline-block; background:#7a5f43; color:#ffffff; padding:12px 20px; border-radius:8px; font-weight:600; }
          .footer { padding:22px 28px; border-top:1px solid #e5e7eb; background:#fafafa; text-align:center; }
          .small { font-size:12px; color:#6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">
              <div class="brand-mark"></div>
              <div>
                <p class="brand-title">The Wall Shop</p>
                <p style="margin:2px 0 0; color:#cdb294; font-size:12px;">Premium Wall Solutions</p>
              </div>
            </div>
          </div>
          <div class="content">
            <h1 class="h1">Thank you for subscribing</h1>
            <p class="muted" style="margin:0 0 20px;">You're now part of our community. Expect updates on design, products, and best practices.</p>

            <div style="display:grid; gap:12px; margin:18px 0 24px;">
              <div class="feature">
                <div>
                  <p class="feature-title">Latest Design Trends</p>
                  <p class="muted" style="margin:0;">Cutting-edge inspiration for contemporary wall solutions.</p>
                </div>
              </div>
              <div class="feature">
                <div>
                  <p class="feature-title">Exclusive Offers & Discounts</p>
                  <p class="muted" style="margin:0;">Subscriber-only deals and early access to product releases.</p>
                </div>
              </div>
              <div class="feature">
                <div>
                  <p class="feature-title">New Product Announcements</p>
                  <p class="muted" style="margin:0;">Be the first to know about our latest innovations.</p>
                </div>
              </div>
              <div class="feature">
                <div>
                  <p class="feature-title">Expert Installation Tips</p>
                  <p class="muted" style="margin:0;">Professional guidance to achieve excellent results.</p>
                </div>
              </div>
            </div>

            <div class="cta">
              <p style="margin:0 0 14px; color:#111827; font-weight:600;">Explore our products</p>
              <a class="btn" href="https://thewallshop.co.uk">Visit thewallshop.co.uk</a>
            </div>

            <div style="text-align:center; padding:20px 0;">
              <p class="muted" style="margin:0;">Contact us: <a href="mailto:info@thewallshop.co.uk">info@thewallshop.co.uk</a> · <a href="tel:+441417393377">+44 141 739 3377</a></p>
            </div>
          </div>
          <div class="footer">
            <p style="margin:0 0 6px; color:#111827; font-weight:600;">The Wall Shop</p>
            <p class="small" style="margin:0;">SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE, UK</p>
            <p class="small" style="margin:10px 0 0;">You’re receiving this email because you subscribed on our website.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send admin notification
    const adminResult = await resend.emails.send({
      from: 'The Wall Shop <newsletter@thewallshop.co.uk>',
      to: ["stephen@thewallshop.co.uk"],
      subject: `New Newsletter Subscription: ${email}`,
      html: adminHtml,
    });

    // Send welcome email to subscriber
    const welcomeResult = await resend.emails.send({
      from: 'The Wall Shop <newsletter@thewallshop.co.uk>',
      to: [email],
      subject: 'Welcome to The Wall Shop Newsletter',
      html: welcomeHtml,
    });

    if (adminResult.error || welcomeResult.error) {
      console.error('Resend error:', adminResult.error || welcomeResult.error);
      return res.status(500).json({ error: 'Failed to process subscription' });
    }

    console.log('Newsletter subscription processed successfully:', {
      admin: adminResult.data?.id,
      welcome: welcomeResult.data?.id
    });

    return res.json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email for confirmation.',
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
    if (!res.headersSent) {
      return res.status(500).json({ 
        error: 'Failed to process newsletter subscription',
        details: err instanceof Error ? err.message : 'Unknown server error'
      });
    }
  }
}

