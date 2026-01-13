import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Search, Download, Printer, Eye, ArrowUpDown, CreditCard, Building2, Smartphone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Bill {
  id: number;
  billNo: string;
  title: string;
  amount: number;
  status: 'paid' | 'pending';
  dueDate: string;
  issueDate: string;
  category: string;
}

interface BillsPageProps {
  initialFilter?: 'all' | 'pending' | 'paid';
}

export function BillsPage({ initialFilter = 'all' }: BillsPageProps) {
  const [bills] = useState<Bill[]>([
    { id: 1, billNo: 'B001', title: 'Electricity Bill - October', amount: 12000, status: 'pending', dueDate: '2025-11-05', issueDate: '2025-10-20', category: 'Utilities' },
    { id: 2, billNo: 'B002', title: 'Water Bill - October', amount: 4500, status: 'pending', dueDate: '2025-11-10', issueDate: '2025-10-22', category: 'Utilities' },
    { id: 3, billNo: 'B003', title: 'Rent - November', amount: 120000, status: 'paid', dueDate: '2025-11-01', issueDate: '2025-10-15', category: 'Rent' },
    { id: 4, billNo: 'B004', title: 'Internet Bill - October', amount: 6000, status: 'paid', dueDate: '2025-10-28', issueDate: '2025-10-18', category: 'Utilities' },
    { id: 5, billNo: 'B005', title: 'Gas Bill - October', amount: 3500, status: 'pending', dueDate: '2025-11-08', issueDate: '2025-10-21', category: 'Utilities' },
    { id: 6, billNo: 'B006', title: 'Maintenance Fee - October', amount: 15000, status: 'paid', dueDate: '2025-10-30', issueDate: '2025-10-16', category: 'Maintenance' },
    { id: 7, billNo: 'B007', title: 'Parking Fee - October', amount: 5000, status: 'paid', dueDate: '2025-10-25', issueDate: '2025-10-10', category: 'Parking' },
    { id: 8, billNo: 'B008', title: 'Cable TV - October', amount: 4000, status: 'pending', dueDate: '2025-11-12', issueDate: '2025-10-23', category: 'Entertainment' },
    { id: 9, billNo: 'B009', title: 'Rent - October', amount: 120000, status: 'paid', dueDate: '2025-10-01', issueDate: '2025-09-15', category: 'Rent' },
    { id: 10, billNo: 'B010', title: 'Electricity Bill - September', amount: 11500, status: 'paid', dueDate: '2025-10-05', issueDate: '2025-09-20', category: 'Utilities' },
    { id: 11, billNo: 'B011', title: 'Water Bill - September', amount: 4200, status: 'paid', dueDate: '2025-10-10', issueDate: '2025-09-22', category: 'Utilities' },
    { id: 12, billNo: 'B012', title: 'Security Deposit', amount: 50000, status: 'paid', dueDate: '2025-09-01', issueDate: '2025-08-25', category: 'Deposit' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialFilter);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'billNo'>('billNo');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentBill, setPaymentBill] = useState<Bill | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upiMethod, setUpiMethod] = useState<'upi' | 'mpesa'>('upi');

  const filteredBills = bills
    .filter((bill) => {
      const matchesSearch =
        bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.billNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || bill.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortBy === 'date') {
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        comparison = a.billNo.localeCompare(b.billNo);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const categories = Array.from(new Set(bills.map((bill) => bill.category)));

  const handleSort = (field: 'date' | 'amount' | 'billNo') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Bill No', 'Title', 'Amount', 'Status', 'Due Date', 'Issue Date', 'Category'],
      ...filteredBills.map((bill) => [
        bill.billNo,
        bill.title,
        `KSh ${bill.amount}`,
        bill.status,
        bill.dueDate,
        bill.issueDate,
        bill.category,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bills.csv';
    a.click();
    toast.success('Bills exported successfully');
  };

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Payment of KSh ${paymentBill?.amount.toLocaleString()} processed successfully!`);
    setShowPaymentDialog(false);
    setPaymentMethod('card');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2>Bills</h2>
          <p className="text-gray-600">Manage and view all your bills</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('billNo')}
                      className="h-8 px-2"
                    >
                      Bill No
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('amount')}
                      className="h-8 px-2"
                    >
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('date')}
                      className="h-8 px-2"
                    >
                      Due Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      No bills found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.billNo}</TableCell>
                      <TableCell>{bill.title}</TableCell>
                      <TableCell>KSh {bill.amount.toLocaleString()}</TableCell>
                      <TableCell>{bill.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={bill.status === 'paid' ? 'default' : 'secondary'}
                          className={
                            bill.status === 'paid'
                              ? 'bg-green-50 text-green-700 hover:bg-green-100'
                              : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                          }
                        >
                          {bill.status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedBill(bill)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          {bill.status === 'pending' && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => {
                                setPaymentBill(bill);
                                setShowPaymentDialog(true);
                              }}
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBills.length} of {bills.length} bills
          </div>
        </CardContent>
      </Card>

      {/* Bill Details Dialog */}
      <Dialog open={selectedBill !== null} onOpenChange={() => setSelectedBill(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bill Details</DialogTitle>
            <DialogDescription>
              Complete information about this bill
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bill Number</p>
                  <p>{selectedBill.billNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    variant={selectedBill.status === 'paid' ? 'default' : 'secondary'}
                    className={
                      selectedBill.status === 'paid'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-orange-50 text-orange-700'
                    }
                  >
                    {selectedBill.status === 'paid' ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Title</p>
                  <p>{selectedBill.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p>{selectedBill.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-xl">KSh {selectedBill.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Issue Date</p>
                  <p>{selectedBill.issueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p>{selectedBill.dueDate}</p>
                </div>
              </div>
              {selectedBill.status === 'pending' && (
                <div className="pt-4 border-t">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      setSelectedBill(null);
                      setPaymentBill(selectedBill);
                      setShowPaymentDialog(true);
                    }}
                  >
                    Pay Now
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pay Bill</DialogTitle>
            <DialogDescription>
              Complete payment for {paymentBill?.title}
            </DialogDescription>
          </DialogHeader>
          {paymentBill && (
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Bill Summary */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bill Number:</span>
                  <span>{paymentBill.billNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Title:</span>
                  <span>{paymentBill.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Due Date:</span>
                  <span>{paymentBill.dueDate}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm">Amount to Pay:</span>
                  <span className="text-xl">KSh {paymentBill.amount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-sm">Credit/Debit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className="h-6 w-6" />
                    <span className="text-sm">Bank Transfer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-sm">UPI/M-Pesa</span>
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date *</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input id="cardName" placeholder="John Doe" required />
                  </div>
                </div>
              )}

              {/* Bank Transfer Form */}
              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input id="accountNumber" placeholder="Enter account number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifsc">IFSC Code *</Label>
                    <Input id="ifsc" placeholder="Enter IFSC code" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Holder Name *</Label>
                    <Input id="accountName" placeholder="Enter name" required />
                  </div>
                </div>
              )}

              {/* UPI/M-Pesa Form */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select UPI Method</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setUpiMethod('upi')}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          upiMethod === 'upi'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-sm">UPI</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiMethod('mpesa')}
                        className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                          upiMethod === 'mpesa'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-sm">M-Pesa</span>
                      </button>
                    </div>
                  </div>

                  {upiMethod === 'upi' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID *</Label>
                        <Input id="upiId" placeholder="yourname@upi" required />
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-900">
                        You will receive a payment request on your UPI app
                      </div>
                    </>
                  )}

                  {upiMethod === 'mpesa' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="mpesaPhone">M-Pesa Phone Number *</Label>
                        <Input
                          id="mpesaPhone"
                          type="tel"
                          placeholder="254XXXXXXXXX"
                          required
                        />
                        <p className="text-xs text-gray-500">
                          Enter your M-Pesa registered phone number
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mpesaName">Full Name *</Label>
                        <Input
                          id="mpesaName"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg text-sm text-green-900">
                        <p className="font-medium mb-1">M-Pesa Payment Instructions:</p>
                        <ol className="list-decimal list-inside space-y-1 text-xs">
                          <li>You will receive an M-Pesa STK push on your phone</li>
                          <li>Enter your M-Pesa PIN to confirm payment</li>
                          <li>You will receive a confirmation SMS</li>
                        </ol>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowPaymentDialog(false);
                    setPaymentMethod('card');
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Pay KSh {paymentBill.amount.toLocaleString()}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}