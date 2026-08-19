import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../blogData';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogListPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <Link
          key={post.slug}
          to={`/insights/blog/${post.slug}`}
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
  );
}
