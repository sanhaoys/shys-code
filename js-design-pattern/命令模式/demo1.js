// 模拟某个button被点击
var button = {
  el: 'button',
}

// 在button上安装命令
function setCommand(button, command) {
  button.onclick = command.execute
}

// 命令模式只不过是callback的面向对象实现，在js中直接传递函数即可
var click = {
  onClick: function () {
    console.log('触发了点击事件')
  },
}

function ClickCommand(receiver) {
  return {
    execute: function () {
      receiver.onClick()
    },
  }
}

setCommand(button, ClickCommand(click))

button.onclick()
