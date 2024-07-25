// src/Components/Footer.js

import React from 'react';
import './Footer.css'; // Import the CSS file for the footer styling

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Surabhi Chain of Restaurants. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
