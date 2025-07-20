import React, { useEffect, useState, useRef } from "react";
import BookCard from "./BookCard.jsx";
import Loader from "../Loader.jsx";
import { axiosInstance } from "../../lib/axios.js";
import { useAuth } from "../../store/useAuth";
import toast from "react-hot-toast";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef();
  const { authUser } = useAuth();
  const [userBookIds, setUserBookIds] = useState([]);

  // Fetch user's books and store their bookIds
  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!authUser || !authUser._id) return;
      try {
        const res = await axiosInstance.get(`/books/user/${authUser._id}`);
        setUserBookIds(res.data.map((ub) => ub.book?._id).filter(Boolean));
      } catch (err) {
        setUserBookIds([]);
      }
    };
    fetchUserBooks();
  }, [authUser]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get("/books");
        let allBooks = Array.isArray(res.data)
          ? res.data
          : res.data.books || [];
        // Filter out books already in user's collection
        if (userBookIds.length > 0) {
          allBooks = allBooks.filter((b) => !userBookIds.includes(b._id));
        }
        setBooks(allBooks);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [userBookIds]);

  const handleAddBook = async (book) => {
    if (!authUser || !authUser._id) {
      toast.error("You must be signed in to add books.");
      return;
    }
    try {
      await axiosInstance.post("/books/user", {
        userId: authUser._id,
        bookId: book._id,
        category: "to_read",
      });
      toast.success("Book added to your library!");
      setBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));
      setUserBookIds((prev) => [...prev, book._id]);
    } catch (err) {
      toast.error("Failed to add book");
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      // If search box is empty, fetch all books (already handled by above effect)
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await axiosInstance.get(
          `/books/search?title=${encodeURIComponent(searchTerm)}`
        );
        let foundBooks = Array.isArray(res.data)
          ? res.data
          : res.data.books || [];
        // Filter out books already in user's collection
        if (userBookIds.length > 0) {
          foundBooks = foundBooks.filter((b) => !userBookIds.includes(b._id));
        }
        setBooks(foundBooks);
      } catch (err) {
        toast.error("Failed to search books");
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm, userBookIds]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <>
      <div className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by book name..."
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 w-64 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          type="button"
          className="ml-2 px-4 py-2 rounded border border-gray-400 dark:border-gray-600"
          onClick={() => {
            setSearchTerm("");
            window.location.reload();
          }}
        >
          Clear
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 sm:p-6 justify-items-center">
        {books.map((book) => (
          <BookCard
            key={book._id || book.googleId}
            book={book}
            onAdd={handleAddBook}
          />
        ))}
      </div>
    </>
  );
};

export default Books;
