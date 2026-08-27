import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data';
import { GENERAL_FAQS } from '../generalFaqs';

/**
 * General business FAQs, followed by every service's own FAQ list
 * (src/data.ts), grouped by service. Uses native <details>/<summary> so
 * all questions and answers are present in the DOM (and crawlable /
 * prerenderable) even collapsed — no JS required for content to be
 * indexable.
 */
export default function FaqPage() {
  const servicesWithFaqs = SERVICES.filter((s) => s.faqs && s.faqs.length > 0);

  return (
    <div className="space-y-10">
      <p className="text-sm text-royal-300 font-light leading-relaxed max-w-2xl">
        Answers to the questions we hear most often. Can&apos;t find what you&apos;re looking for?{' '}
        <Link to="/contact" className="text-gold-400 hover:underline">
          Reach out directly
        </Link>
        .
      </p>

      <section>
        <h2 className="font-serif text-lg md:text-xl font-bold text-white mb-4">General Questions</h2>
        <div className="divide-y divide-royal-800/60 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          {GENERAL_FAQS.map((faq, idx) => (
            <details key={idx} className="group px-5 py-4 open:bg-white/[0.02]">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-semibold text-white">
                <span>{faq.q}</span>
                <span className="shrink-0 text-gold-400 text-lg leading-none transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs md:text-sm text-royal-300 font-light leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {servicesWithFaqs.map((service) => (
        <section key={service.id}>
          <h2 className="font-serif text-lg md:text-xl font-bold text-white mb-4">
            <Link to={`/services/${service.slug}`} className="hover:text-gold-300 transition-colors">
              {service.title}
            </Link>
          </h2>
          <div className="divide-y divide-royal-800/60 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            {service.faqs!.map((faq, idx) => (
              <details key={idx} className="group px-5 py-4 open:bg-white/[0.02]">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-semibold text-white">
                  <span>{faq.q}</span>
                  <span className="shrink-0 text-gold-400 text-lg leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs md:text-sm text-royal-300 font-light leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
