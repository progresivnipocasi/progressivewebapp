const permanentCode = [
    "./",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./images/cogwheel.png",
    "./images/search.png",
    "./images/close.png",
    "./images/humidity.png",
    "./images/max_temp.png",
    "./images/min_temp.png",
    "./images/pressure.png",
    "./images/vitr.png",
    "./images/icons/icon-32x32.png",
    "./images/icons/icon-72x72.png",
    "./images/icons/icon-96x96.png",
    "./images/icons/icon-128x128.png",
    "./images/icons/icon-144x144.png",
    "./images/icons/icon-152x152.png",
    "./images/icons/icon-192x192.png",
    "./images/icons/icon-384x384.png",
    "./images/icons/icon-512x512.png",
    "./sources/Chart.bundle.js",
    "./sources/jquery-3.3.1.min.js",
    "./sources/leaflet.js",
    "./sources/libBoot.js"
]

self.addEventListener("install", async event =>{
    const cache = await caches.open("static-code");
    cache.addAll(permanentCode);
});

self.addEventListener("fetch", event => {
    console.log("fetch");
    const request = event.request;
    event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}