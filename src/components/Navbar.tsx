import React, { useState } from 'react';
import { Menu, X, ShoppingCart, ShieldAlert, LogIn, User as UserIcon, BookOpen, Layers } from 'lucide-react';
import { User } from '../types';
import { LanguageCode, translations } from '../lib/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  cartCount: number;
  onCartToggle: () => void;
  onSwitchRole: (role: 'Admin' | 'Staff' | 'Student' | 'Customer') => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  currentUser,
  onLogout,
  onLoginClick,
  cartCount,
  onCartToggle,
  onSwitchRole,
  language,
  setLanguage
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const t = translations[language];

  const allNavItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'publisher_services', label: t.navPublisherServices },
    { id: 'market', label: t.navMarket },
    { id: 'web_development', label: t.navWebDevelopment },
    { id: 'learning', label: t.navLearning },
    { id: 'announcements', label: t.navAnnouncements },
    { id: 'management', label: t.navManagement },
    { id: 'contact', label: t.navContact },
  ];

  const navItems = allNavItems.filter((item) => {
    if (!currentUser) return true;
    const role = currentUser.role;
    if (role === 'Admin') return true;
    if (role === 'Staff') {
      // Staff manages services, courses, and blog. They see everything except shop (optional) or they see everything
      return true;
    }
    if (role === 'Student') {
      // Student has access to courses, blog announcements, about, home, and contact
      return ['home', 'about', 'learning', 'announcements', 'contact'].includes(item.id);
    }
    if (role === 'Customer') {
      // Customers browse services, shop/market, blog, contact, etc. No management.
      return item.id !== 'management';
    }
    return true;
  });

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav id="app-navbar" className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Toggle (Left on Mobile) */}
          <div className="flex lg:hidden mr-2">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-xl tracking-wider shadow-lg shadow-blue-500/20 mr-3 border border-blue-400">
              V
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">VISTA</span>
              <p className="hidden md:block text-[10px] text-slate-400 uppercase tracking-widest font-mono">Vision for Advancement</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  currentTab === item.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Panel Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Shopping Cart Button */}
            <button
              id="cart-toggle-btn"
              onClick={onCartToggle}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200 cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg py-1.5 px-2.5 font-bold cursor-pointer hover:bg-slate-750 focus:outline-none focus:ring-1 focus:ring-pink-500"
              >
                <option value="EN">🇬🇧 English</option>
                <option value="AR">🇸🇦 العربية</option>
                <option value="OM">🇪🇹 Afaan Oromoo</option>
                <option value="AM">🇪🇹 አማርኛ</option>
              </select>
            </div>

            {/* Quick Demo Role-Switching Dropdown */}
            <div className="relative">
              <button
                id="role-switch-btn"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 rounded-lg text-xs font-mono text-slate-300 flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <span>Role: {currentUser ? currentUser.role : t.guest}</span>
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 font-sans">
                  <div className="px-4 py-2 bg-slate-950 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                    Simulate User Roles
                  </div>
                  <div className="p-1.5 grid gap-1">
                    {[
                      { role: 'Admin', desc: 'Manage system catalog, inquiries', color: 'text-amber-400' },
                      { role: 'Staff', desc: 'Edit products, services, blogs', color: 'text-blue-400' },
                      { role: 'Student', desc: 'Browse and register for courses', color: 'text-purple-400' },
                      { role: 'Customer', desc: 'Purchase items, post inquiries', color: 'text-emerald-400' },
                    ].map((item) => (
                      <button
                        key={item.role}
                        onClick={() => {
                          onSwitchRole(item.role as any);
                          setRoleMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-750 hover:bg-slate-700 transition-colors flex flex-col cursor-pointer"
                      >
                        <span className={`font-semibold ${item.color}`}>Roleplay: {item.role}</span>
                        <span className="text-[10px] text-slate-400">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Authentication Button */}
            {currentUser ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
                <button
                  onClick={() => setCurrentTab('profile')}
                  className="flex items-center space-x-2 p-1 hover:bg-slate-800 rounded-lg text-left transition-all group cursor-pointer"
                  title="View Profile"
                >
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName}
                      className="w-8 h-8 rounded-full object-cover border border-zinc-700 group-hover:border-white transition-all"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-300 flex items-center justify-center font-bold text-sm border border-blue-500/30 group-hover:border-white transition-all">
                      {currentUser.fullName.charAt(0)}
                    </div>
                  )}
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-semibold leading-tight text-slate-200 group-hover:text-white">{currentUser.fullName}</p>
                    <p className="text-[10px] text-slate-400 font-mono leading-none">{currentUser.role}</p>
                  </div>
                </button>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-all cursor-pointer"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                id="login-trigger-btn"
                onClick={onLoginClick}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-blue-600/20 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.login}</span>
              </button>
            )}
          </div>

          {/* Mobile menu and actions button */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Cart Button Mobile */}
            <button
              onClick={onCartToggle}
              className="relative p-2 text-slate-300 hover:text-white rounded-lg cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="p-1 bg-slate-800 text-[10px] text-slate-200 rounded border border-slate-700 cursor-pointer font-bold focus:outline-none"
            >
              <option value="EN">🇬🇧 English</option>
              <option value="AR">🇸🇦 العربية</option>
              <option value="OM">🇪🇹 Afaan Oromoo</option>
              <option value="AM">🇪🇹 አማርኛ</option>
            </select>

            {/* Quick Demo Mode Switcher Mobile */}
            <button
              onClick={() => {
                const roles: ('Admin' | 'Staff' | 'Student' | 'Customer')[] = ['Admin', 'Staff', 'Student', 'Customer'];
                const currentIdx = currentUser ? roles.indexOf(currentUser.role) : -1;
                const nextRole = roles[(currentIdx + 1) % roles.length];
                onSwitchRole(nextRole);
              }}
              className="p-1.5 bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-700 cursor-pointer"
              title="Cycles through available user roles"
            >
              Role: {currentUser ? currentUser.role : t.guest} 🔄
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium ${
                currentTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Login / User info */}
          <div className="pt-4 mt-4 border-t border-slate-800">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setCurrentTab('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-slate-800 rounded-lg text-left transition-all group cursor-pointer"
                >
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-300 flex items-center justify-center font-bold">
                      {currentUser.fullName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white">{currentUser.fullName}</h4>
                    <p className="text-xs text-slate-400">{currentUser.email}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{t.role}: {currentUser.role}</p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-center block px-4 py-2 border border-slate-700 text-slate-300 rounded-lg text-base font-medium hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLoginClick();
                }}
                className="w-full text-center block px-4 py-2.5 bg-blue-600 text-white rounded-lg text-base font-semibold shadow-md hover:bg-blue-500 cursor-pointer"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
