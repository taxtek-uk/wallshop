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
  Speaker,
  Tv,
  Play,
  Pause,
  RotateCcw,
  Search,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  X
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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navigation */}
        <div className="sticky top-0 z-50 bg-white shadow">
          <Navigation />
        </div>
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
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full px-4 py-2">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 text-sm font-medium">Premium Gaming Experience</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    Smart Gaming
                    <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Wall Systems
                    </span>
                  </h1>
                  <p className="text-xl text-slate-300 leading-relaxed">
                    Elevate your gaming experience with intelligent wall systems featuring responsive LED lighting, 
                    premium audio integration, and automated console management. Transform any room into a 
                    professional gaming sanctuary.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
                  >
                    <Target className="w-5 h-5" />
                    <span>Start Your Project</span>
                  </button>
                  <a
                    href="/smart-walls"
                    className="border border-slate-600 text-slate-300 px-8 py-4 rounded-2xl hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
                  >
                    <Home className="w-5 h-5" />
                    <span>View All Smart Walls</span>
                  </a>
                </div>

                {/* <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-slate-400 text-sm">Gaming Walls Installed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">5 Year</div>
                    <div className="text-slate-400 text-sm">Warranty Included</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-slate-400 text-sm">Smart Support</div>
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
                    src="/images/smart-gaming-wall.webp"
                    alt="Smart Gaming Wall with LED lighting and premium audio system"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Gaming Wall Section */}
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
                Explore Your Gaming Wall Configuration
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Discover the intelligent features and premium components that make our smart gaming walls 
                the ultimate choice for serious gamers and entertainment enthusiasts.
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800/50 rounded-2xl p-2 border border-slate-700/50">
                {Object.entries(tabContent).map(([key, content]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key as 'single' | 'dual');
                      setActiveHotspot(null);
                    }}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {content.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Image with Hotspots */}
            <div className="relative max-w-5xl mx-auto">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                ref={imageRef}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-800"
              >
                <img
                  src={activeTab === 'single' ? '/images/smart-gaming-wall-2.webp' : '/images/smart-gaming-wall-3.webp'}
                  alt={`${tabContent[activeTab].label} - Smart Gaming Wall Configuration`}
                  className="w-full h-auto"
                />
                
                {/* Hotspots */}
                <AnimatePresence>
                  {tabContent[activeTab].hotspots.map((hotspot) => (
                    <motion.button
                      key={hotspot.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                      className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        activeHotspot === hotspot.id
                          ? 'bg-purple-600 border-purple-400 scale-125'
                          : 'bg-white/20 border-white/60 hover:bg-white/30 hover:border-white/80'
                      }`}
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        transform: 'translate(-50%, -50%)'
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
                      className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
                    >
                      {(() => {
                        const hotspot = tabContent[activeTab].hotspots.find(h => h.id === activeHotspot);
                        if (!hotspot) return null;
                        
                        return (
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                  {hotspot.icon}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-white">{hotspot.title}</h3>
                                  <p className="text-slate-300">{hotspot.description}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setActiveHotspot(null)}
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="Close details"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {hotspot.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  <span className="text-sm text-slate-300">{feature}</span>
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

              <div className="text-center mt-6">
                <p className="text-slate-400">
                  {tabContent[activeTab].description}
                </p>
              </div>
            </div>
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
                Why Choose Smart Gaming Walls?
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Experience the perfect fusion of cutting-edge technology, premium design, and intelligent automation 
                that transforms ordinary gaming spaces into extraordinary entertainment environments.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Intelligent Automation",
                  description: "Smart profiles automatically adjust lighting, audio, and climate based on the game you're playing and time of day."
                },
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: "Responsive RGB Lighting",
                  description: "Dynamic LED systems that react to gameplay, creating immersive lighting effects that enhance your gaming experience."
                },
                {
                  icon: <Volume2 className="w-8 h-8" />,
                  title: "Premium Audio Integration",
                  description: "Spatial audio systems with gaming-optimised profiles, voice chat clarity, and customisable sound zones."
                },
                {
                  icon: <Gamepad2 className="w-8 h-8" />,
                  title: "Multi-Console Support",
                  description: "Seamlessly switch between PlayStation, Xbox, Nintendo Switch, and PC with intelligent cable management."
                },
                {
                  icon: <Wifi className="w-8 h-8" />,
                  title: "Smart Home Integration",
                  description: "Full compatibility with Alexa, Google Assistant, and Apple HomeKit for voice control and automation."
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "5-Year Warranty",
                  description: "Comprehensive warranty covering all smart components, installation, and ongoing software updates."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
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
              <p className="text-xl text-slate-300">
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
                  className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                  >
                    <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
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
                          <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
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
              <p className="text-slate-300">Popular gaming wall and smart home automation searches</p>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center">
              {relatedSearches.map((search, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 text-sm text-slate-300 hover:border-purple-500/50 hover:text-white transition-all duration-300 cursor-pointer"
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
              className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 md:p-12 border border-purple-500/30 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Gaming Experience?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied gamers who've elevated their setup with our intelligent gaming wall systems. 
                Get your free consultation and custom quote today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Get Free Consultation</span>
                </button>
                <a
                  href="tel:+441417393377"
                  className="border border-slate-600 text-slate-300 px-8 py-4 rounded-2xl hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 font-medium text-lg flex items-center justify-center space-x-2"
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
          {isQuoteModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsQuoteModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Get Your Free Quote</h3>
                  <button
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-medium">Call Us</div>
                      <div className="text-sm text-slate-400">+44 141 739 3377</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-medium">Email Us</div>
                      <div className="text-sm text-slate-400">info@thewallshop.co.uk</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 text-slate-300">
                    <Clock className="w-5 h-5 text-purple-400 mt-1" />
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <div className="text-sm text-slate-400">Mon–Fri: 9 AM–6 PM PST</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <a
                    href="tel:+441417393377"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium text-center flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="mailto:info@thewallshop.co.uk?subject=Smart Gaming Wall Quote Request"
                    className="border border-slate-600 text-slate-300 px-6 py-3 rounded-xl hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 font-medium text-center flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SmartGamingWall;
