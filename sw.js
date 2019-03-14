const permanentCode = [
    "./",
    "./style.css",
    "./app.js",
    "./images/cogwheel.png",
    "./images/search.png",
    "./images/close.png"
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