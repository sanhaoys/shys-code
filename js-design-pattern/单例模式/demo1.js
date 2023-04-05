// 单例模式的第一版实现
function Singleton(name) {
  this.name = name
}
Singleton.prototype.getName = function () {
  console.log(this.name)
}

Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance
}

var a = Singleton.getInstance('a')
var b = Singleton.getInstance('b')

a.getName() // a
b.getName() // a
console.log(a === b) // true
