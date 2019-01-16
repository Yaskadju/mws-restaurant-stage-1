if ('serviceWorker' in navigator) {
    // Register the service Worker in the navigator
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw.js')
            .then(reg => console.log('Service Worker was registered'))
            .catch(err => console.log(`Service Worker: Error: ${err} `));
    });
}