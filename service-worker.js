importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.6.2/workbox-sw.js');

const CACHE_NAME = 'story-cache-v2';

if (workbox) {
  console.log('Workbox berhasil dimuat');

  // Cache application shell: index.html, CSS, JS, manifest, leaflet
  workbox.precaching.precacheAndRoute([
    {url: '/', revision: null},
    {url: '/index.html', revision: null},
    {url: '/main.js', revision: null},
   { url: '/assets/styles/style.css', revision: null },
    {url: '/manifest.json', revision: null},
    {url: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css', revision: null},
    {url: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js', revision: null},
  ]);

  // Cache gambar dengan strategi Cache First
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'story-images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  );

  // Cache API request dengan Network First agar update konten didapat
  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://story-api.dicoding.dev',
    new workbox.strategies.NetworkFirst({
      cacheName: 'story-api-cache',
      networkTimeoutSeconds: 5,
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    }),
  );

  // Push Notification Listener (tetap pakai kode custom)
  self.addEventListener('push', (event) => {
    let data = {};
    try {
      if (event.data) {
        data = event.data.json();
      }
    } catch (e) {
      console.error('Push event data is not JSON:', e);
    }

    const title = data.title || 'Story Notification';
    const options = {
      body: data.body || 'Ada story baru!',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      data: {
        url: data.url || '/',
      },
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });

  // Notification Click Handler
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  });

} else {
  console.log('Workbox gagal dimuat');
}

