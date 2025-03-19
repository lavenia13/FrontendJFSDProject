import React, { useState } from 'react';
import './Checkout.css';

function Checkout() {
  const [orderDetails, setOrderDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, contact, address } = event.target.elements;
    setOrderDetails({
      name: name.value,
      email: email.value,
      contact: contact.value,
      address: address.value,
      paymentMethod,
    });
    // Handle the order submission (store in the database, send a receipt, etc.)
    alert('Order placed successfully. A receipt will be emailed to you!');
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Contact:</label>
          <input type="tel" name="contact" required />
        </div>
        <div>
          <label>Address:</label>
          <textarea name="address" required></textarea>
        </div>
        <div>
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="">Select</option>
            <option value="phonepe">PhonePe</option>
            <option value="cod">Cash on Delivery</option>
            <option value="creditcard">Credit Card</option>
          </select>
        </div>
        <button type="submit">Submit Order</button>
      </form>

      {orderDetails.name && (
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p><strong>Name:</strong> {orderDetails.name}</p>
          <p><strong>Email:</strong> {orderDetails.email}</p>
          <p><strong>Contact:</strong> {orderDetails.contact}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
          <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
