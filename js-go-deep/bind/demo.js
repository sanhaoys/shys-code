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
