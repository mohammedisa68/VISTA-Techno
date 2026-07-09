import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calendar, Star, Users, Check, ChevronRight, X,
  Code, Terminal, Award, HelpCircle, GraduationCap, Play, 
  ShieldAlert, Monitor, CheckCircle2, Lock, Sparkles, Download, ArrowRight, Save
} from 'lucide-react';
import { Course, User } from '../types';

interface CoursesSectionProps {
  onRegisterCourse: (course: Course) => void;
  courses: Course[];
  currentUser?: User | null;
}

export default function CoursesSection({ onRegisterCourse, courses, currentUser }: CoursesSectionProps) {
  const [activeLevel, setActiveLevel] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [regModalOpen, setRegModalOpen] = useState(false);
  
  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regMessage, setRegMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // VISTA Student Portal States (Role-Based Materials & Labs)
  const [portalMode, setPortalMode] = useState(false);
  const [activePortalTab, setActivePortalTab] = useState<'materials' | 'labs' | 'quiz'>('materials');

  // HTML/CSS Lab Playground State
  const [htmlCode, setHtmlCode] = useState('<div class="vista-badge">\n  <h3>VISTA Learning Labs</h3>\n  <p>Practice writing clean HTML and responsive CSS here!</p>\n  <button class="action-btn">Click Me</button>\n</div>');
  const [cssCode, setCssCode] = useState('.vista-badge {\n  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);\n  color: white;\n  padding: 24px;\n  border-radius: 16px;\n  font-family: sans-serif;\n  box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.3);\n  max-width: 320px;\n  margin: auto;\n  text-align: center;\n}\n.vista-badge h3 {\n  margin: 0 0 8px 0;\n  font-size: 20px;\n  font-weight: 800;\n}\n.vista-badge p {\n  font-size: 13px;\n  opacity: 0.9;\n  line-height: 1.4;\n  margin: 0 0 16px 0;\n}\n.action-btn {\n  background: white;\n  color: #4f46e5;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.action-btn:hover {\n  transform: scale(1.05);\n}');

  // Cisco Command Line Terminal Simulator State
  const [ciscoCommand, setCiscoCommand] = useState('');
  const [ciscoHistory, setCiscoHistory] = useState<string[]>([
    'VISTA Networking Lab - Router IOS v15.4(1)T',
    'Press Enter to begin.',
    'Router>'
  ]);
  const [ciscoMode, setCiscoMode] = useState<'user' | 'priv' | 'config' | 'config-if'>('user');
  const [ciscoStep, setCiscoStep] = useState(0); // Tracking completed configurations
  const [ciscoSuccess, setCiscoSuccess] = useState(false);

  // Interactive Quiz State
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizLogsSaving, setQuizLogsSaving] = useState(false);

  // Materials Download Simulator
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState('');

  const quizQuestions = [
    {
      q: "Which CSS layout engine is designed for grid-based columns and rows in web development?",
      options: ["Tailwind Flexbox", "CSS Grid Layout", "Float Alignments", "Inline Blocks"],
      answer: "CSS Grid Layout",
      hint: "It lets you design two-dimensional layouts on a page easily."
    },
    {
      q: "In Cisco networking, which command elevates the session prompt from user EXEC to privileged EXEC mode?",
      options: ["configure terminal", "enable", "interface status", "ip address"],
      answer: "enable",
      hint: "Elevates Router> to Router#"
    },
    {
      q: "What is the primary visual difference between vector typography and pixel-based raster graphics in digital printing?",
      options: [
        "Vector typography scales infinitely without losing edge sharpness",
        "Raster graphics are always monochrome",
        "Vector graphics are built from cameras directly",
        "Raster is only used for banner banners"
      ],
      answer: "Vector typography scales infinitely without losing edge sharpness",
      hint: "Vectors use math equations instead of finite grids of color pixels."
    }
  ];

  const logStudentActivity = async (actionText: string) => {
    if (!currentUser) return;
    try {
      setQuizLogsSaving(true);
      const res = await fetch(`/api/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activities: [
            { id: `act_${Date.now()}`, action: actionText, timestamp: new Date().toISOString() },
            ...(currentUser.activities || [])
          ]
        })
      });
      if (res.ok) {
        console.log("Logged student activity to DB successfully!");
      }
    } catch (e) {
      console.error("Failed to log activity to DB:", e);
    } finally {
      setQuizLogsSaving(false);
    }
  };

  const handleCiscoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ciscoCommand.trim()) return;

    const cmd = ciscoCommand.trim().toLowerCase();
    const currentPrompt = getPrompt(ciscoMode);
    const newHistory = [...ciscoHistory, `${currentPrompt}${ciscoCommand}`];
    let nextMode = ciscoMode;
    let feedback = '';

    if (cmd === 'enable') {
      if (ciscoMode === 'user') {
        nextMode = 'priv';
        feedback = '';
        if (ciscoStep === 0) setCiscoStep(1);
      } else {
        feedback = 'Already in privileged mode.';
      }
    } else if (cmd === 'configure terminal' || cmd === 'conf t') {
      if (ciscoMode === 'priv') {
        nextMode = 'config';
        feedback = 'Enter configuration commands, one per line. End with CNTL/Z.';
        if (ciscoStep === 1) setCiscoStep(2);
      } else {
        feedback = '% Group execution error: Privileged authorization required.';
      }
    } else if (cmd === 'interface fastethernet 0/0' || cmd === 'int fa0/0') {
      if (ciscoMode === 'config') {
        nextMode = 'config-if';
        feedback = '';
        if (ciscoStep === 2) setCiscoStep(3);
      } else {
        feedback = '% Invalid command or incorrect context.';
      }
    } else if (cmd.startsWith('ip address ')) {
      if (ciscoMode === 'config-if') {
        if (cmd === 'ip address 192.168.1.1 255.255.255.0') {
          feedback = 'IP address assigned successfully.';
          if (ciscoStep === 3) setCiscoStep(4);
        } else {
          feedback = '% Bad mask or invalid IP address format. Try: ip address 192.168.1.1 255.255.255.0';
        }
      } else {
        feedback = '% Command incomplete or executed in wrong configuration level.';
      }
    } else if (cmd === 'no shutdown' || cmd === 'no shut') {
      if (ciscoMode === 'config-if') {
        feedback = '%LINK-5-CHANGED: Interface FastEthernet0/0, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/0, changed state to up';
        if (ciscoStep === 4) setCiscoStep(5);
      } else {
        feedback = 'Invalid command in this configuration level.';
      }
    } else if (cmd === 'write memory' || cmd === 'write' || cmd === 'wr') {
      if (ciscoMode === 'priv' || ciscoMode === 'config' || ciscoMode === 'config-if') {
        feedback = 'Building configuration...\n[OK]\nSaved to NVRAM.';
        if (ciscoStep === 5) {
          setCiscoStep(6);
          setCiscoSuccess(true);
          await logStudentActivity(`Completed Cisco Router Configuration Lab with perfect marks!`);
        }
      } else {
        feedback = 'Writing requires privileged executive permissions.';
      }
    } else if (cmd === 'exit') {
      if (ciscoMode === 'config-if') {
        nextMode = 'config';
        feedback = '';
      } else if (ciscoMode === 'config') {
        nextMode = 'priv';
        feedback = '';
      } else if (ciscoMode === 'priv') {
        nextMode = 'user';
        feedback = '';
      } else {
        feedback = 'Connection closed.';
      }
    } else if (cmd === 'help' || cmd === '?') {
      feedback = 'Supported lab commands:\n - enable\n - configure terminal (or conf t)\n - interface fastethernet 0/0 (or int fa0/0)\n - ip address 192.168.1.1 255.255.255.0\n - no shutdown (or no shut)\n - write memory (or wr)\n - exit';
    } else {
      feedback = `% Ambiguous command: "${ciscoCommand}". Type "?" or "help" for a list of valid configurations.`;
    }

    setCiscoMode(nextMode);
    setCiscoHistory([...newHistory, feedback]);
    setCiscoCommand('');
  };

  function getPrompt(mode: 'user' | 'priv' | 'config' | 'config-if') {
    switch (mode) {
      case 'user': return 'Router>';
      case 'priv': return 'Router#';
      case 'config': return 'Router(config)#';
      case 'config-if': return 'Router(config-if)#';
    }
  }

  const filteredCourses = activeLevel === 'all'
    ? courses
    : courses.filter(c => c.level === activeLevel);

  const openRegModal = (course: Course) => {
    setSelectedCourse(course);
    setRegModalOpen(true);
    setSubmitSuccess(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'course_registration',
          name: regName,
          email: regEmail,
          phone: regPhone,
          courseId: selectedCourse?.id,
          message: regMessage || `Registered for ${selectedCourse?.title}`
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setRegName('');
        setRegEmail('');
        setRegPhone('');
        setRegMessage('');
        
        // Notify parent if needed
        if (selectedCourse) {
          onRegisterCourse(selectedCourse);
        }
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting course registration:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="courses-section" className="space-y-16 pb-20 text-left">
      
      {/* Academy Title Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-purple-400 font-bold uppercase tracking-widest text-xs">VISTA digital academy</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5 font-display">Expand Your Tech Horizon</h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3">From baseline computer office operations to heavy react-native coding bootcamps. Our courses offer physical labs, industry certification, and internship matching.</p>

          {currentUser && ['Admin', 'Staff', 'Student'].includes(currentUser.role) && (
            <div className="flex bg-slate-800 p-1 rounded-xl w-fit border border-slate-700 mt-6">
              <button
                onClick={() => setPortalMode(false)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  !portalMode
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Course Catalog
              </button>
              <button
                onClick={() => setPortalMode(true)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  portalMode
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                My Student Portal
              </button>
            </div>
          )}
        </div>
      </section>

      {portalMode ? (
        /* Render Student Portal Layout */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-150">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-extrabold text-sm">
                    {currentUser?.fullName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{currentUser?.fullName}</h4>
                    <p className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wider">{currentUser?.role} Account</p>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <button
                    onClick={() => setActivePortalTab('materials')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activePortalTab === 'materials'
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    Handouts & Materials
                  </button>
                  <button
                    onClick={() => setActivePortalTab('labs')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activePortalTab === 'labs'
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Code className="w-4 h-4 shrink-0" />
                    Labs Workbench
                  </button>
                  <button
                    onClick={() => setActivePortalTab('quiz')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activePortalTab === 'quiz'
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Award className="w-4 h-4 shrink-0" />
                    Knowledge Challenge
                  </button>
                </div>
              </div>

              {/* Lab Stats */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-5 rounded-2xl text-white border border-slate-800 shadow-md text-left space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 font-mono">Academy Rank</span>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wide">Elite Tech Explorer</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${ciscoSuccess ? '100' : '50'}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>Labs complete: {ciscoSuccess ? '2 / 2' : '1 / 2'}</span>
                  <span>{ciscoSuccess ? '100%' : '50%'}</span>
                </div>
              </div>
            </div>

            {/* Portal Tab View Panels */}
            <div className="lg:col-span-3">
              
              {/* Materials Tab */}
              {activePortalTab === 'materials' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200 text-left">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-900 font-display">Curriculum Handouts & Interactive Study Guides</h2>
                    <p className="text-xs text-slate-500 mt-1">Official lecture transcripts and downloadable resource packets synced with your physical lab workstations.</p>
                  </div>

                  {downloadSuccessMsg && (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between text-emerald-800 text-xs font-semibold animate-in slide-in-from-top-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                        <span>{downloadSuccessMsg}</span>
                      </div>
                      <button onClick={() => setDownloadSuccessMsg('')} className="text-emerald-500 hover:text-emerald-800 font-bold px-1 cursor-pointer">✕</button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ICT Materials */}
                    <div className="border border-slate-150 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-all space-y-4 bg-[#FAFAFA]">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                          <Monitor className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950">ICT Literacy & Computer Systems</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans">Covers fundamental operating system shortcuts (Win+X, Ctrl+Shift+Esc), security patch updates, and essential database client setups.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setDownloadSuccessMsg('ICT Handbook downloaded. Access key saved to profile.');
                          logStudentActivity('Downloaded ICT Literacy Handbook');
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        Download Handout (PDF)
                      </button>
                    </div>

                    {/* Web materials */}
                    <div className="border border-slate-150 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-all space-y-4 bg-[#FAFAFA]">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                          <Code className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950">Advanced Web App UI Engineering</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans">Complete CSS Grid, flex layout frameworks, state synchronization, and fetch proxy setup structures with Express.ts integration details.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setDownloadSuccessMsg('Web Development Handbook downloaded. Coding templates unlocked.');
                          logStudentActivity('Downloaded Web App UI Engineering Handout');
                        }}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        style={{ backgroundColor: '#7E22CE' }}
                      >
                        <Download className="w-4 h-4" />
                        Download Handout (PDF)
                      </button>
                    </div>

                    {/* Graphic design materials */}
                    <div className="border border-slate-150 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-all space-y-4 bg-[#FAFAFA]">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-700 flex items-center justify-center font-bold">
                          <Star className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950">Graphic Design Typography & Color Grids</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans">Learn typesetting, visual spacing harmony, serif-to-sans pairings, and color matching rules for wide-format print layouts.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setDownloadSuccessMsg('Graphic Design PDF successfully exported. Assets sync complete.');
                          logStudentActivity('Downloaded Typography & Color Design PDF');
                        }}
                        className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        style={{ backgroundColor: '#DB2777' }}
                      >
                        <Download className="w-4 h-4" />
                        Download Handout (PDF)
                      </button>
                    </div>

                    {/* Cisco networking materials */}
                    <div className="border border-slate-150 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-all space-y-4 bg-[#FAFAFA]">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                          <Terminal className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950">Cisco IOS Router configurations</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans">Includes router boot sequences, interface IP provisioning, submasks, no shutdown toggles, and secure write configurations.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setDownloadSuccessMsg('Cisco commands guide exported successfully.');
                          logStudentActivity('Downloaded Cisco Router Commands Guide');
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        style={{ backgroundColor: '#059669' }}
                      >
                        <Download className="w-4 h-4" />
                        Download Handout (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Labs tab */}
              {activePortalTab === 'labs' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  
                  {/* LAB 1: HTML/CSS Sandbox */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left space-y-6">
                    <div>
                      <span className="text-purple-600 font-bold uppercase tracking-widest text-[10px] block">Interactive Lab Alpha</span>
                      <h2 className="text-xl font-bold text-slate-950 font-display">HTML/CSS Visual Render Sandbox</h2>
                      <p className="text-xs text-slate-500 mt-1">Directly compose layout components. Toggle preset triggers below to initialize starter templates instantly.</p>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                      <button 
                        onClick={() => {
                          setHtmlCode('<div class="vista-badge">\n  <h3>VISTA Learning Labs</h3>\n  <p>Practice writing clean HTML and responsive CSS here!</p>\n  <button class="action-btn">Click Me</button>\n</div>');
                          setCssCode('.vista-badge {\n  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);\n  color: white;\n  padding: 24px;\n  border-radius: 16px;\n  font-family: sans-serif;\n  box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.3);\n  max-width: 320px;\n  margin: auto;\n  text-align: center;\n}\n.vista-badge h3 {\n  margin: 0 0 8px 0;\n  font-size: 20px;\n  font-weight: 800;\n}\n.vista-badge p {\n  font-size: 13px;\n  opacity: 0.9;\n  line-height: 1.4;\n  margin: 0 0 16px 0;\n}\n.action-btn {\n  background: white;\n  color: #4f46e5;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.action-btn:hover {\n  transform: scale(1.05);\n}');
                        }}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-50 bg-[#FAFAFA] cursor-pointer"
                      >
                        🎯 Purple Card Preset
                      </button>
                      <button 
                        onClick={() => {
                          setHtmlCode('<div class="dark-alert">\n  <h4>⚠️ SYSTEM WARNING</h4>\n  <p>Enforcing rigorous authentication role checks on backend and client terminals.</p>\n  <span class="active-node">● Secure Router Online</span>\n</div>');
                          setCssCode('.dark-alert {\n  background: #111827;\n  border: 1px solid #e11d48;\n  color: #fda4af;\n  padding: 20px;\n  border-radius: 12px;\n  font-family: monospace;\n  max-width: 340px;\n  margin: auto;\n}\n.dark-alert h4 {\n  color: #ef4444;\n  margin: 0 0 6px 0;\n  font-size: 14px;\n  letter-spacing: 1px;\n}\n.dark-alert p {\n  font-size: 11px;\n  line-height: 1.5;\n  margin: 0 0 12px 0;\n}\n.active-node {\n  font-size: 9px;\n  color: #10b981;\n  font-weight: bold;\n}');
                        }}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-50 bg-[#FAFAFA] cursor-pointer"
                      >
                        🔥 Secure Alert Preset
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {/* Inputs */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 font-mono text-left">HTML Sandbox</label>
                          <textarea
                            value={htmlCode}
                            onChange={(e) => setHtmlCode(e.target.value)}
                            rows={8}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all focus:bg-white text-left"
                          ></textarea>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 font-mono text-left">CSS Styles</label>
                          <textarea
                            value={cssCode}
                            onChange={(e) => setCssCode(e.target.value)}
                            rows={10}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all focus:bg-white text-left"
                          ></textarea>
                        </div>
                      </div>

                      {/* Output frame container */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full bg-slate-50 relative">
                        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-1.5 text-xs text-slate-600 font-mono select-none">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                          <span className="ml-2 text-[10px] text-slate-400">sandbox_browser_output</span>
                        </div>

                        {/* Rendering sandbox */}
                        <div className="p-8 flex-grow flex items-center justify-center min-h-[250px] relative overflow-auto">
                          {/* Inject custom styles isolated to #sandbox-wrapper container */}
                          <style dangerouslySetInnerHTML={{ __html: cssCode.replace(/([^\r\n,{}]+)(?=\s*{)/g, '#sandbox-wrapper $1') }} />
                          <div id="sandbox-wrapper" dangerouslySetInnerHTML={{ __html: htmlCode }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LAB 2: Cisco Router IOS CLI Simulator */}
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl text-left space-y-6 text-white font-sans">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] block font-mono">Interactive Lab Beta</span>
                        <h2 className="text-xl font-bold font-display">Cisco IOS Router Configuration</h2>
                        <p className="text-xs text-slate-400 mt-1">Practice networking CLI commands directly. Elevate privileges, configure IP bounds, activate the interface and save.</p>
                      </div>
                      <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-emerald-400 font-mono">
                        {ciscoSuccess ? '★★★ Complete' : 'In Progress'}
                      </div>
                    </div>

                    {/* Instructions Checklists */}
                    <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block font-mono">Goal Specification</span>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          Enter privileged mode, enter config mode, select FastEthernet 0/0 interface, assign IP <strong className="text-white">192.168.1.1</strong> subnet <strong className="text-white">255.255.255.0</strong>, activate link, and write memory.
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block font-mono font-sans">Target Commands Check</span>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className={ciscoStep >= 1 ? 'text-emerald-400' : 'text-slate-500'}>✔</span>
                            <span className={ciscoStep >= 1 ? 'text-white' : 'text-slate-400'}>enable</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={ciscoStep >= 2 ? 'text-emerald-400' : 'text-slate-500'}>✔</span>
                            <span className={ciscoStep >= 2 ? 'text-white' : 'text-slate-400'}>conf t</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={ciscoStep >= 3 ? 'text-emerald-400' : 'text-slate-500'}>✔</span>
                            <span className={ciscoStep >= 3 ? 'text-white' : 'text-slate-400'}>int fa0/0</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={ciscoStep >= 4 ? 'text-emerald-400' : 'text-slate-500'}>✔</span>
                            <span className={ciscoStep >= 4 ? 'text-white' : 'text-slate-400'}>ip address ...</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={ciscoStep >= 5 ? 'text-emerald-400' : 'text-slate-500'}>✔</span>
                            <span className={ciscoStep >= 5 ? 'text-white' : 'text-slate-400'}>no shut</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={ciscoStep >= 6 ? 'text-emerald-400' : 'text-slate-500'}>✔</span>
                            <span className={ciscoStep >= 6 ? 'text-white' : 'text-slate-400'}>write memory</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Monospaced Terminal */}
                    <div className="bg-black rounded-xl p-4 border border-slate-850 font-mono text-xs text-emerald-300 space-y-2 h-[260px] overflow-y-auto">
                      <div className="space-y-1">
                        {ciscoHistory.map((line, idx) => (
                          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                            {line}
                          </div>
                        ))}
                      </div>

                      {ciscoSuccess ? (
                        <div className="bg-emerald-950/40 border border-emerald-800 p-4 rounded-lg space-y-2 mt-4 text-white text-center animate-in zoom-in-95">
                          <h4 className="font-extrabold text-emerald-400 font-sans">★ Network Lab Accomplished! ★</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed max-w-sm mx-auto font-sans">
                            The FastEthernet link states are UP and configurations have been successfully written to NVRAM memory storage. Your student profile activities logs have been successfully synced.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleCiscoSubmit} className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
                          <span className="text-white shrink-0 font-bold select-none">{getPrompt(ciscoMode)}</span>
                          <input
                            type="text"
                            value={ciscoCommand}
                            onChange={(e) => setCiscoCommand(e.target.value)}
                            placeholder="Type commands here (or type '?')..."
                            className="bg-transparent text-white border-none outline-none flex-grow focus:ring-0 p-0 text-xs caret-white font-mono"
                            disabled={ciscoSuccess}
                          />
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz tab */}
              {activePortalTab === 'quiz' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-purple-600 font-bold uppercase tracking-widest text-[10px] block">Interactive Knowledge Challenge</span>
                    <h2 className="text-xl font-bold text-slate-950 font-display">VISTA Curriculum Evaluation Quiz</h2>
                    <p className="text-xs text-slate-500 mt-1">Prove your technical credentials by completing this multiple-choice academy quiz.</p>
                  </div>

                  {!quizFinished ? (
                    <div className="space-y-6">
                      {/* Progress line */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>Question {currentQuizIdx + 1} of {quizQuestions.length}</span>
                          <span>Score: {quizScore} / {quizQuestions.length}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-purple-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuizIdx) / quizQuestions.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Question box */}
                      <div className="border border-slate-150 p-6 rounded-2xl bg-[#FAFAFA] space-y-4">
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {quizQuestions[currentQuizIdx].q}
                        </h3>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-3 pt-2">
                          {quizQuestions[currentQuizIdx].options.map((option) => {
                            const isSelected = selectedQuizAnswer === option;
                            const isCorrect = option === quizQuestions[currentQuizIdx].answer;
                            return (
                              <button
                                key={option}
                                onClick={() => {
                                  if (!quizSubmitted) setSelectedQuizAnswer(option);
                                }}
                                disabled={quizSubmitted}
                                className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                  quizSubmitted
                                    ? isCorrect
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                                      : isSelected
                                        ? 'bg-rose-50 border-rose-400 text-rose-800'
                                        : 'bg-white border-slate-150 text-slate-400'
                                    : isSelected
                                      ? 'bg-purple-50 border-purple-500 text-purple-800'
                                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          {quizSubmitted && (
                            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                              💡 <strong className="text-slate-700">Hint:</strong> {quizQuestions[currentQuizIdx].hint}
                            </p>
                          )}
                        </div>

                        {!quizSubmitted ? (
                          <button
                            onClick={() => {
                              if (!selectedQuizAnswer) return;
                              setQuizSubmitted(true);
                              const correct = selectedQuizAnswer === quizQuestions[currentQuizIdx].answer;
                              if (correct) setQuizScore(quizScore + 1);
                            }}
                            disabled={!selectedQuizAnswer}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                              selectedQuizAnswer
                                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                            }`}
                            style={{ backgroundColor: selectedQuizAnswer ? '#7E22CE' : '' }}
                          >
                            Submit Answer
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              if (currentQuizIdx < quizQuestions.length - 1) {
                                setCurrentQuizIdx(currentQuizIdx + 1);
                                setSelectedQuizAnswer(null);
                                setQuizSubmitted(false);
                              } else {
                                setQuizFinished(true);
                                await logStudentActivity(`Completed VISTA Academy Evaluation Quiz with score ${quizScore} / 3`);
                              }
                            }}
                            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            {currentQuizIdx < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Quiz finished certificate */
                    <div className="py-8 text-center space-y-6 max-w-lg mx-auto animate-in zoom-in-95 duration-200 font-sans">
                      <div className="w-20 h-20 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-inner animate-bounce">
                        🏆
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 leading-tight">Quiz Complete!</h3>
                        <p className="text-xs text-slate-500">
                          Excellent work! You scored <strong className="text-slate-950">{quizScore} / {quizQuestions.length} ({Math.round((quizScore / quizQuestions.length) * 100)}%)</strong> on the official digital academy evaluation challenge.
                        </p>
                      </div>

                      {/* Virtual certificate badge */}
                      <div className="border border-yellow-200 bg-yellow-50/40 p-5 rounded-2xl flex items-center gap-4 text-left">
                        <Award className="w-12 h-12 text-yellow-600 shrink-0" />
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-yellow-700 font-mono">Verifiable Credential</span>
                          <h4 className="text-xs font-bold text-slate-950 mt-0.5">VISTA Web & Networking Specialist</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Authorized certification badge awarded to student {currentUser?.fullName}. Verified securely in VISTA DB nodes.</p>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setCurrentQuizIdx(0);
                            setSelectedQuizAnswer(null);
                            setQuizScore(0);
                            setQuizSubmitted(false);
                            setQuizFinished(false);
                          }}
                          className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                          Retake Quiz
                        </button>
                        <button
                          onClick={() => setPortalMode(false)}
                          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                          style={{ backgroundColor: '#7E22CE' }}
                        >
                          Return to Catalog
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* ORIGINAL Course Catalog Rendering */
        <>
          {/* Filter Tabs */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-2 pb-4 border-b border-slate-100">
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide cursor-pointer ${
                    activeLevel === level
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  style={{
                    backgroundColor: activeLevel === level ? '#7E22CE' : ''
                  }}
                >
                  {level === 'all' ? 'All Skill Levels' : `${level} Courses`}
                </button>
              ))}
            </div>
          </section>

          {/* Courses List Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  id={`course-card-${course.id}`}
                  className="bg-white rounded-2xl border border-slate-150 p-8 flex flex-col md:flex-row justify-between gap-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                >
                  {/* Highlight strip based on level */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                    course.level === 'Beginner' ? 'bg-emerald-500' :
                    course.level === 'Intermediate' ? 'bg-blue-500' :
                    'bg-purple-600'
                  }`}></div>

                  <div className="space-y-4 text-left flex-1">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded ${
                        course.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' :
                        course.level === 'Intermediate' ? 'bg-blue-50 text-blue-700 border border-blue-150' :
                        'bg-purple-50 text-purple-700 border border-purple-150'
                      }`}>
                        {course.level}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-snug">{course.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{course.description}</p>

                    {/* Outcomes */}
                    <div className="space-y-1.5 pt-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">What you will learn:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start text-xs text-slate-600 leading-tight">
                            <Check className="w-4 h-4 text-purple-600 mr-1.5 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price and registration side panel */}
                  <div className="md:w-48 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between shrink-0">
                    <div className="text-left md:text-right pb-4">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tuition Fee</span>
                      <span className="text-3xl font-black text-slate-900">${course.price}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Includes physical lab kit</span>
                    </div>
                    
                    <button
                      onClick={() => openRegModal(course)}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold tracking-wide shadow-md shadow-purple-600/10 transition-all flex items-center justify-center space-x-1 cursor-pointer"
                      style={{
                        backgroundColor: '#7E22CE'
                      }}
                    >
                      <span>Enroll in Program</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </section>

          {/* Academy Standards Info */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-purple-50/50 p-8 rounded-2xl border border-purple-100">
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-slate-900 text-sm">Physical Labs</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Our physical classroom features full gigabit internet, high-spec desktop stations, and testing circuits for hands-on network labs.</p>
              </div>
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-slate-900 text-sm">Official Certifications</h4>
                <p className="text-xs text-slate-500 leading-relaxed">VISTA transcripts are internationally verifiable. We prepare student candidates directly for CompTIA, Cisco, and AWS pathways.</p>
              </div>
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-slate-900 text-sm">Internship Matching</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Top-tier graduates of our 12-week coding and branding classes are immediately mapped into business operations or local tech partners.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* COURSE REGISTRATION MODAL */}
      {regModalOpen && selectedCourse && (
        <div id="course-registration-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-150 max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-750 to-indigo-850 p-6 text-white text-left flex justify-between items-center" style={{ background: 'linear-gradient(135deg, #7E22CE 0%, #4338CA 100%)' }}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">Academy Registration</span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">{selectedCourse.title}</h3>
              </div>
              <button
                onClick={() => setRegModalOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Form */}
            {submitSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-slate-900">Registration Received!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Excellent choice! Lidya Tesfaye or Mohammed Isa from VISTA Academy will reach out to you at <strong className="text-slate-950">{regEmail}</strong> within 24 business hours to set up your placement interview.
                </p>
                <button
                  onClick={() => setRegModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed text-left">
                  Please submit your contact coordinates. No prepayment is required. Our academic registrar will reach out to organize billing options and calendar scheduling.
                </p>

                <div className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Samuel Kalu"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Coordinates *</label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. samuel@gmail.com"
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. +251 911 234 567"
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message or Previous Tech Background (Optional)</label>
                    <textarea
                      rows={3}
                      value={regMessage}
                      onChange={(e) => setRegMessage(e.target.value)}
                      placeholder="e.g. I want to build web apps. I have a little HTML skill..."
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setRegModalOpen(false)}
                    className="px-4 py-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold tracking-wide shadow-md shadow-purple-600/10 transition-all cursor-pointer"
                    style={{
                      backgroundColor: '#7E22CE'
                    }}
                  >
                    {isSubmitting ? 'Registering...' : 'Submit Enrollment'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
