// src/Components/User/Cart.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems }) {
  const navigate = useNavigate();

  const calculateTotal = (item) => {
    return item.price * item.quantity;
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + calculateTotal(item), 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${calculateTotal(item).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right"><strong>Grand Total:</strong></td>
                <td><strong>${grandTotal.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
