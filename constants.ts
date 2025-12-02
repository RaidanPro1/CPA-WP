
import { Product, NewsItem, Translation, JobOpportunity, MediaItem, OrganizationProfile, CiviCRMStats, SlideData, ServiceItem, RightItem, Publication, DashboardStat, User, Partner, CurrencyRate } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin',
    name: 'System Administrator'
    // Password checked in logic: Raidan@772662106
  },
  {
    id: '2',
    username: 'donor',
    role: 'donor',
    name: 'Partner Organization'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 1, code: "6291001", nameAr: "حليب ممتاز (1 لتر)", nameEn: "Premium Milk (1L)", price: 850, unit: "Bottle", lastUpdated: "2023-10-25", category: "Dairy" },
  { id: 2, code: "6291002", nameAr: "أرز بسمتي (5 كجم)", nameEn: "Basmati Rice (5kg)", price: 6500, unit: "Bag", lastUpdated: "2023-10-24", category: "Grains" },
  { id: 3, code: "6291003", nameAr: "دقيق أبيض (10 كجم)", nameEn: "White Flour (10kg)", price: 4200, unit: "Bag", lastUpdated: "2023-10-26", category: "Grains" },
  { id: 4, code: "6291004", nameAr: "زيت طهي (1.5 لتر)", nameEn: "Cooking Oil (1.5L)", price: 2100, unit: "Bottle", lastUpdated: "2023-10-20", category: "Oils" },
  { id: 5, code: "6291005", nameAr: "سكر أبيض (2 كجم)", nameEn: "White Sugar (2kg)", price: 1800, unit: "Packet", lastUpdated: "2023-10-22", category: "Sugar" },
  { id: 6, code: "6291006", nameAr: "أسطوانة غاز منزلي", nameEn: "Cooking Gas Cylinder", price: 7500, unit: "Cylinder", lastUpdated: "2023-10-27", category: "Energy" },
];

export const SLIDES: SlideData[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1920&q=80',
    titleKey: 'heroTitle1',
    subKey: 'heroSub1',
    color: 'bg-primary/85'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&w=1920&q=80',
    titleKey: 'heroTitle2',
    subKey: 'heroSub2',
    color: 'bg-secondary/80'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80',
    titleKey: 'heroTitle3',
    subKey: 'heroSub3',
    color: 'bg-accent/80'
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80",
    date: "11 Nov 2025",
    titleKey: "news_school_title",
    titleAr: "ترحيب بقرار تخفيض الرسوم الدراسية",
    titleEn: "Welcoming School Fees Reduction",
    descKey: "news_school_desc",
    descAr: "رحبت جمعية حماية المستهلك بمحافظة تعز بقرار المحافظ رقم (137) لسنة 2025م، القاضي بتحديد وتخفيض الرسوم الدراسية في مدارس التعليم الأهلي والخاص بالمحافظة للعام الدراسي 2025–2026م.",
    descEn: "CPA welcomes Governor Decree (137) to reduce private school fees, a major step for parents' rights."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    date: "02 Aug 2025",
    titleKey: "news_campaign_title",
    titleAr: "حملة ميدانية لضبط الأسعار",
    titleEn: "Field Campaign for Price Control",
    descKey: "news_campaign_desc",
    descAr: "خرجت صباح اليوم سبع لجان ميدانية تابعة لمكتب الصناعة والتجارة بمحافظة تعز، بالتعاون مع الأجهزة الأمنية، لتنفيذ حملة تفتيش ميدانية تستهدف ضبط المخالفين.",
    descEn: "Seven field committees inspected markets to enforce prices after currency appreciation, with CPA logistical support."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80",
    date: "01 Sep 2025",
    titleKey: "news_food_title",
    titleAr: "تحذير بشأن الوجبات الجاهزة",
    titleEn: "Warning: Ready-made Meals",
    descKey: "news_food_desc",
    descAr: "تؤكد جمعية حماية المستهلك – تعز على المواطنين الحذر والترقب وضرورة الحرص عند شراء المخبوزات أو الوجبات الجاهزة والدواجن المشوية.",
    descEn: "CPA urges caution when buying baked goods/poultry, checking weights/hygiene, and reporting violations."
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  { icon: 'search', titleKey: 'srv_1_title', descKey: 'srv_1_desc' },
  { icon: 'balance', titleKey: 'srv_2_title', descKey: 'srv_2_desc' },
  { icon: 'bullhorn', titleKey: 'srv_3_title', descKey: 'srv_3_desc' },
];

export const RIGHTS_DATA: RightItem[] = [
  { id: 'r1', icon: 'time', questionKey: 'q_return', answerKey: 'a_return' },
  { id: 'r2', icon: 'tag', questionKey: 'q_price', answerKey: 'a_price' },
  { id: 'r3', icon: 'invoice', questionKey: 'q_invoice', answerKey: 'a_invoice' },
  { id: 'r4', icon: 'alert', questionKey: 'q_fraud', answerKey: 'a_fraud' },
];

