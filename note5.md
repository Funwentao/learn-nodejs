## 两个数不使用四则运算得出和
```js
function sum(a, b) {
  if(a === 0) return b
  if(b === 0) return a
  let newA = a ^ b
  let newB = (a & b) << 1
  return sum(newA, newB)
}