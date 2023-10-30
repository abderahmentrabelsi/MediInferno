import React from 'react';
import VaccinsComponent from './vaccinsComponent';


const ProductsPage = () => {
  const titleStyle = {
    textAlign: 'center', 
    fontSize: '36px',   
    marginBottom: '24px', 
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Vaccinations List</h1>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        < VaccinsComponent/>
      </div>
    </div>
  );
};

export default ProductsPage;
