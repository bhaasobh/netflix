import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">NETFLIX</Link>
      {/* Optional space for nav or user menu */}
    </header>
  );
};

export default Header;
