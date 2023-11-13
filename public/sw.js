self.addEventListener('install', event => {
    event.waitUntil(
       caches.open('my-cache').then(cache => {
          return cache.addAll([
              '/',
              '/offline',
              // ... otros recursos estáticos que quieras cachear
          ])
       })
    )
   })
   
   self.addEventListener('fetch', event => {
    event.respondWith(
       caches.match(event.request).then(response => {
          return response || fetch(event.request)
       })
    )
   })
   
   self.addEventListener('activate', event => {
    const cacheWhitelist = ['my-cache']
   
    event.waitUntil(
       caches.keys().then(cacheNames => {
          return Promise.all(
             cacheNames.map(cacheName => {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                   return caches.delete(cacheName)
                }
             })
          )
       })
    )
   })