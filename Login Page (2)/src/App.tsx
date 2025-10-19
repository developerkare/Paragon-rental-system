import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { BrandLogo } from "./components/BrandLogo";
import { ApartmentDashboard } from "./components/ApartmentDashboard";
import { ProfilePage } from "./components/ProfilePage";
import { SettingsPage } from "./components/SettingsPage";
import { HelpSupportPage } from "./components/HelpSupportPage";
import { TenantsPage } from "./components/TenantsPage";
import { ActiveTenantsPage } from "./components/ActiveTenantsPage";
import { FailedToPayPage } from "./components/FailedToPayPage";
import { TenantsLeftPage } from "./components/TenantsLeftPage";
import { VacantUnitsPage } from "./components/VacantUnitsPage";
import { PaymentHistoryPage } from "./components/PaymentHistoryPage";
import { Apartment } from "./components/ApartmentCard";
import { Tenant, Payment, ActivityLog } from "./components/TenantsPage";
import { ActivityLogPage } from "./components/ActivityLogPage";
import { UnitsPage } from "./components/UnitsPage";
import { Unit } from "./components/UnitsPage";

type View = "dashboard" | "profile" | "settings" | "help" | "tenants" | "activeTenants" | "failedToPay" | "tenantsLeft" | "vacantUnits" | "paymentHistory" | "activityLog" | "units";

// Initialize with sample units
const initialUnits: Unit[] = [
  {
    id: "1",
    unitNumber: "Unit 101",
    unitType: "2-bedroom",
    baseRent: 2000,
    charges: [
      { id: "c1", name: "Water", amount: 50, isOptional: false, type: "variable" },
      { id: "c2", name: "Electricity", amount: 80, isOptional: false, type: "variable" },
      { id: "c3", name: "Garbage", amount: 20, isOptional: false, type: "fixed" },
    ],
    status: "vacant",
    floor: 1,
    squareFeet: 850
  },
  {
    id: "2",
    unitNumber: "Unit 102",
    unitType: "3-bedroom",
    baseRent: 2500,
    charges: [
      { id: "c4", name: "Water", amount: 60, isOptional: false, type: "variable" },
      { id: "c5", name: "Electricity", amount: 100, isOptional: false, type: "variable" },
      { id: "c6", name: "Parking", amount: 50, isOptional: true, type: "fixed" },
    ],
    status: "vacant",
    floor: 1,
    squareFeet: 1200
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [vacantUnits, setVacantUnits] = useState<string[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [currentUser] = useState({ id: "1", name: "Admin User", email: "admin@company.com" });

  const handleViewTenants = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setCurrentView("tenants");
  };

  const handleNavigateToSubPage = (view: View) => {
    setCurrentView(view);
  };

  if (isLoggedIn) {
    return (
      <>
        {currentView === "dashboard" && (
          <ApartmentDashboard 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            onViewTenants={handleViewTenants}
          />
        )}
        {currentView === "profile" && (
          <ProfilePage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === "settings" && (
          <SettingsPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === "help" && (
          <HelpSupportPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === "tenants" && selectedApartment && (
          <TenantsPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartment={selectedApartment}
            onBack={() => setCurrentView("dashboard")}
            tenants={tenants}
            setTenants={setTenants}
            vacantUnits={vacantUnits}
            setVacantUnits={setVacantUnits}
            onNavigateToSubPage={handleNavigateToSubPage}
          />
        )}
        {currentView === "activeTenants" && selectedApartment && (
          <ActiveTenantsPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            tenants={tenants}
            setTenants={setTenants}
            payments={payments}
            setPayments={setPayments}
            activityLogs={activityLogs}
            setActivityLogs={setActivityLogs}
            currentUser={currentUser}
          />
        )}
        {currentView === "failedToPay" && selectedApartment && (
          <FailedToPayPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            tenants={tenants}
            setTenants={setTenants}
          />
        )}
        {currentView === "tenantsLeft" && selectedApartment && (
          <TenantsLeftPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            tenants={tenants}
            setTenants={setTenants}
          />
        )}
        {currentView === "vacantUnits" && selectedApartment && (
          <VacantUnitsPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            vacantUnits={vacantUnits}
            setVacantUnits={setVacantUnits}
          />
        )}
        {currentView === "paymentHistory" && selectedApartment && (
          <PaymentHistoryPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            tenants={tenants}
            payments={payments}
            setPayments={setPayments}
          />
        )}
        {currentView === "activityLog" && selectedApartment && (
          <ActivityLogPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            activityLogs={activityLogs}
          />
        )}
        {currentView === "units" && selectedApartment && (
          <UnitsPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            units={units}
            setUnits={setUnits}
            tenants={tenants}
          />
        )}
      </>
    );
  }

  return (
    <div className="size-full flex">
      {/* Left side - Brand section */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-neutral-900" />
        <BrandLogo />
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-neutral-50 p-8">
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      </div>
    </div>
  );
}
