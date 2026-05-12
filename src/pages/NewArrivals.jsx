import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import HeroBanner from "../components/HeroBanner";
import { FiCalendar, FiClock, FiShare2, FiArrowRight } from "react-icons/fi";

const blogs = [
  {
    title: "The Rise of Generative AI in Business Operations",
    category: "Technology",
    date: "March 15, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
    desc: "How automated intelligence is redefining efficiency in mid-sized enterprises across the globe."
  },
  {
    title: "Scaling Your Start-up's Infrastructure",
    category: "Engineering",
    date: "March 10, 2026",
    readTime: "12 min read",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000",
    desc: "Building a foundation that can handle millions of requests without breaking the bank."
  },
  {
    title: "Why Minimalist UI is the Future of E-commerce",
    category: "Design",
    date: "March 05, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1000",
    desc: "Psychology behind frictionless shopping and how simplicity drive conversion rates."
  }
];

const NewArrivals = () => {
  const { theme } = useTheme();

  return (
    <div className={`overflow-x-hidden min-h-screen transition-colors duration-500 bg-transparent ${theme === 'dark' ? 'text-green-50' : 'text-green-600'}`}>
      
      <HeroBanner 
        title="Innovation"
        subtitle="Chronicles"
        highlight="What's New at JodTech"
        theme={theme}
        image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200"
      />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group cursor-pointer rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500
              ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-gray-50'}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={blog.img} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 font-bold" 
                  alt={blog.title} 
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600 text-green-50 rounded-full text-xs font-black uppercase tracking-widest">
                  {blog.category}
                </div>
              </div>
              
              <div className="p-10 space-y-6">
                <div className="flex items-center gap-6 text-sm font-bold text-green-600">
                  <span className="flex items-center gap-2"><FiCalendar /> {blog.date}</span>
                  <span className="flex items-center gap-2"><FiClock /> {blog.readTime}</span>
                </div>
                <h3 className="text-2xl font-black leading-tight group-hover:text-green-600 transition-colors">
                  {blog.title}
                </h3>
                <p className={`text-lg font-medium leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-green-600'}`}>
                  {blog.desc}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-black/5">
                   <button className="flex items-center gap-2 font-black group-hover:gap-4 transition-all">
                      Read Full Story <FiArrowRight />
                   </button>
                   <FiShare2 className="text-xl hover:text-green-600 transition-colors" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
