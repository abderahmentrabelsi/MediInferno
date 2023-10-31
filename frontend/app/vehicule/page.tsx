import React from 'react';
import SalleComponent from './productsComponent';
import VehiculeComponent from './productsComponent';
import VehiculeStats from '@/app/vehicule/_components/stats';

const DeliveryPage = () => {
  const titleStyle = {
    textAlign: 'center', // Center-align the title
    fontSize: '36px', // Increase the font size
    marginBottom: '24px' // Add margin at the bottom
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-3">
        <VehiculeStats />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <VehiculeComponent />
      </div>
    </div>
  );
};

export default DeliveryPage;
