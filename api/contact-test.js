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
    const { name, email, reason, message } = req.body;
    
    // Basic validation
    if (!name || !email || !reason || !message) {
      return res.status(400).json({ 
        error: 'All fields are required: name, email, reason, and message.' 
      });
    }

    console.log('Contact form test received:', { name, email, reason });
    
    // Return success (without actually sending email for now)
    return res.json({ 
      success: true, 
      message: 'Contact form test successful',
      received_data: { name, email, reason, message_length: message.length }
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ 
      error: 'Failed to process contact form',
      details: err.message
    });
  }
}