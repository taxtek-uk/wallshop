import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { asset } = req.query;
  
  if (!asset || Array.isArray(asset)) {
    return res.status(400).json({ error: 'Invalid asset path' });
  }

  // Security: prevent directory traversal
  const safePath = asset.replace(/\.\./g, '');
  const filePath = path.join(process.cwd(), 'dist', 'spa', 'assets', safePath);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Asset not found' });
  }

  // Determine content type
  let contentType = 'application/octet-stream';
  if (safePath.endsWith('.js')) {
    contentType = 'application/javascript; charset=utf-8';
  } else if (safePath.endsWith('.css')) {
    contentType = 'text/css; charset=utf-8';
  } else if (safePath.endsWith('.json')) {
    contentType = 'application/json; charset=utf-8';
  }

  // Set headers
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  
  // Read and serve file
  try {
    const fileContent = fs.readFileSync(filePath);
    res.send(fileContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read asset' });
  }
}