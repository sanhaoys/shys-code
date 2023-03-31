// new example
function Person(name, age) {
  this.name = name
  this.age = age

  this.habit = 'code'
}

// Person.prototype.codeLevel = 5
// Person.prototype.sayYourName = function () {
//   console.log(this.name)
// }

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

// person.sayYourName() // 抛出错误,person只有一个属性game

const date = myNew(Array, 20).fill(0)

console.log(date)
