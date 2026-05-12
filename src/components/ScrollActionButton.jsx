import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const ScrollActionButton = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 100px
      setIsVisible(window.scrollY > 100);

      // Check if user is near the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const scrollThreshold = 100; // pixels from bottom to trigger "to top"
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: "#000" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-gray-900 text-green-50 rounded-2xl shadow-2xl flex items-center justify-center text-2xl border-2 border-white/20 backdrop-blur-md"
          title={isAtBottom ? "Scroll to Top" : "Scroll to Bottom"}
        >
          {isAtBottom ? <FiArrowUp /> : <FiArrowDown />}
          
          {/* Pulse effect */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-2xl bg-white/10 -z-10"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollActionButton;
