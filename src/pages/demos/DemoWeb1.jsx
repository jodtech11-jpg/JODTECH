import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMonitor, FiLayers, FiCode, FiSmartphone, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DemoWeb1 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans overflow-x-hidden">
      {/* Demo Top Bar */}
      <div className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-widest text-xs uppercase opacity-80">JodTech Templates</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Lumina Agency Theme</span>
          <button onClick={() => navigate("/products")} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition">
            <FiArrowLeft /> Back
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm text-blue-400 mb-8 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next Generation Agency
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            We Build Digital <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Masterpieces</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Lumina is a highly sophisticated, ultra-responsive React template tailored for forward-thinking creative agencies and tech startups.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_40px_rgba(59,130,246,0.5)]">
              Get Started
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-bold transition-all">
              View Case Studies
            </button>
          </div>
        </motion.div>
      </header>

      {/* Services Section */}
      <section className="py-20 px-6 border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <FiMonitor />, title: "Web Design", desc: "Award-winning interfaces that captivate your audience." },
            { icon: <FiLayers />, title: "Brand Identity", desc: "Cohesive visual systems building strong market presence." },
            { icon: <FiCode />, title: "Development", desc: "Robust, scalable, and lightning-fast web applications." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-colors group"
            >
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 flex items-center justify-center rounded-xl text-2xl mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 mb-6">{item.desc}</p>
              <button className="text-blue-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <FiArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Dummy Footer */}
      <footer className="py-10 text-center border-t border-white/10 text-gray-500 font-medium">
        &copy; 2026 Lumina Agency Dummy Template.
      </footer>
    </div>
  );
};

export default DemoWeb1;
