import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [searchUserId, setSearchUserId] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
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
  };

  const handleSearchChange = (event) => {
    setSearchUserId(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.userId.toString().includes(searchUserId)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">View Orders</h2>
      <div className="form-group">
        <label htmlFor="searchUserId">Search by User ID:</label>
        <input
          type="text"
          className="form-control"
          id="searchUserId"
          value={searchUserId}
          onChange={handleSearchChange}
        />
      </div>
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Menu Items</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.userId}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>
                <ul className="list-unstyled">
                  {order.menuItems.map((item, index) => (
                    <li key={index}>
                      {item.itemName} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOrders;
