// Backend-driven data structure for Pavilion Sports catalog site

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
  order: number;
  active: boolean;
  seoTitle?: string;
  seoDescription?: string;
  sportType?: 'team' | 'individual' | 'fitness' | 'indoor' | 'apparel';
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  featured: boolean;
  active: boolean;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandId: string;
  categoryId: string;
  subcategoryId?: string;
  mrp: number;
  offlinePrice?: number;
  description: string;
  specifications?: { label: string; value: string }[];
  features?: string[];
  images: string[];
  availableInStore: boolean;
  inStock: boolean;
  sku: string;
  featured?: boolean;
  newArrival?: boolean;
  active: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  order: number;
  active: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  company?: string;
  rating: number;
  content: string;
  date: string;
  avatar?: string;
  featured: boolean;
  active: boolean;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage: string;
  order: number;
  active: boolean;
}

export interface MediaItem {
  id: string;
  albumId: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
  caption?: string;
  order: number;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  active: boolean;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  lastUpdated: string;
  active: boolean;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string[];
  whatsapp?: string;
  email: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  mapUrl: string;
  mapEmbedUrl: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  footerText: string;
  copyrightText: string;
  googleAnalyticsId?: string;
  microsoftClarityId?: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export interface B2BUser {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  gstin?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: 'pending' | 'approved' | 'rejected';
  registeredDate: string;
}

export interface B2BOrder {
  id: string;
  orderNumber: string;
  userId: string;
  items: {
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'ready' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// MOCK DATA - In production, this would come from backend API

// Categories
export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Cricket', 
    slug: 'cricket', 
    description: 'Complete range of cricket equipment from leading brands',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400',
    order: 1, 
    active: true,
    seoTitle: 'Cricket Equipment | Bats, Balls & Accessories',
    seoDescription: 'Shop premium cricket equipment including English willow bats, leather balls, protective gear and accessories from top brands.',
    sportType: 'team'
  },
  { id: '2', name: 'Football', slug: 'football', description: 'Professional football equipment and gear', order: 2, active: true, sportType: 'team' },
  { id: '3', name: 'Badminton', slug: 'badminton', description: 'Rackets, shuttlecocks and badminton accessories', order: 3, active: true, sportType: 'individual' },
  { id: '4', name: 'Table Tennis', slug: 'table-tennis', description: 'Tables, rackets, balls and accessories', order: 4, active: true, sportType: 'individual' },
  { id: '5', name: 'Tennis', slug: 'tennis', description: 'Tennis rackets, balls and court equipment', order: 5, active: true, sportType: 'individual' },
  { id: '6', name: 'Hockey', slug: 'hockey', description: 'Hockey sticks, balls and protective gear', order: 6, active: true, sportType: 'team' },
  { id: '7', name: 'Volleyball', slug: 'volleyball', description: 'Volleyballs, nets and training equipment', order: 7, active: true, sportType: 'team' },
  { id: '8', name: 'Basketball', slug: 'basketball', description: 'Basketballs, hoops and training aids', order: 8, active: true, sportType: 'team' },
  { id: '9', name: 'Fitness Equipment', slug: 'fitness', description: 'Gym equipment and fitness accessories', order: 9, active: true, sportType: 'fitness' },
  { id: '10', name: 'Sports Apparel', slug: 'apparel', description: 'Sports clothing and footwear', order: 10, active: true, sportType: 'apparel' },
];

// Subcategories
export const subcategories: Category[] = [
  { id: '1-1', name: 'English Willow Bats', slug: 'english-willow-bats', parentId: '1', order: 1, active: true },
  { id: '1-2', name: 'Kashmir Willow Bats', slug: 'kashmir-willow-bats', parentId: '1', order: 2, active: true },
  { id: '1-3', name: 'Cricket Balls', slug: 'cricket-balls', parentId: '1', order: 3, active: true },
  { id: '1-4', name: 'Batting Gloves', slug: 'batting-gloves', parentId: '1', order: 4, active: true },
  { id: '1-5', name: 'Batting Pads', slug: 'batting-pads', parentId: '1', order: 5, active: true },
  { id: '1-6', name: 'Helmets', slug: 'helmets', parentId: '1', order: 6, active: true },
  { id: '1-7', name: 'Cricket Kits', slug: 'cricket-kits', parentId: '1', order: 7, active: true },
  { id: '1-8', name: 'Cricket Bags', slug: 'cricket-bags', parentId: '1', order: 8, active: true },
  { id: '1-9', name: 'Wicket Keeping', slug: 'wicket-keeping', parentId: '1', order: 9, active: true },
  { id: '1-10', name: 'Practice Nets', slug: 'practice-nets', parentId: '1', order: 10, active: true },
];

// Brands
export const brands: Brand[] = [
  { id: 'sg', name: 'SG', slug: 'sg', description: 'Sanspareils Greenlands - Premium cricket equipment since 1931', featured: true, active: true, order: 1 },
  { id: 'mrf', name: 'MRF', slug: 'mrf', description: 'MRF - The Pace Foundation', featured: true, active: true, order: 2 },
  { id: 'ss', name: 'SS', slug: 'ss', description: 'Sareen Sports Industries - Sunridges', featured: true, active: true, order: 3 },
  { id: 'kookaburra', name: 'Kookaburra', slug: 'kookaburra', description: 'Australian cricket excellence since 1890', featured: true, active: true, order: 4 },
  { id: 'gray-nicolls', name: 'Gray-Nicolls', slug: 'gray-nicolls', description: 'Heritage cricket brand from England', featured: true, active: true, order: 5 },
  { id: 'dsc', name: 'DSC', slug: 'dsc', description: 'Premium cricket equipment', featured: true, active: true, order: 6 },
  { id: 'adidas', name: 'Adidas', slug: 'adidas', description: 'Global sports brand', featured: true, active: true, order: 7 },
  { id: 'nike', name: 'Nike', slug: 'nike', description: 'Just Do It', featured: true, active: true, order: 8 },
  { id: 'puma', name: 'Puma', slug: 'puma', description: 'Forever Faster', featured: false, active: true, order: 9 },
  { id: 'yonex', name: 'Yonex', slug: 'yonex', description: 'Badminton and tennis specialist', featured: false, active: true, order: 10 },
];

// Banners
export const banners: Banner[] = [
  {
    id: 'b1',
    title: 'India\'s Most Trusted Sports Equipment Store',
    subtitle: 'Since 1988',
    description: 'Authentic products, expert guidance, and unbeatable service',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600',
    ctaText: 'Explore Products',
    ctaLink: '/category/cricket',
    order: 1,
    active: true,
  },
  {
    id: 'b2',
    title: 'Premium Cricket Equipment',
    subtitle: 'Largest Collection in India',
    description: 'From English Willow bats to professional gear',
    image: 'https://images.unsplash.com/photo-1593766787879-e8c78e09cec5?w=1600',
    ctaText: 'View Cricket Range',
    ctaLink: '/category/cricket',
    order: 2,
    active: true,
  },
];

// Products
export const products: Product[] = [
  {
    id: 'p1',
    name: 'SG RSD Xtreme English Willow Cricket Bat',
    slug: 'sg-rsd-xtreme-english-willow',
    brand: 'SG',
    brandId: 'sg',
    categoryId: '1',
    subcategoryId: '1-1',
    mrp: 16999,
    offlinePrice: 15499,
    sku: 'SG-BAT-EW-001',
    description: 'Premium Grade 1 English Willow cricket bat with traditional profile. Hand-crafted for professional players.',
    specifications: [
      { label: 'Wood Type', value: 'Grade 1 English Willow' },
      { label: 'Weight', value: '1150-1200 grams' },
      { label: 'Handle', value: 'Premium Cane Handle' },
      { label: 'Grains', value: '12-15 straight grains' },
      { label: 'Edge', value: '38-42mm' },
      { label: 'Spine', value: '60-65mm' },
    ],
    features: [
      'Hand-selected premium English willow',
      'Traditional full profile for maximum power',
      'Perfectly balanced pick-up',
      'Suitable for all formats',
      'Pre-knocked and ready to play',
    ],
    images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800'],
    availableInStore: true,
    inStock: true,
    featured: true,
    newArrival: false,
    active: true,
  },
  {
    id: 'p2',
    name: 'MRF Genius Grand Edition Cricket Bat',
    slug: 'mrf-genius-grand-edition',
    brand: 'MRF',
    brandId: 'mrf',
    categoryId: '1',
    subcategoryId: '1-1',
    mrp: 24999,
    offlinePrice: 22999,
    sku: 'MRF-BAT-EW-002',
    description: 'The legendary MRF Genius bat used by international cricketers. Premium quality with exceptional performance.',
    specifications: [
      { label: 'Wood Type', value: 'Premium English Willow' },
      { label: 'Weight', value: '1140-1190 grams' },
      { label: 'Profile', value: 'Mid to Low Sweet Spot' },
      { label: 'Edges', value: '40-45mm' },
      { label: 'Spine', value: '65-68mm' },
    ],
    features: [
      'Used by top international players',
      'Massive sweet spot',
      'Thick edges for power hitting',
      'Premium grade willow',
      'Professional performance',
    ],
    images: ['https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800'],
    availableInStore: true,
    inStock: true,
    featured: true,
    newArrival: true,
    active: true,
  },
  {
    id: 'p3',
    name: 'SS TON Reserve Edition English Willow Bat',
    slug: 'ss-ton-reserve-edition',
    brand: 'SS',
    brandId: 'ss',
    categoryId: '1',
    subcategoryId: '1-1',
    mrp: 18999,
    offlinePrice: 17499,
    sku: 'SS-BAT-EW-003',
    description: 'SS TON Reserve Edition - Premium English willow bat for serious cricketers.',
    images: ['https://images.unsplash.com/photo-1593766787879-e8c78e09cec5?w=800'],
    availableInStore: true,
    inStock: true,
    featured: true,
    active: true,
  },
  {
    id: 'p4',
    name: 'SG Test Cricket Leather Ball (Red) - Pack of 6',
    slug: 'sg-test-cricket-ball-red',
    brand: 'SG',
    brandId: 'sg',
    categoryId: '1',
    subcategoryId: '1-3',
    mrp: 3299,
    offlinePrice: 2999,
    sku: 'SG-BALL-001',
    description: 'Professional grade leather cricket ball for match and practice.',
    images: ['https://images.unsplash.com/photo-1509693894271-e9f8f6977e4d?w=800'],
    availableInStore: true,
    inStock: true,
    featured: false,
    active: true,
  },
  {
    id: 'p5',
    name: 'SG Optipro Batting Gloves',
    slug: 'sg-optipro-batting-gloves',
    brand: 'SG',
    brandId: 'sg',
    categoryId: '1',
    subcategoryId: '1-4',
    mrp: 2499,
    offlinePrice: 2199,
    sku: 'SG-GLV-001',
    description: 'Premium batting gloves with superior protection and grip.',
    specifications: [
      { label: 'Material', value: 'Premium Leather Palm' },
      { label: 'Protection', value: 'High-density foam' },
      { label: 'Finger', value: 'Reinforced protection' },
    ],
    features: [
      'Excellent grip and feel',
      'Superior protection',
      'Comfortable fit',
      'Sweat-absorbent',
    ],
    images: ['https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?w=800'],
    availableInStore: true,
    inStock: true,
    featured: false,
    active: true,
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    author: 'Rajesh Kumar',
    role: 'State Level Cricketer',
    rating: 5,
    content: 'Pavilion Sports has been my go-to store for cricket equipment for over 5 years. Their expertise in bat selection is unmatched. The staff really understands the nuances of cricket gear.',
    date: '2024-11-20',
    featured: true,
    active: true,
  },
  {
    id: 't2',
    author: 'Amit Sharma',
    role: 'Cricket Academy Owner',
    company: 'Champions Cricket Academy',
    rating: 5,
    content: 'We have been sourcing all our academy equipment from Pavilion Sports since 2015. Authentic products, competitive pricing, and excellent service. Highly recommended for bulk orders.',
    date: '2024-11-15',
    featured: true,
    active: true,
  },
  {
    id: 't3',
    author: 'Priya Mehta',
    role: 'Sports Coordinator',
    company: 'Delhi Public School',
    rating: 5,
    content: 'Pavilion Sports has been our trusted partner for all sports equipment needs. Their product knowledge and after-sales support is exceptional. Best sports store in Bangalore!',
    date: '2024-11-10',
    featured: true,
    active: true,
  },
];

// Gallery Albums
export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'album1',
    name: 'Store Showcase',
    slug: 'store-showcase',
    description: 'Inside our flagship sports equipment store',
    coverImage: 'https://images.unsplash.com/photo-1593766787879-e8c78e09cec5?w=800',
    order: 1,
    active: true,
  },
  {
    id: 'album2',
    name: 'Cricket Collection',
    slug: 'cricket-collection',
    description: 'Our extensive range of cricket equipment',
    coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    order: 2,
    active: true,
  },
  {
    id: 'album3',
    name: 'Events & Launches',
    slug: 'events-launches',
    description: 'Product launches and customer events',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    order: 3,
    active: true,
  },
];

