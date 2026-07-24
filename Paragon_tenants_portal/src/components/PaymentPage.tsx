import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { CreditCard, Building2, Smartphone, History, Send } from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

export function PaymentPage() {
  const [selectedBill, setSelectedBill] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [sendToPhone, setSendToPhone] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendToEmail, setSendToEmail] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [upiMethod, setUpiMethod] = useState<'upi' | 'mpesa'>('upi');

  const pendingBills = [
    { id: 'B001', title: 'Electricity Bill - October', amount: 12000 },
    { id: 'B002', title: 'Water Bill - October', amount: 4500 },
    { id: 'B005', title: 'Gas Bill - October', amount: 3500 },
    { id: 'B008', title: 'Cable TV - October', amount: 4000 },
  ];

  const paymentHistory = [
    { id: 1, billNo: 'B003', title: 'Rent - November', amount: 120000, date: '2025-10-28', method: 'Credit Card' },
    { id: 2, billNo: 'B004', title: 'Internet Bill - October', amount: 6000, date: '2025-10-25', method: 'Bank Transfer' },
    { id: 3, billNo: 'B006', title: 'Maintenance Fee - October', amount: 15000, date: '2025-10-22', method: 'Credit Card' },
    { id: 4, billNo: 'B007', title: 'Parking Fee - October', amount: 5000, date: '2025-10-20', method: 'UPI' },
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReceiptDialog(true);
  };

  const handleSendReceipt = () => {
    const messages = [];
    
    if (sendToPhone && phoneNumber) {
      messages.push(`Receipt sent to phone: ${phoneNumber}`);
    }
    
    if (sendToEmail && emailAddress) {
      messages.push(`Receipt sent to email: ${emailAddress}`);
    }

    if (messages.length > 0) {
      toast.success(messages.join(' and '));
    } else {
      toast.success('Payment processed successfully!');
    }

    setShowReceiptDialog(false);
    setSelectedBill('');
    setPhoneNumber('');
    setEmailAddress('');
  };

  const getTotalPending = () => {
    return pendingBills.reduce((sum, bill) => sum + bill.amount, 0);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2>Payment</h2>
        <p className="text-gray-600">Make payments for your bills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">KSh {getTotalPending().toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">{pendingBills.length} bills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">KSh 146,000</div>
            <p className="text-sm text-gray-500 mt-1">4 payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Next Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">Nov 5</div>
            <p className="text-sm text-gray-500 mt-1">Electricity Bill</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payment">Make Payment</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Bill to Pay</CardTitle>
              <CardDescription>Choose a pending bill and payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bill">Select Bill *</Label>
                  <Select value={selectedBill} onValueChange={setSelectedBill}>
                    <SelectTrigger id="bill">
                      <SelectValue placeholder="Choose a bill" />
                    </SelectTrigger>
                    <SelectContent>
                      {pendingBills.map((bill) => (
                        <SelectItem key={bill.id} value={bill.id}>
                          {bill.title} - KSh {bill.amount.toLocaleString()}
                        </SelectItem>
                      ))}
                      <SelectItem value="all">Pay All Bills - KSh {getTotalPending().toLocaleString()}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedBill && (
                  <>
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                            paymentMethod === 'card'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 dark:bg-gray-800'
                          }`}
                        >
                          <CreditCard className={`h-6 w-6 ${paymentMethod === 'card' ? 'text-blue-600 dark:text-blue-400' : 'dark:text-gray-300'}`} />
                          <span className={`text-sm ${paymentMethod === 'card' ? 'dark:text-blue-300' : 'dark:text-gray-300'}`}>Credit/Debit Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                            paymentMethod === 'bank'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 dark:bg-gray-800'
                          }`}
                        >
                          <Building2 className={`h-6 w-6 ${paymentMethod === 'bank' ? 'text-blue-600 dark:text-blue-400' : 'dark:text-gray-300'}`} />
                          <span className={`text-sm ${paymentMethod === 'bank' ? 'dark:text-blue-300' : 'dark:text-gray-300'}`}>Bank Transfer</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('upi')}
                          className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                            paymentMethod === 'upi'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 dark:bg-gray-800'
                          }`}
                        >
                          <Smartphone className={`h-6 w-6 ${paymentMethod === 'upi' ? 'text-blue-600 dark:text-blue-400' : 'dark:text-gray-300'}`} />
                          <span className={`text-sm ${paymentMethod === 'upi' ? 'dark:text-blue-300' : 'dark:text-gray-300'}`}>UPI</span>
                        </button>
                      </div>
                    </div>

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
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 dark:bg-gray-800'
                              }`}
                            >
                              <span className={`text-sm ${upiMethod === 'upi' ? 'dark:text-blue-300' : 'dark:text-gray-300'}`}>UPI</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setUpiMethod('mpesa')}
                              className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                                upiMethod === 'mpesa'
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 dark:bg-gray-800'
                              }`}
                            >
                              <span className={`text-sm ${upiMethod === 'mpesa' ? 'dark:text-blue-300' : 'dark:text-gray-300'}`}>M-Pesa</span>
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

                    <div className="flex justify-end gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setSelectedBill('')}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        Pay Now
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p>{payment.title}</p>
                        <Badge variant="outline">{payment.billNo}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{payment.date}</span>
                        <span>•</span>
                        <span>{payment.method}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg">KSh {payment.amount.toLocaleString()}</p>
                      <Badge className="bg-green-50 text-green-700">Paid</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Receipt Delivery Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful!</DialogTitle>
            <DialogDescription>
              Where would you like to receive your payment receipt?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="sendPhone"
                checked={sendToPhone}
                onCheckedChange={(checked) => setSendToPhone(checked as boolean)}
              />
              <div className="flex-1 space-y-2">
                <Label htmlFor="sendPhone" className="cursor-pointer">
                  Send to Phone (SMS)
                </Label>
                {sendToPhone && (
                  <div className="space-y-1">
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      Receipt will be sent via SMS to this number
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="sendEmail"
                checked={sendToEmail}
                onCheckedChange={(checked) => setSendToEmail(checked as boolean)}
              />
              <div className="flex-1 space-y-2">
                <Label htmlFor="sendEmail" className="cursor-pointer">
                  Send to Email
                </Label>
                {sendToEmail && (
                  <div className="space-y-1">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      Receipt will be sent to this email address
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Send className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm text-blue-900">Payment Confirmation</p>
                  <p className="text-xs text-blue-700">
                    Your payment has been processed successfully. The receipt will include transaction ID, amount, and payment details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowReceiptDialog(false);
                setSelectedBill('');
              }}
            >
              Skip
            </Button>
            <Button onClick={handleSendReceipt}>
              Send Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}