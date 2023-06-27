function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage example

const obj = {}

let i = 1
while(i <= 10000) {
  let randomNumber = getRandomNumber(1, 20);

  const num = obj[randomNumber] || 0
  obj[randomNumber] = num + 1
  i++
}

console.log(obj)
