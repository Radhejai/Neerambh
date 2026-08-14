import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../blogData';
import { SERVICES } from '../data';
import { ArrowLeft, BookOpen } from 'lucide-react';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl font-bold text-white mb-3">Post Not Found</h1>
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  const relatedService = post.relatedServiceSlug ? SERVICES.find(s => s.slug === post.relatedServiceSlug) : undefined;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-royal-400 flex items-center space-x-2">
        <Link to="/blog" className="hover:text-gold-400 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-royal-200">{post.title}</span>
      </nav>

      <header className="mb-8">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full border border-gold-500/20 bg-gold-500/5 text-[10px] text-gold-400 font-semibold uppercase tracking-widest mb-4">
          <BookOpen className="h-3 w-3" />
          <span>Compliance Insights</span>
        </div>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
        <time className="mt-3 block text-xs uppercase tracking-widest text-royal-400 font-mono">
          {formatDate(post.publishedAt)}
        </time>
      </header>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-xl royal-glow space-y-5">
        {post.body.map((para, idx) =>
          para.startsWith('## ') ? (
            <h2 key={idx} className="font-serif text-lg md:text-xl font-bold text-gold-300 pt-2">
              {para.replace('## ', '')}
            </h2>
          ) : (
            <p key={idx} className="text-sm md:text-base text-royal-200 font-light leading-relaxed">
              {para}
            </p>
          )
        )}
      </div>

      {relatedService && (
        <div className="mt-8 rounded-xl border border-gold-500/20 bg-gold-500/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-royal-200 font-light">
            Need help with <span className="text-white font-semibold">{relatedService.title}</span>?
          </p>
          <Link
            to={`/services/${relatedService.slug}`}
            className="px-5 py-2.5 rounded-lg bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all whitespace-nowrap"
          >
            View Service
          </Link>
        </div>
      )}

      <div className="mt-8">
        <Link to="/blog" className="inline-flex items-center space-x-2 text-xs font-semibold text-royal-300 hover:text-gold-400 uppercase tracking-widest transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Blog</span>
        </Link>
      </div>
    </article>
  );
}
