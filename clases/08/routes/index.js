const { Router } = require('express')
const ProductRouter = require('./api/products.router')
const UsersRouter = require('./api/usuarios.router')
const HomeRouter = require('./home.router')

// /api
const router = Router()

// rutas de products
router.use('/products', ProductRouter)
// rutas de usuarios
router.use('/users', UsersRouter)
// rutas de home - archivos estaticos



module.exports = {
  api: router,
  home: HomeRouter
}