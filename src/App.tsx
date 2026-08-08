import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import RoyalAdvisor from './components/RoyalAdvisor';
import QuoteBuilder from './components/QuoteBuilder';
import InquiryPortal from './components/InquiryPortal';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { SERVICES } from './data';
import { Inquiry } from './types';
import { Award, Sparkles, Building, Landmark, Percent, ClipboardCheck, Scale, Shield } from 'lucide-react';

function ServicesCatalogPage({
  activeCategoryFilter,
  setActiveCategoryFilter,
}: {
  activeCategoryFilter: string;
  setActiveCategoryFilter: (id: string) => void;
}) {
  const categories = [
    { id: 'all', label: 'All Services', icon: Landmark },
    { id: 'incorporation', label: 'Incorporation', icon: Building },
    { id: 'tax', label: 'Taxation & Filing', icon: Percent },
    { id: 'audit', label: 'Audit & Assurance', icon: ClipboardCheck },
    { id: 'compliance', label: 'Corporate Compliance', icon: Scale },
    { id: 'registration', label: 'Registrations', icon: Award },
  ];

  const filteredServices =
    activeCategoryFilter === 'all' ? SERVICES : SERVICES.filter(s => s.category === activeCategoryFilter);

  return (
    <>
      <header className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl overflow-hidden royal-glow">
          <div className="absolute top-0 right-0 h-48 w-48 bg-gold-500/5 blur-3xl rounded-full" />
          <div className="absolute -bottom-8 -left-8 h-36 w-36 bg-indigo-500/5 blur-2xl rounded-full" />

          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-xs text-gold-400 font-semibold uppercase tracking-widest">
              <Shield className="h-3.5 w-3.5" />
              <span>Premier Compliance Platform</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-wide text-white leading-tight">
              Architecting Secure <br className="hidden md:block" />
              <span className="gold-text-gradient">Business Futures</span>
            </h1>

            <p className="text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
              Neerambh serves global SMEs, startups, and high-net-worth directors with immaculate corporate
              registrations, strict direct/indirect tax strategy, and flawless statutory audits. Fully digitized,
              futuristic, and absolute.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg border border-royal-700 hover:border-gold-500/30 text-royal-200 hover:text-white font-medium text-xs uppercase tracking-widest transition-all bg-royal-950/40 inline-flex items-center justify-center"
              >
                Contact Advisors
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-royal-800/80 pt-8 text-center md:text-left">
            <div>
              <span className="block text-2xl font-bold font-serif text-white">₹26.4B+</span>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-medium">Assets Under Audit</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-serif text-white">15,000+</span>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-medium">Entities Registered</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-serif text-white">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-medium">Filing Integrity Rate</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-serif text-white">&lt;0.01%</span>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-medium">Compliance Risk</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-2 pb-4 border-b border-royal-800/40">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                    isSelected
                      ? 'bg-gold-500 text-royal-950 border-gold-500 font-bold royal-glow-sm'
                      : 'bg-royal-900/30 text-royal-300 border-royal-800 hover:border-royal-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCardLink key={service.id} service={service} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function ServiceCardLink({ service }: { service: (typeof SERVICES)[number]; key?: string }) {
  const navigate = useNavigate();
  return <ServiceCard service={service} onViewDetails={() => navigate(`/services/${service.slug}`)} />;
}

export default function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error('Failed to fetch corporate inquiries ledger', err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleToggleServiceInQuote = (serviceId: string) => {
    setSelectedServices(prev => (prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]));
  };

  const handleAddToQuote = (serviceId: string) => {
    setSelectedServices(prev => (prev.includes(serviceId) ? prev : [...prev, serviceId]));
  };

  const handleInquirySubmitted = (newInquiry: Inquiry) => {
    setInquiries(prev => [...prev, newInquiry]);
  };

  return (
    <div className="min-h-screen bg-royal-950 font-sans text-royal-100 antialiased selection:bg-gold-500/30 selection:text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px] -ml-40 -mb-40" />
      </div>

      <Navbar onOpenAdvisor={() => setAdvisorOpen(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <ServicesCatalogPage
              activeCategoryFilter={activeCategoryFilter}
              setActiveCategoryFilter={setActiveCategoryFilter}
            />
          }
        />
        <Route
          path="/services/:slug"
          element={
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <ServiceDetailPage onAddToQuote={handleAddToQuote} />
            </main>
          }
        />
        <Route
          path="/contact"
          element={
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <QuoteBuilder
                selectedServiceIds={selectedServices}
                onToggleService={handleToggleServiceInQuote}
                onInquirySubmitted={handleInquirySubmitted}
              />
            </main>
          }
        />
        {/* Private, user-specific view — deliberately excluded from the sitemap and
            marked noindex; it shows the submitted-inquiries ledger, not public content. */}
        <Route
          path="/my-inquiries"
          element={
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <InquiryPortal inquiries={inquiries} onRefresh={fetchInquiries} />
            </main>
          }
        />
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
              <h1 className="font-serif text-2xl font-bold text-white mb-3">Page Not Found</h1>
              <Link
                to="/"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Back to Home
              </Link>
            </main>
          }
        />
      </Routes>

      <RoyalAdvisor
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        selectedServices={selectedServices}
        onSelectServices={setSelectedServices}
      />

      <footer className="border-t border-gold-500/5 bg-royal-950 py-12 mt-20 text-center text-xs text-royal-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Shield className="h-4 w-4 text-gold-500/40" />
            <span className="font-serif tracking-widest text-royal-300 text-sm font-bold uppercase">Neerambh</span>
          </div>
          <p className="max-w-md mx-auto font-light leading-relaxed text-[11px]">
            &copy; {new Date().getFullYear()} Neerambh Compliance. All archives and secure inquiry details are
            protected and strictly confidential.
          </p>
          <p className="text-[10px] text-gold-500/60 font-mono tracking-wider">Created by Radhejai</p>
          <div className="flex justify-center space-x-6 pt-2 text-royal-400">
            <Link to="/" className="hover:text-gold-400 transition-colors">
              Catalog
            </Link>
            <span>&bull;</span>
            <Link to="/contact" className="hover:text-gold-400 transition-colors">
              Contact Us
            </Link>
            <span>&bull;</span>
            <Link to="/my-inquiries" className="hover:text-gold-400 transition-colors">
              My Inquiries
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
