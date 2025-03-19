// src/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2030/api/admin/login', {
        username,
        password,
      });
      if (response.data === 'Login successful') {
        alert('Login successful!');
        // Redirect to the admin homepage after successful login
        window.location.href = '/admin-home';
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      setErrorMessage('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AdminLogin;
