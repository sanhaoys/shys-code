# call

> `call()`方法在使用一个指定的`this`值和若干个指定参数值的前提下调用某个方法

```javascript
var foo = {
  value: 1,
}

function bar() {
  console.log(this.value)
}

bar.call(foo) // 1
```

- call 改变了`this`的指向，指向`foo`
- 函数`bar`执行了

## 模拟实现第一版

思路，给 foo 添加 bar，然后调用后 delete 该属性

```javascript
Function.prototype.call2 = function (content) {
  const key = Symbol()
  content[key] = this
  content[key]()
  delete content[key]
}

var foo = {
  value: 1,
}

function bar() {
  console.log(this.value)
}

bar.call2(foo) // 1
```

## 模拟实现第二步

需要将参数传入到函数中，可以使用 arguments 参数中获取剩余参数传递给函数

```javascript
// call是一个ES3方法，此处尽量不用新语法
Function.prototype.call2 = function (content) {
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  content.fn = this
  // 此时会调用args的toString方法
  eval('content.fn(' + args + ')')
  delete content.fn
}

var foo = {
  value: 1,
}

function bar(name, age) {
  console.log(this.value, name, age)
}

bar.call2(foo, 'hh', 23) // 1 hh 23
```

## 模拟实现第三步

- 函数需要返回值
- content 可以传 null，此时 this 需要指向全局变量

```javascript
// call是一个ES3方法，此处尽量不用新语法
Function.prototype.call2 = function (content) {
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  // 全局变量有window属性指向自身
  content = content || window

  content.fn = this
  // 此时会调用args的toString方法
  var result = eval('content.fn(' + args + ')')
  delete content.fn
  return result
}

var value = 2

var foo = {
  value: 1,
}

function bar(name, age) {
  console.log(this.value, name, age)
  return 'is bar'
}

var result = bar.call(null, 'hh', '123') // 2 hh 123
console.log(result) // is bar
```

## apply 的模拟实现

apply 的模拟实现与 call 类似，只需要将 args 改为第二个参数即可
