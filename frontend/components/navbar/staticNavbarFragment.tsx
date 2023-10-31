'use client';

import React from 'react';
import {
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu
} from '@nextui-org/react';
import { ChevronDown } from '@nextui-org/shared-icons';
import clsx from 'clsx';
import NextLink from 'next/link';
import { Link } from '@nextui-org/link';

const areas = [
  {
    name: 'Antologies',
    uri: '/customer',
    children: [
      { label: 'Home', path: '/' },
      { label: 'Patients', path: '/patients', absolute: true },
      { label: 'Etablissements', path: '/etablissements', absolute: true },
      { label: 'Products', path: '/products', absolute: true },
      { label: 'Professionnels', path: '/professionnels', absolute: true },
      { label: 'Traitements', path: '/traitements', absolute: true },
      { label:'Salles', path:'/salle', absolute:true},
      { label: 'Medical Labo', path: '/medicalLabo', absolute: true },
      { label: 'Medical Equipments', path: '/equipement', absolute: true },
      { label: 'Diseases', path: '/maladies', absolute: true },
      { label: 'Vaccinations', path: '/vaccins', absolute: true },
      { label: 'Vehicules', path: '/vehicule', absolute: true },

    ]
  }
];

export const StaticNavbar = () => {
  return (
    <>
      {areas.map((area) => (
        <Dropdown placement="bottom-start" key={`${area.name}-dropdown-key`}>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                {area.name}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            {area.children.map((child) => (
              <DropdownItem key={child.label}>
                <Link
                  color="foreground"
                  href={`${child.absolute ? '' : area.uri}${child.path}`}
                >
                  {child.label}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ))}
    </>
  );
};
