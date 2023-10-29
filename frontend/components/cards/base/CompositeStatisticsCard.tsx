'use client';
import { Card, Spacer } from '@nextui-org/react';
import React, { FunctionComponent } from 'react';
import { Chip } from '@nextui-org/chip';
import { CardBody, CardHeader } from '@nextui-org/card';
import { ChipVariant, IconSvgProps, TypegraphyColor } from '@/types';
import { subtitle, title } from '@components/primitives';

export interface StatisticsEntry {
  value: string;
  label: string;
  color: TypegraphyColor;
  icon: FunctionComponent<IconSvgProps>;
}

export interface CompositeStatisticsCardProps {
  header: string;
  statisticsEntries: StatisticsEntry[];
  className?: string;
  direction?: 'row' | 'column';
}

export const CompositeStatisticsCard = ({
  header,
  statisticsEntries,
  className,
  direction = 'row'
}: CompositeStatisticsCardProps) => {
  return (
    <Card className={`min-w-[150px] ${className}`}>
      <CardHeader>
        <h3 className={subtitle()}>{header}</h3>
      </CardHeader>
      <CardBody className={`flex flex-${direction} gap-3`}>
        {(statisticsEntries || []).map((entry, index) => (
          <div key={index} className="flex flex-row items-center gap-3">
            <div className={`p-3 bg-${entry.color}-50 rounded-xl`}>
              <span className={`text-${entry.color}`}>
                {React.createElement(entry.icon, { size: 36 })}
              </span>
            </div>
            <Spacer x={0} />
            <div className="flex flex-col">
              <h3 className={title({ size: 'sm' })}>{entry.value}</h3>
              <Spacer y={0.5} />
              <h4>{entry.label}</h4>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
