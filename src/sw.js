self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('raw.githubusercontent.com')) {
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response('Offline', { status: 503 });
      })
    );
  }
});