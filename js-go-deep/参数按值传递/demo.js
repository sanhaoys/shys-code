function foo(v) {
  v.name = 'foo'
  v = 3
}

var v = { name: 'xx' }
foo(v)
console.log(v.name) // foo
