import React, { useState } from 'react';
import { Printer, Check, ArrowRight, Sparkles, Send, ShoppingBag, Layers } from 'lucide-react';

interface PublisherServicesProps {
  onInquireService: (serviceName: string) => void;
}

export default function PublisherServices({ onInquireService }: PublisherServicesProps) {
  const [selectedService, setSelectedService] = useState<string>('Logo Design');
  const [quotationSubmitted, setQuotationSubmitted] = useState<boolean>(false);
  const [quotationDetails, setQuotationDetails] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '100',
    details: '',
  });

  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Banner Printing',
    specifications: '',
    deliveryAddress: '',
  });

  const servicesList = [
    { title: 'Logo Design', type: 'Design', desc: 'Custom high-fidelity vector identity guides with responsive formats.', price: 'Free Consult' },
    { title: 'Banner Printing', type: 'Print', desc: 'Premium wide-format outdoor banners with weather-proof eyelets.', price: 'From $15/sqm' },
    { title: 'T-Shirt Printing', type: 'Apparel', desc: 'High wash-resistance fabric printing with premium heat-press or screen-prints.', price: 'From $12/item' },
    { title: 'Mug Printing', type: 'Merch', desc: 'Vibrant glossy ceramic mugs styled with sublimation full-wrap designs.', price: 'From $8/item' },
    { title: 'Business Cards', type: 'Stationery', desc: 'High-grade 350gsm matte, gloss, or double-sided laminate finish.', price: 'From $20/100pcs' },
    { title: 'Flyers & Brochures', type: 'Marketing', desc: 'Bi-fold or tri-fold prints designed to showcase high-fidelity corporate assets.', price: 'From $35/100pcs' },
    { title: 'Posters', type: 'Print', desc: 'Large high-definition event posters printed on rich semi-gloss photo paper.', price: 'From $5/item' },
    { title: 'Certificates', type: 'Secure', desc: 'Textured certification cards with security foil overlays for training cohorts.', price: 'From $3/item' },
    { title: 'ID Cards', type: 'Secure', desc: 'Glossy rigid plastic PVC corporate badges complete with lanyard prints.', price: 'From $4/item' },
    { title: 'Stickers', type: 'Print', desc: 'Gloss vinyl custom die-cut labels with adhesive backings.', price: 'From $15/sheet' },
    { title: 'Rubber Stamps', type: 'Office', desc: 'Self-inking durable corporate seal stamps with detailed engraving.', price: 'From $18/item' },
    { title: 'Company Profiles', type: 'Marketing', desc: 'Professional multi-page editorial booklets showcasing products and policies.', price: 'From $90' },
    { title: 'Signboards', type: 'Outdoor', desc: 'Large dimensional LED-lit acrylic signages or heavy metal stand frames.', price: 'From $250' },
    { title: 'Marketing Materials', type: 'Branding', desc: 'Curated sets of roll-up displays, custom stamps, leaflets, and promotional merch.', price: 'Custom Quote' },
    { title: 'Graphic Design', type: 'Design', desc: 'Microscopic alignment work on promotional flyers, vectors, and UI layouts.', price: 'From $25/hour' },
    { title: 'Digital Branding', type: 'Branding', desc: 'Unified high-contrast social kits, profile icons, and digital newsletters.', price: 'Custom Quote' },
  ];

  // Curated printing & branding portfolio items
  const printingPortfolio = [
    {
      title: 'VISTA Smart Identity Kit',
      desc: 'Uniform company PVC badges, heat-press lanyards, and custom vector stamps designed and fabricated in-house.',
      img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=80',
    },
    {
      title: 'Apex Summit Branding',
      desc: '3D acrylic lobby signboards and matching matte double-sided laminated executive business cards.',
      img: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=500&auto=format&fit=crop&q=80',
    },
    {
      title: 'Al-Ansar Event Hoodies',
      desc: 'Multi-color screen printed heavy fleece promotional hoodies and cotton t-shirts for an East Africa training bootcamp.',
      img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80',
    },
  ];

  const handleQuotationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuotationSubmitted(true);
    setTimeout(() => {
      setQuotationSubmitted(false);
      setQuotationDetails({ name: '', email: '', phone: '', quantity: '100', details: '' });
    }, 5000);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      setOrderDetails({ name: '', email: '', phone: '', service: 'Banner Printing', specifications: '', deliveryAddress: '' });
    }, 5000);
  };

  return (
    <div id="publisher-services" className="space-y-16 pb-20 text-left animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.15),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-lg">
              <Printer className="w-4 h-4" />
            </span>
            <span className="text-pink-400 font-bold uppercase tracking-widest text-xs">VISTA CREATIVE & FABRICATION</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-3 font-display">
            Publisher Services
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3">
            High-caliber corporate printing, modern branding, and digital graphic design. We synchronize original creative concepts with heavy physical machinery to deliver elite promotional assets.
          </p>
        </div>
      </section>

      {/* 2. List of Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Our Core Design & Print Catalogue</h2>
          <p className="text-xs text-slate-500">We offer top-tier design and print execution across 16 premium corporate categories.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white/40 backdrop-blur-md rounded-2xl border border-slate-150 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-pink-300 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-pink-50 text-pink-700 text-[9px] font-bold uppercase tracking-wider rounded border border-pink-100">
                    {service.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold font-mono">{service.price}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-pink-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedService(service.title);
                    const quoteForm = document.getElementById('quotation-form-block');
                    if (quoteForm) {
                      quoteForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-2.5 bg-slate-50 hover:bg-pink-600 hover:text-white border border-slate-150 rounded-xl text-[10px] font-bold tracking-wide text-slate-700 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Quote Request & Order Submission split panels */}
      <section id="quotation-form-block" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Online Quotation Request Form */}
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl border border-slate-150 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Quick Quote Engine
              </span>
              <h3 className="text-xl font-black text-slate-900">Online Quotation Request</h3>
              <p className="text-xs text-slate-500">Select any graphic design or printing service below to receive an instant bulk pricing estimate from our Addis Ababa office.</p>
            </div>

            {quotationSubmitted ? (
              <div className="p-6 bg-pink-50 border border-pink-100 rounded-2xl text-center space-y-2 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto text-lg">✓</div>
                <h4 className="font-bold text-slate-900 text-sm">Quotation Proposal Logged!</h4>
                <p className="text-xs text-slate-600">Thank you. Your quotation ticket has been securely routed to our publisher desk. A technician will contact you shortly with estimates.</p>
              </div>
            ) : (
              <form onSubmit={handleQuotationSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={quotationDetails.name}
                      onChange={(e) => setQuotationDetails({ ...quotationDetails, name: e.target.value })}
                      placeholder="e.g. Mohammed Isa"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      value={quotationDetails.email}
                      onChange={(e) => setQuotationDetails({ ...quotationDetails, email: e.target.value })}
                      placeholder="e.g. info@domain.com"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Select Service Area</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white"
                    >
                      {servicesList.map((s, idx) => (
                        <option key={idx} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Estimated Quantity Needed</label>
                    <input
                      type="number"
                      required
                      value={quotationDetails.quantity}
                      onChange={(e) => setQuotationDetails({ ...quotationDetails, quantity: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Specifications & Requirements</label>
                  <textarea
                    rows={3}
                    required
                    value={quotationDetails.details}
                    onChange={(e) => setQuotationDetails({ ...quotationDetails, details: e.target.value })}
                    placeholder="Describe custom paper weights, gloss levels, design files available, or deadline details..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-md shadow-pink-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quotation Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Order Submission Form */}
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl border border-slate-150 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1">
                <ShoppingBag className="w-4 h-4" />
                Direct Order desk
              </span>
              <h3 className="text-xl font-black text-slate-900">Direct Order Submission</h3>
              <p className="text-xs text-slate-500">Submit a physical printing order with shipping details to organize immediate design validation and cash-on-delivery routing.</p>
            </div>

            {orderSubmitted ? (
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-center space-y-2 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-lg">✓</div>
                <h4 className="font-bold text-slate-900 text-sm">Order Logged Successfully!</h4>
                <p className="text-xs text-slate-600">Your direct printing order ticket has been successfully created. Our local Addis Ababa graphic designers will call you to verify design files before fabrication.</p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Client Name</label>
                    <input
                      type="text"
                      required
                      value={orderDetails.name}
                      onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                      placeholder="e.g. Mohammed Isa"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Phone Hotline</label>
                    <input
                      type="text"
                      required
                      value={orderDetails.phone}
                      onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                      placeholder="e.g. +251 911 234 567"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Primary Product Ordered</label>
                  <select
                    value={orderDetails.service}
                    onChange={(e) => setOrderDetails({ ...orderDetails, service: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white"
                  >
                    <option value="Logo Design">Logo Design</option>
                    <option value="Banner Printing">Banner Printing</option>
                    <option value="T-Shirt Printing">T-Shirt Printing</option>
                    <option value="Mug Printing">Mug Printing</option>
                    <option value="Business Cards">Business Cards</option>
                    <option value="Flyers & Brochures">Flyers & Brochures</option>
                    <option value="Posters">Posters</option>
                    <option value="Stickers">Stickers</option>
                    <option value="Rubber Stamps">Rubber Stamps</option>
                    <option value="Signboards">Signboards</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Delivery Address (Ethiopia)</label>
                  <input
                    type="text"
                    required
                    value={orderDetails.deliveryAddress}
                    onChange={(e) => setOrderDetails({ ...orderDetails, deliveryAddress: e.target.value })}
                    placeholder="e.g. Bole Subcity, Addis Ababa, Ethiopia"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Detailed Printing Specifications</label>
                  <textarea
                    rows={2}
                    required
                    value={orderDetails.specifications}
                    onChange={(e) => setOrderDetails({ ...orderDetails, specifications: e.target.value })}
                    placeholder="Enter custom sizing, fabric colors, embroidery positions, and link to shared cloud folders with your high-res design assets..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md shadow-blue-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>Submit Physical Order Request</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 4. Portfolio Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fabrication & Print Gallery</h2>
          <p className="text-xs text-slate-500">Explore real physical results delivered to East African clients and companies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {printingPortfolio.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-300" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 left-3 bg-pink-600 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    Active Run
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-950 leading-snug tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
