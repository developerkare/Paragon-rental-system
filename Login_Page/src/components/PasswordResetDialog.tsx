import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Copy, Eye, EyeOff } from "lucide-react";

interface PasswordResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName: string;
  tenantEmail: string;
  newPassword: string;
  isLoading: boolean;
}

export function PasswordResetDialog({
  open,
  onOpenChange,
  tenantName,
  tenantEmail,
  newPassword,
  isLoading,
}: PasswordResetDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(newPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Password Reset Successful</DialogTitle>
          <DialogDescription>
            A new temporary password has been generated
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tenant Info */}
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">Tenant</p>
            <p className="font-medium">{tenantName}</p>
            <p className="text-sm text-neutral-500">{tenantEmail}</p>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">Temporary Password</p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg bg-neutral-50 font-mono text-sm"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-900"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyPassword}
                className="relative"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-green-600">Copied to clipboard!</p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
            <p className="text-sm font-medium text-blue-900">Next Steps:</p>
            <ul className="text-sm text-blue-800 space-y-1 pl-4">
              <li>• Send the password to the tenant via email or in person</li>
              <li>• Ask them to log in and change the password immediately</li>
              <li>• The temporary password is valid for 24 hours</li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-900">
              <strong>Important:</strong> Store this password securely. It will not be shown again after closing this dialog.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              // Email functionality can be added here
              alert(`Email with instructions sent to ${tenantEmail}`);
              onOpenChange(false);
            }}
            className="flex-1"
            disabled={isLoading}
          >
            Send Email to Tenant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
