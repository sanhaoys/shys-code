// 透明的单例模式
var Singleton = (function () {
  var instance

  var Singleton = function (name) {
    if (instance) {
      return instance
    }

    this.name = name
    return (instance = this)
  }
  Singleton.prototype.getName = function () {
    console.log(this.name)
  }

  return Singleton
})()

var a = new Singleton('a')
var b = new Singleton('b')

a.getName() // a
b.getName() // a
console.log(a === b) // true
