import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/jodtechlogo.jpeg";

const Footer = () => {
  const { theme } = useTheme();

  const socialLinks = [
    { icon: FaInstagram, url: "https://instagram.com/jodtech", label: "Instagram" },
    { icon: FaWhatsapp, url: "https://wa.me/917867908377", label: "WhatsApp" },
    { icon: FaLinkedin, url: "https://linkedin.com/company/jodtech", label: "LinkedIn" },
  ];

  return (
    <footer className={`px-6 py-24 transition-colors duration-500 border-t ${theme === 'dark' ? 'bg-black border-white/5 text-gray-400' : 'bg-white border-black/5 text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-24">

          {/* JOD TECH SECTION */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                <img src={logo} alt="JodTech Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                JOD TECH
              </span>
            </Link>
            <p className={`text-base leading-relaxed font-medium mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              We build powerful digital solutions that transform businesses. From web and mobile apps to enterprise software.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 text-lg
                    ${theme === 'dark' ? 'border-white/10 hover:bg-dg-700 hover:text-green-600 hover:border-dg-700' : 'border-green-200 hover:bg-dg-700 hover:text-green-50 hover:border-dg-700'}`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className={`font-black mb-8 uppercase tracking-widest text-xs transition-colors duration-500 ${theme === 'dark' ? 'text-green-50' : 'text-green-900'}`}>Quick Links</h3>
            <ul className={`space-y-4 font-bold text-base ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              <li><Link to="/" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>Home</Link></li>
              <li><Link to="/about" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>Who We Are</Link></li>
              <li><Link to="/services" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>Services</Link></li>
              <li><Link to="/careers" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>Careers</Link></li>
              <li><Link to="/quote" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>Contact</Link></li>
            </ul>
          </div>

          {/* SOLUTIONS */}
          <div>
            <h3 className={`font-black mb-8 uppercase tracking-widest text-xs transition-colors duration-500 ${theme === 'dark' ? 'text-green-50' : 'text-green-900'}`}>Solutions</h3>
            <ul className={`space-y-4 font-bold text-base ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              <li><Link to="/services" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>IT Services</Link></li>
              <li><Link to="/products" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>Products</Link></li>
              <li><Link to="/apply" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>Join Us</Link></li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className={`font-black mb-8 uppercase tracking-widest text-xs transition-colors duration-500 ${theme === 'dark' ? 'text-green-50' : 'text-green-900'}`}>Contact</h3>
            <div className={`space-y-6 text-base font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              <div>
                <p className="text-xs uppercase tracking-widest font-black text-green-600 mb-2">Address</p>
                <p>No 10, Chitharanjan St, Chinna Chokkikulam, Madurai – 625002</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-black text-green-600 mb-2">Phone</p>
                <a href="tel:+917867908377" className={`font-black text-lg transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>
                  +91 7867908377
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-black text-green-600 mb-2">Email</p>
                <a href="mailto:jodtech11@gmail.com" className={`font-black transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>
                  jodtech11@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-6 transition-colors duration-500 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
          <p className={`font-black text-sm tracking-widest text-center md:text-left ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
            © 2026 JOD TECH — ENGINEERED IN INDIA
          </p>
          <div className={`flex gap-8 font-black text-xs tracking-widest flex-wrap justify-center md:justify-end ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
            <Link to="/privacy" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>PRIVACY POLICY</Link>
            <Link to="/terms" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-600' : 'hover:text-green-600'}`}>TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;