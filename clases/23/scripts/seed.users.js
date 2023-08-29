const faker = require('faker');
const userModel = require('../models/user.model')
const mongoose = require('mongoose')

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

const numberOfUsers = 5000;
const usersRecords = generateUsersRecord(numberOfUsers);

// console.log(usersRecords)

async function main() {
  await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/ecommerce?retryWrites=true&w=majority")
  // const result = await userModel.insertMany(usersRecords)

  const result = await userModel.find({ lastname: "Doe" }).explain("executionStats")

  console.log(result)

  await mongoose.disconnect()
}

main()