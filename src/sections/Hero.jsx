import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { MapPin, Shield, Activity, Zap, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

const Hero = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    // Subtle background mouse follow effect
    const moveBg = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      
      gsap.to(bgRef.current, {
        x: x,
        y: y,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', moveBg);
    return () => window.removeEventListener('mousemove', moveBg);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 opacity-40 grayscale-[0.5] contrast-[1.2]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Radar Scan Overlay */}
      <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none overflow-hidden opacity-20 z-1">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent animate-scan" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-1" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-5 py-2 mb-8 text-xs font-black tracking-[0.2em] uppercase border border-brand-blue/30 rounded-full bg-brand-blue/10 text-brand-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            Advanced GPS Tracking & Telematics Solutions
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.85] tracking-tighter text-white">
            TRACK YOUR <br />
            <span className="text-gradient">FLEET LIVE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-medium">
            Highly available, secure GPS tracking cloud servers. 
            Providing comprehensive Website Design, App Development, and AIS 140 solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link to="/live-tracking">
              <MagneticButton className="btn-primary py-5 px-10 flex items-center gap-3 group text-sm uppercase tracking-widest font-black bg-brand-blue shadow-2xl shadow-brand-blue/30">
                <Play size={18} className="fill-white" />
                Live Tracking Demo
              </MagneticButton>
            </Link>
            <Link to="/contact">
              <MagneticButton className="btn-secondary py-5 px-10 text-sm uppercase tracking-widest font-black border-2 border-white/10 hover:border-brand-orange/50 transition-colors">
                Contact Sales
              </MagneticButton>
            </Link>
          </div>
        </motion.div>

        {/* Floating Metrics Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-card p-6 flex items-center gap-5 hover:border-brand-blue/40 transition-all group bg-white/[0.02]"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-lg shadow-brand-blue/10">
                <MapPin size={26} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">Live Location</p>
                <p className="text-base font-bold text-white">18.5204° N, 73.8567° E</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="glass-card p-6 flex items-center gap-5 hover:border-brand-green/40 transition-all group bg-white/[0.02]"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green border border-brand-green/20 group-hover:bg-brand-green group-hover:text-white transition-all duration-500 shadow-lg shadow-brand-green/10">
                <Activity size={26} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">Vehicle Speed</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-black text-white">64.5</p>
                  <span className="text-[10px] text-brand-green font-black uppercase">km/h</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="glass-card p-6 flex items-center gap-5 hover:border-brand-orange/40 transition-all group bg-white/[0.02]"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 shadow-lg shadow-brand-orange/10">
                <Shield size={26} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">AIS 140 Security</p>
                <p className="text-base font-bold text-white tracking-tight uppercase">Certified Active</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Satellite Animation Mock */}
      <div className="absolute top-40 right-[15%] animate-pulse-slow hidden xl:block">
        <div className="w-2 h-2 bg-brand-cyan rounded-full shadow-[0_0_20px_#22d3ee]" />
        <div className="absolute -inset-8 border border-brand-cyan/10 rounded-full animate-ping" />
        <div className="absolute -inset-16 border border-brand-cyan/5 rounded-full animate-ping opacity-50" />
      </div>
    </section>
  );
};

export default Hero;
