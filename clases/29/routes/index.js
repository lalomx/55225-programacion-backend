const { Router } = require('express')
const businessRouter = require('./business.router')
const ordersRouter = require('./orders.router')
const usersRouter = require('./users.router')


const router = Router()

// aqui se definen las rutas
router.use('/api/business', businessRouter)
router.use('/api/users', usersRouter)
router.use('/api/orders', ordersRouter)

module.exports = router