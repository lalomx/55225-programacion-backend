import express from'express'
import ProductManager from './ProductManager.js'

const app = express()
const productManager = new ProductManager('productos.json')
const users = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/productos/:id', async (req, res) => {
  const { id } = req.params

  const existing = await productManager.getById(id)

  console.log(existing)

  if (!existing) {
    res.sendStatus(404)

    return
  }


  res.send(existing)
})

app.get('/api/productos', async (req, res) => {
  const { search, max, min, limit } = req.query
  console.log(`Buscando productos con ${search} y entre [${min}, ${max}]`)
  const products = await productManager.getProducts()

  console.log(products.length)

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

app.post('/api/productos', async (req, res) => {
  const producto = await productManager.saveProduct(req.body)

  res.send(producto)
})

app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params
  const product = req.body

  const existing = await productManager.getById(id)

  if (!existing) {
    res.sendStatus(404)

    return
  }

  await productManager.save(id, product)

  res.sendStatus(200)
})

app.post('/api/usuarios', async (req, res) => {
  const user = req.body

  const id = users[users.length - 1]?.id || 0

  users.push({
    ...user,
    id: id + 1
  })

  res.sendStatus(201)
})

app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params

  const existing = await productManager.getById(id)

  if (!existing) {
    res.sendStatus(404)

    return
  }

  await productManager.delete(id)

  res.sendStatus(200)
})

app.get('/api/usuarios', (req, res) => {
  res.send(users)
})

const port = 3000

app.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})