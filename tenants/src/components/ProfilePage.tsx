import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Mail, Phone, MapPin, Calendar, Home, Edit, Settings, Save, X, Upload, Bell, Lock, Eye, EyeOff, Shield, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ProfilePageProps {
  onPageChange?: (page: string) => void;
}

export function ProfilePage({ onPageChange }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    alternatePhone: '',
    idNumber: '',
    idType: '',
    idDocument: null as string | null,
    apartmentNumber: 'Apartment 5B',
    buildingName: 'Building A',
    roomType: '',
    moveInDate: 'Jan 15, 2024',
    address: '123 Main Street, Building A, Apartment 5B',
    profilePhoto: null as string | null,
  });
  const [editedData, setEditedData] = useState(profileData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idDocumentInputRef = useRef<HTMLInputElement>(null);

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    billReminders: true,
    maintenanceUpdates: true,
    paymentConfirmations: true,
    newsUpdates: false,
    twoFactorAuth: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('tenantSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('tenantProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        const loadedData = {
          fullName: parsed.fullName || 'John Doe',
          email: parsed.email || 'john.doe@email.com',
          phone: parsed.phone || '+1 (555) 123-4567',
          alternatePhone: parsed.alternatePhone || '',
          idNumber: parsed.idNumber || '',
          idType: parsed.idType || '',
          idDocument: parsed.idDocument || null,
          apartmentNumber: parsed.apartmentNumber || 'Apartment 5B',
          buildingName: parsed.buildingName || 'Building A',
          roomType: parsed.roomType || '',
          moveInDate: parsed.moveInDate ? new Date(parsed.moveInDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Jan 15, 2024',
          address: `${parsed.buildingName || 'Building A'}, ${parsed.apartmentNumber || 'Apartment 5B'}`,
          profilePhoto: parsed.profilePhoto || null,
        };
        setProfileData(loadedData);
        setEditedData(loadedData);
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(profileData);
  };

  const handleSave = () => {
    setProfileData(editedData);
    
    // Save to localStorage
    const savedProfile = localStorage.getItem('tenantProfile');
    const existingData = savedProfile ? JSON.parse(savedProfile) : {};
    const updatedProfile = {
      ...existingData,
      fullName: editedData.fullName,
      email: editedData.email,
      phone: editedData.phone,
      alternatePhone: editedData.alternatePhone,
      idNumber: editedData.idNumber,
      idType: editedData.idType,
      idDocument: editedData.idDocument,
      apartmentNumber: editedData.apartmentNumber,
      buildingName: editedData.buildingName,
      roomType: editedData.roomType,
      profilePhoto: editedData.profilePhoto,
    };
    localStorage.setItem('tenantProfile', JSON.stringify(updatedProfile));
    
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleChange = (field: string, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData(prev => ({ ...prev, profilePhoto: reader.result as string }));
        toast.success('Profile photo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setEditedData(prev => ({ ...prev, profilePhoto: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Profile photo removed');
  };

  const getInitials = () => {
    const name = isEditing ? editedData.fullName : profileData.fullName;
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatIdType = (idType: string) => {
    const typeMap: Record<string, string> = {
      nationalId: 'National ID',
      passport: 'Passport',
      driverLicense: 'Driver License',
    };
    return typeMap[idType] || idType;
  };

  const formatRoomType = (roomType: string) => {
    const typeMap: Record<string, string> = {
      bedsitter: 'Bedsitter',
      '1bedroom': '1 Bedroom',
      '2bedroom': '2 Bedroom',
      '3bedroom': '3 Bedroom',
    };
    return typeMap[roomType] || roomType;
  };

  // Settings handlers
  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('tenantSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    // In a real app, this would call an API
    toast.success('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordFields(false);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('tenantProfile');
      localStorage.removeItem('tenantSettings');
      toast.success('Account deleted successfully');
      // In a real app, redirect to login or home page
    }
  };

  const displayData = isEditing ? editedData : profileData;

  return (
    <div className="space-y-6">
      <div>
        <h2>My Profile</h2>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center pb-4">
            {isEditing ? (
              <div className="space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={editedData.profilePhoto || undefined} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {editedData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                  </Button>
                  {editedData.profilePhoto && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemovePhoto}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove Photo
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profileData.profilePhoto || undefined} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{profileData.fullName}</CardTitle>
                <p className="text-sm text-gray-600">Tenant ID: #TN12345</p>
              </>
            )}
          </CardHeader>
          <CardContent className="space-y-2">
            {isEditing ? (
              <>
                <Button className="w-full" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" className="w-full" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowSettings(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={editedData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    type="tel"
                    value={editedData.alternatePhone}
                    onChange={(e) => handleChange('alternatePhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apartmentNumber">Unit</Label>
                  <Input
                    id="apartmentNumber"
                    value={editedData.apartmentNumber}
                    onChange={(e) => handleChange('apartmentNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buildingName">Building Name</Label>
                  <Input
                    id="buildingName"
                    value={editedData.buildingName}
                    onChange={(e) => handleChange('buildingName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomType">Room Type</Label>
                  <Select
                    value={editedData.roomType}
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p>{displayData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p>{displayData.phone}</p>
                  </div>
                </div>

                {displayData.alternatePhone && (
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Alternate Phone</p>
                      <p>{displayData.alternatePhone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Home className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Unit</p>
                    <p>{displayData.apartmentNumber}</p>
                  </div>
                </div>

                {displayData.roomType && (
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-pink-100 flex items-center justify-center">
                      <Home className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Room Type</p>
                      <p>{formatRoomType(displayData.roomType)}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Move-in Date</p>
                    <p>{displayData.moveInDate}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p>{displayData.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identification & Legal */}
      {(displayData.idNumber || displayData.idType || displayData.idDocument || isEditing) && (
        <Card>
          <CardHeader>
            <CardTitle>Identification & Legal</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                      id="idNumber"
                      placeholder="Enter your ID or passport number"
                      value={editedData.idNumber}
                      onChange={(e) => handleChange('idNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <Select
                      value={editedData.idType}
                      onValueChange={(value) => handleChange('idType', value)}
                    >
                      <SelectTrigger id="idType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nationalId">National ID</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="driverLicense">Driver License</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* ID Document Upload */}
                <div className="pt-4 border-t border-gray-200">
                  <Label className="mb-3 block">ID Document</Label>
                  <div className="flex flex-col items-center gap-4">
                    {editedData.idDocument ? (
                      <div className="relative w-full max-w-md h-48 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
                        <img 
                          src={editedData.idDocument} 
                          alt="ID Document" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-md h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">No document uploaded</p>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => idDocumentInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {editedData.idDocument ? 'Change Document' : 'Upload Document'}
                      </Button>
                      {editedData.idDocument && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditedData(prev => ({ ...prev, idDocument: null }));
                            if (idDocumentInputRef.current) {
                              idDocumentInputRef.current.value = '';
                            }
                            toast.info('ID document removed');
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <input
                      ref={idDocumentInputRef}
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error('File size should be less than 5MB');
                            return;
                          }
                          
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditedData(prev => ({ ...prev, idDocument: reader.result as string }));
                            toast.success('ID document uploaded successfully');
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 text-center">
                      Accepted formats: JPG, PNG, or PDF (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayData.idNumber && (
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ID Number</p>
                        <p>{displayData.idNumber}</p>
                      </div>
                    </div>
                  )}

                  {displayData.idType && (
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ID Type</p>
                        <p>{formatIdType(displayData.idType)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {displayData.idDocument && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">ID Document</p>
                    <div className="relative w-full max-w-md h-48 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
                      <img 
                        src={displayData.idDocument} 
                        alt="ID Document" 
                        className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(displayData.idDocument || '', '_blank')}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Click to view full size</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account Settings
            </DialogTitle>
            <DialogDescription>
              Manage your account preferences and security settings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Notification Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Notifications</h3>
              </div>
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="billReminders">Bill Reminders</Label>
                    <p className="text-sm text-gray-500">Get reminded before bills are due</p>
                  </div>
                  <Switch
                    id="billReminders"
                    checked={settings.billReminders}
                    onCheckedChange={(checked) => handleSettingChange('billReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceUpdates">Maintenance Updates</Label>
                    <p className="text-sm text-gray-500">Stay informed about maintenance work</p>
                  </div>
                  <Switch
                    id="maintenanceUpdates"
                    checked={settings.maintenanceUpdates}
                    onCheckedChange={(checked) => handleSettingChange('maintenanceUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="paymentConfirmations">Payment Confirmations</Label>
                    <p className="text-sm text-gray-500">Receive payment receipts and confirmations</p>
                  </div>
                  <Switch
                    id="paymentConfirmations"
                    checked={settings.paymentConfirmations}
                    onCheckedChange={(checked) => handleSettingChange('paymentConfirmations', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsUpdates">News & Updates</Label>
                    <p className="text-sm text-gray-500">Get news about the building and community</p>
                  </div>
                  <Switch
                    id="newsUpdates"
                    checked={settings.newsUpdates}
                    onCheckedChange={(checked) => handleSettingChange('newsUpdates', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Security</h3>
              </div>
              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>

                  {showPasswordFields && (
                    <form onSubmit={handlePasswordChange} className="space-y-3 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" size="sm">Update Password</Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setShowPasswordFields(false);
                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                <h3 className="font-medium text-red-600">Danger Zone</h3>
              </div>
              <Separator />

              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="space-y-2">
                  <h4 className="font-medium text-red-900">Delete Account</h4>
                  <p className="text-sm text-red-700">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete My Account
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              handleSaveSettings();
              setShowSettings(false);
            }}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}