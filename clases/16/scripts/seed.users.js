const faker = require('faker');
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const { generateUsersRecord } = require('./common')

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