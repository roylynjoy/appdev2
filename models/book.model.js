const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required: [true, "Please enter book title"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Please enter book title"],
            trim: true,
        },
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;