import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import SwQuoteModal from '@/components/SwQuoteModal';
import FinishesSection from "@/components/FinishesSection";
import { 
  Tv, 
  Lightbulb, 
  Volume2, 
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
  Info,
  ChevronRight,
  Archive,
  Layers,
  PanelsTopLeft,
  LampCeiling,
  DoorOpen,
  ScanFace,
  Fan,
  Music4,
  CloudSun,
  TreePine,
  Square,
  Gem
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
    setMetaTag('hreflang', 'en-GB'); 

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
      setMetaTag('og:image:alt', 'Smart Living Room Wall by The Wall Shop', true); 
    } 

    // Twitter Card tags 
    setMetaTag('twitter:card', 'summary_large_image'); 
    setMetaTag('twitter:title', title); 
    setMetaTag('twitter:description', description); 
    if (ogImage) { 
      setMetaTag('twitter:image', ogImage); 
    } 

    // JSON-LD Structured Data 
    const organizationSchema = {
      "@context": "https://schema.org",
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
    };

    const serviceSchema = { 
      "@context": "https://schema.org", 
      "@type": "Service", 
      "name": "Smart Living Room Wall Installation", 
      "description": "Professional smart living room wall installation with integrated media systems, ambient lighting, and acoustic panels. Transform your living room into an intelligent entertainment space.", 
      "provider": organizationSchema,
      "areaServed": "United Kingdom", 
      "serviceType": "Smart Wall Installation", 
      "category": "Living Room Design", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart living room wall solutions from consultation to full installation" 
      } 
    }; 

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.thewallshop.co.uk"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Smart Walls",
          "item": "https://www.thewallshop.co.uk/smart-walls"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Living Room",
          "item": "https://www.thewallshop.co.uk/smart-walls/living-room"
        }
      ]
    };

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "Can I integrate this with my TV?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, our smart living room walls are designed to seamlessly integrate with TVs of all sizes. We provide concealed cable management and can accommodate screens from 55 inches to 85 inches with perfect alignment and hidden wiring." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Is it reconfigurable later?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. The modular design of Shezhi WPC panels allows for easy reconfiguration. You can add new sections, change layouts, or upgrade components without major reconstruction work." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "What smart devices are compatible?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Our system integrates with Orvibo MixPad controllers, Amazon Alexa, Google Assistant, Apple HomeKit, and most major smart home platforms. All devices are UKCA/CE certified for UK use." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "How does the acoustic performance work?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Shezhi WPC acoustic panels provide excellent sound absorption and noise reduction. The integrated speaker system delivers immersive audio while the panels reduce echo and improve room acoustics." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "What lighting options are available?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "RGB LED strips provide ambient lighting effects with millions of colour combinations. The system includes scene presets for movie watching, entertaining, relaxation, and can sync with your TV content." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Is professional installation required?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, professional installation ensures proper electrical connections, structural mounting, and compliance with BS 7671 wiring regulations and Building Regulations for safety and warranty coverage." 
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

    insertJsonLd(organizationSchema, 'organization-schema');
    insertJsonLd(serviceSchema, 'service-schema'); 
    insertJsonLd(breadcrumbSchema, 'breadcrumb-schema');
    insertJsonLd(faqSchema, 'faq-schema'); 

  }, [title, description, canonical, keywords, ogImage]); 

  return null; 
}; 

