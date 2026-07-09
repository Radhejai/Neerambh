export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: 'incorporation' | 'tax' | 'compliance' | 'audit' | 'registration';
  priceEstimate: string;
  timeline: string;
  governmentFees: string;
  documentsRequired: string[];
  benefits: string[];
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendations?: string[]; // Recommended Service IDs
}

export interface Inquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  businessType: string;
  selectedServices: string[]; // Service IDs
  comments: string;
  status: 'submitted' | 'reviewing' | 'documentation_pending' | 'completed';
  createdAt: string;
  trackingId: string;
}
