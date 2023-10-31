'use client';
import {
  useGetEtablissementStats,
  useGetPatientStats,
  useGetSpecialiteStats
} from '@/api/apiComponents';
import { SimpleStatisticCard } from '@components/cards/base/SimpleStatisticCard';
import { CompositeStatisticsCard } from '@components/cards/base/CompositeStatisticsCard';
import { TrendingUpIcon } from '@components/icons';
import { Skeleton } from '@nextui-org/react';

export default function SpecialitesStats() {
  const { data, isLoading } = useGetSpecialiteStats({});
  if (!data || isLoading) return <Skeleton className="min-h-250px" />;
  return (
    <>
      <SimpleStatisticCard
        boldText={data?.totalSpecialites?.toString() ?? 'N/A'}
        mutedText="Total Spécialités"
        icon={TrendingUpIcon}
        iconColor={'success'}
        className={'flex-grow'}
      />
      <SimpleStatisticCard
        boldText={data?.minSpecialistes?.toString() ?? 'N/A'}
        mutedText="Min. Spécialistes"
        icon={TrendingUpIcon}
        iconColor={'primary'}
        className={'flex-grow'}
      />
      <SimpleStatisticCard
        boldText={data?.maxSpecialistes?.toString() ?? 'N/A'}
        mutedText="Max Spécialistes"
        icon={TrendingUpIcon}
        iconColor={'secondary'}
        className={'flex-grow'}
      />
    </>
  );
}
