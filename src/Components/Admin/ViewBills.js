import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/orders');
      if (Array.isArray(response.data)) {
        const today = new Date().toISOString().slice(0, 10);
        const todayBills = response.data.filter((order) =>
          order.orderDate.startsWith(today)
        );
        setBills(todayBills);
      } else {
        console.error('Response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Today's Bills</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bills.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.orderId}>
                <td>{bill.orderId}</td>
                <td>{bill.userId}</td>
                <td>{new Date(bill.orderDate).toLocaleDateString()}</td>
                <td>${bill.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bills found for today.</p>
      )}
    </div>
  );
}

export default ViewBills;
