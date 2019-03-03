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

## 禁用特性继承
如果你不希望组件的根元素继承特性，你可以在组件的选项中设置`inheritAttrs:  false`。
```js
Vue.component('base-input', {
  inheritAttrs: false,
  porps: ['label'],
  template: `<label>
              {{label}}
              <input v-bind="$attrs"/>
            <label>`
})
```
```html
<base-input label="姓名" class="username-input" placeholder="Enter your username" data-date-picker="activated"/>
<!-- 运行后的html结构如下 -->
<label class="username-input">
  姓名<input placeholder="Enter your username" data-date-picker="activated">
<label>
```
## 事件名
不同于组件和prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。举个例子，如果触发一个camelCase名字的事件：
```js
this.$emit('myEvent')
```
则监听这个名字的kebab-case版本是不会有任何效果的：
```html
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"/>
```
不同于组件和prop，事件名不会被用作一个JavaScript变量名或属性名，所以就没有理由使用`camelCase`或`PascalCase`了。并且`v-on`事件监听器在DOM模板中会被自动转换为全小写（因为HTML是大小写不敏感的），所以`v-on:myEvent`将会变成`v-on:event`————导致myEvent不会可能被监听到。因此推荐始终使用`kebab-case`的事件名。
## 自定义组件的`v-model`
一个组件上的`v-model`默认会利用名为`value`的prop和名为`input`的事件，但是想像单选框、复选框等类型的输入控件可能会将`value`特性用于不同的目的。`model`选项可以用来避免这样的冲突：
```js
Vue.component.('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```
```html
<!-- 这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新。 -->
<base-checkbox v-model="lovingVue"></base-checkbox>
<!-- 注意你仍然需要在组件的 props 选项里声明 checked 这个 prop。 -->
```
## 将原生事件绑定到组件上
```html
<base-input v-on:focus.native="onFocus"></base-input>
```
这时，父级的 `.native` 监听器将静默失败。它不会产生任何报错，但是 `onFocus` 处理函数不会如你预期地被调用。

为了解决这个问题，Vue 提供了一个 `$listeners` 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：
```js
{
  focus: function (event) { /* ... */ },
  input: function (value) { /* ... */ }
}
```
有了这个 $listeners 属性，你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。对于类似 `<input> `的你希望它也可以配合 v-model 工作的组件来说，为这些监听器创建一个类似下述 inputListeners 的计算属性通常是非常有用的：
```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```
## `.sync`修饰符
```html
<comp :foo.sync="bar"></comp>
```
会被拓展成：
```html
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```
当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：
```js
this.$emit('update:foo', newValue)
```