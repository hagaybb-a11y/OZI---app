const CACHE_NAME = 'ozi-v29';
const ASSETS = [
  '/OZI---app/',
  '/OZI---app/index.html',
  '/OZI---app/icon-512.png',
  '/OZI---app/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('/OZI---app/index.html'));
    })
  );
});
