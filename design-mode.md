## 适配器模式
适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。

demo
```js
class Plug {
  getName() {
    return '港版插头'
  }
}
class Target {
  constructor() {
    this.plug = new Plug()
  }
  getName() {
    return this.plug.getName() + '适配器转二脚插头'
  }
}
let target = new Target()
target.getName()
```

## 装饰模式
```js
import { connect } from 'react-redux'
class MyComponent extends React.Component {
  // ...
}
export default connect(mapStateToProps)(MyComponent)
```