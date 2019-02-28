## 循环队列
```js
class SqQueue {
  constructor(lenght) {
    this.queue = new Array(length + 1)
    this.first = 0
    this.last = 0
    this.size = 0
  }
  enQueue(item) {
    // 判断队尾 +1 是否为队头，如果是就代表需要扩容数组
    if(this.first === (this.last = 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[last] = item
    this.size ++
    this.last = (this.last + 1) % this.queue.length
  }
  deQueue() {
    if(this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.queue.length
    this.size --
    //判断当前队列大小是否过小，为了保证别浪费空间，
    //在队列空间等于总长度四分之一时，且不为2时缩小总长度为当前的一半
    if(this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    return r
  }
  getHeader() {
    if(this.isEmpty()) {
      throw Error('Queue is empty')
    }
    return this.queue[this.first]
  }
  getLength() {
    return this.queue.length
  }
  isEmpty() {
    return this.first === this.last
  }
  resize(length) {
    let q = new Array[length]
    for (let i = 0; i <= this.size; i++) {
      q[i] = this.queue[(this.first + i) % this.queue.lenght]
    }
    this.queue = q
    this.first = 0
    this.last = this.size
  }
}
```
## 单向链表

