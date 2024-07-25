// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Components/User/Menu';
import Cart from './Components/User/Cart';
import Checkout from './Components/User/Checkout';
import ManageMenu from './Components/Admin/ManageMenu';
import ViewOrders from './Components/Admin/ViewOrders';
import Login from './Components/Auth/Login';
import Signup from './Components/User/Signup';
import NavigationBar from './Components/Navigation/NavigationBar';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleCheckout = () => {
    alert('Order placed!');
    setCartItems([]);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Router>
      <div className="container mt-4">
        <NavigationBar user={user} onLogout={handleLogout} />
        <div className="d-flex justify-content-between align-items-center mb-4">
          {user && <span>Welcome, {user.username}</span>}
        </div>
        <Routes>
          <Route path="/" element={user ? <Menu onAddToCart={handleAddToCart} /> : <Login onLogin={setUser} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/cart" element={user ? <Cart cartItems={cartItems} onCheckout={handleCheckout} /> : <Login onLogin={setUser} />} />
          <Route path="/checkout" element={user ? <Checkout total={total} /> : <Login onLogin={setUser} />} />
          <Route path="/admin/manage-menu" element={user?.role === 'ADMIN' ? <ManageMenu /> : <Login onLogin={setUser} />} />
          <Route path="/admin/view-orders" element={user?.role === 'ADMIN' ? <ViewOrders /> : <Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;