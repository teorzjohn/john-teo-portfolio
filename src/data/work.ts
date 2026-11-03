export type WorkItem = {
  name: string;
  description: string;
  year?: string;
  href?: string;
};

export type WorkGroup = {
  company: string;
  period: string;
  items: WorkItem[];
};

export const workGroups: WorkGroup[] = [
  {
    company: 'Aize',
    period: '2024 to Present',
    items: [
      {
        name: 'AI & MCP',
        description: 'Bringing AI into the product',
        year: '2026',
      },
      {
        name: 'Soft tagging',
        description: 'Mapping data to 3D objects',
        year: '2025',
        href: '/work/soft-tagging',
      },
      {
        name: 'Onshore',
        description: 'Scaling the product to other markets',
        year: '2025',
        href: '/work/aize-onshore',
      },
      {
        name: 'Handheld',
        description: 'Supporting work in the field',
        year: '2024',
      },
      {
        name: 'Projects',
        description: 'Organising and structuring work',
        year: '2024',
      },
    ],
  },
  {
    company: 'Adidas',
    period: '2021 to 2023',
    items: [
      {
        name: 'Priority Access',
        description: 'Rewarding member with entry to drops and sales',
        year: '2023',
      },
      {
        name: 'Digital Wallet',
        description: 'Connecting web3 wallets for access to drops',
        year: '2023',
        href: '/work/digital-wallet',
      },
      {
        name: 'Easter Egg',
        description: 'Unlocking exclusive drops through hidden clues',
        year: '2022',
        href: '/work/easter-egg',
      },
      {
        name: 'Design System',
        description: 'Rebuilding on design tokens',
        year: '2022',
      },
      {
        name: 'Collection Drops',
        description: 'Time-sensitive shopping for multi-item drops',
        year: '2022',
        href: '/work/partner-collection',
      },
    ],
  },
  {
    company: 'Fjord',
    period: '2018 to 2021',
    items: [
      {
        name: 'DBS Bank',
        description: 'Designing tools for relationship managers',
        year: '2021',
        href: '/work/client-connect',
      },
      {
        name: 'MQDC',
        description: 'Shaping strategy for a new property development',
        year: '2021',
      },
      {
        name: 'Google',
        description: 'Researching APAC’s connected home landscape',
        year: '2020',
        href: '/work/connected-homes',
      },
      {
        name: 'Petronas',
        description: 'Simplifying complex data for oil & gas operations',
        year: '2019',
      },
      {
        name: 'Singapore Airlines',
        description: 'Uncovering customer needs to shape services',
        year: '2018',
      },
    ],
  },
  {
    company: 'Others',
    period: '2015 ~',
    items: [
      {
        name: 'SP Group',
        description: 'Designing a solar output tracking website',
        year: '2017',
      },
      {
        name: 'DBS Bank',
        description: 'Redesigning the ATM interface',
        year: '2016',
      },
    ],
  },
];
