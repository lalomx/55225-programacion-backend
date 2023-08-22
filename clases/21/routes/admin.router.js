const { Router } = require('express')
const productManager = require('../managers/product.manager')

const router = Router()

// renderiza vistas
// no es rest

router.use((req, res, next) => {
  if(req.user?.role !== 'admin') {
    res.redirect('/')
    return
  }

  next()
})

router.get('/product/add', async (req, res) => {
  res.render('admin/addProduct', 
  { 
    title: 'Agregar nuevo producto',
    style: 'admin'
  })
})

router.post('/product/add', async (req, res) => {
  await productManager.create(req.body)
  
  res.redirect('/admin/product/add')
})

module.exports = router