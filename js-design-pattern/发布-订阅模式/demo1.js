// 使用迭代器模式的迭代器
var each = function (arrLike, cb) {
  for (var i = 0, l = arrLike.length; i < l; i++) {
    if (cb.call(arrLike[i], arrLike[i], i) === false) {
      break
    }
  }
}

var emitter = {
  cache: {},
  on: function (eventName, callback) {
    var list = this.cache[eventName] || []
    list.push(callback)
    this.cache[eventName] = list
  },
  off: function (eventName, callback) {
    var that = this
    if (callback) {
      each(this.cache[eventName] || [], function (val, index) {
        if (val === callback) {
          that.cache[eventName].splice(index, 1)
        }
      })
      return
    }
    delete this.cache[eventName]
  },
  emit() {
    var args = Array.prototype.slice.call(arguments)
    var name = args.shift()
    each(this.cache[name] || [], function (cb) {
      cb.apply(this, args)
    })
  },
}

var testFun = function () {
  console.log('测试订阅', Array.prototype.slice.call(arguments))
}

emitter.on('test', testFun)
emitter.on('test', function () {
  console.log('测试订阅1', Array.prototype.slice.call(arguments))
})

emitter.off('test', testFun) // 删除订阅

emitter.emit('test', 1) // 测试订阅1 [1]

emitter.off('test') // 删除全部订阅

emitter.emit('test', 2) // 无输出
