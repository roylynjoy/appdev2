const Book = require("../models/book.model");
const sendBookCreatedEmail = require("../middlewares/email.middleware");

// Controller: Welcome message
const welcomeMessage = (req, res) => {
  res.send("Simple Book API using Node.js and Express!");
};

// Controller: Fetch all books
const fetchAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller: Fetch one book by ID
const fetchBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found!" });
    res.json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller: Add a new book (with email notification)
const addNewBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    // ✅ Send email after book is created
    await sendBookCreatedEmail(book);

    res.status(201).json({ success: true, message: "New Book Added!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller: Update a book by ID
const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!book)
      return res.status(404).json({ success: false, message: "Book not found!" });

    res.json({ success: true, message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller: Delete a book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found!" });

    res.json({ success: true, message: "Book deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export all controllers
module.exports = {
  welcomeMessage,
  fetchAllBooks,
  fetchBook,
  addNewBook,
  updateBook,
  deleteBook,
};
