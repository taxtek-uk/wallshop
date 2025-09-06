import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import SwQuoteModal from '@/components/SwQuoteModal';
import { 
  Droplets, 
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
  Bath,
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
  CloudSun
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
      setMetaTag('og:image:alt', 'Smart Bathroom Wall by The Wall Shop', true); 
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
      "name": "Smart Bathroom Wall Installation", 
      "description": "Professional smart bathroom wall installation with integrated lighting, climate control, and moisture-resistant technology. Transform your bathroom into an intelligent wellness sanctuary.", 
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
      "category": "Bathroom Design", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart bathroom wall solutions from consultation to full installation" 
      } 
    }; 

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "Are smart bathroom walls waterproof and moisture-resistant?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, our smart bathroom walls feature fully waterproof construction with moisture-resistant components. All electrical systems use IP-rated devices where applicable, ensuring safe operation in wet environments whilst maintaining smart functionality." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What smart features are available for bathroom walls?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Smart bathroom walls include moisture-resistant lighting, climate control, smart mirrors with integrated displays, heated towel rails, ventilation control, and waterproof speakers for music streaming." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Can I control bathroom features with my smartphone?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, comprehensive smartphone app control allows you to adjust lighting, temperature, ventilation, and audio systems. The app includes scheduling features, usage monitoring, and remote access capabilities." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Do smart bathroom walls include ventilation control?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, integrated ventilation systems automatically manage humidity levels and air quality. The system includes smart sensors that activate ventilation based on moisture levels and usage patterns." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What lighting options are available for bathroom walls?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Moisture-resistant LED lighting includes warm white for relaxation, cool white for grooming tasks, RGB colour options, automated dimming, and integrated mirror lighting with anti-fog features." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Are smart bathroom installations compliant with UK building regulations?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, all installations comply with UK Building Regulations Part P and BS 7671 electrical safety standards. We ensure proper IP ratings for wet zones and professional certification for all electrical work." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Can smart bathroom walls include heated surfaces?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, integrated heating elements can be incorporated into wall panels and mirror surfaces. The system includes programmable temperature control and energy-efficient operation with smart scheduling capabilities." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What warranty is provided for bathroom wall installations?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "We provide a comprehensive 5-year warranty covering all smart components, waterproofing, electrical systems, and installation workmanship. This includes free maintenance visits and technical support." 
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

// Orvibo Device Catalog for Bathroom
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

