import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Calendar, Download, Filter, TrendingUp, AlertCircle, Fuel, Clock, MapPin, ChevronRight, Activity, LayoutDashboard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fuelData = [
  { name: 'Mon', fuel: 400, efficiency: 85 },
  { name: 'Tue', fuel: 300, efficiency: 92 },
  { name: 'Wed', fuel: 500, efficiency: 78 },
  { name: 'Thu', fuel: 200, efficiency: 95 },
  { name: 'Fri', fuel: 350, efficiency: 88 },
  { name: 'Sat', fuel: 450, efficiency: 82 },
  { name: 'Sun', fuel: 320, efficiency: 90 },
];

const violationData = [
  { name: 'Truck A', speeding: 12, braking: 4 },
  { name: 'Truck B', speeding: 7, braking: 8 },
  { name: 'Van C', speeding: 15, braking: 2 },
  { name: 'Bus D', speeding: 5, braking: 12 },
  { name: 'Truck E', speeding: 9, braking: 6 },
];

const statusData = [
  { name: 'Moving', value: 45, color: '#3b82f6' },
  { name: 'Idle', value: 25, color: '#f59e0b' },
  { name: 'Stopped', value: 20, color: '#ef4444' },
  { name: 'Off', value: 10, color: '#64748b' },
];

