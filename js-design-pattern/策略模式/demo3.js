// js版本的策略模式计算奖金

var strategies = {
  S: function (salary) {
    return salary * 4
  },
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  },
}

function calculateBonus(performanceLevel, salary) {
  return strategies[performanceLevel](salary)
}

console.log(calculateBonus('S', 2000)) // 8000
console.log(calculateBonus('A', 2667)) // 8001
