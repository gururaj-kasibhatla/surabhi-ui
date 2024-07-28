// src/Components/User/Menu.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Menu({ onAddToCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await axios.get('http://localhost:8080/admin/menuItems');
        const items = response.data;
        setMenuItems(items);

        // Initialize quantities to 0 for each menu item
        const initialQuantities = {};
        items.forEach(item => {
          initialQuantities[item.itemId] = 0;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    }
    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    const quantity = quantities[item.itemId];
    if (quantity > 0) {
      onAddToCart({ ...item, quantity });
      setSuccessMessage(`Item "${item.name}" added successfully!`);
      setAddedItems((prevAddedItems) => ({
        ...prevAddedItems,
        [item.itemId]: true,
      }));
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(prevQuantities[itemId] - 1, 0),
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Menu</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <button 
        className="btn btn-primary mb-3"
        onClick={() => navigate('/cart')}
      >
        Go to Cart
      </button>
      <div className="row">
        {menuItems.map((item) => (
          <div key={item.itemId} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text font-weight-bold">${item.price.toFixed(2)}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="input-group">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleDecreaseQuantity(item.itemId)}
                    >
                      -
                    </button>
                    <span className="input-group-text">{quantities[item.itemId]}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleIncreaseQuantity(item.itemId)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddToCart(item)}
                    disabled={quantities[item.itemId] === 0 || addedItems[item.itemId]}
                  >
                    {addedItems[item.itemId] ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
