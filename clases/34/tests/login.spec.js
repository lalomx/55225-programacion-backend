const login = require('./login')

let totalTests = 0
let testPassed = 0

console.log('Test1: log no password')
totalTests++

let result1 = null
const logger = (msg) => {
  result1 = msg
  console.log(msg)
}

login('lalo', '', logger)

if (result1 === 'no password') {
  console.log('test1: success')
  testPassed++
} else {
  console.log(`test1: fail. Se esperaba 'no password'. result: ${result1}`)
}

console.log(`Pasaron ${testPassed} de ${totalTests}`)