import React, { useState } from 'react';
import { Crown, Menu, X, Shield, Cpu, Compass, BookOpen, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAdvisor: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, onOpenAdvisor }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'services', label: 'Service Catalog', icon: Compass },
    { id: 'quote', label: 'Contact Us', icon: Cpu },
    { id: 'inquiries', label: 'My Inquiries', icon: Shield },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#05070A]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('services')} 
            className="flex cursor-pointer items-center space-x-3 group"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-gold-500/30 bg-royal-900 royal-glow transition-all duration-300 group-hover:border-gold-500">
              <Crown className="h-6 w-6 text-gold-500 transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 -z-10 rounded-lg bg-gold-500/5 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-100" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-widest text-white block">
                NEERAMBH
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-400 block -mt-1">
                Compliance Sanctuary
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-gold-500/10 text-gold-300 border border-gold-500/20 royal-glow'
                      : 'text-royal-300 hover:text-white hover:bg-royal-900/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-gold-400' : 'text-royal-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <span className="h-6 w-px bg-royal-800 mx-4" />

            <button
              onClick={onOpenAdvisor}
              className="relative px-5 py-2.5 rounded-lg overflow-hidden group border border-gold-500 bg-transparent flex items-center space-x-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <Sparkles className="h-4 w-4 text-gold-400 group-hover:text-royal-950 transition-colors duration-300 animate-pulse" />
              <span className="relative font-sans text-xs uppercase font-bold tracking-widest text-gold-300 group-hover:text-royal-950 transition-colors duration-300">
                Ask Neerambh
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-royal-400 hover:text-white hover:bg-royal-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gold-500" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#05070A]/95 backdrop-blur-xl px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-base font-medium tracking-wide transition-all ${
                  isActive
                    ? 'bg-gold-500/10 text-gold-300 border border-gold-500/20'
                    : 'text-royal-300 hover:text-white hover:bg-royal-900'
                }`}
              >
                <Icon className="h-5 w-5 text-gold-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-4 px-4">
            <button
              onClick={() => {
                onOpenAdvisor();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-md bg-gradient-to-r from-gold-600 to-gold-400 text-royal-950 text-center font-bold tracking-widest text-xs uppercase hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask Neerambh</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
