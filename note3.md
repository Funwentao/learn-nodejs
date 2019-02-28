## 防抖
```js
const debouce = function (fn, wait = 50) {
  let timer = 0

  return function(..args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
// 增加立即执行
const debouce = function(fn, wait = 50, immediate = true) {
  let timer, context, args

  const later = () => setTimeout(() => {
    timer = null

    if(!immediate) {
      fn.apply(context, args)
      context = args = null
    }
  }, wait)

  return function(...params) {
    if(!timer) {
      timer = later()

      if(immediate) {
        fn.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```
## 节流
防抖和节流本质是不一样的。防抖是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。
```js
_.throttle = function(func, wait, options) {
  return function(..args) {
    
  }
}