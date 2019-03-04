## 两个数不使用四则运算得出和
```js
function sum(a, b) {
  if(a === 0) return b
  if(b === 0) return a
  let newA = a ^ b
  let newB = (a & b) << 1
  return sum(newA, newB)
}

function createObj(fn, ...args) {
  let obj = new Object()
  fn.apply(obj, args)
  obj.__proto__ = fn.prototype
  return obj
}
```
实现一个函数`sum(1,2)(3,4,5)(6).valueOf() = 21`
```js
function sum(...args) {
  let r = 0
  function fn(...args1) {
    r = args1.reduce((a,b) => a + b, r)
    return fn
  }
  fn.valueOf = function() {
    return r
  }
  return fn(...args)
}
```
实现函数柯里化
```js
function curry(fn) {
  let args = []
  function _c(a) {
    a && args.push(a)
    return args.length === fn.length ? fn.apply(null, args) : _c 
  }
  return _c()
}
```