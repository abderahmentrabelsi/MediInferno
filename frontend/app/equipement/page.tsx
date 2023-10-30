'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import EquipmentDetails from './_components/equipmentDetails';
import EquipmentCard from './_components/equipementCard';

export type Equipment = {
  nom: string;
  docteur: string;
};

export default function App() {
  const { data: equipments, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      return await fetch('http://localhost:8020/equipment/list').then((res) =>
        res.json()
      );
    }
  });

  if (error) return <h1>error</h1>;
  return <EquipmentCard equipments={equipments} />;
}
