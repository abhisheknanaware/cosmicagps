import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Play, LogOut, User as UserIcon, LayoutDashboard, Map } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Goodbye! You have been logged out.', {
      icon: '👋',
      duration: 3000
    });
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard', protected: true },
    { name: 'Live Tracking', href: '/live-tracking', protected: true },
    { name: 'AIS 140', href: '/ais-140', protected: true },
    { name: 'Reports', href: '/reports', protected: true },
    { name: 'Drivers', href: '/drivers', protected: true },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const filteredLinks = navLinks.filter(link => !link.protected || (link.protected && user));

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`relative px-8 py-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${isScrolled ? 'bg-black/80 border-white/20 shadow-2xl shadow-brand-blue/10 scale-[1.02]' : 'bg-black/40 border-white/10'}`}>
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className="flex-1 flex justify-start">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform shadow-lg shadow-brand-blue/20">C</div>
                  <div className="absolute -inset-1 bg-brand-cyan/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter text-white">COSMICA<span className="text-brand-cyan">GPS</span></span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-black leading-none opacity-70">Telematics Solution</span>
                </div>
              </Link>
            </div>

            {/* Desktop Links - Center */}
            <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 px-4">
              {filteredLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.15em] transition-colors relative group whitespace-nowrap ${location.pathname === link.href ? 'text-brand-cyan' : 'text-slate-400 hover:text-white'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-cyan transition-all ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </div>

            {/* CTA & Auth - Right */}
            <div className="flex-1 hidden lg:flex items-center justify-end gap-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-slate-200">
                    <UserIcon size={14} className="text-brand-cyan" />
                    {user.name.split(' ')[0]}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-[12px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</Link>
                  <Link to="/signup" className="text-[12px] font-bold uppercase tracking-widest text-brand-cyan hover:text-white transition-colors">Sign Up</Link>
                </div>
              )}
              
              <Link to="/live-tracking">
                <MagneticButton className="btn-primary py-2.5 px-6 text-[11px] uppercase tracking-widest flex items-center gap-2 group whitespace-nowrap bg-brand-blue shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  Track
                  <Play size={14} className="fill-white transition-transform group-hover:scale-110" />
                </MagneticButton>
              </Link>
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-2xl" />
            <div className="relative h-full flex flex-col items-center justify-center gap-10 p-6">
              {filteredLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-4xl font-black uppercase tracking-tighter ${location.pathname === link.href ? 'text-brand-cyan' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex flex-col items-center gap-6 w-full max-w-xs mt-10">
                {user ? (
                  <div className="flex flex-col items-center gap-4 w-full">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Hello, {user.name}</span>
                    <button 
                      onClick={handleLogout}
                      className="w-full py-4 text-red-500 font-bold border border-red-500/20 rounded-2xl uppercase tracking-widest text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 w-full">
                    <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full py-4 text-white font-bold border border-white/10 rounded-2xl uppercase tracking-widest text-sm">Login</button>
                    </Link>
                    <Link to="/signup" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full py-4 text-brand-cyan font-bold border border-brand-cyan/20 rounded-2xl uppercase tracking-widest text-sm">Sign Up</button>
                    </Link>
                  </div>
                )}
                
                <Link to="/live-tracking" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full btn-primary py-4 uppercase tracking-widest text-sm font-bold shadow-2xl shadow-brand-blue/30">Track Now</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
