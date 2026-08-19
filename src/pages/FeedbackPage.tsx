import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';
import { GOOGLE_REVIEWS_URL } from '../config';

/**
 * Feedback tab. Once GOOGLE_REVIEWS_URL (src/config.ts) is set, this
 * redirects visitors straight to the Google Reviews page — no other
 * change needed. Until then, it shows a placeholder pointing to /contact.
 */
export default function FeedbackPage() {
  useEffect(() => {
    if (GOOGLE_REVIEWS_URL) {
      window.location.href = GOOGLE_REVIEWS_URL;
    }
  }, []);

  if (GOOGLE_REVIEWS_URL) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
        <p className="text-sm text-royal-300 font-light">Redirecting you to Google Reviews&hellip;</p>
        <a
          href={GOOGLE_REVIEWS_URL}
          className="mt-4 inline-flex items-center space-x-2 text-xs font-semibold text-gold-400 uppercase tracking-widest hover:underline"
        >
          <span>Click here if you are not redirected</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center space-y-4">
      <Star className="h-8 w-8 text-gold-400 mx-auto" />
      <h2 className="font-serif text-xl font-bold text-white">Reviews are coming soon</h2>
      <p className="text-sm text-royal-300 font-light leading-relaxed max-w-md mx-auto">
        We&apos;re setting up our Google Business Profile so you can leave a review directly from
        here. In the meantime, we&apos;d still love to hear from you.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
      >
        <span>Send Feedback</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
