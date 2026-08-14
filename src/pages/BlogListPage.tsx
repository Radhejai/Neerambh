import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../blogData';
import { BookOpen } from 'lucide-react';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogListPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5 text-xs text-gold-400 font-semibold uppercase tracking-widest mb-4">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Compliance Insights</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-white">Neerambh Blog</h1>
        <p className="mt-3 text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
          Practical guides on GST, incorporation, and compliance for growing Indian businesses.
        </p>
      </header>

      <div className="space-y-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl hover:border-gold-500/30 transition-all group"
          >
            <time className="text-[10px] uppercase tracking-widest text-royal-400 font-mono">
              {formatDate(post.publishedAt)}
            </time>
            <h2 className="mt-2 font-serif text-xl md:text-2xl font-bold text-white group-hover:text-gold-300 transition-colors">
              {post.title}
            </h2>
            <p className="mt-3 text-sm text-royal-300 font-light leading-relaxed">{post.excerpt}</p>
            <span className="mt-4 inline-block text-xs font-semibold text-gold-400 uppercase tracking-widest">
              Read more &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
