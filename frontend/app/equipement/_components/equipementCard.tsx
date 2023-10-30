'use client';
import { Faker, en } from '@faker-js/faker';
import { Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { useState } from 'react';
import { Equipment } from '../page';
import EquipmentDetails from './equipmentDetails';
import { useQuery } from '@tanstack/react-query';
export default function EquipmentCard({
  equipments
}: {
  equipments: Equipment[];
}) {
  const faker = new Faker({ locale: [en] });
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchEquipment, error } = useQuery({
    queryKey: ['equipment', searchQuery],
    queryFn: async () => {
      return await fetch(
        `http://localhost:8020/equipment/getByName/${searchQuery}`
      ).then((res) => res.json() as Promise<Equipment[]>);
    }
  });

  if (searchEquipment && searchEquipment?.length > 0) {
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
          {searchEquipment &&
            searchEquipment.map((item, index) => (
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
        {equipments &&
          equipments.map((item, index) => (
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
