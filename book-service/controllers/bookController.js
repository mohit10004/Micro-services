import db from '../models/db.js';

export const getAllBooks = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books', detail: err.message });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book', detail: err.message });
  }
};

export const addBook = async (req, res) => {
  const { title, author, price, stock } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)',
      [title, author, price, stock]
    );
    res.status(201).json({ message: 'Book added', bookId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book', detail: err.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, price, stock } = req.body;
  try {
    await db.execute(
      'UPDATE books SET title = ?, author = ?, price = ?, stock = ? WHERE id = ?',
      [title, author, price, stock, id]
    );
    res.json({ message: 'Book updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book', detail: err.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM books WHERE id = ?', [id]);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book', detail: err.message });
  }
};
