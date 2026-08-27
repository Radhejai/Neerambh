import React from 'react';
import { PhoneCall, FileStack, Send, CheckCheck, PackageCheck } from 'lucide-react';

const STEPS = [
  {
    icon: PhoneCall,
    title: 'Free Consultation',
    description: 'Tell us what you need — we assess your requirements and recommend the right service and timeline.',
  },
  {
    icon: FileStack,
    title: 'Document Collection',
    description: 'We share a simple checklist and collect everything securely — no repeated back-and-forth.',
  },
  {
    icon: Send,
    title: 'Application & Filing',
    description: 'Our team prepares and submits your application or return accurately, on the correct government portal.',
  },
  {
    icon: CheckCheck,
    title: 'Verification & Follow-up',
    description: 'We track your application, respond to any government queries, and keep you updated at every stage.',
  },
  {
    icon: PackageCheck,
    title: 'Delivery & Ongoing Support',
    description: 'You receive your certificate or filed return, plus reminders and support for what comes next.',
  },
];

export default function ProcessSection({ headingTag: Heading = 'h2' }: { headingTag?: 'h1' | 'h2' }) {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold">How We Work</span>
        <Heading className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white">
          Five Steps. Zero Guesswork.
        </Heading>
        <p className="mt-3 text-royal-300 text-sm md:text-base font-light leading-relaxed">
          A clear, predictable process from the first call to the certificate in your hand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-gold-500/30 transition-all duration-300"
            >
              <span className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-royal-950 text-xs font-bold font-mono">
                {i + 1}
              </span>
              <div className="h-10 w-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="font-serif text-sm font-bold text-white mb-2 tracking-wide">{step.title}</h3>
              <p className="text-royal-300 text-xs font-light leading-relaxed">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
