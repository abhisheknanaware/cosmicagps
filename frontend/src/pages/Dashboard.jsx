import React, { useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { 
  BarChart3, Activity, Shield, MapPin, 
  TrendingUp, AlertCircle, Clock, CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = useMemo(() => [
    { label: 'Total Fleet', value: '1,284', icon: Activity, color: 'text-blue-400', trend: '+12%' },
    { label: 'Active Now', value: '842', icon: CheckCircle2, color: 'text-emerald-400', trend: '98% Signal' },
    { label: 'Alerts', value: '03', icon: AlertCircle, color: 'text-orange-400', trend: 'High Priority' },
    { label: 'Total KM', value: '48.2k', icon: TrendingUp, color: 'text-purple-400', trend: '+5.4%' },
  ], []);

  const recentAlerts = [
    { id: 1, type: 'Speeding', vehicle: 'MH-12-RS-4521', time: '10 mins ago', severity: 'medium' },
    { id: 2, type: 'Geo-fence Exit', vehicle: 'KA-01-XP-4412', time: '25 mins ago', severity: 'high' },
    { id: 3, type: 'Low Fuel', vehicle: 'MH-14-BT-9821', time: '1 hour ago', severity: 'low' },
  ];

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 selection:bg-brand-blue/30">
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] -z-10 rounded-full" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] -z-10 rounded-full" />

      <main className="container mx-auto px-6 py-10 relative z-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-brand-cyan font-black uppercase tracking-[0.3em] text-[10px] mb-2"
            >
              Cosmica Command Center
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tighter"
            >
              Welcome, <span className="text-premium-gradient">{user?.name?.split(' ')[0] || 'Commander'}</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-md"
          >
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl">
              <CheckCircle2 size={20} />
            </div>
            <div className="pr-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">System Status</p>
              <p className="text-sm font-black text-slate-200 uppercase">Operational</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={80} />
              </div>
              
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              
              <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black mb-2">{stat.value}</h3>
              <p className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp size={12} /> {stat.trend}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Alerts List */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 glass-card p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black tracking-tight">Security Alerts</h3>
              <AlertCircle className="text-orange-400" size={20} />
            </div>
            
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                      alert.severity === 'high' ? 'bg-red-500/20 text-red-400' : 
                      alert.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' : 
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase">{alert.time}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-brand-cyan transition-colors">{alert.vehicle}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-4 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:border-white/10 transition-all">
              View All History
            </button>
          </motion.div>

          {/* Quick Actions & Live Feed Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card p-8 bg-gradient-to-br from-slate-900/40 to-transparent">
              <h3 className="text-xl font-black mb-6">Operations Center</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Live Track', icon: MapPin, color: 'bg-blue-500' },
                  { label: 'Fleet Info', icon: BarChart3, color: 'bg-purple-500' },
                  { label: 'Safe Lock', icon: Shield, color: 'bg-emerald-500' },
                  { label: 'Log Book', icon: Clock, color: 'bg-slate-700' },
                ].map((action) => (
                  <button key={action.label} className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all group">
                    <div className={`w-12 h-12 rounded-2xl ${action.color}/20 flex items-center justify-center text-${action.color.split('-')[1]}-400 group-hover:scale-110 transition-transform shadow-lg`}>
                      <action.icon size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-1 relative h-[300px] overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center brightness-[0.2] group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8">
                <p className="text-brand-cyan text-[10px] font-black uppercase tracking-widest mb-2">Live Map Interface</p>
                <h4 className="text-2xl font-black mb-4">Satellite Fleet Overview</h4>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-brand-blue rounded-xl text-[10px] font-black uppercase tracking-widest">Connect to Satellite</button>
                  <button className="px-6 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">Configure</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
