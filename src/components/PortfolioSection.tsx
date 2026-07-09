import React, { useState } from 'react';
import { ExternalLink, Check, Image as ImageIcon } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
}

export default function PortfolioSection({ portfolioItems }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'websites' | 'graphic_design' | 'branding' | 'printing' | 'success_stories'>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'websites', label: 'Web Engineering' },
    { id: 'graphic_design', label: 'Graphic Designs' },
    { id: 'branding', label: 'Branding Campaigns' },
    { id: 'printing', label: 'Printing Gallery' },
    { id: 'success_stories', label: 'Success Cohorts' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div id="portfolio-section" className="space-y-16 pb-20 text-left">
      
      {/* Title Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.12),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">VISTA Track Record</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5 font-display">Our Case Portfolios</h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3 font-sans">A curated visual catalog of custom-styled e-commerce websites, school landing structures, vector corporate branding guides, and academy graduation events.</p>
        </div>
      </section>

      {/* Categories Horizontal Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Items Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-slate-150 rounded-2xl p-12 text-center text-slate-400 max-w-sm mx-auto">
            <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-800">No portfolio projects</p>
            <p className="text-xs text-slate-500 mt-1">Check back later or register as an administrator to add portfolio projects dynamically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`portfolio-item-${item.id}`}
                className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Visual Cover Frame */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-300" />
                  
                  {/* Category overlay label */}
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    {item.category.replace('_', ' ')}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <div className="space-y-1.5">
                    {item.client && (
                      <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">{item.client}</span>
                    )}
                    <h3 className="text-base font-bold text-slate-950 leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.completionDate && (
                    <div className="border-t border-slate-50 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Completed: {item.completionDate}</span>
                      {item.link && (
                        <a href={item.link} className="flex items-center space-x-1 hover:text-blue-600" title="Open Project Link">
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}

                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Client List callout */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold">Trusted by over 120 Local Corporate Clients</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-xl font-bold font-display tracking-tight text-slate-800">Summit Solutions</span>
            <span className="text-xl font-bold font-display tracking-tight text-slate-800">Apex Law Firm</span>
            <span className="text-xl font-bold font-display tracking-tight text-slate-800">Al-Ansar NGO</span>
            <span className="text-xl font-bold font-display tracking-tight text-slate-800">Al-Ikhlas Academy</span>
            <span className="text-xl font-bold font-display tracking-tight text-slate-800">Lotus Foods</span>
          </div>
        </div>
      </section>

    </div>
  );
}
