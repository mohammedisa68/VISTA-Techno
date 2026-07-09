import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, AlertTriangle } from 'lucide-react';

interface ContactSectionProps {
  prefilledInquiryName?: string;
  onClearPrefilledInquiry: () => void;
}

export default function ContactSection({ prefilledInquiryName, onClearPrefilledInquiry }: ContactSectionProps) {
  // Helper to fetch values from local storage
  const getInitialValue = (key: string, defaultValue: string) => {
    try {
      const saved = localStorage.getItem('vista_contact_draft');
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft && draft[key] !== undefined) {
          return draft[key];
        }
      }
    } catch (e) {
      console.warn('Error reading draft from localStorage:', e);
    }
    return defaultValue;
  };

  const [name, setName] = useState(() => {
    if (prefilledInquiryName) return '';
    return getInitialValue('name', '');
  });
  const [email, setEmail] = useState(() => {
    if (prefilledInquiryName) return '';
    return getInitialValue('email', '');
  });
  const [phone, setPhone] = useState(() => {
    if (prefilledInquiryName) return '';
    return getInitialValue('phone', '');
  });
  const [subject, setSubject] = useState(() => {
    if (prefilledInquiryName) return 'General Inquiry';
    return getInitialValue('subject', 'General Inquiry');
  });
  const [message, setMessage] = useState(() => {
    if (prefilledInquiryName) {
      return `Hello VISTA, I am interested in requesting a detailed quote and specs for "${prefilledInquiryName}". Please get back to me.`;
    }
    return getInitialValue('message', '');
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Time tracker for the auto-saved draft
  const [draftTime, setDraftTime] = useState<string | null>(() => {
    if (prefilledInquiryName) return null;
    try {
      const saved = localStorage.getItem('vista_contact_draft');
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft && (draft.name || draft.email || draft.phone || draft.message)) {
          return draft.updatedAt || 'just now';
        }
      }
    } catch (e) {}
    return null;
  });

  // Auto-save draft to local storage as the user types
  useEffect(() => {
    // Check if we have some content to save (to avoid saving completely empty states)
    if (name || email || phone || message) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const draft = {
        name,
        email,
        phone,
        subject,
        message,
        updatedAt: now,
      };
      localStorage.setItem('vista_contact_draft', JSON.stringify(draft));
      setDraftTime(now);
    } else {
      localStorage.removeItem('vista_contact_draft');
      setDraftTime(null);
    }
  }, [name, email, phone, subject, message]);

  // Handle discarding/clearing the draft
  const handleDiscardDraft = () => {
    localStorage.removeItem('vista_contact_draft');
    setName('');
    setEmail('');
    setPhone('');
    setSubject('General Inquiry');
    setMessage('');
    setDraftTime(null);
    onClearPrefilledInquiry();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name,
          email,
          phone,
          message: `Subject: ${subject}\n\n${message}`
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        localStorage.removeItem('vista_contact_draft');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSubject('General Inquiry');
        setDraftTime(null);
        onClearPrefilledInquiry();
      } else {
        alert('Failed to submit message. Please try again.');
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-section" className="space-y-16 pb-20 text-left">
      
      {/* Title Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(14,165,233,0.12),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">VISTA communications desk</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5 font-display">Get in Touch with Us</h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3 font-sans">Have a project inquiry, custom printing order, or hardware procurement checklist? Reach out below and a representative will reply within 12 business hours.</p>
        </div>
      </section>

      {/* Main split grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Contact details & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Direct Contacts</h2>
              <p className="text-xs text-slate-555 text-slate-500 leading-relaxed">Stop by our Addis Ababa headquarters for physical product inspections and register for our academic bootcamps.</p>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-150">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Headquarters</p>
                  <p className="font-medium text-slate-700">Addis Ababa, Ethiopia</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-150">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Company Location</p>
                  <p className="font-medium text-slate-700">Ethiopia</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-150">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Phone Hotline</p>
                  <p className="font-mono text-slate-800">+251 91 234 5678</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-150">
                <Send className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Telegram Channel</p>
                  <a 
                    href="https://t.me/VISTA_Tradinng" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline font-bold flex items-center gap-1 text-[11px]"
                  >
                    t.me/VISTA_Tradinng
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-150">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Email Address</p>
                  <p className="break-all text-slate-800">info@vista-tech.com</p>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-700">HQ Locator Map:</p>
              <div className="w-full h-56 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative shadow-inner">
                {/* Visual grid layout matching a map */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black animate-bounce shadow">
                    V
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-900">VISTA Head Office</h5>
                    <p className="text-[10px] text-slate-500">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-white px-2 py-0.5 border border-slate-200 text-[8px] rounded text-slate-450 font-mono uppercase">
                  Map Indicator Placeholder
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Contact Form Card */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-150 shadow-sm relative">
            <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-xl text-slate-950 tracking-tight">Send a Message</h3>
              {draftTime && (
                <div className="flex items-center space-x-1.5 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200/60 text-[10px] font-bold animate-pulse">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  <span>Draft Saved ({draftTime})</span>
                </div>
              )}
            </div>

            {/* Unfinished Draft Resume Banner */}
            {draftTime && !submitSuccess && (
              <div className="mb-5 bg-amber-50/40 border border-amber-200/60 rounded-xl p-3.5 flex items-start justify-between gap-3 text-xs text-amber-900 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2">
                  <span className="text-sm mt-0.5" role="img" aria-label="memo">📝</span>
                  <div>
                    <p className="font-extrabold text-amber-950">Draft Auto-Resumed</p>
                    <p className="text-[10px] text-amber-800 mt-0.5 leading-relaxed">
                      Your unfinished inquiry text is safely loaded from local storage. Keep writing, or clear the draft.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDiscardDraft}
                  className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-950 border border-amber-200 hover:border-amber-300 font-bold text-[10px] rounded-lg transition-all shadow-sm cursor-pointer shrink-0"
                >
                  Discard Draft
                </button>
              </div>
            )}
            
            {submitSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-slate-900">Inquiry Received Successfully</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your inquiry message has been securely submitted to the VISTA system admin queue. Our customer relationship team will reach out to you within 12 business hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Send another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="block font-bold text-slate-750 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Samuel Kalu"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-750 mb-1.5">Phone Coordinates</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +234 803 123 4567"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="block font-bold text-slate-750 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. samuel@gmail.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>

                <div className="text-left">
                  <label className="block font-bold text-slate-750 mb-1.5">Inquiry Subject Line *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none text-slate-700 focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="General Inquiry">General Company Inquiry</option>
                    <option value="Printing & Branding Quotation">Printing & Branding Quotation Request</option>
                    <option value="Website Development Proposal">Website Development Proposal Request</option>
                    <option value="ICT Equipment Procurement">ICT Hardware / CCTV Procurement</option>
                    <option value="Academy Admissions Portal">Digital Academy Course Admissions</option>
                  </select>
                </div>

                <div className="text-left">
                  <label className="block font-bold text-slate-750 mb-1.5">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry requirements, expected budget parameters, or preferred training dates..."
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  ></textarea>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-blue-600/10"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Ticket...' : 'Dispatch Inquiry Ticket'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
