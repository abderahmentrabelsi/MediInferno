'use client';
import {
  useGetEtablissementReductionStats,
  useGetEtablissementStats
} from '@/api/apiComponents';
import { SimpleStatisticCard } from '@components/cards/base/SimpleStatisticCard';
import { CompositeStatisticsCard } from '@components/cards/base/CompositeStatisticsCard';
import { ChevronDown, TrendingUpIcon } from '@components/icons';

export default function EtablissementReductionStatistiques() {
  const { data, isLoading } = useGetEtablissementReductionStats({});
  return (
    <CompositeStatisticsCard
      header={'Réductions'}
      direction={'column'}
      className={'flex-grow'}
      statisticsEntries={[
        {
          value: data?.minReduction?.toString() ?? '0',
          label: 'Minimum',
          color: 'warning',
          icon: TrendingUpIcon
        },
        {
          value: data?.maxReduction?.toString() ?? '0',
          label: 'Maximum',
          color: 'success',
          icon: TrendingUpIcon
        }
      ]}
    />
  );
}
