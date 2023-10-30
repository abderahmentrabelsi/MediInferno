'use client';
import { useListPatients } from '@/api/apiComponents';

import React from 'react';
import ClientPaginatedTable, {
  RenderTableCellProps
} from '@components/tables/base/client-paginated-table';
import { PatientResponseDTO } from '@/api/apiSchemas';
import PatientStats from '@/app/patients/_components/stats';
const RenderCell: React.FC<RenderTableCellProps<PatientResponseDTO>> = ({
  columnKey,
  item
}) => {
  switch (columnKey) {
    default:
      return <span>{item[columnKey]}</span>;
  }
};
export default function PatientsPage() {
  return (
    <>
      <div className="flex flex-row justify-between gap-3">
        <PatientStats />
      </div>
      <ClientPaginatedTable
        useQuery={useListPatients}
        RenderCell={RenderCell}
      />
    </>
  );
}
