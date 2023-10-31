"use client";
// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image, Button, Input } from "@nextui-org/react";
import Swal from "sweetalert2";

const VehiculeComponent = () => {
    // State variables
    const [vehicules, setVehicules] = useState([]);
    const [vehiculeNames, setVehiculeNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedVehicule, setSelectedVehicule] = useState("");
    const [forceRender, setForceRender] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        axios
            .get("http://localhost:8020/vehic/all")
            .then((response) => {
                console.log("Fetched data:", response.data);
                setVehicules(response.data);

                const uniqueNames = [...new Set(response.data.map((vehicule) => vehicule.vehicle))];
                console.log("Vehicule Names:", uniqueNames);
                setVehiculeNames(uniqueNames);
            })
            .catch((error) => {
                console.error("Error fetching vehicules:", error);
            });
    }, [forceRender]);

    // Fetch additional details on selected vehicule change
    useEffect(() => {
        if (selectedVehicule) {
            axios
                .get(`http://localhost:8020/vehic/findByName/${selectedVehicule}`)
                .then((response) => {
                    console.log(`Fetched data for ${selectedVehicule}:`, response.data);
                    // Handle the response data as needed
                })
                .catch((error) => {
                    console.error(`Error fetching data for ${selectedVehicule}:`, error);
                });
        }
    }, [selectedVehicule]);

    // Define styles
    const cardStyle = {
        flex: "1 1 20%",
        margin: "1%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    };

    const vehiculeInfoStyle = {
        textAlign: "center",
    };

    // Display vehicule details using Swal
    const showDetails = (vehicule) => {
        const details = `
        Vehicle: ${vehicule.vehicle}<br>
        Ammene: ${vehicule.ammene}<br>
        Conducteur: ${vehicule.aPourConducteur}<br>
        Transporte: ${vehicule.transporte}<br>
        Est Reservee: ${vehicule.estResrvee}<br>
        Nbr de Places: ${vehicule.aPourNbrPlaces}<br>
    `;

        Swal.fire({
            title: `${vehicule.vehicle}`,
            html: `<div dangerouslySetInnerHTML={{ __html: ${details} </div>`,
            customClass: {
                popup: "custom-swal-popup",
            },
            didOpen: () => {
                const swalPopup = document.querySelector(".swal2-popup");
                swalPopup.style.backgroundColor = "black";
                swalPopup.style.color = "white";
            },
        });
    };

    // Filter vehicules based on search term
    const filteredVehicules = vehicules.filter(
        (vehicule) =>
            vehicule.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicule.ammene.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicule.aPourConducteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicule.transporte.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicule.estResrvee.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicule.aPourNbrPlaces.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Log state changes and render cycles
    useEffect(() => {
        console.log("Vehicule names changed:", vehiculeNames);
    }, [vehiculeNames]);

    useEffect(() => {
        console.log("Selected vehicule changed:", selectedVehicule);
        // Trigger a re-render
        setForceRender((prev) => !prev);
    }, [selectedVehicule]);

    useEffect(() => {
        console.log("Filtered vehicules changed:", filteredVehicules);
    }, [filteredVehicules]);

    // JSX structure
    return (
        <div>
            <div className="flex justify-center items-center">
                <Input
                    type="text"
                    label="Search by Vehicle, Ammene, Conducteur, Transporte, Est Reservee, or Nbr de Places"
                    className="max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <br />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                {vehiculeNames.length > 0 ? (
                    <select value={selectedVehicule} onChange={(e) => setSelectedVehicule(e.target.value)} readOnly>
                        <option value="">All Vehicules</option>
                        {vehiculeNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>No vehicule names available.</p>
                )}
            </div>
            <br />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {filteredVehicules.map((vehicule) => (
                    <Card className="py-4" key={vehicule.vehicle} style={cardStyle}>
                        <CardHeader
                            className="pb-0 pt-2 px-4"
                            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <div style={vehiculeInfoStyle}>
                                <p className="text-tiny uppercase font-bold">{vehicule.vehicle}</p>
                                <br />
                                <small className="text-default-500">{vehicule.ammene}</small>
                                <br />
                                <small className="text-default-500">{vehicule.aPourConducteur}</small>
                                <br />
                            </div>
                        </CardHeader>
                        <CardBody
                            className="overflow-visible py-2"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <Image alt="Vehicule Image" className="object-cover rounded-xl" src={"/images/ambulance.PNG"} width={270} />
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button color="default" onClick={() => showDetails(vehicule)}>
                                    Show Details
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default VehiculeComponent;
