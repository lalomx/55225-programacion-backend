class Contador {
  constructor(nombre) {
    this.nombre = nombre
    this.cuentaIndividual = 0
  }

  static cuenta = 0

  getResponsable() {
    return this.nombre
  }

  contar(num) {
    this.cuentaIndividual += num
    Contador.cuenta += num
  }

  getCuentaGlobal() {
    return Contador.cuenta
  }

  getCuentaIndividual = () => {
    return this.cuentaIndividual
  }

  // getTotal() {
  //   return Contador.cuenta + this.cuentaIndividual
  // }
}

const c1 = new Contador('Leandro')
const c2 = new Contador('Ivana')

console.log(c1.getResponsable())
console.log(c2.getResponsable())

c2.contar(500)

console.log(c1.getCuentaGlobal())

c1.contar(200)
c1.contar(10008000)
c2.contar(600)
c2.contar(200000000)

console.log(c2.getCuentaIndividual())
console.log(c1.getCuentaIndividual())

console.log(c2.getCuentaGlobal())