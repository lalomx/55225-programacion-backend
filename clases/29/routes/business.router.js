const { Router } = require('express')
const { businessController: controller } = require('../controllers')

const router = Router()

router.get('/', controller.get)
router.post('/', controller.create)
router.get('/:id', controller.getById)
router.post('/:id/product', controller.addProduct)

module.exports = router