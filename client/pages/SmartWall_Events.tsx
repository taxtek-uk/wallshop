import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import SwQuoteModal from '@/components/SwQuoteModal';
import { 
  Calendar, 
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
  Megaphone,
  Monitor,
  Presentation,
  Camera,
  Projector,
  Tv,
  Layers3,
  Shuffle
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
      setMetaTag('og:image:alt', 'Smart Events Wall by The Wall Shop', true); 
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
        "event wall installations",
        "exhibition display systems",
        "modular event staging",
        "smart event technology",
        "dynamic event lighting",
        "event branding solutions",
        "portable wall systems",
        "event space design"
      ]
    };

    const serviceSchema = { 
      "@context": "https://schema.org", 
      "@type": "Service", 
      "name": "Smart Event Wall Installation", 
      "description": "Professional smart event wall installation with modular staging, dynamic displays, and intelligent lighting. Transform your events and exhibitions with cutting-edge wall technology.", 
      "provider": organizationSchema,
      "areaServed": "United Kingdom", 
      "serviceType": "Smart Wall Installation", 
      "category": "Event Design", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart event wall solutions from consultation to full installation" 
      } 
    }; 

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "The Wall Shop",
      "description": "Professional smart wall installation specialists serving events, exhibitions, and venues across the UK",
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

    const eventSchema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Smart Wall Event Solutions",
      "description": "Discover how smart walls can transform your events and exhibitions with modular staging and dynamic displays",
      "organizer": organizationSchema,
      "location": {
        "@type": "Place",
        "name": "UK Nationwide",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "GB"
        }
      },
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
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
          "name": "Events",
          "item": "https://www.thewallshop.co.uk/smart-walls/events"
        }
      ]
    };

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "Are the walls suitable for outdoor events?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, our modular wall systems include weather-resistant options with IP65 ratings for outdoor events, festivals, and exhibitions with full protection against rain and dust." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "How quickly can event walls be installed?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Our modular system allows rapid deployment with most event installations completed within 4-6 hours. Pre-event setup and testing ensure everything is ready for your opening." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Can the displays show live content?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. The integrated display system supports live streaming, real-time social media feeds, interactive presentations, and dynamic content updates throughout your event." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "What sizes are available for events?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Our modular system scales from small exhibition booths (2m x 2m) to large event backdrops (20m+ wide) with custom configurations for any venue size." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Is the system portable between venues?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, the modular design allows complete portability with quick-connect systems, wheeled transport cases, and setup guides for easy relocation between venues." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Can branding be customised for each event?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. Digital displays allow instant branding updates, while modular panels can be reconfigured with custom graphics, colours, and layouts for each event." 
          } 
        }
      ] 
    }; 

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How Smart Event Walls Work",
      "description": "Step-by-step guide to understanding smart event wall functionality and setup",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Modular Assembly",
          "text": "Connect modular wall panels using the quick-lock system to create custom configurations for your event space"
        },
        {
          "@type": "HowToStep", 
          "name": "Content Management",
          "text": "Upload and schedule content through the cloud-based management system for dynamic displays and branding"
        },
        {
          "@type": "HowToStep",
          "name": "Live Control",
          "text": "Control lighting, displays, and audio remotely during events using smartphone apps or dedicated control panels"
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
    insertJsonLd(eventSchema, 'event-schema');
    insertJsonLd(breadcrumbSchema, 'breadcrumb-schema');
    insertJsonLd(faqSchema, 'faq-schema'); 
    insertJsonLd(howToSchema, 'howto-schema');

  }, [title, description, canonical, keywords, ogImage]); 

  return null; 
}; 

