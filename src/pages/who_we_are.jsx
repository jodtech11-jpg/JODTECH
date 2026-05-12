import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import HeroBanner from "../components/HeroBanner";
import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

const WhoWeAre = () => {
  const { theme } = useTheme();

  const missionVisionValues = [
    {
      icon: <FiTarget className="w-12 h-12" />,
      title: "Mission",
      description: "To empower businesses with cutting-edge technology solutions that drive innovation, efficiency, and sustainable growth in an ever-evolving digital landscape."
    },
    {
      icon: <FiEye className="w-12 h-12" />,
      title: "Vision",
      description: "To be the most trusted partner in digital transformation, recognized globally for delivering excellence, integrity, and transformative solutions."
    },
    {
      icon: <FiHeart className="w-12 h-12" />,
      title: "Values",
      description: "Innovation • Integrity • Excellence • Customer-Centric • Collaboration • Continuous Learning"
    }
  ];

  const culturePoints = [
    "Collaborative and innovative work environment",
    "Continuous learning and professional development",
    "Diversity and inclusion at heart",
    "Work-life balance and flexibility",
    "Cutting-edge technology and tools",
    "Mentorship and career growth opportunities"
  ];

  return (
    <div className={`overflow-x-hidden min-h-screen transition-colors duration-500 bg-transparent ${theme === 'dark' ? 'text-green-50' : 'text-black'}`}>

      <HeroBanner
        title="Engineering the"
        subtitle="Future of Tech"
        highlight="JodTech — Identity"
        theme={theme}
        image="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Driving Global Scale & Intelligence</h2>
            <p className={`text-xl leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              At JodTech, we don't just build software; we architect the foundation of your digital success. By blending rigorous engineering talent with cutting-edge technologies like AI, Cloud, and scalable frameworks, we equip modern enterprises to outmaneuver the competition. Our core philosophy is anchored in transparency, speed of execution, and an unrelenting pursuit of excellence.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1639664810686-b817b22bb549?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="team"
              className="rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 h-[300px] sm:h-[420px] md:h-[520px] lg:h-[600px] w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Mission Vision Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Mission, Vision & Values</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              The pillars that guide our every decision
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionVisionValues.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-10 rounded-[2rem] transition-all duration-500 hover:shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'bg-gray-50 border border-gray-100 hover:bg-white'
                }`}
              >
                <div className="text-green-600 mb-6">{item.icon}</div>
                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Choose JodTech?</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              Proven excellence, trusted by industry leaders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Our experienced developers and designers have successfully delivered 50+ projects, bringing deep expertise across every technology stack."
              },
              {
                title: "Quality Assurance",
                description: "We maintain the highest standards of code quality and user experience, ensuring every product exceeds expectations."
              },
              {
                title: "Client-Centric Approach",
                description: "Your success is our priority. We work closely with clients to understand goals and deliver solutions that drive real business impact."
              },
              {
                title: "24/7 Support",
                description: "Our dedicated support team is always available to ensure your applications run smoothly and efficiently."
              },
              {
                title: "Innovative Solutions",
                description: "We stay ahead of industry trends, leveraging cutting-edge technologies to build future-proof applications."
              },
              {
                title: "Long-Term Partnership",
                description: "With a 98% client retention rate, we build lasting relationships based on trust, transparency, and consistent delivery."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-[2rem] transition-all duration-500 hover:shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'bg-gray-50 border border-gray-100 hover:bg-white'
                }`}
              >
                <h3 className="text-xl font-black mb-4 text-green-600">{item.title}</h3>
                <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Life at JodTech */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Life at JodTech</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
              More than just a workplace, it's a community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {culturePoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-dg-700 flex-shrink-0 mt-1" />
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`mt-12 p-10 rounded-[2rem] text-center ${
              theme === 'dark'
                ? 'bg-white/5 border border-white/10'
                : 'bg-dg-50 border border-green-100'
            }`}
          >
            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-green-50' : 'text-green-900'}`}>
              Join us and be part of a journey where <span className="text-green-600">innovation meets impact</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhoWeAre;