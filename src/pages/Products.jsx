import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Navigation, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', title: 'All Devices' },
    { id: 'government', title: 'Govt. Approved' },
    { id: 'teltonika', title: 'Teltonika' },
    { id: 'basic', title: 'Basic GPS' }
  ];

  const productData = [
    {
      id: 1,
      title: 'AIS 140 Certified',
      category: 'government',
      description: 'Used in buses, taxis, school vehicles with panic button and dual-server support.',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop',
      features: ['Panic Button', 'Dual Server', 'IP67 Waterproof'],
      icon: <ShieldCheck size={20} className="text-brand-orange" />
    },
    {
      id: 2,
      title: 'Teltonika FMB920',
      category: 'teltonika',
      description: 'Advanced GPS trackers with high accuracy and fuel monitoring for total fleet control.',
      image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=2070&auto=format&fit=crop',
      features: ['Fuel Monitoring', 'Bluetooth', 'Internal Battery'],
      icon: <Zap size={20} className="text-brand-blue" />
    },
    {
      id: 3,
      title: 'Smart Basic GPS',
      category: 'basic',
      description: 'Low cost and simple tracking for cars and bikes. Perfect for individual users.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
      features: ['Ignition Alert', 'History Reply', 'Vibration Alarm'],
      icon: <Navigation size={20} className="text-brand-green" />
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? productData 
    : productData.filter(p => p.category === activeCategory);

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 overflow-hidden">
      <Navbar />
      
      {/* Page Header */}
      <section className="py-20 relative text-center">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6"
          >
            Our <span className="text-gradient">Hardware</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Choose the right hardware for your tracking needs. From professional fleet management to basic car security.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="mb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all border ${
                  activeCategory === cat.id 
                    ? 'bg-brand-blue border-brand-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card group h-full flex flex-col border-brand-blue/10 hover:border-brand-blue/30 transition-all overflow-hidden"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0" 
                    />
                    <div className="absolute top-4 left-4 p-2 bg-slate-900/80 backdrop-blur rounded-lg border border-white/10">
                      {product.icon}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black mb-4 group-hover:text-brand-blue transition-colors">{product.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
                      {product.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      {product.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle size={14} className="text-brand-green" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                    <MagneticButton className="btn-secondary w-full flex items-center justify-center gap-2 py-4 group">
                      View Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