export const PUBLICATIONS_DATA: Publication[] = [
  { id: 1, type: 'pdf', titleKey: 'pub_1_name', size: '2.5 MB', url: '#' },
  { id: 2, type: 'pdf', titleKey: 'pub_2_name', size: '5.1 MB', url: '#' },
  { id: 3, type: 'excel', titleKey: 'pub_3_name', size: '1.0 MB', url: '#' },
];

export const DASHBOARD_STATS: DashboardStat[] = [
  { value: '1,250+', labelKey: 'stat_reports', color: 'bg-red-500' },
  { value: '98%', labelKey: 'stat_resolved', color: 'bg-green-500' },
  { value: '500+', labelKey: 'stat_inspections', color: 'bg-blue-500' },
];

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: 1,
    titleAr: "محامي قضايا تجارية",
    titleEn: "Commercial Lawyer",
    type: "Part-time",
    location: "Taiz City",
    descriptionAr: "مطلوب محامي ذو خبرة في القوانين التجارية اليمنية لتمثيل الجمعية في قضايا حماية المستهلك.",
    descriptionEn: "Seeking an experienced lawyer in Yemeni commercial laws to represent the association in consumer protection cases.",
    deadline: "2023-12-30",
    postedDate: "2023-11-01"
  },
  {
    id: 2,
    titleAr: "متطوع ميداني - رصد أسعار",
    titleEn: "Field Volunteer - Price Monitoring",
    type: "Volunteer",
    location: "Al-Qahira District",
    descriptionAr: "نبحث عن شباب متحمسين للمساعدة في رصد أسعار السلع الأساسية بشكل دوري.",
    descriptionEn: "We are looking for enthusiastic youth to help monitor basic commodity prices regularly.",
    deadline: "Open",
    postedDate: "2023-11-05"
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { 
    id: 1, 
    type: 'video', 
    url: 'https://images.unsplash.com/photo-1541818869156-d3d134141542?auto=format&fit=crop&w=800&q=80', 
    captionAr: 'تصريح رئيس الجمعية في قناة تعز تايم', 
    captionEn: 'Association President Statement', 
    date: '2025-08-02' 
  },
  { 
    id: 2, 
    type: 'image', 
    url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80', 
    captionAr: 'اجتماع مناقشة الرسوم الدراسية', 
    captionEn: 'School Fees Discussion Meeting', 
    date: '2025-11-10' 
  },
  { 
    id: 3, 
    type: 'image', 
    url: 'https://images.unsplash.com/photo-1626125345510-470304d4150c?auto=format&fit=crop&w=800&q=80', 
    captionAr: 'وقفة احتجاجية: الدواء خدمة لا سلعة', 
    captionEn: 'Protest: Medicine is a service, not a commodity', 
    date: '2025-09-01' 
  },
];

export const INITIAL_PROFILE: OrganizationProfile = {
  missionAr: "حماية حقوق المستهلك في الحصول على سلع وخدمات آمنة وبأسعار عادلة، وتعزيز الوعي الاستهلاكي في المجتمع.",
  missionEn: "Protecting consumer rights to access safe goods and services at fair prices, and promoting consumer awareness in society.",
  visionAr: "أن نكون الصوت الأول والمدافع الأقوى عن حقوق المستهلك في الجمهورية اليمنية.",
  visionEn: "To be the leading voice and strongest defender of consumer rights in the Republic of Yemen.",
  aboutAr: "جمعية حماية المستهلك - تعز، هي منظمة مجتمع مدني غير ربحية، تأسست وفقاً لقانون الجمعيات والمؤسسات الأهلية، وتعمل بموجب قانون حماية المستهلك اليمني رقم (46) لسنة 2008.",
  aboutEn: "Consumer Protection Association - Taiz is a non-profit civil society organization, established under the Law of Associations and Foundations, operating under the Yemeni Consumer Protection Law No. (46) of 2008.",
  phone: "+967 4 123456",
  email: "info@cpa-ye.org",
  addressAr: "شارع جمال، تعز، الجمهورية اليمنية",
  addressEn: "Gamal Street, Taiz, Republic of Yemen"
};

export const MOCK_CRM_STATS: CiviCRMStats = {
  totalDonors: 145,
  activeProjects: 12,
  totalDonations: 2500000, // YR
  lastSync: "2023-11-10 09:30 AM"
};

