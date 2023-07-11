const { Router } = require('express')
const path = require('path')

const router = Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.get('/carrito', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/carrito.html'))
})

module.exports = router