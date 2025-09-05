import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import SwQuoteModal from '@/components/SwQuoteModal';
import { 
  ChefHat, 
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
  Droplets,
  Flame,
  Mic,
  PanelsTopLeft,
  LampCeiling,
  Fan,
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
      setMetaTag('og:image:alt', 'Smart Kitchen Wall by The Wall Shop', true); 
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
      "name": "Smart Kitchen Wall Installation", 
      "description": "Professional smart kitchen wall installation with splash-resistant panels, intelligent lighting control, and modular storage. Transform your kitchen into an intelligent culinary workspace.", 
      "provider": organizationSchema,
      "areaServed": "United Kingdom", 
      "serviceType": "Smart Wall Installation", 
      "category": "Kitchen Design", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart kitchen wall solutions from consultation to full installation" 
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
          "name": "Kitchen",
          "item": "https://www.thewallshop.co.uk/smart-walls/kitchen"
        }
      ]
    };

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "Are these panels heat-resistant?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, Shezhi WPC panels are specifically designed for kitchen environments with excellent heat resistance up to 80°C, making them safe for use behind cooktops and near cooking areas." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Can I use voice control in the kitchen?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. The Orvibo smart switches integrate with Amazon Alexa, Google Assistant, and Apple HomeKit, allowing hands-free control of lighting and scenes while cooking." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "How easy are the panels to clean?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Shezhi WPC panels feature a wipe-clean surface that resists stains, grease, and moisture. Simply wipe with a damp cloth or mild cleaning solution for easy maintenance." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "What lighting scenes are available?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "The system includes preset scenes for cooking (bright task lighting), dining (warm ambient), entertaining (coloured accents), and cleaning (full brightness) with custom scene creation available." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Is the system moisture-resistant?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, all components are rated for kitchen environments with IP44 moisture resistance. The WPC panels naturally resist humidity and the electrical components are fully sealed." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Can I add more storage later?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "The modular design allows easy expansion. Additional shelving units, spice racks, and storage modules can be added to the existing wall system without major modifications." 
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

