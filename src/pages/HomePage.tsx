import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../blogData';
import { Shield, BookOpen } from 'lucide-react';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function HomePage() {
  const latestPosts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <header className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
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
              <Link
                to="/services"
                className="px-6 py-3 rounded-lg bg-gold-500 text-royal-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all inline-flex items-center justify-center"
              >
                View Services
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg border border-royal-700 hover:border-gold-500/30 text-royal-200 hover:text-white font-medium text-xs uppercase tracking-widest transition-all bg-royal-950/40 inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
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

      {/* ===== BLOG PREVIEW ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
    </>
  );
}
