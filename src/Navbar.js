import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">HEIRAVA</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li 
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span className="dropdown-title">Roles ▾</span>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/artisan">Artisan</Link></li>
              <li><Link to="/buyer">Buyer</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contactus">Contact Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
