const Stripe = require('stripe')
const config = require('../config/config')

class StripeService {

  #client
  constructor() {
    this.#client = new Stripe(config.stripe.KEY)
  }

  createPaymentIntent(data) {
    return this.#client.paymentIntents.create(data)
  }
}

module.exports = new StripeService()