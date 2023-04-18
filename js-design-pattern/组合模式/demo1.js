var each = function (arrLike, cb) {
  // 使用l保证arrLike的length在迭代过程中被修改之后行为不受影响
  for (var i = 0, l = arrLike.length; i < l; i++) {
    if (cb.call(arrLike[i], arrLike[i], i) === false) {
      break
    }
  }
}

function Folder(name) {
  this.name = name
  this.files = []
}
Folder.prototype.add = function (file) {
  this.files.push(file)
}
Folder.prototype.getName = function () {
  console.log('找到文件夹:', this.name)
  each(this.files, function (item) {
    item.getName()
  })
}

function File(name) {
  this.name = name
}
// 因为对于客户而言，只有在实际执行时才知道某个节点是folder还是file，需要保证实现了相同的接口，但是file不能添加file，抛出错误
File.prototype.add = function () {
  throw new Error('只有文件夹能添加文件')
}
File.prototype.getName = function () {
  console.log('找到文件:' + this.name)
}

const folder1 = new Folder('文件夹1')
const folder2 = new Folder('文件夹2')

const file1 = new File('文件1')
const file2 = new File('文件2')
const file3 = new File('文件3')

folder1.add(file1)
folder2.add(file2)
folder2.add(file3)

const baseFolder = new Folder('根目录')
baseFolder.add(folder1)
baseFolder.add(folder2)

/**
  找到文件夹: 根目录
  找到文件夹: 文件夹1
  找到文件:文件1
  找到文件夹: 文件夹2
  找到文件:文件2
  找到文件:文件3
 */
baseFolder.getName()
