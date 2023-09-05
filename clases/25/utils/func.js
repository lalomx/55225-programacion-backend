function long() {
  let result = 0
  for (let i = 0; i < 5e9; i++) {
    result += i
  }

  return result
}

process.on('message', _ => {
  process.send(long())
})

// module.exports = {
//   long
// }
