import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Components/User/Menu';
import Cart from './Components/User/Cart';
import Checkout from './Components/User/Checkout';
import ManageMenu from './Components/Admin/ManageMenu';
import ViewOrders from './Components/Admin/ViewOrders';
import Login from './Components/Auth/Login';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleCheckout = () => {
    // Here you could post the order to the server
    alert('Order placed!');
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Router>
      <div className="container mt-4">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"> <img
              src="logo-color.png"
              alt="Logo"
              className="mr-2"
              style={{ width: '100px', height: '100px' }} 
            /></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* <h1 className="h3">
            <img
              src="..\public\logo-color.png"
              alt="Logo"
              className="mr-2"
            // style={{ borderRadius: '50%' }}
            />
            Surabhi Restaurant
          </h1> */}
          {user && <span>Welcome, {user.username}</span>}
        </div>
        <Routes>
          <Route path="/" element={user ? <Menu onAddToCart={handleAddToCart} /> : <Login onLogin={setUser} />} />
          <Route path="/cart" element={user ? <Cart cartItems={cartItems} onCheckout={handleCheckout} /> : <Login onLogin={setUser} />} />
          <Route path="/checkout" element={user ? <Checkout total={total} /> : <Login onLogin={setUser} />} />
          <Route path="/admin/manage-menu" element={user?.role === 'admin' ? <ManageMenu /> : <Login onLogin={setUser} />} />
          <Route path="/admin/view-orders" element={user?.role === 'admin' ? <ViewOrders /> : <Login onLogin={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
