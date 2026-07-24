import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Upload, X, UserPlus, Home, Shield, AlertCircle, FileText, Camera, ImagePlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RegistrationPageProps {
  onRegistrationComplete?: () => void;
}

export function RegistrationPage({ onRegistrationComplete }: RegistrationPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    idNumber: '',
    idType: '',
    apartmentNumber: '',
    buildingName: '',
    roomType: '',
    moveInDate: '',
    numberOfOccupants: '',
    emergencyContact: '',
    emergencyPhone: '',
    additionalNotes: '',
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [idDocument, setIdDocument] = useState<string | null>(null);
  const [moveInPhotos, setMoveInPhotos] = useState<string[]>([]);
  const [moveOutPhotos, setMoveOutPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idDocumentInputRef = useRef<HTMLInputElement>(null);
  const moveInPhotosInputRef = useRef<HTMLInputElement>(null);
  const moveOutPhotosInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save profile data to localStorage
    const profileData = {
      ...formData,
      profilePhoto,
      idDocument,
      moveInPhotos,
      moveOutPhotos,
      registrationDate: new Date().toISOString(),
    };
    localStorage.setItem('tenantProfile', JSON.stringify(profileData));
    
    toast.success('Registration submitted successfully!');
    
    // Navigate to profile page
    if (onRegistrationComplete) {
      onRegistrationComplete();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleIdDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdDocument(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveIdDocument = () => {
    setIdDocument(null);
    if (idDocumentInputRef.current) {
      idDocumentInputRef.current.value = '';
    }
  };

  const handleMoveInPhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (moveInPhotos.length + files.length > 20) {
      toast.error('Maximum 20 photos allowed for move-in documentation');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setMoveInPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    if (files.length > 0) {
      toast.success(`${files.length} photo(s) uploaded successfully`);
    }
  };

  const handleRemoveMoveInPhoto = (index: number) => {
    setMoveInPhotos(prev => prev.filter((_, i) => i !== index));
    toast.success('Photo removed');
  };

  const handleMoveOutPhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (moveOutPhotos.length + files.length > 20) {
      toast.error('Maximum 20 photos allowed for move-out documentation');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setMoveOutPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    if (files.length > 0) {
      toast.success(`${files.length} photo(s) uploaded successfully`);
    }
  };

  const handleRemoveMoveOutPhoto = (index: number) => {
    setMoveOutPhotos(prev => prev.filter((_, i) => i !== index));
    toast.success('Photo removed');
  };

  // Calculate form completion percentage
  const calculateProgress = () => {
    const requiredFields = [
      'fullName', 'email', 'phone', 'apartmentNumber', 'buildingName',
      'moveInDate', 'numberOfOccupants', 'emergencyContact', 'emergencyPhone'
    ];
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData]?.trim());
    const photoBonus = profilePhoto ? 1 : 0;
    const idDocumentBonus = idDocument ? 1 : 0;
    const moveInPhotosBonus = moveInPhotos.length > 0 ? 1 : 0;
    return Math.round(((filledFields.length + photoBonus + idDocumentBonus + moveInPhotosBonus) / (requiredFields.length + 3)) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="dark:text-gray-100 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Tenant Registration
        </h2>
        <p className="text-muted-foreground flex items-center gap-2">
          Complete your tenant registration form
          <span className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
            <UserPlus className="h-3 w-3" />
            New Tenant
          </span>
        </p>
        
        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Registration Progress</span>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-gray-800 dark:via-blue-950/10 dark:to-purple-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-blue-50/30 dark:to-blue-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Personal Information
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Please provide your personal details</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <Avatar className="h-32 w-32 shadow-lg ring-4 ring-blue-100 dark:ring-blue-900/50">
                <AvatarImage src={profilePhoto || undefined} />
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-3xl">
                  {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'T'}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {profilePhoto ? 'Change Photo' : 'Upload Photo'}
                </Button>
                {profilePhoto && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemovePhoto}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
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
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Upload a profile photo (Max 5MB, JPG, PNG, or GIF)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                <Input
                  id="alternatePhone"
                  type="tel"
                  value={formData.alternatePhone}
                  onChange={(e) => handleChange('alternatePhone', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Information Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '100ms' }}>
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 dark:from-gray-800 dark:via-green-950/10 dark:to-emerald-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-green-50/30 dark:to-green-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full shadow-lg shadow-green-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Property Information
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Details about your rental property</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buildingName">Building Name *</Label>
                <Input
                  id="buildingName"
                  value={formData.buildingName}
                  onChange={(e) => handleChange('buildingName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apartmentNumber">Apartment Number *</Label>
                <Input
                  id="apartmentNumber"
                  value={formData.apartmentNumber}
                  onChange={(e) => handleChange('apartmentNumber', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select
                  value={formData.roomType}
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
              <div className="space-y-2">
                <Label htmlFor="moveInDate">Move-in Date *</Label>
                <Input
                  id="moveInDate"
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => handleChange('moveInDate', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberOfOccupants">Number of Occupants *</Label>
                <Select
                  value={formData.numberOfOccupants}
                  onValueChange={(value) => handleChange('numberOfOccupants', value)}
                >
                  <SelectTrigger id="numberOfOccupants">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '200ms' }}>
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-red-50/20 dark:from-gray-800 dark:via-orange-950/10 dark:to-red-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-orange-50/30 dark:to-orange-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full shadow-lg shadow-orange-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Emergency Contact
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Person to contact in case of emergency</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleChange('additionalNotes', e.target.value)}
                placeholder="Any additional information you'd like to share..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Identification & Legal Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '300ms' }}>
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 dark:from-gray-800 dark:via-purple-950/10 dark:to-pink-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-purple-50/30 dark:to-purple-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Identification & Legal
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Upload your identification document for verification</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  placeholder="Enter your ID or passport number"
                  value={formData.idNumber}
                  onChange={(e) => handleChange('idNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type</Label>
                <Select
                  value={formData.idType}
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

            {/* ID Document Upload Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Label className="mb-3 block">ID Document Upload</Label>
              <div className="flex flex-col items-center gap-4">
                {idDocument ? (
                  <div className="relative w-full max-w-md h-48 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900/30">
                    <img 
                      src={idDocument} 
                      alt="ID Document" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-md h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-900/30">
                    <div className="text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">No document uploaded</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Upload a scanned copy of your ID</p>
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
                    {idDocument ? 'Change Document' : 'Upload Document'}
                  </Button>
                  {idDocument && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveIdDocument}
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
                  onChange={handleIdDocumentUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Accepted formats: JPG, PNG, or PDF (Max 5MB)
                </p>
              </div>
            </div>

            {/* Move-in Photos Upload Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Label className="mb-3 block">Move-in Photos Upload</Label>
              <div className="flex flex-col items-center gap-4">
                {moveInPhotos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {moveInPhotos.map((photo, index) => (
                      <div key={index} className="relative w-full max-w-md h-48 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900/30">
                        <img 
                          src={photo} 
                          alt={`Move-in Photo ${index + 1}`} 
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                          onClick={() => handleRemoveMoveInPhoto(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full max-w-md h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-900/30">
                    <div className="text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">No photos uploaded</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Upload photos of your move-in documentation</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moveInPhotosInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {moveInPhotos.length > 0 ? 'Add More Photos' : 'Upload Photos'}
                  </Button>
                </div>
                <input
                  ref={moveInPhotosInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMoveInPhotosUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Accepted formats: JPG, PNG, or GIF (Max 5MB per photo, up to 20 photos)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Condition Documentation - Move-Out Card */}
        <Card className="border-0 shadow-xl shadow-gray-200/80 dark:shadow-none dark:bg-gray-800/50 dark:border-gray-700/50 overflow-hidden relative backdrop-blur-sm animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '400ms' }}>
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/30 to-teal-50/20 dark:from-gray-800 dark:via-cyan-950/10 dark:to-teal-950/5 pointer-events-none" />
          
          <CardHeader className="relative border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-transparent to-cyan-50/30 dark:to-cyan-950/10">
            <CardTitle className="dark:text-gray-100 flex items-center gap-3">
              <div className="h-8 w-1.5 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full shadow-lg shadow-cyan-500/50" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Property Condition - Move-Out Documentation
              </span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Upload photos when moving out (optional at registration)</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-6">
            {/* Info Alert */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-200">
                <p className="font-semibold mb-1">Move-Out Documentation</p>
                <p className="text-blue-700 dark:text-blue-300">
                  This section can be completed later when you're moving out. Upload photos to document the property condition at the end of your tenancy for reference during the security deposit refund process.
                </p>
              </div>
            </div>

            {/* Move-out Photos Upload Section */}
            <div className="pt-4">
              <Label className="mb-3 block">Move-Out Photos</Label>
              <div className="flex flex-col items-center gap-4">
                {moveOutPhotos.length > 0 ? (
                  <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
                    {moveOutPhotos.map((photo, index) => (
                      <div key={index} className="relative w-full h-48 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900/30 group">
                        <img 
                          src={photo} 
                          alt={`Move-out Photo ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveMoveOutPhoto(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <p className="text-xs text-white">Photo {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full max-w-md h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-900/30">
                    <div className="text-center">
                      <Camera className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">No photos uploaded yet</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Upload when you're ready to move out</p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center gap-2 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moveOutPhotosInputRef.current?.click()}
                    className="w-full max-w-md"
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    {moveOutPhotos.length > 0 ? `Add More Photos (${moveOutPhotos.length}/20)` : 'Upload Move-Out Photos'}
                  </Button>
                  <input
                    ref={moveOutPhotosInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMoveOutPhotosUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Accepted formats: JPG, PNG, or GIF (Max 5MB per photo, up to 20 photos)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end gap-4 animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '500ms' }}>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30">
            Submit Registration
          </Button>
        </div>
      </form>
    </div>
  );
}