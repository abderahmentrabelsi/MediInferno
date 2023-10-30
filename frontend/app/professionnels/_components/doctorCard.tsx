'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { Doctor } from '../page';
import { Faker, en } from '@faker-js/faker';
import DoctorDetails from './doctorDetails';
export default function DoctorCard({ doctors }: { doctors: Doctor[] }) {
  const faker = new Faker({ locale: [en] });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors =
    doctors &&
    doctors.filter((doctor) =>
      doctor.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <div className="flex justify-center items-center">
        <Input
          type="text"
          label="Recherche"
          description="Recherchez un médecin par nom"
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 pt-5">
        {filteredDoctors &&
          filteredDoctors.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log('item pressed')}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.nom}
                  className="w-full object-cover h-[140px]"
                  // src={faker.image.avatarGitHub()}
                />
                <DoctorDetails doctor={item} />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.nom}</b>
                <p className="text-default-500">{item.adresse}</p>
              </CardFooter>
            </Card>
          ))}
      </div>{' '}
    </>
  );
}
