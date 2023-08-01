const { Router } = require('express')
const ProductManager = require('../../managers/product.manager')
const productModel = require('../../models/product.model')

const router = Router()
const productManager = new ProductManager('productos.json')

router.get('/:id', async (req, res) => {
  const { id } = req.params

  // const product = await productManager.getById(id)
  console.log(id)

  try {
    const product = await productModel.findOne({ _id: id})
    res.send(product)
  } catch {
    res.sendStatus(404)
    return
  }
})

router.get('/', async (req, res) => {
  const { search, max, min, limit } = req.query
  console.log(`Buscando productos con ${search} y entre [${min}, ${max}]`)
  // const products = await productManager.getAll()
  const products = await productModel.find()

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

  // const product = await productManager.create(body)
  const product = await productModel.create(body)
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

  // await productManager.delete(id)

  const result = await productModel.deleteOne({ _id: id })
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
    const result = await productModel.updateOne({ _id: id }, body)

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
