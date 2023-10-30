import React from 'react';
import MedicalLaboComponent from './medicalLaboComponent';


const MedicalLaboPage = () => {
  const titleStyle = {
    textAlign: 'center', 
    fontSize: '36px',   
    marginBottom: '24px', 
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Medical Labo</h1>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MedicalLaboComponent />
      </div>
    </div>
  );
};

export default MedicalLaboPage;
