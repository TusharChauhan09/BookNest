import React from "react";

const BookCard = ({ book, onAdd }) => {
  if (!book) return null;
  return (
    <div className="relative w-80 min-h-[500px] rounded-3xl overflow-hidden bookcard-bg bookcard-shadow border border-gray-300 dark:border-gray-700 flex flex-col transition-transform duration-200 hover:-translate-y-1 group bookcard-text">
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-accent group-hover:shadow-accent/20 group-hover:shadow-lg transition-all duration-200" />
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
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
          {book.publisher && <span>Publisher: {book.publisher}</span>}
          {book.publishedDate && <span>Year: {book.publishedDate}</span>}
          {book.pageCount && <span>Pages: {book.pageCount}</span>}
        </div>
        {book.categories && book.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {book.categories.map((cat) => (
              <span
                key={cat}
                className="bg-peach-100 text-xs dark:text-black px-2 py-0.5 rounded-full font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1 items-center">
          {book.language && <span>Lang: {book.language.toUpperCase()}</span>}
          {book.averageRating && (
            <span className="inline-flex items-center gap-1 bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
              {book.averageRating} <span className="text-yellow-400">★</span>
            </span>
          )}
          {book.ratingsCount && <span>({book.ratingsCount} reviews)</span>}
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
          {book.isbn10 && <span>ISBN-10: {book.isbn10}</span>}
          {book.isbn13 && <span>ISBN-13: {book.isbn13}</span>}
        </div>
        <div className="flex gap-2 mt-2">
          {book.previewLink && (
            <a
              href={book.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline text-xs font-semibold hover:text-accent/80"
            >
              Preview
            </a>
          )}
          {book.infoLink && (
            <a
              href={book.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline text-xs font-semibold hover:text-accent/80"
            >
              More Info
            </a>
          )}
        </div>
      </div>
      <button
        className="bg-accent text-white rounded-xl py-2 px-4 font-bold hover:scale-105 hover:bg-accent/90 transition-transform shadow w-[2/3] tracking-wide text-base mt-auto mb-4 mx-4"
        onClick={() => onAdd && onAdd(book)}
      >
        Add
      </button>
    </div>
  );
};

export default BookCard;
