import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, LayoutDashboard, Smartphone, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <Cpu className="w-10 h-10" />,
    label: "GPS Device",
    desc: "Rugged IoT sensor installed in vehicle",
    color: "text-brand-blue"
  },
  {
    icon: <Cloud className="w-10 h-10" />,
    label: "Cloud Server",
    desc: "Real-time data processing & logic",
    color: "text-brand-purple"
  },
  {
    icon: <LayoutDashboard className="w-10 h-10" />,
    label: "Dashboard",
    desc: "AI-powered analytics & monitoring",
    color: "text-brand-cyan"
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    label: "Mobile App",
    desc: "Instant access from anywhere",
    color: "text-brand-blue"
  }
];

const ProductPlatform = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          // scrub: 1
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-brand-dark/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-title">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How It <span className="text-gradient">Works</span></h2>
          <p className="text-slate-400">Seamless integration from hardware to software.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-brand-blue/20 via-brand-purple/50 to-brand-cyan/20 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group step-item"
              >
                <div className={`w-20 h-20 rounded-full border-2 border-white/10 bg-brand-dark flex items-center justify-center mb-6 shadow-2xl relative transition-transform duration-500 group-hover:scale-110 group-hover:border-brand-cyan/50 ${step.color}`}>
                  {step.icon}
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping group-hover:animate-none" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.label}</h3>
                <p className="text-slate-500 text-sm max-w-[200px]">{step.desc}</p>
                
                {/* Arrow (Mobile/Small MD) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-white/20 animate-bounce">
                    <ArrowRight className="rotate-90 md:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPlatform;
