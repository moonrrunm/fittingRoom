const CACHE_NAME = "fitting-room-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/subject.css",
  "/manifest.json",
  // 列出所有圖片路徑，確保離線時可用
  "/images/icon-192x192.png",
  "/images/icon-512x512.png",
  "/clothes/model.png",
  // ... 您所有的縮圖和預覽圖路徑也都要列在這裡
];

self.addEventListener("install", function (event) {
  // 快取所有檔案
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  // 當網路請求發出時，嘗試從快取中回應，如果沒有才去網路抓取
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
