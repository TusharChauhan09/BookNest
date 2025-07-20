import mongoose from "mongoose";
import axios from "axios";
import Book from "./model/book.model.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
dotenv.config();

// Make sure your .env file contains: GOOGLE_BOOKS_API_KEY=your_google_books_api_key
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";
const TOTAL_BOOKS = 100;
const BATCH_SIZE = 40; // Google Books API maxResults per request

const KEYWORDS = [
  "science",
  "history",
  "art",
  "technology",
  "fantasy",
  "romance",
  "mystery",
  "biography",
  "adventure",
  "children",
  "philosophy",
  "psychology",
  "travel",
  "health",
  "business",
  "education",
  "sports",
  "music",
  "nature",
  "comics",
];

function getRandomKeyword() {
  return KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
}

async function fetchBooks(startIndex) {
  const randomQuery = getRandomKeyword();
  const res = await axios.get(GOOGLE_BOOKS_API, {
    params: {
      q: randomQuery,
      maxResults: BATCH_SIZE,
      startIndex,
      // key: process.env.GOOGLE_BOOKS_API_KEY, // Removed API key for unauthenticated requests
    },
  });
  return res.data.items || [];
}

function mapGoogleBookToSchema(item) {
  const info = item.volumeInfo;
  return {
    googleId: item.id,
    title: info.title,
    authors: info.authors || [],
    description: info.description,
    thumbnail: info.imageLinks?.thumbnail,
    publisher: info.publisher,
    publishedDate: info.publishedDate,
    pageCount: info.pageCount,
    categories: info.categories || [],
    language: info.language,
    previewLink: info.previewLink,
    infoLink: info.infoLink,
    averageRating: info.averageRating,
    ratingsCount: info.ratingsCount,
    isbn10: info.industryIdentifiers?.find((id) => id.type === "ISBN_10")
      ?.identifier,
    isbn13: info.industryIdentifiers?.find((id) => id.type === "ISBN_13")
      ?.identifier,
  };
}

async function seedBooks() {
  await connectDB();
  let allBooks = [];
  for (let i = 0; i < TOTAL_BOOKS; i += BATCH_SIZE) {
    const books = await fetchBooks(i);
    allBooks = allBooks.concat(books);
    if (books.length < BATCH_SIZE) break; // No more books
  }
  const mappedBooks = allBooks.slice(0, TOTAL_BOOKS).map(mapGoogleBookToSchema);

  for (const book of mappedBooks) {
    // Upsert to avoid duplicates
    await Book.updateOne({ googleId: book.googleId }, book, { upsert: true });
  }
  console.log(`Seeded ${mappedBooks.length} books.`);
  await mongoose.disconnect();
}

seedBooks().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
