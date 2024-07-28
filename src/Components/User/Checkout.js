// src/Components/User/Checkout.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
  const location = useLocation();
  const { cartItems = [], total = 0 } = location.state || {};

  const [paymentMessage, setPaymentMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setOrderDetails(
        cartItems.map((item) => ({
          menuItem: {
            itemId: item.itemId,
          },
          quantity: item.quantity,
        }))
      );
    }
  }, [cartItems]);

  const handlePayment = async () => {
    const userId = localStorage.getItem('userId'); // Fetch user ID from local storage

    if (!orderDetails.length || !userId) {
      setPaymentMessage('No items in the cart to process or user is not logged in.');
      return;
    }

    const orderData = {
      user: {
        userId: userId, // Use the fetched user ID
      },
      orderDate: new Date().toISOString(),
      totalAmount: total,
      orderDetails: orderDetails,
    };

    try {
      const response = await axios.post('http://localhost:8080/admin/orders', orderData);
      setPaymentMessage('Payment successful! Order submitted.');
      console.log('Order saved:', response.data);
    } catch (error) {
      console.error('Error saving order:', error);
      setPaymentMessage('Payment failed! Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Checkout</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">
          Your final bill is: <strong>${total.toFixed(2)}</strong>
        </p>
        <button className="btn btn-success" onClick={handlePayment}>
          Pay Bill
        </button>
      </div>
      {paymentMessage && (
        <div
          className={`alert ${paymentMessage.includes('successful') ? 'alert-success' : 'alert-danger'}`}
          role="alert"
        >
          {paymentMessage}
        </div>
      )}
    </div>
  );
}

export default Checkout;
