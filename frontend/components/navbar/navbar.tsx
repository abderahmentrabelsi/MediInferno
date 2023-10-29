'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem
} from '@nextui-org/navbar';

import NextLink from 'next/link';

import { Logo } from '@/components/icons';
import React from 'react';
import { StaticNavbar } from '@/components/navbar/staticNavbarFragment';

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">InfernoHealth</p>
          </NextLink>
        </NavbarBrand>
        <StaticNavbar />
      </NavbarContent>
    </NextUINavbar>
  );
};
