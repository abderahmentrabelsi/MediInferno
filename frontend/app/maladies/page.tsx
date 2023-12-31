import React from 'react';
import MaladiesComponent from './maladiesComponent';


const ProductsPage = () => {
  const titleStyle = {
    textAlign: 'center', 
    fontSize: '36px',   
    marginBottom: '24px', 
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Diseases List</h1>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MaladiesComponent />
      </div>
    </div>
  );
};

export default ProductsPage;
