const { Router } = require('express')
const path = require('path')
const productManager = require('../managers/product.manager')
const isAuth = require('../middlewares/auth.middleware')
const { long } = require('../scripts/long.operation')
const { fork } = require('child_process')
const MongoService = require('../services/mongo.db')

const router = Router()


router.get('/', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'))
  console.log('Id del singleton', MongoService.getInstance().id)

  const { page = 1, size = 5 } = req.query
  const { docs: products, ...pageInfo } = await productManager.getAllPaged(page, size)

  pageInfo.prevLink = pageInfo.hasPrevPage ? `http://localhost:3000/?page=${pageInfo.prevPage}&size=${size}` : ''
  pageInfo.nextLink = pageInfo.hasNextPage ? `http://localhost:3000/?page=${pageInfo.nextPage}&size=${size}` : ''

  // console.log("ID del product manager desde home router", productManager.id)

  // console.log(pageInfo)

  req.session.homeCount = (req.session.homeCount || 0) + 1

  res.render('home', {
    title: 'Home',
    products,
    pageInfo,
    user: req.user ?  {
      ...req.user,
      isAdmin: req.user?.role == 'Admin',
    } : null,
    style: 'home'
  })
})

router.get('/products', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'))
  res.render('products', {
    title: 'Home',
    user: req.user ?  {
      ...req.user,
      isAdmin: req.user?.role == 'Admin',
    } : null,
  })
})

router.get('/chat', isAuth, (req, res) => {
  res.render('chat', { 
      user: req.user ?  {
      ...req.user,
      isAdmin: req.user?.role == 'admin',
    } : null,
  })
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
    title: 'Carrito',
    user: req.user ?  {
      ...req.user,
      isAdmin: req.user?.role == 'admin',
    } : null,
  })
})

router.get('/profile', isAuth, (req, res) => {
  res.render('profile', {
    user: req.user ?  {
      ...req.user,
      isAdmin: req.user?.role == 'admin',
    } : null,
  })
})

router.get('/sum', (req, res) => {
  console.time('sum')
  // const sum = long()
  const child = fork(path.join(__dirname, '../scripts/long.operation'))
  child.send('cualquiercosa')
  child.on('message', (sum) => {
    console.timeEnd('sum')
    res.send({ sum })
  })
  
})

module.exports = router