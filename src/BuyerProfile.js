import React, { useState } from 'react';
import './BuyerProfile.css';

function BuyerProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Show the popup message when the form is submitted
    setShowPopup(true);
    
    // Reset the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
    });

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="buyer-profile">
      <h2>Buyer Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="submit-button">Save</button>
      </form>

      {showPopup && (
        <div className="popup-message">
          <p>Profile updated successfully!</p>
        </div>
      )}
    </div>
  );
}

export default BuyerProfile;
