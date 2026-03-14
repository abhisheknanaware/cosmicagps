import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Box, Bus, ShieldCheck, Zap } from 'lucide-react';

const industries = [
  { icon: <Bus />, name: "School Bus Management", desc: "Automated student tracking and parent notification systems." },
  { icon: <Truck />, name: "Logistics & Transport", desc: "Comprehensive fleet monitoring for supply chain efficiency." },
  { icon: <Bus />, name: "Public Transportation", desc: "AIS 140 compliant solutions for buses and taxis." },
  { icon: <ShieldCheck />, name: "Personal Security", desc: "GPS trackers for kids, elderly, and personal belongings." },
  { icon: <Zap />, name: "Asset Tracking", desc: "Real-time monitoring for high-value equipment and assets." },
  { icon: <ShieldCheck />, name: "White Label Partners", desc: "Empowering businesses with custom-branded telematics software." }
];

const Industries = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Solutions for <br />
              <span className="text-gradient">Every Industry</span>
            </motion.h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
              From small delivery fleets to massive industrial logistics, our platform
              is modular and scales with your business needs. We provide specialized
              vertical solutions tailored to unique operational challenges.
            </p>
            <button className="btn-secondary px-8">Explore All Verticals</button>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 flex items-center gap-5 group hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-blue/15 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all shadow-lg shadow-brand-blue/5">
                  {React.cloneElement(industry.icon, { size: 24 })}
                </div>
                <div>
                  <h4 className="font-bold mb-1 group-hover:text-brand-cyan transition-colors">{industry.name}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{industry.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
