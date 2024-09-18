import React from 'react';
import './product.css';

const ProductPage: React.FC = () => {
  const products = [
    { title: 'Product 1', description: 'Description for Product 1', image: '/path-to-image-1.jpg' },
    { title: 'Product 2', description: 'Description for Product 2', image: '/path-to-image-2.jpg' },
    { title: 'Product 3', description: 'Description for Product 3', image: '/path-to-image-3.jpg' },
    { title: 'Product 4', description: 'Description for Product 4', image: '/path-to-image-4.jpg' },
  ];

  return (
    <div className="grid-container">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <img className="product-image" src={product.image} alt={product.title} />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <button className="product-button">Learn More</button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;