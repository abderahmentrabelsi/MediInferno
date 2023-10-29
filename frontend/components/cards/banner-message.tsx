import { TypegraphyColor } from '@/types';
import clsx from 'clsx';

export interface BannerMessageProps {
  message: string;
  color: TypegraphyColor;
  className?: string;
}

export function BannerMessage({
  message,
  color,
  className
}: BannerMessageProps) {
  return (
    <div
      className={clsx(
        `w-full rounded-xl py-2 text-sm text-center font-semibold bg-${color}-50 text-${color}`,
        className
      )}
    >
      {message}
    </div>
  );
}
