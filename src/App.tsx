import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import RoyalAdvisor from './components/RoyalAdvisor';
import QuoteBuilder from './components/QuoteBuilder';
import InquiryPortal from './components/InquiryPortal';
import { SERVICES } from './data';
import { Service, Inquiry } from './types';
import { Award, Sparkles, Building, Landmark, Percent, ClipboardCheck, ArrowUpRight, Scale, Info, Shield, Check, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('services');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Fetch inquiries from server on mount
  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Failed to fetch corporate inquiries ledger", err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleToggleServiceInQuote = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const handleInquirySubmitted = (newInquiry: Inquiry) => {
    setInquiries(prev => [...prev, newInquiry]);
  };

  const categories = [
    { id: 'all', label: 'All Services', icon: Landmark },
    { id: 'incorporation', label: 'Incorporation', icon: Building },
    { id: 'tax', label: 'Taxation & Filing', icon: Percent },
    { id: 'audit', label: 'Audit & Assurance', icon: ClipboardCheck },
    { id: 'compliance', label: 'Corporate Compliance', icon: Scale },
    { id: 'registration', label: 'Registrations', icon: Award }
  ];

  const filteredServices = activeCategoryFilter === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategoryFilter);

  return (
    <div className="min-h-screen bg-royal-950 font-sans text-royal-100 antialiased selection:bg-gold-500/30 selection:text-white">
      {/* Dynamic Background Cosmic Radial Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px] -ml-40 -mb-40" />
      </div>

      {/* Header / Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenAdvisor={() => setAdvisorOpen(true)} 
      />

      {/* Hero Banner Section (Only on Services Catalog page for pristine spacing) */}
      {currentTab === 'services' && (
        <header className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl overflow-hidden royal-glow">
            {/* Visual background details */}
            <div className="absolute top-0 right-0 h-48 w-48 bg-gold-500/5 blur-3xl rounded-full" />
            <div className="absolute -bottom-8 -left-8 h-36 w-36 bg-indigo-500/5 blur-2xl rounded-full" />
            
            <div className="relative max-w-3xl space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-xs text-gold-400 font-semibold uppercase tracking-widest">
                <Shield className="h-3.5 w-3.5" />
                <span>Premier Compliance Platform</span>
              </div>
              
              <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-wide text-white leading-tight">
                Architecting Secure <br className="hidden md:block"/>
                <span className="gold-text-gradient">Business Futures</span>
              </h1>

              <p className="text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                Neerambh serves global SMEs, startups, and high-net-worth directors with immaculate corporate registrations, strict direct/indirect tax strategy, and flawless statutory audits. Fully digitized, futuristic, and absolute.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setAdvisorOpen(true)}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 text-royal-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Ask Neerambh</span>
                </button>
                <button
                  onClick={() => setCurrentTab('quote')}
                  className="px-6 py-3 rounded-lg border border-royal-700 hover:border-gold-500/30 text-royal-200 hover:text-white font-medium text-xs uppercase tracking-widest transition-all bg-royal-950/40"
                >
                  Contact Advisors
                </button>
              </div>
            </div>

            {/* Live Stats sidebar */}
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
      )}

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* TAB 1: SERVICES CATALOG */}
        {currentTab === 'services' && (
          <div className="space-y-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-royal-800/40">
              {categories.map((cat) => {
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

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onViewDetails={setSelectedServiceDetail}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: QUOTE ESTIMATOR */}
        {currentTab === 'quote' && (
          <QuoteBuilder 
            selectedServiceIds={selectedServices}
            onToggleService={handleToggleServiceInQuote}
            onInquirySubmitted={handleInquirySubmitted}
            setCurrentTab={setCurrentTab}
          />
        )}

        {/* TAB 3: INQUIRY PORTAL */}
        {currentTab === 'inquiries' && (
          <InquiryPortal 
            inquiries={inquiries}
            onRefresh={fetchInquiries}
          />
        )}



      </main>

      {/* Floating AI Royal Advisor Sidebar Drawer */}
      <RoyalAdvisor 
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        selectedServices={selectedServices}
        onSelectServices={setSelectedServices}
        setCurrentTab={setCurrentTab}
      />

      {/* IMMERSIVE SERVICE DETAIL MODAL (ROYAL DRAWER) */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-950/60 backdrop-blur-sm p-4">
          <div className="absolute inset-0" onClick={() => setSelectedServiceDetail(null)} />
          
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0C0F16]/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl royal-glow space-y-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-royal-800 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-500 font-bold block">Service Details</span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white mt-1">
                  {selectedServiceDetail.title}
                </h3>
                <span className="inline-block mt-2 px-2 py-0.5 rounded bg-royal-900 border border-royal-800 text-[9px] font-bold text-royal-300 uppercase tracking-wider font-mono">
                  Category: {selectedServiceDetail.category}
                </span>
              </div>
              <button 
                onClick={() => setSelectedServiceDetail(null)}
                className="rounded-full p-1 text-royal-400 hover:bg-royal-900 hover:text-gold-500 transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {/* Detailed narrative */}
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-2">Service Overview</h4>
                <p className="text-royal-200 text-sm font-light leading-relaxed">
                  {selectedServiceDetail.detailedDescription}
                </p>
              </div>

              {/* Service Logistics Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-royal-900/30 p-3 rounded-lg border border-royal-800">
                  <span className="block text-[9px] uppercase tracking-widest text-royal-400">Processing Timeline</span>
                  <span className="text-xs font-semibold text-white">{selectedServiceDetail.timeline}</span>
                </div>
                <div className="bg-royal-900/30 p-3 rounded-lg border border-royal-800">
                  <span className="block text-[9px] uppercase tracking-widest text-royal-400">Government Fees</span>
                  <span className="text-xs font-semibold text-white">{selectedServiceDetail.governmentFees}</span>
                </div>
              </div>

              {/* Two Column details: Documents Required vs. Strategic Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-3">Required Documents</h4>
                  <ul className="space-y-2">
                    {selectedServiceDetail.documentsRequired.map((doc, idx) => (
                      <li key={idx} className="flex items-start text-xs text-royal-300 font-light leading-relaxed">
                        <span className="mr-2 text-gold-400 font-bold select-none">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-3">Key Benefits</h4>
                  <ul className="space-y-2">
                    {selectedServiceDetail.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-xs text-royal-300 font-light leading-relaxed">
                        <Check className="h-3.5 w-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action CTAs in Modal Footer */}
            <div className="border-t border-royal-800 pt-5 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => {
                  if (!selectedServices.includes(selectedServiceDetail.id)) {
                    setSelectedServices([...selectedServices, selectedServiceDetail.id]);
                  }
                  setSelectedServiceDetail(null);
                  setCurrentTab('quote');
                }}
                className="flex-1 py-3 rounded-lg bg-gold-500 text-royal-950 hover:brightness-110 text-xs font-bold uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Inquire About This Service</span>
              </button>
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="px-6 py-3 rounded-lg border border-royal-700 text-royal-200 hover:text-white text-xs font-semibold uppercase tracking-widest transition-all hover:bg-royal-900/50"
              >
                Back to Catalog
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer section */}
      <footer className="border-t border-gold-500/5 bg-royal-950 py-12 mt-20 text-center text-xs text-royal-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Shield className="h-4 w-4 text-gold-500/40" />
            <span className="font-serif tracking-widest text-royal-300 text-sm font-bold uppercase">Neerambh</span>
          </div>
          <p className="max-w-md mx-auto font-light leading-relaxed text-[11px]">
            &copy; {new Date().getFullYear()} Neerambh Compliance. All archives and secure inquiry details are protected and strictly confidential.
          </p>
          <p className="text-[10px] text-gold-500/60 font-mono tracking-wider">
            Created by Radhejai
          </p>
          <div className="flex justify-center space-x-6 pt-2 text-royal-400">
            <button onClick={() => setCurrentTab('services')} className="hover:text-gold-400 transition-colors">Catalog</button>
            <span>&bull;</span>
            <button onClick={() => setCurrentTab('quote')} className="hover:text-gold-400 transition-colors">Contact Us</button>
            <span>&bull;</span>
            <button onClick={() => setCurrentTab('inquiries')} className="hover:text-gold-400 transition-colors">My Inquiries</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
