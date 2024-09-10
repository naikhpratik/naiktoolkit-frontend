import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {

  const isLoggedIn = !!localStorage.getItem('token'); // Simple check for login status

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <Header />
        </header>
        <main className="body">
          <Routes>
            <Route path="/login" element={<Login />} />
            {isLoggedIn ? (
              <Route path="/home" element={<Home />} />
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}            
          </Routes>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default App;
