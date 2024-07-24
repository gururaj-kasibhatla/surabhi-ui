// src/components/Admin/ViewOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await axios.get('http://localhost:8080/orders');
      setOrders(response.data);
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>View Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            User ID: {order.userId}, Total: ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewOrders;
