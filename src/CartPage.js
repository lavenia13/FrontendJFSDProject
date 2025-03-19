import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './CartPage.css';

function CartPage() { // Renamed the component
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const navigate = useNavigate();

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);

    // Calculate total price
    const total = storedCartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, []);

  // Handle item removal
  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item !== itemToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage

    // Recalculate the total price
    const total = updatedCart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  // Handle checkout redirection
  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, address, payment } = event.target.elements;
    const orderDetails = {
      name: name.value,
      email: email.value,
      address: address.value,
      payment: payment.value,
      items: cartItems,
      totalPrice: totalPrice
    };

    // Redirect to order receipt page
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    navigate('/order-receipt'); // Redirect to the order receipt page

    // Clear cart
    localStorage.removeItem('cart');
    setCartItems([]);
    setTotalPrice(0);
    alert('Order placed successfully!');
  };

  return (
    <div className="cart-page"> {/* Updated className */}
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${totalPrice}</h3>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
      {showCheckoutForm && (
        <div className="checkout-form">
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
              <label>Address:</label>
              <textarea name="address" required></textarea>
            </div>
            <div>
              <label>Payment Method:</label>
              <select name="payment" required>
                <option value="phonepe">PhonePe</option>
                <option value="cod">Cash on Delivery</option>
                <option value="creditcard">Credit Card</option>
              </select>
            </div>
            <button type="submit">Submit Order</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CartPage; // Updated export statement
