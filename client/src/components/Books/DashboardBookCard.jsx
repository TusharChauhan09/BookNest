import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios";

const CATEGORY_OPTIONS = [
  { value: "to_read", label: "To Read" },
  { value: "reading", label: "Reading" },
  { value: "read", label: "Read" },
];

const DashboardBookCard = ({ userBook, onUpdate, onDelete }) => {
  const { book, category, _id } = userBook;
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category);

  if (!book) return null;

  const handleCategoryChange = async (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setUpdating(true);
    try {
      await axiosInstance.put(`/books/user/${_id}`, { category: newCategory });
      if (onUpdate) onUpdate(true);
    } catch (err) {
      // Optionally show error toast
      if (onUpdate) onUpdate(false);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/books/user/${_id}`);
      if (onDelete) onDelete(true);
    } catch (err) {
      // Optionally show error toast
      if (onDelete) onDelete(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative w-80 min-h-[500px] rounded-3xl overflow-hidden bookcard-bg bookcard-shadow border border-gray-300 dark:border-gray-700 flex flex-col transition-transform duration-200 hover:-translate-y-1 group bookcard-text">
      {/* Image section */}
      <div className="relative z-10 bookcard-bg h-48 flex items-center justify-center shadow-sm border-b border-gray-200 dark:border-gray-800">
        <img
          src={
            book.thumbnail || "https://via.placeholder.com/120x180?text=Book"
          }
          alt={book.title}
          className="h-40 w-auto object-contain drop-shadow-md rounded-xl"
        />
      </div>
      {/* Details section */}
      <div className="flex flex-col gap-2 p-5 flex-1 z-10 bookcard-bg bookcard-text">
        <h2 className="font-bold text-xl mb-1 line-clamp-1 text-accent group-hover:underline">
          {book.title}
        </h2>
        {book.authors && book.authors.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 line-clamp-1 italic">
            by {book.authors.join(", ")}
          </p>
        )}
        {book.description && (
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
            {book.description}
          </p>
        )}
        {/* Category dropdown */}
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor={`category-${_id}`} className="text-xs font-semibold">
            Status:
          </label>
          <select
            id={`category-${_id}`}
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={updating}
            className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* Delete button */}
        <button
          className="bg-red-500 text-white rounded-xl py-2 px-4 font-bold hover:scale-105 hover:bg-red-600 transition-transform shadow w-[2/3] tracking-wide text-base mt-auto mb-4 mx-4"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default DashboardBookCard;
