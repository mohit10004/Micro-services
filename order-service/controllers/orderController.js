import db from '../models/db.js';

export const getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.execute('SELECT * FROM orders');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get orders', detail: err.message });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [order] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
    if (order.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get order', detail: err.message });
  }
};

export const createOrder = async (req, res) => {
  const { user_id, book_id, quantity } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO orders (user_id, book_id, quantity) VALUES (?, ?, ?)',
      [user_id, book_id, quantity]
    );
    res.status(201).json({ message: 'Order created', orderId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', detail: err.message });
  }
};
