const suma = (a, b) => a + b
const resta = (a, b) => a - b
const multiplicacion = (a, b) => a * b
const division = (a, b) => a / b

const realizarOperacion = (a, b, cb) => {
  console.log('realizando una operacion')
  const resultado = cb(a, b)

  console.log(`el resultado es ${resultado}`)
}