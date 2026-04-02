import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Facebook, Instagram, Send, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8 group cursor-pointer inline-flex">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center font-black text-xl text-white shadow-lg shadow-brand-blue/20 group-hover:rotate-6 transition-transform">C</div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">COSMICA<span className="text-brand-cyan">GPS</span></span>
            </Link>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
              Specialized in providing Highly Available, Secure GPS tracking cloud servers and enterprise AIS 140 telematics solutions.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue/10 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 italic uppercase tracking-widest text-[10px] opacity-60">Solutions</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/ais-140" className="text-slate-500 hover:text-brand-orange transition-colors">AIS 140 Tracker</Link></li>
              <li><Link to="/live-tracking" className="text-slate-500 hover:text-brand-blue transition-colors">Live Fleet Tracking</Link></li>
              <li><Link to="/products" className="text-slate-500 hover:text-brand-green transition-colors">Hardware Products</Link></li>
              <li><Link to="/products" className="text-slate-500 hover:text-brand-blue transition-colors">Asset Tracking</Link></li>
              <li><Link to="/about" className="text-slate-500 hover:text-white transition-colors">White Label Platform</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-white transition-colors">Digital Branding</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 italic uppercase tracking-widest text-[10px] opacity-60">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="text-slate-500 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-brand-blue transition-colors">Contact Support</Link></li>
              <li><Link to="/live-tracking" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/products" className="text-slate-500 hover:text-white transition-colors">Certifications</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-white transition-colors">Knowledge Base</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 italic uppercase tracking-widest text-[10px] opacity-60">Get In Touch</h4>
            <div className="space-y-6">
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                COSMICA TELEMATICS PVT LTD<br />
                Pune, Maharashtra 411057, India
              </p>
              <div className="space-y-4">
                <a href="mailto:sales@cosmicagps.com" className="flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <Mail size={14} />
                  </div>
                  sales@cosmicagps.com
                </a>
                <a href="tel:+919067227722" className="flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all">
                    <Phone size={14} />
                  </div>
                  +91 9067227722
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest leading-loose text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-white">COSMICA TELEMATICS PVT LTD.</span><br />
            <span className="text-[10px] opacity-40">Precision Tracking • Secure Cloud • AIS 140 Certified</span>
          </p>
          <div className="flex items-center gap-8">
            <span className="text-slate-700 text-[10px] font-black italic tracking-[0.3em] uppercase opacity-40 select-none hidden md:block">AWS PARTNER • ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
