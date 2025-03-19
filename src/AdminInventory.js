import React, { useState, useEffect } from 'react';
import './AdminInventory.css';

function AdminInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:2030/api/inventory') // Adjust the API endpoint as needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        return response.json();
      })
      .then((data) => {
        setInventory(data || []); // Ensure data is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-inventory">
      <h2>Inventory Management</h2>
      {loading ? (
        <p>Loading inventory...</p>
      ) : inventory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Stock Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.stockQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No inventory data available.</p>
      )}
    </div>
  );
}

export default AdminInventory;
