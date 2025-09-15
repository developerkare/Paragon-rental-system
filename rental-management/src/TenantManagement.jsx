import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

const TenantManagement = () => {
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loggedInTenant, setLoggedInTenant] = useState(null);

  // handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle login input
  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // add tenant
  const addTenant = () => {
    if (form.name && form.email && form.password) {
      setTenants([...tenants, form]);
      setForm({ name: "", email: "", password: "" });
    }
  };

  // delete tenant
  const deleteTenant = (email) => {
    setTenants(tenants.filter((t) => t.email !== email));
  };

  // login tenant
  const loginTenant = () => {
    const found = tenants.find(
      (t) => t.email === login.email && t.password === login.password
    );
    if (found) {
      setLoggedInTenant(found);
      alert(`Welcome ${found.name}`);
    } else {
      alert("Invalid credentials");
    }
    setLogin({ email: "", password: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tenant Management</h1>

      {/* Add Tenant Form */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Add Tenant</h2>
          <input
            type="text"
            name="name"
            placeholder="Tenant Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Tenant Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Tenant Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <Button onClick={addTenant}>Add Tenant</Button>
        </CardContent>
      </Card>

      {/* Tenant Login */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Tenant Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={login.email}
            onChange={handleLoginChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleLoginChange}
            className="border p-2 rounded w-full"
          />
          <Button onClick={loginTenant}>Login</Button>
        </CardContent>
      </Card>

      {/* Show Tenants */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Tenant List</h2>
          {tenants.length === 0 ? (
            <p>No tenants added yet.</p>
          ) : (
            <ul className="space-y-2">
              {tenants.map((tenant, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>{tenant.name} ({tenant.email})</span>
                  <Button
                    variant="destructive"
                    onClick={() => deleteTenant(tenant.email)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {loggedInTenant && (
        <div className="p-4 bg-green-100 rounded">
          <p className="font-bold">Logged in as: {loggedInTenant.name}</p>
        </div>
      )}
    </div>
  );
};

export default TenantManagement;
