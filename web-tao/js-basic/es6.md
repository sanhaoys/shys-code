# ES6 知识点以及面试题

## const let var 的区别

var

- 声明的顶层变量会成为全局变量的属性
- 变量提升

const/let

- const 声明的变量不能再次赋值(常量)
- 暂时性死区 其实也会提升变量，只是未执行到声明处时，不允许访问

提升(hoisting)：函数提升优先于变量提升，函数提升会把整个函数提升到作用域顶部，而变量只会把声明提升到顶部

## 原型继承/Class 继承

js 中并不存在类，class 本质上是 function 的语法糖

### 组合继承

组合继承是最常见的继承方式

```javascript
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function () {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent()

const child = new Child(231)

child.getValue() // 231
child instanceof Parent // true
```

这种继承方式的问题是调用了继承父类的构造函数，浪费了空间

### 寄生组合继承

```javascript
// 寄生组合集成，Parent同上

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true,
  },
})

const child = new Child(231)

child.getValue() // 231
child instanceof Parent // true
```

### Class 继承

class 使用 extend 进行继承，必须在构造函数中调用`super()`，super 就类似 Parent.call

## 模块化

使用模块化可以带来

- 解决命名冲突
- 提供复用性
- 提高代码可维护性

### 立即执行函数

通过函数作用域解决命名冲突、污染全局等问题

```javascript
;(function (globalVariable) {
  // 声明的内容并不会影响全局作用域
  globalVariable.test = function () {}
})(globalVariable)
```

### AMD 和 CMD

后续补充，不需要详细了解

### CommonJS

最早是 Node 的模块化实现，用法如下

```javascript
const a = require('xxx.js') // 引用模块

a.xxx // 模块

// module是node独有的一个变量
// module.exports用来导出
module.exports = { xxx: 1 }

// exports是module.exports的一个引用，所以导出时写成exports.xxx，如果直接赋值，会导致exports变成新的地址，module.exports并不会收到修改
exports === module.exports
```

### ESModule

ESModule 是原生实现的模块化方案，与 CJS 有一些区别

- CJS 支持动态`require`，ESM 使用`import()`进行导入 浏览器中 import 只能在 type=module 的 script 标签中使用
- CJS 是同步导入，ESM 是异步导入(服务端和客户端的区别)
- CJS 导出的是值 copy，ESM 采用的是实时绑定的方式，指向同一个内存地址(可以被修改)

```javascript
import a from 'a'
import { xxx } from 'a'

export default a
export function xxx() {}
```

## Proxy

Proxy 是 es6 新增的功能，用来定义对象中的操作

使用方法`new Proxy(target, handle)`

demo

```javascript
const handle = {
  get(target, property, receiver) {
    console.log(target, property)

    return Reflect.get(target, property, receiver)
  },
  set(target, property, value) {
    console.log(target[property], '=>', value)

    return Reflect.set(target, property, value)
  },
}

const obj = new Proxy({}, handle)

obj.t = '123'

obj.t

obj.t = 888
```

`Reflect`是一个标准的内置对象，提供拦截 js 操作的方法

Vue3 使用 Proxy 替换了 Object.defineProperty，Proxy 既不需要递归给属性添加代理，还可以监听到任何改变(vue2 设置数组必须使用 Array.prototype 的方法才能监听到变化)

## Array map,filter,reduce

- map 是变量数组返回一个新的数组
- filter 会排除不符合条件的元素
- reduce 是一个管道，接受回调参数和初始值，并把上一次回调参数的结果作为下一次回调的参数

## Map、WeakMap、Object

暂略
