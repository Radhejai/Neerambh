import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SERVICES } from '../data';
import { Check, ArrowLeft, Shield } from 'lucide-react';

interface ServiceDetailPageProps {
  onAddToQuote: (serviceId: string) => void;
}

export default function ServiceDetailPage({ onAddToQuote }: ServiceDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl font-bold text-white mb-3">Service Not Found</h1>
        <p className="text-royal-300 text-sm mb-8">
          We couldn't find the compliance service you're looking for.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Service Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-royal-400 flex items-center space-x-2">
        <Link to="/services" className="hover:text-gold-400 transition-colors">Service Catalog</Link>
        <span>/</span>
        <span className="text-royal-200">{service.title}</span>
      </nav>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-xl royal-glow space-y-8">
        {/* Banner image — container matches the source photo's own aspect
            ratio, so object-cover never has to crop any edge. */}
        {service.image && (
          <img
            src={service.image}
            alt={`${service.title} — Neerambh compliance services`}
            className="w-full object-cover rounded-xl border border-white/10"
            style={{ aspectRatio: service.imageAspect ?? '3/2' }}
            loading="lazy"
          />
        )}

        {/* Header */}
        <header className="border-b border-royal-800 pb-6">
          <span className="inline-block mb-3 px-2 py-0.5 rounded bg-royal-900 border border-royal-800 text-[9px] font-bold text-royal-300 uppercase tracking-wider font-mono">
            Category: {service.category}
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Shield className="h-6 w-6 text-gold-500 flex-shrink-0" />
            {service.title}
          </h1>
          <p className="mt-3 text-royal-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            {service.description}
          </p>
        </header>

        {/* Overview */}
        <section>
          <h2 className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-2">Service Overview</h2>
          <p className="text-royal-200 text-sm font-light leading-relaxed">
            {service.detailedDescription}
          </p>
        </section>

        {/* Logistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-royal-900/30 p-3 rounded-lg border border-royal-800">
            <span className="block text-[9px] uppercase tracking-widest text-royal-400">Processing Timeline</span>
            <span className="text-xs font-semibold text-white">{service.timeline}</span>
          </div>
          <div className="bg-royal-900/30 p-3 rounded-lg border border-royal-800">
            <span className="block text-[9px] uppercase tracking-widest text-royal-400">Government Fees</span>
            <span className="text-xs font-semibold text-white">{service.governmentFees}</span>
          </div>
        </section>

        {/* Documents & Benefits */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <h2 className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-3">Required Documents</h2>
            <ul className="space-y-2">
              {service.documentsRequired.map((doc, idx) => (
                <li key={idx} className="flex items-start text-xs text-royal-300 font-light leading-relaxed">
                  <span className="mr-2 text-gold-400 font-bold select-none">&bull;</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-3">Key Benefits</h2>
            <ul className="space-y-2">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start text-xs text-royal-300 font-light leading-relaxed">
                  <Check className="h-3.5 w-3.5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        {service.faqs && service.faqs.length > 0 && (
          <section>
            <h2 className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-royal-800/60 pb-4 last:border-0">
                  <h3 className="text-sm font-semibold text-white mb-1.5">{faq.q}</h3>
                  <p className="text-xs text-royal-300 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTAs */}
        <div className="border-t border-royal-800 pt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => {
              onAddToQuote(service.id);
              navigate('/contact');
            }}
            className="flex-1 py-3 rounded-lg bg-gold-500 text-royal-950 hover:brightness-110 text-xs font-bold uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-2"
          >
            <span>Inquire About This Service</span>
          </button>
          <Link
            to="/services"
            className="px-6 py-3 rounded-lg border border-royal-700 text-royal-200 hover:text-white text-xs font-semibold uppercase tracking-widest transition-all hover:bg-royal-900/50 text-center"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    </article>
  );
}
