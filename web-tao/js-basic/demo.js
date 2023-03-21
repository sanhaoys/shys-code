/**
const person = {
  name: '张三',
  age: 24,
}

const person1 = person

person1.age = 23

function testPerson(p) {
  p.age = 22
}

testPerson(person)
person // { name: '张三', age: 22 }

typeof null // object

function Person() {}
const p1 = new Person()
console.log(p1 instanceof Person) // true

const str = 'string'
console.log(str instanceof String) // false

function StringFun() {}
StringFun.prototype[Symbol.hasInstance] = function (x) {
  return typeof x === 'string'
}
console.log(str instanceof StringFun) // false

class StringFun1 {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log(str instanceof StringFun1) // true

console.log([].constructor === Array) // true
console.log(Object.prototype.toString.call('')) // [object String]
console.log(Object.prototype.toString.call(1)) // [object Number]
console.log(Object.prototype.toString.call(null)) // [object Null]
console.log(Object.prototype.toString.call(() => {})) // [object Function]
console.log(Object.prototype.toString.call({})) // [object Object]
console.log(Object.prototype.toString.call(true)) // [object Boolean]
console.log(Object.prototype.toString.call([])) // [object Array]
console.log(Object.prototype.toString.call(Symbol())) // [object Function]

const a = {
  valueOf(...args) {
    return {}
  },
  toString(...args) {
    return ''
  },
  // [Symbol.toPrimitive]() {
    //   return 'review'
    // },
  }
  
  console.log('' + a) // NaN review
  
*/

console.log(1 + '1') // 11
console.log(1 + [2, 3, 4]) // 12,3,4

const b = {
  valueOf() {
    return {}
  },
  toString() {
    return 1
  },
}

console.log([] * [], b / [1, 2, 3])
