"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image, Button , Input } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: searchProduct, error } = useQuery({
        queryKey: ['products', searchTerm],
        queryFn: async () => {
          return await fetch(
            `http://localhost:8020/product/getByName/${searchTerm}`
          ).then((res) => res.json());
        }
      });

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
        flex: "1 1 20%",
        margin: "1%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    };

    const productInfoStyle = {
        textAlign: "center",
    };

    const showDetails = (product) => {
        const details = `
        Name: ${product.aPourNom}<br>
        Dosage: ${product.aAvecDosage}<br>
        Side Effects: ${product.aDesEffetsSecondaires}<br>
        Instructions: ${product.aDesInstructions}<br>
        Pharmacy: ${product.pharmacieName}<br>
    `;

        Swal.fire({
            title: `${product.aPourNom}`,
            html: `<div dangerouslySetInnerHTML={{ __html: ${details} </div>`,
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

    const searchProductByName = (name) => {
        axios.get(`http://localhost:8020/product/getByName/${name}`)
            .then(response => {
                setProducts(response.data); // Update products with the search results
            })
            .catch(error => {
                console.error("Error fetching products by name:", error);
            });
    };
    
   if (searchProduct && searchProduct.length > 0) {
    return (
        <div>
        <div className="flex justify-center items-center">
        <Input
          type="text"
          label="Search by Name or Phamarcy Name"
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br></br>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {searchProduct.map(product => (
                <Card className="py-4" key={product.id} style={cardStyle}>
                    <CardHeader className="pb-0 pt-2 px-4" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={productInfoStyle}>
                            <p className="text-tiny uppercase font-bold">{product.aPourNom}</p><br></br>
                            <small className="text-default-500">{product.aAvecDosage}</small><br></br>
                            <small className="text-default-500">{product.aDesInstructions}</small><br></br>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Image
                            alt="Product Image"
                            className="object-cover rounded-xl"
                            src={"/images/medicaments.png"}
                            width={270}
                        />
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button color="default" onClick={() => showDetails(product)}>
                                Show Details
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
        </div>
    );
   }
    return (
        <div>
        <div className="flex justify-center items-center">
        <Input
          type="text"
          label="Search by Name or Phamarcy Name"
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br></br>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.map(product => (
                <Card className="py-4" key={product.id} style={cardStyle}>
                    <CardHeader className="pb-0 pt-2 px-4" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={productInfoStyle}>
                            <p className="text-tiny uppercase font-bold">{product.aPourNom}</p><br></br>
                            <small className="text-default-500">{product.aAvecDosage}</small><br></br>
                            <small className="text-default-500">{product.aDesInstructions}</small><br></br>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Image
                            alt="Product Image"
                            className="object-cover rounded-xl"
                            src={"/images/medicaments.png"}
                            width={270}
                        />
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button color="default" onClick={() => showDetails(product)}>
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

export default ProductComponent;
