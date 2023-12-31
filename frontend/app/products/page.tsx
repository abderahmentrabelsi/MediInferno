import React from 'react';
import ProductComponent from './productsComponent';


const ProductsPage = () => {
  const titleStyle = {
    textAlign: 'center', 
    fontSize: '36px',   
    marginBottom: '24px', 
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Pharmaceutical Product</h1>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ProductComponent />
      </div>
    </div>
  );
};

export default ProductsPage;
