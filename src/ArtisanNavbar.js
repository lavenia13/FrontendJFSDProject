import React from 'react';
import { Link } from 'react-router-dom';
import './ArtisanNavbar.css';

function ArtisanNavbar() {
  return (
    <div className="artisan-navbar">
      <ul>
        <li>
          <Link to="/artisan-home" className="active">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/artisan-profile">Profile</Link> {/* Added Profile link */}
        </li>
        <li>
          <Link to="/">Logout</Link> {/* Added Profile link */}
        </li>
      </ul>
    </div>
  );
}

export default ArtisanNavbar;
