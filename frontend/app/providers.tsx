'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextUIProvider>
  );
}
