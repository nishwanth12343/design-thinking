/**
 * FarmDirect - Progressive Web App Service Worker
 * Ensures smooth offline fallback, fast app shell loading, and truthful API communication.
 */

const CACHE_NAME = 'farmdirect-v1.1.0';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/marketplace.html',
    '/cart.html',
    '/wishlist.html',
    '/live-tracking.html',
    '/warehouse.html',
    '/bulk-buyers.html',
    '/farmer-dashboard.html',
    '/offline.html',
    '/manifest.json',
    '/css/main.css',
    '/js/app.js',
    '/js/auth-guard.js',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/icons/icon.svg'
];

// 1. Install Event: Cache App Shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.warn('[PWA SW] Pre-caching partial notice:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// 2. Activate Event: Clean up stale caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. Fetch Event
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Bypass non-GET requests (e.g. POST/PUT to DB)
    if (event.request.method !== 'GET') {
        return;
    }

    // A. API Calls: Strictly Network-First to guarantee real database data
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return new Response(
                    JSON.stringify({
                        error: 'You are currently offline. Database-dependent actions require an active connection.',
                        offline: true
                    }),
                    {
                        status: 503,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            })
        );
        return;
    }

    // B. Navigation requests for HTML pages: Network first, fallback to cached or offline page
    if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return networkResponse;
                })
                .catch(async () => {
                    const cachedResponse = await caches.match(event.request);
                    if (cachedResponse) return cachedResponse;
                    const offlinePage = await caches.match('/offline.html');
                    return offlinePage || new Response('Offline', { status: 503, statusText: 'Offline' });
                })
        );
        return;
    }

    // C. Static Assets (CSS, JS, Images, Fonts): Cache-first with background network update
    event.respondWith(
        caches.match(event.request).then((cached) => {
            const networkFetch = fetch(event.request).then((networkRes) => {
                if (networkRes && networkRes.status === 200) {
                    const copy = networkRes.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                }
                return networkRes;
            }).catch(() => cached);

            return cached || networkFetch;
        })
    );
});