const SmartWallKitchen: React.FC = () => { 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 

  // Orvibo Smart Devices for Kitchen
  const orviboDevices = [
    {
      key: "mixPad",
      title: "MixPad D1 Smart Panel",
      category: "Control Panel",
      desc: "All-in-one scene control with voice intercom, perfect for hands-free kitchen operation.",
      features: ["Touch + App + Voice", "Scene shortcuts", "Intercom"],
      Icon: PanelsTopLeft,
    },
    {
      key: "smartSwitch",
      title: "Smart Switch System",
      category: "Lighting Control",
      desc: "Programmable scenes and schedules with timer functions for kitchen automation.",
      features: ["Timer/Countdown", "Voice control", "Group control"],
      Icon: Lightbulb,
    },
    {
      key: "smartClimate",
      title: "Smart Climate Control",
      category: "HVAC",
      desc: "Zone heating and cooling with energy efficiency for optimal kitchen comfort.",
      features: ["Schedules", "Sensors", "Remote control"],
      Icon: Fan,
    },
    {
      key: "smartLighting",
      title: "Task & Ambient Lighting",
      category: "Lighting",
      desc: "Separate task and ambient lighting zones with dynamic scene control.",
      features: ["RGB scenes", "Task zones", "Voice control"],
      Icon: LampCeiling,
    }
  ];

  // Kitchen-Specific Wall Panel Finishes
  const finishCategories = [
    {
      id: 'solid',
      name: "Easy-Clean Solid Series",
      desc: "Wipe-clean surfaces perfect for kitchen environments.",
      icon: Square,
      panels: [
        { id: "T8026", name: "Ash Silver", desc: "Neutral silver-gray with stain-resistant finish", img: "/images/carbon-rock-boards/solid/2.jpg" },
        { id: "T8039", name: "Ivory", desc: "Soft ivory tone perfect for bright kitchen spaces", img: "/images/carbon-rock-boards/solid/4.jpg" },
        { id: "T8008", name: "Obsidian", desc: "Matte black with premium depth and easy maintenance", img: "/images/carbon-rock-boards/solid/7.jpg" }
      ]
    },
    {
      id: 'wood',
      name: "Moisture-Resistant Wood Grain",
      desc: "Natural wood aesthetics with kitchen-safe protection.",
      icon: TreePine,
      panels: [
        { id: "T9016", name: "Ash Grey", desc: "Light ash grain with moisture protection", img: "/images/carbon-rock-boards/wood/1.jpg" },
        { id: "T9051", name: "Walnut Mist", desc: "Mid-brown walnut with easy-clean coating", img: "/images/carbon-rock-boards/wood/2.jpg" },
        { id: "T9015", name: "Weathered Storm", desc: "Weathered texture with enhanced durability", img: "/images/carbon-rock-boards/wood/5.jpg" }
      ]
    },
    {
      id: 'stone',
      name: "Kitchen Stone Series",
      desc: "Stone-look panels with superior heat and moisture resistance.",
      icon: Gem,
      panels: [
        { id: "S3231", name: "White & Gold", desc: "Elegant stone texture with gold veining", img: "/images/carbon-rock-boards/stone/1.jpg" },
        { id: "T3017", name: "Mid Grey & White", desc: "Neutral stone pattern ideal for modern kitchens", img: "/images/carbon-rock-boards/stone/4.jpg" },
        { id: "T3204", name: "Dark Grey & Black", desc: "Bold stone texture with dramatic contrast", img: "/images/carbon-rock-boards/stone/5.jpg" }
      ]
    }
  ];

  // Features data with Orvibo integration
  const features = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Splash-Resistant WPC Panels",
      description: "Moisture and heat-resistant wood-plastic composite panels perfect for kitchen environments with easy-clean surfaces.",
      gradient: "from-clay-500 to-taupe-500"
    },
    {
      icon: <PanelsTopLeft className="w-8 h-8" />,
      title: "Orvibo MixPad D1 Control",
      description: "Intelligent scene control for cooking and dining modes with smartphone and voice integration.",
      gradient: "from-taupe-500 to-clay-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Concealed Cable Routing",
      description: "Professional cable management for kitchen appliances with hidden wiring and clean installation.",
      gradient: "from-clay-600 to-taupe-400"
    },
    {
      icon: <Archive className="w-8 h-8" />,
      title: "Easy-Clean Modular Storage",
      description: "Customisable storage solutions with wipe-clean surfaces designed specifically for kitchen use.",
      gradient: "from-taupe-400 to-clay-500"
    },
    {
      icon: <LampCeiling className="w-8 h-8" />,
      title: "Task + Ambient Lighting",
      description: "Dedicated Orvibo task lighting for cooking and ambient lighting for dining with independent control.",
      gradient: "from-clay-500 to-taupe-600"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice & App Control",
      description: "Hands-free control via Alexa, Google Assistant, or smartphone app with Orvibo smart switches.",
      gradient: "from-taupe-600 to-clay-400"
    }
  ];

  // FAQ Data 
  const faqData = [ 
    { 
      question: "Are these panels heat-resistant?", 
      answer: "Yes, our WPC panels are specifically designed for kitchen environments with excellent heat resistance up to 80°C, making them safe for use behind cooktops and near cooking areas." 
    }, 
    { 
      question: "Can I use voice control in the kitchen?", 
      answer: "Absolutely. The Orvibo smart switches integrate with Amazon Alexa, Google Assistant, and Apple HomeKit, allowing hands-free control of lighting and scenes while cooking." 
    },
    { 
      question: "How easy are the panels to clean?", 
      answer: "Our WPC panels feature a wipe-clean surface that resists stains, grease, and moisture. Simply wipe with a damp cloth or mild cleaning solution for easy maintenance." 
    },
    { 
      question: "What lighting scenes are available?", 
      answer: "The system includes preset scenes for cooking (bright task lighting), dining (warm ambient), entertaining (coloured accents), and cleaning (full brightness) with custom scene creation available." 
    },
    { 
      question: "Is the system moisture-resistant?", 
      answer: "Yes, all components are rated for kitchen environments with IP44 moisture resistance. The WPC panels naturally resist humidity and the electrical components are fully sealed." 
    },
    { 
      question: "Can I add more storage later?", 
      answer: "The modular design allows easy expansion. Additional shelving units, spice racks, and storage modules can be added to the existing wall system without major modifications." 
    }
  ]; 

  // Related searches data 
  const relatedSearches = [ 
    "kitchen smart wall modular panels uk", "smart kitchen backsplash", "kitchen ambient lighting", "voice control kitchen", 
    "modular kitchen storage", "smart kitchen automation", "kitchen led lighting", "waterproof wall panels kitchen", 
    "kitchen smart switches", "orvibo kitchen control", "wpc kitchen panels", "smart kitchen design uk" 
  ]; 

  return ( 
    <div className="min-h-screen bg-gray-950"> 
      <SEOHead 
        title="Smart Walls for Kitchens | Durable Wipe-Clean Panels | The Wall Shop"
        description="Transform your kitchen with smart walls featuring splash-resistant Shezhi WPC panels, Orvibo scene lighting, and modular storage. Professional installation with voice control integration across the UK."
        canonical="https://www.thewallshop.co.uk/smart-walls/kitchen"
        keywords="smart kitchen wall, kitchen panels uk, splash resistant panels, orvibo mixpad, kitchen lighting control, modular kitchen storage, voice control kitchen, wipe clean panels"
        ogImage="https://www.thewallshop.co.uk/images/smart-walls/kitchen-hero.webp"
      /> 
      
      <Navigation /> 

      {/* Hero Section */} 
      <section className="relative min-h-screen flex flex-col justify-start md:justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 md:pt-0">
        {/* Background Image */} 
        <div className="absolute inset-0 z-0"> 
          <img 
            src="/images/smart-walls/kitchen-hero.webp" 
            alt="Smart Kitchen Wall with integrated lighting and storage" 
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
              <ChefHat className="w-5 h-5 text-clay-300" /> 
              <span className="text-clay-100 font-medium">Culinary & Smart Technology</span> 
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
                <span className="block text-clay-50 mt-2 drop-shadow">Kitchens</span> 
              </motion.h1> 
              <motion.p 
                className="text-xl md:text-2xl text-clay-200 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              > 
                Durable, wipe-clean panels with task and ambient smart lighting. Transform your kitchen into  
                an intelligent culinary workspace with voice control and modular storage. 
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
                { icon: <Flame className="w-8 h-8" />, value: "80°C", label: "Heat Resistant" }, 
                { icon: <Star className="w-8 h-8" />, value: "4.9/5", label: "Customer Rating" }, 
                { icon: <Shield className="w-8 h-8" />, value: "IP44", label: "Moisture Rating" }, 
                { icon: <Mic className="w-8 h-8" />, value: "Voice", label: "Control Ready" } 
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
            <span className="text-clay-200">Kitchen</span>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Smart Kitchen</span> 
              <span className="block text-clay-100 mt-2">Features</span> 
            </h2> 
            <p className="text-xl text-clay-300 max-w-4xl mx-auto"> 
              Experience the perfect blend of durability, intelligent automation, and culinary functionality  
              that transforms your kitchen into a sophisticated smart workspace. 
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Orvibo Kitchen</span>
              <span className="block text-clay-100 mt-2">Smart Automation</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Professional-grade Orvibo smart home devices designed specifically for kitchen environments.
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

      {/* Kitchen Panel Finishes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-taupe-900 to-clay-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Kitchen-Safe Panel</span>
              <span className="block text-clay-100 mt-2">Finish Options</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Specially selected finishes with enhanced moisture, heat, and stain resistance for kitchen environments.
            </p>
          </motion.div>

          <div className="space-y-12">
            {finishCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-taupe-800/30 backdrop-blur-sm rounded-2xl p-8 border border-clay-500/20"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-clay-500 to-taupe-500 rounded-xl flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <p className="text-clay-300">{category.desc}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {category.panels.map((panel) => (
                    <div key={panel.id} className="bg-clay-800/40 rounded-lg overflow-hidden border border-clay-600/30 hover:border-clay-500/50 transition-all duration-300">
                      <div className="aspect-video bg-clay-700/30 relative overflow-hidden">
                        <img 
                          src={panel.img} 
                          alt={panel.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{panel.name}</h4>
                          <span className="text-xs text-white bg-clay-700/50 px-2 py-1 rounded">{panel.id}</span>
                        </div>
                        <p className="text-sm text-clay-300">{panel.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
              <h3 className="text-2xl font-bold text-white">Kitchen Safety & Compliance</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-clay-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Moisture-Resistance</h4>
                <p className="text-sm">IP44 rated components and naturally moisture-resistant WPC panels designed for kitchen environments.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">BS 7671 Wiring</h4>
                <p className="text-sm">All electrical installations comply with BS 7671 regulations for kitchen safety and performance.</p>
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
              Everything you need to know about smart kitchen wall installation and culinary automation 
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
            <p className="text-clay-300">Popular kitchen automation and smart panel searches</p> 
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
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Ready to Transform</span> 
                <span className="block text-clay-100">Your Kitchen?</span> 
              </h2> 
              <p className="text-xl text-clay-300 mb-10 max-w-3xl mx-auto"> 
                Join hundreds of satisfied customers who've transformed their kitchens into intelligent culinary workspaces.  
                Get your free consultation and custom quote today. 
              </p> 
              <div className="flex flex-col sm:flex-row gap-6 justify-center"> 
                <button 
                  onClick={() => setIsQuoteModalOpen(true)} 
                  className="px-10 py-5 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-3 group bg-gradient-to-r from-clay-600 to-taupe-700 text-white shadow-lg hover:from-clay-700 hover:to-taupe-800 transition-all duration-300" 
                > 
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                  <span>Request a Tailored Quote</span> 
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

      <Footer /> 

      {/* Quote Modal */} 
      <SwQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      /> 
    </div> 
  ); 
}; 

export default SmartWallKitchen;