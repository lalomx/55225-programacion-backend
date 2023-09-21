const { Router } = require('express')
const { ordersController: controller } = require('../controllers')


const router = Router()

// aqui se definen las rutas
router.get('/', controller.get)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.resolve)

module.exports = router