import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import HeroBanner from "../components/HeroBanner";
import { FiGlobe, FiSmartphone, FiLayers, FiExternalLink, FiLayout } from "react-icons/fi";
import { Link } from "react-router-dom";

const productCategories = [
  {
    category: "Application",
    icon: <FiSmartphone />,
    demos: []
  },
  {
    category: "Website",
    icon: <FiGlobe />,
    demos: [
      {
        id: "tpl-web-client",
        title: "Website Clients",
        desc: "Portfolio of specialized websites delivered to our global clients. (Coming Soon)",
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        link: "/about#clients",
        external: false
      },
      {
        id: "tpl-web-demo",
        title: "Website Demos",
        desc: "Industry-specific website templates and interactive demos. (Coming Soon)",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        link: "/templates#website",
        external: false
      }
    ]
  },
  {
    category: "Software",
    icon: <FiLayers />,
    demos: []
  },
];

const Products = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(0);

  const activeDemos = productCategories[activeCategory].demos;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 bg-transparent ${
        theme === "dark" ? "text-green-50" : "text-black"
      }`}
    >
      <HeroBanner
        title="Proprietary"
        subtitle="Digital Assets"
        highlight="JodTech Products"
        theme={theme}
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4">
          {productCategories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-black text-sm md:text-base transition-all duration-300 flex items-center gap-2 ${
                activeCategory === index
                  ? "bg-green-600 text-white shadow-lg shadow-green-700/50 scale-105"
                  : theme === "dark"
                  ? "bg-white/10 text-gray-300 hover:bg-white/20"
                  : "bg-gray-100 text-green-700 hover:bg-gray-200"
              }`}
            >
              {cat.icon}
              {cat.category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-green-600">
              {productCategories[activeCategory].category}
            </h2>

            {activeDemos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {activeDemos.map((demo) => (
                  <div 
                    key={demo.id} 
                    className={`group relative rounded-[2.5rem] p-4 transition-all duration-500 overflow-hidden ${
                      theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden mb-6">
                      <img 
                        src={demo.img} 
                        alt={demo.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        {demo.external ? (
                          <a href={demo.link} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-green-500 hover:scale-105 transition-all">
                            View Demo <FiExternalLink />
                          </a>
                        ) : (
                          <Link to={demo.link} className="bg-green-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-green-500 hover:scale-105 transition-all">
                            View Demo <FiExternalLink />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <h3 className="text-2xl font-black mb-2">{demo.title}</h3>
                      <p className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {demo.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center py-20">
                <div
                  className={`px-10 py-6 rounded-full font-black text-lg ${
                    theme === "dark"
                      ? "bg-white/10 text-yellow-400"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                 Coming Soon
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;