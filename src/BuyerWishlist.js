import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerWishlist.css';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch wishlist items from localStorage
  useEffect(() => {
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlistItems);
  }, []);

  // Handle removing an item from the wishlist
  const handleRemoveFromWishlist = (itemToRemove) => {
    const updatedWishlist = wishlistItems.filter(item => item !== itemToRemove);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update localStorage
  };

  // Handle proceeding to checkout
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          wishlistItems.map((item, index) => (
            <div key={index} className="wishlist-item">
              <img src={item.image} alt={item.name} className="wishlist-item-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
              <button onClick={() => handleRemoveFromWishlist(item)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
