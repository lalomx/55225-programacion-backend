const suma = (a, b) => {
  return new Promise((res, rej) => {
    if (a == 0 || b == 0) {
      rej('operacion innecesaria')

      return
    }

    const result = a + b
    if (result < 0) {
      rej('la calculadora solo regresa valores positivos')

      return
    }

    res(result)
  })
}

const resta = (a, b) => {
  return new Promise((res, rej) => {
    if (a == 0 || b == 0) {
      rej('operacion innecesaria')

      return
    }

    const result = a - b
    if (result < 0) {
      rej('la calculadora solo regresa valores positivos')

      return
    }

    res(result)
  })
}

const multi = (a, b) => {
  return new Promise((res, rej) => {
    if (a == 0 || b == 0) {
      rej('operacion innecesaria')

      return
    }

    const resultado = a * b
    if(resultado < 0) {
      rej('la calculadora solo regresa valores positivos')

      return
    }

    res(resultado)
  })
}

const div = (a, b) => {
  return new Promise((res, rej) => {
    // a / b

    if (a == 0) {
      rej('operacion innecesaria')

      return
    }

    if (b == 0) {
      rej('no se puede dividir entre 0')
      return
    }

    const resultado = a / b
    if (resultado < 0){
      rej('la calculadora solo regresa valores positivos')

      return
    }

    res(resultado)
  })
}

async function main() {
  try {
    const resultado = await div(200, 2)

    console.log(resultado)
  } catch(e) {
    console.log(e)
  }
  
}

main()
