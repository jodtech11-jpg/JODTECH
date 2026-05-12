import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const HomeHeroBanner = ({ theme = "light" }) => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1621111848501-8d3634f82336?q=80&w=1265&auto=format&fit=crop",
      highlight: "Enterprise Technology Partner",
      title: "Building Scalable",
      subtitle: "Digital Ecosystems",
      description:
        "Empowering visionary organizations with robust, next-generation engineering to accelerate business evolution and technical supremacy."
    },
    {
      image: "https://images.unsplash.com/photo-1627634771521-9754fe2bc49b?w=600&auto=format&fit=crop&q=60",
      highlight: "Strategic Innovation",
      title: "Architecting",
      subtitle: "Resilient Solutions",
      description:
        "Deploying high-performance web, mobile, and software platforms meticulously crafted for operational excellence and maximized ROI."
    },
    {
      image: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=1170&auto=format&fit=crop",
      highlight: "End-to-End Capabilities",
      title: "Pioneering",
      subtitle: "Future-Ready Systems",
      description:
        "From rigorous cloud infrastructure to sophisticated enterprise applications, we deliver uncompromising quality at industrial scale."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  const animateSlideChange = (nextSlideIndex) => {
    const tl = gsap.timeline();

    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5
    }, 0);

    tl.to(imageRef.current, {
      opacity: 0,
      duration: 0.6
    }, 0);

    tl.add(() => {
      setCurrentSlide(nextSlideIndex);
    }, 0.3);

    tl.to(imageRef.current, {
      opacity: 1,
      duration: 0.8
    }, 0.4);

    tl.set(contentRef.current, { opacity: 1, y: 0 }, 0.5);

    tl.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      },
      0.6
    );
  };

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set(contentRef.current, { opacity: 1 });

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
      0
    );

    tl.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      },
      0.5
    );
  }, []);

  useEffect(() => {
    autoPlayTimerRef.current = setTimeout(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      animateSlideChange(nextSlide);
    }, 4000);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [currentSlide]);

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-center px-4 md:px-6 overflow-hidden"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-20 w-full h-full">
        <img
          ref={imageRef}
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl w-full px-4 sm:px-6 md:px-8 lg:px-10 opacity-0"
      >
        <div className="inline-block px-4 py-2 mb-6 text-xs md:text-sm font-black tracking-widest rounded-full uppercase bg-green-700/30 text-green-50 backdrop-blur-md border border-green-700/50">
          {slides[currentSlide].highlight}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1] mb-6 text-white">
          {slides[currentSlide].title} <br />
          <span className="text-green-600">
            {slides[currentSlide].subtitle}
          </span>
        </h1>

        <p className="text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-8 font-medium text-white/80">
          {slides[currentSlide].description}
        </p>

        <Link to="/services">
          <button className="px-8 md:px-12 py-4 md:py-5 rounded-full text-base md:text-xl font-black shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 bg-green-600 text-white hover:bg-green-700">
            Explore Solutions
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HomeHeroBanner;