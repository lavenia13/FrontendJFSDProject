import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ArtisanLoginSignup.css';

function ArtisanLoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      setPopupMessage('Please enter a valid email address.');
      setShowPopup(true);
      return;
    }

    if (formData.password.length < 8) {
      setPopupMessage('Password must be at least 8 characters long.');
      setShowPopup(true);
      return;
    }

    if (!isLogin) {
      // Additional validations for signup
      if (formData.name.trim().length < 3) {
        setPopupMessage('Name must be at least 3 characters long.');
        setShowPopup(true);
        return;
      }

      if (!formData.phone.match(/^\d{10}$/)) {
        setPopupMessage('Phone number must be exactly 10 digits.');
        setShowPopup(true);
        return;
      }
    }

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:2030/api/artisan/login', {
          email: formData.email,
          password: formData.password,
        });

        setPopupMessage(response.data);

        if (response.data === 'Login successful') {
          // Redirect to artisan homepage/dashboard
          navigate('/artisan-home');
        }
      } else {
        const response = await axios.post('http://localhost:2030/api/artisan/register', formData);
        setPopupMessage(response.data);
      }
    } catch (error) {
      console.error(error);
      setPopupMessage('An error occurred. Please try again.');
    }

    setShowPopup(true);

    // Hide popup message after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="artisan-auth">
      <h1>{isLogin ? 'Artisan Login' : 'Artisan Signup'}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="10-digit Phone Number"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Your Password"
            required
          />
        </div>
        <button className="submit-button" type="submit">
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className="toggle-form">
        {isLogin ? 'New user? Signup here' : 'Already have an account? Login here'}
      </p>
      {showPopup && <div className="popup-message show">{popupMessage}</div>}
    </div>
  );
}

export default ArtisanLoginSignup;
