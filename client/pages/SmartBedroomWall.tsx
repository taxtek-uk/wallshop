import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwQuoteModal from '@/components/SwQuoteModal';
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
  CloudMoon
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
      "description": "Professional smart bedroom wall installation with integrated lighting, climate control, and sleep optimization technology. Transform your bedroom into an intelligent sanctuary.",
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

  // Headboard-centric hotspots
  const hotspots: Hotspot[] = [
    {
      id: 'headboard-lighting',
      x: 50,
      y: 25,
      title: 'Integrated Headboard Lighting',
      description: 'Sophisticated LED lighting built into the headboard design',
      icon: <Lightbulb className="w-5 h-5" />,
      features: ['Circadian rhythm sync', 'Reading light zones', 'Mood lighting', 'Sunrise simulation']
    },
    {
      id: 'climate-control',
      x: 20,
      y: 40,
      title: 'Smart Climate Control',
      description: 'Intelligent temperature and humidity management',
      icon: <Thermometer className="w-5 h-5" />,
      features: ['Dual-zone temperature', 'Humidity control', 'Air purification', 'Sleep optimisation']
    },
    {
      id: 'audio-system',
      x: 80,
      y: 40,
      title: 'Ambient Audio System',
      description: 'Discreet speakers for relaxation and wake-up sounds',
      icon: <Volume2 className="w-5 h-5" />,
      features: ['White noise generation', 'Nature sounds', 'Music streaming', 'Voice control']
    },
    {
      id: 'smart-controls',
      x: 35,
      y: 55,
      title: 'Bedside Smart Controls',
      description: 'Touch-sensitive control panels integrated into the headboard',
      icon: <Settings className="w-5 h-5" />,
      features: ['Touch controls', 'Wireless charging', 'USB ports', 'Scene presets']
    },
    {
      id: 'sleep-sensors',
      x: 65,
      y: 55,
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

  return (
    <>
      <SEOHead
        title="Smart Bedroom Wall Installation | Intelligent Sleep Technology | The Wall Shop"
        description="Transform your bedroom with intelligent smart wall systems featuring circadian lighting, climate control, and sleep optimisation. Professional installation across the UK with 5-year warranty."
        canonical="https://www.thewallshop.co.uk/smart-bedroom-wall"
        keywords="smart bedroom wall, intelligent bedroom lighting, bedroom climate control, smart headboard, sleep optimisation, bedroom automation, smart bedroom installation, circadian lighting, bedroom smart home, UK bedroom technology"
        ogImage="https://www.thewallshop.co.uk/images/smart-walls/bedroom/bedroom-hero.webp"
      />

      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1c0a00] via-[#361500] to-[#603601]">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-mocha-600/20 to-leather-600/20 border border-mocha-500/30 rounded-full px-4 py-2">
                    <Moon className="w-4 h-4 text-mocha-400" />
                    <span className="text-mocha-300 text-sm font-medium">Sleep Optimisation Technology</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    Smart Bedroom
                    <span className="block bg-gradient-to-r from-mocha-400 to-leather-400 bg-clip-text text-transparent">
                      Wall Systems
                    </span>
                  </h1>
                  <p className="text-xl text-leather-300 leading-relaxed">
                    Transform your bedroom into an intelligent sanctuary with automated lighting that follows your 
                    circadian rhythms, precise climate control, and integrated wellness technology designed to 
                    optimise your sleep and enhance your daily routine.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="bg-gradient-to-r from-mocha-600 to-leather-600 text-white px-8 py-4 rounded-2xl hover:from-mocha-700 hover:to-leather-700 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
                  >
                    <Bed className="w-5 h-5" />
                    <span>Design Your Bedroom</span>
                  </button>
                  <a
                    href="/smart-walls"
                    className="border border-leather-600 text-leather-300 px-8 py-4 rounded-2xl hover:bg-leather-800 hover:border-leather-500 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
                  >
                    <Home className="w-5 h-5" />
                    <span>View All Smart Walls</span>
                  </a>
                </div>

                {/* <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">300+</div>
                    <div className="text-leather-400 text-sm">Bedrooms Transformed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div className="text-leather-400 text-sm">Better Sleep Quality</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">5 Year</div>
                    <div className="text-leather-400 text-sm">Warranty Included</div>
                  </div>
                </div> */}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/bedroom-smart-wall-hero.webp"
                    alt="Smart Bedroom Wall with integrated LED lighting and climate control"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-leather-900/50 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bed Size Selector */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Choose Your Bed Size Configuration
              </h2>
              <p className="text-xl text-leather-300 max-w-3xl mx-auto">
                Our smart bedroom walls are custom-designed to perfectly complement your bed size and room dimensions, 
                ensuring optimal functionality and aesthetic appeal.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {bedSizes.map((bedSize) => (
                <motion.button
                  key={bedSize.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  onClick={() => setSelectedBedSize(bedSize.id)}
                  className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                    selectedBedSize === bedSize.id
                      ? 'bg-gradient-to-r from-mocha-600/20 to-leather-600/20 border-mocha-500'
                      : 'bg-leather-800/50 border-leather-700/50 hover:border-leather-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Bed className={`w-8 h-8 ${selectedBedSize === bedSize.id ? 'text-mocha-400' : 'text-leather-400'}`} />
                    {/* <span className={`text-sm font-medium ${selectedBedSize === bedSize.id ? 'text-mocha-300' : 'text-leather-400'}`}>
                      {bedSize.price}
                    </span> */}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{bedSize.name}</h3>
                  <p className="text-leather-300 text-sm mb-2">{bedSize.dimensions}</p>
                  <p className="text-leather-400 text-sm">{bedSize.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Current Selection Display */}
            <motion.div
              key={selectedBedSize}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-leather-800/50 rounded-2xl p-6 border border-leather-700/50 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentBedSize.name} Size Configuration
              </h3>
              <p className="text-leather-300 mb-4">
                Optimised smart wall design for {currentBedSize.dimensions} beds with enhanced features 
                and premium integration options.
              </p>
              {/* <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-mocha-600/20 to-leather-600/20 border border-mocha-500/30 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-mocha-400" />
                <span className="text-mocha-300 text-sm font-medium">Starting {currentBedSize.price}</span>
              </div> */}
            </motion.div>
          </div>
        </section>

        {/* Interactive Bedroom Wall Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explore Smart Bedroom Features
              </h2>
              <p className="text-xl text-leather-300 max-w-3xl mx-auto">
                Discover the intelligent features integrated into your headboard and bedroom wall system 
                that work together to create the perfect sleep environment.
              </p>
            </motion.div>

            {/* Interactive Image with Hotspots */}
            <div className="relative max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                ref={imageRef}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-leather-800"
              >
                <img
                  src="/images/bedroom-smart-wall-hero.webp"
                  alt="Smart Bedroom Wall with integrated headboard features and controls"
                  className="w-full h-auto"
                />
                
                {/* Hotspots */}
                <AnimatePresence>
                  {hotspots.map((hotspot, index) => (
                    <motion.button
                      key={hotspot.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                      className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        activeHotspot === hotspot.id
                          ? 'bg-mocha-600 border-mocha-400 scale-125'
                          : 'bg-white/20 border-white/60 hover:bg-white/30 hover:border-white/80'
                      }`}
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: 'tranleather(-50%, -50%)'
                      }}
                      aria-label={`View details about ${hotspot.title}`}
                    >
                      <div className="w-full h-full flex items-center justify-center text-white">
                        {hotspot.icon}
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>

                {/* Hotspot Details Card */}
                <AnimatePresence>
                  {activeHotspot && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4 bg-leather-900/95 backdrop-blur-sm rounded-2xl p-6 border border-leather-700/50"
                    >
                      {(() => {
                        const hotspot = hotspots.find(h => h.id === activeHotspot);
                        if (!hotspot) return null;
                        
                        return (
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-mocha-600 to-leather-600 rounded-xl flex items-center justify-center">
                                  {hotspot.icon}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-white">{hotspot.title}</h3>
                                  <p className="text-leather-300">{hotspot.description}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setActiveHotspot(null)}
                                className="text-leather-400 hover:text-white transition-colors"
                                aria-label="Close details"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {hotspot.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  <span className="text-sm text-leather-300">{feature}</span>
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
            </div>
          </div>
        </section>

        {/* Control Methods Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Choose Your Control Method
              </h2>
              <p className="text-xl text-leather-300 max-w-3xl mx-auto">
                Control your smart bedroom wall through elegant touch panels or comprehensive smartphone apps, 
                both designed for intuitive operation and seamless integration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {controlMethods.map((method) => (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  onClick={() => setSelectedControl(method.id)}
                  className={`p-8 rounded-2xl border transition-all duration-300 text-left ${
                    selectedControl === method.id
                      ? 'bg-gradient-to-r from-mocha-600/20 to-leather-600/20 border-mocha-500'
                      : 'bg-leather-800/50 border-leather-700/50 hover:border-leather-600'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedControl === method.id 
                        ? 'bg-gradient-to-r from-mocha-600 to-leather-600' 
                        : 'bg-leather-700'
                    }`}>
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{method.name}</h3>
                      <p className="text-leather-300">{method.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {method.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-leather-300">{feature}</span>
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
              className="bg-leather-800/50 rounded-2xl p-6 border border-leather-700/50 text-center"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-mocha-600 to-leather-600 rounded-xl flex items-center justify-center">
                  {currentControl.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{currentControl.name}</h3>
              </div>
              <p className="text-leather-300">
                {currentControl.description} - Experience seamless control with advanced features 
                designed for your comfort and convenience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose Smart Bedroom Walls?
              </h2>
              <p className="text-xl text-leather-300 max-w-3xl mx-auto">
                Experience the perfect blend of luxury design, intelligent automation, and wellness technology 
                that transforms your bedroom into a personal sanctuary optimised for rest and rejuvenation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sunrise className="w-8 h-8" />,
                  title: "Circadian Rhythm Lighting",
                  description: "Intelligent lighting that automatically adjusts colour temperature throughout the day to support your natural sleep-wake cycle."
                },
                {
                  icon: <Thermometer className="w-8 h-8" />,
                  title: "Climate Optimisation",
                  description: "Precise temperature and humidity control that maintains ideal sleeping conditions and adapts to seasonal changes."
                },
                {
                  icon: <CloudMoon className="w-8 h-8" />,
                  title: "Sleep Quality Monitoring",
                  description: "Advanced sensors track sleep patterns, environmental conditions, and provide insights to improve your rest quality."
                },
                {
                  icon: <Volume2 className="w-8 h-8" />,
                  title: "Ambient Sound Control",
                  description: "Integrated audio system with white noise, nature sounds, and music streaming for relaxation and better sleep."
                },
                {
                  icon: <Wifi className="w-8 h-8" />,
                  title: "Smart Home Integration",
                  description: "Seamless connectivity with Alexa, Google Assistant, and Apple HomeKit for voice control and automation."
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "5-Year Warranty",
                  description: "Comprehensive warranty covering all smart components, installation, and ongoing maintenance for complete peace of mind."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-leather-800/50 rounded-2xl p-6 border border-leather-700/50 hover:border-mocha-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-mocha-600 to-leather-600 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-leather-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-leather-300">
                Everything you need to know about smart bedroom wall installation and sleep optimisation
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
                  className="bg-leather-800/50 rounded-2xl border border-leather-700/50 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-leather-700/30 transition-colors"
                  >
                    <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-leather-400 transition-transform ${
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
                        <div className="px-6 pb-4">
                          <p className="text-leather-300 leading-relaxed">{faq.answer}</p>
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
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Related Searches</h2>
              <p className="text-leather-300">Popular bedroom automation and smart home technology searches</p>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center">
              {relatedSearches.map((search, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-leather-800/50 border border-leather-700/50 rounded-full px-4 py-2 text-sm text-leather-300 hover:border-mocha-500/50 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {search}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-mocha-600/20 to-leather-600/20 rounded-3xl p-8 md:p-12 border border-mocha-500/30 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Sleep Experience?
              </h2>
              <p className="text-xl text-leather-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who've enhanced their sleep quality with our intelligent 
                bedroom wall systems. Get your free consultation and custom design today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-gradient-to-r from-mocha-600 to-leather-600 text-white px-8 py-4 rounded-2xl hover:from-mocha-700 hover:to-leather-700 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Get Free Consultation</span>
                </button>
                <a
                  href="tel:+441417393377"
                  className="border border-leather-600 text-leather-300 px-8 py-4 rounded-2xl hover:bg-leather-800 hover:border-leather-500 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now: +44 141 739 3377</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
         <Footer />

        {/* Quote Modal */}
        <AnimatePresence>
          <SwQuoteModal
                  isOpen={isQuoteModalOpen}
                  onClose={() => setIsQuoteModalOpen(false)}
                />
        </AnimatePresence>

      </div>
    </>
  );
};

export default SmartBedroomWall;
