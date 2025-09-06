import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import SwQuoteModal from '@/components/SwQuoteModal';
import { 
  Monitor, 
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
  Info,
  Briefcase,
  Camera,
  Mic,
  Fan,
  Layers,
  TreePine,
  Square,
  Gem,
  PanelsTopLeft,
  DoorOpen,
  ScanFace,
  LampCeiling,
  Music4,
  CloudSun,
  Laptop,
  Presentation,
  Calendar,
  FileText,
  Video,
  Headphones
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
      setMetaTag('og:image:alt', 'Smart Office Wall by The Wall Shop', true); 
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
      "name": "Smart Office Wall Installation", 
      "description": "Professional smart office wall installation with integrated technology, productivity features, and intelligent automation. Transform your workspace into a connected, efficient environment.", 
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
      "category": "Office Design", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart office wall solutions from consultation to full installation" 
      } 
    }; 

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "How do smart office walls improve productivity?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Smart office walls enhance productivity through integrated technology, automated lighting that adapts to work patterns, climate control for optimal comfort, and seamless connectivity for presentations and collaboration." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What technology features are available for office walls?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Smart office walls include integrated displays, video conferencing systems, wireless charging zones, cable management, automated lighting, climate control, and connectivity hubs for seamless device integration." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Can I control office features remotely?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, comprehensive smartphone and web app control allows you to manage lighting, temperature, displays, and audio systems remotely. Perfect for preparing meeting rooms or adjusting settings before arrival." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Do smart office walls support video conferencing?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, integrated video conferencing systems with high-quality cameras, microphones, and speakers provide seamless virtual meeting experiences with professional audio-visual quality." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What lighting options are available for office environments?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "LED lighting includes task lighting for focused work, ambient lighting for meetings, circadian rhythm lighting to support natural energy levels, and presentation modes for optimal visibility." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Are smart office installations suitable for open plan offices?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. Smart office walls can create defined zones within open spaces, provide acoustic benefits, and offer flexible technology integration that adapts to changing workspace needs." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Can smart office walls integrate with existing IT systems?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, our systems are designed to integrate seamlessly with existing IT infrastructure, including network systems, security protocols, and business applications for unified workspace management." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What warranty is provided for office wall installations?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "We provide a comprehensive 5-year warranty covering all smart components, technology systems, and installation workmanship. This includes ongoing technical support and software updates." 
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

// Orvibo Device Catalog for Office
const orviboCatalog = {
  mixPad: {
    title: "MixPad Smart Panel",
    description: "All-in-one scene control with voice intercom",
    features: ["Touch + App + Voice", "Scene shortcuts", "Intercom"],
    icon: PanelsTopLeft
  },
  smartSwitch: {
    title: "Smart Switch",
    description: "Programmable scenes & schedules",
    features: ["Timer/Countdown", "Voice control", "Group control"],
    icon: Lightbulb
  },
  smartCurtain: {
    title: "Smart Curtain",
    description: "Silent motorised curtains with precise control",
    features: ["App/Voice control", "Scene linkage", "Smooth motion"],
    icon: DoorOpen
  },
  smartLock: {
    title: "Smart Lock",
    description: "AI face recognition door access",
    features: ["Visual door viewer", "Long battery life", "Linkage"],
    icon: ScanFace
  },
  smartClimate: {
    title: "Smart Climate",
    description: "Zone heating/cooling with energy efficiency",
    features: ["Schedules", "Sensors", "Remote control"],
    icon: Fan
  },
  cctv: {
    title: "CCTV",
    description: "Integrated CCTV with remote access",
    features: ["Push notifications", "Scene link", "Recording"],
    icon: Shield
  },
  smartLighting: {
    title: "Smart Lighting",
    description: "Dynamic scenes and ambient moods",
    features: ["RGB scenes", "Presets", "Automation"],
    icon: LampCeiling
  },
  musicSystem: {
    title: "Music System",
    description: "Multi-room audio with streaming",
    features: ["App control", "Zones", "Hi-fi sound"],
    icon: Music4
  },
  smartHanger: {
    title: "Smart Hanger",
    description: "Quiet, remote laundry hanger",
    features: ["Remote/Voice", "Low noise", "Aerospace-grade build"],
    icon: CloudSun
  },
  skyDomeLight: {
    title: "Sky Dome Light",
    description: "Quasi-natural light with multiple modes",
    features: ["Four modes", "No blue-light glare", "Quick install"],
    icon: Lightbulb
  }
};

