// Debug script to test the sendQuote API endpoint
const fetch = require('node-fetch');

const testData = {
  fullName: "Test User",
  email: "test@example.com",
  phone: "+44 123 456 7890",
  installationAddress: "123 Test Street, Glasgow",
  additionalNotes: "Test quote request",
  entryPoint: "smart-walls",
  productCategory: "smart-walls",
  smartWalls: {
    dimensions: { width: 3, height: 2.5 },
    selectedStyle: { finish: "wood" }
  },
  clientMeta: {
    urlPath: "/smart-walls",
    userAgent: "Test Agent",
    submittedAt: new Date().toISOString()
  }
};

async function testAPI() {
  try {
    console.log('Testing API endpoint...');
    
    const response = await fetch('https://www.thewallshop.co.uk/api/sendQuote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Response body:', responseText);
    
    if (response.ok) {
      console.log('✅ API call successful');
    } else {
      console.log('❌ API call failed');
    }
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAPI();