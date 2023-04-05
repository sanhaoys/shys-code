function calculateBonus(performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4
  }

  if (performanceLevel === 'A') {
    return salary * 3
  }

  if (performanceLevel === 'B') {
    return salary * 2
  }
}

console.log(calculateBonus('S', 2000)) // 8000
console.log(calculateBonus('A', 2667)) // 8001
