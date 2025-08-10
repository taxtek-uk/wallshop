#!/usr/bin/env node

/**
 * Post-build script to ensure all JS files have .js extension
 * and create a manifest of files with their correct MIME types
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const distPath = path.join(projectRoot, 'dist', 'spa');

console.log('🔧 Running post-build fixes...\n');

// Function to recursively find all files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Find all files in dist
const allFiles = findFiles(distPath);

// Create MIME type manifest
const mimeManifest = {};
let fixedFiles = 0;

allFiles.forEach(filePath => {
  const relativePath = path.relative(distPath, filePath);
  const ext = path.extname(filePath);
  
  // Determine correct MIME type
  let mimeType = 'application/javascript';
  switch (ext) {
    case '.js':
    case '.mjs':
      mimeType = 'application/javascript; charset=utf-8';
      break;
    case '.css':
      mimeType = 'text/css; charset=utf-8';
      break;
    case '.json':
      mimeType = 'application/json; charset=utf-8';
      break;
    case '.html':
      mimeType = 'text/html; charset=utf-8';
      break;
    case '.svg':
      mimeType = 'image/svg+xml';
      break;
    case '.png':
      mimeType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      mimeType = 'image/jpeg';
      break;
    case '.webp':
      mimeType = 'image/webp';
      break;
  }
  
  mimeManifest[relativePath] = mimeType;
  
  // Check if JS files have correct extension
  if (ext === '.js' || ext === '.mjs') {
    console.log(`✅ JS file: ${relativePath}`);
    fixedFiles++;
  }
});

// Write MIME manifest
const manifestPath = path.join(distPath, 'mime-manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(mimeManifest, null, 2));

console.log(`\n📋 Created MIME manifest with ${Object.keys(mimeManifest).length} files`);
console.log(`🔧 Found ${fixedFiles} JavaScript files`);

// Create a simple server-side include for MIME types
const htaccessContent = `# Auto-generated MIME type configuration
AddType application/javascript .js
AddType application/javascript .mjs
AddType text/css .css
AddType application/json .json

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
</IfModule>
`;

fs.writeFileSync(path.join(distPath, '.htaccess'), htaccessContent);
console.log('✅ Created .htaccess file in dist directory');

// Create Vercel-specific headers file
const vercelHeaders = allFiles
  .filter(file => file.endsWith('.js') || file.endsWith('.css'))
  .map(file => {
    const relativePath = path.relative(distPath, file);
    const ext = path.extname(file);
    const mimeType = ext === '.js' ? 'application/javascript; charset=utf-8' : 'text/css; charset=utf-8';
    
    return {
      source: `/${relativePath}`,
      headers: [
        {
          key: 'Content-Type',
          value: mimeType
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    };
  });

fs.writeFileSync(
  path.join(distPath, '_headers.json'), 
  JSON.stringify(vercelHeaders, null, 2)
);

console.log('✅ Created _headers.json for Vercel');
console.log('\n🎉 Post-build fixes completed!');

// Summary
console.log('\n📊 Summary:');
console.log(`   • ${Object.keys(mimeManifest).length} total files processed`);
console.log(`   • ${fixedFiles} JavaScript files found`);
console.log(`   • MIME manifest created`);
console.log(`   • .htaccess created for Apache servers`);
console.log(`   • _headers.json created for Vercel`);