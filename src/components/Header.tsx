import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token'); // Simple check for login status

  const handleSignout = () => {
    localStorage.removeItem('token');
    // Clear any other stored user data if necessary
    navigate('/login');
  };

  // Don't show any navigation on the login page
  if (location.pathname === '/login') {
    return (
      <header style={styles.header}>
        <h1 style={styles.title}>NaikToolkit</h1>
      </header>
    );
  }
  
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>NaikToolkit</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/home" style={styles.link}>Home</Link>
            <button onClick={handleSignout} style={styles.button}>Sign Out</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  title: {
    margin: 0,
  },
  link: {
    marginRight: '15px',
    textDecoration: 'none',
    color: '#333',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#333',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

export default Header;