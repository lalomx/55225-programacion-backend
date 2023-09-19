const { Router } = require('express')
const { ordersController: controller } = require('../controllers')


const router = Router()

router.get('/', controller.get)
router.post('/', controller.create)
router.get('/:id', controller.getById)
router.put('/:id', controller.resolve)

module.exports = router