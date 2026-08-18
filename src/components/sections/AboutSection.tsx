import React from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';

/** About content block — used on both the standalone /about page and
 * inline on the homepage. */
export default function AboutSection({ headingTag: Heading = 'h1' }: { headingTag?: 'h1' | 'h2' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 via-royal-900 to-royal-950 p-8 md:p-12 backdrop-blur-xl purple-glow">
      <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">About Neerambh</span>
      <Heading className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white max-w-2xl">
        Compliance handled with precision. Built on trust, not guesswork.
      </Heading>
      <p className="mt-4 text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
        We help founders and growing businesses understand and manage their tax and compliance
        requirements. Our team handles GST, income tax, and company filings so you can focus on running
        your business, with every registration, return, and audit tracked from start to finish.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-start space-x-3">
          <Target className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-white">Precision First</h3>
            <p className="mt-1 text-xs text-royal-400 font-light leading-relaxed">
              Every filing is checked against current GST and MCA rules before it's submitted.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Users className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-white">Founder-Focused</h3>
            <p className="mt-1 text-xs text-royal-400 font-light leading-relaxed">
              Built for founders and growing businesses who need compliance handled, not explained in jargon.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <TrendingUp className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-white">End-to-End</h3>
            <p className="mt-1 text-xs text-royal-400 font-light leading-relaxed">
              From incorporation through ongoing returns and audits, tracked in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
