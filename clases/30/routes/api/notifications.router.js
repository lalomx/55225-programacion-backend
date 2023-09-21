const { Router } = require('express')
const mailSenderService = require('../../services/mail.sender.service')
const smsSenderService = require('../../services/sms.sender.service')

const router = Router()

router.get('/sms', (req, res) => {

  smsSenderService.send()

  res.send("OK")
})

router.get('/mail', (req, res) => {

  mailSenderService.send("lalo0892@gmail.com", `
    <p>Este es un mensaje</p>
  `)
  res.send("OK")
})

module.exports = router