"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image, Button, Input } from "@nextui-org/react";
import Swal from "sweetalert2";

const TraitementComponent = () => {
    const [traitements, setTraitements] = useState([]);
    const [traitementNames, setTraitementNames] = useState([]);
    const [professorNames, setProfessorNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTraitement, setSelectedTraitement] = useState("");
    const [selectedProfessor, setSelectedProfessor] = useState("");
    const [forceRender, setForceRender] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8020/traitements/list")
            .then((response) => {
                console.log("Fetched data:", response.data);
                setTraitements(response.data);

                const uniqueNames = [...new Set(response.data.map((traitement) => traitement.aPourNomTrait))];
                console.log("Traitement Names:", uniqueNames);
                setTraitementNames(uniqueNames);

                const uniqueProfessors = [...new Set(response.data.map((traitement) => traitement.aPourUnProfDeSante))];
                console.log("Professor Names:", uniqueProfessors);
                setProfessorNames(uniqueProfessors);
            })
            .catch((error) => {
                console.error("Error fetching traitements:", error);
            });
    }, [forceRender]);

    useEffect(() => {
        if (selectedTraitement) {
            axios
                .get(`http://localhost:8020/traitements/findByTraitName/${selectedTraitement}`)
                .then((response) => {
                    console.log(`Fetched data for ${selectedTraitement}:`, response.data);
                    // Handle the response data as needed
                })
                .catch((error) => {
                    console.error(`Error fetching data for ${selectedTraitement}:`, error);
                });
        }

        if (selectedProfessor) {
            axios
                .get(`http://localhost:8020/traitements/findByProfessor/${selectedProfessor}`)
                .then((response) => {
                    console.log(`Fetched data for ${selectedProfessor}:`, response.data);
                    // Handle the response data as needed
                })
                .catch((error) => {
                    console.error(`Error fetching data for ${selectedProfessor}:`, error);
                });
        }
    }, [selectedTraitement, selectedProfessor]);

    const cardStyle = {
        flex: "1 1 20%",
        margin: "1%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    };

    const traitementInfoStyle = {
        textAlign: "center",
    };

    const showDetails = (traitement) => {
        const details = `
        Name: ${traitement.aPourNomTrait}<br>
        Materiels: ${traitement.aPourMateriels}<br>
        Duree de Traitement: ${traitement.aPourDureeTrait}<br>
        Medicaments: ${traitement.aPourMedicaments}<br>
        Professional de Sante: ${traitement.aPourUnProfDeSante}<br>
    `;

        Swal.fire({
            title: `${traitement.aPourNomTrait}`,
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

    const filteredTraitements = traitements.filter(
        (traitement) =>
            traitement.aPourNomTrait.toLowerCase().includes(searchTerm.toLowerCase()) ||
            traitement.aPourUnProfDeSante.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Log state changes and render cycles
    useEffect(() => {
        console.log("Traitement names changed:", traitementNames);
    }, [traitementNames]);

    useEffect(() => {
        console.log("Selected traitement changed:", selectedTraitement);
        // Trigger a re-render
        setForceRender((prev) => !prev);
    }, [selectedTraitement]);

    useEffect(() => {
        console.log("Selected professor changed:", selectedProfessor);
        // Trigger a re-render
        setForceRender((prev) => !prev);
    }, [selectedProfessor]);

    useEffect(() => {
        console.log("Filtered traitements changed:", filteredTraitements);
    }, [filteredTraitements]);

    return (
        <div>
            <div className="flex justify-center items-center">
                <Input
                    type="text"
                    label="Search by Name or Professional de Sante"
                    className="max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <br />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                {traitementNames.length > 0 ? (
                    <select
                        value={selectedTraitement}
                        onChange={(e) => setSelectedTraitement(e.target.value)}
                        readOnly
                    >
                        <option value="">All Treatments</option>
                        {traitementNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>No traitement names available.</p>
                )}

                {professorNames.length > 0 ? (
                    <select
                        value={selectedProfessor}
                        onChange={(e) => setSelectedProfessor(e.target.value)}
                        readOnly
                    >
                        <option value="">All Professors</option>
                        {professorNames.map((professor) => (
                            <option key={professor} value={professor}>
                                {professor}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>No professor names available.</p>
                )}
            </div>
            <br />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {filteredTraitements.map((traitement) => (
                    <Card className="py-4" key={traitement.id} style={cardStyle}>
                        <CardHeader
                            className="pb-0 pt-2 px-4"
                            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <div style={traitementInfoStyle}>
                                <p className="text-tiny uppercase font-bold">{traitement.aPourNomTrait}</p>
                                <br />
                                <small className="text-default-500">{traitement.aPourDureeTrait}</small>
                                <br />
                                <small className="text-default-500">{traitement.aPourMedicaments}</small>
                                <br />
                            </div>
                        </CardHeader>
                        <CardBody
                            className="overflow-visible py-2"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <Image
                                alt="Product Image"
                                className="object-cover rounded-xl"
                                src={"/images/Traitement.PNG"}
                                width={270}
                            />
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button color="default" onClick={() => showDetails(traitement)}>
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

export default TraitementComponent;
