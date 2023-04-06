var write = {
  isBlock: false,
  writeText: function (str) {
    if (this.isBlock) {
      console.log('忙着呢，抛出错误')
      return
    }
    this.isBlock = true
    console.log('写入了:' + str)

    // 假设100毫秒后写入完毕
    setTimeout(() => {
      this.isBlock = false
    }, 100)
  },
}

var system = {
  writeText: function (str) {
    if (!write.isBlock) {
      write.writeText(str)
      return
    }
    // 假设100毫秒后空闲
    setTimeout(() => {
      write.writeText(str)
    }, 100)
  },
}

system.writeText('test') // 写入了:test
system.writeText('test1') // 写入了:test

write.writeText('test') // 写入了:test
write.writeText('test1') // 忙着呢，抛出错误
