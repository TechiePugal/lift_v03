/* eslint-disable */
// service-worker.js

// Define a unique name for the cache
const cacheName = 'my-pwa-cache-v1';

// List of files to be cached
const cacheFiles = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  // Add other files and assets you want to cache
];

// Install event - caching static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/favicon/android-chrome-144x144.png',
    badge: '/favicon/android-chrome-144x144.png',
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification Title', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Try to focus on an existing client
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }

      // If no existing client is found, open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});
