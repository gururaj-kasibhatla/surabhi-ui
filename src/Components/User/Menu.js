// src/Components/User/Menu.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Menu({ onAddToCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await axios.get('http://localhost:3001/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    }
    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    onAddToCart({ ...item, quantity });
    setSuccessMessage(`Item "${item.name}" added successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };

  const handleIncreaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 1) + 1,
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 1) - 1, 1),
    }));
  };

  return (
    <div>
      <h2>Menu</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <button 
        className="btn btn-primary mb-3"
        onClick={() => navigate('/cart')}
      >
        Go to Cart
      </button>
      <ul className="list-group">
        {menuItems.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {item.name} - ${item.price}
            </div>
            <div>
              <button
                className="btn btn-secondary btn-sm mr-2"
                onClick={() => handleDecreaseQuantity(item.id)}
              >
                -
              </button>
              <span className="mr-2">{quantities[item.id] || 1}</span>
              <button
                className="btn btn-secondary btn-sm mr-2"
                onClick={() => handleIncreaseQuantity(item.id)}
              >
                +
              </button>
              <button
                className="btn btn-success"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
