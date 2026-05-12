import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiX, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const JobOpeningsModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState("all");

  const jobOpenings = [
    // JOBS
    {
      id: 1,
      title: "Senior Frontend Developer",
      type: "Job",
      level: "Senior",
      duration: "Full-time",
      description: "Lead frontend development with 5+ years experience. Build scalable React applications.",
      skills: ["React", "TypeScript", "Leadership", "System Design"]
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      type: "Job",
      level: "Senior",
      duration: "Full-time",
      description: "Develop end-to-end solutions with modern tech stack. 5+ years experience required.",
      skills: ["React", "Node.js", "AWS", "PostgreSQL"]
    },
    {
      id: 3,
      title: "DevOps Engineer",
      type: "Job",
      level: "Intermediate",
      duration: "Full-time",
      description: "Manage infrastructure, CI/CD pipelines, and cloud deployment. 3+ years experience.",
      skills: ["Kubernetes", "Docker", "AWS", "Terraform"]
    },
    {
      id: 4,
      title: "Product Manager",
      type: "Job",
      level: "Senior",
      duration: "Full-time",
      description: "Drive product strategy and roadmap. Lead cross-functional teams.",
      skills: ["Product Strategy", "Analytics", "Leadership", "Communication"]
    },
    {
      id: 5,
      title: "Backend Developer",
      type: "Job",
      level: "Intermediate",
      duration: "Full-time",
      description: "Build robust APIs and backend systems with Node.js. 3+ years experience.",
      skills: ["Node.js", "MongoDB", "REST APIs", "Database Design"]
    },
    {
      id: 6,
      title: "Business Development Manager",
      type: "Job",
      level: "Senior",
      duration: "Full-time",
      description: "Expand market reach and build client relationships. Sales-focused role.",
      skills: ["Sales", "Communication", "Negotiation", "Market Analysis"]
    },
    // INTERNSHIPS
    {
      id: 7,
      title: "Frontend Developer",
      type: "Internship",
      level: "Junior",
      duration: "3 months",
      description: "Build modern, responsive UIs with React and Tailwind CSS.",
      skills: ["React", "JavaScript", "Tailwind CSS", "Git"]
    },
    {
      id: 8,
      title: "Backend Developer",
      type: "Internship",
      level: "Junior",
      duration: "3 months",
      description: "Develop scalable APIs and server-side logic with Node.js.",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs"]
    },
    {
      id: 9,
      title: "UI/UX Designer",
      type: "Internship",
      level: "Junior",
      duration: "3 months",
      description: "Design beautiful and intuitive user interfaces with Figma.",
      skills: ["Figma", "Design Systems", "Prototyping", "UI/UX"]
    },
    {
      id: 10,
      title: "DevOps Engineer",
      type: "Internship",
      level: "Junior",
      duration: "3 months",
      description: "Learn cloud infrastructure and CI/CD pipelines.",
      skills: ["Docker", "AWS", "CI/CD", "Linux"]
    },
    {
      id: 11,
      title: "React Native Developer",
      type: "Internship",
      level: "Junior",
      duration: "3 months",
      description: "Build cross-platform mobile applications using React Native.",
      skills: ["React Native", "JavaScript", "Firebase", "Mobile Dev"]
    },
    {
      id: 12,
      title: "QA Engineer",
      type: "Internship",
      level: "Junior",
      duration: "3 months",
      description: "Ensure product quality through testing and automation.",
      skills: ["Testing", "Automation", "Selenium", "Jest"]
    },
    // TRAINING
    {
      id: 13,
      title: "Full Stack Developer",
      type: "Training",
      level: "Intermediate",
      duration: "3 months",
      description: "Master full-stack development with modern tech stack.",
      skills: ["React", "Node.js", "MongoDB", "DevOps"]
    },
    {
      id: 14,
      title: "Mobile App Developer",
      type: "Training",
      level: "Intermediate",
      duration: "3 months",
      description: "Build cross-platform mobile apps with React Native.",
      skills: ["React Native", "JavaScript", "Firebase", "Expo"]
    },
    {
      id: 15,
      title: "Data Science",
      type: "Training",
      level: "Intermediate",
      duration: "3 months",
      description: "Learn AI/ML and data analysis with Python.",
      skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"]
    },
    {
      id: 16,
      title: "Cloud Architecture",
      type: "Training",
      level: "Intermediate",
      duration: "3 months",
      description: "Design and deploy scalable cloud solutions on AWS.",
      skills: ["AWS", "Kubernetes", "Terraform", "System Design"]
    },
    {
      id: 17,
      title: "DevOps & Cloud Systems",
      type: "Training",
      level: "Intermediate",
      duration: "3 months",
      description: "Master cloud infrastructure, containerization, and deployment.",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD Pipeline"]
    },
    {
      id: 18,
      title: "Flutter Mastery",
      type: "Training",
      level: "Intermediate",
      duration: "3 months",
      description: "Build beautiful native mobile apps with Flutter.",
      skills: ["Flutter", "Dart", "Firebase", "State Management"]
    },
    {
      id: 19,
      title: "Frontend Architect",
      type: "Training",
      level: "Senior",
      duration: "3 months",
      description: "Lead frontend architecture and design systems.",
      skills: ["React", "TypeScript", "Design Systems", "Leadership"]
    },
    {
      id: 20,
      title: "Backend Systems Engineer",
      type: "Training",
      level: "Senior",
      duration: "3 months",
      description: "Design and build scalable backend infrastructure.",
      skills: ["Node.js", "Microservices", "Database Design", "System Design"]
    }
  ];

  const filteredJobs = selectedType === "all"
    ? jobOpenings
    : jobOpenings.filter(job => job.type === selectedType);

  const jobCount = jobOpenings.filter(j => j.type === "Job").length;
  const internshipCount = jobOpenings.filter(j => j.type === "Internship").length;
  const trainingCount = jobOpenings.filter(j => j.type === "Training").length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transition-colors duration-500
            ${theme === 'dark' ? 'bg-black border border-white/10' : 'bg-white'}`}
          >
            {/* HEADER */}
            <div className={`p-6 md:p-10 border-b transition-colors duration-500 ${theme === 'dark' ? 'border-white/10' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black">Job Openings</h2>
                  <p className={`text-sm md:text-base mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                    {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className={`p-3 rounded-full transition-all duration-300 ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              {/* FILTERS */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedType("all")}
                  className={`px-5 py-2.5 rounded-full font-black text-sm transition-all duration-300 ${
                    selectedType === "all"
                      ? "bg-green-600 text-white shadow-lg shadow-dg-700/50"
                      : theme === 'dark'
                      ? "bg-white/10 text-gray-300 hover:bg-white/20"
                      : "bg-gray-100 text-green-700 hover:bg-gray-200"
                  }`}
                >
                  All ({jobOpenings.length})
                </button>
                <button
                  onClick={() => setSelectedType("Internship")}
                  className={`px-5 py-2.5 rounded-full font-black text-sm transition-all duration-300 ${
                    selectedType === "Internship"
                      ? "bg-green-600 text-white shadow-lg shadow-dg-700/50"
                      : theme === 'dark'
                      ? "bg-white/10 text-gray-300 hover:bg-white/20"
                      : "bg-gray-100 text-green-700 hover:bg-gray-200"
                  }`}
                >
                  Internship ({internshipCount})
                </button>
                <button
                  onClick={() => setSelectedType("Job")}
                  className={`px-5 py-2.5 rounded-full font-black text-sm transition-all duration-300 ${
                    selectedType === "Job"
                      ? "bg-green-600 text-white shadow-lg shadow-dg-700/50"
                      : theme === 'dark'
                      ? "bg-white/10 text-gray-300 hover:bg-white/20"
                      : "bg-gray-100 text-green-700 hover:bg-gray-200"
                  }`}
                >
                  Jobs ({jobCount})
                </button>
                <button
                  onClick={() => setSelectedType("Training")}
                  className={`px-5 py-2.5 rounded-full font-black text-sm transition-all duration-300 ${
                    selectedType === "Training"
                      ? "bg-green-600 text-white shadow-lg shadow-dg-700/50"
                      : theme === 'dark'
                      ? "bg-white/10 text-gray-300 hover:bg-white/20"
                      : "bg-gray-100 text-green-700 hover:bg-gray-200"
                  }`}
                >
                  Training ({trainingCount})
                </button>
              </div>
            </div>

            {/* JOB LIST */}
            <div className="overflow-y-auto flex-1 p-6 md:p-10">
              <div className="space-y-4">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-100 hover:bg-white'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black">{job.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-black ${
                            job.type === "Internship"
                              ? "bg-blue-500/20 text-green-400"
                              : job.type === "Job"
                              ? "bg-dg-700/20 text-green-600"
                              : "bg-purple-500/20 text-green-400"
                          }`}>
                            {job.type}
                          </span>
                        </div>
                        <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`text-xs font-bold px-3 py-1 rounded-full ${
                                theme === 'dark'
                                  ? 'bg-white/10 text-gray-300'
                                  : 'bg-gray-200 text-black'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className={`mt-4 text-sm font-bold ${theme === 'dark' ? 'text-green-600' : 'text-black'}`}>
                          📅 {job.duration} • Level: {job.level}
                        </div>
                      </div>
                      <Link
                        to={`/apply?job=${job.id}&type=${job.type}`}
                        onClick={onClose}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-black bg-green-600 text-white hover:bg-dg-600 transition-all duration-300 whitespace-nowrap shadow-lg"
                      >
                        Apply <FiArrowRight />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobOpeningsModal;
