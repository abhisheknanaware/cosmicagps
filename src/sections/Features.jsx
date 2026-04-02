import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, History, Bell, Fuel, TrendingUp, Smartphone, Zap, ShieldCheck, MapPin } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Live GPS Tracking",
    description: "Highly accurate real-time location monitoring with 10-second updates and anti-theft siren alerts.",
    color: "from-brand-blue/20 to-brand-cyan/20",
    iconColor: "text-brand-blue",
    borderColor: "group-hover:border-brand-blue/50"
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "AIS 140 Compliant",
    description: "Regulatory-compliant trackers for public transport and commercial vehicles with emergency buttons.",
    color: "from-brand-orange/20 to-orange-500/20",
    iconColor: "text-brand-orange",
    borderColor: "group-hover:border-brand-orange/50"
  },
  {
    icon: <Fuel className="w-8 h-8" />,
    title: "Fuel Monitoring",
    description: "Real-time fuel level monitoring with theft alerts and consumption reports.",
    color: "from-brand-green/20 to-emerald-500/20",
    iconColor: "text-brand-green",
    borderColor: "group-hover:border-brand-green/50"
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "OverSpeed Alerts",
    description: "Instant notifications for overspeeding, geofencing, fuel theft, and ignition status.",
    color: "from-red-500/20 to-pink-500/20",
    iconColor: "text-red-400",
    borderColor: "group-hover:border-red-400/50"
  },
  {
    icon: <History className="w-8 h-8" />,
    title: "1 Year History",
    description: "Detailed map history reports including moving time, idle time, and trip logs stored for 365 days.",
    color: "from-brand-blue/20 to-indigo-500/20",
    iconColor: "text-brand-blue",
    borderColor: "group-hover:border-brand-blue/50"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Alerts",
    description: "Push notifications, SMS, and email alerts for every critical event in your fleet.",
    color: "from-yellow-400/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    borderColor: "group-hover:border-yellow-400/50"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter"
          >
            SMART <span className="text-gradient">TELEMATICS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
          >
            Advanced features designed to give you total control and 
            maximum efficiency for your fleet operations.
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
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`glass-card group p-10 relative overflow-hidden cursor-default border-white/5 transition-all duration-500 ${feature.borderColor}`}
            >
              {/* Hover Background Accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 ${feature.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl border border-white/10 group-hover:bg-white/10`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-white transition-colors tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium text-sm md:text-base">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-all duration-500">
                <div className={`w-10 h-10 border-t-2 border-r-2 rounded-tr-xl ${feature.iconColor.split(' ')[0].replace('text', 'border')}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
