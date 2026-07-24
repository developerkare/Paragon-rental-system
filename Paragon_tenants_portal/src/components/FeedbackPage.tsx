import { useState } from 'react';
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
import { Checkbox } from './ui/checkbox';
import { Star, UserX } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAnonymous) {
      toast.success('Thank you for your anonymous feedback!');
    } else {
      toast.success('Thank you for your feedback!');
    }
    
    setRating(0);
    setIsAnonymous(false);
    setFormData({ category: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2>Feedback</h2>
        <p className="text-gray-600">Share your thoughts and help us improve</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
          <CardDescription>
            We value your opinion and appreciate your feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Overall Rating *</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600">
                  You rated: {rating} star{rating !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service Quality</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="cleanliness">Cleanliness</SelectItem>
                  <SelectItem value="staff">Staff Behavior</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="Brief description of your feedback"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Feedback *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Please share your detailed feedback..."
                rows={6}
                required
              />
            </div>

            {/* Anonymous Feedback Option */}
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="anonymous" className="cursor-pointer flex items-center gap-2">
                    <UserX className="h-4 w-4 text-gray-600" />
                    Submit anonymously
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Your identity will not be shared with your feedback
                  </p>
                </div>
              </div>
              {isAnonymous && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <UserX className="h-4 w-4" />
                    This feedback will be submitted anonymously
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setRating(0);
                  setIsAnonymous(false);
                  setFormData({ category: '', subject: '', message: '' });
                }}
              >
                Clear
              </Button>
              <Button type="submit">Submit Feedback</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p>Great maintenance service</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">2025-10-20</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                The maintenance team was very prompt and professional. Fixed the issue within 24 hours.
              </p>
              <p className="text-xs text-gray-500">Service Quality</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-2">
                    <UserX className="h-4 w-4 text-gray-500" />
                    Anonymous Feedback
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <span className="text-sm text-gray-500">2025-10-18</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                The facility is generally clean but could use more frequent cleaning in common areas.
              </p>
              <p className="text-xs text-gray-500">Cleanliness</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p>Excellent staff support</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= 4
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">2025-10-15</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Staff is always helpful and responsive to queries.
              </p>
              <p className="text-xs text-gray-500">Staff Behavior</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}