import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import FinishesSection from '@/components/FinishesSection';
import Footer from '@/components/Footer';
import SwQuoteModal from '@/components/SwQuoteModal';
import {
  Hotel,
  BedDouble,
  Lightbulb,
  MapPin,
  CheckCircle,
  ArrowRight,
  Search,
  Palette,
  Settings,
  Users,
  Building,
  DoorOpen,
  Droplets,
  Tv,
  ChevronRight,
  ChevronDown,
  Sun,
  MessageCircle,
  Phone,
  Utensils,
  Gem,
  Presentation,
  PanelsTopLeft,
  Shield,
  Zap,
  Clock,
  Mail,
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
      setMetaTag('og:image:alt', 'Smart Walls for Hotels by The Wall Shop', true);
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
      "email": "stephen@thewallshop.co.uk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SMK Business Centre, 4 The Piazza",
        "addressLocality": "Glasgow",
        "postalCode": "G5 8BE",
        "addressCountry": "GB"
      },
      "knowsAbout": [
        "hotel feature wall",
        "acoustic wall cladding",
        "digital signage",
        "wayfinding",
        "energy management",
        "occupancy sensors",
        "Orvibo MixPad",
        "Shezhi WPC panels",
        "RGBW ambient scenes",
        "Dolby Atmos lobby lounge",
        "hotel interior design",
        "hospitality technology",
        "smart hotel solutions"
      ]
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Smart Wall for Hotels",
      "description": "Transform hotel lobbies, suites, and ballrooms with modular Smart Walls—acoustic, durable finishes, Orvibo scene control, and UK installation.",
      "provider": organizationSchema,
      "areaServed": "United Kingdom",
      "serviceType": "Smart Wall Installation for Hotels",
      "category": "Hotel Interior Design",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "GBP",
        "description": "Custom smart wall solutions for hotels from consultation to full installation"
      }
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "The Wall Shop",
      "description": "Professional smart wall installation specialists serving hotels across the UK",
      "url": "https://www.thewallshop.co.uk",
      "telephone": "+44 141 739 3377",
      "email": "stephen@thewallshop.co.uk",
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
      "openingHours": "Mo-Fr 09:00-18:00 PST",
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
          "name": "Hotels",
          "item": "https://www.thewallshop.co.uk/smart-walls/hotels"
        }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do Smart Walls handle fire safety in hotels?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Smart Wall systems are designed with fire-retardant materials and comply with relevant building and safety regulations for hotels. We provide certifications and work with your fire safety officers to ensure full compliance."
          }
        },
        {
          "@type": "Question",
          "name": "Can we re-theme scenes for events or seasons?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our integrated control systems allow hotel staff to easily re-theme lighting, digital displays, and audio scenes for different events, seasons, or guest preferences, ensuring a dynamic and engaging environment."
          }
        },
        {
          "@type": "Question",
          "name": "What’s the typical install time per zone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Installation time varies by complexity and zone size, but our modular systems are designed for rapid deployment. We often complete installations overnight or in phases to minimize disruption to hotel operations and guest experience."
          }
        },
        {
          "@type": "Question",
          "name": "Are finishes cleanable and scuff-resistant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our WPC (Wood Plastic Composite) and Carbon Rock Board finishes are specifically chosen for their durability, ease of cleaning, and resistance to scuffs and impacts, making them ideal for high-traffic hotel environments."
          }
        },
        {
          "@type": "Question",
          "name": "Can Smart Walls integrate with existing PMS/BMS systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Smart Wall systems are designed for seamless integration with Property Management Systems (PMS) and Building Management Systems (BMS). This allows for automated control based on occupancy, scheduling, and energy management, optimizing operational efficiency."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer ongoing maintenance and support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide comprehensive aftercare and maintenance packages to ensure your Smart Wall system operates flawlessly. This includes regular check-ups, software updates, and prompt technical support."
          }
        }
      ]
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Implement Smart Walls in Your Hotel",
      "description": "A step-by-step guide to transforming your hotel with intelligent wall systems.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Discovery & Consultation",
          "text": "We begin with a detailed consultation to understand your hotel's unique needs, brand identity, and operational requirements."
        },
        {
          "@type": "HowToStep",
          "name": "Design & Mockups",
          "text": "Our design team creates custom layouts, visual mockups, and technical specifications, integrating smart devices and premium finishes."
        },
        {
          "@type": "HowToStep",
          "name": "Installation & Commissioning",
          "text": "Experienced technicians perform rapid, low-disruption installation, followed by thorough system commissioning and testing."
        },
        {
          "@type": "HowToStep",
          "name": "Aftercare & Support",
          "text": "We provide comprehensive training for your staff and ongoing maintenance and support to ensure long-term performance."
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

const SmartWallHotels: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Orvibo Smart Devices for Hotels
  const orviboDevices = [
    {
      key: "mixPad",
      title: "MixPad D1 Smart Panel",
      category: "Room Control",
      desc: "Centralized control for lighting, climate, and entertainment, enhancing guest comfort and operational efficiency.",
      features: ["Scene presets", "Intercom", "Guest services integration"],
      Icon: PanelsTopLeft,
    },
    {
      key: "smartSwitch",
      title: "Smart Switch & Dimmer",
      category: "Lighting Control",
      desc: "Intuitive control over room lighting, with dimming capabilities and energy-saving schedules.",
      features: ["Touch control", "Remote access", "Energy monitoring"],
      Icon: Lightbulb,
    },
    {
      key: "smartCurtain",
      title: "Smart Curtain System",
      category: "Privacy & Ambiance",
      desc: "Automated curtain control for blackout, privacy, and natural light management in suites and ballrooms.",
      features: ["Automated schedules", "Remote operation", "Quiet motor"],
      Icon: BedDouble,
    },
    {
      key: "skyDome",
      title: "Sky Dome Lighting",
      category: "Ambiance Lighting",
      desc: "Simulates natural daylight cycles and creates dynamic sky effects for lobbies and wellness areas.",
      features: ["Circadian rhythm", "Dynamic scenes", "Energy efficient"],
      Icon: Sun,
    },
    {
      key: "doorSensor",
      title: "Door & Occupancy Sensors",
      category: "Energy & Security",
      desc: "Automates lighting and HVAC based on room occupancy, optimizing energy use and guest experience.",
      features: ["Energy saving", "Security alerts", "PMS integration"],
      Icon: DoorOpen,
    }
  ];

  // Hotel-Specific Wall Panel Finishes
   

  // Features data with hotel focus
  const features = [
    {
      icon: <Hotel className="w-8 h-8" />,
      title: "Enhanced Guest Experience",
      description: "Create memorable stays with personalized ambiance, intuitive room controls, and seamless technology integration.",
      gradient: "from-clay-500 to-taupe-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Dynamic Ambiance Control",
      description: "Adjust lighting, temperature, and media to match guest preferences or specific hotel events, from vibrant lobbies to serene spas.",
      gradient: "from-taupe-500 to-clay-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Durable & Hygienic Finishes",
      description: "Utilize high-quality, easy-to-clean, and scuff-resistant materials ideal for high-traffic hotel environments, ensuring longevity and pristine appearance.",
      gradient: "from-clay-600 to-taupe-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Energy Efficiency & Savings",
      description: "Integrate occupancy sensors and smart scheduling to optimize energy consumption in rooms and common areas, reducing operational costs.",
      gradient: "from-taupe-400 to-clay-500"
    },
    {
      icon: <Tv className="w-8 h-8" />,
      title: "Integrated Digital Signage",
      description: "Seamlessly embed digital displays for wayfinding, promotions, event schedules, and personalized guest messages, enhancing communication.",
      gradient: "from-clay-500 to-taupe-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Rapid, Low-Disruption Installation",
      description: "Modular design allows for quick installation, often overnight or in phases, minimizing downtime and ensuring continuous hotel operation.",
      gradient: "from-taupe-600 to-clay-400"
    }
  ];

  // Hotel use cases
  const useCases = [
    {
      title: "Lobby & Reception",
      description: "Create a stunning first impression with dynamic lighting, digital welcome screens, and integrated sound for a luxurious and inviting atmosphere.",
      icon: <Building className="w-6 h-6" />,
      features: ["Brand storytelling", "Digital signage", "Ambient scenes", "Integrated audio"]
    },
    {
      title: "Guest Suites",
      description: "Enhance guest comfort with intuitive smart controls for lighting, curtains, and entertainment, all seamlessly integrated into elegant wall designs.",
      icon: <BedDouble className="w-6 h-6" />,
      features: ["Personalized ambiance", "Blackout curtains", "Hidden cabling", "Intuitive controls"]
    },
    {
      title: "Corridors & Wayfinding",
      description: "Implement intelligent lighting for safety and ambiance, with integrated digital wayfinding to guide guests effortlessly through the hotel.",
      icon: <ArrowRight className="w-6 h-6" />,
      features: ["Smart lighting", "Digital wayfinding", "Emergency integration", "Durable finishes"]
    },
    {
      title: "Conference & Banqueting",
      description: "Flexible wall systems with integrated AV, dynamic lighting, and acoustic treatments for versatile event spaces that adapt to any occasion.",
      icon: <Presentation className="w-6 h-6" />,
      features: ["Acoustic control", "Integrated AV", "Dynamic lighting", "Quick re-theming"]
    },
    {
      title: "Spa & Wellness",
      description: "Design serene and calming environments with humidity-resistant finishes, therapeutic lighting, and integrated soundscapes for ultimate relaxation.",
      icon: <Droplets className="w-6 h-6" />,
      features: ["Humidity resistant", "Calming scenes", "Soundscapes", "Easy clean"]
    },
    {
      title: "Hotel Restaurants & Bars",
      description: "Optimize dining ambiance with adjustable lighting, acoustic panels for noise control, and digital menus for a modern guest experience.",
      icon: <Utensils className="w-6 h-6" />,
      features: ["Acoustic comfort", "Digital menus", "Ambiance lighting", "Hygienic surfaces"]
    }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "How do Smart Walls handle fire safety in hotels?",
      answer: "Our Smart Wall systems are designed with fire-retardant materials and comply with relevant building and safety regulations for hotels. We provide certifications and work with your fire safety officers to ensure full compliance."
    },
    {
      question: "Can we re-theme scenes for events or seasons?",
      answer: "Absolutely. Our integrated control systems allow hotel staff to easily re-theme lighting, digital displays, and audio scenes for different events, seasons, or guest preferences, ensuring a dynamic and engaging environment."
    },
    {
      question: "What’s the typical install time per zone?",
      answer: "Installation time varies by complexity and zone size, but our modular systems are designed for rapid deployment. We often complete installations overnight or in phases to minimize disruption to hotel operations and guest experience."
    },
    {
      question: "Are finishes cleanable and scuff-resistant?",
      answer: "Yes, our WPC (Wood Plastic Composite) and Carbon Rock Board finishes are specifically chosen for their durability, ease of cleaning, and resistance to scuffs and impacts, making them ideal for high-traffic hotel environments."
    },
    {
      question: "Can Smart Walls integrate with existing PMS/BMS systems?",
      answer: "Our Smart Wall systems are designed for seamless integration with Property Management Systems (PMS) and Building Management Systems (BMS). This allows for automated control based on occupancy, scheduling, and energy management, optimizing operational efficiency."
    },
    {
      question: "Do you offer ongoing maintenance and support?",
      answer: "Yes, we provide comprehensive aftercare and maintenance packages to ensure your Smart Wall system operates flawlessly. This includes regular check-ups, software updates, and prompt technical support."
    }
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      step: 1,
      title: "Discovery & Consultation",
      description: "We begin with a detailed consultation to understand your hotel's unique needs, brand identity, and operational requirements.",
      icon: <Search className="w-8 h-8" />
    },
    {
      step: 2,
      title: "Design & Mockups",
      description: "Our design team creates custom layouts, visual mockups, and technical specifications, integrating smart devices and premium finishes.",
      icon: <Palette className="w-8 h-8" />
    },
    {
      step: 3,
      title: "Installation & Commissioning",
      description: "Experienced technicians perform rapid, low-disruption installation, followed by thorough system commissioning and testing.",
      icon: <Settings className="w-8 h-8" />
    },
    {
      step: 4,
      title: "Aftercare & Support",
      description: "We provide comprehensive training for your staff and ongoing maintenance and support to ensure long-term performance.",
      icon: <Users className="w-8 h-8" />
    }
  ];

  // Case study snippets
  const caseStudies = [
    {
      title: "Luxury Boutique Hotel",
      location: "Edinburgh",
      challenge: "Create unique guest experiences and reduce energy consumption.",
      solution: "Smart Walls with integrated occupancy sensors and personalized ambiance control in suites.",
      result: "20% reduction in energy costs and significant increase in guest satisfaction scores."
    },
    {
      title: "Conference Hotel Refurbishment",
      location: "Manchester",
      challenge: "Upgrade conference facilities with flexible, high-tech solutions.",
      solution: "Modular Smart Walls with integrated AV, dynamic lighting, and acoustic panels for multi-purpose ballrooms.",
      result: "Increased booking rates for events and enhanced client feedback on facility quality."
    },
    {
      title: "Spa & Wellness Center",
      location: "Lake District",
      challenge: "Design a serene environment with durable, humidity-resistant materials.",
      solution: "Smart Walls featuring calming light scenes, integrated soundscapes, and specialized WPC finishes.",
      result: "Improved guest relaxation and positive reviews highlighting the tranquil atmosphere."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <SEOHead
        title="Smart Walls for Hotels | Luxury Lobbies, Suites & Conferencing | The Wall Shop"
        description="Transform hotel lobbies, suites and ballrooms with modular Smart Walls—acoustic, durable finishes, Orvibo scene control and UK installation."
        canonical="https://www.thewallshop.co.uk/smart-walls/hotels"
        keywords="smart hotel walls, luxury hotel interiors, hotel digital signage, hotel acoustic panels, Orvibo hotel solutions, hotel energy management, hotel room automation, UK hotel installation"
        ogImage="https://www.thewallshop.co.uk/images/smart-walls/hotels-hero.webp"
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
                Hotels & Hospitality
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-clay-300 max-w-4xl mx-auto leading-relaxed">
              Elevate guest experiences and optimize operations with intelligent wall systems for luxury lobbies, 
              suites, conference halls, and wellness areas. 
            </p>
          </motion.div>

          {/* Trust Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12 max-w-4xl mx-auto"
          >
            {[ 
              { icon: <MapPin className="w-5 h-5" />, label: "UK-based" }, 
              { icon: <CheckCircle className="w-5 h-5" />, label: "Professional Installation" }, 
              { icon: <Shield className="w-5 h-5" />, label: "Aftercare & Maintenance" } 
            ].map((chip, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 px-5 py-3 rounded-full bg-gradient-to-r from-clay-600/30 to-taupe-700/30 text-white text-lg font-semibold border border-clay-500/40"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {chip.icon}
                <span>{chip.label}</span>
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
              <span className="z-10">Design Your Smart Wall</span>
            </motion.button>
            <motion.a
              href="mailto:stephen@thewallshop.co.uk"
              className="border-2 border-clay-500/50 text-clay-200 px-8 py-4 rounded-2xl hover:bg-clay-500/10 hover:border-clay-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Book a Free Consultation</span>
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
            <span className="text-clay-200">Hotels</span>
          </nav>
        </div>
      </section>

      {/* Features Grid (Value Propositions) */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Hotel Smart Wall</span>
              <span className="block text-clay-100 mt-2">Advantages</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Discover how intelligent wall systems enhance every aspect of your hotel, from guest comfort to operational efficiency.
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Orvibo Hotel</span>
              <span className="block text-clay-100 mt-2">Smart Devices</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Integrate cutting-edge Orvibo smart technology for seamless control and enhanced guest comfort.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Hotel Panel Finishes Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Premium Hotel</span>
              <span className="block text-clay-100 mt-2">Finishes</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Select from a range of durable, elegant, and easy-to-maintain finishes perfect for any hotel environment.
            </p>
          </motion.div>

            <FinishesSection
                         // categories={FINISH_CATEGORIES_DEFAULT} // ← override or filter if you like
                           defaultMaxVisible={8}
                           helperBadges={["Acoustic-aware", "Scratch-resistant"]}
                           id="finishes"
                           className=""
                         />
        </div>
      </section>

      {/* Hotel Use Cases Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Hotel</span>
              <span className="block text-clay-100 mt-2">Scenarios</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Tailored Smart Wall solutions for every area of your hotel, enhancing functionality and aesthetics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-taupe-900 to-clay-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Hotel</span>
              <span className="block text-clay-100 mt-2">Gallery</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Explore how Smart Walls transform hotel spaces into modern, functional, and aesthetically pleasing environments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Luxury Lobby", img: "/images/gallery/hotel-lobby.jpg", desc: "Dynamic lighting and digital welcome screens" },
              { title: "Executive Suite", img: "/images/gallery/hotel-suite.jpg", desc: "Integrated controls for ultimate guest comfort" },
              { title: "Conference Hall", img: "/images/gallery/hotel-conference.jpg", desc: "Flexible AV and acoustic solutions" },
              { title: "Spa & Pool Area", img: "/images/gallery/hotel-spa.jpg", desc: "Humidity-resistant and calming finishes" },
              { title: "Corridor Wayfinding", img: "/images/gallery/hotel-corridor.jpg", desc: "Intelligent lighting and digital signage" },
              { title: "Hotel Restaurant", img: "/images/gallery/hotel-restaurant.jpg", desc: "Ambiance control and hygienic surfaces" }
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
      </section> */}

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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Our Process</span>
              <span className="block text-clay-100 mt-2">How It Works</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              From initial consultation to ongoing support, we ensure a seamless integration of Smart Walls into your hotel.
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Hotel Success</span>
              <span className="block text-clay-100 mt-2">Highlights</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Real-world outcomes from hotels that have transformed their spaces with our Smart Wall solutions.
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
              Everything you need to know about Smart Wall integration in hotels and hospitality.
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
              <h3 className="text-2xl font-bold text-white">UK Nationwide Hotel Support</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-clay-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Glasgow HQ</h4>
                <p className="text-sm">SMK Business Centre, 4 The Piazza, Glasgow G5 8BE. Central hub for design, project management, and support for all UK hotel installations.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">UK Coverage</h4>
                <p className="text-sm">Dedicated installation teams and support network across England, Scotland, Wales, and Northern Ireland, ensuring rapid deployment and service.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Hospitality Specialists</h4>
                <p className="text-sm">Expertise in integrating smart technology into diverse hotel environments, from boutique to large-scale chains, focusing on guest satisfaction and operational efficiency.</p>
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
              <span className="block text-clay-100 mt-2">Hotel Today</span>
            </h2>
            <p className="text-xl text-clay-300 mb-10 max-w-3xl mx-auto">
              Partner with The Wall Shop to create intelligent, luxurious, and efficient hotel spaces that delight guests and optimize operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2 group relative overflow-hidden bg-gradient-to-r from-clay-600 to-taupe-700 text-white shadow-lg hover:from-clay-700 hover:to-taupe-800 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" />
                <span className="z-10">Get a Hotel Quote</span>
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
                <span>UK Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Comprehensive Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Dedicated Aftercare</span>
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

export default SmartWallHotels;