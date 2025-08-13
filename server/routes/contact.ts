import { Request, Response } from 'express';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Log environment variable availability (without exposing the actual key)
console.log('Contact route - Resend API Key available:', !!process.env.RESEND_API_KEY);

export async function handleContact(req: Request, res: Response) {
  // Ensure JSON response for all cases
  res.setHeader('Content-Type', 'application/json');
  
  try {
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const { name, email, reason, message } = req.body;

    console.log('Contact request received:', { name, email, reason });

    // Validate required fields
    if (!name || !email || !reason || !message) {
      return res.status(400).json({ 
        error: 'All fields are required: name, email, reason, and message.' 
      });
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

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Reason for Contact:</strong> ${esc(reason)}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${esc(message).replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p style="color: #666; font-size: 12px;">
        This message was sent from the Contact Us form on thewallshop.co.uk
      </p>
    `;

    const { data, error } = await resend.emails.send({
      from: 'The Wall Shop <contact@thewallshop.co.uk>',
      to: ["stephen@thewallshop.co.uk"],
      replyTo: email,
      subject: `Contact Form: ${reason} - ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    console.log('Contact email sent successfully:', data?.id);
    return res.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Server error occurred' });
  }
}