const tripHistory = [
  { id: 1, route: 'Mumbai - Pune', time: '08:30 AM', duration: '3h 15m', status: 'Completed', distance: '145 km', fuel: '12L' },
  { id: 2, route: 'Pune - Kolhapur', time: '01:45 PM', duration: '4h 20m', status: 'In Transit', distance: '230 km', fuel: '18L' },
  { id: 3, route: 'Nagpur - Mumbai', time: 'Yesterday', duration: '12h 00m', status: 'Completed', distance: '820 km', fuel: '65L' },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 pb-12 selection:bg-brand-blue/30 overflow-x-hidden">
      <Navbar />
      
      {/* Premium Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="p-2.5 bg-brand-blue/10 rounded-xl border border-brand-blue/20">
                <TrendingUp size={24} className="text-brand-blue" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">Quantum Analytics</span>
            </motion.div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-2 italic uppercase flex items-center gap-3">
              Metrics 
              <span className="text-2xl font-black tracking-[0.3em] text-brand-blue px-4 py-1.5 border-y-2 border-brand-blue/50 bg-brand-blue/5 rounded-sm not-italic align-middle h-fit relative top-[-2px]">
                Vault
              </span>
            </h1>
            <p className="text-slate-400 font-medium max-w-xl">Deep-dive into fleet performance, fuel optimization, and violation intelligence with high-fidelity visual data.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 backdrop-blur-xl border border-white/5 px-5 py-3 rounded-2xl transition-all group active:scale-95">
              <Calendar size={18} className="text-brand-blue group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-slate-300">Last 7 Days</span>
            </button>
            <button className="flex items-center gap-2 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/30 px-5 py-3 rounded-2xl transition-all group active:scale-95">
              <Download size={18} className="text-brand-blue" />
              <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">Export</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 p-1.5 bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-2xl w-fit mb-10 overflow-x-auto no-scrollbar max-w-full">
          {['overview', 'fuel', 'violations', 'trips'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Areas */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="lg:col-span-3 glass-card p-24 rounded-[48px] flex flex-col items-center justify-center text-center border border-white/5 relative overflow-hidden min-h-[500px]"
            >
              <div className="absolute inset-0 bg-brand-blue/5 blur-[120px] pointer-events-none" />
              
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-brand-blue/30 blur-3xl rounded-full animate-pulse" />
                <div className="w-28 h-28 bg-slate-950 rounded-[32px] border border-brand-blue/20 flex items-center justify-center relative shadow-2xl overflow-hidden">
                  <Activity size={56} className="text-brand-blue" />
                  <motion.div 
                    animate={{ y: [-100, 100] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-1 bg-brand-blue/50 blur-sm"
                  />
                </div>
              </div>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic drop-shadow-2xl">
                Neural Core <span className="text-brand-blue drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">Syncing</span>
              </h2>
              
              <p className="text-slate-400 max-w-sm font-medium leading-relaxed mb-16 opacity-80">
                Establishing quantum link for <span className="text-brand-blue font-black">{activeTab.toUpperCase()}</span> matrix.
              </p>
              
              <div className="w-full max-w-xl">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5 shadow-inner p-px">
                  <motion.div 
                    initial={{ x: "-100%", width: "20%" }}
                    animate={{ x: "400%", width: ["20%", "40%", "20%"] }} 
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute h-full bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_25px_rgba(59,130,246,0.8)]" 
                  />
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-brand-blue/20"
                  />
                </div>
              </div>
              
              <div className="mt-10 text-[9px] font-black uppercase tracking-[0.5em] text-slate-600 animate-pulse">Establishing Secondary Tunnel...</div>
            </motion.div>
          ) : (
            <motion.div 
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {activeTab === 'overview' ? (
                <>
                  {/* Chart 1: Fuel Trend */}
                  <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-8 rounded-[32px] overflow-hidden group">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Fuel size={14} className="text-brand-orange" />
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Fuel Optimization</h3>
                        </div>
                        <p className="text-2xl font-black text-premium-gradient">Efficiency Trend</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-brand-green tracking-tighter shadow-brand-green/20">+14.2%</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Efficiency Apex</p>
                      </div>
                    </div>
                    
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={fuelData}>
                          <defs>
                            <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                          <Tooltip 
                            contentStyle={{backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase'}}
                          />
                          <Area type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorFuel)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Chart 2: Status Distribution */}
                  <motion.div variants={itemVariants} className="glass-card p-8 rounded-[32px] flex flex-col items-center justify-between min-h-[400px]">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 self-start">Active Distribution</h3>
                    <div className="h-[250px] w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={95}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase'}}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-black">94%</span>
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Uptime</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mt-4">
                      {statusData.map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{backgroundColor: s.color}} />
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-300">{s.name}</span>
                            <span className="text-[10px] font-bold text-slate-500">{s.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Chart 3: Violation Analysis */}
                  <motion.div variants={itemVariants} className="lg:col-span-3 glass-card p-8 rounded-[32px] overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle size={14} className="text-brand-orange" />
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Safety Intelligence</h3>
                        </div>
                        <p className="text-2xl font-black tracking-tight">Violation Scoreboard <span className="text-brand-blue">/ Monthly</span></p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-xl border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-brand-blue" />
                          <span className="text-[10px] font-black uppercase text-slate-400">Speeding</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-xl border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-brand-orange" />
                          <span className="text-[10px] font-black uppercase text-slate-400">Harsh Braking</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={violationData} barGap={12}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                          <Tooltip 
                            cursor={{fill: '#ffffff03'}}
                            contentStyle={{backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px', fontSize: '10px', fontWeight: '900'}}
                          />
                          <Bar dataKey="speeding" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
                          <Bar dataKey="braking" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={32} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </>
              ) : activeTab === 'fuel' ? (
                <div className="lg:col-span-3 space-y-8">
                  <motion.div variants={itemVariants} className="glass-card p-10 rounded-[40px] overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                      <Fuel size={120} />
                    </div>
                    <h3 className="text-3xl font-black italic uppercase mb-8">Fuel Efficiency <span className="text-brand-orange">Matrix</span></h3>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={fuelData}>
                           <defs>
                            <linearGradient id="colorFuelDetail" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                          <Tooltip cursor={{stroke: '#f59e0b', strokeWidth: 1}} />
                          <Area type="monotone" dataKey="fuel" stroke="#f59e0b" strokeWidth={4} fill="url(#colorFuelDetail)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    <div className="glass-card p-8 rounded-[32px]">
                      <p className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-2">Total Consumption</p>
                      <h4 className="text-4xl font-black text-white italic">2,482L</h4>
                    </div>
                    <div className="glass-card p-8 rounded-[32px]">
                      <p className="text-[10px] font-black tracking-widest uppercase text-slate-500 mb-2">Efficiency Gain</p>
                      <h4 className="text-4xl font-black text-brand-green italic">+8.4%</h4>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'violations' ? (
                <div className="lg:col-span-3 space-y-8">
                  <motion.div variants={itemVariants} className="glass-card p-10 rounded-[40px]">
                    <h3 className="text-3xl font-black italic uppercase mb-8">Violation <span className="text-brand-blue">Leaderboard</span></h3>
                    <div className="space-y-4">
                      {violationData.map((v, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl hover:border-brand-blue/30 transition-all">
                          <div className="flex items-center gap-6">
                            <span className="text-xl font-black text-slate-600">#{i+1}</span>
                            <div>
                              <p className="text-lg font-black uppercase">{v.name}</p>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fleet Unit IX-{800+i}</p>
                            </div>
                          </div>
                          <div className="flex gap-10">
                            <div className="text-right">
                              <p className="text-[10px] font-black text-brand-blue uppercase mb-1">Speeding</p>
                              <p className="text-xl font-black">{v.speeding}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-brand-orange uppercase mb-1">Harsh Braking</p>
                              <p className="text-xl font-black">{v.braking}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="lg:col-span-3 space-y-8">
                  <div className="flex items-center justify-between px-4">
                    <h3 className="text-3xl font-black italic uppercase">Trip <span className="text-transparent border-t border-b border-white/20">Archive</span></h3>
                    <button className="bg-brand-blue/10 border border-brand-blue/30 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-blue">Live Feed</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tripHistory.map((trip, idx) => (
                      <motion.div 
                        key={idx} 
                        variants={itemVariants}
                        whileHover={{ y: -8 }}
                        className="glass-card p-8 rounded-[32px] hover:border-brand-blue/30 cursor-pointer transition-all group relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="p-3 bg-slate-900 rounded-2xl group-hover:bg-brand-blue/20 transition-colors">
                            <MapPin size={18} className="text-brand-blue" />
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                            trip.status === 'Completed' ? 'bg-brand-green/5 border-brand-green/20 text-brand-green' : 'bg-brand-orange/5 border-brand-orange/20 text-brand-orange animate-pulse'
                          }`}>
                            {trip.status}
                          </div>
                        </div>
                        <p className="text-xl font-black mb-2 tracking-tight uppercase italic">{trip.route}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 font-bold uppercase mb-8">
                          <span>{trip.time}</span>
                          <span>•</span>
                          <span>{trip.distance}</span>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                           <div className="flex items-center gap-2">
                             <Fuel size={12} className="text-brand-orange" />
                             <span className="text-[10px] font-black">{trip.fuel}</span>
                           </div>
                           <ChevronRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              {/* Detailed Trip Feed (Always show at bottom if on overview) */}
              {activeTab === 'overview' && (
                <motion.div variants={itemVariants} className="lg:col-span-3">
                  <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-brand-blue rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-blue">Telemetry Trip History</h3>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                      View All Logs <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tripHistory.map((trip, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -8 }}
                        className="glass-card p-7 rounded-[32px] hover:border-brand-blue/30 cursor-pointer transition-all group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Activity size={80} className="text-brand-blue" />
                        </div>
                        
                        <div className="flex items-center justify-between mb-6 relative z-10">
                          <div className="p-3 bg-slate-900/80 rounded-2xl group-hover:bg-brand-blue/20 transition-colors">
                            <MapPin size={18} className="text-brand-blue" />
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                            trip.status === 'Completed' 
                            ? 'bg-brand-green/5 border-brand-green/20 text-brand-green' 
                            : 'bg-brand-orange/5 border-brand-orange/20 text-brand-orange animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                          }`}>
                            {trip.status}
                          </div>
                        </div>

                        <p className="text-xl font-black mb-2 tracking-tight leading-tight relative z-10">{trip.route}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 font-bold uppercase mb-8 relative z-10">
                          <span className="flex items-center gap-1.5"><Clock size={14} /> {trip.time}</span>
                          <span className="w-1 h-1 bg-slate-700 rounded-full" />
                          <span>{trip.distance}</span>
                          <span className="w-1 h-1 bg-slate-700 rounded-full" />
                          <span className="flex items-center gap-1.5 text-brand-orange/80"><Fuel size={14} /> {trip.fuel}</span>
                        </div>
                        
                        <div className="space-y-3 relative z-10">
                          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                            <span>Route Security</span>
                            <span className="text-brand-blue">Quantum Check</span>
                          </div>
                          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 p-0.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: trip.status === 'Completed' ? '100%' : '65%' }}
                              className={`h-full rounded-full ${trip.status === 'Completed' ? 'bg-brand-green' : 'bg-brand-orange shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reports;
