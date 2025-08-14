const CACHE_NAME = 'wallshop-v1';
const STATIC_CACHE = 'wallshop-static-v1';
const DYNAMIC_CACHE = 'wallshop-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/images/placeholder.jpg'
];

// Assets to cache on first request
const CACHE_PATTERNS = [
  /\.(?:js|css|woff2?|png|jpg|jpeg|webp|avif|svg)$/,
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== CACHE_NAME
            )
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) return response;
          
          return fetch(request)
            .then((response) => {
              // Don't cache error responses
              if (!response.ok) return response;
              
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => cache.put(request, responseClone));
              
              return response;
            })
            .catch(() => {
              // Return offline page if available
              return caches.match('/') || new Response('Offline', { status: 503 });
            });
        })
    );
    return;
  }

  // Handle asset requests
  if (CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) return response;

          return fetch(request)
            .then((response) => {
              // Don't cache error responses
              if (!response.ok) return response;

              const responseClone = response.clone();
              const cacheName = url.hostname === location.hostname ? STATIC_CACHE : DYNAMIC_CACHE;
              
              caches.open(cacheName)
                .then((cache) => cache.put(request, responseClone));

              return response;
            });
        })
    );
  }
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    );
  }
});

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/favicon-192x192.png',
        badge: '/favicon-96x96.png'
      })
    );
  }
});