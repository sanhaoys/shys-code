var duck = {
  sound: function () {
    console.log('ga ga ga')
  },
}

var chicken = {
  sound: function () {
    console.log('go go go')
  },
}

function animalSound(animal) {
  // 不需要关心是什么动物，只要这个动物可以发出声音就可以
  if (animal && typeof animal.sound === 'function') {
    animal.sound()
  }
}

animalSound(duck) // ga ga ga
animalSound(chicken) // go go go

var _data = (function () {
  var name = '_data'

  return {
    getName() {
      return name
    },
  }
})()

console.log(_data.getName()) // _data
console.log(_data.name) // undefined
