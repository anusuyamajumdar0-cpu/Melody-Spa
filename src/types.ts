export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
  isPopular?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string; // Dynamic icon rendering name from Lucide
  description: string;
  services: ServiceItem[];
  image: string; // High-end Unsplash representation of this category
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string[];
  image: string;
  author: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'hair' | 'skin' | 'makeup' | 'bridal' | 'nails' | 'booking';
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  platform: 'Google' | 'Instagram';
  isVerified: boolean;
  avatar: string;
}
