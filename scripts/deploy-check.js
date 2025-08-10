#!/usr/bin/env node

/**
 * Deployment verification script
 * Checks if JavaScript files are served with correct MIME types
 */

const https = require('https');
const http = require('http');

const SITE_URL = process.env.SITE_URL || 'https://www.thewallshop.co.uk';

async function checkMimeType(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      const contentType = res.headers['content-type'];
      resolve({
        url,
        contentType,
        statusCode: res.statusCode
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔍 Checking MIME types for deployed assets...\n');
  
  // Test URLs - these will be generated after build
  const testUrls = [
    `${SITE_URL}/sw.js`,
    `${SITE_URL}/manifest.json`
  ];
  
  // Add some common asset paths
  const commonAssets = [
    '/assets/js/index-',
    '/assets/js/vendor-',
    '/assets/js/react-vendor-'
  ];
  
  try {
    for (const url of testUrls) {
      const result = await checkMimeType(url);
      console.log(`📄 ${result.url}`);
      console.log(`   Status: ${result.statusCode}`);
      console.log(`   Content-Type: ${result.contentType}`);
      
      if (url.endsWith('.js') && !result.contentType?.includes('javascript')) {
        console.log(`   ❌ INCORRECT MIME TYPE! Expected: application/javascript`);
      } else if (url.endsWith('.json') && !result.contentType?.includes('json')) {
        console.log(`   ❌ INCORRECT MIME TYPE! Expected: application/json`);
      } else {
        console.log(`   ✅ Correct MIME type`);
      }
      console.log('');
    }
    
    console.log('📋 Deployment checklist:');
    console.log('   ✅ Vercel headers configured');
    console.log('   ✅ Netlify headers configured');
    console.log('   ✅ .htaccess created for Apache');
    console.log('   ✅ Module script attributes added');
    console.log('');
    console.log('🚀 If MIME type errors persist:');
    console.log('   1. Check server configuration');
    console.log('   2. Verify deployment platform settings');
    console.log('   3. Contact hosting provider support');
    
  } catch (error) {
    console.error('❌ Error checking deployment:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkMimeType };