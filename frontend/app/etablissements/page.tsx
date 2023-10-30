'use client';
import { useListEtablissement, useListPatients } from '@/api/apiComponents';

import React from 'react';
import ClientPaginatedTable, {
  RenderTableCellProps
} from '@components/tables/base/client-paginated-table';
import { EtablissementDeSanteDTO, PatientResponseDTO } from '@/api/apiSchemas';
import { Chip } from '@nextui-org/react';
const RenderCell: React.FC<RenderTableCellProps<EtablissementDeSanteDTO>> = ({
  columnKey,
  item
}) => {
  switch (columnKey) {
    case 'adesServiceDurg':
      return (
        <Chip color={item[columnKey] === 'true' ? 'success' : 'danger'}>
          {item[columnKey]}
        </Chip>
      );
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
