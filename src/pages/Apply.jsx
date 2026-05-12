import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import HeroBanner from "../components/HeroBanner";
import { FiSend, FiCheckCircle, FiUpload, FiFile } from "react-icons/fi";
import { API_BASE_URL } from "../api";
import { useSearchParams } from "react-router-dom";

const Apply = () => {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Internship",
    role: "",
    message: "",
  });

  // Auto-fill form from URL parameters
  useEffect(() => {
    const jobId = searchParams.get("job");
    const jobType = searchParams.get("type");

    const jobTitles = {
      "1": "Senior Frontend Developer",
      "2": "Full Stack Engineer",
      "3": "DevOps Engineer",
      "4": "Product Manager",
      "5": "Backend Developer",
      "6": "Business Development Manager",
      "7": "Frontend Developer",
      "8": "Backend Developer",
      "9": "UI/UX Designer",
      "10": "DevOps Engineer",
      "11": "React Native Developer",
      "12": "QA Engineer",
      "13": "Full Stack Developer",
      "14": "Mobile App Developer",
      "15": "Data Science",
      "16": "Cloud Architecture",
      "17": "DevOps & Cloud Systems",
      "18": "Flutter Mastery",
      "19": "Frontend Architect",
      "20": "Backend Systems Engineer",
    };

    if (jobId && jobTitles[jobId]) {
      setForm(prev => ({
        ...prev,
        role: jobTitles[jobId],
        type: jobType || "Internship"
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["pdf", "doc", "docx"].includes(ext)) {
        alert("Only PDF, DOC, and DOCX files are allowed.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be under 10MB.");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. FIRST: Upload to backend & get resume download link
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("type", form.type);
      formData.append("role", form.role);
      formData.append("message", form.message);
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const response = await fetch(`${API_BASE_URL}/api/apply`, {
        method: "POST",
        body: formData,
      });

      let resumeLink = "";
      if (response.ok) {
        const data = await response.json();
        resumeLink = data.resumeUrl || "";
      }

      // 2. Open Gmail Compose with resume PDF link included
      const emailTo = "jodtech11@gmail.com";
      const fullResumeLink = resumeLink ? (resumeLink.startsWith('http') ? resumeLink : window.location.origin + resumeLink) : "";
      const emailSubject = `New ${form.type} Application - ${form.name}`;
      const emailBody = `Hello JodTech Team,\n\nPlease find my application details below:\n\nFull Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nApplication Type: ${form.type}\nRole of Interest: ${form.role || "N/A"}\n\nWhy JodTech:\n${form.message || "N/A"}${fullResumeLink ? `\n\n📎 Resume Download Link:\n${fullResumeLink}` : ""}\n\nThank you,\n${form.name}`;
      
      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(emailTo)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailComposeUrl, "_blank");

      // 3. Open WhatsApp with resume link
      const whatsappNumber = "917338880298";
      const whatsappText = `Hello JODTECH 👋\n\nNew Application:\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nType: ${form.type}\nRole: ${form.role || "N/A"}${fullResumeLink ? `\nResume: ${fullResumeLink}` : ""}\nMessage: ${form.message}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
      setTimeout(() => window.open(whatsappUrl, "_blank"), 500);

      // 4. Show success & reset
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", type: "Internship", role: "", message: "" });
      setResumeFile(null);
      setTimeout(() => setSubmitted(false), 8000);

    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Network Error: Could not connect to the backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = `w-full border-2 border-transparent p-5 rounded-3xl outline-none transition-all font-bold text-lg
    ${theme === 'dark' ? 'bg-white/5 focus:border-dg-700 focus:bg-white/10 text-green-50' : 'bg-gray-50 focus:border-dg-700 focus:bg-white text-black'}`;

  return (
    <div className={`overflow-x-hidden min-h-screen transition-colors duration-500 bg-transparent ${theme === 'dark' ? 'text-green-50' : 'text-black'}`}>
      
      <HeroBanner 
        title="Fuel Your"
        subtitle="Innovation Journey"
        highlight="JodTech Careers"
        theme={theme}
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
      />

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-16 rounded-[4rem] text-center shadow-2xl transition-colors duration-500
            ${theme === 'dark' ? 'bg-white/5 border border-white/5' : 'bg-dg-50 border border-green-100'}`}
          >
            <FiCheckCircle className="text-8xl text-green-600 mx-auto mb-8" />
            <h2 className="text-4xl font-black mb-6">Application Received!</h2>
            <p className="text-xl font-medium text-black">
              Our engineering coordination team will review your profile and reach out within 48-72 hours.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 md:p-16 rounded-[4rem] shadow-2xl transition-colors duration-500
            ${theme === 'dark' ? 'bg-white/5' : 'bg-white border border-black/5'}`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">Start Your Application</h2>
              <p className="text-green-600 text-lg font-bold">Provide your professional coordinates below.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                <input type="text" name="name" placeholder="Johnathan Doe" value={form.name} onChange={handleChange} required className={inputStyles} />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Email Coordinate</label>
                <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required className={inputStyles} />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Secure Phone</label>
                <input type="text" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required className={inputStyles} />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Application Type</label>
                <select name="type" value={form.type} onChange={handleChange} className={`${inputStyles} cursor-pointer`}>
                  <option className="bg-black text-green-50">Internship</option>
                  <option className="bg-black text-green-50">Job</option>
                  <option className="bg-black text-green-50">Strategic Training</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Role of Interest</label>
                <input type="text" name="role" placeholder="e.g., Senior Cloud Architect" value={form.role} onChange={handleChange} className={inputStyles} />
              </div>

              {/* ===== RESUME UPLOAD FIELD ===== */}
              <div className="md:col-span-2 space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Upload Resume (PDF / DOC)</label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className={`w-full p-6 rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-300 flex items-center justify-center gap-4
                  ${resumeFile 
                    ? (theme === 'dark' ? 'border-dg-700 bg-dg-700/10' : 'border-dg-700 bg-dg-50') 
                    : (theme === 'dark' ? 'border-white/20 hover:border-dg-700 bg-white/5' : 'border-gray-300 hover:border-dg-700 bg-gray-50')}`}
                >
                  {resumeFile ? (
                    <>
                      <FiFile className="text-2xl text-green-600" />
                      <span className="font-bold text-lg text-green-600">{resumeFile.name}</span>
                      <span className="text-sm text-gray-400 ml-2">({(resumeFile.size / 1024).toFixed(0)} KB)</span>
                    </>
                  ) : (
                    <>
                      <FiUpload className={`text-3xl ${theme === 'dark' ? 'text-green-600' : 'text-gray-400'}`} />
                      <div>
                        <p className={`font-bold text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>Click to upload your resume</p>
                        <p className="text-sm text-gray-400">PDF, DOC, or DOCX — Max 10MB</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Why JodTech?</label>
                <textarea name="message" rows={4} placeholder="Describe your technological ambitions..." value={form.message} onChange={handleChange} className={`${inputStyles} resize-none`} />
              </div>
              <div className="md:col-span-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-6 rounded-full font-black text-1xl shadow-2xl transition-all flex items-center justify-center gap-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                  ${theme === 'dark' ? 'bg-green-600 text-white hover:bg-dg-600' : 'bg-green-600 text-white hover:bg-dg-600'}`}
                >
                  {isSubmitting ? "Dispatching..." : <>Dispatch Application <FiSend /></>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Apply;