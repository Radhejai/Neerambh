import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Crown, Menu, X, Shield, Cpu, Compass, Sparkles, BookOpen, Home, Info } from 'lucide-react';

interface NavbarProps {
  onOpenAdvisor: () => void;
}

export default function Navbar({ onOpenAdvisor }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionLinks = [
    { path: '/#home', label: 'Home', icon: Home },
    { path: '/#services', label: 'Services', icon: Compass },
    { path: '/#about', label: 'About', icon: Info },
    { path: '/#contact', label: 'Contact', icon: Cpu },
  ];
  const pageLinks = [
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/my-inquiries', label: 'My Inquiries', icon: Shield },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#05070A]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to="/#home"
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
            {sectionLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 text-royal-300 hover:text-white hover:bg-royal-900/50"
                >
                  <Icon className="h-4 w-4 text-royal-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <span className="h-6 w-px bg-royal-800 mx-2" />

            {pageLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-500/10 text-purple-200 border border-purple-400/20 purple-glow'
                        : 'text-royal-300 hover:text-white hover:bg-royal-900/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-4 w-4 ${isActive ? 'text-purple-300' : 'text-royal-400'}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
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
          {sectionLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center space-x-3 px-4 py-3 rounded-md text-base font-medium tracking-wide transition-all text-royal-300 hover:text-white hover:bg-royal-900"
              >
                <Icon className="h-5 w-5 text-gold-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="border-t border-royal-800 my-2" />
          {pageLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center space-x-3 px-4 py-3 rounded-md text-base font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-200 border border-purple-400/20'
                      : 'text-royal-300 hover:text-white hover:bg-royal-900'
                  }`
                }
              >
                <Icon className="h-5 w-5 text-purple-300" />
                <span>{item.label}</span>
              </NavLink>
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
