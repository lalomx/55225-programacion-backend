const { Router } = require('express')
const apiAuth = require('../middlewares/api.middleware')

const ProductRoutes = require('./api/products.router.js')
const UserRoutes = require('./api/users.router.js')
const HomeRoutes = require('./home.router.js')
const LoginRoutes = require('./login.router.js')
const AdminRoutes = require('./admin.router.js')
const AuthRoutes = require('./api/auth.router.js')
const OrderRoutes = require('./api/orders.router.js')
const WordsRouter = require('./api/words.router')
const NotificationRoutes = require('./api/notifications.router')
const TestRoutes = require('./api/test.router')
const { custom: CartRoutes } = require('./api/cart.router')

const api = Router();

api.use('/products', ProductRoutes);
api.use('/users', apiAuth, UserRoutes);
api.use('/orders', OrderRoutes);
api.use('/dictionary', WordsRouter)
api.use('/cart', CartRoutes.getRouter())
api.use('/notification', NotificationRoutes)
api.use('/test', TestRoutes)

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