/* Service worker: lưu file app để dùng được khi mất mạng. */
const CACHE = "nrcdtc-v20";
const FILES = [
  "./", "index.html", "styles.css", "app.js", "manifest.webmanifest", "icon.svg",
  "icons/avatar-160.png", "icons/favicon-32.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png",
  "data/grammar-to-be.js",
  "data/grammar-present-simple.js",
  "data/grammar-present-continuous.js",
  "data/grammar-past-simple.js",
  "data/grammar-future.js",
  "data/grammar-past-continuous.js",
  "data/grammar-modals.js",
  "data/grammar-wh-questions.js",
  "data/grammar-nouns.js",
  "data/grammar-articles.js",
  "data/grammar-pronouns.js",
  "data/grammar-adjectives-adverbs.js",
  "data/grammar-comparison.js",
  "data/grammar-prepositions.js",
  "data/grammar-there-is.js",
  "data/grammar-conditionals.js",
  "data/grammar-passive.js",
  "data/grammar-plus.js",
  "data/grammar-explain.js",
  "data/vocab-helper.js",
  "data/vocab-food.js",
  "data/vocab-family.js",
  "data/vocab-home.js",
  "data/vocab-school.js",
  "data/vocab-work.js",
  "data/vocab-travel.js",
  "data/vocab-health.js",
  "data/vocab-shopping.js",
  "data/vocab-weather.js",
  "data/vocab-time.js",
  "data/vocab-verbs.js",
  "data/vocab-feelings.js",
  "data/vocab-tech.js",
  "data/vocab-money.js",
  "data/vocab-nature.js",
  "data/vocab-leisure.js",
  "data/vocab-clothes.js",
  "data/vocab-city.js",
  "data/vocab-communication.js",
  "data/vocab-business.js",
  "data/vocab-cefr.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" }) // luôn hỏi lại máy chủ, tránh giữ file cũ sau khi cập nhật
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
