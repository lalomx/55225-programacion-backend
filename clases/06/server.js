import express from'express'
import ProductManager from './ProductManager.js'

const app = express()
const productManager = new ProductManager('productos.json')

app.use(express.urlencoded({ extended: true }))
// key1=value1&key1=value2 ->  { key1: 'value1', key2: 'value2' }
// { key1: ['value1', 'value2'] }

app.get('/', (req, res) => {
  res.send(`
  <html>
    <head>
    <title>Mi primera pagina</title>
    </head>
    <body>
      <p style="color:blue;text-transform:uppercase">Bienvenidos a mi server de express</p>
    </body>
  </html>
  `)
})

app.get('/usuarios', (req, res) => {
  res.send('usuarios')
})

app.get('/productos/:id', async (req, res) => {
  const { id } = req.params

  for (const p of products) {
    if (p.id == id) {
      res.send(p)
      return
    }
  }
  // await

  res.send('no encontrado')
})

app.get('/productos', async (req, res) => {
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

const port = 3000

app.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})