import mongoose from 'mongoose';
import { usersService } from "../services/index.js"


async function seed() {
  const connection = await mongoose.connect("mongodb+srv://app2:3FF28JfLw8z5Sh1m@cluster0.go6w7.mongodb.net/mascotas?retryWrites=true&w=majority")

  const user = {
    first_name: "Juan",
    last_name: "Garcia",
    email: "alguien@example.com",
    password: "password",
    role: "Admin",
  }

usersService.create(user)
}

seed()