import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  FileText, 
  Upload, 
  X, 
  Download, 
  Calendar, 
  DollarSign, 
  Home,
  User,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Shield,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Alert, AlertDescription } from './ui/alert';

export function LeasePage() {
  const [leaseData, setLeaseData] = useState({
    // Landlord Information
    landlordName: '',
    landlordEmail: '',
    landlordPhone: '',
    landlordAddress: '',
    
    // Tenant Information
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
    tenantIdNumber: '',
    
    // Property Information
    propertyAddress: '',
    apartmentNumber: '',
    buildingName: '',
    roomType: '',
    
    // Lease Terms
    leaseStartDate: '',
    leaseEndDate: '',
    leaseDuration: '',
    monthlyRent: '',
    securityDeposit: '',
    paymentDueDate: '',
    lateFeeAmount: '',
    
    // Additional Terms
    utilitiesIncluded: '',
    parkingIncluded: '',
    petsAllowed: '',
    smokingAllowed: '',
    
    // Special Terms
    specialTerms: '',
    maintenanceResponsibilities: '',
    additionalNotes: '',
    
    // House Rules
    quietHoursStart: '',
    quietHoursEnd: '',
    guestPolicy: '',
    customRules: '',
  });

  const [leaseDocument, setLeaseDocument] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [rulesAcknowledged, setRulesAcknowledged] = useState(false);
  const leaseDocumentInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setLeaseData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLeaseDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setLeaseDocument(reader.result as string);
        toast.success('Lease document uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLeaseDocument = () => {
    setLeaseDocument(null);
    if (leaseDocumentInputRef.current) {
      leaseDocumentInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save lease data to localStorage
    const leaseRecord = {
      ...leaseData,
      leaseDocument,
      isSigned,
      submissionDate: new Date().toISOString(),
    };
    localStorage.setItem('leaseAgreement', JSON.stringify(leaseRecord));
    
    toast.success('Lease agreement saved successfully!');
  };

  const handleSignLease = () => {
    setIsSigned(true);
    toast.success('Lease agreement signed successfully!');
  };

  const handleDownloadLease = () => {
    toast.success('Downloading lease document...');
    // In a real application, this would download the actual document
  };

  // Calculate form completion percentage
  const calculateProgress = () => {
    const requiredFields = [
      'landlordName', 'tenantName', 'propertyAddress', 'leaseStartDate',
      'leaseEndDate', 'monthlyRent', 'securityDeposit'
    ];
    const filledFields = requiredFields.filter(field => leaseData[field as keyof typeof leaseData]?.trim());
    const documentBonus = leaseDocument ? 1 : 0;
    const signedBonus = isSigned ? 1 : 0;
    const rulesBonus = rulesAcknowledged ? 1 : 0;
    return Math.round(((filledFields.length + documentBonus + signedBonus + rulesBonus) / (requiredFields.length + 3)) * 100);
  };

  const progress = calculateProgress();

  const rulesList = [
    { id: 'noLoudNoise', label: 'No loud noise or disturbances, especially during quiet hours', icon: '🔇' },
    { id: 'noSmoking', label: 'No smoking inside the premises', icon: '🚭' },
    { id: 'noPets', label: 'No pets allowed without prior written consent', icon: '🐾' },
    { id: 'noIllegalActivities', label: 'No illegal activities or substances on the property', icon: '⚖️' },
    { id: 'maintainCleanliness', label: 'Maintain cleanliness and hygiene in the unit', icon: '🧹' },
    { id: 'properWasteDisposal', label: 'Proper waste disposal in designated areas', icon: '🗑️' },
    { id: 'noUnauthorizedRepairs', label: 'No unauthorized repairs or alterations to the property', icon: '🔧' },
    { id: 'respectCommonAreas', label: 'Respect common areas and shared facilities', icon: '🏢' },
    { id: 'noSubletting', label: 'No subletting or unauthorized occupants', icon: '🚫' },
    { id: 'payRentOnTime', label: 'Pay rent on time as per the lease agreement', icon: '💰' },
    { id: 'reportMaintenance', label: 'Report maintenance issues promptly to landlord', icon: '📞' },
    { id: 'noPropertyDamage', label: 'No intentional damage to property or fixtures', icon: '🛡️' },
    { id: 'followBuildingRules', label: 'Follow all building rules and regulations', icon: '📋' },
    { id: 'noExcessiveGuests', label: 'No excessive or long-term guests without approval', icon: '👥' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="dark:text-gray-100 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Lease Agreement
        </h2>
        <p className="text-muted-foreground flex items-center gap-2">
          Complete your lease agreement details
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
            isSigned 
              ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
              : 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
          }`}>
            {isSigned ? <CheckCircle2 className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
            {isSigned ? 'Signed' : 'Pending Signature'}
          </span>
        </p>
        
        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Completion Progress</span>
            <span className={`font-semibold ${progress === 100 ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {progress}%
            </span>
          </div>
          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-500 ${
                progress === 100 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600'
              } shadow-lg`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Status Alert */}
      {!isSigned && (
        <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30">
          <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-900 dark:text-orange-200">
            This lease agreement is pending your signature. Please review all details carefully before signing.
          </AlertDescription>
        </Alert>
      )}

      {isSigned && (
        <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-900 dark:text-green-200">
            This lease agreement has been signed and is legally binding. A copy has been saved to your records.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Landlord Information Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-gray-800 dark:via-blue-950/10 dark:to-purple-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-blue-50/30 dark:to-blue-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Landlord Information
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Property owner or management details</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="landlordName">Landlord Name *</Label>
                <Input
                  id="landlordName"
                  value={leaseData.landlordName}
                  onChange={(e) => handleChange('landlordName', e.target.value)}
                  placeholder="Enter landlord's full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landlordEmail">Landlord Email</Label>
                <Input
                  id="landlordEmail"
                  type="email"
                  value={leaseData.landlordEmail}
                  onChange={(e) => handleChange('landlordEmail', e.target.value)}
                  placeholder="landlord@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landlordPhone">Landlord Phone</Label>
                <Input
                  id="landlordPhone"
                  type="tel"
                  value={leaseData.landlordPhone}
                  onChange={(e) => handleChange('landlordPhone', e.target.value)}
                  placeholder="+254 700 000 000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landlordAddress">Landlord Address</Label>
                <Input
                  id="landlordAddress"
                  value={leaseData.landlordAddress}
                  onChange={(e) => handleChange('landlordAddress', e.target.value)}
                  placeholder="Enter landlord's address"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tenant Information Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 dark:from-gray-800 dark:via-green-950/10 dark:to-emerald-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-green-50/30 dark:to-green-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full shadow-lg shadow-green-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Tenant Information
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Your details as the tenant</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenantName">Tenant Name *</Label>
                <Input
                  id="tenantName"
                  value={leaseData.tenantName}
                  onChange={(e) => handleChange('tenantName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantEmail">Tenant Email</Label>
                <Input
                  id="tenantEmail"
                  type="email"
                  value={leaseData.tenantEmail}
                  onChange={(e) => handleChange('tenantEmail', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantPhone">Tenant Phone</Label>
                <Input
                  id="tenantPhone"
                  type="tel"
                  value={leaseData.tenantPhone}
                  onChange={(e) => handleChange('tenantPhone', e.target.value)}
                  placeholder="+254 700 000 000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantIdNumber">ID Number</Label>
                <Input
                  id="tenantIdNumber"
                  value={leaseData.tenantIdNumber}
                  onChange={(e) => handleChange('tenantIdNumber', e.target.value)}
                  placeholder="Enter your ID number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Information Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-red-50/20 dark:from-gray-800 dark:via-orange-950/10 dark:to-red-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-orange-50/30 dark:to-orange-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full shadow-lg shadow-orange-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Property Information
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Details about the rental property</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="propertyAddress">Property Address *</Label>
                <Input
                  id="propertyAddress"
                  value={leaseData.propertyAddress}
                  onChange={(e) => handleChange('propertyAddress', e.target.value)}
                  placeholder="Enter complete property address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buildingName">Building Name</Label>
                <Input
                  id="buildingName"
                  value={leaseData.buildingName}
                  onChange={(e) => handleChange('buildingName', e.target.value)}
                  placeholder="Enter building name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apartmentNumber">Apartment/Unit Number</Label>
                <Input
                  id="apartmentNumber"
                  value={leaseData.apartmentNumber}
                  onChange={(e) => handleChange('apartmentNumber', e.target.value)}
                  placeholder="e.g., A-101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select
                  value={leaseData.roomType}
                  onValueChange={(value) => handleChange('roomType', value)}
                >
                  <SelectTrigger id="roomType">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bedsitter">Bedsitter</SelectItem>
                    <SelectItem value="1bedroom">1 Bedroom</SelectItem>
                    <SelectItem value="2bedroom">2 Bedroom</SelectItem>
                    <SelectItem value="3bedroom">3 Bedroom</SelectItem>
                    <SelectItem value="4bedroom">4+ Bedroom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lease Terms Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '300ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 dark:from-gray-800 dark:via-purple-950/10 dark:to-pink-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-purple-50/30 dark:to-purple-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Lease Terms & Financial Details
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Rental period and payment information</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leaseStartDate">Lease Start Date *</Label>
                <Input
                  id="leaseStartDate"
                  type="date"
                  value={leaseData.leaseStartDate}
                  onChange={(e) => handleChange('leaseStartDate', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaseEndDate">Lease End Date *</Label>
                <Input
                  id="leaseEndDate"
                  type="date"
                  value={leaseData.leaseEndDate}
                  onChange={(e) => handleChange('leaseEndDate', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaseDuration">Lease Duration</Label>
                <Select
                  value={leaseData.leaseDuration}
                  onValueChange={(value) => handleChange('leaseDuration', value)}
                >
                  <SelectTrigger id="leaseDuration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="3years">3 Years</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent (KSh) *</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  value={leaseData.monthlyRent}
                  onChange={(e) => handleChange('monthlyRent', e.target.value)}
                  placeholder="e.g., 25000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityDeposit">Security Deposit (KSh) *</Label>
                <Input
                  id="securityDeposit"
                  type="number"
                  value={leaseData.securityDeposit}
                  onChange={(e) => handleChange('securityDeposit', e.target.value)}
                  placeholder="e.g., 25000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentDueDate">Payment Due Date (Day of Month)</Label>
                <Select
                  value={leaseData.paymentDueDate}
                  onValueChange={(value) => handleChange('paymentDueDate', value)}
                >
                  <SelectTrigger id="paymentDueDate">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(28)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} of each month
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lateFeeAmount">Late Fee Amount (KSh)</Label>
                <Input
                  id="lateFeeAmount"
                  type="number"
                  value={leaseData.lateFeeAmount}
                  onChange={(e) => handleChange('lateFeeAmount', e.target.value)}
                  placeholder="e.g., 500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Terms Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '400ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/30 to-teal-50/20 dark:from-gray-800 dark:via-cyan-950/10 dark:to-teal-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-cyan-50/30 dark:to-cyan-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full shadow-lg shadow-cyan-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Additional Terms & Conditions
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Property rules and special conditions</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="utilitiesIncluded">Utilities Included</Label>
                <Select
                  value={leaseData.utilitiesIncluded}
                  onValueChange={(value) => handleChange('utilitiesIncluded', value)}
                >
                  <SelectTrigger id="utilitiesIncluded">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Utilities</SelectItem>
                    <SelectItem value="water">Water Only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parkingIncluded">Parking Included</Label>
                <Select
                  value={leaseData.parkingIncluded}
                  onValueChange={(value) => handleChange('parkingIncluded', value)}
                >
                  <SelectTrigger id="parkingIncluded">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="extra">Extra Charge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="petsAllowed">Pets Allowed</Label>
                <Select
                  value={leaseData.petsAllowed}
                  onValueChange={(value) => handleChange('petsAllowed', value)}
                >
                  <SelectTrigger id="petsAllowed">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="small">Small Pets Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smokingAllowed">Smoking Allowed</Label>
                <Select
                  value={leaseData.smokingAllowed}
                  onValueChange={(value) => handleChange('smokingAllowed', value)}
                >
                  <SelectTrigger id="smokingAllowed">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="outdoor">Outdoor Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="maintenanceResponsibilities">Maintenance Responsibilities</Label>
              <Textarea
                id="maintenanceResponsibilities"
                value={leaseData.maintenanceResponsibilities}
                onChange={(e) => handleChange('maintenanceResponsibilities', e.target.value)}
                placeholder="Specify who is responsible for what maintenance tasks..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialTerms">Special Terms & Conditions</Label>
              <Textarea
                id="specialTerms"
                value={leaseData.specialTerms}
                onChange={(e) => handleChange('specialTerms', e.target.value)}
                placeholder="Any special agreements or conditions not covered above..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={leaseData.additionalNotes}
                onChange={(e) => handleChange('additionalNotes', e.target.value)}
                placeholder="Any other information or notes..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* House Rules Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '500ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/20 dark:from-gray-800 dark:via-indigo-950/10 dark:to-violet-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-indigo-50/30 dark:to-indigo-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full shadow-lg shadow-indigo-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                House Rules
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Property rules and regulations</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quietHoursStart">Quiet Hours Start</Label>
                <Input
                  id="quietHoursStart"
                  type="time"
                  value={leaseData.quietHoursStart}
                  onChange={(e) => handleChange('quietHoursStart', e.target.value)}
                  placeholder="e.g., 10:00 PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quietHoursEnd">Quiet Hours End</Label>
                <Input
                  id="quietHoursEnd"
                  type="time"
                  value={leaseData.quietHoursEnd}
                  onChange={(e) => handleChange('quietHoursEnd', e.target.value)}
                  placeholder="e.g., 6:00 AM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestPolicy">Guest Policy</Label>
                <Textarea
                  id="guestPolicy"
                  value={leaseData.guestPolicy}
                  onChange={(e) => handleChange('guestPolicy', e.target.value)}
                  placeholder="Specify guest policy..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customRules">Custom Rules</Label>
                <Textarea
                  id="customRules"
                  value={leaseData.customRules}
                  onChange={(e) => handleChange('customRules', e.target.value)}
                  placeholder="Add any custom rules..."
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-base">Mandatory House Rules & Regulations</Label>
              <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 mb-4">
                <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-900 dark:text-red-200">
                  All tenants must comply with the following rules. Violation of these rules may result in lease termination.
                </AlertDescription>
              </Alert>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                The following rules and regulations are mandatory for all tenants and must be followed at all times:
              </p>
              <div className="space-y-2">
                {rulesList.map((rule, index) => (
                  <div key={rule.id} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/20 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-semibold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{rule.icon}</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{rule.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Acknowledgment Checkbox */}
              <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="rulesAcknowledgement"
                    checked={rulesAcknowledged}
                    onCheckedChange={(checked) => setRulesAcknowledged(checked as boolean)}
                  />
                  <label
                    htmlFor="rulesAcknowledgement"
                    className="flex-1 text-sm font-medium leading-relaxed cursor-pointer text-gray-900 dark:text-gray-100"
                  >
                    I acknowledge that I have read, understood, and agree to comply with all the mandatory house rules and regulations listed above. I understand that failure to comply may result in penalties or lease termination.
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '600ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/20 dark:from-gray-800 dark:via-indigo-950/10 dark:to-violet-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-indigo-50/30 dark:to-indigo-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full shadow-lg shadow-indigo-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Lease Document Upload
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Upload your signed lease agreement</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="flex flex-col items-center gap-4">
              {leaseDocument ? (
                <div className="w-full max-w-2xl">
                  <div className="relative h-64 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <FileCheck className="h-16 w-16 mx-auto text-green-600 dark:text-green-400 mb-3" />
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Lease Document Uploaded</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ready for review and signature</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadLease}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => leaseDocumentInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Replace
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveLeaseDocument}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-2xl">
                  <div className="h-64 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-900/30">
                    <div className="text-center">
                      <Upload className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">No lease document uploaded</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Upload a PDF or image of your lease agreement</p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => leaseDocumentInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Lease Document
                    </Button>
                  </div>
                </div>
              )}
              <input
                ref={leaseDocumentInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleLeaseDocumentUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Accepted formats: PDF, JPG, PNG (Max 10MB)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4 animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '700ms' }}>
          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30">
              <FileText className="h-4 w-4 mr-2" />
              Save Lease
            </Button>
          </div>
          {!isSigned && (
            <Button 
              type="button" 
              onClick={handleSignLease}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Sign Lease Agreement
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}