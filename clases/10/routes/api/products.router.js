const { Router } = require('express')
const ProductManager = require('../../managers/ProductManager')

const router = Router()
const productManager = new ProductManager('productos.json')

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const product = await productManager.getById(id)

  if(!product) {
    res.sendStatus(404)
    return
  }

  res.send(product)
})

router.get('/', async (req, res) => {
  const { search, max, min, limit } = req.query
  console.log(`Buscando productos con ${search} y entre [${min}, ${max}]`)
  const products = await productManager.getAll()

  let filtrados = products

  if (search) {
    /// filtrar
    filtrados = filtrados
      .filter(p => p.keywords.includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  } 

  if (min || max) {
    filtrados = filtrados.filter(p => p.price >= (+min || 0) && p.price <= (+max || Infinity))
  }

  res.send(filtrados)
})

router.post('/', async (req, res) =>  {
  const { body, io } = req

  const product = await productManager.create(body)

  // emitir el producto creado
  io.emit('productoNew', product)
  
  res.status(201).send(product)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  if (!await productManager.getById(id)) {
    res.sendStatus(404)
    return
  }

  await productManager.delete(id)

  res.sendStatus(200)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    if (!await productManager.getById(id)) {
      res.sendStatus(404)
      return
    }

    await productManager.save(id, body)
    res.sendStatus(202)
  } catch(e) {
    res.status(500).send({
      message: "Ha ocurrido un error en el servidor",
      exception: e.stack
    })
  }  
})

module.exports = router
