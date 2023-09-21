const { Router } = require('express')
const { businessController: controller } = require('../controllers')

const router = Router()

// aqui se definen las rutas
router.get('/', controller.get)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.post('/:id/product', controller.addProduct)

module.exports = router