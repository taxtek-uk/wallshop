import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SwQuoteModal from '@/components/SwQuoteModal';
import FinishesSection from "@/components/FinishesSection";
import {
  Gamepad,
  Headphones,
  Volume2,
  Cable,
  Lightbulb,
  Shield,
  MessageCircle,
  Phone,
  MapPin,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Search,
  Palette,
  Settings,
  Layers,
  Monitor,
  Mic,
  Sun,
  PanelsTopLeft,
  BedDouble,
  DoorOpen,
  Thermometer,
  Square,
  Gem,
  TreePine,
  ChevronRight
} from 'lucide-react';

/* ----------------------------- Types (fix TS) ----------------------------- */
type LucideIconType = React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
type FinishPanel = { id: string; name: string; img: string; desc?: string; stock?: number };
type FinishCategory = {
  id: string;
  name: string;
  desc: string;
  icon: LucideIconType;
  panels: FinishPanel[];
  // optional meta if you ever want to use them
  img?: string;
  color?: string;
  accent?: string;
};

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
        "gaming wall",
        "RGB ambient lighting",
        "dual-monitor mount",
        "console docking",
        "PC cable management",
        "acoustic wall panels",
        "blackout curtains",
        "scene control",
        "low-latency setup",
        "ventilation for consoles/PCs",
        "LED light strips",
        "sound isolation"
      ]
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Smart Gaming Walls",
      "description": "Design a pro-grade gaming wall with modular finishes, acoustic control, hidden cabling, RGB scenes and smart controls—installed across the UK.",
      "provider": organizationSchema,
      "areaServed": "United Kingdom",
      "serviceType": "Smart Gaming Wall Installation",
      "category": "Gaming Room Design",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "GBP",
        "description": "Custom smart gaming wall solutions from consultation to full installation"
      }
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "The Wall Shop",
      "description": "Professional smart wall installation specialists serving gamers across the UK",
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
          "name": "Gaming",
          "item": "https://www.thewallshop.co.uk/smart-walls/gaming"
        }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do smart gaming walls improve acoustics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our smart gaming walls incorporate acoustic panels and sound-dampening materials that reduce echo and reverberation, creating a clearer audio environment for gaming and streaming. This helps to minimize distractions and enhance immersion."
          }
        },
        {
          "@type": "Question",
          "name": "Can the walls help with heat management for consoles and PCs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our designs can include integrated ventilation solutions and strategic placement of components to ensure optimal airflow, preventing overheating of gaming consoles and high-performance PCs. This helps maintain system stability and longevity."
          }
        },
        {
          "@type": "Question",
          "name": "Are the RGB lighting scenes customizable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. The integrated RGB lighting systems are fully customizable, allowing you to create dynamic scenes for different moods—whether you're in a competitive match, streaming, watching a movie, or just relaxing. Control is intuitive via smart panels or mobile apps."
          }
        },
        {
          "@type": "Question",
          "name": "How is cable management handled?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our smart gaming walls feature hidden cable raceways and integrated power solutions, ensuring a clean, clutter-free setup. All cables for monitors, consoles, PCs, and peripherals are neatly concealed within the wall structure for a professional look."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to wall-mount heavy monitors or TVs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our wall systems are engineered for secure mounting of all gaming equipment, including large monitors and TVs. We use robust VESA-compatible mounting solutions and ensure proper structural support, providing a safe and stable setup for your gear."
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
    insertJsonLd(localBusinessSchema, 'local-business-schema');
    insertJsonLd(breadcrumbSchema, 'breadcrumb-schema');
    insertJsonLd(faqSchema, 'faq-schema');

  }, [title, description, canonical, keywords, ogImage]);

  return null;
};

