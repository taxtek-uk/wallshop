import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import Navigation from '@/components/Navigation'; 
import Footer from '@/components/Footer'; 
import { 
  Calendar, 
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
  Monitor,
  Mic,
  Camera,
  Presentation,
  Projector,
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
      setMetaTag('og:image:alt', 'Smart Event Wall by The Wall Shop', true); 
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
      "name": "Smart Event Wall Installation", 
      "description": "Professional smart event wall installation with interactive displays, dynamic lighting, immersive audio, and real-time content management. Transform your event space into an intelligent, engaging environment.", 
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
      "category": "Event Technology", 
      "offers": { 
        "@type": "Offer", 
        "availability": "https://schema.org/InStock", 
        "priceCurrency": "GBP", 
        "description": "Custom smart event wall solutions from consultation to full installation" 
      } 
    }; 

    const faqSchema = { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": [ 
        { 
          "@type": "Question", 
          "name": "How do smart event walls enhance attendee engagement?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Smart event walls enhance engagement through interactive displays, real-time content updates, immersive lighting effects, and responsive audio systems that adapt to event dynamics and audience participation." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What event sizes work with smart wall systems?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Our smart event walls accommodate venues from intimate 50-person gatherings to large 1000+ attendee conferences. Each installation is custom-designed to match your event space and audience requirements." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Can event organisers control smart wall features?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, comprehensive control interfaces allow real-time management of displays, lighting, audio, and interactive features. The system includes preset configurations, live content updates, and remote control capabilities." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Do smart event walls include interactive capabilities?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes, advanced touch interfaces, gesture recognition, and audience response systems enable real-time interaction, live polling, social media integration, and collaborative content creation." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What display options are available for event walls?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "High-resolution LED displays include 4K video walls, interactive touch screens, projection mapping capabilities, holographic displays, and seamless multi-screen configurations for immersive visual experiences." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "How does live content integration work?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Smart walls integrate with live streaming platforms, social media feeds, presentation software, and event management systems for real-time content updates, audience feedback, and dynamic information display." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "Are smart event walls suitable for different event types?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Absolutely. The system adapts to conferences, exhibitions, product launches, corporate events, trade shows, and entertainment venues with customisable content, branding, and interactive features." 
          } 
        }, 
        { 
          "@type": "Question", 
          "name": "What warranty is provided for event wall installations?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "We provide a comprehensive 5-year warranty covering all smart components, display systems, interactive technology, audio equipment, and installation workmanship with dedicated event support services." 
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

interface EventSize { 
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

const SmartWallEvents: React.FC = () => { 
  const [selectedEventSize, setSelectedEventSize] = useState<string>('medium'); 
  const [selectedControl, setSelectedControl] = useState<string>('panel'); 
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null); 
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); 
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null); 
  const [isHelpMode, setIsHelpMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null); 

  // Event size configurations 
  const eventSizes: EventSize[] = [ 
    { 
      id: 'small', 
      name: 'Intimate Gathering', 
      capacity: '50-150 attendees', 
      description: 'Perfect for workshops, seminars, and small conferences', 
      price: 'From £8,500' 
    }, 
    { 
      id: 'medium', 
      name: 'Corporate Event', 
      capacity: '200-500 attendees', 
      description: 'Ideal for most business events and exhibitions', 
      price: 'From £18,000' 
    }, 
    { 
      id: 'large', 
      name: 'Major Conference', 
      capacity: '500+ attendees', 
      description: 'Premium solution for large-scale events', 
      price: 'From £35,000' 
    } 
  ]; 

  // Control method configurations 
  const controlMethods: ControlMethod[] = [ 
    { 
      id: 'panel', 
      name: 'Event Control Centre', 
      icon: <Monitor className="w-6 h-6" />, 
      description: 'Professional control stations for event management', 
      features: ['Live content control', 'Real-time monitoring', 'Emergency systems', 'Multi-operator support'] 
    }, 
    { 
      id: 'phone', 
      name: 'Mobile Event Management', 
      icon: <Smartphone className="w-6 h-6" />, 
      description: 'Complete control through mobile devices', 
      features: ['iOS & Android apps', 'Remote operation', 'Live streaming control', 'Social media integration'] 
    } 
  ]; 

  // Event-centric hotspots
  const hotspots: Hotspot[] = [ 
    { 
      id: 'interactive-displays', 
      x: 50, 
      y: 30, 
      title: 'Interactive Display Systems', 
      description: 'High-resolution displays with touch and gesture control', 
      icon: <Monitor className="w-5 h-5" />, 
      features: ['4K video walls', 'Touch interaction', 'Gesture recognition', 'Multi-user support'] 
    }, 
    { 
      id: 'dynamic-lighting', 
      x: 25, 
      y: 45, 
      title: 'Dynamic Event Lighting', 
      description: 'Immersive lighting that responds to event content', 
      icon: <Lightbulb className="w-5 h-5" />, 
      features: ['Colour synchronisation', 'Content-reactive lighting', 'Mood enhancement', 'Brand theming'] 
    }, 
    { 
      id: 'audio-system', 
      x: 75, 
      y: 45, 
      title: 'Immersive Audio', 
      description: 'Spatial audio systems for engaging experiences', 
      icon: <Volume2 className="w-5 h-5" />, 
      features: ['Surround sound', 'Voice clarity', 'Music integration', 'Noise management'] 
    }, 
    { 
      id: 'content-management', 
      x: 40, 
      y: 65, 
      title: 'Live Content Management', 
      description: 'Real-time content updates and social media integration', 
      icon: <Presentation className="w-5 h-5" />, 
      features: ['Live streaming', 'Social feeds', 'Real-time updates', 'Multi-source content'] 
    }, 
    { 
      id: 'audience-interaction', 
      x: 60, 
      y: 65, 
      title: 'Audience Engagement', 
      description: 'Interactive features for attendee participation', 
      icon: <Users className="w-5 h-5" />, 
      features: ['Live polling', 'Q&A systems', 'Feedback collection', 'Gamification'] 
    } 
  ]; 

  // FAQ Data 
  const faqData = [ 
    { 
      question: "How do smart event walls enhance attendee engagement?", 
      answer: "Smart event walls enhance engagement through interactive displays that respond to touch and gestures, real-time content updates from social media and live feeds, immersive lighting effects that synchronise with presentations, and responsive audio systems that adapt to event dynamics and audience participation levels." 
    }, 
    { 
      question: "What event sizes work with smart wall systems?", 
      answer: "Our smart event walls accommodate venues from intimate 50-person workshops to large 1000+ attendee conferences and exhibitions. Each installation is custom-designed to match your event space dimensions, audience size, and specific engagement requirements." 
    }, 
    { 
      question: "Can event organisers control smart wall features?", 
      answer: "Yes, comprehensive control interfaces allow real-time management of displays, lighting scenes, audio levels, and interactive features. The system includes preset configurations for different event segments, live content updates, emergency controls, and remote management capabilities." 
    }, 
    { 
      question: "Do smart event walls include interactive capabilities?", 
      answer: "Yes, advanced touch interfaces support multi-user interaction, gesture recognition enables hands-free control, audience response systems facilitate live polling and Q&A sessions, and social media integration allows real-time content sharing and collaborative experiences." 
    }, 
    { 
      question: "What display options are available for event walls?", 
      answer: "High-resolution LED displays include seamless 4K video walls, interactive touch screens of various sizes, projection mapping capabilities for immersive environments, holographic display options, and multi-screen configurations that create panoramic visual experiences." 
    }, 
    { 
      question: "How does live content integration work?", 
      answer: "Smart walls integrate seamlessly with live streaming platforms, social media feeds, presentation software, and event management systems. This enables real-time content updates, live audience feedback display, dynamic information sharing, and instant social media content integration." 
    }, 
    { 
      question: "Are smart event walls suitable for different event types?", 
      answer: "Absolutely. The system adapts to conferences, exhibitions, product launches, corporate events, trade shows, entertainment venues, and educational seminars with fully customisable content templates, branding options, and interactive features tailored to each event type." 
    }, 
    { 
      question: "What warranty is provided for event wall installations?", 
      answer: "We provide a comprehensive 5-year warranty covering all smart components, display systems, interactive technology, audio equipment, and installation workmanship. This includes dedicated event support services, on-site technical assistance, and priority maintenance for critical events." 
    } 
  ]; 

  // Related searches data 
  const relatedSearches = [ 
    "smart event technology UK", "interactive event displays", "conference wall systems", "exhibition technology", 
    "event lighting systems", "digital event solutions", "interactive conference walls", "event audio visual", 
    "smart exhibition displays", "event management technology", "conference room technology", "trade show displays" 
  ]; 

  // Get current event size details 
  const currentEventSize = eventSizes.find(size => size.id === selectedEventSize) || eventSizes[1]; 
  const currentControl = controlMethods.find(method => method.id === selectedControl) || controlMethods[0]; 

  // Quote Modal Component 
  const QuoteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => { 
    const [formData, setFormData] = useState({ 
      name: '', 
      email: '', 
      phone: '', 
      eventType: '', 
      attendees: '', 
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label> 
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.eventType} 
                      onChange={(e) => setFormData({...formData, eventType: e.target.value})} 
                    > 
                      <option value="">Select type</option> 
                      <option value="conference">Conference</option> 
                      <option value="exhibition">Exhibition</option> 
                      <option value="product-launch">Product Launch</option> 
                      <option value="corporate-event">Corporate Event</option> 
                      <option value="trade-show">Trade Show</option> 
                      <option value="other">Other</option> 
                    </select> 
                  </div> 
                </div> 

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Attendees</label> 
                    <input 
                      type="text" 
                      placeholder="e.g., 200-300" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.attendees} 
                      onChange={(e) => setFormData({...formData, attendees: e.target.value})} 
                    /> 
                  </div> 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Location</label> 
                    <input 
                      type="text" 
                      placeholder="City, Venue" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})} 
                    /> 
                  </div> 
                </div> 

                <div> 
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Timeline</label> 
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
                    placeholder="Tell us about your event's specific needs, interactive features, or any special requirements..." 
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
        title="Smart Event Walls | Interactive Event Technology | The Wall Shop" 
        description="Transform your events with smart wall technology. Interactive displays, dynamic lighting, immersive audio, and real-time content management for engaging attendee experiences. Professional installation across the UK." 
        canonical="https://www.thewallshop.co.uk/smart-walls/event" 
        keywords="smart event walls, interactive event displays, conference wall systems, exhibition technology, event lighting systems, digital event solutions, interactive conference walls, event audio visual, smart exhibition displays, event management technology, conference room technology, trade show displays" 
        ogImage="https://www.thewallshop.co.uk/images/event-hero.webp" 
      /> 

      <Navigation /> 

      {/* Hero Section */} 
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"> 
        <div className="absolute inset-0"> 
          <img 
            src="/images/event-hero.webp" 
            alt="Smart Event Wall Installation" 
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
              Smart Event 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> 
                Walls 
              </span> 
            </h1> 
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"> 
              Transform your events with intelligent wall technology featuring interactive displays, dynamic lighting, and immersive experiences that captivate and engage your audience. 
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
                  <Monitor className="w-8 h-8 text-blue-400" /> 
                </div> 
                <h3 className="text-lg font-semibold text-white mb-2">Interactive Displays</h3> 
                <p className="text-gray-400">Touch-responsive walls with real-time content</p> 
              </div> 
              <div className="text-center"> 
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"> 
                  <Lightbulb className="w-8 h-8 text-purple-400" /> 
                </div> 
                <h3 className="text-lg font-semibold text-white mb-2">Dynamic Lighting</h3> 
                <p className="text-gray-400">Immersive lighting that responds to content</p> 
              </div> 
              <div className="text-center"> 
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"> 
                  <Users className="w-8 h-8 text-green-400" /> 
                </div> 
                <h3 className="text-lg font-semibold text-white mb-2">Audience Engagement</h3> 
                <p className="text-gray-400">Interactive features for attendee participation</p> 
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
            <span className="text-blue-600 font-medium">Events</span> 
          </nav> 
        </div> 
      </section> 

      {/* Features Grid */} 
      <section className="py-20 bg-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Intelligent Event Solutions 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Our smart event walls integrate cutting-edge technology to create immersive, interactive experiences that captivate audiences and enhance event engagement across all types of gatherings. 
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
                <Monitor className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Display Systems</h3> 
              <p className="text-gray-700 mb-4"> 
                High-resolution displays with advanced touch and gesture recognition, enabling real-time interaction, multi-user collaboration, and immersive visual experiences. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />4K video walls</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Touch interaction</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Gesture recognition</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multi-user support</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6"> 
                <Lightbulb className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dynamic Event Lighting</h3> 
              <p className="text-gray-700 mb-4"> 
                Immersive lighting systems that synchronise with content, respond to audience interaction, and create atmospheric effects that enhance the overall event experience. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Colour synchronisation</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Content-reactive lighting</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Mood enhancement</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Brand theming</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6"> 
                <Volume2 className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Immersive Audio Systems</h3> 
              <p className="text-gray-700 mb-4"> 
                Spatial audio technology that delivers crystal-clear sound, directional audio zones, and immersive soundscapes that complement visual content and enhance audience engagement. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Surround sound systems</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Voice clarity enhancement</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Music integration</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Noise management</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6"> 
                <Presentation className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Content Management</h3> 
              <p className="text-gray-700 mb-4"> 
                Real-time content integration from multiple sources including live streams, social media feeds, presentations, and interactive applications for dynamic event experiences. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Live streaming integration</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Social media feeds</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Real-time updates</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multi-source content</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }} 
              className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6"> 
                <Users className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Audience Engagement Tools</h3> 
              <p className="text-gray-700 mb-4"> 
                Interactive features that encourage attendee participation through live polling, Q&A systems, feedback collection, and gamification elements that make events more engaging. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Live polling systems</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Q&A management</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Feedback collection</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Gamification features</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.5 }} 
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-xl" 
            > 
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6"> 
                <Settings className="w-6 h-6 text-white" /> 
              </div> 
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Control Systems</h3> 
              <p className="text-gray-700 mb-4"> 
                Professional-grade control interfaces designed for event management, allowing real-time adjustments, preset configurations, and seamless operation throughout your event. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Live content control</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Real-time monitoring</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Emergency systems</li> 
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multi-operator support</li> 
              </ul> 
            </motion.div> 
          </div> 
        </div> 
      </section> 

      {/* Interactive Event Size Selector */} 
      <section className="py-20 bg-gray-50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="text-center mb-16"> 
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"> 
              Solutions for Every Event Scale 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              From intimate workshops to major conferences, our smart wall systems scale to meet your event's specific requirements and audience size. 
            </p> 
          </div> 

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"> 
            {eventSizes.map((size) => ( 
              <motion.div 
                key={size.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                className={`p-8 rounded-xl cursor-pointer transition-all duration-300 ${ 
                  selectedEventSize === size.id 
                    ? 'bg-blue-600 text-white shadow-xl scale-105' 
                    : 'bg-white text-gray-900 hover:shadow-lg hover:scale-102' 
                }`} 
                onClick={() => setSelectedEventSize(size.id)} 
              > 
                <div className="text-center"> 
                  <h3 className="text-2xl font-bold mb-2">{size.name}</h3> 
                  <p className={`text-lg mb-4 ${ 
                    selectedEventSize === size.id ? 'text-blue-100' : 'text-gray-600' 
                  }`}> 
                    {size.capacity} 
                  </p> 
                  <p className={`mb-6 ${ 
                    selectedEventSize === size.id ? 'text-blue-100' : 'text-gray-700' 
                  }`}> 
                    {size.description} 
                  </p> 
                  <div className={`text-2xl font-bold ${ 
                    selectedEventSize === size.id ? 'text-white' : 'text-blue-600' 
                  }`}> 
                    {size.price} 
                  </div> 
                </div> 
              </motion.div> 
            ))} 
          </div> 

          <div className="bg-white rounded-xl p-8 shadow-lg"> 
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center"> 
              {currentEventSize.name} Configuration 
            </h3> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
              <div> 
                <img 
                  src="/images/event-detail-1.webp" 
                  alt="Event Smart Wall Interaction" 
                  className="w-full h-64 object-cover rounded-lg mb-4" 
                /> 
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Interactive Technology</h4> 
                <p className="text-gray-700"> 
                  Advanced interactive systems designed for {currentEventSize.capacity} events, featuring touch-responsive displays and real-time audience engagement capabilities. 
                </p> 
              </div> 
              <div> 
                <img 
                  src="/images/event-detail-2.webp" 
                  alt="Event Immersive Experience" 
                  className="w-full h-64 object-cover rounded-lg mb-4" 
                /> 
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Immersive Experience</h4> 
                <p className="text-gray-700"> 
                  Dynamic lighting and audio systems tailored for {currentEventSize.capacity} gatherings, creating captivating environments that enhance attendee engagement and event impact. 
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
              Professional Event Control 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Choose from professional-grade control systems designed for live event management, ensuring seamless operation and real-time responsiveness throughout your event. 
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
              Event Technology Solutions 
            </h2> 
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Comprehensive smart wall technology designed specifically for the events industry, enhancing attendee experiences and providing powerful tools for event organisers. 
            </p> 
          </div> 

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Camera className="w-12 h-12 text-blue-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Live Streaming Integration</h3> 
              <p className="text-gray-700 mb-4"> 
                Seamless integration with live streaming platforms, enabling real-time broadcast of events, remote attendee participation, and multi-platform content distribution. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Multi-platform streaming</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Remote participation</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-500 mr-2" />Content recording</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Mic className="w-12 h-12 text-purple-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Audio Enhancement</h3> 
              <p className="text-gray-700 mb-4"> 
                Advanced audio processing with noise cancellation, voice enhancement, and spatial audio distribution for crystal-clear communication and immersive sound experiences. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-purple-500 mr-2" />Noise cancellation</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-purple-500 mr-2" />Voice enhancement</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-purple-500 mr-2" />Spatial audio</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Projector className="w-12 h-12 text-green-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Projection Mapping</h3> 
              <p className="text-gray-700 mb-4"> 
                Advanced projection mapping capabilities that transform any surface into an interactive display, creating immersive environments and stunning visual effects. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />3D surface mapping</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Interactive projections</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-green-500 mr-2" />Dynamic content</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Wifi className="w-12 h-12 text-orange-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Network Integration</h3> 
              <p className="text-gray-700 mb-4"> 
                Robust network infrastructure supporting high-bandwidth content delivery, real-time data synchronisation, and seamless connectivity for all event technologies. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-orange-500 mr-2" />High-speed connectivity</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-orange-500 mr-2" />Data synchronisation</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-orange-500 mr-2" />Redundant systems</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Calendar className="w-12 h-12 text-red-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Event Scheduling</h3> 
              <p className="text-gray-700 mb-4"> 
                Intelligent scheduling systems that automate content delivery, manage session transitions, and coordinate all event elements for seamless execution. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-red-500 mr-2" />Automated scheduling</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-red-500 mr-2" />Session management</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-red-500 mr-2" />Content coordination</li> 
              </ul> 
            </motion.div> 

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.5 }} 
              className="bg-white p-8 rounded-xl shadow-lg" 
            > 
              <Headphones className="w-12 h-12 text-indigo-600 mb-6" /> 
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accessibility Features</h3> 
              <p className="text-gray-700 mb-4"> 
                Comprehensive accessibility support including hearing loops, visual aids, multi-language support, and assistive technologies for inclusive event experiences. 
              </p> 
              <ul className="space-y-2 text-sm text-gray-600"> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-indigo-500 mr-2" />Hearing loop systems</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-indigo-500 mr-2" />Visual accessibility</li> 
                <li className="flex items-center"><ArrowRight className="w-4 h-4 text-indigo-500 mr-2" />Multi-language support</li> 
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
              All our smart event wall installations meet stringent UK safety standards and event industry regulations, ensuring complete compliance and attendee safety. 
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
              <p className="text-gray-600">BS 5839 compliant fire detection and emergency evacuation systems</p> 
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Regulations</h3> 
              <p className="text-gray-600">Full compliance with UK event safety and licensing requirements</p> 
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
              Common questions about smart event wall installations and technology 
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
              Related Event Technology 
            </h2> 
            <p className="text-xl text-gray-600"> 
              Explore related smart event solutions and interactive technology 
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
                Ready to Transform Your Events? 
              </h2> 
              <p className="text-xl text-blue-100 mb-8"> 
                Get a personalised consultation and detailed quote for your smart event wall installation. Our experts will design a solution tailored to your event's unique requirements and audience. 
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
                    placeholder="Event Name" 
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
                    <option>Expected Attendees</option> 
                    <option>50-150 attendees</option> 
                    <option>200-500 attendees</option> 
                    <option>500+ attendees</option> 
                  </select> 
                </div> 
                <div> 
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your event and requirements..." 
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

export default SmartWallEvents;