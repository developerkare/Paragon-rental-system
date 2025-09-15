import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./Login";
import RentalManagementSystem from "./RentalManagementSystem";
import TenantManagement from "./TenantManagement";
import Houses from "./Houses";
import TenantsPage from "./TenantsPage";
import Footer from "./Footer";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-blue-600 text-white p-4 flex space-x-4">
          <Link to="/">Login</Link>
          <Link to="/home">Houses</Link>
          <Link to="/billing">Billing</Link>
          <Link to="/tenants">Tenants Mgmt</Link>
        </nav>

        {/* Main Content */}
        <main className="flex-grow p-6">
          <Routes>
            <Route
              path="/"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            {/* Protected Routes */}
            <Route
              path="/billing"
              element={
                isAuthenticated ? (
                  <RentalManagementSystem />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/home"
              element={isAuthenticated ? <Houses /> : <Navigate to="/" />}
            />
            <Route
              path="/tenants"
              element={isAuthenticated ? <TenantManagement /> : <Navigate to="/" />}
            />
            <Route
              path="/tenants/:houseId"
              element={isAuthenticated ? <TenantsPage /> : <Navigate to="/" />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
