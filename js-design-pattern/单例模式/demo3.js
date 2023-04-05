// 通过代理类来实现单例模式
function Person(name) {
  this.name = name
}
Person.prototype.getName = function () {
  console.log(this.name)
}

var ProxySingletonPerson = (function () {
  var instance

  return function (name) {
    if (instance) {
      return instance
    }
    return (instance = new Person(name))
  }
})()

var a = new ProxySingletonPerson('a')
var b = new ProxySingletonPerson('b')

a.getName() // a
b.getName() // a
console.log(a === b) // true
