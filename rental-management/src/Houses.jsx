import React from "react";
import { useNavigate } from "react-router-dom";
import houseImg1 from "./assets/pexels-ayyeee-ayyeee-434363205-16514712.jpg";
import houseImg2 from "./assets/pixasquare-4ojhpgKpS68-unsplash.jpg";


const Houses = () => {
  const navigate = useNavigate();

  // 🏠 Add or update your house data here
  // 👉 Replace the imageUrl values with actual image paths:
  //    - If hosted online: use a URL ("https://...jpg")
  //    - If inside your project (src/assets): import first, then assign (see below 👇)
  const houses = [
    {
      id: "house_1",
      title: "Sunset Apartments",
      description: "Spacious 3-bedroom apartments with parking.",
      imageUrl: houseImg1,
    },
    {
      id: "house_2",
      title: "Green Villas",
      description: "Modern villas with garden and pool access.",
      imageUrl: houseImg2,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Houses</h1>
      <div className="flex flex-col space-y-6">
        {houses.map((house) => (
          <div
            key={house.id}
            className="border rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            {/* House Image */}
            <img
              src={house.imageUrl}
              alt={house.title}
              className="w-full h-56 object-cover"
            />

            {/* House Details */}
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
