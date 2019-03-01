## JavaScript的原始数据类型
* undefined
* null
* Boolean
* String
* Number
* Object
* Symbol
## typeof
```js
// typeof 对于原始类型来说，除了null都可以显示正确的类型；对于对象来说，除了函数都会显示object，所以说typeof并不能准确判断变量到底是什么
typeof 1 // number
typeof '1' // string
typeof true // boolean
typeof {} //object
typeof Symbol() //symbol
typeof functtion // function 这个要注意
typeof undefined // undefined
typeof null // object
```
### instanceof
```js
let str = 'hello world'
str instanceof String //false 
//对于原始类型来说，你想直接通过instanceof来判断类型是不行的，当然我们还是有办法让instanceof来判断原始类型
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) //true
```
## 类型判断
可以通过 `Object.prototype.toString.call()`
```js
Object.prototype.toString.call(1) //"[object Number]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({}) //"[object Object]"
Object.prototype.toString.call(new Date()) //"[object Date]"
Object.prototype.toString.call([]) //"[object Array]"
Object.prototype.toString.call('') //"[object String]"
Object.prototype.toString.call(true) //"[object Boolean]"
Object.prototype.toString.call(Symbol()) //"[object Symbol]"
Object.prototype.toString.call(/re/) //"[object RegExp]"
Object.prototype.toString.call(null) //"[object Null]"
Object.prototype.toString.call(undefined) //"[object Undefined]"
```
## == 的判断流程
 1、首先会判断两者类型是否相同。相同的话就是比较大小了
 
 2、类型不相同的话，那么就会进行类型转换

 3、会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`

 4、判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换成`number`

## 深拷贝
>这个问题通常可以通过 `JSON.parse(JSON.stringify(object))` 来解决。但是该方法也是有局限性的:

1、会忽略 `undefined`

2、会忽略 `symbol`

3、不能序列化函数

4、不能解决循环引用的对象
```js
function deepClone(obj) {
  function isObject(o) {
    retrun (typeof o === 'object' || typeof o === 'function') && o !== null
  }
  if(!!isObject(object)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : {..obj}
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deeppClone(obj[key]) : obj[key]
  })
  return newObj;
}
```
## 类型转换
对象在转换基本类型时，首先会调用`valueOf` 然后调用`toString`。并且这两个方法你是可以重写的。当然你也可以重写`Symbol.toPrimitive`，该方法在转基本类型时调用的优先级最高。
```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a //3
'1' + a //'12'
``` 
## 四则运算
>只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型。其他运算只要其中一方是数字，那么另一方就转为数字。并且加法运算会触发三种类型转换：将值转为原始值，转换为数字，转换为字符串。

## new
1、新生成了一个对象

2、链接到原型

3、绑定this

4、返回新对象
```js
function craete() {
  let obj = new Object()
  let Con = [].shift.call(arguments)

  obj.__proto__ = Con.prototype
  
  let result = Con.apply(obj, arguments)
  
  return typeof result === 'object' ? result : obj
}
```
```js
//new Foo() 的优先级大于 new Foo ，所以对于上述代码来说可以这样划分执行顺序
function Foo() {
    return this;
}
Foo.getName = function () {
    console.log('1');
};
Foo.prototype.getName = function () {
    console.log('2');
};

new Foo.getName();   // -> 1
new Foo().getName(); // -> 2
//相当于
new (Foo.getName());
(new Foo()).getName();
```
## 模拟实现call、apply和bind
```js
Function.prototype.myCall = function(context) {
  let ctx = context || window

  ctx.fn = this
  let args = [...arguments].slice(1)
  let result = ctx.fn(...args);
  delete ctx.fn
  return result
}

Function.prototype.myApply = function(context) {
  let ctx = context || window

  ctx.fn = this
  let result = arguments[1] ? ctx.fn(...arguments[1]) : ctx.fn()
  delete ctx.fn
  return result
}

Function.prototype.myBind = function(context) {
  let ctx = context || window
  let args = [...arguments].slice(1)
  let that = this

  ctx.fn = this

  return function f() {
    if(this instanceof f) {
      return new that(...args, ...arguments)
    } else {
      return ctx.fn(...args, ...arguments)
    }
  }
}
```
## proxy
```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value)
      return Reflect.set(target, property, value, receiver)
    }
    return new Proxy(obj, handler)
  }
}
```