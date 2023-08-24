const { Router } = require('express')
const passport = require('passport')

const isAuth = require('../middlewares/auth.middleware')

const router = Router()


router.get('/signup', (_, res) => res.render('signup'))
router.get('/login', (_, res) => res.render('login'))
router.get('/resetpassword', (_, res) => res.render('resetpassword'))

const loginLocal = async (req, res) => {
    const { email, password } = req.body

    try {

        const user = await userManager.getByEmail(email)

        console.log(user.password, password)

        if (!user) {
        console.log('El usuario no existe')
        return res.render('login', { error: 'El usuario no existe' })
        }

        if (!user.password || !password || !isValidPassword(password, user.password)) {
        console.log('contra invalida')
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
}

const signUpLocal = async (req, res) => {
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
}

const logOutLocal = (req, res) => {
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
}

router.post('/signup', passport.authenticate('local-register', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
}))


router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
}))

router.get('/logout', isAuth, (req, res) => {
    const { firstname, lastname } = req.user

    req.logOut((err) => {
        if (!err) {
            res.render('logout', { name: `${firstname} ${lastname}` }) // despues de aqui el backend no puede hacer mas nada
        }
    })
    
})


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
