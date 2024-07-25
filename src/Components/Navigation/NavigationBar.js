// src/Components/NavigationBar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ user, onLogout }) => {
  const navigate = useNavigate(); // Define navigate here

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="logo-color.png"
            alt="Logo"
            className="mr-2"
            style={{ width: '100px', height: '100px' }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => navigate('/')}>
                    Home
                  </button>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => navigate('/login')}>
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => navigate('/signup')}>
                    Register
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={onLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
