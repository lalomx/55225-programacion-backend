const { Router } = require('express')

const productManager = require('../managers/product.manager')
const userManager = require('../managers/user.manager')
const isAuth = require('../middlewares/auth.middleware')
const { hashPassword, isValidPassword } = require('../utils')

const router = Router()


router.get('/', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'))
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
      isAdmin: req.user?.role == 'admin',
    } : null,
    style: 'home'
  })
})

router.get('/chat', isAuth, (req, res) => {
  res.render('chat')
})

router.get('/realtimeproducts', async (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'))
  const products = await productManager.getAll()

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

router.get('/profile', isAuth, (req, res) => {
  res.render('profile', {
    ...req.session.user
  })
})
router.get('/signup', (_, res) => res.render('signup'))
router.post('/signup', async (req, res) => {
  const user = req.body
  
  console.log(user)

  const existing = await userManager.getByEmail(user.email)

  if (existing) {
    return res.render('signup', {
      error: 'El email ya existe'
    })
  }

  // crear al usuario
  try {
    const newUser = await userManager.create({
      ...user,
      password: hashPassword(user.password),
    })

    req.session.user = {
      name: newUser.firstname,
      id: newUser._id,
      ...newUser._doc
    }

    console.log(req.session)

    req.session.save((err) => {
      res.redirect('/')
    })

  } catch(e) {
    return res.render('signup', {
      error: 'Ocurrio un error. Intentalo mas tarde'
    })
  }

  

})

router.get('/login', (_, res) => res.render('login'))
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {

    const user = await userManager.getByEmail(email)

    console.log(user.password, password)

    if (!user) {
      return res.render('login', { error: 'El usuario no existe' })
    }

    if (!user.password || !password || !isValidPassword(password, user.password)) {
      return res.render('login', { error: 'Contraseña invalida' })
    }

    req.session.user = {
      name: user.firstname,
      id: user._id,
      // role: 'Admin'
      ...user
    }

    req.session.save((err) => {
      if(!err) {
        res.redirect('/')
      }
    })
  } catch(e) {
    console.log(e)
    res.render('login', { error: 'Ha ocurrido un error' })
  }

  // guardo la session con la informacion del usuario
})
router.get('/logout', isAuth, (req, res) => {
  const { user } = req.cookies

  // borrar la cookie
  res.clearCookie('user')

  req.session.destroy((err) => {
    if(err) {
      return res.redirect('/error')
    }

    res.render('logout', {
      user: req.user.name
    })

    req.user = null
  })

  // res.render('logout', {
  //   user
  // })
})

router.get('/resetpassword', (_, res) => res.render('resetpassword'))
router.post('/resetpassword', async (req, res) => {

  const { email, password1, password2 } = req.body

  const user = await userManager.getByEmail(email)

  if (!user) {
    return res.render('resetpassword', { error: 'El usuario no existe' })
  }

  if(password1 !== password2) {
    return res.render('resetpassword', { error: 'Las contraseñas no coinciden' })
  }

  try {
    
    await userManager.save(user._id, {
      ...user,
      password: hashPassword(password1)
    })

    res.redirect('/login')

  } catch(e) {
    console.log(e)
    return res.render('resetpassword', { error: 'Ha ocurrido un error' })
  }
})

module.exports = router

// a cipher is a two-way operation, whereas hashing is a one-way operation