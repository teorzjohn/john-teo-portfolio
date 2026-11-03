export type HomeFeaturedProject = {
  slug: string;
  headline: string;
  headlineLines?: readonly [string, string];
  category: string;
  caption: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    crop?: 'connected-homes';
  };
};

export const homeFeaturedProjects: HomeFeaturedProject[] = [
  {
    slug: 'aize-onshore',
    headline: 'Expanding into the onshore market',
    category: 'Strategy',
    caption: 'Aize, 2025',
    image: {
      src: '/home/selected-work/onshore-full.webp',
      width: 2876,
      height: 1666,
      alt: 'Point cloud scan showing the dense structure of an onshore industrial facility.',
    },
  },
  {
    slug: 'partner-collection',
    headline: 'Shopping the next partner collection',
    headlineLines: ['Shopping the next', 'partner collection'],
    category: 'Design',
    caption: 'Adidas, 2022',
    image: {
      src: '/home/selected-work/partner-collection.jpg',
      width: 1536,
      height: 2150,
      alt: 'Colorful Adidas sneakers worn by models against a neutral background.',
    },
  },
  {
    slug: 'connected-homes',
    headline: 'Think with Google: Connected Homes',
    category: 'Research',
    caption: 'Fjord, 2020',
    image: {
      src: '/home/selected-work/connected-homes.jpg',
      width: 3719,
      height: 2479,
      alt: 'Google Home speaker beside two smart lock devices.',
      crop: 'connected-homes',
    },
  },
];
