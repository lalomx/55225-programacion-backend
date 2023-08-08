const { faker } = require('@faker-js/faker')

function generateGames(count) {
    const arr = []

    for (let i = 0; i < count; i++) {
        arr.push({
            title: faker.word.words(4),
            description: faker.word.words({ count: { min: 5, max: 10 } }),
            platform: faker.helpers.arrayElement(['PlayStation', 'Xbox', 'Nintendo Switch', 'PC']),
            keywords: [],
            releaseDate: faker.date.past(),
            price: faker.number.int({ min: 20, max: 60, precision: 2 }),
            stock: faker.number.int({ min: 45, max: 1500 }),
            developer: faker.company.name(),
          })
    }

    return arr
}

function generateAddresses(count) {
    const arr = []
    for (let i = 0; i < count; i++) {
        arr.push({
            line1: faker.location.streetAddress() ,
            line2: faker.location.secondaryAddress(),
            city: faker.location.city(),
            country: faker.location.country(),
            zipCode: faker.location.zipCode('#####')
          })
    }

    return arr
}

function generateUsersRecord(count) {
    const users = [];
  
    for (let i = 0; i < count; i++) {
      const firstname = faker.person.firstName();
      const lastname = faker.person.lastName();
      const email = faker.internet.email({ firstName: firstname, lastName: lastname });
      const gender = faker.helpers.arrayElement(['Male', 'Female']);
      const role = faker.helpers.arrayElement(['Admin', 'Customer']);
  
      users.push({ firstname, lastname, email, gender, role });
    }
  
    return users;
}

module.exports = {
    generateAddresses,
    generateGames,
    generateUsersRecord
}