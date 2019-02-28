## vue数据劫持
```js
let data = {name: 'yck'}

function observe(obj) {
  if(!obj || typeof obj !== 'object') return 

  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  observe(val)

  Object.defineProperty(obj, key, {
    emumerable: true,
    configuable: true,
    set: function() {

    },
    get: function() {
      
    }
  })
}