import React, { useEffect, useState } from 'react';

function OrderReceipt() {
  const [orderDetails, setOrderDetails] = useState(null);

  // Retrieve order details from localStorage
  useEffect(() => {
    const storedOrderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    if (storedOrderDetails) {
      setOrderDetails(storedOrderDetails);
      localStorage.removeItem('orderDetails'); // Clear order details after displaying the receipt
    }
  }, []);

  if (!orderDetails) {
    return <p>Loading your order receipt...</p>;
  }

  return (
    <div className="order-receipt">
      <h2>Order Receipt</h2>
      <p><strong>Name:</strong> {orderDetails.name}</p>
      <p><strong>Email:</strong> {orderDetails.email}</p>
      <p><strong>Address:</strong> {orderDetails.address}</p>
      <p><strong>Payment Method:</strong> {orderDetails.payment}</p>
      <h3>Items Purchased:</h3>
      <ul>
        {orderDetails.items.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <h3>Total Price: ${orderDetails.totalPrice}</h3>
      <p>Thank you for your order! A receipt will be sent to your email shortly.</p>
    </div>
  );
}

export default OrderReceipt;
