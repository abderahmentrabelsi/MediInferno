"use client"
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const ProductComponent = ({ product }) => {

    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">name</p>
                <small className="text-default-500">Dosage: dosage</small>
                <small className="text-default-500">Side Effects: sideEffects</small>
                <small className="text-default-500">Instructions: instructions</small>
                <small className="text-default-500">Pharmacy: pharmacy</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Product Image"
                    className="object-cover rounded-xl"
                    src="/images/image.jpg" 
                    width={270}
                />
            </CardBody>
        </Card>
    );
};

export default ProductComponent;
