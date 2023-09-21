const { orderRepository: repository } = require('../repositories')

let contador = 0

const get = async (req, res) => {
  try {
    const payload = await repository.getAll().lean()

    res.send({ success: true, payload })
  } catch (e) {
    res.status(500).send({ success: false, error: e.stack })
  }
} // regreso una lista de objetos/vacia

const getById = async (req, res) => {
  const { id } = req.params
  try {
    const payload = await repository.getById(id).lean()

    res.send({ success: true, payload })
  } catch (e) {
    res.status(500).send({ success: false, error: e.stack })
  }
} // regreso un obj

// {
// user, business, products
// }
const create = async (req, res) => {
  const body = req.body
  try {
    const order = body

    order.total = order.products.reduce((total, { price }) => total + price, 0)
    order.no = `O-AAAA-${contador}`
    
    const payload = await repository.create(order)
    res.send({ success: true, payload })

    contador++
  } catch(e) {
    res.status(500).send({ success: false, error: e.stack })
  }
} // regreso un obj recien creado

const resolve = async (req, res) => {
  console.log(req.body)
  const { status } = req.body
  const { id } = req.params
  try {
    if(!status || !['en-camino', 'entregado'].includes(status)) {
      return res.status(400).send({ success: false, error: "Status de orden invalido"})
    }

    await repository.changeStatus(id, status)

    res.send({ success: true })
  } catch(e) {
    res.status(500).send({ success: false, error: e.stack })
  }
}

module.exports = {
  get,
  getById,
  create,
  resolve
}