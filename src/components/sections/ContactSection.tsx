import React from 'react';
import QuoteBuilder from '../QuoteBuilder';

interface ContactSectionProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  headingTag?: 'h1' | 'h2';
}

/** Contact heading + form — used on both the standalone /contact page and
 * inline on the homepage. */
export default function ContactSection({ selectedServices, onToggleService, headingTag: Heading = 'h1' }: ContactSectionProps) {
  return (
    <div>
      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">Get In Touch</span>
        <Heading className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white">Contact Our Advisors</Heading>
      </div>
      <QuoteBuilder selectedServiceIds={selectedServices} onToggleService={onToggleService} />
    </div>
  );
}
