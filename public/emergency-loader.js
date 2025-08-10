/**
 * Emergency Module Loader
 * Handles MIME type issues and React context errors
 */

(function() {
  'use strict';
  
  console.log('🚨 Emergency loader activated');
  
  // Store original functions
  const originalFetch = window.fetch;
  const originalImport = window.import || (async (url) => import(url));
  
  // MIME type mapping
  const mimeTypes = {
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json'
  };
  
  // Get file extension
  function getExtension(url) {
    const pathname = new URL(url, window.location.origin).pathname;
    const match = pathname.match(/\.[^.]*$/);
    return match ? match[0] : '';
  }
  
  // Enhanced fetch with MIME type correction
  window.fetch = async function(input, init = {}) {
    try {
      const response = await originalFetch(input, init);
      
      // Check if it's a JavaScript file with wrong MIME type
      const url = typeof input === 'string' ? input : input.url;
      const ext = getExtension(url);
      const contentType = response.headers.get('content-type');
      
      if ((ext === '.js' || ext === '.mjs') && 
          contentType && 
          contentType.includes('application/octet-stream')) {
        
        console.warn(`🔧 Fixing MIME type for: ${url}`);
        
        // Clone response with correct headers
        const correctedResponse = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: {
            ...Object.fromEntries(response.headers.entries()),
            'content-type': 'application/javascript; charset=utf-8'
          }
        });
        
        return correctedResponse;
      }
      
      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  
  // Enhanced dynamic import
  window.import = async function(specifier) {
    try {
      return await originalImport(specifier);
    } catch (error) {
      if (error.message && error.message.includes('MIME type')) {
        console.warn(`🔧 MIME type error for import: ${specifier}, attempting fix...`);
        
        try {
          // Fetch the module content
          const response = await window.fetch(specifier);
          const code = await response.text();
          
          // Create a blob with correct MIME type
          const blob = new Blob([code], { type: 'application/javascript' });
          const blobUrl = URL.createObjectURL(blob);
          
          // Import from blob URL
          const module = await originalImport(blobUrl);
          
          // Clean up blob URL
          URL.revokeObjectURL(blobUrl);
          
          return module;
        } catch (fallbackError) {
          console.error('Fallback import failed:', fallbackError);
          throw error;
        }
      }
      throw error;
    }
  };
  
  // React error recovery
  window.addEventListener('error', function(event) {
    if (event.error && event.error.message && 
        event.error.message.includes('createContext')) {
      
      console.error('🚨 React context error detected:', event.error);
      
      // Try to reload the page once
      if (!sessionStorage.getItem('emergency-reload-attempted')) {
        sessionStorage.setItem('emergency-reload-attempted', 'true');
        console.log('🔄 Attempting emergency reload...');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error('❌ Emergency reload already attempted, manual intervention required');
        
        // Show user-friendly error message
        document.body.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            font-family: system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #f8f6f3 0%, #faf7f3 100%);
            color: #333;
            text-align: center;
            padding: 20px;
          ">
            <div style="
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              max-width: 500px;
            ">
              <h1 style="color: #b69777; margin-bottom: 20px;">
                🔧 Site Maintenance
              </h1>
              <p style="margin-bottom: 20px; line-height: 1.6;">
                We're experiencing technical difficulties. Our team has been notified and is working on a fix.
              </p>
              <button onclick="window.location.reload()" style="
                background: linear-gradient(135deg, #b69777, #907252);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                margin-right: 10px;
              ">
                Try Again
              </button>
              <button onclick="window.location.href='mailto:support@thewallshop.co.uk'" style="
                background: transparent;
                color: #b69777;
                border: 2px solid #b69777;
                padding: 10px 22px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
              ">
                Contact Support
              </button>
            </div>
          </div>
        `;
      }
    }
  });
  
  // Clear emergency reload flag on successful load
  window.addEventListener('load', function() {
    sessionStorage.removeItem('emergency-reload-attempted');
  });
  
  console.log('✅ Emergency loader ready');
})();