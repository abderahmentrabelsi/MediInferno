import React from 'react';
import SalleComponent from "./productsComponent";
import VehiculeComponent from "./productsComponent";


const DeliveryPage = () => {
  const titleStyle = {
    textAlign: 'center', // Center-align the title
    fontSize: '36px',   // Increase the font size
    marginBottom: '24px', // Add margin at the bottom
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>VEHICULES</h1>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <VehiculeComponent />
      </div>
    </div>
  );
};

export default DeliveryPage;
