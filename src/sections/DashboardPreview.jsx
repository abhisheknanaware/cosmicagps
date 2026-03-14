import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layout, Map as MapIcon, Bell, Activity, Search, Filter } from 'lucide-react';
import gsap from 'gsap';

const DashboardPreview = () => {
  const componentRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const moveFrame = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(frameRef.current, {
        rotationY: x * 0.5,
        rotationX: -y * 0.5,
        x: x,
        y: y,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', moveFrame);
    return () => window.removeEventListener('mousemove', moveFrame);
  }, []);

  return (
    <section ref={componentRef} className="py-24 overflow-hidden bg-gradient-to-b from-brand-dark to-slate-900/50 perspective-1000">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful <span className="text-gradient">Control Center</span></h2>
          <p className="text-slate-400">Everything you need to manage your fleet in one place.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto"
          ref={frameRef}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Dashboard Frame */}
          <div className="glass-card border-white/20 overflow-hidden shadow-2xl relative">
            {/* Top Bar */}
            <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-6 rounded-md bg-white/5 flex items-center px-2">
                  <span className="w-full h-2 bg-white/10 rounded-full" />
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-blue/20" />
              </div>
            </div>

            {/* Dashboard Content Layout */}
            <div className="flex h-[500px] md:h-[650px]">
              {/* Sidebar */}
              <div className="w-16 md:w-60 border-r border-white/10 hidden sm:flex flex-col p-4 gap-4 bg-white/5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                    <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-brand-cyan">
                      {i === 1 ? <Layout size={18} /> : i === 2 ? <MapIcon size={18} /> : i === 3 ? <Activity size={18} /> : i === 4 ? <Bell size={18} /> : <Search size={18} />}
                    </div>
                    <div className="hidden md:block w-24 h-4 bg-white/10 rounded-full group-hover:bg-brand-cyan/20" />
                  </div>
                ))}
              </div>

              {/* Main Area */}
              <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded bg-brand-blue/10" />
                      <div className="w-3/4 h-3 bg-white/10 rounded" />
                    </div>
                  ))}
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-6">
                  {/* Map Mock */}
                  <div className="flex-[2] rounded-2xl bg-slate-800/50 border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80')] bg-cover opacity-30 grayscale group-hover:scale-110 transition-transform duration-[10s]" />
                    <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-brand-cyan rounded-full animate-ping" />
                    <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-brand-cyan rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    
                    <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-brand-purple rounded-full shadow-[0_0_10px_rgba(139,92,246,1)]" />
                  </div>

                  {/* List Mock */}
                  <div className="flex-1 hidden md:flex flex-col gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10" />
                          <div className="flex flex-col gap-1">
                            <div className="w-16 h-3 bg-white/10 rounded" />
                            <div className="w-24 h-2 bg-white/5 rounded" />
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-brand-blue/20 blur-[100px] rounded-full" />
          <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-brand-purple/20 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
