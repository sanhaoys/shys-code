function getSingle(fn) {
  var result

  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

function createPerson(name) {
  var person = {
    name,
  }

  return person
}

var createPersonSingle = getSingle(createPerson)

const person1 = createPersonSingle('a')
const person2 = createPersonSingle('b')

console.log(person1 === person2) // true
