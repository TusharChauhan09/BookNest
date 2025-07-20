import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    googleId: { type: String, required: true, unique: true }, // Google Books ID
    title: { type: String, required: true },
    authors: [String],
    description: String,
    thumbnail: String,
    publisher: String,
    publishedDate: String,
    pageCount: Number,
    categories: [String],
    language: String,
    previewLink: String,
    infoLink: String,
    averageRating: Number,
    ratingsCount: Number,
    isbn10: String,
    isbn13: String,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
