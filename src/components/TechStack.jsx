import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const TechStack = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const barsRef = useRef({});

  const techData = {
    all: [
      { name: "React", percentage: 90 },
      { name: "Next.js", percentage: 85 },
      { name: "Node.js", percentage: 88 },
      { name: "MongoDB", percentage: 80 },
      { name: "MySQL", percentage: 75 },
      { name: "AWS", percentage: 78 },
      { name: "Docker", percentage: 70 },
      { name: "Firebase", percentage: 82 },
      { name: "Figma", percentage: 92 }
    ],
    frontend: [
      { name: "React", percentage: 95 },
      { name: "Next.js", percentage: 90 },
      { name: "HTML", percentage: 100 },
      { name: "CSS", percentage: 98 },
      { name: "Tailwind CSS", percentage: 92 }
    ],
    backend: [
      { name: "Node.js", percentage: 92 },
      { name: "Express", percentage: 90 },
      { name: "MongoDB", percentage: 88 },
      { name: "PostgreSQL", percentage: 85 },
      { name: "Python", percentage: 87 }
    ],
    database: [
      { name: "MongoDB", percentage: 88 },
      { name: "PostgreSQL", percentage: 85 },
      { name: "MySQL", percentage: 82 },
      { name: "Firebase", percentage: 80 },
      { name: "Redis", percentage: 78 }
    ],
    devops: [
      { name: "Docker", percentage: 85 },
      { name: "AWS", percentage: 80 },
      { name: "CI/CD", percentage: 82 },
      { name: "Kubernetes", percentage: 78 },
      { name: "Git", percentage: 100 }
    ],
    design: [
      { name: "Figma", percentage: 95 },
      { name: "Adobe XD", percentage: 88 },
      { name: "Framer Motion", percentage: 90 },
      { name: "UI/UX", percentage: 92 },
      { name: "Sketch", percentage: 85 }
    ]
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    { id: "devops", label: "DevOps" },
    { id: "design", label: "Design" }
  ];

  const currentTechs = techData[activeFilter];

  // Animate bars on mount and filter change
  useEffect(() => {
    const tl = gsap.timeline();

    currentTechs.forEach((tech, index) => {
      const barRef = barsRef.current[tech.name];
      if (barRef) {
        tl.fromTo(
          barRef,
          { height: 0, opacity: 0 },
          {
            height: tech.percentage + "%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          },
          index * 0.08
        );
      }
    });

    return () => tl.kill();
  }, [activeFilter, currentTechs]);

  return (
    <section className="w-full bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-green-50 mb-4">
            Our Technology <span className="text-green-600">Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg">Cutting-edge tools and platforms we master</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-16">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full font-black text-sm md:text-base transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-green-600 text-white shadow-lg shadow-dg-700/50 scale-105 md:scale-110"
                  : "border-2 border-white text-green-50 hover:bg-white/10"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Mobile View: Horizontal Progress Bars */}
        <div className="block md:hidden space-y-6">
          {currentTechs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-green-50 font-black text-lg">{tech.name}</span>
                <span className="text-green-600 font-bold text-lg">{tech.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-green-600 to-green-500 h-full rounded-full shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View: Vertical Bars Grid */}
        <div className="hidden md:block">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {currentTechs.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center">
                {/* Bar Container */}
                <div className={`${activeFilter === 'all' ? 'w-24 h-48 md:h-56' : 'w-40 h-56 md:h-64'} flex items-end justify-center mb-4 group cursor-pointer`}>
                  {/* Animated Bar */}
                  <div
                    ref={(el) => (barsRef.current[tech.name] = el)}
                    className="w-1/3 rounded-lg bg-green-700 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-green-700/50 origin-bottom"
                  />

                  {/* Percentage on Hover */}
                  <div className="absolute text-green-600 font-black text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {tech.percentage}%
                  </div>
                </div>

                {/* Tech Name */}
                <p className="text-green-50 font-black text-center text-sm md:text-base">{tech.name}</p>

                {/* Percentage Below */}
                <p className="text-green-600 font-bold text-xs md:text-sm mt-1">{tech.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
