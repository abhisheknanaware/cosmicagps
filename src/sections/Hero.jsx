import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { MapPin, Shield, Activity, Zap } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Animated Elements */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-green/10 blur-[150px] rounded-full" style={{ animation: 'float 8s ease-in-out infinite reverse' }} />
      </div>

      {/* Radar Scan Overlay */}
      <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none overflow-hidden opacity-20">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-brand-green to-transparent animate-scan" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-brand-blue/30 rounded-full bg-brand-blue/10 text-brand-cyan neon-glow-blue">
            Advanced GPS Tracking & Telematics Solutions
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter text-white">
            GPS Vehicle <br />
            <span className="text-gradient">Tracking System</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
            Specialized in providing Highly Available, Secure GPS tracking cloud servers. 
            We provide comprehensive Website Design, App Development, and AWS Cloud solution services.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <MagneticButton className="btn-primary flex items-center gap-2 group px-10">
              Whatsapp: +91 9067227722
            </MagneticButton>
            <MagneticButton className="btn-secondary px-10">
              Call: 9067227722
            </MagneticButton>
          </div>
        </motion.div>

        {/* Floating Metrics Cards - Fixed Alignment */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-card p-5 flex items-center gap-4 hover:border-brand-blue/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20 group-hover:bg-brand-blue/20 transition-colors">
                <MapPin size={22} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Current Location</p>
                <p className="text-sm xl:text-base font-bold text-white">18.5204° N, 73.8567° E</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="glass-card p-5 flex items-center gap-4 hover:border-brand-green/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green border border-brand-green/20 group-hover:bg-brand-green/20 transition-colors">
                <Activity size={22} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Real-time Speed</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-sm xl:text-lg font-black text-white">64.5</p>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">km/h</span>
                </div>
              </div>
              <div className="ml-auto">
                <div className="flex gap-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-1 h-3 rounded-full ${i <= 3 ? 'bg-brand-green' : 'bg-slate-700'}`} />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="glass-card p-5 flex items-center gap-4 hover:border-brand-cyan/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20 group-hover:bg-brand-cyan/20 transition-colors">
                <Shield size={22} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Satellite Signal</p>
                <p className="text-sm xl:text-base font-bold text-white tracking-tight">Active (12 Locked)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Satellite Animation Mock */}
      <div className="absolute top-20 right-[10%] animate-pulse-slow">
        <div className="w-2 h-2 bg-brand-cyan rounded-full neon-glow-blue shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        <div className="absolute -inset-4 border border-brand-cyan/20 rounded-full animate-ping" />
      </div>
    </section>
  );
};

export default Hero;
