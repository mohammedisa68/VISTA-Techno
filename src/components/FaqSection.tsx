import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq_1');

  const faqs = [
    {
      id: 'faq_1',
      category: 'academy',
      q: 'Do I need a personal laptop to enroll in the coding or design academy programs?',
      a: 'While having a personal laptop is highly recommended for homework and independent study, it is not strictly required. The VISTA physical training lab features high-spec desktop stations pre-loaded with all required software tools (VS Code, Photoshop, Illustrator, Python) for student use during class hours.'
    },
    {
      id: 'faq_2',
      category: 'academy',
      q: 'Are VISTA diplomas and certificates internationally verifiable?',
      a: 'Yes! VISTA issues digitally signed, verifiable academic transcripts and credentials. Each graduation certificate carries a unique cryptographic ID which employers, universities, and partners can instantly verify online on our graduation verification page.'
    },
    {
      id: 'faq_3',
      category: 'services',
      q: 'What is the standard turnaround time for printing large outdoor banners and corporate cards?',
      a: 'Standard print production runs (such as business cards, brochures, flyers, t-shirts, and labels) are executed in 2-4 business days. Large-scale signboards, dimensional LED lightboxes, or custom wax company seals are fabricated and installed within 5-7 business days.'
    },
    {
      id: 'faq_4',
      category: 'services',
      q: 'Do you offer post-launch website maintenance or technical support?',
      a: 'Absolutely. Every business, school, or e-commerce platform engineered by VISTA includes 3 months of complimentary hosting, SSL security audits, content updates, and databases monitoring. Beyond this period, we offer affordable Monthly SLA Maintenance contracts.'
    },
    {
      id: 'faq_5',
      category: 'shop',
      q: 'Can I request custom RAM or SSD upgrades on laptops purchased from your showroom?',
      a: 'Yes, we offer on-the-spot hardware modifications. When purchasing a commercial laptop, our certified ICT technicians can expand its memory capacity (e.g., upgrading from 8GB to 16GB/32GB RAM) or storage space (installing 512GB/1TB NVMe SSDs) using original manufacturer modules and preserve your official warranty.'
    },
    {
      id: 'faq_6',
      category: 'shop',
      q: 'Do your CCTV security system packages require an active internet connection?',
      a: 'No. The 8-Channel CCTV IP camera sets record continuously to a local physical Network Video Recorder (NVR) with a built-in hard drive, functioning 100% offline. However, if you want to stream the camera feed remotely on your smartphone, the NVR must be connected to a local router with active internet.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq-section" className="space-y-12 pb-20 text-left">
      
      {/* Title Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.12),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">VISTA knowledge repository</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5 font-display">Frequently Asked Questions</h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3 font-sans">Clear, objective answers about tuition payment structures, physical printing specs, computer showroom warranties, and software support.</p>
        </div>
      </section>

      {/* Accordions layout */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-sm hover:border-slate-300 transition-all text-left"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 flex items-center justify-between font-bold text-sm text-slate-900 hover:text-blue-650 focus:outline-none focus:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3 text-left">
                    <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-900 leading-snug tracking-tight">{faq.q}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-3" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-3" />}
                </button>

                {/* Accordion Content Panel */}
                {isOpen && (
                  <div className="px-5 pb-5 pl-13 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Callout FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-150 text-center space-y-3">
          <p className="text-xs font-bold text-slate-900">Still have unanswered questions?</p>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-md mx-auto">Our registrations offices and technicians are standing by. Get directly in touch via email or phone for unique corporate consults.</p>
        </div>
      </section>

    </div>
  );
}
