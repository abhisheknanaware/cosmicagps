import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { value: 5000, suffix: "+", label: "Global Clients" },
  { value: 25000, suffix: "+", label: "Tracked Vehicles" },
  { value: 100, suffix: "+", label: "Successful Projects" },
  { value: 80, suffix: "+", label: "Channel Partners" }
];

const WhyChooseUs = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Why Thousands <br />
              <span className="text-gradient">Trust Cosmica</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
              We specialized in providing Highly Available, Secure GPS tracking cloud server descriptions and AWS cloud solution services.
              Our infrastructure is designed for high reliability, ensuring your fleet data
              is always accessible even in areas with poor network coverage via internal data storage.
            </p>

            <ul className="space-y-5 mb-12">
              {[
                "Secure GPS Tracking Cloud Server", 
                "Internal Storage for No Network Data", 
                "1-Year movement history reports", 
                "Real-time SMS/Email/App/WA Alerts"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-slate-300 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,1)] group-hover:scale-150 transition-transform" />
                  <span className="text-base font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>

            <button className="btn-primary px-10">Contact Sales</button>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 relative">
            {/* Background glow for stats */}
            <div className="absolute inset-0 bg-brand-blue/5 blur-[100px] rounded-full" />
            
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-10 flex flex-col items-center justify-center text-center group hover:border-brand-cyan/30 transition-all duration-500"
              >
                <div className="text-4xl md:text-5xl font-black mb-2 text-white group-hover:text-brand-cyan transition-colors">
                  <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                  {stat.suffix}
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
