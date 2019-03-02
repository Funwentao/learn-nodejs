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
```
## tips
- 通过使用`v-once`，可以执行一次性地插值
- 动态参数
```html
<a v-bind:[attributeName]="url"> ... </a>
```
这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 data 属性 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。
- 计算属性的setter
```js
computed: {
  fullname: {
    get() {
      return this.firstName + ' ' + this.lastName
    },
    set() {
      let names = newValue.split(' ')
      this.firstName = name[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
- class与style绑定
```html
<!-- 对象语法 -->
<div v-bind:class="{ active: isActive }"></div>
<!-- 数组语法 -->
<div v-bind:class="[activeClass, errorClass]"></div>
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

```
此外`v-bind:class`指令也可以与普通的class属性共存
- 绑定内联样式
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="styleObject"></div>
data: {
  activeColor: 'red',
  fontSize: 30,
    styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
<!-- v-bind:style 的数组语法可以将多个样式对象应用到同一个元素上 -->
<div v-bind:style="[baseStyles, overridingStyles]"></div>
<!-- 当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。 -->

<!-- 从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如： -->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
<!-- 这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。 -->
```
## 为什么在HTML中监听事件
你可能注意到这种事件监听的方式违背了关注点分离（separation of concern）这个长期以来的优良传统。但不必担心，因为所有的Vue.js事件处理方法和表达式都严格绑定在当前视图的ViewModel上，他不会导致任何维护上的困难。实际上，使用v-on有几个好处：
1. 扫一眼HTML模板便能轻松定位在JavaScript代码里对应的方法
2. 因为你无须再JavaScript里手动绑定事件，你的ViewModel代码可以是非常纯粹的逻辑，和DOM完全解耦，更易于测试。
3. 当一个ViewModel被销毁时，所有的事件处理器都会自动被删除。你无须担心如何处理它们。

## 解析DOM模板时的注意事项
有些HTML元素，诸如`<ul>` `<ol>` `<table>` `<select>`,对于哪些元素可以出线在其内部是有严格限制的。而有些元素，诸如`<li>` `<tr>` `<option>`，只能出现在其他某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：
```html
<table>
  <blog-post-row/>
</table>
```
这个自定义组件`<blog-post-row>`会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的`is`特性给了我们一个变通的办法：
```html
<table>
  <tr is="blog-post-row"/>
<table>
```
## Prop验证
```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查，null和undefined会通过任何类型验证
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的对象
    propE:{
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      } 
    },
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
注意：prop会在一个组件实例创建之前进行验证，所以实例的属性(`data` `computed`等)在`default`或`validator`函数中是不可用的。

