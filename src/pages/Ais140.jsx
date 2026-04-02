import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ShieldAlert, MapPin, Navigation, Bell, Activity, CheckCircle2 } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const Ais140 = () => {
  const features = [
    {
      title: "Panic Button (SOS)",
      description: "Dedicated panic button for passenger safety, alerting emergency services instantly.",
      icon: <Bell size={24} className="text-brand-orange" />,
      color: "border-brand-orange/30",
      bg: "bg-brand-orange/10"
    },
    {
      title: "Live GPS Tracking",
      description: "Real-time location monitoring with dual-server transmission for compliance.",
      icon: <MapPin size={24} className="text-brand-blue" />,
      color: "border-brand-blue/30",
      bg: "bg-brand-blue/10"
    },
    {
      title: "Geo-fencing",
      description: "Define virtual boundaries and receive alerts when vehicles enter or exit.",
      icon: <ShieldAlert size={24} className="text-brand-green" />,
      color: "border-brand-green/30",
      bg: "bg-brand-green/10"
    }
  ];

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-widest mb-6"
              >
                <ShieldAlert size={14} />
                Government Approved
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              >
                AIS 140 <br />
                <span className="text-brand-orange">Certified</span> GPS
              </motion.h1>
              <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl">
                The AIS 140 standard is mandatory for all public transport and commercial vehicles in India. 
                Our certified devices ensure total compliance and passenger safety.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <MagneticButton className="btn-primary-orange flex items-center gap-2 group px-10">
                  Get AIS 140 Device
                </MagneticButton>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="glass-card p-4 md:p-8 border-brand-orange/20"
                >
                  <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop" alt="AIS 140 GPS Device" className="w-full rounded-2xl grayscale transition-all hover:grayscale-0" />
                  <div className="absolute -bottom-6 -right-6 p-6 bg-brand-orange rounded-3xl shadow-xl">
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                </motion.div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-orange/20 blur-[120px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-slate-900/50 py-20 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Mandatory For All Vehicles</h2>
            <p className="text-slate-400">Compliance is key for commercial vehicle operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`glass-card p-10 border ${feature.color} ${feature.bg} text-center group transition-all duration-300`}
              >
                <div className="inline-flex w-16 h-16 rounded-2xl bg-white/5 items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black mb-4">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ais140;
