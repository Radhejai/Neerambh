import React from 'react';
import ServicesSection from '../components/sections/ServicesSection';
import ProcessSection from '../components/sections/ProcessSection';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import FadeIn from '../components/FadeIn';
import { Shield } from 'lucide-react';

interface HomePageProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

export default function HomePage({ selectedServices, onToggleService }: HomePageProps) {
  return (
    <>
      {/* ===== HERO ===== */}
      <header id="home" className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-royal-900 via-royal-950 to-purple-900/30 p-8 md:p-12 backdrop-blur-xl overflow-hidden royal-glow">
          <div className="absolute top-0 right-0 h-56 w-56 bg-purple-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-8 -left-8 h-36 w-36 bg-gold-500/10 blur-2xl rounded-full" />

          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-xs text-gold-400 font-semibold uppercase tracking-widest">
              <Shield className="h-3.5 w-3.5" />
              <span>GST, Tax &amp; Compliance Advisory</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-wide text-white leading-tight">
              Compliance Handled with <br className="hidden md:block" />
              <span className="purple-gold-gradient">Precision, Not Guesswork</span>
            </h1>

            <p className="text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
              Neerambh helps founders and growing businesses with GST registration and filing, company
              incorporation, tax returns, and statutory audits — handled accurately and on time.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-gold-500 text-royal-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all inline-flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-royal-800/80 pt-8 text-center md:text-left">
            <div>
              <span className="block text-2xl font-bold font-serif text-white">10+</span>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-medium">Years of Experience</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-serif text-white">13</span>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-medium">Compliance Services</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-serif text-white">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-medium">Filing Accuracy</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-serif text-white">&lt;0.01%</span>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-medium">Compliance Risk</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== SERVICES ===== */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <FadeIn><ServicesSection headingTag="h2" /></FadeIn>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <FadeIn><ProcessSection headingTag="h2" /></FadeIn>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <FadeIn><AboutSection headingTag="h2" /></FadeIn>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <FadeIn><ContactSection selectedServices={selectedServices} onToggleService={onToggleService} headingTag="h2" /></FadeIn>
      </section>
    </>
  );
}
