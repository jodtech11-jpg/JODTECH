import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WhoWeAre from "./pages/who_we_are";
import Services from "./pages/Services";
import Careers from "./pages/Career";
import GetQuote from "./pages/Getquote";
import Footer from "./pages/Footer";
import ScrollToTop from "./components/Scrollertop";
import Apply from "./pages/Apply";
import Products from "./pages/Products";
import Templates from "./pages/Templates";
import NewArrivals from "./pages/NewArrivals";
import ScrollActionButton from "./components/ScrollActionButton";
import FloatingBackground from "./components/FloatingBackground";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <Navbar />}
      {!isAdminPath && <FloatingBackground />}
      <ScrollToTop />
      {!isAdminPath && <ScrollActionButton />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Main Routes */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><WhoWeAre /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
          <Route path="/templates" element={<PageWrapper><Templates /></PageWrapper>} />
          <Route path="/new" element={<PageWrapper><NewArrivals /></PageWrapper>} />
          <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
          <Route path="/quote" element={<PageWrapper><GetQuote /></PageWrapper>} />
          <Route path="/apply" element={<PageWrapper><Apply /></PageWrapper>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<PageWrapper><AdminLogin /></PageWrapper>} />
          <Route path="/admin/dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      {!isAdminPath && <Footer />}
    </>
  );
};

export default App;