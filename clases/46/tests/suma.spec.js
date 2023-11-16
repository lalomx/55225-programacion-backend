const suma = require('./suma')

let totalTests = 0
let testPassed = 0

// 1
console.log('Test1: retorna null cuando alguno de los parametros no es numerico')
totalTests++
const result1 = suma('a', 3)
if (result1 === null) {
  console.log('test1: success')
  testPassed++
} else {
  console.log(`test1: fail. Se esperaba null. result: ${result1}`)
}

console.log('Test2: retorna 0 cuando no hay parametros')
totalTests++
const result2 = suma()
if (result2 === 0) {
  console.log('test2: success')
  testPassed++
} else {
  console.log(`test2: fail. Se esperaba 0. result: ${result2}`)
}

console.log('Test3: retorna 9 cuando 4 y 5')
totalTests++
const result3 = suma(4, 5)
if (result3 === 9) {
  console.log('test3: success')
  testPassed++
} else {
  console.log(`test3: fail. Se esperaba 9. result: ${result3}`)
}

console.log('Test4: retorna 31 cuando 2, 4, 10, 15')
totalTests++
const result4 = suma(2, 4, 10, 15)
if (result4 === 31) {
  console.log('test4: success')
  testPassed++
} else {
  console.log(`test4: fail. Se esperaba 31. result: ${result4}`)
}

console.log(`Pasaron ${testPassed} de ${totalTests}`)