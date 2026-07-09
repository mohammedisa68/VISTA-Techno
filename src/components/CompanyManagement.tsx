import React, { useState, useEffect } from 'react';
import { 
  Users, Layers, Award, Briefcase, FileText, Globe, 
  PhoneCall, Shield, Key, ChevronRight, Download, BarChart2,
  Lock, Unlock, CheckCircle, RefreshCw, Settings, ToggleLeft, ToggleRight, Info
} from 'lucide-react';
import { User, Product, Course, PortfolioItem, BlogPost } from '../types';
import DashboardSection from './DashboardSection';
import { LanguageCode, translations } from '../lib/translations';

interface CompanyManagementProps {
  currentUser: User | null;
  products: Product[];
  courses: Course[];
  portfolioItems: PortfolioItem[];
  blogs: BlogPost[];
  onRefreshAllData: () => void;
  onLoginClick: () => void;
  language?: LanguageCode;
}

export default function CompanyManagement({
  currentUser,
  products,
  courses,
  portfolioItems,
  blogs,
  onRefreshAllData,
  onLoginClick,
  language = 'EN'
}: CompanyManagementProps) {
  const t = translations[language];

  // 1. Password Protection & Security states
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('vista_mgmt_unlocked') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [storedPassword, setStoredPassword] = useState('Mohammedvista');

  // Password edit form states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');

  // Tab and color animation states
  const [activeTab, setActiveTab] = useState<'info' | 'admin'>('info');
  const [activeSubSection, setActiveSubSection] = useState<string>('team');
  const [colorCycleIndex, setColorCycleIndex] = useState(0);
  const [triggerPulse, setTriggerPulse] = useState(false);

  // 2. Permission Office and Personal Role states
  const [permissions, setPermissions] = useState<{
    [key: string]: {
      appointee: string;
      market: boolean;
      learning: boolean;
      web: boolean;
      publisher: boolean;
      admin: boolean;
    }
  }>({
    'Market manager': { appointee: 'Yared Getachew', market: true, learning: false, web: false, publisher: false, admin: false },
    'Vista Learning': { appointee: 'Kebede Gemeda', market: false, learning: true, web: false, publisher: false, admin: false },
    'Website development manager': { appointee: 'Selamawit Kebede', market: false, learning: false, web: true, publisher: false, admin: false },
    'Vista publisher manager': { appointee: 'Alula Tesfaye', market: false, learning: false, web: false, publisher: true, admin: false },
    'Personal Role': { appointee: 'Mohammed Isa', market: true, learning: true, web: true, publisher: true, admin: true }
  });

  const [permSuccessMsg, setPermSuccessMsg] = useState('');

  // Synchronization with database settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/company/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.passcode) {
            setStoredPassword(data.passcode);
          }
          if (data.permissions) {
            setPermissions(data.permissions);
          }
        }
      } catch (err) {
        console.error('Failed to load company settings from db:', err);
      }
    };
    loadSettings();
  }, []);

  // Leadership Team Data
  const team = [
    {
      name: 'Mohammed Isa',
      role: 'Founder & CEO',
      desc: 'Formulates the primary strategic goals and orchestrates technology syntheses across software and printing domains.',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Alula Tesfaye',
      role: 'Chief Technology Officer',
      desc: 'Commanding general of full-stack software architectures, hosting, and classroom cybersecurity training programs.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Selamawit Kebede',
      role: 'Director of Creative Design',
      desc: 'Expert brand strategist managing vector layout workflows, corporate mugs, banners, and digital typography alignments.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    }
  ];

  // Organizational Structure & Departments
  const departments = [
    { name: 'Print & Fabrication', lead: 'Selamawit Kebede', staff: '8 Technicians', function: 'Corporate t-shirt, mug printing, banner lamination, rubber stamp engraving, and signboards.' },
    { name: 'Web & Software Engineering', lead: 'Dr. Alula Tesfaye', staff: '6 Software Engineers', function: 'Custom React websites, school portals, NGO databases, and ongoing server support.' },
    { name: 'ICT Hardware & Surveillance', lead: 'Yared Getachew', staff: '4 Installers', function: 'Desktop customization, coding laptops procurement, enterprise routers, and 4MP CCTV monitoring setups.' },
    { name: 'VISTA Learning Academy', lead: 'Mohammed Isa', staff: '5 Technical Instructors', function: 'Coding workshops, productivity software drills, graphic design academies, and freelancing courses.' },
  ];

  // Open Careers
  const careers = [
    { title: 'Senior Full-Stack Developer Instructor', dept: 'VISTA Academy', loc: 'Addis Ababa (On-Site)', type: 'Full-time', salary: 'Competitive' },
    { title: 'Wide-Format Print Technician', dept: 'Print & Fabrication', loc: 'Addis Ababa (On-Site)', type: 'Full-time', salary: 'Negotiable' },
    { title: 'Digital Branding Specialist', dept: 'Creative Department', loc: 'Addis Ababa (Remote/Hybrid)', type: 'Contractor', salary: 'Hourly basis' },
  ];

  // Corporate Documents & Annual Reports
  const documents = [
    { title: 'VISTA 2025 Annual Operational Audit', type: 'PDF Report', size: '4.2 MB', downloads: '1.2k' },
    { title: 'Standard Service SLA & Branding Guide', type: 'DOCX Document', size: '2.1 MB', downloads: '3.4k' },
    { title: 'VISTA Learning Curriculum Framework', type: 'PDF Syllabus', size: '1.8 MB', downloads: '920' },
  ];

  // Contact Directory
  const directory = [
    { dept: 'Main Headquarters', phone: '+251 11 654 3210', email: 'hq@vista-tech.com', office: 'Bole Road, Addis Ababa' },
    { dept: 'Publisher & Printing Desk', phone: '+251 91 234 5678', email: 'print@vista-tech.com', office: 'Subcity Block B, Addis Ababa' },
    { dept: 'Web Dev Client Inquiries', phone: '+251 91 234 5679', email: 'web@vista-tech.com', office: 'Tech Complex Ext 4' },
    { dept: 'Academy Admissions Registrar', phone: '+251 11 654 3211', email: 'academy@vista-tech.com', office: 'Main Lab 2' },
  ];

  const isAdminOrStaff = currentUser?.role === 'Admin' || currentUser?.role === 'Staff';

  // Toggle active sub-section with animation trigger
  const handleSubSectionSelect = (id: string) => {
    setActiveSubSection(id);
    setTriggerPulse(true);
    // Cycle a color scheme for the dynamic elements
    setColorCycleIndex((prev) => (prev + 1) % 4);
    setTimeout(() => setTriggerPulse(false), 500);
  };

  // Unlocking with Passcode
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === storedPassword) {
      setIsUnlocked(true);
      sessionStorage.setItem('vista_mgmt_unlocked', 'true');
      setPasswordError('');
      setPasswordInput('');
      setTriggerPulse(true);
      setTimeout(() => setTriggerPulse(false), 800);
    } else {
      setPasswordError(
        language === 'OM' 
          ? 'Jechi darbii sirrii miti! Yaali lammataa godhaa.' 
          : language === 'AM'
          ? 'የይለፍ ቃል የተሳሳተ ነው! እባክዎን እንደገና ይሞክሩ።'
          : language === 'AR'
          ? 'كلمة المرور غير صحيحة! يرجى المحاولة مرة أخرى.'
          : 'Incorrect passcode! Please verify and re-try.'
      );
    }
  };

  // Changing Passcode
  const handleSaveNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      alert('Password haaraa galchaa! / Enter a new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Password wal hin fudhanne! / Passwords do not match.');
      return;
    }
    
    try {
      const res = await fetch('/api/company/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: newPassword })
      });
      if (res.ok) {
        setStoredPassword(newPassword);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordSuccessMsg(
          language === 'OM'
            ? 'Jechi darbii milkiidhaan jijjiirameera!'
            : 'Passcode updated successfully to database!'
        );
        setTimeout(() => setPasswordSuccessMsg(''), 4000);
      } else {
        alert('Failed to update passcode in database.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating database passcode.');
    }
  };

  // Modifying Permissions
  const handlePermissionToggle = async (roleKey: string, permKey: 'market' | 'learning' | 'web' | 'publisher' | 'admin') => {
    const updated = {
      ...permissions,
      [roleKey]: {
        ...permissions[roleKey],
        [permKey]: !permissions[roleKey][permKey]
      }
    };
    setPermissions(updated);
    
    try {
      await fetch('/api/company/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissions: updated })
      });
      setPermSuccessMsg('Aangoon (Permissions) haaromfameera! Persisted to Database.');
      setTimeout(() => setPermSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Modifying Appointee name
  const handleAppointeeChange = async (roleKey: string, value: string) => {
    const updated = {
      ...permissions,
      [roleKey]: {
        ...permissions[roleKey],
        appointee: value
      }
    };
    setPermissions(updated);
    
    try {
      await fetch('/api/company/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissions: updated })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Resetting to default passcode
  const handleResetPasscode = async () => {
    if (confirm('Reset to default password "Mohammedvista"?')) {
      try {
        const res = await fetch('/api/company/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode: 'Mohammedvista' })
        });
        if (res.ok) {
          setStoredPassword('Mohammedvista');
          alert('Reset completed and saved to database!');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('vista_mgmt_unlocked');
    setPasswordInput('');
  };

  // Dynamic color helper based on active sub-section click cycle
  const getPulseColorClass = () => {
    switch (colorCycleIndex) {
      case 0: return 'from-cyan-500 via-blue-600 to-indigo-600';
      case 1: return 'from-pink-500 via-purple-600 to-rose-600';
      case 2: return 'from-emerald-400 via-teal-600 to-cyan-600';
      case 3: return 'from-amber-400 via-orange-500 to-rose-500';
      default: return 'from-blue-600 via-violet-600 to-pink-500';
    }
  };

  const getPulsingBorderHex = () => {
    switch (colorCycleIndex) {
      case 0: return 'rgba(6, 182, 212, 0.45)';
      case 1: return 'rgba(236, 72, 153, 0.45)';
      case 2: return 'rgba(16, 185, 129, 0.45)';
      case 3: return 'rgba(245, 158, 11, 0.45)';
      default: return 'rgba(59, 130, 246, 0.45)';
    }
  };

  return (
    <div id="company-management-section" className="space-y-12 pb-20 text-left animate-in fade-in duration-300 relative">
      
      {/* Dynamic Keyframe Animations CSS */}
      <style>{`
        @keyframes colorGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rainbow-glow {
          background: linear-gradient(270deg, #3b82f6, #ec4899, #10b981, #f59e0b, #6366f1);
          background-size: 1000% 1000%;
          animation: colorGradientShift 14s ease infinite;
        }
        .glowing-interactive-card {
          box-shadow: 0 0 25px ${getPulsingBorderHex()};
          transition: all 0.5s ease;
        }
        @keyframes rippleEffect {
          0% { transform: scale(0.98); opacity: 0.9; }
          50% { transform: scale(1.01); opacity: 1; }
          100% { transform: scale(0.98); opacity: 0.9; }
        }
        .sub-active-pulse {
          animation: rippleEffect 2s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Header Hero Banner with Dynamic Gradient Background Shift */}
      <section className="relative overflow-hidden py-16 text-white rounded-3xl mx-4 mt-6 shadow-xl animate-rainbow-glow">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.15),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="bg-white/15 border border-white/25 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-100">
                ⚡ VISTA Active Engine
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5 font-display flex items-center gap-2">
                <Shield className="w-8 h-8 text-cyan-300 hue-animate-pulse" />
                <span>{language === 'OM' ? 'Bulchiinsa VISTA' : language === 'AM' ? 'የቪስታ ኩባንያ አስተዳደር' : 'Company Management'}</span>
              </h1>
              <p className="text-xs text-white/90 max-w-xl leading-relaxed">
                {language === 'OM' 
                  ? 'Gurmaayina waajjiraalee, pirojektiiwwan, aangoo fi diizaayinii maxxansaa, daldalaa fi leenjii VISTA asitti hordofaa.'
                  : 'Manage operational structures, grant permissions to offices (Market, Learning, Web, Publisher), customize portal access passcodes, and control directories.'
                }
              </p>
            </div>
            
            {/* Quick Lock / Mode Selector */}
            <div className="flex bg-slate-950/85 p-1.5 rounded-xl border border-white/10 w-fit shrink-0 relative z-20">
              <button
                onClick={() => {
                  if (isUnlocked) {
                    setActiveTab('info');
                  }
                }}
                disabled={!isUnlocked}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'info' && isUnlocked
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white disabled:opacity-50'
                }`}
              >
                Governance Info
              </button>
              <button
                onClick={() => {
                  if (isUnlocked) {
                    if (isAdminOrStaff) {
                      setActiveTab('admin');
                    } else {
                      onLoginClick();
                    }
                  }
                }}
                disabled={!isUnlocked}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === 'admin' && isUnlocked
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white disabled:opacity-50'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Secure Dashboard</span>
                {!isAdminOrStaff && isUnlocked && <span className="bg-slate-900 text-slate-400 text-[8px] px-1 py-0.5 rounded ml-1">Lock</span>}
              </button>
              {isUnlocked && (
                <button 
                  onClick={handleLock}
                  className="ml-2 px-2.5 py-1.5 bg-red-950 text-red-400 hover:bg-red-900 hover:text-red-200 border border-red-800/30 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                  title="Lock Portal Access"
                >
                  <Lock className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Render PASSWORD LOCK screen if not unlocked */}
      {!isUnlocked ? (
        <section className="max-w-md mx-auto px-4 py-12">
          <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden glowing-interactive-card">
            
            {/* Top pulsing lock design */}
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 ripple-glow">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">
                  {language === 'OM' ? 'Bulchiinsi Cufameera' : language === 'AM' ? 'የአስተዳደር መግቢያ የተቆለፈ ነው' : 'Management Portal Locked'}
                </h3>
                <p className="text-xs text-slate-400 px-4">
                  {language === 'OM' 
                    ? "Garee bulchiinsaa seenuuf jecha darbii (passcode) galchaa."
                    : "Enter the secure administrative passcode to unlock VISTA management parameters & settings."
                  }
                </p>
              </div>
            </div>

            <form onSubmit={handlePasscodeSubmit} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Passcode</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter management passcode..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 placeholder-slate-600 rounded-xl py-3 px-4 text-sm font-mono tracking-widest focus:outline-none transition-all"
                  />
                  <div className="absolute right-3 top-3.5 text-slate-500">
                    <Key className="w-4 h-4" />
                  </div>
                </div>
                {passwordError && <p className="text-rose-400 text-[10px] font-bold mt-1.5">{passwordError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-500/10 flex items-center justify-center space-x-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{language === 'OM' ? 'Bani (Unlock)' : 'Unlock System'}</span>
              </button>
            </form>

            <div className="border-t border-slate-850 pt-4 text-center space-y-2">
              <p className="text-[10px] text-slate-500">
                Hint: Standard default passcode is <code className="text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded font-bold">Mohammedvista</code>
              </p>
              
              {/* Quickly autofill for testing convenience */}
              <button
                type="button"
                onClick={() => setPasswordInput('Mohammedvista')}
                className="text-[9px] text-blue-400 hover:underline font-bold tracking-wider"
              >
                Autofill default for testing
              </button>
            </div>

          </div>
        </section>
      ) : (
        /* If unlocked, show the main dashboard tabs */
        <>
          {activeTab === 'admin' && isAdminOrStaff ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-8 text-xs text-amber-300 flex items-center space-x-2.5">
                <Shield className="w-5 h-5 shrink-0" />
                <p><strong>Secure Console Active:</strong> You are currently authenticated as an administrative system manager. You can customize catalog items, student directories, and live inquiries below.</p>
              </div>
              <DashboardSection
                currentUser={currentUser}
                products={products}
                courses={courses}
                portfolioItems={portfolioItems}
                blogs={blogs}
                onRefreshAllData={onRefreshAllData}
              />
            </div>
          ) : (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Sidebar Navigation with Custom Color Accent Transitions */}
                <div className="lg:col-span-3 space-y-4">
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold px-3">Management Sections</p>
                    <p className="text-[9px] text-emerald-500 font-bold px-3 uppercase tracking-wider">● System Decrypted</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                    {[
                      { id: 'team', label: 'Leadership Team', icon: <Users className="w-4 h-4" /> },
                      { id: 'departments', label: 'Departments', icon: <Layers className="w-4 h-4" /> },
                      { id: 'permissions', label: 'Permissions & Settings', icon: <Shield className="w-4 h-4" /> },
                      { id: 'careers', label: 'Careers & Roles', icon: <Briefcase className="w-4 h-4" /> },
                      { id: 'partners', label: 'Our Partners', icon: <Globe className="w-4 h-4" /> },
                      { id: 'policies', label: 'Corporate Policies', icon: <Shield className="w-4 h-4" /> },
                      { id: 'documents', label: 'Documents & Reports', icon: <FileText className="w-4 h-4" /> },
                      { id: 'directory', label: 'Contact Directory', icon: <PhoneCall className="w-4 h-4" /> },
                    ].map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => handleSubSectionSelect(sec.id)}
                        className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-all text-left cursor-pointer border hover:scale-[1.01] active:scale-[0.99] ${
                          activeSubSection === sec.id
                            ? 'bg-slate-900 text-white shadow-lg border-cyan-500 font-bold'
                            : 'bg-white border-slate-150 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                        style={activeSubSection === sec.id ? {
                          borderColor: getPulsingBorderHex().replace('0.45', '1'),
                          boxShadow: `0 4px 12px ${getPulsingBorderHex()}`
                        } : {}}
                      >
                        <span className={activeSubSection === sec.id ? 'text-cyan-400' : 'text-slate-400'}>
                          {sec.icon}
                        </span>
                        <span>{sec.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Tiny instructions alert box */}
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 text-[11px] text-slate-500 space-y-1.5">
                    <div className="flex items-center space-x-1 text-slate-700 font-bold">
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                      <span>Color Animation Mode</span>
                    </div>
                    <p className="leading-relaxed">
                      Click sections above to shift the neon color spectrum dynamically. Try selecting other panels to watch the interface glow.
                    </p>
                  </div>
                </div>

                {/* Sub-Section Content Panel with Hue-gradient Shift border */}
                <div 
                  className={`lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm space-y-8 min-h-[480px] transition-all duration-500 ${
                    triggerPulse ? 'glowing-interactive-card' : ''
                  }`}
                  style={{
                    borderLeftWidth: '6px',
                    borderLeftColor: getPulsingBorderHex().replace('0.45', '1')
                  }}
                >
                  
                  {/* SECTION: PERMISSIONS & OFFICE SETTINGS */}
                  {activeSubSection === 'permissions' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                      
                      {/* Section intro header */}
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">Permissions & Settings (Aangoo)</h3>
                        <p className="text-xs text-slate-500">
                          Configure access passcodes and designate operational clearances for specific office coordinates or personal profiles.
                        </p>
                      </div>

                      {/* Flex grid for Password customizer vs appointee assignments */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                        
                        {/* Box 1: CUSTOM PASSCODE MODIFIER */}
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-150 space-y-4">
                          <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                            <Key className="w-4.5 h-4.5 text-blue-600" />
                            <h4 className="font-extrabold text-sm text-slate-900">Change Management Passcode</h4>
                          </div>

                          <form onSubmit={handleSaveNewPassword} className="space-y-3.5">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Password</label>
                              <div className="bg-white/80 border border-slate-200 px-3 py-2 rounded-lg text-xs font-mono font-bold text-slate-700 flex justify-between items-center">
                                <span>{storedPassword.replace(/./g, '•')}</span>
                                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-wider font-sans font-black">ACTIVE</span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">New Password (Jecha Darbii Haaraa)</label>
                              <input
                                type="password"
                                placeholder="Enter a secure new passcode..."
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg py-2 px-3 text-xs focus:outline-none transition-all"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Confirm Password</label>
                              <input
                                type="password"
                                placeholder="Verify the secure password..."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg py-2 px-3 text-xs focus:outline-none transition-all"
                              />
                            </div>

                            {passwordSuccessMsg && (
                              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold p-2.5 rounded-lg flex items-center space-x-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{passwordSuccessMsg}</span>
                              </div>
                            )}

                            <div className="flex gap-2 pt-1.5">
                              <button
                                type="submit"
                                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-sm"
                              >
                                Save New Passcode
                              </button>
                              <button
                                type="button"
                                onClick={handleResetPasscode}
                                className="px-3 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                              >
                                Reset Default
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* Box 2: PERMISSION CONTEXT SUMMARY */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-slate-200 rounded-2xl p-6 border border-slate-800 space-y-4">
                          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                            <Shield className="w-4.5 h-4.5 text-cyan-400" />
                            <h4 className="font-extrabold text-sm text-white">Security Matrix Rules</h4>
                          </div>

                          <div className="text-xs space-y-3 text-slate-300">
                            <p className="leading-relaxed">
                              Assign exclusive functional keys to local roles. Standard staff permissions lock client-facing sections under their designated domains.
                            </p>
                            <div className="space-y-2 pt-1.5">
                              <div className="flex justify-between text-[11px] font-mono border-b border-slate-850 pb-1.5">
                                <span className="text-slate-400 font-bold">Market manager:</span>
                                <span className="text-cyan-400 font-bold">Catalog control, retail items</span>
                              </div>
                              <div className="flex justify-between text-[11px] font-mono border-b border-slate-850 pb-1.5">
                                <span className="text-slate-400 font-bold">Vista Learning:</span>
                                <span className="text-cyan-400 font-bold">Academy registrars, grades</span>
                              </div>
                              <div className="flex justify-between text-[11px] font-mono border-b border-slate-850 pb-1.5">
                                <span className="text-slate-400 font-bold">Website manager:</span>
                                <span className="text-cyan-400 font-bold">School portals, NGO setups</span>
                              </div>
                              <div className="flex justify-between text-[11px] font-mono border-b border-slate-850 pb-1.5">
                                <span className="text-slate-400 font-bold">Publisher manager:</span>
                                <span className="text-cyan-400 font-bold">Wide banners, stamp seals</span>
                              </div>
                              <div className="flex justify-between text-[11px] font-mono">
                                <span className="text-slate-400 font-bold">Personal / Owner:</span>
                                <span className="text-pink-400 font-bold">Master root authorization</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* 2. MAIN DETAILED PERMISSIONS CHECKLIST ROWS */}
                      <div className="space-y-5">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                          <div className="space-y-0.5">
                            <h4 className="font-extrabold text-sm text-slate-900">Office & Personal Permission Mapping</h4>
                            <p className="text-[11px] text-slate-500">Grant custom functional access toggles to each manager. Changes apply instantly.</p>
                          </div>
                          {permSuccessMsg && (
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded border border-emerald-200">
                              ✓ {permSuccessMsg}
                            </span>
                          )}
                        </div>

                        <div className="space-y-4">
                          {Object.keys(permissions).map((roleKey) => {
                            const p = permissions[roleKey];
                            return (
                              <div 
                                key={roleKey} 
                                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all space-y-4 shadow-xs"
                              >
                                {/* Role Header with Custom name input */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-3">
                                  <div className="space-y-1 text-left">
                                    <h5 className="font-extrabold text-slate-900 text-xs tracking-tight uppercase font-mono">
                                      {roleKey}
                                    </h5>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[10px] text-slate-400 font-semibold font-mono">Permission Category:</span>
                                      <span className="bg-blue-50 text-blue-600 font-bold text-[9px] uppercase px-1.5 py-0.5 rounded font-mono">
                                        {roleKey === 'Personal Role' ? 'Personal / Owner' : 'Office Coordinates'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Appointee input */}
                                  <div className="flex items-center space-x-2 w-full md:w-auto">
                                    <span className="text-[11px] text-slate-500 shrink-0">Appointed Officer:</span>
                                    <input
                                      type="text"
                                      value={p.appointee}
                                      onChange={(e) => handleAppointeeChange(roleKey, e.target.value)}
                                      placeholder="Enter staff name..."
                                      className="bg-slate-50 border border-slate-200 focus:bg-white text-xs px-2.5 py-1.5 rounded-lg font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-48"
                                    />
                                  </div>
                                </div>

                                {/* Permissions matrix checklist buttons */}
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                                  {[
                                    { key: 'market', label: 'VISTA Market' },
                                    { key: 'learning', label: 'Vista Learning' },
                                    { key: 'web', label: 'Web Dev Portal' },
                                    { key: 'publisher', label: 'Vista Publisher' },
                                    { key: 'admin', label: 'System Admin' }
                                  ].map((perm) => {
                                    const isGranted = p[perm.key as keyof typeof p];
                                    return (
                                      <button
                                        key={perm.key}
                                        onClick={() => handlePermissionToggle(roleKey, perm.key as any)}
                                        className={`px-3 py-2.5 rounded-xl text-[10px] font-bold text-center border transition-all flex flex-col items-center justify-between gap-1.5 cursor-pointer ${
                                          isGranted
                                            ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                                            : 'bg-slate-50 text-slate-400 border-slate-150 hover:bg-slate-100 hover:text-slate-600'
                                        }`}
                                      >
                                        <span className="uppercase tracking-wider font-mono text-[8px]">{perm.label}</span>
                                        <div className="flex items-center gap-1 mt-0.5">
                                          <span className={`w-1.5 h-1.5 rounded-full ${isGranted ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`}></span>
                                          <span>{isGranted ? 'Granted' : 'Locked'}</span>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* SECTION: LEADERSHIP TEAM */}
                  {activeSubSection === 'team' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">Leadership Team</h3>
                        <p className="text-xs text-slate-500">The experienced tech visionaries directing VISTA's operations from Addis Ababa.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        {team.map((member, idx) => (
                          <div key={idx} className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
                            <div>
                              <img src={member.img} alt={member.name} className="w-full h-44 object-cover" referrerPolicy="no-referrer" />
                              <div className="p-5 space-y-2">
                                <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{member.name}</h4>
                                <p className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">{member.role}</p>
                                <p className="text-xs text-slate-500 leading-relaxed pt-1">{member.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION: DEPARTMENTS */}
                  {activeSubSection === 'departments' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">Organizational Structure & Departments</h3>
                        <p className="text-xs text-slate-500">Our structured business sectors optimized to coordinate branding solutions, software runs, and curriculum pathways.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {departments.map((dept, idx) => (
                          <div key={idx} className="bg-white border border-slate-150 rounded-2xl p-6 space-y-3.5 shadow-xs text-left">
                            <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                              <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{dept.name}</h4>
                              <span className="bg-slate-50 text-slate-500 font-mono text-[9px] px-2 py-0.5 rounded font-bold">{dept.staff}</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Department Lead:</p>
                              <p className="text-xs font-semibold text-slate-700">{dept.lead}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Primary Operations:</p>
                              <p className="text-xs text-slate-600 leading-relaxed">{dept.function}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION: CAREERS */}
                  {activeSubSection === 'careers' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">Careers & Opportunities</h3>
                        <p className="text-xs text-slate-500">Become a part of Ethiopia's premier technology and digital fabrication advancement network.</p>
                      </div>

                      <div className="space-y-4 pt-2">
                        {careers.map((job, idx) => (
                          <div key={idx} className="bg-white border border-slate-150 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs">
                            <div className="space-y-1.5">
                              <div className="flex flex-wrap gap-1.5">
                                <span className="bg-blue-50 text-blue-700 text-[8px] font-bold uppercase px-2 py-0.5 rounded">{job.dept}</span>
                                <span className="bg-slate-100 text-slate-600 text-[8px] font-bold uppercase px-2 py-0.5 rounded">{job.type}</span>
                              </div>
                              <h4 className="font-extrabold text-slate-900 text-sm">{job.title}</h4>
                              <p className="text-xs text-slate-500">{job.loc} • Salary: {job.salary}</p>
                            </div>

                            <button 
                              onClick={() => alert(`To apply for ${job.title}, please dispatch your professional portfolio coordinates to careers@vista-tech.com`)}
                              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                            >
                              Apply Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION: PARTNERS */}
                  {activeSubSection === 'partners' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">Partners & Collaborations</h3>
                        <p className="text-xs text-slate-500">We partner with universities, government bodies, and retail vendors across East Africa to deliver reliable digital architectures.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {[
                          { name: 'Addis Ababa University', role: 'Curriculum & Internship Partner', desc: 'Sponsoring top Computer Science graduates into our active full-stack web development programs.' },
                          { name: 'Ethiopian Ministry of Innovation and Technology', role: 'Strategic Supporter', desc: 'Coordinating high-resolution printing, branding materials, and digital learning programs.' },
                          { name: 'East Africa Digital Alliance', role: 'Standards Board Member', desc: 'Partnering on internet security standards and open coding pathways.' },
                          { name: 'Apex Logistics & Tech Sourcing', role: 'Supply Chain Partner', desc: 'Procuring original certified coding laptops, routers, switches, and high-resolution printers.' }
                        ].map((p, idx) => (
                          <div key={idx} className="bg-white border border-slate-150 rounded-2xl p-5 space-y-1.5 text-left shadow-xs">
                            <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{p.name}</h4>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider font-mono">{p.role}</p>
                            <p className="text-xs text-slate-500 leading-relaxed pt-1">{p.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION: POLICIES */}
                  {activeSubSection === 'policies' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">Corporate Policies</h3>
                        <p className="text-xs text-slate-500">VISTA governs all engineering, student cohorts, and fabrication transactions with transparency.</p>
                      </div>

                      <div className="space-y-4 pt-2">
                        {[
                          { title: 'Quality Sourcing Policy', body: 'All computers, laptops, routers, and surveillance accessories distributed through VISTA Market are sourced directly with 1-Year manufacturer warranties. We have a zero-tolerance policy for substandard clones.' },
                          { title: 'Security & Hosting Policy', body: 'All software and web applications deployed from our development desk include mandatory SSL certificates, automatic weekly database backups, and are hosted on highly stable container structures.' },
                          { title: 'Academic Code of Conduct', body: 'Students registering for the coding bootcamp or graphics academy must complete all practical tests independently to command course certificates. We encourage hands-on, original portfolio development.' },
                        ].map((p, idx) => (
                          <div key={idx} className="bg-white border border-slate-150 rounded-2xl p-6 text-left space-y-2 shadow-xs">
                            <h4 className="font-extrabold text-slate-900 text-sm leading-tight flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                              {p.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">{p.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION: DOCUMENTS & ANNUAL REPORTS */}
                  {activeSubSection === 'documents' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">Documents & Reports</h3>
                        <p className="text-xs text-slate-500">Verifiable corporate documents, annual reviews, and academic syllabus packages.</p>
                      </div>

                      {/* Operational stats */}
                      <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-0.5">
                          <p className="text-2xl font-black text-blue-600 font-display">250+</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Graduated Students</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-2xl font-black text-blue-600 font-display">12k+</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Custom Stamp Runs</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-2xl font-black text-blue-600 font-display">99.9%</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Web Server Uptime</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-1">
                        {documents.map((doc, idx) => (
                          <div key={idx} className="bg-white border border-slate-150 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-900 text-xs">{doc.title}</h4>
                              <p className="text-[10px] text-slate-400">{doc.type} • {doc.size} • {doc.downloads} downloads</p>
                            </div>
                            <button 
                              onClick={() => alert(`Your browser has successfully requested ${doc.title} download simulation!`)}
                              className="p-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION: CONTACT DIRECTORY */}
                  {activeSubSection === 'directory' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">Contact Directory</h3>
                        <p className="text-xs text-slate-500">Reach specific departmental desks directly for immediate service consultations.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {directory.map((dir, idx) => (
                          <div key={idx} className="bg-white border border-slate-150 rounded-2xl p-5 space-y-3 shadow-xs text-left">
                            <h4 className="font-extrabold text-slate-900 text-xs tracking-tight border-b border-slate-50 pb-2 flex items-center gap-2">
                              <PhoneCall className="w-4 h-4 text-blue-600" />
                              {dir.dept}
                            </h4>
                            <div className="space-y-1 text-xs">
                              <p className="text-slate-600"><strong>Phone:</strong> {dir.phone}</p>
                              <p className="text-slate-600"><strong>Email:</strong> {dir.email}</p>
                              <p className="text-slate-500 text-[10px] font-mono">Location: {dir.office}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </section>
          )}
        </>
      )}

    </div>
  );
}
