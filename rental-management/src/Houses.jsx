import React from "react";
import { useNavigate } from "react-router-dom";

const Houses = () => {
  const navigate = useNavigate();

  // Sample houses (later replace with fetch from backend)
  const houses = [
    {
      id: "house_1",
      title: "Sunset Apartments",
      description: "Spacious 3-bedroom apartments with parking.",
      imageUrl: "https://via.placeholder.com/400x200?text=Sunset+Apartments",
    },
    {
      id: "house_2",
      title: "Green Villas",
      description: "Modern villas with garden and pool access.",
      imageUrl: "https://via.placeholder.com/400x200?text=Green+Villas",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Houses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house) => (
          <div key={house.id} className="border rounded-lg shadow-lg overflow-hidden">
            <img src={house.imageUrl} alt={house.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{house.title}</h2>
              <p className="text-gray-600 mb-4">{house.description}</p>
              <button
                onClick={() => navigate(`/tenants/${house.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Tenants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Houses;
