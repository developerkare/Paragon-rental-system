import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const TenantsPage = () => {
  const { houseId } = useParams();
  const navigate = useNavigate();

  const allTenants = [
    { id: 1, name: "John Doe", email: "john@example.com", houseId: "house_1" },
    { id: 2, name: "Mary Jane", email: "mary@example.com", houseId: "house_1" },
    { id: 3, name: "Alex Kim", email: "alex@example.com", houseId: "house_2" },
  ];

  const tenants = allTenants.filter((t) => t.houseId === houseId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tenants for {houseId}</h1>
      {tenants.length === 0 ? (
        <p>No tenants found for this house.</p>
      ) : (
        <ul className="space-y-3">
          {tenants.map((tenant) => (
            <li
              key={tenant.id}
              onClick={() => navigate(`/tenant/${tenant.id}`)}
              className="border p-3 rounded shadow cursor-pointer hover:bg-gray-100"
            >
              <p className="font-semibold">{tenant.name}</p>
              <p className="text-gray-600">{tenant.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TenantsPage;
