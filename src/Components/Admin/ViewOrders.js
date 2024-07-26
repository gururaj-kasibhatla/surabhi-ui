import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('http://localhost:8080/admin/orders');
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>View Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.orderId}>
            <div>User ID: {order.user.userId}</div>
            <div>Username: {order.user.username}</div>
            <div>Date: {new Date(order.orderDate).toLocaleDateString()}</div>
            <div>Total Amount: ${order.totalAmount.toFixed(2)}</div>
            <div>
              <strong>Order Details:</strong>
              <ul>
                {order.orderDetails.map(detail => (
                  <li key={detail.id.itemId}>
                    Item ID: {detail.id.itemId}, Quantity: {detail.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewOrders;
