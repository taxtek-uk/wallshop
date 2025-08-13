import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  console.log('--- API Request Received ---');
  console.log('Method:', req.method);
  console.log('Body:', req.body);

  if (req.method !== 'POST') {
    console.warn('Invalid method:', req.method);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    name,
    email,
    phone,
    address,
    projectType,
    area,
    message,
    urgency
  } = req.body;

  console.log('Form fields parsed:', {
    name, email, phone, address, projectType, area, message, urgency
  });

  try {
    const emailResponse = await resend.emails.send({
      from: 'stephen@thewallshop.co.uk', // Must be verified in Resend
      to: 'stephen@thewallshop.co.uk',
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Area:</strong> ${area || 'N/A'} m²</p>
        <p><strong>Urgency:</strong> ${urgency}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'N/A'}</p>
      `,
    });

    console.log('Resend API response:', emailResponse);

    res.status(200).json({ success: true, data: emailResponse });
  } catch (error: any) {
    console.error('Error sending email via Resend:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to send email'
    });
  }
}
