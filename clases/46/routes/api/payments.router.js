const { Router } = require('express')
const stripeService = require('../../services/stripe.service')

const router = Router()

const products = [
  { id: 1, name: "papas", price: 1000 },
  { id: 2, name: "queso", price: 1500 },
  { id: 3, name: "hamburguesa", price: 1500 },
  { id: 4, name: "soda", price: 1000 },
  { id: 5, name: "golosinas", price: 1800 }
]

router.post('/payment-intents', async (req, res) => {
  // stripe
  const { id } = req.query
  const product = products.find(p => p.id == id)

  if (!product) {
    return res.status(400).send({
      status: 'failure',
      error: 'Producto no valido'
    })
  }

  const payment = await stripeService.createPaymentIntent({
    currency: 'mxn',
    amount: product.price,
    payment_method_types: ['card'],
    metadata: {
      userId: "10",
      address: JSON.stringify({
        line1: '20 NW 67st',
        zip: '33115',
        city: 'Nashville',
        state: 'Illinois'
      }),
      product: JSON.stringify(product)
    }
  })

  console.log(payment)

  res.send({
    status: 'success',
    payload: payment
  })
})
module.exports = router