const express = require('express')
const ProductManager = require('./ProductManager')

const app = express()
const productManager = new ProductManager('productos.json')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// cookie
// passport
// template engines
// entre otros

app.get('/api/usuarios', (req, res) => {
  res.send('usuarios')
})

app.get('/api/productos/:id', async (req, res) => {
  const { id } = req.params

  const product = await productManager.getById(id)

  if(!product) {
    res.sendStatus(404)
    return
  }

  res.send(product)
})

app.get('/api/productos', async (req, res) => {
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

app.post('/api/productos', async (req, res) =>  {
  const { body } = req

  const product = await productManager.create(body)
  
  res.status(201).send(product)
})

app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params

  if (!await productManager.getById(id)) {
    res.sendStatus(404)
    return
  }

  await productManager.delete(id)

  res.sendStatus(200)
})

app.put('/api/productos/:id', async (req, res) => {
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

// router
// middlewares
// static files
// subir archivos estaticos 

const port = 3000

app.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})