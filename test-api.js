const express = require('express');
const { createServer } = require('./dist/server/node-build.mjs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('Starting API test...');
console.log('Environment variables:');
console.log('- RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('- RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);

// Test the server creation
try {
  const app = createServer();
  console.log('✅ Server created successfully');
  
  // Start server on port 3001
  const port = 3001;
  app.listen(port, () => {
    console.log(`🚀 Test server running on http://localhost:${port}`);
    console.log('Test these endpoints:');
    console.log(`- GET http://localhost:${port}/api/ping`);
    console.log(`- GET http://localhost:${port}/api/env-check`);
    console.log(`- POST http://localhost:${port}/api/contact`);
  });
  
} catch (error) {
  console.error('❌ Failed to create server:', error);
}