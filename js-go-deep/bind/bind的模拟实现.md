# bind

> bind 会创建一个新函数。当这个新函数被调用时，bind()的第一个参数作为它运行时的 this，之后的一序列参数将会在传递的实参传入前作为它的参数

bind 的特点

- 返回一个函数
- 可以传入其他参数

## 模拟实现第一版

实现返回一个函数，并且他的 this 是 bind 的第一个参数

```javascript
Function.prototype.bind2 = function (content) {
  var that = this

  return function () {
    return that.apply(content)
  }
}

var foo = {
  value: 2,
}

function bar() {
  console.log(this.value)
}

bar.bind2(foo)() // 2
```

## 模拟实现第二版

实现传入参数优先于执行时的实参传入函数
apply 可以传入一个参数数组，将两个 args 拼接即可

```javascript
Function.prototype.bind2 = function (content) {
  var that = this
  var args = Array.prototype.slice.call(arguments, 1)

  return function () {
    return that.apply(
      content,
      args.concat(Array.prototype.slice.call(arguments))
    )
  }
}

var foo = {
  value: 2,
}

function bar(name, age) {
  console.log(this.value, name, age)
}

bar.bind2(foo, 'Ben')(23) // 2 Ben 23
```

## 模拟实现第三版

bind 还有一个特点

> 一个 bind 函数也能使用 new 操作符创建对象，这种行为就像将原函数作为构造器。提供的 this 会被忽略，同时调用时的参数被提供给模拟函数

```javascript
Function.prototype.bind2 = function (content) {
  var that = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fBind = function () {
    return that.apply(
      /**  
        当作为构造函数时，this指向实例
        当作为普通函数时，this指向window，此时参数为content
      */
      this instanceof fBind ? this : content,
      args.concat(Array.prototype.slice.call(arguments))
    )
  }
  // 修改返回函数的prototype使其继承原函数
  // 为什么不需要修改varructor,因为本就希望实现原函数作为构造函数
  fBind.prototype = this.prototype
  return fBind
}

var foo = {
  value: 2,
}

function bar(name, age) {
  this.car = 'ya_di'
  console.log(this.value, name, age)
}
bar.prototype.house = 'small_house'

var barBind = bar.bind2(foo, 'Ben')
barBind(23) // 2 Ben 23

// 此时可以看到即使传递了content为foo，但是this.value还是undefined,因为此时this指向实例barExempla
var barExempla = new barBind(24) // undefined Ben 24

console.log(barExempla.car, barExempla.house) // ya_di small_house
```

## 构造函数的优化实现

此时的 bind 有一些问题，修改 bind 返回函数的 prototype 会导致模拟函数的 prototype 被修改
同时，如果不是函数，需要抛出错误

```javascript
Function.prototype.bind2 = function (content) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    )
  }

  var that = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () {}

  var fBind = function () {
    return that.apply(
      /**  
        当作为构造函数时，this指向实例
        当作为普通函数时，this指向window，此时参数为content
      */
      this instanceof fBind ? this : content,
      args.concat(Array.prototype.slice.call(arguments))
    )
  }
  // 修改返回函数的prototype使其继承原函数
  // 为什么不需要修改constructor,因为本就希望实现原函数作为构造函数
  fNOP.prototype = this.prototype
  // 使用一个空函数中转，防止修改fBind的prototype时this的prototype同时被修改
  fBind.prototype = new fNOP()
  return fBind
}
```