const SmartWallEvents: React.FC = () => { 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 

  // Orvibo Smart Devices for Events
  const orviboDevices = [
    {
      key: "mixPad",
      title: "MixPad D1 Smart Panel",
      category: "Event Control",
      desc: "Centralised control for lighting, displays, and audio with preset event scenes and live adjustments.",
      features: ["Event scenes", "Live control", "Remote access"],
      Icon: PanelsTopLeft,
    },
    {
      key: "smartLighting",
      title: "Dynamic Lighting System",
      category: "Stage Lighting",
      desc: "Programmable RGB lighting with music sync and dramatic effects for impactful presentations.",
      features: ["RGB effects", "Music sync", "Scene presets"],
      Icon: LampCeiling,
    },
    {
      key: "smartDisplays",
      title: "Integrated Display System",
      category: "Visual Content",
      desc: "High-resolution displays for presentations, branding, and interactive content with cloud management.",
      features: ["4K displays", "Cloud content", "Interactive touch"],
      Icon: Monitor,
    },
    {
      key: "smartAudio",
      title: "Distributed Audio System",
      category: "Sound Management",
      desc: "Zone-based audio control with wireless microphones and background music for clear presentations.",
      features: ["Zone control", "Wireless mics", "Auto mixing"],
      Icon: Speaker,
    }
  ];

  // Events-Specific Wall Panel Finishes
  const finishCategories = [
    {
      id: 'modular',
      name: "Modular Stage Series",
      desc: "Quick-assembly panels for flexible event staging and backdrop creation.",
      icon: Layers3,
      panels: [
        { id: "M8026", name: "Stage Black", desc: "Professional black finish for stage backdrops", img: "/images/carbon-rock-boards/solid/7.jpg" },
        { id: "M8039", name: "Event White", desc: "Clean white finish for corporate presentations", img: "/images/carbon-rock-boards/solid/4.jpg" },
        { id: "M8008", name: "Charcoal Pro", desc: "Neutral charcoal for versatile event styling", img: "/images/carbon-rock-boards/solid/2.jpg" }
      ]
    },
    {
      id: 'branding',
      name: "Brand Display Collection",
      desc: "Customisable surfaces for logos, graphics, and dynamic brand presentations.",
      icon: Palette,
      panels: [
        { id: "B9016", name: "Digital Canvas", desc: "Smooth surface optimised for projection mapping", img: "/images/carbon-rock-boards/stone/1.jpg" },
        { id: "B9051", name: "Logo Mount", desc: "Textured finish with integrated mounting points", img: "/images/carbon-rock-boards/stone/4.jpg" },
        { id: "B9015", name: "Media Wall", desc: "High-contrast surface for video wall installations", img: "/images/carbon-rock-boards/stone/5.jpg" }
      ]
    },
    {
      id: 'portable',
      name: "Portable Event Series",
      desc: "Lightweight panels with transport cases for touring events and exhibitions.",
      icon: Shuffle,
      panels: [
        { id: "P3231", name: "Travel Pro", desc: "Ultra-light panels with wheeled transport cases", img: "/images/carbon-rock-boards/wood/1.jpg" },
        { id: "P3017", name: "Expo Standard", desc: "Standard exhibition panels with quick-connect system", img: "/images/carbon-rock-boards/wood/2.jpg" },
        { id: "P3204", name: "Festival Tough", desc: "Reinforced panels for outdoor festival environments", img: "/images/carbon-rock-boards/wood/5.jpg" }
      ]
    }
  ];

  // Features data with events focus
  const features = [
    {
      icon: <Layers3 className="w-8 h-8" />,
      title: "Modular Staging",
      description: "Quick-assembly modular panels create custom staging configurations for any event size, from intimate presentations to large exhibitions.",
      gradient: "from-clay-500 to-taupe-500"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Dynamic Displays",
      description: "Integrated high-resolution displays show live content, branding, presentations, and interactive elements with cloud-based content management.",
      gradient: "from-taupe-500 to-clay-600"
    },
    {
      icon: <LampCeiling className="w-8 h-8" />,
      title: "Dramatic Lighting",
      description: "Orvibo RGB lighting system creates stunning visual effects with music synchronisation and programmable scenes for impactful presentations.",
      gradient: "from-clay-600 to-taupe-400"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Integration",
      description: "Seamless brand integration with customisable panels, digital displays, and lighting that adapts to your event's visual identity.",
      gradient: "from-taupe-400 to-clay-500"
    },
    {
      icon: <Shuffle className="w-8 h-8" />,
      title: "Portable System",
      description: "Lightweight modular design with transport cases allows easy setup at multiple venues with consistent professional appearance.",
      gradient: "from-clay-500 to-taupe-600"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Audio Integration",
      description: "Built-in audio system with wireless microphones, zone control, and automatic mixing ensures crystal-clear presentations.",
      gradient: "from-taupe-600 to-clay-400"
    }
  ];

  // Event use cases
  const useCases = [
    {
      title: "Corporate Events",
      description: "Professional presentations with integrated displays, branded staging, and sophisticated lighting for conferences and product launches.",
      icon: <Presentation className="w-6 h-6" />,
      features: ["Branded staging", "Presentation displays", "Professional lighting", "Audio integration"]
    },
    {
      title: "Trade Exhibitions",
      description: "Modular exhibition stands with dynamic displays, interactive elements, and portable design for multiple venue deployment.",
      icon: <Monitor className="w-6 h-6" />,
      features: ["Modular stands", "Interactive displays", "Portable design", "Quick setup"]
    },
    {
      title: "Entertainment Events",
      description: "Dynamic staging with RGB lighting effects, music synchronisation, and dramatic backdrops for concerts and performances.",
      icon: <Music className="w-6 h-6" />,
      features: ["RGB lighting", "Music sync", "Stage effects", "Dramatic backdrops"]
    },
    {
      title: "Festival Installations",
      description: "Weather-resistant outdoor systems with high-impact visuals, crowd management displays, and robust construction for festivals.",
      icon: <Calendar className="w-6 h-6" />,
      features: ["Weather resistant", "High-impact visuals", "Crowd displays", "Robust construction"]
    }
  ];

  // FAQ Data 
  const faqData = [ 
    { 
      question: "Are the walls suitable for outdoor events?", 
      answer: "Yes, our modular wall systems include weather-resistant options with IP65 ratings for outdoor events, festivals, and exhibitions with full protection against rain and dust." 
    }, 
    { 
      question: "How quickly can event walls be installed?", 
      answer: "Our modular system allows rapid deployment with most event installations completed within 4-6 hours. Pre-event setup and testing ensure everything is ready for your opening." 
    },
    { 
      question: "Can the displays show live content?", 
      answer: "Absolutely. The integrated display system supports live streaming, real-time social media feeds, interactive presentations, and dynamic content updates throughout your event." 
    },
    { 
      question: "What sizes are available for events?", 
      answer: "Our modular system scales from small exhibition booths (2m x 2m) to large event backdrops (20m+ wide) with custom configurations for any venue size." 
    },
    { 
      question: "Is the system portable between venues?", 
      answer: "Yes, the modular design allows complete portability with quick-connect systems, wheeled transport cases, and setup guides for easy relocation between venues." 
    },
    { 
      question: "Can branding be customised for each event?", 
      answer: "Absolutely. Digital displays allow instant branding updates, while modular panels can be reconfigured with custom graphics, colours, and layouts for each event." 
    }
  ]; 

  // How it works steps
  const howItWorksSteps = [
    {
      step: 1,
      title: "Event Planning",
      description: "We work with your event team to understand requirements, venue constraints, and design objectives for the perfect smart wall solution.",
      icon: <Search className="w-8 h-8" />
    },
    {
      step: 2,
      title: "Custom Configuration",
      description: "Design modular wall layouts with integrated displays, lighting, and branding elements tailored to your event's unique needs.",
      icon: <Palette className="w-8 h-8" />
    },
    {
      step: 3,
      title: "Rapid Deployment",
      description: "Our experienced team delivers and installs the complete system with pre-event testing to ensure flawless operation.",
      icon: <Settings className="w-8 h-8" />
    },
    {
      step: 4,
      title: "Live Support",
      description: "On-site technical support during your event ensures smooth operation with real-time adjustments and content management.",
      icon: <Users className="w-8 h-8" />
    }
  ];

  // Case study snippets
  const caseStudies = [
    {
      title: "Tech Conference 2024",
      location: "London ExCeL",
      challenge: "Create immersive brand experience for 5,000 attendees",
      solution: "20m curved smart wall with interactive displays and synchronized lighting",
      result: "87% increase in booth engagement and social media mentions"
    },
    {
      title: "Fashion Week Showcase",
      location: "Manchester Central", 
      challenge: "Flexible staging for multiple runway shows",
      solution: "Modular wall system with quick-change branding and dramatic lighting",
      result: "50% faster setup between shows, enhanced visual impact"
    },
    {
      title: "Music Festival Stage",
      location: "Edinburgh Festival",
      challenge: "Weather-resistant backdrop for outdoor performances",
      solution: "IP65-rated modular walls with RGB lighting and audio integration",
      result: "Zero weather-related downtime, stunning visual performances"
    }
  ];

  return ( 
    <div className="min-h-screen bg-gray-950"> 
      <SEOHead 
        title="Smart Walls for Events & Exhibitions | Modular, Dynamic Displays | The Wall Shop"
        description="Transform your events with smart walls featuring modular staging, dynamic displays, and Orvibo lighting. Professional installation for exhibitions, conferences, and festivals across the UK."
        canonical="https://www.thewallshop.co.uk/smart-walls/events"
        keywords="smart event walls, modular event staging, exhibition displays, event lighting control, portable wall systems, event branding, dynamic displays, orvibo events"
        ogImage="https://www.thewallshop.co.uk/images/smart-walls/events-hero.webp"
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
                Events & Exhibitions 
              </span> 
            </h1> 
            <p className="text-xl md:text-2xl text-clay-300 max-w-4xl mx-auto leading-relaxed"> 
              Transform your events with intelligent modular walls featuring dynamic displays, dramatic lighting, 
              and portable staging. Professional installation for conferences, exhibitions, and festivals. 
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
              { icon: <Layers3 className="w-8 h-8" />, value: "4-6h", label: "Setup Time" }, 
              { icon: <Monitor className="w-8 h-8" />, value: "4K", label: "Display Quality" }, 
              { icon: <LampCeiling className="w-8 h-8" />, value: "RGB", label: "Lighting Effects" }, 
              { icon: <Shuffle className="w-8 h-8" />, value: "Portable", label: "Multi-Venue" } 
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
              <span className="z-10">Request Event Quote</span> 
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
            <span className="text-clay-200">Events</span>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Smart Event</span> 
              <span className="block text-clay-100 mt-2">Features</span> 
            </h2> 
            <p className="text-xl text-clay-300 max-w-4xl mx-auto"> 
              Experience the perfect blend of modular flexibility, dynamic displays, and intelligent automation  
              that transforms your events into unforgettable experiences. 
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Orvibo Event</span>
              <span className="block text-clay-100 mt-2">Smart Technology</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Professional-grade Orvibo smart devices designed specifically for event and exhibition environments.
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

      {/* Event Panel Finishes Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Event-Ready Panel</span>
              <span className="block text-clay-100 mt-2">System Options</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Specially designed panel systems with modular flexibility, transport solutions, and professional finishes for event environments.
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

      {/* Event Use Cases Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Event</span>
              <span className="block text-clay-100 mt-2">Use Cases</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Tailored solutions for different event types and venue requirements.
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Event</span>
              <span className="block text-clay-100 mt-2">Gallery</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              See how smart walls transform events and exhibitions across the UK.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { title: "Corporate Conference", img: "/images/smart-walls/events/corporate_conference.webp", desc: "Professional staging with integrated displays" },
                { title: "Trade Exhibition", img: "/images/smart-walls/events/trade_exhibition.webp", desc: "Modular stands with interactive elements" },
                { title: "Product Launch", img: "/images/smart-walls/events/product_launch.webp", desc: "Dramatic lighting with brand integration" },
                { title: "Music Festival", img: "/images/smart-walls/events/music_festival.webp", desc: "Weather-resistant outdoor installation" },
                { title: "Fashion Show", img: "/images/smart-walls/events/fashion_show.webp", desc: "Quick-change modular backdrop system" },
                { title: "Awards Ceremony", img: "/images/smart-walls/events/awards_ceremony.webp", desc: "Elegant staging with dynamic lighting" }
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">How It</span>
              <span className="block text-clay-100 mt-2">Works</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              From initial planning to live event support, we handle every aspect of your event transformation.
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
              Real results from events and exhibitions across the UK that have transformed their impact with smart walls.
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
              Everything you need to know about smart event wall installation and exhibition technology 
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
              <h3 className="text-2xl font-bold text-white">UK Nationwide Event Support</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-clay-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Glasgow HQ</h4>
                <p className="text-sm">SMK Business Centre, 4 The Piazza, Glasgow G5 8BE. Professional event planning and project coordination from our Scottish headquarters.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">UK Coverage</h4>
                <p className="text-sm">Certified event technicians across England, Scotland, Wales, and Northern Ireland. Local support with national expertise.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Event Specialists</h4>
                <p className="text-sm">Specialising in conferences, exhibitions, festivals, and corporate events with experience in major UK venues.</p>
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
              <span className="block text-clay-100 mt-2">Next Event</span>
            </h2>
            <p className="text-xl text-clay-300 mb-10 max-w-3xl mx-auto">
              Join hundreds of UK events that have created unforgettable experiences with smart walls. 
              Professional installation, live support, and cutting-edge technology included.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2 group relative overflow-hidden bg-gradient-to-r from-clay-600 to-taupe-700 text-white shadow-lg hover:from-clay-700 hover:to-taupe-800 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" />
                <span className="z-10">Get Event Quote</span>
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
                <span>Rapid Deployment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Live Support</span>
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

export default SmartWallEvents;