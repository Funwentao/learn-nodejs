// 前序遍历

function fontPrint(root) {
  if(!root) return

  const stack = []
  stack.push(root)
  let flag = 'left'

  while(stack.length) {
    let len = stack.length
    let top = stack[len - 1]

    if(flag === 'left') console.log(top.value)

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

function fontPrint1(root) {
  if(!root) return

  console.log(root.value)
  fontPrint1(root.left)
  fontPrint1(root.right)
}

function node(value) {
  this.value = value
  this.left = null
  this.right = null
}

const root = new node(1)
root.left = new node(2)
root.right = new node(3)
root.left.left = new node(4)
root.left.right = new node(5)
root.right.left = new node(6)
root.right.right = new node(7)

fontPrint1(root)