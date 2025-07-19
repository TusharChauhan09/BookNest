import React, { useEffect, useState } from "react";
import BookCard from "./bookCard.jsx";
import Loader from "../Loader.jsx";
import { axiosInstance } from "../../lib/axios.js";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get("/books");
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (Array.isArray(res.data.books)) {
          setBooks(res.data.books);
        } else {
          setBooks([]);
        }
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <Loader/> ;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 justify-items-center">
      {books.map((book) => (
        <BookCard key={book._id || book.googleId} book={book} />
      ))}
    </div>
  );
};

export default Books;
