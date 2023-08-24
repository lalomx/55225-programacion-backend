const { Router } = require('express')
const { purchaseOrderModel } = require('../../models')

const router = Router()

router.use((req, res, next) => {
    const authHeader = req.headers.authorization

    console.log(authHeader)

    if (!authHeader) {
        return res.status(401).send({
            status: 'failure',
            error: 'Not logged in'
        })
    }

    const token = authHeader.replace('Bearer ', '')

    if (!authToken(token)) {
        return res.status(401).send({
            status: 'failure',
            error: 'Not authorized'
        })
    }

    next()
})

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
