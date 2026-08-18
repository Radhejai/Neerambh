import React from 'react';
import QuoteBuilder from '../components/QuoteBuilder';

interface ContactPageProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

export default function ContactPage({ selectedServices, onToggleService }: ContactPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">Get In Touch</span>
        <h1 className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white">Contact Our Advisors</h1>
      </div>
      <QuoteBuilder selectedServiceIds={selectedServices} onToggleService={onToggleService} />
    </div>
  );
}
