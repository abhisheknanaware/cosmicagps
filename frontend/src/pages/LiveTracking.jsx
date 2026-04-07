import React, { useState, useMemo, memo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation, Activity, History, PlayCircle, Shield, 
  Search, Filter, Layers, Bell, Zap, BarChart3, AlertTriangle,
  ZapOff, Cpu, Info, ArrowUpRight, Signal
} from 'lucide-react';
import toast from 'react-hot-toast';

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

const MapBackground = memo(({ style }) => {
  const isBlueprint = style === 'blueprint';
  
  return (
    <div className={`absolute inset-0 select-none pointer-events-none transition-colors duration-1000 ${
      isBlueprint ? 'bg-[#001220]' : 'bg-[#010409]'
    }`}>
      {/* Coordinate System Grid */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isBlueprint ? 'opacity-20' : 'opacity-[0.07]'}`}
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isBlueprint ? '#0ea5e9' : '#1e293b'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isBlueprint ? '#0ea5e9' : '#1e293b'} 1px, transparent 1px)
          `,
          backgroundSize: isBlueprint ? '40px 40px' : '80px 80px'
        }}
      />

      {/* Digital Map Components */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 800">
        <defs>
          <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill={isBlueprint ? "#0ea5e9" : "#1e293b"} />
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#dotPattern)" />

        {/* Futuristic Sector Boundaries */}
        <g stroke={isBlueprint ? "#0ea5e9" : "#1e293b"} strokeWidth={isBlueprint ? "0.8" : "0.5"} fill="none">
          <path d="M 0 400 L 1000 400" strokeDasharray="10 20" />
          <path d="M 500 0 L 500 800" strokeDasharray="10 20" />
          <circle cx="500" cy="400" r="200" strokeDasharray="5 15" />
          <circle cx="500" cy="400" r="400" strokeDasharray="5 15" />
        </g>

        {isBlueprint && (
          <g stroke="#22d3ee" strokeWidth="0.2" fill="none" opacity="0.3">
            {[...Array(20)].map((_, i) => (
              <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="800" />
            ))}
          </g>
        )}

        {/* Faux Terrain / Topographic Lines */}
        <g stroke={isBlueprint ? "#22d3ee" : "#0ea5e9"} strokeWidth="0.3" fill="none" opacity="0.4">
          <path d="M 50 150 Q 150 100 250 150 T 450 150" />
          <path d="M 60 170 Q 160 120 260 170 T 460 170" />
          <path d="M 750 600 Q 850 550 950 600 T 1150 600" />
        </g>

        {/* Strategic POIs */}
        <g className={`text-[10px] font-black uppercase tracking-widest leading-none ${isBlueprint ? 'fill-sky-400' : 'fill-slate-700'}`}>
          <text x="120" y="100">Sector 09</text>
          <text x="850" y="150">North Port Hub</text>
          <text x="150" y="720">Main Warehouse</text>
          <text x="800" y="700">Central HQ</text>
        </g>
      </svg>

      {/* Center Map Glow */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isBlueprint 
          ? 'bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.1)_0%,transparent_70%)]' 
          : 'bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.03)_0%,transparent_60%)]'
      }`} />
    </div>
  );
});

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
const MapLayer = memo(({ style, selectedVehicle, geofencePoints = [], onMapClick, isGeofenceMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathData = "M 100 500 Q 250 350 400 500 T 700 500 Q 850 650 950 450"; 
  
  return (
    <div className={`flex-1 relative bg-[#010409] overflow-hidden gpu-accel shadow-inner ${isGeofenceMode ? 'cursor-crosshair' : ''}`}>
      <MapBackground style={style} />

      <svg 
        viewBox="0 0 1000 800"
        className="absolute inset-0 w-full h-full pointer-events-auto" 
        style={{ shapeRendering: 'geometricPrecision' }}
        onClick={onMapClick}
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

        {/* Render Geofence Polygon */}
        {geofencePoints.length > 0 && (
          <g>
            <polygon 
              points={geofencePoints.map(p => `${p.x},${p.y}`).join(' ')} 
              fill="rgba(245, 158, 11, 0.1)" 
              stroke="#f59e0b" 
              strokeWidth="2"
              strokeDasharray="5 5"
              className="animate-pulse"
            />
            {geofencePoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#f59e0b" />
            ))}
          </g>
        )}
        
        <path 
          d={pathData} 
          fill="none" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeOpacity="0.05"
          strokeDasharray="4 8"
        />
        
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          d={pathData} 
          fill="none" 
          stroke="#0ea5e9" 
          strokeWidth="6" 
          strokeLinecap="round"
          className="opacity-5"
          filter="url(#glow)"
        />

        <motion.path 
          d={pathData}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0.1, pathOffset: 0 }}
          animate={{ pathOffset: [0, 0.9] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="drop-shadow-[0_0_12px_rgba(14,165,233,0.8)]"
        />

        {[0, 0.2, 0.4, 0.6, 0.8, 0.95].map((offset, i) => (
          <motion.circle
            key={`breadcrumb-${i}`}
            r="1.8"
            fill="#22d3ee"
            style={{ 
              offsetPath: `path('${pathData}')`,
              offsetRotate: "0deg",
            }}
            initial={{ offsetDistance: `${offset * 100}%`, opacity: 0 }}
            animate={{ 
              offsetDistance: [`${offset * 100}%`, `${(offset * 100 + 40) % 100}%`],
              opacity: [0, 0.8, 0],
              scale: [0.6, 1.4, 0.6]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Dynamic scanner pulses that move with path but radiate outwards */}
        {[0.3, 0.7].map((offset, i) => (
          <motion.circle
            key={`scanner-${i}`}
            r="20"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1"
            style={{ 
              offsetPath: `path('${pathData}')`,
            }}
            initial={{ offsetDistance: `${offset * 100}%`, opacity: 0, scale: 0.5 }}
            animate={{ 
              offsetDistance: [`${offset * 100}%`, `${(offset * 100 + 10) % 100}%`],
              opacity: [0, 0.4, 0],
              scale: [0.5, 2.5]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {[
          { x: 100, y: 500 },
          { x: 400, y: 500 },
          { x: 700, y: 500 },
          { x: 950, y: 450 }
        ].map((wp, i) => (
          <g key={`wp-${i}`}>
            <motion.circle 
              cx={wp.x} cy={wp.y} r="8" 
              fill="#0ea5e9" 
              className="opacity-10"
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <circle cx={wp.x} cy={wp.y} r="3" fill="#0ea5e9" />
          </g>
        ))}
      </svg>

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
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 w-24 h-36 bg-gradient-to-r from-brand-blue/60 via-brand-blue/20 to-transparent -rotate-90 origin-left blur-2xl pointer-events-none" 
          />
          
          <motion.div 
            animate={{ 
              rotateY: [-15, 15],
              z: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-brand-blue/30 rounded-2xl animate-pulse blur-md" 
          />
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="relative w-12 h-12 bg-white rounded-xl shadow-[0_0_50px_rgba(14,165,233,0.8)] border-2 border-brand-blue flex items-center justify-center transition-all duration-300"
          >
            <Navigation className="text-brand-blue fill-brand-blue" size={24} />
            <motion.div 
              animate={{ y: [-2, 0, -2] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-1 w-2.5 h-2.5 bg-brand-blue rounded-full border border-white" 
            />
          </motion.div>

          <div className="absolute inset-0 border-2 border-brand-blue rounded-2xl animate-radar-slow opacity-0 group-hover:opacity-100" />
        </div>
      </motion.div>

      <motion.div 
        style={{ 
          offsetPath: `path('${pathData}')`,
          offsetRotate: "0deg",
          offsetAnchor: "center"
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute z-50 pointer-events-none"
      >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center group/label pointer-events-auto">
            <div className="px-3 py-1 bg-brand-blue border-2 border-white/50 rounded-full shadow-[0_0_25px_rgba(14,165,233,0.6)] whitespace-nowrap">
              <span className="text-[11px] font-black uppercase tracking-widest text-white">
                {selectedVehicle || 'MH-12-RS-4521'}
              </span>
            </div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-blue -mt-[1px]" />
          </div>

          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 p-4 bg-slate-900/98 backdrop-blur-xl border-t-2 border-brand-green rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 min-w-[220px] ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[9px] text-brand-green font-black uppercase tracking-[0.2em]">Live Tracking</span>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-1 h-3 rounded-sm ${i <= 3 ? 'bg-brand-green' : 'bg-slate-700'}`} />
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Vehicle Identity</p>
                  <p className="text-sm font-black text-white">{selectedVehicle || 'MH-12-RS-4521'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Odometer</p>
                  <p className="text-[10px] font-black text-slate-300">12,482 KM</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                <div>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Speed Velocity</p>
                  <p className="text-xs font-black text-brand-cyan">48.5 <span className="text-[9px] opacity-60">KM/H</span></p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Signal Status</p>
                  <p className="text-xs font-black text-white">98% <span className="text-[9px] text-brand-green">ULTRA</span></p>
                </div>
              </div>

              <div className="pt-2">
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan"
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[7px] text-slate-500 font-bold uppercase">Route Progress</span>
                  <span className="text-[7px] text-brand-blue font-bold">75%</span>
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
  
  // Geofencing States
  const [isGeofenceMode, setIsGeofenceMode] = useState(false);
  const [geofencePoints, setGeofencePoints] = useState([]);

  const handleMapClick = (e) => {
    if (!isGeofenceMode) return;
    
    // Get mouse coordinates relative to SVG
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    setGeofencePoints([...geofencePoints, { x: svgP.x, y: svgP.y }]);
    
    if (geofencePoints.length === 0) {
      toast.success("Geofence started! Keep clicking to draw perimeter.", { icon: '📍' });
    }
  };

  const saveGeofence = () => {
    if (geofencePoints.length < 3) {
      toast.error("Need at least 3 points for a valid zone!");
      return;
    }
    toast.success("Geofence Saved: 'Sector A Safe Zone' Active", {
      icon: '🛡️',
      style: { border: '1px solid #22d3ee' }
    });
    setIsGeofenceMode(false);
  };

  const clearGeofence = () => {
    setGeofencePoints([]);
    toast.error("Geofence Cleared", { icon: '🗑️' });
  };

  const vehicles = useMemo(() => [
    { id: 'MH-12-RS-4521', status: 'moving', speed: '48.5 km/h', fuel: '75%', battery: '86%', type: 'Truck', driver: 'Arjun K.' },
    { id: 'MH-14-BT-9821', status: 'parked', speed: '0 km/h', fuel: '42%', battery: '92%', type: 'Container', driver: 'Sanjay M.' },
    { id: 'KA-01-XP-4412', status: 'idle', speed: '0 km/h', fuel: '88%', battery: '45%', type: 'Pickup', driver: 'Rahul S.' },
  ], []);

  const filteredVehicles = useMemo(() => 
    vehicles.filter(v => v.id.toLowerCase().includes(searchQuery.toLowerCase())),
  [vehicles, searchQuery]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("GPS Signal Locked: High Precision Mode Active", {
        icon: '📡',
        duration: 4000
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEmergency = () => {
    toast.error("EMERGENCY SIGNAL SENT! SOS beacons active.", {
      style: {
        background: '#ef4444',
        color: '#fff',
        fontWeight: '900',
        borderRadius: '0.5rem',
      },
      duration: 6000
    });
  };

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
              <MapLayer 
                style={mapStyle} 
                selectedVehicle={selectedVehicle} 
                isGeofenceMode={isGeofenceMode}
                geofencePoints={geofencePoints}
                onMapClick={handleMapClick}
              />

              {/* Overlays */}
              <div className="absolute top-6 left-6 flex flex-col gap-4 z-40">
                <div className="flex gap-3">
                  <div className="bg-slate-900/60 backdrop-blur-md p-2 px-3 rounded-xl border border-white/5 flex items-center gap-3 shadow-xl">
                    <Activity size={12} className="text-brand-cyan animate-pulse" />
                    <span className="text-[10px] font-medium text-slate-300">Signal: <span className="text-brand-green uppercase">Quantum</span></span>
                  </div>
                  
                  <div className="flex bg-slate-900/60 backdrop-blur-md p-1 rounded-xl border border-white/5 shadow-xl">
                    {['dark', 'blueprint'].map((id) => (
                      <button key={id} onClick={() => setMapStyle(id)} className={`p-1.5 rounded-lg transition-all ${mapStyle === id ? 'bg-brand-blue shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                        {id === 'dark' ? <Layers size={14} /> : <Cpu size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {isGeofenceMode && (
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="bg-brand-orange/20 backdrop-blur-md p-3 rounded-xl border border-brand-orange/30 shadow-xl">
                        <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mb-2 font-black">Drawing Mode</p>
                        <div className="flex gap-2">
                          <button onClick={saveGeofence} className="bg-brand-orange px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white shadow-lg">Save Zone</button>
                          <button onClick={clearGeofence} className="bg-white/5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white border border-white/10">Clear</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Actions */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-fit z-40">
                <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-2xl flex items-center gap-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <button 
                    onClick={() => setIsGeofenceMode(!isGeofenceMode)}
                    className={`p-2 rounded-xl transition-all transform hover:scale-110 active:scale-95 ${isGeofenceMode ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/40' : 'hover:bg-white/10 text-brand-orange'}`}
                  >
                    <Shield size={18} />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-xl transition-all transform hover:scale-110 active:scale-95 text-brand-blue">
                    <History size={18} />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-xl transition-all transform hover:scale-110 active:scale-95 text-brand-cyan">
                    <Activity size={18} />
                  </button>
                  
                  <div className="w-px h-6 bg-white/10" />
                  <button 
                    onClick={handleEmergency}
                    className="bg-brand-blue px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-blue/40 hover:brightness-110 transition-all transform active:scale-95"
                  >
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
