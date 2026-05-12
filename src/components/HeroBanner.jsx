import React from "react";
import { motion } from "framer-motion";

const HeroBanner = ({ 
  title, 
  subtitle, 
  highlight, 
  image, 
  ctaText, 
  ctaLink, 
  theme = 'light' 
}) => {
  const isImage = !!image;

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[100vh] flex flex-col justify-center items-center text-center px-4 md:px-6 py-16 md:py-24 overflow-hidden">

      {/* BACKGROUND ACCENTS */}
      <div className={`absolute inset-0 -z-10 transition-colors duration-500 bg-transparent w-full h-full`}>
        {isImage ? (
          <>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* Using a pure dark overlay so there's no "white shadow" wash-out effect anywhere */}
            <div className="absolute inset-0 bg-black/60"></div>
          </>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute -top-48 -left-48 w-[800px] h-[800px] bg-dg-700/10 rounded-full blur-[150px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -bottom-48 -right-48 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px]"
            />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className={`inline-block px-3 md:px-4 py-1.5 mb-4 md:mb-8 text-xs md:text-sm font-black tracking-widest rounded-full uppercase
           ${isImage ? 'bg-dg-700/30 text-green-50 backdrop-blur-md border border-dg-700/50' : 'text-green-600 bg-dg-50'}`}
        >
          {highlight}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[1.1] mb-4 md:mb-10 transition-colors duration-500
          ${isImage ? 'text-green-50' : (theme === 'dark' ? 'text-green-50' : 'text-green-600')}`}
        >
          {title} <br/>
          <span className="text-green-600">
            {subtitle}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className={`text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 font-medium transition-colors duration-500
          ${isImage ? 'text-green-50' : (theme === 'dark' ? 'text-green-50' : 'text-green-600')}`}
        >
          Partner with JodTech to accelerate your digital trajectory through high-precision engineering and visionary product design.
        </motion.p>

        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
             <button
                className={`group px-8 md:px-12 py-4 md:py-5 rounded-full text-base md:text-xl font-black shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95
                ${theme === 'dark' ? 'bg-green-600 text-white hover:bg-dg-600' : 'bg-green-600 text-white hover:bg-dg-600'}`}
             >
                {ctaText}
             </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;