// Texture Categories for Bathroom
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
      { id: "T6201", name: "Pearl Shimmer", img: "/images/carbon-rock-boards/fabric/t6201.jpg", desc: "Elegant woven finish with a soft pearl shimmer", stock: 10 }
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
      { id: "T9222", name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast", stock: 10 }
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
      { id: "T8201", name: "Warm Blush", img: "/images/carbon-rock-boards/solid/1.jpg", desc: "A soft blush hue for cozy minimalism", stock: 10 },
      { id: "T8026", name: "Ash Silver", img: "/images/carbon-rock-boards/solid/2.jpg", desc: "Neutral silver-gray with a clean industrial look", stock: 10 },
      { id: "T8039", name: "Ivory", img: "/images/carbon-rock-boards/solid/4.jpg", desc: "Soft ivory tone perfect for elegant settings", stock: 10 }
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
      { id: "S3232", name: "Black & Blue", img: "/images/carbon-rock-boards/stone/s3232.jpg", desc: "Stone texture Black & Blue", stock: 10 },
      { id: "T3017", name: "Mid Grey & White", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture Mid Grey & White", stock: 10 }
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
      { id: "LS-2A05", name: "Antique Copper", img: "/images/carbon-rock-boards/metal/ls-2a05.jpg", desc: "Rich antique copper finish with timeless, rustic charm", stock: 10 },
      { id: "SZ-703", name: "Brushed Silver", img: "/images/carbon-rock-boards/metal/sz-703.jpg", desc: "Sleek brushed silver offering a clean, modern look", stock: 10 },
      { id: "H-8301", name: "Brushed Copper", img: "/images/carbon-rock-boards/metal/h-8301.jpg", desc: "Textured brushed copper with a warm metallic tone", stock: 10 }
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
      { id: "MR2001", name: "Mirror Gold", img: "/images/carbon-rock-boards/mirror/1.webp", desc: "Elegant gold mirror with a warm reflection", stock: 10 },
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

interface BathroomSize { 
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

const SmartWallBathroom: React.FC = () => { 
  const [selectedBathroomSize, setSelectedBathroomSize] = useState<string>('standard'); 
  const [selectedControl, setSelectedControl] = useState<string>('panel'); 
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null); 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 
  const [isHelpMode, setIsHelpMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHotspotIndex, setCurrentHotspotIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null); 

  // Bathroom size configurations 
  const bathroomSizes: BathroomSize[] = [ 
    { 
      id: 'compact', 
      name: 'Compact', 
      dimensions: '1.5m × 2m', 
      description: 'Perfect for en-suites and powder rooms' 
    }, 
    { 
      id: 'standard', 
      name: 'Standard', 
      dimensions: '2m × 2.5m', 
      description: 'Most popular choice for family bathrooms' 
    }, 
    { 
      id: 'luxury', 
      name: 'Luxury', 
      dimensions: '3m × 4m', 
      description: 'Ultimate spa experience for master en-suites' 
    } 
  ]; 

  // Control method configurations 
  const controlMethods: ControlMethod[] = [ 
    { 
      id: 'panel', 
      name: 'Waterproof Touch Panel', 
      icon: <Sun className="w-6 h-6" />, 
      description: 'Moisture-resistant touch panels with intuitive controls', 
      features: ['IP65 waterproof rating', 'Steam-resistant display', 'Haptic feedback', 'Night mode display'] 
    }, 
    { 
      id: 'phone', 
      name: 'Smartphone App', 
      icon: <Smartphone className="w-6 h-6" />, 
      description: 'Complete control through your smartphone or tablet', 
      features: ['iOS & Android apps', 'Remote access', 'Usage monitoring', 'Scheduling features'] 
    } 
  ]; 

  // Bathroom-specific hotspots
  const hotspots: Hotspot[] = [ 
    { 
      id: 'smart-mirror', 
      x: 50, 
      y: 25, 
      title: 'Smart Mirror Integration', 
      description: 'Intelligent mirror with integrated display and anti-fog technology', 
      icon: <Square className="w-5 h-5" />, 
      features: ['Anti-fog heating', 'Integrated display', 'Touch controls', 'LED backlighting'] 
    }, 
    { 
      id: 'moisture-lighting', 
      x: 25, 
      y: 40, 
      title: 'Moisture-Resistant Lighting', 
      description: 'IP-rated LED lighting systems designed for wet environments', 
      icon: <Lightbulb className="w-5 h-5" />, 
      features: ['IP65 waterproof rating', 'Colour temperature control', 'Dimming capability', 'Emergency lighting'] 
    }, 
    { 
      id: 'ventilation-control', 
      x: 75, 
      y: 40, 
      title: 'Smart Ventilation', 
      description: 'Intelligent humidity and air quality management', 
      icon: <Fan className="w-5 h-5" />, 
      features: ['Humidity sensors', 'Automatic activation', 'Quiet operation', 'Energy efficient'] 
    }, 
    { 
      id: 'heated-surfaces', 
      x: 40, 
      y: 65, 
      title: 'Heated Wall Surfaces', 
      description: 'Integrated heating elements for comfort and moisture control', 
      icon: <Thermometer className="w-5 h-5" />, 
      features: ['Radiant heating', 'Temperature control', 'Energy efficient', 'Quick warm-up'] 
    }, 
    { 
      id: 'waterproof-audio', 
      x: 60, 
      y: 65, 
      title: 'Waterproof Audio System', 
      description: 'Moisture-resistant speakers for relaxation and entertainment', 
      icon: <Volume2 className="w-5 h-5" />, 
      features: ['IP67 waterproof rating', 'Bluetooth connectivity', 'Voice control', 'High-quality sound'] 
    } 
  ]; 

  // FAQ Data 
  const faqData = [ 
    { 
      question: "Are smart bathroom walls waterproof and moisture-resistant?", 
      answer: "Yes, our smart bathroom walls feature fully waterproof construction with moisture-resistant components. All electrical systems use IP-rated devices where applicable, ensuring safe operation in wet environments whilst maintaining smart functionality." 
    }, 
    { 
      question: "What smart features are available for bathroom walls?", 
      answer: "Smart bathroom walls include moisture-resistant lighting, climate control, smart mirrors with integrated displays, heated towel rails, ventilation control, and waterproof speakers for music streaming. All features are designed specifically for bathroom environments." 
    }, 
    { 
      question: "Can I control bathroom features with my smartphone?", 
      answer: "Yes, our comprehensive smartphone app provides complete control over lighting, temperature, ventilation, and audio systems. The app includes advanced scheduling features, usage monitoring, and remote access capabilities for ultimate convenience." 
    }, 
    { 
      question: "Do smart bathroom walls include ventilation control?", 
      answer: "Yes, integrated ventilation systems automatically manage humidity levels and air quality. The system includes smart sensors that activate ventilation based on moisture levels and usage patterns, ensuring optimal bathroom conditions." 
    }, 
    { 
      question: "What lighting options are available for bathroom walls?", 
      answer: "Moisture-resistant LED lighting includes warm white for relaxation, cool white for grooming tasks, RGB colour options, automated dimming based on time of day, and integrated mirror lighting with anti-fog features for clear visibility." 
    }, 
    { 
      question: "Are smart bathroom installations compliant with UK building regulations?", 
      answer: "Yes, all installations comply with UK Building Regulations Part P and BS 7671 electrical safety standards. We ensure proper IP ratings for wet zones and professional certification for all electrical work, guaranteeing safety and compliance." 
    }, 
    { 
      question: "Can smart bathroom walls include heated surfaces?", 
      answer: "Yes, integrated heating elements can be incorporated into wall panels and mirror surfaces. The system includes programmable temperature control and energy-efficient operation with smart scheduling capabilities for optimal comfort and energy usage." 
    }, 
    { 
      question: "What warranty is provided for bathroom wall installations?", 
      answer: "We provide a comprehensive 5-year warranty covering all smart components, waterproofing, electrical systems, and installation workmanship. This includes free maintenance visits, software updates, and technical support to ensure your system continues performing optimally." 
    } 
  ]; 

  // Related searches data 
  const relatedSearches = [ 
    "smart bathroom design UK", "waterproof bathroom technology", "bathroom automation systems", "smart mirror installation", 
    "bathroom LED lighting", "moisture resistant smart devices", "bathroom ventilation control", "heated bathroom walls", 
    "intelligent bathroom systems", "bathroom smart home", "automated bathroom controls", "luxury bathroom technology" 
  ]; 

  // Get current bathroom size details 
  const currentBathroomSize = bathroomSizes.find(size => size.id === selectedBathroomSize) || bathroomSizes[1]; 
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
        title="Smart Bathroom Walls UK | Waterproof Smart Technology | The Wall Shop" 
        description="Transform your bathroom with intelligent smart walls featuring waterproof technology, moisture-resistant lighting, climate control, and smart mirrors. Professional installation across the UK." 
        canonical="https://www.thewallshop.co.uk/smart-walls/bathroom" 
        keywords="smart bathroom walls, waterproof smart technology, bathroom automation, smart mirrors, moisture resistant lighting, bathroom climate control, intelligent bathroom systems, UK bathroom installation" 
        ogImage="https://www.thewallshop.co.uk/images/smart-bathroom-wall-og.jpg" 
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
                  <span className="ml-1 text-sm font-medium text-clay-200 md:ml-2">Bathroom</span> 
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-teal-500/15"></div> 
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)` 
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
                background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)` 
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
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/30 to-teal-500/30 backdrop-blur-md border border-blue-500/40 rounded-full px-6 py-3 shadow-lg"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            > 
              <Droplets className="w-5 h-5 text-blue-300" /> 
              <span className="text-blue-100 font-medium">Waterproof Smart Technology</span> 
            </motion.div> 

            {/* Enhanced Main Heading */} 
            <div className="space-y-6"> 
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              > 
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-200 to-teal-400 pb-2">Smart Bathroom</span> 
                <span className="block text-blue-50 mt-2 drop-shadow">Sanctuary</span> 
              </motion.h1> 
              <motion.p 
                className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              > 
                Transform your bathroom into an intelligent wellness sanctuary with waterproof smart technology,  
                moisture-resistant lighting, climate control, and automated systems designed for ultimate comfort and safety. 
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
                { icon: <Droplets className="w-8 h-8" />, value: "IP65", label: "Waterproof Rating" }, 
                { icon: <Star className="w-8 h-8" />, value: "4.9/5", label: "Customer Rating" }, 
                { icon: <Shield className="w-8 h-8" />, value: "5 Year", label: "Warranty" }, 
                { icon: <Thermometer className="w-8 h-8" />, value: "24/7", label: "Climate Control" } 
              ].map((stat, index) => ( 
                <motion.div 
                  key={index} 
                  className="text-center p-4 rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                > 
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/30 to-teal-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-500/40"> 
                    <div className="text-blue-300">{stat.icon}</div> 
                  </div> 
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div> 
                  <div className="text-blue-300 text-sm mt-1">{stat.label}</div> 
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
                className="px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-2 group relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-700 text-white shadow-lg hover:from-blue-700 hover:to-teal-800 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              > 
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer"></span>
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform z-10" /> 
                <span className="z-10">Request a Tailored Quote</span> 
              </motion.button> 
              <motion.a 
                href="tel:+441417393377" 
                className="border-2 border-blue-500/50 text-blue-200 px-8 py-4 rounded-2xl hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 group"
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

      {/* Enhanced Bathroom Size Configuration Section */} 
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden"> 
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-teal-500/15"></div> 
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)` 
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
                background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)`
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
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-5 py-1.5 mb-4"
            >
              <Bath className="w-4 h-4 text-blue-400" />
              <span className="text-blue-200 font-medium text-sm">Custom Bathroom Sizing</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-200 to-teal-400">Choose Your</span> 
              <span className="block text-blue-50 mt-2">Bathroom Configuration</span> 
            </h2> 
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed"> 
              Our smart bathroom walls are custom-designed to perfectly fit your space and requirements,  
              ensuring optimal functionality and aesthetic appeal in any bathroom size. 
            </p> 
            <motion.div 
              className="mt-4 flex items-center justify-center text-blue-300 text-sm bg-blue-500/10 backdrop-blur-sm rounded-full px-4 py-2 inline-flex"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Info className="w-4 h-4 mr-2" />
              <span>Select your bathroom size to see custom options</span>
            </motion.div>
          </motion.div> 

          <div className="grid md:grid-cols-3 gap-6 mb-12"> 
            {bathroomSizes.map((bathroomSize, index) => ( 
              <motion.button 
                key={bathroomSize.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                onClick={() => setSelectedBathroomSize(bathroomSize.id)} 
                className={`group p-8 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${ 
                  selectedBathroomSize === bathroomSize.id 
                    ? 'bg-gradient-to-b from-blue-600/30 to-teal-600/20 border-blue-500/60 shadow-2xl shadow-blue-500/20' 
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-700/50' 
                }`} 
                whileHover={{ y: -5 }}
              > 
                {/* Selection glow effect */}
                {selectedBathroomSize === bathroomSize.id && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 animate-pulse"></div>
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6"> 
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${ 
                      selectedBathroomSize === bathroomSize.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700/50 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300' 
                    }`}> 
                      <Bath className="w-6 h-6" /> 
                    </div> 
                    {selectedBathroomSize === bathroomSize.id && ( 
                      <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg"> 
                        <CheckCircle className="w-4 h-4 text-white" /> 
                      </div> 
                    )} 
                  </div> 
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors"> 
                    {bathroomSize.name} 
                  </h3> 
                  <p className="text-blue-300 text-lg mb-3 font-medium">{bathroomSize.dimensions}</p> 
                  <p className="text-blue-400 mb-4 leading-relaxed">{bathroomSize.description}</p>
                  
                  {/* Feature indicators */}
                  <div className="flex space-x-2 mt-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        selectedBathroomSize === bathroomSize.id 
                          ? 'bg-blue-400' 
                          : 'bg-gray-600 group-hover:bg-blue-500/60'
                      }`}></div>
                    ))}
                  </div>
                </div>
              </motion.button> 
            ))} 
          </div> 

          {/* Enhanced Current Selection Display */} 
          <motion.div 
            key={selectedBathroomSize} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, type: "spring" }} 
            className="bg-gradient-to-r from-blue-500/15 to-teal-500/15 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/40 text-center relative overflow-hidden shadow-xl"
          > 
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4"> 
                {currentBathroomSize.name} Bathroom Configuration 
              </h3> 
              <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed"> 
                Optimised smart wall design for {currentBathroomSize.dimensions} bathrooms with waterproof features  
                and premium integration options tailored to your space and requirements. 
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 bg-clip-text text-transparent">Explore Smart</span>
              <span className="block text-blue-50 mt-2">Bathroom Features</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Discover the intelligent, waterproof features integrated into your bathroom wall system
              that work together to create the perfect wellness environment.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-center justify-center text-blue-300 text-sm bg-blue-800/20 backdrop-blur-sm rounded-full py-2 px-4 w-fit mx-auto border border-blue-700/30"
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
                src="/images/bathroom-smart-wall-hero.webp"
                alt="Smart Bathroom Wall with integrated waterproof features and controls"
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
                      Click on the blue markers to explore smart bathroom features. Use the play button for an automatic tour.
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
                      ? 'bg-blue-500/90 scale-125 shadow-lg shadow-blue-500/50'
                      : 'bg-blue-500/70 hover:bg-blue-500/90 hover:scale-110'
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
                          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 flex-shrink-0">
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
                                  <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-teal-900"> 
        <div className="max-w-7xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-16" 
          > 
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 bg-clip-text text-transparent">Choose Your</span> 
              <span className="block text-blue-100">Control Method</span> 
            </h2> 
            <p className="text-xl text-blue-300 max-w-3xl mx-auto"> 
              Control your smart bathroom wall through waterproof touch panels or comprehensive smartphone apps,  
              both designed for safe operation in wet environments. 
            </p> 
            <div className="mt-4 flex items-center justify-center text-blue-400 text-sm">
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
                    ? 'bg-gradient-to-r from-blue-500/20 to-teal-500/20 border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'bg-teal-800/50 border-teal-700/50 hover:border-blue-600/50 hover:bg-teal-700/50' 
                }`} 
              > 
                <div className="flex items-center space-x-4 mb-6"> 
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${ 
                    selectedControl === method.id  
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500'  
                      : 'bg-teal-700 group-hover:bg-blue-600' 
                  }`}> 
                    <div className="text-white">{method.icon}</div> 
                  </div> 
                  <div className="flex-1"> 
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors"> 
                      {method.name} 
                    </h3> 
                    <p className="text-blue-300">{method.description}</p> 
                  </div> 
                  {selectedControl === method.id && ( 
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"> 
                      <CheckCircle className="w-4 h-4 text-white" /> 
                    </div> 
                  )} 
                </div> 
                
                <div className="space-y-3"> 
                  {method.features.map((feature, index) => ( 
                    <div key={index} className="flex items-center space-x-3"> 
                      <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" /> 
                      <span className="text-blue-300">{feature}</span> 
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
            className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 text-center" 
          > 
            <div className="flex items-center justify-center space-x-4 mb-4"> 
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center"> 
                {currentControl.icon} 
              </div> 
              <h3 className="text-3xl font-bold text-white">{currentControl.name}</h3> 
            </div> 
            <p className="text-blue-300 text-lg max-w-2xl mx-auto"> 
              {currentControl.description} - Experience seamless control with advanced features  
              designed for your comfort and safety in wet environments. 
            </p> 
          </motion.div> 
        </div> 
      </section> 

      {/* Smart Devices Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 bg-clip-text text-transparent">Smart Bathroom</span>
              <span className="block text-blue-100">Devices</span>
            </h2>
            <p className="text-xl text-blue-300 max-w-4xl mx-auto">
              Discover our range of waterproof smart devices specifically designed for bathroom environments,
              offering intelligent control and enhanced functionality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                ...orviboCatalog.mixPad,
                gradient: "from-blue-500 to-teal-500"
              },
              {
                ...orviboCatalog.smartLighting,
                gradient: "from-teal-500 to-blue-600"
              },
              {
                ...orviboCatalog.smartClimate,
                gradient: "from-blue-600 to-teal-400"
              },
              {
                ...orviboCatalog.musicSystem,
                gradient: "from-teal-400 to-blue-500"
              },
              {
                ...orviboCatalog.smartSwitch,
                gradient: "from-blue-500 to-teal-600"
              },
              {
                ...orviboCatalog.skyDomeLight,
                gradient: "from-teal-600 to-blue-400"
              }
            ].map((device, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-teal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${device.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <device.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                  {device.title}
                </h3>
                <p className="text-blue-300 leading-relaxed mb-4">{device.description}</p>
                <div className="space-y-2">
                  {device.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-blue-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall Finishes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-teal-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 bg-clip-text text-transparent">Waterproof Wall</span>
              <span className="block text-blue-100">Finishes</span>
            </h2>
            <p className="text-xl text-blue-300 max-w-4xl mx-auto">
              Choose from our premium selection of moisture-resistant wall finishes,
              specially designed for bathroom environments with superior durability and style.
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
                className="group bg-teal-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105"
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
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-blue-300 leading-relaxed mb-4">{category.desc}</p>
                  <div className="space-y-2">
                    {category.panels.slice(0, 3).map((panel, panelIndex) => (
                      <div key={panel.id} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-blue-300 text-sm">{panel.name}</span>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-900 to-blue-900"> 
        <div className="max-w-7xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-16" 
          > 
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 bg-clip-text text-transparent">Why Choose</span> 
              <span className="block text-blue-100">Smart Bathroom Walls?</span> 
            </h2> 
            <p className="text-xl text-blue-300 max-w-4xl mx-auto"> 
              Experience the perfect blend of luxury design, intelligent automation, and waterproof technology  
              that transforms your bathroom into a personal wellness sanctuary optimised for comfort and safety. 
            </p> 
          </motion.div> 

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {[ 
              { 
                icon: <Droplets className="w-8 h-8" />, 
                title: "Waterproof Technology", 
                description: "Fully waterproof construction with IP-rated components ensures safe operation in wet environments whilst maintaining smart functionality.", 
                gradient: "from-blue-500 to-teal-500" 
              }, 
              { 
                icon: <Square className="w-8 h-8" />, 
                title: "Smart Mirror Integration", 
                description: "Intelligent mirrors with anti-fog heating, integrated displays, and touch controls for enhanced functionality and convenience.", 
                gradient: "from-teal-500 to-blue-600" 
              }, 
              { 
                icon: <Fan className="w-8 h-8" />, 
                title: "Humidity Control", 
                description: "Advanced ventilation systems automatically manage moisture levels and air quality for optimal bathroom conditions.", 
                gradient: "from-blue-600 to-teal-400" 
              }, 
              { 
                icon: <Thermometer className="w-8 h-8" />, 
                title: "Heated Surfaces", 
                description: "Integrated heating elements provide comfort and moisture control with programmable temperature settings.", 
                gradient: "from-teal-400 to-blue-500" 
              }, 
              { 
                icon: <Lightbulb className="w-8 h-8" />, 
                title: "Moisture-Resistant Lighting", 
                description: "IP-rated LED lighting with colour temperature control, dimming capability, and automated scheduling for perfect ambience.", 
                gradient: "from-blue-500 to-teal-600" 
              }, 
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "UK Compliance & Safety", 
                description: "Full compliance with UK Building Regulations Part P and BS 7671 electrical safety standards for complete peace of mind.", 
                gradient: "from-teal-600 to-blue-400" 
              } 
            ].map((feature, index) => ( 
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                className="group bg-teal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105" 
              > 
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}> 
                  <div className="text-white">{feature.icon}</div> 
                </div> 
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors"> 
                  {feature.title} 
                </h3> 
                <p className="text-blue-300 leading-relaxed">{feature.description}</p> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Compliance & Safety Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-teal-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 bg-clip-text text-transparent">UK Compliance</span>
              <span className="block text-blue-100">& Safety Standards</span>
            </h2>
            <p className="text-xl text-blue-300 max-w-4xl mx-auto">
              All our smart bathroom installations meet the highest UK safety standards and building regulations,
              ensuring complete compliance and peace of mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "BS 7671 Compliance",
                description: "Full compliance with UK electrical safety standards",
                gradient: "from-blue-500 to-teal-500"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Part P Certified",
                description: "Building Regulations electrical work certification",
                gradient: "from-teal-500 to-blue-600"
              },
              {
                icon: <Droplets className="w-8 h-8" />,
                title: "IP Rating Standards",
                description: "Proper IP ratings for wet zones and safety",
                gradient: "from-blue-600 to-teal-400"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Professional Installation",
                description: "Certified electricians and installation teams",
                gradient: "from-teal-400 to-blue-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-teal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-blue-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */} 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-900 to-blue-900"> 
        <div className="max-w-4xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-16" 
          > 
            <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
              <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 bg-clip-text text-transparent">Frequently Asked</span> 
              <span className="block text-blue-100">Questions</span> 
            </h2> 
            <p className="text-xl text-blue-300"> 
              Everything you need to know about smart bathroom wall installation and waterproof technology 
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
                className="bg-teal-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden hover:border-blue-400/40 transition-all duration-300" 
              > 
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} 
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-teal-700/30 transition-colors" 
                > 
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span> 
                  <ChevronDown 
                    className={`w-6 h-6 text-blue-400 transition-transform duration-300 ${ 
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
                        <p className="text-blue-300 leading-relaxed">{faq.answer}</p> 
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900"> 
        <div className="max-w-5xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-12" 
          > 
            <h2 className="text-3xl font-bold text-white mb-4">Related Searches</h2> 
            <p className="text-blue-300">Popular bathroom automation and smart technology searches</p> 
          </motion.div> 

          <div className="flex flex-wrap gap-3 justify-center"> 
            {relatedSearches.map((search, index) => ( 
              <motion.span 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.4, delay: index * 0.05 }} 
                className="bg-teal-800/50 border border-blue-500/20 rounded-full px-6 py-3 text-sm text-blue-300 hover:border-blue-400/40 hover:text-white hover:bg-teal-700/50 transition-all duration-300 cursor-pointer" 
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
          className="bg-gradient-to-b from-blue-600/90 to-teal-600/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl max-w-xs"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white mb-2">Get Expert Advice</h3>
            <p className="text-blue-100 text-sm">Speak to our bathroom specialists</p>
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
            <div className="flex items-center space-x-2 text-blue-100 text-xs">
              <Clock className="w-3 h-3" />
              <span>Mon-Fri, 9AM-6PM</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-100 text-xs mt-1">
              <MapPin className="w-3 h-3" />
              <span>Glasgow, UK</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */} 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-teal-800 to-blue-900"> 
        <div className="max-w-5xl mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/30 text-center relative overflow-hidden" 
          > 
            {/* Background Pattern */} 
            <div className="absolute inset-0 opacity-10"> 
              <div className="absolute inset-0" style={{ 
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)` 
              }}></div> 
            </div> 

            <div className="relative z-10"> 
              <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
                <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-teal-200 bg-clip-text text-transparent">Ready to Transform</span> 
                <span className="block text-blue-100">Your Bathroom?</span> 
              </h2> 
              <p className="text-xl text-blue-300 mb-10 max-w-3xl mx-auto"> 
                Join hundreds of satisfied customers who've transformed their bathrooms into intelligent wellness sanctuaries.  
                Get your free consultation and custom quote today. 
              </p> 
              <div className="flex flex-col sm:flex-row gap-6 justify-center"> 
                <button 
                  onClick={() => setIsQuoteModalOpen(true)} 
                  className="px-10 py-5 text-lg font-semibold rounded-2xl flex items-center justify-center space-x-3 group bg-gradient-to-r from-blue-600 to-teal-700 text-white shadow-lg hover:from-blue-700 hover:to-teal-800 transition-all duration-300" 
                > 
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                  <span>Request a Tailored Quote</span> 
                </button> 
                <a 
                  href="tel:+441417393377" 
                  className="border-2 border-blue-500/50 text-blue-200 px-10 py-5 rounded-2xl hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3 group" 
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

export default SmartWallBathroom;