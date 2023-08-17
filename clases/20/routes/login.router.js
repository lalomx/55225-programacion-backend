const { Router } = require('express')

const userManager = require('../managers/user.manager')
const isAuth = require('../middlewares/auth.middleware')
const { hashPassword, isValidPassword } = require('../utils/password.utils')

const router = Router()

// controllers
const signup = async (req, res) => {
  const user = req.body
  
  console.log(user)

  const existing = await userManager.getByEmail(user.email)

  if (existing) {
    return res.render('signup', {
      error: 'El email ya existe'
    })
  }

  if (user.password !== user.password2) {
    return res.render('signup', {
      error: 'Las contraseñas no coinciden'
    })
  }

  // crear al usuario
  try {
    const newUser = await userManager.create({
      ...user,
      password: hashPassword(user.password)
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

const login = async (req, res) => {
  const { email, password } = req.body

  try {

    // omitimos el password de user guardandolo en una variable _password
    const _user = await userManager.getByEmail(email)

    if (!_user) {
      return res.render('login', { error: 'El usuario no existe' })
    }


    const { password: _password, ...user } = _user

    if (!password) {
      return res.render('login', { error: 'El password es requerido' })
    }

    if(!isValidPassword(password, _password)) {
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

const logout = (req, res) => {
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
}

const resetpassword = async (req, res) => {
  const { email, password1, password2 } = req.body

  console.log(email)

  const user = await userManager.getByEmail(email)

  console.log(user)

  if (!user) {
    return res.render('resetpassword', { error: 'el usuario no existe' })
  }

  if (password1 !== password2) {
    return res.render('resetpassword', { error: 'las contraseñas no coinciden' })
  }

  try {
    await userManager.save(user._id, {
      ...user,
      password: hashPassword(password1)
    })


    res.redirect('/login')

  } catch (e) {
    console.log(e)
    return res.render('resetpassword', { error: 'Ha ocurrido un error' })
  }
}

// rutas de login
router.get('/signup', (_, res) => res.render('signup'))
router.get('/login', (_, res) => res.render('login'))
router.get('/resetpassword', (_, res) => res.render('resetpassword'))
router.post('/signup', signup)
router.post('/login', login)
router.post('/resetpassword', resetpassword)
router.get('/logout', isAuth, logout)

module.exports = router