import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, HelpCircle, Star } from 'lucide-react';

const TABS = [
  { path: '/insights', label: 'Blog', icon: BookOpen, end: true },
  { path: '/insights/faq', label: 'FAQ', icon: HelpCircle, end: false },
  { path: '/insights/feedback', label: 'Feedback', icon: Star, end: false },
];

/**
 * Shared shell for the /insights section — houses the Blog list, the
 * aggregated FAQ, and Feedback (Google Reviews redirect). Individual blog
 * posts (/insights/blog/:slug) intentionally render outside this layout,
 * as a standalone article view, matching how service detail pages work.
 */
export default function InsightsLayout() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-xs text-gold-400 font-semibold uppercase tracking-widest mb-4">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Neerambh Insights</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-white">Insights</h1>
        <p className="mt-3 text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
          Guides on GST and compliance, answers to common questions, and a place to leave feedback
          — all in one section.
        </p>
      </header>

      <nav aria-label="Insights sections" className="mb-10 inline-flex rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.end}
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
