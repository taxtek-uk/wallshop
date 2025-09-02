import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Monitor,
  Gamepad2,
  Volume2,
  Lightbulb,
  Wifi,
  Settings,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Star,
  Shield,
  Zap,
  Home,
  Users,
  Trophy,
  Target,
  Headphones,
  ArrowUpRight,
  HelpCircle,
  MousePointer,
  Speaker,
  Tv,
  Play,
  Pause,
  RotateCcw,
  Search,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  X,
  Sparkles,
  Cpu,
  HardDrive,
  Palette
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
      setMetaTag('og:image:alt', 'Smart Gaming Wall by The Wall Shop', true);
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
      "name": "Smart Gaming Wall Installation",
      "description": "Professional smart gaming wall installation with integrated lighting, audio, and gaming console storage. Transform your gaming space with intelligent automation.",
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
      "category": "Gaming Room Design",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "GBP",
        "description": "Custom smart gaming wall solutions starting from consultation to full installation"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What gaming consoles are compatible with smart gaming walls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our smart gaming walls support all major gaming consoles including PlayStation 5, Xbox Series X/S, Nintendo Switch, and PC gaming setups. Custom storage and cable management solutions are designed for each console type."
          }
        },
        {
          "@type": "Question",
          "name": "How does the LED lighting system work in gaming walls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The integrated LED lighting system features RGB colour-changing capabilities, sync with gameplay, ambient lighting modes, and smartphone app control. Lighting can be programmed for different gaming scenarios and times of day."
          }
        },
        {
          "@type": "Question",
          "name": "Can I control my smart gaming wall with voice commands?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our smart gaming walls integrate with Alexa, Google Assistant, and Apple HomeKit for voice control of lighting, audio, display settings, and gaming console power management."
          }
        },
        {
          "@type": "Question",
          "name": "What's included in a dual TV gaming wall setup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dual TV setups include two premium displays, independent audio zones, separate gaming console storage, advanced cable management, coordinated lighting effects, and multi-zone climate control for extended gaming sessions."
          }
        },
        {
          "@type": "Question",
          "name": "How long does smart gaming wall installation take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Installation typically takes 2-4 days depending on complexity. This includes wall preparation, smart system integration, cable management, testing, and user training on all smart features."
          }
        },
        {
          "@type": "Question",
          "name": "Do smart gaming walls work with streaming services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our smart gaming walls seamlessly integrate with Netflix, Amazon Prime, Disney+, Twitch, YouTube Gaming, and other streaming platforms with optimised audio and visual settings for each service."
          }
        },
        {
          "@type": "Question",
          "name": "What warranty comes with smart gaming wall installation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide a comprehensive 5-year warranty covering all smart components, LED lighting systems, and installation workmanship. Extended warranty options are available for premium installations."
          }
        },
        {
          "@type": "Question",
          "name": "Can existing gaming setups be upgraded to smart walls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we specialise in retrofitting existing gaming rooms with smart wall technology. We assess your current setup and integrate smart features while preserving your existing equipment where possible."
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

interface TabContent {
  id: string;
  label: string;
  hotspots: Hotspot[];
  description: string;
}

const SmartGamingWall: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'dual'>('single');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Hotspot configurations
  const tabContent: Record<'single' | 'dual', TabContent> = {
    single: {
      id: 'single',
      label: 'Single TV Setup',
      description: 'Perfect for focused gaming with premium audio and intelligent lighting',
      hotspots: [
        {
          id: 'display',
          x: 50,
          y: 35,
          title: 'Premium Gaming Display',
          description: 'Ultra-low latency 4K gaming monitor with HDR support',
          icon: <Monitor className="w-5 h-5" />,
          features: ['4K 120Hz display', 'HDR10+ support', 'Variable refresh rate', 'Ultra-low input lag']
        },
        {
          id: 'audio',
          x: 15,
          y: 45,
          title: 'Immersive Audio System',
          description: 'Spatial audio with gaming-optimised sound profiles',
          icon: <Volume2 className="w-5 h-5" />,
          features: ['7.1 surround sound', 'Gaming audio profiles', 'Voice chat clarity', 'Bass enhancement']
        },
        {
          id: 'lighting',
          x: 85,
          y: 25,
          title: 'Dynamic RGB Lighting',
          description: 'Responsive lighting that syncs with your gameplay',
          icon: <Lightbulb className="w-5 h-5" />,
          features: ['Gameplay sync', 'Colour customisation', 'Ambient modes', 'Voice control']
        },
        {
          id: 'storage',
          x: 50,
          y: 75,
          title: 'Console Storage Hub',
          description: 'Organised storage with integrated cooling and cable management',
          icon: <Gamepad2 className="w-5 h-5" />,
          features: ['Multiple console support', 'Active cooling', 'Cable management', 'Quick access design']
        }
      ]
    },
    dual: {
      id: 'dual',
      label: 'Dual TV Setup',
      description: 'Ultimate gaming experience with dual displays and advanced automation',
      hotspots: [
        {
          id: 'primary-display',
          x: 25,
          y: 35,
          title: 'Primary Gaming Display',
          description: 'Main 4K gaming display with competitive gaming features',
          icon: <Monitor className="w-5 h-5" />,
          features: ['4K 144Hz gaming', 'G-Sync/FreeSync', 'Tournament mode', 'Blue light filter']
        },
        {
          id: 'secondary-display',
          x: 75,
          y: 35,
          title: 'Secondary Display',
          description: 'Streaming, chat, or secondary gaming display',
          icon: <Tv className="w-5 h-5" />,
          features: ['1440p 120Hz', 'Stream monitoring', 'Chat display', 'Media playback']
        },
        {
          id: 'advanced-audio',
          x: 85,
          y: 55,
          title: 'Premium Audio Zone',
          description: 'Dual-zone audio with independent control',
          icon: <Speaker className="w-5 h-5" />,
          features: ['Dual audio zones', 'Independent volume', 'Noise cancellation', 'Stream audio mixing']
        },
        {
          id: 'smart-hub',
          x: 50,
          y: 75,
          title: 'Smart Gaming Hub',
          description: 'Central control for all gaming systems and automation',
          icon: <Settings className="w-5 h-5" />,
          features: ['Multi-console switching', 'Automated profiles', 'Climate control', 'Smart scheduling']
        }
      ]
    }
  };

  // FAQ Data
  const faqData = [
    {
      question: "What gaming consoles are compatible with smart gaming walls?",
      answer: "Our smart gaming walls support all major gaming consoles including PlayStation 5, Xbox Series X/S, Nintendo Switch, and PC gaming setups. We provide custom storage solutions and cable management designed specifically for each console type, ensuring optimal ventilation and easy access."
    },
    {
      question: "How does the LED lighting system work in gaming walls?",
      answer: "The integrated LED lighting system features RGB colour-changing capabilities that can sync with your gameplay for an immersive experience. Control lighting through smartphone apps, voice commands, or automated gaming profiles. Choose from ambient lighting modes, reactive gaming effects, or custom colour schemes."
    },
    {
      question: "Can I control my smart gaming wall with voice commands?",
      answer: "Yes, our smart gaming walls integrate seamlessly with Alexa, Google Assistant, and Apple HomeKit. Control lighting, audio levels, display settings, gaming console power, and even launch specific games using simple voice commands."
    },
    {
      question: "What's included in a dual TV gaming wall setup?",
      answer: "Dual TV setups include two premium displays with independent control, separate audio zones, dedicated gaming console storage, advanced cable management systems, coordinated lighting effects, and multi-zone climate control for extended gaming sessions."
    },
    {
      question: "How long does smart gaming wall installation take?",
      answer: "Installation typically takes 2-4 days depending on the complexity of your setup. This includes wall preparation, smart system integration, cable management, comprehensive testing, and user training on all smart features and controls."
    },
    {
      question: "Do smart gaming walls work with streaming services?",
      answer: "Absolutely. Our smart gaming walls seamlessly integrate with Netflix, Amazon Prime, Disney+, Twitch, YouTube Gaming, and other streaming platforms. Each service gets optimised audio and visual settings for the best viewing experience."
    },
    {
      question: "What warranty comes with smart gaming wall installation?",
      answer: "We provide a comprehensive 5-year warranty covering all smart components, LED lighting systems, and installation workmanship. This includes free maintenance visits and software updates. Extended warranty options are available for premium installations."
    },
    {
      question: "Can existing gaming setups be upgraded to smart walls?",
      answer: "Yes, we specialise in retrofitting existing gaming rooms with smart wall technology. Our team assesses your current setup and integrates smart features while preserving and enhancing your existing equipment wherever possible."
    }
  ];

  // Related searches data
  const relatedSearches = [
    "gaming room design UK", "smart gaming setup", "LED gaming wall", "console storage solutions",
    "gaming room lighting", "dual monitor gaming", "smart home gaming", "gaming wall installation",
    "RGB gaming lights", "gaming room automation", "custom gaming walls", "gaming entertainment centre"
  ];

  return (
    <>
      <SEOHead
        title="Smart Gaming Wall Installation | Premium Gaming Room Design | The Wall Shop"
        description="Transform your gaming experience with intelligent smart gaming walls. Professional installation of LED lighting, premium audio, console storage, and automation systems. Free consultation available across the UK."
        canonical="https://www.thewallshop.co.uk/smart-gaming-wall"
        keywords="smart gaming wall, gaming room design, LED gaming lights, console storage, gaming wall installation, smart gaming setup, RGB lighting, gaming automation, dual TV gaming, premium gaming room, UK gaming installation"
        ogImage="https://www.thewallshop.co.uk/images/smart-gaming-wall.webp"
      />

      <div className="min-h-screen bg-gradient-to-br from-mocha-900 via-mocha-800 to-leather-900">
        {/* Navigation */}
        <div className="sticky top-0 z-50 bg-white shadow">
          <Navigation />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950">
  {/* Enhanced Background with Particles */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-copper-500/10"></div>
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, rgba(237, 125, 84, 0.15) 0%, transparent 50%)`
    }}></div>
    
    {/* Particle Effect */}
    <div className="absolute inset-0 opacity-30">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold-400/20"
          style={{
            width: Math.random() * 15 + 5 + 'px',
            height: Math.random() * 15 + 5 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
            animationDelay: Math.random() * 5 + 's'
          }}
        ></div>
      ))}
    </div>
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
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500/30 to-copper-500/30 backdrop-blur-md border border-gold-500/40 rounded-full px-6 py-3 shadow-lg"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <Sparkles className="w-5 h-5 text-gold-300" />
        <span className="text-gold-100 font-medium">Premium Gaming Experience</span>
      </motion.div>

      {/* Enhanced Main Heading */}
      <div className="space-y-6">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="block gradient-text-luxury bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 pb-2">Smart Gaming</span>
          <span className="block text-clay-100 drop-shadow-lg">Wall Systems</span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-clay-200 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Transform your gaming space with intelligent automation, premium audio, 
          dynamic lighting, and seamless console integration. Experience gaming like never before.
        </motion.p>
      </div>

      {/* Enhanced Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
      >
        {[
          { icon: <Clock className="w-8 h-8" />, value: "Instant", label: "Setup" },
          { icon: <Star className="w-8 h-8" />, value: "4.9/5", label: "Customer Rating" },
          { icon: <Shield className="w-8 h-8" />, value: "5 Year", label: "Warranty" },
          { icon: <Zap className="w-8 h-8" />, value: "24/7", label: "Smart Control" }
        ].map((stat, index) => (
          <motion.div 
            key={index} 
            className="text-center p-4 rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-gold-500/20 to-copper-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-gold-500/30">
              <div className="text-gold-300">{stat.icon}</div>
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
          className="btn-luxury-gold px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2 group relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/20 to-gold-500/0 animate-shimmer"></span>
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" />
          <span className="z-10">Get Free Design Consultation</span>
        </motion.button>
        <motion.a
          href="tel:+441417393377"
          className="border-2 border-gold-500/50 text-gold-200 px-8 py-4 rounded-2xl hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Call: +44 141 739 3377</span>
        </motion.a>
      </motion.div>
    </motion.div>
  </div>

  {/* Enhanced Scroll Indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
  >
    <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex justify-center backdrop-blur-sm">
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-1 h-3 bg-gold-400 rounded-full mt-2"
      />
    </div>
  </motion.div>

  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `}</style>
</section>

        
       {/* Enhanced Interactive Configuration Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
  {/* Subtle Background Pattern */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-copper-500/5"></div>
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, rgba(237, 125, 84, 0.05) 0%, transparent 50%)`
    }}></div>
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
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500/10 to-copper-500/10 backdrop-blur-sm border border-gold-500/20 rounded-full px-6 py-2 mb-6 shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-gold-500" />
        <span className="text-gold-600 font-medium text-sm">Interactive Experience</span>
      </motion.div>
      
      {/* Enhanced Headings */}
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="gradient-text-luxury bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700">Configure Your</span>
        <span className="block text-gray-900 mt-2">Perfect Gaming Setup</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Explore our interactive gaming wall configurations. Click on the hotspots to discover 
        the advanced features and technology that make each setup extraordinary.
      </p>
    </motion.div>

    {/* Enhanced Configuration Tabs with Dark Leather Style */}
    <motion.div 
      className="flex justify-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="bg-gray-100/80 backdrop-blur-sm rounded-full p-1 border border-gold-500/20 shadow-sm">
        {Object.entries(tabContent).map(([key, content]) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key as 'single' | 'dual');
              setActiveHotspot(null);
            }}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${
              activeTab === key
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            {activeTab === key && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-leather-500 via-leather-700 to-leather-600"
                layoutId="activeTabBackground"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{content.label}</span>
          </button>
        ))}
      </div>
    </motion.div>

    {/* Interactive Image with Hotspots */}
    <div className="relative max-w-6xl mx-auto">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        ref={imageRef}
        className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-50 border-2 border-gold-500/20 group"
      >
        <img
          src={activeTab === 'single' ? '/images/smart-gaming-wall-2.webp' : '/images/smart-gaming-wall-3.webp'}
          alt={`${tabContent[activeTab].label} - Smart Gaming Wall Configuration`}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Enhanced Hotspots with White Circle and Dark Icon */}
        <AnimatePresence>
          {tabContent[activeTab].hotspots.map((hotspot) => (
            <motion.button
              key={hotspot.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + (parseInt(hotspot.id) * 0.1) }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id);
              }}
              className={`absolute w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                activeHotspot === hotspot.id
                  ? 'bg-white border-gray-300 scale-125 shadow-lg z-20'
                  : 'bg-white border-gray-200 hover:border-gold-500 hover:scale-110 z-10'
              }`}
              style={{
                left: `calc(${hotspot.x}% - 24px)`,
                top: `calc(${hotspot.y}% - 24px)`,
              }}
              aria-label={`View details about ${hotspot.title}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-full h-full flex items-center justify-center text-lg font-semibold ${
                activeHotspot === hotspot.id ? 'text-gray-800' : 'text-gray-700'
              }`}>
                {hotspot.icon}
              </div>
              
              {/* Outer ring animation for hotspots */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-leather-500 opacity-0"
                animate={{ 
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: Math.random() * 1.5
                }}
              />
              
              {/* Active hotspot indicator */}
              {activeHotspot === hotspot.id && (
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-gold-400"
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Enhanced Hotspot Details Card */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/30 shadow-xl z-30"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const hotspot = tabContent[activeTab].hotspots.find(h => h.id === activeHotspot);
                if (!hotspot) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className="w-12 h-12 bg-gradient-to-r from-gold-500 to-copper-500 rounded-xl flex items-center justify-center shadow-lg"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, type: "spring" }}
                        >
                          {hotspot.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{hotspot.title}</h3>
                          <p className="text-gray-600 mt-1">{hotspot.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                        aria-label="Close details"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {hotspot.features.map((feature, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100/70"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Enhanced CTA inside hotspot card */}
                    {/* <motion.button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="w-full mt-4 bg-gradient-to-r from-amber-900 to-amber-800 text-white rounded-full py-3 font-medium hover:from-black hover:to-gray-900 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire About This Feature</span>
                    </motion.button> */}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Apple-Style Gloss Effect Instructions Overlay */}
        <AnimatePresence>
          {!activeHotspot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.24) 0%, rgba(245,245,245,0.9) 100%)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Gloss effect overlay */}
              <div className="relative px-4 py-2">
                <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-white/50 to-transparent"></div>
                <p className="text-sm text-gray-700 flex items-center space-x-2 relative z-10">
                  <MousePointer className="w-4 h-4 text-amber-800" />
                  <span>Click on the markers to explore features</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          {tabContent[activeTab].description}
        </p>
      </motion.div>
    </div>
  </div>
</section>

        {/* Enhanced Features Grid */}
<section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-copper-500/10"></div>
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, rgba(237, 125, 84, 0.1) 0%, transparent 50%)`
    }}></div>
  </div>

  {/* Floating Particles */}
  <div className="absolute inset-0 opacity-30">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gold-400/20"
        style={{
          width: Math.random() * 12 + 4 + 'px',
          height: Math.random() * 12 + 4 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
          animationDelay: Math.random() * 5 + 's'
        }}
      ></div>
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
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500/20 to-copper-500/20 backdrop-blur-sm border border-gold-500/30 rounded-full px-6 py-2 mb-6"
      >
        <Sparkles className="w-4 h-4 text-gold-400" />
        <span className="text-gold-200 font-medium text-sm">Premium Features</span>
      </motion.div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="gradient-text-luxury bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500">Why Choose</span>
        <span className="block text-white mt-2">Smart Gaming Walls?</span>
      </h2>
      <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Experience the perfect fusion of cutting-edge technology, premium design, and intelligent automation 
        that transforms ordinary gaming spaces into extraordinary entertainment environments.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: <Zap className="w-8 h-8" />,
          title: "Intelligent Automation",
          description: "Smart profiles automatically adjust lighting, audio, and climate based on the game you're playing and time of day.",
          gradient: "from-gold-500 to-copper-500",
          features: ["Auto-adjusting profiles", "Time-based settings", "Game-specific optimization"]
        },
        {
          icon: <Palette className="w-8 h-8" />,
          title: "Responsive RGB Lighting",
          description: "Dynamic LED systems that react to gameplay, creating immersive lighting effects that enhance your gaming experience.",
          gradient: "from-copper-500 to-gold-600",
          features: ["Game-reactive lighting", "16.8M color spectrum", "Custom effect creation"]
        },
        {
          icon: <Volume2 className="w-8 h-8" />,
          title: "Premium Audio Integration",
          description: "Spatial audio systems with gaming-optimised profiles, voice chat clarity, and customisable sound zones.",
          gradient: "from-gold-600 to-copper-400",
          features: ["3D spatial audio", "Voice enhancement", "Multi-zone support"]
        },
        {
          icon: <Gamepad2 className="w-8 h-8" />,
          title: "Multi-Console Support",
          description: "Seamlessly switch between PlayStation, Xbox, Nintendo Switch, and PC with intelligent cable management.",
          gradient: "from-copper-400 to-gold-500",
          features: ["Auto-source switching", "Hidden cable management", "One-touch switching"]
        },
        {
          icon: <Wifi className="w-8 h-8" />,
          title: "Smart Home Integration",
          description: "Full compatibility with Alexa, Google Assistant, and Apple HomeKit for voice control and automation.",
          gradient: "from-gold-500 to-copper-600",
          features: ["Voice control", "Scene automation", "Cross-platform compatibility"]
        },
        {
          icon: <Shield className="w-8 h-8" />,
          title: "5-Year Warranty",
          description: "Comprehensive warranty covering all smart components, installation, and ongoing software updates.",
          gradient: "from-copper-600 to-gold-400",
          features: ["Full component coverage", "Professional installation", "Lifetime software updates"]
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20 hover:border-gold-400/40 transition-all duration-500 hover:transform hover:scale-[1.02] overflow-hidden"
          whileHover={{ y: -5 }}
        >
          {/* Background Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-copper-500/0 group-hover:from-gold-500/5 group-hover:to-copper-500/5 transition-all duration-500"></div>
          
          {/* Animated Border Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold-500/30 to-copper-500/30 group-hover:animate-pulse"></div>
          </div>

          <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
            <div className="text-white">{feature.icon}</div>
            
            {/* Icon Shine Effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-200 transition-colors duration-300 relative z-10">
            {feature.title}
          </h3>
          
          <p className="text-gray-300 leading-relaxed mb-4 relative z-10">
            {feature.description}
          </p>
          
          {/* Feature Highlights */}
          <div className="mt-4 space-y-2 relative z-10">
            {feature.features.map((item, i) => (
              <div key={i} className="flex items-center text-sm text-gold-300/80">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
          
          {/* Learn More Link */}
          <div className="mt-6 relative z-10">
            <button className="flex items-center text-gold-400 group-hover:text-gold-300 transition-colors duration-300 text-sm font-medium">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>

    {/* CTA Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="text-center mt-16"
    >
      <div className="bg-gradient-to-r from-gold-500/10 to-copper-500/10 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Transform Your Gaming Space?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Experience the ultimate gaming setup with our smart wall systems. Schedule a free consultation today.
        </p>
        <button className="bg-gradient-to-r from-gold-500 to-copper-500 text-white px-8 py-3 rounded-full font-semibold hover:from-gold-600 hover:to-copper-600 transition-all duration-300 shadow-lg hover:shadow-gold-500/30">
          Get Free Consultation
        </button>
      </div>
    </motion.div>
  </div>

  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
  `}</style>
</section>

       {/* Enhanced FAQ Section */}
<section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Background Elements */}

   <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse at center, #3d2914 0%, #2a1810 30%, #1a0f0a 60%, #0d0806 100%)"
      }}
    />


  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-copper-500/10"></div>
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, rgba(237, 125, 84, 0.1) 0%, transparent 50%)`
    }}></div>
  </div>

  {/* Floating Particles */}
  <div className="absolute inset-0 opacity-30">
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gold-400/20"
        style={{
          width: Math.random() * 10 + 4 + 'px',
          height: Math.random() * 10 + 4 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
          animationDelay: Math.random() * 5 + 's'
        }}
      ></div>
    ))}
  </div>

  <div className="max-w-4xl mx-auto relative z-10">
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
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500/20 to-copper-500/20 backdrop-blur-sm border border-gold-500/30 rounded-full px-6 py-2 mb-6"
      >
        <HelpCircle className="w-4 h-4 text-gold-400" />
        <span className="text-gold-200 font-medium text-sm">Common Questions</span>
      </motion.div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="gradient-text-luxury bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500">Frequently Asked</span>
        <span className="block text-white mt-2">Questions</span>
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Everything you need to know about smart gaming wall installation and features
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
          className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gold-500/20 overflow-hidden hover:border-gold-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10"
          whileHover={{ y: -3 }}
        >
          <button
            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              {/* Number Indicator */}
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-gold-500 to-copper-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mt-1">
                {index + 1}
              </div>
              <span className="text-lg font-semibold text-white pr-4 text-left">{faq.question}</span>
            </div>
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                expandedFaq === index 
                  ? 'bg-gold-500/20 rotate-180' 
                  : 'bg-gray-700/50 group-hover:bg-gold-500/10'
              }`}>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expandedFaq === index ? 'text-gold-400 rotate-180' : 'text-gray-400 group-hover:text-gold-400'
                  }`}
                />
              </div>
            </div>
          </button>
          
          <AnimatePresence>
            {expandedFaq === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 ml-12 border-l-2 border-gold-500/30 ml-12 pl-6">
                  <motion.p 
                    className="text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {faq.answer}
                  </motion.p>
                  
                  {/* Additional action buttons for certain FAQs */}
                  {(faq.question.includes('installation') || faq.question.includes('price')) && (
                    <motion.div 
                      className="mt-4 flex space-x-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <button className="px-4 py-2 bg-gradient-to-r from-gold-500/10 to-copper-500/10 text-gold-300 rounded-full text-sm font-medium border border-gold-500/30 hover:from-gold-500/20 hover:to-copper-500/20 transition-all duration-300">
                        Get Quote
                      </button>
                      <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium border border-gray-600 hover:bg-gray-700/70 transition-all duration-300">
                        View Gallery
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>

    {/* Enhanced CTA Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="text-center mt-16"
    >
      <div className="bg-gradient-to-r from-gold-500/10 to-copper-500/10 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20 relative overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
          Still Have Questions?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto relative z-10">
          Our gaming specialists are ready to answer all your questions and help you design the perfect setup.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button className="bg-gradient-to-r from-gold-500 to-copper-500 text-white px-6 py-3 rounded-full font-semibold hover:from-gold-600 hover:to-copper-600 transition-all duration-300 shadow-lg hover:shadow-gold-500/30 flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Chat with Expert</span>
          </button>
          <button className="border border-gold-500/30 text-gold-300 px-6 py-3 rounded-full font-semibold hover:bg-gold-500/10 transition-all duration-300 flex items-center justify-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </button>
        </div>
      </div>
    </motion.div>
  </div>

  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(5deg); }
    }
    @keyframes shine {
      0% { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(100%) skewX(-15deg); }
    }
    .animate-shine {
      animation: shine 3s infinite;
    }
  `}</style>
