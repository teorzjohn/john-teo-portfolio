export type ProjectMedia = {
  type: 'image';
  src: string;
  alt: string;
  width?: number;
  height?: number;
  span?: 'full' | 'wide' | 'half' | 'tall';
};

export type ProjectExtendedSection = {
  heading: string;
  paragraphs: string[];
};

export type ProjectOutcomeMetric = {
  label: string;
  period: string;
  result: string;
};

export type Project = {
  slug: string;
  title: string;
  company: string;
  year: string;
  discipline: string;
  focusLabels?: string[];
  headerDescription?: string;
  shortDescription?: string;
  summary?: string;
  hasCaseStudy?: boolean;
  isHidden?: boolean;
  extended: (string | ProjectExtendedSection)[];
  outcome: string | ProjectOutcomeMetric[];
  cover?: ProjectMedia;
  media: ProjectMedia[];
};

// Project slides are 1280 × 832 unless an asset uses a different ratio below.
const exactImageDimensions: Record<string, [number, number]> = {
  '/case-studies/client-connect/client-connect-01-optimized.jpg': [2200, 1237],
  '/case-studies/client-connect/client-connect-02-optimized.jpg': [2200, 1252],
  '/case-studies/client-connect/client-connect-03-optimized.jpg': [2200, 1237],
  '/case-studies/digital-wallet/dwallet01-full.webp': [5120, 3328],
  '/case-studies/digital-wallet/dwallet02-full.webp': [5120, 3328],
  '/case-studies/digital-wallet/dwallet03-full.webp': [5120, 3328],
  '/case-studies/digital-wallet/dwallet04-full.webp': [5120, 3328],
  '/case-studies/digital-wallet/dwallet05-full.webp': [5120, 3328],
  '/case-studies/digital-wallet/dwallet06-full.webp': [5120, 3328],
  '/case-studies/digital-wallet/dwallet07-full.webp': [5120, 3328],
  '/case-studies/partner-collection/collections01-full.webp': [5120, 3328],
  '/case-studies/partner-collection/collections02-full.webp': [5120, 3328],
  '/case-studies/partner-collection/collections03-full.webp': [5120, 3328],
  '/case-studies/partner-collection/collections04-full.webp': [5120, 3328],
  '/case-studies/partner-collection/collections05-full.webp': [5120, 3328],
  '/case-studies/partner-collection/collections06-full.webp': [5120, 3328],
  '/case-studies/client-connect/bank01-full.webp': [5120, 3328],
  '/case-studies/client-connect/bank02-full.webp': [5120, 3328],
  '/case-studies/client-connect/bank03-full.webp': [5120, 3328],
  '/case-studies/client-connect/bank04-full.webp': [5120, 3328],
  '/case-studies/client-connect/bank05-full.webp': [5120, 3328],
  '/case-studies/connected-homes/connectedhome01-full.webp': [5120, 3328],
  '/case-studies/connected-homes/connectedhome02-full.webp': [5120, 3328],
  '/case-studies/connected-homes/connectedhome03-full.webp': [5120, 3328],
  '/case-studies/connected-homes/connectedhome04-full.webp': [5120, 3328],
  '/case-studies/soft-tagging/softtag01-full.webp': [5120, 3328],
  '/case-studies/soft-tagging/softtag02-full.webp': [5120, 3328],
  '/case-studies/soft-tagging/softtag03-full.webp': [5120, 3328],
  '/case-studies/soft-tagging/softtag04-full.webp': [5120, 3328],
  '/case-studies/aize-onshore/onshore01-full.webp': [5120, 3328],
  '/case-studies/aize-onshore/onshore02-full.webp': [5120, 3328],
  '/case-studies/aize-onshore/onshore03-full.webp': [5120, 3328],
  '/case-studies/aize-onshore/onshore04-full.webp': [5120, 3328],
  '/case-studies/integrated-tech-hub/propdev01-full.webp': [1280, 832],
  '/case-studies/integrated-tech-hub/propdev02-full.webp': [1280, 832],
  '/case-studies/integrated-tech-hub/propdev03-full.webp': [1280, 832],
  '/case-studies/integrated-tech-hub/propdev04-full.webp': [1280, 832],
  '/case-studies/soft-tagging/softtag05-full.webp': [1280, 832],
  '/case-studies/easter-egg/easteregg01-full.webp': [5120, 3328],
  '/case-studies/easter-egg/easteregg02-full.webp': [5120, 3328],
  '/case-studies/easter-egg/easteregg03-full.webp': [5120, 3328],
  '/case-studies/easter-egg/easteregg04-full.webp': [5120, 3328],
};

