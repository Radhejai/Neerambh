import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import QuoteBuilder from '../components/QuoteBuilder';
import { SERVICES } from '../data';
import { BLOG_POSTS } from '../blogData';
import { Inquiry } from '../types';
import {
  Shield,
  Building,
  Percent,
  ClipboardCheck,
  Scale,
  Award,
  Landmark,
  BookOpen,
  Target,
  Users,
  TrendingUp,
} from 'lucide-react';

function ServiceCardLink({ service }: { service: (typeof SERVICES)[number]; key?: string }) {
  const navigate = useNavigate();
  return <ServiceCard service={service} onViewDetails={() => navigate(`/services/${service.slug}`)} />;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

interface HomePageProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  onInquirySubmitted: (newInquiry: Inquiry) => void;
}

export default function HomePage({ selectedServices, onToggleService, onInquirySubmitted }: HomePageProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState('all');

  const categories = [
    { id: 'all', label: 'All Services', icon: Landmark },
    { id: 'incorporation', label: 'Incorporation', icon: Building },
    { id: 'tax', label: 'Taxation & Filing', icon: Percent },
    { id: 'audit', label: 'Audit & Assurance', icon: ClipboardCheck },
    { id: 'compliance', label: 'Corporate Compliance', icon: Scale },
    { id: 'registration', label: 'Registrations', icon: Award },
  ];

  const filteredServices =
    activeCategoryFilter === 'all' ? SERVICES : SERVICES.filter((s) => s.category === activeCategoryFilter);

  const latestPosts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, 3);

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
              <span>Premier Compliance Platform</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-wide text-white leading-tight">
              Architecting Secure <br className="hidden md:block" />
              <span className="purple-gold-gradient">Business Futures</span>
            </h1>

            <p className="text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
              Neerambh serves global SMEs, startups, and high-net-worth directors with immaculate corporate
              registrations, strict direct/indirect tax strategy, and flawless statutory audits. Fully digitized,
              futuristic, and absolute.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg border border-royal-700 hover:border-gold-500/30 text-royal-200 hover:text-white font-medium text-xs uppercase tracking-widest transition-all bg-royal-950/40 inline-flex items-center justify-center"
              >
                Contact Advisors
              </a>
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

      {/* ===== SERVICES ===== */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">What We Offer</span>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white">Compliance &amp; Registration Services</h2>
        </div>

        <div className="space-y-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCardLink key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 via-royal-900 to-royal-950 p-8 md:p-12 backdrop-blur-xl purple-glow">
          <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">About Neerambh</span>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white max-w-2xl">
            Compliance handled with precision. Built on trust, not guesswork.
          </h2>
          <p className="mt-4 text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            Neerambh was founded to close the gap between founders and the tangle of Indian tax and corporate
            compliance law. We combine deep GST, income tax, and MCA filing expertise with a digital-first process,
            so every registration, return, and audit is handled end-to-end — accurately, on time, and without the
            back-and-forth that usually comes with compliance work.
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
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section id="blog" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">Compliance Insights</span>
            <h2 className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white">From the Blog</h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center space-x-2 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-widest transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>View All Posts</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-purple-400/30 transition-all group"
            >
              <time className="text-[10px] uppercase tracking-widest text-royal-400 font-mono">
                {formatDate(post.publishedAt)}
              </time>
              <h3 className="mt-2 font-serif text-base font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-xs text-royal-300 font-light leading-relaxed line-clamp-3">{post.excerpt}</p>
              <span className="mt-3 inline-block text-[11px] font-semibold text-purple-300 uppercase tracking-widest">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link to="/blog" className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
            View All Posts &rarr;
          </Link>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">Get In Touch</span>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white">Contact Our Advisors</h2>
        </div>
        <QuoteBuilder
          selectedServiceIds={selectedServices}
          onToggleService={onToggleService}
          onInquirySubmitted={onInquirySubmitted}
        />
      </section>
    </>
  );
}
