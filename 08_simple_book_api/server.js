const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let books = [
    { id: 1, title: 'Book 1', author: 'author1' },
    { id: 2, title: 'Book 2', author: 'author2' },
    { id: 3, title: 'Book 3', author: 'author3' },
    { id: 4, title: 'Book 4', author: 'author4' },
    { id: 5, title: 'Book 5', author: 'author5' },
];


// GET /
app.get("/", (req, res) => {
    res.send("Simple Book API using Node.js and Express");
});

// GET /api/books
app.get("/api/books", (req, res) => {
    res.json(books);
});

// GET /api/books/:id
app.get("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === parseInt(id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// POST 
app.post("/api/books", (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and author are required" });

    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PATCH 
app.patch("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = books.find(book => book.id === parseInt(id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;

    res.json(book);
});

// DELETE 
app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === parseInt(id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    books = books.filter(book => book.id !== parseInt(id));
    res.json({ message: "Book deleted successfully" });
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
