import { LayoutDashboard, FileText, UserPlus, MessageSquare, MessageCircle, CreditCard, Menu, X, Phone, Mail, MessageCircleMore, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { ArrowRight } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bills', label: 'Bills', icon: FileText },
    { id: 'registration', label: 'Registration', icon: UserPlus },
    { id: 'complaints', label: 'Complains', icon: MessageSquare },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50
          transform transition-all duration-300 ease-in-out shadow-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
            <h1 className="text-white tracking-tight flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              Tenant Panel
            </h1>
          </div>
          <nav className="flex-1 p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    group w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 relative overflow-hidden
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20'
                        : 'text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:shadow-md'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                  )}
                  <Icon className={`h-5 w-5 relative z-10 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`} />
                  <span className="relative z-10 font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <button 
              onClick={() => setShowSupportDialog(true)}
              className="w-full p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-left group cursor-pointer"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Need help?
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Contact support anytime
              </p>
            </button>
          </div>
        </div>
      </aside>

      {/* Support Dialog */}
      <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
        <DialogContent className="sm:max-w-[500px] dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 dark:text-gray-100">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <MessageCircleMore className="h-5 w-5 text-white" />
              </div>
              Contact Support
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Our support team is here to help you 24/7. Choose your preferred contact method below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {/* Phone Support */}
            <button
              onClick={() => {
                window.open('tel:+1234567890', '_self');
                toast.success('Opening phone dialer...');
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Call Us</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+1 (234) 567-890</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Email Support */}
            <button
              onClick={() => {
                window.open('mailto:support@tenantpanel.com', '_blank');
                toast.success('Opening email client...');
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Email Us</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">support@tenantpanel.com</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Live Chat */}
            <button
              onClick={() => {
                toast.success('Live chat feature coming soon!');
                setShowSupportDialog(false);
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircleMore className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Live Chat</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Chat with our support team</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Business Hours */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/30 border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Business Hours</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Emergency support available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}