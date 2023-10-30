"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";
import Swal from "sweetalert2";

const MaladiesComponent = () => {
    const [maladies, setMaladies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8020/maladies/list")
            .then(response => {
                setMaladies(response.data); // Assuming the response contains an array of maladies
            })
            .catch(error => {
                console.error("Error fetching maladies:", error);
            });
    }, []);

    const filteredMaladies = maladies.filter(
        (maladie) =>
            maladie.aPoursymptome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            maladie.maladie.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br></br>
            <Table aria-label="Maladies Table">
                <TableHeader>
                    <TableColumn>Maladie Name</TableColumn>
                    <TableColumn>Symptomes</TableColumn>
                    <TableColumn>Traitement</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredMaladies.map((maladie, index) => (
                        <TableRow key={index}>
                            <TableCell>{maladie.maladie}</TableCell>
                            <TableCell>{maladie.aPoursymptome}</TableCell>
                            <TableCell>{maladie.aTraitement}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MaladiesComponent;

