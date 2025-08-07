import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const bookApi = process.env.REACT_APP_BOOK_API;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${bookApi}/books`);
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to load books');
      }
    };

    fetchBooks();
  }, [bookApi]);

  return (
    <div>
      <h2>Available Books</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author} — ₹{book.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;


