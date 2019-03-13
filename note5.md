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
二分搜索树
```js
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
class BST {
  constructor() {
    this.root = null
    this.size = 0
  }
  getSize() {
    return this.size
  }
  isEmpty() {
    return this.size === 0
  }
  addNode(v) {
    this.root = this._addChild(this.root, v)
  }
  _addChild(node, v) {
    if(!node) {
      this.size ++
      return new Node(v)
    }
    if(node.value > v) {
      this.left = this._addChild(node.left, v)
    } else if(node.value < v) {
      node.right = this._addChild(node.right, v)
    }
    return node
  }
}
```
```js
// 中序遍历
function midPrint(root) {
  if(!root) return

  print(root.left)
  console.log(root.value)
  print(root.right)
}

function fontPrint(root) {
  if(!root) return

  const stack = []
  stack.push(root)
  while(stack.length) {
    let len = stack.length
    let top = stack[len - 1]
    let flag = 'left'

    console.log(top.value)

    if(top.left && flag === 'left') {
      stack.push(top.left)
      continue
    }
    if(top.right) {
      stack.pop()
      stack.push(top.right)
      flag = 'left'
      continue
    }

    stack.pop()
    flag = 'right'
  }
}