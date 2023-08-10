const { Router } = require('express')
const productManager = require('../../managers/product.manager')

const router = Router()

console.log("product manager id: ", productManager.id)
router.get('/:id', async (req, res) => {
  const { id } = req.params

  // const product = await productManager.getById(id)
  console.log(id)

  try {
    const product = await productManager.getById(id)

    if (!product) {
      res.sendStatus(404)
      return
    }

    res.send(product)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
    return
  }
})

router.get('/', async (req, res) => {
  const { search, max, min, limit } = req.query
  console.log(`Buscando productos con ${search} y entre [${min}, ${max}]`)
  const products = await productManager.getAll()

  console.log(products)

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

  console.log(product)

  // emitir el producto creado
  io.emit('productoNew', product)
  
  res.status(201).send(product)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  // if (!await productManager.getById(id)) {
  //   res.sendStatus(404)
  //   return
  // }

  const result = await productManager.delete(id)
  console.log(result)

  if (result.deletedCount >= 1) {
    res.sendStatus(200)
    return
  }

  res.sendStatus(404)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const result = await productManager.update(id, body)

    console.log(result)
    if (result.matchedCount >= 1) {
      res.sendStatus(202)
      return
    }

    res.sendStatus(404)
    
  } catch(e) {
    res.status(500).send({
      message: "Ha ocurrido un error en el servidor",
      exception: e.stack
    })
  }  
})

module.exports = router
