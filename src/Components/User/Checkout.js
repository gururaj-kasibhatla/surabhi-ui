// src/components/User/Checkout.js

import React from 'react';

function Checkout({ total }) {
  return (
    <div>
      <h2>Checkout</h2>
      <h3>Your total bill is: ${total}</h3>
    </div>
  );
}

export default Checkout;
