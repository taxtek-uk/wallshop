import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import { 
  Bed, 
  Lightbulb, 
  Volume2, 
  Thermometer, 
  Smartphone, 
  Settings, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Star, 
  Shield, 
  Zap,
  Ruler,
  Download,
  Home, 
  Users, 
  Moon, 
  Sun, 
  Wifi, 
  Speaker, 
  Timer, 
  Power, 
  RotateCcw, 
  Search, 
  MessageCircle, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Palette, 
  Music, 
  Wind, 
  Eye, 
  Sunrise, 
  CloudMoon, 
  Heart, 
  Sparkles, 
  Battery, 
  Waves,
  HelpCircle,
  Play,
  Pause,
  Info
} from 'lucide-react'; 

// SEO Head Management Utility 
const SEOHead: React.FC<{ 
  title: string; 
  description: string; 
  canonical: string; 
  keywords: string; 
  ogImage?: string; 
}> = ({ title, description, canonical, keywords, ogImage }) => { 
  useEffect(() => { 
    // Set document title 
    document.title = title; 

    // Helper function to set or update meta tags 
    const setMetaTag = (name: string, content: string, property?: boolean) => { 
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`; 
      let meta = document.querySelector(selector) as HTMLMetaElement; 
      
      if (!meta) { 
        meta = document.createElement('meta'); 
        if (property) { 
          meta.setAttribute('property', name); 
        } else { 
          meta.setAttribute('name', name); 
        } 
        document.head.appendChild(meta); 
      } 
      meta.content = content; 
    }; 

    // Basic meta tags 
    setMetaTag('description', description); 
    setMetaTag('keywords', keywords); 
    setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'); 
    setMetaTag('author', 'The Wall Shop'); 
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0'); 

    // Canonical URL 
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement; 
    if (!canonicalLink) { 
      canonicalLink = document.createElement('link'); 
      canonicalLink.rel = 'canonical'; 
      document.head.appendChild(canonicalLink); 
    } 
    canonicalLink.href = canonical; 

    // Open Graph tags 
    setMetaTag('og:title', title, true); 
    setMetaTag('og:description', description, true); 
    setMetaTag('og:url', canonical, true); 
    setMetaTag('og:type', 'website', true); 
    setMetaTag('og:site_name', 'The Wall Shop', true); 
    setMetaTag('og:locale', 'en_GB', true); 
    if (ogImage) { 
      setMetaTag('og:image', ogImage, true); 
      setMetaTag('og:image:width', '1200', true); 
      setMetaTag('og:image:height', '630', true); 
      setMetaTag('og:image:alt', 'Smart Bedroom Wall by The Wall Shop', true); 
    } 

    // Twitter Card tags 
    setMetaTag('twitter:card', 'summary_large_image'); 
    setMetaTag('twitter:title', title); 
    setMetaTag('twitter:description', description); 
    if (ogImage) { 
      setMetaTag('twitter:image', ogImage); 
    } 

    // JSON-LD Structured Data 
    const serviceSchema = { 
      "@context": "https://schema.org", 
      "@type": "Service", 
      "name": "Smart Bedroom Wall Installation", 
      "description": "Professional smart bedroom wall installation with integrated lighting, climate control, and sleep optimisation technology. Transform your bedroom into an intelligent sanctuary.", 
      "provider": { 
        "@type": "Organization", 
        "name": "The Wall Shop", 
        "url": "https://www.thewallshop.co.uk", 
        "telephone": "+44 141 739 3377", 
        "email": "info@thewallshop.co.uk", 
        "address": { 
          "@type": "PostalAddress", 
          "streetAddress": "SMK Business Centre, 4 The Piazza", 
          "addressLocality": "Glasgow", 
          "postalCode": "G5 8BE", 
          "addressCountry": "GB" 
        } 
      }, 
      "areaServed": "United Kingdom", 
      "serviceType": "Smart Wall Installation", 
      "category": "Bedroom Design", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart bedroom wall solutions from consultation to full installation" 
      } 
    }; 

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "How do smart bedroom walls improve sleep quality?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Smart bedroom walls optimise sleep through automated lighting that follows circadian rhythms, temperature control for ideal sleeping conditions, noise reduction features, and gradual wake-up lighting that mimics natural sunrise." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What bed sizes work with smart bedroom walls?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Our smart bedroom walls accommodate all standard UK bed sizes including Double (135cm), King (150cm), and Super King (180cm). Each installation is custom-designed to perfectly complement your bed size and room dimensions." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Can I control my smart bedroom wall with my phone?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, comprehensive smartphone app control allows you to adjust lighting, temperature, audio, and sleep modes. The app includes scheduling, voice control integration, and sleep tracking features." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Do smart bedroom walls include climate control?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, integrated climate control maintains optimal bedroom temperature and humidity levels. The system learns your preferences and automatically adjusts throughout the night for better sleep quality." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What lighting options are available for bedroom walls?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "LED lighting includes warm white for relaxation, cool white for reading, RGB colour options, circadian rhythm lighting, gradual dimming, sunrise simulation, and customisable mood lighting scenes." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "How does the headboard integration work?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "The smart wall seamlessly integrates with your headboard, featuring built-in touch controls, wireless charging zones, USB ports, reading lights, and hidden cable management for a clean, sophisticated appearance." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Are smart bedroom walls suitable for couples?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. Dual-zone control allows each partner to have independent lighting, temperature, and audio settings. The system can manage different sleep schedules and preferences simultaneously." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What warranty is provided for bedroom wall installations?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "We provide a comprehensive 5-year warranty covering all smart components, LED systems, climate control, and installation workmanship. This includes free maintenance visits and software updates." 
          } 
        } 
      ] 
    }; 

    // Insert or update JSON-LD scripts 
    const insertJsonLd = (schema: any, id: string) => { 
      let script = document.getElementById(id) as HTMLScriptElement; 
      if (!script) { 
        script = document.createElement('script'); 
        script.id = id; 
        script.type = 'application/ld+json'; 
        document.head.appendChild(script); 
      } 
      script.textContent = JSON.stringify(schema); 
    }; 

    insertJsonLd(serviceSchema, 'service-schema'); 
    insertJsonLd(faqSchema, 'faq-schema'); 

  }, [title, description, canonical, keywords, ogImage]); 

  return null; 
}; 

// Types 
interface Hotspot { 
  id: string; 
  x: number; 
  y: number; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  features: string[]; 
} 

interface BedSize { 
  id: string; 
  name: string; 
  dimensions: string; 
  description: string; 
  price: string; 
} 

interface ControlMethod { 
  id: string; 
  name: string; 
  icon: React.ReactNode; 
  description: string; 
  features: string[]; 
} 

const SmartBedroomWall: React.FC = () => { 
  const [selectedBedSize, setSelectedBedSize] = useState<string>('king'); 
  const [selectedControl, setSelectedControl] = useState<string>('panel'); 
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null); 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 
  const [isHelpMode, setIsHelpMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null); 

  // Bed size configurations 
  const bedSizes: BedSize[] = [ 
    { 
      id: 'double', 
      name: 'Double', 
      dimensions: '135cm × 190cm', 
      description: 'Perfect for smaller bedrooms and guest rooms', 
      price: 'From £2,500' 
    }, 
    { 
      id: 'king', 
      name: 'King', 
      dimensions: '150cm × 200cm', 
      description: 'Most popular choice for master bedrooms', 
      price: 'From £3,200' 
    }, 
    { 
      id: 'super-king', 
      name: 'Super King', 
      dimensions: '180cm × 200cm', 
      description: 'Ultimate luxury for spacious bedrooms', 
      price: 'From £4,100' 
    } 
  ]; 

  // Control method configurations 
  const controlMethods: ControlMethod[] = [ 
    { 
      id: 'panel', 
      name: 'Touch Panel Control', 
      icon: <Sun className="w-6 h-6" />, 
      description: 'Elegant bedside touch panels with intuitive controls', 
      features: ['Bedside touch panels', 'Gesture controls', 'Haptic feedback', 'Night mode display'] 
    }, 
    { 
      id: 'phone', 
      name: 'Smartphone App', 
      icon: <Smartphone className="w-6 h-6" />, 
      description: 'Complete control through your smartphone or tablet', 
      features: ['iOS & Android apps', 'Remote access', 'Sleep tracking', 'Scheduling features'] 
    } 
  ]; 

  // Headboard-centric hotspots - Updated positions for better accuracy
  const hotspots: Hotspot[] = [ 
    { 
      id: 'headboard-lighting', 
      x: 50, 
      y: 30, 
      title: 'Integrated Headboard Lighting', 
      description: 'Sophisticated LED lighting built into the headboard design', 
      icon: <Lightbulb className="w-5 h-5" />, 
      features: ['Circadian rhythm sync', 'Reading light zones', 'Mood lighting', 'Sunrise simulation'] 
    }, 
    { 
      id: 'climate-control', 
      x: 25, 
      y: 45, 
      title: 'Smart Climate Control', 
      description: 'Intelligent temperature and humidity management', 
      icon: <Thermometer className="w-5 h-5" />, 
      features: ['Dual-zone temperature', 'Humidity control', 'Air purification', 'Sleep optimisation'] 
    }, 
    { 
      id: 'audio-system', 
      x: 75, 
      y: 45, 
      title: 'Ambient Audio System', 
      description: 'Discreet speakers for relaxation and wake-up sounds', 
      icon: <Volume2 className="w-5 h-5" />, 
      features: ['White noise generation', 'Nature sounds', 'Music streaming', 'Voice control'] 
    }, 
    { 
      id: 'smart-controls', 
      x: 40, 
      y: 60, 
      title: 'Bedside Smart Controls', 
      description: 'Touch-sensitive control panels integrated into the headboard', 
      icon: <Settings className="w-5 h-5" />, 
      features: ['Touch controls', 'Wireless charging', 'USB ports', 'Scene presets'] 
    }, 
    { 
      id: 'sleep-sensors', 
      x: 60, 
      y: 60, 
      title: 'Sleep Monitoring', 
      description: 'Advanced sensors for sleep quality tracking', 
      icon: <Moon className="w-5 h-5" />, 
      features: ['Sleep pattern analysis', 'Environmental monitoring', 'Health insights', 'Smart alarms'] 
    } 
  ]; 

  // FAQ Data 
  const faqData = [ 
    { 
      question: "How do smart bedroom walls improve sleep quality?", 
      answer: "Smart bedroom walls optimise sleep through automated lighting that follows your natural circadian rhythms, precise temperature control for ideal sleeping conditions, integrated noise reduction features, and gradual wake-up lighting that mimics natural sunrise. The system learns your sleep patterns and automatically adjusts the environment throughout the night." 
    }, 
    { 
      question: "What bed sizes work with smart bedroom walls?", 
      answer: "Our smart bedroom walls accommodate all standard UK bed sizes including Double (135cm), King (150cm), and Super King (180cm). Each installation is custom-designed to perfectly complement your bed size and room dimensions, ensuring optimal functionality and aesthetic appeal." 
    }, 
    { 
      question: "Can I control my smart bedroom wall with my phone?", 
      answer: "Yes, our comprehensive smartphone app provides complete control over lighting, temperature, audio, and sleep modes. The app includes advanced scheduling features, voice control integration, sleep tracking analytics, and the ability to control your bedroom remotely." 
    }, 
    { 
      question: "Do smart bedroom walls include climate control?", 
      answer: "Yes, integrated climate control maintains optimal bedroom temperature and humidity levels throughout the night. The system learns your preferences and automatically adjusts based on sleep stages, weather conditions, and personal comfort settings for enhanced sleep quality." 
    }, 
    { 
      question: "What lighting options are available for bedroom walls?", 
      answer: "LED lighting includes warm white for relaxation, cool white for reading, full RGB colour options, circadian rhythm lighting that adjusts throughout the day, gradual dimming features, sunrise simulation for natural wake-up, and customisable mood lighting scenes for any occasion." 
    }, 
    { 
      question: "How does the headboard integration work?", 
      answer: "The smart wall seamlessly integrates with your headboard, featuring built-in touch controls, wireless charging zones, USB ports for device charging, adjustable reading lights, and completely hidden cable management for a clean, sophisticated appearance that enhances your bedroom's aesthetic." 
    }, 
    { 
      question: "Are smart bedroom walls suitable for couples?", 
      answer: "Absolutely. Dual-zone control allows each partner to have completely independent lighting, temperature, and audio settings. The system can manage different sleep schedules and preferences simultaneously, ensuring both partners enjoy optimal comfort without compromise." 
    }, 
    { 
      question: "What warranty is provided for bedroom wall installations?", 
      answer: "We provide a comprehensive 5-year warranty covering all smart components, LED lighting systems, climate control units, and installation workmanship. This includes free maintenance visits, software updates, and technical support to ensure your system continues performing optimally." 
    } 
  ]; 

  // Related searches data 
  const relatedSearches = [ 
    "smart bedroom design UK", "intelligent bedroom lighting", "bedroom climate control", "smart headboard systems", 
    "bedroom automation", "sleep optimisation technology", "smart bedroom installation", "bedroom LED lighting", 
    "intelligent sleep systems", "bedroom smart home", "automated bedroom controls", "luxury bedroom technology" 
  ]; 

  // Get current bed size details 
  const currentBedSize = bedSizes.find(size => size.id === selectedBedSize) || bedSizes[1]; 
  const currentControl = controlMethods.find(method => method.id === selectedControl) || controlMethods[0]; 

  // Helper function to toggle help mode
  const toggleHelpMode = () => {
    setIsHelpMode(!isHelpMode);
    if (!isHelpMode) {
      setTimeout(() => setIsHelpMode(false), 10000);
    }
  };

  // Helper function to toggle auto-play hotspots
  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Effect for auto-playing hotspots
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && hotspots.length > 0) {
      let index = 0;
      setActiveHotspot(hotspots[0].id);
      
      interval = setInterval(() => {
        index = (index + 1) % hotspots.length;
        setActiveHotspot(hotspots[index].id);
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return ( 
    <> 
      <SEOHead 
        title="Smart Bedroom Wall Installation | Intelligent Sleep Technology | The Wall Shop" 
        description="Transform your bedroom with intelligent smart wall systems featuring circadian lighting, climate control, and sleep optimisation. Professional installation across the UK with 5-year warranty." 
        canonical="https://www.thewallshop.co.uk/smart-bedroom-wall" 
        keywords="smart bedroom wall, intelligent bedroom lighting, bedroom climate control, smart headboard, sleep optimisation, bedroom automation, circadian lighting, smart bedroom UK" 
        ogImage="https://www.thewallshop.co.uk/images/smart-bedroom-wall.webp" 
      /> 

      <div className="min-h-screen bg-gradient-to-br from-clay-900 via-taupe-900 to-mocha-900"> 
        {/* Navigation */} 
        
       <div className="sticky top-0 z-50 bg-white shadow overflow-visible">
  <Navigation />
</div>

       {/* Enhanced Hero Section */} 
<section className="relative min-h-screen flex flex-col justify-start md:justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 md:pt-0">

  {/* Enhanced Background Pattern */} 
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-r from-clay-500/15 to-taupe-500/15"></div> 
    <div className="absolute inset-0" style={{ 
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(172, 137, 104, 0.15) 0%, transparent 50%), 
                       radial-gradient(circle at 75% 75%, rgba(166, 144, 128, 0.15) 0%, transparent 50%)` 
    }}></div> 
    
    {/* Floating Elements */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full opacity-20"
        style={{
          width: `${Math.random() * 100 + 50}px`,
          height: `${Math.random() * 100 + 50}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, rgba(172, 137, 104, 0.3) 0%, transparent 70%)`
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, Math.random() * 20 - 10, 0],
          rotate: [0, Math.random() * 10 - 5, 0]
        }}
        transition={{
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> 
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      className="space-y-8" 
    > 
      {/* Enhanced Badge */} 
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-clay-500/30 to-taupe-500/30 backdrop-blur-md border border-clay-500/40 rounded-full px-6 py-3 shadow-lg"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      > 
        <Heart className="w-5 h-5 text-clay-300" /> 
        <span className="text-clay-100 font-medium">Wellness & Sleep Technology</span> 
      </motion.div> 

      {/* Enhanced Main Heading */} 
      <div className="space-y-6"> 
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        > 
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400 pb-2">Smart Bedroom</span> 
          <span className="block text-clay-50 mt-2 drop-shadow">Sanctuary</span> 
        </motion.h1> 
        <motion.p 
          className="text-xl md:text-2xl text-clay-200 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        > 
          Transform your bedroom into an intelligent sanctuary with circadian lighting,  
          climate control, and sleep optimisation technology designed for ultimate rest and rejuvenation. 
        </motion.p> 
      </div> 

      {/* Enhanced Stats */} 
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.4 }} 
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto" 
      > 
        {[ 
          { icon: <Moon className="w-8 h-8" />, value: "92%", label: "Better Sleep Quality" }, 
          { icon: <Star className="w-8 h-8" />, value: "4.9/5", label: "Customer Rating" }, 
          { icon: <Shield className="w-8 h-8" />, value: "5 Year", label: "Warranty" }, 
          { icon: <Sunrise className="w-8 h-8" />, value: "24/7", label: "Smart Control" } 
        ].map((stat, index) => ( 
          <motion.div 
            key={index} 
            className="text-center p-4 rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-clay-500/20 hover:border-clay-500/40 transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          > 
            <div className="w-16 h-16 bg-gradient-to-r from-clay-500/30 to-taupe-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-clay-500/40"> 
              <div className="text-clay-300">{stat.icon}</div> 
            </div> 
            <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div> 
            <div className="text-clay-300 text-sm mt-1">{stat.label}</div> 
          </motion.div> 
        ))} 
      </motion.div> 

      {/* Enhanced CTA Buttons */} 
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.6 }} 
        className="flex flex-col sm:flex-row gap-4 justify-center pt-8" 
      > 
        <motion.button 
          onClick={() => setIsQuoteModalOpen(true)} 
          className="px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2 group relative overflow-hidden bg-gradient-to-r from-clay-600 to-taupe-700 text-white shadow-lg hover:from-clay-700 hover:to-taupe-800 transition-all duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        > 
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer"></span>
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" /> 
          <span className="z-10">Get Free Sleep Consultation</span> 
        </motion.button> 
        <motion.a 
          href="tel:+441417393377" 
          className="border-2 border-clay-500/50 text-clay-200 px-8 py-4 rounded-2xl hover:bg-clay-500/10 hover:border-clay-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        > 
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
          <span>Call: +44 141 739 3377</span> 
        </motion.a> 
      </motion.div> 
    </motion.div> 
  </div> 


  <style>{`
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `}</style>
</section> 

        {/* Enhanced Bed Size Configuration Section */} 
