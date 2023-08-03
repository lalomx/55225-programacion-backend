class Vehiculo {

  // constructor
  constructor(matricula) {
    // se ejecuta una vez que se instancia la clase
    // definir propiedades
    // console.log('se ejecuto el constructor con el argumento', matricula)

    this.matricula = matricula
    this.km = 0
  }

  // variables estaticas
  static transmision = 'manual'

  // metodos
  conducir(km) {
    // operaciones
    this.km = this.km + km
  }

  imprimeInformacion() {
    console.log(`El vehiculo de transmicion ${Vehiculo.transmision} ha recorrido ${this.km} kilometros`)
  }
}

const vw = new Vehiculo('123456')

// console.log(vw.matricula)
vw.conducir(350)

// console.log(vw.km)

const tesla = new Vehiculo('098765')

tesla.conducir(400)

// console.log(tesla.km)

// console.log(Vehiculo.transmision)

// vw.imprimeInformacion()

Vehiculo.transmision = 'automatica'

tesla.imprimeInformacion()
vw.imprimeInformacion()