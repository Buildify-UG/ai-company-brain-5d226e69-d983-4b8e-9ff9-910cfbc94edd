import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { CompanyInfo } from '@/components/CompanyInfo';
import { Documents } from '@/components/Documents';
import { AIChat } from '@/components/AIChat';
import { Search } from '@/components/Search';
import { Settings } from '@/components/Settings';

type Page = 'dashboard' | 'company' | 'documents' | 'chat' | 'settings';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [searchOpen, setSearchOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'company':
        return <CompanyInfo />;
      case 'documents':
        return <Documents />;
      case 'chat':
        return <AIChat />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">AI Company Brain</h1>
          <button
            onClick={() => setSearchOpen(true)}
            className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            🔍 Search
          </button>
        </header>
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </div>
  );
};

export default Index;
