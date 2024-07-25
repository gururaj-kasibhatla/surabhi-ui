// src/Components/User/Checkout.js

import React, { useState } from 'react';

function Checkout({ total }) {
  const [paymentMessage, setPaymentMessage] = useState('');

  const handlePayment = () => {
    setPaymentMessage('Payment successful! Order submitted.');
    // Additional payment logic can be added here
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Checkout</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">Your final bill is: <strong>${total.toFixed(2)}</strong></p>
        <button className="btn btn-success" onClick={handlePayment}>
          Pay Bill
        </button>
      </div>
      {paymentMessage && (
        <div className="alert alert-success" role="alert">
          {paymentMessage}
        </div>
      )}
    </div>
  );
}

export default Checkout;
