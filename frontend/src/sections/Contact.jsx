import React from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Get in <span className="text-gradient">Touch</span>
            </motion.h2>
            <p className="text-slate-400 text-lg mb-12">
              Have questions about our solutions? Our team of experts is ready to help you 
              transform your fleet management strategy.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Phone size={24} />, title: "Call Us", detail: "+91 9067227722", color: "text-brand-blue" },
                { icon: <Mail size={24} />, title: "Email Us", detail: "sales@cosmicagps.com", color: "text-brand-purple" },
                { icon: <MapPin size={24} />, title: "Visit Us", detail: "Pride Purple Square, Wakad, Pune, MH", color: "text-brand-cyan" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-sm font-medium">{item.title}</h4>
                    <p className="text-xl font-bold">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/10 blur-[60px] rounded-full" />
            
            <form className="relative z-10 grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                <select className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:outline-none transition-colors appearance-none text-slate-400">
                  <option>Request a Demo</option>
                  <option>Technical Support</option>
                  <option>Hardware Inquiry</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Your Message</label>
                <textarea 
                  rows="4"
                  placeholder="Tell us about your requirements..."
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:outline-none transition-colors resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 group mt-4">
                Send Message
                <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
