# new

(高程第 221 页)[]

> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

举个栗子

```javascript
// new example
function Person(name, age) {
  this.name = name
  this.age = age

  this.habit = 'code'
}

Person.prototype.codeLevel = 5
Person.prototype.sayYourName = function () {
  console.log(this.name)
}

var person = new Person('ben', 23)

console.log(person.name) // ben
console.log(person.age) // 23
console.log(person.codeLevel) // 5
person.sayYourName() // ben
```

实例 person 可以

- 访问到 Person 构造函数的属性
- 访问到 Person.prototype 的属性

## 模拟实现第一版

new 的结果就是一个新对象，在模拟实现的时候，也需要创建一个新对象 obj，因为 obj 需要访问到构造函数的属性，可以使用 Constructor.apply(obj, argument)来给 obj 添加属性，同时需要将实例的`__proto__`属性指向构造函数原型

```javascript
function myNew() {
  var obj = new Object()

  var Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype

  Constructor.apply(obj, arguments)

  return obj
}

const person = myNew(Person, 'ben', 23)

person.sayYourName() // ben
```

## 模拟实现第二版

需要注意的是，若构造函数有返回值，此时返回的如果是对象，那么并不会获得构造函数的实例，而是实际的返回值(若返回值为基础类型，则视为无返回值)

> 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤 1 创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤） -- MDN new 操作符

```javascript
function Person(name, age) {
  this.name = name
  this.age = age

  this.habit = 'code'

  return {
    game: 'CS:GO',
  }
}

Person.prototype.codeLevel = 5
Person.prototype.sayYourName = function () {
  console.log(this.name)
}

function myNew() {
  // 模拟new中使用new有些奇怪
  // var obj = new Object()
  // 改为create
  var Constructor = Array.prototype.shift.call(arguments)
  var obj = Object.create(Constructor.prototype)
  obj.__proto__ = Constructor.prototype

  var ret = Constructor.apply(obj, arguments)

  return typeof ret === 'object' ? ret || obj : obj
}

const person = myNew(Person, 'ben', 23)

person.sayYourName() // 抛出错误,person只有一个属性game
```
