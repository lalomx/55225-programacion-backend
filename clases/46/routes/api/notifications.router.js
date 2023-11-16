const { Router } = require('express')
const mailSenderService = require('../../services/mail.sender.service')
const smsSenderService = require('../../services/sms.sender.service')

const router = Router()

router.get('/mail', (req, res) => {
  // ejecutar send de mail.sender
  const template = `

    <p>Tu pedido en la tienda<p>
    <br/>
    <ol>
      <li>Producto 1</li>
      <li>Producto 2</li>
    </ol>

    <p>Tiene status <span style="color: red">Incompleto</span></p>

    <img src="cid:perrito" />
  `
  mailSenderService.send('lalo0892@gmail.com', template)

  res.send('OK')
})

router.get('/sms', (req, res) => {
  smsSenderService.send('+524421977355', 'no miento')
  res.send('OK')
})

module.exports = router