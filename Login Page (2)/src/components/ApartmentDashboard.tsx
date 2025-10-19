import { useState } from "react";
import { Navigation } from "./Navigation";
import { ApartmentCard, Apartment } from "./ApartmentCard";
import { AddApartmentDialog } from "./AddApartmentDialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface ApartmentDashboardProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onViewTenants: (apartment: Apartment) => void;
}

const initialApartments: Apartment[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    description: "Spacious 3-bedroom apartments with parking. Modern amenities and beautiful city views.",
    imageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjAzNjMxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    name: "Harbor View Residences",
    description: "Luxury waterfront apartments with premium finishes and stunning harbor views.",
    imageUrl: "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyOTQ1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    name: "Downtown Lofts",
    description: "Urban living at its finest. Contemporary design with easy access to the city center.",
    imageUrl: "https://images.unsplash.com/photo-1565363887715-8884629e09ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MDM0MTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function ApartmentDashboard({ onLogout, onNavigate, onViewTenants }: ApartmentDashboardProps) {
  const [apartments, setApartments] = useState<Apartment[]>(initialApartments);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setApartments(apartments.filter((apt) => apt.id !== id));
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddApartment = (apartmentData: Omit<Apartment, "id">) => {
    const newApartment: Apartment = {
      id: Date.now().toString(),
      ...apartmentData,
    };
    setApartments([...apartments, newApartment]);
  };

  return (
    <div className="size-full flex flex-col bg-neutral-50">
      {/* Navigation */}
      <Navigation onLogout={onLogout} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1>Available Houses</h1>
              <p className="text-neutral-600 mt-1">
                Manage your apartment properties
              </p>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Plus className="size-5" />
              Add Apartment
            </Button>
          </div>

          {/* Apartment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                onDelete={handleDelete}
                isSelected={selectedIds.has(apartment.id)}
                onSelect={handleSelect}
                onViewTenants={onViewTenants}
              />
            ))}
          </div>

          {apartments.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-500 mb-4">No apartments available</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="size-5 mr-2" />
                Add Your First Apartment
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Apartment Dialog */}
      <AddApartmentDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddApartment}
      />
    </div>
  );
}
