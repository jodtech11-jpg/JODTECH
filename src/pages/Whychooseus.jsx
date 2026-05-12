import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const WhyChooseUs = () => {
  const { theme } = useTheme();
  
  const stats = [
    { number: 50, label: "Projects Delivered", suffix: "+" },
    { number: 50, label: "Happy Clients", suffix: "+" },
    { number: 1, label: "Years Experience", suffix: "+" },
    { number: 24, label: "Support", suffix: "/7" },
  ];


  return (
    <section className="py-32 bg-transparent px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-4 block">Engineered for Excellence</span>
            <h2 className={`text-4xl md:text-6xl font-bold mb-8 leading-tight transition-colors duration-500 ${theme === 'dark' ? 'text-green-50' : 'text-green-900'}`}>
              Why leading companies <br/> choose JodTech.
            </h2>
            <div className="w-20 h-1.5 bg-dg-700 mb-10 rounded-full"></div>
            <p className={`text-xl leading-relaxed mb-8 transition-colors duration-500 ${theme === 'dark' ? 'text-gray-400' : 'text-green-600'}`}>
              We don't just write code; we architect solutions that drive real-world business outcomes. Our methodology is rooted in speed, security, and scalability.
            </p>
            <p className={`text-xl leading-relaxed transition-colors duration-500 ${theme === 'dark' ? 'text-gray-400' : 'text-green-600'}`}>
              With a 98% client retention rate, we've proven our ability to scale with your ambitions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 md:gap-10">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-[2.5rem] p-10 text-center hover:shadow-2xl transition-all duration-500 border
                ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-white/10' : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-100'}`}
              >
                <h3 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-4">
                  <Counter value={item.number} suffix={item.suffix} />
                </h3>
                <p className={`text-lg font-bold transition-colors duration-500 ${theme === 'dark' ? 'text-green-50' : 'text-green-900'}`}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;