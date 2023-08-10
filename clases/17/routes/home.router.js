const { Router } = require('express')
const path = require('path')
const productManager = require('../managers/product.manager')
const { isAuth } = require('../middlewares/auth.middleware')

const router = Router()

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'))
  const { page = 1, size = 5 } = req.query
  const { docs: products, ...pageInfo } = await productManager.getAllPaged(page, size)

  pageInfo.prevLink = pageInfo.hasPrevPage ? `http://localhost:3000/?page=${pageInfo.prevPage}&size=${size}` : ''
  pageInfo.nextLink = pageInfo.hasNextPage ? `http://localhost:3000/?page=${pageInfo.nextPage}&size=${size}` : ''

  res.render('home', {
    title: 'Home',
    products,
    pageInfo,
    user: req.user ?  {
      ...req.user,
      isAdmin: req.user?.role == 'admin',
    } : null,
    style: 'home'
  })
})

router.get('/chat',
  isAuth,
  (req, res) => {
    res.render('chat')
  }
)


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

router.get('/login', (_, res) => res.render('login'))
router.post('/login', (req, res) => {
  const { user, password } = req.body

  req.session.user = {
    name: user
  }

  res
    // .cookie('user', user, { maxAge: 120 * 1000 })
    // .cookie('token', 'SOYUNTOKEN', { signed: true })
    .redirect('/')
})

router.get('/logout', 
  isAuth,
  (req, res) => {
    const { user } = req.cookies

    // res.clearCookie('user').render('logout', {
    //   user
    // })

    req.session.destroy(err => {
      if (err) {
        return res.redirect('/error')
      }

      res.render('logout', {
        user: req.user.name
      })
    })
  }
)

module.exports = router