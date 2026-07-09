import React from 'react';
import { Service } from '../types';
import { Landmark, Percent, ShieldAlert, Award, FileText, CheckCircle, Clock, Coins, Check, Plus, AlertCircle, ArrowUpRight } from 'lucide-react';

export interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
}

export default function ServiceCard({ service, onViewDetails }: ServiceCardProps & { key?: string }) {
  // Map categories to icons and colors
  const getCategoryMeta = (category: string) => {
    switch (category) {
      case 'incorporation':
        return { icon: Landmark, label: 'Incorporation', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' };
      case 'tax':
        return { icon: Percent, label: 'Taxation & Filing', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      case 'audit':
        return { icon: ShieldAlert, label: 'Audit & Assurance', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'compliance':
        return { icon: FileText, label: 'Corporate Compliance', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
      case 'registration':
      default:
        return { icon: Award, label: 'Registration & Licenses', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
    }
  };

  const { icon: Icon, label: catLabel, color: catColor } = getCategoryMeta(service.category);

  return (
    <div 
      onClick={() => onViewDetails(service)}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-gold-500/50 hover:bg-white/10 royal-glow-hover cursor-pointer"
    >
      {/* Dynamic Gold Gradient Border Accent */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div>
        {/* Header Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${catColor}`}>
            <Icon className="h-3 w-3" />
            <span>{catLabel}</span>
          </span>
          <span className="font-mono text-xs text-gold-400 tracking-wider">
            {service.timeline}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-white mb-2 tracking-wide group-hover:text-gold-300 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-royal-300 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Footer Details */}
      <div className="border-t border-royal-800/60 pt-4 mt-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-royal-400">Filing Jurisdiction</span>
            <span className="font-mono text-xs font-semibold text-white">National & Global</span>
          </div>
          <span className="text-xs font-sans text-gold-400 group-hover:text-white transition-colors flex items-center space-x-1 underline decoration-gold-500/30 underline-offset-4">
            <AlertCircle className="h-3 w-3" />
            <span>View Information</span>
          </span>
        </div>

        <div className="flex space-x-2">
          {/* Action button to view related info of this service */}
          <button
            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 bg-gold-500 text-royal-950 hover:brightness-110 border border-gold-500"
          >
            <span>View Requisites & Benefits</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