// Texture Categories for Office
const textureCategories = [
  {
    id: 'fabric',
    name: "Cloth Pattern Series",
    desc: "Soft textile pattern with acoustic value.",
    icon: Layers,
    img: "/images/carbon-rock-boards/cloth.jpg",
    color: "from-leather-100 to-mocha-100",
    accent: "leather-600",
    panels: [
      { id: "T6004", name: "Stone Weave", img: "/images/carbon-rock-boards/fabric/t6004.jpg", desc: "Subtle woven texture with a natural stone-inspired fabric look", stock: 10 },
      { id: "T6104", name: "Stone Bead", img: "/images/carbon-rock-boards/fabric/t6104.jpg", desc: "Delicate beaded weave with a tactile stone-like surface", stock: 10 },
      { id: "T6201", name: "Pearl Shimmer", img: "/images/carbon-rock-boards/fabric/t6201.jpg", desc: "Elegant woven finish with a soft pearl shimmer", stock: 10 },
      { id: "T6301", name: "Chambray Grid", img: "/images/carbon-rock-boards/fabric/t6301.jpg", desc: "Classic chambray-style grid pattern with a balanced woven texture", stock: 10 }
    ]
  },
  {
    id: 'wood',
    name: "Wood Grain Series",
    desc: "Warm wood aesthetics with durable surface.",
    icon: TreePine,
    img: "/images/carbon-rock-boards/wood.jpg",
    color: "from-amber-100 to-orange-100",
    accent: "amber-600",
    panels: [
      { id: "T9016", name: "Ash Grey", img: "/images/carbon-rock-boards/wood/1.jpg", desc: "Soft ash grain with light grey overtone", stock: 10 },
      { id: "T9051", name: "Walnut Mist", img: "/images/carbon-rock-boards/wood/2.jpg", desc: "Mid-brown walnut tone with subtle striations", stock: 10 },
      { id: "T9222", name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast", stock: 10 },
      { id: "T9012", name: "Rosewood Brown", img: "/images/carbon-rock-boards/wood/4.jpg", desc: "Warm reddish grain like tropical leatherwood", stock: 10 }
    ]
  },
  {
    id: 'solid',
    name: "Solid Color Series",
    desc: "Industrial elegance with raw, minimalist tones.",
    icon: Square,
    img: "/images/carbon-rock-boards/wpc.jpg",
    color: "from-slate-100 to-gray-100",
    accent: "slate-600",
    panels: [
      { id: "T8026", name: "Ash Silver", img: "/images/carbon-rock-boards/solid/2.jpg", desc: "Neutral silver-gray with a clean industrial look", stock: 10 },
      { id: "T8107", name: "Slate Blue", img: "/images/carbon-rock-boards/solid/3.jpg", desc: "Dark blue-grey with a sophisticated edge", stock: 10 },
      { id: "T8039", name: "Ivory", img: "/images/carbon-rock-boards/solid/4.jpg", desc: "Soft ivory tone perfect for elegant settings", stock: 10 },
      { id: "T8008", name: "Obsidian", img: "/images/carbon-rock-boards/solid/7.jpg", desc: "Matte black with premium depth and richness", stock: 10 }
    ]
  },
  {
    id: 'stone',
    name: "Stone Grain Series",
    desc: "Classic stone surface with timeless elegance.",
    icon: Gem,
    img: "/images/carbon-rock-boards/stone.jpg",
    color: "from-stone-100 to-slate-100",
    accent: "stone-600",
    panels: [
      { id: "S3231", name: "White & Gold", img: "/images/carbon-rock-boards/stone/1.jpg", desc: "Stone texture White & Gold", stock: 10 },
      { id: "T3017", name: "Mid Grey & White", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture Mid Grey & White", stock: 10 },
      { id: "T3204", name: "Dark Grey & Black", img: "/images/carbon-rock-boards/stone/5.jpg", desc: "Stone texture Dark Grey & Black", stock: 10 }
    ]
  },
  {
    id: 'metallic',
    name: "Metal Series",
    desc: "Luxury feel with metallic luster and reflectivity.",
    icon: Layers,
    img: "/images/carbon-rock-boards/metal.jpg",
    color: "from-amber-100 to-yellow-100",
    accent: "amber-600",
    panels: [
      { id: "SZ-703", name: "Brushed Silver", img: "/images/carbon-rock-boards/metal/sz-703.jpg", desc: "Sleek brushed silver offering a clean, modern look", stock: 10 },
      { id: "SZ-705", name: "Satin Titanium", img: "/images/carbon-rock-boards/metal/sz-705.jpg", desc: "Smooth satin titanium with a durable, futuristic finish", stock: 10 },
      { id: "S-8026", name: "Bronze Satin Metal", img: "/images/carbon-rock-boards/metal/s-8026.jpg", desc: "Elegant satin finish with a rich bronze metallic appearance", stock: 10 }
    ]
  },
  {
    id: 'mirror',
    name: "Mirror Series",
    desc: "Reflective brilliance with a sleek, high-gloss finish.",
    icon: Square,
    img: "/images/carbon-rock-boards/mirror.jpg",
    color: "from-leather-100 to-leather-100",
    accent: "stone-600",
    panels: [
      { id: "MR2002", name: "Ripple Silver Mirror", img: "/images/carbon-rock-boards/mirror/5.webp", desc: "Elegant silver mirror with a subtle ripple texture", stock: 10 },
      { id: "MR2005", name: "Mirror Silver", img: "/images/carbon-rock-boards/mirror/3.webp", desc: "Classic silver mirror with brilliant clarity", stock: 10 }
    ]
  }
];

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

interface OfficeSize { 
  id: string; 
  name: string; 
  dimensions: string; 
  description: string; 
} 

interface ControlMethod { 
  id: string; 
  name: string; 
  icon: React.ReactNode; 
  description: string; 
  features: string[]; 
} 

const SmartWallOffice: React.FC = () => { 
  const [selectedOfficeSize, setSelectedOfficeSize] = useState<string>('medium'); 
  const [selectedControl, setSelectedControl] = useState<string>('panel'); 
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null); 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 
  const [isHelpMode, setIsHelpMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHotspotIndex, setCurrentHotspotIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null); 

  // Office size configurations 
  const officeSizes: OfficeSize[] = [ 
    { 
      id: 'small', 
      name: 'Small Office', 
      dimensions: '3m × 4m', 
      description: 'Perfect for private offices and small meeting rooms' 
    }, 
    { 
      id: 'medium', 
      name: 'Medium Office', 
      dimensions: '5m × 6m', 
      description: 'Ideal for team spaces and conference rooms' 
    }, 
    { 
      id: 'large', 
      name: 'Large Office', 
      dimensions: '8m × 10m', 
      description: 'Designed for open plan offices and collaborative spaces' 
    } 
  ]; 

  // Control method configurations 
  const controlMethods: ControlMethod[] = [ 
    { 
      id: 'panel', 
      name: 'Smart Control Panel', 
      icon: <Sun className="w-6 h-6" />, 
      description: 'Professional touch panels with meeting room integration', 
      features: ['Meeting room booking', 'Presentation controls', 'Climate management', 'Security integration'] 
    }, 
    { 
      id: 'phone', 
      name: 'Business App', 
      icon: <Smartphone className="w-6 h-6" />, 
      description: 'Comprehensive business app for workspace management', 
      features: ['Remote management', 'Scheduling integration', 'Analytics dashboard', 'Multi-user access'] 
    } 
  ]; 

  // Office-specific hotspots
  const hotspots: Hotspot[] = [ 
    { 
      id: 'display-integration', 
      x: 50, 
      y: 25, 
      title: 'Integrated Display Systems', 
      description: 'Professional displays with wireless presentation capabilities', 
      icon: <Monitor className="w-5 h-5" />, 
      features: ['4K resolution', 'Wireless casting', 'Multi-device support', 'Touch interaction'] 
    }, 
    { 
      id: 'video-conferencing', 
      x: 25, 
      y: 40, 
      title: 'Video Conferencing Hub', 
      description: 'Integrated cameras, microphones, and speakers for seamless meetings', 
      icon: <Video className="w-5 h-5" />, 
      features: ['HD cameras', 'Noise cancellation', 'Echo reduction', 'Auto-framing'] 
    }, 
    { 
      id: 'smart-lighting', 
      x: 75, 
      y: 40, 
      title: 'Productivity Lighting', 
      description: 'Circadian lighting system optimised for work performance', 
      icon: <Lightbulb className="w-5 h-5" />, 
      features: ['Task lighting', 'Presentation modes', 'Energy saving', 'Circadian rhythm'] 
    }, 
    { 
      id: 'connectivity-hub', 
      x: 40, 
      y: 65, 
      title: 'Connectivity Hub', 
      description: 'Wireless charging zones and cable management solutions', 
      icon: <Wifi className="w-5 h-5" />, 
      features: ['Wireless charging', 'USB-C ports', 'Cable management', 'Network access'] 
    }, 
    { 
      id: 'climate-control', 
      x: 60, 
      y: 65, 
      title: 'Climate Management', 
      description: 'Intelligent temperature and air quality control for optimal productivity', 
      icon: <Thermometer className="w-5 h-5" />, 
      features: ['Zone control', 'Air quality monitoring', 'Energy efficiency', 'Automated scheduling'] 
    } 
  ]; 

  // FAQ Data 
  const faqData = [ 
    { 
      question: "How do smart office walls improve productivity?", 
      answer: "Smart office walls enhance productivity through integrated technology, automated lighting that adapts to work patterns, climate control for optimal comfort, seamless connectivity for presentations and collaboration, and intelligent systems that reduce distractions and support focused work." 
    }, 
    { 
      question: "What technology features are available for office walls?", 
      answer: "Smart office walls include integrated displays, video conferencing systems, wireless charging zones, comprehensive cable management, automated lighting systems, climate control, connectivity hubs, and seamless integration with business applications and meeting room booking systems." 
    }, 
    { 
      question: "Can I control office features remotely?", 
      answer: "Yes, our comprehensive business app provides complete remote control over lighting, temperature, displays, and audio systems. Perfect for preparing meeting rooms, adjusting settings before arrival, and managing multiple office spaces from a single interface." 
    }, 
    { 
      question: "Do smart office walls support video conferencing?", 
      answer: "Yes, integrated video conferencing systems feature high-quality cameras with auto-framing, professional microphones with noise cancellation, and premium speakers with echo reduction, providing seamless virtual meeting experiences with broadcast-quality audio-visual performance." 
    }, 
    { 
      question: "What lighting options are available for office environments?", 
      answer: "LED lighting includes focused task lighting for concentrated work, ambient lighting for meetings and collaboration, circadian rhythm lighting to support natural energy levels throughout the day, and specialised presentation modes for optimal visibility during presentations." 
    }, 
    { 
      question: "Are smart office installations suitable for open plan offices?", 
      answer: "Absolutely. Smart office walls can create defined zones within open spaces, provide acoustic benefits to reduce noise pollution, and offer flexible technology integration that adapts to changing workspace needs and team configurations." 
    }, 
    { 
      question: "Can smart office walls integrate with existing IT systems?", 
      answer: "Yes, our systems are designed to integrate seamlessly with existing IT infrastructure, including network systems, security protocols, business applications, calendar systems, and meeting room booking platforms for unified workspace management." 
    }, 
    { 
      question: "What warranty is provided for office wall installations?", 
      answer: "We provide a comprehensive 5-year warranty covering all smart components, technology systems, displays, audio-visual equipment, and installation workmanship. This includes ongoing technical support, software updates, and maintenance services to ensure optimal performance." 
    } 
  ]; 

  // Related searches data 
  const relatedSearches = [ 
    "smart office design UK", "office automation systems", "meeting room technology", "workplace productivity solutions", 
    "office LED lighting", "video conferencing installation", "smart building technology", "office climate control", 
    "intelligent workspace systems", "office smart home", "automated office controls", "modern office technology" 
  ]; 

  // Get current office size details 
  const currentOfficeSize = officeSizes.find(size => size.id === selectedOfficeSize) || officeSizes[1]; 
  const currentControl = controlMethods.find(method => method.id === selectedControl) || controlMethods[0]; 

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentHotspotIndex((prev) => (prev + 1) % hotspots.length);
        setActiveHotspot(hotspots[(currentHotspotIndex + 1) % hotspots.length].id);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentHotspotIndex, hotspots.length]);

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setActiveHotspot(hotspots[currentHotspotIndex].id);
    } else {
      setActiveHotspot(null);
    }
  };

  const toggleHelpMode = () => {
    setIsHelpMode(!isHelpMode);
    if (isPlaying) {
      setIsPlaying(false);
      setActiveHotspot(null);
    }
  };

  return ( 
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"> 
      {/* SEO Head */} 
      <SEOHead 
        title="Smart Office Walls UK | Intelligent Workspace Technology | The Wall Shop" 
        description="Transform your office with intelligent smart walls featuring integrated displays, video conferencing, productivity lighting, and automated systems. Professional installation across the UK." 
        canonical="https://www.thewallshop.co.uk/smart-walls/office" 
        keywords="smart office walls, office automation, workplace technology, video conferencing systems, office lighting, meeting room technology, intelligent workspace, UK office installation" 
        ogImage="https://www.thewallshop.co.uk/images/smart-office-wall-og.jpg" 
      /> 

      {/* Navigation */} 
      <Navigation /> 

      {/* Breadcrumbs */} 
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8"> 
        <div className="max-w-7xl mx-auto"> 
          <nav className="flex" aria-label="Breadcrumb"> 
            <ol className="inline-flex items-center space-x-1 md:space-x-3"> 
              <li className="inline-flex items-center"> 
                <a href="/" className="inline-flex items-center text-sm font-medium text-clay-400 hover:text-clay-200 transition-colors"> 
                  <Home className="w-4 h-4 mr-2" /> 
                  Home 
                </a> 
              </li> 
              <li> 
                <div className="flex items-center"> 
                  <ChevronDown className="w-4 h-4 text-clay-500 rotate-[-90deg]" /> 
                  <a href="/smart-walls" className="ml-1 text-sm font-medium text-clay-400 hover:text-clay-200 transition-colors md:ml-2">Smart Walls</a> 
                </div> 
              </li> 
              <li aria-current="page"> 
                <div className="flex items-center"> 
                  <ChevronDown className="w-4 h-4 text-clay-500 rotate-[-90deg]" /> 
                  <span className="ml-1 text-sm font-medium text-clay-200 md:ml-2">Office</span> 
                </div> 
              </li> 
            </ol> 
          </nav> 
        </div> 
      </section> 

      {/* Hero Section */} 
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"> 
        {/* Background Elements */} 
        <div className="absolute inset-0 opacity-20"> 
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 to-purple-500/15"></div> 
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)` 
          }}></div> 
        </div> 

        {/* Floating Elements */} 
        <div className="absolute inset-0 opacity-30"> 
          {[...Array(8)].map((_, i) => ( 
            <motion.div 
              key={i} 
              className="absolute rounded-full" 
              style={{ 
                width: `${Math.random() * 60 + 20}px`, 
                height: `${Math.random() * 60 + 20}px`, 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`, 
                background: `radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)` 
              }} 
              animate={{ 
                y: [0, -20, 0], 
                x: [0, Math.random() * 10 - 5, 0], 
                rotate: [0, Math.random() * 10 - 5, 0] 
              }} 
              transition={{ 
                duration: Math.random() * 15 + 10, 
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
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-md border border-indigo-500/40 rounded-full px-6 py-3 shadow-lg"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            > 
              <Briefcase className="w-5 h-5 text-indigo-300" /> 
              <span className="text-indigo-100 font-medium">Intelligent Workspace Technology</span> 
            </motion.div> 

            {/* Enhanced Main Heading */} 
            <div className="space-y-6"> 
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              > 
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-200 to-purple-400 pb-2">Smart Office</span> 
                <span className="block text-indigo-50 mt-2 drop-shadow">Workspace</span> 
              </motion.h1> 
              <motion.p 
                className="text-xl md:text-2xl text-indigo-200 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              > 
                Transform your office into an intelligent workspace with integrated displays, video conferencing,  
                productivity lighting, and automated systems designed to enhance collaboration and efficiency. 
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
                { icon: <Monitor className="w-8 h-8" />, value: "4K", label: "Display Quality" }, 
                { icon: <Star className="w-8 h-8" />, value: "4.9/5", label: "Customer Rating" }, 
                { icon: <Shield className="w-8 h-8" />, value: "5 Year", label: "Warranty" }, 
                { icon: <Zap className="w-8 h-8" />, value: "24/7", label: "Smart Control" } 
              ].map((stat, index) => ( 
                <motion.div 
                  key={index} 
                  className="text-center p-4 rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                > 
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-indigo-500/40"> 
                    <div className="text-indigo-300">{stat.icon}</div> 
                  </div> 
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div> 
                  <div className="text-indigo-300 text-sm mt-1">{stat.label}</div> 
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
                className="px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2 group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              > 
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer"></span>
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" /> 
                <span className="z-10">Request a Tailored Quote</span> 
              </motion.button> 
              <motion.a 
                href="tel:+441417393377" 
                className="border-2 border-indigo-500/50 text-indigo-200 px-8 py-4 rounded-2xl hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 group"
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

      {/* Enhanced Office Size Configuration Section */} 
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden"> 
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 to-purple-500/15"></div> 
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)` 
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
                background: `radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`
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
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-full px-5 py-1.5 mb-4"
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-200 font-medium text-sm">Custom Office Sizing</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-200 to-purple-400">Choose Your</span> 
              <span className="block text-indigo-50 mt-2">Office Configuration</span> 
            </h2> 
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed"> 
              Our smart office walls are custom-designed to perfectly fit your workspace requirements,  
              ensuring optimal functionality and professional appearance for any office environment. 
            </p> 
            <motion.div 
              className="mt-4 flex items-center justify-center text-indigo-300 text-sm bg-indigo-500/10 backdrop-blur-sm rounded-full px-4 py-2 inline-flex"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Info className="w-4 h-4 mr-2" />
              <span>Select your office size to see custom options</span>
            </motion.div>
          </motion.div> 

          <div className="grid md:grid-cols-3 gap-6 mb-12"> 
            {officeSizes.map((officeSize, index) => ( 
              <motion.button 
                key={officeSize.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                onClick={() => setSelectedOfficeSize(officeSize.id)} 
                className={`group p-8 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${ 
                  selectedOfficeSize === officeSize.id 
                    ? 'bg-gradient-to-b from-indigo-600/30 to-purple-600/20 border-indigo-500/60 shadow-2xl shadow-indigo-500/20' 
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-700/50' 
                }`} 
                whileHover={{ y: -5 }}
              > 
                {/* Selection glow effect */}
                {selectedOfficeSize === officeSize.id && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6"> 
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${ 
                      selectedOfficeSize === officeSize.id 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-gray-700/50 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300' 
                    }`}> 
                      <Briefcase className="w-6 h-6" /> 
                    </div> 
                    {selectedOfficeSize === officeSize.id && ( 
                      <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"> 
                        <CheckCircle className="w-4 h-4 text-white" /> 
                      </div> 
                    )} 
                  </div> 
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors"> 
                    {officeSize.name} 
                  </h3> 
                  <p className="text-indigo-300 text-lg mb-3 font-medium">{officeSize.dimensions}</p> 
                  <p className="text-indigo-400 mb-4 leading-relaxed">{officeSize.description}</p>
                  
                  {/* Feature indicators */}
                  <div className="flex space-x-2 mt-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        selectedOfficeSize === officeSize.id 
                          ? 'bg-indigo-400' 
                          : 'bg-gray-600 group-hover:bg-indigo-500/60'
                      }`}></div>
                    ))}
                  </div>
                </div>
              </motion.button> 
            ))} 
          </div> 

          {/* Enhanced Current Selection Display */} 
          <motion.div 
            key={selectedOfficeSize} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, type: "spring" }} 
            className="bg-gradient-to-r from-indigo-500/15 to-purple-500/15 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/40 text-center relative overflow-hidden shadow-xl"
          > 
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4"> 
                {currentOfficeSize.name} Configuration 
              </h3> 
              <p className="text-indigo-200 text-lg max-w-2xl mx-auto leading-relaxed"> 
                Optimised smart wall design for {currentOfficeSize.dimensions} offices with professional features  
                and premium integration options tailored to your workspace requirements. 
              </p> 
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

      {/* Interactive Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-200 bg-clip-text text-transparent">Explore Smart</span>
              <span className="block text-indigo-50 mt-2">Office Features</span>
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
              Discover the intelligent features integrated into your office wall system
              that work together to create the perfect productive workspace environment.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-center justify-center text-indigo-300 text-sm bg-indigo-800/20 backdrop-blur-sm rounded-full py-2 px-4 w-fit mx-auto border border-indigo-700/30"
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
                src="/images/office-smart-wall-hero.webp"
                alt="Smart Office Wall with integrated technology features and controls"
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
                    <h3 className="text-xl font-bold text-white mb-3">Interactive Features</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                      Click on the purple markers to explore smart office features. Use the play button for an automatic tour.
                    </p>
                    <button
                      onClick={toggleHelpMode}
                      className="px-6 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white font-medium transition-all"
                    >
                      Got it
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Hotspots */}
              {hotspots.map((hotspot) => (
                <motion.button
                  key={hotspot.id}
                  className={`absolute w-8 h-8 rounded-full border-2 border-white/40 backdrop-blur-md transition-all duration-300 z-10 ${
                    activeHotspot === hotspot.id
                      ? 'bg-indigo-500/90 scale-125 shadow-lg shadow-indigo-500/50'
                      : 'bg-indigo-500/70 hover:bg-indigo-500/90 hover:scale-110'
                  }`}
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={activeHotspot === hotspot.id ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: activeHotspot === hotspot.id ? Infinity : 0 }}
                >
                  <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </motion.button>
              ))}

              {/* Feature Details Panel */}
              <AnimatePresence>
                {activeHotspot && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 shadow-2xl z-20"
                  >
                    {(() => {
                      const hotspot = hotspots.find(h => h.id === activeHotspot);
                      if (!hotspot) return null;
                      
                      return (
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30 flex-shrink-0">
                            {hotspot.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-bold text-white leading-tight">{hotspot.title}</h3>
                              <button
                                onClick={() => setActiveHotspot(null)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2 flex-shrink-0"
                              >
                                <X className="w-4 h-4 text-white/70" />
                              </button>
                            </div>
                            <p className="text-white/80 text-sm mb-3 leading-relaxed">{hotspot.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                              {hotspot.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  <CheckCircle className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                                  <span className="text-white/70">{feature}</span>
                                </div>
                              ))}
                            </div>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-900 to-purple-900"> 
        <div className="max-w-7xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-16" 
          > 
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-200 bg-clip-text text-transparent">Choose Your</span> 
              <span className="block text-indigo-100">Control Method</span> 
            </h2> 
            <p className="text-xl text-indigo-300 max-w-3xl mx-auto"> 
              Control your smart office wall through professional touch panels or comprehensive business apps,  
              both designed for seamless integration with your workplace systems. 
            </p> 
            <div className="mt-4 flex items-center justify-center text-indigo-400 text-sm">
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
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500 shadow-lg shadow-indigo-500/20' 
                    : 'bg-purple-800/50 border-purple-700/50 hover:border-indigo-600/50 hover:bg-purple-700/50' 
                }`} 
              > 
                <div className="flex items-center space-x-4 mb-6"> 
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${ 
                    selectedControl === method.id  
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500'  
                      : 'bg-purple-700 group-hover:bg-indigo-600' 
                  }`}> 
                    <div className="text-white">{method.icon}</div> 
                  </div> 
                  <div className="flex-1"> 
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors"> 
                      {method.name} 
                    </h3> 
                    <p className="text-indigo-300">{method.description}</p> 
                  </div> 
                  {selectedControl === method.id && ( 
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"> 
                      <CheckCircle className="w-4 h-4 text-white" /> 
                    </div> 
                  )} 
                </div> 
                
                <div className="space-y-3"> 
                  {method.features.map((feature, index) => ( 
                    <div key={index} className="flex items-center space-x-3"> 
                      <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" /> 
                      <span className="text-indigo-300">{feature}</span> 
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
            className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30 text-center" 
          > 
            <div className="flex items-center justify-center space-x-4 mb-4"> 
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"> 
                {currentControl.icon} 
              </div> 
              <h3 className="text-3xl font-bold text-white">{currentControl.name}</h3> 
            </div> 
            <p className="text-indigo-300 text-lg max-w-2xl mx-auto"> 
              {currentControl.description} - Experience seamless control with advanced features  
              designed for professional environments and business integration. 
            </p> 
          </motion.div> 
        </div> 
      </section> 

      {/* Smart Devices Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-200 bg-clip-text text-transparent">Smart Office</span>
              <span className="block text-indigo-100">Devices</span>
            </h2>
            <p className="text-xl text-indigo-300 max-w-4xl mx-auto">
              Discover our range of professional smart devices designed for office environments,
              offering intelligent control and enhanced productivity features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                ...orviboCatalog.mixPad,
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                ...orviboCatalog.smartLighting,
                gradient: "from-purple-500 to-indigo-600"
              },
              {
                ...orviboCatalog.smartClimate,
                gradient: "from-indigo-600 to-purple-400"
              },
              {
                ...orviboCatalog.cctv,
                gradient: "from-purple-400 to-indigo-500"
              },
              {
                ...orviboCatalog.smartSwitch,
                gradient: "from-indigo-500 to-purple-600"
              },
              {
                ...orviboCatalog.musicSystem,
                gradient: "from-purple-600 to-indigo-400"
              }
            ].map((device, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-purple-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${device.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <device.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-200 transition-colors">
                  {device.title}
                </h3>
                <p className="text-indigo-300 leading-relaxed mb-4">{device.description}</p>
                <div className="space-y-2">
                  {device.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span className="text-indigo-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall Finishes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-200 bg-clip-text text-transparent">Professional Wall</span>
              <span className="block text-indigo-100">Finishes</span>
            </h2>
            <p className="text-xl text-indigo-300 max-w-4xl mx-auto">
              Choose from our premium selection of professional wall finishes,
              designed to create the perfect atmosphere for productive work environments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {textureCategories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-purple-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                   
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-indigo-300 leading-relaxed mb-4">{category.desc}</p>
                  <div className="space-y-2">
                    {category.panels.slice(0, 3).map((panel, panelIndex) => (
                      <div key={panel.id} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full flex-shrink-0"></div>
                        <span className="text-indigo-300 text-sm">{panel.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */} 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-indigo-900"> 
        <div className="max-w-7xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-16" 
          > 
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-200 bg-clip-text text-transparent">Why Choose</span> 
              <span className="block text-indigo-100">Smart Office Walls?</span> 
            </h2> 
            <p className="text-xl text-indigo-300 max-w-4xl mx-auto"> 
              Experience the perfect blend of professional design, intelligent automation, and productivity technology  
              that transforms your office into a connected, efficient workspace optimised for collaboration and success. 
            </p> 
          </motion.div> 

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {[ 
              { 
                icon: <Monitor className="w-8 h-8" />, 
                title: "Integrated Display Technology", 
                description: "Professional 4K displays with wireless presentation capabilities, multi-device support, and touch interaction for seamless collaboration.", 
                gradient: "from-indigo-500 to-purple-500" 
              }, 
              { 
                icon: <Video className="w-8 h-8" />, 
                title: "Video Conferencing Hub", 
                description: "Integrated HD cameras, professional microphones with noise cancellation, and premium speakers for broadcast-quality virtual meetings.", 
                gradient: "from-purple-500 to-indigo-600" 
              }, 
              { 
                icon: <Lightbulb className="w-8 h-8" />, 
                title: "Productivity Lighting", 
                description: "Circadian lighting system optimised for work performance with task lighting, presentation modes, and energy-saving automation.", 
                gradient: "from-indigo-600 to-purple-400" 
              }, 
              { 
                icon: <Wifi className="w-8 h-8" />, 
                title: "Connectivity Hub", 
                description: "Wireless charging zones, USB-C ports, comprehensive cable management, and seamless network access for all devices.", 
                gradient: "from-purple-400 to-indigo-500" 
              }, 
              { 
                icon: <Thermometer className="w-8 h-8" />, 
                title: "Climate Management", 
                description: "Intelligent temperature and air quality control with zone management, automated scheduling, and energy efficiency optimisation.", 
                gradient: "from-indigo-500 to-purple-600" 
              }, 
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "Business Integration", 
                description: "Seamless integration with existing IT infrastructure, security protocols, and business applications for unified workspace management.", 
                gradient: "from-purple-600 to-indigo-400" 
              } 
            ].map((feature, index) => ( 
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                className="group bg-purple-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:transform hover:scale-105" 
              > 
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}> 
                  <div className="text-white">{feature.icon}</div> 
                </div> 
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-200 transition-colors"> 
                  {feature.title} 
                </h3> 
                <p className="text-indigo-300 leading-relaxed">{feature.description}</p> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* FAQ Section */} 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-900 to-purple-900"> 
        <div className="max-w-4xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-16" 
          > 
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-200 bg-clip-text text-transparent">Frequently Asked</span> 
              <span className="block text-indigo-100">Questions</span> 
            </h2> 
            <p className="text-xl text-indigo-300"> 
              Everything you need to know about smart office wall installation and workplace technology 
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
                className="bg-purple-800/50 backdrop-blur-sm rounded-2xl border border-indigo-500/20 overflow-hidden hover:border-indigo-400/40 transition-all duration-300" 
              > 
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} 
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-purple-700/30 transition-colors" 
                > 
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span> 
                  <ChevronDown 
                    className={`w-6 h-6 text-indigo-400 transition-transform duration-300 ${ 
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
                        <p className="text-indigo-300 leading-relaxed">{faq.answer}</p> 
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-900"> 
        <div className="max-w-5xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-12" 
          > 
            <h2 className="text-3xl font-bold text-white mb-4">Related Searches</h2> 
            <p className="text-indigo-300">Popular office automation and workplace technology searches</p> 
          </motion.div> 

          <div className="flex flex-wrap gap-3 justify-center"> 
            {relatedSearches.map((search, index) => ( 
              <motion.span 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.4, delay: index * 0.05 }} 
                className="bg-purple-800/50 border border-indigo-500/20 rounded-full px-6 py-3 text-sm text-indigo-300 hover:border-indigo-400/40 hover:text-white hover:bg-purple-700/50 transition-all duration-300 cursor-pointer" 
              > 
                {search} 
              </motion.span> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Contact Sidebar */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gradient-to-b from-indigo-600/90 to-purple-600/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl max-w-xs"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white mb-2">Get Expert Advice</h3>
            <p className="text-indigo-100 text-sm">Speak to our office specialists</p>
          </div>
          
          <div className="space-y-4">
            <motion.button
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Free Quote</span>
            </motion.button>
            
            <motion.a
              href="tel:+441417393377"
              className="w-full bg-transparent hover:bg-white/10 border border-white/30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </motion.a>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="flex items-center space-x-2 text-indigo-100 text-xs">
              <Clock className="w-3 h-3" />
              <span>Mon-Fri, 9AM-6PM</span>
            </div>
            <div className="flex items-center space-x-2 text-indigo-100 text-xs mt-1">
              <MapPin className="w-3 h-3" />
              <span>Glasgow, UK</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */} 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900"> 
        <div className="max-w-5xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-indigo-500/30 text-center relative overflow-hidden" 
          > 
            {/* Background Pattern */} 
            <div className="absolute inset-0 opacity-10"> 
              <div className="absolute inset-0" style={{ 
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)` 
              }}></div> 
            </div> 

            <div className="relative z-10"> 
              <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
                <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-200 bg-clip-text text-transparent">Ready to Transform</span> 
                <span className="block text-indigo-100">Your Workspace?</span> 
              </h2> 
              <p className="text-xl text-indigo-300 mb-10 max-w-3xl mx-auto"> 
                Join hundreds of satisfied businesses who've transformed their offices into intelligent workspaces.  
                Get your free consultation and custom quote today. 
              </p> 
              <div className="flex flex-col sm:flex-row gap-6 justify-center"> 
                <button 
                  onClick={() => setIsQuoteModalOpen(true)} 
                  className="px-10 py-5 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-3 group bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300" 
                > 
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                  <span>Request a Tailored Quote</span> 
                </button> 
                <a 
                  href="tel:+441417393377" 
                  className="border-2 border-indigo-500/50 text-indigo-200 px-10 py-5 rounded-2xl hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3 group" 
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
                <SwQuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                />
            )}
            </AnimatePresence>
    </div> 
  ); 
}; 

export default SmartWallOffice;
