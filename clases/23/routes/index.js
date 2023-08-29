const { Router } = require('express')
const apiAuth = require('../middlewares/api.middleware')

const ProductRoutes = require('./api/products.router.js')
const UserRoutes = require('./api/users.router.js')
const HomeRoutes = require('./home.router.js')
const LoginRoutes = require('./login.router.js')
const AdminRoutes = require('./admin.router.js')
const AuthRoutes = require('./api/auth.router.js')
const OrderRoutes = require('./api/orders.router.js')
const WordRoutes = require('./api/words.router')

const api = Router();

api.use('/products', apiAuth,  ProductRoutes);
api.use('/users', apiAuth, UserRoutes);
api.use('/orders', OrderRoutes);
api.use('/dictionary', WordRoutes)

// registramos el router the auth

// /api/auth
api.use('/auth', AuthRoutes)

const home = Router()

home.use('/', HomeRoutes)
home.use('/', LoginRoutes)

home.use('/admin', AdminRoutes)

module.exports = {
  api,
  home
};