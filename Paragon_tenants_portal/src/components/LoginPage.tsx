import { useState, FormEvent } from 'react';
import { Eye, EyeOff, Mail, Building2, Shield, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner';
import backgroundImage from 'figma:asset/385b55ad43cf6a778f0bcb89504860b0c0a0cb14.png';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Forgot Password Dialog
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Request Access Dialog
  const [showRequestAccess, setShowRequestAccess] = useState(false);
  const [requestData, setRequestData] = useState({
    fullName: '',
    email: '',
    phone: '',
    apartmentNumber: '',
    message: ''
  });
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSendingReset(true);
    // Simulate API call to send reset email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setResetEmailSent(true);
    setIsSendingReset(false);
    toast.success(`Password reset link sent to ${forgotPasswordEmail}`);
    
    // Close dialog after 3 seconds
    setTimeout(() => {
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
      setResetEmailSent(false);
    }, 3000);
  };

  const handleRequestAccess = async () => {
    const { fullName, email, phone, apartmentNumber } = requestData;
    
    if (!fullName || !email || !phone || !apartmentNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmittingRequest(true);
    // Simulate API call to submit request
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRequestSubmitted(true);
    setIsSubmittingRequest(false);
    toast.success('Access request submitted successfully! We will contact you soon.');
    
    // Close dialog after 3 seconds
    setTimeout(() => {
      setShowRequestAccess(false);
      setRequestData({
        fullName: '',
        email: '',
        phone: '',
        apartmentNumber: '',
        message: ''
      });
      setRequestSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Modern apartment complex"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
        
        {/* Animated decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Centered Login Card with Glassmorphism */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Branding Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl mb-4 backdrop-blur-sm border-2 border-white/20">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Paragon
            </h1>
            <p className="text-white/90 text-lg font-medium flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Tenants Portal
            </p>
          </motion.div>

          {/* Glass Card */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="backdrop-blur-2xl bg-white/25 dark:bg-gray-900/25 rounded-3xl shadow-2xl p-8 border border-white/30 relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500" />
            
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                Welcome Back
              </h2>
              <p className="text-white/90 text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username/Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/95 text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/25 backdrop-blur-md border-white/40 text-white placeholder:text-white/60 focus:bg-white/35 focus:border-white/60 focus:ring-2 focus:ring-white/30 transition-all"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/95 text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10 bg-white/25 backdrop-blur-md border-white/40 text-white placeholder:text-white/60 focus:bg-white/35 focus:border-white/60 focus:ring-2 focus:ring-white/30 transition-all"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/30 backdrop-blur-sm border border-red-400/50 rounded-xl text-sm text-white font-medium shadow-lg"
                >
                  {error}
                </motion.div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoading}
                    className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-gray-900 shadow-sm"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-white/95 cursor-pointer font-medium"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-white/95 hover:text-white font-medium transition-colors hover:underline"
                  disabled={isLoading}
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-white to-white/95 hover:from-white/95 hover:to-white/90 text-gray-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-gray-900/30 border-t-gray-900 rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/40" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-3 text-white/80 font-semibold tracking-wider">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-white/15 backdrop-blur-md border-white/40 text-white hover:bg-white/25 hover:text-white hover:border-white/50 transition-all duration-200 font-medium"
                  disabled={isLoading}
                  onClick={() => toast.info('Google login coming soon')}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-white/15 backdrop-blur-md border-white/40 text-white hover:bg-white/25 hover:text-white hover:border-white/50 transition-all duration-200 font-medium"
                  disabled={isLoading}
                  onClick={() => toast.info('Email login coming soon')}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Footer Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-center space-y-4"
          >
            <p className="text-white/90 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-white font-bold hover:text-[#B7472A] transition-colors underline decoration-2 underline-offset-2"
                onClick={() => setShowRequestAccess(true)}
              >
                Request Access
              </button>
            </p>
            
            {/* Help Button */}
            <button
              type="button"
              className="text-white/95 hover:text-white text-sm transition-all inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 shadow-lg hover:shadow-xl transform hover:scale-110 font-bold text-lg"
              onClick={() => toast.info('Help center coming soon')}
            >
              ?
            </button>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 text-center text-sm text-white/70"
          >
            <p>© 2026 Benro Real Estate • Paragon Tenants Portal</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email to receive a password reset link.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              required
              disabled={isSendingReset}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="w-full h-12 bg-[#B7472A] hover:bg-[#9A3B22] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isSendingReset}
              onClick={handleForgotPassword}
            >
              {isSendingReset ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </DialogFooter>
          {resetEmailSent && (
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <div className="inline-flex items-center text-green-600">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Reset link sent to {forgotPasswordEmail}.
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Request Access Dialog */}
      <Dialog open={showRequestAccess} onOpenChange={setShowRequestAccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Access</DialogTitle>
            <DialogDescription>
              Fill out the form to request access to the tenant portal.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={requestData.fullName}
              onChange={(e) => setRequestData({ ...requestData, fullName: e.target.value })}
              className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              required
              disabled={isSubmittingRequest}
            />
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={requestData.email}
              onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
              className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              required
              disabled={isSubmittingRequest}
            />
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={requestData.phone}
              onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
              className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              required
              disabled={isSubmittingRequest}
            />
            <Input
              id="apartmentNumber"
              type="text"
              placeholder="Apartment Number"
              value={requestData.apartmentNumber}
              onChange={(e) => setRequestData({ ...requestData, apartmentNumber: e.target.value })}
              className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              required
              disabled={isSubmittingRequest}
            />
            <Input
              id="message"
              type="text"
              placeholder="Message"
              value={requestData.message}
              onChange={(e) => setRequestData({ ...requestData, message: e.target.value })}
              className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              required
              disabled={isSubmittingRequest}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="w-full h-12 bg-[#B7472A] hover:bg-[#9A3B22] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isSubmittingRequest}
              onClick={handleRequestAccess}
            >
              {isSubmittingRequest ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          </DialogFooter>
          {requestSubmitted && (
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <div className="inline-flex items-center text-green-600">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your request has been submitted.
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}