const addImageDimensions = (media: ProjectMedia): ProjectMedia => {
  const [width, height] = exactImageDimensions[media.src] ?? [1280, 832];
  return { ...media, width, height };
};

const projectData: Project[] = [
  {
    slug: 'digital-wallet',
    title: 'Digital Wallet',
    company: 'Adidas',
    year: '2023',
    discipline: 'Digital Product, Web3 Membership',
    focusLabels: ['Web3', 'Membership'],
    headerDescription: 'Turning digital ownership into access',
    shortDescription: 'Connected digital wallets to unlock personalised offers and member experiences.',
    extended: [
      {
        heading: 'Two communities, little overlap',
        paragraphs: [
          'Confirmed was where adidas members went for limited drops. At the same time, Web3 was booming, and adidas had a growing community of NFT holders, collectors and fans. Both groups cared about exclusive access, but they lived in different places and only a few people belonged to both.',
          'The opportunity was to bring them together. If members could connect a digital wallet to Confirmed, what they owned would unlock offers and experiences made for their community. Web3 collectors would have a reason to join Confirmed. Confirmed members would have a reason to explore Web3.',
        ],
      },
      {
        heading: 'Making Web3 feel simple',
        paragraphs: [
          'The harder side of that was the Confirmed members. Web3 can be a technical space. Members had to understand what an NFT was, how to create a wallet, connect it to Confirmed and get verified. Each step was a point where people could get lost or give up.',
          'We started with the basics. We created simple explainer pages that covered the fundamentals of Web3, down to “What is an NFT?” Members could learn at their own pace, before they were asked to do anything.',
          'Then we built on patterns people already knew. We designed the digital wallet to feel like the wallets members already used every day, such as the wallet app on iPhones.',
        ],
      },
      {
        heading: 'Multiple activations',
        paragraphs: [
          'In Q2 2023, adidas NFT holders could unlock a private product page and buy pieces from the Into the Metaverse collection. That same quarter, holders could also enter to win a Golden Ticket NFT. It guaranteed a win in any Confirmed drop they chose.',
          'In Q4 2023, ALTS by adidas holders could claim the Moncler x adidas Originals: The Explorer NFT, on a first come, first served basis.',
        ],
      },
      {
        heading: 'Bringing both communities together',
        paragraphs: [
          'Wallet connection gave Web3 collectors a reason to join Confirmed. It also introduced Confirmed members to Web3 through drops they already cared about. Each activation rewarded a specific community, and over time, the two groups began to overlap.',
        ],
      },
    ],
    outcome: [
      {
        label: 'ITM collection launch',
        period: 'Q2 2023',
        result: '100% sell-through',
      },
      {
        label: 'Golden Ticket NFT',
        period: 'Q2 2023',
        result: '11 ETH in transaction volume',
      },
      {
        label: 'The Explorer NFT',
        period: 'Q4 2023',
        result: '100% redeemed in 20 minutes',
      },
    ],
    cover: {
      type: 'image',
      src: '/case-studies/digital-wallet/dwallet01-full.webp',
      alt: 'Adidas digital collectible avatar card with Punks branding and an ETH callout',
      span: 'full',
    },
    media: [
      {
        type: 'image',
        src: '/case-studies/digital-wallet/dwallet02-full.webp',
        alt: 'Adiclub wallet profile beside an NFT verification screen with a Connect Wallet button',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/digital-wallet/dwallet03-full.webp',
        alt: 'Golden Ticket NFT draw screen with a Leave Draw button',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/digital-wallet/dwallet04-full.webp',
        alt: 'Two close-up views of grey Adidas sneakers with black stripes, styled with blue fuzzy tracksuit pants',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/digital-wallet/dwallet05-full.webp',
        alt: 'Adidas Superstar mobile product page on a comic-style campaign backdrop with a Connect in Profile link',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/digital-wallet/dwallet06-full.webp',
        alt: 'Adidas and Moncler collaboration campaign with models and sculptural looks against a blue backdrop',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/digital-wallet/dwallet07-full.webp',
        alt: 'Phone confirmation screen for The Explorer Moncler x adidas Originals NFT, featuring a blue and pink boot',
        span: 'wide',
      },
    ],
  },
  {
    slug: 'partner-collection',
    title: 'Partner Collection',
    company: 'Adidas',
    year: '2022',
    discipline: 'Digital Product, Commerce Experience',
    focusLabels: ['Mobile'],
    headerDescription: 'Designing for scarcity at scale',
    shortDescription: 'Designed a multi-product release experience with reservations.',
    extended: [
      {
        heading: 'From single drops to full collections',
        paragraphs: [
          'Confirmed was built around single-product drops. One sneaker, limited stock, gone in minutes. But the roadmap for the coming years looked different. adidas was expanding its collaborations, and many of those releases would be full collections of apparel, footwear and accessories.',
          'The question was how to sell a collection as a whole. Shoppers should be able to browse it and build a look, the way they would in any good store. But this wasn’t an ordinary store. Stock was limited, demand far exceeded supply, and every item could sell out almost instantly. We needed a shopping experience that felt complete and still protected fairness.',
        ],
      },
      {
        heading: 'A bag that holds stock',
        paragraphs: [
          'Our answer was a bag that reserves stock. When someone adds a product, it’s reserved for them for a set time, which the team can configure for each launch. If they don’t check out in time, the item becomes available to the next person.',
          'The idea came from looking at how shoppers had exploited loopholes on other platforms. On one site, people could hold stock in their cart without ever checking out. Some began reselling those reserved carts online before buying anything. In hype culture, a reservation without a limit becomes something to trade. On Confirmed, bots were already a constant threat, so fairness had to be part of the design from the start.',
        ],
      },
      {
        heading: 'The timer debate',
        paragraphs: [
          'Working closely with backend engineers, we debated whether adding an item should restart the timer. Restarting it would have helped basket size, a key metric for the business. But it would also let someone add and remove an item over and over, and hold stock forever. We decided the timer wouldn’t restart. A fair system for everyone mattered more than extra time for a few.',
        ],
      },
      {
        heading: 'One system, many identities',
        paragraphs: [
          'The last challenge was scale. Every partner wanted their collection to feel like their own, but building a new experience for each launch wouldn’t last. Instead of one-off campaign pages, we built a reusable launch system. Checkout and queue behaviour stayed the same for every launch, while the storytelling changed with each partner.',
        ],
      },
      {
        heading: 'Built for what came next',
        paragraphs: [
          'The launch framework gave every future collaboration a starting point. Partners could bring their own identity, and shoppers knew what to expect every time. Scarcity is what makes these launches exciting. Our job was to make sure it never felt unfair.',
        ],
      },
    ],
    outcome:
      'Across partner collections, launches reached around 82% sell-through. Shoppers bought 1.6 items per bag on average, about €940 per transaction.',
    cover: {
      type: 'image',
      src: '/case-studies/partner-collection/collections01-full.webp',
      alt: 'Adidas x Gucci campaign diptych featuring footwear and a black branded handbag against a red backdrop',
      span: 'full',
    },
    media: [
      {
        type: 'image',
        src: '/case-studies/partner-collection/collections02-full.webp',
        alt: 'Two mobile screens showing a collection product grid and a shoppable editorial look with product hotspots',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/partner-collection/collections03-full.webp',
        alt: 'Y-3 Palace campaign diptych showing front and back views of a white and red football jersey',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/partner-collection/collections04-full.webp',
        alt: 'Mobile Y-3 Palace product grid with a timed shopping bag over a campaign image',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/partner-collection/collections05-full.webp',
        alt: 'Diptych of fashion collaborators in a design studio and an adidas campaign portrait',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/partner-collection/collections06-full.webp',
        alt: 'Two mobile screens showing a partner collection product grid and a timed multi-item checkout bag',
        span: 'wide',
      },
    ],
  },
  {
    slug: 'easter-egg',
    title: 'Easter Egg',
    company: 'Adidas',
    year: '2022',
    discipline: 'Digital Product, Drop Experience',
    focusLabels: ['Commerce', 'Community'],
    headerDescription: 'Yeezy Day',
    shortDescription: 'Surprise drops brought exclusive releases to Yeezy Day.',
    extended: [
      {
        heading: 'A day of excitement',
        paragraphs: [
          'Yeezy Day was adidas’ annual celebration of Yeezy: a full day of restocks and exclusive releases of some of its most wanted sneakers. Releases appeared throughout the day, but adidas didn’t confirm which shoes would drop or when. The whole day became a guessing game. The community speculated, sneaker influencers livestreamed, and the uncertainty was part of the excitement.',
        ],
      },
      {
        heading: 'A day built for bots',
        paragraphs: [
          'Everyone knew shoes would drop throughout the day, including the people running bots. For the most wanted products, bot traffic was even worse than usual. Even with our environments scaled up, bots could still bring the whole app down. Instead of another technical fix, we looked at the drop itself. Bots rely on knowing what’s coming. If a drop is hidden, there’s nothing to prepare for.',
        ],
      },
      {
        heading: 'Hidden in plain sight',
        paragraphs: [
          'That became the Easter eggs. They were placed around the app, and finding one revealed an exclusive release. For the community, they added a new layer of discovery to a day that was already built on guessing. For bots, each one was a target they couldn’t see coming.',
        ],
      },
      {
        heading: 'Moments you had to catch',
        paragraphs: [
          'Once a hidden drop sold out, it was gone. The people who found the Easter eggs were the ones paying attention, not the ones with the fastest bots. That kept the community engaged between drops and gave them something to talk about.',
        ],
      },
    ],
    outcome:
      'The Easter eggs created a buzz across the sneaker community. Streamers reacted as hidden drops appeared, and members shared them across social media, many thanking adidas for giving them a fair chance against bots.',
    cover: {
      type: 'image',
      src: '/case-studies/easter-egg/easteregg01-full.webp',
      alt: 'A lineup of Yeezy footwear styles arranged across a pale background',
      span: 'full',
    },
    media: [
      {
        type: 'image',
        src: '/case-studies/easter-egg/easteregg02-full.webp',
        alt: 'A Morse code puzzle graphic with the hint: A bit left, a bit white. A bit down, a bit right.',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/easter-egg/easteregg03-full.webp',
        alt: 'Top-down close-up of a white and grey Yeezy sneaker with red accent details',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/easter-egg/easteregg04-full.webp',
        alt: 'Community posts discussing a Morse code clue beside a mobile Yeezy Foam Runner drop page',
        span: 'wide',
      },
    ],
  },
  {
    slug: 'client-connect',
    title: 'Client Connect',
    company: 'DBS',
    year: '2021',
    discipline: 'Digital Product, Banking Workbench',
    focusLabels: ['Enterprise', 'Web'],
    headerDescription: 'Designing the next best conversation',
    shortDescription: 'Designed an advisor workbench for faster access to client insights.',
    extended: [
      {
        heading: 'From cold calls to relevant conversations',
        paragraphs: [
          'Relationship managers often had to move between several systems to understand a client. So outreach tended to be a cold call with no clear reason behind it.',
          'Next Best Conversation used what the bank already knew to suggest a relevant reason to get in touch. A client who spent a lot on coffee could be invited to meet at a café. A client buying baby products might want to talk about insurance for their child. But the more relevant the suggestions became, the closer they came to a line.',
        ],
      },
      {
        heading: 'Helpful or intrusive?',
        paragraphs: [
          'A credit card statement tells a bank a lot about someone’s life. The bank has access to that data, but should it use it? The same prompt could feel thoughtful to one client and intrusive to another. Our answer was to label every insight by where it came from, so relationship managers knew how much to trust it before bringing it up.',
          'The same question followed us into how conversations were recorded.',
        ],
      },
      {
        heading: 'A relationship that stays with the bank',
        paragraphs: [
          'The bank wanted relationship managers to log more of their conversations, because every entry gave it more data and feedback on the clients it served. In retail banking, one relationship manager might look after 100 clients. In private banking, it could be five. Logging had to be quick for everyone, without recording more than a client would expect the bank to know. The more relationship managers logged, the more the relationship stayed with the bank, not only with one person.',
        ],
      },
      {
        heading: 'Knowing where the line is',
        paragraphs: [
          'Next Best Conversation gave relationship managers a reason to reach out to every client, at every level of banking. The data made those conversations relevant. Our job was to make sure they never felt intrusive.',
        ],
      },
    ],
    outcome:
      'It was featured in The Business Times, in “Empowering relationship managers with intelligent banking in a digital era”.',
    cover: {
      type: 'image',
      src: '/case-studies/client-connect/bank01-full.webp',
      alt: 'Relationship manager dashboard with suggested next steps and customer feedback controls',
      span: 'full',
    },
    media: [
      {
        type: 'image',
        src: '/case-studies/client-connect/bank02-full.webp',
        alt: 'Person using a smartphone beside a DBS sign in a modern banking space',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/client-connect/bank03-full.webp',
        alt: 'Customer engagement dashboard with interaction filters, activity records, and a conversation panel',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/client-connect/bank04-full.webp',
        alt: 'Service request workbench with a request queue, customer details, and status information',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/client-connect/bank05-full.webp',
        alt: 'The Business Times article about empowering relationship managers with intelligent banking',
        span: 'wide',
      },
    ],
  },
  {
    slug: 'aize-onshore',
    title: 'Onshore',
    company: 'Aize',
    year: '2025',
    discipline: 'Product Strategy, Market Expansion',
    focusLabels: ['Strategy', 'Enterprise'],
    headerDescription: 'Rethinking the path into a new market',
    shortDescription: 'Research shifted the focus from scaling offshore models to making scan-based facilities usable.',
    extended: [
      {
        heading: 'The initial assumption',
        paragraphs: [
          'Aize’s 3D visualisation was built for offshore facilities, using structured 3D models. When onshore operators started showing interest, it seemed natural to bring the same approach to them.',
        ],
      },
      {
        heading: 'The research',
        paragraphs: [
          'We had little access to onshore users, so we studied how onshore facilities were being digitised. We used industry trends, competitor products and internal knowledge from related areas. What we found didn’t match the assumption. Many onshore facilities had little to no structured 3D models. They relied mostly on scans.',
          'Aize already supported scans, but they were hard to use in practice. Since scans were the data onshore teams already had, making them easier to use became a product priority.',
        ],
      },
      {
        heading: 'Grounded in the field',
        paragraphs: [
          'Later, a visit to a major onshore terminal backed this up. The facility was in the middle of a large-scale scanning project, due to finish by mid-2026. The visit also showed the product and commercial teams how people on site work and plan, along with the language and KPIs that matter to them. That helped them speak to onshore operators in their own terms.',
        ],
      },
      {
        heading: 'From models to scans',
        paragraphs: [
          'The research changed where Aize started. Instead of asking onshore teams to fit Aize’s way of working, the product built on the data they already had. That gave Aize a credible way into a new market.',
        ],
      },
    ],
    outcome:
      'Aize secured its first key onshore facility in Q1 2026.',
    cover: {
      type: 'image',
      src: '/case-studies/aize-onshore/onshore01-full.webp',
      alt: 'Point cloud scan view of an industrial facility’s dense equipment and structural framework',
      span: 'full',
    },
    media: [
      {
        type: 'image',
        src: '/case-studies/aize-onshore/onshore02-full.webp',
        alt: 'Point cloud view of industrial piping with controls for point size and rendering type',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/aize-onshore/onshore03-full.webp',
        alt: 'Onshore facility process vessel and surrounding pipework',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/aize-onshore/onshore04-full.webp',
        alt: 'Close-up of onshore facility pipework, valves and pumps',
        span: 'wide',
      },
    ],
  },
  {
    slug: 'soft-tagging',
    title: 'Soft Tagging',
    company: 'Aize',
    year: '2025',
    discipline: 'Digital Product, Data Quality Workflow',
    focusLabels: ['Enterprise', 'Web'],
    headerDescription: 'Making data gaps actionable',
    shortDescription: 'Designed an in-product workflow for mapping missing data connections.',
    extended: [
      {
        heading: 'Data problems are a given',
        paragraphs: [
          'In industrial environments, data quality problems are a given. The question is what happens when users find them.',
          'Aize is a visualisation tool for complex industrial assets. Its core is a 3D view that lets teams navigate and interact with their assets digitally. But the 3D view is only as useful as the data behind it. On average, around 75% of items weren’t mapped in 3D. The item existed in the data, but it wasn’t connected to the 3D model. Worse, some items were mapped to the wrong data. Few users reported these issues, so the incorrect data stayed.',
        ],
      },
      {
        heading: 'Should Aize get involved?',
        paragraphs: [
          'This raised a question about the scope of the product. Aize isn’t a source system and doesn’t own the data. Real fixes had to happen in each client’s source system and be brought back into Aize. So there was a fair case for leaving it alone.',
          'But Aize is where users actually find the gaps, and many of them already know the answer. People with years of experience on a facility can often point to exactly where an item is, even when it isn’t mapped in 3D. That knowledge was there. Between “the data is wrong” and “the data is fixed”, there was space for the product to help. Users could keep working, client teams could see what to fix first, and every correction would benefit everyone using that dataset.',
        ],
      },
      {
        heading: 'Tagging in 3D',
        paragraphs: [
          'That became soft tagging. Users can flag a missing connection and map it themselves, directly in the 3D view. Each manual mapping goes into a list of pending mappings. From there, client teams can review the tags and export them into their own governance and correction processes.',
        ],
      },
      {
        heading: 'From dead end to contribution',
        paragraphs: [
          'Before, finding bad data was a dead end. Now users could add what they knew, and client teams had a clear list of what to fix. Every correction made the dataset better for the next person.',
        ],
      },
    ],
    outcome:
      'Adoption varied across facilities. On the most active, users created around 1,000 mappings per facility in the first three months.',
    cover: {
      type: 'image',
      src: '/case-studies/soft-tagging/softtag01-full.webp',
      alt: 'Offshore production platform, showing the industrial environment teams explore in Aize',
      span: 'full',
    },
    media: [
      {
        type: 'image',
        src: '/case-studies/soft-tagging/softtag02-full.webp',
        alt: 'Aize 3D model of an offshore facility with a junction box selected and its details open',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/soft-tagging/softtag03-full.webp',
        alt: 'Selected object in the 3D model with a context menu offering the Connect object action',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/soft-tagging/softtag04-full.webp',
        alt: 'Connect object to tag dialog with search results and a tag selected for confirmation',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/soft-tagging/softtag05-full.webp',
        alt: 'Pending Mappings panel beside the 3D facility model, with a manually mapped item selected',
        span: 'wide',
      },
    ],
  },
  {
    slug: 'connected-homes',
    title: 'Connected Homes',
    company: 'Google',
    year: '2020',
    discipline: 'Research, Service Design',
    focusLabels: ['Research'],
    headerDescription: 'Research for Google',
    shortDescription: 'Researched barriers to smart home adoption across APAC consumers.',
    extended: [
      {
        heading: 'Promise versus reality',
        paragraphs: [
          'Smart home devices were becoming more accessible and more capable, yet mainstream adoption stayed well below expectations. Google partnered with Fjord to find out why.',
          'The aim wasn’t only to measure where adoption was lagging, but to understand the human side: the worries, the habits, the trust gaps and the moments where the experience broke down. We ran diary studies across Asia-Pacific, followed by interviews to explore what came up in more depth.',
        ],
      },
      {
        heading: 'Insights',
        paragraphs: [
          'Four themes stood out. The first was fragmentation. Devices from different brands didn’t work well together, so setting them up felt unreliable. The second was value. Many people saw smart devices as a novelty rather than something that made daily life easier.',
          'The other two themes were more personal. Privacy and security concerns made people hesitate before bringing a device into their home. And in shared homes, one person’s enthusiasm rarely spread to the rest of the household. A device might be set up by one person, but it had to work for everyone living there.',
        ],
      },
    ],
    outcome:
      'Research was published in Think with Google as a three-part series.',
    cover: {
      type: 'image',
      src: '/case-studies/connected-homes/connectedhome01-full.webp',
      alt: 'Google Home speaker beside a tablet displaying a home device setup screen',
      span: 'full',
    },
    media: [
      {
        type: 'image',
        src: '/case-studies/connected-homes/connectedhome02-full.webp',
        alt: 'Three diary study app screens featuring participants’ comments and moments from their connected homes',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/connected-homes/connectedhome03-full.webp',
        alt: 'Laptop showing a Think with Google article about connected home consumer pain points, with related article panels behind it',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/connected-homes/connectedhome04-full.webp',
        alt: 'Connected Homes research report cover beside an open booklet with APAC market data and diagrams',
        span: 'wide',
      },
    ],
  },
  {
    slug: 'integrated-tech-hub',
    title: 'Integrated Tech Hub',
    isHidden: true,
    company: 'MQDC',
    year: '2021',
    discipline: 'Research, Service Design',
    focusLabels: ['Research', 'Strategy'],
    shortDescription: 'Defined the experience strategy for a mixed-use tech hub for young talent and the public.',
    summary:
      'Buildings are ultimately about people. Whether living, working, or visiting, people experience a place through the integration of its spaces, services, and everyday social interactions. With the ambition of creating a thriving mixed use destination for young tech talent and the public, MQDC partnered with Fjord to envision and define the property\'s holistic experience, shaping its strategy, physical spaces, and service offerings.',
    extended: [
      'Fjord was brought in late in the design process, with the building in its final stages of review. The physical design was nearly locked. The question was how service design could shape what the development would feel like, and whether research could still move the needle on decisions not yet finalised.',
      'Research across Singapore, Thailand, and Indonesia challenged some of the assumptions behind the brief. Tech talents didn\'t describe the environments that resonated with them through technology, they described energy. Vibrant culture, constantly changing art, dynamic spaces, community events. Technology was a given, not a differentiator. The definition of a tech talent was also broader than expected. An artist, a bartender, or a customer could have a startup on the side, and tech talents themselves actively sought perspectives from outside their own world. Designing for a narrow definition of tech talent would produce a narrower place than MQDC was aiming for.',
      'What followed from that was perhaps the most important shift. Tech talents were not an audience to impress. They were fatigued by unnecessary innovation and poorly executed features, and were far more interested in shaping the places they inhabited than consuming what had been designed for them. The development had the most to gain not by showcasing technology, but by creating the conditions for people to contribute to it over time.',
      'From there, the team mapped how different personas would move through the development, from arrival to workspaces to shared social spaces, tracing how architecture, interior, and service could connect across the full journey.',
    ],
    outcome:
      'Strategy was taken forward by MQDC as the experience vision for the development.',
    cover: {
      type: 'image',
      src: '/case-studies/integrated-tech-hub/propdev01-full.webp',
      alt: 'Glass office tower rising above a leafy street with low-rise shops and traffic',
      span: 'full',
    },
    media: [
      {
        type: 'image',
        src: '/case-studies/integrated-tech-hub/propdev02-full.webp',
        alt: 'Landscaped courtyard between glass office buildings with a Cloud 11 sign',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/integrated-tech-hub/propdev03-full.webp',
        alt: 'Elevated view of a mixed-use urban development with office buildings and rail transit',
        span: 'wide',
      },
      {
        type: 'image',
        src: '/case-studies/integrated-tech-hub/propdev04-full.webp',
        alt: 'Overhead view of a planted plaza crossed by a yellow stepped walkway',
        span: 'wide',
      },
    ],
  },
];

export const projects: Project[] = projectData.map((project) => ({
  ...project,
  cover: project.cover ? addImageDimensions(project.cover) : undefined,
  media: project.media.map(addImageDimensions),
}));

export const getProject = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug && !project.isHidden);
