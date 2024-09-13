import React, { useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

const SignOutButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
`;

const Header: React.FC = () => {
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
    <HeaderContainer>
      <Logo>Your Logo</Logo>
      <Nav>
        <NavLink to="/">Product</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {isLoggedIn ? (
          <SignOutButton onClick={handleSignout}>Sign Out</SignOutButton>
        ) : (
          <NavLink to="/login">Sign In</NavLink>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default React.memo(Header);

// export default Header;