import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success(`Welcome back, ${email.split('@')[0]}!`, {
          icon: '🚀',
        });
        navigate('/dashboard');
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      const msg = "An unexpected error occurred. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Background blobs */}
      <div className="auth-bg-blob top-0 left-0 w-[600px] h-[600px] bg-sky-500/20 animate-pulse-slow"></div>
      <div className="auth-bg-blob bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-500/10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="auth-card-premium"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="auth-brand-badge">
            <ShieldCheck size={30} className="text-sky-400" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white m-0">Welcome Back</h2>
          <p className="text-slate-400 text-sm max-w-[280px] m-0">Continue to your Cosmica fleet tracking system</p>
        </div>
        
        {error && (
          <div className="error-premium-box">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
            <div className="input-premium-wrapper group">
              <Mail size={18} className="absolute left-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Password</label>
            <div className="input-premium-wrapper group">
              <Lock size={18} className="absolute left-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="btn-auth-premium-action mt-2"
          >
            {loading ? 'Authenticating...' : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        <div className="text-center text-sm font-medium text-slate-500">
          New to Cosmica? 
          <Link to="/signup" className="text-sky-400 font-bold ml-1 hover:underline underline-offset-4">Create account</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;


