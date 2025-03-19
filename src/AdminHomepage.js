import React from 'react';
import './AdminHomePage.css';

function AdminHomePage() {
  return (
    <div className="admin-home">
      <div className="welcome-container">
        <h1>Welcome, Admin</h1>
        <p>Manage your system with ease and efficiency.</p>
      </div>
      <div className="admin-stats">
        <div className="stat-item">Total Products: 120</div>
        <div className="stat-item">Users Registered: 45</div>
        <div className="stat-item">Orders Processed: 230</div>
      </div>
    </div>
  );
}

export default AdminHomePage;
