import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const FloatingBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-20 w-full h-full pointer-events-none overflow-hidden transition-colors duration-700">
      
      {/* 🔹 SUBTLE LINE GRID DESIGN */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={theme === "dark" ? "#ffffff" : "#000000"}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* 🔹 MOVING BUBBLES ANIMATION */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{ 
              x: ["0%", "100%", "0%"], 
              y: ["0%", "80%", "0%"], 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 15 + i * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className={`absolute w-96 h-96 rounded-full blur-[120px] transition-colors duration-700
            ${i % 2 === 0 ? "bg-dg-700/10" : "bg-purple-600/10"}`}
          />
        ))}
      </div>

    </div>
  );
};

export default FloatingBackground;
