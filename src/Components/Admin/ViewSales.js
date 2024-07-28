import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewSales() {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/orders');
      if (Array.isArray(response.data)) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlySales = response.data.reduce((total, order) => {
          const orderDate = new Date(order.orderDate);
          if (
            orderDate.getMonth() === currentMonth &&
            orderDate.getFullYear() === currentYear
          ) {
            return total + order.totalAmount;
          }
          return total;
        }, 0);
        setTotalSales(monthlySales);
      } else {
        console.error('Response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sales Summary</h2>
      <div className="alert alert-success" role="alert">
        Total Sales for This Month: ${totalSales.toFixed(2)}
      </div>
    </div>
  );
}

export default ViewSales;