</section>

       {/* Enhanced Related Searches Section */}
<section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-copper-500/10"></div>
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, rgba(237, 125, 84, 0.1) 0%, transparent 50%)`
    }}></div>
  </div>

  {/* Floating Particles */}
  <div className="absolute inset-0 opacity-30">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gold-400/20"
        style={{
          width: Math.random() * 8 + 3 + 'px',
          height: Math.random() * 8 + 3 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `float ${Math.random() * 8 + 8}s infinite ease-in-out`,
          animationDelay: Math.random() * 4 + 's'
        }}
      ></div>
    ))}
  </div>

  <div className="max-w-5xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      {/* Enhanced Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500/20 to-copper-500/20 backdrop-blur-sm border border-gold-500/30 rounded-full px-5 py-1.5 mb-4"
      >
        <Search className="w-3.5 h-3.5 text-gold-400" />
        <span className="text-gold-200 font-medium text-xs">Popular Topics</span>
      </motion.div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
        Related Searches
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto">
        Popular gaming wall and smart home automation searches
      </p>
    </motion.div>

    <div className="flex flex-wrap gap-3 justify-center">
      {relatedSearches.map((search, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.4, 
            delay: index * 0.05,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05, 
            y: -3,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-gray-800/50 backdrop-blur-sm border border-gold-500/30 rounded-full px-6 py-3 text-sm text-gray-300 hover:text-white hover:border-gold-400/60 hover:bg-gradient-to-r hover:from-gold-500/10 hover:to-copper-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
          
          {/* Inner content */}
          <span className="relative z-10 flex items-center">
            {search}
            <ArrowUpRight className="w-3.5 h-3.5 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 transition-all duration-300" />
          </span>
        </motion.button>
      ))}
    </div>

    {/* Enhanced CTA Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-center mt-16"
    >
      <div className="bg-gradient-to-r from-gold-500/10 to-copper-500/10 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20 relative overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
        
        <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
          Can't Find What You're Looking For?
        </h3>
        <p className="text-gray-400 mb-5 text-sm relative z-10">
          Our experts can help you find the perfect gaming wall solution
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
          <button className="bg-gradient-to-r from-gold-500 to-copper-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:from-gold-600 hover:to-copper-600 transition-all duration-300 shadow-lg hover:shadow-gold-500/30 flex items-center justify-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Contact Us</span>
          </button>
          <button className="border border-gold-500/30 text-gold-300 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-500/10 transition-all duration-300 flex items-center justify-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Call Expert</span>
          </button>
        </div>
      </div>
    </motion.div>
  </div>

  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-6px) rotate(3deg); }
    }
    @keyframes shine {
      0% { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(200%) skewX(-15deg); }
    }
    .animate-shine {
      animation: shine 4s infinite;
    }
  `}</style>
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
                className="bg-mocha-900 rounded-3xl p-8 max-w-md w-full border border-gold-500/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-copper-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Consultation</h3>
                  <p className="text-clay-300">Ready to transform your gaming space? Let's discuss your vision.</p>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+441417393377"
                    className="w-full btn-luxury-gold py-4 rounded-xl flex items-center justify-center space-x-3 group"
                  >
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Call Now: +44 141 739 3377</span>
                  </a>
                  
                  <a
                    href="mailto:info@thewallshop.co.uk?subject=Smart Gaming Wall Consultation"
                    className="w-full border-2 border-gold-500/50 text-gold-200 py-4 rounded-xl hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300 flex items-center justify-center space-x-3 group"
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

export default SmartGamingWall;
