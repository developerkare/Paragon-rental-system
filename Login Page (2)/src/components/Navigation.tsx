import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationDropdown } from "./NotificationDropdown";
import { Badge } from "./ui/badge";
import { Shield, User, Wrench, Calculator } from "lucide-react";
import { UserRole } from "./UserManagementPage";

interface NavigationProps {
  onLogout?: () => void;
  onNavigate?: (view: string) => void;
  currentView?: string;
  currentUser?: UserRole;
}

export function Navigation({ onLogout, onNavigate, currentView, currentUser }: NavigationProps) {
  const permissions = currentUser?.permissions;

  const navItems = [
    { 
      label: "Dashboard", 
      view: "dashboard", 
      href: "#dashboard",
      visible: true
    },
    { 
      label: "Houses", 
      view: "houses", 
      href: "#houses",
      visible: permissions?.manageProperties !== false
    },
    { 
      label: "Tenants Mgmt", 
      view: "tenants", 
      href: "#tenants",
      visible: permissions?.manageTenants !== false
    },
    { 
      label: "Advertisements", 
      view: "advertisements", 
      href: "#ads",
      visible: permissions?.viewReports !== false
    },
    { 
      label: "User Management", 
      view: "userManagement", 
      href: "#users",
      visible: permissions?.manageUsers === true
    },
  ].filter(item => item.visible);

  const getRoleInfo = (role?: string) => {
    switch (role) {
      case "admin":
        return { icon: Shield, color: "bg-purple-500", label: "Admin" };
      case "manager":
        return { icon: User, color: "bg-blue-500", label: "Manager" };
      case "caretaker":
        return { icon: Wrench, color: "bg-orange-500", label: "Caretaker" };
      case "accountant":
        return { icon: Calculator, color: "bg-green-500", label: "Accountant" };
      default:
        return { icon: User, color: "bg-neutral-500", label: "User" };
    }
  };

  const roleInfo = getRoleInfo(currentUser?.role);

  return (
    <nav className="w-full bg-blue-600 text-white">
      <div className="flex items-center px-6 py-4">
        {/* Profile Photo */}
        <div className="flex items-center gap-3 mr-8">
          <ProfileDropdown onLogout={onLogout} onNavigate={onNavigate} currentUser={currentUser} />
        </div>

        {/* Role Badge */}
        {currentUser && (
          <div className="mr-4">
            <Badge className={`${roleInfo.color} text-white border-none flex items-center gap-1`}>
              <roleInfo.icon className="h-3 w-3" />
              {roleInfo.label}
            </Badge>
          </div>
        )}

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onNavigate?.(item.view)}
                className={`hover:underline transition-opacity ${
                  currentView === item.view ? "opacity-100 underline" : "opacity-80"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side items */}
        <div className="ml-auto flex items-center gap-4">
          {/* User Name */}
          {currentUser && (
            <span className="text-sm opacity-90">
              {currentUser.name}
            </span>
          )}
          
          {/* Notification Button */}
          <NotificationDropdown />
        </div>
      </div>
    </nav>
  );
}
