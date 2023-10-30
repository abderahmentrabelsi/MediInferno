'use client';
import { Faker, en } from '@faker-js/faker';
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { useState } from 'react';
import { Equipment } from '../page';
import EquipmentDetails from './equipmentDetails';
export default function EquipmentCard({
  equipments
}: {
  equipments: Equipment[];
}) {
  const faker = new Faker({ locale: [en] });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEquipments =
    equipments &&
    equipments.filter((equipment) =>
      equipment.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <div className="flex justify-center items-center">
        <Input
          type="text"
          label="Recherche"
          description="Recherchez un équipement par nom"
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 pt-5">
        {filteredEquipments &&
          filteredEquipments.map((item, index) => (
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
                  src={faker.image.urlLoremFlickr({
                    category: item.nom
                  })}
                />
                <EquipmentDetails equipment={item} />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.nom}</b>
              </CardFooter>
            </Card>
          ))}
      </div>{' '}
    </>
  );
}