<section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden"> 
  {/* Background Elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-gradient-to-r from-clay-500/15 to-taupe-500/15"></div> 
    <div className="absolute inset-0" style={{ 
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(172, 137, 104, 0.15) 0%, transparent 50%), 
                       radial-gradient(circle at 75% 75%, rgba(166, 144, 128, 0.15) 0%, transparent 50%)` 
    }}></div> 
  </div>

  {/* Floating Elements */}
  <div className="absolute inset-0 opacity-30">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${Math.random() * 80 + 40}px`,
          height: `${Math.random() * 80 + 40}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, rgba(172, 137, 104, 0.2) 0%, transparent 70%)`
        }}
        animate={{
          y: [0, -15, 0],
          x: [0, Math.random() * 15 - 7.5, 0],
          rotate: [0, Math.random() * 8 - 4, 0]
        }}
        transition={{
          duration: Math.random() * 12 + 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>

  <div className="max-w-7xl mx-auto relative z-10"> 
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ duration: 0.8 }} 
      className="text-center mb-16" 
    > 
      {/* Enhanced Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-clay-500/20 to-taupe-500/20 backdrop-blur-sm border border-clay-500/30 rounded-full px-5 py-1.5 mb-4"
      >
        <Ruler className="w-4 h-4 text-clay-400" />
        <span className="text-clay-200 font-medium text-sm">Custom Sizing</span>
      </motion.div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Choose Your</span> 
        <span className="block text-clay-50 mt-2">Bed Size Configuration</span> 
      </h2> 
      <p className="text-xl text-clay-200 max-w-3xl mx-auto leading-relaxed"> 
        Our smart bedroom walls are custom-designed to perfectly complement your bed size and room dimensions,  
        ensuring optimal functionality and aesthetic appeal. 
      </p> 
      <motion.div 
        className="mt-4 flex items-center justify-center text-clay-300 text-sm bg-clay-500/10 backdrop-blur-sm rounded-full px-4 py-2 inline-flex"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Info className="w-4 h-4 mr-2" />
        <span>Select your bed size to see custom options</span>
      </motion.div>
    </motion.div> 

    <div className="grid md:grid-cols-3 gap-6 mb-12"> 
      {bedSizes.map((bedSize, index) => ( 
        <motion.button 
          key={bedSize.id} 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: index * 0.1 }} 
          onClick={() => setSelectedBedSize(bedSize.id)} 
          className={`group p-8 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${ 
            selectedBedSize === bedSize.id 
              ? 'bg-gradient-to-b from-clay-600/30 to-taupe-600/20 border-clay-500/60 shadow-2xl shadow-clay-500/20' 
              : 'bg-gray-800/50 border-gray-700/50 hover:border-clay-500/50 hover:bg-gray-700/50' 
          }`} 
          whileHover={{ y: -5 }}
        > 
          {/* Selection glow effect */}
          {selectedBedSize === bedSize.id && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-clay-500/10 to-taupe-500/10 animate-pulse"></div>
          )}
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6"> 
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${ 
                selectedBedSize === bedSize.id 
                  ? 'bg-clay-500 text-white' 
                  : 'bg-gray-700/50 text-clay-400 group-hover:bg-clay-500/20 group-hover:text-clay-300' 
              }`}> 
                <Bed className="w-6 h-6" /> 
              </div> 
              {selectedBedSize === bedSize.id && ( 
                <div className="w-7 h-7 bg-gradient-to-r from-clay-500 to-taupe-500 rounded-full flex items-center justify-center shadow-lg"> 
                  <CheckCircle className="w-4 h-4 text-white" /> 
                </div> 
              )} 
            </div> 
            
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-clay-200 transition-colors"> 
              {bedSize.name} 
            </h3> 
            <p className="text-clay-300 text-lg mb-3 font-medium">{bedSize.dimensions}</p> 
            <p className="text-clay-400 mb-4 leading-relaxed">{bedSize.description}</p>
            
            {/* Feature indicators */}
            <div className="flex space-x-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedBedSize === bedSize.id 
                    ? 'bg-clay-400' 
                    : 'bg-gray-600 group-hover:bg-clay-500/60'
                }`}></div>
              ))}
            </div>
          </div>
        </motion.button> 
      ))} 
    </div> 

    {/* Enhanced Current Selection Display */} 
    <motion.div 
      key={selectedBedSize} 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5, type: "spring" }} 
      className="bg-gradient-to-r from-clay-500/15 to-taupe-500/15 backdrop-blur-sm rounded-2xl p-8 border border-clay-500/40 text-center relative overflow-hidden shadow-xl"
    > 
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-4"> 
          {currentBedSize.name} Size Configuration 
        </h3> 
        <p className="text-clay-200 text-lg max-w-2xl mx-auto leading-relaxed"> 
          Optimised smart wall design for {currentBedSize.dimensions} beds with enhanced features  
          and premium integration options tailored to your space. 
        </p> 
        
        {/* Action buttons */}
        <motion.div 
          className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <button className="px-6 py-3 bg-gradient-to-r from-clay-600 to-taupe-600 text-white rounded-full font-medium hover:from-clay-700 hover:to-taupe-700 transition-all duration-300 flex items-center justify-center space-x-2">
            <Ruler className="w-4 h-4" />
            <span>Customize This Size</span>
          </button>
          <button className="px-6 py-3 border border-clay-500/40 text-clay-300 rounded-full font-medium hover:bg-clay-500/10 transition-all duration-300 flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Spec Sheet</span>
          </button>
        </motion.div>
      </div>
    </motion.div> 
  </div> 

  <style>{`
    @keyframes shine {
      0% { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(200%) skewX(-15deg); }
    }
    .animate-shine {
      animation: shine 4s infinite;
    }
  `}</style>
</section> 

         <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-taupe-900 to-mocha-900">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-clay-300 via-clay-100 to-taupe-200 bg-clip-text text-transparent">Explore Smart</span>
        <span className="block text-clay-50 mt-2">Bedroom Features</span>
      </h2>
      <p className="text-xl text-clay-200 max-w-3xl mx-auto leading-relaxed">
        Discover the intelligent features integrated into your headboard and bedroom wall system
        that work together to create the perfect sleep environment.
      </p>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex items-center justify-center text-clay-300 text-sm bg-clay-800/20 backdrop-blur-sm rounded-full py-2 px-4 w-fit mx-auto border border-clay-700/30"
      >
        <Info className="w-4 h-4 mr-2" />
        <span>Click on the markers to explore each feature</span>
      </motion.div>
    </motion.div>

   {/* Interactive Image */}
<div className="relative max-w-6xl mx-auto">
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    ref={imageRef}
    className="relative rounded-3xl overflow-hidden border border-white/10 
               bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] 
               backdrop-saturate-150 shadow-2xl"
  >
    <img
      src="/images/bedroom-smart-wall-hero.webp"
      alt="Smart Bedroom Wall with integrated headboard features and controls"
      className="w-full h-auto select-none pointer-events-none"
      draggable={false}
    />

    {/* Controls */}
    <div className="absolute top-4 right-4 z-20 flex gap-3">
      <button
        onClick={toggleHelpMode}
        className={`relative p-2 rounded-2xl border border-white/25 
                    backdrop-blur-xl transition-all shadow-md
                    ${isHelpMode ? 'bg-white/30' : 'bg-white/15 hover:bg-white/25'}`}
        aria-label="Toggle help mode"
      >
        <HelpCircle className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={toggleAutoPlay}
        className={`relative p-2 rounded-2xl border border-white/25 
                    backdrop-blur-xl transition-all shadow-md
                    ${isPlaying ? 'bg-white/30' : 'bg-white/15 hover:bg-white/25'}`}
        aria-label={isPlaying ? "Pause auto tour" : "Start auto tour"}
      >
        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
      </button>
    </div>

    {/* Help Overlay */}
    {isHelpMode && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/75 flex items-center justify-center z-30 backdrop-blur-sm"
      >
        <div className="relative text-center p-8 max-w-md rounded-3xl border border-white/20
                        bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl shadow-2xl">
          <div className="mx-auto mb-5 w-16 h-16 rounded-2xl border border-white/25 bg-white/15 grid place-items-center">
            <HelpCircle className="w-8 h-8 text-white/90" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Interactive Guide</h3>
          <p className="text-clay-100/90 mb-6">
            Click on the glowing markers to discover the smart features of our bedroom wall system.
            Each marker reveals detailed information about that specific feature.
          </p>
          <button
            onClick={() => setIsHelpMode(false)}
            className="px-6 py-3 rounded-2xl border border-white/25 
                       bg-white/15 hover:bg-white/25 text-white transition-all"
          >
            Got It
          </button>
        </div>
      </motion.div>
    )}

    {/* Hotspots */}
    <AnimatePresence> 
      {hotspots.map((hotspot, index) => ( 
        <motion.button 
          key={hotspot.id} 
          initial={{ scale: 0.6, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.6, opacity: 0 }} 
          transition={{ duration: 0.25, delay: index * 0.08 }} 
          onClick={() => {
            setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id);
            setIsPlaying(false);
          }}
          className={`absolute w-14 h-14 rounded-full grid place-items-center transition-all duration-300 
                      border border-white/30 backdrop-blur-xl 
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_25px_-8px_rgba(0,0,0,0.6)]
                      ${activeHotspot === hotspot.id 
                        ? 'bg-white/40 ring-4 ring-white/25' 
                        : 'bg-white/20 hover:bg-white/30 ring-2 ring-white/10 hover:ring-white/20'}`} 
          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }} 
          aria-label={`View details about ${hotspot.title}`} 
        > 
          <div className="text-white">{hotspot.icon}</div>
          {activeHotspot === hotspot.id && (
            <span className="absolute inset-0 rounded-full ring-2 ring-white/40 animate-ping"></span>
          )}
          {isHelpMode && (
            <motion.div 
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs 
                         text-white bg-black/60 backdrop-blur-md rounded-full border border-white/20 whitespace-nowrap"
            >
              {hotspot.title}
            </motion.div>
          )}
        </motion.button> 
      ))} 
    </AnimatePresence> 

    {/* Hotspot Details */}
    <AnimatePresence> 
      {activeHotspot && ( 
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, y: 20, scale: 0.95 }} 
          transition={{ duration: 0.25 }} 
          className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl border border-white/20 
                     bg-gradient-to-br from-white/12 to-white/6 backdrop-blur-2xl shadow-xl" 
        > 
          {(() => { 
            const hotspot = hotspots.find(h => h.id === activeHotspot); 
            if (!hotspot) return null; 
            return ( 
              <div className="space-y-4"> 
                <div className="flex items-start justify-between"> 
                  <div className="flex items-center gap-4"> 
                    <div className="w-12 h-12 grid place-items-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur-xl"> 
                      {hotspot.icon} 
                    </div> 
                    <div> 
                      <h3 className="text-xl font-bold text-white">{hotspot.title}</h3> 
                      <p className="text-clay-100/90">{hotspot.description}</p> 
                    </div> 
                  </div> 
                  <button 
                    onClick={() => setActiveHotspot(null)} 
                    className="w-8 h-8 grid place-items-center rounded-full border border-white/25 bg-white/15 text-white/70 hover:text-white backdrop-blur-xl" 
                    aria-label="Close details" 
                  > 
                    <X className="w-4 h-4" /> 
                  </button> 
                </div> 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> 
                  {hotspot.features.map((feature, index) => ( 
                    <div key={index} className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg"> 
                      <CheckCircle className="w-4 h-4 text-clay-200" /> 
                      <span className="text-sm text-white/90">{feature}</span> 
                    </div> 
                  ))} 
                </div> 
              </div> 
            ); 
          })()} 
        </motion.div> 
      )} 
    </AnimatePresence> 
  </motion.div>

  {/* Navigation Dots */}
  <div className="flex justify-center mt-8 gap-2">
    {hotspots.map((hotspot) => (
      <button
        key={hotspot.id}
        onClick={() => {
          setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id);
          setIsPlaying(false);
        }}
        className={`w-3 h-3 rounded-full border border-white/25 backdrop-blur-md transition-all
                    ${activeHotspot === hotspot.id ? 'bg-white scale-125' : 'bg-white/30'}`}
        aria-label={`Show ${hotspot.title}`}
      />
    ))}
  </div>
</div>
  </div> 
</section>

        {/* Control Methods Section */} 
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mocha-900 to-clay-900"> 
          <div className="max-w-7xl mx-auto"> 
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              className="text-center mb-16" 
            > 
              <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
                <span className="gradient-text-luxury">Choose Your</span> 
                <span className="block text-clay-100">Control Method</span> 
              </h2> 
              <p className="text-xl text-clay-300 max-w-3xl mx-auto"> 
                Control your smart bedroom wall through elegant touch panels or comprehensive smartphone apps,  
                both designed for intuitive operation and seamless integration. 
              </p> 
              <div className="mt-4 flex items-center justify-center text-clay-400 text-sm">
                <Info className="w-4 h-4 mr-2" />
                <span>Select your preferred control method</span>
              </div>
            </motion.div> 

            <div className="grid md:grid-cols-2 gap-8 mb-12"> 
              {controlMethods.map((method, index) => ( 
                <motion.button 
                  key={method.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6, delay: index * 0.2 }} 
                  onClick={() => setSelectedControl(method.id)} 
                  className={`group p-8 rounded-2xl border transition-all duration-300 text-left hover:transform hover:scale-105 ${ 
                    selectedControl === method.id 
                      ? 'bg-gradient-to-r from-clay-500/20 to-taupe-500/20 border-clay-500 shadow-lg shadow-clay-500/20' 
                      : 'bg-taupe-800/50 border-taupe-700/50 hover:border-clay-600/50 hover:bg-taupe-700/50' 
                  }`} 
                > 
                  <div className="flex items-center space-x-4 mb-6"> 
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${ 
                      selectedControl === method.id  
                        ? 'bg-gradient-to-r from-clay-500 to-taupe-500'  
                        : 'bg-taupe-700 group-hover:bg-clay-600' 
                    }`}> 
                      <div className="text-white">{method.icon}</div> 
                    </div> 
                    <div className="flex-1"> 
                      <h3 className="text-2xl font-bold text-white group-hover:text-clay-200 transition-colors"> 
                        {method.name} 
                      </h3> 
                      <p className="text-clay-300">{method.description}</p> 
                    </div> 
                    {selectedControl === method.id && ( 
                      <div className="w-6 h-6 bg-clay-500 rounded-full flex items-center justify-center"> 
                        <CheckCircle className="w-4 h-4 text-white" /> 
                      </div> 
                    )} 
                  </div> 
                  
                  <div className="space-y-3"> 
                    {method.features.map((feature, index) => ( 
                      <div key={index} className="flex items-center space-x-3"> 
                        <CheckCircle className="w-4 h-4 text-clay-400 flex-shrink-0" /> 
                        <span className="text-clay-300">{feature}</span> 
                      </div> 
                    ))} 
                  </div> 
                </motion.button> 
              ))} 
            </div> 

            {/* Current Control Method Display */} 
            <motion.div 
              key={selectedControl} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.3 }} 
              className="bg-gradient-to-r from-clay-500/10 to-taupe-500/10 backdrop-blur-sm rounded-2xl p-8 border border-clay-500/30 text-center" 
            > 
              <div className="flex items-center justify-center space-x-4 mb-4"> 
                <div className="w-12 h-12 bg-gradient-to-r from-clay-500 to-taupe-500 rounded-xl flex items-center justify-center"> 
                  {currentControl.icon} 
                </div> 
                <h3 className="text-3xl font-bold text-white">{currentControl.name}</h3> 
              </div> 
              <p className="text-clay-300 text-lg max-w-2xl mx-auto"> 
                {currentControl.description} - Experience seamless control with advanced features  
                designed for your comfort and convenience. 
              </p> 
            </motion.div> 
          </div> 
        </section> 

        {/* Features Grid */} 
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-clay-900 to-taupe-900"> 
          <div className="max-w-7xl mx-auto"> 
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              className="text-center mb-16" 
            > 
              <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
                <span className="gradient-text-luxury">Why Choose</span> 
                <span className="block text-clay-100">Smart Bedroom Walls?</span> 
              </h2> 
              <p className="text-xl text-clay-300 max-w-4xl mx-auto"> 
                Experience the perfect blend of luxury design, intelligent automation, and wellness technology  
                that transforms your bedroom into a personal sanctuary optimised for rest and rejuvenation. 
              </p> 
            </motion.div> 

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> 
              {[ 
                { 
                  icon: <Sunrise className="w-8 h-8" />, 
                  title: "Circadian Rhythm Lighting", 
                  description: "Intelligent lighting that automatically adjusts colour temperature throughout the day to support your natural sleep-wake cycle.", 
                  gradient: "from-clay-500 to-taupe-500" 
                }, 
                { 
                  icon: <Thermometer className="w-8 h-8" />, 
                  title: "Climate Optimisation", 
                  description: "Precise temperature and humidity control that maintains ideal sleeping conditions and adapts to seasonal changes.", 
                  gradient: "from-taupe-500 to-clay-600" 
                }, 
                { 
                  icon: <CloudMoon className="w-8 h-8" />, 
                  title: "Sleep Quality Monitoring", 
                  description: "Advanced sensors track sleep patterns, environmental conditions, and provide insights to improve your rest quality.", 
                  gradient: "from-clay-600 to-taupe-400" 
                }, 
                { 
                  icon: <Waves className="w-8 h-8" />, 
                  title: "Ambient Sound Control", 
                  description: "Integrated audio system with white noise, nature sounds, and music streaming for relaxation and better sleep.", 
                  gradient: "from-taupe-400 to-clay-500" 
                }, 
                { 
                  icon: <Wifi className="w-8 h-8" />, 
                  title: "Smart Home Integration", 
                  description: "Seamless connectivity with Alexa, Google Assistant, and Apple HomeKit for voice control and automation.", 
                  gradient: "from-clay-500 to-taupe-600" 
                }, 
                { 
                  icon: <Shield className="w-8 h-8" />, 
                  title: "5-Year Warranty", 
                  description: "Comprehensive warranty covering all smart components, installation, and ongoing maintenance for complete peace of mind.", 
                  gradient: "from-taupe-600 to-clay-400" 
                } 
              ].map((feature, index) => ( 
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6, delay: index * 0.1 }} 
                  className="group bg-taupe-800/50 backdrop-blur-sm rounded-2xl p-8 border border-clay-500/20 hover:border-clay-400/40 transition-all duration-300 hover:transform hover:scale-105" 
                > 
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}> 
                    <div className="text-white">{feature.icon}</div> 
                  </div> 
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-clay-200 transition-colors"> 
                    {feature.title} 
                  </h3> 
                  <p className="text-clay-300 leading-relaxed">{feature.description}</p> 
                </motion.div> 
              ))} 
            </div> 
          </div> 
        </section> 

        {/* FAQ Section */} 
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-taupe-900 to-mocha-900"> 
          <div className="max-w-4xl mx-auto"> 
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              className="text-center mb-16" 
            > 
              <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
                <span className="gradient-text-luxury">Frequently Asked</span> 
                <span className="block text-clay-100">Questions</span> 
              </h2> 
              <p className="text-xl text-clay-300"> 
                Everything you need to know about smart bedroom wall installation and sleep technology 
              </p> 
            </motion.div> 

            <div className="space-y-4"> 
              {faqData.map((faq, index) => ( 
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6, delay: index * 0.1 }} 
                  className="bg-taupe-800/50 backdrop-blur-sm rounded-2xl border border-clay-500/20 overflow-hidden hover:border-clay-400/40 transition-all duration-300" 
                > 
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} 
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-taupe-700/30 transition-colors" 
                  > 
                    <span className="text-lg font-semibold text-white pr-4">{faq.question}</span> 
                    <ChevronDown 
                      className={`w-6 h-6 text-clay-400 transition-transform duration-300 ${ 
                        expandedFaq === index ? 'rotate-180' : '' 
                      }`} 
                    /> 
                  </button> 
                  <AnimatePresence> 
                    {expandedFaq === index && ( 
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        transition={{ duration: 0.3 }} 
                        className="overflow-hidden" 
                      > 
                        <div className="px-8 pb-6"> 
                          <p className="text-clay-300 leading-relaxed">{faq.answer}</p> 
                        </div> 
                      </motion.div> 
                    )} 
                  </AnimatePresence> 
                </motion.div> 
              ))} 
            </div> 
          </div> 
        </section> 

        {/* Related Searches */} 
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-mocha-900"> 
          <div className="max-w-5xl mx-auto"> 
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              className="text-center mb-12" 
            > 
              <h2 className="text-3xl font-bold text-white mb-4">Related Searches</h2> 
              <p className="text-clay-300">Popular bedroom automation and sleep technology searches</p> 
            </motion.div> 

            <div className="flex flex-wrap gap-3 justify-center"> 
              {relatedSearches.map((search, index) => ( 
                <motion.span 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: index * 0.05 }} 
                  className="bg-taupe-800/50 border border-clay-500/20 rounded-full px-6 py-3 text-sm text-clay-300 hover:border-clay-400/40 hover:text-white hover:bg-taupe-700/50 transition-all duration-300 cursor-pointer" 
                > 
                  {search} 
                </motion.span> 
              ))} 
            </div> 
          </div> 
        </section> 

        {/* CTA Section */} 
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-mocha-900 via-clay-800 to-mocha-900"> 
          <div className="max-w-5xl mx-auto"> 
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              className="bg-gradient-to-r from-clay-500/10 to-taupe-500/10 backdrop-blur-sm rounded-3xl p-12 border border-clay-500/30 text-center relative overflow-hidden" 
            > 
              {/* Background Pattern */} 
              <div className="absolute inset-0 opacity-10"> 
                <div className="absolute inset-0" style={{ 
                  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(172, 137, 104, 0.3) 0%, transparent 50%), 
                                   radial-gradient(circle at 80% 80%, rgba(166, 144, 128, 0.3) 0%, transparent 50%)` 
                }}></div> 
              </div> 

              <div className="relative z-10"> 
                <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
                  <span className="gradient-text-luxury">Ready to Transform</span> 
                  <span className="block text-clay-100">Your Sleep Experience?</span> 
                </h2> 
                <p className="text-xl text-clay-300 mb-10 max-w-3xl mx-auto"> 
                  Join hundreds of satisfied customers who've transformed their bedrooms into intelligent sanctuaries.  
                  Get your free sleep consultation and custom quote today. 
                </p> 
                <div className="flex flex-col sm:flex-row gap-6 justify-center"> 
                  <button 
                    onClick={() => setIsQuoteModalOpen(true)} 
                    className="btn-luxury-earthy px-10 py-5 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-3 group" 
                  > 
                    <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                    <span>Get Free Sleep Consultation</span> 
                  </button> 
                  <a 
                    href="tel:+441417393377" 
                    className="border-2 border-clay-500/50 text-clay-200 px-10 py-5 rounded-2xl hover:bg-clay-500/10 hover:border-clay-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3 group" 
                  > 
                    <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                    <span>Call: +44 141 739 3377</span> 
                  </a> 
                </div> 
              </div> 
            </motion.div> 
          </div> 
        </section> 

        {/* Footer */} 
        <Footer /> 

        {/* Quote Modal */} 
        <AnimatePresence> 
          {isQuoteModalOpen && ( 
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
              onClick={() => setIsQuoteModalOpen(false)} 
            > 
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }} 
                className="bg-mocha-900 rounded-3xl p-8 max-w-md w-full border border-clay-500/30 shadow-2xl" 
                onClick={(e) => e.stopPropagation()} 
              > 
                <div className="text-center mb-6"> 
                  <div className="w-16 h-16 bg-gradient-to-r from-clay-500 to-taupe-500 rounded-2xl flex items-center justify-center mx-auto mb-4"> 
                    <Heart className="w-8 h-8 text-white" /> 
                  </div> 
                  <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Sleep Consultation</h3> 
                  <p className="text-clay-300">Ready to transform your bedroom into a wellness sanctuary? Let's discuss your vision.</p> 
                </div> 

                <div className="space-y-4"> 
                  <a 
                    href="tel:+441417393377" 
                    className="w-full btn-luxury-earthy py-4 rounded-xl flex items-center justify-center space-x-3 group" 
                  > 
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                    <span>Call Now: +44 141 739 3377</span> 
                  </a> 
                  
                  <a 
                    href="mailto:info@thewallshop.co.uk?subject=Smart Bedroom Wall Consultation" 
                    className="w-full border-2 border-clay-500/50 text-clay-200 py-4 rounded-xl hover:bg-clay-500/10 hover:border-clay-400 transition-all duration-300 flex items-center justify-center space-x-3 group" 
                  > 
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                    <span>Email Us</span> 
                  </a> 
                </div> 

                <button 
                  onClick={() => setIsQuoteModalOpen(false)} 
                  className="absolute top-4 right-4 text-clay-400 hover:text-white transition-colors p-2" 
                > 
                  <X className="w-5 h-5" /> 
                </button> 
              </motion.div> 
            </motion.div> 
          )} 
        </AnimatePresence> 
      </div> 
    </> 
  ); 
}; 

export default SmartBedroomWall;