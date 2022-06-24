const cacheName = '';
const appShellFiles = [
    './'
    ,'./index.html'
    ,'./src/script.js'
    ,'./src/style.css'
    ,'./images/favicon.ico'
    ,'./images/apple-touch-icon.png'
    ,'./images/android-chrome-192x192.png'
    ,'./images/android-chrome-512x512.png'
    ,'./images/favicon-16x16.png'
    ,'./images/favicon-32x32.png'
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(appShellFiles);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});