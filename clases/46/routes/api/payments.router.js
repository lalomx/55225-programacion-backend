const { Router } = require('express')
const stripeService = require('../../services/stripe.service')

const router = Router()

const products = [
  { id: 1, name: "papas", price: 1500 },
  { id: 2, name: "queso", price: 1000 },
  { id: 3, name: "hamburguesa", price: 1300 },
  { id: 4, name: "soda", price: 1200 },
  { id: 5, name: "golosinas", price: 1100 }
]

router.post('/payment-intents', async (req, res) => {
  const { id } = req.query
  const product = products.find(p => p.id == id)
  if (!product) {
    return res.status(404).send({
      status: 'success',
      payload: {
        message: "Producto no encontrado"
      }
    })
  }

  const payment = await stripeService.createPaymentIntent({
    amount: product.price,
    currency: "mxn",
    payment_method_types: [ 'card' ],
    metadata: {
      user: 10,
      orderDetails: JSON.stringify({
        product
      }),
      address: JSON.stringify({
        line1: '',
        zip: 12345
      })
    }
  })

  console.log(payment)

  res.send({
    status: 'success',
    payload: payment
  })
})

module.exports = router