class TicketManager {
  #precioBaseDeGanancia

  constructor() {
    this.#precioBaseDeGanancia = 1.15
    this.eventos = []
  }

  agregarEvento({ nombre, lugar, precio, capacidad = 50, fecha = Date.now() }) {
    const id = this.eventos.length + 1

    this.eventos.push({
      id,
      nombre,
      lugar,
      precio: precio * this.#precioBaseDeGanancia,
      capacidad,
      fecha,
      participantes: []
    })
  }

  getEventos() {
    return this.eventos
  }

  agregarUsuario(eventId, userId) {
    const evento = this.eventos.find(e => e.id === eventId)

    if (!evento) {
      return
    }

    if (!evento.participantes.includes(userId)) {
      evento.participantes.push(userId)
    }

    // nada mas
  }

  ponerEventoEnGira(eventId, lugar, fecha = Date.now()) {
    const evento = this.eventos.find(e => e.id === eventId)

    if (!evento) {
      return
    }

    const id = this.eventos.length + 1

    this.eventos.push({
      ...evento,
      lugar,
      fecha,
      id,
      participantes: []
    })
  }
}

const t = new TicketManager()

t.agregarEvento({
  nombre: 'concierto de tame impala',
  lugar: 'BS, Argentina',
  precio: 500,
  capacidad: 80
})

// console.log(t.getEventos())

t.agregarUsuario(1, 9)

// console.log(t.getEventos())

setTimeout(() => {
  t.ponerEventoEnGira(1, 'Queretaro, MX')
  console.log(t.getEventos())
}, 3000)


