import { Request, Response } from 'express';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Log environment variable availability (without exposing the actual key)
console.log('Subscribe route - Resend API Key available:', !!process.env.RESEND_API_KEY);

export async function handleSubscribe(req: Request, res: Response) {
  // Ensure JSON response for all cases
  res.setHeader('Content-Type', 'application/json');
  
  try {
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const { email } = req.body;

    console.log('Subscribe request received:', { email });

    // Validate required fields
    if (!email) {
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

    // Send notification to admin
    const adminHtml = `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        This subscription was made through the newsletter form on thewallshop.co.uk
      </p>
    `;

    // Send welcome email to subscriber
    const welcomeHtml = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h1 style="color: #b69777; text-align: center;">Welcome to The Wall Shop!</h1>
        <p>Thank you for subscribing to our newsletter!</p>
        <p>You'll now receive:</p>
        <ul>
          <li>Latest design trends and inspiration</li>
          <li>Exclusive offers and discounts</li>
          <li>New product announcements</li>
          <li>Expert tips and installation guides</li>
        </ul>
        <p>We're excited to help you transform your space with our premium wall solutions.</p>
        <hr>
        <p style="color: #666; font-size: 12px; text-align: center;">
          The Wall Shop | thewallshop.co.uk<br>
          If you didn't subscribe to this newsletter, please ignore this email.
        </p>
      </div>
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
      subject: 'Welcome to The Wall Shop Newsletter!',
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
    return res.status(500).json({ error: 'Server error occurred' });
  }
}

