import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiFileText, FiDownload, FiTrash2, FiLogOut, FiMail, FiPhone, FiFolder, FiCalendar, FiBriefcase, FiMessageSquare } from "react-icons/fi";
import { API_BASE_URL } from "../api";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appsRes, quotesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/applications`, { headers: { Authorization: token } }),
        fetch(`${API_BASE_URL}/api/admin/quotes`, { headers: { Authorization: token } }),
      ]);
      
      const appsData = await appsRes.json();
      const quotesData = await quotesRes.json();
      
      if (!appsRes.ok) throw new Error(appsData.message || "Failed to fetch applications");
      if (!quotesRes.ok) throw new Error(quotesData.message || "Failed to fetch quotes");

      if (appsData.success) setApplications(appsData.data);
      if (quotesData.success) setQuotes(quotesData.data);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/admin/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      fetchData();
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-green-50">
      {/* HEADER */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">JodTech <span className="text-green-500">Admin</span></h1>
            <p className="text-sm text-green-600 font-medium">Recruitment Management Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all font-bold text-sm"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ERROR MESSAGE */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400"
          >
            <div className="flex items-center gap-3 mb-2 font-black text-lg">
              <FiMessageSquare /> CRITICAL DATABASE ERROR
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              The backend is responding with an error. This usually means your MongoDB connection is blocked by IP or credentials.
            </p>
            <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 font-mono text-xs break-all">
              {error}
            </div>
            <button 
              onClick={fetchData}
              className="mt-4 px-6 py-2 rounded-full bg-red-500 text-green-50 font-black text-sm hover:bg-red-600 transition-colors"
            >
              Retry Connection
            </button>
          </motion.div>
        )}

        {/* STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Applications", value: applications.length, icon: <FiBriefcase />, color: "text-green-400" },
            { label: "Resumes Uploaded", value: applications.filter(a => a.resumeUrl).length, icon: <FiFolder />, color: "text-green-600" },
            { label: "Quote Requests", value: quotes.length, icon: <FiMessageSquare />, color: "text-green-400" },
            { label: "This Month", value: applications.filter(a => new Date(a.createdAt).getMonth() === new Date().getMonth()).length, icon: <FiCalendar />, color: "text-orange-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className={`text-2xl mb-3 ${stat.color}`}>{stat.icon}</div>
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-sm text-green-600 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* TAB BUTTONS */}
        <div className="flex gap-3 mb-8">
          {[
            { key: "applications", label: "Applications", icon: <FiUsers /> },
            { key: "quotes", label: "Quotes", icon: <FiFileText /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-black text-sm transition-all border
              ${activeTab === tab.key
                ? "bg-blue-600 text-green-50 border-blue-600"
                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="text-center py-32">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <p className="text-green-600 font-bold">Loading data...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "applications" ? (
              <motion.div
                key="apps"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {applications.length === 0 ? (
                  <div className="text-center py-20 text-green-600">
                    <FiUsers className="text-5xl mx-auto mb-4 opacity-30" />
                    <p className="font-bold text-lg">No applications yet</p>
                  </div>
                ) : (
                  applications.map((app, i) => (
                    <motion.div
                      key={app._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-black">{app.name}</h3>
                            <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider
                              ${app.type === "Job" ? "bg-dg-700/20 text-green-600" : app.type === "Internship" ? "bg-blue-500/20 text-green-400" : "bg-purple-500/20 text-green-400"}`}>
                              {app.type}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
                            <span className="flex items-center gap-1"><FiMail className="text-green-400" /> {app.email}</span>
                            <span className="flex items-center gap-1"><FiPhone className="text-green-600" /> {app.phone}</span>
                            <span className="flex items-center gap-1"><FiBriefcase className="text-green-400" /> {app.role || "N/A"}</span>
                            <span className="flex items-center gap-1"><FiCalendar className="text-orange-400" /> {formatDate(app.createdAt)}</span>
                          </div>
                          {app.message && <p className="text-green-600 mt-3 text-sm leading-relaxed">{app.message}</p>}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {app.resumeUrl ? (
                            <a
                              href={`${API_BASE_URL}${app.resumeUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600/20 border border-blue-500/30 text-green-400 font-bold text-sm hover:bg-blue-600/40 transition-all"
                            >
                              <FiDownload /> {app.resumeName || "Resume"}
                            </a>
                          ) : (
                            <span className="px-5 py-3 rounded-full bg-white/5 text-green-600 font-bold text-sm border border-white/5">
                              No Resume
                            </span>
                          )}
                          <button
                            onClick={() => handleDelete("applications", app._id)}
                            className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div
                key="quotes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {quotes.length === 0 ? (
                  <div className="text-center py-20 text-green-600">
                    <FiFileText className="text-5xl mx-auto mb-4 opacity-30" />
                    <p className="font-bold text-lg">No quote requests yet</p>
                  </div>
                ) : (
                  quotes.map((q, i) => (
                    <motion.div
                      key={q._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-black mb-3">{q.name}</h3>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1"><FiMail className="text-green-400" /> {q.email}</span>
                            <span className="flex items-center gap-1"><FiPhone className="text-green-600" /> {q.phone || "N/A"}</span>
                            <span className="flex items-center gap-1"><FiCalendar className="text-orange-400" /> {formatDate(q.createdAt)}</span>
                          </div>
                          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <p className="text-gray-300 text-sm leading-relaxed">{q.message}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete("quotes", q._id)}
                          className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/30 transition-all shrink-0 self-start"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
