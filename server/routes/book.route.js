import express from "express";
import {
  getAllBooks,
  getBookByTitle,
  addUserBook,
  getUserBooks,
  updateUserBook,
  deleteUserBook,
} from "../controllers/book.controller.js";

const router = express.Router();

// Get all books
router.get("/", getAllBooks);

// Get books by title (search)
router.get("/search", getBookByTitle);

// Add a book to a user's personal library
router.post("/user", addUserBook);

// Get all books in a user's personal library
router.get("/user/:userId", getUserBooks);

// Update a UserBook entry
router.put("/user/:id", updateUserBook);

// Delete a UserBook entry
router.delete("/user/:id", deleteUserBook);

export default router;
