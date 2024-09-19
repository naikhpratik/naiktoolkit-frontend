import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderPage from './pages/headerPage/header';
import FooterPage from './pages/footerPage/footer';
import { UserProvider } from './context/useAuth';

const App: React.FC = () => {

  return (
    <UserProvider>
      <HeaderPage />
      <Outlet />
      <FooterPage />
    </UserProvider>
  );
  
};

export default App;
