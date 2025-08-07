import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const orderApi = process.env.REACT_APP_ORDER_API;

  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token from login
      const response = await axios.post(
        `${orderApi}/orders`,
        { userId, bookId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Order placed successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Order failed');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min="1"
      />
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default OrderForm;



