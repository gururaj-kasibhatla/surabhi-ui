// src/components/Auth/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:8080/users', {
        username,
        password,
        role,
      });
      setSuccessMessage('User registered successfully');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Registration failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Role:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="roleUser"
                name="role"
                className="form-check-input"
                value="user"
                checked={role === 'user'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="roleUser" className="form-check-label">
                User
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="roleAdmin"
                name="role"
                className="form-check-input"
                value="admin"
                checked={role === 'admin'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="roleAdmin" className="form-check-label">
                Admin
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
