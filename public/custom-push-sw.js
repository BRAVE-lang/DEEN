// ==============================================================================
// DEEN — Custom Service Worker Push Notification Handler
// Listens to Web Push Events & Manages Notification Clicks
// ==============================================================================

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload = {
    title: 'DEEN — Daily Islamic Reminder',
    body: 'Time to remember Allah and recite your daily adhkar.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    data: { url: '/' }
  };

  try {
    const json = event.data.json();
    payload = { ...payload, ...json };
  } catch (e) {
    payload.body = event.data.text() || payload.body;
  }

  const notificationOptions = {
    body: payload.body,
    icon: payload.icon || '/icons/icon-192x192.png',
    badge: payload.badge || '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: payload.data || { url: '/' },
    actions: [
      { action: 'open', title: 'Open DEEN' },
      { action: 'dismiss', title: 'Dismiss' }
    ],
    tag: payload.tag || 'deen-reminder',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, notificationOptions)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if available
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
