function long() {
  let sum = 0
  for (let i = 0; i < 5e9; i++) {
    sum += i
  }

  return sum
}

process.on('message', (msg) => {
  console.log(msg)
  const sum = long()
  process.send(sum)
} )

module.exports = {
  long
}