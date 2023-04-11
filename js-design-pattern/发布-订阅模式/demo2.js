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
  emitCache: {},
  on: function (eventName, callback) {
    var list = this.cache[eventName] || []
    list.push(callback)
    this.cache[eventName] = list

    if (this.emitCache[eventName]) {
      this.emit(eventName, this.emitCache[eventName])
      delete this.emitCache[eventName]
    }
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
    var cbs = this.cache[name]

    if (!cbs) {
      this.emitCache[name] = args
      return
    }

    each(cbs, function (cb) {
      cb.apply(this, args)
    })
  },
}

emitter.emit('post', '已经请求到message')

emitter.on('post', function (message) {
  console.log('获取到message', message)
}) // 获取到message 已经请求到message
