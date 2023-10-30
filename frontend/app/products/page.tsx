import React from 'react';
import ProductComponent from './productsComponent';


const DeliveryPage = () => {
  const titleStyle = {
    textAlign: 'center', // Center-align the title
    fontSize: '36px',   // Increase the font size
    marginBottom: '24px', // Add margin at the bottom
  };

  return (
    <div>
        <h1>Products</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ProductComponent /> 
      </div>
    </div>
  );
};

export default DeliveryPage;
