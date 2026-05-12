import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { API_BASE_URL } from "../api";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Server unreachable. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      {/* Floating background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo area */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
            <FiLock className="text-3xl text-green-400" />
          </div>
          <h1 className="text-4xl font-black text-green-50 tracking-tight">Admin Portal</h1>
          <p className="text-green-600 font-medium mt-3">JodTech Recruitment Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Username</label>
              <div className="relative">
                <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600 text-lg" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  className="w-full bg-white/5 border-2 border-transparent focus:border-blue-600 rounded-2xl p-4 pl-14 text-green-50 font-bold outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600 text-lg" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full bg-white/5 border-2 border-transparent focus:border-blue-600 rounded-2xl p-4 pl-14 text-green-50 font-bold outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm font-bold text-center bg-red-500/10 p-3 rounded-xl"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-full font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all
              ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-green-50`}
            >
              {loading ? "Authenticating..." : <>Access Dashboard <FiArrowRight /></>}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-green-600 text-sm mt-8 font-medium">
          Protected area. Authorized personnel only.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
