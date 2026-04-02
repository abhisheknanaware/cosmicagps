import React, { useState, useMemo, memo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation, Activity, History, PlayCircle, Shield, 
  Search, Filter, Layers, Bell, Zap, BarChart3, AlertTriangle,
  ZapOff, Cpu, Info, ArrowUpRight, Signal
} from 'lucide-react';

// Memoized Stat Card for better performance
const StatCard = memo(({ label, value, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-4 flex items-center gap-4 group"
  >
    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{label}</p>
      <p className="text-xl font-black">{value}</p>
    </div>
  </motion.div>
));

// Memoized Vehicle Card
const VehicleCard = memo(({ vehicle, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
      isSelected 
        ? 'bg-brand-blue/10 border-brand-blue/30' 
        : 'bg-white/5 border-white/5 hover:bg-white/10'
    }`}
    style={{ transform: 'translateZ(0)' }} // Hint for GPU acceleration
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          vehicle.status === 'moving' ? 'bg-brand-green/20 text-brand-green' : 'bg-slate-800 text-slate-400'
        }`}>
          <Navigation size={16} className={vehicle.status === 'moving' ? 'animate-pulse' : ''} />
        </div>
        <div>
          <p className="font-black text-sm group-hover:text-brand-blue transition-colors">{vehicle.id}</p>
          <p className="text-[10px] text-slate-500 font-medium">{vehicle.type} • {vehicle.driver}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
          vehicle.status === 'moving' ? 'bg-brand-green/20 text-brand-green' : 'bg-slate-800 text-slate-400'
        }`}>
          {vehicle.status}
        </span>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-black/20 p-2 rounded-lg border border-white/5">
        <p className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">Speed</p>
        <p className="text-xs font-bold text-brand-blue">{vehicle.speed}</p>
      </div>
      <div className="bg-black/20 p-2 rounded-lg border border-white/5 group">
        <p className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">Fuel</p>
        <div className="flex items-center gap-1.5">
          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-brand-orange" style={{ width: vehicle.fuel }}></div>
          </div>
          <span className="text-[9px] font-bold">{vehicle.fuel}</span>
        </div>
      </div>
      <div className="bg-black/20 p-2 rounded-lg border border-white/5">
        <p className="text-[8px] text-slate-500 uppercase font-bold mb-0.5">Batt</p>
        <p className="text-xs font-bold text-brand-green">{vehicle.battery}</p>
      </div>
    </div>

    {isSelected && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-3 pt-3 border-t border-white/5 flex gap-2"
      >
        <button className="flex-1 py-1.5 bg-brand-blue rounded-lg text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
          Trace Path
        </button>
        <button className="flex-1 py-1.5 bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5">
          Immobilize
        </button>
      </motion.div>
    )}
  </div>
));

const MapBackground = memo(({ style }) => (
  <div className="absolute inset-0 bg-[#010409] select-none pointer-events-none">
    {/* Coordinate System Grid */}
    <div 
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #1e293b 1px, transparent 1px),
          linear-gradient(to bottom, #1e293b 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }}
    />

    {/* Digital Map Components */}
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 800">
      <defs>
        <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="#1e293b" />
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#dotPattern)" />

      {/* Futuristic Sector Boundaries */}
      <g stroke="#1e293b" strokeWidth="0.5" fill="none">
        <path d="M 0 400 L 1000 400" strokeDasharray="10 20" />
        <path d="M 500 0 L 500 800" strokeDasharray="10 20" />
        <circle cx="500" cy="400" r="200" strokeDasharray="5 15" />
        <circle cx="500" cy="400" r="400" strokeDasharray="5 15" />
      </g>

      {/* Faux Terrain / Topographic Lines */}
      <g stroke="#0ea5e9" strokeWidth="0.3" fill="none" opacity="0.4">
        <path d="M 50 150 Q 150 100 250 150 T 450 150" />
        <path d="M 60 170 Q 160 120 260 170 T 460 170" />
        <path d="M 750 600 Q 850 550 950 600 T 1150 600" />
      </g>

      {/* Strategic POIs (Points of Interest) */}
      <g className="text-[10px] font-black fill-slate-700 uppercase tracking-widest leading-none">
        <text x="120" y="100">Sector 09</text>
        <text x="850" y="150">North Port Hub</text>
        <text x="150" y="720">Main Warehouse</text>
        <text x="800" y="700">Central HQ</text>
      </g>

      {/* Decorative communication rays */}
      <line x1="500" y1="400" x2="1000" y2="0" stroke="#0ea5e9" strokeWidth="0.2" opacity="0.3" />
      <line x1="500" y1="400" x2="0" y2="800" stroke="#0ea5e9" strokeWidth="0.2" opacity="0.3" />
    </svg>

    {/* Center Map Vibe */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.03)_0%,transparent_60%)]" />
  </div>
));

// Memoized Vehicle List to prevent sidebar jitter
const VehicleList = memo(({ vehicles, selectedVehicle, onVehicleSelect }) => (
  <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar gpu-accel">
    {vehicles.map((v) => (
      <VehicleCard 
        key={v.id} 
        vehicle={v} 
        isSelected={selectedVehicle === v.id} 
        onClick={() => onVehicleSelect(v.id)} 
      />
    ))}
  </div>
));

// Extracted Map Component for complete isolation
const MapLayer = memo(({ style, selectedVehicle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathData = "M 100 500 Q 250 350 400 500 T 700 500 Q 850 650 950 450"; // More natural "S" curve
  
  return (
    <div className="flex-1 relative bg-[#010409] overflow-hidden gpu-accel shadow-inner">
      <MapBackground style={style} />

      <svg 
        viewBox="0 0 1000 800"
        className="absolute inset-0 w-full h-full pointer-events-none" 
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background Trace */}
        <path 
          d={pathData} 
          fill="none" 
          stroke="white" 
          strokeWidth="1" 
          strokeOpacity="0.1" 
        />
        
        {/* Enhanced Route Trail (Neon Glow Effect) */}
        {/* Layer 1: Deep Glow */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          d={pathData} 
          fill="none" 
          stroke="#22d3ee" 
          strokeWidth="8" 
          strokeLinecap="round"
          className="opacity-10"
          filter="url(#glow)"
        />
        {/* Layer 2: Core Path */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          d={pathData} 
          fill="none" 
          stroke="url(#pathGradient)" 
          strokeWidth="3.5" 
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
        />

        {/* Directional Arrow Markers along the path */}
        {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
          <motion.path
            key={i}
            d="M -4 -4 L 4 0 L -4 4"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            style={{ 
              offsetPath: `path('${pathData}')`,
              offsetRotate: "auto",
              offsetAnchor: "center",
            }}
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{ 
              offsetDistance: [`${pos * 100 - 5}%`, `${pos * 100 + 5}%`],
              opacity: [0, 0.8, 0] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          />
        ))}

        {/* Waypoints */}
        <circle cx="100" cy="500" r="5" fill="#0ea5e9" className="animate-pulse shadow-lg" />
        <circle cx="950" cy="450" r="5" fill="#22d3ee" className="animate-pulse shadow-lg" />
      </svg>

      {/* 1. The Vehicle Icon (Enhanced Visibility & Direction) */}
      <motion.div 
        style={{ 
          offsetPath: `path('${pathData}')`,
          offsetRotate: "auto -45deg",
          offsetAnchor: "center",
          willChange: 'offset-distance, transform'
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute z-40" 
      >
        <div 
          className="relative group cursor-pointer w-14 h-14 flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Headlight/Directional Ray Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-20 h-32 bg-gradient-to-r from-brand-blue/40 to-transparent -rotate-90 origin-left blur-xl pointer-events-none" />
          
          {/* Enhanced Vehicle Shell */}
          <div className="absolute inset-0 bg-brand-blue/20 rounded-2xl animate-pulse blur-sm" />
          
          <div className="relative w-12 h-12 bg-white rounded-xl shadow-[0_0_40px_rgba(14,165,233,0.6)] border-2 border-brand-blue flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <Navigation className="text-brand-blue fill-brand-blue" size={24} />
            
            {/* Direct Direction Pointer */}
            <div className="absolute -top-1 w-2 h-2 bg-brand-blue rounded-full" />
          </div>

          {/* Radar Waves */}
          <div className="absolute inset-0 border-2 border-brand-blue rounded-2xl animate-radar-slow opacity-0 group-hover:opacity-100" />
        </div>
      </motion.div>

      {/* 2. The Upright Labels & Tooltips (Stay Horizontal) */}
      <motion.div 
        style={{ 
          offsetPath: `path('${pathData}')`,
          offsetRotate: "0deg", // FORCES TEXT TO STAY HORIZONTAL
          offsetAnchor: "center",
          willChange: 'offset-distance'
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute z-50 pointer-events-none"
      >
          {/* Constant ID Label (Upright & Never Wrapping) */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center group/label pointer-events-auto">
            {/* The ID Pill */}
            <div className="px-3 py-1 bg-brand-blue border-2 border-white/50 rounded-full shadow-[0_0_25px_rgba(14,165,233,0.6)] whitespace-nowrap gpu-accel">
              <span className="text-[11px] font-black uppercase tracking-widest text-white">
                {selectedVehicle || 'MH-12-RS-4521'}
              </span>
            </div>
            
            {/* Small Pointer Triangle */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-blue -mt-[1px]" />
          </div>

          {/* Detailed Info (Visible on icon hover) */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 p-4 bg-slate-900/98 backdrop-blur-xl border-t-2 border-brand-green rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 min-w-[180px] ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-brand-green font-black uppercase tracking-[0.2em]">LIVE TRACKING</span>
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">VEHICLE ID</p>
                <p className="text-sm font-black text-white">{selectedVehicle || 'MH-12-RS-4521'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">SPEED</p>
                  <p className="text-xs font-black text-brand-green">48.5 KM/H</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">DRIVER</p>
                  <p className="text-xs font-black text-white">ARJUN K.</p>
                </div>
              </div>
            </div>
          </div>
      </motion.div>
    </div>
  );
});

const LiveTracking = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('MH-12-RS-4521');
  const [mapStyle, setMapStyle] = useState('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('fleet');

  const vehicles = useMemo(() => [
    { id: 'MH-12-RS-4521', status: 'moving', speed: '48.5 km/h', fuel: '75%', battery: '86%', type: 'Truck', driver: 'Arjun K.' },
    { id: 'MH-14-BT-9821', status: 'parked', speed: '0 km/h', fuel: '42%', battery: '92%', type: 'Container', driver: 'Sanjay M.' },
    { id: 'KA-01-XP-4412', status: 'idle', speed: '0 km/h', fuel: '88%', battery: '45%', type: 'Pickup', driver: 'Rahul S.' },
  ], []);

  const filteredVehicles = useMemo(() => 
    vehicles.filter(v => v.id.toLowerCase().includes(searchQuery.toLowerCase())),
  [vehicles, searchQuery]);

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 overflow-hidden selection:bg-brand-blue/30">
      <Navbar />
      
      {/* Optimized Background Noise */}
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Header Metrics */}
      <section className="container mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Active Fleet" value="428" icon={Navigation} color="text-brand-blue" delay={0.1} />
          <StatCard label="Live Signal" value="99.8%" icon={Signal} color="text-brand-green" delay={0.2} />
          <StatCard label="Active Alerts" value="03" icon={AlertTriangle} color="text-brand-orange" delay={0.3} />
          <StatCard label="Total Distance" value="12.4k" icon={Activity} color="text-brand-cyan" delay={0.4} />
        </div>
      </section>

      {/* Main Content Interface */}
      <section className="container mx-auto px-6 relative z-20 mb-20">
        <div className="glass-card-performance flex flex-col lg:flex-row h-[800px] border-brand-blue/10 bg-slate-900/95 gpu-accel">
          
          <div className="flex flex-col lg:flex-row h-full w-full">
            {/* Sidebar */}
            <div className="w-full lg:w-96 bg-slate-950/40 border-r border-white/5 flex flex-col overflow-hidden">
              <div className="p-6 border-b border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-tighter text-brand-blue">Command Center</h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white relative">
                      <Bell size={18} />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full border-2 border-slate-950"></span>
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white">
                      <Layers size={18} />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search vehicle..." 
                    className="w-full bg-slate-900 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-blue/30 transition-all shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex p-1 bg-slate-900 rounded-xl border border-white/5">
                  {['fleet', 'alerts', 'history'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all transform active:scale-95 ${
                        activeTab === tab ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'fleet' ? (
                <VehicleList 
                  vehicles={filteredVehicles} 
                  selectedVehicle={selectedVehicle} 
                  onVehicleSelect={setSelectedVehicle} 
                />
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar gpu-accel">
                  {activeTab === 'alerts' && (
                    <div className="space-y-2">
                      {[1, 2].map(id => (
                        <div key={id} className="p-3 bg-brand-orange/5 border border-brand-orange/10 rounded-xl flex gap-3 items-center hover:bg-brand-orange/10 transition-colors cursor-pointer">
                          <AlertTriangle size={16} className="text-brand-orange" />
                          <span className="text-xs font-bold text-slate-300">Geo-fence Exit Detected</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="p-4 border-t border-white/5">
                <div className="bg-gradient-to-br from-brand-blue/10 to-transparent p-4 rounded-xl border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-black mb-1 tracking-widest">System Engine</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-green w-[98%] animate-pulse" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-green">Turbo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Area - Fully Isolated Component */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
              <MapLayer style={mapStyle} selectedVehicle={selectedVehicle} />

              {/* Overlays - placed outside MapLayer to avoid re-renders of the map when clicking buttons */}
              <div className="absolute top-6 left-6 flex gap-3 z-40">
                <div className="bg-slate-900/60 backdrop-blur-md p-2 px-3 rounded-xl border border-white/5 flex items-center gap-3 shadow-xl">
                  <Activity size={12} className="text-brand-cyan animate-pulse" />
                  <span className="text-[10px] font-medium text-slate-300">Real-time Stream: <span className="text-brand-green">Optimized</span></span>
                </div>
                
                <div className="flex bg-slate-900/60 backdrop-blur-md p-1 rounded-xl border border-white/5 shadow-xl">
                  {['dark', 'blueprint'].map((id) => (
                    <button key={id} onClick={() => setMapStyle(id)} className={`p-1.5 rounded-lg transition-all ${mapStyle === id ? 'bg-brand-blue shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                      {id === 'dark' ? <Layers size={14} /> : <Cpu size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-fit z-40">
                <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-2xl flex items-center gap-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  {[{ i: Shield, c: 'text-brand-orange' }, { i: History, c: 'text-brand-blue' }, { i: Activity, c: 'text-brand-cyan' }].map((item, i) => (
                    <button key={i} className="p-2 hover:bg-white/10 rounded-xl transition-all transform hover:scale-110 active:scale-95">
                      <item.i size={18} className={item.c} />
                    </button>
                  ))}
                  <div className="w-px h-6 bg-white/10" />
                  <button className="bg-brand-blue px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-blue/40 hover:brightness-110 transition-all transform active:scale-95">
                    Emergency
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LiveTracking;
