const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const User = require("../models/user.model");
const Book = require("../models/book.model");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Book.deleteMany({});
    console.log("Cleared collections");

    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      users.push(
        new User({
          username: faker.internet.username(),
          email: faker.internet.email(),
          password: hashedPassword,
        })
      );
    }
    const savedUsers = await User.insertMany(users);
    console.log("5 Fake users added");

    const books = [];
    for (let i = 0; i < 10; i++) {
      books.push(
        new Book({
          title: faker.lorem.words(3),
          author: faker.person.fullName(),
          year: faker.date.past({ years: 20 }).getFullYear(),
          userId: faker.helpers.arrayElement(savedUsers)._id,
        })
      );
    }
    await Book.insertMany(books);
    console.log("10 Fake books added");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
