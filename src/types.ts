export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: 'incorporation' | 'tax' | 'compliance' | 'audit' | 'registration';
  timeline: string;
  governmentFees: string;
  documentsRequired: string[];
  faqs?: { q: string; a: string }[];
  benefits: string[];
  /** Path under /public, e.g. /images/services/gst-registration.jpg */
  image?: string;
  /** Native aspect ratio of `image` (width/height) — used so the image
   * container matches it exactly and object-cover never crops the photo. */
  imageAspect?: '3/2' | '16/9';
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
