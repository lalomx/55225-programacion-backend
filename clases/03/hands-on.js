const suma = (a, b) => {
  return new Promise((reject, resolve) => {
    if (a == 0 || b == 0) {
      reject('operacion innecesaria')
      return
    }

    const result = a + b
    if (result < 0) {
      reject('la calculadora solo devuelve resultados positivos')
      return
    }

    resolve(result)
  })
}

const resta = (a, b) => {
  return new Promise((reject, resolve) => {
    if (a == 0 || b == 0) {
      reject('operacion innecesaria')
      return
    }

    const result = a - b
    if (result < 0) {
      reject('la calculadora solo devuelve resultados positivos')
      return
    }

    resolve(result)
  })
}

const multi = (a, b) => {
  return new Promise((reject, resolve) => {
    if (a <= 0 || b <= 0) {
      reject('la calculadora solo devuelve resultados positivos')
      return
    }

    resolve(a * b)
  })
}

const div = (a, b) => {
  return new Promise((reject, resolve) => {
    if (a == 0) {
      reject('no se puede dividir entre 0')
      return
    }

    if (b == 0) {
      reject('operacion innecesaria')
      return
    }

    resolve(a / b)
  })
}

async function main() {

}