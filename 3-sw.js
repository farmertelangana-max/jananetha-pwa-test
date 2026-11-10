/* జననేత PWA test prototype - shell cache only.
   Caches only this test app's own files. Template art, fonts and the AI
   background-removal model load from the network every time: offline opens
   the app shell, poster-making needs internet. */
var C = 'jn-pwa-test-v1';
var SHELL = ['./', './studio.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-512-maskable.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(C).then(function (c) { return c.addAll(SHELL) }).then(function () { return self.skipWaiting() }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || fetch(e.request) })
  );
});
