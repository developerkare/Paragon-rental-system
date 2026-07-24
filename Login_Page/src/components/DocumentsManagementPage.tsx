import { useState } from "react";
import { Navigation } from "./Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Search,
  Filter,
  File,
  Image,
  FileCheck,
  AlertCircle,
  Home,
  Users,
  Folder
} from "lucide-react";
import { UserAccount } from "../types/roles";
import { Apartment } from "./ApartmentCard";
import { Tenant } from "./TenantsPage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";

type DocumentType = "lease" | "ownership" | "permit" | "identification" | "other";
type DocumentCategory = "property" | "tenant" | "general";

interface Document {
  id: string;
  name: string;
  type: DocumentType;
  category: DocumentCategory;
  relatedTo?: string; // Property ID or Tenant ID
  relatedName?: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  fileUrl?: string;
  approvalStatus?: "pending" | "approved" | "rejected";
}

interface DocumentsManagementPageProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
  currentUser: UserAccount;
  apartments: Apartment[];
  tenants: Tenant[];
}

export function DocumentsManagementPage({ 
  onLogout, 
  onNavigate,
  currentUser,
  apartments,
  tenants
}: DocumentsManagementPageProps) {
  // Check permissions
  if (!currentUser.permissions.uploadDocuments) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation 
          onLogout={onLogout} 
          onNavigate={onNavigate} 
          currentView="documents"
          currentUser={currentUser}
        />
        <div className="p-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl mb-2">Access Denied</h2>
              <p className="text-neutral-600">You don't have permission to manage documents.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Lease Agreement - Unit 101.pdf",
      type: "lease",
      category: "property",
      relatedTo: "1",
      relatedName: "Sunset Apartments - Unit 101",
      uploadedBy: "Admin User",
      uploadDate: "2026-01-15",
      size: "245 KB",
      approvalStatus: "approved"
    },
    {
      id: "2",
      name: "Property Ownership Certificate.pdf",
      type: "ownership",
      category: "property",
      relatedTo: "1",
      relatedName: "Sunset Apartments",
      uploadedBy: "Admin User",
      uploadDate: "2026-01-10",
      size: "180 KB",
      approvalStatus: "approved"
    },
    {
      id: "3",
      name: "Building Permit 2026.pdf",
      type: "permit",
      category: "property",
      relatedTo: "2",
      relatedName: "Harbor View Residences",
      uploadedBy: "Admin User",
      uploadDate: "2026-01-20",
      size: "320 KB",
      approvalStatus: "pending"
    },
    {
      id: "4",
      name: "Tenant ID - John Doe.jpg",
      type: "identification",
      category: "tenant",
      relatedTo: "t1",
      relatedName: "John Doe",
      uploadedBy: "Admin User",
      uploadDate: "2026-01-25",
      size: "450 KB",
      approvalStatus: "approved"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<DocumentType | "all">("all");
  const [filterCategory, setFilterCategory] = useState<DocumentCategory | "all">("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Form state for upload
  const [uploadForm, setUploadForm] = useState({
    name: "",
    type: "lease" as DocumentType,
    category: "property" as DocumentCategory,
    relatedTo: "",
  });

  const handleUpload = () => {
    if (!uploadForm.name) {
      toast.error("Please provide a document name");
      return;
    }

    const newDoc: Document = {
      id: Date.now().toString(),
      name: uploadForm.name,
      type: uploadForm.type,
      category: uploadForm.category,
      relatedTo: uploadForm.relatedTo || undefined,
      relatedName: uploadForm.category === "property" 
        ? apartments.find(a => a.id === uploadForm.relatedTo)?.name 
        : tenants.find(t => t.id === uploadForm.relatedTo)?.name,
      uploadedBy: currentUser.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${Math.floor(Math.random() * 500)}KB`,
      approvalStatus: "pending"
    };

    setDocuments([...documents, newDoc]);
    toast.success("Document uploaded successfully", {
      description: "Awaiting manager approval"
    });
    
    setIsUploadDialogOpen(false);
    setUploadForm({
      name: "",
      type: "lease",
      category: "property",
      relatedTo: "",
    });
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
    toast.success("Document deleted");
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.relatedName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case "lease":
        return <FileCheck className="h-4 w-4 text-blue-500" />;
      case "ownership":
        return <FileText className="h-4 w-4 text-purple-500" />;
      case "permit":
        return <File className="h-4 w-4 text-green-500" />;
      case "identification":
        return <Image className="h-4 w-4 text-orange-500" />;
      default:
        return <File className="h-4 w-4 text-neutral-500" />;
    }
  };

  const getCategoryIcon = (category: DocumentCategory) => {
    switch (category) {
      case "property":
        return <Home className="h-3 w-3" />;
      case "tenant":
        return <Users className="h-3 w-3" />;
      default:
        return <Folder className="h-3 w-3" />;
    }
  };

  const getStatusBadge = (status?: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation 
        onLogout={onLogout} 
        onNavigate={onNavigate} 
        currentView="documents"
        currentUser={currentUser}
      />
      
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-neutral-900 mb-2">Documents Management</h1>
            <p className="text-neutral-600">
              Upload and manage leases, ownership documents, permits, and tenant identification
            </p>
          </div>
          
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Upload leases, permits, ownership docs, or tenant IDs
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="docName">Document Name *</Label>
                  <Input
                    id="docName"
                    placeholder="e.g., Lease Agreement - Unit 101"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="docType">Document Type *</Label>
                  <Select 
                    value={uploadForm.type}
                    onValueChange={(value) => setUploadForm({...uploadForm, type: value as DocumentType})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lease">Lease Agreement</SelectItem>
                      <SelectItem value="ownership">Ownership Document</SelectItem>
                      <SelectItem value="permit">Building Permit</SelectItem>
                      <SelectItem value="identification">Tenant ID</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="docCategory">Category *</Label>
                  <Select 
                    value={uploadForm.category}
                    onValueChange={(value) => setUploadForm({...uploadForm, category: value as DocumentCategory, relatedTo: ""})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property">Property</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {uploadForm.category === "property" && (
                  <div>
                    <Label htmlFor="relatedProperty">Related Property</Label>
                    <Select 
                      value={uploadForm.relatedTo}
                      onValueChange={(value) => setUploadForm({...uploadForm, relatedTo: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a property" />
                      </SelectTrigger>
                      <SelectContent>
                        {apartments.map((apt) => (
                          <SelectItem key={apt.id} value={apt.id}>
                            {apt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {uploadForm.category === "tenant" && (
                  <div>
                    <Label htmlFor="relatedTenant">Related Tenant</Label>
                    <Select 
                      value={uploadForm.relatedTo}
                      onValueChange={(value) => setUploadForm({...uploadForm, relatedTo: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tenant" />
                      </SelectTrigger>
                      <SelectContent>
                        {tenants.map((tenant) => (
                          <SelectItem key={tenant.id} value={tenant.id}>
                            {tenant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="file">Upload File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Accepted: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                  </p>
                </div>

                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={handleUpload}
                >
                  Upload Document
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-neutral-600">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="text-2xl">{documents.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-neutral-600">Leases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-purple-500" />
                <span className="text-2xl">{documents.filter(d => d.type === "lease").length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-neutral-600">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl">{documents.filter(d => d.approvalStatus === "pending").length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-neutral-600">Tenant IDs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5 text-orange-500" />
                <span className="text-2xl">{documents.filter(d => d.type === "identification").length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="search">Search Documents</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or related item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="filterType">Filter by Type</Label>
                <Select value={filterType} onValueChange={(value) => setFilterType(value as DocumentType | "all")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="lease">Lease</SelectItem>
                    <SelectItem value="ownership">Ownership</SelectItem>
                    <SelectItem value="permit">Permit</SelectItem>
                    <SelectItem value="identification">ID</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="filterCategory">Filter by Category</Label>
                <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as DocumentCategory | "all")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardContent className="p-0">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600">No documents found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Related To</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(doc.type)}
                          <span>{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{doc.type}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          {getCategoryIcon(doc.category)}
                          <span className="capitalize">{doc.category}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.relatedName || "-"}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{getStatusBadge(doc.approvalStatus)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
