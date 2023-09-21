const twilio = require('twilio')
const { twilio: config } = require('../config/config')

class SmsSender {
  constructor() {
    this.client = twilio(config.TWILIO_SID, config.TWILIO_AUTH_TOKEN)
  }

  async send(to = '+5214421977355', body = "Esta es una prueba") {
    const response = await this.client.messages.create({
      body,
      from: config.TWILIO_PHONE,
      to,
    })

    console.log(response)
  }

  async sendWhatsapp(to = 'whatsapp:+5214421977355', body = "Esta es una prueba") {
    const response = await this.client.messages.create({
      body,
      // mediaUrl: [
      //   'https://920459.smushcdn.com/2298792/wp-content/uploads/2018/06/gato-feliz.jpg?lossy=1&strip=1&webp=1',
      // ],
      // from: `whatsapp:+14155238886`,
      from: config.TWILIO_PHONE,
      to,
    })

    console.log(response)
  }
}

module.exports = new SmsSender()