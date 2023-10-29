import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar/navbar';
import clsx from 'clsx';
import React from 'react';
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-8 px-8 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
        {/*<div*/}
        {/*  aria-hidden="true"*/}
        {/*  className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0"*/}
        {/*>*/}
        {/*  <img alt="docs left background" src="/gradients/docs-left.svg" />*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  aria-hidden="true"*/}
        {/*  className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"*/}
        {/*>*/}
        {/*  <img alt="docs right background" src="/gradients/docs-right.svg" />*/}
        {/*</div>*/}
      </body>
    </html>
  );
}
