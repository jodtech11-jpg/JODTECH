import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheckCircle, FiClock, FiPlus, FiGrid, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DemoApp2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-50 font-sans flex flex-col items-center py-10 relative overflow-hidden">
      
      {/* Header controls outside app */}
      <div className="w-full max-w-sm flex justify-between items-center mb-8 relative z-10 text-indigo-900">
        <button onClick={() => navigate("/products")} className="bg-white shadow-sm hover:bg-indigo-100 p-3 rounded-full transition-all">
          <FiArrowLeft />
        </button>
        <span className="font-bold tracking-widest text-xs uppercase opacity-80">Taskify Demo</span>
        <div className="w-10"></div>
      </div>

      {/* Mobile Device Frame */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-[375px] h-[812px] bg-white rounded-[50px] shadow-2xl border-[8px] border-indigo-200 overflow-hidden shrink-0 z-10">
        
        {/* Notch */}
        <div className="absolute top-0 w-full flex justify-center z-50">
          <div className="w-32 h-7 bg-indigo-200 rounded-b-3xl"></div>
        </div>

        {/* App Content */}
        <div className="h-full w-full bg-slate-50 text-slate-800 pt-16 pb-24 overflow-y-auto no-scrollbar relative">
          
          <div className="px-6 space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black text-indigo-950 mb-1">Hello, Sarah</h1>
                <p className="text-sm font-medium text-slate-500">You have 4 tasks today.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-100 border border-indigo-200 p-1 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" alt="profile" className="w-full h-full rounded-full object-cover"/>
              </div>
            </header>

            {/* Progress Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
              <h3 className="font-medium text-indigo-100 mb-1">Daily Progress</h3>
              <div className="flex justify-between items-end mb-4">
                <span className="text-3xl font-black">75%</span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">3/4 Done</span>
              </div>
              <div className="w-full h-2 bg-indigo-950/30 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-emerald-400 rounded-full"></div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-indigo-950">Categories</h3>
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { name: "Work", count: "12 tasks", color: "bg-blue-100 text-blue-600" },
                  { name: "Personal", count: "4 tasks", color: "bg-orange-100 text-orange-600" },
                  { name: "Health", count: "2 tasks", color: "bg-emerald-100 text-emerald-600" }
                ].map((cat, i) => (
                  <div key={i} className={`shrink-0 w-32 p-4 rounded-2xl ${cat.color} font-medium`}>
                    <h4 className="font-bold text-lg mb-1">{cat.name}</h4>
                    <p className="text-xs opacity-80">{cat.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-indigo-950">Today's Tasks</h3>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Design Review", time: "10:00 AM", done: true },
                  { title: "Team Sync", time: "1:30 PM", done: false },
                  { title: "Client Presentation", time: "3:00 PM", done: false },
                  { title: "Gym Workout", time: "6:00 PM", done: false }
                ].map((task, i) => (
                  <div key={i} className={`flex items-center p-4 rounded-2xl border ${task.done ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${task.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                      {task.done && <FiCheckCircle />}
                    </div>
                    <div>
                      <h4 className={`font-bold ${task.done ? 'text-slate-400 line-through' : 'text-indigo-950'}`}>{task.title}</h4>
                      <p className={`text-xs flex items-center gap-1 ${task.done ? 'text-slate-400' : 'text-indigo-500'}`}>
                        <FiClock /> {task.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-8 py-5 flex justify-between items-center pb-8 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-10">
            <FiGrid className="text-2xl text-indigo-600" />
            <div className="bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-indigo-200 -mt-8">
              <FiPlus />
            </div>
            <FiSettings className="text-2xl text-slate-400" />
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default DemoApp2;
