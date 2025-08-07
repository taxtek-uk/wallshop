import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Home,
  Building,
  Hotel,
  Warehouse,
  Star,
  Eye,
  Heart,
  Filter,
  Grid,
  List,
  Search,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const WallPanels = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // SEO & AI-SEO: update document head manually
  useEffect(() => {
    document.title = 'Premium Wall Panels | The Wall Shop';
    // Meta description
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', 'Discover our range of premium wall panels—composite, waterproof, decorative & luxury finishes. Get expert installation & warranty.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Discover our range of premium wall panels—composite, waterproof, decorative & luxury finishes. Get expert installation & warranty.';
      document.head.appendChild(meta);
    }
    // JSON-LD structured data injection
    const organizationSchema = {"@context":"http://schema.org","@type":"Organization","name":"The Wall Shop","url":"https://thewallshop.co.uk","logo":"https://thewallshop.co.uk/logo.png","contactPoint":[{"@type":"ContactPoint","telephone":"+44 141 739 3377","contactType":"Customer Service","areaServed":"GB","availableLanguage":"English"}]};
    const webpageSchema = {"@context":"http://schema.org","@type":"WebPage","name":"Premium Wall Panels — The Wall Shop","description":"Discover waterproof, decorative & luxury wall panels with expert installation & warranty.","url":"https://thewallshop.co.uk/wall-panels"};
    [organizationSchema, webpageSchema].forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, []);

  const productCategories = [
    { 
      id: 'wpc', 
      title: 'WPC Wall Panels', 
      description: 'Premium wood-plastic composite panels offering the perfect blend of natural aesthetics and modern durability.', 
      image: '/images/wpc-wall-panel-hero.png', 
      features: ['Moisture Resistant', 'Eco-Friendly', 'Easy Installation'], 
      price: 'From £45/m²', 
      originalPrice: '£65/m²',
      link: '/wall-panels/wpc', 
      category: 'composite',
      rating: 4.8,
      reviews: 127,
      isPopular: true,
      discount: 31
    },
    { 
      id: 'anti-collision', 
      title: 'Anti-collision Wall Panels', 
      description: 'Heavy-duty protection panels designed for high-traffic areas requiring superior impact resistance.', 
      image: '/images/anti-collision-wall-panel.png', 
      features: ['Impact Resistant', 'Commercial Grade', 'Low Maintenance'], 
      price: 'From £65/m²', 
      link: '/wall-panels/anti-collision', 
      category: 'safety',
      rating: 4.9,
      reviews: 89,
      isNew: true
    },
    { 
      id: 'wpc-splicing', 
      title: 'WPC Splicing Boards', 
      description: 'Innovative interlocking system creating seamless wall surfaces with professional-grade installation.', 
      image: '/images/wpc-splicing-board.png', 
      features: ['Seamless Installation', 'Modular Design', 'Professional Finish'], 
      price: 'From £52/m²', 
      link: '/wall-panels/wpc-splicing', 
      category: 'composite',
      rating: 4.7,
      reviews: 156
    },
    { 
      id: 'wpc-hollow', 
      title: 'WPC Hollow Seamless Locking', 
      description: 'Lightweight hollow-core construction with advanced locking mechanism for efficient installation.', 
      image: '/images/wpc-wall-panel-detail.png', 
      features: ['Lightweight', 'Thermal Insulation', 'Quick Install'], 
      price: 'From £48/m²', 
      link: '/wall-panels/wpc-hollow', 
      category: 'composite',
      rating: 4.6,
      reviews: 203
    },
    { 
      id: 'fireproof', 
      title: 'Class A Fireproof Boards', 
      description: 'Superior fire-resistant panels meeting the highest safety standards for commercial and public spaces.', 
      image: '/images/fireproof-board-commercial.png', 
      features: ['Class A Fire Rating', 'Safety Certified', 'Commercial Grade'], 
      price: 'From £75/m²', 
      link: '/wall-panels/fireproof', 
      category: 'safety',
      rating: 4.9,
      reviews: 67,
      isPremium: true
    },
    { 
      id: 'fluted', 
      title: 'Fluted Wall Panels', 
      description: 'Architectural texture panels featuring elegant vertical grooves for sophisticated interior design.', 
      image: '/images/fluted-wall-panel.png', 
      features: ['Architectural Design', 'Premium Texture', 'Modern Aesthetic'], 
      price: 'From £58/m²', 
      link: '/wall-panels/fluted', 
      category: 'decorative',
      rating: 4.8,
      reviews: 134,
      isPopular: true
    },
    { 
      id: 'aluminum-fittings', 
      title: 'Aluminum Alloy Fittings', 
      description: 'Professional-grade mounting hardware and finishing accessories for seamless panel installation.', 
      image: '/images/aluminum-fittings.png', 
      features: ['Precision Engineering', 'Corrosion Resistant', 'Professional Grade'], 
      price: 'From £15/unit', 
      link: '/wall-panels/aluminum-fittings', 
      category: 'accessories',
      rating: 4.7,
      reviews: 89
    },
    { 
      id: 'wpc-hd-printing', 
      title: 'WPC HD Printing Panels', 
      description: 'High-definition printed panels offering unlimited design possibilities with photorealistic finishes.', 
      image: '/images/wpc-wall-panel-hero.png', 
      features: ['HD Printing', 'Custom Graphics', 'Fade Resistant'], 
      price: 'From £68/m²', 
      link: '/wall-panels/wpc-hd-printing', 
      category: 'decorative',
      rating: 4.9,
      reviews: 78,
      isPremium: true
    },
    { 
      id: 'spc-background', 
      title: 'SPC Background Walls', 
      description: 'Stone-plastic composite panels providing exceptional durability for feature wall applications.', 
      image: '/images/uhd-continuous-pattern.png', 
      features: ['Stone-Plastic Composite', 'Feature Wall Ready', 'Superior Durability'], 
      price: 'From £62/m²', 
      link: '/wall-panels/spc-background', 
      category: 'composite',
      rating: 4.8,
      reviews: 112
    },
    { 
      id: 'uhd-continuous', 
      title: 'UHD Continuous Pattern', 
      description: 'Ultra-high-definition continuous patterns creating seamless luxury finishes across large surfaces.', 
      image: '/images/uhd-continuous-pattern.png', 
      features: ['UHD Patterns', 'Seamless Continuity', 'Luxury Finishes'], 
      price: 'From £85/m²', 
      originalPrice: '£120/m²',
      link: '/wall-panels/uhd-continuous', 
      category: 'luxury',
      rating: 5.0,
      reviews: 45,
      isPremium: true,
      discount: 29
    },
    { 
      id: 'spc-waterproof', 
      title: 'SPC Waterproof Panels', 
      description: 'Advanced waterproof panels perfect for bathrooms, kitchens, and high-moisture environments.', 
      image: '/images/spc-waterproof-bathroom.png', 
      features: ['100% Waterproof', 'Bathroom Ready', 'Mold Resistant'], 
      price: 'From £55/m²', 
      link: '/wall-panels/spc-waterproof', 
      category: 'waterproof',
      rating: 4.8,
      reviews: 189,
      isPopular: true
    },
    { 
      id: 'spc-stone-crystal', 
      title: 'SPC Stone Crystal Flooring', 
      description: 'Premium stone-crystal composite flooring with exceptional durability and natural stone aesthetics.', 
      image: '/images/plastic-wood-flooring.png', 
      features: ['Stone Crystal Finish', 'Premium Durability', 'Natural Aesthetics'], 
      price: 'From £72/m²', 
      link: '/wall-panels/spc-stone-crystal', 
      category: 'flooring',
      rating: 4.7,
      reviews: 98
    },
    { 
      id: 'plastic-wood', 
      title: 'Plastic Wood Flooring', 
      description: 'Sustainable plastic-wood composite flooring combining environmental responsibility with performance.', 
      image: '/images/plastic-wood-flooring.png', 
      features: ['Eco-Friendly', 'Weather Resistant', 'Low Maintenance'], 
      price: 'From £42/m²', 
      link: '/wall-panels/plastic-wood', 
      category: 'flooring',
      rating: 4.6,
      reviews: 167
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: productCategories.length, icon: Grid },
    { id: 'composite', name: 'Composite', count: productCategories.filter(p => p.category === 'composite').length, icon: Shield },
    { id: 'decorative', name: 'Decorative', count: productCategories.filter(p => p.category === 'decorative').length, icon: Sparkles },
    { id: 'safety', name: 'Safety', count: productCategories.filter(p => p.category === 'safety').length, icon: Shield },
    { id: 'waterproof', name: 'Waterproof', count: productCategories.filter(p => p.category === 'waterproof').length, icon: Shield },
    { id: 'luxury', name: 'Luxury', count: productCategories.filter(p => p.category === 'luxury').length, icon: Award },
    { id: 'flooring', name: 'Flooring', count: productCategories.filter(p => p.category === 'flooring').length, icon: Home },
    { id: 'accessories', name: 'Accessories', count: productCategories.filter(p => p.category === 'accessories').length, icon: Zap }
  ];

  const filteredProducts = productCategories.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const benefits = [
    { 
      icon: Shield, 
      title: 'Premium Quality', 
      description: 'Industry-certified panels with rigorous quality control and lifetime warranty.'
    },
    { 
      icon: Zap, 
      title: 'Quick Install', 
      description: 'Innovative fixing systems for fast, hassle-free setup in under 24 hours.'
    },
    { 
      icon: Award, 
      title: 'Backed Warranty', 
      description: 'Comprehensive 25-year warranty and dedicated 24/7 support.'
    },
    { 
      icon: Sparkles, 
      title: 'Elegant Design', 
      description: 'Contemporary aesthetics to uplift any interior with timeless appeal.'
    }
  ];

  const applications = [
    { 
      icon: Home, 
      title: 'Residential', 
      description: 'Elevate your living spaces with premium finishes.',
      projects: '2,500+ homes'
    },
    { 
      icon: Building, 
      title: 'Commercial', 
      description: 'Durable solutions for offices & retail environments.',
      projects: '800+ offices'
    },
    { 
      icon: Hotel, 
      title: 'Hospitality', 
      description: 'Luxury finishes for hotels & restaurants.',
      projects: '150+ venues'
    },
    { 
      icon: Warehouse, 
      title: 'Industrial', 
      description: 'Robust panels for demanding industrial sites.',
      projects: '300+ facilities'
    }
  ];

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        style={{
          width: '16px',
          height: '16px',
          color: i < Math.floor(rating) ? '#d97706' : '#d1d5db',
          fill: i < Math.floor(rating) ? '#d97706' : 'none'
        }}
      />
    ));
  };

  // Inline styles object for better organization
  const styles = {
    // Main container
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef7ed 0%, #f5f5f4 100%)'
    },
    
    // Hero section
    heroSection: {
      paddingTop: '6rem',
      paddingBottom: '5rem',
      background: 'linear-gradient(135deg, #292524 0%, #78716c 50%, #6b7280 100%)',
      position: 'relative',
      overflow: 'hidden'
    },
    
    heroOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'linear-gradient(90deg, rgba(120, 113, 108, 0.2) 0%, rgba(168, 162, 158, 0.2) 100%)'
    },
    
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      position: 'relative',
      zIndex: 10
    },
    
    heroGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem',
      alignItems: 'center'
    },
    
    heroContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '600',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      width: 'fit-content'
    },
    
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '900',
      color: 'white',
      lineHeight: '1.1',
      letterSpacing: '-0.025em'
    },
    
    heroTitleGradient: {
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    
    heroDescription: {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.9)',
      maxWidth: '600px',
      lineHeight: '1.6'
    },
    
    heroButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    
    heroPrimaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      width: 'fit-content'
    },
    
    heroSecondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'transparent',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontSize: '1rem',
      fontWeight: '600',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      width: 'fit-content'
    },
    
    heroStats: {
      display: 'flex',
      gap: '2rem',
      paddingTop: '1rem'
    },
    
    heroStat: {
      textAlign: 'center' as const
    },
    
    heroStatNumber: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'white'
    },
    
    heroStatLabel: {
      fontSize: '0.875rem',
      color: 'rgba(168, 162, 158, 0.8)'
    },
    
    heroImageCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    
    heroImage: {
      aspectRatio: '16/9',
      borderRadius: '1rem',
      overflow: 'hidden',
      marginBottom: '1.5rem'
    },
    
    heroImageImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    
    heroBenefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem'
    },
    
    heroBenefitCard: {
      textAlign: 'center',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    
    heroBenefitIcon: {
      width: '3rem',
      height: '3rem',
      margin: '0 auto 0.75rem',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    
    heroBenefitTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.9)'
    },
    
    // Why Choose section
    whyChooseSection: {
      padding: '6rem 0',
      background: 'white',
      position: 'relative'
    },
    
    whyChooseOverlay: {
      position: 'absolute',
      inset: '0',
      background: 'linear-gradient(135deg, rgba(254, 247, 237, 0.5) 0%, rgba(245, 245, 244, 0.5) 100%)'
    },
    
    sectionContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      position: 'relative' as React.CSSProperties['position'],
      zIndex: 10
    },
    
    sectionHeader: {
      textAlign: 'center' as React.CSSProperties['textAlign'],
      marginBottom: '4rem'
    },
    
    sectionBadge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #fef7ed 0%, #f5f5f4 100%)',
      color: '#78716c',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '1rem',
      border: '1px solid #e7e5e4'
    },
    
    sectionTitle: {
      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #292524 0%, #78716c 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1.5rem',
      letterSpacing: '-0.025em'
    },
    
    sectionDescription: {
      fontSize: '1.25rem',
      color: '#57534e',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    
    benefitCard: {
      background: 'white',
      padding: '2rem',
      borderRadius: '1rem',
      border: '1px solid #e7e5e4',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    
    benefitCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    
    benefitIcon: {
      width: '4rem',
      height: '4rem',
      margin: '0 auto 1.5rem',
      borderRadius: '1rem',
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    
    benefitTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#292524',
      marginBottom: '0.75rem',
      transition: 'color 0.3s ease'
    },
    
    benefitDescription: {
      color: '#57534e',
      lineHeight: '1.6'
    },
    
    // Products section
    productsSection: {
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #fef7ed 0%, #f5f5f4 100%)'
    },
    
    searchFilterBar: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '3rem',
      border: '1px solid #e7e5e4',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    
    searchFilterContent: {
      display: 'flex',
      flexDirection: 'column' as React.CSSProperties['flexDirection'],
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    
    searchContainer: {
      position: 'relative' as React.CSSProperties['position'],
      flex: '1',
      maxWidth: '400px'
    },
    
    searchIcon: {
      position: 'absolute' as React.CSSProperties['position'],
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#78716c',
      width: '1.25rem',
      height: '1.25rem'
    },
    
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      border: '2px solid #e7e5e4',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    
    viewModeButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    
    viewModeButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      border: '2px solid #e7e5e4',
      borderRadius: '0.5rem',
      background: 'white',
      color: '#57534e',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    
    viewModeButtonActive: {
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      color: 'white',
      borderColor: 'transparent'
    },
    
    categoryNav: {
      display: 'flex',
      overflowX: 'auto' as React.CSSProperties['overflowX'],
      gap: '0.5rem',
      marginBottom: '3rem',
      paddingBottom: '0.5rem'
    },
    
    categoryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      whiteSpace: 'nowrap' as React.CSSProperties['whiteSpace'],
      fontWeight: '600',
      borderRadius: '9999px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative' as React.CSSProperties['position'],
      overflow: 'hidden' as React.CSSProperties['overflow']
    },
    
    categoryButtonInactive: {
      background: 'white',
      color: '#57534e',
      border: '1px solid #e7e5e4'
    },
    
    categoryButtonActive: {
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      color: 'white',
      border: 'none',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    
    categoryBadge: {
      marginLeft: '0.25rem',
      padding: '0.125rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    
    categoryBadgeInactive: {
      background: '#f5f5f4',
      color: '#57534e'
    },
    
    categoryBadgeActive: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white'
    },
    
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem'
    },
    
    productCard: {
      background: 'white',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #e7e5e4',
      position: 'relative'
    },
    
    productCardHover: {
      transform: 'translateY(-12px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      borderColor: 'rgba(168, 162, 158, 0.2)'
    },
    
    productBadges: {
      position: 'absolute' as React.CSSProperties['position'],
      top: '1rem',
      left: '1rem',
      zIndex: 20,
      display: 'flex',
      flexDirection: 'column' as React.CSSProperties['flexDirection'],
      gap: '0.5rem'
    },
    
    productBadge: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      borderRadius: '0.25rem',
      color: 'white'
    },
    
    productBadgeNew: {
      background: '#16a34a'
    },
    
    productBadgePopular: {
      background: '#ea580c'
    },
    
    productBadgePremium: {
      background: '#7c2d12'
    },
    
    productBadgeDiscount: {
      background: '#dc2626'
    },
    
    favoriteButton: {
      position: 'absolute' as React.CSSProperties['position'],
      top: '1rem',
      right: '1rem',
      zIndex: 20,
      width: '2.5rem',
      height: '2.5rem',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    
    productImageContainer: {
      position: 'relative' as React.CSSProperties['position'],
      aspectRatio: '16/9',
      overflow: 'hidden' as React.CSSProperties['overflow']
    },
    
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as React.CSSProperties['objectFit'],
      transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    
    productImageOverlay: {
      position: 'absolute' as React.CSSProperties['position'],
      inset: '0',
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    quickViewButton: {
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#292524',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    productContent: {
      padding: '1.5rem'
    },
    
    productHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '0.75rem'
    },
    
    productTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#292524',
      marginBottom: '0.5rem',
      transition: 'color 0.3s ease'
    },
    
    productRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    
    ratingStars: {
      display: 'flex',
      gap: '0.125rem'
    },
    
    ratingText: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#57534e'
    },
    
    ratingReviews: {
      fontSize: '0.875rem',
      color: '#a8a29e'
    },
    
    productDescription: {
      color: '#57534e',
      marginBottom: '1rem',
      lineHeight: '1.6',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical' as any, // BoxOrient is not in React types, so use 'as any'
      overflow: 'hidden'
    },
    
    productFeatures: {
      display: 'flex',
      flexWrap: 'wrap' as React.CSSProperties['flexWrap'],
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    
    featureBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.75rem',
      background: '#fef7ed',
      color: '#78716c',
      border: '1px solid #fed7aa',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem'
    },
    
    productFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    
    productPricing: {
      display: 'flex',
      flexDirection: 'column' as React.CSSProperties['flexDirection'],
      gap: '0.25rem'
    },
    
    productPriceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    productPrice: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#292524'
    },
    
    productOriginalPrice: {
      fontSize: '0.875rem',
      color: '#a8a29e',
      textDecoration: 'line-through'
    },
    
    productActions: {
      display: 'flex',
      gap: '0.5rem'
    },
    
    productButton: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      borderRadius: '9999px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none'
    },
    
    productButtonSecondary: {
      background: 'transparent',
      color: '#78716c',
      border: '1px solid #fed7aa'
    },
    
    productButtonPrimary: {
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      color: 'white'
    },
    
    // Applications section
    applicationsSection: {
      padding: '6rem 0',
      background: 'white',
      position: 'relative'
    },
    
    applicationsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    
    applicationCard: {
      background: 'white',
      padding: '2rem',
      borderRadius: '1rem',
      border: '1px solid #e7e5e4',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    
    applicationIcon: {
      width: '4rem',
      height: '4rem',
      margin: '0 auto 1.5rem',
      borderRadius: '1rem',
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    
    applicationTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#292524',
      marginBottom: '0.75rem',
      transition: 'color 0.3s ease'
    },
    
    applicationDescription: {
      color: '#57534e',
      marginBottom: '1rem',
      lineHeight: '1.6'
    },
    
    applicationProjects: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#78716c'
    },
    
    // CTA section
    ctaSection: {
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #292524 0%, #78716c 50%, #6b7280 100%)',
      position: 'relative',
      overflow: 'hidden'
    },
    
    ctaContent: {
      textAlign: 'center',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    
    ctaTitle: {
      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
      fontWeight: '900',
      color: 'white',
      marginBottom: '1.5rem',
      lineHeight: '1.2'
    },
    
    ctaDescription: {
      fontSize: '1.25rem',
      color: 'rgba(168, 162, 158, 0.9)',
      marginBottom: '2rem',
      lineHeight: '1.6'
    },
    
    ctaButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      marginBottom: '3rem'
    },
    
    ctaPrimaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontSize: '1.125rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      width: 'fit-content',
      margin: '0 auto'
    },
    
    ctaSecondaryButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'transparent',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontSize: '1.125rem',
      fontWeight: '600',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      width: 'fit-content',
      margin: '0 auto'
    },
    
    contactInfo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      textAlign: 'center'
    },
    
    contactItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    contactIcon: {
      width: '2rem',
      height: '2rem',
      color: '#a8a29e'
    },
    
    contactTitle: {
      color: 'white',
      fontWeight: '600'
    },
    
    contactDetail: {
      color: 'rgba(168, 162, 158, 0.8)'
    },
    
    // No results state
    noResults: {
      textAlign: 'center' as React.CSSProperties['textAlign'],
      padding: '4rem 0'
    },
    
    noResultsIcon: {
      width: '6rem',
      height: '6rem',
      margin: '0 auto 1.5rem',
      background: '#f5f5f4',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    noResultsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#292524',
      marginBottom: '0.5rem'
    },
    
    noResultsDescription: {
      color: '#57534e',
      marginBottom: '1.5rem'
    },
    
    clearFiltersButton: {
      background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer'
    },
    
    // Responsive styles
    '@media (min-width: 640px)': {
      heroButtons: {
        flexDirection: 'row'
      },
      searchFilterContent: {
        flexDirection: 'row'
      },
      ctaButtons: {
        flexDirection: 'row'
      }
    }
  };

  return (
    <>
      <div style={styles.container}>
        <Navigation />

        {/* Enhanced Hero Section */}
        <section style={styles.heroSection as React.CSSProperties}>
          {/* Animated Background Elements */}
          <div style={styles.heroOverlay as React.CSSProperties} />
          
          <div style={styles.heroContainer as React.CSSProperties}>
            <div style={styles.heroGrid}>
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }} 
                style={styles.heroContent as React.CSSProperties}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={styles.heroBadge}
                >
                  <Sparkles style={{ width: '1rem', height: '1rem' }} />
                  Premium Collection 2025
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={styles.heroTitle}
                >
                  Transform Your Space with{' '}
                  <span style={styles.heroTitleGradient}>
                    Wall Panels
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={styles.heroDescription}
                >
                  Explore our composite, waterproof, decorative and luxury wall panels — all backed by expert installation and 25-year warranty.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={styles.heroButtons as any}
                >
                  <button 
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} 
                    style={styles.heroPrimaryButton}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = 'translateY(-2px) scale(1.05)';
                      (e.target as HTMLElement).style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)';
                      (e.target as HTMLElement).style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    Explore Collection
                    <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                    style={styles.heroSecondaryButton}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    Get Free Quote
                  </button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={styles.heroStats}
                >
                  <div style={styles.heroStat}>
                    <div style={styles.heroStatNumber}>25+</div>
                    <div style={styles.heroStatLabel}>Years Experience</div>
                  </div>
                  <div style={styles.heroStat}>
                    <div style={styles.heroStatNumber}>3,500+</div>
                    <div style={styles.heroStatLabel}>Projects Completed</div>
                  </div>
                  <div style={styles.heroStat}>
                    <div style={styles.heroStatNumber}>4.9★</div>
                    <div style={styles.heroStatLabel}>Customer Rating</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div style={styles.heroImageCard}>
                  <div 
                    style={styles.heroImage}
                    onMouseEnter={(e) => {
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                    <img 
                      src="/images/wpc-wall-panel-hero.png" 
                      alt="Premium Wall Panels Showcase" 
                      loading="lazy" 
                      style={styles.heroImageImg as React.CSSProperties}
                    />
                  </div>
                  
                  <div style={styles.heroBenefitsGrid}>
                    {benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        style={styles.heroBenefitCard as React.CSSProperties}
                      >
                        <div 
                          style={styles.heroBenefitIcon as React.CSSProperties}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.transform = 'scale(1)';
                          }}
                        >
                          <benefit.icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                        </div>
                        <p style={styles.heroBenefitTitle}>
                          {benefit.title}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Why Choose Section */}
        <section style={styles.whyChooseSection as React.CSSProperties}>
          <div style={styles.whyChooseOverlay as React.CSSProperties} />
          <div style={styles.sectionContainer as React.CSSProperties}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              style={styles.sectionHeader as React.CSSProperties}
            >
              <div style={styles.sectionBadge}>
                Why Choose Us
              </div>
              <h2 style={styles.sectionTitle}>
                The Wall Shop Advantage
              </h2>
              <p style={styles.sectionDescription}>
                Unmatched quality, lightning-fast installation, and world-class design—all backed by our industry-leading warranty.
              </p>
            </motion.div>
            
            <div style={styles.benefitsGrid as React.CSSProperties}>
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  style={styles.benefitCard as React.CSSProperties}
                  onMouseEnter={(e) => {
                    Object.assign((e.currentTarget as HTMLElement).style, styles.benefitCardHover);
                    const overlay = e.currentTarget.querySelector('.benefit-overlay') as HTMLElement | null;
                    if (overlay) overlay.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    const overlay = e.currentTarget.querySelector('.benefit-overlay') as HTMLElement | null;
                    if (overlay) overlay.style.opacity = '0';
                  }}
                >
                  <div 
                    className="benefit-overlay"
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: 'linear-gradient(135deg, rgba(254, 247, 237, 0.5) 0%, rgba(245, 245, 244, 0.5) 100%)',
                      borderRadius: '1rem',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 10 }}>
                    <div 
                      style={styles.benefitIcon as React.CSSProperties}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.transform = 'scale(1.1) rotate(3deg)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                      }}
                    >
                      <benefit.icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
                    </div>
                    <h3 style={styles.benefitTitle}>
                      {benefit.title}
                    </h3>
                    <p style={styles.benefitDescription}>
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Products Section */}
        <section id="products" style={styles.productsSection}>
          <div style={styles.sectionContainer}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              style={styles.sectionHeader}
            >
              <div style={styles.sectionBadge}>
                Our Products
              </div>
              <h2 style={styles.sectionTitle}>
                Premium Collection
              </h2>
              <p style={styles.sectionDescription}>
                Browse by category or explore all our premium panels below. Each product is crafted with precision and backed by our quality guarantee.
              </p>
            </motion.div>

            {/* Enhanced Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={styles.searchFilterBar}
            >
              <div style={styles.searchFilterContent}>
                <div style={styles.searchContainer}>
                  <Search style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search panels, features, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#78716c';
                      e.target.style.boxShadow = '0 0 0 4px rgba(120, 113, 108, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e7e5e4';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div style={styles.viewModeButtons}>
                  <button
                    onClick={() => setViewMode('grid')}
                    style={{
                      ...styles.viewModeButton,
                      ...(viewMode === 'grid' ? styles.viewModeButtonActive : {})
                    }}
                  >
                    <Grid style={{ width: '1rem', height: '1rem' }} />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    style={{
                      ...styles.viewModeButton,
                      ...(viewMode === 'list' ? styles.viewModeButtonActive : {})
                    }}
                  >
                    <List style={{ width: '1rem', height: '1rem' }} />
                    List
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Category Navigation */}
            <motion.nav 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={styles.categoryNav}
            >
              {categories.map(cat => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    ...styles.categoryButton,
                    ...(activeCategory === cat.id ? styles.categoryButtonActive : styles.categoryButtonInactive)
                  }}
                >
                  <cat.icon style={{ width: '1rem', height: '1rem' }} />
                  {cat.name}
                  <span style={{
                    ...styles.categoryBadge,
                    ...(activeCategory === cat.id ? styles.categoryBadgeActive : styles.categoryBadgeInactive)
                  }}>
                    {/* {cat.count} */}
                  </span>
                </motion.button>
              ))}
            </motion.nav>

            {/* Enhanced Product Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchTerm + viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={viewMode === 'grid' ? styles.productsGrid : { display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    whileHover={{ y: -8 }}
                    style={{
                      ...styles.productCard,
                      ...(viewMode === 'list' ? { display: 'flex', alignItems: 'center' } : {})
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.productCardHover);
                      const overlay = e.currentTarget.querySelector('.product-overlay') as HTMLElement | null;
                      if (overlay) overlay.style.opacity = '1';
                      const image = e.currentTarget.querySelector('.product-image') as HTMLElement | null;
                      if (image) image.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e7e5e4';
                      const overlay = e.currentTarget.querySelector('.product-overlay') as HTMLElement | null;
                      if (overlay) overlay.style.opacity = '0';
                      const image = e.currentTarget.querySelector('.product-image') as HTMLElement | null;
                      if (image) image.style.transform = 'scale(1)';
                    }}
                  >
                    {/* Product Badges */}
                    <div style={styles.productBadges}>
                      {product.isNew && (
                        <div style={{ ...styles.productBadge, ...styles.productBadgeNew }}>
                          NEW
                        </div>
                      )}
                      {product.isPopular && (
                        <div style={{ ...styles.productBadge, ...styles.productBadgePopular }}>
                          POPULAR
                        </div>
                      )}
                      {product.isPremium && (
                        <div style={{ ...styles.productBadge, ...styles.productBadgePremium }}>
                          PREMIUM
                        </div>
                      )}
                      {product.discount && (
                        <div style={{ ...styles.productBadge, ...styles.productBadgeDiscount }}>
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      style={styles.favoriteButton}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.background = 'white';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.9)';
                      }}
                    >
                      <Heart
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          color: favorites.has(product.id) ? '#dc2626' : '#a8a29e',
                          fill: favorites.has(product.id) ? '#dc2626' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </button>

                    {/* Product Image */}
                    <div style={{
                      ...styles.productImageContainer,
                      ...(viewMode === 'list' ? { width: '12rem', height: '8rem', flexShrink: 0 } : {})
                    }}>
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="product-image"
                        style={styles.productImage}
                      />
                      <div 
                        className="product-overlay"
                        style={styles.productImageOverlay}
                      >
                        {/* <button style={styles.quickViewButton}>
                          <Eye style={{ width: '1rem', height: '1rem' }} />
                          Quick View
                        </button> */}
                      </div>
                    </div>

                    {/* Product Content */}
                    <div style={{
                      ...styles.productContent,
                      ...(viewMode === 'list' ? { flex: 1 } : {})
                    }}>
                      <div style={styles.productHeader}>
                        <div style={{ flex: 1 }}>
                          <h3 style={styles.productTitle}>
                            {product.title}
                          </h3>
                          
                          {/* Rating */}
                          <div style={styles.productRating}>
                            <div style={styles.ratingStars}>
                              {renderStars(product.rating)}
                            </div>
                            <span style={styles.ratingText}>
                              {product.rating}
                            </span>
                            <span style={styles.ratingReviews}>
                              ({product.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <p style={styles.productDescription}>
                        {product.description}
                      </p>

                      {/* Features */}
                      <div style={styles.productFeatures}>
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} style={styles.featureBadge}>
                            <CheckCircle style={{ width: '0.75rem', height: '0.75rem' }} />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Price and CTA */}
                      <div style={styles.productFooter}>
                        {/* Pricing can go here if needed */}

                        <div
                          style={{
                            display: 'flex',
                            gap: '10px', // spacing between buttons
                            justifyContent: 'flex-start', // or center / space-between as needed
                            flexWrap: 'wrap',
                          }}
                        >
                          <Link to={product.link}>
                            <button
                              style={{
                                ...styles.productButton,
                                ...styles.productButtonSecondary,
                              }}
                            >
                              Learn More
                            </button>
                          </Link>

                          <button
                            style={{
                              ...styles.productButton,
                              ...styles.productButtonPrimary,
                            }}
                            onClick={() => {
                              // handle quote action here
                            }}
                          >
                            Get Quote
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.noResults}
              >
                <div style={styles.noResultsIcon}>
                  <Search style={{ width: '3rem', height: '3rem', color: '#a8a29e' }} />
                </div>
                <h3 style={styles.noResultsTitle}>No products found</h3>
                <p style={styles.noResultsDescription}>
                  Try adjusting your search terms or browse all categories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  style={styles.clearFiltersButton}
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Enhanced Applications Section */}
        <section style={styles.applicationsSection as React.CSSProperties}>
          <div style={styles.whyChooseOverlay as React.CSSProperties} />
          <div style={styles.sectionContainer as React.CSSProperties}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              style={styles.sectionHeader as React.CSSProperties}
            >
              <div style={styles.sectionBadge}>
                Applications
              </div>
              <h2 style={styles.sectionTitle}>
                Perfect for Every Space
              </h2>
              <p style={styles.sectionDescription}>
                From residential homes to commercial spaces, our wall panels deliver exceptional performance and aesthetics.
              </p>
            </motion.div>
            
            <div style={styles.applicationsGrid as React.CSSProperties}>
              {applications.map((app, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  style={styles.applicationCard as any}
                  onMouseEnter={(e) => {
                    Object.assign((e.currentTarget as HTMLElement).style, styles.benefitCardHover);
                    const overlay = (e.currentTarget as HTMLElement).querySelector('.app-overlay') as HTMLElement | null;
                    if (overlay) overlay.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    const overlay = (e.currentTarget as HTMLElement).querySelector('.app-overlay') as HTMLElement | null;
                    if (overlay) overlay.style.opacity = '0';
                  }}
                >
                  <div 
                    className="app-overlay"
                    style={{
                      position: 'absolute' as React.CSSProperties['position'],
                      inset: '0',
                      background: 'linear-gradient(135deg, rgba(254, 247, 237, 0.5) 0%, rgba(245, 245, 244, 0.5) 100%)',
                      borderRadius: '1rem',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 10 }}>
                    <div 
                      style={styles.applicationIcon as React.CSSProperties}
                      onMouseEnter={(e) => {
                        ((e.target as HTMLElement).style).transform = 'scale(1.1) rotate(3deg)';
                      }}
                      onMouseLeave={(e) => {
                        ((e.target as HTMLElement).style).transform = 'scale(1) rotate(0deg)';
                      }}
                    >
                      <app.icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
                    </div>
                    <h3 style={styles.applicationTitle}>
                      {app.title}
                    </h3>
                    <p style={styles.applicationDescription}>
                      {app.description}
                    </p>
                    <div style={styles.applicationProjects}>
                      {app.projects}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section id="contact" style={styles.ctaSection as React.CSSProperties}>
          <div style={styles.heroOverlay as React.CSSProperties} />
          
          <div style={styles.sectionContainer as React.CSSProperties}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={styles.ctaContent as React.CSSProperties}
            >
              <h2 style={styles.ctaTitle}>
                Ready to Transform Your Space?
              </h2>
              <p style={styles.ctaDescription}>
                Get a free consultation and quote from our expert team. We'll help you choose the perfect wall panels for your project.
              </p>
              
              <div style={styles.ctaButtons as React.CSSProperties}>
                <button 
                  style={styles.ctaPrimaryButton}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(-2px) scale(1.05)';
                    target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(0) scale(1)';
                    target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <Phone style={{ width: '1.25rem', height: '1.25rem' }} />
                  Call Now: +44 141 739 3377
                </button>
                <button 
                  style={styles.ctaSecondaryButton}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'transparent';
                  }}
                >
                  <Mail style={{ width: '1.25rem', height: '1.25rem' }} />
                  Get Free Quote
                </button>
              </div>

              {/* Contact Info */}
              <div style={styles.contactInfo as React.CSSProperties}>
                <div style={styles.contactItem as React.CSSProperties}>
                  <Phone style={styles.contactIcon} />
                  <div style={styles.contactTitle}>Call Us</div>
                  <div style={styles.contactDetail}>+44 141 739 3377</div>
                </div>
                <div style={styles.contactItem as React.CSSProperties}>
                  <Mail style={styles.contactIcon} />
                  <div style={styles.contactTitle}>Email Us</div>
                  <div style={styles.contactDetail}>info@thewallshop.co.uk</div>
                </div>
                <div style={styles.contactItem as React.CSSProperties}>
                  <Clock style={styles.contactIcon} />
                  <div style={styles.contactTitle}>Open Hours</div>
                  <div style={styles.contactDetail}>Mon-Fri: 8AM-6PM</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default WallPanels;