import { useState, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from './ui/sonner';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function DashboardLayout({ children, currentPage, onPageChange }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900 transition-colors">
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} onPageChange={onPageChange} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
