import React, { useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './header.css';

const HeaderPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleSignout = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  // Don't show any navigation on the login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className="header-container">
      <div className="logo">Your Logo</div>
      <nav className="nav">
        <Link to="/" className="nav-link">Product</Link>
        <Link to="/pricing" className="nav-link">Pricing</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        {isLoggedIn ? (
          <button className="sign-out-button" onClick={handleSignout}>Sign Out</button>
        ) : (
          <Link to="/login" className="nav-link">Sign In</Link>
        )}
      </nav>
    </header>
  );
};

export default React.memo(HeaderPage);