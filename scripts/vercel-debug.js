#!/usr/bin/env node

/**
 * Vercel deployment debugging script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🔍 Vercel Deployment Debug Information\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'vercel.json',
  'vite.config.ts',
  'client/App.tsx',
  'index.html'
];

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(projectRoot, file));
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// Check package.json scripts
console.log('\n📦 Package.json scripts:');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  console.log(`   build: ${pkg.scripts.build || 'NOT FOUND'}`);
  console.log(`   build:client: ${pkg.scripts['build:client'] || 'NOT FOUND'}`);
  console.log(`   dev: ${pkg.scripts.dev || 'NOT FOUND'}`);
} catch (error) {
  console.log('   ❌ Error reading package.json');
}

// Check vercel.json configuration
console.log('\n⚙️  Vercel configuration:');
try {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(projectRoot, 'vercel.json'), 'utf8'));
  console.log(`   Version: ${vercelConfig.version || 'NOT SET'}`);
  console.log(`   Builds: ${vercelConfig.builds ? vercelConfig.builds.length : 0} configured`);
  console.log(`   Routes: ${vercelConfig.routes ? vercelConfig.routes.length : 0} configured`);
  console.log(`   Headers: ${vercelConfig.headers ? vercelConfig.headers.length : 0} configured`);
} catch (error) {
  console.log('   ❌ Error reading vercel.json');
}

// Check if dist directory exists and has content
console.log('\n📂 Build output check:');
const distPath = path.join(projectRoot, 'dist', 'spa');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log(`   ✅ dist/spa exists with ${files.length} files/folders`);
  
  // Check for index.html
  if (files.includes('index.html')) {
    console.log('   ✅ index.html found');
  } else {
    console.log('   ❌ index.html NOT found');
  }
  
  // Check for assets folder
  if (files.includes('assets')) {
    const assetsPath = path.join(distPath, 'assets');
    const assetFiles = fs.readdirSync(assetsPath);
    console.log(`   ✅ assets folder found with ${assetFiles.length} files`);
  } else {
    console.log('   ❌ assets folder NOT found');
  }
} else {
  console.log('   ❌ dist/spa directory does not exist');
  console.log('   💡 Run "npm run build:client" first');
}

// Check Node.js version
console.log('\n🟢 Environment:');
console.log(`   Node.js: ${process.version}`);
console.log(`   npm: ${process.env.npm_version || 'unknown'}`);

// Deployment recommendations
console.log('\n🚀 Deployment Recommendations:');
console.log('   1. Ensure "npm run build:client" works locally');
console.log('   2. Verify dist/spa contains index.html and assets');
console.log('   3. Check Vercel dashboard for build logs');
console.log('   4. Try deploying with Vercel CLI: "vercel --prod"');
console.log('   5. Check for any .vercelignore file that might exclude files');

// Check for .vercelignore
if (fs.existsSync(path.join(projectRoot, '.vercelignore'))) {
  console.log('\n📋 .vercelignore found - check if it excludes important files');
} else {
  console.log('\n📋 No .vercelignore file (this is usually fine)');
}

console.log('\n✨ Debug complete!');