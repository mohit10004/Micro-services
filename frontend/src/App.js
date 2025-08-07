// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import Login from './components/Login';
import Register from './components/Register';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>📚 Online Book Store</h1>
        
        <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
          <Link to="/" style={{ margin: '0 15px' }}>Books</Link>
          <Link to="/login" style={{ margin: '0 15px' }}>Login</Link>
          <Link to="/register" style={{ margin: '0 15px' }}>Register</Link>
          <Link to="/order" style={{ margin: '0 15px' }}>Order</Link>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={<OrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

