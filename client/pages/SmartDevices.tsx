import { motion } from "framer-motion";
import { 
  Lightbulb, 
  ShieldCheck, 
  ThermometerSun, 
  Tv, 
  Volume2, 
  Mic2, 
  Wind, 
  ScanFace, 
  RadioTower, 
  Waves, 
  Maximize2, 
  CirclePower, 
  ArrowRight, 
  Speaker, 
  SunDim, 
  Lock,
  Sparkles,
  Zap
} from "lucide-react";
import Navigation from "@/components/Navigation";
import SmartShowcase from "@/components/smart-devices/SmartShowcase";
import Footer from "@/components/Footer";

export default function SmartDevices() {
  const smartFeatures = [
    {
      icon: Lightbulb,
      title: "Dimmable & Mood Lighting",
      desc: "Create atmospheric scenes with warm, cool, or colour-changing lighting effects – perfect for every mood.",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      icon: ShieldCheck,
      title: "Security Integration",
      desc: "Monitor CCTV and door cameras directly from your smart wall. Receive intruder alerts and control alarm modes via panel or app.",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      icon: ThermometerSun,
      title: "Smart Climate Control",
      desc: "Adjust AC and heating with intelligent schedules and geolocation. Integrates with Orvibo's MixPad system.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Lock,
      title: "Face Recognition Locks",
      desc: "AI-powered smart locks with visual door viewer and HD screen. Unlock via facial recognition or MixPad sync.",
      gradient: "from-purple-400 to-indigo-500",
    },
    {
      icon: Mic2,
      title: "Voice Announcements",
      desc: "Broadcast messages across rooms. Use voice intercom through Orvibo MixPad D1 for family notifications.",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      icon: Tv,
      title: "Sky Box Integration",
      desc: "Dedicated slot for Sky or media boxes within smart wall. Control AV with a single touch panel.",
      gradient: "from-slate-400 to-gray-500",
    },
    {
      icon: Speaker,
      title: "Whole-House Audio",
      desc: "Stream music to every room. Sync Spotify, Apple Music, and more via smart panel or app.",
      gradient: "from-violet-400 to-purple-500",
    },
    {
      icon: Wind,
      title: "Smart Curtains & Blinds",
      desc: "Automate window coverings using Orvibo's silent Zigbee smart curtain motors. Schedule or voice control supported.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: CirclePower,
      title: "Universal Appliance Control",
      desc: "Control all IR-based home appliances (AC, fans, media) from a single MixPad wall panel or remote.",
      gradient: "from-red-400 to-pink-500",
    },
    {
      icon: SunDim,
      title: "Sunrise/Sunset Lighting",
      desc: "Trigger lights automatically with natural daylight cycles or GPS location. Great for energy saving and ambience.",
      gradient: "from-yellow-400 to-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background with enhanced gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('/images/luxury-living-room.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-50"
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-40"
            animate={{
              y: [0, -25, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Enhanced badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-100 px-6 py-3 rounded-full text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Smart Ecosystem
                <Zap className="w-4 h-4" />
              </motion.div>

              {/* Enhanced heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-black text-white leading-tight"
              >
                Smarter Living{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                    Built In
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
              </motion.h1>

              {/* Enhanced description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl lg:text-2xl text-slate-200 leading-relaxed max-w-2xl"
              >
                Enhance your Smart Wall with intelligent devices powered by Orvibo. Experience integrated control over lighting, security, media, curtains and more.
              </motion.p>

              {/* Enhanced buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a 
                  href="#features" 
                  className="group relative bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 text-lg rounded-2xl font-bold flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Features 
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
                
                <motion.a 
                  href="/smart-wall-construction" 
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg rounded-2xl font-bold flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Smart Wall Setup 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Enhanced image section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }} 
              className="relative"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <img 
                  src="/images/smart-panel.png" 
                  alt="Smart Control Panel" 
                  className="relative rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 text-slate-600 px-6 py-3 rounded-full text-sm font-medium mb-8"
            >
              <Zap className="w-4 h-4" />
              Integrated Smart Features
            </motion.div>
            
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-8 leading-tight">
              Integrated Smart Features
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              All Orvibo smart devices work with a central MixPad panel and wireless remote, offering complete control through one elegant interface.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smartFeatures.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div 
                  className="h-full bg-white border border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl rounded-3xl p-8 text-center relative overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon with enhanced styling */}
                  <motion.div 
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="text-white w-8 h-8" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  
                  <h3 className="relative text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="relative text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SmartShowcase />
      <Footer />
    </div>
  );
}
