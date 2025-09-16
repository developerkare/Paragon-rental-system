import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TenantDetailsPage = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();

  // Example tenants data (later replace with API call)
  const allTenants = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "0712345678", houseId: "house_1" },
    { id: 2, name: "Mary Jane", email: "mary@example.com", phone: "0723456789", houseId: "house_1" },
    { id: 3, name: "Alex Kim", email: "alex@example.com", phone: "0734567890", houseId: "house_2" },
  ];

  const tenant = allTenants.find((t) => t.id.toString() === tenantId);

  const [deleteReason, setDeleteReason] = useState("");

  if (!tenant) {
    return <p className="p-6">Tenant not found.</p>;
  }

  const handleBilling = () => {
    // Pass tenant info to billing page
    navigate("/billing", { state: { tenant } });
  };

  const handleDelete = () => {
    if (!deleteReason.trim()) {
      alert("Please provide a reason before deleting this tenant.");
      return;
    }
    alert(`Tenant ${tenant.name} deleted for reason: ${deleteReason}`);
    navigate(-1); // Go back after deletion
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Tenant Details</h1>
      <div className="border rounded p-4 shadow">
        <p><strong>Name:</strong> {tenant.name}</p>
        <p><strong>Email:</strong> {tenant.email}</p>
        <p><strong>Phone:</strong> {tenant.phone}</p>
        <p><strong>House ID:</strong> {tenant.houseId}</p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleBilling}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Billing
        </button>

        <div>
          <textarea
            className="border p-2 rounded w-64"
            placeholder="Reason for deleting..."
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
          />
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2 block"
          >
            Delete Tenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDetailsPage;
