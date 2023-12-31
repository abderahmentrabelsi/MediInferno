"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image, Button, Input } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const MedicalLaboComponent = () => {
  const [medicalLabos, setMedicalLabos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchMedicalLabo, error } = useQuery({
    queryKey: ['medicalLabo', searchTerm],
    queryFn: async () => {
      return await fetch(
        `http://localhost:8020/medicalLabo/getByName/${searchTerm}`
      ).then((res) => res.json());
    }
  });

  useEffect(() => {
    axios.get("http://localhost:8020/medicalLabo/list")
      .then(response => {
        setMedicalLabos(response.data); // Assuming the response contains an array of medical labos
      })
      .catch(error => {
        console.error("Error fetching medical labos:", error);
      });
  }, []);

  const showDetails = (medicalLabo) => {
    const details = `
        Equipments: ${medicalLabo.aEquipement}<br>
        Technicians: ${medicalLabo.aTechniciens}<br>
        Created: ${medicalLabo.aProduitNom}<br>
    `;

    Swal.fire({
      title: `${medicalLabo.aPourNom}`,
      html: details,
      customClass: {
        popup: 'custom-swal-popup',
      },
      didOpen: () => {
        const swalPopup = document.querySelector('.swal2-popup');
        swalPopup.style.backgroundColor = 'black';
        swalPopup.style.color = 'white';
      }
    });
  };

  const cardStyle = {
    display: "flex",
    flex: "1 1 20%",
    margin: "1%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  };

  const productInfoStyle = {
    textAlign: "center",
  };

  if(searchMedicalLabo && searchMedicalLabo.length > 0) {
    return (
      <div>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchMedicalLabo.map((medicalLabo) => (
          <Card style={cardStyle} key={medicalLabo.id}>
            <CardHeader>
              <h3>{medicalLabo.aPourNom}</h3>
            </CardHeader>
            <CardBody>
              <Image
                src="images/medicalLabo.png"
                width={200}
                height={200}
              />
              <div style={productInfoStyle}>
                <p><b>Equipments :</b> {medicalLabo.aEquipement}</p>
              </div>
              <br></br>
              <Button onClick={() => showDetails(medicalLabo)}>Show Details</Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
    );
    }
  return (
    <div>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {medicalLabos.map((medicalLabo) => (
          <Card style={cardStyle} key={medicalLabo.id}>
            <CardHeader>
              <h3>{medicalLabo.aPourNom}</h3>
            </CardHeader>
            <CardBody>
              <Image
                src="images/medicalLabo.png"
                width={200}
                height={200}
              />
              <div style={productInfoStyle}>
                <p><b>Equipments :</b> {medicalLabo.aEquipement}</p>
              </div>
              <br></br>
              <Button onClick={() => showDetails(medicalLabo)}>Show Details</Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MedicalLaboComponent;
