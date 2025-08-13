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

  // Always return JSON
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const response = {
      success: true,
      message: "Test API is working!",
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
      headers: req.headers,
      body: req.body || null,
      query: req.query || null
    };

    console.log('Test API called:', response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Test API error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}