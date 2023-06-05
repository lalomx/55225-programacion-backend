class Vehiculo {

  // constructor
  constructor(matricula) {
    this.matricula = matricula
    this.kilometraje = 0
    console.log('nuevo objeto')
  }

  // variables static
  static usaGasolina = true
  static transmision = 'manual'
  static servicioCada = 15000

  // metodos
  conducir(km) {
    console.log(`conduciendo ${km} kilometros`)

    this.kilometraje = km + this.kilometraje
  }

  obtenerKilometraje() {
    console.log(`El auto con matricula ${this.matricula} tiene: ${this.kilometraje} km recorridos`)
  }

  obtenerInformacion() {
    console.log(`
      Matricula: ${this.matricula}
      KM: ${this.kilometraje} km
      Usa Gasolina: ${Vehiculo.usaGasolina}
    `)
  }
 }

const vw = new Vehiculo('ABC1234')

vw.conducir(220)
vw.obtenerKilometraje()

const tesla = new Vehiculo("ABC0001")

tesla.conducir(500)
tesla.obtenerKilometraje()

vw.obtenerInformacion()
tesla.obtenerInformacion()

Vehiculo.usaGasolina = false

vw.obtenerInformacion()
tesla.obtenerInformacion()