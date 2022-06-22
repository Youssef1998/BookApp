import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const BookShelf = ({ title, books, changeBookShelf, error }) => {
  return (
    <div className="bookShelf">
      <h2 className="bookShelf-title">{title}</h2>
      <div className="bookShelf-books">
        {books.length ? (
          <ol className="books-grid">
            {books.map(book => (
              <Book
                changeBookShelf={changeBookShelf}
                key={book.id}
                book={book}
              />
            ))}
          </ol>
        ) : (
          <p className="error">{error}</p>
        )}
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
};

export default BookShelf;
