import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SwQuoteModal from '@/components/SwQuoteModal';
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

  // Gaming-Specific Wall Panel Finishes
  const finishCategories: FinishCategory[] = [
  {
    id: 'fabric',
    name: "Cloth Pattern Series",
    desc: "Soft textile pattern with acoustic value.",
    icon: Layers,
    img: "/images/carbon-rock-boards/cloth.jpg",
    color: "from-leather-100 to-mocha-100",
    accent: "leather-600",
    panels: [
      { id: "T6004", name: "Stone Weave", img: "/images/carbon-rock-boards/fabric/t6004.jpg", desc: "Subtle woven texture with a natural stone-inspired fabric look, ideal for refined interiors.", stock: 10 },
      { id: "T6104", name: "Stone Bead", img: "/images/carbon-rock-boards/fabric/t6104.jpg", desc: "Delicate beaded weave with a tactile stone-like surface, offering a modern textile effect.", stock: 10 },
      { id: "T6201", name: "Pearl Shimmer", img: "/images/carbon-rock-boards/fabric/t6201.jpg", desc: "Elegant woven finish with a soft pearl shimmer, adding subtle radiance to interiors.", stock: 10 },
      { id: "T6301", name: "Chambray Grid", img: "/images/carbon-rock-boards/fabric/t6301.jpg", desc: "Classic chambray-style grid pattern with a balanced woven texture for modern spaces.", stock: 10 },
      { id: "S6026", name: "Mauve Weave", img: "/images/carbon-rock-boards/fabric/s6026.jpg", desc: "Textured weave in a soft mauve tone, blending warmth with subtle sophistication.", stock: 10 },
      { id: "S6029", name: "Rice Grain Weave", img: "/images/carbon-rock-boards/fabric/s6029.jpg", desc: "Distinctive rice-grain weave resembling natural linen threads for an organic appeal.", stock: 10 },
      { id: "T6102", name: "Silver Mesh", img: "/images/carbon-rock-boards/fabric/t6102.jpg", desc: "Reflective mesh weave with a silver metallic effect, adding depth and dimension.", stock: 10 },
      { id: "T6306", name: "Alabaster Cotton", img: "/images/carbon-rock-boards/fabric/t6306.jpg", desc: "Smooth cotton-inspired surface in an alabaster tone, offering a clean and minimal look.", stock: 10 },
      { id: "S6020", name: "Soft Gauze", img: "/images/carbon-rock-boards/fabric/t6020.jpg", desc: "Lightweight gauze-like texture with a delicate, airy transparency.", stock: 10 }
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
      { id: "T9012", name: "Rosewood Brown", img: "/images/carbon-rock-boards/wood/4.jpg", desc: "Warm reddish grain like tropical leatherwood", stock: 10 },
      { id: "T9015", name: "Weathered Storm", img: "/images/carbon-rock-boards/wood/5.jpg", desc: "Weathered wood texture with a stormy tone", stock: 10 },
      { id: "T9053", name: "Walnut Stream", img: "/images/carbon-rock-boards/wood/6.jpg", desc: "Strong walnut character with deep flowing grain", stock: 10 }
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
      { id: "T8107", name: "Slate Blue", img: "/images/carbon-rock-boards/solid/3.jpg", desc: "Dark blue-grey with a sophisticated edge", stock: 10 },
      { id: "T8039", name: "Ivory", img: "/images/carbon-rock-boards/solid/4.jpg", desc: "Soft ivory tone perfect for elegant settings", stock: 10 },
      { id: "T8103", name: "Pearl Cream", img: "/images/carbon-rock-boards/solid/5.jpg", desc: "Soft pearl-beige tone for warm ambience", stock: 10 },
      { id: "T8036", name: "Desert Sand", img: "/images/carbon-rock-boards/solid/6.jpg", desc: "Warm tan reminiscent of natural sands", stock: 10 },
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
      { id: "S3232", name: "Black & Blue", img: "/images/carbon-rock-boards/stone/s3232.jpg", desc: "Stone texture Black & Blue", stock: 10 },
      { id: "S3233", name: "Grey & Blue", img: "/images/carbon-rock-boards/stone/s3233.jpg", desc: "Stone texture Grey & Blue", stock: 10 },
      { id: "T3017", name: "Mid Grey & White", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture Mid Grey & White", stock: 10 },
      { id: "T3019", name: "Black & Brown", img: "/images/carbon-rock-boards/stone/t3019.jpg", desc: "Stone texture Black & Brown", stock: 10 },
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
      { id: "LS-2A05", name: "Antique Copper", img: "/images/carbon-rock-boards/metal/ls-2a05.jpg", desc: "Rich antique copper finish with timeless, rustic charm.", stock: 10 },
      { id: "LS-2A06", name: "Urban Brass", img: "/images/carbon-rock-boards/metal/ls-2a06.jpg", desc: "Bold brass tone with an industrial, modern character.", stock: 10 },
      { id: "LS-2A08", name: "Champagne Gold", img: "/images/carbon-rock-boards/metal/ls-2a08.jpg", desc: "Luxurious champagne gold with a refined, soft glow.", stock: 10 },
      { id: "LS-2A09", name: "Brushed Bronze", img: "/images/carbon-rock-boards/metal/ls-2a09.jpg", desc: "Matte brushed bronze with warm, contemporary appeal.", stock: 10 },
      { id: "SZ-703",  name: "Brushed Silver", img: "/images/carbon-rock-boards/metal/sz-703.jpg",  desc: "Sleek brushed silver offering a clean, modern look.", stock: 10 },
      { id: "SZ-705",  name: "Satin Titanium", img: "/images/carbon-rock-boards/metal/sz-705.jpg",  desc: "Smooth satin titanium with a durable, futuristic finish.", stock: 10 },
      { id: "H-8301",  name: "Brushed Copper", img: "/images/carbon-rock-boards/metal/h-8301.jpg",  desc: "Textured brushed copper with a warm metallic tone.", stock: 10 },
      { id: "SJ-2003", name: "Cobalt Satin Metal", img: "/images/carbon-rock-boards/metal/sj-2003.jpg", desc: "Smooth satin finish with a cool cobalt blue metallic tone.", stock: 10 },
      { id: "S-8026",  name: "Bronze Satin Metal", img: "/images/carbon-rock-boards/metal/s-8026.jpg",  desc: "Elegant satin finish with a rich bronze metallic appearance.", stock: 10 },
      { id: "S-8115",  name: "Steel Shine Mosaic", img: "/images/carbon-rock-boards/metal/s8115.jpg",  desc: "The brushed texture gives it a modern, reflective, metallic look.", stock: 10 }
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
      { id: "MR2001", name: "Mirror Gold", img: "/images/carbon-rock-boards/mirror/1.webp", desc: "Elegant gold mirror with a warm reflection.", stock: 10 },
      { id: "MR2002", name: "Ripple Silver Mirror", img: "/images/carbon-rock-boards/mirror/5.webp", desc: "Elegant silver mirror with a subtle ripple texture for a modern reflective finish.", stock: 10 },
      { id: "MR2003", name: "Mirror Black", img: "/images/carbon-rock-boards/mirror/2.webp", desc: "Bold black mirror with a dramatic reflection.", stock: 10 },
      { id: "MR2004", name: "Ripple Gold Mirror", img: "/images/carbon-rock-boards/mirror/4.webp", desc: "Textured gold mirror with a radiant glow.", stock: 10 },
      { id: "MR2005", name: "Mirror Silver", img: "/images/carbon-rock-boards/mirror/3.webp", desc: "Classic silver mirror with a clear finish.", stock: 10 },
      { id: "MR2006", name: "Mirror White", img: "/images/carbon-rock-boards/mirror/jm03.jpg", desc: "Clean white mirror with a bright reflection.", stock: 10 }
    ]
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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-clay-300 via-clay-200 to-clay-400">Gaming-Optimized</span>
              <span className="block text-clay-100 mt-2">Wall Finishes</span>
            </h2>
            <p className="text-xl text-clay-300 max-w-4xl mx-auto">
              Choose finishes engineered for acoustic control, glare-free visuals, and daily durability—ideal for immersive play and streaming setups.
            </p>
          </motion.div>

          <div className="space-y-10">
            {finishCategories.map((category, index) => {
              const isOpen = !!expanded[category.id];
              const visiblePanels = isOpen
                ? category.panels
                : category.panels.slice(0, DEFAULT_MAX_VISIBLE);

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative rounded-2xl border border-clay-500/20 bg-gradient-to-br from-taupe-800/40 to-clay-800/30 backdrop-blur-md"
                >
                  {/* Category Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-6">
                    <div className="flex items-center gap-4">
                      <div className="grid place-items-center size-12 rounded-xl bg-gradient-to-r from-clay-500 to-taupe-500">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-bold text-white">
                            {category.name}
                          </h3>
                          <span className="inline-flex items-center gap-2 rounded-full border border-clay-500/30 bg-clay-900/40 px-3 py-1 text-xs text-clay-200/80">
                            {category.panels.length} finishes
                          </span>
                        </div>
                        <p className="text-clay-300 mt-1.5">{category.desc}</p>
                      </div>
                    </div>

                    {/* Helper badges (text-only) */}
                    <div className="flex items-center gap-2 text-xs text-clay-200/80">
                      <span className="inline-flex items-center gap-2 rounded-md border border-clay-600/30 bg-clay-800/40 px-2.5 py-1">
                        Acoustic-aware
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-md border border-clay-600/30 bg-clay-800/40 px-2.5 py-1">
                        Scratch-resistant
                      </span>
                    </div>
                  </div>

                  {/* Panels */}
                  <div className="pb-3">
                    {/* Mobile: horizontal rail */}
                    <div className="md:hidden px-6">
                      <div className="-mx-1 flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-clay-700/60">
                        {visiblePanels.map((panel) => (
                          <div
                            key={panel.id}
                            className="group relative w-56 min-w-56 overflow-hidden rounded-xl border border-clay-600/30 bg-clay-900/40 hover:border-clay-400/50 transition-colors"
                          >
                            <div className="aspect-[16/10] overflow-hidden relative">
                              <img
                                src={panel.img}
                                alt={panel.name}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  const t = e.currentTarget as HTMLImageElement;
                                  t.style.display = "none";
                                  const fallback = document.createElement("div");
                                  fallback.className =
                                    "flex h-full w-full items-center justify-center bg-clay-800/50 text-clay-300/80 text-xs";
                                  fallback.textContent = "Image unavailable";
                                  t.parentElement?.appendChild(fallback);
                                }}
                              />
                              <div className="pointer-events-none absolute right-2 top-2 rounded-md bg-clay-900/70 px-2 py-1 text-[10px] font-medium text-white/90 ring-1 ring-inset ring-white/10 backdrop-blur">
                                {panel.id}
                              </div>
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-white leading-tight">
                                {panel.name}
                              </h4>
                              {panel.desc ? (
                                <p className="mt-1 text-sm text-clay-300 line-clamp-2">
                                  {panel.desc}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop Grid: 2-row clamp by default (md:grid-cols-3) */}
                    <div className="hidden md:block">
                      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 px-6 pb-6">
                        <AnimatePresence initial={false}>
                          {visiblePanels.map((panel) => (
                            <motion.div
                              key={panel.id}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.25 }}
                              className="group relative overflow-hidden rounded-xl border border-clay-600/30 bg-clay-900/40 hover:border-clay-400/50 transition-colors"
                            >
                              <div className="aspect-[16/10] overflow-hidden relative">
                                <img
                                  src={panel.img}
                                  alt={panel.name}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  onError={(e) => {
                                    const t = e.currentTarget as HTMLImageElement;
                                    t.style.display = "none";
                                    const fallback = document.createElement("div");
                                    fallback.className =
                                      "flex h-full w-full items-center justify-center bg-clay-800/50 text-clay-300/80 text-xs";
                                    fallback.textContent = "Image unavailable";
                                    t.parentElement?.appendChild(fallback);
                                  }}
                                />
                                <div className="pointer-events-none absolute right-2 top-2 rounded-md bg-clay-900/70 px-2 py-1 text-[10px] font-medium text-white/90 ring-1 ring-inset ring-white/10 backdrop-blur">
                                  {panel.id}
                                </div>
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                              </div>
                              <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-semibold text-white leading-tight">
                                    {panel.name}
                                  </h4>
                                </div>
                                {panel.desc ? (
                                  <p className="mt-1 text-sm text-clay-300 line-clamp-2">
                                    {panel.desc}
                                  </p>
                                ) : null}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Expand / Collapse */}
                  {category.panels.length > DEFAULT_MAX_VISIBLE && (
                    <div className="flex justify-center pb-6">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-clay-600/30 bg-clay-800/40 px-4 py-2 text-clay-100 hover:border-clay-400/50 hover:bg-clay-800/60 transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={`finishes-${category.id}`}
                      >
                        {isOpen ? "Show less ▲" : "Show all finishes ▼"}
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
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