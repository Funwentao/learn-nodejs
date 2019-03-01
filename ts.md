```ts
//数组
let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3]

//元组， 当访问一个越界的元素，会使用联合类型替代
let x: [string, number] = ['hello', 10]

//枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```
在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：
```ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```
## 类型断言
```ts
// 形式一，尖括号语法
let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length
// as语法
let someValue: any = "this is a string"
let strLength: number = (someValue as string).length
```
