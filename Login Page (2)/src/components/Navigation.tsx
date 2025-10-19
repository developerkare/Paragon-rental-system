import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationDropdown } from "./NotificationDropdown";

interface NavigationProps {
  onLogout?: () => void;
  onNavigate?: (view: string) => void;
}

export function Navigation({ onLogout, onNavigate }: NavigationProps) {
  const navItems = [
    { label: "Login", href: "#login", active: false },
    { label: "Houses", href: "#houses", active: true },
    { label: "Billing", href: "#billing", active: false },
    { label: "Tenants Mgmt", href: "#tenants", active: false },
  ];

  return (
    <nav className="w-full bg-blue-600 text-white">
      <div className="flex items-center px-6 py-4">
        {/* Profile Photo */}
        <div className="flex items-center gap-3 mr-8">
          <ProfileDropdown onLogout={onLogout} onNavigate={onNavigate} />
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`hover:underline transition-opacity ${
                  item.active ? "opacity-100" : "opacity-80"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side items */}
        <div className="ml-auto flex items-center gap-4">
          {/* Notification Button */}
          <NotificationDropdown />
        </div>
      </div>
    </nav>
  );
}
