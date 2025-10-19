import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    onLogin();
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
              The Company
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-0 border-b border-neutral-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-neutral-900 bg-transparent transition-colors"
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
                className="border-0 border-b border-neutral-300 rounded-none px-0 pr-10 focus-visible:ring-0 focus-visible:border-neutral-900 bg-transparent transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
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
              />
              <span className="text-neutral-600 group-hover:text-neutral-900 transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sky-500 hover:text-sky-600 transition-colors"
            >
              Forgot?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            Login
          </Button>

          <div className="text-center pt-4">
            <p className="text-neutral-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-sky-500 hover:text-sky-600 transition-colors hover:underline"
                onClick={() => console.log("Sign up clicked")}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/4 right-0 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute -z-10 bottom-1/4 left-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20" />
    </motion.div>
  );
}
