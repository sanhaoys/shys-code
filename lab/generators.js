function* foo() {
  yield 1
  yield 2
  yield 3

  return 4
}

const f = foo()
console.log(f.next())
console.log(f.next())
console.log(f.next())
console.log(f.next())
