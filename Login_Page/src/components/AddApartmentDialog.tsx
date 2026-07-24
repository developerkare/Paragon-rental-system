import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Apartment } from "./ApartmentCard";
import { createApartment } from "../utils/auth";
import { toast } from "sonner@2.0.3";

interface AddApartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (apartment: Apartment) => void;
}

export function AddApartmentDialog({ open, onOpenChange, onAdd }: AddApartmentDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[AddApartmentDialog] Form submitted');
    console.log('[AddApartmentDialog] Form values:', { name, description, address, imageUrl: imageUrl ? 'yes' : 'no', previewImage: previewImage ? 'yes' : 'no' });
    
    if (!name || !description) {
      console.warn('[AddApartmentDialog] Validation failed - missing name or description');
      toast.error("Validation Error", {
        description: "Please fill in all required fields (name and description)"
      });
      return;
    }

    console.log('[AddApartmentDialog] Validation passed, starting request...');
    setIsLoading(true);

    try {
      const finalImageUrl = previewImage || "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

      console.log('[AddApartmentDialog] Creating apartment with:', { 
        name, 
        description, 
        address,
        imageUrl: finalImageUrl ? 'yes' : 'no'
      });

      const newApartment = await createApartment({
        name,
        description,
        imageUrl: finalImageUrl,
        address,
        hasUnitsConfigured: false
      });

      console.log('[AddApartmentDialog] SUCCESS! Created apartment:', newApartment);

      toast.success("Success!", {
        description: `Apartment "${name}" has been added successfully.`
      });

      onAdd({
        id: newApartment.id,
        name: newApartment.name,
        description: newApartment.description,
        imageUrl: newApartment.imageUrl,
        hasUnitsConfigured: newApartment.hasUnitsConfigured,
      });
      
      // Reset form
      setName("");
      setDescription("");
      setImageUrl("");
      setAddress("");
      setPreviewImage("");
      onOpenChange(false);
    } catch (error: any) {
      console.error('[AddApartmentDialog] ERROR creating apartment:', error);
      console.error('[AddApartmentDialog] Error message:', error.message);
      console.error('[AddApartmentDialog] Error stack:', error.stack);
      
      // Check if it's an auth error
      if (error.message.includes('Unauthorized') || error.message.includes('No token') || error.message.includes('No authentication')) {
        console.error('[AddApartmentDialog] Auth error detected');
        toast.error("Authentication Error", {
          description: "Your session has expired. Please login again."
        });
        // Wait a moment then reload to show login
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        toast.error("Error", {
          description: error.message || "Failed to add apartment. Please try again."
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
    setPreviewImage(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Apartment</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new apartment property to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <Label>Property Image *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Preview */}
                <div className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="size-12 mx-auto text-neutral-400 mb-2" />
                      <p className="text-neutral-500">Image preview</p>
                    </div>
                  )}
                </div>

                {/* Upload Options */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-neutral-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50">
                        <Upload className="size-5" />
                        <span>Upload Image</span>
                      </div>
                    </Label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isLoading}
                      className="hidden"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-neutral-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-2 text-neutral-500">or</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Sunset Apartments"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="e.g., 123 Main Street, City, State 12345"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the property, amenities, features, location benefits, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                rows={4}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Apartment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
