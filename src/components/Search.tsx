import React, { useState, useMemo } from 'react';
import { SearchResult } from '@/types';
import { X, Search as SearchIcon, FileText, HelpCircle, Info } from 'lucide-react';

interface SearchProps {
  onClose: () => void;
}

const SEARCH_DATA: SearchResult[] = [
  {
    id: '1',
    type: 'info',
    title: 'Company Name',
    excerpt: 'TechFlow Solutions',
    section: 'Basic Information',
  },
  {
    id: '2',
    type: 'info',
    title: 'About',
    excerpt: 'We are a digital transformation company helping businesses streamline operations',
    section: 'Basic Information',
  },
  {
    id: '3',
    type: 'info',
    title: 'Products & Services',
    excerpt: 'Cloud solutions, API integrations, custom software development, DevOps consulting',
    section: 'Business Details',
  },
  {
    id: '4',
    type: 'info',
    title: 'Target Customers',
    excerpt: 'SMBs in tech, finance, healthcare, and e-commerce sectors',
    section: 'Business Details',
  },
  {
    id: '5',
    type: 'info',
    title: 'Email',
    excerpt: 'hello@techflow.com',
    section: 'Contact Information',
  },
  {
    id: '6',
    type: 'info',
    title: 'Phone',
    excerpt: '+1 (555) 123-4567',
    section: 'Contact Information',
  },
  {
    id: '7',
    type: 'info',
    title: 'Website',
    excerpt: 'www.techflow.com',
    section: 'Contact Information',
  },
  {
    id: '8',
    type: 'info',
    title: 'Address',
    excerpt: '123 Tech Street, San Francisco, CA 94105',
    section: 'Contact Information',
  },
  {
    id: '9',
    type: 'faq',
    title: 'What is your refund policy?',
    excerpt: '30-day money back guarantee if not satisfied',
    section: 'FAQs',
  },
  {
    id: '10',
    type: 'faq',
    title: 'Do you offer 24/7 support?',
    excerpt: 'Yes, we provide 24/7 customer support via email and chat',
    section: 'FAQs',
  },
  {
    id: '11',
    type: 'faq',
    title: 'What payment methods do you accept?',
    excerpt: 'We accept all major credit cards, wire transfer, and ACH',
    section: 'FAQs',
  },
  {
    id: '12',
    type: 'document',
    title: 'Employee Handbook.pdf',
    excerpt: 'Comprehensive employee handbook with policies and procedures',
    section: 'Documents',
  },
  {
    id: '13',
    type: 'document',
    title: 'Service Agreement.docx',
    excerpt: 'Standard service agreement template for clients',
    section: 'Documents',
  },
  {
    id: '14',
    type: 'document',
    title: 'Q4 Financial Report.xlsx',
    excerpt: 'Q4 2023 financial results and analysis',
    section: 'Documents',
  },
  {
    id: '15',
    type: 'document',
    title: 'Product Roadmap 2024.pdf',
    excerpt: 'Product development roadmap for 2024',
    section: 'Documents',
  },
  {
    id: '16',
    type: 'document',
    title: 'Marketing Strategy.pptx',
    excerpt: 'Annual marketing strategy and campaign plans',
    section: 'Documents',
  },
];

export const Search: React.FC<SearchProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return SEARCH_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.excerpt.toLowerCase().includes(lowerQuery) ||
        item.section.toLowerCase().includes(lowerQuery),
    ).slice(0, 10);
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText size={18} className="text-blue-500" />;
      case 'faq':
        return <HelpCircle size={18} className="text-orange-500" />;
      case 'info':
        return <Info size={18} className="text-indigo-500" />;
      default:
        return <SearchIcon size={18} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-2xl max-h-96 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <SearchIcon size={20} className="text-muted-foreground" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company info, documents, FAQs..."
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-lg"
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-muted-foreground">
              <SearchIcon size={32} className="mx-auto mb-3 opacity-50" />
              <p>Start typing to search</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {results.map((result) => (
                <button
                  key={result.id}
                  className="w-full p-4 text-left hover:bg-muted transition-colors flex items-start gap-3"
                >
                  {getIcon(result.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{result.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{result.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-1">{result.section}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="p-3 border-t border-border text-xs text-muted-foreground text-center">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </div>
        )}
      </div>
    </div>
  );
};
