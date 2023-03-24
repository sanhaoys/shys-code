/** 
function Parent() { }
Parent.prototype.getValue = function () {
  console.log(1)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true,
  },
})

console.log(Child.prototype)

console.log(new Child() instanceof Parent)
*/

const handle = {
  get(target, property, receiver) {
    console.log(target, property)

    return Reflect.get(target, property, receiver)
  },
  set(target, property, value) {
    console.log(target[property], '=>', value)

    return Reflect.set(target, property, value)
  },
}

const obj = new Proxy({}, handle)

obj.t = '123'

obj.t

obj.t = 888
