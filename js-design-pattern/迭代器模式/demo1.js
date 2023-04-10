var each = function (arrLike, cb) {
  // 使用l保证arrLike的length在迭代过程中被修改之后行为不受影响
  for (var i = 0, l = arrLike.length; i < l; i++) {
    if (cb.call(arrLike[i], arrLike[i], i) === false) {
      break
    }
  }
}

each([1, 2, 3], function (val, index) {
  console.log('arr[' + index + '] = ' + val)
  if (val > 1) {
    return false
  }
})

// 同时比较两个数组
var compare = function (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error('Not equal')
  }
  each(arr1, function (val, i) {
    if (val !== arr2[i]) {
      throw new Error('Not equal')
    }
  })
  console.log('相等')
}

compare([1, 2, 3], [1, 2, 3])
