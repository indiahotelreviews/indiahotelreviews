import type { JournalArticle } from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: '10-best-heritage-hotels-rajasthan',
    title: '10 Living Palaces: The Most Atmospheric Heritage Stays in Rajasthan',
    subtitle: 'From floating marble sanctuaries in Udaipur to cliffside fortresses in Jodhpur, an editorial curation of royal Rajput hospitality.',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Aditya Vardhan',
      role: 'Editorial Director, Heritage Stays',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishDate: 'February 24, 2026',
    readTime: '6 min read',
    tags: ['Heritage', 'Rajasthan', 'Luxury', 'Curated Guide'],
    excerpt: 'Rajasthan’s palaces are not mere hotels; they are living chapters of history where royal descendants still walk the marble courtyards and sunset flute melodies echo off pink sandstone walls.',
    featuredHotelIds: ['taj-lake-palace-udaipur', 'samode-haveli-jaipur'],
    body: [
      {
        type: 'paragraph',
        text: 'To sleep in a former royal residence in Rajasthan is to witness architectural genius engineered long before modern climate control and elevator shafts. Hand-chiseled jali screens diffuse desert sunshine into dancing geometric shadows, central courtyards channel cool evening breezes over scented lily ponds, and hand-painted miniature frescoes depict centuries of warrior poetry.',
      },
      {
        type: 'quote',
        text: '“In Rajasthan, hospitality is not an industry—it is an inherited ancestral code of honour dating back eight hundred years.”',
      },
      {
        type: 'subheading',
        text: 'The Floating Jewel of Mewar: Taj Lake Palace, Udaipur',
      },
      {
        type: 'paragraph',
        text: 'Constructed in 1746 by Maharana Jagat Singh II as a summer palace (Jag Niwas), this white marble marvel appears to float weightlessly on Lake Pichola. Accessible only by private hotel boat, every guest is attended to by a personal palace butler.',
      },
      {
        type: 'hotel_embed',
        hotelId: 'taj-lake-palace-udaipur',
      },
      {
        type: 'subheading',
        text: 'Intimate Urban Splendor: Samode Haveli, Jaipur',
      },
      {
        type: 'paragraph',
        text: 'Hidden behind massive wooden gates in the northern quarter of Jaipur’s walled city, Samode Haveli is an intimate 225-year-old aristocratic manor. Its signature turquoise Moorish pool, bordered by draped daybeds and blooming bougainvillea, offers absolute tranquility just minutes from Hawa Mahal.',
      },
      {
        type: 'hotel_embed',
        hotelId: 'samode-haveli-jaipur',
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'secret-beach-hideaways-south-goa',
    title: 'Beyond the Noise: Authentic Coastal Sanctuaries in Goa',
    subtitle: 'Where Portuguese tilework, whispering coconut groves, and calm Arabian tides replace crowded nightlife.',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Sneha Fernandes',
      role: 'Senior Travel Correspondent, Coastal India',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishDate: 'February 12, 2026',
    readTime: '5 min read',
    tags: ['Goa', 'Beach', 'Boutique', 'Eco-Travel'],
    excerpt: 'Goa exists in two parallel dimensions: the neon buzz of beach shacks, and the tranquil soul of shaded balcãos, cashew feni distilleries, and undiscovered coves.',
    featuredHotelIds: ['w-goa-vagator'],
    body: [
      {
        type: 'paragraph',
        text: 'For decades, discerning travelers have gravitated towards properties that respect Goa’s delicate coastal ecology. Whether it is the bold clifftop architecture of Vagator or the quiet palm-thatched serenity of sleepy fishing coves, authentic Goa is found in the stillness of dawn.',
      },
      {
        type: 'subheading',
        text: 'The Clifftop Bohemian Icon: W Goa, Vagator',
      },
      {
        type: 'paragraph',
        text: 'Perched dramatically against red laterite cliffs overlooking Vagator beach, W Goa combines bold Portuguese accents with contemporary beach vibes. Its Rock Pool remains the ultimate golden-hour vantage point in North Goa.',
      },
      {
        type: 'hotel_embed',
        hotelId: 'w-goa-vagator',
      },
    ],
  },
  {
    id: 'art-3',
    slug: 'backwater-serenity-ayurvedic-escapes-kerala',
    title: 'The Art of Slow Living: Kerala Backwaters & Himalayan Wellness',
    subtitle: 'A thoughtful exploration into India’s ancient healing philosophies and tranquil water stays.',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Dr. K. R. Namboodiri',
      role: 'Wellness & Heritage Editor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    },
    publishDate: 'January 28, 2026',
    readTime: '7 min read',
    tags: ['Kerala', 'Wellness & Spa', 'Ayurveda', 'Slow Travel'],
    excerpt: 'True luxury in the modern age is silence, clean air, unhurried time, and ancestral wisdom that reconnects body and mind.',
    featuredHotelIds: ['ananda-in-the-himalayas', 'kumarakom-lake-resort-kerala'],
    body: [
      {
        type: 'paragraph',
        text: 'In a world dominated by constant notifications and screen fatigue, India’s traditional wellness institutions offer genuine refuge. Here, physicians treat the root cause rather than superficial symptoms, and nature provides the medicine.',
      },
      {
        type: 'subheading',
        text: 'Himalayan Spiritual Renewal: Ananda in the Himalayas',
      },
      {
        type: 'paragraph',
        text: 'Overlooking Rishikesh and the holy Ganges, Ananda sits in a 100-acre palace estate. It integrates classical Ayurveda, daily yoga, and personalized nutrition into an unforgettable rejuvenating experience.',
      },
      {
        type: 'hotel_embed',
        hotelId: 'ananda-in-the-himalayas',
      },
      {
        type: 'subheading',
        text: 'Floating Canals & Ancestral Manas: Kumarakom Lake Resort',
      },
      {
        type: 'paragraph',
        text: 'Situated on the tranquil banks of Vembanad Lake, this resort reconstructed 16th-century traditional wooden homes with modern luxury and a meandering pool running through the villas.',
      },
      {
        type: 'hotel_embed',
        hotelId: 'kumarakom-lake-resort-kerala',
      },
    ],
  },
];
