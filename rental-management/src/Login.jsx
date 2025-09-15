import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy check (replace with real auth later)
    if (username === "admin" && password === "1234") {
      setIsAuthenticated(true);
      navigate("/billing");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Logo Section */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-center">
          {/* Golden Circle Emblem */}
          <div className="w-48 h-48 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 mx-auto flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-black shadow-inner"></div>
          </div>
          {/* Golden Houses */}
          <div className="mt-6 flex justify-center space-x-4">
            <div className="w-8 h-8 bg-yellow-500 transform rotate-45"></div>
            <div className="w-8 h-8 bg-yellow-500 transform rotate-45"></div>
            <div className="w-8 h-8 bg-yellow-500 transform rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <form
          onSubmit={handleLogin}
          className="w-80 p-6 shadow-md rounded-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-sky-400 text-center">LOGIN</h2>
          <p className="text-center text-gray-600">The Company</p>

          <div>
            <label className="block text-sm text-gray-500">The Company</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b-2 border-black focus:outline-none py-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-black focus:outline-none py-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-400 text-white py-2 rounded-md hover:bg-sky-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
