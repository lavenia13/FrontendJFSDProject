import React, { useState, useEffect } from 'react';
import './AdminBuyerUsers.css';

function AdminBuyerUsers() {
  const [buyers, setBuyers] = useState([]);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [updatedBuyer, setUpdatedBuyer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  useEffect(() => {
    // Fetch buyers from the backend
    fetch('http://localhost:2030/api/buyer/all') // Update with your backend endpoint
      .then((response) => response.json())
      .then((data) => setBuyers(data))
      .catch((error) => console.error('Error fetching buyers:', error));
  }, []);

  // Handle Delete Buyer
  const handleDelete = (id) => {
    fetch(`http://localhost:2030/api/buyer/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setBuyers(buyers.filter((buyer) => buyer.id !== id)); // Remove the deleted buyer from the list
      })
      .catch((error) => console.error('Error deleting buyer:', error));
  };

  // Handle Update Buyer (open the update form)
  const handleUpdateClick = (buyer) => {
    setEditingBuyer(buyer);
    setUpdatedBuyer({
      name: buyer.name,
      email: buyer.email,
      phone: buyer.phone,
      address: buyer.address,
      password: buyer.password,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBuyer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated buyer data
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...updatedBuyer, id: editingBuyer.id };

    fetch(`http://localhost:2030/api/buyer/update/${editingBuyer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setBuyers(buyers.map((buyer) =>
          buyer.id === editingBuyer.id ? { ...buyer, ...updatedData } : buyer
        ));
        setEditingBuyer(null); // Close the form
      })
      .catch((error) => console.error('Error updating buyer:', error));
  };

  return (
    <div className="admin-buyer-users">
      <h2>Registered Buyers</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer) => (
            <tr key={buyer.id}>
              <td>{buyer.id}</td>
              <td>{buyer.name}</td>
              <td>{buyer.email}</td>
              <td>{buyer.phone}</td>
              <td>{buyer.address}</td>
              <td>{buyer.password}</td>
              <td>
                <button onClick={() => handleUpdateClick(buyer)}>Update</button>
                <button onClick={() => handleDelete(buyer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingBuyer && (
        <div className="update-form">
          <h3>Edit Buyer Details</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={updatedBuyer.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={updatedBuyer.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={updatedBuyer.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={updatedBuyer.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="text"
                name="password"
                value={updatedBuyer.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">Update Buyer</button>
              <button type="button" onClick={() => setEditingBuyer(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminBuyerUsers;
