import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-lg mr-2.5">
                V
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">VISTA</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Vision of Innovative Systems and Technologies for Advancement. We empower individuals and enterprises through top-tier digital skill academy pathways, custom web engineering, tech product curation, and high-fidelity printing.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 rounded-lg transition-all" title="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 rounded-lg transition-all" title="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 rounded-lg transition-all" title="LinkedIn"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 rounded-lg transition-all" title="Instagram"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Services Column */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wider text-sm uppercase">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-white hover:underline transition-colors block text-left">Home</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-white hover:underline transition-colors block text-left">About VISTA</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('publisher_services')} className="hover:text-white hover:underline transition-colors block text-left">Publisher Services</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('market')} className="hover:text-white hover:underline transition-colors block text-left">VISTA Market</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('web_development')} className="hover:text-white hover:underline transition-colors block text-left">Website Development</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('learning')} className="hover:text-white hover:underline transition-colors block text-left">VISTA Learning</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('management')} className="hover:text-white hover:underline transition-colors block text-left">Company Management</button>
              </li>
            </ul>
          </div>

          {/* Business Hours Column */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wider text-sm uppercase">Business Hours</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Monday - Friday</p>
                  <p className="text-xs text-slate-400">8:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Saturday</p>
                  <p className="text-xs text-slate-400">9:00 AM - 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-slate-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-400">Sunday & Holidays</p>
                  <p className="text-xs text-slate-500">Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wider text-sm uppercase">HQ Location</h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mt-1 text-blue-400 mr-2 shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-blue-400 mr-2 shrink-0" />
                <span>+251 91 234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-blue-400 mr-2 shrink-0" />
                <span className="break-all">info@vista-tech.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} VISTA (Vision of Innovative Systems and Technologies for Advancement). All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
