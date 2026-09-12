import React, { useState } from 'react';
import { Company, FAQ } from '@/types';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const SAMPLE_COMPANY: Company = {
  id: '1',
  name: 'TechFlow Solutions',
  about: 'We are a digital transformation company helping businesses streamline operations and accelerate growth through innovative technology solutions.',
  products: 'Cloud solutions, API integrations, custom software development, DevOps consulting',
  targetCustomers: 'SMBs in tech, finance, healthcare, and e-commerce sectors',
  contactInfo: {
    email: 'hello@techflow.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105',
    website: 'www.techflow.com',
  },
  policies: 'Data Protection: All customer data is encrypted at rest and in transit. Compliance: SOC 2 Type II certified. Refunds: 30-day money-back guarantee.',
  faqs: [
    { id: '1', question: 'What is your refund policy?', answer: '30-day money back guarantee if not satisfied' },
    { id: '2', question: 'Do you offer 24/7 support?', answer: 'Yes, we provide 24/7 customer support via email and chat' },
    { id: '3', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, wire transfer, and ACH' },
  ],
  notes: 'Founded in 2020, focused on innovation and customer success. Team of 45 professionals.',
};

export const CompanyInfo: React.FC = () => {
  const [company, setCompany] = useState<Company>(SAMPLE_COMPANY);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [showNewFaqForm, setShowNewFaqForm] = useState(false);

  const handleEdit = (section: string, value: any) => {
    setEditingSection(section);
    setEditValues({ ...value });
  };

  const handleSave = (section: string) => {
    setCompany({ ...company, ...editValues });
    setEditingSection(null);
  };

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer) {
      const faq: FAQ = {
        id: Date.now().toString(),
        question: newFaq.question,
        answer: newFaq.answer,
      };
      setCompany({
        ...company,
        faqs: [...company.faqs, faq],
      });
      setNewFaq({ question: '', answer: '' });
      setShowNewFaqForm(false);
    }
  };

  const handleDeleteFaq = (id: string) => {
    setCompany({
      ...company,
      faqs: company.faqs.filter((faq) => faq.id !== id),
    });
  };

  const EditableField: React.FC<{ label: string; value: string; section: string; field: string }> = ({
    label,
    value,
    section,
    field,
  }) => {
    const isEditing = editingSection === section;
    return (
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
        {isEditing ? (
          <textarea
            value={editValues[field] || ''}
            onChange={(e) => setEditValues({ ...editValues, [field]: e.target.value })}
            className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
        ) : (
          <p className="text-muted-foreground bg-muted p-4 rounded-lg">{value}</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8">Company Information</h1>

      {/* Basic Info */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Basic Information</h2>
          {editingSection !== 'basic' ? (
            <button
              onClick={() => handleEdit('basic', { name: company.name, about: company.about })}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Edit2 size={18} /> Edit
            </button>
          ) : (
            <button
              onClick={() => handleSave('basic')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={18} /> Save
            </button>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">Company Name</label>
          {editingSection === 'basic' ? (
            <input
              type="text"
              value={editValues.name || ''}
              onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-2xl font-bold text-foreground">{company.name}</p>
          )}
        </div>

        <EditableField label="About" value={company.about} section="basic" field="about" />
      </div>

      {/* Business Details */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Business Details</h2>
          {editingSection !== 'business' ? (
            <button
              onClick={() =>
                handleEdit('business', {
                  products: company.products,
                  targetCustomers: company.targetCustomers,
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Edit2 size={18} /> Edit
            </button>
          ) : (
            <button
              onClick={() => handleSave('business')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={18} /> Save
            </button>
          )}
        </div>

        <EditableField label="Products & Services" value={company.products} section="business" field="products" />
        <EditableField label="Target Customers" value={company.targetCustomers} section="business" field="targetCustomers" />
      </div>

      {/* Contact Information */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
          {editingSection !== 'contact' ? (
            <button
              onClick={() => handleEdit('contact', company.contactInfo)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Edit2 size={18} /> Edit
            </button>
          ) : (
            <button
              onClick={() => {
                setCompany({ ...company, contactInfo: editValues });
                setEditingSection(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={18} /> Save
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Email', key: 'email' },
            { label: 'Phone', key: 'phone' },
            { label: 'Address', key: 'address' },
            { label: 'Website', key: 'website' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-semibold text-foreground mb-2">{field.label}</label>
              {editingSection === 'contact' ? (
                <input
                  type="text"
                  value={editValues[field.key] || ''}
                  onChange={(e) => setEditValues({ ...editValues, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-muted-foreground bg-muted p-3 rounded-lg">{company.contactInfo[field.key as keyof typeof company.contactInfo]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Business Policies</h2>
          {editingSection !== 'policies' ? (
            <button
              onClick={() => handleEdit('policies', { policies: company.policies })}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Edit2 size={18} /> Edit
            </button>
          ) : (
            <button
              onClick={() => handleSave('policies')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={18} /> Save
            </button>
          )}
        </div>

        <EditableField label="Policies" value={company.policies} section="policies" field="policies" />
      </div>

      {/* FAQs */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          {!showNewFaqForm && (
            <button
              onClick={() => setShowNewFaqForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus size={18} /> Add FAQ
            </button>
          )}
        </div>

        {showNewFaqForm && (
          <div className="bg-muted p-4 rounded-lg mb-6">
            <input
              type="text"
              placeholder="Question"
              value={newFaq.question}
              onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Answer"
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddFaq}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Save FAQ
              </button>
              <button
                onClick={() => setShowNewFaqForm(false)}
                className="flex-1 px-4 py-2 bg-muted border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {company.faqs.map((faq) => (
            <div key={faq.id} className="bg-muted p-4 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-foreground">{faq.question}</p>
                <button
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground p-2 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-muted-foreground text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Important Notes</h2>
          {editingSection !== 'notes' ? (
            <button
              onClick={() => handleEdit('notes', { notes: company.notes })}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Edit2 size={18} /> Edit
            </button>
          ) : (
            <button
              onClick={() => handleSave('notes')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={18} /> Save
            </button>
          )}
        </div>

        <EditableField label="Notes" value={company.notes} section="notes" field="notes" />
      </div>
    </div>
  );
};
