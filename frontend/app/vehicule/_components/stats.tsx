'use client';
import {
  useGetEtablissementStats,
  useGetPatientStats,
  useGetSpecialiteStats,
  useGetVehicleStats
} from '@/api/apiComponents';
import { SimpleStatisticCard } from '@components/cards/base/SimpleStatisticCard';
import { CompositeStatisticsCard } from '@components/cards/base/CompositeStatisticsCard';
import { TrendingUpIcon } from '@components/icons';
import { Skeleton } from '@nextui-org/react';

export default function VehiculeStats() {
  const { data, isLoading } = useGetVehicleStats({});
  if (!data || isLoading) return <Skeleton className="min-h-250px" />;
  return (
    <>
      <SimpleStatisticCard
        boldText={data?.totalVehicles?.toString() ?? 'N/A'}
        mutedText="Total Vehicules"
        icon={TrendingUpIcon}
        iconColor={'success'}
        className={'flex-grow'}
      />
      <SimpleStatisticCard
        boldText={data?.minPlaces?.toString() ?? 'N/A'}
        mutedText="Min. Places"
        icon={TrendingUpIcon}
        iconColor={'primary'}
        className={'flex-grow'}
      />
      <SimpleStatisticCard
        boldText={data?.maxPlaces?.toString() ?? 'N/A'}
        mutedText="Max Places"
        icon={TrendingUpIcon}
        iconColor={'secondary'}
        className={'flex-grow'}
      />
      <SimpleStatisticCard
        boldText={data?.avgPlaces?.toString() ?? 'N/A'}
        mutedText="Moy. Places"
        icon={TrendingUpIcon}
        iconColor={'secondary'}
        className={'flex-grow'}
      />
    </>
  );
}
