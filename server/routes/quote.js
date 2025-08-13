import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/quote', async (req, res) => {
  try {
    const {
      name, email, phone, address,
      projectType, area, message, urgency, selectedProduct
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    // Escape for safety
    const esc = (s) => String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Phone:</strong> ${esc(phone)}</p>
      <p><strong>Address:</strong> ${esc(address)}</p>
      <p><strong>Project Type:</strong> ${esc(projectType)}</p>
      <p><strong>Area:</strong> ${esc(area)}</p>
      <p><strong>Urgency:</strong> ${esc(urgency)}</p>
      ${selectedProduct ? `<p><strong>Product:</strong> ${esc(selectedProduct.name)} — ${esc(selectedProduct.price)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <pre>${esc(message)}</pre>
    `;

    const { data, error } = await resend.emails.send({
      from: 'The Wall Shop <quotes@thewallshop.co.uk>', // must be from verified domain
      to: ['info@thewallshop.co.uk'],
      reply_to: email,
      subject: `New Quote from ${name}${selectedProduct?.name ? ` — ${selectedProduct.name}` : ''}`,
      html,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.json({ ok: true, id: data.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