export const PARTNERS_DATA: Partner[] = [
  { id: 1, nameAr: "وزارة الصناعة والتجارة", nameEn: "Ministry of Industry & Trade", logo: "https://via.placeholder.com/150?text=MOIT" },
  { id: 2, nameAr: "الغرفة التجارية - تعز", nameEn: "Taiz Chamber of Commerce", logo: "https://via.placeholder.com/150?text=COC" },
  { id: 3, nameAr: "برنامج الأمم المتحدة الإنمائي", nameEn: "UNDP", logo: "https://via.placeholder.com/150?text=UNDP" },
  { id: 4, nameAr: "منظمة الصحة العالمية", nameEn: "WHO", logo: "https://via.placeholder.com/150?text=WHO" },
];

export const CURRENCY_RATES: CurrencyRate[] = [
  { currency: "USD", buy: 1650, sell: 1660, indicator: 'stable' },
  { currency: "SAR", buy: 435, sell: 438, indicator: 'up' },
];

export const TEXTS: Translation = {
  brandName: { ar: "جمعية حماية المستهلك", en: "CPA - Taiz" },
  home: { ar: "الرئيسية", en: "Home" },
  news: { ar: "الأخبار", en: "News" },
  library: { ar: "المكتبة", en: "Gallery" },
  prices: { ar: "الأسعار", en: "Prices" },
  report: { ar: "بلغ عن مخالفة", en: "Report Violation" },
  admin: { ar: "لوحة التحكم", en: "Admin Panel" },
  careers: { ar: "الوظائف", en: "Careers" },
  about: { ar: "من نحن", en: "About Us" },
  
  heroTitle1: { ar: "معاً.. لسوق آمن ومستهلك محمي", en: "Together for a Safe Market" },
  heroSub1: { ar: "الجمعية الأولى في تعز للدفاع عن حقوقك.", en: "The first association in Taiz defending your rights." },
  heroTitle2: { ar: "رقابة ميدانية مستمرة", en: "Continuous Field Monitoring" },
  heroSub2: { ar: "فرقنا متواجدة في الأسواق لضمان الجودة.", en: "Our teams ensure quality and price stability." },
  heroTitle3: { ar: "اعرف حقوقك القانونية", en: "Know Your Legal Rights" },
  heroSub3: { ar: "القانون اليمني يكفل لك الحق في الأمان والاختيار.", en: "Yemeni law guarantees your right to safety and choice." },
  
  cta_report: { ar: "قدّم بلاغاً الآن", en: "Report Now" },
  cta_prices: { ar: "قائمة الأسعار", en: "Price List" },
  
  services_title: { ar: "خدماتنا ومهامنا", en: "Our Services" },
  srv_1_title: { ar: "الرصد والرقابة", en: "Monitoring" },
  srv_1_desc: { ar: "نراقب الأسواق ونرصد المخالفات.", en: "We monitor markets and track violations." },
  srv_2_title: { ar: "الحماية القانونية", en: "Legal Protection" },
  srv_2_desc: { ar: "نمثل صوتك أمام القضاء.", en: "We represent you before the judiciary." },
  srv_3_title: { ar: "التوعية الشاملة", en: "Awareness" },
  srv_3_desc: { ar: "اعرف حقوقك وكيف تحمي نفسك.", en: "Know your rights and stay protected." },
  
  news_title: { ar: "أخبار وأنشطة الجمعية", en: "News & Activities" },
  news_school_title: { ar: "ترحيب بقرار تخفيض الرسوم الدراسية", en: "Welcoming School Fees Reduction" },
  news_school_desc: { 
    ar: "رحبت الجمعية بقرار المحافظ رقم (137) بتحديد وتخفيض رسوم المدارس الأهلية، خطوة هامة لحماية حقوق أولياء الأمور.", 
    en: "CPA welcomes Governor Decree (137) to reduce private school fees, a major step for parents' rights." 
  },
  news_campaign_title: { ar: "حملة ميدانية لضبط الأسعار", en: "Field Campaign for Price Control" },
  news_campaign_desc: { 
    ar: "نزول سبع لجان ميدانية لضبط المخالفين بعد تحسن الصرف، بمساهمة لوجستية من الجمعية لضمان التزام التجار.", 
    en: "Seven field committees inspected markets to enforce prices after currency appreciation, with CPA logistical support." 
  },
  news_food_title: { ar: "تحذير بشأن الوجبات الجاهزة", en: "Warning: Ready-made Meals" },
  news_food_desc: { 
    ar: "تؤكد الجمعية على الحذر عند شراء المخبوزات والدواجن، والتأكد من الوزن والنظافة، وتدعو للإبلاغ عن المخالفات.", 
    en: "CPA urges caution when buying baked goods/poultry, checking weights/hygiene, and reporting violations." 
  },
  
  read_more: { ar: "اقرأ المزيد ←", en: "Read More →" },
  gallery_title: { ar: "مكتبة الصور", en: "Photo Gallery" },
  pubs_title: { ar: "الإصدارات واللوائح", en: "Publications & Regulations" },
  pub_1_name: { ar: "النظام الأساسي للجمعية", en: "Association Bylaws" },
  pub_2_name: { ar: "قانون حماية المستهلك", en: "Consumer Protection Law" },
  pub_3_name: { ar: "قائمة الأسعار", en: "Price List" },
  rights_title: { ar: "دليلك القانوني", en: "Your Legal Guide" },
  
  // Questions & Answers
  q_return: { ar: "هل يحق لي استرجاع السلعة؟", en: "Can I return a product?" },
  a_return: { ar: "نعم، يحق لك استرجاع السلعة أو استبدالها خلال فترة الضمان إذا ظهر فيها عيب.", en: "Yes, you have the right to return or exchange within warranty if defective." },
  q_price: { ar: "وجدت سعراً أعلى من القائمة؟", en: "Found a price higher than listed?" },
  a_price: { ar: "يجب على التاجر الالتزام بالقائمة السعرية، ويمكنك الإبلاغ عن أي زيادة.", en: "Merchants must adhere to price lists; report any hike." },
  q_invoice: { ar: "أهمية فاتورة الشراء؟", en: "Why is the invoice important?" },
  a_invoice: { ar: "الفاتورة هي ضمان حقك القانوني عند حدوث أي خلاف.", en: "The invoice is your legal guarantee in case of disputes." },
  q_fraud: { ar: "كيف أكتشف الغش التجاري؟", en: "How to detect fraud?" },
  a_fraud: { ar: "تأكد من تاريخ الصلاحية، بلد المنشأ، وسلامة العبوة.", en: "Check expiry date, origin, and packaging integrity." },

  transparency_title: { ar: "لوحة الشفافية", en: "Transparency Dashboard" },
  stat_reports: { ar: "بلاغ تم استلامه", en: "Reports Received" },
  stat_resolved: { ar: "نسبة الحل", en: "Resolution Rate" },
  stat_inspections: { ar: "نزول ميداني", en: "Field Inspections" },
  top_violations: { ar: "السلع الأكثر مخالفة", en: "Top Violations" },
  
  partners_title: { ar: "شركاء النجاح", en: "Our Partners" },
  currency_title: { ar: "أسعار الصرف - تعز", en: "Exchange Rates - Taiz" },

  footer_about: { ar: "عن الجمعية", en: "About CPA" },
  footer_desc: { ar: "منظمة مدنية طوعية تعمل وفق قانون الجمعيات والمؤسسات الأهلية.", en: "Voluntary civil organization operating under the Law of Associations." },
  footer_contact: { ar: "تواصل معنا", en: "Contact Us" },
  rights: { ar: "© 2024 CPA-Ye. جميع الحقوق محفوظة.", en: "© 2024 CPA-Ye. All Rights Reserved." },
  tickerText: { ar: "+++ عاجل: حملة ميدانية لمراقبة الأسعار +++ تأكد من الصلاحية +++", en: "+++ Urgent: Field campaign on prices +++ Check expiry dates +++" },

  // Interactive Forms
  product_name: { ar: "اسم المنتج", en: "Product Name" },
  price: { ar: "السعر", en: "Price" },
  observed_price: { ar: "السعر الذي وجدته", en: "Price Found" },
  violation_alert: { ar: "تنبيه: زيادة سعرية بمقدار", en: "Alert: Price hike of" },
  shop_name: { ar: "اسم المحل", en: "Shop Name" },
  location: { ar: "الموقع", en: "Location" },
  loc_success: { ar: "تم تحديد الموقع بنجاح", en: "Location Set Successfully" },
  details: { ar: "تفاصيل البلاغ", en: "Report Details" },
  submit: { ar: "إرسال البلاغ", en: "Submit Report" },
  report_title: { ar: "الإبلاغ عن مخالفة", en: "Report a Violation" },
  applyNow: { ar: "قدّم الآن", en: "Apply Now" },
  analyzing: { ar: "جاري التحليل بالذكاء الاصطناعي...", en: "Analyzing with AI..." },
  successMsg: { ar: "تم إرسال البلاغ بنجاح!", en: "Report Submitted Successfully!" },
  aiFeedback: { ar: "تحليل المساعد الذكي:", en: "AI Assistant Analysis:" },
  
  // Admin
  dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  settings: { ar: "الإعدادات", en: "Settings" },
  login: { ar: "تسجيل الدخول", en: "Login" },
  username: { ar: "اسم المستخدم", en: "Username" },
  password: { ar: "كلمة المرور", en: "Password" },
  users: { ar: "المستخدمين", en: "Users" },
  content: { ar: "إدارة المحتوى", en: "Content Mgmt" },
};
