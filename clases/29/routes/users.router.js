const { Router } = require('express')
const { usersController: controller } = require('../controllers')

const router = Router()

// aqui se definen las rutas
router.get('/', controller.get)
router.get('/:id', controller.getById)
router.post('/', controller.create)

module.exports = router