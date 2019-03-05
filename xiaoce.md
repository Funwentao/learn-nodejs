## Webpack性能优化
### 减少Webpack打包时间
#### 优化loader
优化loader的文件搜索范围
```js
module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')],
      exclude: /node_modules/
    }]
  }
}
```
将Babel编译过的文件缓存起来
```js
loader: 'babel-loader?cacheDirectory=true'
```
HappyPack

HappyPack可以将loader的同步执行转换为并行的。
```js
plugins: [
  new HappyPack({
    id: 'happybabel',
    laoders: ['babel-loaer?cacheDirectory'],
    //开启4个线程
    threads: 4
  })
]
```
## 实现小型打包工具
先安装一些Babel相关的工具
```cmd
> yarn add babylon babel-traverse babel-core babel-preset-env
```
```js
const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

function readCode(filePath) {
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf-8')

  // 生成AST
  const ast = babylon.parse(content, {
    sourceType: 'module'
  })

  // 寻找当前文件的依赖关系
  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value)
    }
  })

  // 通过AST将代码转为ES5
  const { code } = transfromAst(ast, null, {
    presets: ['env']
  })

  return {
    filePath,
    dependencies,
    code
  }
}

function getDependencies(entry) {
  const entryObject = readCode(entry)
  const dependencies = [entryObject]

  for(const asset of dependencies) {
    const dirname = path.dirname(asset.filePath)
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath)
      if(/\.css$/.test(absolutePath)) {
        const content = fs.readFileSync(absolutePath, 'utf-8')
        const code =`
          const style = document.createElement('style')
          style.innerText = ${JSON.stringify(content).replace(/\\r\\n/g, '')}
          document.head.appendChild(style)
        `
        dependencies.push({
          filePath: absolutePath,
          relativePath,
          dependencies: [],
          code
        })
      } else {
        const child = readCode(absolutePath)
        child.relativePath = relativePath
        dependencies.push(child)
      }
    })
  }
  return dependencies
}

function bundle(dependencies, entry) {
  let modules = ''

  dependencies.forEach(dep => {
    const filePath = dep.relativePath || entry
    modules + `'${filePath}': (
      function(module, exports, require) { ${dep.code}}
    ),`
  })

  const result = `
    (function(modules) {
      function require(id) {
        const module = { exports: {} }
        modules[id](module, module.exports, require)
        return module.exports
      }
      require('${entry}')
    })({${modules}})
  `
  fs.writeFileSync('./bundle.js', result)
}
```
## virtual dom
- 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后的渲染差异
- 一旦节点有子元素，就去判断子元素是否有不同

在第一步算法中我们需要判断新旧节点的`tagName`是否相同，如果不相同的话就代表节点被替换了。如果没有更改tagName的话，就需要判断是否有子元素，有的话就进行第二步算法

在第二步算法中，我们需要判断原本的列表中是否有节点被移除，在新的列表中需要判断是否有新的节点加入，还需要判断节点是否有移动

最大优势在于：
1. 将Virtual DOM作为一个兼容层，让我们还能对接非Web端的系统，实现跨端开发。
2. 同样的，通过Virtual DOM我们可以渲染到其他的平台，比如实现SSR、同构渲染等等
3. 实现组件的高度抽象化
