## jsonp
```js
function jsonp(url, jsonpCallback, success) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function(data) {
    success && success(data)
  }
  document.body.appendChild(script)
  jsonp('http://xxx', 'callback', function(value) {
    console.log(value)
  })
}
```
|特性|cookie|localStorage|sessionStorage|indexDB|
|:-:|:-:|:-:|:-:|:-:|
|数据生命周期|一般由服务器生成，可以设置过期时间|除非被清理，否则一直存在|页面关闭就清理|除非被清理，否则一直存在|
|数据存储大小|4k|5M|5M|无限|
|与服务器通信|每次都会携带在header中，对于请求性能有影响|不参与|不参与|不参与|

## cookie

|属性|作用|
|:-:|:-:|
|value|如果对于保存用户登录态，应该将该值加密，不能使用明文的用户标识|
|http-only|不能通过js访问cookie，减少xss攻击|
|secure|只能在协议为https的请求中携带|
|same-site|规定浏览器不能在跨域请求中携带cookie，减少csrf攻击|

## Service Worker
>Service workers本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。他们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API

目前该技术通常用来做缓存文件，提高首屏速度，可以试着来实现这个功能
```js
if(navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function(registration) {
      console.log('service worker注册成功')
    }）
    .catch(function() {
      console.log('service worker注册失败')
    })
}
//监听'install'事件，回调中缓存所需文件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll(['./index.html', './index.js'])
    })
  )
})
//拦截所有请求事件
//如果缓存中已经有请求的数据就直接用缓存，否则请求数据
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if(response) {
        return response
      }
      console.log('fetch source')
    })
  )
})
```

## 渲染机制
浏览器的渲染机制一般分为以下几个步骤

1. 处理HTML并构建DOM树
2. 处理css构建CSSDOM树
3. 将DOM与CSSDOM合并成一个渲染树
4. 跟进渲染树来布局，计算每个节点的位置
5. 调用GPU绘制，合成图层，显示在屏幕上
 