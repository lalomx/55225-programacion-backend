const { Router } = require('express')
const { faker } = require('@faker-js/faker')

const router = Router()

router.get('/user', (req, res) => {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const email = faker.internet.email({ firstName: firstname, lastName: lastname });
  const password = faker.internet.password()

  res.send({
    firstname,
    lastname,
    email,
    password,
    // password2: password
  })

})




module.exports = router