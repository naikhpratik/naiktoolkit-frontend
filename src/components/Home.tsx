import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import HeroSection from './HeroSection';
import ProductGrid from './ProductGrid';

const HomeContainer = styled.div`
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
`;

const BackgroundShape = styled.div`
  position: absolute;
  top: -100px;
  right: -100px;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb);
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <BackgroundShape />
      <Content>
        <HeroSection />
        <ProductGrid />
      </Content>
    </HomeContainer>
  );
};

export default Home;
