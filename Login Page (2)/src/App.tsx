import { useState } from "react";
import { LoginForm, UserCredentials } from "./components/LoginForm";
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
import { FinancialReportsPage } from "./components/FinancialReportsPage";
import { UserManagementPage, UserRole, defaultPermissionsByRole } from "./components/UserManagementPage";
import { AdvertisementPage } from "./components/AdvertisementPage";
import { HousesManagementPage } from "./components/HousesManagementPage";
import { Toaster } from "./components/ui/sonner";

type View = "dashboard" | "profile" | "settings" | "help" | "tenants" | "activeTenants" | "failedToPay" | "tenantsLeft" | "vacantUnits" | "paymentHistory" | "activityLog" | "units" | "financialReports" | "userManagement" | "advertisements" | "houses";

// Initialize with sample apartments
const initialApartments: Apartment[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    description: "Spacious 3-bedroom apartments with parking. Modern amenities and beautiful city views.",
    imageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjAzNjMxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hasUnitsConfigured: true,
  },
  {
    id: "2",
    name: "Harbor View Residences",
    description: "Luxury waterfront apartments with premium finishes and stunning harbor views.",
    imageUrl: "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAyOTQ1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hasUnitsConfigured: false,
  },
  {
    id: "3",
    name: "Downtown Lofts",
    description: "Urban living at its finest. Contemporary design with easy access to the city center.",
    imageUrl: "https://images.unsplash.com/photo-1565363887715-8884629e09ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MDM0MTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    hasUnitsConfigured: false,
  },
];

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
  const [apartments, setApartments] = useState<Apartment[]>(initialApartments);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [vacantUnits, setVacantUnits] = useState<string[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [users, setUsers] = useState<UserRole[]>([]);
  
  // Initialize admin user
  const [currentUser, setCurrentUser] = useState<UserRole>({ 
    id: "1", 
    name: "Admin User", 
    email: "admin@company.com",
    role: "admin",
    status: "active",
    createdDate: "2024-01-01",
    lastLogin: new Date().toISOString().split('T')[0],
    password: "admin123",
    tempPassword: false,
    permissions: defaultPermissionsByRole.admin
  });

  const handleLogin = (credentials: UserCredentials) => {
    setIsLoggedIn(true);
    // Convert credentials to UserRole format
    setCurrentUser({
      id: Date.now().toString(),
      name: credentials.name,
      email: credentials.email,
      role: credentials.role,
      status: "active",
      createdDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0],
      password: credentials.password,
      tempPassword: false,
      permissions: defaultPermissionsByRole[credentials.role],
      ...(credentials.role === "caretaker" && { assignedProperties: [] })
    });
  };

  const handleViewTenants = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setCurrentView("tenants");
  };

  const handleNavigateToSubPage = (view: View) => {
    setCurrentView(view);
  };

  const handleApartmentsChange = (newApartments: Apartment[]) => {
    setApartments(newApartments);
  };

  const handleConfigureUnits = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setCurrentView("units");
  };

  if (isLoggedIn) {
    return (
      <>
        {currentView === "dashboard" && (
          <ApartmentDashboard 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            onViewTenants={handleViewTenants}
            apartments={apartments}
            onApartmentsChange={handleApartmentsChange}
            currentUser={currentUser}
          />
        )}
        {currentView === "profile" && (
          <ProfilePage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            currentUser={currentUser}
          />
        )}
        {currentView === "settings" && (
          <SettingsPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            currentUser={currentUser}
          />
        )}
        {currentView === "help" && (
          <HelpSupportPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            currentUser={currentUser}
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
            onBack={() => setCurrentView("houses")}
            units={units}
            setUnits={setUnits}
            tenants={tenants}
            currentUser={currentUser}
          />
        )}
        {currentView === "financialReports" && (
          <FinancialReportsPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            onBack={() => setCurrentView("profile")}
            apartments={apartments}
            payments={payments}
            currentUser={currentUser}
          />
        )}
        {currentView === "userManagement" && (
          <UserManagementPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartments={apartments}
            currentUser={currentUser}
            users={users}
            onUpdateUsers={setUsers}
          />
        )}
        {currentView === "advertisements" && (
          <AdvertisementPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            currentUser={currentUser}
          />
        )}
        {currentView === "houses" && (
          <HousesManagementPage 
            onLogout={() => setIsLoggedIn(false)}
            onNavigate={setCurrentView}
            apartments={apartments}
            onApartmentsChange={handleApartmentsChange}
            onConfigureUnits={handleConfigureUnits}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="size-full flex">
        {/* Left side - Brand section */}
        <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-neutral-900" />
          <BrandLogo />
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-neutral-50 p-8">
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
