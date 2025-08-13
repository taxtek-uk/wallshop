import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  Palette,
  Sun,
  Moon,
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: {
    name: string;
    price: string;
  };
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    area: '',
    message: '',
    urgency: 'standard',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeFeature, setActiveFeature] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const stepTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        stepTitleRef.current?.focus();
      }, 300);
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % 4);
      }, 3000);
      return () => {
        document.body.style.overflow = 'unset';
        clearInterval(interval);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const validateStep = useCallback(() => {
    const errors: FormErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) errors.name = 'Full name is required.';
      if (!formData.email.trim()) errors.email = 'Email is required.';
      else if (!emailRegex.test(formData.email)) errors.email = 'Please enter a valid email.';
      if (!formData.phone.trim()) errors.phone = 'Phone number is required.';
      else if (!phoneRegex.test(formData.phone)) errors.phone = 'Please enter a valid phone number.';
    }
    if (currentStep === 2) {
      if (!formData.projectType) errors.projectType = 'Please select a project type.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      setTimeout(() => {
        stepTitleRef.current?.focus();
      }, 100);
    }
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setTimeout(() => {
      stepTitleRef.current?.focus();
    }, 100);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateStep()) return;
  setIsSubmitting(true);

  try {
    const res = await fetch('/api/send-quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

if (!res.ok) {
  const { error } = await res.json().catch(() => ({ error: 'Unknown error' }));
  throw new Error(error || 'Failed to send quote');
}

    setIsSubmitting(false);
    setIsSubmitted(true);

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
        urgency: 'standard',
      });
      setCurrentStep(1);
      onClose();
    }, 4000);
  } catch {
    setIsSubmitting(false);
    alert('Failed to submit quote request. Please try again later.');
  }
};


  const projectTypes = useMemo(
    () => [
      { value: 'residential-living', label: 'Residential - Living Room', icon: Home },
      { value: 'residential-bedroom', label: 'Residential - Bedroom', icon: Home },
      { value: 'residential-kitchen', label: 'Residential - Kitchen', icon: Home },
      { value: 'residential-bathroom', label: 'Residential - Bathroom', icon: Home },
      { value: 'commercial-office', label: 'Commercial - Office', icon: Building2 },
      { value: 'commercial-retail', label: 'Commercial - Retail', icon: Building2 },
      { value: 'commercial-restaurant', label: 'Commercial - Restaurant', icon: Building2 },
      { value: 'industrial-warehouse', label: 'Industrial - Warehouse', icon: Building2 },
      { value: 'other', label: 'Other / Custom Project', icon: Palette },
    ],
    []
  );

  const urgencyOptions = useMemo(
    () => [
      {
        value: 'urgent',
        label: 'Urgent Priority',
        subtitle: '24-48 hours response',
        badge: 'URGENT',
        color: 'from-red-500 to-orange-500',
        icon: Zap,
      },
      {
        value: 'standard',
        label: 'Standard Timeline',
        subtitle: '3-5 business days',
        badge: 'STANDARD',
        color: 'from-[#b69777] to-[#907252]',
        icon: Calendar,
      },
      {
        value: 'flexible',
        label: 'Flexible Schedule',
        subtitle: '1-2 weeks planning',
        badge: 'FLEXIBLE',
        color: 'from-green-500 to-emerald-500',
        icon: Clock,
      },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: Shield,
        title: 'Lifetime Warranty',
        description: 'Comprehensive protection for your investment',
        active: activeFeature === 0,
      },
      {
        icon: Award,
        title: 'Expert Installation',
        description: 'Certified professionals with 10+ years experience',
        active: activeFeature === 1,
      },
      {
        icon: Users,
        title: '24/7 Support',
        description: 'Round-the-clock assistance when you need it',
        active: activeFeature === 2,
      },
      {
        icon: Star,
        title: '5-Star Rated',
        description: 'Trusted by 10,000+ satisfied customers',
        active: activeFeature === 3,
      },
    ],
    [activeFeature]
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto transition-colors duration-500 ${
          darkMode ? 'bg-black bg-opacity-95' : 'bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, duration: 0.6 }}
          className={`relative w-full max-w-4xl lg:max-w-6xl my-4 sm:my-8 ${
            darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-[#e2d5c4]'
          } rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Gradient and SVG background */}
          <div
            className={`relative text-white overflow-hidden ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                : 'bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]'
            }`}
          >
            <div className="absolute inset-0 opacity-20">
              <div
                className={`absolute inset-0 ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30'
                    : 'bg-gradient-to-r from-[#b69777]/30 to-[#907252]/30'
                }`}
              />
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 z-50 group"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDarkMode((prev) => !prev);
              }}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 z-50 group"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 pr-12 sm:pr-16">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-xl sm:rounded-2xl shadow-lg w-fit">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h1
                      id="quote-modal-title"
                      tabIndex={-1}
                      ref={stepTitleRef}
                      className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1 sm:mb-2 bg-gradient-to-r from-white via-[#f8f6f3] to-[#b69777] bg-clip-text text-transparent"
                    >
                      Get Your Free Quote
                    </h1>
                    <p className="text-white/80 text-sm sm:text-base lg:text-lg">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`text-center p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-500 ${
                      feature.active
                        ? 'bg-gradient-to-br from-[#b69777]/20 to-[#907252]/10 border border-[#b69777]/50 sm:scale-105'
                        : darkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <feature.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 transition-colors duration-500 ${
                        feature.active ? 'text-[#b69777]' : darkMode ? 'text-gray-400' : 'text-white/70'
                      }`}
                      aria-hidden="true"
                    />
                    <h4
                      className={`text-xs sm:text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-white'
                      } mb-1`}
                    >
                      {feature.title}
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-white/70'} hidden sm:block`}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className={`p-4 sm:p-6 lg:p-8 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-[#231c14]'}`}>
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="text-center py-8 sm:py-12"
                role="alert"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15, stiffness: 300 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl"
                  aria-hidden="true"
                >
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-3 sm:mb-4"
                >
                  Quote Request Submitted Successfully!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4"
                >
                  Thank you for choosing us! Our expert team will review your requirements and contact you within 24
                  hours with a detailed quote.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border ${
                    darkMode ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-[#e2d5c4] bg-[#faf7f3] text-[#6b5c47]'
                  }`}
                >
                  <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#b69777]" />
                    What Happens Next?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    {[
                      'Expert Review: Our specialists analyze your project requirements',
                      'Custom Quote: Detailed pricing with recommendations',
                      'Personal Contact: Call or email within 24 hours',
                      'Free Consultation: Discuss your vision and next steps',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            darkMode
                              ? 'bg-gradient-to-br from-gray-700 to-gray-600 text-gray-300'
                              : 'bg-gradient-to-br from-[#b69777] to-[#907252] text-white'
                          }`}
                        >
                          <span className="text-xs font-bold">{idx + 1}</span>
                        </div>
                        <div className={darkMode ? 'text-gray-400' : 'text-[#6b5c47]'}>
                          <strong>{item.split(':')[0]}</strong>
                          {item.substring(item.indexOf(':'))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-8" aria-live="polite">
                <div className="flex items-center justify-center mb-6 sm:mb-8" aria-label="Progress">
                  <div className="flex items-center gap-2 sm:gap-4">
                    {[1, 2, 3].map((step) => (
                      <React.Fragment key={step}>
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                            currentStep >= step
                              ? 'bg-gradient-to-br from-[#b69777] to-[#907252] text-white shadow-lg'
                              : darkMode
                              ? 'bg-gray-700 text-gray-400'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                          aria-current={currentStep === step ? 'step' : undefined}
                        >
                          <span className="text-sm sm:text-base">{step}</span>
                        </div>
                        {step < 3 && (
                          <div
                            className={`w-8 sm:w-12 h-1 rounded-full transition-all duration-300 ${
                              currentStep > step
                                ? 'bg-gradient-to-r from-[#b69777] to-[#907252]'
                                : darkMode
                                ? 'bg-gray-700'
                                : 'bg-gray-200'
                            }`}
                            aria-hidden="true"
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Step 1 */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 sm:space-y-6"
                    role="region"
                    aria-labelledby="step1-title"
                  >
                    <h3
                      id="step1-title"
                      tabIndex={-1}
                      className={`text-xl sm:text-2xl font-bold mb-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 ${
                        darkMode ? 'text-gray-100' : 'text-[#231c14]'
                      }`}
                    >
                      <User
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          darkMode ? 'text-[#b69777]' : 'text-[#b69777]'
                        }`}
                        aria-hidden="true"
                      />
                      Personal Information
                    </h3>
                    <p className={`text-sm sm:text-base mb-6 text-center ${darkMode ? 'text-gray-400' : 'text-[#6b5c47]'}`}>
                      Let's start with your contact details
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className={`block text-sm font-semibold mb-1 ${
                            darkMode ? 'text-gray-200' : 'text-[#231c14]'
                          }`}
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          aria-required="true"
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? 'name-error' : undefined}
                          className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 text-sm sm:text-base shadow-sm ${
                            formErrors.name
                              ? 'border-red-500 focus:border-red-600 bg-red-50 text-red-700'
                              : darkMode
                              ? 'border-gray-700 bg-gray-800 text-gray-300'
                              : 'border-[#e2d5c4] bg-white text-[#231c14]'
                          }`}
                        />
                        {formErrors.name && (
                          <p id="name-error" className="text-xs text-red-600 mt-1" role="alert">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className={`block text-sm font-semibold mb-1 ${
                            darkMode ? 'text-gray-200' : 'text-[#231c14]'
                          }`}
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          aria-required="true"
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                          className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 text-sm sm:text-base shadow-sm ${
                            formErrors.email
                              ? 'border-red-500 focus:border-red-600 bg-red-50 text-red-700'
                              : darkMode
                              ? 'border-gray-700 bg-gray-800 text-gray-300'
                              : 'border-[#e2d5c4] bg-white text-[#231c14]'
                          }`}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="text-xs text-red-600 mt-1" role="alert">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label
                          htmlFor="phone"
                          className={`block text-sm font-semibold mb-1 ${
                            darkMode ? 'text-gray-200' : 'text-[#231c14]'
                          }`}
                        >
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+44 7XXX XXXXXX"
                          aria-required="true"
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                          className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 text-sm sm:text-base shadow-sm ${
                            formErrors.phone
                              ? 'border-red-500 focus:border-red-600 bg-red-50 text-red-700'
                              : darkMode
                              ? 'border-gray-700 bg-gray-800 text-gray-300'
                              : 'border-[#e2d5c4] bg-white text-[#231c14]'
                          }`}
                        />
                        {formErrors.phone && (
                          <p id="phone-error" className="text-xs text-red-600 mt-1" role="alert">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Address (optional) */}
                      <div className="space-y-1">
                        <label
                          htmlFor="address"
                          className={`block text-sm font-semibold mb-1 ${
                            darkMode ? 'text-gray-200' : 'text-[#231c14]'
                          }`}
                        >
                          Project Address
                        </label>
                        <input
                          id="address"
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="City, Postcode"
                          className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 text-sm sm:text-base shadow-sm ${
                            darkMode
                              ? 'border-gray-700 bg-gray-800 text-gray-300'
                              : 'border-[#e2d5c4] bg-white text-[#231c14]'
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 sm:space-y-6"
                    role="region"
                    aria-labelledby="step2-title"
                  >
                    <h3
                      id="step2-title"
                      tabIndex={-1}
                      className={`text-xl sm:text-2xl font-bold mb-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 ${
                        darkMode ? 'text-gray-100' : 'text-[#231c14]'
                      }`}
                    >
                      <Home
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          darkMode ? 'text-[#b69777]' : 'text-[#b69777]'
                        }`}
                        aria-hidden="true"
                      />
                      Project Details
                    </h3>
                    <p className={`text-sm sm:text-base mb-6 text-center ${darkMode ? 'text-gray-400' : 'text-[#6b5c47]'}`}>
                      Tell us about your project requirements
                    </p>

                    <div className="space-y-4 sm:space-y-6">
                      <fieldset>
                        <legend
                          className={`block text-sm font-semibold mb-3 ${
                            darkMode ? 'text-gray-200' : 'text-[#231c14]'
                          }`}
                        >
                          Project Type *
                        </legend>
                        <div
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
                          role="radiogroup"
                          aria-invalid={!!formErrors.projectType}
                          aria-describedby={formErrors.projectType ? 'projectType-error' : undefined}
                        >
                          {projectTypes.map((type) => (
                            <label
                              key={type.value}
                              className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md select-none ${
                                formData.projectType === type.value
                                  ? 'border-[#b69777] bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5'
                                  : darkMode
                                  ? 'border-gray-700 hover:border-[#b69777]/50 bg-gray-800'
                                  : 'border-[#e2d5c4] hover:border-[#b69777]/50 bg-white'
                              }`}
                            >
                              <input
                                type="radio"
                                name="projectType"
                                value={type.value}
                                checked={formData.projectType === type.value}
                                onChange={handleInputChange}
                                className="sr-only"
                                required
                                aria-required="true"
                              />
                              <type.icon
                                className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                                  formData.projectType === type.value
                                    ? 'text-[#b69777]'
                                    : darkMode
                                    ? 'text-gray-400'
                                    : 'text-[#6b5c47]'
                                }`}
                                aria-hidden="true"
                              />
                              <span
                                className={`text-xs sm:text-sm font-medium ${
                                  formData.projectType === type.value
                                    ? darkMode
                                      ? 'text-gray-100'
                                      : 'text-[#231c14]'
                                    : darkMode
                                    ? 'text-gray-400'
                                    : 'text-[#6b5c47]'
                                }`}
                              >
                                {type.label}
                              </span>
                            </label>
                          ))}
                        </div>
                        {formErrors.projectType && (
                          <p id="projectType-error" className="text-xs text-red-600 mt-1" role="alert">
                            {formErrors.projectType}
                          </p>
                        )}
                      </fieldset>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="area"
                            className={`block text-sm font-semibold mb-1 ${
                              darkMode ? 'text-gray-200' : 'text-[#231c14]'
                            }`}
                          >
                            Approximate Area (m²)
                          </label>
                          <input
                            id="area"
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            placeholder="e.g., 25"
                            min={0}
                            className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 text-sm sm:text-base shadow-sm ${
                              darkMode
                                ? 'border-gray-700 bg-gray-800 text-gray-300'
                                : 'border-[#e2d5c4] bg-white text-[#231c14]'
                            }`}
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            className={`block text-sm font-semibold mb-4 ${
                              darkMode ? 'text-gray-200' : 'text-[#231c14]'
                            }`}
                          >
                            Timeline Preference
                          </label>
                          <div className="space-y-2 sm:space-y-3" role="radiogroup" aria-label="Timeline Preference">
                            {urgencyOptions.map((option) => (
                              <label
                                key={option.value}
                                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md select-none ${
                                  formData.urgency === option.value
                                    ? 'border-[#b69777] bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5'
                                    : darkMode
                                    ? 'border-gray-700 hover:border-[#b69777]/50 bg-gray-800'
                                    : 'border-[#e2d5c4] hover:border-[#b69777]/50 bg-white'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="urgency"
                                  value={option.value}
                                  checked={formData.urgency === option.value}
                                  onChange={handleInputChange}
                                  className="sr-only"
                                  aria-checked={formData.urgency === option.value}
                                />
                                <option.icon
                                  className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                                    formData.urgency === option.value
                                      ? 'text-[#b69777]'
                                      : darkMode
                                      ? 'text-gray-400'
                                      : 'text-[#6b5c47]'
                                  }`}
                                  aria-hidden="true"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                    <span
                                      className={`text-sm sm:text-base font-semibold ${
                                        formData.urgency === option.value
                                          ? darkMode
                                            ? 'text-gray-100'
                                            : 'text-[#231c14]'
                                          : darkMode
                                          ? 'text-gray-400'
                                          : 'text-[#6b5c47]'
                                      }`}
                                    >
                                      {option.label}
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${option.color} w-fit`}
                                    >
                                      {option.badge}
                                    </span>
                                  </div>
                                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-[#6b5c47]'}`}>
                                    {option.subtitle}
                                  </p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4 sm:space-y-6"
                    role="region"
                    aria-labelledby="step3-title"
                  >
                    <h3
                      id="step3-title"
                      tabIndex={-1}
                      className={`text-xl sm:text-2xl font-bold mb-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 ${
                        darkMode ? 'text-gray-100' : 'text-[#231c14]'
                      }`}
                    >
                      <MessageSquare
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          darkMode ? 'text-[#b69777]' : 'text-[#b69777]'
                        }`}
                        aria-hidden="true"
                      />
                      Additional Information
                    </h3>
                    <p className={`text-sm sm:text-base mb-6 text-center ${darkMode ? 'text-gray-400' : 'text-[#6b5c47]'}`}>
                      Any specific requirements or questions?
                    </p>

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label
                          htmlFor="message"
                          className={`block text-sm font-semibold mb-2 ${
                            darkMode ? 'text-gray-200' : 'text-[#231c14]'
                          }`}
                        >
                          Project Description & Requirements
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us more about your project, specific requirements, design preferences, or any questions you have..."
                          className={`w-full px-3 py-3 sm:px-4 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#b69777] transition-all duration-300 resize-none text-sm sm:text-base shadow-sm ${
                            darkMode
                              ? 'border-gray-700 bg-gray-800 text-gray-300'
                              : 'border-[#e2d5c4] bg-white text-[#231c14]'
                          }`}
                        />
                      </div>

                      <div
                        className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border ${
                          darkMode ? 'border-gray-700 bg-gray-800' : 'border-[#e2d5c4] bg-[#faf7f3]'
                        }`}
                      >
                        <h4 className="text-sm sm:text-base font-bold mb-4 flex items-center gap-2 text-[#231c14] dark:text-gray-100">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#b69777]" />
                          Our Contact Information
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-[#6b5c47] dark:text-gray-400">
                          <div
                            className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border ${
                              darkMode ? 'border-gray-700 bg-gray-900' : 'border-[#e2d5c4] bg-white'
                            }`}
                          >
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#b69777] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-[#231c14] dark:text-gray-100 text-xs sm:text-sm">Phone</p>
                              <p className="text-[#6b5c47] dark:text-gray-400 text-xs sm:text-sm">+44 141 739 3377</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border ${
                              darkMode ? 'border-gray-700 bg-gray-900' : 'border-[#e2d5c4] bg-white'
                            }`}
                          >
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#b69777] flex-shrink-0" />
                            <div className="min-w-0 break-words">
                              <p className="font-semibold text-[#231c14] dark:text-gray-100 text-xs sm:text-sm">Email</p>
                              <p className="text-[#6b5c47] dark:text-gray-400 text-xs sm:text-sm">info@thewallshop.co.uk</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border ${
                              darkMode ? 'border-gray-700 bg-gray-900' : 'border-[#e2d5c4] bg-white'
                            }`}
                          >
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#b69777] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-[#231c14] dark:text-gray-100 text-xs sm:text-sm">Hours</p>
                              <p className="text-[#6b5c47] dark:text-gray-400 text-xs sm:text-sm">Mon-Fri: 9 AM-6 PM</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border ${
                              darkMode ? 'border-gray-700 bg-gray-900' : 'border-[#e2d5c4] bg-white'
                            }`}
                          >
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#b69777] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-[#231c14] dark:text-gray-100 text-xs sm:text-sm">Service Area</p>
                              <p className="text-[#6b5c47] dark:text-gray-400 text-xs sm:text-sm">UK Wide Service</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-[#e2d5c4] dark:border-gray-700">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`flex-1 px-4 sm:px-6 py-3 border-2 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                        darkMode
                          ? 'border-gray-700 text-gray-400 hover:border-[#b69777] hover:text-[#b69777]'
                          : 'border-[#e2d5c4] text-[#6b5c47] hover:border-[#b69777] hover:text-[#b69777]'
                      }`}
                    >
                      Previous
                    </button>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-3 rounded-lg sm:rounded-xl font-semibold hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-3 rounded-lg sm:rounded-xl font-semibold hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="hidden sm:inline">Submitting Quote Request...</span>
                          <span className="sm:hidden">Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Get My Free Quote</span>
                          <span className="sm:hidden">Get Quote</span>
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteModal;
