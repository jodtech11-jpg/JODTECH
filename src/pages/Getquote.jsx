import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import HeroBanner from "../components/HeroBanner";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { API_BASE_URL } from "../api";

const GetQuote = () => {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Open WhatsApp immediately so browser pop-up blockers don't block it after the async 'await'
      const whatsappNumber = "917867908377";
      const text = `Hello JOD TECH 👋\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nProject Details:\n${form.message}`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");

      const response = await fetch(`${API_BASE_URL}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        console.warn("Backend failed to log submission, but WhatsApp was opened.");
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Network error. Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = `w-full border-2 border-transparent p-5 rounded-3xl outline-none transition-all font-bold text-lg
    ${theme === 'dark' ? 'bg-white/5 focus:border-dg-700 focus:bg-white/10 text-green-50' : 'bg-gray-50 focus:border-dg-700 focus:bg-white text-black'}`;

  return (
    <div className={`overflow-x-hidden min-h-screen transition-colors duration-500 bg-transparent ${theme === 'dark' ? 'text-green-50' : 'text-black'}`}>
      
      <HeroBanner 
        title="Let’s Build"
        subtitle="Amazing Together"
        highlight="Get a Custom Quote"
        theme={theme}
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
      />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[4rem] overflow-hidden border transition-colors duration-500
          ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-black/5'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* LEFT SIDE: OFFICE INFO */}
            <div className={`lg:col-span-2 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden transition-colors duration-500
            ${theme === 'dark' ? 'bg-zinc-900 text-green-50' : 'bg-black text-green-50'}`}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dg-700/20 to-transparent -z-0"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black mb-8 sm:mb-12">Office Coordinates</h3>
                <div className="space-y-12">
                  <div className="flex gap-4 sm:gap-6 md:gap-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl shrink-0">
                      <FiMapPin className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-2 sm:mb-3">Location</p>
                      <p className="text-lg sm:text-xl font-bold leading-relaxed">No 10, Chitharanjan St, Chinna Chokkikulam, Madurai – 625002</p>
                    </div>
                  </div>

                  <div className="flex gap-4 sm:gap-6 md:gap-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl shrink-0">
                      <FiPhone className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-2 sm:mb-3">Phone</p>
                      <p className="text-xl sm:text-2xl font-black">+91 7867908377</p>
                    </div>
                  </div>

                  <div className="flex gap-4 sm:gap-6 md:gap-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl shrink-0">
                      <FiMail className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-2 sm:mb-3">Email</p>
                      <p className="text-xl sm:text-2xl font-black">jodtech11@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR CODE SECTION */}
              <div className="relative z-10 mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 md:p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.google.com/maps?q=9.9358056,78.132"
                    alt="QR Code Location"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-xl"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-black text-base sm:text-lg mb-1">Office Location</p>
                    <p className="text-sm font-medium text-gray-400">Scan to map JodTech infrastructure coordinates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: REQUEST FORM */}
            <div className="lg:col-span-3 p-6 sm:p-8 md:p-12 lg:p-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 sm:mb-12 md:mb-16 leading-tight">
                Engineering <br/> <span className="text-green-600">Request</span>
              </h2>

              <form onSubmit={handleSubmit} className="grid gap-6 sm:gap-8 md:gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                    <input type="text" id="name" placeholder="Johnathan Doe" required onChange={handleChange} className={inputStyles} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Corporate Email</label>
                    <input type="email" id="email" placeholder="john@company.com" required onChange={handleChange} className={inputStyles} />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Secure Phone</label>
                  <input type="tel" id="phone" placeholder="+91 00000 00000" onChange={handleChange} className={inputStyles} />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Project Vision</label>
                  <textarea id="message" rows="5" placeholder="Describe the technological challenges you're facing..." required onChange={handleChange} className={`${inputStyles} resize-none`}></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`py-6 rounded-full font-black text-1xl transition shadow-2xl flex items-center justify-center gap-4 ${isSubmitting ? 'bg-green-600 text-white cursor-not-allowed' : submitSuccess ? 'bg-green-600 text-white' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                >
                  {isSubmitting ? "Dispatching..." : submitSuccess ? "Dispatched!" : "Connect via WhatsApp"} {!isSubmitting && !submitSuccess && <FaWhatsapp className="text-3xl" />}
                </motion.button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetQuote;