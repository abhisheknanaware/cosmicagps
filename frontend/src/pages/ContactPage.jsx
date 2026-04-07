import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const ContactPage = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 overflow-hidden">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 relative text-center">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Get In <span className="text-brand-blue">Touch</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Have questions about our solutions? We're here to help you track your fleet efficiently.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-10 border-brand-blue/20"
            >
              <h3 className="text-2xl font-black mb-8">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-4 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                    <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-4 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-4 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all" placeholder="Fleet Management Inquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
                  <textarea rows="5" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-4 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all resize-none" placeholder="Tell us more about your requirements..."></textarea>
                </div>
                <MagneticButton className="btn-primary w-full py-5 flex items-center justify-center gap-3 group">
                  Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </MagneticButton>
              </form>
            </motion.div>

            {/* Information Sidebar */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex flex-col gap-12"
            >
              <div>
                <h3 className="text-3xl font-black mb-8">Contact Information</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20 group-hover:bg-brand-blue transition-all duration-500 group-hover:text-white">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">Call Us</h4>
                      <p className="text-slate-400">+91 9067227722</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green border border-brand-green/20 group-hover:bg-brand-green transition-all duration-500 group-hover:text-white">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">Email Support</h4>
                      <p className="text-slate-400">info@cosmicagps.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20 group-hover:bg-brand-cyan transition-all duration-500 group-hover:text-white">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">Address</h4>
                      <p className="text-slate-400">Cosmica GPS Telematics Solution, Pune, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-brand-blue/10 rounded-3xl border border-brand-blue/20">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MessageCircle className="text-brand-blue" />
                  Quick Support
                </h4>
                <p className="text-slate-400 text-sm mb-6 leading-loose">
                  Our technical team is available 24/7 to resolve any tracking issues. Average response time: 30 mins.
                </p>
                <div className="flex gap-4">
                  <MagneticButton className="btn-primary scale-90">Whatsapp Now</MagneticButton>
                  <MagneticButton className="btn-secondary scale-90">Live Chat</MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
