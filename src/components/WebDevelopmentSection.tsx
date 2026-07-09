import React, { useState } from 'react';
import { Code, Check, Globe, HelpCircle, Shield, Cpu, ExternalLink, Send } from 'lucide-react';

interface WebDevelopmentSectionProps {
  onInquireService: (serviceName: string) => void;
}

export default function WebDevelopmentSection({ onInquireService }: WebDevelopmentSectionProps) {
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: 'Professional Business Web',
    domainDesired: '',
    requirements: '',
  });

  const services = [
    { title: 'Business Websites', desc: 'High-speed corporate profiles custom-styled with contact systems, career desks, and interactive team boards.' },
    { title: 'School Websites', desc: 'Secure student directories, report-card logging sheets, term calendars, and parent feedback loops.' },
    { title: 'NGO Websites', desc: 'Impact stories, dynamic statistics, fundraising integration, newsletter loops, and newsletter forms.' },
    { title: 'E-Commerce Websites', desc: 'High-conversion product catalogs with filters, dynamic shopping cart logic, and local cash-on-delivery routing.' },
    { title: 'Portfolio Websites', desc: 'Visual personal resume grids with hover effects, micro-animations, and client booking calendars.' },
    { title: 'Landing Pages', desc: 'Conversion-driven layouts for marketing campaigns, pre-orders, and promotional events.' },
    { title: 'Website Redesign', desc: 'Upgrading slow, old websites to high-speed React modules styled with responsive Tailwind systems.' },
    { title: 'Website Maintenance', desc: 'Weekly backups, database optimization queries, secure SSL installations, and real-time vulnerability checks.' },
    { title: 'UI/UX Design', desc: 'Figma templates, low-fidelity wireframing layouts, and typography guidelines built around user research.' },
    { title: 'Domain & Hosting Support', desc: 'Hosting deployments on Google Cloud Run or Cloud SQL database sync guides.' },
  ];

  const packages = [
    {
      name: 'Starter Landing Page',
      price: '$299',
      duration: '5 Days Delivery',
      features: [
        'Single responsive layout',
        'Tailwind utility styling',
        'Contact inquiry form',
        'Social media integrations',
        'SEO metadata configurations',
        '1-Month tech support',
      ],
      popular: false,
    },
    {
      name: 'Professional Business Web',
      price: '$599',
      duration: '10 Days Delivery',
      features: [
        'Up to 6 structured pages',
        'Translucent glassmorphism styling',
        'Figma UI/UX prototype phase',
        'Custom domain setup (.com)',
        'SSL secure validation',
        'Admin content manager dashboard',
        '6-Months premium support',
      ],
      popular: true,
    },
    {
      name: 'Enterprise E-Commerce',
      price: '$1,199',
      duration: '18 Days Delivery',
      features: [
        'Interactive shopping carts',
        'Unlimited inventory stock items',
        'Stripe/Chapa API connections',
        'Order-routing tickets to admin',
        'Instant customer registration',
        'Database backups & SSL checks',
        '1-Year developer warranty',
      ],
      popular: false,
    },
  ];

  const webPortfolio = [
    {
      title: 'Al-Ansar Comprehensive High School',
      desc: 'Interactive school management hub complete with online registration sheets, term grade records, and parents newsletter.',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&auto=format&fit=crop&q=80',
      tech: ['React', 'TypeScript', 'Node.js'],
      link: '#',
    },
    {
      title: 'Summit Trading Enterprise',
      desc: 'Elegant corporate catalog with advanced search filtering parameters and direct WhatsApp checkout routing systems.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80',
      tech: ['React', 'Tailwind', 'Express'],
      link: '#',
    },
    {
      title: 'Eco-Africa Foundation Hub',
      desc: 'A responsive non-profit portal with interactive impact map dashboards, newsletters, and secured donation tools.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=80',
      tech: ['Vite', 'Recharts', 'SSL'],
      link: '#',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        package: 'Professional Business Web',
        domainDesired: '',
        requirements: '',
      });
    }, 5000);
  };

  return (
    <div id="web-development-section" className="space-y-16 pb-20 text-left animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.15),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
              <Code className="w-4 h-4" />
            </span>
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">VISTA SOFTWARE ENGINEERING</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-3 font-display">
            Website & Software Development
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3">
            Elite digital engineering built to scale. We construct highly optimized, responsive full-stack applications and websites backed by durable databases and beautiful user experiences.
          </p>
        </div>
      </section>

      {/* 2. Professional Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Our Web Engineering Services</h2>
          <p className="text-xs text-slate-500">From high-speed React modules to secured custom management dashboards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div key={idx} className="bg-white/40 backdrop-blur-md rounded-2xl border border-slate-150 p-6 flex flex-col justify-between hover:border-blue-300 transition-all shadow-sm group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {srv.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => {
                    setFormData({ ...formData, package: srv.title });
                    const formBlock = document.getElementById('web-inquiry-block');
                    if (formBlock) {
                      formBlock.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Select Service</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Service Pricing Packages */}
      <section className="bg-slate-50 py-16 border-y border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Flexible Pricing Plans</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">VISTA Service Packages</h2>
            <p className="text-sm text-slate-500">Curated software plans fitted with modern developer standards and free support schedules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-3xl border p-8 flex flex-col justify-between shadow-sm relative transition-all ${
                  pkg.popular ? 'border-2 border-blue-500 ring-4 ring-blue-500/10 scale-103' : 'border-slate-150'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white font-bold text-[9px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6 text-left">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-450 uppercase tracking-widest">{pkg.name}</p>
                    <p className="text-4xl font-black text-slate-900">{pkg.price}</p>
                    <p className="text-[10px] font-mono font-bold text-blue-600">{pkg.duration}</p>
                  </div>

                  <ul className="space-y-3.5 border-t border-slate-100 pt-5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-slate-600 leading-tight">
                        <Check className="w-4 h-4 text-blue-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, package: pkg.name });
                      const formBlock = document.getElementById('web-inquiry-block');
                      if (formBlock) {
                        formBlock.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer text-center ${
                      pkg.popular 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/15' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Client Inquiry Form */}
      <section id="web-inquiry-block" className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white/90 backdrop-blur-lg border border-slate-150 rounded-3xl p-8 lg:p-10 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <span className="p-2.5 bg-blue-50 border border-blue-100 rounded-2xl inline-block text-blue-600">
              <Cpu className="w-6 h-6" />
            </span>
            <h3 className="text-2xl font-black text-slate-900">Start Your Web Project</h3>
            <p className="text-xs text-slate-500">Submit your basic requirements below. Our developer team will review your specifications and schedule a custom video briefing.</p>
          </div>

          {inquirySubmitted ? (
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-center space-y-2 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-lg">✓</div>
              <h4 className="font-bold text-slate-900 text-sm">Project Ticket Logged!</h4>
              <p className="text-xs text-slate-600">Thank you. Your project ticket has been logged into our admin workspace. We will contact you at your email coordinates within 12 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mohammed Isa"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@domain.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Service Category Required</label>
                  <select
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:outline-none"
                  >
                    <option value="Starter Landing Page">Starter Landing Page</option>
                    <option value="Professional Business Web">Professional Business Web</option>
                    <option value="Enterprise E-Commerce">Enterprise E-Commerce</option>
                    <option value="Business Websites">Business Websites</option>
                    <option value="School Websites">School Websites</option>
                    <option value="NGO Websites">NGO Websites</option>
                    <option value="Website Redesign">Website Redesign</option>
                    <option value="Website Maintenance">Website Maintenance</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Desired Domain (Optional)</label>
                  <input
                    type="text"
                    value={formData.domainDesired}
                    onChange={(e) => setFormData({ ...formData, domainDesired: e.target.value })}
                    placeholder="e.g. www.mycompany.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Project Description & Specifications</label>
                <textarea
                  rows={4}
                  required
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Outline your targets, desired page list, database expectations, or aesthetic layouts..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry Ticket</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 5. Project Portfolio (Websites only) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Our Software Projects</h2>
          <p className="text-xs text-slate-500">Review responsive web systems fabricated and deployed globally from our labs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {webPortfolio.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-300" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    Enterprise Live
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {item.tech.map((t, tIdx) => (
                      <span key={tIdx} className="bg-slate-100 text-slate-600 font-mono text-[8px] px-1.5 py-0.5 rounded font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-slate-950 leading-snug tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a 
                  href={item.link} 
                  className="w-full py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-blue-600 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Open Live Case</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
