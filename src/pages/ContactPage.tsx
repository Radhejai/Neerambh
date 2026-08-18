import React from 'react';
import ContactSection from '../components/sections/ContactSection';

interface ContactPageProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

export default function ContactPage({ selectedServices, onToggleService }: ContactPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ContactSection selectedServices={selectedServices} onToggleService={onToggleService} headingTag="h1" />
    </div>
  );
}
