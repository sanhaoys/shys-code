/**
var arr = ['name', 'age', 'work']

var arrLike = {
  0: 'name',
  1: 'age',
  2: 'work',
  length: 3,
}

// 读写
console.log(arr[0]) // name
console.log(arrLike[0]) // name

arr[0] = 'hybird'
arrLike[0] = 'hybird'

// 长度
console.log(arr.length) // 3
console.log(arrLike.length) // 3

// 使用数组方法
arr.push('variable')
// arrLike.push('variable') // 抛出错误，arrLike.push is not a function
Array.prototype.push.call(arrLike, 'variable')

console.log(arrLike) // {0: 'hybird', 1: 'age', 2: 'work', 3: 'variable', length: 4}

// 类数组转数组方法

console.log(Array.prototype.slice.call(arrLike))
console.log(Array.prototype.concat.apply([], arrLike))
console.log(Array.from(arrLike))
console.log(Array.prototype.map.call(arrLike, item => item))
// splice会改变原数组
console.log(Array.prototype.splice.call(arrLike, 0))
*/

function foo(name, age) {
  console.log('实参的长度', arguments.length)
}

console.log('形参的长度', foo.length)

foo()

// 形参的长度 2
// 实参的长度 0
