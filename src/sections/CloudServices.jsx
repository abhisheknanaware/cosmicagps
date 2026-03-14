import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Code, Smartphone, BarChart, Globe, Shield } from 'lucide-react';

const services = [
  {
    icon: <Cloud className="w-10 h-10" />,
    title: "AWS Cloud Solutions",
    description: "Expert consultancy for AWS cloud migration, architecture, and high-availability database management.",
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: "Web Development",
    description: "Custom static and dynamic websites built with PHP Laravel, ReactJS, and Python Django.",
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: "Mobile App Development",
    description: "Native and cross-platform Android & iOS applications tailored for your business needs.",
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Digital Branding",
    description: "Professional graphic design, logo creation, and SEO optimization to boost your online presence.",
  },
  {
    icon: <BarChart className="w-10 h-10" />,
    title: "WhatsApp API",
    description: "Integration of WhatsApp API for automated alerts, notifications, and customer communication.",
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Consultancy",
    description: "IT infrastructure audits and strategic planning for scalable enterprise solutions.",
  }
];

const CloudServices = () => {
  return (
    <section id="cloud-services" className="py-24 relative overflow-hidden bg-slate-900/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Beyond GPS: <span className="text-gradient">Cloud & IT Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            We leverage cutting-edge technologies to provide comprehensive digital solutions 
            that empower your business to scale in the cloud.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 group hover:border-brand-blue/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-6 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-cyan transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CloudServices;
