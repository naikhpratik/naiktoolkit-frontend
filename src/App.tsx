import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import RootRedirect from './components/RootRedirect';
import { UserProvider } from './context/useAuth';

const App: React.FC = () => {

  const isLoggedIn = !!localStorage.getItem('token'); // Simple check for login status

  return (
    <UserProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserProvider>
  );
  /*
  
  return()
  
  */
};

export default App;
