const nodemailer = require('nodemailer')
const path = require('path')
const config = require('../config/config')

const TEST_EMAIL = config.mail.GMAIL_ADDRESS

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: config.mail.GMAIL_ADDRESS,
        pass: config.mail.GMAIL_PWD,
      },
    })
  }

  async send(to, template) {
    const mailOptions = {
      from: 'Notificaciones <no-reply@videojuegos.com>',
      subject: 'Tu pedido en la tienda de videojuegos',
      to,
      html: template,
      // attachments: [{ path: path.join(__dirname, '/pedido.png') }],
    }

    const response = await this.transporter.sendMail(mailOptions)
    console.log(response)
  }

  async newUserMail({ firstname, lastname, email }) {
    const template = ''
    const mailOptions = {
      from: 'Notificaciones <no-reply@videojuegos.com>',
      subject: 'Nuevo usuario registrado',
      to: config.mail.GMAIL_ADDRESS,
      html: template,
    }

    const response = await this.transporter.sendMail(mailOptions)
    console.log(response)
  }
}

module.exports = new MailSender()
