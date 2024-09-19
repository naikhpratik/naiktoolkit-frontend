import React from 'react';
import './hero.css';

const HeroPage: React.FC = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Explore Products Products Tree</h1>
        <p className="hero-subtitle">Discover our range of innovative products designed to meet your needs.</p>
        <button className="cta-button">Get Started</button>
      </div>
      <img className="hero-image" src="/path-to-your-laptop-image.png" alt="Product showcase" />
    </section>
  );
};

export default HeroPage;