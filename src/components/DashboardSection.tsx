import React, { useState, useEffect } from 'react';
import {
  Layers, Users as UsersIcon, ShoppingCart, BookOpen, FileText, Briefcase,
  TrendingUp, Plus, Edit2, Trash2, CheckCircle, RefreshCw, X, AlertTriangle, ArrowUpRight
} from 'lucide-react';
import { Product, Course, PortfolioItem, BlogPost, Inquiry, User, UserRole } from '../types';
import RoleOverviewWidget from './RoleOverviewWidget';

interface DashboardSectionProps {
  currentUser: User | null;
  products: Product[];
  courses: Course[];
  portfolioItems: PortfolioItem[];
  blogs: BlogPost[];
  onRefreshAllData: () => void;
  googleAccessToken?: string | null;
}

interface AnalyticsData {
  metrics: {
    totalProducts: number;
    totalCourses: number;
    totalInquiries: number;
    pendingInquiries: number;
    totalUsers: number;
    registrationCount: number;
    simulatedSales: number;
  };
  recentInquiries: Inquiry[];
  categoryStock: { name: string; stock: number }[];
}

export default function DashboardSection({
  currentUser,
  products,
  courses,
  portfolioItems,
  blogs,
  onRefreshAllData,
  googleAccessToken
}: DashboardSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'inquiries' | 'products' | 'courses' | 'portfolio' | 'blogs' | 'users' | 'workspace'>('overview');
  
  // ========================================================
  // GOOGLE WORKSPACE HUB STATES & LIFECYCLES
  // ========================================================
  const [activeWorkspaceSubTab, setActiveWorkspaceSubTab] = useState<'sheets' | 'gmail'>('sheets');
  const [spreadsheets, setSpreadsheets] = useState<{ id: string; name: string }[]>([]);
  const [loadingSheets, setLoadingSheets] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<{ id: string; name: string; values: string[][] } | null>(null);
  const [loadingSheetDetail, setLoadingSheetDetail] = useState(false);
  const [newSheetName, setNewSheetName] = useState('');
  const [appendRowData, setAppendRowData] = useState<string[]>([]);
  const [isAppending, setIsAppending] = useState(false);

  const [emails, setEmails] = useState<{ id: string; sender: string; subject: string; date: string; snippet: string; content: string }[]>([]);
  const [loadingEmails, setLoadingEmails] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<{ id: string; sender: string; subject: string; date: string; snippet: string; content: string } | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [emailComposeTo, setEmailComposeTo] = useState('');
  const [emailComposeSubject, setEmailComposeSubject] = useState('');
  const [emailComposeBody, setEmailComposeBody] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchSpreadsheets = async () => {
    setLoadingSheets(true);
    try {
      const headers: HeadersInit = {};
      if (googleAccessToken) {
        headers['Authorization'] = `Bearer ${googleAccessToken}`;
      }
      const res = await fetch('/api/workspace/sheets', { headers });
      if (res.ok) {
        const data = await res.json();
        setSpreadsheets(data);
        if (data.length > 0 && !selectedSheet) {
          fetchSpreadsheetDetail(data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch spreadsheets:', err);
    } finally {
      setLoadingSheets(false);
    }
  };

  const fetchSpreadsheetDetail = async (sheetId: string) => {
    setLoadingSheetDetail(true);
    try {
      const headers: HeadersInit = {};
      if (googleAccessToken) {
        headers['Authorization'] = `Bearer ${googleAccessToken}`;
      }
      const res = await fetch(`/api/workspace/sheets/${sheetId}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setSelectedSheet(data);
        const colsCount = data.values && data.values[0] ? data.values[0].length : 4;
        setAppendRowData(Array(colsCount).fill(''));
      }
    } catch (err) {
      console.error('Failed to fetch sheet detail:', err);
    } finally {
      setLoadingSheetDetail(false);
    }
  };

  const handleCreateSpreadsheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSheetName.trim()) return;
    try {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (googleAccessToken) {
        headers['Authorization'] = `Bearer ${googleAccessToken}`;
      }
      const res = await fetch('/api/workspace/sheets/create', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: newSheetName })
      });
      if (res.ok) {
        const data = await res.json();
        setNewSheetName('');
        await fetchSpreadsheets();
        fetchSpreadsheetDetail(data.id);
      }
    } catch (err) {
      console.error('Failed to create spreadsheet:', err);
    }
  };

  const handleAppendRow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSheet) return;
    setIsAppending(true);
    try {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (googleAccessToken) {
        headers['Authorization'] = `Bearer ${googleAccessToken}`;
      }
      const res = await fetch(`/api/workspace/sheets/${selectedSheet.id}/append`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ values: [appendRowData] })
      });
      if (res.ok) {
        fetchSpreadsheetDetail(selectedSheet.id);
      }
    } catch (err) {
      console.error('Failed to append row:', err);
    } finally {
      setIsAppending(false);
    }
  };

  const fetchEmails = async () => {
    setLoadingEmails(true);
    try {
      const headers: HeadersInit = {};
      if (googleAccessToken) {
        headers['Authorization'] = `Bearer ${googleAccessToken}`;
      }
      const res = await fetch('/api/workspace/gmail', { headers });
      if (res.ok) {
        const data = await res.json();
        setEmails(data);
        if (data.length > 0 && !selectedEmail) {
          setSelectedEmail(data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch emails:', err);
    } finally {
      setLoadingEmails(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailComposeTo || !emailComposeSubject || !emailComposeBody) return;
    setIsSendingEmail(true);
    try {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (googleAccessToken) {
        headers['Authorization'] = `Bearer ${googleAccessToken}`;
      }
      const res = await fetch('/api/workspace/gmail/send', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          to: emailComposeTo,
          subject: emailComposeSubject,
          body: emailComposeBody
        })
      });
      if (res.ok) {
        setEmailComposeTo('');
        setEmailComposeSubject('');
        setEmailComposeBody('');
        setShowCompose(false);
        setShowConfirmModal(false);
        await fetchEmails();
      }
    } catch (err) {
      console.error('Failed to send email:', err);
    } finally {
      setIsSendingEmail(false);
    }
  };

  useEffect(() => {
    if (activeSubTab === 'workspace') {
      fetchSpreadsheets();
      fetchEmails();
    }
  }, [activeSubTab, googleAccessToken]);
  
  // Dynamic backend-derived analytics
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  
  // Dashboard listings state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);

  // Form states & Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<'product' | 'course' | 'portfolio' | 'blog' | 'user' | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Unified dynamic Form Data
  const [productForm, setProductForm] = useState<Partial<Product>>({ name: '', price: 0, category: 'laptops', description: '', image: '', stockStatus: 'In Stock', stockCount: 10, specifications: [] });
  const [courseForm, setCourseForm] = useState<Partial<Course>>({ title: '', price: 0, category: 'basic', duration: '', level: 'Beginner', description: '', outcomes: [] });
  const [portfolioForm, setPortfolioForm] = useState<Partial<PortfolioItem>>({ title: '', category: 'websites', description: '', image: '', client: '', completionDate: '', link: '' });
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({ title: '', category: 'Technology', excerpt: '', content: '', image: '', author: currentUser?.fullName || 'VISTA Editor', readTime: '5 min read' });
  const [userForm, setUserForm] = useState<Partial<User>>({ fullName: '', email: '', role: 'Customer' });

  // Input states for comma-separated list parser
  const [specsInput, setSpecsInput] = useState('');
  const [outcomesInput, setOutcomesInput] = useState('');

  // Fetch Analytics & Dynamic Listings from backend
  const fetchDashboardData = async () => {
    setLoadingAnalytics(true);
    setLoadingListings(true);
    try {
      const analyticRes = await fetch('/api/analytics');
      if (analyticRes.ok) {
        const data = await analyticRes.json();
        setAnalytics(data);
      }

      const inquiryRes = await fetch('/api/inquiries');
      if (inquiryRes.ok) {
        const data = await inquiryRes.json();
        setInquiries(data);
      }

      const usersRes = await fetch('/api/users');
      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Error fetching dashboard backend details:', err);
    } finally {
      setLoadingAnalytics(false);
      setLoadingListings(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeSubTab, products, courses, portfolioItems, blogs]);

  // Handle Inquiry Status Update
  const handleInquiryStatus = async (id: string, newStatus: 'Pending' | 'Contacted' | 'Enrolled' | 'Declined') => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchDashboardData();
        onRefreshAllData();
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  // Generic Deletion Utility
  const handleDeleteItem = async (apiPath: string, itemId: string) => {
    if (!window.confirm('Are you absolutely sure you want to delete this item?')) return;
    try {
      const response = await fetch(`${apiPath}/${itemId}`, { method: 'DELETE' });
      if (response.ok) {
        fetchDashboardData();
        onRefreshAllData();
      }
    } catch (err) {
      console.error(`Deletion failed for path ${apiPath}:`, err);
    }
  };

  // Submit create or edit form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let bodyData: any = {};
    let url = '';
    let method = formMode === 'create' ? 'POST' : 'PUT';

    if (formType === 'product') {
      url = formMode === 'create' ? '/api/products' : `/api/products/${editingId}`;
      bodyData = {
        ...productForm,
        specifications: specsInput.split('\n').filter(s => s.trim() !== ''),
        price: Number(productForm.price),
        stockCount: Number(productForm.stockCount)
      };
      if (!bodyData.image) bodyData.image = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=60';
    } else if (formType === 'course') {
      url = formMode === 'create' ? '/api/courses' : `/api/courses/${editingId}`;
      bodyData = {
        ...courseForm,
        outcomes: outcomesInput.split('\n').filter(o => o.trim() !== ''),
        price: Number(courseForm.price)
      };
    } else if (formType === 'portfolio') {
      url = formMode === 'create' ? '/api/portfolio' : `/api/portfolio/${editingId}`;
      bodyData = { ...portfolioForm };
      if (!bodyData.image) bodyData.image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60';
    } else if (formType === 'blog') {
      url = formMode === 'create' ? '/api/blogs' : `/api/blogs/${editingId}`;
      bodyData = { ...blogForm };
      if (!bodyData.image) bodyData.image = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=60';
    } else if (formType === 'user') {
      url = formMode === 'create' ? '/api/users' : `/api/users/${editingId}`;
      bodyData = { ...userForm };
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchDashboardData();
        onRefreshAllData();
      } else {
        alert('Action failed. Check fields and try again.');
      }
    } catch (err) {
      console.error('Form submission failed:', err);
    }
  };

  // Open Form in Create Mode
  const openCreateModal = (type: typeof formType) => {
    setFormType(type);
    setFormMode('create');
    setEditingId(null);
    setIsModalOpen(true);
    
    // Clear forms
    if (type === 'product') {
      setProductForm({ name: '', price: 0, category: 'laptops', description: '', image: '', stockStatus: 'In Stock', stockCount: 10, specifications: [] });
      setSpecsInput('Intel Core i7\n16GB RAM\n512GB SSD');
    } else if (type === 'course') {
      setCourseForm({ title: '', price: 0, category: 'basic', duration: '4 Weeks', level: 'Beginner', description: '', outcomes: [] });
      setOutcomesInput('Operate standard suites\nBuild files storage');
    } else if (type === 'portfolio') {
      setPortfolioForm({ title: '', category: 'websites', description: '', image: '', client: '', completionDate: 'June 2026', link: '#' });
    } else if (type === 'blog') {
      setBlogForm({ title: '', category: 'Technology', excerpt: '', content: '', image: '', author: currentUser?.fullName || 'VISTA Editor', readTime: '4 min read' });
    } else if (type === 'user') {
      setUserForm({ fullName: '', email: '', role: 'Customer' });
    }
  };

  // Open Form in Edit Mode
  const openEditModal = (type: typeof formType, item: any) => {
    setFormType(type);
    setFormMode('edit');
    setEditingId(item.id);
    setIsModalOpen(true);

    if (type === 'product') {
      setProductForm({ ...item });
      setSpecsInput(item.specifications?.join('\n') || '');
    } else if (type === 'course') {
      setCourseForm({ ...item });
      setOutcomesInput(item.outcomes?.join('\n') || '');
    } else if (type === 'portfolio') {
      setPortfolioForm({ ...item });
    } else if (type === 'blog') {
      setBlogForm({ ...item });
    } else if (type === 'user') {
      setUserForm({ ...item });
    }
  };

  return (
    <div id="dashboard-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left min-h-screen">
      
      {/* Dashboard Brand Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-5 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest font-mono">VISTA secure backoffice v1.4</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">VISTA Enterprise Portal</h1>
          <p className="text-xs text-slate-500 mt-1">Hello <strong className="text-slate-800">{currentUser?.fullName}</strong>. You hold <strong className="text-amber-700">{currentUser?.role}</strong> level clearances.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 flex items-center space-x-1.5 transition-all cursor-pointer shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Workspace</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDE SELECTOR MENU RAIL */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 space-y-1.5 shadow-sm">
          <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-bold px-3 pb-2">Business Units</p>
          {[
            { id: 'overview', label: 'Overview Analytics', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'inquiries', label: 'Customer Inquiries', icon: <FileText className="w-4 h-4" /> },
            { id: 'products', label: 'Products Showroom', icon: <ShoppingCart className="w-4 h-4" /> },
            { id: 'courses', label: 'Academy Courses', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'portfolio', label: 'Case Portfolios', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'blogs', label: 'Blogging Hub', icon: <FileText className="w-4 h-4" /> },
            { id: 'users', label: 'Staff & User Access', icon: <UsersIcon className="w-4 h-4" /> },
            { id: 'workspace', label: 'Google Workspace', icon: <Layers className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* WORKSPACE SCREEN */}
        <div className="lg:col-span-9 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm text-left">
          
          {/* ========================================================
              TAB: ANALYTICS OVERVIEW
              ======================================================== */}
          {activeSubTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Role-Based Access Control Overview Widget */}
              <RoleOverviewWidget currentUser={currentUser} />

              <h2 className="text-xl font-bold text-slate-900">System Performance Metrics</h2>
              
              {loadingAnalytics ? (
                <div className="py-12 text-center text-slate-400 font-mono text-xs">Computing database metrics...</div>
              ) : (
                <div className="space-y-8">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Showroom Products', val: analytics?.metrics?.totalProducts, color: 'border-l-blue-500' },
                      { label: 'Active Academics Courses', val: analytics?.metrics?.totalCourses, color: 'border-l-purple-500' },
                      { label: 'Total Inquiries Recorded', val: analytics?.metrics?.totalInquiries, color: 'border-l-amber-500' },
                      { label: 'Active User Registrations', val: analytics?.metrics?.totalUsers, color: 'border-l-emerald-500' },
                    ].map((m, idx) => (
                      <div key={idx} className={`bg-slate-50 p-4 border-l-4 rounded-r-xl border border-slate-150 ${m.color}`}>
                        <span className="text-[10px] text-slate-400 font-bold block leading-none">{m.label}</span>
                        <span className="text-2xl font-black text-slate-950 block mt-2">{m.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Simulated Visual Area Chart (Custom Responsive SVG) */}
                  <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-sm">Priority Lead Traffic Stream</h4>
                        <p className="text-[10px] text-slate-400">Total inquiries and student registrations tracked over time</p>
                      </div>
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono font-bold flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +14.2% Growth
                      </span>
                    </div>

                    {/* Highly stylized SVG chart representation */}
                    <div className="h-44 w-full relative pt-2">
                      <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="500" y2="20" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.5" />
                        <line x1="0" y1="50" x2="500" y2="50" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.5" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.5" />
                        
                        {/* Gradient fill */}
                        <path d="M 0 80 Q 80 50 160 65 T 320 25 T 500 10 L 500 100 L 0 100 Z" fill="url(#chart-grad)" />
                        {/* Solid line */}
                        <path d="M 0 80 Q 80 50 160 65 T 320 25 T 500 10" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                        
                        {/* Interactive Nodes */}
                        <circle cx="160" cy="65" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx="320" cy="25" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx="500" cy="10" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                      </svg>
                      
                      {/* Chart Labels */}
                      <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-2">
                        <span>Jan - Mar 2026</span>
                        <span>Apr - May 2026</span>
                        <span>Jun 2026 (Active term)</span>
                      </div>
                    </div>
                  </div>

                  {/* Double split list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent leads queue */}
                    <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-150">
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Unresolved Tickets</h4>
                      <div className="divide-y divide-slate-100 max-h-52 overflow-y-auto pr-1">
                        {inquiries.filter(i => i.status === 'Pending').slice(0, 4).map((i) => (
                          <div key={i.id} className="py-2.5 flex justify-between items-center text-xs">
                            <div className="text-left">
                              <p className="font-bold text-slate-900">{i.name}</p>
                              <p className="text-[10px] text-slate-450 truncate max-w-[200px]">{i.message || i.type}</p>
                            </div>
                            <button
                              onClick={() => setActiveSubTab('inquiries')}
                              className="p-1 text-blue-600 hover:text-blue-800"
                              title="Review Ticket"
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {inquiries.filter(i => i.status === 'Pending').length === 0 && (
                          <p className="text-xs text-slate-400 italic py-4">All inquiries cleared!</p>
                        )}
                      </div>
                    </div>

                    {/* Quick System Action center */}
                    <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-150">
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Quick actions</h4>
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <button onClick={() => openCreateModal('product')} className="p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-center text-xs font-semibold cursor-pointer text-slate-700">
                          + Product
                        </button>
                        <button onClick={() => openCreateModal('course')} className="p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-center text-xs font-semibold cursor-pointer text-slate-700">
                          + Course
                        </button>
                        <button onClick={() => openCreateModal('blog')} className="p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-center text-xs font-semibold cursor-pointer text-slate-700">
                          + Blog Post
                        </button>
                        <button onClick={() => openCreateModal('portfolio')} className="p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-center text-xs font-semibold cursor-pointer text-slate-700">
                          + Case Study
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB: INQUIRIES & LEADS MANAGEMENT
              ======================================================== */}
          {activeSubTab === 'inquiries' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Leads & Online Form Submissions</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage contact inquiries, bulk quote requests, and course registrations.</p>
                </div>
              </div>

              {loadingListings ? (
                <div className="py-12 text-center text-slate-400">Loading database entries...</div>
              ) : inquiries.length === 0 ? (
                <div className="py-12 text-center text-slate-400 italic">No inquiries recorded yet. Submit contact forms to see results instantly.</div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => {
                    const relatedCourse = inq.courseId ? courses.find(c => c.id === inq.courseId) : null;
                    return (
                      <div key={inq.id} className="p-5 border border-slate-200 bg-slate-50/50 rounded-xl space-y-4 text-xs text-left">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-extrabold text-sm text-slate-900">{inq.name}</span>
                              <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded ${
                                inq.type === 'course_registration' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {inq.type === 'course_registration' ? 'Course Registration' : 'Inquiry Ticket'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-450 mt-1">Email: {inq.email} | Phone: {inq.phone || 'N/A'}</p>
                          </div>
                          
                          {/* Status Select action */}
                          <div className="flex items-center space-x-2 shrink-0">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inq.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              inq.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                              inq.status === 'Enrolled' ? 'bg-emerald-100 text-emerald-700' :
                              'bg-rose-150 text-rose-700 bg-red-100'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white p-3 border border-slate-150 rounded-lg text-[11px] text-slate-600 leading-relaxed font-sans">
                          {relatedCourse && (
                            <p className="font-bold text-purple-700 mb-1">Applying for: {relatedCourse.title} (Duration: {relatedCourse.duration})</p>
                          )}
                          {inq.message}
                        </div>

                        {/* Actions drawer */}
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 font-mono">Submitted: {new Date(inq.createdAt).toLocaleString()}</span>
                          <div className="flex space-x-2">
                            {inq.status === 'Pending' && (
                              <button
                                onClick={() => handleInquiryStatus(inq.id, 'Contacted')}
                                className="px-3 py-1.5 bg-blue-600 text-white rounded text-[10px] font-bold cursor-pointer"
                              >
                                Mark Contacted
                              </button>
                            )}
                            {inq.type === 'course_registration' && inq.status !== 'Enrolled' && (
                              <button
                                onClick={() => handleInquiryStatus(inq.id, 'Enrolled')}
                                className="px-3 py-1.5 bg-emerald-600 text-white rounded text-[10px] font-bold cursor-pointer"
                              >
                                Approve Enrollment
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteItem('/api/inquiries', inq.id)}
                              className="p-1.5 border border-slate-200 text-red-500 hover:bg-slate-50 rounded cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB: PRODUCTS SHOWROOM CATALOG
              ======================================================== */}
          {activeSubTab === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Showroom Stock Inventory</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage product lists, update pricing points, and modify category counts.</p>
                </div>
                <button
                  onClick={() => openCreateModal('product')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                <table className="w-full text-xs text-left text-slate-500">
                  <thead className="text-[10px] text-slate-700 bg-slate-50 uppercase tracking-wider font-mono">
                    <tr>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-center">In Stock Count</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-900 flex items-center space-x-2">
                          <img src={p.image} className="w-8 h-8 rounded object-cover border" alt="" />
                          <span>{p.name}</span>
                        </td>
                        <td className="px-4 py-3 uppercase text-[10px]">{p.category}</td>
                        <td className="px-4 py-3 text-right font-black text-slate-900">${p.price}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.stockCount > 5 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            p.stockCount > 0 ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                            'bg-red-50 text-red-700 border border-red-100'
                          }`}>
                            {p.stockCount} ({p.stockStatus})
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openEditModal('product', p)}
                              className="p-1 text-blue-600 hover:bg-slate-100 rounded cursor-pointer"
                              title="Edit specifications"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('/api/products', p.id)}
                              className="p-1 text-red-500 hover:bg-slate-100 rounded cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: ACADEMY COURSES LISTINGS
              ======================================================== */}
          {activeSubTab === 'courses' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Admissions Curriculum List</h2>
                  <p className="text-xs text-slate-500 mt-1">Publish new training pathways, update tuition fees, and edit durations.</p>
                </div>
                <button
                  onClick={() => openCreateModal('course')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Course</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((c) => (
                  <div key={c.id} className="p-5 border border-slate-200 bg-slate-50/50 rounded-xl flex justify-between gap-4 text-xs text-left">
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-purple-100 text-purple-700">{c.level}</span>
                      <h4 className="font-extrabold text-sm text-slate-900">{c.title}</h4>
                      <p className="text-slate-500 line-clamp-2">{c.description}</p>
                      <div className="flex gap-4 font-mono text-[10px] text-slate-450 pt-1">
                        <span>Duration: {c.duration}</span>
                        <span>Fee: ${c.price}</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between shrink-0">
                      <div className="flex space-x-1">
                        <button onClick={() => openEditModal('course', c)} className="p-1.5 border border-slate-200 text-blue-600 hover:bg-white rounded cursor-pointer">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteItem('/api/courses', c.id)} className="p-1.5 border border-slate-200 text-red-500 hover:bg-white rounded cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: PORTFOLIO SHOWCASES
              ======================================================== */}
          {activeSubTab === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Case Study Portfolios</h2>
                  <p className="text-xs text-slate-500 mt-1">Add details of branding successes or web dev graduation cohorts.</p>
                </div>
                <button
                  onClick={() => openCreateModal('portfolio')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="p-4 border border-slate-200 rounded-xl flex gap-4 text-xs text-left items-start bg-slate-50/50">
                    <img src={item.image} alt="" className="w-16 h-16 rounded object-cover border" />
                    <div className="flex-1 space-y-1.5">
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700">{item.category}</span>
                      <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 line-clamp-1">{item.description}</p>
                    </div>
                    <div className="flex space-x-1 shrink-0">
                      <button onClick={() => openEditModal('portfolio', item)} className="p-1 text-blue-600 hover:bg-white border border-slate-150 rounded cursor-pointer">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteItem('/api/portfolio', item.id)} className="p-1 text-red-500 hover:bg-white border border-slate-150 rounded cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: BLOG POSTS HUB
              ======================================================== */}
          {activeSubTab === 'blogs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Blogging Hub Management</h2>
                  <p className="text-xs text-slate-500 mt-1">Publish new articles, edit contents, and review tech essays.</p>
                </div>
                <button
                  onClick={() => openCreateModal('blog')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>

              <div className="space-y-3">
                {blogs.map((b) => (
                  <div key={b.id} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center text-xs text-left bg-slate-50/50 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">{b.category}</span>
                      <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{b.title}</h4>
                      <p className="text-slate-500 line-clamp-1">{b.excerpt}</p>
                    </div>

                    <div className="flex space-x-1 shrink-0">
                      <button onClick={() => openEditModal('blog', b)} className="p-1.5 border border-slate-200 text-blue-600 hover:bg-white rounded cursor-pointer">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteItem('/api/blogs', b.id)} className="p-1.5 border border-slate-200 text-red-500 hover:bg-white rounded cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: USERS ACCESS & ACCESS CONTROL
              ======================================================== */}
          {activeSubTab === 'users' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Roles & Access Credentials</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage staff, teachers, student profiles, and system admin permissions.</p>
                </div>
                <button
                  onClick={() => openCreateModal('user')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Access Profile</span>
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm text-xs">
                <table className="w-full text-left text-slate-500">
                  <thead className="text-[10px] text-slate-700 bg-slate-50 uppercase font-mono">
                    <tr>
                      <th className="px-4 py-3">Full Name</th>
                      <th className="px-4 py-3">Email Account</th>
                      <th className="px-4 py-3">Assigned Role</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-900">{u.fullName}</td>
                        <td className="px-4 py-3">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2.5 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
                            u.role === 'Admin' ? 'bg-amber-100 text-amber-700 border border-amber-150' :
                            u.role === 'Staff' ? 'bg-blue-100 text-blue-700 border border-blue-150' :
                            u.role === 'Student' ? 'bg-purple-100 text-purple-700 border border-purple-150' :
                            'bg-slate-100 text-slate-700 border border-slate-150'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => openEditModal('user', u)} className="p-1 text-blue-600 hover:bg-slate-100 rounded cursor-pointer">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (u.id === 'usr_admin') {
                                  alert('The master administrator profile cannot be deleted.');
                                  return;
                                }
                                handleDeleteItem('/api/users', u.id);
                              }}
                              className="p-1 text-red-500 hover:bg-slate-100 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB: GOOGLE WORKSPACE HUB
              ======================================================== */}
          {activeSubTab === 'workspace' && (
            <div className="space-y-6 animate-in fade-in duration-200 text-slate-800">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>Google Workspace Hub</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage spreadsheet databases and dispatch inquiries notifications using official Google Sheets and Gmail APIs.
                  </p>
                </div>
                
                {/* Authorization Status Indicator */}
                <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
                  googleAccessToken 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${googleAccessToken ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span>
                    {googleAccessToken ? 'Authorized (Live API Access)' : 'Sandbox Mode (Simulated)'}
                  </span>
                </div>
              </div>

              {/* Sub tab selector (Sheets / Gmail) */}
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setActiveWorkspaceSubTab('sheets')}
                  className={`px-4 py-2 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                    activeWorkspaceSubTab === 'sheets'
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Google Sheets Databases
                </button>
                <button
                  onClick={() => setActiveWorkspaceSubTab('gmail')}
                  className={`px-4 py-2 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                    activeWorkspaceSubTab === 'gmail'
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Gmail Operations
                </button>
              </div>

              {/* SECTION: GOOGLE SHEETS */}
              {activeWorkspaceSubTab === 'sheets' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Spreadsheets list */}
                  <div className="lg:col-span-4 space-y-4">
                    {/* Create sheet block */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">Create Spreadsheet</h4>
                      <form onSubmit={handleCreateSpreadsheet} className="flex gap-2">
                        <input
                          type="text"
                          value={newSheetName}
                          onChange={(e) => setNewSheetName(e.target.value)}
                          placeholder="e.g. Sales Log"
                          className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="bg-slate-900 hover:bg-slate-850 text-white text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer"
                        >
                          Create
                        </button>
                      </form>
                    </div>

                    {/* Sheet list block */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center justify-between">
                        <span>Available Sheets</span>
                        <button 
                          onClick={fetchSpreadsheets} 
                          title="Refresh spreadsheets list"
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-950 cursor-pointer"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${loadingSheets ? 'animate-spin' : ''}`} />
                        </button>
                      </h4>
                      
                      {loadingSheets ? (
                        <p className="text-xs text-slate-400 py-4 text-center">Loading sheets list...</p>
                      ) : spreadsheets.length === 0 ? (
                        <p className="text-xs text-slate-400 py-4 text-center">No spreadsheets found.</p>
                      ) : (
                        <div className="space-y-1">
                          {spreadsheets.map((sheet) => (
                            <button
                              key={sheet.id}
                              onClick={() => fetchSpreadsheetDetail(sheet.id)}
                              className={`w-full text-left px-3 py-2 rounded text-xs flex items-center justify-between cursor-pointer transition-all ${
                                selectedSheet?.id === sheet.id
                                  ? 'bg-blue-50 border border-blue-200 text-blue-900 font-medium'
                                  : 'hover:bg-slate-50 text-slate-700 font-normal border border-transparent'
                              }`}
                            >
                              <span className="truncate">{sheet.name}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Active Spreadsheet Grid and append */}
                  <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-4 min-h-[300px]">
                    {loadingSheetDetail ? (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-2">
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        <span className="text-xs">Loading grid rows...</span>
                      </div>
                    ) : selectedSheet ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">{selectedSheet.name}</h3>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">Spreadsheet ID: {selectedSheet.id}</p>
                          </div>
                          <span className="text-[9px] uppercase font-bold tracking-widest bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                            {selectedSheet.values?.length || 0} rows loaded
                          </span>
                        </div>

                        {/* Grid table */}
                        <div className="border border-slate-150 rounded-lg overflow-x-auto max-h-[250px]">
                          {selectedSheet.values && selectedSheet.values.length > 0 ? (
                            <table className="w-full text-left text-[11px] border-collapse">
                              <thead className="bg-slate-50 uppercase font-mono text-[9px] border-b border-slate-200 sticky top-0">
                                <tr>
                                  {selectedSheet.values[0].map((header, idx) => (
                                    <th key={idx} className="px-3 py-2 text-slate-700 font-bold border-r border-slate-200">{header}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {selectedSheet.values.slice(1).map((row, rowIdx) => (
                                  <tr key={rowIdx} className="hover:bg-slate-50/40 odd:bg-slate-50/30">
                                    {row.map((cell, cellIdx) => (
                                      <td key={cellIdx} className="px-3 py-1.5 border-r border-slate-150 text-slate-800">{cell}</td>
                                    ))}
                                    {/* Fill missing cells in row to match headers */}
                                    {row.length < selectedSheet.values[0].length && 
                                      Array(selectedSheet.values[0].length - row.length).fill('').map((_, i) => (
                                        <td key={`empty-${i}`} className="px-3 py-1.5 border-r border-slate-150 text-slate-400">-</td>
                                      ))
                                    }
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-center py-8 text-slate-400 text-xs">Spreadsheet contains no row values.</p>
                          )}
                        </div>

                        {/* Form to Append New Row */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                          <h4 className="text-xs font-bold text-slate-900 mb-3 font-mono uppercase tracking-wider">Append row data</h4>
                          {selectedSheet.values && selectedSheet.values[0] ? (
                            <form onSubmit={handleAppendRow} className="space-y-3">
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {selectedSheet.values[0].map((header, idx) => (
                                  <div key={idx} className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase font-mono truncate">{header}</label>
                                    <input
                                      type="text"
                                      value={appendRowData[idx] || ''}
                                      onChange={(e) => {
                                        const updated = [...appendRowData];
                                        updated[idx] = e.target.value;
                                        setAppendRowData(updated);
                                      }}
                                      placeholder={`Enter ${header}`}
                                      className="bg-white border border-slate-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-end pt-2 border-t border-slate-200/50">
                                <button
                                  type="submit"
                                  disabled={isAppending}
                                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-lg cursor-pointer flex items-center space-x-1.5"
                                >
                                  {isAppending ? (
                                    <>
                                      <RefreshCw className="w-3 h-3 animate-spin" />
                                      <span>Appending...</span>
                                    </>
                                  ) : (
                                    <span>Append Row</span>
                                  )}
                                </button>
                              </div>
                            </form>
                          ) : (
                            <p className="text-xs text-slate-400">Cannot append to empty sheet headers.</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-20">Select a spreadsheet from the left list to see details and append values.</p>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION: GMAIL */}
              {activeWorkspaceSubTab === 'gmail' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Inbox Emails list */}
                  <div className="lg:col-span-5 space-y-4">
                    <button
                      onClick={() => {
                        setShowCompose(true);
                        setSelectedEmail(null);
                      }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Compose New Email</span>
                    </button>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center justify-between border-b border-slate-100 pb-2">
                        <span>Inbox Messages</span>
                        <button 
                          onClick={fetchEmails} 
                          title="Refresh email inbox"
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-950 cursor-pointer"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${loadingEmails ? 'animate-spin' : ''}`} />
                        </button>
                      </h4>

                      {loadingEmails ? (
                        <p className="text-xs text-slate-400 py-8 text-center animate-pulse">Loading inbox emails...</p>
                      ) : emails.length === 0 ? (
                        <p className="text-xs text-slate-400 py-8 text-center">Inbox is empty.</p>
                      ) : (
                        <div className="space-y-1 max-h-[350px] overflow-y-auto">
                          {emails.map((email) => (
                            <button
                              key={email.id}
                              onClick={() => {
                                setSelectedEmail(email);
                                setShowCompose(false);
                              }}
                              className={`w-full text-left p-3 rounded-lg text-xs flex flex-col gap-1 border transition-all cursor-pointer ${
                                selectedEmail?.id === email.id
                                  ? 'bg-blue-50/50 border-blue-200 shadow-xs'
                                  : 'hover:bg-slate-50 border-slate-100 bg-white'
                              }`}
                            >
                              <div className="flex justify-between items-center gap-2">
                                <span className="font-bold text-slate-900 truncate flex-1">{email.sender.split('<')[0].trim()}</span>
                                <span className="text-[9px] text-slate-400 shrink-0">{email.date.substring(5, 16)}</span>
                              </div>
                              <span className="font-semibold text-slate-800 truncate">{email.subject}</span>
                              <span className="text-slate-500 text-[11px] truncate">{email.snippet}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Email Detail Viewer / Compositor */}
                  <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 min-h-[300px] text-xs">
                    {showCompose ? (
                      /* COMPOSE NEW EMAIL */
                      <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <h3 className="text-sm font-bold text-slate-900">Compose Broadcast Notification</h3>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Dispatches email notifications securely via Gmail servers.</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Recipient (To:)</label>
                            <input
                              type="email"
                              value={emailComposeTo}
                              onChange={(e) => setEmailComposeTo(e.target.value)}
                              placeholder="client@company.com"
                              className="bg-white border border-slate-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Email Subject</label>
                            <input
                              type="text"
                              value={emailComposeSubject}
                              onChange={(e) => setEmailComposeSubject(e.target.value)}
                              placeholder="Inquiry followup from VISTA Enterprise"
                              className="bg-white border border-slate-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Email Body Message</label>
                            <textarea
                              rows={6}
                              value={emailComposeBody}
                              onChange={(e) => setEmailComposeBody(e.target.value)}
                              placeholder="Dear Client, thank you for contacting us..."
                              className="bg-white border border-slate-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => {
                                setShowCompose(false);
                                if (emails.length > 0) setSelectedEmail(emails[0]);
                              }}
                              className="px-4 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setShowConfirmModal(true)}
                              disabled={!emailComposeTo || !emailComposeSubject || !emailComposeBody}
                              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-lg cursor-pointer"
                            >
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : selectedEmail ? (
                      /* EMAIL DETAILS VIEW */
                      <div className="space-y-4">
                        <div className="border-b border-slate-150 pb-3 space-y-1.5">
                          <h3 className="text-base font-bold text-slate-900 leading-tight">{selectedEmail.subject}</h3>
                          <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono">
                            <div>
                              <span className="font-semibold text-slate-800">From:</span> {selectedEmail.sender}
                            </div>
                            <div>{selectedEmail.date}</div>
                          </div>
                        </div>
                        <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg text-slate-800 leading-relaxed whitespace-pre-wrap min-h-[180px]">
                          {selectedEmail.content}
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEmailComposeTo(selectedEmail.sender.includes('<') ? selectedEmail.sender.split('<')[1].replace('>', '').trim() : selectedEmail.sender);
                              setEmailComposeSubject(`Re: ${selectedEmail.subject}`);
                              setEmailComposeBody(`\n\n--- On ${selectedEmail.date}, ${selectedEmail.sender} wrote:\n> ${selectedEmail.content.split('\n').join('\n> ')}`);
                              setShowCompose(true);
                              setSelectedEmail(null);
                            }}
                            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg cursor-pointer"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-20">Select an email to read contents or click 'Compose New Email'.</p>
                    )}
                  </div>
                </div>
              )}

              {/* MANDATORY USER EXPLICIT CONFIRMATION MODAL */}
              {showConfirmModal && (
                <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center bg-slate-950/70 p-4 animate-in fade-in duration-150">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-2xl relative text-left space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="flex items-start gap-3 text-amber-600">
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Confirm Email Dispatch</h3>
                        <p className="text-xs text-slate-500 mt-1">This operation sends an email through your Gmail servers.</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-150 text-[11px] text-slate-600 space-y-1 font-mono">
                      <div><span className="font-bold text-slate-700 font-sans">Recipient:</span> {emailComposeTo}</div>
                      <div><span className="font-bold text-slate-700 font-sans">Subject:</span> {emailComposeSubject}</div>
                      <div className="border-t border-slate-200 pt-1.5 mt-1.5 max-h-[80px] overflow-y-auto whitespace-pre-wrap leading-tight font-sans">
                        {emailComposeBody}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-normal">
                      Are you absolutely sure you want to broadcast this communication?
                    </p>

                    <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setShowConfirmModal(false)}
                        className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-lg cursor-pointer"
                      >
                        Abort Action
                      </button>
                      <button
                        onClick={handleSendEmail}
                        disabled={isSendingEmail}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                      >
                        {isSendingEmail ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Broadcasting...</span>
                          </>
                        ) : (
                          <span>Authorize & Send</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* DYNAMIC FORM MODAL SHEET */}
      {isModalOpen && formType && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-150 max-w-lg w-full overflow-hidden shadow-2xl relative text-left flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-slate-950 p-5 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Database Entry</span>
                <h3 className="text-lg font-bold tracking-tight text-white mt-0.5">{formMode === 'create' ? 'Create new' : 'Update existing'} {formType}</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Combined dynamic form submission handler */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs text-slate-750">
              
              {/* Product Fields */}
              {formType === 'product' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                    <input
                      type="text"
                      required
                      value={productForm.name || ''}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. Latitude Office Pro Laptop"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Price ($USD)</label>
                      <input
                        type="number"
                        required
                        value={productForm.price || ''}
                        onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        placeholder="e.g. 599"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={productForm.category || 'laptops'}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="laptops">Laptops</option>
                        <option value="computers">Office PC Towers</option>
                        <option value="printers">Printers</option>
                        <option value="cctv">CCTV Security</option>
                        <option value="networking">Network Devices</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Stock Status</label>
                      <select
                        value={productForm.stockStatus || 'In Stock'}
                        onChange={(e) => setProductForm({ ...productForm, stockStatus: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Stock Count</label>
                      <input
                        type="number"
                        required
                        value={productForm.stockCount || ''}
                        onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Unsplash Cover Image URL (Optional)</label>
                    <input
                      type="text"
                      value={productForm.image || ''}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Item Description</label>
                    <textarea
                      rows={3}
                      required
                      value={productForm.description || ''}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      placeholder="Product features, CPU parameters..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Technical Specifications (One per line)</label>
                    <textarea
                      rows={3}
                      value={specsInput}
                      onChange={(e) => setSpecsInput(e.target.value)}
                      placeholder="Intel Core i5&#10;8GB RAM&#10;256GB SSD"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Course Fields */}
              {formType === 'course' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Course Program Title</label>
                    <input
                      type="text"
                      required
                      value={courseForm.title || ''}
                      onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                      placeholder="e.g. Graphic Design Masterclass"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        required
                        value={courseForm.price || ''}
                        onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                        placeholder="150"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Duration</label>
                      <input
                        type="text"
                        required
                        value={courseForm.duration || ''}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                        placeholder="e.g. 6 Weeks"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Course Level</label>
                      <select
                        value={courseForm.level || 'Beginner'}
                        onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Academy Category</label>
                      <select
                        value={courseForm.category || 'basic'}
                        onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="basic">Office Productivity</option>
                        <option value="design">Graphic Design</option>
                        <option value="coding">Learn Coding</option>
                        <option value="development">Website Engineering</option>
                        <option value="literacy">Digital Literacy</option>
                        <option value="workshop">ICT Workshop</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={courseForm.description || ''}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Learning Outcomes (One per line)</label>
                    <textarea
                      rows={3}
                      value={outcomesInput}
                      onChange={(e) => setOutcomesInput(e.target.value)}
                      placeholder="Master vector curves&#10;Design high-resolution stickers"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Portfolio Fields */}
              {formType === 'portfolio' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={portfolioForm.title || ''}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                      placeholder="e.g. Lightbox Branding for Summit"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Client Corp</label>
                      <input
                        type="text"
                        value={portfolioForm.client || ''}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, client: e.target.value })}
                        placeholder="Summit Solutions"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={portfolioForm.category || 'branding'}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="websites">Web Engineering</option>
                        <option value="graphic_design">Graphic Design</option>
                        <option value="branding">Branding</option>
                        <option value="printing">Printing runs</option>
                        <option value="success_stories">Success Cohorts</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Completion Date</label>
                      <input
                        type="text"
                        value={portfolioForm.completionDate || ''}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, completionDate: e.target.value })}
                        placeholder="June 2026"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Live URL (Optional)</label>
                      <input
                        type="text"
                        value={portfolioForm.link || ''}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, link: e.target.value })}
                        placeholder="#"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Unsplash Cover Image URL (Optional)</label>
                    <input
                      type="text"
                      value={portfolioForm.image || ''}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, image: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Case Description</label>
                    <textarea
                      rows={3}
                      required
                      value={portfolioForm.description || ''}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Blog Fields */}
              {formType === 'blog' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Blog Post Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={blogForm.category || 'Technology'}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Coding">Coding</option>
                        <option value="Graphics">Graphics</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                        <option value="Digital Transformation">Digital Transformation</option>
                        <option value="Career">Career Development</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Author Name</label>
                      <input
                        type="text"
                        required
                        value={blogForm.author || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Unsplash Cover Image (Optional)</label>
                    <input
                      type="text"
                      value={blogForm.image || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Excerpt (A brief summary teaser)</label>
                    <input
                      type="text"
                      required
                      value={blogForm.excerpt || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Post Content (Mark paragraphs with double line-breaks)</label>
                    <textarea
                      rows={6}
                      required
                      value={blogForm.content || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      placeholder="Use ### for headers, and write paragraphs..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* User Fields */}
              {formType === 'user' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={userForm.fullName || ''}
                      onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })}
                      placeholder="e.g. John Miller"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Account Coordinates</label>
                    <input
                      type="email"
                      required
                      value={userForm.email || ''}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      placeholder="e.g. john@vista.com"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Assigned Operational Role</label>
                    <select
                      value={userForm.role || 'Customer'}
                      onChange={(e) => setUserForm({ ...userForm, role: e.target.value as UserRole })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Student">Student</option>
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-250 rounded-lg text-slate-500 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  Confirm Entry
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
