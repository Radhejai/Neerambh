import React, { useState } from 'react';
import { Service, Inquiry } from '../types';
import { SERVICES } from '../data';
import { Calculator, Send, CheckCircle, Shield, Briefcase, FileText, User, Mail, Phone, Building, Info, AlertTriangle, MessageCircle } from 'lucide-react';

interface QuoteBuilderProps {
  selectedServiceIds: string[];
  onToggleService: (serviceId: string) => void;
  onInquirySubmitted: (newInquiry: Inquiry) => void;
  setCurrentTab: (tab: string) => void;
}

export default function QuoteBuilder({ selectedServiceIds, onToggleService, onInquirySubmitted, setCurrentTab }: QuoteBuilderProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    businessType: 'Private Limited Company',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInquiry, setSuccessInquiry] = useState<Inquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedServices = SERVICES.filter(s => selectedServiceIds.includes(s.id));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail) {
      setErrorMsg("Name and Email are required to register your enterprise inquiry with Neerambh.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          businessType: formData.businessType,
          selectedServices: selectedServiceIds,
          comments: formData.comments
        })
      });

      if (!response.ok) {
        throw new Error("Neerambh portal failed to lodge inquiry.");
      }

      const data = await response.json();
      setSuccessInquiry(data);
      onInquirySubmitted(data);
      
      // Clear form on success
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        businessType: 'Private Limited Company',
        comments: ''
      });
    } catch (err: any) {
      setErrorMsg("Submission failed. Please check your connection to the Neerambh registry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessTypes = [
    'Private Limited Company',
    'Limited Liability Partnership (LLP)',
    'One Person Company (OPC)',
    'Public Limited Company',
    'Partnership Firm',
    'Sole Proprietorship',
    'Individual Taxpayer / Freelancer',
    'Foreign Venture / Joint Venture'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Services summary / Cost estimator */}
      <div className="lg:col-span-7 space-y-6">
        {/* Direct Contact Channels Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl royal-glow space-y-6">
          <div className="flex items-center space-x-3 border-b border-royal-800/60 pb-3">
            <Phone className="h-5 w-5 text-gold-500" />
            <h2 className="font-serif text-lg font-bold text-white tracking-wider">Direct Contact Channels</h2>
          </div>
          <p className="text-royal-300 text-sm font-light leading-relaxed">
            Reach out to our compliance chancellery directly through any of our secure channels below. Our team is available for urgent corporate setups, taxation reviews, and registrations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Channel */}
            <a 
              href="mailto:neerambh@gmail.com"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-royal-800 bg-royal-950/40 hover:border-gold-500/30 hover:bg-royal-900/40 transition-all text-center group cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-gold-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 text-gold-400" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-bold">Email Us</span>
              <span className="text-xs text-white font-medium mt-1 truncate max-w-full">neerambh@gmail.com</span>
            </a>

            {/* WhatsApp Channel */}
            <a 
              href="https://wa.me/918587025106"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-royal-800 bg-royal-950/40 hover:border-gold-500/30 hover:bg-royal-900/40 transition-all text-center group cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-royal-400 font-bold">WhatsApp</span>
              <span className="text-xs text-white font-medium mt-1">Connect Directly</span>
            </a>
          </div>
        </div>

        {/* Selected / Inquired Services list */}
        {selectedServices.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl royal-glow">
            <div className="flex items-center space-x-3 mb-4">
              <Briefcase className="h-5 w-5 text-gold-500" />
              <h2 className="font-serif text-lg font-bold text-white tracking-wider">Inquired Services</h2>
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {selectedServices.map(service => (
                <div 
                  key={service.id} 
                  className="flex items-center justify-between rounded-lg border border-royal-800 bg-royal-950/50 px-4 py-3 text-sm transition-all hover:border-gold-500/20"
                >
                  <div>
                    <span className="font-medium text-white block">{service.title}</span>
                    <span className="text-[10px] text-gold-400 uppercase tracking-widest">{service.category}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-xs text-royal-400">{service.timeline}</span>
                    <button
                      onClick={() => onToggleService(service.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-royal-800/80 pt-4 mt-6 space-y-2">
              <div className="flex justify-between text-sm text-royal-400">
                <span>Selected Services</span>
                <span className="font-mono">{selectedServices.length} Service Modules</span>
              </div>
              <div className="flex justify-between text-sm text-royal-400">
                <span>Estimated Turnaround</span>
                <span className="font-mono text-gold-400">7-10 Days (Average)</span>
              </div>
            </div>
          </div>
        )}

        {/* Security & Vault Banner */}
        <div className="rounded-xl border border-gold-500/10 bg-gold-500/5 p-4 flex items-start space-x-3.5">
          <Shield className="h-6 w-6 text-gold-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Secure Data Protection</h4>
            <p className="text-[11px] text-royal-300 leading-relaxed font-light mt-0.5">
              Your documentation is stored securely with SSL/TLS encryption. Your business details, files, and contact information are strictly confidential and fully compliant with modern privacy standards.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="lg:col-span-5">
        {successInquiry ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl text-center royal-glow">
            <CheckCircle className="h-12 w-12 text-gold-500 mx-auto mb-4 animate-bounce" />
            <h2 className="font-serif text-lg font-bold text-white tracking-wider mb-2">Inquiry Lodged Successfully</h2>
            <p className="text-royal-300 text-sm font-light mb-6">
              Your inquiry and compliance brief have been securely transmitted to the Neerambh Advisory team.
            </p>

            <div className="bg-royal-950/60 rounded-lg p-4 border border-royal-800 mb-6">
              <span className="block text-[10px] uppercase tracking-widest text-royal-400">Inquiry Tracking ID</span>
              <span className="font-mono text-lg font-bold text-gold-400 tracking-wider select-all">{successInquiry.trackingId}</span>
              <p className="text-[10px] text-royal-400 mt-2">Use this ID to check review progress inside the inquiries panel.</p>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setSuccessInquiry(null);
                  setCurrentTab('inquiries');
                }}
                className="w-full py-2.5 rounded-lg bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
              >
                View Active Inquiries
              </button>
              <button
                onClick={() => setSuccessInquiry(null)}
                className="w-full py-2.5 rounded-lg border border-royal-800 text-royal-300 text-xs font-medium hover:text-white transition-all"
              >
                Inquire For Another Venture
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl royal-glow">
            <div className="flex items-center space-x-3 mb-6 border-b border-royal-800/60 pb-4">
              <Briefcase className="h-5 w-5 text-gold-500" />
              <h2 className="font-serif text-base font-bold text-white tracking-wider">Contact & Inquire</h2>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-royal-400 mb-1 font-semibold">Representative Name *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-royal-500">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full bg-royal-950 border border-royal-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500/40"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-royal-400 mb-1 font-semibold">Corporate Email Address *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-royal-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    name="clientEmail"
                    required
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="corporate@yourcompany.com"
                    className="w-full bg-royal-950 border border-royal-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500/40"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-royal-400 mb-1 font-semibold">Secure Contact Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-royal-500">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    placeholder="+91 / +1 Contact Details"
                    className="w-full bg-royal-950 border border-royal-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500/40"
                  />
                </div>
              </div>

              {/* Business Entity Type */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-royal-400 mb-1 font-semibold">Current / Target Entity Structure</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-royal-500">
                    <Building className="h-4 w-4" />
                  </span>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full bg-royal-950 border border-royal-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500/40 appearance-none"
                  >
                    {businessTypes.map((type, idx) => (
                      <option key={idx} value={type} className="bg-royal-950">{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Specific Comments */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-royal-400 mb-1 font-semibold">Enterprise Briefing / Notes</label>
                <textarea
                  name="comments"
                  rows={3}
                  value={formData.comments}
                  onChange={handleInputChange}
                  placeholder="Outline any key target timelines, state of incorporation, or specific capital thresholds..."
                  className="w-full bg-royal-950 border border-royal-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500/40"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 text-royal-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 hover:shadow-lg hover:shadow-gold-500/10 transition-all disabled:opacity-40 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-royal-950" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Filing Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message & Briefing</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
