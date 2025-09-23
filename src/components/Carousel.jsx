import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ slidesProp }) {
  const defaultSlides = [
    { id: 1, bg: "/carousel-image-1.avif" },
    { id: 2, bg: "/carousel-image-2.avif" },
    { id: 3, bg: "/carousel-image-3.webp" },
    { id: 4, bg: "/carousel-image-4.jpg" },
  ];

  const slides = slidesProp || defaultSlides;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setIndex((p) => (p + 1) % slides.length);
  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].bg})` }}
            onError={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button 
        onClick={prev} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all z-10 border border-gray-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      
      <button 
        onClick={next} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all z-10 border border-gray-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? 'bg-orange-500 scale-110' : 'bg-white/70 hover:bg-white'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
