"use client";
// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image, Button, Input } from "@nextui-org/react";
import Swal from "sweetalert2";

const SalleComponent = () => {
    // State variables
    const [salles, setSalles] = useState([]);
    const [salleNames, setSalleNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSalle, setSelectedSalle] = useState("");
    const [forceRender, setForceRender] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        axios
            .get("http://localhost:8020/salles/list")
            .then((response) => {
                console.log("Fetched data:", response.data);
                setSalles(response.data);

                const uniqueNames = [...new Set(response.data.map((salle) => salle.salle))];
                console.log("Salle Names:", uniqueNames);
                setSalleNames(uniqueNames);
            })
            .catch((error) => {
                console.error("Error fetching salles:", error);
            });
    }, [forceRender]);

    // Fetch additional details on selected salle change
    useEffect(() => {
        if (selectedSalle) {
            axios
                .get(`http://localhost:8020/salles/findByName/${selectedSalle}`)
                .then((response) => {
                    console.log(`Fetched data for ${selectedSalle}:`, response.data);
                    // Handle the response data as needed
                })
                .catch((error) => {
                    console.error(`Error fetching data for ${selectedSalle}:`, error);
                });
        }
    }, [selectedSalle]);

    // Define styles
    const cardStyle = {
        flex: "1 1 20%",
        margin: "1%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    };

    const salleInfoStyle = {
        textAlign: "center",
    };

    // Display salle details using Swal
    const showDetails = (salle) => {
        const details = `
        Name: ${salle.salle}<br>
        Nbr De Pations: ${salle.aPourNbrDePations}<br>
        Est Reservee: ${salle.estReservee}<br>
        Contient: ${salle.contient}<br>
        Abrite: ${salle.abrite}<br>
    `;

        Swal.fire({
            title: `${salle.salle}`,
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

    // Filter salles based on search term
    const filteredSalles = salles.filter(
        (salle) =>
            salle.salle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salle.aPourNbrDePations.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salle.estReservee.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salle.contient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salle.abrite.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Log state changes and render cycles
    useEffect(() => {
        console.log("Salle names changed:", salleNames);
    }, [salleNames]);

    useEffect(() => {
        console.log("Selected salle changed:", selectedSalle);
        // Trigger a re-render
        setForceRender((prev) => !prev);
    }, [selectedSalle]);

    useEffect(() => {
        console.log("Filtered salles changed:", filteredSalles);
    }, [filteredSalles]);

    // JSX structure
    return (
        <div>
            <div className="flex justify-center items-center">
                <Input
                    type="text"
                    label="Search by Name, Nbr De Pations, Est Reservee, Contient, or Abrite"
                    className="max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <br />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                {salleNames.length > 0 ? (
                    <select value={selectedSalle} onChange={(e) => setSelectedSalle(e.target.value)} readOnly>
                        <option value="">All Salles</option>
                        {salleNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>No salle names available.</p>
                )}
            </div>
            <br />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {filteredSalles.map((salle) => (
                    <Card className="py-4" key={salle.salle} style={cardStyle}>
                        <CardHeader
                            className="pb-0 pt-2 px-4"
                            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <div style={salleInfoStyle}>
                                <p className="text-tiny uppercase font-bold">{salle.salle}</p>
                                <br />
                                <small className="text-default-500">{salle.aPourNbrDePations}</small>
                                <br />
                                <small className="text-default-500">{salle.estReservee}</small>
                                <br />
                            </div>
                        </CardHeader>
                        <CardBody
                            className="overflow-visible py-2"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <Image alt="Salle Image" className="object-cover rounded-xl" src={"/images/Salle.PNG"} width={270} />
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button color="default" onClick={() => showDetails(salle)}>
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

export default SalleComponent;

