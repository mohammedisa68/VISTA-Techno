import React from 'react';
import { Target, Compass, Heart, ShieldCheck, Quote } from 'lucide-react';
import { LanguageCode, translations } from '../lib/translations';

interface AboutSectionProps {
  language: LanguageCode;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language];

  const values = [
    {
      icon: <Compass className="w-5 h-5 text-blue-600" />,
      title: t.aboutValue1Title,
      desc: t.aboutValue1Desc
    },
    {
      icon: <Target className="w-5 h-5 text-blue-600" />,
      title: t.aboutValue2Title,
      desc: t.aboutValue2Desc
    },
    {
      icon: <Heart className="w-5 h-5 text-blue-600" />,
      title: t.aboutValue3Title,
      desc: t.aboutValue3Desc
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: t.aboutValue4Title,
      desc: t.aboutValue4Desc
    },
  ];

  return (
    <div id="about-section" className="space-y-24 pb-20 text-left">
      
      {/* Page Title Header */}
      <section className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.1),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">VISTA Identity</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1.5">{t.aboutHeaderTitle}</h1>
          <p className="text-sm text-slate-400 max-w-xl mt-3">{t.aboutHeaderDesc}</p>
        </div>
      </section>

      {/* 1. Overview and Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Main narrative */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.aboutStoryTitle}</h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              {t.aboutStoryDesc1}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              {t.aboutStoryDesc2}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              {t.aboutStoryDesc3}
            </p>
          </div>

          {/* Large image */}
          <div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-20 blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                alt="VISTA Creative Workspace"
                className="relative rounded-2xl shadow-xl w-full h-96 object-cover border border-slate-200"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Mission and Vision Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl border border-blue-100 space-y-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950">{t.missionTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.missionDesc}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-white p-10 rounded-2xl border border-indigo-100 space-y-4">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl w-fit">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950">{t.visionTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.visionDesc}
            </p>
          </div>

        </div>
      </section>

      {/* 3. Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-xl space-y-3">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Our Backbone</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.aboutValuesTitle}</h2>
          <p className="text-sm text-slate-500">Every project we code, item we ship, or class we deliver is anchored on these four operating pillars.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-lg w-fit">
                {value.icon}
              </div>
              <h3 className="font-bold text-sm text-slate-950">{value.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Strategic Goals */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-xl space-y-3">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Forward Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Strategic Long-Term Goals</h2>
            <p className="text-sm text-slate-400">Our operational milestones for the next decade as we transition into a major software and academy empire.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'LMS Platform Expansion',
                desc: 'Integrating our physical training lab with an online Learning Management System (LMS) hosting custom self-paced tutorials, student homework portals, and verifiable digital badges.'
              },
              {
                step: '02',
                title: 'Incubator & Creative Agency',
                desc: 'Establishing VISTA Labs: A creative technology incubator where our highest-scoring web dev and branding graduates are hired directly to execute live commercial contracts.'
              },
              {
                step: '03',
                title: 'Multi-Branch Operations',
                desc: 'Opening three physical smart branches across regional economic hubs to deliver highly localized graphics printing services, ICT hardware showrooms, and regional workshops.'
              }
            ].map((goal, idx) => (
              <div key={idx} className="bg-slate-800/80 p-8 rounded-xl border border-slate-750 space-y-4">
                <span className="text-4xl font-extrabold text-blue-500 font-mono block">{goal.step}</span>
                <h3 className="font-bold text-base text-white">{goal.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Message from the Founder */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-10 md:p-12 rounded-2xl border border-slate-100 shadow-md relative overflow-hidden">
          {/* Decorative quotes background */}
          <div className="absolute top-4 right-4 text-slate-100 text-8xl font-black select-none pointer-events-none font-mono">”</div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            {/* Founder photo */}
            <div className="shrink-0 text-center space-y-2">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80"
                alt="Mohammed Isa VISTA Founder"
                className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow-md"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">Mohammed Isa</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Founder & CEO</p>
              </div>
            </div>

            {/* Quote content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-1.5 text-blue-600">
                <Quote className="w-5 h-5 fill-blue-50" />
                <span className="font-bold uppercase tracking-wider text-[10px]">Leader Statement</span>
              </div>
              <p className="text-slate-600 italic text-sm leading-relaxed">
                "Our technology systems at VISTA are developed on a fundamental premise: advancement is impossible without both tools and training. It is not enough to sell high-end laptops; we must train students to code on them. It is not enough to build a modern corporate website; we must brand it impeccably. VISTA is our commitment to a holistic digital advancement. We invite you to partner with us, learn with us, and advance with us."
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
