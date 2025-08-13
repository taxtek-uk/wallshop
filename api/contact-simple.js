export default function handler(req, res) {
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
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ 
      error: 'Method not allowed',
      method: req.method,
      allowedMethods: ['POST']
    });
  }

  // Always return JSON
  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log('Contact form request received');
    console.log('Method:', req.method);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Environment check:');
    console.log('- RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('- RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- VERCEL_ENV:', process.env.VERCEL_ENV);

    const { name, email, reason, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !reason || !message) {
      console.log('Validation failed - missing fields:', { name: !!name, email: !!email, reason: !!reason, message: !!message });
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'reason', 'message'],
        received: { name: !!name, email: !!email, reason: !!reason, message: !!message }
      });
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ 
        error: 'Email service not configured',
        details: 'Missing RESEND_API_KEY environment variable'
      });
    }

    // For now, just return success without actually sending email
    console.log('Contact form validation passed, would send email here');
    
    return res.status(200).json({
      success: true,
      message: 'Contact form received successfully (test mode)',
      data: { name, email, reason },
      timestamp: new Date().toISOString(),
      test: true
    });

  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      error: 'Server error occurred',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}