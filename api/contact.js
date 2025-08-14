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

  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log('Contact API endpoint called successfully!');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ 
        error: 'Email service not configured',
        details: 'Missing RESEND_API_KEY environment variable'
      });
    }

    const { name, email, reason, message } = req.body;

    console.log('Contact request received:', { name, email, reason });

    // Validate required fields
    if (!name || !email || !reason || !message) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({ 
        error: 'All fields are required: name, email, reason, and message.' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // For now, just return success without sending email
    console.log('Contact form would send email:', { name, email, reason });
    return res.json({ 
      success: true, 
      message: 'Contact form received successfully (email sending disabled for testing)',
      data: { name, email, reason, message_length: message.length }
    });

  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ 
      error: 'Failed to process contact form',
      details: err instanceof Error ? err.message : 'Unknown server error'
    });
  }
}