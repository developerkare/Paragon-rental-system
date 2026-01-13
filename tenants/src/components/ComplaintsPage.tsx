import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { Plus, Clock, CheckCircle, XCircle, AlertCircle, Trash2, Eye, Filter, Search } from 'lucide-react';

interface Complaint {
  id: number;
  title: string;
  category: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  // Load complaints from localStorage
  useEffect(() => {
    const savedComplaints = localStorage.getItem('tenantComplaints');
    if (savedComplaints) {
      try {
        const parsed = JSON.parse(savedComplaints);
        setComplaints(parsed);
      } catch (error) {
        console.error('Error loading complaints:', error);
      }
    } else {
      // Set default complaints
      const defaultComplaints = [
        {
          id: 1,
          title: 'Leaking faucet in bathroom',
          category: 'Plumbing',
          description: 'The bathroom faucet has been leaking for the past 3 days.',
          status: 'in-progress' as const,
          date: '2025-10-25',
          priority: 'medium' as const,
        },
        {
          id: 2,
          title: 'Broken window lock',
          category: 'Security',
          description: 'The lock on the bedroom window is broken and needs replacement.',
          status: 'pending' as const,
          date: '2025-10-26',
          priority: 'high' as const,
        },
        {
          id: 3,
          title: 'AC not cooling properly',
          category: 'HVAC',
          description: 'The air conditioner is running but not cooling the room effectively.',
          status: 'resolved' as const,
          date: '2025-10-20',
          priority: 'high' as const,
        },
      ];
      setComplaints(defaultComplaints);
      localStorage.setItem('tenantComplaints', JSON.stringify(defaultComplaints));
    }
  }, []);

  // Filter and search complaints
  useEffect(() => {
    let result = [...complaints];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (complaint) =>
          complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((complaint) => complaint.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter((complaint) => complaint.priority === priorityFilter);
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter((complaint) => complaint.category === categoryFilter);
    }

    setFilteredComplaints(result);
  }, [complaints, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  // Save complaints to localStorage
  const saveComplaints = (updatedComplaints: Complaint[]) => {
    setComplaints(updatedComplaints);
    localStorage.setItem('tenantComplaints', JSON.stringify(updatedComplaints));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const complaint: Complaint = {
      id: Date.now(), // Use timestamp for unique ID
      ...newComplaint,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    saveComplaints([complaint, ...complaints]);
    setNewComplaint({ title: '', category: '', description: '', priority: 'medium' });
    setIsDialogOpen(false);
    toast.success('Complaint submitted successfully!');
  };

  const handleUpdateStatus = (id: number, newStatus: Complaint['status']) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    );
    saveComplaints(updatedComplaints);
    toast.success('Complaint status updated!');
  };

  const handleDeleteComplaint = (id: number) => {
    if (confirm('Are you sure you want to delete this complaint?')) {
      const updatedComplaints = complaints.filter((complaint) => complaint.id !== id);
      saveComplaints(updatedComplaints);
      setViewDialogOpen(false);
      toast.success('Complaint deleted successfully!');
    }
  };

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setViewDialogOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
    toast.info('Filters cleared');
  };

  const getStatusIcon = (status: Complaint['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'closed':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'in-progress':
        return 'bg-blue-50 text-blue-700';
      case 'resolved':
        return 'bg-green-50 text-green-700';
      case 'closed':
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getPriorityColor = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-50 text-gray-700';
      case 'medium':
        return 'bg-orange-50 text-orange-700';
      case 'high':
        return 'bg-red-50 text-red-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2>Complains</h2>
          <p className="text-gray-600">Submit and track your maintenance complains</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit New Complaint</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit a complaint. We'll respond within 24-48 hours.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newComplaint.category}
                  onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Appliances">Appliances</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={newComplaint.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') =>
                    setNewComplaint({ ...newComplaint, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search complains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="HVAC">HVAC</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Appliances">Appliances</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all') && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredComplaints.length} of {complaints.length} complains
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{complaint.title}</CardTitle>
                <Badge className={getPriorityColor(complaint.priority)}>
                  {complaint.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(complaint.status)}>
                  {getStatusIcon(complaint.status)}
                  <span className="ml-1">{complaint.status}</span>
                </Badge>
                <span className="text-sm text-gray-500">{complaint.category}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{complaint.description}</p>
              <p className="text-xs text-gray-500">Submitted: {complaint.date}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewComplaint(complaint)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredComplaints.length === 0 && complaints.length > 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <Filter className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No complains match your filters.</p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear filters
            </Button>
          </CardContent>
        </Card>
      )}

      {filteredComplaints.length === 0 && complaints.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No complains submitted yet. Click "New Complaint" to submit one.</p>
          </CardContent>
        </Card>
      )}

      {/* View Complaint Detail Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              View and manage complaint information
            </DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <p className="mt-1">{selectedComplaint.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <p className="mt-1">{selectedComplaint.category}</p>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedComplaint.priority)} variant="secondary">
                      {selectedComplaint.priority}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="mt-1 text-gray-600">{selectedComplaint.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(selectedComplaint.status)}>
                        {getStatusIcon(selectedComplaint.status)}
                        <span className="ml-1">{selectedComplaint.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Submitted Date</Label>
                    <p className="mt-1">{selectedComplaint.date}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Update Status</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedComplaint.status === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'pending')}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pending
                  </Button>
                  <Button
                    variant={selectedComplaint.status === 'in-progress' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'in-progress')}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    In Progress
                  </Button>
                  <Button
                    variant={selectedComplaint.status === 'resolved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'resolved')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolved
                  </Button>
                  <Button
                    variant={selectedComplaint.status === 'closed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'closed')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Closed
                  </Button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteComplaint(selectedComplaint.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Complaint
                </Button>
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}