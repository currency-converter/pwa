# 手动更新缓存

下面的代码实现了一下功能：
- 手动检查文件更新
- 存在更新时获取新文件并更新缓存

```js
// 增加在 sw.js 的 fetch 事件监听函数中
self.addEventListener('fetch', (event) => {
  // ...
  var HOME_URL = '/';
  if (url.pathname === HOME_URL) {
    resource.then(function(res) {
      var lastModified = res.headers.get('last-modified');
      var lastModifiedTimestamp = new Date(lastModified).getTime();

      fetch('/api/updateIndex?t=' + lastModifiedTimestamp).then(function(response) {
        var responseClone = response.clone();
        response.text().then(function(text) {
          // 有内容返回表示网页有更新
          // 使用返回内容更新缓存
          if (text.length > 0) {
            caches.open(CACHE_NAME).then(function (cache) {
              return cache.put(HOME_URL, responseClone);
            }).then(function () {
              console.log('[SW]:', 'Cache asset: ' + HOME_URL);

              // 这里延时几秒刷新页面
              // 确保网页加载完成（message监听事件绑定)后再派发消息
              setTimeout(function() {
                self.clients.matchAll().then(function(clients) {
                  clients.forEach(function(client) {
                    client.postMessage({
                      type: 1,
                      desc: 'HTML found updated',
                      pathname: HOME_URL
                    });
                  });
                });
              }, 100);
            });
          } else {
            console.log('No update');
          }
        }).catch(function(e) {
          console.log(e);
        });
      }).catch(function() {
        // return cache.match(event.request);
      });
    });
  }
});
```

在页面入口js中添加消息接收函数:

```js
// 兼容性处理，避免 11.3 以下的 iOS 系统报错
if ('serviceWorker' in navigator) {
  // OfflinePluginRuntime.install();
  navigator.serviceWorker.addEventListener('message', (event) => {
    const { type, pathname } = event.data;
    if (type === 1 && window.location.pathname === pathname) {
      console.log('recv from service worker', event.data);
      window.location.reload();
    }
  });
}
```
