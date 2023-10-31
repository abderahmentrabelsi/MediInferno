'use client';

import React from 'react';
import SalleComponent from './productsComponent';
import VehiculeComponent from './productsComponent';
import VehiculeStats from '@/app/vehicule/_components/stats';
import { useGetAllVehicles, useListPatients } from '@/api/apiComponents';
import ClientPaginatedTable, {
  RenderTableCellProps
} from '@components/tables/base/client-paginated-table';
import { PatientResponseDTO, VehicleResponseDTO } from '@/api/apiSchemas';

const RenderCell: React.FC<RenderTableCellProps<VehicleResponseDTO>> = ({
  columnKey,
  item
}) => {
  switch (columnKey) {
    default:
      return <span>{item[columnKey]}</span>;
  }
};
const VehiclePage = () => {
  const titleStyle = {
    textAlign: 'center', // Center-align the title
    fontSize: '36px', // Increase the font size
    marginBottom: '24px' // Add margin at the bottom
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-3">
        <VehiculeStats />
      </div>
      <ClientPaginatedTable
        useQuery={useGetAllVehicles}
        RenderCell={RenderCell}
      />
    </div>
  );
};

export default VehiclePage;
