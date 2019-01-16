const cacheName = 'v2';

 // Install Service Worker
self.addEventListener('install', (e) => {
    console.log('Service Worker was installed');

 });

 // Activate event
self.addEventListener('activate', e => {
    console.log('Service Worker was activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

 // Fetch event
self.addEventListener('fetch', e => {
    console.log('Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            // Open cache
            caches
                .open(cacheName)
                .then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );

 }) 