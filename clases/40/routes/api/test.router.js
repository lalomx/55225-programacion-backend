const { Router } = require('express')
const { faker } = require('@faker-js/faker')

const router = Router()

/// /api/test/simple
router.get('/simple', (req, res) => {
  let sum = 0

  for (let i = 0; i < 5e8; i++) {
    sum += i
  }

  res.send({ sum })
})

// /api/test/user
router.get('/user', (req, res) => {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const email = faker.internet.email({ firstName: firstname, lastName: lastname });
  const password = faker.internet.password()

  res.send({
    firstname,
    lastname,
    email,
    password
  })

})

module.exports = router