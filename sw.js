const stalyKod = [
    "./",
    "./style.css",
    "./app.js"
]

self.addEventListener("install", async event =>{
    const cache = await caches.open("staticky-kod");
    cache.addAll(stalyKod);
});

self.addEventListener("fetch", event => {
    console.log("fetch");
    const pozadavek = event.request;
    event.respondWith(cacheFirst(pozadavek));
});

async function cacheFirst(pozadavek) {
    const cachedOdpoved = await caches.match(pozadavek);
    return cachedOdpoved || fetch(pozadavek);
}