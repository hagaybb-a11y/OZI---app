const CACHE_NAME = 'ozi-v3';
const ASSETS = [
  '/OZI---app/',
  '/OZI---app/index.html',
  '/OZI---app/icon-512.png',
  '/OZI---app/manifest.json'
];

// התקנה — שמור assets בקאש
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// הפעלה — נקה קאשים ישנים
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// בקשות — קאש ראשון, רשת כגיבוי
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('/OZI---app/index.html'));
    })
  );
});
