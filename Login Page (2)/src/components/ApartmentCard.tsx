import { useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Apartment {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ApartmentCardProps {
  apartment: Apartment;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onViewTenants: (apartment: Apartment) => void;
}

export function ApartmentCard({ apartment, onDelete, isSelected, onSelect, onViewTenants }: ApartmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? "ring-4 ring-blue-500 shadow-xl" : "hover:shadow-xl"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(apartment.id)}
    >
      {/* Square Image Container */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <ImageWithFallback
          src={apartment.imageUrl}
          alt={apartment.name}
          className="size-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Delete Button - Shows on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(apartment.id);
          }}
          className={`absolute top-3 right-3 size-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <Trash2 className="size-5" />
        </button>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-3 left-3 size-6 bg-blue-500 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
            <svg
              className="size-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="mb-2">{apartment.name}</h3>
        <p className="text-neutral-600 mb-4 line-clamp-2">{apartment.description}</p>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onViewTenants(apartment);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          View Tenants
        </Button>
      </div>
    </div>
  );
}
