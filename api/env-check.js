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

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    message: "Environment variables check",
    resend_api_key_exists: !!process.env.RESEND_API_KEY,
    resend_api_key_length: process.env.RESEND_API_KEY?.length || 0,
    node_env: process.env.NODE_ENV || 'not set',
    vercel_env: process.env.VERCEL_ENV || 'not set',
    timestamp: new Date().toISOString()
  });
}