// Gallery Media
export const galleryMedia: MediaItem[] = [
  { id: 'g1', albumId: 'album1', type: 'image', url: 'https://images.unsplash.com/photo-1593766787879-e8c78e09cec5?w=1200', title: 'Store Interior', order: 1 },
  { id: 'g2', albumId: 'album1', type: 'image', url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1200', title: 'Product Display', order: 2 },
  { id: 'g3', albumId: 'album2', type: 'image', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200', title: 'Cricket Bats', order: 1 },
  { id: 'g4', albumId: 'album3', type: 'image', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200', title: 'Product Launch', order: 1 },
];

// Jobs
export const jobs: Job[] = [
  {
    id: 'job1',
    title: 'Sales Executive - Cricket Equipment',
    slug: 'sales-executive-cricket',
    department: 'Sales',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '2-5 years',
    description: 'We are looking for a passionate cricket enthusiast with sales experience to join our team.',
    requirements: [
      '2+ years of retail/sales experience',
      'Strong knowledge of cricket equipment',
      'Excellent communication skills',
      'Customer service oriented',
    ],
    responsibilities: [
      'Assist customers in product selection',
      'Maintain product knowledge',
      'Achieve sales targets',
      'Build customer relationships',
    ],
    postedDate: '2024-12-01',
    active: true,
  },
];

// CMS Pages
export const cmsPages: CMSPage[] = [
  {
    id: 'privacy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: '<h2>Privacy Policy</h2><p>At Pavilion Sports, we value your privacy...</p>',
    metaTitle: 'Privacy Policy - Pavilion Sports',
    metaDescription: 'Privacy policy for Pavilion Sports',
    lastUpdated: '2024-11-01',
    active: true,
  },
  {
    id: 'terms',
    slug: 'terms-conditions',
    title: 'Terms and Conditions',
    content: '<h2>Terms and Conditions</h2><p>By using this website, you agree to our terms...</p>',
    metaTitle: 'Terms and Conditions - Pavilion Sports',
    metaDescription: 'Terms and conditions for using Pavilion Sports website',
    lastUpdated: '2024-11-01',
    active: true,
  },
];

// Store Info
export const storeInfo: StoreInfo = {
  name: 'Pavilion Sports',
  tagline: 'Your Trusted Sports Equipment Partner Since 1988',
  address: 'No. 123, MG Road, Commercial Street',
  city: 'Bangalore',
  state: 'Karnataka',
  pincode: '560001',
  country: 'India',
  phone: ['+91 80 2345 6789', '+91 98765 43210'],
  whatsapp: '+91 98765 43210',
  email: 'info@pavilionsports.com',
  workingHours: {
    weekdays: '10:00 AM - 8:00 PM',
    saturday: '10:00 AM - 8:00 PM',
    sunday: '11:00 AM - 6:00 PM',
  },
  mapUrl: 'https://maps.google.com',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
  socialMedia: {
    facebook: 'https://facebook.com/pavilionsports',
    instagram: 'https://instagram.com/pavilionsports',
    twitter: 'https://twitter.com/pavilionsports',
    youtube: 'https://youtube.com/pavilionsports',
  },
};

// Site Settings
export const siteSettings: SiteSettings = {
  siteName: 'Pavilion Sports',
  logo: '/logo.png',
  favicon: '/favicon.ico',
  primaryColor: '#1e40af',
  secondaryColor: '#3b82f6',
  footerText: 'India\'s most trusted sports equipment retailer since 1988',
  copyrightText: '© 1988-2024 Pavilion Sports. All rights reserved.',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  microsoftClarityId: 'CLARITY_ID',
  metaTitle: 'Pavilion Sports - Premium Sports Equipment Store | Since 1988',
  metaDescription: 'India\'s leading sports equipment retailer offering cricket, football, badminton, and all sports gear. Authentic products from top brands with expert guidance.',
  metaKeywords: ['sports equipment', 'cricket bat', 'sports store bangalore', 'authentic sports gear'],
};

// Helper functions
export const getCategoryWithSubcategories = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId && c.active);
  const subs = subcategories.filter(s => s.parentId === categoryId && s.active).sort((a, b) => a.order - b.order);
  return { category, subcategories: subs };
};

export const getProductsByBrand = (brandId: string) => {
  return products.filter(p => p.brandId === brandId && p.active);
};

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(p => p.categoryId === categoryId && p.active);
};

export const getProductsBySubcategory = (subcategoryId: string) => {
  return products.filter(p => p.subcategoryId === subcategoryId && p.active);
};

export const getFeaturedProducts = () => {
  return products.filter(p => p.featured && p.active);
};

export const getNewArrivals = () => {
  return products.filter(p => p.newArrival && p.active);
};

export const getFeaturedBrands = () => {
  return brands.filter(b => b.featured && b.active).sort((a, b) => a.order - b.order);
};