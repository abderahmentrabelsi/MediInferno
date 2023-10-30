'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import DoctorCard from './_components/doctorCard';

export type Doctor = {
  nom: string;
  specialite: string;
  age: number;
  experience: number;
  adresse: string;
  patientName: string;
};

export default function App() {
  const { data: doctors, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      return await fetch('http://localhost:8020/prof/list').then((res) =>
        res.json()
      );
    }
  });

  if (error) return <h1>error</h1>;
  return <DoctorCard doctors={doctors} />;
}
