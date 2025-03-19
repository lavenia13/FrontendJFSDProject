import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <ul>
        <li><Link to="/admin-home">Dashboard</Link></li>
        <li><Link to="/admin-buyerusers">AdminBuyerUsers</Link></li>
        <li><Link to="/admin-Artisanusers">AdminArtisanUsers</Link></li>
        <li><Link to="/admin-orders">AdminOrders</Link></li>
        <li><Link to="/admin-products">AdminProducts</Link></li>
        <li><Link to="/admin-inventory">AdminInventory</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
