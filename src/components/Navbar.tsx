import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Crown, Menu, X, Cpu, Compass, Sparkles, Home, Info, Calculator } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home, end: true },
    { path: '/services', label: 'Services', icon: Compass, end: false },
    { path: '/calculators', label: 'Calculators', icon: Calculator, end: false },
    { path: '/about', label: 'About', icon: Info, end: false },
    { path: '/insights', label: 'Insights', icon: Sparkles, end: false },
    { path: '/contact', label: 'Contact', icon: Cpu, end: false },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#05070A]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
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
                Tax &amp; Compliance Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-gold-500/10 text-gold-300 border border-gold-500/20 royal-glow'
                        : 'text-royal-300 hover:text-white hover:bg-royal-900/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-4 w-4 ${isActive ? 'text-gold-400' : 'text-royal-400'}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
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
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center space-x-3 px-4 py-3 rounded-md text-base font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold-500/10 text-gold-300 border border-gold-500/20'
                      : 'text-royal-300 hover:text-white hover:bg-royal-900'
                  }`
                }
              >
                <Icon className="h-5 w-5 text-gold-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
}
