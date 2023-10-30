"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";
import Swal from "sweetalert2";

const VaccinsComponent = () => {
    const [vaccins, setvaccins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8020/vaccins/list")
            .then(response => {
                setvaccins(response.data); // Assuming the response contains an array of vaccins
            })
            .catch(error => {
                console.error("Error fetching vaccins:", error);
            });
    }, []);

    const filteredvaccins = vaccins.filter(
        (vaccins) =>
            vaccins.aPourinjection.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vaccins.aPournom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br></br>
            <Table aria-label="vaccins Table">
                <TableHeader>
                    <TableColumn>Vaccin Name</TableColumn>
                    <TableColumn>Injection</TableColumn>
                    <TableColumn>Secondary Effects</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredvaccins.map((vaccins, index) => (
                        <TableRow key={index}>
                            <TableCell>{vaccins.aPournom}</TableCell>
                            <TableCell>{vaccins.aPourinjection}</TableCell>
                            <TableCell>{vaccins.aDeseffetsecondaires}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default VaccinsComponent;

