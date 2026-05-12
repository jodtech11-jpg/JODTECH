import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/jod.jpeg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Who We Are", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-500
        ${scrolled ? "nav-glass py-3 shadow-lg" : "bg-transparent"}
        `}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-xl overflow-hidden shadow-lg"
          >
            <img src={logo} alt="JodTech Logo" className="w-full h-full object-cover" />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
            JodTech
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className={`hidden lg:flex gap-10 text-[15px] font-bold tracking-wide transition-colors duration-300 ${!scrolled ? 'text-gray-200' : theme === 'dark' ? 'text-gray-300' : 'text-green-600'}`}>
          {navLinks.map((link) => (
            <li key={link.path} className="relative group">
              <Link 
                to={link.path}
                className={`transition-colors duration-300 ${!scrolled ? 'hover:text-green-50' : 'hover:text-green-600'} ${location.pathname === link.path ? 'text-green-600' : ''}`}
              >
                {link.name}
              </Link>
              <motion.div 
                className={`absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${!scrolled ? 'bg-white' : 'bg-dg-700'}`}
              />
            </li>
          ))}
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all duration-300 text-xl shadow-sm hover:shadow-md
            ${!scrolled ? 'bg-white/10 text-green-50 hover:bg-white/20' : theme === 'dark' ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-black/5 text-green-700 hover:bg-black/10'}`}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          <Link
            to="/quote"
            className={`hidden md:block px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg border-2 
            ${!scrolled ? 'border-white/20 bg-transparent text-green-50 hover:bg-white hover:text-green-600 hover:border-white' 
              : theme === 'dark' ? 'bg-white text-green-600 border-transparent hover:bg-gray-200' 
              : 'border-black text-green-600 hover:bg-black hover:text-green-50'}`}
          >
            Get Quote
          </Link>

          {/* MOBILE MENU ICON */}
          <div
            className={`lg:hidden text-2xl cursor-pointer p-2 rounded-xl transition
            ${!scrolled || theme === 'dark' ? 'text-green-50 hover:bg-white/10' : 'text-green-600 hover:bg-black/5'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed top-0 right-0 w-full sm:w-[350px] h-screen z-[60] flex flex-col p-10 pt-28 gap-8 shadow-2xl border-l
            ${theme === 'dark' ? 'bg-black border-white/10 text-green-50' : 'bg-white border-black/5 text-green-600'}`}
          >
            <div 
              className="absolute top-8 right-8 text-3xl cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              <FiX />
            </div>

            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-bold border-b pb-4 transition-colors
                ${theme === 'dark' ? 'border-white/5 hover:text-green-600' : 'border-black/5 hover:text-green-600'}`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/quote"
              onClick={() => setMobileOpen(false)}
              className={`mt-6 px-8 py-5 text-center rounded-full font-black text-xl shadow-xl
              ${theme === 'dark' ? 'bg-white text-green-600' : 'bg-black text-green-50'}`}
            >
              Get Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;