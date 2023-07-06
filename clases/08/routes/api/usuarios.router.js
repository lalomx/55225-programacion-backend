const { Router } = require('express')
const UserManager = require('../../managers/UserManager')

const router = Router()
const manager = new UserManager('users.json')

// rutas de usuarios
// /api/users/
router.post('/', async (req, res) => {
  const { body } = req

  const created = await manager.create(body)

  res.send(created)
})

router.get('/', (req, res) => {
  res.send('usuarios')
})



module.exports = router