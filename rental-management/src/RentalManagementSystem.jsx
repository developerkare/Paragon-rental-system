import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

export default function RentalManagementSystem() {
  const [form, setForm] = useState({
    staffName: "",
    staffContact: "",
    houseNo: "",
    tenantName: "",
    idNumber: "",
    tenantContact: "",
    rooms: "",
    rent: "",
    waterUnits: "",
    paymentDate: "",
    deposit: "0",
  });

  const [bill, setBill] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateBill = () => {
    const waterRate = 150; // example per unit
    const total = Number(form.rent || 0) + Number(form.waterUnits || 0) * waterRate;

    setBill({
      billNumber: Math.floor(Math.random() * 10000),
      ...form,
      total,
    });
    alert(`Bill Number ${Math.floor(Math.random() * 10000)} saved successfully`);
  };

  const clearForm = () => {
    setForm({
      staffName: "",
      staffContact: "",
      houseNo: "",
      tenantName: "",
      idNumber: "",
      tenantContact: "",
      rooms: "",
      rent: "",
      waterUnits: "",
      paymentDate: "",
      deposit: "0",
    });
    setBill(null);
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Rental Management System</h1>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="space-y-3">
            <h2 className="font-semibold">Served By</h2>
            <input className="w-full p-2 border rounded" name="staffName" placeholder="Name" value={form.staffName} onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="staffContact" placeholder="Contact" value={form.staffContact} onChange={handleChange} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3">
            <h2 className="font-semibold">Payment</h2>
            <input className="w-full p-2 border rounded" name="houseNo" placeholder="House No" value={form.houseNo} onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="tenantName" placeholder="Tenant Name" value={form.tenantName} onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="idNumber" placeholder="ID Number" value={form.idNumber} onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="tenantContact" placeholder="Contact" value={form.tenantContact} onChange={handleChange} />
            <input className="w-full p-2 border rounded" name="rooms" placeholder="No of Rooms" value={form.rooms} onChange={handleChange} />
            <input className="w-full p-2 border rounded" type="number" name="rent" placeholder="Rent Amount" value={form.rent} onChange={handleChange} />
            <input className="w-full p-2 border rounded" type="number" name="waterUnits" placeholder="Water Units" value={form.waterUnits} onChange={handleChange} />
            <input className="w-full p-2 border rounded" type="date" name="paymentDate" value={form.paymentDate} onChange={handleChange} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <Button onClick={calculateBill}>TOTAL</Button>
        <Button onClick={() => window.print()}>PRINT</Button>
        <Button variant="destructive" onClick={clearForm}>CLEAR</Button>
      </div>

      {bill && (
        <Card className="mt-6">
          <CardContent>
            <h2 className="font-bold text-lg">Bill Area</h2>
            <pre className="whitespace-pre-wrap mt-2">
              {`**Hello Tenant**
Bill Number: ${bill.billNumber}
Customer Name: ${bill.staffName}
Contact: ${bill.staffContact}
-----------------------------------
Tenant Name: ${bill.tenantName}
ID Number: ${bill.idNumber}
Contact: ${bill.tenantContact}
Rooms: ${bill.rooms}
Rent: ${bill.rent}
Water Units: ${bill.waterUnits}
Payment Date: ${bill.paymentDate}
-----------------------------------
Total Amount: ${bill.total}
`}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}