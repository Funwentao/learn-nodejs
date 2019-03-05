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