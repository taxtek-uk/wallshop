import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import SwQuoteModal from '@/components/SwQuoteModal';
import { 
  Utensils, 
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
  Gem,
  Headphones,
  Thermometer,
  Sparkle,
  Menu,
  Gauge,
  Wifi as WifiIcon,
  Megaphone
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
      setMetaTag('og:image:alt', 'Smart Restaurant Wall by The Wall Shop', true); 
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
      },
      "knowsAbout": [
        "restaurant interior design",
        "acoustic wall panels",
        "smart restaurant technology",
        "dining ambience control",
        "commercial wall installations",
        "restaurant lighting systems",
        "hygienic wall surfaces",
        "modular restaurant design"
      ]
    };

    const serviceSchema = { 
      "@context": "https://schema.org", 
      "@type": "Service", 
      "name": "Smart Restaurant Wall Installation", 
      "description": "Professional smart restaurant wall installation with acoustic panels, ambient lighting control, and hygienic surfaces. Transform your restaurant into an intelligent dining environment with enhanced acoustics and ambience.", 
      "provider": organizationSchema,
      "areaServed": "United Kingdom", 
      "serviceType": "Smart Wall Installation", 
      "category": "Restaurant Design", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart restaurant wall solutions from consultation to full installation" 
      } 
    }; 

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "The Wall Shop",
      "description": "Professional smart wall installation specialists serving restaurants and hospitality venues across the UK",
      "url": "https://www.thewallshop.co.uk",
      "telephone": "+44 141 739 3377",
      "email": "info@thewallshop.co.uk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SMK Business Centre, 4 The Piazza",
        "addressLocality": "Glasgow",
        "postalCode": "G5 8BE",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 55.8642,
        "longitude": -4.2518
      },
      "openingHours": "Mo-Fr 09:00-17:00",
      "priceRange": "£££"
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
          "name": "Restaurants",
          "item": "https://www.thewallshop.co.uk/smart-walls/restaurants"
        }
      ]
    };

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "Are the panels suitable for commercial kitchens?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, our WPC panels are specifically designed for commercial environments with excellent heat resistance, moisture protection, and easy-clean surfaces that meet commercial hygiene standards." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "How do smart walls improve restaurant acoustics?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Our acoustic panels reduce noise levels by up to 40%, creating a more comfortable dining atmosphere. The modular design allows targeted acoustic treatment in high-noise areas." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Can the lighting adapt to different dining periods?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. The Orvibo smart lighting system includes preset scenes for breakfast (bright), lunch (balanced), dinner (warm), and late dining (ambient) with automatic scheduling." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Are the surfaces easy to sanitise?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, all surfaces feature antimicrobial coatings and wipe-clean finishes that resist stains and bacteria, meeting commercial food safety requirements." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "How quickly can the system be installed?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Most restaurant installations are completed within 2-3 days with minimal disruption to operations. We work around your opening hours to ensure continuity." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Can staff control the system easily?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, the Orvibo MixPad provides one-touch scene control, and staff can adjust lighting and music through the smartphone app or voice commands." 
          } 
        }
      ] 
    }; 

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How Smart Restaurant Walls Work",
      "description": "Step-by-step guide to understanding smart restaurant wall functionality",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Scene Selection",
          "text": "Choose from preset dining scenes or create custom ambience settings using the MixPad control panel"
        },
        {
          "@type": "HowToStep", 
          "name": "Automatic Adjustment",
          "text": "Lighting, music, and climate automatically adjust based on time of day and occupancy levels"
        },
        {
          "@type": "HowToStep",
          "name": "Staff Control",
          "text": "Restaurant staff can override settings using smartphone app or voice commands for special events"
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
    insertJsonLd(localBusinessSchema, 'local-business-schema');
    insertJsonLd(breadcrumbSchema, 'breadcrumb-schema');
    insertJsonLd(faqSchema, 'faq-schema'); 
    insertJsonLd(howToSchema, 'howto-schema');

  }, [title, description, canonical, keywords, ogImage]); 

  return null; 
}; 

