/**
 * MIME Type Fix for Module Loading
 * This script attempts to fix MIME type issues by dynamically loading modules
 */

(function() {
  'use strict';
  
  // Check if we're having MIME type issues
  const originalCreateElement = document.createElement;
  
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(this, tagName);
    
    if (tagName.toLowerCase() === 'script' && element.type === 'module') {
      // Override the script loading to handle MIME type issues
      const originalSrc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
      
      Object.defineProperty(element, 'src', {
        get: function() {
          return originalSrc.get.call(this);
        },
        set: function(value) {
          // For module scripts, we'll try to load them differently if needed
          originalSrc.set.call(this, value);
          
          // Add error handler for MIME type issues
          element.addEventListener('error', function(e) {
            if (e.message && e.message.includes('MIME type')) {
              console.warn('MIME type error detected, attempting fallback loading...');
              
              // Try to load the script content and execute it
              fetch(value)
                .then(response => response.text())
                .then(code => {
                  // Create a new script element with the code
                  const fallbackScript = document.createElement('script');
                  fallbackScript.type = 'module';
                  fallbackScript.textContent = code;
                  document.head.appendChild(fallbackScript);
                })
                .catch(err => {
                  console.error('Fallback loading failed:', err);
                });
            }
          });
        }
      });
    }
    
    return element;
  };
  
  // Also handle dynamic imports
  if (window.import) {
    const originalImport = window.import;
    window.import = function(specifier) {
      return originalImport(specifier).catch(error => {
        if (error.message && error.message.includes('MIME type')) {
          console.warn('Dynamic import MIME type error, attempting fetch fallback...');
          return fetch(specifier)
            .then(response => response.text())
            .then(code => {
              // Create a blob URL with correct MIME type
              const blob = new Blob([code], { type: 'application/javascript' });
              const url = URL.createObjectURL(blob);
              return import(url);
            });
        }
        throw error;
      });
    };
  }
  
  console.log('MIME type fix script loaded');
})();