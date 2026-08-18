import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../ServiceCard';
import { SERVICES } from '../../data';
import { Building, Percent, ClipboardCheck, Scale, Award, Landmark } from 'lucide-react';

function ServiceCardLink({ service }: { service: (typeof SERVICES)[number]; key?: string }) {
  const navigate = useNavigate();
  return <ServiceCard service={service} onViewDetails={() => navigate(`/services/${service.slug}`)} />;
}

/** The services catalog (heading, category filter, and grid) — used on both
 * the standalone /services page and inline on the homepage, so the two
 * never drift out of sync with each other. */
export default function ServicesSection({ headingTag: Heading = 'h1' }: { headingTag?: 'h1' | 'h2' }) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services', icon: Landmark },
    { id: 'incorporation', label: 'Incorporation', icon: Building },
    { id: 'tax', label: 'Taxation & Filing', icon: Percent },
    { id: 'audit', label: 'Audit & Assurance', icon: ClipboardCheck },
    { id: 'compliance', label: 'Corporate Compliance', icon: Scale },
    { id: 'registration', label: 'Registrations', icon: Award },
  ];

  const filteredServices =
    activeCategoryFilter === 'all' ? SERVICES : SERVICES.filter((s) => s.category === activeCategoryFilter);

  return (
    <div>
      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">What We Offer</span>
        <Heading className="mt-2 font-serif text-2xl md:text-3xl font-extrabold text-white">
          Compliance &amp; Registration Services
        </Heading>
      </div>

      <div className="space-y-8">
        <div className="flex flex-wrap gap-2 pb-4 border-b border-royal-800/40">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                  isSelected
                    ? 'bg-gold-500 text-royal-950 border-gold-500 font-bold royal-glow-sm'
                    : 'bg-royal-900/30 text-royal-300 border-royal-800 hover:border-royal-700 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCardLink key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
