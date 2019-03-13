## string
- include
- startsWith
- endsWith
- repeat
- padStart
- padEnd
- matchAll
```js
let s = 'hello world!'
s.startsWith('hello') //true
s.endsWith('!') // true
s.includes('o') // true

//这三个方法都支持第二个参数，表示开始搜索的位置
s.startsWith('world', 6)// true
s.endsWith('hello', 5)// true
s.includes('hello', 6)// false
// endsWith的行为与其他两个方法有所不同。他针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束

'x'.repeat(3) // 'xxx'
//小数会被取整，如果是负数或者Infinity，会报错
'na'.repeat(2.9) // nana
'na'.repeat(Infinity) // RangeError
'na'.repeat(-1) // RangeError
//参数NaN等同于0，如果是字符串，则会先转换成数字
'na'.repeat(NaN) // ''
'na'.repeat('na') // ''
'na'.repeat('3') // 'nanana'

'x'.padStart(5, 'ab') // 'ababx'
'x'.padEnd(5, 'ab') // xabab
```
## 标签模板
```js
alert`123`
//等同于
alert(123)
//如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数
let a = 5
let b = 10
tag`Hello ${a + b} world ${a * b}`
// 等同于
tag(['Hello ', ' world ', ''], 15, 50)
```
如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
```js
const [...butLast, last] = [1, 2, 3, 4, 5] // Uncaught SyntaxError: Rest element must be last elemen
const [first, ...middle, last] = [1, 2, 3, 4, 5] // Uncaught SyntaxError: Rest element must be last elemen
```
`Array.from`方法用于将两类对象转为真正的数组：类数组对象和可遍历的对象
```js
let arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
// es5
var arr1 = [].slice.call(arrayLike)
// es6
let arr2 = Array.from(arrayLike)
// Array.from还可以接受第二个参数，作用类似于数组的map
Array.from(array, x => x * x)
//等同于
Array.form(array).map(x => x * x)
```
`Array.of`方法用于将一组值，转为数组
```js
Array.of(3, 1, 8) // [3, 1, 8]
// 这个方法主要目的是弥补数组构造函数Array()的不足。因为参数个数的不同，导致Array()的行为有差异
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) //[3, 11, 8]
```
`find`和`findIndex`
```js
[1, 4, -5, 10].find(x => x < 0) // -5
```
`Object.getOwnPropertyDescriptor`
```js
let obj = {foo: 123}
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: 123,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

for...in
// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

Object.keys(obj)
// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

Object.getOwnPropertyNames(obj)
//Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名

Object.getOwnPropertySymbols(obj)
//Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

Reflect.ownKeys(obj)
//Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
```
以上5中遍历方法都遵守同样的属性遍历的次序规则
- 首先遍历所有的数值键，按照数值升序排列
- 其次遍历所有字符串键，按照加入时间升序排列
- 最后遍历所有Symbol键，按照加入时间升序排列