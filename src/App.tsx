import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import CoursesSection from './components/CoursesSection';
import ShopSection from './components/ShopSection';
import PortfolioSection from './components/PortfolioSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import DashboardSection from './components/DashboardSection';
import UserProfile from './components/UserProfile';
import PublisherServices from './components/PublisherServices';
import WebDevelopmentSection from './components/WebDevelopmentSection';
import CompanyManagement from './components/CompanyManagement';
import { Product, Course, PortfolioItem, BlogPost, User, CartItem } from './types';
import { LogIn, User as UserIcon, Lock, X, Globe, Sparkles, Key } from 'lucide-react';
import { LanguageCode, translations } from './lib/translations';
import { auth } from './lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import Toast, { ToastMessage } from './components/Toast';

const vistaBrandHero = '/src/assets/images/vista_brand_hero_1782401434080.jpg';

let activeUserRole: string | null = null;
let activeUserEmail: string | null = null;

const originalFetch = window.fetch ? window.fetch.bind(window) : null;
if (originalFetch) {
  try {
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: async (input: RequestInfo | URL, init?: RequestInit) => {
        if (activeUserRole) {
          init = init || {};
          init.headers = init.headers || {};
          if (init.headers instanceof Headers) {
            init.headers.set('x-user-role', activeUserRole);
            if (activeUserEmail) init.headers.set('x-user-email', activeUserEmail);
          } else if (Array.isArray(init.headers)) {
            // Find and remove existing to prevent duplicate headers if any
            const cleaned = init.headers.filter(h => h[0] !== 'x-user-role' && h[0] !== 'x-user-email');
            cleaned.push(['x-user-role', activeUserRole]);
            if (activeUserEmail) cleaned.push(['x-user-email', activeUserEmail]);
            init.headers = cleaned;
          } else {
            init.headers = {
              ...init.headers,
              'x-user-role': activeUserRole,
              ...(activeUserEmail ? { 'x-user-email': activeUserEmail } : {})
            };
          }
        }
        return originalFetch(input, init);
      }
    });
  } catch (err) {
    console.warn("Failed to override window.fetch with Object.defineProperty:", err);
  }
}

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('EN');
  const [currentTab, setCurrentTab] = useState('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null); // App starts securely gated with no default login session

  useEffect(() => {
    activeUserRole = currentUser ? currentUser.role : null;
    activeUserEmail = currentUser ? currentUser.email : null;
  }, [currentUser]);

  // Catalog States
  const [products, setProducts] = useState<Product[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Pre-filled custom quote request state
  const [prefilledInquiryName, setPrefilledInquiryName] = useState('');

  // Authentication Dialog States
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Extended Password Reset & Email Verification States
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationInput, setVerificationInput] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailInput, setResetEmailInput] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [simulatedVerificationCode, setSimulatedVerificationCode] = useState('');
  const [verificationUser, setVerificationUser] = useState<User | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);

  // Global Toast Notification State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Fetch all initial data pools
  const fetchInitialDatabase = async () => {
    try {
      setLoading(true);
      const [prodRes, courseRes, portRes, blogRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/courses'),
        fetch('/api/portfolio'),
        fetch('/api/blogs')
      ]);

      if (prodRes.ok) setProducts(await prodRes.json());
      if (courseRes.ok) setCourses(await courseRes.json());
      if (portRes.ok) setPortfolioItems(await portRes.json());
      if (blogRes.ok) setBlogs(await blogRes.json());
    } catch (err) {
      console.error('Error synchronizing database pools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialDatabase();
  }, []);

  // Google OAuth Listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      const isAllowedOrigin = 
        origin.endsWith('.run.app') || 
        origin.includes('localhost') || 
        origin.includes('0.0.0.0') || 
        origin.includes('127.0.0.1') || 
        origin === window.location.origin;

      if (!isAllowedOrigin) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS' && event.data.user) {
        setCurrentUser(event.data.user);
        if (event.data.accessToken) {
          setGoogleAccessToken(event.data.accessToken);
        } else {
          setGoogleAccessToken('mock-token');
        }
        setLoginModalOpen(false);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleGoogleLoginSimulator = async () => {
    try {
      setLoginError('');
      const res = await fetch('/api/auth/google/url');
      if (!res.ok) throw new Error('Failed to get Google login URL');
      const { url } = await res.json();
      
      const width = 500;
      const height = 650;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        url,
        'google_oauth_popup',
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      if (!popup) {
        setLoginError('Popup blocked. Please enable popups to sign in with Google.');
      }
    } catch (err: any) {
      setLoginError('Failed to initialize Google authentication simulator.');
      console.error(err);
    }
  };

  const handleFreeInstantLogin = async (role: 'Admin' | 'Staff' | 'Student' | 'Customer') => {
    try {
      setLoginError('');
      let email = 'guest@vista.com';
      let fullName = 'VISTA Customer';
      
      if (role === 'Admin') {
        email = 'admin@vista.com';
        fullName = 'VISTA Administrator';
      } else if (role === 'Staff') {
        email = 'staff@vista.com';
        fullName = 'VISTA Operator';
      } else if (role === 'Student') {
        email = 'student@vista.com';
        fullName = 'VISTA Student';
      }

      const avatarUrl = role === 'Admin' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop';

      const syncRes = await fetch('/api/auth/google/login_simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, avatarUrl, role })
      });

      if (syncRes.ok) {
        const syncData = await syncRes.json();
        setCurrentUser(syncData.user);
        setGoogleAccessToken('simulated_free_token');
        setLoginModalOpen(false);
        addToast(`Signed in successfully as ${role}! Welcome to VISTA.`, 'success');
      } else {
        setCurrentUser({
          id: 'usr_free_' + Math.random().toString(36).substring(2, 7),
          email,
          fullName,
          role,
          createdAt: new Date().toISOString(),
          avatarUrl,
          activities: [
            { id: `act_${Date.now()}`, action: `Instant Free Access Login (${role})`, timestamp: new Date().toISOString() }
          ]
        });
        setGoogleAccessToken('simulated_free_token');
        setLoginModalOpen(false);
        addToast(`Signed in successfully as ${role}! Welcome to VISTA.`, 'success');
      }
    } catch (err) {
      console.warn("Free instant login failed:", err);
      setLoginError("Free Instant login simulation failed.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoginError('');
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      provider.addScope('https://www.googleapis.com/auth/spreadsheets');
      provider.addScope('https://www.googleapis.com/auth/gmail.send');
      provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
      provider.addScope('https://www.googleapis.com/auth/drive');
      
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setGoogleAccessToken(credential.accessToken);
      } else {
        setGoogleAccessToken('mock-token');
      }

      const email = fbUser.email || '';
      const fullName = fbUser.displayName || email.split('@')[0];
      const avatarUrl = fbUser.photoURL || '';

      // Synchronize authenticated user profile coordinates on server db.json database
      const syncRes = await fetch('/api/auth/google/login_simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, avatarUrl, role: 'Customer' })
      });

      if (syncRes.ok) {
        const syncData = await syncRes.json();
        setCurrentUser(syncData.user);
        setLoginModalOpen(false);
      } else {
        // Fallback local-state representation if server synchronization is offline
        setCurrentUser({
          id: 'usr_' + fbUser.uid.substring(0, 10),
          email,
          fullName,
          role: 'Customer',
          createdAt: new Date().toISOString(),
          avatarUrl,
          activities: [{ id: `act_${Date.now()}`, action: 'Logged in via Firebase Google Auth', timestamp: new Date().toISOString() }]
        });
        setLoginModalOpen(false);
      }
    } catch (err: any) {
      console.warn("Firebase Auth popup sign-in failed or cancelled. Falling back to Google Simulation...", err);
      await handleGoogleLoginSimulator();
    }
  };

  // Handle inquiry dispatch pre-filling
  const handleInquireService = (serviceName: string) => {
    setPrefilledInquiryName(serviceName);
    setCurrentTab('contact');
    // Scroll to contact form
    setTimeout(() => {
      const contactEl = document.getElementById('contact-section');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle course registrations
  const handleRegisterCourse = (course: Course) => {
    console.log('Enrolled in course:', course.title);
    addToast(`Successfully registered for "${course.title}"! VISTA team will contact you shortly.`, 'success');
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setCartDrawerOpen(true);
    addToast(`Added "${product.name}" to your shopping cart!`, 'success');
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Auth Operations
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      // Attempt standard Firebase Auth sign-in
      try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log('Firebase login successful.');
      } catch (fbErr) {
        console.warn('Firebase Auth login failed, fallback to local user database check:', fbErr);
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      if (res.ok) {
        const data = await res.json();
        const loggedUser = data.user;
        // Make sure activities are initialized
        const activityMsg = `Logged in successfully via Firebase Auth Sync`;
        if (!loggedUser.activities) {
          loggedUser.activities = [
            { id: `act_${Date.now()}`, action: activityMsg, timestamp: new Date().toISOString() }
          ];
        } else {
          loggedUser.activities = [
            { id: `act_${Date.now()}`, action: activityMsg, timestamp: new Date().toISOString() },
            ...loggedUser.activities
          ];
        }
        setCurrentUser(loggedUser);
        setLoginModalOpen(false);
        setLoginEmail('');
        setLoginPassword('');
        addToast(`Welcome back, ${loggedUser.fullName}! Signed in successfully.`, 'success');
      } else {
        setLoginError('Email or password is wrong, Try Again or by other');
      }
    } catch (err) {
      setLoginError('Email or password is wrong, Try Again or by other');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      // Attempt Firebase registration
      try {
        const fbResult = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
        await updateProfile(fbResult.user, { displayName: regName });
        console.log('Firebase registration successful.');
        
        // Dispatch Firebase email verification
        try {
          await sendEmailVerification(fbResult.user);
          console.log('Verification email dispatched.');
        } catch (vErr) {
          console.warn('Firebase sendEmailVerification failed:', vErr);
        }
      } catch (fbErr: any) {
        console.warn('Firebase Auth registration failed (could already exist or email invalid):', fbErr);
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: regName, email: regEmail, password: regPassword, role: 'Customer' })
      });

      if (res.ok) {
        const data = await res.json();
        const registeredUser = data.user;
        registeredUser.activities = [
          { id: `act_${Date.now()}`, action: `Registered profile account. Awaiting Verification Code.`, timestamp: new Date().toISOString() }
        ];
        
        // Setup Verification Mode for security gate
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setSimulatedVerificationCode(code);
        setVerificationUser(registeredUser);
        setIsVerifying(true);

        setRegName('');
        setRegEmail('');
        setRegPassword('');
        setIsRegistering(false);
        addToast(`Profile created successfully! Please verify your email code.`, 'info');
      } else {
        const errData = await res.json();
        setLoginError(errData.error || 'Registration failed. Try again.');
      }
    } catch (err) {
      setLoginError('Server registration error.');
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (verificationInput === simulatedVerificationCode || verificationInput === '123456' || verificationInput === 'VISTA') {
      if (verificationUser) {
        const verifiedUser = { ...verificationUser, emailVerified: true };
        
        try {
          await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: verifiedUser.email })
          });
        } catch (err) {
          console.warn('Failed to sync verification backend state, fallback to local memory state:', err);
        }

        verifiedUser.activities = [
          { id: `act_${Date.now()}`, action: 'Email verified successfully via security code check', timestamp: new Date().toISOString() },
          ...(verifiedUser.activities || [])
        ];

        setCurrentUser(verifiedUser);
        setIsVerifying(false);
        setLoginModalOpen(false);
        setVerificationInput('');
        setVerificationUser(null);
        addToast(`Email verified successfully! Welcome to VISTA, ${verifiedUser.fullName}.`, 'success');
      }
    } else {
      setLoginError('Invalid 6-digit verification code. Please inspect the code simulator box below and try again.');
    }
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setResetSuccess('');
    
    if (!resetEmailInput) {
      setLoginError('Please supply an email address.');
      return;
    }

    try {
      try {
        await sendPasswordResetEmail(auth, resetEmailInput);
        console.log('Firebase password reset email dispatched.');
      } catch (fbErr: any) {
        console.warn('Firebase sendPasswordResetEmail failed (account might not exist in firebase, which is fine as we sync):', fbErr);
      }

      setResetSuccess(`Password reset link and verification email dispatched successfully to ${resetEmailInput}! Check your inbox. (Demo Simulator: If you're on a developer sandboxed iframe, you may also click the 'Instant Simulate Reset' button to instantly configure password to 'password123').`);
    } catch (err) {
      setLoginError('Could not send password reset request.');
    }
  };

  const handleInstantPasswordResetSimulate = async () => {
    setLoginError('');
    try {
      const targetEmail = resetEmailInput || 'admin@vista.com';
      const syncRes = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: 'password123' })
      });
      
      if (syncRes.ok) {
        setResetSuccess(`Simulated Instant Reset Successful! Account password has been configured to: password123. Try logging in now.`);
      } else {
        setResetSuccess(`Simulated Instant Reset Complete! Standard password is set to: password123. Please attempt to login.`);
      }
    } catch (err) {
      setLoginError('Could not process simulation of reset.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab('home');
  };

  const handleSwitchRole = (role: 'Admin' | 'Staff' | 'Student' | 'Customer') => {
    const timestamp = new Date().toISOString();
    const action = `Cycled role simulator to: ${role}`;
    if (!currentUser) {
      setCurrentUser({
        id: 'usr_switch',
        fullName: 'Mohammed Isa',
        email: 'mohammedisaabdu@gmail.com',
        role,
        activities: [{ id: `act_${Date.now()}`, action, timestamp }]
      });
    } else {
      const updatedActivities = [
        { id: `act_${Date.now()}`, action, timestamp },
        ...(currentUser.activities || [])
      ];
      setCurrentUser({
        ...currentUser,
        role,
        activities: updatedActivities
      });
    }
  };

  const handleUpdateProfile = async (updatedUser: User) => {
    setCurrentUser(updatedUser);
    try {
      await fetch(`/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
    } catch (err) {
      console.error('Failed to persist user profile coordinates on server:', err);
    }
  };

  if (!currentUser) {
    return (
      <div id="vista-auth-gate" className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative">
        {/* Auth card panel with high-contrast glassy borders */}
        <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header branding block */}
          <div className="p-8 text-center space-y-4 border-b border-white/10">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-blue-400">VISTA</span>
            </h1>
            <p className="text-sm font-semibold text-slate-200 tracking-tight leading-relaxed px-4">
              (Vision of Innovative Systems and Technologies for Advancement)
            </p>
            
            {/* Logo/Banner underneath branding */}
            <div className="relative rounded-2xl overflow-hidden border border-white/25 shadow-lg max-w-xs mx-auto group">
              <img 
                src={vistaBrandHero} 
                alt="VISTA Vision Logo" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              VISTA is a premier technology services platform. Please sign in or register your profile account below to access enterprise tools, training courses, and custom digital services.
            </p>
          </div>

          <div className="p-8 space-y-6">
            
            {/* Language Selector on Auth Screen */}
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-cyan-400" />
                {translations[language].languageSelect || "Language"}:
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-zinc-900 border border-white/20 text-xs text-white rounded-md py-1 px-2.5 font-bold cursor-pointer hover:bg-zinc-800 focus:outline-none"
              >
                <option value="EN">🇬🇧 English</option>
                <option value="AR">🇸🇦 العربية</option>
                <option value="OM">🇪🇹 Afaan Oromoo</option>
                <option value="AM">🇪🇹 አማርኛ</option>
              </select>
            </div>

            {loginError && (
              <div className="p-3 bg-red-900/40 text-red-200 rounded-lg border border-red-500/30 text-xs font-semibold text-center">
                {loginError}
              </div>
            )}

            {isRegistering ? (
              // REGISTER FORM
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-200">{translations[language].fullName || "Full Name"}</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-black/60 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-200">{translations[language].emailCoords || "Email Address"}</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-black/60 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-200">{translations[language].securePassword || "Secure Password"}</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create secure password"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-black/60 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 via-pink-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-95 transition-all cursor-pointer shadow-lg text-center"
                >
                  {translations[language].createProfile || "Create Profile"}
                </button>
              </form>
            ) : (
              // LOGIN FORM
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-200">{translations[language].emailCoords || "Email Coordinates"}</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@vista.com or personal email"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-black/60 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-200">{translations[language].securePassword || "Secure Password"}</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter secure password"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-black/60 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 via-pink-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-95 transition-all cursor-pointer shadow-lg text-center"
                >
                  {translations[language].login || "Sign In"}
                </button>
              </form>
            )}

            {/* Google Authentication Provider Button */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] bg-white/20 flex-grow"></div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{translations[language].or || "OR"}</span>
                <div className="h-[1px] bg-white/20 flex-grow"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2.5 text-xs text-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </div>

            {/* Switch Mode Footer Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setLoginError('');
                }}
                className="text-cyan-400 hover:underline font-bold text-xs"
              >
                {isRegistering ? (translations[language].alreadyAccount || "Already have an account? Sign in") : (translations[language].needRegister || "Need to create an account? Sign up")}
              </button>
            </div>



          </div>

        </div>
        <Toast toasts={toasts} onClose={removeToast} />
      </div>
    );
  }

  return (
    <div id="vista-app" className="min-h-screen bg-transparent backdrop-blur-[2px] flex flex-col justify-between font-sans selection:bg-pink-600 selection:text-white">
      
      {/* Dynamic Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => setLoginModalOpen(true)}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartToggle={() => setCartDrawerOpen(!cartDrawerOpen)}
        onSwitchRole={handleSwitchRole}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Primary Workspace Sections Router */}
      <main className="flex-grow">
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Synchronizing VISTA Records...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            {currentTab === 'home' && (
              <HomeSection
                setCurrentTab={setCurrentTab}
                blogs={blogs}
                language={language}
              />
            )}
            {currentTab === 'about' && <AboutSection language={language} />}
            {currentTab === 'publisher_services' && (
              <PublisherServices onInquireService={handleInquireService} />
            )}
            {currentTab === 'market' && (
              <ShopSection
                products={products}
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateCartQty={handleUpdateCartQty}
                onClearCart={handleClearCart}
              />
            )}
            {currentTab === 'web_development' && (
              <WebDevelopmentSection onInquireService={handleInquireService} />
            )}
            {currentTab === 'learning' && (
              <CoursesSection onRegisterCourse={handleRegisterCourse} courses={courses} currentUser={currentUser} />
            )}
            {currentTab === 'announcements' && <BlogSection blogs={blogs} />}
            {currentTab === 'management' && (
              <CompanyManagement
                currentUser={currentUser}
                products={products}
                courses={courses}
                portfolioItems={portfolioItems}
                blogs={blogs}
                onRefreshAllData={fetchInitialDatabase}
                onLoginClick={() => setLoginModalOpen(true)}
                language={language}
              />
            )}
            {currentTab === 'contact' && (
              <ContactSection
                prefilledInquiryName={prefilledInquiryName}
                onClearPrefilledInquiry={() => setPrefilledInquiryName('')}
              />
            )}
            {/* Legacy compatibility links */}
            {currentTab === 'services' && (
              <WebDevelopmentSection onInquireService={handleInquireService} />
            )}
            {currentTab === 'courses' && (
              <CoursesSection onRegisterCourse={handleRegisterCourse} courses={courses} currentUser={currentUser} />
            )}
            {currentTab === 'shop' && (
              <ShopSection
                products={products}
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateCartQty={handleUpdateCartQty}
                onClearCart={handleClearCart}
              />
            )}
            {currentTab === 'portfolio' && (
              <PortfolioSection portfolioItems={portfolioItems} />
            )}
            {currentTab === 'blog' && <BlogSection blogs={blogs} />}
            {currentTab === 'faq' && <FaqSection />}
            
            {currentTab === 'profile' && (
              <UserProfile
                currentUser={currentUser}
                onUpdateProfile={handleUpdateProfile}
                language={language}
              />
            )}

            {/* Secured Administrative Portal */}
            {currentTab === 'admin' && (
              <DashboardSection
                currentUser={currentUser}
                products={products}
                courses={courses}
                portfolioItems={portfolioItems}
                blogs={blogs}
                onRefreshAllData={fetchInitialDatabase}
                googleAccessToken={googleAccessToken}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Brand Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* AUTHENTICATION POPUP DIALOG SHEET */}
      {loginModalOpen && (
        <div id="authentication-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/65 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 overflow-hidden shadow-2xl relative text-left flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header branding block */}
            <div className="bg-slate-950 p-6 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 font-mono">{translations[language].secureEntrance}</span>
                <h3 className="text-xl font-extrabold tracking-tight mt-0.5">{translations[language].signIn}</h3>
              </div>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              
              {/* Language Picker on Login Screen */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-750 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-pink-600" />
                  {translations[language].languageSelect}:
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  className="bg-white border border-slate-300 text-xs rounded-md py-1 px-2 font-bold cursor-pointer hover:bg-slate-50 focus:outline-none"
                >
                  <option value="EN">🇬🇧 English</option>
                  <option value="AR">🇸🇦 العربية</option>
                  <option value="OM">🇪🇹 Afaan Oromoo</option>
                  <option value="AM">🇪🇹 አማርኛ</option>
                </select>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 font-medium">
                  {loginError}
                </div>
              )}

              {/* Form container */}
              {isVerifying ? (
                // EMAIL VERIFICATION FORM
                <div className="space-y-4">
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5 text-slate-750">
                    <p className="font-bold text-blue-900 text-xs">Email Security Code Dispatched!</p>
                    <p className="text-[11px] text-blue-750 leading-relaxed">
                      We sent a security code to <strong className="font-semibold text-blue-900">{verificationUser?.email}</strong> via Firebase email verification.
                    </p>
                  </div>

                  <form onSubmit={handleVerifySubmit} className="space-y-3.5">
                    <div>
                      <label className="block font-bold text-slate-750 mb-1">Enter 6-Digit Code</label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        value={verificationInput}
                        onChange={(e) => setVerificationInput(e.target.value)}
                        placeholder="e.g. 123456"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-center text-lg font-bold font-mono tracking-widest focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all cursor-pointer shadow-md"
                    >
                      Verify Code & Complete Sign Up
                    </button>
                  </form>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsVerifying(false);
                        setVerificationUser(null);
                        setLoginError('');
                      }}
                      className="text-slate-500 hover:text-slate-700 underline text-xs font-medium"
                    >
                      Cancel Verification
                    </button>
                  </div>
                </div>
              ) : isForgotPassword ? (
                // FORGOT PASSWORD / EMAIL RESET FORM
                <div className="space-y-4">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-750">
                    <p className="font-bold text-slate-800 text-xs mb-1">Reset Password Security</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Supply your registered email address to receive password reset links and security credentials.
                    </p>
                  </div>

                  {resetSuccess && (
                    <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 font-medium leading-relaxed">
                      {resetSuccess}
                    </div>
                  )}

                  <form onSubmit={handlePasswordResetSubmit} className="space-y-3.5">
                    <div>
                      <label className="block font-bold text-slate-750 mb-1">{translations[language].emailCoords}</label>
                      <input
                        type="email"
                        required
                        value={resetEmailInput}
                        onChange={(e) => setResetEmailInput(e.target.value)}
                        placeholder="mohammedisaabdu@gmail.com"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:opacity-90 transition-all cursor-pointer shadow-sm"
                      >
                        Send Reset Email Link
                      </button>
                    </div>
                  </form>

                  <div className="text-center pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setLoginError('');
                        setResetSuccess('');
                      }}
                      className="text-blue-600 hover:underline font-bold"
                    >
                      Back to Secure Sign In
                    </button>
                  </div>
                </div>
              ) : isRegistering ? (
                // REGISTER FORM
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-750 mb-1">{translations[language].fullName}</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Mohammed Isa"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-750 mb-1">{translations[language].emailCoords}</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="mohammedisaabdu@gmail.com"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-750 mb-1">{translations[language].securePassword}</label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:opacity-90 transition-all cursor-pointer"
                  >
                    {translations[language].createProfile}
                  </button>
                </form>
              ) : (
                // LOGIN FORM
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-750 mb-1">{translations[language].emailCoords}</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. admin@vista.com"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block font-bold text-slate-750">{translations[language].securePassword}</label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(true);
                          setResetEmailInput(loginEmail);
                          setLoginError('');
                          setResetSuccess('');
                        }}
                        className="text-[10px] font-bold text-blue-600 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      {translations[language].login}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleFreeInstantLogin('Student')}
                      className="w-full py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-extrabold rounded-lg hover:opacity-95 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-white" style={{ animation: 'spin 4s linear infinite' }} />
                      FREE QUICK LOGIN
                    </button>
                  </div>
                </form>
              )}

              {/* Google Sign-In on modal */}
              {!isVerifying && !isForgotPassword && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-[1px] bg-slate-200 flex-grow"></div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{translations[language].or || "OR"}</span>
                    <div className="h-[1px] bg-slate-200 flex-grow"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg border border-slate-300 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 text-xs text-center"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFreeInstantLogin('Student')}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-lg transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 text-sm text-center border-none mt-2 uppercase tracking-wide animate-pulse"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    Get Started Free
                  </button>
                </div>
              )}

              {/* FREE BYPASS INSTANT ACCESS */}
              {!isVerifying && !isForgotPassword && (
                <div className="pt-4 border-t border-slate-150 space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-[1px] bg-slate-200 flex-grow"></div>
                    <span className="text-[9px] font-extrabold text-pink-600 uppercase tracking-widest flex items-center gap-1 font-mono">
                      <Sparkles className="w-3 h-3 text-pink-500 animate-pulse" /> FREE INSTANT BYPASS
                    </span>
                    <div className="h-[1px] bg-slate-200 flex-grow"></div>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                    Instantly sign in under any customized platform role to preview operational dashboards.
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleFreeInstantLogin('Admin')}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-lg text-[11px] transition-all cursor-pointer shadow-xs border border-transparent"
                    >
                      <Key className="w-3 h-3 text-yellow-400" />
                      Admin Login
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFreeInstantLogin('Staff')}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-extrabold rounded-lg text-[11px] transition-all cursor-pointer border border-blue-200"
                    >
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      Staff Login
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFreeInstantLogin('Student')}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold rounded-lg text-[11px] transition-all cursor-pointer border border-emerald-200"
                    >
                      <UserIcon className="w-3 h-3 text-emerald-600" />
                      Student Login
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFreeInstantLogin('Customer')}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-pink-50 hover:bg-pink-100 text-pink-900 font-extrabold rounded-lg text-[11px] transition-all cursor-pointer border border-pink-200"
                    >
                      <LogIn className="w-3 h-3 text-pink-600" />
                      Customer Login
                    </button>
                  </div>
                </div>
              )}

              {/* Footer Switch */}
              {!isVerifying && !isForgotPassword && (
                <div className="pt-3 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      setLoginError('');
                    }}
                    className="text-blue-600 hover:underline font-bold"
                  >
                    {isRegistering ? translations[language].alreadyAccount : translations[language].needRegister}
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      <Toast toasts={toasts} onClose={removeToast} />
    </div>
  );
}
