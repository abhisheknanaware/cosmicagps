import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Facebook, Instagram, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center font-black text-xl text-white shadow-lg shadow-brand-blue/20 group-hover:rotate-6 transition-transform">C</div>
              <span className="text-2xl font-black tracking-tighter text-white">COSMICA<span className="text-brand-cyan">GPS</span></span>
            </div>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Specialized in providing Highly Available, Secure GPS tracking cloud servers and enterprise AWS cloud solutions.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan transition-all duration-300 hover:bg-white/5">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 italic uppercase tracking-widest text-[10px] opacity-60">GPS Tracking</h4>
            <ul className="space-y-4 text-sm">
              {['AIS 140 Tracker', 'Fleet Management', 'White Label Platform', 'Personal Tracker', 'Asset Tracking', 'RFID Identification'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-500 hover:text-brand-cyan transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 italic uppercase tracking-widest text-[10px] opacity-60">Cloud & IT</h4>
            <ul className="space-y-4 text-sm">
              {['Website Designing', 'AWS Consulting', 'Mobile App Dev', 'Cloud Migration', 'WhatsApp API', 'Digital Branding'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-500 hover:text-brand-cyan transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 italic uppercase tracking-widest text-[10px] opacity-60">Contact Us</h4>
            <div className="space-y-6">
              <p className="text-slate-400 text-sm leading-relaxed">
                COSMICA TELEMATICS PVT LTD<br />
                Pride Purple Square, Kalewadi Phata, Wakad, Pune, Maharashtra 411057
              </p>
              <div className="space-y-3">
                <p className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="text-brand-cyan font-bold uppercase text-[10px] tracking-widest">Email</span>
                  <a href="mailto:sales@cosmicagps.com" className="hover:text-white transition-colors">sales@cosmicagps.com</a>
                </p>
                <p className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="text-brand-cyan font-bold uppercase text-[10px] tracking-widest">Phone</span>
                  <a href="tel:+919067227722" className="hover:text-white transition-colors">+91 9067227722</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-slate-500 text-xs font-medium">
            © {new Date().getFullYear()} <span className="text-white font-bold">COSMICA TELEMATICS PVT LTD.</span> All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-slate-700 text-[10px] font-black italic tracking-[0.3em] uppercase opacity-40 select-none">AWS PARTNER • ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
