import { Subscription } from '../types';

export const services: Subscription[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    icon: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Stream TV shows, movies, and more. Share a Premium plan with up to 4 friends.',
    price: 649,
    maxMembers: 4,
    features: [
      'Unlimited ad-free movies and TV shows',
      'Watch on 4 screens at once',
      'HD and Ultra HD available',
      'Download videos to watch offline',
      'Access to all content'
    ],
    category: 'streaming',
    backgroundColor: 'bg-red-600',
    popularity: 98
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    icon: 'https://images.pexels.com/photos/7383469/pexels-photo-7383469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Stream music ad-free, download for offline listening, and share with friends with a Family plan.',
    price: 179,
    maxMembers: 5,
    features: [
      'Ad-free music listening',
      'Group Sessions',
      'Download to listen offline',
      'Play songs in any order',
      'High quality audio'
    ],
    category: 'music',
    backgroundColor: 'bg-green-600',
    popularity: 95
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime',
    icon: 'https://images.pexels.com/photos/5867741/pexels-photo-5867741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Enjoy fast shipping, streaming, and exclusive deals. Share benefits with one other adult.',
    price: 299,
    maxMembers: 2,
    features: [
      'Fast, free delivery on millions of items',
      'Thousands of movies and TV shows with Prime Video',
      'Unlimited photo storage',
      'Ad-free music with Prime Music',
      'Free in-game content and games with Prime Gaming'
    ],
    category: 'shopping',
    backgroundColor: 'bg-blue-700',
    popularity: 92
  },
  {
    id: 'disney-plus',
    name: 'Disney+ Hotstar',
    icon: 'https://images.pexels.com/photos/5417664/pexels-photo-5417664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Stream Disney, Pixar, Marvel, Star Wars, and live sports. Share with up to 4 devices.',
    price: 299,
    maxMembers: 4,
    features: [
      'Unlimited ad-free movies and TV shows',
      'Download videos to watch offline',
      'Stream on 4 devices at once',
      'Access to exclusive Hotstar Specials',
      'Live sports streaming'
    ],
    category: 'streaming',
    backgroundColor: 'bg-blue-600',
    popularity: 90
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    icon: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Enjoy ad-free videos, background play, and YouTube Music. Share with up to 5 family members.',
    price: 189,
    maxMembers: 5,
    features: [
      'Ad-free experience across YouTube',
      'Background play',
      'Downloads for offline use',
      'Access to YouTube Music Premium',
      'Family sharing available'
    ],
    category: 'streaming',
    backgroundColor: 'bg-red-700',
    popularity: 85
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    icon: 'https://images.pexels.com/photos/4793305/pexels-photo-4793305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Stream 90 million songs, ad-free. Download for offline listening with a Family Membership.',
    price: 149,
    maxMembers: 5,
    features: [
      'Ad-free music streaming',
      'Download music for offline listening',
      'Original shows, concerts, and exclusives',
      'Live and on-demand radio stations',
      'Sync music across devices'
    ],
    category: 'music',
    backgroundColor: 'bg-rose-600',
    popularity: 83
  },
  {
    id: 'adobe-cc',
    name: 'Adobe Creative Cloud',
    icon: 'https://images.pexels.com/photos/5726843/pexels-photo-5726843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Access to Photoshop, Illustrator, Premier Pro, and more. Perfect for students.',
    price: 1675,
    maxMembers: 2,
    features: [
      '20+ creative desktop and mobile apps',
      '100GB of cloud storage',
      'Adobe Fonts library access',
      'Adobe Portfolio to showcase work',
      'Continuous updates to apps and features'
    ],
    category: 'productivity',
    backgroundColor: 'bg-red-800',
    popularity: 75
  },
  {
    id: 'office-365',
    name: 'Microsoft 365',
    icon: 'https://images.pexels.com/photos/5611261/pexels-photo-5611261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Access Word, Excel, PowerPoint, and more. Share with up to 5 people and get 1TB OneDrive storage.',
    price: 589,
    maxMembers: 5,
    features: [
      'Full Office suite: Word, Excel, PowerPoint, etc.',
      '1TB OneDrive cloud storage per person',
      'Share with up to 5 people',
      'Advanced security features',
      'Access across multiple devices'
    ],
    category: 'productivity',
    backgroundColor: 'bg-blue-800',
    popularity: 80
  },
  {
    id: 'zee5',
    name: 'ZEE5',
    icon: 'https://images.pexels.com/photos/5082567/pexels-photo-5082567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Watch thousands of shows, movies, and originals in multiple Indian languages.',
    price: 149,
    maxMembers: 3,
    features: [
      'Ad-free streaming of shows and movies',
      'Access to ZEE5 originals',
      'Multi-language content',
      'Watch on TV, laptop, phone, or tablet',
      'Download and watch offline'
    ],
    category: 'streaming',
    backgroundColor: 'bg-purple-700',
    popularity: 82
  }
];

export const getServiceById = (id: string): Subscription | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: Subscription['category']): Subscription[] => {
  return services.filter(service => service.category === category);
};

export const getPopularServices = (limit: number = 4): Subscription[] => {
  return [...services].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
};