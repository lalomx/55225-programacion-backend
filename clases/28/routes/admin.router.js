const { Router } = require('express')
const productManager = require('../managers/product.manager')

const router = Router()

// renderiza vistas
// no es rest

router.use((req, res, next) => {
  // if(req.user?.role !== 'Admin') {
  //   res.redirect('/')
  //   return
  // }

  next()
})

router.get('/', async (req,res) => {
  res.render('admin/orders', {
    // user: req.user ?  {
    //   ...req.user,
    //   isAdmin: req.user?.role == 'Admin',
    // } : null,
  })
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