const CACHE_NAME = 'spacemate-v2';

// Install event - take over immediately
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activate event - delete old caches that don't match the current CACHE_NAME
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - Network-First strategy (fetch from network, update cache, fallback to cache)
self.addEventListener('fetch', (event) => {
    // Only cache GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // Ensure the response is valid before caching
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                // Clone the response because it can only be consumed once
                const responseToCache = networkResponse.clone();
                
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            })
            .catch(() => {
                // If the network request fails (e.g., offline), fallback to cache
                return caches.match(event.request);
            })
    );
});
