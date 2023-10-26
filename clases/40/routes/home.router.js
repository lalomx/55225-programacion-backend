const { Router } = require('express')
const path = require('path')
const isAuth = require('../middlewares/auth.middleware')
const { long } = require('../scripts/long.operation')
const { fork } = require('child_process')
const MongoService = require('../services/mongo.db')
const ManagerFactory = require('../managers/manager.factory')

const router = Router()
const productManager = ManagerFactory.getManagerInstance("products")

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

router.get('/compression', (req, res) => {
  let response = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit leo metus, vitae dictum nunc venenatis a. Quisque hendrerit volutpat semper. Pellentesque tristique orci a nisl condimentum vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ut lacus fringilla, laoreet tellus nec, euismod augue. Phasellus ut scelerisque nisi, vel iaculis tellus. Ut tempus et dolor vel iaculis. Etiam est odio, accumsan ut felis eu, interdum pretium purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque in dignissim nunc, et mollis velit. Nulla lorem odio, pulvinar at semper in, feugiat faucibus lectus.`
  for(let i=0;i < 50000; i++) {
    response+= ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit leo metus, vitae dictum nunc venenatis a. Quisque hendrerit volutpat semper. Pellentesque tristique orci a nisl condimentum vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ut lacus fringilla, laoreet tellus nec, euismod augue. Phasellus ut scelerisque nisi, vel iaculis tellus. Ut tempus et dolor vel iaculis. Etiam est odio, accumsan ut felis eu, interdum pretium purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque in dignissim nunc, et mollis velit. Nulla lorem odio, pulvinar at semper in, feugiat faucibus lectus.`
  }
  // res.set('Content-Encoding', 'gzip')
  res.send(response)
})

module.exports = router