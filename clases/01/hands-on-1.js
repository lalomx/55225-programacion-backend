class Contador {
  constructor(nombre) {
    this.nombre = nombre
    this.cuenta = 0
  }

  static cuenta = 0

  getResponsable() {
    return this.nombre
  }

  contar(num) {
    this.cuenta += num
    Contador.cuenta += num
  }

  getCuentaIndividual() {
    return this.cuenta
  }

  getCuentaGlobal() {
    return Contador.cuenta
  }
}

const maria = new Contador('maria')
const regina = new Contador('regina')

maria.contar(10)
maria.contar(5)
maria.contar(15)
maria.contar(20)

regina.contar(10)
regina.contar(15)
regina.contar(20)

console.log(maria.getCuentaIndividual())
console.log(regina.getCuentaIndividual())

console.log(regina.getCuentaGlobal())