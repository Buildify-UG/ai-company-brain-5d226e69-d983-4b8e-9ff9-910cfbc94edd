import React, { useState } from 'react';
import { FileText, MessageCircle, Activity, TrendingUp } from 'lucide-react';
import { Company, Document, ActivityItem } from '@/types';

// Sample data
const SAMPLE_COMPANY: Company = {
  id: '1',
  name: 'TechFlow Solutions',
  about: 'We are a digital transformation company helping businesses streamline operations.',
  products: 'Cloud solutions, API integrations, custom software development',
  targetCustomers: 'SMBs in tech, finance, and healthcare sectors',
  contactInfo: {
    email: 'hello@techflow.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105',
    website: 'www.techflow.com',
  },
  policies: 'Standard business policies including data protection and compliance',
  faqs: [
    { id: '1', question: 'What is your refund policy?', answer: '30-day money back guarantee' },
    { id: '2', question: 'Do you offer support?', answer: '24/7 customer support available' },
  ],
  notes: 'Founded in 2020, focused on innovation and customer success',
};

const SAMPLE_DOCUMENTS: Document[] = [
  { id: '1', name: 'Company Handbook.pdf', type: 'PDF', size: 2.4, uploadDate: '2024-01-15', description: 'Employee handbook and policies' },
  { id: '2', name: 'Service Agreement.docx', type: 'DOCX', size: 1.1, uploadDate: '2024-01-10', description: 'Standard service agreement' },
  { id: '3', name: 'Q4 Financial Report.xlsx', type: 'XLSX', size: 0.8, uploadDate: '2024-01-08', description: 'Q4 2023 financial results' },
];

const SAMPLE_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'document_upload', description: 'Q4 Financial Report uploaded', timestamp: '2024-01-15 10:30 AM' },
  { id: '2', type: 'info_update', description: 'Company information updated', timestamp: '2024-01-14 3:45 PM' },
  { id: '3', type: 'chat_message', description: 'Asked: "What services do we offer?"', timestamp: '2024-01-13 2:15 PM' },
  { id: '4', type: 'document_upload', description: 'Service Agreement uploaded', timestamp: '2024-01-10 9:00 AM' },
];

export const Dashboard: React.FC = () => {
  const [company] = useState<Company>(SAMPLE_COMPANY);
  const [documents] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [activity] = useState<ActivityItem[]>(SAMPLE_ACTIVITY);

  const stats = [
    { label: 'Documents', value: documents.length, icon: FileText, color: 'bg-blue-500' },
    { label: 'Company Info Sections', value: 8, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Chat Messages', value: 24, icon: MessageCircle, color: 'bg-purple-500' },
    { label: 'FAQs', value: company.faqs.length, icon: Activity, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">{company.name}</h1>
        <p className="text-muted-foreground">{company.about}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-indigo-500">Active</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg hover:shadow-lg transition-shadow font-semibold">
                💬 Ask AI Assistant
              </button>
              <button className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-lg hover:shadow-lg transition-shadow font-semibold">
                📄 Upload Document
              </button>
              <button className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-lg hover:shadow-lg transition-shadow font-semibold">
                ✏️ Edit Company Info
              </button>
              <button className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-lg hover:shadow-lg transition-shadow font-semibold">
                ⚙️ Settings
              </button>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Recent Documents</h2>
            <div className="space-y-3">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{doc.size} MB</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activity.map((item) => (
              <div key={item.id} className="pb-4 border-b border-border last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground font-medium">{item.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Products & Services</h3>
          <p className="text-muted-foreground">{company.products}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Target Customers</h3>
          <p className="text-muted-foreground">{company.targetCustomers}</p>
        </div>
      </div>
    </div>
  );
};
