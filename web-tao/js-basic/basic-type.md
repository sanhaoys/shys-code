# js 中的类型

- 原始类型
- 对象类型

## 原始类型

原始类型总共有 7 种

- `number`
- `string`
- `boolean`
- `undefined`
- `null`
- `symbol`
- `bigint`

原始类型存储的都是实际的值，没有方法可供调用

`number`使用的是浮点数，会有`0.1+0.2 !== 0.3`的问题

`string`是不可变的，对 string 的操作实际上是创建了一个新的 string 值

为什么`typeof null`的结果是`object`，是 js 的 Bug，typeof 使用的是变量的后三位判断类型，全零为 object，而 null 实际上的值是从高位到低位全部为 0

## 对象(Object)类型

对象类型和原始类型不同的是，对象类型在栈存储的值是指针，而实际数据存储在堆上(原始类型的值存储在栈上)

在创建对象类型时，会在堆中开辟一个空间，将指针赋值给变量

```javascript
const a = []
const b = a
// 此时b与a的指针相同，修改会造成a也被修改
```

函数传递的是指针的副本，如果一个参数是 Object 那么修改这个参数，同样会造成内容修改

## 类型判断

### typeof

`typeof`对于基础类型来说，可以判断其类型(除了 null)  
如果要判断 null，可以使用`variable === null`来判断

### instanceof

`instanceof`通过判断原型链来判断一个对象是否是构建函数的实例

```javascript
function Person() {}
const p1 = new Person()
console.log(p1 instanceof Person) // true

const str = 'string'
console.log(str instanceof String) // false
```

对于原始类型，使用 instanceof 来判断是行不通的，可以通过修改某个类的`[Symbol.hasInstance]`属性来实现判断

```javascript
class StringFun1 {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log(str instanceof StringFun1) // true

// 疑问: 为什么直接给function的[Symbol.hasInstance]赋值没有效果
```

说明了`Instanceof`来进行类型判断不是百分百可信的

也可以直接使用构造函数来进行判断

```javascript
console.log([].constructor === Array) // true
```

### Object.prototype.toString.call

目前使用最广的判断方法，能判断类型最完整

```javascript
Object.prototype.toString.call('') // [object String]
Object.prototype.toString.call(1) // [object Number]
Object.prototype.toString.call(1n) // [object BigInt]
Object.prototype.toString.call(null) // [object Null]
Object.prototype.toString.call(() => {}) // [object Function]
Object.prototype.toString.call({}) // [object Object]
Object.prototype.toString.call(true) // [object Boolean]
Object.prototype.toString.call([]) // [object Array]
Object.prototype.toString.call(Symbol) // [object Function]
Object.prototype.toString.call(Symbol()) // [object Symbol]

// 疑问: 为什么Symbol是[object Function]
// 写错了，Symbol是获得symbol的函数，确实是一个函数
```

### isXXX API

存在一些判断特定类型的函数如`isNaN()`、`isArray()`  
参考<https://developer.mozilla.org/zh-CN/search?q=is>

## 类型转换

在 js 类型转换中，只有三种情况

- 转 boolean
- 转 string
- 转 number

> ![转换规则](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f95e584fb4f49968527a982041d3e4e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### 转 boolean

在条件判断时，除了`undefined`、`null`、`Nan`、`''`、`0`都为`true`，包括所有 object

### 对象转原始类型

对象在转换类型的时候，会调用内置的`[[ToPrimitive]]`函数，对于该函数来说，逻辑如下

- 如果已经是原始类型，直接返回
- 如果要转成字符串类型就会调用`x.toString()`，转换成基础类型就返回转换的值，如果不是就调用`valueOf`
- 调用`x.valueOf`，如果结果为基础类型就返回转换的值，如果不是就调用`toString`
- 如果没有任何一步返回基础类型，就抛出错误`Cannot convert object to primitive value`

也可以重写 Symbol.toPrimitive，此时该方法优先级最高

```javascript
const a = {
  valueOf(...args) {
    return {}
  },
  toString(...args) {
    return {}
  },
  [Symbol.toPrimitive]() {
    return 'review'
  },
}

console.log(Number(a), String(a)) // NaN review
```

### 四则运算符

加法相对于其他运算方法，有两个特殊的点

- 当一方为 string 时，会自动将另一方转换为 string
- 当一方不是 string/number 时，会将其转换为 number/string

```javascript
console.log(1 + '1') // 11
console.log(1 + [2, 3, 4]) // 12,3,4

// 1 + [2, 3, 4]会调用数组的toString方法(先调用valueOf,不是原始类型 -> 调用toString)
```

对于加法而言`a + + b // aNaN`因为`+ b`的值为 NaN

对于其他运算来说，只要有一方的值是 number，那么另一方也会被转换成 number  
有误：似乎都会转换成 number  
解答：调用 valueOf/toString，根据结果继续运算

### 比较运算符

- 如果是对象就转换成原始类型比较
- 如果是字符串就比较 unicode 字符索引来比较

### this

小册对 this 相关描述很差劲，参考 js-go-deep 的相关 md

### == 与 ===

对于 == 来说，如果双方类型不一致，会进行类型转换

1. 类型相同比大小
2. 不相同就进行类型转换
3. 判断是否是 undefined 和 null 比较，是的话就返回 true
4. 判断比较双方是否是 string 和 number，是的话就将 string 转为 number
5. 判断其中一方是否是 boolean，是的话就将 boolean 转为 number
6. 判断其中一方是否是 object 且另一方为 string/number，是的话就将 object 转为原始类型(valueOf, toString)
7. 返回 false

=== 直接判断

### 闭包

参考 js-go-deep 的相关 md

### 深浅拷贝

浅拷贝可以使用`Object.assign`或者展开运算符来解决，浅拷贝会对引用类型进行地址拷贝

深拷贝可以使用`JSON.parse(JSON.stringify(obj))`解决，但是局限性是有循环引用会抛出错误，以及对 function、undefined、symbol 不支持(copy 后会消失)

lodash.deep 深拷贝

## 原型

原型可以参考 js-deep 相关 md

![原型链](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/208272cb722e403491b0cf3cb4f15797~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
