import Book from "../model/book.model.js";
import UserBook from "../model/userBook.model.js";

// 1. Get all books from Book model
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Get books by title (for search bar, case-insensitive, partial match)
export const getBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res
        .status(400)
        .json({ message: "Title query parameter is required" });
    }
    const books = await Book.find({ title: { $regex: title, $options: "i" } });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3. Add a book to a user's personal library (UserBook)
export const addUserBook = async (req, res) => {
  try {
    const { userId, bookId, category } = req.body;
    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "userId and bookId are required" });
    }
    const userBook = new UserBook({ user: userId, book: bookId, category });
    await userBook.save();
    res.status(201).json(userBook);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 4. Get all books in a user's personal library
export const getUserBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId param is required" });
    }
    const userBooks = await UserBook.find({ user: userId }).populate("book");
    res.status(200).json(userBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 5. Update a UserBook entry (e.g., change category)
export const updateUserBook = async (req, res) => {
  try {
    const { id } = req.params; // UserBook document id
    const { category } = req.body;
    const updated = await UserBook.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "UserBook entry not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 6. Delete a UserBook entry (remove book from user's library)
export const deleteUserBook = async (req, res) => {
  try {
    const { id } = req.params; // UserBook document id
    const deleted = await UserBook.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "UserBook entry not found" });
    }
    res.status(200).json({ message: "Book removed from personal library" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


