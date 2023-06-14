const record = {
  /// propiedades
  nombre: 'red dead 2',
  // createdDate: 0 // 1 ene 1970 unix epoch falsey
}

// if (record.createdDate) {
//   // asdas
// }

const defaultValue = 10

function nuevo(record) {
  const fecha = record.createdDate ?? defaultValue

  console.log(fecha)
}

// nuevo(record)

class Persona {
  #fullname
  #metodoPrivado = () => console.log('metodo privada')

  constructor(nombre, apellido) {
    this.nombre = nombre
    this.apellido = apellido

    this.#fullname = `${this.nombre} ${this.apellido}`
  }

  getFullname = () => this.#fullname
}

const p = new Persona('Ivan', 'Abregu')

console.log(p.getFullname())