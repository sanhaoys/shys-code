/* 
  Implement a method Tree() 
  this method can do

  const tree = Tree()
  tree.a.b.c = 1
    {
      a: {
        b: {
          c: 1
        }
      }
    }
*/

function Tree() {
  return new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (!(prop in target)) {
          target[prop] = Tree()
        }
        return Reflect.get(target, prop, receiver)
      },
      set(target, prop, value) {
        target[prop] = value
      },
    }
  )
}

const tree = Tree()

tree.a.b.c = 1
console.log(tree.a.b.c)
