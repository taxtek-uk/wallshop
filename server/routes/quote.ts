import { Request, Response } from 'express';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleQuote(req: Request, res: Response) {
  try {
    const {
      name, email, phone, address,
      projectType, area, message, urgency, selectedProduct
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Validate phone format (basic)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Please provide a valid phone number.' });
    }

    // Escape HTML for safety
    const esc = (s: string) => String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const html = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2 style="color: #b69777;">New Quote Request</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Phone:</strong> ${esc(phone)}</p>
          ${address ? `<p><strong>Address:</strong> ${esc(address)}</p>` : ''}
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Project Details</h3>
          ${projectType ? `<p><strong>Project Type:</strong> ${esc(projectType)}</p>` : ''}
          ${area ? `<p><strong>Area:</strong> ${esc(area)} m²</p>` : ''}
          <p><strong>Urgency:</strong> ${esc(urgency || 'standard')}</p>
          ${selectedProduct ? `
            <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 10px 0;">
              <h4 style="margin: 0 0 10px 0; color: #b69777;">Selected Product</h4>
              <p><strong>Product:</strong> ${esc(selectedProduct.name)}</p>
              <p><strong>Price:</strong> ${esc(selectedProduct.price)}</p>
            </div>
          ` : ''}
        </div>

        ${message ? `
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Additional Message</h3>
            <div style="background: white; padding: 15px; border-radius: 5px;">
              ${esc(message).replace(/\n/g, '<br>')}
            </div>
          </div>
        ` : ''}

        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This quote request was submitted through thewallshop.co.uk on ${new Date().toLocaleString()}
        </p>
      </div>
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
    return res.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Quote request error:', err);
    return res.status(500).json({ error: 'Server error occurred' });
  }
}

