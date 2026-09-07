export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  image: string;
  hotelCount: number;
  reviewCount: number;
  popularCategories: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun-drenched beaches, Portuguese villas & coastal serenity',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 342,
    reviewCount: 4890,
    popularCategories: ['Beach Resort', 'Boutique', 'Luxury', 'Couple-Friendly'],
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'Royal courtyards, pink sandstone & living palace heritage',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 280,
    reviewCount: 3950,
    popularCategories: ['Heritage', 'Luxury', 'Boutique', 'Family-Friendly'],
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    tagline: 'Lakeside palaces, marble arches & Mewari grandeur',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 195,
    reviewCount: 3120,
    popularCategories: ['Heritage', 'Luxury', 'Couple-Friendly', 'Wellness & Spa'],
  },
  {
    id: 'kerala',
    name: 'Kerala Backwaters & Munnar',
    state: 'Kerala',
    tagline: 'Tranquil canals, misty tea hills & Ayurvedic retreats',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 240,
    reviewCount: 3410,
    popularCategories: ['Wellness & Spa', 'Resort', 'Homestay', 'Couple-Friendly'],
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'Harbour views, iconic art deco & vibrant cosmopolitan energy',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 410,
    reviewCount: 6180,
    popularCategories: ['Luxury', 'Business', 'Boutique', 'Couple-Friendly'],
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Palatial garden sanctuaries & modern luxury in the tech capital',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 360,
    reviewCount: 5240,
    popularCategories: ['Business', 'Luxury', 'Boutique', 'Pet-Friendly'],
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh & Uttarakhand',
    state: 'Uttarakhand',
    tagline: 'Ganges riverfront havens, yoga retreats & Himalayan vistas',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 160,
    reviewCount: 2310,
    popularCategories: ['Wellness & Spa', 'Mountain Retreat', 'Homestay'],
  },
  {
    id: 'manali',
    name: 'Manali & Himachal',
    state: 'Himachal Pradesh',
    tagline: 'Cedar pine forests, snowy peaks & cozy mountain chalets',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 190,
    reviewCount: 2890,
    popularCategories: ['Mountain Retreat', 'Homestay', 'Couple-Friendly'],
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'Nizami opulence, hill palazzos & culinary landmarks',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 220,
    reviewCount: 3100,
    popularCategories: ['Heritage', 'Luxury', 'Business'],
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi',
    tagline: 'Lutyens boulevards, grand ballrooms & culinary institutions',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    hotelCount: 490,
    reviewCount: 7120,
    popularCategories: ['Luxury', 'Business', 'Heritage', 'Boutique'],
  },
];

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Kerala',
  'Tamil Nadu',
  'Goa',
  'Maharashtra',
  'Rajasthan',
  'Gujarat',
  'Delhi',
  'West Bengal',
  'Himachal Pradesh',
  'Uttarakhand',
  'Jammu & Kashmir',
  'Odisha',
  'Punjab',
  'Madhya Pradesh',
  'Uttar Pradesh',
];
