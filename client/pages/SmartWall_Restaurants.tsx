import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import { 
  Utensils, 
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
  ChefHat,
  Coffee,
  Wine,
  Headphones,
  Monitor,
  Mic
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
    const serviceSchema = { 
      "@context": "https://schema.org", 
      "@type": "Service", 
      "name": "Smart Restaurant Wall Installation", 
      "description": "Professional smart restaurant wall installation with integrated lighting, climate control, acoustic management, and digital display technology. Transform your restaurant into an intelligent dining environment.", 
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
      "category": "Restaurant Design", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart restaurant wall solutions from consultation to full installation" 
      } 
    }; 

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "How do smart restaurant walls enhance dining experiences?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Smart restaurant walls enhance dining through dynamic ambient lighting that adapts to meal times, acoustic management for optimal conversation levels, climate control for guest comfort, and integrated digital displays for menu presentations and entertainment." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What restaurant sizes work with smart wall systems?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Our smart restaurant walls accommodate venues from intimate bistros to large dining halls. Each installation is custom-designed to complement your restaurant's layout, seating capacity, and operational requirements." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Can restaurant staff control smart wall features?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, comprehensive staff control interfaces allow management of lighting, temperature, audio, and digital displays. The system includes scheduling features, preset configurations, and remote access capabilities." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Do smart restaurant walls include acoustic management?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, integrated acoustic panels and sound management systems maintain optimal noise levels for comfortable dining conversations whilst reducing external disturbances and kitchen noise." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What lighting options are available for restaurant walls?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "LED lighting includes warm ambient lighting for intimate dining, adjustable brightness for different meal periods, colour-changing options for special events, and accent lighting to highlight architectural features and artwork." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "How does digital menu integration work?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Smart walls can integrate digital menu displays that update in real-time, showcase daily specials, highlight seasonal offerings, and provide nutritional information whilst maintaining elegant aesthetics that complement your restaurant's design." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Are smart restaurant walls suitable for different cuisines?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. The system adapts to any cuisine style with customisable lighting themes, acoustic settings for different dining cultures, and flexible digital displays that can showcase cuisine-specific content and cultural elements." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What warranty is provided for restaurant wall installations?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "We provide a comprehensive 5-year warranty covering all smart components, LED systems, acoustic panels, climate control, and installation workmanship. This includes regular maintenance visits and software updates." 
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

interface RestaurantSize { 
  id: string; 
  name: string; 
  capacity: string; 
  description: string; 
  price: string; 
} 

interface ControlMethod { 
  id: string; 
  name: string; 
  icon: React.ReactNode; 
  description: string; 
  features: string[]; 
} 

