import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, History, Award, Globe, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const values = [
    { title: "Precision", desc: "Highest accuracy in tracking and reporting.", icon: <TrendingUp size={24} className="text-brand-blue" /> },
    { title: "Security", desc: "Data protection and secure transmission protocols.", icon: <ShieldCheck size={24} className="text-brand-green" /> },
    { title: "Reliability", desc: "99.9% server uptime and constant support.", icon: <History size={24} className="text-brand-cyan" /> },
    { title: "Global Reach", desc: "Serving clients across various industries.", icon: <Globe size={24} className="text-brand-orange" /> }
  ];

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 relative text-center">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black mb-8 italic text-white/10 select-none absolute top-10 left-1/2 -translate-x-1/2"
          >
            COSMICA
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 relative z-10"
          >
            About <span className="text-brand-blue">Cosmica</span>
          </motion.h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed mb-16 relative z-10">
            A leader in GPS Telematics Solutions since our inception. We specialize in providing highly available, 
            secure GPS tracking cloud servers and a comprehensive suite of telematics hardware.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-12 border-brand-blue/30 bg-brand-blue/5 overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={120} />
              </div>
              <h3 className="text-3xl font-black mb-6">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed text-lg mb-8">
                To simplify connectivity and tracking for every vehicle owner and fleet manager. 
                Our mission is to provide technology that ensures safety, efficiency, and real-time awareness.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-12 border-brand-green/30 bg-brand-green/5 overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award size={120} />
              </div>
              <h3 className="text-3xl font-black mb-6">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed text-lg mb-8">
                To be the global benchmark for telematics solutions, setting the standard for precision, 
                data security, and user-friendly fleet management software.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-900/40 py-20 border-y border-slate-800 mb-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Core Values</h2>
            <p className="text-slate-400">The pillars of our success and growth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{v.title}</h4>
                <p className="text-slate-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
