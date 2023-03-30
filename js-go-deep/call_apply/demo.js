// call是一个ES3方法，此处尽量不用新语法
Function.prototype.call2 = function (content) {
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  // 全局变量有window属性指向自身
  var content = content || window

  content.fn = this
  // 此时会调用args的toString方法
  var result = eval('content.fn(' + args + ')')
  delete content.fn
  return result
}

Function.prototype.apply2 = function (content, arr) {
  var content = content || window
  var result

  content.fn = this
  if (!arr) {
    result = content.fn()
  } else {
    var args = []
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }

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
