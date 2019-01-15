const cacheName = 'mws-restaurant-static';

// Install Service Worker
self.addEventListener('install', function (event) {
    console.log('The service worker was installed');

});

// Activate event
self.addEventListener('activate', function (event) {
    console.log('The service worker was activated');
    // Unwanted caches removed
    event.waitUntil(
        caches.keys()
        .then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    if (cache !== cacheName) {
                        console.log('Old cache cleared');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', function (event) {
    console.log('Fetching');
    event.respondWith(
        fetch(event.request)
        .then(function (res) {
            // Make copy of response
            const resClone = res.clone();
            // Opens cache
            caches
                .open(cacheName)
                .then(function (cache) {
                    // Add response to cache
                    cache.put(event.request, resClone);
                });
            return res;
        })
        .catch(function (err) {
            caches.match(event.request).then(res => res)
        })
    );
})