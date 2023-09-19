const { Router } = require('express')

const busisnessRouter = require('./business.router')
const ordersRouter = require('./orders.router')
const usersRouter = require('./users.router')

const router = Router()

router.use('/api/business', busisnessRouter)
router.use('/api/orders', ordersRouter)
router.use('/api/users', usersRouter)

module.exports = router