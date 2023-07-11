const { Router } = require('express')

const router = Router()

router.get('/product/add', async (req, res) => {
  res.render('admin/addProduct')
})

module.exports = router