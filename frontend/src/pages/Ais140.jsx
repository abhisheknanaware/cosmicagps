import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, ShieldCheck, AlertCircle, Bell, Activity, 
  CheckCircle2, FileText, Calendar, Zap, Wifi, Signal, 
  MapPin, Clock, MoreHorizontal, ChevronRight, Siren
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sosAlerts = [
  { id: 1, vehicle: 'MH-12-QE-4567', type: 'Panic Button', time: '2 mins ago', location: 'Pune - Mumbai Exp', status: 'Active' },
  { id: 2, vehicle: 'MH-09-AF-2211', type: 'Harsh Impact', time: '15 mins ago', location: 'Hinjewadi Ph 3', status: 'Resolved' },
  { id: 3, vehicle: 'MH-14-GH-9800', type: 'VLT Disconnected', time: '1 hour ago', location: 'Lonavala', status: 'Investigating' },
];

const certificates = [
  { title: 'Fitness Certificate', expiry: '2026-08-15', vehicle: 'MH-12-QE-4567', daysLeft: 128 },
  { title: 'Permit (National)', expiry: '2026-05-10', vehicle: 'MH-14-GH-9800', daysLeft: 32 },
  { title: 'Insurance Policy', expiry: '2026-04-20', vehicle: 'MH-09-AF-2211', daysLeft: 12 },
  { title: 'PUC Certificate', expiry: '2026-12-30', vehicle: 'MH-12-XY-1010', daysLeft: 265 },
];

