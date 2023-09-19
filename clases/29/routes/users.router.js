const { Router } = require('express')
const { usersController: controller } = require('../controllers')


const router = Router()

router.get('/', controller.get)
router.post('/', controller.create)
router.get('/:id', controller.getById)

module.exports = router