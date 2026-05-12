import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiBarChart2, FiPieChart, FiActivity, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DemoWeb2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Demo Top Bar */}
      <div className="bg-indigo-600 text-white px-6 py-3 flex items-center justify-between shadow-md relative z-50">
        <span className="font-bold tracking-widest text-xs uppercase opacity-80">JodTech Templates</span>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Neo SaaS Dashboard</span>
          <button onClick={() => navigate("/products")} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition">
            <FiArrowLeft /> Back
          </button>
        </div>
      </div>

      {/* Dashboard Layout */}
      <div className="flex h-[calc(100vh-52px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6">
          <div className="text-2xl font-black text-indigo-600 mb-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div> NeoSaaS.
          </div>
          <nav className="space-y-4 flex-1">
            {["Dashboard", "Analytics", "Users", "Settings"].map((item, i) => (
              <div key={i} className={`px-4 py-3 rounded-xl font-bold ${i === 0 ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-50"}`}>
                {item}
              </div>
            ))}
          </nav>
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white">
            <h4 className="font-bold mb-2">Upgrade to Pro</h4>
            <p className="text-xs opacity-80 mb-4">Get access to advanced analytics.</p>
            <button className="bg-white text-indigo-600 text-xs font-bold w-full py-2 rounded-lg">Upgrade</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black text-gray-800">Welcome back, Alex</h1>
              <p className="text-gray-500">Here's what's happening today.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-gray-700 hover:bg-gray-50">Export Report</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">Add Widget</button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Revenue", val: "$45,231.89", icon: <FiActivity />, color: "text-emerald-500", bg: "bg-emerald-50" },
              { label: "Active Users", val: "2,314", icon: <FiUsers />, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Conversion Rate", val: "12.5%", icon: <FiPieChart />, color: "text-purple-500", bg: "bg-purple-50" },
              { label: "Growth", val: "+24.5%", icon: <FiBarChart2 />, color: "text-orange-500", bg: "bg-orange-50" },
            ].map((stat, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {stat.icon}
                </div>
                <h4 className="text-gray-500 text-sm font-bold mb-1">{stat.label}</h4>
                <div className="text-2xl font-black text-gray-800">{stat.val}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Chart Area Dummy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col">
            <h3 className="font-bold text-lg mb-6">Revenue Over Time</h3>
            <div className="flex-1 flex items-end gap-2">
              {[40, 70, 45, 90, 65, 85, 100, 60, 40, 75, 50, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-100 rounded-t-sm relative group overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-indigo-500 transition-all duration-1000" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DemoWeb2;