const SmartGamingWall: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Local UI state for finishes expand/collapse per category
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const DEFAULT_MAX_VISIBLE = 6; // 2 rows on md (md:grid-cols-3)

  const toggleCategory = (id: string) =>
    setExpanded((s) => ({ ...s, [id]: !s[id] }));

  // Orvibo Smart Devices for Gaming
  const orviboDevices = [
    {
      key: "mixPad",
      title: "Smart Control Panel",
      category: "Central Control",
      desc: "Intuitive control for lighting, audio, and scene presets, optimizing your gaming environment.",
      features: ["Scene presets", "Intercom", "Customizable UI"],
      Icon: PanelsTopLeft,
    },
    {
      key: "smartSwitch",
      title: "Smart Switch & Dimmer",
      category: "Lighting Control",
      desc: "Precise control over gaming room lighting, with dimming and color temperature adjustments.",
      features: ["RGB control", "Scheduling", "Energy monitoring"],
      Icon: Lightbulb,
    },
    {
      key: "smartCurtain",
      title: "Smart Blackout Curtain",
      category: "Glare Control",
      desc: "Automated curtains for instant blackout, perfect for immersive gaming or movie watching.",
      features: ["Automated schedules", "Remote operation", "Quiet motor"],
      Icon: BedDouble,
    },
    {
      key: "skyDome",
      title: "Sky-Style Ambient Lighting",
      category: "Ambiance & Focus",
      desc: "Dynamic ceiling lighting that simulates daylight or creates custom RGB scenes for focus or relaxation.",
      features: ["Circadian rhythm", "Dynamic scenes", "Low-latency sync"],
      Icon: Sun,
    },
    {
      key: "presenceSensor",
      title: "Presence & Door Sensors",
      category: "Automation & Security",
      desc: "Automates lighting and power based on room occupancy, enhancing convenience and energy efficiency.",
      features: ["Auto-lighting", "Energy saving", "Security alerts"],
      Icon: DoorOpen,
    }
  ];


  // Value Propositions for Gaming
  const features = [
    {
      icon: <Cable className="w-8 h-8" />,
      title: "Pro-Grade Cable Management",
      description: "Hidden raceways and integrated power solutions ensure a clean, clutter-free setup, enhancing aesthetics and safety.",
      gradient: "from-clay-500 to-taupe-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Dynamic RGB & Scene Presets",
      description: "Create immersive environments with customizable RGB lighting scenes for gaming, streaming, movie watching, or relaxation.",
      gradient: "from-taupe-500 to-clay-600"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Acoustic Comfort & Clarity",
      description: "Reduce echo and fan noise with integrated acoustic panels, providing a clearer audio experience for competitive play and communication.",
      gradient: "from-clay-600 to-taupe-400"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Optimized Display Mounting",
      description: "Secure and flexible wall-mounting solutions for single or multi-monitor setups, ensuring optimal viewing angles and ergonomic comfort.",
      gradient: "from-taupe-400 to-clay-500"
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Advanced Thermal Management",
      description: "Integrated ventilation and strategic component placement prevent overheating, maintaining peak performance for your consoles and PCs.",
      gradient: "from-clay-500 to-taupe-600"
    },
    {
      icon: <Gamepad className="w-8 h-8" />,
      title: "Personalized Gaming Zones",
      description: "Design dedicated areas for competitive gaming, content creation, or casual play, tailored to your unique style and needs.",
      gradient: "from-taupe-600 to-clay-400"
    }
  ];

  // FAQ Data
  type FAQItem = { question: string; answer: string };
  const faqData: FAQItem[] = [
    {
      question: "How do smart gaming walls improve acoustics?",
      answer:
        "Our smart gaming walls incorporate acoustic panels and sound-dampening materials that reduce echo and reverberation, creating a clearer audio environment for gaming and streaming. This helps to minimize distractions and enhance immersion.",
    },
    {
      question: "Can the walls help with heat management for consoles and PCs?",
      answer:
        "Yes, our designs can include integrated ventilation solutions and strategic placement of components to ensure optimal airflow, preventing overheating of gaming consoles and high-performance PCs. This helps maintain system stability and longevity.",
    },
    {
      question: "Are the RGB lighting scenes customizable?",
      answer:
        "Absolutely. The integrated RGB lighting systems are fully customizable, allowing you to create dynamic scenes for different moods—whether you're in a competitive match, streaming, watching a movie, or just relaxing. Control is intuitive via smart panels or mobile apps.",
    },
    {
      question: "How is cable management handled?",
      answer:
        "Our smart gaming walls feature hidden cable raceways and integrated power solutions, ensuring a clean, clutter-free setup. All cables for monitors, consoles, PCs, and peripherals are neatly concealed within the wall structure for a professional look.",
    },
    {
      question: "Is it safe to wall-mount heavy monitors or TVs?",
      answer:
        "Yes, our wall systems are engineered for secure mounting of all gaming equipment, including large monitors and TVs. We use robust VESA-compatible mounting solutions and ensure proper structural support, providing a safe and stable setup for your gear.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <SEOHead
        title="Smart Gaming Walls | RGB Lighting, Cable-Free Setups & Acoustic Control | The Wall Shop"
        description="Design a pro-grade gaming wall with modular finishes, acoustic control, hidden cabling, RGB scenes and smart controls—installed across the UK."
        canonical="https://www.thewallshop.co.uk/smart-walls/gaming"
        keywords="smart gaming wall, RGB lighting, acoustic gaming room, hidden cables, PC setup, console wall mount, gaming room design UK, Orvibo gaming"
        ogImage="/images/og/smartwall-gaming.jpg"
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
                The Ultimate
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-taupe-300 via-taupe-200 to-taupe-400">
                Smart Gaming Wall
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-clay-300 max-w-4xl mx-auto leading-relaxed">
              Transform your gaming space into a professional-grade battle station with integrated RGB lighting, 
              acoustic control, and hidden cabling for an immersive, clutter-free experience.
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
              { icon: <MapPin className="w-5 h-5" />, label: "UK-based Installers" }, 
              { icon: <Shield className="w-5 h-5" />, label: "Aftercare & Warranty" }, 
              { icon: <Cable className="w-5 h-5" />, label: "Clean Cable Management" } 
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
              <span className="z-10">Design Your Gaming Wall</span>
            </motion.button>
            <motion.a
              href="mailto:info@thewallshop.co.uk"
              className="border-2 border-clay-500/50 text-clay-200 px-8 py-4 rounded-2xl hover:bg-clay-500/10 hover:border-clay-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
            <span className="text-clay-200">Gaming</span>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Elevate Your</span>
              <span className="block text-clay-100 mt-2">Gaming Experience</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Our Smart Gaming Walls are engineered to provide the ultimate environment for performance, immersion, and comfort.
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Integrated Smart</span>
              <span className="block text-clay-100 mt-2">Gaming Devices</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Seamlessly control your gaming environment with cutting-edge smart devices for ultimate immersion.
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

      {/* Gaming Panel Finishes Section — REWORKED (2-row clamp + expand) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-taupe-900 to-clay-900">
           
    <FinishesSection
      // categories={FINISH_CATEGORIES_DEFAULT} // ← override or filter if you like
        defaultMaxVisible={8}
        helperBadges={["Acoustic-aware", "Scratch-resistant"]}
        id="finishes"
        className=""
      />
  
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
              Everything you need to know about optimizing your gaming space with Smart Walls.
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
              <h3 className="text-2xl font-bold text-white">UK Nationwide Gaming Wall Installation</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-clay-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Glasgow HQ</h4>
                <p className="text-sm">SMK Business Centre, 4 The Piazza, Glasgow G5 8BE. Your central point for gaming wall design and project coordination.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">UK Coverage</h4>
                <p className="text-sm">Expert installation teams available across England, Scotland, Wales, and Northern Ireland, bringing professional gaming setups to your home.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Gaming Specialists</h4>
                <p className="text-sm">Dedicated to creating optimal gaming environments, from casual setups to professional streaming studios, with a focus on performance and aesthetics.</p>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Ready to Level Up</span>
              <span className="block text-clay-100 mt-2">Your Gaming Space?</span>
            </h2>
            <p className="text-xl text-clay-300 mb-10 max-w-3xl mx-auto">
              Contact us today for a free consultation and let's design the ultimate smart gaming wall tailored to your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2 group relative overflow-hidden bg-gradient-to-r from-clay-600 to-taupe-700 text-white shadow-lg hover:from-clay-700 hover:to-taupe-800 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" />
                <span className="z-10">Get a Gaming Wall Quote</span>
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
                <span>Custom Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Professional Installation</span>
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

export default SmartGamingWall;