#!/usr/bin/env node

/**
 * Test deployment readiness
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🧪 Testing Deployment Readiness\n');

let allTestsPassed = true;

function test(name, condition, fix = '') {
  if (condition) {
    console.log(`✅ ${name}`);
  } else {
    console.log(`❌ ${name}`);
    if (fix) console.log(`   💡 Fix: ${fix}`);
    allTestsPassed = false;
  }
}

// Test 1: Build works
console.log('🔨 Build Tests:');
const distExists = fs.existsSync(path.join(projectRoot, 'dist', 'spa'));
test('Build directory exists', distExists, 'Run: npm run build:client');

if (distExists) {
  const indexExists = fs.existsSync(path.join(projectRoot, 'dist', 'spa', 'index.html'));
  test('index.html exists', indexExists, 'Check build output');
  
  const assetsExists = fs.existsSync(path.join(projectRoot, 'dist', 'spa', 'assets'));
  test('Assets directory exists', assetsExists, 'Check build configuration');
}

// Test 2: Configuration files
console.log('\n⚙️  Configuration Tests:');
const vercelExists = fs.existsSync(path.join(projectRoot, 'vercel.json'));
test('vercel.json exists', vercelExists, 'Create vercel.json file');

const packageExists = fs.existsSync(path.join(projectRoot, 'package.json'));
test('package.json exists', packageExists);

if (packageExists) {
  const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  test('build:client script exists', !!pkg.scripts['build:client'], 'Add build:client script');
  test('build script exists', !!pkg.scripts.build, 'Add build script');
}

// Test 3: Critical files
console.log('\n📁 Critical Files:');
const criticalFiles = [
  'index.html',
  'client/App.tsx',
  'vite.config.ts'
];

criticalFiles.forEach(file => {
  const exists = fs.existsSync(path.join(projectRoot, file));
  test(`${file} exists`, exists, `Ensure ${file} is in the repository`);
});

// Test 4: Dependencies
console.log('\n📦 Dependencies:');
const nodeModulesExists = fs.existsSync(path.join(projectRoot, 'node_modules'));
test('node_modules exists', nodeModulesExists, 'Run: npm install');

// Test 5: Git status
console.log('\n🔄 Git Status:');
const gitExists = fs.existsSync(path.join(projectRoot, '.git'));
test('Git repository initialized', gitExists, 'Run: git init');

// Summary
console.log('\n📋 Summary:');
if (allTestsPassed) {
  console.log('🎉 All tests passed! Ready for deployment.');
  console.log('\n🚀 Deploy with:');
  console.log('   vercel --prod');
  console.log('   or push to GitHub for auto-deployment');
} else {
  console.log('⚠️  Some tests failed. Fix the issues above before deploying.');
}

console.log('\n🔍 For detailed deployment help, see: VERCEL_DEPLOYMENT_GUIDE.md');

process.exit(allTestsPassed ? 0 : 1);