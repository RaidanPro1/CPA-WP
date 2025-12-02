
export type Language = 'ar' | 'en';

export interface User {
  id: string;
  username: string;
  password?: string; // Only used for creation/auth checks
  role: 'admin' | 'donor' | 'staff';
  name: string;
}

export interface Product {
  id: number;
  code: string;
  nameAr: string;
  nameEn: string;
  price: number; // Official Price
  unit: string;
  lastUpdated: string;
  category: string;
}

export interface SlideData {
  id: number;
  image: string;
  titleKey: string;
  subKey: string;
  color: string;
}

export interface ServiceItem {
  icon: 'search' | 'balance' | 'bullhorn';
  titleKey: string;
  descKey: string;
}

export interface RightItem {
  id: string;
  icon: 'time' | 'tag' | 'invoice' | 'alert';
  questionKey: string;
  answerKey: string;
}

export interface Publication {
  id: number;
  type: 'pdf' | 'excel';
  titleKey: string;
  size: string;
  url: string;
}

export interface DashboardStat {
  value: string;
  labelKey: string;
  color: string;
}

export interface NewsItem {
  id: number;
  titleKey: string; // Keep for translation fallback
  titleAr?: string; // Dynamic content
  titleEn?: string; // Dynamic content
  descKey: string; // Keep for translation fallback
  descAr?: string; // Dynamic content
  descEn?: string; // Dynamic content
  date: string;
  image: string;
}

export interface JobOpportunity {
  id: number;
  titleAr: string;
  titleEn: string;
  type: 'Full-time' | 'Part-time' | 'Volunteer';
  location: string;
  descriptionAr: string;
  descriptionEn: string;
  deadline: string;
  postedDate: string;
}

export interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  captionAr: string;
  captionEn: string;
  date: string;
}

export interface OrganizationProfile {
  missionAr: string;
  missionEn: string;
  visionAr: string;
  visionEn: string;
  aboutAr: string;
  aboutEn: string;
  phone: string;
  email: string;
  addressAr: string;
  addressEn: string;
}

export interface CiviCRMStats {
  totalDonors: number;
  activeProjects: number;
  totalDonations: number;
  lastSync: string;
}

export interface ViolationReport {
  id: string;
  productCode?: string;
  productName?: string;
  officialPrice?: number;
  reportedPrice: number;
  shopName?: string;
  location: {
    lat: number;
    lng: number;
  } | null;
  description: string;
  aiAnalysis?: string; // From Gemini
  status: 'pending' | 'reviewed' | 'resolved';
  timestamp: string;
  evidenceImage?: string; // Base64 or URL
}

export interface Partner {
  id: number;
  nameAr: string;
  nameEn: string;
  logo: string;
}

export interface CurrencyRate {
  currency: string;
  buy: number;
  sell: number;
  indicator: 'up' | 'down' | 'stable';
}

export interface Translation {
  [key: string]: {
    ar: string;
    en: string;
  };
}
