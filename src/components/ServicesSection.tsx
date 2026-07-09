import React, { useState } from 'react';
import { Printer, Code, Monitor, BookOpen, Check, FileText, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onInquireService: (serviceName: string) => void;
}

export default function ServicesSection({ onInquireService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'printing' | 'web' | 'electronics' | 'training'>('all');

  const categories = [
    { id: 'all', label: 'All Services', icon: null },
    { id: 'printing', label: 'Printing & Branding', icon: <Printer className="w-4 h-4" /> },
    { id: 'web', label: 'Website Development', icon: <Code className="w-4 h-4" /> },
    { id: 'electronics', label: 'Electronics & ICT', icon: <Monitor className="w-4 h-4" /> },
    { id: 'training', label: 'Digital Training', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const services = [
    // Printing & Branding
    {
      id: 'srv_1',
      category: 'printing',
      title: 'Roll-up & Banner Printing',
      desc: 'High-resolution outdoor flex banners and indoor roll-up banner stands with vibrant fade-resistant coloring.',
      details: ['Roll-up stands included', 'Vibrant 1440 DPI resolution', 'Grommet installations', 'Weatherproof durability']
    },
    {
      id: 'srv_2',
      category: 'printing',
      title: 'Corporate T-Shirt Printing',
      desc: 'Uniform and event custom cotton t-shirts styled with durable heat-press, screen printing, or detailed embroidery.',
      details: ['Premium combed cotton', 'Custom sizing charts', 'High wash resistance', 'Screen or heat-transfer']
    },
    {
      id: 'srv_3',
      category: 'printing',
      title: 'Logo Design & Brand Guides',
      desc: 'Custom vector logo creation complete with curated typographic scales, primary palettes, and brand guidelines.',
      details: ['Original vector files (.AI, .SVG)', '3 Layout revisions', 'Complete Typography scale', 'Corporate color pairing']
    },
    {
      id: 'srv_4',
      category: 'printing',
      title: 'Premium Business Cards',
      desc: 'Sleek corporate identity cards with options for gloss, matte lamination, rounded corners, or textured cardstock.',
      details: ['350gsm premium board', 'Matte or Gloss lamination', 'Double-sided offset prints', 'Custom shape corners']
    },
    {
      id: 'srv_5',
      category: 'printing',
      title: 'Rubber Stamps & Company Seals',
      desc: 'Self-inking high-precision company stamps and heavy-duty wax seals for corporate legal validations.',
      details: ['Self-inking cartridge', 'Premium polymer engraving', 'Heavy-duty steel mechanisms', 'Multiple color choices']
    },
    {
      id: 'srv_6',
      category: 'printing',
      title: 'Signboards & Exhibition Displays',
      desc: 'Outdoor dimensional letter signboards, lightboxes, and promotional retail banner stands.',
      details: ['LED backlight option', 'Steel armature structure', 'Professional mounting service', '3D Acrylic lettering']
    },

    // Website Development
    {
      id: 'srv_7',
      category: 'web',
      title: 'Business & Corporate Sites',
      desc: 'Professional multi-page landing sites customized with interactive contact panels, service details, and custom email accounts.',
      details: ['SEO optimized layout', 'Custom corporate domain', 'Secure SSL certificates', 'Integrated Contact Form']
    },
    {
      id: 'srv_8',
      category: 'web',
      title: 'School Management Portals',
      desc: 'Sophisticated school database engines featuring student report-cards, term-grade computations, and teacher tracking.',
      details: ['Secure Student Profiles', 'Custom grading computes', 'Fees logging tracker', 'Parent notification desk']
    },
    {
      id: 'srv_9',
      category: 'web',
      title: 'NGO & Non-Profit Systems',
      desc: 'Impact-driven website portfolios featuring case story catalogs, newsletter loops, and donation link integration.',
      details: ['Donation link gateways', 'Custom news newsletter loop', 'Interactive campaign metrics', 'Visual project galleries']
    },
    {
      id: 'srv_10',
      category: 'web',
      title: 'E-Commerce Platforms',
      desc: 'Online shopping catalogs styled with responsive filters, interactive carts, product variants, and dynamic checkout billing.',
      details: ['Integrated Stripe/Paystack', 'Stock inventory logging', 'Order summary receipts', 'Customer profile logins']
    },

    // Electronics & ICT
    {
      id: 'srv_11',
      category: 'electronics',
      title: 'Laptops & Computers Sales',
      desc: 'Commercial high-end coding laptops, office desktop units, and customized workstations sourced with official warranties.',
      details: ['1-Year official warranty', 'Custom RAM and SSD installs', 'Pre-configured corporate OS', 'Free post-purchase repairs']
    },
    {
      id: 'srv_12',
      category: 'electronics',
      title: 'Surveillance CCTV Installation',
      desc: 'Commercial network IP cameras, night-vision recorders, and secure mobile feeds for 24/7 security monitoring.',
      details: ['4MP UltraHD IP Cameras', 'Continuous NVR local backup', 'Smartphone remote stream', 'Motion-triggered notifications']
    },
    {
      id: 'srv_13',
      category: 'electronics',
      title: 'Enterprise Routing & Wi-Fi',
      desc: 'LAN network structure planning, Ethernet cabling, and secure managed Wi-Fi routing for school/office complexes.',
      details: ['Cat6 shielded structural runs', 'Gigabit routing devices', 'Bandwidth control parameters', 'Firewall security setups']
    },

    // Training
    {
      id: 'srv_14',
      category: 'training',
      title: 'Office Productivity Bootcamps',
      desc: 'Empowering employees and student candidates with foundational spreadsheet computing, typing drills, and file logging.',
      details: ['Interactive Spreadsheet computing', 'Foundational typing speed drills', 'Document layout and margins', 'Cloud drive collaboration']
    },
    {
      id: 'srv_15',
      category: 'training',
      title: 'Graphic Design Academy',
      desc: 'Practical software design workshops covering layout compositions, vectors, and brand identity templates.',
      details: ['Adobe Suite coaching', 'Creative composition parameters', 'Prep files for flex print runs', 'Portfolio showcase review']
    }
  ];

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div id="services-section" className="space-y-16 pb-20 text-left">
      
      {/* Services Title Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">VISTA Capabilities</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5">Solutions & Services</h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3">We synchronize high-fidelity digital creation with heavy physical execution. Browse our comprehensive business service catalog below.</p>
        </div>
      </section>

      {/* Category Tab Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2.5 pb-4 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide flex items-center space-x-2 transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl border border-slate-150 p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                {/* Category tag badge */}
                <span className={`inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md ${
                  service.category === 'printing' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                  service.category === 'web' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                  service.category === 'electronics' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                  'bg-purple-50 text-purple-700 border border-purple-100'
                }`}>
                  {service.category === 'printing' ? 'Printing & Branding' :
                   service.category === 'web' ? 'Website Development' :
                   service.category === 'electronics' ? 'Electronics & ICT' :
                   'Skills Academy'}
                </span>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed">
                  {service.desc}
                </p>

                {/* Bullets checklist */}
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-[11px] text-slate-600">
                      <Check className="w-3.5 h-3.5 text-blue-500 mr-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-6">
                <button
                  onClick={() => onInquireService(service.title)}
                  className="w-full py-3 bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-150 group-hover:border-blue-500 rounded-xl text-xs font-bold tracking-wide text-slate-700 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Request Quote & Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive trust callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-150 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl hidden sm:block shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Need a bulk corporate quotation?</h4>
              <p className="text-xs text-slate-500 mt-0.5">We offer custom service SLA pricing plans for universities, NGOs, and office hardware deployments.</p>
            </div>
          </div>
          <button
            onClick={() => onInquireService("Bulk SLA Corporate Quotation")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shrink-0 cursor-pointer"
          >
            Request Corporate SLA
          </button>
        </div>
      </section>

    </div>
  );
}
