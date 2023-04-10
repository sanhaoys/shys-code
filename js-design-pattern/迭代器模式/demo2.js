// 一个外部迭代器的demo
function iterator(arrLike) {
  var current = 0

  var next = function () {
    var isLastItem = current >= arrLike.length

    return {
      done: isLastItem,
      value: arrLike[current++],
    }
  }

  return {
    next,
  }
}

var a = iterator([1, 2, 3])

// 比较两个数组
function compare(iterator1, iterator2) {
  for (
    var v1 = iterator1.next(), v2 = iterator2.next();
    !v1.done || !v2.done;
    v1 = iterator1.next(), v2 = iterator2.next()
  ) {
    if (v1.value !== v2.value) {
      throw new Error('Not equal')
    }
  }

  return 'is equal'
}

console.log(compare(iterator([1, 2, 3]), iterator([1, 2, 3]))) // is equal
