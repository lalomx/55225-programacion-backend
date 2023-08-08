const { Router } = require('express')
const path = require('path')
const productManager = require('../managers/product.manager')

const router = Router()

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'))
  const { page } = req.query
  const { docs: products, ...pageInfo } = await productManager.getAllPaged(page)

  console.log("ID del product manager desde home router", productManager.id)

  pageInfo.prevLink = pageInfo.hasPrevPage?`http://localhost:3000/?page=${pageInfo.prevPage}`:'';
  pageInfo.nextLink = pageInfo.hasNextPage?`http://localhost:3000/?page=${pageInfo.nextPage}`:'';

  console.log(pageInfo)

  res.render('home', {
    title: 'Home',
    products,
    pageInfo,
    user: {
      ...req.user,
      isAdmin: req.user.role == 'admin',
    },
    style: 'home'
  })
})

router.get('/chat', (req, res) => {
  res.render('chat')
})

router.get('/realtimeproducts', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'))
  const products = await productManager.getAll()
  // const randomId = getRandomNumber(0, products.length - 1)

  res.render('realTimeProducts', {
    title: 'Real Time',
    products,
    user: {
      ...req.user,
      isAdmin: req.user.role == 'admin',
    },
    style: 'home'
  })
})

router.get('/carrito', (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/carrito.html'))
  // interactuar con el manager de carrito
  res.render('carrito', {
    numItems: 2,
    title: 'Carrito'
  })
})

module.exports = router