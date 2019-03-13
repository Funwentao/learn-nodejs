// 中序遍历

function midPrint(root) {
  if(!root) return

  const stack = []
  stack.push(root)
  while(stack.length) {
    let len = stack.length
    let top = stack[len - 1]

    if(top.left) {
      stack.push(top.left)
    } else {
      console.log(top.value)
      stack.pop()

      top = stack[len - 2]
      if(top) {
        console.log(top.value)
        stack.pop()

        if(top.right) stack.push(top.right)
      }
    }
  }
}

function midPrint1(root) {
  if(!root) return

  midPrint1(root.left)
  console.log(root.value)
  midPrint1(root.right)
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

midPrint(root)