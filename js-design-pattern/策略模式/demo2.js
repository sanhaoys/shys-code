function PerformanceS() {}
PerformanceS.prototype.calculate = function (salary) {
  return salary * 4
}

function PerformanceA() {}
PerformanceA.prototype.calculate = function (salary) {
  return salary * 3
}

function PerformanceB() {}
PerformanceB.prototype.calculate = function (salary) {
  return salary * 2
}

// 奖金类
function Bonus() {
  this.salary = null
  this.strategy = null
}
Bonus.prototype.setSalary = function (salary) {
  this.salary = salary
}
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}
Bonus.prototype.getBonus = function () {
  // Bonus类没有能力计算奖金，委托给策略类计算
  return this.strategy.calculate(this.salary)
}

var person1 = new Bonus()
person1.setSalary(2000)
person1.setStrategy(new PerformanceS())
console.log(person1.getBonus()) // 8000

var person2 = new Bonus()
person2.setSalary(2667)
person2.setStrategy(new PerformanceA())
console.log(person2.getBonus()) // 8001
