const auto1 = {
  marca: 'VW',
  modelo: 2015,
  subMarca: 'Gol',
  km: 1650000,
  owner: {
    nombre: 'Juan Perez'
  }
}

const autoBase = {
  transmision: 'manual',
  combustible: 'gasolina',
  traccion: 'delantera'
}

// let marca = auto1.marca
// let modelo = auto1.modelo

// const { marca, modelo } = auto1

// auto1.manufacturer
// console.log(marca, modelo)

// auto1.transmision = autoBase.transmision

const superAuto = { ...auto1, ...autoBase }
let nombre = 'lalo'

const { 
  marca,
  modelo,
  manufacturer = 'Volkswagen', // asignacion valor por default
  owner: { nombre: nombreDelDueno }, // destructuracion anidada con renombrar
  // ...lasdemas,
} = superAuto

console.log(nombreDelDueno)

// function ({ prop1, prop2 }) {
//   prop1
//   prop2
//   /// operacion
// }
