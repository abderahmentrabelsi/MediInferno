'use client';
import { Card, Spacer } from '@nextui-org/react';
import React, { FunctionComponent, ReactElement } from 'react';
import { Chip } from '@nextui-org/chip';
import { CardBody, CardHeader } from '@nextui-org/card';
import { CheckmarkIcon } from '@components/icons';
import { ChipVariant, IconSvgProps, TypegraphyColor } from '@/types';
import { subtitle, title } from '@components/primitives';

export interface SimpleStatisticCardProps {
  header?: string;
  iconColor?: TypegraphyColor;
  icon?: FunctionComponent<IconSvgProps>;
  boldText: string;
  mutedText: string;
  chipText?: string;
  chipColor?: TypegraphyColor;
  chipVariant?: ChipVariant;
  className?: string;
}

export const SimpleStatisticCard = ({
  header,
  iconColor,
  icon,
  boldText,
  mutedText,
  chipText,
  chipColor,
  chipVariant,
  className
}: SimpleStatisticCardProps) => {
  return (
    <Card className={`min-w-[250px] ${className}`}>
      <CardHeader className="z-10">
        <h3 className={subtitle()}>{header}</h3>
      </CardHeader>
      <CardBody className="z-10">
        <h3 className={title({ size: 'sm' })}>{boldText}</h3>
        <Spacer y={0.5} />
        <h4>{mutedText}</h4>
        {chipText && (
          <Chip color={chipColor} variant={chipVariant}>
            {chipText}
          </Chip>
        )}
      </CardBody>

      {icon && (
        <div
          className={`absolute right-2 flex items-center overflow-hidden h-full py-1`}
        >
          <span className={`text-${iconColor || 'primary'} opacity-10`}>
            {React.createElement(icon, { size: 280 })}
          </span>
        </div>
      )}
    </Card>
  );
};
