// 工厂模式
function createPerson(name) {
  var obj = new Object()
  obj.name = name
  obj.sayName = function () {
    console.log(this.name)
  }
  return obj
}

// 构造函数模式
function Person(name) {
  this.name = name
  this.sayName = function () {
    console.log(this.name)
  }
}

// 原型模式
function Person1() {}
Person1.prototype.name = 'ben'
Person1.prototype.sayName = function () {
  console.log(this.name)
}

var person1 = new Person1()
person1.sayName()