const SmartWallRestaurant: React.FC = () => { 
  const [selectedRestaurantSize, setSelectedRestaurantSize] = useState<string>('medium'); 
  const [selectedControl, setSelectedControl] = useState<string>('panel'); 
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null); 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 
  const [isHelpMode, setIsHelpMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null); 

  // Restaurant size configurations 
  const restaurantSizes: RestaurantSize[] = [ 
    { 
      id: 'small', 
      name: 'Intimate Bistro', 
      capacity: '20-40 covers', 
      description: 'Perfect for cosy dining establishments and cafés', 
      price: 'From £4,500' 
    }, 
    { 
      id: 'medium', 
      name: 'Family Restaurant', 
      capacity: '50-100 covers', 
      description: 'Ideal for most dining establishments', 
      price: 'From £8,200' 
    }, 
    { 
      id: 'large', 
      name: 'Fine Dining Hall', 
      capacity: '100+ covers', 
      description: 'Luxury solution for large restaurants', 
      price: 'From £15,000' 
    } 
  ]; 

  // Control method configurations 
  const controlMethods: ControlMethod[] = [ 
    { 
      id: 'panel', 
      name: 'Staff Control Panel', 
      icon: <Monitor className="w-6 h-6" />, 
      description: 'Dedicated control stations for restaurant staff', 
      features: ['Staff control panels', 'Quick presets', 'Emergency controls', 'Shift scheduling'] 
    }, 
    { 
      id: 'phone', 
      name: 'Mobile Management', 
      icon: <Smartphone className="w-6 h-6" />, 
      description: 'Complete control through smartphone or tablet', 
      features: ['iOS & Android apps', 'Remote management', 'Real-time monitoring', 'Multi-user access'] 
    } 
  ]; 

  // Restaurant-centric hotspots
  const hotspots: Hotspot[] = [ 
    { 
      id: 'ambient-lighting', 
      x: 30, 
      y: 25, 
      title: 'Dynamic Ambient Lighting', 
      description: 'Sophisticated LED lighting that adapts to dining periods', 
      icon: <Lightbulb className="w-5 h-5" />, 
      features: ['Meal period adaptation', 'Colour temperature control', 'Dimming capabilities', 'Accent lighting'] 
    }, 
    { 
      id: 'climate-control', 
      x: 70, 
      y: 35, 
      title: 'Climate Management', 
      description: 'Intelligent temperature and air quality control', 
      icon: <Thermometer className="w-5 h-5" />, 
      features: ['Zone-based temperature', 'Air quality monitoring', 'Humidity control', 'Energy efficiency'] 
    }, 
    { 
      id: 'acoustic-system', 
      x: 25, 
      y: 55, 
      title: 'Acoustic Management', 
      description: 'Sound control for optimal dining atmosphere', 
      icon: <Volume2 className="w-5 h-5" />, 
      features: ['Noise reduction', 'Background music', 'Conversation zones', 'Kitchen sound isolation'] 
    }, 
    { 
      id: 'digital-displays', 
      x: 75, 
      y: 55, 
      title: 'Digital Menu Integration', 
      description: 'Seamlessly integrated digital displays for menus and promotions', 
      icon: <Monitor className="w-5 h-5" />, 
      features: ['Real-time menu updates', 'Promotional content', 'Nutritional information', 'Multi-language support'] 
    }, 
    { 
      id: 'staff-controls', 
      x: 50, 
      y: 70, 
      title: 'Staff Control Systems', 
      description: 'Intuitive controls for restaurant operations', 
      icon: <Settings className="w-5 h-5" />, 
      features: ['Quick scene changes', 'Emergency controls', 'Shift presets', 'Remote access'] 
    } 
  ]; 

  // FAQ Data 
  const faqData = [ 
    { 
      question: "How do smart restaurant walls enhance dining experiences?", 
      answer: "Smart restaurant walls enhance dining through dynamic ambient lighting that adapts to different meal times and occasions, sophisticated acoustic management for optimal conversation levels, precise climate control for guest comfort, and integrated digital displays for elegant menu presentations and promotional content." 
    }, 
    { 
      question: "What restaurant sizes work with smart wall systems?", 
      answer: "Our smart restaurant walls accommodate venues from intimate 20-cover bistros to large 100+ cover dining halls. Each installation is custom-designed to complement your restaurant's layout, seating capacity, kitchen operations, and specific operational requirements." 
    }, 
    { 
      question: "Can restaurant staff control smart wall features?", 
      answer: "Yes, comprehensive staff control interfaces allow easy management of lighting scenes, temperature zones, audio levels, and digital displays. The system includes quick preset configurations, shift scheduling features, emergency controls, and remote access capabilities for managers." 
    }, 
    { 
      question: "Do smart restaurant walls include acoustic management?", 
      answer: "Yes, integrated acoustic panels and advanced sound management systems maintain optimal noise levels for comfortable dining conversations whilst effectively reducing external disturbances, kitchen noise, and managing background music distribution throughout the venue." 
    }, 
    { 
      question: "What lighting options are available for restaurant walls?", 
      answer: "LED lighting includes warm ambient lighting for intimate evening dining, adjustable brightness for different meal periods, full colour-changing options for special events and celebrations, accent lighting to highlight architectural features, and task lighting for specific dining areas." 
    }, 
    { 
      question: "How does digital menu integration work?", 
      answer: "Smart walls seamlessly integrate digital menu displays that update in real-time with daily specials, showcase seasonal offerings with high-quality imagery, provide detailed nutritional information, support multiple languages, and maintain elegant aesthetics that complement your restaurant's interior design." 
    }, 
    { 
      question: "Are smart restaurant walls suitable for different cuisines?", 
      answer: "Absolutely. The system adapts to any cuisine style with customisable lighting themes that reflect cultural dining preferences, acoustic settings optimised for different dining cultures, and flexible digital displays that can showcase cuisine-specific content, cultural elements, and authentic atmosphere." 
    }, 
    { 
      question: "What warranty is provided for restaurant wall installations?", 
      answer: "We provide a comprehensive 5-year warranty covering all smart components, LED lighting systems, acoustic panels, climate control units, digital displays, and installation workmanship. This includes regular maintenance visits, software updates, and dedicated technical support for hospitality operations." 
    } 
  ]; 

  // Related searches data 
  const relatedSearches = [ 
    "smart restaurant design UK", "restaurant lighting systems", "dining room climate control", "restaurant acoustic solutions", 
    "digital menu displays", "restaurant automation", "hospitality technology", "restaurant LED lighting", 
    "intelligent dining systems", "restaurant smart controls", "commercial dining technology", "restaurant wall panels" 
  ]; 

  // Get current restaurant size details 
  const currentRestaurantSize = restaurantSizes.find(size => size.id === selectedRestaurantSize) || restaurantSizes[1]; 
  const currentControl = controlMethods.find(method => method.id === selectedControl) || controlMethods[0]; 

  // Quote Modal Component 
  const QuoteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => { 
    const [formData, setFormData] = useState({ 
      name: '', 
      email: '', 
      phone: '', 
      restaurantType: '', 
      covers: '', 
      location: '', 
      timeline: '', 
      requirements: '' 
    }); 

    const handleSubmit = (e: React.FormEvent) => { 
      e.preventDefault(); 
      // Handle form submission 
      console.log('Quote request submitted:', formData); 
      onClose(); 
    }; 

    if (!isOpen) return null; 

    return ( 
      <AnimatePresence> 
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
          onClick={onClose} 
        > 
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }} 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()} 
          > 
            <div className="p-6"> 
              <div className="flex justify-between items-center mb-6"> 
                <h2 className="text-2xl font-bold text-gray-900">Request a Tailored Quote</h2> 
                <button 
                  onClick={onClose} 
                  className="text-gray-400 hover:text-gray-600 transition-colors" 
                > 
                  <X className="w-6 h-6" /> 
                </button> 
              </div> 

              <form onSubmit={handleSubmit} className="space-y-4"> 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label> 
                    <input 
                      type="text" 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    /> 
                  </div> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label> 
                    <input 
                      type="email" 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    /> 
                  </div> 
                </div> 

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label> 
                    <input 
                      type="tel" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    /> 
                  </div> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Type</label> 
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.restaurantType} 
                      onChange={(e) => setFormData({...formData, restaurantType: e.target.value})} 
                    > 
                      <option value="">Select type</option> 
                      <option value="fine-dining">Fine Dining</option> 
                      <option value="casual-dining">Casual Dining</option> 
                      <option value="bistro">Bistro</option> 
                      <option value="cafe">Café</option> 
                      <option value="fast-casual">Fast Casual</option> 
                      <option value="other">Other</option> 
                    </select> 
                  </div> 
                </div> 

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Covers</label> 
                    <input 
                      type="text" 
                      placeholder="e.g., 50-80" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.covers} 
                      onChange={(e) => setFormData({...formData, covers: e.target.value})} 
                    /> 
                  </div> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label> 
                    <input 
                      type="text" 
                      placeholder="City, Region" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})} 
                    /> 
                  </div> 
                </div> 

                <div> 
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Timeline</label> 
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value={formData.timeline} 
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})} 
                  > 
                    <option value="">Select timeline</option> 
                    <option value="immediate">Immediate (1-2 months)</option> 
                    <option value="short">Short term (3-6 months)</option> 
                    <option value="medium">Medium term (6-12 months)</option> 
                    <option value="long">Long term (12+ months)</option> 
                  </select> 
                </div> 

                <div> 
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specific Requirements</label> 
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your restaurant's specific needs, design preferences, or any special requirements..." 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value={formData.requirements} 
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})} 
                  /> 
                </div> 

                <div className="flex gap-4 pt-4"> 
                  <button 
                    type="button" 
                    onClick={onClose} 
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors" 
                  > 
                    Cancel 
                  </button> 
                  <button 
                    type="submit" 
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" 
                  > 
                    Request Quote 
                  </button> 
                </div> 
              </form> 
            </div> 
          </motion.div> 
        </motion.div> 
      </AnimatePresence> 
    ); 
  }; 

  return ( 
    <div className="min-h-screen bg-white"> 
      <SEOHead 
        title="Smart Restaurant Walls | Intelligent Dining Solutions | The Wall Shop" 
        description="Transform your restaurant with smart wall technology. Integrated lighting, climate control, acoustic management, and digital displays for enhanced dining experiences. Professional installation across the UK." 
        canonical="https://www.thewallshop.co.uk/smart-walls/restaurant" 
        keywords="smart restaurant walls, restaurant lighting systems, dining room climate control, restaurant acoustic solutions, digital menu displays, restaurant automation, hospitality technology, restaurant LED lighting, intelligent dining systems, restaurant smart controls, commercial dining technology, restaurant wall panels" 
        ogImage="https://www.thewallshop.co.uk/images/restaurant-hero.webp" 
      /> 

      <Navigation /> 

      {/* Hero Section */} 
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"> 
        <div className="absolute inset-0"> 
          <img 
            src="/images/restaurant-hero.webp" 
            alt="Smart Restaurant Wall Installation" 
            className="w-full h-full object-cover opacity-40" 
          /> 
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60"></div> 
        </div> 

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="space-y-8" 
          > 
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"> 
              Smart Restaurant 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> 
                Walls 
              </span> 
            </h1> 
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"> 
              Transform your dining establishment with intelligent wall technology that enhances guest experiences through dynamic lighting, climate control, and seamless digital integration. 
            </p> 

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center"> 
              <button 
                onClick={() => setIsQuoteModalOpen(true)} 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg" 
              > 
                Request a Tailored Quote 
              </button> 
              <button 
                onClick={() => setIsHelpMode(!isHelpMode)} 
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm" 
              > 
                <HelpCircle className="w-5 h-5 inline mr-2" /> 
                Explore Features 
              </button> 
            </div> 

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"> 
              <div className="text-center"> 
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"> 
                  <Lightbulb className="w-8 h-8 text-blue-400" /> 
                </div> 
                <h3 className="text-lg font-semibold text-white mb-2">Dynamic Lighting</h3> 
                <p className="text-gray-400">Adaptive ambient lighting for every dining occasion</p> 
              </div> 
              <div className="text-center"> 
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"> 
                  <Volume2 className="w-8 h-8 text-purple-400" /> 
                </div> 
                <h3 className="text-lg font-semibold text-white mb-2">Acoustic Control</h3> 
                <p className="text-gray-400">Optimised sound management for comfortable dining</p> 
              </div> 
              <div className="text-center"> 
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"> 
                  <Monitor className="w-8 h-8 text-green-400" /> 
                </div> 
                <h3 className="text-lg font-semibold text-white mb-2">Digital Integration</h3> 
                <p className="text-gray-400">Seamless menu displays and promotional content</p> 
              </div> 
            </div> 
          </motion.div> 
        </div> 
      </section> 

      {/* Breadcrumbs */} 
      <section className="bg-gray-50 py-4"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <nav className="flex items-center space-x-2 text-sm text-gray-600"> 
            <Home className="w-4 h-4" /> 
            <span>/</span> 
            <span>Smart Walls</span> 
            <span>/</span> 
            <span className="text-blue-600 font-medium">Restaurant</span> 
          </nav> 
        </div> 
      </section> 

      {/* Features Grid */} 
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Intelligent Restaurant Solutions 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Our smart restaurant walls integrate seamlessly with your establishment's design whilst providing advanced functionality for enhanced guest experiences and operational efficiency. 
            </p> 
          </div> 

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6"> 
                <Lightbulb className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dynamic Ambient Lighting</h3> 
              <p className="text-gray-700 mb-4"> 
                Sophisticated LED lighting systems that adapt to different meal periods, creating the perfect atmosphere for breakfast, lunch, dinner, and special events. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Meal period adaptation</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Colour temperature control</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Dimming capabilities</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Accent lighting</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6"> 
                <Volume2 className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Acoustic Management</h3> 
              <p className="text-gray-700 mb-4"> 
                Advanced sound control systems that maintain optimal noise levels for comfortable conversations whilst managing background music and reducing external disturbances. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Noise reduction panels</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Background music zones</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Conversation optimisation</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Kitchen sound isolation</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6"> 
                <Thermometer className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Climate Management</h3> 
              <p className="text-gray-700 mb-4"> 
                Intelligent temperature and air quality control systems that ensure optimal comfort for guests whilst maintaining energy efficiency throughout your restaurant. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Zone-based temperature</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Air quality monitoring</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Humidity control</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Energy efficiency</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6"> 
                <Monitor className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Menu Integration</h3> 
              <p className="text-gray-700 mb-4"> 
                Seamlessly integrated digital displays that showcase menus, daily specials, and promotional content whilst maintaining elegant aesthetics that complement your restaurant's design. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Real-time menu updates</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Promotional content</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Nutritional information</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multi-language support</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }} 
              className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6"> 
                <Settings className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Staff Control Systems</h3> 
              <p className="text-gray-700 mb-4"> 
                Intuitive control interfaces designed for restaurant operations, allowing staff to quickly adjust settings, manage different dining areas, and respond to guest needs efficiently. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Quick scene changes</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Emergency controls</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Shift presets</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Remote access</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.5 }} 
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6"> 
                <Smartphone className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mobile Management</h3> 
              <p className="text-gray-700 mb-4"> 
                Comprehensive smartphone and tablet applications that provide complete control over all smart wall features, enabling remote management and real-time monitoring. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />iOS & Android apps</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Remote management</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Real-time monitoring</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multi-user access</li> 
              </ul> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* Interactive Restaurant Size Selector */} 
      <section className="py-20 bg-gray-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Solutions for Every Restaurant Size 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              From intimate bistros to large dining halls, our smart wall systems are tailored to your restaurant's specific capacity and operational requirements. 
            </p> 
          </div> 

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"> 
            {restaurantSizes.map((size) => ( 
              <motion.div 
                key={size.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                className={`p-8 rounded-xl cursor-pointer transition-all duration-300 ${ 
                  selectedRestaurantSize === size.id 
                    ? 'bg-blue-600 text-white shadow-xl scale-105' 
                    : 'bg-white text-gray-900 hover:shadow-lg hover:scale-102' 
                }`} 
                onClick={() => setSelectedRestaurantSize(size.id)} 
              > 
                <div className="text-center"> 
                  <h3 className="text-2xl font-bold mb-2">{size.name}</h3> 
                  <p className={`text-lg mb-4 ${ 
                    selectedRestaurantSize === size.id ? 'text-blue-100' : 'text-gray-600' 
                  }`}> 
                    {size.capacity} 
                  </p> 
                  <p className={`mb-6 ${ 
                    selectedRestaurantSize === size.id ? 'text-blue-100' : 'text-gray-700' 
                  }`}> 
                    {size.description} 
                  </p> 
                  <div className={`text-2xl font-bold ${ 
                    selectedRestaurantSize === size.id ? 'text-white' : 'text-blue-600' 
                  }`}> 
                    {size.price} 
                  </div> 
                </div> 
              </motion.div> 
            ))} 
          </div> 

          <div className="bg-white rounded-xl p-8 shadow-lg"> 
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center"> 
              {currentRestaurantSize.name} Configuration 
            </h3> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
              <div> 
                <img 
                  src="/images/restaurant-detail-1.webp" 
                  alt="Restaurant Smart Wall Detail" 
                  className="w-full h-64 object-cover rounded-lg mb-4" 
                /> 
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Control Integration</h4> 
                <p className="text-gray-700"> 
                  Seamlessly integrated control systems designed specifically for {currentRestaurantSize.capacity} establishments, providing intuitive management of all smart wall features. 
                </p> 
              </div> 
              <div> 
                <img 
                  src="/images/restaurant-detail-2.webp" 
                  alt="Restaurant Acoustic Management" 
                  className="w-full h-64 object-cover rounded-lg mb-4" 
                /> 
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Acoustic Excellence</h4> 
                <p className="text-gray-700"> 
                  Advanced acoustic management tailored for {currentRestaurantSize.capacity} dining environments, ensuring optimal sound levels for comfortable guest conversations. 
                </p> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* Control Methods */} 
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Intuitive Control Systems 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Choose from professional-grade control interfaces designed for restaurant operations, ensuring your staff can efficiently manage all smart wall features. 
            </p> 
          </div> 

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"> 
            {controlMethods.map((method) => ( 
              <motion.div 
                key={method.id} 
                initial={{ opacity: 0, x: method.id === 'panel' ? -20 : 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6 }} 
                className={`p-8 rounded-xl cursor-pointer transition-all duration-300 ${ 
                  selectedControl === method.id 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl' 
                    : 'bg-gray-50 text-gray-900 hover:shadow-lg' 
                }`} 
                onClick={() => setSelectedControl(method.id)} 
              > 
                <div className="flex items-center mb-6"> 
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${ 
                    selectedControl === method.id ? 'bg-white/20' : 'bg-blue-600' 
                  }`}> 
                    <div className={selectedControl === method.id ? 'text-white' : 'text-white'}> 
                      {method.icon} 
                    </div> 
                  </div> 
                  <h3 className="text-xl font-bold">{method.name}</h3> 
                </div> 
                <p className={`mb-6 ${ 
                  selectedControl === method.id ? 'text-blue-100' : 'text-gray-700' 
                }`}> 
                  {method.description} 
                </p> 
                <ul className="space-y-2"> 
                  {method.features.map((feature, index) => ( 
                    <li key={index} className="flex items-center"> 
                      <CheckCircle className={`w-4 h-4 mr-2 ${ 
                        selectedControl === method.id ? 'text-green-300' : 'text-green-500' 
                      }`} /> 
                      <span className={selectedControl === method.id ? 'text-blue-100' : 'text-gray-600'}> 
                        {feature} 
                      </span> 
                    </li> 
                  ))} 
                </ul> 
              </motion.div> 
            ))} 
          </div> 

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8"> 
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center"> 
              {currentControl.name} Features 
            </h3> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> 
              {currentControl.features.map((feature, index) => ( 
                <div key={index} className="text-center"> 
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3"> 
                    <CheckCircle className="w-6 h-6 text-white" /> 
                  </div> 
                  <p className="text-gray-700 font-medium">{feature}</p> 
                </div> 
              ))} 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* Long-tail Content Cluster */} 
      <section className="py-20 bg-gray-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Restaurant Technology Solutions 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Comprehensive smart wall technology designed specifically for the hospitality industry, enhancing both guest experiences and operational efficiency. 
            </p> 
          </div> 

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <ChefHat className="w-12 h-12 text-orange-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kitchen Integration</h3> 
              <p className="text-gray-700 mb-4"> 
                Smart walls can integrate with kitchen operations, displaying order status, managing service timing, and coordinating with kitchen display systems for seamless service flow. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-orange-500 mr-2" />Order status displays</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-orange-500 mr-2" />Service timing coordination</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-orange-500 mr-2" />Kitchen communication</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Wine className="w-12 h-12 text-purple-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wine & Beverage Displays</h3> 
              <p className="text-gray-700 mb-4"> 
                Elegant digital displays for wine lists, cocktail menus, and beverage selections with detailed descriptions, pairing suggestions, and dynamic pricing updates. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-purple-500 mr-2" />Wine list management</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-purple-500 mr-2" />Pairing suggestions</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-purple-500 mr-2" />Dynamic pricing</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Users className="w-12 h-12 text-blue-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guest Experience Enhancement</h3> 
              <p className="text-gray-700 mb-4"> 
                Personalised dining experiences through adaptive lighting, customisable ambiance settings, and interactive features that respond to guest preferences and special occasions. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Personalised ambiance</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Special occasion modes</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Interactive features</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Zap className="w-12 h-12 text-yellow-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Energy Management</h3> 
              <p className="text-gray-700 mb-4"> 
                Intelligent energy management systems that optimise power consumption, reduce operational costs, and support sustainability goals whilst maintaining optimal guest comfort. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-yellow-500 mr-2" />Power optimisation</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-yellow-500 mr-2" />Cost reduction</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-yellow-500 mr-2" />Sustainability support</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Shield className="w-12 h-12 text-green-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Safety & Security</h3> 
              <p className="text-gray-700 mb-4"> 
                Integrated safety features including emergency lighting, security monitoring, fire safety compliance, and staff alert systems for comprehensive restaurant security. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Emergency lighting</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Security monitoring</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Staff alerts</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.5 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Smartphone className="w-12 h-12 text-indigo-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Integration</h3> 
              <p className="text-gray-700 mb-4"> 
                Seamless integration with mobile ordering systems, table service apps, and guest communication platforms for enhanced operational efficiency and guest satisfaction. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-indigo-500 mr-2" />Mobile ordering</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-indigo-500 mr-2" />Table service apps</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-indigo-500 mr-2" />Guest communication</li> 
              </ul> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* Compliance & Safety */} 
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Compliance & Safety Standards 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              All our smart restaurant wall installations meet stringent UK safety standards and hospitality industry regulations, ensuring complete compliance and guest safety. 
            </p> 
          </div> 

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="text-center" 
            > 
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"> 
                <Shield className="w-8 h-8 text-red-600" /> 
              </div> 
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fire Safety</h3> 
              <p className="text-gray-600">BS 5839 compliant fire detection and emergency lighting systems</p> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="text-center" 
            > 
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"> 
                <Zap className="w-8 h-8 text-blue-600" /> 
              </div> 
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Electrical Safety</h3> 
              <p className="text-gray-600">BS 7671 (18th Edition) wiring regulations compliance</p> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="text-center" 
            > 
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"> 
                <CheckCircle className="w-8 h-8 text-green-600" /> 
              </div> 
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Building Regulations</h3> 
              <p className="text-gray-600">Full compliance with UK Building Regulations Part L and M</p> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              className="text-center" 
            > 
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"> 
                <Users className="w-8 h-8 text-purple-600" /> 
              </div> 
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3> 
              <p className="text-gray-600">DDA and Equality Act 2010 accessibility compliance</p> 
            </motion.div> 
          </div> 

          <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8"> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
              <div> 
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Safety Certifications</h3> 
                <ul className="space-y-3 text-gray-700"> 
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />CE marking for all electronic components</li> 
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />UKCA conformity assessment</li> 
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />RoHS compliance for environmental safety</li> 
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />IP65 rating for moisture resistance</li> 
                </ul> 
              </div> 
              <div> 
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Installation Standards</h3> 
                <ul className="space-y-3 text-gray-700"> 
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />NICEIC approved electrical installation</li> 
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Professional structural assessment</li> 
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Health and safety risk assessment</li> 
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Post-installation safety certification</li> 
                </ul> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* FAQ Section */} 
      <section className="py-20 bg-gray-50"> 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Frequently Asked Questions 
            </h2> 
            <p className="text-xl text-gray-600"> 
              Common questions about smart restaurant wall installations and technology 
            </p> 
          </div> 

          <div className="space-y-4"> 
            {faqData.map((faq, index) => ( 
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                className="bg-white rounded-lg shadow-md overflow-hidden" 
              > 
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" 
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} 
                > 
                  <span className="font-semibold text-gray-900">{faq.question}</span> 
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${ 
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
                      className="px-6 pb-4" 
                    > 
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p> 
                    </motion.div> 
                  )} 
                </AnimatePresence> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Related Searches */} 
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Related Restaurant Technology 
            </h2> 
            <p className="text-xl text-gray-600"> 
              Explore related smart restaurant solutions and hospitality technology 
            </p> 
          </div> 

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
            {relatedSearches.map((search, index) => ( 
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.4, delay: index * 0.05 }} 
                className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg text-center cursor-pointer transition-colors group" 
              > 
                <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" /> 
                <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors"> 
                  {search} 
                </span> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Contact/CTA Sidebar */} 
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> 
            <div className="text-white"> 
              <h2 className="text-3xl md:text-4xl font-bold mb-6"> 
                Ready to Transform Your Restaurant? 
              </h2> 
              <p className="text-xl text-blue-100 mb-8"> 
                Get a personalised consultation and detailed quote for your smart restaurant wall installation. Our experts will design a solution tailored to your establishment's unique requirements. 
              </p> 
              <div className="space-y-4"> 
                <div className="flex items-center"> 
                  <Phone className="w-6 h-6 text-blue-300 mr-4" /> 
                  <span className="text-lg">+44 141 739 3377</span> 
                </div> 
                <div className="flex items-center"> 
                  <Mail className="w-6 h-6 text-blue-300 mr-4" /> 
                  <span className="text-lg">info@thewallshop.co.uk</span> 
                </div> 
                <div className="flex items-center"> 
                  <MapPin className="w-6 h-6 text-blue-300 mr-4" /> 
                  <span className="text-lg">SMK Business Centre, 4 The Piazza, Glasgow, G5 8BE</span> 
                </div> 
                <div className="flex items-center"> 
                  <Clock className="w-6 h-6 text-blue-300 mr-4" /> 
                  <span className="text-lg">Mon–Fri, 9:00 AM–6:00 PM PST</span> 
                </div> 
              </div> 
            </div> 
            <div className="bg-white rounded-xl p-8 shadow-2xl"> 
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Quote Today</h3> 
              <form className="space-y-4"> 
                <div> 
                  <input 
                    type="text" 
                    placeholder="Restaurant Name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  /> 
                </div> 
                <div> 
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  /> 
                </div> 
                <div> 
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  /> 
                </div> 
                <div> 
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"> 
                    <option>Number of Covers</option> 
                    <option>20-40 covers</option> 
                    <option>50-100 covers</option> 
                    <option>100+ covers</option> 
                  </select> 
                </div> 
                <div> 
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your restaurant and requirements..." 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  /> 
                </div> 
                <button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300" 
                > 
                  Request a Tailored Quote 
                </button> 
              </form> 
            </div> 
          </div> 
        </div> 
      </section> 

      <Footer /> 
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} /> 
    </div> 
  ); 
}; 

export default SmartWallRestaurant;