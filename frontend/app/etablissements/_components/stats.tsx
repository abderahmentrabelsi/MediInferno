'use client';
import { useGetEtablissementStats } from '@/api/apiComponents';
import { SimpleStatisticCard } from '@components/cards/base/SimpleStatisticCard';
import { CompositeStatisticsCard } from '@components/cards/base/CompositeStatisticsCard';
import { TrendingUpIcon } from '@components/icons';

export default function EtablissementStatistiques() {
  const { data, isLoading } = useGetEtablissementStats({});
  return (
    <>
      <SimpleStatisticCard
        boldText={data?.totalEtablissements?.toString() ?? 'N/A'}
        mutedText="Nombre d'établissements"
        icon={TrendingUpIcon}
      />
      <CompositeStatisticsCard
        header={'Capacité'}
        direction={'column'}
        className={'flex-grow'}
        statisticsEntries={[
          {
            value: data?.minCapacity?.toString() ?? '0',
            label: 'Minimum',
            color: 'warning',
            icon: TrendingUpIcon
          },
          {
            value: data?.maxCapacity?.toString() ?? '0',
            label: 'Maximum',
            color: 'success',
            icon: TrendingUpIcon
          }
        ]}
      />
    </>
  );
}
