import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, History, Bell, Fuel, TrendingUp, Smartphone, Zap } from 'lucide-react';

const features = [
  {
    icon: <Navigation className="w-8 h-8" />,
    title: "Live Tracking",
    description: "Highly accurate real-time location monitoring with 10-second updates and anti-theft siren alerts.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "AIS 140 Compliant",
    description: "Regulatory-compliant trackers for public transport and commercial vehicles with emergency buttons.",
    color: "from-brand-purple/20 to-brand-blue/20"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "White Label Platform",
    description: "Launch your own GPS brand with our state-of-the-art white-label tracking platform.",
    color: "from-brand-cyan/20 to-brand-blue/20"
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "OverSpeed Alerts",
    description: "Instant notifications for overspeeding, geofencing, fuel theft, and ignition status.",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: <History className="w-8 h-8" />,
    title: "1 Year History",
    description: "Detailed map history reports including moving time, idle time, and trip logs stored for 365 days.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "No Network Data",
    description: "Internal flash storage buffers data when out of network range, automatically uploading later.",
    color: "from-orange-500/20 to-red-500/20"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Powerful <span className="text-gradient">Tracking Features</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Our comprehensive suite of tools gives you total control over your fleet, 
            ensuring maximum efficiency and peace of mind.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="glass-card group p-8 relative overflow-hidden cursor-default"
            >
              {/* Hover Background Accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-brand-cyan group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-cyan transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 border-t-2 border-r-2 border-brand-cyan rounded-tr-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
