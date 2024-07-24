// src/components/Admin/ManageMenu.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageMenu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      const response = await axios.get('http://localhost:8080/admin/menuItems');
      setMenuItems(response.data);
    }
    fetchMenu();
  }, []);

  const deleteMenuItem = async (id) => {
    await axios.delete(`http://localhost:8080/admin/menuItems/${id}`);
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>Manage Menu</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => deleteMenuItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageMenu;
