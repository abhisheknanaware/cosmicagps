import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import ProductPlatform from '../sections/ProductPlatform';
import Industries from '../sections/Industries';
import DashboardPreview from '../sections/DashboardPreview';
import WhyChooseUs from '../sections/WhyChooseUs';
import CloudServices from '../sections/CloudServices';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';
import { useLenis } from '../hooks/useLenis';

const Home = () => {
  useLenis();

  return (
    <div className="relative bg-brand-dark min-h-screen">
      <Navbar />
      <main>
        <section id="header" className="scroll-mt-32">
          <Hero />
        </section>
        
        <section id="gpsservices" className="scroll-mt-32">
          <Features />
        </section>

        <section id="solutions" className="scroll-mt-32">
          <Industries />
        </section>

        <section id="cloud" className="scroll-mt-32">
          <CloudServices />
        </section>

        <section id="features" className="scroll-mt-32">
          {/* Dashboard preview can act as a technical feature showcase */}
          <DashboardPreview />
        </section>

        <section id="applications" className="scroll-mt-32">
          <ProductPlatform />
        </section>

        <section id="about" className="scroll-mt-32">
          <WhyChooseUs />
        </section>

        <section id="contact" className="scroll-mt-32">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
