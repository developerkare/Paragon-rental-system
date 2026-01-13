import { useState } from 'react';
import { DashboardPage } from './components/DashboardPage';
import { BillsPage } from './components/BillsPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ComplaintsPage } from './components/ComplaintsPage';
import { FeedbackPage } from './components/FeedbackPage';
import { PaymentPage } from './components/PaymentPage';
import { ProfilePage } from './components/ProfilePage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [billsFilter, setBillsFilter] = useState<'all' | 'pending' | 'paid'>('all');

  const handleRegistrationComplete = () => {
    setCurrentPage('profile');
  };

  const handleNavigateToBills = (filter: 'all' | 'pending' | 'paid') => {
    setBillsFilter(filter);
    setCurrentPage('bills');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigateToBills={handleNavigateToBills} />;
      case 'bills':
        return <BillsPage initialFilter={billsFilter} />;
      case 'registration':
        return <RegistrationPage onRegistrationComplete={handleRegistrationComplete} />;
      case 'complaints':
        return <ComplaintsPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'payment':
        return <PaymentPage />;
      case 'profile':
        return <ProfilePage onPageChange={setCurrentPage} />;
      default:
        return <DashboardPage onNavigateToBills={handleNavigateToBills} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900 transition-colors">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {renderPage()}
          </main>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}