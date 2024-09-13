import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem;
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const HeroImage = styled.img`
  max-width: 50%;
  height: auto;
`;

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Explore Products Products Tree</HeroTitle>
        <HeroSubtitle>Discover our range of innovative products designed to meet your needs.</HeroSubtitle>
        <CTAButton>Get Started</CTAButton>
      </HeroContent>
      <HeroImage src="/path-to-your-laptop-image.png" alt="Product showcase" />
    </HeroContainer>
  );
};

export default HeroSection;
