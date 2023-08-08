const { faker } = require('@faker-js/faker')

function generateGames(count) {
    const arr = []

    for (let i = 0; i < count; i++) {
        arr.push({
            title: faker.random.words(4),
            description: faker.random.words({ count: { min: 5, max: 10 } }),
            platform: faker.random.arrayElement(['PlayStation', 'Xbox', 'Nintendo Switch', 'PC']),
            keywords: [],
            releaseDate: faker.date.past(),
            price: faker.random.number({ min: 20, max: 60, precision: 2 }),
            stock: faker.random.number({ min: 45, max: 1500 }),
            developer: faker.company.companyName(),
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
      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      const email = faker.internet.email(firstname, lastname);
      const gender = faker.random.arrayElement(['Male', 'Female']);
      const role = faker.random.arrayElement(['Admin', 'Customer']);
  
      users.push({ firstname, lastname, email, gender, role });
    }
  
    return users;
}

module.exports = {
    generateAddresses,
    generateGames,
    generateUsersRecord
}