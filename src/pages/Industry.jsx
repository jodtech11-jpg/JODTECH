import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const industries = [
  {
    name: "Education",
    desc: "Empowering learning with smart digital solutions and next-gen management tools.",
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000",
  },
  {
    name: "E-commerce",
    desc: "Scalable platforms engineered for seamless shopping and high conversion.",
    img: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Finance",
    desc: "Secure, efficient, and regulatory-compliant fintech infrastructure.",
    img: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?q=80&w=1251&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Real Estate",
    desc: "Smart property management, virtual tours, and automated listing systems.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000",
  },
  {
    name: "Technologies",
    desc: "Innovative software solutions for bleeding-edge modern businesses.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
  },
  {
    name: "Manufacturing",
    desc: "Automation and efficiency-driven industrial IoT and ERP solutions.",
    img: "https://images.unsplash.com/photo-1581093206409-01076de81a1b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Industries = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play functionality for the static section
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 4000); // Swaps every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    // No more scroll-jacking! Normal relative section height.
    <section className="bg-transparent relative mt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className={`text-4xl md:text-7xl font-black tracking-tight leading-tight mb-4 md:mb-6 transition-colors duration-500 ${theme === 'dark' ? 'text-green-50' : 'text-green-900'}`}>
            Industries We <br/> <span className="text-green-600">Transform</span>
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto font-medium transition-colors duration-500 ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
            We provide specialized technology solutions across a diverse range of sectors, ensuring every business can thrive in the digital age.
          </p>
        </div>

        {/* STATIC SINGLE SECTION: TABBED INTERFACE */}
        <div className={`relative w-full min-h-[70vh] flex flex-col md:flex-row rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border transition-colors duration-500
          ${theme === 'dark' ? 'bg-[#0a0a0a] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
          
          {/* LEFT: INTERACTIVE TABS */}
          {/* Mobile uses horizontal swiping, Desktop uses vertical stacking */}
          <div className="w-full md:w-1/3 p-4 md:p-8 flex flex-row md:flex-col gap-2 relative z-20 overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-r border-gray-500/20 hide-scrollbar bg-inherit">
             {industries.map((item, index) => {
               const isActive = activeIndex === index;
               return (
                 <button 
                   key={index} 
                   onClick={() => setActiveIndex(index)}
                   className={`text-left whitespace-nowrap md:whitespace-normal px-6 py-4 md:p-6 rounded-full transition-all duration-300 font-bold text-base md:text-lg relative
                   ${isActive
                     ? (theme === 'dark' ? 'bg-transparent text-green-50' : 'bg-transparent text-green-600')
                     : (theme === 'dark' ? 'text-green-600 hover:text-gray-200 bg-transparent' : 'text-green-600 hover:text-green-900 bg-transparent')}`}
                 >
                   {item.name}
                   
                   {/* Animated Progress Bar under the active tab */}
                   {isActive && (
                     <div className="absolute bottom-0 left-4 right-4 md:left-6 md:right-6 h-1 rounded-full overflow-hidden bg-gray-500/20">
                        <motion.div
                           key={`progress-${activeIndex}`} // Force remount on activeIndex change
                           initial={{ width: "0%" }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 4, ease: "linear" }}
                           className="h-full bg-green-500"
                        />
                     </div>
                   )}
                 </button>
               )
             })}
          </div>

          {/* RIGHT: DYNAMIC CONTENT (Crossfades exactly in place) */}
          <div className="w-full md:w-2/3 relative min-h-[50vh] md:min-h-full flex-grow">
             <AnimatePresence mode="wait">
               <motion.div 
                 key={activeIndex}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.4 }}
                 className="absolute inset-0 w-full h-full flex flex-col"
               >
                 {/* Background Image */}
                 <img 
                   src={industries[activeIndex].img} 
                   alt={industries[activeIndex].name} 
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 
                 {/* Dark gradient overlay for text readability so white text pops */}
                 <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${theme === 'dark' ? 'from-black via-black/50 to-transparent' : 'from-black/90 via-black/40 to-transparent'}`}></div>

                 {/* Description Content */}
                 <div className="relative mt-auto p-10 md:p-14 text-green-50 z-10 w-full">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs md:text-sm font-black tracking-widest text-green-600 bg-dg-700/40 backdrop-blur-md rounded-full uppercase border border-dg-700/30">
                      Sector {activeIndex + 1} // {industries.length}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                      {industries[activeIndex].name}
                    </h3>
                    <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl text-gray-200">
                      {industries[activeIndex].desc}
                    </p>
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Industries;