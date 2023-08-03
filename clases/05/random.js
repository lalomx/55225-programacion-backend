function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const obj = {}

let i = 1
while(i <= 10000) {
  const random = getRandomNumber(1, 20)

  const apariciones = obj[random] || 0
  obj[random] = apariciones + 1

  i++
}

console.log(obj)
