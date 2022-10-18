self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('enter app').then((cache) => cache.addAll([
      '/pwa/index.html',
      '/pwa/signUp.html',
      '/pwa/js/main.js',
      '/pwa/js/app.js',
      '/pwa/js/particles.min.js',
      '/pwa/css/style.css',
      '/pwa/css/media.css',
      '/pwa/assets/particles.json',
      '/pwa/icon/fox-icon.png',
      '/pwa/manifest.webmanifest.json',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  console.log("hi");
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
