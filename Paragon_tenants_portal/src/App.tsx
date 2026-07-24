import { useState } from 'react';
import { DashboardPage } from './components/DashboardPage';
import { BillsPage } from './components/BillsPage';
import { LeasePage } from './components/LeasePage';
import { RegistrationPage } from './components/RegistrationPage';
import { ComplaintsPage } from './components/ComplaintsPage';
import { FeedbackPage } from './components/FeedbackPage';
import { PaymentPage } from './components/PaymentPage';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
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
      case 'lease':
        return <LeasePage />;
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

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show dashboard when authenticated
  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}