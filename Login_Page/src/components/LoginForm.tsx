import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff, User, Shield, Wrench, Calculator } from "lucide-react";
import { toast } from "sonner@2.0.3";

export interface UserCredentials {
  email: string;
  password: string;
  role: "admin" | "manager" | "caretaker" | "accountant";
  name: string;
}

// Sample accounts for demo
export const sampleAccounts: UserCredentials[] = [
  { email: "admin@company.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "manager@company.com", password: "manager123", role: "manager", name: "John Manager" },
  { email: "caretaker@company.com", password: "caretaker123", role: "caretaker", name: "Mike Caretaker" },
  { email: "accountant@company.com", password: "accountant123", role: "accountant", name: "Sarah Accountant" },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface LoginFormProps {
  onLogin: (user: UserCredentials & { token?: string }) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Invalid credentials", {
          description: data.message || "Please check your email and password",
        });
        return;
      }

      const { token, user } = data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(`Welcome back, ${user.name}!`, {
        description: `Logged in as ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`,
      });

      onLogin({
        email: user.email,
        password: password,
        role: user.role,
        name: user.name,
        token: token,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Connection error", {
        description: "Could not connect to the server. Make sure the backend is running on port 5000.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (account: UserCredentials) => {
    setUsername(account.email);
    setPassword(account.password);
    toast.info("Quick fill completed", {
      description: "Click Login to continue",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
        <div className="mb-8 text-center">
          <h1 className="text-sky-500 tracking-wide mb-2">LOGIN</h1>
          <p className="text-neutral-600">The Company</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-neutral-600">
              Email
            </Label>
            <Input
              id="username"
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="border-0 border-b border-neutral-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-neutral-900 bg-transparent transition-colors disabled:opacity-50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-neutral-600">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="border-0 border-b border-neutral-300 rounded-none px-0 pr-10 focus-visible:ring-0 focus-visible:border-neutral-900 bg-transparent transition-colors disabled:opacity-50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="size-4 rounded border-neutral-300 text-sky-500 focus:ring-sky-500"
                disabled={isLoading}
              />
              <span className="text-neutral-600 group-hover:text-neutral-900 transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              disabled={isLoading}
              className="text-sky-500 hover:text-sky-600 transition-colors disabled:opacity-50"
            >
              Forgot?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center pt-4">
            <p className="text-neutral-600">
              Don't have an account?{" "}
              <button
                type="button"
                disabled={isLoading}
                className="text-sky-500 hover:text-sky-600 transition-colors hover:underline disabled:opacity-50"
                onClick={() => toast.info("Contact your administrator", {
                  description: "To create a new account"
                })}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>

        {/* Quick Login Demo Accounts */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <p className="text-xs text-neutral-500 mb-3 text-center">Quick Login (Demo)</p>
          <div className="grid grid-cols-2 gap-2">
            {sampleAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => quickLogin(account)}
                disabled={isLoading}
                className="flex items-center gap-2 p-2 text-xs bg-white border border-neutral-200 rounded hover:bg-neutral-50 transition-colors disabled:opacity-50"
              >
                {account.role === "admin" && <Shield className="h-3 w-3 text-purple-500" />}
                {account.role === "manager" && <User className="h-3 w-3 text-blue-500" />}
                {account.role === "caretaker" && <Wrench className="h-3 w-3 text-orange-500" />}
                {account.role === "accountant" && <Calculator className="h-3 w-3 text-green-500" />}
                <span className="truncate">{account.role}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/4 right-0 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute -z-10 bottom-1/4 left-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20" />
    </motion.div>
  );
}
