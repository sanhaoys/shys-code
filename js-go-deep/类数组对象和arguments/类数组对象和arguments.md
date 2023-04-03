# 类数组对象

> 类数组对象就是一个拥有 length 和若干索引属性的对象

举个栗子

```javascript
var arr = ['name', 'age', 'work']

var arrLike = {
  0: 'name',
  1: 'age',
  2: 'work',
  length: 3,
}

// 读写
console.log(arr[0]) // name
console.log(arrLike[0]) // name

arr[0] = 'hybird'
arrLike[0] = 'hybird'

// 长度
console.log(arr.length) // 3
console.log(arrLike.length) // 3
```

从读写、长度、遍历来看都与数组相同，既然如此，为什么叫做类数组对象呢？

类数组并不能使用数组的方法

```javascript
// 使用数组方法
arr.push('variable')
arrLike.push('variable') // 抛出错误，arrLike.push is not a function
```

## 调用数组方法

可以使用 Function.call 调用

```javascript
Array.prototype.push.call(arrLike, 'variable')

console.log(arrLike) // {0: 'hybird', 1: 'age', 2: 'work', 3: 'variable', length: 4}
```

## 类数组转数组

```javascript
console.log(Array.prototype.slice.call(arrLike))
console.log(Array.prototype.concat.apply([], arrLike))
console.log(Array.from(arrLike))
console.log(Array.prototype.map.call(arrLike, item => item))
// splice会改变原数组
console.log(Array.prototype.splice.call(arrLike, 0))
```

## Arguments 对象

Arguments 对象只定义在函数体中，包括了函数和其他属性。在函数体重，arguments 指代该函数的 Arguments 对象。

### Arguments length

表示实参的长度

```javascript
function foo(name, age) {
  console.log('实参的长度', arguments.length)
}

console.log('形参的长度', foo.length)

foo()

// 形参的长度 2
// 实参的长度 0
```

### Arguments callee

通过它可以调用函数自身

```javascript
var data = []

for (var i = 0; i < 3; i++) {
  ;(data[i] = function () {
    console.log(arguments.callee.i)
  }).i = i
}

data[0]()
data[1]()
data[2]()

// 0
// 1
// 2
```

- arguments 传入参数时，实参和 arguments 会共享值(非严格模式下)，没有传入则不会共享值

## 应用

- 参数不定长
- 函数柯里化
- 递归调用
- 函数重载

## 箭头函数

箭头函数没有 arguments，这是规范所决定的
