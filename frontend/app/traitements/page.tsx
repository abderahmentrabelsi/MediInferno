import React from 'react';
import TraitementComponent from "./productsComponent";


const DeliveryPage = () => {
  const titleStyle = {
    textAlign: 'center', // Center-align the title
    fontSize: '36px',   // Increase the font size
    marginBottom: '24px', // Add margin at the bottom
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>TRAITEMENTS</h1>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TraitementComponent />
      </div>
    </div>
  );
};

export default DeliveryPage;
