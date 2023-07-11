const { Router } = require('express')
const path = require('path')
const ProductManager = require('../managers/ProductManager')

const router = Router()
const productManager = new ProductManager('productos.json')

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'))
  const products = await productManager.getAll()
  console.log(products)

  res.render('index', {
    // product: products[getRandomNumber(0, products.length - 1)]
    products
  })
})

router.get('/carrito', (req, res) => {
  res.render('carrito')
})

module.exports = router