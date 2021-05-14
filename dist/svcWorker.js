var data = [
  ["I","./index.html",21051413],
  ["P","./bundle.js",21051413],
  ["B","./基础_良良.js",21050817],
  ["A","./UA_良良.js",21051216],
  ["C","./电脑_良良.js",21031415],
  ["Q","./快应用_良良.js",21031415],
  ["S","./爬虫_良良.js",21031415],
  ["O","../favicon.ico",2],
  ["D","./",21051413],
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    data.map( d => {
      caches.open(`${d[0]}_${d[2]}`).then( cache => {
        return cache.add(d[1]);
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then( cacheNames => {
      return Promise.all(
        cacheNames.map( cacheName => {
          data.map( d => {
            if (cacheName.slice(0,1) == d[0] && parseInt(cacheName.slice(2)) < d[2]) {
              return caches.delete(cacheName);
            }
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  let patch;
  
  function cacheData(req,resp) {
	  data.map ( d => {
	    if ('.' + /\/+\w+\.+\w+$/.exec(req.url) == d[1]) {
		  caches.open(`${d[0]}_${d[2]}`).then( cache => {
			patch = true;
		    cache.put(req,resp);
		  });
	    }
	  });
  }
  
  event.respondWith(caches.match(event.request).then( response => {
	if (response!==undefined) {
	  cacheData(event.request, response);
	  return response.clone();
	} else {
	  patch = false;
	  cacheData(event.request, response);
	  return (patch) ? response.clone() : unCachedBypass(event.request);
	}
  }));
});

function unCachedBypass(req) {
	let url = req.clone();
	return fetch(url).then( resp => {
		return resp;
	});
};
