
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Globe, Search, Clock, Tag, AlertOctagon,
  CheckCircle, AlertTriangle, MapPin, Send, Loader2, TrendingUp, 
  Heart, Map as MapIcon, Settings, User, LogOut, Plus, Edit, Trash,
  Shield, PlayCircle, LayoutDashboard, Package, Briefcase, Lock, Newspaper, Video,
  Facebook, Twitter, Instagram, Mail, Phone, FileText, ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';

import { 
  SLIDES, SERVICES_DATA, DASHBOARD_STATS, 
  NEWS_DATA, INITIAL_PRODUCTS, TEXTS, INITIAL_PROFILE, INITIAL_JOBS, INITIAL_MEDIA, MOCK_CRM_STATS, INITIAL_USERS,
  PARTNERS_DATA, CURRENCY_RATES
} from './constants';
import { 
  Language, Product, JobOpportunity, MediaItem, OrganizationProfile, ViolationReport, User as UserType, NewsItem, Partner 
} from './types';
import { analyzeViolationReport } from './services/geminiService';

// --- Contexts ---

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

interface AuthContextType {
  user: UserType | null;
  login: (u: UserType) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// --- Providers ---

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  
  const t = (key: string) => {
    const translation = TEXTS[key];
    if (!translation) return key;
    return translation[language] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem('cpa_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cpa_user');
  };

