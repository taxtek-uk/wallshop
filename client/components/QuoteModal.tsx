import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  User, 
  Home, 
  Ruler, 
  MessageSquare,
  Star,
  Shield,
  Award,
  Sparkles,
  Calendar,
  ArrowRight,
  Zap,
  Heart,
  Users,
  Building2,
  Palette
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: {
    name: string;
    price: string;
  };
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    area: '',
    message: '',
    urgency: 'standard'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 4 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        projectType: '',
        area: '',
        message: '',
        urgency: 'standard'
      });
      setCurrentStep(1);
      onClose();
    }, 4000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const projectTypes = [
    { value: 'residential-living', label: 'Residential - Living Room', icon: Home },
    { value: 'residential-bedroom', label: 'Residential - Bedroom', icon: Home },
    { value: 'residential-kitchen', label: 'Residential - Kitchen', icon: Home },
    { value: 'residential-bathroom', label: 'Residential - Bathroom', icon: Home },
    { value: 'commercial-office', label: 'Commercial - Office', icon: Building2 },
    { value: 'commercial-retail', label: 'Commercial - Retail', icon: Building2 },
    { value: 'commercial-restaurant', label: 'Commercial - Restaurant', icon: Building2 },
    { value: 'industrial-warehouse', label: 'Industrial - Warehouse', icon: Building2 },
    { value: 'other', label: 'Other / Custom Project', icon: Palette }
  ];

  const urgencyOptions = [
    { 
      value: 'urgent', 
      label: 'Urgent Priority', 
      subtitle: '24-48 hours response',
      badge: 'URGENT',
      color: 'from-red-500 to-orange-500',
      icon: Zap
    },
    { 
      value: 'standard', 
      label: 'Standard Timeline', 
      subtitle: '3-5 business days',
      badge: 'STANDARD',
      color: 'from-[#b69777] to-[#907252]',
      icon: Calendar
    },
    { 
      value: 'flexible', 
      label: 'Flexible Schedule', 
      subtitle: '1-2 weeks planning',
      badge: 'FLEXIBLE',
      color: 'from-green-500 to-emerald-500',
      icon: Clock
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Lifetime Warranty",
      description: "Comprehensive protection for your investment",
      active: activeFeature === 0
    },
    {
      icon: Award,
      title: "Expert Installation",
      description: "Certified professionals with 10+ years experience",
      active: activeFeature === 1
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock assistance when you need it",
      active: activeFeature === 2
    },
    {
      icon: Star,
      title: "5-Star Rated",
      description: "Trusted by 10,000+ satisfied customers",
      active: activeFeature === 3
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(35, 28, 20, 0.95) 0%, rgba(42, 31, 23, 0.95) 50%, rgba(26, 20, 16, 0.95) 100%)',
          backdropFilter: 'blur(20px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ 
            type: 'spring', 
            damping: 20, 
            stiffness: 300,
            duration: 0.6
          }}
          className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e2d5c4]">
            {/* Header with Gradient */}
            <div className="relative bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410] text-white overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-[#b69777]/30 to-[#907252]/30"></div>
                <div className={`absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}></div>
              </div>
              
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 z-10 group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              
              <div className="relative z-10 p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-2xl shadow-lg">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-extrabold mb-2 bg-gradient-to-r from-white via-[#f8f6f3] to-[#b69777] bg-clip-text text-transparent">
                        Get Your Free Quote
                      </h1>
                      <p className="text-white/80 text-lg">
                        Professional consultation & detailed pricing for your dream project
                      </p>
                    </div>
                  </div>
                </div>
                
                {selectedProduct && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center gap-3 mb-6"
                  >
                    <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Selected: {selectedProduct.name}
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                      {selectedProduct.price}
                    </div>
                  </motion.div>
                )}

                {/* Features Carousel */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`text-center p-4 rounded-xl transition-all duration-500 ${
                        feature.active 
                          ? 'bg-gradient-to-br from-[#b69777]/20 to-[#907252]/10 border border-[#b69777]/50 scale-105' 
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <feature.icon className={`w-6 h-6 mx-auto mb-2 transition-colors duration-500 ${
                        feature.active ? 'text-[#b69777]' : 'text-white/70'
                      }`} />
                      <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-xs text-white/70">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 15, stiffness: 300 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-extrabold text-[#231c14] mb-4"
                  >
                    Quote Request Submitted Successfully!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl text-[#6b5c47] mb-8 max-w-2xl mx-auto"
                  >
                    Thank you for choosing us! Our expert team will review your requirements and contact you within 24 hours with a detailed quote.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3] rounded-2xl p-6 border border-[#e2d5c4]"
                  >
                    <h4 className="text-lg font-bold text-[#231c14] mb-4 flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5 text-[#b69777]" />
                      What Happens Next?
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-[#6b5c47]">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <div>
                          <strong className="text-[#231c14]">Expert Review</strong><br />
                          Our specialists analyze your project requirements
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <div>
                          <strong className="text-[#231c14]">Custom Quote</strong><br />
                          Detailed pricing with recommendations
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <div>
                          <strong className="text-[#231c14]">Personal Contact</strong><br />
                          Call or email within 24 hours
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <div>
                          <strong className="text-[#231c14]">Free Consultation</strong><br />
                          Discuss your vision and next steps
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center gap-4">
                      {[1, 2, 3].map((step) => (
                        <React.Fragment key={step}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                            currentStep >= step 
                              ? 'bg-gradient-to-br from-[#b69777] to-[#907252] text-white shadow-lg' 
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {step}
                          </div>
                          {step < 3 && (
                            <div className={`w-12 h-1 rounded-full transition-all duration-300 ${
                              currentStep > step ? 'bg-gradient-to-r from-[#b69777] to-[#907252]' : 'bg-gray-200'
                            }`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-[#231c14] mb-2 flex items-center justify-center gap-3">
                          <User className="w-7 h-7 text-[#b69777]" />
                          Personal Information
                        </h3>
                        <p className="text-[#6b5c47]">Let's start with your contact details</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#231c14] mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full px-4 py-3 border-2 border-[#e2d5c4] rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 bg-white shadow-sm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#231c14] mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            className="w-full px-4 py-3 border-2 border-[#e2d5c4] rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 bg-white shadow-sm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#231c14] mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+44 7XXX XXXXXX"
                            required
                            className="w-full px-4 py-3 border-2 border-[#e2d5c4] rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 bg-white shadow-sm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#231c14] mb-2">
                            Project Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="City, Postcode"
                            className="w-full px-4 py-3 border-2 border-[#e2d5c4] rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-[#231c14] mb-2 flex items-center justify-center gap-3">
                          <Home className="w-7 h-7 text-[#b69777]" />
                          Project Details
                        </h3>
                        <p className="text-[#6b5c47]">Tell us about your project requirements</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#231c14] mb-4">
                            Project Type *
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {projectTypes.map((type) => (
                              <label
                                key={type.value}
                                className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                                  formData.projectType === type.value
                                    ? 'border-[#b69777] bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5'
                                    : 'border-[#e2d5c4] hover:border-[#b69777]/50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="projectType"
                                  value={type.value}
                                  checked={formData.projectType === type.value}
                                  onChange={handleInputChange}
                                  className="sr-only"
                                />
                                <type.icon className={`w-5 h-5 ${
                                  formData.projectType === type.value ? 'text-[#b69777]' : 'text-[#6b5c47]'
                                }`} />
                                <span className={`text-sm font-medium ${
                                  formData.projectType === type.value ? 'text-[#231c14]' : 'text-[#6b5c47]'
                                }`}>
                                  {type.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#231c14] mb-2">
                              Approximate Area (m²)
                            </label>
                            <input
                              type="number"
                              name="area"
                              value={formData.area}
                              onChange={handleInputChange}
                              placeholder="e.g., 25"
                              className="w-full px-4 py-3 border-2 border-[#e2d5c4] rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 bg-white shadow-sm"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#231c14] mb-4">
                              Timeline Preference
                            </label>
                            <div className="space-y-3">
                              {urgencyOptions.map((option) => (
                                <label
                                  key={option.value}
                                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                                    formData.urgency === option.value
                                      ? 'border-[#b69777] bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5'
                                      : 'border-[#e2d5c4] hover:border-[#b69777]/50'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="urgency"
                                    value={option.value}
                                    checked={formData.urgency === option.value}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                  />
                                  <option.icon className={`w-5 h-5 ${
                                    formData.urgency === option.value ? 'text-[#b69777]' : 'text-[#6b5c47]'
                                  }`} />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className={`font-semibold ${
                                        formData.urgency === option.value ? 'text-[#231c14]' : 'text-[#6b5c47]'
                                      }`}>
                                        {option.label}
                                      </span>
                                      <span className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${option.color}`}>
                                        {option.badge}
                                      </span>
                                    </div>
                                    <p className="text-sm text-[#6b5c47]">{option.subtitle}</p>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Additional Information */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-[#231c14] mb-2 flex items-center justify-center gap-3">
                          <MessageSquare className="w-7 h-7 text-[#b69777]" />
                          Additional Information
                        </h3>
                        <p className="text-[#6b5c47]">Any specific requirements or questions?</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#231c14] mb-2">
                            Project Description & Requirements
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={6}
                            placeholder="Tell us more about your project, specific requirements, design preferences, or any questions you have..."
                            className="w-full px-4 py-3 border-2 border-[#e2d5c4] rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 bg-white shadow-sm resize-none"
                          />
                        </div>

                        {/* Contact Information Display */}
                        <div className="bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3] rounded-2xl p-6 border border-[#e2d5c4]">
                          <h4 className="font-bold text-[#231c14] mb-4 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-[#b69777]" />
                            Our Contact Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e2d5c4]">
                              <Phone className="w-4 h-4 text-[#b69777]" />
                              <div>
                                <p className="font-semibold text-[#231c14]">Phone</p>
                                <p className="text-[#6b5c47]">+44 141 739 3377</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e2d5c4]">
                              <Mail className="w-4 h-4 text-[#b69777]" />
                              <div>
                                <p className="font-semibold text-[#231c14]">Email</p>
                                <p className="text-[#6b5c47]">info@thewallshop.co.uk</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e2d5c4]">
                              <Clock className="w-4 h-4 text-[#b69777]" />
                              <div>
                                <p className="font-semibold text-[#231c14]">Hours</p>
                                <p className="text-[#6b5c47]">Mon-Fri: 9 AM-6 PM</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e2d5c4]">
                              <MapPin className="w-4 h-4 text-[#b69777]" />
                              <div>
                                <p className="font-semibold text-[#231c14]">Service Area</p>
                                <p className="text-[#6b5c47]">UK Wide Service</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-[#e2d5c4]">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 px-6 py-3 border-2 border-[#e2d5c4] text-[#6b5c47] rounded-xl font-semibold hover:border-[#b69777] hover:text-[#b69777] transition-all duration-300"
                      >
                        Previous
                      </button>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-3 rounded-xl font-semibold hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        Next Step
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-3 rounded-xl font-semibold hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting Quote Request...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Get My Free Quote
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteModal;
