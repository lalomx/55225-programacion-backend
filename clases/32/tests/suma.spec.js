const suma = require('./suma')

let testPassed = 0
let testTotales = 0

testTotales++
console.log('test 1: retorna null si algun parametro no es un numero')
let result1 = suma(2, 'a')

console.log(result1)

if (result1 === null) {
  console.log('test1 result: success')
  testPassed++
} else {
  console.log('test1 result: fail, se esperaba null, recibido', result1)
}

// TODO: debe de regresar 0 si no hay ningun argumento
// correctamente
//

console.log(`Test pass ${testPassed} of ${testTotales}`)