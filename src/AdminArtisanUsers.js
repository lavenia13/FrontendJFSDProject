import React, { useState, useEffect } from 'react';
import './AdminArtisanUsers.css';

function AdminArtisanUsers() {
  const [artisans, setArtisans] = useState([]);
  const [editingArtisan, setEditingArtisan] = useState(null);
  const [updatedArtisan, setUpdatedArtisan] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    // Fetch artisans from the backend
    fetch('http://localhost:2030/api/artisan/all')
      .then((response) => response.json())
      .then((data) => setArtisans(data))
      .catch((error) => console.error('Error fetching artisans:', error));
  }, []);

  // Handle Delete Artisan
  const handleDelete = (id) => {
    fetch(`http://localhost:2030/api/artisan/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setArtisans(artisans.filter((artisan) => artisan.id !== id)); // Remove the deleted artisan from the list
      })
      .catch((error) => console.error('Error deleting artisan:', error));
  };

  // Handle Update Artisan (open the update form)
  const handleUpdateClick = (artisan) => {
    setEditingArtisan(artisan);
    setUpdatedArtisan({
      name: artisan.name,
      email: artisan.email,
      phone: artisan.phone,
      password: artisan.password,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedArtisan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated artisan data
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...updatedArtisan, id: editingArtisan.id };

    fetch(`http://localhost:2030/api/artisan/update/${editingArtisan.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setArtisans(artisans.map((artisan) =>
          artisan.id === editingArtisan.id ? { ...artisan, ...updatedData } : artisan
        ));
        setEditingArtisan(null); // Close the form
      })
      .catch((error) => console.error('Error updating artisan:', error));
  };

  return (
    <div className="admin-artisan-users">
      <h2>Registered Artisans</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artisans.map((artisan) => (
            <tr key={artisan.id}>
              <td>{artisan.id}</td>
              <td>{artisan.name}</td>
              <td>{artisan.email}</td>
              <td>{artisan.phone}</td>
              <td>{artisan.password}</td>
              <td>
                <button onClick={() => handleUpdateClick(artisan)}>Update</button>
                <button onClick={() => handleDelete(artisan.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingArtisan && (
        <div className="update-form">
          <h3>Edit Artisan Details</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={updatedArtisan.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedArtisan.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={updatedArtisan.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={updatedArtisan.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">Update Artisan</button>
              <button type="button" onClick={() => setEditingArtisan(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminArtisanUsers;
