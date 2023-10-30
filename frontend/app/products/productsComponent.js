"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const ProductComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8020/product/list")
            .then(response => {
                setProducts(response.data); // Assuming the response contains an array of products
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const cardStyle = {
        display: "flex",
        flex: "0 0 30%",
        margin: "1%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    };

    const productInfoStyle = {
        textAlign: "center",
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.map(product => (
                <Card className="py-4" key={product.id} style={cardStyle}>
                    <CardHeader className="pb-0 pt-2 px-4" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={productInfoStyle}>
                            <p className="text-tiny uppercase font-bold">{product.aPourNom}</p>
                            <small className="text-default-500">Dosage: {product.aAvecDosage}</small><br></br>
                            <small className="text-default-500">Side Effects: {product.aDesEffetsSecondaires}</small><br></br>
                            <small className="text-default-500">Instructions: {product.aDesInstructions}</small><br></br>
                            <small className="text-default-500">Pharmacy: {product.pharmacieName}</small><br></br>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Image
                            alt="Product Image"
                            className="object-cover rounded-xl"
                            src={"/images/medicaments.png"}
                            width={270}
                        />
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default ProductComponent;
