import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const ProductButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #48dbfb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductGrid: React.FC = () => {
  const products = [
    { title: 'Product 1', description: 'Description for Product 1', image: '/path-to-image-1.jpg' },
    { title: 'Product 2', description: 'Description for Product 2', image: '/path-to-image-2.jpg' },
    { title: 'Product 3', description: 'Description for Product 3', image: '/path-to-image-3.jpg' },
    { title: 'Product 4', description: 'Description for Product 4', image: '/path-to-image-4.jpg' },
  ];

  return (
    <GridContainer>
      {products.map((product, index) => (
        <ProductCard key={index}>
          <ProductImage src={product.image} alt={product.title} />
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductButton>Learn More</ProductButton>
        </ProductCard>
      ))}
    </GridContainer>
  );
};

export default ProductGrid;
