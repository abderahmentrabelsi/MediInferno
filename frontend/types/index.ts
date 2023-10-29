import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  fill?: string;
};

export type TypegraphyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | undefined;

export type ChipVariant =
  | 'light'
  | 'shadow'
  | 'flat'
  | 'dot'
  | 'solid'
  | 'bordered'
  | 'faded'
  | undefined;
