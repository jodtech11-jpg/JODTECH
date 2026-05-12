import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import HeroBanner from "../components/HeroBanner";
import JobOpeningsModal from "../components/JobOpeningsModal";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";

const Careers = () => {
  const { theme } = useTheme();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  return (
    <div className={`overflow-x-hidden min-h-screen transition-colors duration-500 bg-transparent ${theme === 'dark' ? 'text-green-50' : 'text-green-600'}`}>
      
      <HeroBanner 
        title="Build the kind of work"
        subtitle="that defines tomorrow."
        highlight="Join the Revolution"
        theme={theme}
        image="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8am9ifGVufDB8fDB8fHwy"
      />

      {/* ================= PROGRAMS GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-3 gap-10">
          {[
            {
              title: "Internship Programs",
              desc: "Kickstart your career with live client projects and mentorship.",
              items: ["Web Development", "Mobile App Development", "UI/UX Design"],
              color: theme === 'dark' ? "bg-white/5" : "bg-dg-50"
            },
            { 
              title: "Engineering Roles", 
              desc: "Join our core team and build high-impact enterprise solutions.",
              items: ["Frontend Architect", "Backend Systems Engineer", "Full Stack Specialist"],
              color: theme === 'dark' ? "bg-white/10" : "bg-purple-50"
            },
            { 
              title: "Strategic Training", 
              desc: "Intensive 3-month programs for career transformers.",
              items: ["DevOps & Cloud Systems", "Flutter Mastery", "Design Systems Architecture"],
              color: theme === 'dark' ? "bg-white/15" : "bg-pink-50"
            }
          ].map((cluster, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-12 rounded-[3.5rem] group hover:scale-[1.02] transition-all duration-500 border border-transparent flex flex-col h-full 
              ${cluster.color} ${theme === 'dark' ? 'hover:bg-white/20' : 'hover:bg-white hover:shadow-2xl'}`}
            >
              <h3 className="text-3xl font-black mb-6 leading-tight">{cluster.title}</h3>
              <p className={`text-lg mb-10 leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>{cluster.desc}</p>
              
              <ul className="space-y-4 flex-grow mb-10">
                {cluster.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 font-black">
                    <div className="w-1.5 h-1.5 bg-dg-700 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="#" onClick={() => setIsJobModalOpen(true)} className="flex items-center gap-2 font-black border-b-2 border-current pb-1 w-fit group-hover:gap-4 transition-all">
                View Positions <FiArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= DIVERSITY ================= */}
      <div className="py-40 transition-colors duration-500 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-7xl font-black mb-10 leading-tight ${theme === 'dark' ? 'text-green-50' : 'text-green-600'}`}>
              Diversity is <br/> our <span className="text-green-500">Superpower</span>
            </h2>
            <p className={`text-xl font-medium leading-relaxed mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              We believe that remarkable innovation happens when people with different backgrounds, experiences, and perspectives come together to solve a common problem.
            </p>
            <Link to="/about" className={`font-black text-xl flex items-center gap-6 group ${theme === 'dark' ? 'text-green-50' : 'text-green-600'}`}>
              Learn about our culture 
              <div className={`w-16 h-16 rounded-full border flex items-center justify-center group-hover:bg-blue-600 group-hover:text-green-50 group-hover:border-blue-600 transition-all shadow-xl ${theme === 'dark' ? 'border-white/20' : 'border-black/20'}`}>
                <FiArrowRight className="text-2xl text-green-600" />
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000" 
              className="rounded-[4rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 h-[300px] sm:h-[420px] md:h-[520px] lg:h-[650px] w-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* JOB OPENINGS MODAL */}
      <JobOpeningsModal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} />
    </div>
  );
};

export default Careers;