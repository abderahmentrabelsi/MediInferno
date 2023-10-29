export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Next.js + NextUI',
  description: 'Make beautiful websites regardless of your design experience.',
  navMenuItems: [
    {
      label: 'Seller Area',
      href: '/seller-home'
    },
    {
      label: 'Customer Area',
      href: '/customer-home'
    }
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui-docs-v2.vercel.app',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev'
  }
};
