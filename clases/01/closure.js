function numberGenerator() {
  // scope padre
  let num = 1

  function checkNumber() {
    // scope hijo o scope anidado
    // closure porque num sigue 'viva'
    console.log(`el numero es: ${num} - scope hijo`) // se accede a la variable declarada en el scope padre
    // conexion a una base de datos
    // memory leak
  }

  console.log(`el numero es: ${num} - scope padre`)

  num++

  return checkNumber
}

const checkNumber = numberGenerator()

console.log(checkNumber)

checkNumber()