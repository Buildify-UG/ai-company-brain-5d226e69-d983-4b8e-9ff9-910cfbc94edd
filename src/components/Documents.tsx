import React, { useState } from 'react';
import { Document } from '@/types';
import { FileText, Download, Trash2, Plus, Upload } from 'lucide-react';

const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: '1',
    name: 'Employee Handbook.pdf',
    type: 'PDF',
    size: 2.4,
    uploadDate: '2024-01-15',
    description: 'Comprehensive employee handbook with policies and procedures',
  },
  {
    id: '2',
    name: 'Service Agreement.docx',
    type: 'DOCX',
    size: 1.1,
    uploadDate: '2024-01-10',
    description: 'Standard service agreement template for clients',
  },
  {
    id: '3',
    name: 'Q4 Financial Report.xlsx',
    type: 'XLSX',
    size: 0.8,
    uploadDate: '2024-01-08',
    description: 'Q4 2023 financial results and analysis',
  },
  {
    id: '4',
    name: 'Product Roadmap 2024.pdf',
    type: 'PDF',
    size: 3.2,
    uploadDate: '2024-01-05',
    description: 'Product development roadmap for 2024',
  },
  {
    id: '5',
    name: 'Marketing Strategy.pptx',
    type: 'PPTX',
    size: 5.6,
    uploadDate: '2024-01-01',
    description: 'Annual marketing strategy and campaign plans',
  },
];

export const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', type: '', size: 0, description: '' });

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleUpload = () => {
    if (newDoc.name && newDoc.type && newDoc.description) {
      const doc: Document = {
        id: Date.now().toString(),
        name: newDoc.name,
        type: newDoc.type,
        size: newDoc.size || Math.random() * 10,
        uploadDate: new Date().toISOString().split('T')[0],
        description: newDoc.description,
      };
      setDocuments([doc, ...documents]);
      setNewDoc({ name: '', type: '', size: 0, description: '' });
      setShowUploadForm(false);
    }
  };

  const getFileIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      PDF: '📄',
      DOCX: '📝',
      XLSX: '📊',
      PPTX: '🎯',
      TXT: '📃',
      ZIP: '📦',
    };
    return iconMap[type] || '📎';
  };

  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Documents</h1>
          <p className="text-muted-foreground">
            {documents.length} documents • {totalSize.toFixed(1)} MB total
          </p>
        </div>
        {!showUploadForm && (
          <button
            onClick={() => setShowUploadForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
          >
            <Plus size={20} /> Upload Document
          </button>
        )}
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-card border-2 border-indigo-500 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Upload New Document</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Document Name</label>
              <input
                type="text"
                placeholder="e.g., Company Policy.pdf"
                value={newDoc.name}
                onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">File Type</label>
                <select
                  value={newDoc.type}
                  onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select type</option>
                  <option value="PDF">PDF</option>
                  <option value="DOCX">Word Document</option>
                  <option value="XLSX">Excel Spreadsheet</option>
                  <option value="PPTX">PowerPoint</option>
                  <option value="TXT">Text File</option>
                  <option value="ZIP">Archive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">File Size (MB)</label>
                <input
                  type="number"
                  placeholder="0.5"
                  step="0.1"
                  value={newDoc.size || ''}
                  onChange={(e) => setNewDoc({ ...newDoc, size: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
              <textarea
                placeholder="Describe what this document contains..."
                value={newDoc.description}
                onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                Upload Document
              </button>
              <button
                onClick={() => setShowUploadForm(false)}
                className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-accent transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="space-y-3">
        {documents.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">No documents yet</p>
            <p className="text-muted-foreground text-sm mb-6">Upload your first document to get started</p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold inline-flex items-center gap-2"
            >
              <Upload size={18} /> Upload Document
            </button>
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-2xl">
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{doc.name}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{doc.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size} MB</span>
                    <span>•</span>
                    <span>{doc.uploadDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors">
                  <Download size={20} />
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Storage Info */}
      {documents.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">Storage Usage</h3>
          <div className="w-full bg-muted rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${Math.min((totalSize / 1000) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {totalSize.toFixed(1)} MB of 1000 MB used ({((totalSize / 1000) * 100).toFixed(1)}%)
          </p>
        </div>
      )}
    </div>
  );
};
