import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCreditCard, FiSend, FiPieChart, FiArrowDownLeft, FiArrowUpRight, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DemoApp1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-900 font-sans flex flex-col items-center py-10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>

      {/* Header controls outside app */}
      <div className="w-full max-w-sm flex justify-between items-center mb-8 relative z-10 text-white">
        <button onClick={() => navigate("/products")} className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
          <FiArrowLeft />
        </button>
        <span className="font-bold tracking-widest text-xs uppercase opacity-80">Fintech Demo</span>
        <div className="w-10"></div>
      </div>

      {/* Mobile Device Frame */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-[375px] h-[812px] bg-black rounded-[50px] shadow-2xl border-[8px] border-neutral-800 overflow-hidden shrink-0 z-10">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 w-full flex justify-center z-50">
          <div className="w-32 h-7 bg-black rounded-b-3xl"></div>
        </div>

        {/* App Content */}
        <div className="h-full w-full bg-gradient-to-b from-neutral-900 to-black text-white px-6 pt-14 pb-8 overflow-y-auto no-scrollbar">
          
          <header className="flex justify-between items-center mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/50">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" alt="Profile" className="w-full h-full object-cover"/>
            </div>
            <div className="bg-white/10 p-3 rounded-full"><FiPieChart /></div>
          </header>

          <div className="mb-8">
            <h2 className="text-gray-400 text-sm font-medium mb-1">Total Balance</h2>
            <h1 className="text-4xl font-black text-white">$24,562.00</h1>
          </div>

          {/* Cards Area */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-br from-emerald-400 to-blue-600 rounded-3xl p-6 shadow-[0_10px_30px_rgba(16,185,129,0.3)] h-48 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <FiCreditCard className="text-3xl text-white/80" />
                <span className="font-black text-xl italic tracking-wider opacity-80">VISA</span>
              </div>
              <div>
                <p className="font-mono text-lg tracking-[0.2em] mb-2">**** **** **** 4289</p>
                <div className="flex justify-between text-xs font-medium opacity-80">
                  <span>ALEX JOHNSON</span>
                  <span>12/28</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 mb-10">
            {[
              { icon: <FiArrowDownLeft />, label: "Receive", color: "bg-emerald-500/20 text-emerald-400" },
              { icon: <FiSend />, label: "Send", color: "bg-blue-500/20 text-blue-400" },
              { icon: <FiMoreHorizontal />, label: "More", color: "bg-white/10 text-white" }
            ].map((btn, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <button className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${btn.color} transition-transform hover:scale-110`}>
                  {btn.icon}
                </button>
                <span className="text-xs font-medium text-gray-400">{btn.label}</span>
              </div>
            ))}
          </div>

          {/* Transactions */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Recent Transit</h3>
              <span className="text-xs text-gray-400">See All</span>
            </div>
            <div className="space-y-4">
              {[
                { name: "Apple Store", date: "Today, 14:32", amt: "-$124.00", isPos: false },
                { name: "Salary", date: "Yesterday, 09:00", amt: "+$4,200.00", isPos: true },
                { name: "Starbucks", date: "Yesterday, 08:15", amt: "-$6.50", isPos: false }
              ].map((tr, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tr.isPos ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'}`}>
                      {tr.isPos ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{tr.name}</h4>
                      <p className="text-xs text-gray-500">{tr.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${tr.isPos ? 'text-emerald-400' : 'text-white'}`}>{tr.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoApp1;
