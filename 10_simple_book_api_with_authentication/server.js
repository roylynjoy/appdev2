const express = require('express');
const mongoose = require("mongoose");
const app = express();
const { authenticateToken } = require("./src/middlewares/jwt-token.middleware");
const BookRouter = require('./src/routers/book.router');
const AuthRouter = require('./src/routers/auth.router');
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/books', authenticateToken, BookRouter);
app.use('/api/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connection created!");
    })
    .catch((error) => {
        console.log(error.message);
    });