self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        var request = event.request.clone();
        return fetch(request).then(
          function(response) {
            var url = response && response.url? response.url : null;
            if (url) {
              console.log('Service Worker fetched',url);
            }
            console.dir(response);
            return response;
          }
        );
      })
    );
});
