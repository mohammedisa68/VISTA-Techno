import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, ChevronRight, Compass, Target, MessageCircle, Sparkles, Star, Award, BookOpen, Terminal 
} from 'lucide-react';
import { BlogPost } from '../types';
import { LanguageCode, translations } from '../lib/translations';

const vistaBrandHero = '/src/assets/images/vista_brand_hero_1782401434080.jpg';

interface HomeSectionProps {
  setCurrentTab: (tab: string) => void;
  blogs: BlogPost[];
  language: LanguageCode;
}

export default function HomeSection({ setCurrentTab, blogs, language }: HomeSectionProps) {
  const t = translations[language];

  const stats = [
    { value: '1,200+', label: t.statsGrads },
    { value: '450+', label: t.statsEnterprises },
    { value: '98%', label: t.statsSatisfaction },
    { value: '10+', label: t.statsInnovation },
  ];

  // Latest announcements (take top 3)
  const latestAnnouncements = blogs.slice(0, 3);

  return (
    <div id="home-section" className="space-y-24 pb-20 animate-in fade-in duration-300">
      
      {/* 0. PREMIUM "BEST HERE" HIGHLIGHTS BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden text-left w-full">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/10 pb-8">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-400 text-[10px] font-extrabold uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                VISTA PREMIER SELECTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                {language === 'EN' && "The Best Here — Featured Masterpieces"}
                {language === 'AR' && "الأفضل هنا — روائع فيستا المختارة"}
                {language === 'OM' && "Kuno Filatama — Hojiiwwan Gurguddoo"}
                {language === 'AM' && "የተመረጡ ምርጥ የቪስታ አገልግሎቶችና ስራዎች"}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Discover why VISTA is the leading technology, creative design, and professional education brand across East Africa.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setCurrentTab('learning')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-600 hover:to-pink-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore Top Services</span>
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-4 flex justify-center">
              {/* VISTA Animation 3:4 Aspect Ratio with elegant floating motion */}
              <div className="relative w-full max-w-[200px]">
                <motion.div 
                  className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 to-pink-500 rounded-2xl opacity-35 blur-md"
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [0.97, 1.03, 0.97]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-slate-900/60 backdrop-blur cursor-pointer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0],
                    rotate: [0, 1.5, -1.5, 0]
                  }}
                  transition={{ 
                    y: {
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut"
                    },
                    rotate: {
                      repeat: Infinity,
                      duration: 7,
                      ease: "easeInOut"
                    },
                    default: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }}
                  whileHover={{ 
                    scale: 1.04, 
                    rotateY: 6, 
                    rotateX: 3,
                    transition: { duration: 0.25, ease: "easeOut" } 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent z-10"></div>
                  <img 
                    src={vistaBrandHero} 
                    alt="VISTA Vision and Innovation Logo" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 right-3 z-20 text-left bg-black/45 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                    <span className="text-[9px] font-extrabold text-cyan-400 tracking-wider uppercase">VISTA Brand Vision</span>
                    <p className="text-[10px] text-slate-200 mt-0.5 leading-tight font-medium">Creative Hub & Technology Academy</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Best Offering 1 */}
            <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl relative group hover:border-amber-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {language === 'EN' && "1st-Class Creative Publishing"}
                    {language === 'AR' && "أفضل خدمات النشر الإبداعي"}
                    {language === 'OM' && "Maxxansa Filatamaa"}
                    {language === 'AM' && "ታዋቂና ዘመናዊ የህትመት አገልግሎት"}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Custom typographic styling, layout blueprints, cover designs, and bulk production handling. We turn authors into regional bestsellers.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentTab('publisher_services')}
                className="mt-4 text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>View Publishing Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Best Offering 2 */}
            <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl relative group hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {language === 'EN' && "Elite Web & Software Systems"}
                    {language === 'AR' && "تطوير برمجيات ومواقع النخبة"}
                    {language === 'OM' && "Misooma Weebsaayitii Ol-aanaa"}
                    {language === 'AM' && "ምርጥ የዌብሳይትና ሶፍትዌር ልማት"}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Custom high-performance software modules, dynamic databases, security compliance, and premium design workflows engineered in React.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentTab('web_development')}
                className="mt-4 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Browse Dev Solutions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Best Offering 3 */}
            <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl relative group hover:border-pink-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                    {language === 'EN' && "High-Impact Academy Classes"}
                    {language === 'AR' && "أفضل دورات الأكاديمية"}
                    {language === 'OM' && "Barnoota Teeknoolojii Qulqulluu"}
                    {language === 'AM' && "የቴክኖሎጂ ማሰልጠኛ አካዳሚ"}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Intensive training in coding, software patterns, branding, and graphics. Direct mentorship to launch your enterprise or digital career.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentTab('learning')}
                className="mt-4 text-[10px] font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Browse Academy Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats overlay */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mt-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-slate-150">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-250">
            {stats.map((stat, idx) => (
              <div key={idx} className={`text-center ${idx >= 2 ? 'pt-6 lg:pt-0' : ''} ${idx % 2 === 1 ? 'border-l-0' : ''}`}>
                <p className="text-3xl font-black text-blue-600 font-display">{stat.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION TO VISTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{t.introOverview}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t.introTitle}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              {t.introDesc1}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              {t.introDesc2}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentTab('about')}
                className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <span>{t.readStory}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&auto=format&fit=crop&q=60"
                alt="Technology Coding Lab"
                className="rounded-xl shadow-md w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1524169358666-79f22534bc6e?w=400&auto=format&fit=crop&q=60"
                alt="Branding Design Mockups"
                className="rounded-xl shadow-md w-full h-56 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60"
                alt="ICT Network Hardware Setup"
                className="rounded-xl shadow-md w-full h-56 object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60"
                alt="Classroom Workshops"
                className="rounded-xl shadow-md w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES SECTORS */}
      <section className="bg-slate-900 text-white py-20 text-left relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_40%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">{t.fourPillars}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{t.featuredServices}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t.pillarPubTitle,
                desc: t.pillarPubDesc,
                image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=400&auto=format&fit=crop&q=60',
                tab: 'publisher_services'
              },
              {
                title: t.pillarWebTitle,
                desc: t.pillarWebDesc,
                image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&auto=format&fit=crop&q=60',
                tab: 'web_development'
              },
              {
                title: t.pillarMarketTitle,
                desc: t.pillarMarketDesc,
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop&q=60',
                tab: 'market'
              },
              {
                title: t.pillarLearnTitle,
                desc: t.pillarLearnDesc,
                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&auto=format&fit=crop&q=60',
                tab: 'learning'
              },
            ].map((service, idx) => (
              <div key={idx} className="bg-slate-800/80 backdrop-blur rounded-2xl overflow-hidden shadow-lg border border-slate-750 flex flex-col justify-between hover:border-slate-500 transition-colors">
                <div>
                  <img src={service.image} alt={service.title} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
                  <div className="p-5 space-y-2">
                    <h3 className="font-extrabold text-base text-white">{service.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setCurrentTab(service.tab)}
                    className="w-full py-2.5 bg-slate-700 hover:bg-slate-650 rounded-xl text-xs font-bold tracking-wide text-white transition-all cursor-pointer"
                  >
                    {t.details}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
          
          {/* Vision card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 rounded-3xl space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/10">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.visionTitle}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {t.visionDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-blue-150/40 mt-4 flex items-center justify-between text-[10px] font-mono font-bold text-blue-600">
              <span>VISTA GOVERNANCE BLUEPRINT</span>
              <span>EST. ADDIS ABABA</span>
            </div>
          </div>

          {/* Mission card */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 p-8 rounded-3xl space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-600/10">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.missionTitle}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {t.missionDesc}
              </p>
            </div>
            <div className="pt-4 border-t border-pink-150/40 mt-4 flex items-center justify-between text-[10px] font-mono font-bold text-pink-600">
              <span>QUALITY POLICY STANDARDS</span>
              <span>MADE IN ETHIOPIA</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CALL-TO-ACTION BUTTONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-10 lg:p-14 text-white text-left relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{t.readyToAdvance}</h3>
              <p className="text-blue-100 text-xs max-w-xl leading-relaxed">
                {t.readyToAdvanceDesc}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button 
                onClick={() => setCurrentTab('contact')}
                className="w-full px-5 py-3.5 bg-white hover:bg-slate-100 text-blue-900 font-bold rounded-xl text-center shadow transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                {t.inquireWithTeam}
              </button>
              <button 
                onClick={() => setCurrentTab('learning')}
                className="w-full px-5 py-3.5 bg-blue-600 hover:bg-blue-550 border border-blue-400/20 text-white font-bold rounded-xl text-center transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                {t.registerForClass}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST ANNOUNCEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        <div className="max-w-xl space-y-2">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{t.newsHub}</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.latestAnnouncements}</h2>
          <p className="text-xs text-slate-500">{t.latestAnnouncementsDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestAnnouncements.map((ann, idx) => (
            <div key={idx} className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="aspect-video overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setCurrentTab('announcements')}>
                  <img src={ann.image} alt={ann.title} className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[9px] uppercase font-bold text-blue-600 tracking-wider block">{ann.category}</span>
                  <h3 
                    onClick={() => setCurrentTab('announcements')}
                    className="text-base font-bold text-slate-950 tracking-tight leading-snug cursor-pointer hover:text-blue-600 line-clamp-2 transition-colors"
                  >
                    {ann.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{ann.excerpt}</p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>By {ann.author}</span>
                <button 
                  onClick={() => setCurrentTab('announcements')}
                  className="text-blue-600 hover:underline font-bold uppercase text-[9px] cursor-pointer"
                >
                  {t.readAnnouncement}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT INFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="bg-slate-50 border border-slate-150 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{t.directSupport}</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.contactInfo}</h3>
              <p className="text-slate-600 text-xs leading-relaxed max-w-md">
                {t.contactDesc}
              </p>
              
              <div className="pt-4 space-y-2">
                <a 
                  href="https://t.me/VISTA_Tradinng" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center space-x-2.5 px-5 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <span>{t.joinTelegram}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.companyLocation}</p>
                <p className="text-xs font-bold text-slate-900">Addis Ababa, Ethiopia</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.headquartersAddress}</p>
                <p className="text-xs font-semibold text-slate-700">Bole Road, Central Business District, Addis Ababa</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.hotlineSupport}</p>
                <p className="text-xs font-semibold text-slate-700">+251 11 654 3210</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.technicalEmail}</p>
                <p className="text-xs font-semibold text-slate-700">info@vista-tech.com</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
