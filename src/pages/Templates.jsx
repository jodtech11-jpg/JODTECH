import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import HeroBanner from "../components/HeroBanner";
import { FiLayout, FiSmartphone, FiMonitor, FiGlobe, FiBookOpen, FiShoppingBag, FiDollarSign, FiHome, FiCpu, FiSettings, FiX, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import { API_BASE_URL } from "../api";

const websiteDomains = [
  {
    id: "education",
    title: "Education",
    icon: <FiBookOpen size={24} />,
    desc: "Management systems and e-learning portals.",
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    icon: <FiShoppingBag size={24} />,
    desc: "Seamless shopping and conversion-ready stores.",
    img: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=1170",
  },
  {
    id: "finance",
    title: "Finance",
    icon: <FiDollarSign size={24} />,
    desc: "Secure and regulatory-compliant fintech layouts.",
    img: "https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?q=80&w=1251",
  },
  {
    id: "realestate",
    title: "Real Estate",
    icon: <FiHome size={24} />,
    desc: "Smart property management and listing portals.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000",
  },
  {
    id: "technologies",
    title: "Technologies",
    icon: <FiCpu size={24} />,
    desc: "Modern software and corporate tech landing pages.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    icon: <FiSettings size={24} />,
    desc: "Efficiency-driven industrial and ERP dashboards.",
    img: "https://images.unsplash.com/photo-1581093206409-01076de81a1b?q=80&w=687",
  },
];

const Templates = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
    setStatus("idle");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${API_BASE_URL}/api/templates/select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          templateCategory: selectedCategory.title,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setTimeout(handleCloseModal, 3000);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 bg-transparent ${
        theme === "dark" ? "text-green-50" : "text-black"
      }`}
    >
      <HeroBanner
        title="JodTech"
        subtitle="Digital Foundations"
        highlight="Template Library"
        theme={theme}
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
        
        {/* Website Domain Templates */}
        <section id="website">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-green-600">
              Website Templates
            </h2>
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              High-performance, domain-specific website layouts. Select a category to get started with your digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteDomains.map((domain, index) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative rounded-[2rem] overflow-hidden border transition-all duration-500 ${
                  theme === "dark" 
                    ? "bg-white/5 border-white/5 hover:bg-white/10" 
                    : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={domain.img} alt={domain.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-green-600 rounded-lg">{domain.icon}</div>
                      <h3 className="text-2xl font-bold">{domain.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`font-medium mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {domain.desc}
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black w-fit
                      ${theme === 'dark' ? 'bg-white/10 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                      Coming Soon
                    </div>
                    <button 
                      onClick={() => handleOpenModal(domain)}
                      className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-all shadow-lg shadow-green-600/20 active:scale-95"
                    >
                      Select Theme
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bespoke Request */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className={`rounded-[3rem] p-12 text-center relative overflow-hidden ${
            theme === 'dark' ? 'bg-green-600/10' : 'bg-green-50'
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-green-600">Need specific features?</h2>
            <p className={`max-w-2xl mx-auto mb-10 text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Can't find exactly what you're looking for? We build fully custom, high-end digital experiences tailored to your business goals.
            </p>
            <button className="bg-green-600 text-white px-10 py-4 rounded-full font-black hover:bg-green-500 transition-all scale-105 hover:scale-110 shadow-xl shadow-green-600/30">
              Get Custom Quote
            </button>
          </div>
        </motion.div>

      </div>

      {/* Selection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 ${
                theme === 'dark' ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white'
              }`}
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-8 right-8 text-2xl opacity-50 hover:opacity-100 transition-opacity"
              >
                <FiX />
              </button>

              <div className="mb-8">
                <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Theme Selection</span>
                <h2 className="text-3xl font-black mt-2">Interested in {selectedCategory?.title}?</h2>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fill out the details below and our team will get back to you with a tailored proposal for your {selectedCategory?.title} website.
                </p>
              </div>

              {status === "success" ? (
                <div className="py-12 text-center">
                  <FiCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />
                  <h3 className="text-2xl font-black mb-2">Thank You!</h3>
                  <p className="text-gray-400">Your selection has been submitted. We'll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold opacity-60 ml-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full px-6 py-4 rounded-2xl outline-none border-2 transition-all ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-green-600 focus:bg-white/10' : 'bg-gray-50 border-gray-100 focus:border-green-600 focus:bg-white'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold opacity-60 ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-6 py-4 rounded-2xl outline-none border-2 transition-all ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-green-600 focus:bg-white/10' : 'bg-gray-50 border-gray-100 focus:border-green-600 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-60 ml-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full px-6 py-4 rounded-2xl outline-none border-2 transition-all ${
                        theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-green-600 focus:bg-white/10' : 'bg-gray-50 border-gray-100 focus:border-green-600 focus:bg-white'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-60 ml-2">Requirements (Optional)</label>
                    <textarea 
                      rows="3"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full px-6 py-4 rounded-2xl outline-none border-2 transition-all resize-none ${
                        theme === 'dark' ? 'bg-white/5 border-white/5 focus:border-green-600 focus:bg-white/10' : 'bg-gray-50 border-gray-100 focus:border-green-600 focus:bg-white'
                      }`}
                    />
                  </div>

                  {status === "error" && (
                    <div className="bg-red-500/10 text-red-500 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                      <FiAlertCircle /> {errorMessage}
                    </div>
                  )}

                  <button 
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full py-5 bg-green-600 text-white rounded-3xl font-black text-lg hover:bg-green-500 transition-all shadow-xl shadow-green-600/30 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? <FiLoader className="animate-spin" /> : "Submit Interest"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Templates;
