import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#header' },
    { name: 'GPS Tracking', href: '#gpsservices' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Cloud & IT', href: '#cloud' },
    { name: 'About US', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`relative px-8 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${isScrolled ? 'bg-black/80 border-white/20 shadow-2xl shadow-brand-blue/10 scale-[1.02]' : 'bg-black/40 border-white/10'}`}>
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className="flex-1 flex justify-start">
              <a href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform shadow-lg shadow-brand-blue/20">C</div>
                  <div className="absolute -inset-1 bg-brand-cyan/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter text-white">COSMICA<span className="text-brand-cyan">GPS</span></span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-black leading-none opacity-70">Telematics Solution</span>
                </div>
              </a>
            </div>

            {/* Desktop Links - Center */}
            <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 px-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-colors relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA - Right */}
            <div className="flex-1 hidden lg:flex items-center justify-end gap-6">
              <button className="text-[12px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</button>
              <MagneticButton className="btn-primary py-2.5 px-6 text-[12px] uppercase tracking-widest flex items-center gap-2 group">
                Contact Sales
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl" />
            <div className="relative h-full flex flex-col items-center justify-center gap-8 p-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-white hover:text-brand-cyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col items-center gap-6 w-full max-w-xs mt-8">
                <button className="w-full py-4 text-white font-bold border border-white/10 rounded-full">Login</button>
                <button className="w-full btn-primary">Contact Sales</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
