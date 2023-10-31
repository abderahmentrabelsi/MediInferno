'use client';
import {
  useListEtablissement,
  useListPatients,
  useListSpecialite
} from '@/api/apiComponents';

import React from 'react';
import ClientPaginatedTable, {
  RenderTableCellProps
} from '@components/tables/base/client-paginated-table';
import { EtablissementDeSanteDTO, PatientResponseDTO } from '@/api/apiSchemas';
import { Chip } from '@nextui-org/react';
import EtablissementStatistiques from '@/app/etablissements/_components/stats';
import EtablissementReductionStatistiques from '@/app/etablissements/_components/reductionStats';
import SpecialitesStats from '@/app/specialites/_components/stats';
const RenderCell: React.FC<RenderTableCellProps<EtablissementDeSanteDTO>> = ({
  columnKey,
  item
}) => {
  switch (columnKey) {
    case 'aDesServiceDurg':
      return (
        <Chip color={item[columnKey] === 'true' ? 'success' : 'danger'}>
          {(item[columnKey] ?? 'N/A').toUpperCase()}
        </Chip>
      );
    default:
      return <span>{item[columnKey]}</span>;
  }
};
export default function EtablissementsPage() {
  return (
    <>
      <div className="flex flex-row justify-between gap-3">
        <SpecialitesStats />
      </div>
      <ClientPaginatedTable
        useQuery={useListSpecialite}
        RenderCell={RenderCell}
      />
    </>
  );
}