const SmartWallLivingRoom: React.FC = () => { 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 

  // Orvibo Smart Devices for Living Room
  const orviboDevices = [
    {
      key: "mixPad",
      title: "MixPad Smart Panel",
      category: "Control Panel",
      desc: "All-in-one scene control with voice intercom for seamless living room automation.",
      features: ["Touch + App + Voice", "Scene shortcuts", "Intercom"],
      Icon: PanelsTopLeft,
    },
    {
      key: "smartLighting",
      title: "Smart Lighting System",
      category: "Lighting",
      desc: "Dynamic RGB scenes and ambient moods for entertainment and relaxation.",
      features: ["RGB scenes", "Movie sync", "Voice control"],
      Icon: LampCeiling,
    },
    {
      key: "smartCurtain",
      title: "Smart Curtain Control",
      category: "Window Treatment",
      desc: "Silent motorised curtains with precise control for optimal viewing conditions.",
      features: ["App/Voice control", "Scene linkage", "Smooth motion"],
      Icon: DoorOpen,
    },
    {
      key: "musicSystem",
      title: "Multi-Room Audio",
      category: "Audio",
      desc: "Integrated multi-room audio system with streaming capabilities.",
      features: ["App control", "Zone control", "Hi-fi sound"],
      Icon: Music4,
    }
  ];
 
  // Features data with Orvibo integration
  const features = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Premium WPC Acoustic Panels",
      description: "High-quality wood-plastic composite panels with superior acoustic properties and elegant finishes.",
      gradient: "from-clay-500 to-taupe-500"
    },
    {
      icon: <PanelsTopLeft className="w-8 h-8" />,
      title: "Orvibo MixPad Control System",
      description: "Advanced all-in-one scene control with touch, app, and voice integration for seamless automation.",
      gradient: "from-taupe-500 to-clay-600"
    },
    {
      icon: <Tv className="w-8 h-8" />,
      title: "Concealed TV Integration",
      description: "Professional cable management system for clean installation of TVs and entertainment systems.",
      gradient: "from-clay-600 to-taupe-400"
    },
    {
      icon: <Music4 className="w-8 h-8" />,
      title: "Multi-Room Audio System",
      description: "Integrated Orvibo audio system with app control, zone management, and hi-fi sound quality.",
      gradient: "from-taupe-400 to-clay-500"
    },
    {
      icon: <Archive className="w-8 h-8" />,
      title: "Modular Storage Solutions",
      description: "Customisable shelving and storage integrated seamlessly into the wall design.",
      gradient: "from-clay-500 to-taupe-600"
    },
    {
      icon: <LampCeiling className="w-8 h-8" />,
      title: "Smart RGB Lighting",
      description: "Dynamic Orvibo lighting system with millions of colours, scene presets, and movie synchronisation.",
      gradient: "from-taupe-600 to-clay-400"
    }
  ];

  // FAQ Data 
  const faqData = [ 
    { 
      question: "Can I integrate this with my TV?", 
      answer: "Yes, our smart living room walls are designed to seamlessly integrate with TVs of all sizes. We provide concealed cable management and can accommodate screens from 55 inches to 85 inches with perfect alignment and hidden wiring." 
    }, 
    { 
      question: "Is it reconfigurable later?", 
      answer: "Absolutely. The modular design of our WPC panels allows for easy reconfiguration. You can add new sections, change layouts, or upgrade components without major reconstruction work." 
    },
    { 
      question: "What smart devices are compatible?", 
      answer: "Our system integrates with Orvibo MixPad controllers, Amazon Alexa, Google Assistant, Apple HomeKit, and most major smart home platforms. All devices are UKCA/CE certified for UK use." 
    },
    { 
      question: "How does the acoustic performance work?", 
      answer: "Our WPC acoustic panels provide excellent sound absorption and noise reduction. The integrated audio system delivers immersive sound while the panels reduce echo and improve room acoustics." 
    },
    { 
      question: "What lighting options are available?", 
      answer: "Orvibo RGB lighting system provides ambient effects with millions of colour combinations. The system includes scene presets for movie watching, entertaining, relaxation, and can sync with your TV content." 
    },
    { 
      question: "Is professional installation required?", 
      answer: "Yes, professional installation ensures proper electrical connections, structural mounting, and compliance with BS 7671 wiring regulations and Building Regulations for safety and warranty coverage." 
    }
  ]; 

  // Related searches data 
  const relatedSearches = [ 
    "living room media wall uk", "modular acoustic wall panels", "smart tv wall mount", "ambient led lighting", 
    "home cinema wall design", "living room automation", "smart wall panels uk", "media wall installation", 
    "acoustic wall treatment", "smart home living room", "led strip lighting", "entertainment wall systems" 
  ]; 

  return ( 
    <div className="min-h-screen bg-gray-950"> 
      <SEOHead 
        title="Smart Walls for Living Room | Luxury Modular Media Walls | The Wall Shop"
        description="Transform your living room with luxury modular smart walls featuring Shezhi acoustic panels, Orvibo lighting control, concealed TV cabling, and integrated speakers. Professional installation across the UK."
        canonical="https://www.thewallshop.co.uk/smart-walls/living-room"
        keywords="smart living room wall, media wall uk, acoustic panels, orvibo mixpad, concealed tv cabling, ambient lighting, modular wall panels, home cinema wall"
        ogImage="https://www.thewallshop.co.uk/images/smart-walls/living-room-hero.webp"
      /> 
      
      <Navigation /> 

      {/* Hero Section */} 
      <section className="relative min-h-screen flex flex-col justify-start md:justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 md:pt-0">
        {/* Background Image */} 
        <div className="absolute inset-0 z-0"> 
          <img 
            src="/images/smart-walls/living-room-hero.webp" 
            alt="Smart Living Room Wall with integrated media system" 
            className="w-full h-full object-cover opacity-40" 
          /> 
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-900/60 to-gray-950/80"></div> 
        </div> 

        {/* Background Pattern */} 
        <div className="absolute inset-0 opacity-20"> 
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(172, 137, 104, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(166, 144, 128, 0.15) 0%, transparent 50%)` 
          }}></div> 
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
            > 
              <Tv className="w-5 h-5 text-clay-300" /> 
              <span className="text-clay-100 font-medium">Media & Entertainment Technology</span> 
            </motion.div> 

            {/* Enhanced Main Heading */} 
            <div className="space-y-6"> 
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              > 
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400 pb-2">Smart Walls for</span> 
                <span className="block text-clay-50 mt-2 drop-shadow">the Living Room</span> 
              </motion.h1> 
              <motion.p 
                className="text-xl md:text-2xl text-clay-200 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              > 
                Luxury modular walls for media, ambience and comfort. Transform your living space with  
                integrated entertainment systems and intelligent lighting control. 
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
                { icon: <Tv className="w-8 h-8" />, value: "85\"", label: "Max TV Size" }, 
                { icon: <Star className="w-8 h-8" />, value: "4.9/5", label: "Customer Rating" }, 
                { icon: <Shield className="w-8 h-8" />, value: "5 Year", label: "Warranty" }, 
                { icon: <Lightbulb className="w-8 h-8" />, value: "16M", label: "LED Colours" } 
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
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" /> 
                <span className="z-10">Request a Tailored Quote</span> 
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
 
      </section> 

      {/* Breadcrumbs */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-clay-400 hover:text-clay-300 transition-colors">Home</a>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <a href="/smart-walls" className="text-clay-400 hover:text-clay-300 transition-colors">Smart Walls</a>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-clay-200">Living Room</span>
          </nav>
        </div>
      </section>

      {/* Features Grid */} 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-clay-900"> 
        <div className="max-w-7xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-16" 
          > 
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Premium Features</span> 
              <span className="block text-clay-100 mt-2">for Your Living Room</span> 
            </h2> 
            <p className="text-xl text-clay-300 max-w-4xl mx-auto"> 
              Experience the perfect blend of luxury design, intelligent automation, and entertainment technology  
              that transforms your living room into a sophisticated media sanctuary. 
            </p> 
          </motion.div> 

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {features.map((feature, index) => ( 
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

      {/* Orvibo Smart Devices Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Orvibo Smart</span>
              <span className="block text-clay-100 mt-2">Home Integration</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Professional-grade Orvibo smart home devices seamlessly integrated into your living room wall system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {orviboDevices.map((device, index) => (
              <motion.div
                key={device.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-taupe-800/40 backdrop-blur-sm rounded-xl p-6 border border-clay-500/20 hover:border-clay-400/40 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-clay-500 to-taupe-500 rounded-lg flex items-center justify-center mb-4">
                  <device.Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{device.title}</h3>
                <p className="text-sm text-clay-400 mb-3">{device.category}</p>
                <p className="text-clay-300 text-sm mb-4">{device.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {device.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-clay-600/30 text-clay-200 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall Panel Finishes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-taupe-900 to-clay-900">
         <FinishesSection
              // categories={FINISH_CATEGORIES_DEFAULT} // ← override or filter if you like
                defaultMaxVisible={8}
                helperBadges={["Acoustic-aware", "Scratch-resistant"]}
                id="finishes"
                className=""
              />
      </section> 

      {/* Compliance Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-clay-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-clay-500/10 to-taupe-500/10 backdrop-blur-sm rounded-2xl p-8 border border-clay-500/30"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-clay-500 to-taupe-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">UK Compliance & Safety</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-clay-300">
              <div>
                <h4 className="font-semibold text-white mb-2">BS 7671 Electrical</h4>
                <p className="text-sm">All electrical installations comply with BS 7671 wiring regulations for safety and performance.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Building Regulations</h4>
                <p className="text-sm">Full compliance with UK Building Regulations for structural mounting and fire safety.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">UKCA/CE Certified</h4>
                <p className="text-sm">All smart devices and components carry UKCA/CE certification for UK market compliance.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */} 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-clay-900 to-mocha-900"> 
        <div className="max-w-4xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-16" 
          > 
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Frequently Asked</span> 
              <span className="block text-clay-100">Questions</span> 
            </h2> 
            <p className="text-xl text-clay-300"> 
              Everything you need to know about smart living room wall installation and media integration 
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
            <p className="text-clay-300">Popular living room automation and media wall searches</p> 
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
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-mocha-950 via-clay-900 to-mocha-950 overflow-hidden">
  {/* Subtle animated background accents */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,rgba(166,144,128,0.25),transparent_60%)]"></div>
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,rgba(172,137,104,0.25),transparent_60%)]"></div>
  </div>

  <div className="max-w-5xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative bg-gradient-to-r from-clay-600/10 to-taupe-600/10 backdrop-blur-md rounded-3xl p-12 border border-clay-500/30 shadow-2xl text-center overflow-hidden"
    >
      {/* Inner floating light effect */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-clay-400/20 to-taupe-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-taupe-400/20 to-clay-400/10 rounded-full blur-3xl animate-pulse-slower"></div>

      <div className="relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-200 via-clay-100 to-clay-300 drop-shadow-md">
            Ready to Transform
          </span>
          <span className="block text-clay-100">Your Living Room?</span>
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-clay-300/90 mb-10 max-w-3xl mx-auto leading-relaxed">
          Join hundreds of satisfied customers who’ve turned their living rooms
          into intelligent entertainment spaces.  
          Get your free consultation and custom quote today.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-10 py-5 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-3 group bg-gradient-to-r from-clay-600 to-taupe-700 text-white shadow-lg hover:shadow-xl hover:from-clay-700 hover:to-taupe-800 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <span>Request a Tailored Quote</span>
          </button>

          <a
            href="tel:+441417393377"
            className="border-2 border-clay-500/50 text-clay-200 px-10 py-5 rounded-2xl hover:bg-clay-500/10 hover:border-clay-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3 group"
          >
            <Phone className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <span>Call: +44 141 739 3377</span>
          </a>
        </div>
      </div>
    </motion.div>
  </div>
</section>
 
      <Footer />

      {/* Quote Modal */} 
      <SwQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      /> 
    </div> 
  ); 
}; 

export default SmartWallLivingRoom;