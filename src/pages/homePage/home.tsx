import React from 'react';
import './home.css';
import HeroPage from '../heroPage/hero';
import ProductPage from '../productPage/product';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="background-shape" />
      <div className="content">
        <HeroPage />
        <ProductPage />
      </div>
    </div>
  );
};

export default HomePage;