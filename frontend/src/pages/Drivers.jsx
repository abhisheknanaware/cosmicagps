import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Award, ShieldCheck, AlertTriangle, TrendingUp, Search, 
  MapPin, Phone, MessageSquare, Star, ArrowUpRight, Filter, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const drivers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    status: 'On Duty',
    vehicle: 'MH-12-QE-4567',
    score: 98,
    trips: 142,
    incidents: 0,
    avatar: 'RK',
    rating: 4.9,
    trend: '+2.4%',
    efficiency: '94%'
  },
  {
    id: 2,
    name: 'Suresh Patil',
    status: 'Resting',
    vehicle: 'MH-09-AF-2211',
    score: 85,
    trips: 98,
    incidents: 2,
    avatar: 'SP',
    rating: 4.6,
    trend: '-1.1%',
    efficiency: '88%'
  },
  {
    id: 3,
    name: 'Amit Sharma',
    status: 'On Duty',
    vehicle: 'MH-14-GH-9800',
    score: 92,
    trips: 210,
    incidents: 1,
    avatar: 'AS',
    rating: 4.8,
    trend: '+0.5%',
    efficiency: '91%'
  },
  {
    id: 4,
    name: 'Deepak More',
    status: 'Emergency',
    vehicle: 'MH-12-XY-1010',
    score: 74,
    trips: 56,
    incidents: 5,
    avatar: 'DM',
    rating: 3.9,
    trend: '-4.2%',
    efficiency: '72%'
  }
];

const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 20 } }
  };

  const filteredDrivers = drivers.filter(d => 
    (activeFilter === 'all' || d.status.toLowerCase() === activeFilter.toLowerCase()) &&
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 pb-12 selection:bg-brand-blue/30 overflow-x-hidden">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-brand-blue/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-brand-orange/5 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Page Title & Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-3 bg-brand-blue/10 rounded-2xl border border-brand-blue/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <Users size={28} className="text-brand-blue" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue">Operational Intelligence</span>
            </motion.div>
            <h1 className="text-6xl font-black tracking-tight text-white mb-4 italic uppercase">Elite <span className="text-transparent border-t-2 border-b-2 border-brand-blue">Force</span> Portfolio</h1>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">Management and monitoring center for the Cosmica driving elite. Track safety scores, compliance, and real-time operational status.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Active', val: '124', icon: TrendingUp, color: 'text-brand-green' },
              { label: 'Avg Score', val: '92', icon: Award, color: 'text-brand-blue' },
              { label: 'Compliant', val: '98%', icon: ShieldCheck, color: 'text-brand-cyan' },
              { label: 'Alerts', val: '3', icon: AlertTriangle, color: 'text-brand-orange' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-[28px] flex flex-col items-center justify-center text-center shadow-xl hover:border-white/10 transition-all"
              >
                <stat.icon size={20} className={`${stat.color} mb-3`} />
                <span className="text-3xl font-black mb-1">{stat.val}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/5 p-4 rounded-[32px] flex flex-col md:flex-row items-center gap-4 mb-12 shadow-2xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-brand-blue" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, ID or vehicle..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all font-medium"
            />
          </div>
          
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
            {['all', 'on duty', 'resting', 'emergency'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeFilter === f 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <button className="bg-white/5 border border-white/5 p-4 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            <Filter size={20} />
          </button>
        </div>

        {/* Driver Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDrivers.map((driver) => (
              <motion.div
                key={driver.id}
                variants={cardVariants}
                layout
                className="glass-card group relative overflow-hidden flex flex-col md:flex-row gap-8 p-10 rounded-[40px] hover:border-brand-blue/30 transition-all"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -translate-y-1/2 translate-x-1/2 transition-opacity duration-700 opacity-20 ${
                  driver.status === 'Emergency' ? 'bg-red-500' : 'bg-brand-blue'
                }`} />

                {/* Left: Avatar & Rank */}
                <div className="flex flex-col items-center gap-6 md:w-48 shrink-0">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-[38px] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 flex items-center justify-center relative z-10 shadow-2xl overflow-hidden group-hover:border-brand-blue/50 transition-colors">
                      <span className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">{driver.avatar}</span>
                      
                      {/* Interaction Overlay */}
                      <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ArrowUpRight size={24} className="text-white" />
                      </div>
                    </div>
                    {/* Status Pip */}
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-4 border-brand-dark z-20 ${
                      driver.status === 'On Duty' ? 'bg-brand-green' : driver.status === 'Emergency' ? 'bg-red-500' : 'bg-brand-orange'
                    } ${driver.status === 'Emergency' && 'animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`} />
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={10} fill={i <= Math.floor(driver.rating) ? "#3b82f6" : "none"} className={i <= Math.floor(driver.rating) ? "text-brand-blue" : "text-slate-800"} />
                      ))}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Rating: <span className="text-slate-200">{driver.rating}</span></p>
                  </div>

                  <div className="flex gap-2 w-full">
                    <button className="flex-1 bg-slate-900/80 p-3 rounded-2xl hover:bg-brand-blue/20 transition-all flex items-center justify-center">
                      <Phone size={18} className="text-brand-blue" />
                    </button>
                    <button className="flex-1 bg-slate-900/80 p-3 rounded-2xl hover:bg-brand-blue/20 transition-all flex items-center justify-center">
                      <MessageSquare size={18} className="text-brand-blue" />
                    </button>
                  </div>
                </div>

                {/* Right: Info & Metrics */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-black tracking-tight group-hover:text-brand-blue transition-colors mb-1 uppercase italic">{driver.name}</h2>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <MapPin size={12} className="text-brand-cyan" />
                          <span>Active Vehicle: <span className="text-brand-cyan">{driver.vehicle}</span></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-black text-white leading-none">{driver.score}<span className="text-xs text-brand-blue ml-1 uppercase">pts</span></p>
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Safety Apex</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="bg-white/2 p-4 rounded-3xl border border-white/5 space-y-1">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Total Ops</span>
                        <p className="text-xl font-black">{driver.trips}</p>
                      </div>
                      <div className="bg-white/2 p-4 rounded-3xl border border-white/5 space-y-1">
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Efficiency</span>
                        <p className="text-xl font-black text-brand-green">{driver.efficiency}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className={`text-[10px] font-black tracking-[0.3em] uppercase ${driver.trend.includes('+') ? 'text-brand-green' : 'text-red-500'}`}>
                          Trend: {driver.trend}
                        </p>
                        <p className="text-[9px] font-medium text-slate-500 uppercase">Operational Performance Curve</p>
                      </div>
                      <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-blue group/btn">
                        Detailed Logs <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    <div className="h-2 w-full bg-slate-900/50 rounded-full border border-white/5 overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${driver.score}%` }}
                        className={`h-full rounded-full ${
                          driver.score > 90 ? 'bg-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 
                          driver.score > 80 ? 'bg-brand-green shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 
                          'bg-brand-orange shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Drivers;
