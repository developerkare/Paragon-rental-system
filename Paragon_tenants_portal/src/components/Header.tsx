import { useState } from 'react';
import { Bell, User, X, Check, AlertCircle, DollarSign, FileText, MessageSquare, Info, Sun, Moon, Monitor, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface HeaderProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

interface Notification {
  id: string;
  type: 'bill' | 'payment' | 'complaint' | 'announcement' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'bill',
      title: 'New Bill Generated',
      message: 'Your December 2024 rent bill of KSh 120,000 has been generated.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Payment Reminder',
      message: 'Your rent payment is due in 3 days. Please make the payment to avoid late fees.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'complaint',
      title: 'Complaint Update',
      message: 'Your complaint #C123 regarding kitchen sink has been resolved.',
      time: '1 day ago',
      read: false,
    },
    {
      id: '4',
      type: 'announcement',
      title: 'Building Maintenance',
      message: 'Scheduled maintenance on Dec 5th from 9 AM to 12 PM. Water supply will be interrupted.',
      time: '2 days ago',
      read: true,
    },
    {
      id: '5',
      type: 'payment',
      title: 'Payment Confirmed',
      message: 'Your payment of KSh 120,000 for November 2024 has been successfully processed.',
      time: '1 week ago',
      read: true,
    },
  ]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'bill':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'complaint':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'announcement':
        return <Info className="h-5 w-5 text-purple-600" />;
      case 'reminder':
        return <Bell className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'bill':
        return 'bg-blue-50';
      case 'payment':
        return 'bg-green-50';
      case 'complaint':
        return 'bg-orange-50';
      case 'announcement':
        return 'bg-purple-50';
      case 'reminder':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setIsNotificationOpen(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'system':
        return <Monitor className="h-5 w-5" />;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 transition-colors shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1 md:ml-64 md:hidden">
          {/* Spacer for mobile menu button */}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications Popover */}
          <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[20px] h-[20px] bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs px-1.5 shadow-lg animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 dark:bg-gray-800/95 dark:border-gray-700/50 backdrop-blur-xl shadow-2xl border-0" align="end">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50">
                <div>
                  <h4 className="text-gray-900 dark:text-gray-100 font-semibold">Notifications</h4>
                  {unreadCount > 0 && (
                    <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">No notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">You're all caught up!</p>
                </div>
              ) : (
                <>
                  <ScrollArea className="h-[400px]">
                    <div className="divide-y dark:divide-gray-700">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                            !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`h-10 w-10 rounded-lg ${getNotificationBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className={`text-sm ${!notification.read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0 mt-1.5"></div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-500">{notification.time}</span>
                                <div className="flex gap-1">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => markAsRead(notification.id)}
                                      className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                                    >
                                      Mark read
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteNotification(notification.id)}
                                    className="h-7 w-7 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-3 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => {
                          setIsNotificationOpen(false);
                          // Could navigate to a full notifications page
                        }}
                      >
                        View All
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 dark:border-gray-600"
                        onClick={clearAllNotifications}
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all">
                {getThemeIcon()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-gray-800/95 dark:border-gray-700/50 backdrop-blur-xl border-0 shadow-2xl">
              <DropdownMenuLabel className="dark:text-gray-200">Theme</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700/50" />
              <DropdownMenuItem 
                onClick={() => setTheme('light')}
                className="dark:text-gray-300 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
                {theme === 'light' && <Check className="h-4 w-4 ml-auto text-blue-600" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('dark')}
                className="dark:text-gray-300 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
                {theme === 'dark' && <Check className="h-4 w-4 ml-auto text-blue-600" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('system')}
                className="dark:text-gray-300 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                <Monitor className="h-4 w-4 mr-2" />
                System
                {theme === 'system' && <Check className="h-4 w-4 ml-auto text-blue-600" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-gray-800/95 dark:border-gray-700/50 backdrop-blur-xl border-0 shadow-2xl w-56">
              <DropdownMenuLabel className="dark:text-gray-200">
                <div className="flex flex-col">
                  <span>My Account</span>
                  {user && (
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </span>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700/50" />
              <DropdownMenuItem 
                onClick={() => onPageChange?.('profile')}
                className="dark:text-gray-300 dark:hover:bg-gray-700/50 cursor-pointer"
              >
                <User className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700/50 cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-gray-700/50" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="dark:text-gray-300 dark:hover:bg-gray-700/50 cursor-pointer text-red-600 dark:text-red-400"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}