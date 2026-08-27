import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Calculator, Receipt } from 'lucide-react';

const TABS = [
  { path: '/calculators/income-tax', label: 'Income Tax', icon: Calculator },
  { path: '/calculators/gst-late-fee-interest', label: 'GST Late Fee & Interest', icon: Receipt },
];

export default function CalculatorsLayout() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-xs text-gold-400 font-semibold uppercase tracking-widest mb-4">
          <Calculator className="h-3.5 w-3.5" />
          <span>Free Tools</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-white">Calculators</h1>
        <p className="mt-3 text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
          Quick estimates for income tax and GST late fees — for exact figures on your specific
          filing, talk to us.
        </p>
      </header>

      <nav aria-label="Calculators" className="mb-10 inline-flex flex-wrap rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-500/10 text-gold-300 border border-gold-500/20'
                    : 'text-royal-300 hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <Outlet />
    </main>
  );
}
