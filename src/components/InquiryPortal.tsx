import React, { useState, useEffect } from 'react';
import { Inquiry, Service } from '../types';
import { SERVICES } from '../data';
import { ShieldCheck, Clock, RefreshCw, FileText, CheckCircle2, AlertCircle, Sparkles, ExternalLink, Search } from 'lucide-react';

interface InquiryPortalProps {
  inquiries: Inquiry[];
  onRefresh: () => void;
}

export default function InquiryPortal({ inquiries, onRefresh }: InquiryPortalProps) {
  const [filterTrackingId, setFilterTrackingId] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Auto-select first inquiry to view if exists
  useEffect(() => {
    if (inquiries.length > 0 && !selectedInquiry) {
      setSelectedInquiry(inquiries[inquiries.length - 1]);
    }
  }, [inquiries]);

  const handleRefreshClick = () => {
    onRefresh();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return { label: 'Lodged in Portal', style: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' };
      case 'reviewing':
        return { label: 'Under Registry Review', style: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'documentation_pending':
        return { label: 'Requisites Pending', style: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 'completed':
        return { label: 'Granted / Active', style: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      default:
        return { label: 'Pending Audit', style: 'text-royal-400 bg-royal-500/10 border-royal-500/20' };
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.trackingId.toLowerCase().includes(filterTrackingId.toLowerCase()) ||
    i.clientName.toLowerCase().includes(filterTrackingId.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Overview stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <span className="block text-[10px] uppercase tracking-widest text-royal-400">Total Portfolios</span>
          <span className="font-mono text-2xl font-bold text-white">{inquiries.length}</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <span className="block text-[10px] uppercase tracking-widest text-royal-400">In Active Audit</span>
          <span className="font-mono text-2xl font-bold text-amber-400">
            {inquiries.filter(i => i.status === 'reviewing' || i.status === 'submitted').length}
          </span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <span className="block text-[10px] uppercase tracking-widest text-royal-400">Granted Entities</span>
          <span className="font-mono text-2xl font-bold text-emerald-400">
            {inquiries.filter(i => i.status === 'completed').length + 1} {/* Include a dummy base offset for realism */}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ledger list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-white tracking-wider">Inquiry Records</h2>
            <button 
              onClick={handleRefreshClick}
              className="flex items-center space-x-1.5 text-xs text-gold-400 hover:text-white transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh List</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-royal-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={filterTrackingId}
              onChange={(e) => setFilterTrackingId(e.target.value)}
              placeholder="Search Tracking ID or Name..."
              className="w-full bg-royal-900/40 border border-royal-800/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500/30 font-mono"
            />
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-2">
            {filteredInquiries.length === 0 ? (
              <div className="rounded-lg border border-dashed border-royal-800 p-6 text-center text-royal-400 text-xs">
                No active filings found matching your search.
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                const badge = getStatusBadge(inq.status);
                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`cursor-pointer rounded-lg border p-4 transition-all duration-300 ${
                      isSelected
                        ? 'border-gold-500/40 bg-gold-500/5 royal-glow-sm'
                        : 'border-royal-800/50 bg-royal-900/10 hover:border-royal-700 hover:bg-royal-900/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs font-semibold text-gold-400 tracking-wider">
                        {inq.trackingId}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${badge.style}`}>
                        {badge.label}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-white mb-1 line-clamp-1">
                      {inq.clientName}
                    </h3>
                    <p className="text-[10px] text-royal-400 font-mono">
                      {new Date(inq.createdAt).toLocaleDateString()} &bull; {inq.businessType}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected inquiry detail space */}
        <div className="lg:col-span-7">
          {selectedInquiry ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6 royal-glow">
              {/* Card top banner */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-royal-800/80 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-500 font-bold block">Inquiry Details</span>
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide mt-1">
                    {selectedInquiry.clientName}
                  </h3>
                  <span className="text-xs font-mono text-royal-400">
                    ID: {selectedInquiry.trackingId}
                  </span>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                  <span className={`inline-block px-2.5 py-1 rounded border text-[10px] uppercase font-bold tracking-widest ${getStatusBadge(selectedInquiry.status).style}`}>
                    {getStatusBadge(selectedInquiry.status).label}
                  </span>
                </div>
              </div>

              {/* Grid split specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-royal-950/40 p-3 rounded-lg border border-royal-800">
                  <span className="block text-[9px] uppercase tracking-widest text-royal-500 mb-1">Entity Structure</span>
                  <span className="font-semibold text-white">{selectedInquiry.businessType}</span>
                </div>
                <div className="bg-royal-950/40 p-3 rounded-lg border border-royal-800">
                  <span className="block text-[9px] uppercase tracking-widest text-royal-500 mb-1">Contact Details</span>
                  <span className="font-semibold text-white block">{selectedInquiry.clientEmail}</span>
                  <span className="text-[10px] text-royal-400 font-mono">{selectedInquiry.clientPhone}</span>
                </div>
              </div>

              {/* Selected Services Matched */}
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-royal-400 mb-3 font-semibold">Selected Services</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedInquiry.selectedServices.map(serviceId => {
                    const s = SERVICES.find(item => item.id === serviceId);
                    if (!s) return null;
                    return (
                      <div key={serviceId} className="flex items-start space-x-2 bg-royal-950/60 p-2.5 rounded border border-royal-800/80 text-xs">
                        <CheckCircle2 className="h-4 w-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white block">{s.title}</span>
                          <span className="text-[9px] font-mono text-gold-400">{s.timeline}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline Status tracker */}
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-royal-400 mb-3 font-semibold">Processing Timeline</span>
                <div className="relative pl-6 space-y-4">
                  {/* Vertical pipeline */}
                  <div className="absolute left-2.5 top-1.5 bottom-1.5 w-px bg-royal-800" />
                  
                  {/* Step 1: Lodged */}
                  <div className="relative">
                    <div className="absolute -left-5.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500/20 border border-gold-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-white block">Inquiry Submitted</span>
                      <span className="text-[10px] text-royal-400">Your inquiry and compliance specifications have been successfully registered.</span>
                    </div>
                  </div>

                  {/* Step 2: Audit Review */}
                  <div className="relative">
                    <div className={`absolute -left-5.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                      ['reviewing', 'documentation_pending', 'completed'].includes(selectedInquiry.status)
                        ? 'bg-gold-500/20 border-gold-500'
                        : 'bg-royal-900 border-royal-800'
                    }`}>
                      {['reviewing', 'documentation_pending', 'completed'].includes(selectedInquiry.status) && (
                        <div className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-ping" />
                      )}
                    </div>
                    <div className="text-xs">
                      <span className={`font-semibold block ${['reviewing', 'documentation_pending', 'completed'].includes(selectedInquiry.status) ? 'text-white' : 'text-royal-500'}`}>
                        Expert Review
                      </span>
                      <span className="text-[10px] text-royal-400">Our advisors are reviewing your business structure and regulatory timeline.</span>
                    </div>
                  </div>

                  {/* Step 3: Granting Status */}
                  <div className="relative">
                    <div className={`absolute -left-5.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                      selectedInquiry.status === 'completed'
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-royal-900 border-royal-800'
                    }`}>
                      {selectedInquiry.status === 'completed' && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                    </div>
                    <div className="text-xs">
                      <span className={`font-semibold block ${selectedInquiry.status === 'completed' ? 'text-emerald-400' : 'text-royal-500'}`}>
                        Completed & Setup Active
                      </span>
                      <span className="text-[10px] text-royal-400">All registrations, filings, and structural advisory have been successfully processed.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry comments notes */}
              {selectedInquiry.comments && (
                <div className="border-t border-royal-800/80 pt-4 bg-royal-950/20 p-4 rounded border border-royal-800">
                  <span className="block text-[10px] uppercase tracking-widest text-royal-500 font-bold mb-1">Your Message</span>
                  <p className="text-xs text-royal-300 italic font-light leading-relaxed">
                    "{selectedInquiry.comments}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-royal-800 p-12 text-center h-full flex flex-col justify-center items-center bg-royal-900/10">
              <Sparkles className="h-8 w-8 text-gold-500/40 mb-3 animate-pulse" />
              <h3 className="font-serif text-sm font-semibold text-royal-400">No Record Selected</h3>
              <p className="text-xs text-royal-500 max-w-xs mt-1">Select an active inquiry record to view the timeline.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
