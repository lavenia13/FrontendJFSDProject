// BuyerNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './BuyerNavbar.css';

function BuyerNavbar() {
  return (
    <nav className="buyer-navbar">
     
      <ul className="navbar-links">
        {/* Home */}
        <li>
          <Link to="/buyer-home">Home</Link>
        </li>

        {/* Products Page */}
        <li>
          <Link to="/buyer-products">Products</Link>
        </li>

        {/* Profile */}
        <li>
          <Link to="/buyer-profile">Profile</Link>
        </li>

        {/* Wishlist */}
        <li>
          <Link to="/buyer-wishlist">Wishlist</Link>
        </li>

        {/* Cart */}
        <li>
          <Link to="/buyer-cart">Cart</Link>
        </li>
        <li>
          <Link to="/">Logout</Link> {/* Added Profile link */}
        </li>
      </ul>
    </nav>
  );
}

export default BuyerNavbar;
