import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DollarSign, FileText, AlertCircle, CheckCircle, ArrowUpRight, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface DashboardPageProps {
  onNavigateToBills?: (filter: 'all' | 'pending' | 'paid') => void;
}

export function DashboardPage({ onNavigateToBills }: DashboardPageProps) {
  const stats = [
    {
      title: 'Total Amount Due',
      value: 'KSh 245,000',
      icon: DollarSign,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/40 dark:to-red-900/30',
      iconBg: 'bg-gradient-to-br from-red-500 to-red-600 dark:from-red-500/90 dark:to-red-600/90',
      filter: 'pending' as const,
      trend: '-8%',
      trendUp: false,
      description: 'vs last month',
    },
    {
      title: 'Total Bills',
      value: '12',
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/30',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-500/90 dark:to-blue-600/90',
      filter: 'all' as const,
      trend: '+2',
      trendUp: true,
      description: 'new this month',
    },
    {
      title: 'Pending Bills',
      value: '4',
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/40 dark:to-orange-900/30',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-500/90 dark:to-orange-600/90',
      filter: 'pending' as const,
      trend: '-1',
      trendUp: false,
      description: 'vs last month',
    },
    {
      title: 'Paid Bills',
      value: '8',
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/40 dark:to-green-900/30',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600 dark:from-green-500/90 dark:to-green-600/90',
      filter: 'paid' as const,
      trend: '+3',
      trendUp: true,
      description: 'this month',
    },
  ];

  const recentBills = [
    { id: 1, title: 'Electricity Bill', amount: 'KSh 12,000', dueDate: '2025-11-05', status: 'pending', category: 'Utilities' },
    { id: 2, title: 'Water Bill', amount: 'KSh 4,500', dueDate: '2025-11-10', status: 'pending', category: 'Utilities' },
    { id: 3, title: 'Rent', amount: 'KSh 120,000', dueDate: '2025-11-01', status: 'paid', category: 'Housing' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="dark:text-gray-100 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-muted-foreground flex items-center gap-2">
          Welcome back! Here&apos;s an overview of your account.
          <span className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
            <Calendar className="h-3 w-3" />
            December 2025
          </span>
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;
          return (
            <Card 
              key={stat.title} 
              className="group relative cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 dark:hover:shadow-blue-500/10 border-0 shadow-xl shadow-gray-200/80 dark:shadow-none overflow-hidden animate-in slide-in-from-bottom duration-500 bg-white dark:bg-gray-800/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onNavigateToBills?.(stat.filter)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 ${stat.bgColor} opacity-40 group-hover:opacity-60 transition-all duration-300`} />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <CardHeader className="relative flex flex-row items-center justify-between pb-3 space-y-0">
                <div className="space-y-1.5">
                  <CardTitle className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                    {stat.title}
                  </CardTitle>
                  <div className="flex items-baseline gap-2">
                    <div className={`text-3xl tracking-tight ${stat.color} drop-shadow-sm`}>
                      {stat.value}
                    </div>
                  </div>
                </div>
                <div className={`p-3 rounded-2xl ${stat.iconBg} shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  <Icon className="h-6 w-6 text-white drop-shadow-md" />
                </div>
              </CardHeader>
              <CardContent className="relative pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm">
                    <TrendIcon className={`h-4 w-4 ${stat.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                    <span className={`${stat.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {stat.trend}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {stat.description}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Bills Card */}
      <Card className="dark:bg-gray-800/50 dark:border-gray-700/50 border-0 shadow-2xl shadow-gray-200/80 dark:shadow-none backdrop-blur-sm overflow-hidden relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-gray-800 dark:via-blue-950/10 dark:to-purple-950/5 pointer-events-none" />
        
        <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-blue-50/30 dark:to-blue-950/10">
          <div className="flex items-center justify-between">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Recent Bills
              </span>
            </CardTitle>
            <button
              onClick={() => onNavigateToBills?.('all')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors group"
            >
              View All
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="relative pt-6">
          <div className="space-y-3">
            {recentBills.map((bill, index) => (
              <div 
                key={bill.id} 
                className="group relative flex items-center justify-between p-5 border border-gray-200/80 dark:border-gray-700/50 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 dark:hover:from-blue-950/20 dark:hover:to-purple-950/10 dark:bg-gray-800/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 hover:border-blue-300 dark:hover:border-blue-900/50 cursor-pointer animate-in slide-in-from-left duration-500 hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onNavigateToBills?.(bill.status === 'paid' ? 'paid' : 'pending')}
              >
                {/* Left Side */}
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    bill.status === 'paid' 
                      ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30' 
                      : 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30'
                  } group-hover:scale-110 transition-transform`}>
                    {bill.status === 'paid' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      {bill.title}
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-0.5 rounded-full">
                        {bill.category}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Due: {bill.dueDate}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                  <p className="dark:text-gray-100 text-xl tracking-tight">{bill.amount}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-4 py-2 rounded-xl text-sm shadow-lg backdrop-blur-sm ${
                        bill.status === 'paid'
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white dark:from-green-600 dark:to-green-700'
                          : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white dark:from-orange-600 dark:to-orange-700'
                      }`}
                    >
                      {bill.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}