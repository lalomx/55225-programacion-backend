const defaultValue = 0

const value = defaultValue || "no value"
console.log(value)

const valueNullish = defaultValue ?? "no value"

console.log(valueNullish)

class Persona {
  #fullname
  #metodoPrivado = () => console.log('privado')
  constructor(nombre, apellido) {
    this.nombre = nombre
    this.apellido = apellido

    this.#fullname = `${nombre} ${apellido}`

    getFullName = () => this.#fullname    
  }
}

const p = new Persona('luis', 'hernandez')

console.log(p.getFullName())