  // Persist login
  useEffect(() => {
    const stored = localStorage.getItem('cpa_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Components ---

const ProtectedRoute: React.FC<{ children: React.ReactElement, roles?: string[] }> = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const Navbar: React.FC = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'news', href: '/news' },
    { key: 'prices', href: '/prices' },
    { key: 'library', href: '/media' },
    { key: 'careers', href: '/careers' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-3 text-primary hover:text-secondary transition-colors group">
          {!logoError ? (
             <img 
               src="/logo.png" 
               alt={t('brandName')} 
               className="h-14 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
               onError={() => setLogoError(true)}
             />
          ) : (
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
              <Shield size={26} />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight">{t('brandName')}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Taiz - Yemen</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-5">
            {navLinks.map((link) => (
              <li key={link.key}>
                <button 
                  onClick={() => navigate(link.href)} 
                  className="text-dark font-bold hover:text-accent transition-colors relative group text-sm"
                >
                  {t(link.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                </button>
              </li>
            ))}
            {isAuthenticated && (
               <li>
                <button 
                  onClick={() => navigate('/admin')} 
                  className="text-primary font-bold relative group text-sm flex items-center gap-1"
                >
                  <LayoutDashboard size={16} />
                  {t('admin')}
                </button>
              </li>
            )}
          </ul>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={() => navigate('/report')} 
              className="bg-accent text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-accent/30 hover:bg-[#e67e22] hover:-translate-y-1 transition-all duration-300 text-sm flex items-center gap-2"
            >
              <AlertTriangle size={16} />
              {t('report')}
            </button>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 border-2 border-primary text-primary px-3 py-1.5 rounded-full font-bold hover:bg-primary hover:text-white transition-all text-sm"
            >
              <Globe size={16} />
              {language === 'ar' ? 'En' : 'عربي'}
            </button>
          </div>
        </div>

        <button 
          className="lg:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <ul className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <button 
                    onClick={() => { navigate(link.href); setIsMenuOpen(false); }}
                    className="block text-dark font-bold hover:text-accent w-full text-start"
                  >
                    {t(link.key)}
                  </button>
                </li>
              ))}
              {isAuthenticated && (
                 <li>
                   <button onClick={() => { navigate('/admin'); setIsMenuOpen(false); }} className="block text-primary font-bold w-full text-start">{t('admin')}</button>
                 </li>
              )}
              <li className="pt-2 border-t border-gray-100">
                <button 
                  onClick={() => { navigate('/report'); setIsMenuOpen(false); }}
                  className="block text-center bg-accent text-white py-2 rounded-lg font-bold w-full"
                >
                  {t('report')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                  className="w-full flex justify-center items-center gap-2 border border-primary text-primary py-2 rounded-lg font-bold"
                >
                  <Globe size={18} />
                  {language === 'ar' ? 'English' : 'العربية'}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NewsTicker: React.FC = () => {
  const { t, dir } = useLanguage();
  return (
    <div className="bg-primary text-white py-2 overflow-hidden relative z-40 border-b border-secondary flex items-center">
      <div className="flex-shrink-0 bg-accent px-4 py-2 font-bold text-sm z-50 shadow-md">
        {t('news')}
      </div>
      <div className="flex-1 overflow-hidden relative h-full">
        <motion.div
          className="absolute top-0 whitespace-nowrap flex items-center h-full"
          animate={{ x: dir === 'rtl' ? ['100%', '-100%'] : ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          <span className="text-sm font-bold px-4">{t('tickerText')}</span>
        </motion.div>
      </div>
    </div>
  );
};

const CurrencyWidget: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-dark text-white py-3 border-b border-gray-800 overflow-x-auto">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-accent font-bold whitespace-nowrap">
          <TrendingUp size={18} />
          <span>{t('currency_title')}</span>
        </div>
        <div className="flex gap-6 text-sm font-mono">
          {CURRENCY_RATES.map(rate => (
            <div key={rate.currency} className="flex items-center gap-2">
              <span className="font-bold text-gray-400">{rate.currency}</span>
              <span className="flex items-center gap-1 text-white">
                {rate.indicator === 'up' ? <ArrowUpRight size={14} className="text-red-500"/> : 
                 rate.indicator === 'down' ? <ArrowDownRight size={14} className="text-green-500"/> : 
                 <Minus size={14} className="text-gray-500"/>}
                Buy: {rate.buy} / Sell: {rate.sell}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-dark">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }} />
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent`} />
          <div className="relative z-10 h-full flex items-center px-4 container mx-auto">
            <div className="max-w-2xl text-white">
              <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                {t(SLIDES[currentIndex].titleKey)}
              </motion.h1>
              <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg md:text-2xl mb-8 font-medium opacity-90">
                {t(SLIDES[currentIndex].subKey)}
              </motion.p>
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-4">
                <a href="/#/report" className="bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-[#e67e22] transition-colors">{t('cta_report')}</a>
                <a href="/#/prices" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-primary transition-colors">{t('cta_prices')}</a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-accent w-8' : 'bg-white/50 w-2 hover:bg-white'}`} />
        ))}
      </div>
    </div>
  );
};

const PartnersSection: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <section className="py-12 bg-gray-50 border-t">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center text-gray-600 mb-8">{t('partners_title')}</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {PARTNERS_DATA.map(partner => (
            <div key={partner.id} className="flex flex-col items-center gap-2">
               <div className="w-24 h-24 rounded-full bg-white shadow flex items-center justify-center p-4">
                  <span className="font-bold text-xl text-primary">{language === 'ar' ? partner.nameAr[0] : partner.nameEn[0]}</span>
                  {/* <img src={partner.logo} alt={partner.nameEn} className="max-w-full max-h-full" /> */}
               </div>
               <span className="text-sm font-bold text-gray-500">{language === 'ar' ? partner.nameAr : partner.nameEn}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReportForm: React.FC<{ products: Product[], addReport: (r: ViolationReport) => void }> = ({ products, addReport }) => {
  const { t, language } = useLanguage();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'success'>('idle');
  const [aiResult, setAiResult] = useState("");
  const [formData, setFormData] = useState({ productCode: '', reportedPrice: '', description: '' });

  const getLocation = () => {
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoadingLoc(false);
      },
      () => setLoadingLoc(false)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('analyzing');
    
    const product = products.find(p => p.code === formData.productCode);
    const analysis = await analyzeViolationReport(
      product ? (language === 'ar' ? product.nameAr : product.nameEn) : "Unknown",
      Number(formData.reportedPrice),
      product ? product.price : 0,
      formData.description
    );

    setAiResult(analysis);
    
    const report: ViolationReport = {
      id: Date.now().toString(),
      productCode: formData.productCode,
      productName: product ? product.nameAr : "Unknown",
      officialPrice: product?.price,
      reportedPrice: Number(formData.reportedPrice),
      description: formData.description,
      location,
      aiAnalysis: analysis,
      status: 'pending',
      timestamp: new Date().toISOString().split('T')[0]
    };
    
    addReport(report);
    setStatus('success');
  };

  if (status === 'success') return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl text-center my-12">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-primary mb-2">{t('successMsg')}</h2>
      <div className="bg-blue-50 p-4 rounded-lg text-start mt-6 border border-blue-100">
        <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><Clock size={16}/> {t('aiFeedback')}</h4>
        <p className="text-sm text-gray-700 whitespace-pre-line">{aiResult}</p>
      </div>
      <button onClick={() => { setStatus('idle'); setFormData({productCode: '', reportedPrice: '', description: ''}); }} className="mt-8 bg-primary text-white px-6 py-2 rounded-lg font-bold">{t('submit')} Again</button>
    </div>
  );

  return (
    <section className="py-16 px-4 bg-light">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-center items-center text-center">
            <AlertTriangle size={48} className="mb-4 text-accent" />
            <h3 className="text-2xl font-bold mb-2">{t('report_title')}</h3>
            <p className="opacity-80 text-sm">{t('heroSub1')}</p>
          </div>
          <div className="md:w-2/3 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('product_name')}</label>
                <select 
                  className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.productCode}
                  onChange={e => setFormData({...formData, productCode: e.target.value})}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(p => (
                    <option key={p.id} value={p.code}>{language === 'ar' ? p.nameAr : p.nameEn}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{t('observed_price')}</label>
                  <input 
                    type="number" 
                    className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.reportedPrice}
                    onChange={e => setFormData({...formData, reportedPrice: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{t('location')}</label>
                  <button type="button" onClick={getLocation} className={`w-full p-3 border border-dashed rounded-lg flex items-center justify-center gap-2 text-sm font-bold ${location ? 'bg-green-50 text-green-600 border-green-200' : 'text-gray-500 hover:bg-gray-100'}`}>
                    {loadingLoc ? <Loader2 className="animate-spin" size={16} /> : <MapPin size={16} />}
                    {location ? t('loc_success') : t('location')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('details')}</label>
                <textarea 
                  className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20" rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <button disabled={status === 'analyzing'} className="w-full bg-accent text-white py-3 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition flex justify-center items-center gap-2">
                {status === 'analyzing' ? <><Loader2 className="animate-spin" /> {t('analyzing')}</> : <><Send size={18} /> {t('submit')}</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ profile: OrganizationProfile }> = ({ profile }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  return (
    <footer className="bg-dark text-white pt-16 pb-8 px-4 border-t-4 border-accent">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <h3 className="text-xl font-bold text-accent mb-4">{t('footer_about')}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{t('footer_desc')}</p>
          <div className="flex gap-3">
             <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><Facebook size={18}/></a>
             <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><Twitter size={18}/></a>
             <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><Instagram size={18}/></a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-accent mb-4">{t('footer_contact')}</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-3"><Mail size={16} className="text-accent"/> {profile.email}</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-accent"/> {profile.phone}</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-accent"/> {language === 'ar' ? profile.addressAr : profile.addressEn}</li>
          </ul>
        </div>
        <div>
           <h3 className="text-xl font-bold text-accent mb-4">{t('brandName')}</h3>
           <p className="text-xs text-gray-500 mb-4">Registered under Law No. 46 (2008)</p>
           <button onClick={() => navigate('/login')} className="bg-white/10 text-white px-4 py-2 rounded border border-white/20 hover:bg-white hover:text-dark transition w-full text-sm font-bold">Partner Portal Login</button>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        <p>{t('rights')}</p>
      </div>
    </footer>
  );
};

// --- Pages ---

const LoginPage: React.FC<{ users: UserType[] }> = ({ users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Raidan@772662106') {
      login(users.find(u => u.username === 'admin')!);
      navigate('/admin');
    } else if (users.some(u => u.username === username && u.role === 'donor')) {
       const user = users.find(u => u.username === username);
       if (user) {
         login(user);
         navigate('/admin'); 
       }
    } else {
      setError('Invalid credentials');
    }
  };

  if (isAuthenticated) return <Navigate to="/admin" />;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <Shield size={48} className="text-primary mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-dark">{t('login')}</h1>
          <p className="text-gray-500 text-sm">CPA-Ye Secure Portal</p>
        </div>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">{t('username')}</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" className="w-full pl-10 p-2 border rounded bg-gray-50" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">{t('password')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="password" className="w-full pl-10 p-2 border rounded bg-gray-50" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
          <button className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-secondary transition">{t('login')}</button>
        </form>
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Restricted Access. Authorized Personnel Only.</p>
        </div>
      </div>
    </div>
  );
};

// --- Admin Dashboard & Interactive Management ---

const AdminDashboard: React.FC<{ 
  products: Product[], setProducts: (p: Product[]) => void,
  reports: ViolationReport[], 
  jobs: JobOpportunity[], setJobs: (j: JobOpportunity[]) => void,
  profile: OrganizationProfile, setProfile: (p: OrganizationProfile) => void,
  users: UserType[], setUsers: (u: UserType[]) => void,
  news: NewsItem[], setNews: (n: NewsItem[]) => void
}> = ({ products, setProducts, reports, jobs, setJobs, profile, setProfile, users, setUsers, news, setNews }) => {
  const [activeTab, setActiveTab] = useState<'dash' | 'users' | 'content' | 'products' | 'reports' | 'hr' | 'crm' | 'settings'>('dash');
  const { logout, user } = useAuth();
  const { t } = useLanguage();

  // User Mgmt
  const [newUser, setNewUser] = useState({ username: '', name: '', role: 'staff' });
  const addUser = () => {
    if (!newUser.username || !newUser.name) return;
    setUsers([...users, { id: Date.now().toString(), username: newUser.username, name: newUser.name, role: newUser.role as any }]);
    setNewUser({ username: '', name: '', role: 'staff' });
  };
  const deleteUser = (id: string) => setUsers(users.filter(u => u.id !== id));

  // News Mgmt
  const [newArticle, setNewArticle] = useState({ titleAr: '', titleEn: '', descAr: '', descEn: '' });
  const addNews = () => {
    setNews([{
       id: Date.now(),
       date: new Date().toLocaleDateString(),
       image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
       titleKey: 'dynamic',
       titleAr: newArticle.titleAr,
       titleEn: newArticle.titleEn,
       descKey: 'dynamic',
       descAr: newArticle.descAr,
       descEn: newArticle.descEn
    }, ...news]);
    setNewArticle({ titleAr: '', titleEn: '', descAr: '', descEn: '' });
  };
  const deleteNews = (id: number) => setNews(news.filter(n => n.id !== id));

  // Products Mgmt
  const [newProduct, setNewProduct] = useState({ code: '', nameAr: '', nameEn: '', price: 0 });
  const addProduct = () => {
    if(!newProduct.code) return;
    setProducts([...products, { ...newProduct, id: Date.now(), unit: 'Unit', lastUpdated: new Date().toLocaleDateString(), category: 'General' }]);
    setNewProduct({ code: '', nameAr: '', nameEn: '', price: 0 });
  };
  const deleteProduct = (id: number) => setProducts(products.filter(p => p.id !== id));

  // HR Mgmt
  const [newJob, setNewJob] = useState({ titleAr: '', titleEn: '', type: 'Full-time' });
  const addJob = () => {
     setJobs([...jobs, { 
       id: Date.now(), 
       titleAr: newJob.titleAr, 
       titleEn: newJob.titleEn, 
       type: newJob.type as any,
       location: 'Taiz',
       descriptionAr: 'وصف الوظيفة...',
       descriptionEn: 'Job Description...',
       deadline: 'Open',
       postedDate: new Date().toLocaleDateString()
     }]);
     setNewJob({ titleAr: '', titleEn: '', type: 'Full-time' });
  };
  const deleteJob = (id: number) => setJobs(jobs.filter(j => j.id !== id));

  const sidebarItems = [
    { id: 'dash', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: User, label: 'Users' },
    { id: 'content', icon: Newspaper, label: 'News Content' },
    { id: 'products', icon: Package, label: 'Products & Prices' },
    { id: 'reports', icon: MapIcon, label: 'Reports Map' },
    { id: 'hr', icon: Briefcase, label: 'HR Management' },
    { id: 'crm', icon: Heart, label: 'Donor Relations' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="ltr">
      <aside className="w-64 bg-dark text-white flex-shrink-0 flex flex-col">
        <div className="p-6 text-center border-b border-gray-700 font-bold text-xl flex flex-col">
          <span>CPA Admin</span>
          <span className="text-xs text-gray-400 font-normal mt-1">Welcome, {user?.name}</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
           <button onClick={logout} className="w-full flex items-center gap-2 text-gray-400 hover:text-white text-sm"><LogOut size={16}/> Logout</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dash' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-dark mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-blue-500">
                <div className="text-sm text-gray-500 font-bold">Total Reports</div>
                <div className="text-3xl font-black">{reports.length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-green-500">
                <div className="text-sm text-gray-500 font-bold">Products</div>
                <div className="text-3xl font-black">{products.length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-purple-500">
                <div className="text-sm text-gray-500 font-bold">Active Jobs</div>
                <div className="text-3xl font-black">{jobs.length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-pink-500">
                <div className="text-sm text-gray-500 font-bold">Donations (YTD)</div>
                <div className="text-3xl font-black">{MOCK_CRM_STATS.totalDonations.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-dark mb-6">User Management</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
               <h3 className="font-bold text-gray-700 mb-4">Add New User</h3>
               <div className="grid grid-cols-4 gap-4 items-end">
                  <div><label className="text-xs font-bold">Username</label><input className="w-full border p-2 rounded" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} /></div>
                  <div><label className="text-xs font-bold">Full Name</label><input className="w-full border p-2 rounded" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} /></div>
                  <div>
                    <label className="text-xs font-bold">Role</label>
                    <select className="w-full border p-2 rounded" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                      <option value="donor">Donor</option>
                    </select>
                  </div>
                  <button onClick={addUser} className="bg-green-600 text-white p-2 rounded font-bold">Add User</button>
               </div>
            </div>
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4">Username</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b">
                      <td className="p-4 font-medium">{u.username}</td>
                      <td className="p-4">{u.name}</td>
                      <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs uppercase">{u.role}</span></td>
                      <td className="p-4">
                        {u.username !== 'admin' && (
                          <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:text-red-700"><Trash size={18}/></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="animate-fade-in">
             <h1 className="text-3xl font-bold text-dark mb-6">Content Management</h1>
             <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
               <h3 className="font-bold text-gray-700 mb-4">Post News Update</h3>
               <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Title (Arabic)" className="border p-2 rounded" value={newArticle.titleAr} onChange={e => setNewArticle({...newArticle, titleAr: e.target.value})} />
                    <input placeholder="Title (English)" className="border p-2 rounded" value={newArticle.titleEn} onChange={e => setNewArticle({...newArticle, titleEn: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <textarea placeholder="Description (Arabic)" className="border p-2 rounded" value={newArticle.descAr} onChange={e => setNewArticle({...newArticle, descAr: e.target.value})} />
                    <textarea placeholder="Description (English)" className="border p-2 rounded" value={newArticle.descEn} onChange={e => setNewArticle({...newArticle, descEn: e.target.value})} />
                 </div>
                 <button onClick={addNews} className="bg-blue-600 text-white px-6 py-2 rounded font-bold">Publish News</button>
               </div>
             </div>
             <div className="grid gap-4">
               {news.map(item => (
                 <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
                   <div>
                     <h4 className="font-bold">{item.titleAr || (item.titleKey && t(item.titleKey))}</h4>
                     <p className="text-sm text-gray-500">{item.date}</p>
                   </div>
                   <button onClick={() => deleteNews(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash size={16}/></button>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="animate-fade-in">
             <h1 className="text-3xl font-bold text-dark mb-6">Product Price Management</h1>
             <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <div className="grid grid-cols-5 gap-4 items-end">
                   <div><label className="text-xs font-bold">Code</label><input className="w-full border p-2 rounded" value={newProduct.code} onChange={e => setNewProduct({...newProduct, code: e.target.value})} /></div>
                   <div><label className="text-xs font-bold">Name (AR)</label><input className="w-full border p-2 rounded" value={newProduct.nameAr} onChange={e => setNewProduct({...newProduct, nameAr: e.target.value})} /></div>
                   <div><label className="text-xs font-bold">Name (EN)</label><input className="w-full border p-2 rounded" value={newProduct.nameEn} onChange={e => setNewProduct({...newProduct, nameEn: e.target.value})} /></div>
                   <div><label className="text-xs font-bold">Price</label><input type="number" className="w-full border p-2 rounded" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} /></div>
                   <button onClick={addProduct} className="bg-green-600 text-white p-2 rounded font-bold">Add Product</button>
                </div>
             </div>
             <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b"><tr><th className="p-3">Code</th><th className="p-3">Name</th><th className="p-3">Price</th><th className="p-3">Action</th></tr></thead>
                   <tbody>
                      {products.map(p => (
                         <tr key={p.id} className="border-b">
                            <td className="p-3">{p.code}</td>
                            <td className="p-3">{p.nameAr} / {p.nameEn}</td>
                            <td className="p-3 font-bold text-primary">{p.price}</td>
                            <td className="p-3"><button onClick={() => deleteProduct(p.id)} className="text-red-500"><Trash size={16}/></button></td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'hr' && (
          <div className="animate-fade-in">
             <h1 className="text-3xl font-bold text-dark mb-6">HR & Careers</h1>
             <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <h3 className="font-bold text-gray-700 mb-4">Post New Job</h3>
                <div className="grid grid-cols-4 gap-4 items-end">
                   <div><label className="text-xs font-bold">Title (AR)</label><input className="w-full border p-2 rounded" value={newJob.titleAr} onChange={e => setNewJob({...newJob, titleAr: e.target.value})} /></div>
                   <div><label className="text-xs font-bold">Title (EN)</label><input className="w-full border p-2 rounded" value={newJob.titleEn} onChange={e => setNewJob({...newJob, titleEn: e.target.value})} /></div>
                   <div>
                      <label className="text-xs font-bold">Type</label>
                      <select className="w-full border p-2 rounded" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                         <option value="Full-time">Full-time</option>
                         <option value="Part-time">Part-time</option>
                         <option value="Volunteer">Volunteer</option>
                      </select>
                   </div>
                   <button onClick={addJob} className="bg-purple-600 text-white p-2 rounded font-bold">Post Job</button>
                </div>
             </div>
             <div className="space-y-4">
                {jobs.map(j => (
                   <div key={j.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                      <div>
                         <h4 className="font-bold">{j.titleEn} / {j.titleAr}</h4>
                         <span className="text-xs bg-gray-100 px-2 py-1 rounded">{j.type}</span>
                      </div>
                      <button onClick={() => deleteJob(j.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash size={18}/></button>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="animate-fade-in h-full flex flex-col">
            <h1 className="text-3xl font-bold text-dark mb-6">Interactive Reports Map</h1>
            <div className="flex-1 bg-white rounded-xl shadow border border-gray-200 relative overflow-hidden min-h-[500px] group">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Map" />
              <div className="absolute inset-0 p-8">
                 {reports.map((r, i) => (
                   <div key={i} className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg hover:scale-150 cursor-pointer transition-transform" style={{ top: `${30 + (i * 12) % 60}%`, left: `${20 + (i * 18) % 70}%` }} title={r.productName}></div>
                 ))}
                 <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow-lg">
                    <h4 className="font-bold text-sm mb-2">Live Violations</h4>
                    <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Price Violation</div>
                 </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'crm' && (
          <div className="animate-fade-in">
             <h1 className="text-3xl font-bold text-dark mb-6">Donor Relations</h1>
             <div className="bg-white p-8 rounded-xl shadow border-t-4 border-pink-600 mb-8">
               <div className="grid grid-cols-3 gap-8 text-center">
                 <div><div className="text-3xl font-black text-pink-600">{MOCK_CRM_STATS.totalDonors}</div><div className="text-sm text-gray-500">Active Donors</div></div>
                 <div><div className="text-3xl font-black text-blue-600">{MOCK_CRM_STATS.activeProjects}</div><div className="text-sm text-gray-500">Projects</div></div>
                 <div><div className="text-3xl font-black text-green-600">{MOCK_CRM_STATS.totalDonations.toLocaleString()}</div><div className="text-sm text-gray-500">Total Funds (YR)</div></div>
               </div>
             </div>
             <div className="bg-blue-50 p-4 rounded border border-blue-200 flex items-center gap-4">
                <Heart className="text-pink-500" />
                <div>
                   <h4 className="font-bold">CiviCRM Sync Status</h4>
                   <p className="text-sm text-gray-600">Last synchronized: {MOCK_CRM_STATS.lastSync}</p>
                </div>
                <button className="ml-auto bg-white border border-gray-300 px-4 py-2 rounded text-sm font-bold hover:bg-gray-50">Sync Now</button>
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
           <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-dark mb-6">Organization Profile</h1>
              <div className="bg-white p-8 rounded-xl shadow max-w-3xl">
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-bold mb-1">Mission (EN)</label>
                       <textarea className="w-full border p-2 rounded" rows={3} value={profile.missionEn} onChange={(e) => setProfile({...profile, missionEn: e.target.value})}></textarea>
                    </div>
                    <div>
                       <label className="block text-sm font-bold mb-1">Mission (AR)</label>
                       <textarea className="w-full border p-2 rounded" rows={3} value={profile.missionAr} onChange={(e) => setProfile({...profile, missionAr: e.target.value})}></textarea>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-green-700">Save Changes</button>
                 </div>
              </div>
           </div>
        )}

      </main>
    </div>
  );
};

// --- Public Pages (HomePage, etc) with Dynamic Content Props ---

const HomePage: React.FC<{ news: NewsItem[] }> = ({ news }) => {
  const { t, language } = useLanguage();
  return (
    <>
      <CurrencyWidget />
      <HeroSlider />
      <NewsTicker />
      <div className="py-12 bg-primary text-white text-center">
         <h2 className="text-3xl font-bold mb-4"><TrendingUp className="inline mr-2"/> {t('transparency_title')}</h2>
         <div className="flex justify-center gap-8 flex-wrap">
            {DASHBOARD_STATS.map((s, i) => <div key={i} className="bg-white/10 p-4 rounded min-w-[150px]">
               <div className="text-2xl font-bold">{s.value}</div>
               <div className="text-sm opacity-75">{t(s.labelKey)}</div>
            </div>)}
         </div>
      </div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">{t('news_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map(n => (
              <div key={n.id} className="rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-white">
                <div className="h-48 overflow-hidden"><img src={n.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt=""/></div>
                <div className="p-6">
                  <span className="text-xs text-accent font-bold">{n.date}</span>
                  <h3 className="font-bold text-lg mt-2 mb-2 group-hover:text-primary transition-colors">
                    {language === 'ar' ? (n.titleAr || t(n.titleKey)) : (n.titleEn || t(n.titleKey))}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {language === 'ar' ? (n.descAr || t(n.descKey)) : (n.descEn || t(n.descKey))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Services />
      <PartnersSection />
    </>
  );
};

const MediaGallery: React.FC<{ media: MediaItem[] }> = ({ media }) => {
  const { t, language } = useLanguage();
  return (
    <div className="py-16 bg-light min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">{t('gallery_title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {media.map(item => (
            <div key={item.id} className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer bg-black">
               <img src={item.url} className="w-full h-64 object-cover opacity-90 group-hover:opacity-60 transition-opacity" alt="" />
               {item.type === 'video' && (
                 <div className="absolute inset-0 flex items-center justify-center">
                   <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                 </div>
               )}
               <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white translate-y-4 group-hover:translate-y-0 transition-transform">
                 <p className="font-bold">{language === 'ar' ? item.captionAr : item.captionEn}</p>
                 <p className="text-xs opacity-75">{item.date}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage: React.FC<{ profile: OrganizationProfile }> = ({ profile }) => {
  const { language } = useLanguage();
  return (
    <div className="py-16 bg-light min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold text-primary mb-8 text-center border-b pb-4">About CPA-Ye</h1>
          <div className="prose max-w-none text-gray-700 leading-loose text-lg mb-8">
             {language === 'ar' ? profile.aboutAr : profile.aboutEn}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
             <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-primary">
                <h3 className="font-bold text-primary mb-2 text-xl">Mission</h3>
                <p>{language === 'ar' ? profile.missionAr : profile.missionEn}</p>
             </div>
             <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-accent">
                <h3 className="font-bold text-accent mb-2 text-xl">Vision</h3>
                <p>{language === 'ar' ? profile.visionAr : profile.visionEn}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  const iconMap = { search: Search, balance: TrendingUp, bullhorn: AlertOctagon };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-primary inline-block relative">
            {t('services_title')}
            <span className="block h-1 w-16 bg-accent mx-auto mt-2 rounded-full"></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-all group">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="text-accent w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{t(service.titleKey)}</h3>
                <p className="text-gray-600">{t(service.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CareersPage: React.FC<{ jobs: JobOpportunity[] }> = ({ jobs }) => {
  const { language } = useLanguage();
  return (
    <div className="py-16 bg-light min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Join Our Team</h1>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {jobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-dark">{language === 'ar' ? job.titleAr : job.titleEn}</h3>
                <div className="flex gap-2 mt-2 text-sm text-gray-500">
                   <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                   <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                </div>
                <p className="mt-3 text-gray-600 max-w-xl">{language === 'ar' ? job.descriptionAr : job.descriptionEn}</p>
              </div>
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PricesPage: React.FC<{ products: Product[] }> = ({ products }) => {
  const { t } = useLanguage();
  return (
    <div className="py-20 px-4 bg-light min-h-screen">
       <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">{t('cta_prices')}</h1>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">Code</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Price (YR)</th>
                  <th className="p-4">Category</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-500 font-mono">{p.code}</td>
                    <td className="p-4 font-bold text-dark">{p.nameAr} / {p.nameEn}</td>
                    <td className="p-4 text-primary font-bold text-lg">{p.price.toLocaleString()}</td>
                    <td className="p-4"><span className="bg-gray-100 text-xs px-2 py-1 rounded">{p.category}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  // Dynamic State for Interactive Admin Panel
  const [users, setUsers] = useState<UserType[]>(INITIAL_USERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reports, setReports] = useState<ViolationReport[]>([]);
  const [profile, setProfile] = useState<OrganizationProfile>(INITIAL_PROFILE);
  const [jobs, setJobs] = useState<JobOpportunity[]>(INITIAL_JOBS);
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);

  const addReport = (report: ViolationReport) => setReports([report, ...reports]);

  return (
    <HashRouter>
      <LanguageProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-dark">
            <Routes>
              <Route path="/login" element={<LoginPage users={users} />} />
              <Route path="/admin" element={
                <ProtectedRoute roles={['admin', 'donor']}>
                  <AdminDashboard 
                    products={products} setProducts={setProducts} 
                    reports={reports} 
                    jobs={jobs} setJobs={setJobs}
                    profile={profile} setProfile={setProfile}
                    users={users} setUsers={setUsers}
                    news={news} setNews={setNews}
                  />
                </ProtectedRoute>
              } />
              <Route path="*" element={
                <>
                  <Navbar />
                  <div className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage news={news} />} />
                      <Route path="/about" element={<AboutPage profile={profile} />} />
                      <Route path="/report" element={<ReportForm products={products} addReport={addReport} />} />
                      <Route path="/careers" element={<CareersPage jobs={jobs} />} />
                      <Route path="/media" element={<MediaGallery media={media} />} />
                      <Route path="/prices" element={<PricesPage products={products} />} />
                    </Routes>
                  </div>
                  <Footer profile={profile} />
                </>
              } />
            </Routes>
          </div>
        </AuthProvider>
      </LanguageProvider>
    </HashRouter>
  );
}
