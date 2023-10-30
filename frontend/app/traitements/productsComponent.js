"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image, Button, Input } from "@nextui-org/react";
import Swal from "sweetalert2";

const TraitementComponent = () => {
    const [traitements, setTraitements] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8020/traitements/list")
            .then((response) => {
                console.log(response.data);
                setTraitements(response.data); // Assuming the response contains an array of traitements
            })
            .catch((error) => {
                console.error("Error fetching traitements:", error);
            });
    }, []);

    const cardStyle = {
        display: "flex",
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
            <br></br>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {filteredTraitements.map((traitement) => (
                    <Card className="py-4" key={traitement.id} style={cardStyle}>
                        <CardHeader
                            className="pb-0 pt-2 px-4"
                            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <div style={traitementInfoStyle}>
                                <p className="text-tiny uppercase font-bold">{traitement.aPourNomTrait}</p>
                                <br></br>
                                <small className="text-default-500">{traitement.aPourDureeTrait}</small>
                                <br></br>
                                <small className="text-default-500">{traitement.aPourMedicaments}</small>
                                <br></br>
                            </div>
                        </CardHeader>
                        <CardBody
                            className="overflow-visible py-2"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <Image alt="Product Image" className="object-cover rounded-xl" src={"/images/Traitement.PNG"} width={270} />
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
