const { Router } = require('express')
const { purchaseOrderModel } = require('../../models')
const apiAuth = require('../../middlewares/api.middleware')

const router = Router()

router.use(apiAuth)

router.get('/', async (req, res) => {
  const orders = await purchaseOrderModel.find({})
    .populate({ path: 'user', select: ['email']})
    .populate({ path: 'products.product', select: ['price', 'title']})
    .populate({ path: 'postAddress', select: ['zipCode', 'country']})
    .lean()

    console.log(orders)

  res.send(orders)
})

module.exports = router
