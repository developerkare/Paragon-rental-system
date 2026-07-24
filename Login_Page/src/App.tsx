import { useState, useEffect } from "react";
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
import { ActivityLogPage } from "./components/ActivityLogPage";
import { UnitsPage } from "./components/UnitsPage";
import { FinancialReportsPage } from "./components/FinancialReportsPage";
import { UserManagementPage, UserRole, defaultPermissionsByRole } from "./components/UserManagementPage";
import { AdvertisementPage } from "./components/AdvertisementPage";
import { HousesManagementPage } from "./components/HousesManagementPage";
import { TenantsByApartmentPage } from "./components/TenantsByApartmentPage";
import { CaretakerDashboardPage } from "./components/CaretakerDashboardPage";
import { LandManagementPage } from "./components/LandManagementPage";
import { Toaster } from "./components/ui/sonner";
import { Apartment } from "./components/ApartmentCard";
import { Tenant } from "./components/TenantsPage";
import { Payment } from "./components/PaymentHistoryPage";
import { ActivityLog } from "./components/ActivityLogPage";
import { Unit } from "./components/UnitsPage";
import { getApartments, getCurrentUser, getUnits, getTenants, getPayments } from "./utils/auth";
import { toast } from "sonner@2.0.3";

type View = "dashboard" | "profile" | "settings" | "help" | "tenants" | "activeTenants" | "failedToPay" | "tenantsLeft" | "vacantUnits" | "paymentHistory" | "activityLog" | "units" | "financialReports" | "userManagement" | "advertisements" | "houses" | "tenantsByApartment" | "landManagement";

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
  const [isLoadingApartments, setIsLoadingApartments] = useState(false);
  
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

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser({
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
        role: storedUser.role as any,
        status: "active",
        createdDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        password: "",
        tempPassword: false,
        permissions: defaultPermissionsByRole[storedUser.role as any],
      });
      // Load apartments and units from API
      loadApartmentsFromAPI();
      loadTenantsFromAPI();
      loadPaymentsFromAPI();
      (async () => {
        try {
          const data = await getUnits();
          setUnits(data);
        } catch (error: any) {
          console.error('Error loading units:', error);
        }
      })();
    }
    }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
        if (event.state.apartment) {
          setSelectedApartment(event.state.apartment);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Load apartments from API
  const loadApartmentsFromAPI = async () => {
    try {
      setIsLoadingApartments(true);
      const data = await getApartments();
      setApartments(data);
    } catch (error: any) {
      console.error('Error loading apartments:', error);
      toast.error("Error loading apartments", {
        description: error.message || "Failed to load apartments from server"
      });
      // Keep initial apartments on error
    } finally {
      setIsLoadingApartments(false);
    }
  };

  // Load units from API
  const loadUnitsFromAPI = async () => {
    try {
      const data = await getUnits();
      setUnits(data);
    } catch (error: any) {
      console.error('Error loading units:', error);
      // Keep initial units on error
    }
  };

  // Load tenants from API
  const loadTenantsFromAPI = async () => {
    try {
      console.log('[App] Loading tenants from API...');
      const data = await getTenants();
      console.log('[App] Loaded tenants:', data);
      setTenants(data);
    } catch (error: any) {
      console.error('[App] Error loading tenants:', error);
      // Keep initial empty state - pages will use initialTenants as fallback
    }
  };

  const loadPaymentsFromAPI = async () => {
    try {
      console.log('[App] Loading payments from API...');
      const data = await getPayments();
      console.log('[App] Loaded payments:', data);
      setPayments(data);
    } catch (error: any) {
      console.error('[App] Error loading payments:', error);
      // Keep initial empty state
    }
  };

  const handleLogin = (credentials: UserCredentials & { token: string }) => {
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
    
    // Load apartments and units from API after login
    loadApartmentsFromAPI();
    loadTenantsFromAPI();
    loadPaymentsFromAPI();
    loadUnitsFromAPI();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView("dashboard");
    // Reset to default admin user structure (but user won't see this since isLoggedIn is false)
    setCurrentUser({ 
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
    // Clear stored auth
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Reset apartments to initial state
    setApartments(initialApartments);
  };

  const handleViewTenants = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setCurrentView("tenants");
    // Push to browser history
    window.history.pushState({ view: "tenants", apartment }, "", `#/tenants/${apartment.id}`);
  };

  const handleNavigateToSubPage = (view: View) => {
    setCurrentView(view);
    // Push to browser history
    window.history.pushState({ view }, "", `#/${view}`);
  };

  const handleApartmentsChange = (newApartments: Apartment[]) => {
    setApartments(newApartments);
  };

  // Navigation handler that pushes to browser history
  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.history.pushState({ view }, "", `#/${view}`);
  };

  const handleConfigureUnits = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setCurrentView("units");
    // Push to browser history
    window.history.pushState({ view: "units", apartment }, "", `#/units/${apartment.id}`);
  };

  if (isLoggedIn) {
    // If user is caretaker, show caretaker dashboard
    if (currentUser.role === "caretaker") {
      if (currentView === "dashboard") {
        return (
          <>
            <CaretakerDashboardPage
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          </>
        );
      }
      // Allow caretakers to access profile, settings, and help
      if (currentView === "profile") {
        return (
          <>
            <ProfilePage 
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          </>
        );
      }
      if (currentView === "settings") {
        return (
          <>
            <SettingsPage 
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          </>
        );
      }
      if (currentView === "help") {
        return (
          <>
            <HelpSupportPage 
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentUser={currentUser}
            />
          </>
        );
      }
      // Default back to caretaker dashboard for any other view
      return (
        <>
          <CaretakerDashboardPage
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        </>
      );
    }

    return (
      <>
        {currentView === "dashboard" && (
          <ApartmentDashboard 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            onViewTenants={handleViewTenants}
            apartments={apartments}
            onApartmentsChange={handleApartmentsChange}
            currentUser={currentUser}
          />
        )}
        {currentView === "profile" && (
          <ProfilePage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        )}
        {currentView === "settings" && (
          <SettingsPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        )}
        {currentView === "help" && (
          <HelpSupportPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        )}
        {currentView === "tenants" && (
          <TenantsPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            apartment={selectedApartment || undefined}
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
            onLogout={handleLogout}
            onNavigate={handleNavigate}
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
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            tenants={tenants}
            setTenants={setTenants}
          />
        )}
        {currentView === "tenantsLeft" && selectedApartment && (
          <TenantsLeftPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            tenants={tenants}
            setTenants={setTenants}
          />
        )}
        {currentView === "vacantUnits" && selectedApartment && (
          <VacantUnitsPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            vacantUnits={vacantUnits}
            setVacantUnits={setVacantUnits}
          />
        )}
        {currentView === "paymentHistory" && selectedApartment && (
          <PaymentHistoryPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            tenants={tenants}
            payments={payments}
            setPayments={setPayments}
          />
        )}
        {currentView === "activityLog" && selectedApartment && (
          <ActivityLogPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            apartment={selectedApartment}
            onBack={() => setCurrentView("tenants")}
            activityLogs={activityLogs}
          />
        )}
        {currentView === "units" && selectedApartment && (
          <UnitsPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
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
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            onBack={() => setCurrentView("profile")}
            apartments={apartments}
            payments={payments}
            currentUser={currentUser}
          />
        )}
        {currentView === "userManagement" && (
          <UserManagementPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            apartments={apartments}
            currentUser={currentUser}
            users={users}
            onUpdateUsers={setUsers}
          />
        )}
        {currentView === "advertisements" && (
          <AdvertisementPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        )}
        {currentView === "houses" && (
          <HousesManagementPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            apartments={apartments}
            onApartmentsChange={handleApartmentsChange}
            onConfigureUnits={handleConfigureUnits}
            currentUser={currentUser}
          />
        )}
        {currentView === "tenantsByApartment" && (
          <TenantsByApartmentPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            onBack={() => setCurrentView("tenants")}
            apartments={apartments}
            tenants={tenants}
            setTenants={setTenants}
            payments={payments}
            setPayments={setPayments}
            activityLogs={activityLogs}
            setActivityLogs={setActivityLogs}
            currentUser={currentUser}
          />
        )}
        {currentView === "landManagement" && (
          <LandManagementPage 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
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