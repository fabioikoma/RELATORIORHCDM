const CACHE='rhcdm-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(clients.claim())});
self.addEventListener('fetch',e=>{
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
  if(e.request.method==='GET'&&e.request.url.startsWith(self.location.origin)){
    e.waitUntil(fetch(e.request).then(r=>caches.open(CACHE).then(c=>c.put(e.request,r.clone()))).catch(()=>{}));
  }
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window'}).then(ws=>ws.length?ws[0].focus():clients.openWindow('./')));
});
