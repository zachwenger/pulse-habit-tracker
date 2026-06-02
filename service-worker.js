/* PULSE service worker
   ──────────────────────────────────────────────────────────────
   Strategy: network-first for navigation requests (always fresh HTML)
             stale-while-revalidate for static assets
   Auto-update: skipWaiting on install + clients.claim on activate
                so a deployed change reaches every open tab + installed
                PWA on the next request, without requiring incognito.
*/
const CACHE = 'pulse-v14';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  // activate the new worker immediately — don't wait for tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    // wipe every cache that isn't the current one
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    // take control of every open page right now (no second reload required)
    await self.clients.claim();
    // notify open pages that a new version landed so they can reload UI state
    const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of list) c.postMessage({ type: 'pulse-updated', cache: CACHE });
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Navigation requests (HTML): network-first, fall back to cache only if offline
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith((async () => {
      try {
        const res = await fetch(req, { cache: 'no-store' });
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      } catch {
        const cached = await caches.match(req);
        return cached || caches.match('./index.html');
      }
    })());
    return;
  }

  // Same-origin static assets: stale-while-revalidate
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    e.respondWith((async () => {
      const cached = await caches.match(req);
      const fetchPromise = fetch(req).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())).catch(() => {});
        return res;
      }).catch(() => null);
      return cached || fetchPromise || caches.match('./index.html');
    })());
    return;
  }

  // Cross-origin (Google Fonts CSS/woff): pass-through network with cache fallback
  e.respondWith(fetch(req).catch(() => caches.match(req)));
});

// Allow the page to nudge a waiting worker to activate immediately
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Click a notification → focus the app (or open it if closed)
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
