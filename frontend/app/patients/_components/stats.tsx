'use client';
import {
  useGetEtablissementStats,
  useGetPatientStats
} from '@/api/apiComponents';
import { SimpleStatisticCard } from '@components/cards/base/SimpleStatisticCard';
import { CompositeStatisticsCard } from '@components/cards/base/CompositeStatisticsCard';
import { TrendingUpIcon } from '@components/icons';

export default function PatientStats() {
  const { data, isLoading } = useGetPatientStats({});
  return (
    <>
      <SimpleStatisticCard
        boldText={data?.totalPatients?.toString() ?? 'N/A'}
        mutedText="Total Patients"
        icon={TrendingUpIcon}
        iconColor={'success'}
        className={'flex-grow'}
      />
      <SimpleStatisticCard
        boldText={data?.minAge?.toString() ?? 'N/A'}
        mutedText="Age minimum"
        icon={TrendingUpIcon}
        iconColor={'primary'}
        className={'flex-grow'}
      />
      <SimpleStatisticCard
        boldText={data?.totalPatients?.toString() ?? 'N/A'}
        mutedText="Age maximum"
        icon={TrendingUpIcon}
        iconColor={'secondary'}
        className={'flex-grow'}
      />
    </>
  );
}
