import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Industries from "./Industry";
import WhyChooseUs from "./Whychooseus";
import HomeHeroBanner from "../components/HomeHeroBanner";
import TypingText from "./Type";
import TechStack from "../components/TechStack";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-transparent ${theme === 'dark' ? 'text-green-50' : 'text-green-600'}`}>

      {/* ================= HERO SECTION ================= */}
      <HomeHeroBanner theme={theme} />

      <div className="max-w-7xl mx-auto px-6">
        <TypingText />
      </div>

      {/* ✅ SECTION REVEALS */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Industries />
      </motion.div>

      {/* ✅ TECH STACK SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <TechStack />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <WhyChooseUs />
      </motion.div>
    </div>
  );
};

export default Home;