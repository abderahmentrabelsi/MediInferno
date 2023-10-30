'use client';
import { useListEtablissement, useListPatients } from '@/api/apiComponents';

import React from 'react';
import ClientPaginatedTable, {
  RenderTableCellProps
} from '@components/tables/base/client-paginated-table';
import { EtablissementDeSanteDTO, PatientResponseDTO } from '@/api/apiSchemas';
const RenderCell: React.FC<RenderTableCellProps<EtablissementDeSanteDTO>> = ({
  columnKey,
  item
}) => {
  switch (columnKey) {
    default:
      return <span>{item[columnKey]}</span>;
  }
};
export default function EtablissementsPage() {
  return (
    <>
      <ClientPaginatedTable
        useQuery={useListEtablissement}
        RenderCell={RenderCell}
      />
    </>
  );
}