const SmartWallRestaurants: React.FC = () => { 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 

  // Orvibo Smart Devices for Restaurants
  const orviboDevices = [
    {
      key: "mixPad",
      title: "MixPad D1 Smart Panel",
      category: "Scene Control",
      desc: "One-touch dining scene control with voice intercom for seamless restaurant operations.",
      features: ["Dining scenes", "Voice intercom", "Staff control"],
      Icon: PanelsTopLeft,
    },
    {
      key: "smartLighting",
      title: "Smart Lighting System",
      category: "Ambience Control",
      desc: "Dynamic lighting scenes that adapt to dining periods and create the perfect atmosphere.",
      features: ["Scene presets", "Dimming control", "Colour temperature"],
      Icon: LampCeiling,
    },
    {
      key: "smartMusic",
      title: "Background Music System",
      category: "Audio Control",
      desc: "Distributed audio system with zone control for different dining areas.",
      features: ["Zone control", "Playlist management", "Volume automation"],
      Icon: Speaker,
    },
    {
      key: "smartClimate",
      title: "Climate Control",
      category: "Comfort",
      desc: "Intelligent temperature and air quality management for optimal dining comfort.",
      features: ["Auto scheduling", "Zone control", "Energy efficiency"],
      Icon: Fan,
    }
  ];

  // Restaurant-Specific Wall Panel Finishes
  const finishCategories = [
    {
      id: 'acoustic',
      name: "Acoustic Dining Series",
      desc: "Sound-absorbing panels that reduce noise and enhance conversation.",
      icon: Headphones,
      panels: [
        { id: "A8026", name: "Warm Oak", desc: "Natural oak texture with acoustic foam backing", img: "/images/carbon-rock-boards/wood/1.jpg" },
        { id: "A8039", name: "Soft Linen", desc: "Fabric-look finish with superior sound absorption", img: "/images/carbon-rock-boards/solid/4.jpg" },
        { id: "A8008", name: "Charcoal Felt", desc: "Modern felt texture with premium acoustic properties", img: "/images/carbon-rock-boards/solid/7.jpg" }
      ]
    },
    {
      id: 'hygienic',
      name: "Hygienic Commercial Series",
      desc: "Easy-clean surfaces with antimicrobial properties for food service areas.",
      icon: Shield,
      panels: [
        { id: "H9016", name: "Pure White", desc: "Antimicrobial white finish for kitchen areas", img: "/images/carbon-rock-boards/solid/2.jpg" },
        { id: "H9051", name: "Steel Grey", desc: "Industrial grey with stain-resistant coating", img: "/images/carbon-rock-boards/stone/4.jpg" },
        { id: "H9015", name: "Midnight Black", desc: "Sophisticated black with easy-clean surface", img: "/images/carbon-rock-boards/solid/7.jpg" }
      ]
    },
    {
      id: 'feature',
      name: "Feature Wall Collection",
      desc: "Statement panels that create focal points and brand identity.",
      icon: Sparkle,
      panels: [
        { id: "F3231", name: "Marble Elegance", desc: "Luxury marble pattern for upscale dining", img: "/images/carbon-rock-boards/stone/1.jpg" },
        { id: "F3017", name: "Rustic Brick", desc: "Exposed brick texture for casual dining", img: "/images/carbon-rock-boards/stone/4.jpg" },
        { id: "F3204", name: "Industrial Concrete", desc: "Modern concrete finish for contemporary spaces", img: "/images/carbon-rock-boards/stone/5.jpg" }
      ]
    }
  ];

  // Features data with restaurant focus
  const features = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Acoustic Comfort",
      description: "Sound-absorbing panels reduce noise levels by up to 40%, creating a comfortable dining atmosphere that enhances conversation and customer experience.",
      gradient: "from-clay-500 to-taupe-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Hygienic Surfaces",
      description: "Antimicrobial coatings and easy-clean finishes meet commercial food safety standards with superior stain and bacteria resistance.",
      gradient: "from-taupe-500 to-clay-600"
    },
    {
      icon: <LampCeiling className="w-8 h-8" />,
      title: "Dining Scene Lighting",
      description: "Orvibo smart lighting adapts to dining periods - bright for breakfast, warm for dinner, with automatic scheduling and manual override.",
      gradient: "from-clay-600 to-taupe-400"
    },
    {
      icon: <Menu className="w-8 h-8" />,
      title: "Digital Menu Integration",
      description: "Built-in display mounting for digital menus and promotional content with concealed cable management and easy updates.",
      gradient: "from-taupe-400 to-clay-500"
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Climate Zoning",
      description: "Intelligent temperature control for different dining areas with energy-efficient operation and guest comfort optimisation.",
      gradient: "from-clay-500 to-taupe-600"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Staff Communication",
      description: "Integrated intercom system allows seamless communication between front-of-house and kitchen staff through MixPad panels.",
      gradient: "from-taupe-600 to-clay-400"
    }
  ];

  // Restaurant use cases
  const useCases = [
    {
      title: "Fine Dining Ambience",
      description: "Create an intimate atmosphere with warm lighting, acoustic comfort, and elegant finishes that enhance the premium dining experience.",
      icon: <Star className="w-6 h-6" />,
      features: ["Warm lighting scenes", "Acoustic panels", "Luxury finishes", "Climate control"]
    },
    {
      title: "Casual Dining Energy",
      description: "Maintain a lively atmosphere with dynamic lighting, background music control, and easy-clean surfaces for high-turnover environments.",
      icon: <Users className="w-6 h-6" />,
      features: ["Dynamic lighting", "Music zones", "Hygienic surfaces", "Quick cleaning"]
    },
    {
      title: "Kitchen Integration",
      description: "Seamless connection between dining and kitchen areas with intercom systems, display integration, and commercial-grade hygiene.",
      icon: <Utensils className="w-6 h-6" />,
      features: ["Staff intercom", "Digital displays", "Heat resistance", "Easy maintenance"]
    },
    {
      title: "Brand Experience",
      description: "Reinforce brand identity with customisable feature walls, integrated displays, and programmable lighting that reflects your restaurant's personality.",
      icon: <Palette className="w-6 h-6" />,
      features: ["Custom finishes", "Brand colours", "Digital integration", "Flexible layouts"]
    }
  ];

  // FAQ Data 
  const faqData = [ 
    { 
      question: "Are the panels suitable for commercial kitchens?", 
      answer: "Yes, our WPC panels are specifically designed for commercial environments with excellent heat resistance, moisture protection, and easy-clean surfaces that meet commercial hygiene standards." 
    }, 
    { 
      question: "How do smart walls improve restaurant acoustics?", 
      answer: "Our acoustic panels reduce noise levels by up to 40%, creating a more comfortable dining atmosphere. The modular design allows targeted acoustic treatment in high-noise areas." 
    },
    { 
      question: "Can the lighting adapt to different dining periods?", 
      answer: "Absolutely. The Orvibo smart lighting system includes preset scenes for breakfast (bright), lunch (balanced), dinner (warm), and late dining (ambient) with automatic scheduling." 
    },
    { 
      question: "Are the surfaces easy to sanitise?", 
      answer: "Yes, all surfaces feature antimicrobial coatings and wipe-clean finishes that resist stains and bacteria, meeting commercial food safety requirements." 
    },
    { 
      question: "How quickly can the system be installed?", 
      answer: "Most restaurant installations are completed within 2-3 days with minimal disruption to operations. We work around your opening hours to ensure continuity." 
    },
    { 
      question: "Can staff control the system easily?", 
      answer: "Yes, the Orvibo MixPad provides one-touch scene control, and staff can adjust lighting and music through the smartphone app or voice commands." 
    }
  ]; 

  // How it works steps
  const howItWorksSteps = [
    {
      step: 1,
      title: "Restaurant Assessment",
      description: "We analyse your dining space, acoustics, lighting needs, and operational requirements to design the perfect smart wall solution.",
      icon: <Search className="w-8 h-8" />
    },
    {
      step: 2,
      title: "Custom Design",
      description: "Create a tailored design incorporating acoustic panels, smart devices, and finishes that match your restaurant's brand and atmosphere.",
      icon: <Palette className="w-8 h-8" />
    },
    {
      step: 3,
      title: "Professional Installation",
      description: "Our certified installers complete the installation with minimal disruption, working around your operating hours to ensure continuity.",
      icon: <Settings className="w-8 h-8" />
    },
    {
      step: 4,
      title: "Staff Training",
      description: "Comprehensive training on the Orvibo system ensures your staff can easily control lighting, music, and scenes for optimal dining experiences.",
      icon: <Users className="w-8 h-8" />
    }
  ];

  // Case study snippets
  const caseStudies = [
    {
      title: "The Merchant City Bistro",
      location: "Glasgow",
      challenge: "Excessive noise levels affecting customer experience",
      solution: "Acoustic panels reduced noise by 35%, improving customer satisfaction scores by 28%",
      result: "Increased average dining time and positive reviews"
    },
    {
      title: "Riverside Restaurant",
      location: "Edinburgh", 
      challenge: "Inconsistent lighting affecting ambience throughout the day",
      solution: "Smart lighting system with automated scenes for different dining periods",
      result: "Enhanced atmosphere and 15% increase in evening bookings"
    },
    {
      title: "Urban Kitchen",
      location: "Manchester",
      challenge: "Difficult to maintain hygiene standards in open kitchen design",
      solution: "Hygienic wall panels with antimicrobial coating and easy-clean surfaces",
      result: "Improved hygiene ratings and reduced cleaning time by 40%"
    }
  ];

  return ( 
    <div className="min-h-screen bg-gray-950"> 
      <SEOHead 
        title="Smart Walls for Restaurants | Acoustic, Hygienic & Ambient Dining | The Wall Shop"
        description="Transform your restaurant with smart walls featuring acoustic panels, hygienic surfaces, and Orvibo ambient lighting. Professional installation with staff-friendly controls across the UK."
        canonical="https://www.thewallshop.co.uk/smart-walls/restaurants"
        keywords="smart restaurant walls, acoustic panels restaurant, restaurant lighting control, hygienic wall panels, commercial wall installation, restaurant ambience, dining atmosphere, orvibo restaurant"
        ogImage="https://www.thewallshop.co.uk/images/smart-walls/restaurant-hero.webp"
      /> 
      
      <Navigation /> 

      {/* Hero Section */} 
      <section className="relative min-h-screen flex flex-col justify-start md:justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-clay-950 to-taupe-950 overflow-hidden"> 
        {/* Background Elements */} 
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-clay-900/20 via-transparent to-transparent"></div> 
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-clay-500/10 rounded-full blur-3xl animate-pulse"></div> 
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-taupe-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div> 

        <div className="relative z-10 max-w-7xl mx-auto text-center pt-20 md:pt-0"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="mb-8" 
          > 
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400"> 
                Smart Walls for 
              </span> 
              <br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-taupe-300 via-taupe-200 to-taupe-400"> 
                Restaurants 
              </span> 
            </h1> 
            <p className="text-xl md:text-2xl text-clay-300 max-w-4xl mx-auto leading-relaxed"> 
              Transform your dining space with intelligent walls that enhance acoustics, create perfect ambience, 
              and maintain commercial hygiene standards. Professional installation with staff-friendly controls. 
            </p> 
          </motion.div> 

          {/* Key Stats */} 
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }} 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto" 
          > 
            {[ 
              { icon: <Headphones className="w-8 h-8" />, value: "40%", label: "Noise Reduction" }, 
              { icon: <Shield className="w-8 h-8" />, value: "24/7", label: "Hygiene Protection" }, 
              { icon: <LampCeiling className="w-8 h-8" />, value: "Auto", label: "Scene Control" }, 
              { icon: <Mic className="w-8 h-8" />, value: "Voice", label: "Staff Control" } 
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
              <span className="z-10">Request Restaurant Quote</span> 
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
            <span className="text-clay-200">Restaurants</span>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Smart Restaurant</span> 
              <span className="block text-clay-100 mt-2">Features</span> 
            </h2> 
            <p className="text-xl text-clay-300 max-w-4xl mx-auto"> 
              Experience the perfect blend of acoustic comfort, hygienic surfaces, and intelligent automation  
              that transforms your restaurant into a sophisticated dining destination. 
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Orvibo Restaurant</span>
              <span className="block text-clay-100 mt-2">Smart Automation</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Professional-grade Orvibo smart home devices designed specifically for restaurant environments.
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

      {/* Restaurant Panel Finishes Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Restaurant-Grade Panel</span>
              <span className="block text-clay-100 mt-2">Finish Options</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Specially selected finishes with enhanced acoustic properties, hygiene protection, and visual appeal for restaurant environments.
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
                          loading="lazy"
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

      {/* Restaurant Use Cases Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Restaurant</span>
              <span className="block text-clay-100 mt-2">Use Cases</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Tailored solutions for different restaurant types and dining experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-taupe-800/40 backdrop-blur-sm rounded-xl p-8 border border-clay-500/20 hover:border-clay-400/40 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-clay-500 to-taupe-500 rounded-lg flex items-center justify-center">
                    {useCase.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{useCase.title}</h3>
                </div>
                <p className="text-clay-300 mb-6">{useCase.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {useCase.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-clay-400" />
                      <span className="text-sm text-clay-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Restaurant</span>
              <span className="block text-clay-100 mt-2">Gallery</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              See how smart walls transform restaurant spaces across the UK.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
  { title: "Fine Dining Ambience", img: "/images/smart-walls/restaurant/1.webp", desc: "Elegant acoustic panels with warm lighting" },
  { title: "Casual Dining Energy", img: "/images/smart-walls/restaurant/2.webp", desc: "Dynamic lighting with easy-clean surfaces" },
  { title: "Open Kitchen Design", img: "/images/smart-walls/restaurant/3.webp", desc: "Hygienic panels with integrated displays" },
  { title: "Private Dining Room", img: "/images/smart-walls/restaurant/4.webp", desc: "Acoustic comfort with luxury finishes" },
  { title: "Bar Area Integration", img: "/images/smart-walls/restaurant/5.webp", desc: "Feature walls with smart lighting" },
  { title: "Outdoor Dining Extension", img: "/images/smart-walls/restaurant/6.webp", desc: "Weather-resistant panels with climate control" }
].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-clay-800/40 rounded-xl overflow-hidden border border-clay-600/30 hover:border-clay-500/50 transition-all duration-300"
              >
                <div className="aspect-video bg-clay-700/30 relative overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">How It</span>
              <span className="block text-clay-100 mt-2">Works</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              From initial consultation to staff training, we handle every aspect of your restaurant transformation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-clay-500 to-taupe-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-white">{step.icon}</div>
                </div>
                <div className="w-8 h-8 bg-clay-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-clay-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Success</span>
              <span className="block text-clay-100 mt-2">Stories</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Real results from restaurants across the UK that have transformed their spaces with smart walls.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-taupe-800/40 backdrop-blur-sm rounded-xl p-6 border border-clay-500/20"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-4 h-4 text-clay-400" />
                  <span className="text-clay-400 text-sm">{study.location}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{study.title}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-clay-400">Challenge:</span>
                    <p className="text-clay-300">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="text-clay-400">Solution:</span>
                    <p className="text-clay-300">{study.solution}</p>
                  </div>
                  <div>
                    <span className="text-clay-400">Result:</span>
                    <p className="text-clay-300">{study.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Everything you need to know about smart restaurant wall installation and dining automation 
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

      {/* Local Signals Section */}
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
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">UK Nationwide Installation</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-clay-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Glasgow HQ</h4>
                <p className="text-sm">SMK Business Centre, 4 The Piazza, Glasgow G5 8BE. Professional consultation and project management from our Scottish headquarters.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">UK Coverage</h4>
                <p className="text-sm">Certified installers across England, Scotland, Wales, and Northern Ireland. Local support with national expertise.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Restaurant Focus</h4>
                <p className="text-sm">Specialising in hospitality venues with experience in fine dining, casual restaurants, pubs, and commercial kitchens.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-clay-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Transform Your</span>
              <span className="block text-clay-100 mt-2">Restaurant Today</span>
            </h2>
            <p className="text-xl text-clay-300 mb-10 max-w-3xl mx-auto">
              Join hundreds of UK restaurants that have enhanced their dining experience with smart walls. 
              Professional installation, staff training, and ongoing support included.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2 group relative overflow-hidden bg-gradient-to-r from-clay-600 to-taupe-700 text-white shadow-lg hover:from-clay-700 hover:to-taupe-800 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" />
                <span className="z-10">Get Restaurant Quote</span>
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
            </div>

            <div className="flex items-center justify-center space-x-6 text-clay-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Professional Installation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Staff Training</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Quote Modal */} 
      <AnimatePresence>
        {isQuoteModalOpen && (
          <SwQuoteModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div> 
  ); 
}; 

export default SmartWallRestaurants;