export interface Company {
  id: string;
  name: string;
  about: string;
  products: string;
  targetCustomers: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  policies: string;
  faqs: FAQ[];
  notes: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  description: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  type: 'document_upload' | 'info_update' | 'chat_message';
  description: string;
  timestamp: string;
}

export interface SearchResult {
  id: string;
  type: 'info' | 'document' | 'faq';
  title: string;
  excerpt: string;
  section?: string;
}