const Ais140 = () => {
  const [activeTab, setActiveTab] = useState('sos');
  const [isLive, setIsLive] = useState(true);

  // Simulated live pulse for the VLT network status
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => (p + 1) % 100), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 pb-12 selection:bg-brand-orange/30 overflow-x-hidden">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-brand-orange/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] left-0 w-120 h-120 bg-brand-blue/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Dashboard Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-widest mb-6 w-fit"
            >
              <ShieldAlert size={12} className="animate-pulse" />
              AIS-140 COMPLIANCE CENTER
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight italic uppercase tracking-tighter">Safety <span className="text-transparent border-t-2 border-b-2 border-brand-orange">Protocol</span></h1>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-lg">Central hub for Indian transport compliance. Monitor panic alerts, certificate lifecycles, and VLT data integrity in real-time.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-fit">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[32px] flex flex-col justify-between min-w-[200px]">
              <div className="flex justify-between items-start mb-4">
                <ShieldCheck size={28} className="text-brand-green" />
                <span className="bg-brand-green/10 text-brand-green text-[9px] font-black px-2 py-1 rounded">HEALTHY</span>
              </div>
              <div>
                <p className="text-3xl font-black">98.2%</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fleet Compliance</p>
              </div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[32px] flex flex-col justify-between min-w-[200px]">
              <div className="flex justify-between items-start mb-4">
                <Siren size={28} className="text-brand-orange animate-pulse" />
                <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-black px-2 py-1 rounded">ACTIVE</span>
              </div>
              <div>
                <p className="text-3xl font-black">12ms</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SOS Response time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'GPS LOCK', status: 'Optimal', icon: Zap, color: 'text-brand-cyan' },
            { label: 'VLT FEED', status: 'Live', icon: Activity, color: 'text-brand-green' },
            { label: 'NETWORK', status: '4G Quantum', icon: Signal, color: 'text-brand-blue' },
            { label: 'DATA BUS', status: 'Synchronized', icon: Wifi, color: 'text-teal-400' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-950/40 backdrop-blur-xl border border-white/5 p-5 rounded-3xl flex items-center gap-4 hover:border-white/10 transition-all cursor-pointer group"
            >
              <div className={`p-3 bg-slate-900 rounded-2xl group-hover:scale-110 transition-transform ${item.color}`}>
                <item.icon size={20} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{item.label}</span>
                <p className="text-sm font-bold text-white uppercase">{item.status}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Monitor Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Monitor (2/3 width) */}
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-slate-950/40 backdrop-blur-xl border border-white/5 p-8 rounded-[40px] relative overflow-hidden">
              {/* Animated HUD element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[80px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                <div className="flex gap-2 p-1 bg-slate-900/50 rounded-2xl border border-white/5">
                  <button 
                    onClick={() => setActiveTab('sos')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'sos' ? 'bg-brand-orange text-white' : 'text-slate-500 hover:text-white'}`}
                  >
                    SOS Feed
                  </button>
                  <button 
                    onClick={() => setActiveTab('health')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'health' ? 'bg-brand-blue text-white' : 'text-slate-500 hover:text-white'}`}
                  >
                    VLT Health
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-brand-green shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'} animate-pulse`} />
                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Stream Status: Live</span>
                  </div>
                  <button className="p-2 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><MoreHorizontal size={16} /></button>
                </div>
              </div>

              <div className="space-y-4 relative z-10 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                <AnimatePresence mode="popLayout">
                  {activeTab === 'sos' ? (
                    sosAlerts.map((alert) => (
                      <motion.div 
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`group p-6 rounded-[32px] border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                          alert.status === 'Active' ? 'bg-brand-orange/10 border-brand-orange/30' : 'bg-white/2 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div className={`p-4 rounded-2xl ${alert.status === 'Active' ? 'bg-brand-orange text-white' : 'bg-slate-900 text-slate-500'}`}>
                            <AlertCircle size={24} className={alert.status === 'Active' ? 'animate-bounce' : ''} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-black text-white">{alert.vehicle}</h3>
                              <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                                alert.status === 'Active' ? 'bg-brand-orange text-white' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {alert.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                              <span className="text-brand-orange">{alert.type}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1"><MapPin size={10} /> {alert.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs font-black text-slate-400">{alert.time}</p>
                            <p className="text-[9px] font-black uppercase text-brand-orange">Priority Peak</p>
                          </div>
                          <button className={`p-3 rounded-2xl transition-all ${
                            alert.status === 'Active' ? 'bg-brand-orange text-white hover:brightness-110 shadow-lg shadow-brand-orange/20' : 'bg-white/5 text-slate-500 hover:text-white'
                          }`}>
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                      <Activity size={48} className="text-brand-blue mb-4 animate-pulse" />
                      <p className="text-xl font-black italic uppercase">Advanced Diagnostics</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em]">Mapping telemetry nodes...</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Certificate Timeline Section */}
            <div>
              <div className="flex items-center justify-between mb-8 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-brand-orange rounded-full" />
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-orange">Certificate Lifecycles</h3>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                  Compliance Archive <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 rounded-[32px] border-white/5 hover:border-brand-orange/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-slate-900 rounded-2xl text-brand-orange group-hover:bg-brand-orange/20 transition-all">
                        <FileText size={20} />
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-black ${cert.daysLeft < 30 ? 'text-brand-orange' : 'text-white'}`}>{cert.daysLeft}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Days Remaining</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-lg font-black italic uppercase leading-none mb-1">{cert.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>{cert.vehicle}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {cert.expiry}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div 
                        className={`h-full rounded-full ${cert.daysLeft < 30 ? 'bg-brand-orange shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-brand-blue'}`}
                        style={{ width: `${Math.min(100, (cert.daysLeft / 365) * 100)}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Info Cards (1/3 width) */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[40px] border-brand-blue/20 bg-brand-blue/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <Activity size={40} className="text-brand-blue/20" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-blue mb-8">VLT Live Diagnostics</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Transmission Saturation', val: '14%', icon: Activity },
                  { label: 'Latency Node Delta', val: '0.04ms', icon: Clock },
                  { label: 'Active SOS Terminals', val: '1,242', icon: Siren },
                  { label: 'Compliance Index', val: 'AAA+', icon: ShieldCheck },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-500">
                      <span className="flex items-center gap-2"><stat.icon size={12} className="text-brand-blue" /> {stat.label}</span>
                      <span className="text-white">{stat.val}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${60 - (i * 10)}%` }}
                        className="h-full bg-brand-blue/40"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 bg-brand-blue/10 border border-brand-blue/30 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-blue hover:bg-brand-blue/20 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-brand-blue/10">
                Generate Safety Audit Report
              </button>
            </div>

            <div className="glass-card p-8 rounded-[40px] relative overflow-hidden group border-white/5">
              {/* Radar scanner animation background */}
              <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-radial-gradient(circle,transparent,transparent_40px,#3b82f6_41px,#3b82f6_42px,transparent_43px)] opacity-20" />
                <motion.div 
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 border-[20px] border-brand-blue rounded-full"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-brand-blue/20 rounded-2xl border border-brand-blue/30">
                    <Signal size={24} className="text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue mb-1">Signal Perimeter</h3>
                    <p className="text-lg font-black leading-none">Quantum Lock</p>
                  </div>
                </div>

                <div className="aspect-square bg-slate-950/80 rounded-[32px] border border-white/10 relative overflow-hidden flex items-center justify-center shadow-inner group-hover:border-brand-blue/50 transition-colors">
                  <div className="text-center space-y-4">
                    <Activity size={32} className="text-brand-blue mx-auto animate-pulse" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Scanning Nodes</p>
                      <p className="text-xl font-black">409.2 GB/s</p>
                    </div>
                  </div>
                  
                  {/* Decorative radar lines */}
                  <div className="absolute inset-0 border border-dashed border-white/5 rounded-full scale-75 m-8" />
                  <div className="absolute inset-x-0 h-px bg-white/5 top-1/2" />
                  <div className="absolute inset-y-0 w-px bg-white/5 left-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Ais140;
