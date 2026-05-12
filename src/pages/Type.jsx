import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const texts = [
  "AI-Powered Solutions",
  "Tech-Driven Growth",
  "Digital Transformation"
];

const TypingText = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[index];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80); // typing speed

      return () => clearTimeout(timeout);
    } else {
      // Pause then move to next text
      setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 1500);
    }
  }, [charIndex, index]);

  return (
    <motion.div
      className="mt-12 text-3xl md:text-4xl font-semibold text-center text-green-600 tracking-wide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
      <span className="animate-pulse">.</span>
    </motion.div>
  );
};

export default TypingText;