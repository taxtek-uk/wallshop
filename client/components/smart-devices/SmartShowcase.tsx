import { Play, ChevronLeft, ChevronRight, Sparkles, Eye } from "lucide-react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const showcaseItems = [
  {
    img: "/images/smart-home.png",
    alt: "Smart Lighting Scene",
    video: false,
    title: "Ambient Smart Lighting",
    description: "Transform your space with intelligent lighting that adapts to your mood and daily routines.",
  },
  {
    img: "/images/integrated-smart-modules.png",
    alt: "Voice Controlled Wall Panel",
    video: true,
    title: "Voice Control Integration",
    description: "Experience seamless voice control with our advanced MixPad wall panel system.",
  },
  {
    img: "/images/home-cenima.webp",
    alt: "Ambient Smart Climate Control",
    video: false,
    title: "Climate Perfection",
    description: "Maintain the perfect temperature and atmosphere in every room automatically.",
  },
];

export default function SmartShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({ 
      left: dir === "left" ? -scrollAmount : scrollAmount, 
      behavior: "smooth" 
    });

    // Update current index for dot indicators
    if (dir === "right") {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-emerald-400/20 rounded-full animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Enhanced Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-100 px-6 py-3 rounded-full text-sm font-medium mb-8"
          >
            <Eye className="w-4 h-4" />
            Real Implementations
            <Sparkles className="w-4 h-4" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Made with Smart Devices —{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              real work, real results
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover how our smart devices transform real spaces into intelligent, responsive environments.
          </p>
        </motion.div>

        {/* Enhanced Carousel Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Enhanced Navigation Buttons */}
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-4 rounded-full transition-all duration-300 hover:scale-110 group"
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="text-white w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </motion.button>
          
          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-4 rounded-full transition-all duration-300 hover:scale-110 group"
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="text-white w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </motion.button>

          {/* Enhanced Slider Items */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {showcaseItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative snap-center min-w-[320px] md:min-w-[480px] lg:min-w-[600px] group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-white/10 backdrop-blur-sm">
                  {/* Image with enhanced overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.img 
                      src={item.img} 
                      alt={item.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Video play button with enhanced styling */}
                    {item.video && (
                      <motion.button 
                        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div 
                          className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-2xl border border-white/20"
                          whileHover={{ scale: 1.1 }}
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(255, 255, 255, 0.4)",
                              "0 0 0 20px rgba(255, 255, 255, 0)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        >
                          <Play className="text-slate-800 w-8 h-8 ml-1" />
                        </motion.div>
                      </motion.button>
                    )}
                  </div>

                  {/* Enhanced content section */}
                  <motion.div 
                    className="p-8 bg-gradient-to-br from-white to-slate-50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {showcaseItems.map((_, idx) => (
              <motion.button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-amber-400 shadow-lg shadow-amber-400/50' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => {
                  setCurrentIndex(idx);
                  const container = scrollRef.current;
                  if (container) {
                    const scrollAmount = container.clientWidth * 0.85 * idx;
                    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
                  }
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Description */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-white mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            How to place your devices in different environments
          </h3>
          <p className="text-lg text-slate-300 leading-relaxed">
            Use your smart accessories and control panels as showcase modules to demonstrate integration with modern
            architecture and vibrant lifestyle settings. Each installation is carefully crafted to blend seamlessly
            with your existing décor while providing cutting-edge functionality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
