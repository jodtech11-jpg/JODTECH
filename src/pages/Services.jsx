import React from "react";
import { useTheme } from "../context/ThemeContext";
import HeroBanner from "../components/HeroBanner";
import { motion } from "framer-motion";
import { FiLayout, FiSmartphone, FiCode, FiShoppingCart, FiTrendingUp, FiSettings, FiDatabase, FiCalendar, FiMessageSquare, FiLock } from "react-icons/fi";

const services = [
  {
    title: "UI/UX Design",
    desc: "We craft intuitive and engaging user experiences.",
    advantage: "User-centered design with modern aesthetics.",
    tech: "Figma, Adobe XD, Sketch",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800",
    icon: <FiLayout />
  },
  {
    title: "Mobile App Development",
    desc: "Build high-performance Android & iOS apps.",
    advantage: "Scalable, fast, and user-friendly apps.",
    tech: "React Native, Flutter",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800",
    icon: <FiSmartphone />
  },
  {
    title: "Web Development",
    desc: "Modern responsive websites and web apps.",
    advantage: "SEO-friendly and lightning-fast websites.",
    tech: "React, Node.js, Next.js",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800",
    icon: <FiCode />
  },
  {
    title: "E-commerce",
    desc: "Launch powerful online stores with seamless UX.",
    advantage: "Secure payments and scalable platforms.",
    tech: "Shopify, WooCommerce",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
    icon: <FiShoppingCart />
  },
  {
    title: "Digital Marketing",
    desc: "Grow your brand with data-driven strategies.",
    advantage: "Higher reach and conversion rates.",
    tech: "SEO, Ads, Social Media",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <FiTrendingUp />
  },
  {
    title: "DevOps",
    desc: "Automate and streamline development workflows.",
    advantage: "Fast deployment and reliability.",
    tech: "AWS, Docker, CI/CD",
    img: "https://images.unsplash.com/photo-1764557222299-5cce88abe80c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <FiSettings />
  },
  {
    title: "Inventory Software",
    desc: "Manage stock and operations efficiently.",
    advantage: "Real-time tracking and analytics.",
    tech: "Custom ERP",
    img: "https://images.unsplash.com/photo-1620633759441-b4db8637d1f3?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <FiDatabase />
  },
  {
    title: "Booking Applications",
    desc: "Smart booking systems for businesses.",
    advantage: "Easy scheduling and automation.",
    tech: "Full-stack solutions",
    img: "https://images.unsplash.com/photo-1522241112606-b5d35a468795?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <FiCalendar />
  },
  {
    title: "AI Chat Bot",
    desc: "Automate conversations with intelligent bots.",
    advantage: "24/7 support and smart responses.",
    tech: "AI, NLP",
    img: "https://images.unsplash.com/photo-1716436329836-208bea5a55e6?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <FiMessageSquare />
  },
  {
    title: "Backend Development",
    desc: "Robust and scalable backend systems.",
    advantage: "Secure, fast, and efficient APIs.",
    tech: "Node.js, Express, Databases",
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800",
    icon: <FiLock />
  },
];

const Services = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-transparent ${theme === 'dark' ? 'text-green-50' : 'text-black'}`}>
      
      <HeroBanner 
        title="Transforming Ideas"
        subtitle="Into Digital Impact"
        highlight="Our Capabilities"
        theme={theme}
        image="https://images.unsplash.com/photo-1594928274321-4497d98e4f48?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col md:flex-row items-center gap-16 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <div className={`w-full md:w-1/2 relative group p-6 rounded-[3rem] transition-colors duration-500 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
              <img
                src={service.img}
                alt={service.title}
                loading="lazy"
                className="w-full h-[280px] sm:h-[340px] md:h-[420px] object-cover rounded-[2.5rem] shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 font-bold"
              />
            </div>

            {/* CONTENT */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-colors duration-500
                ${theme === 'dark' ? 'bg-black text-green-600' : 'bg-dg-50 text-green-600'}`}>
                  {service.icon}
                </div>
                <h2 className="text-4xl font-black leading-tight">
                  {service.title}
                </h2>
              </div>
              <p className={`text-xl leading-relaxed mb-8 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                {service.desc}
              </p>
              
              <div className={`grid grid-cols-2 gap-8 py-8 border-y transition-colors duration-500 ${theme === 'dark' ? 'border-white/10' : 'border-gray-100'}`}>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-black">
                    Strategic Edge
                  </h4>
                  <p className="font-black">
                    {service.advantage}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-black">
                    Core Tech
                  </h4>
                  <p className="font-black">
                    {service.tech}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;