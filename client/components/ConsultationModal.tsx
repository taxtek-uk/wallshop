import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Clock, 
  Send, 
  Check, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Building2,
  Calendar,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  title = 'Book Your Free Consultation',
  subtitle = 'Let\'s discuss your smart wall project and bring your vision to life'
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContactMethod: 'email' as 'email' | 'phone',
    hearAboutUs: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Form validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return 'Please enter a valid name';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
          return 'Please enter a valid phone number (minimum 10 digits)';
        }
        return undefined;
      case 'projectType':
        if (!value) return 'Please select a project type';
        return undefined;
      case 'budget':
        if (!value) return 'Please select your budget range';
        return undefined;
      case 'timeline':
        if (!value) return 'Please select your preferred timeline';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Special handling for preferredContactMethod to ensure correct typing
    if (name === 'preferredContactMethod') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value as 'email' | 'phone' 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Real-time validation for touched fields
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setFormErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateCurrentStep = (): boolean => {
    const step1Fields = ['fullName', 'email', 'phone'];
    const step2Fields = ['projectType', 'budget', 'timeline'];
    
    const fieldsToValidate = currentStep === 1 ? step1Fields : step2Fields;
    const errors: FormErrors = {};
    let isValid = true;

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        errors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setFormErrors(errors);
    setTouchedFields(new Set([...touchedFields, ...fieldsToValidate]));
    return isValid;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Import the sendConsultation function
      const { sendConsultation } = await import('../../api/sendConsultation');
      
      // Prepare the data
      const consultationData = {
        ...formData,
        preferredContactMethod: formData.preferredContactMethod as 'email' | 'phone',
        submittedAt: new Date().toISOString(),
        source: 'consultation-modal',
        ipAddress: 'client-ip', // This would be populated by the server
        userAgent: navigator.userAgent,
      };

      // Send the consultation request
      await sendConsultation(consultationData);

      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        preferredContactMethod: 'email' as 'email' | 'phone',
        hearAboutUs: '',
      });
      setFormErrors({});
      setTouchedFields(new Set());
      setCurrentStep(1);

      // Close modal after 4 seconds
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 4000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit consultation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Enhanced Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden border border-gray-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Success State */}
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-white z-50 flex items-center justify-center p-8"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
                <p className="text-gray-600 mb-4 max-w-md">
                  Your consultation request has been submitted successfully. We'll contact you within 24 hours to schedule your personalized consultation.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>24hr Response</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Free Consultation</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-mocha-950 to-leather-900 text-white p-6" />
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23ffffff%27%20fill-opacity=%270.05%27%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"
              />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-leather-500 to-leather-600 rounded-2xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 id="modal-title" className="text-2xl font-bold leading-tight">
                        {title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-300">Trusted by 500+ clients</span>
                      </div>
                    </div>
                  </div>
                  <p id="modal-description" className="text-gray-200 text-lg leading-relaxed">
                    {subtitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-white/10 rounded-full transition-all duration-200 flex-shrink-0 group"
                  aria-label="Close consultation modal"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300">
                    Step {currentStep} of 2
                  </span>
                  <span className="text-sm text-gray-400">
                    {currentStep === 1 ? 'Personal Information' : 'Project Details'}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-leather-500 to-leather-600 h-2 rounded-full"
                    initial={{ width: "50%" }}
                    animate={{ width: currentStep === 1 ? "50%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
            <form onSubmit={handleSubmit} className="p-8">
              <AnimatePresence mode="wait">
                {currentStep === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <div>
                      <label 
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        <User className="w-5 h-5 inline mr-2 text-leather-600" />
                        Full Name *
                      </label>
                      <input
                        ref={firstInputRef}
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        aria-describedby={formErrors.fullName ? "fullName-error" : undefined}
                        aria-invalid={!!formErrors.fullName}
                        className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-lg text-gray-900 ${
                          formErrors.fullName 
                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.fullName && (
                        <motion.p
                          id="fullName-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center font-medium"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {formErrors.fullName}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label 
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        <Mail className="w-5 h-5 inline mr-2 text-leather-600" />
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                        aria-invalid={!!formErrors.email}
                        className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-lg text-gray-900 ${
                          formErrors.email 
                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white'
                        }`}
                        placeholder="your.email@company.com"
                      />
                      {formErrors.email && (
                        <motion.p
                          id="email-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center font-medium"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {formErrors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label 
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        <Phone className="w-5 h-5 inline mr-2 text-leather-600" />
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        aria-describedby={formErrors.phone ? "phone-error" : undefined}
                        aria-invalid={!!formErrors.phone}
                        className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-lg text-gray-900 ${
                          formErrors.phone 
                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white'
                        }`}
                        placeholder="+44 20 1234 5678"
                      />
                      {formErrors.phone && (
                        <motion.p
                          id="phone-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center font-medium"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {formErrors.phone}
                        </motion.p>
                      )}
                    </div>

                    {/* Company Field (Optional) */}
                    <div>
                      <label 
                        htmlFor="company"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        <Building2 className="w-5 h-5 inline mr-2 text-gray-500" />
                        Company Name (Optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white transition-all duration-300 text-lg text-gray-900"
                        placeholder="Your company name"
                      />
                    </div>

                    {/* Next Button */}
                    <div className="pt-6">
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full py-4 text-white text-lg font-semibold bg-gradient-to-r from-leather-600 to-leather-600 hover:from-leather-700 hover:to-leather-700 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl"
                      >
                        <span className="relative z-10">Continue to Project Details</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Project Type Field */}
                    <div>
                      <label 
                        htmlFor="projectType"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        <Sparkles className="w-5 h-5 inline mr-2 text-leather-600" />
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        aria-describedby={formErrors.projectType ? "projectType-error" : undefined}
                        aria-invalid={!!formErrors.projectType}
                        className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-lg text-gray-900 ${
                          formErrors.projectType 
                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white'
                        }`}
                      >
                        <option value="">Select your project type</option>
                        <option value="smart-walls">Smart Interactive Walls</option>
                        <option value="luxury-wallpapers">Premium Luxury Wallpapers</option>
                        <option value="acoustic-panels">Acoustic Sound Panels</option>
                        <option value="carbon-rock-boards">Carbon Rock Boards</option>
                        <option value="digital-displays">Digital Display Solutions</option>
                        <option value="full-renovation">Complete Wall Renovation</option>
                        <option value="consultation-only">Design Consultation Only</option>
                        <option value="other">Other (Please specify in message)</option>
                      </select>
                      {formErrors.projectType && (
                        <motion.p
                          id="projectType-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center font-medium"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {formErrors.projectType}
                        </motion.p>
                      )}
                    </div>

                    {/* Budget Field */}
                    <div>
                      <label 
                        htmlFor="budget"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        <span className="text-leather-600">£</span>
                        <span className="ml-2">Budget Range *</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        aria-describedby={formErrors.budget ? "budget-error" : undefined}
                        aria-invalid={!!formErrors.budget}
                        className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-lg text-gray-900 ${
                          formErrors.budget 
                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white'
                        }`}
                      >
                        <option value="">Select your budget range</option>
                        <option value="under-5k">Under £5,000</option>
                        <option value="5k-15k">£5,000 - £15,000</option>
                        <option value="15k-30k">£15,000 - £30,000</option>
                        <option value="30k-50k">£30,000 - £50,000</option>
                        <option value="50k-100k">£50,000 - £100,000</option>
                        <option value="over-100k">Over £100,000</option>
                        <option value="consultation-first">Consultation First</option>
                      </select>
                      {formErrors.budget && (
                        <motion.p
                          id="budget-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center font-medium"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {formErrors.budget}
                        </motion.p>
                      )}
                    </div>

                    {/* Timeline Field */}
                    <div>
                      <label 
                        htmlFor="timeline"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        <Calendar className="w-5 h-5 inline mr-2 text-leather-600" />
                        Project Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        aria-describedby={formErrors.timeline ? "timeline-error" : undefined}
                        aria-invalid={!!formErrors.timeline}
                        className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-lg text-gray-900 ${
                          formErrors.timeline 
                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white'
                        }`}
                      >
                        <option value="">Select your preferred timeline</option>
                        <option value="asap">As Soon As Possible</option>
                        <option value="1-3-months">1-3 Months</option>
                        <option value="3-6-months">3-6 Months</option>
                        <option value="6-12-months">6-12 Months</option>
                        <option value="over-12-months">Over 12 Months</option>
                        <option value="flexible">Flexible Timeline</option>
                        <option value="planning-phase">Still in Planning Phase</option>
                      </select>
                      {formErrors.timeline && (
                        <motion.p
                          id="timeline-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center font-medium"
                          role="alert"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {formErrors.timeline}
                        </motion.p>
                      )}
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200">
                          <input
                            type="radio"
                            name="preferredContactMethod"
                            value="email"
                            checked={formData.preferredContactMethod === 'email'}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.preferredContactMethod === 'email' 
                              ? 'border-leather-600 bg-leather-600' 
                              : 'border-gray-300'
                          }`}>
                            {formData.preferredContactMethod === 'email' && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <Mail className="w-5 h-5 text-leather-600 mr-2" />
                          <span className="font-medium text-gray-900">Email</span>
                        </label>
                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200">
                          <input
                            type="radio"
                            name="preferredContactMethod"
                            value="phone"
                            checked={formData.preferredContactMethod === 'phone'}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.preferredContactMethod === 'phone' 
                              ? 'border-leather-600 bg-leather-600' 
                              : 'border-gray-300'
                          }`}>
                            {formData.preferredContactMethod === 'phone' && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <Phone className="w-5 h-5 text-leather-600 mr-2" />
                          <span className="font-medium text-gray-900">Phone</span>
                        </label>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label 
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        <MessageSquare className="w-5 h-5 inline mr-2 text-gray-500" />
                        Project Details & Requirements
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white transition-all duration-300 resize-none text-lg text-gray-900"
                        placeholder="Tell us about your vision, space dimensions, specific requirements, or any questions you have..."
                      />
                    </div>

                    {/* How did you hear about us */}
                    <div>
                      <label 
                        htmlFor="hearAboutUs"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                      >
                        How did you hear about us?
                      </label>
                      <select
                        id="hearAboutUs"
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-100 focus:border-leather-500 bg-gray-50 hover:bg-white transition-all duration-300 text-lg text-gray-900"
                      >
                        <option value="">Please select</option>
                        <option value="google-search">Google Search</option>
                        <option value="social-media">Social Media</option>
                        <option value="referral">Referral from Friend/Colleague</option>
                        <option value="website">Company Website</option>
                        <option value="trade-show">Trade Show/Exhibition</option>
                        <option value="advertisement">Advertisement</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Error Message */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <div className="flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                          <p className="text-red-700 font-medium">{submitError}</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6">
                      {/* Back Button */}
                      <Button
                        type="button"
                        onClick={handlePrevStep}
                        variant="outline"
                        className="flex-1 py-4 text-lg font-semibold 
                                  border-2 border-gray-300 text-gray-700 
                                  bg-white rounded-xl 
                                  hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 
                                  hover:border-gray-400 
                                  hover:text-gray-900
                                  focus:outline-none focus:ring-2 focus:ring-leather-400 
                                  transition-all duration-300 ease-in-out
                                  shadow-sm hover:shadow-md"
                      >
                        ← Back
                      </Button>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 text-lg font-semibold text-white 
                                  bg-gradient-to-r from-leather-600 to-leather-600 
                                  hover:from-leather-700 hover:to-leather-700 
                                  active:scale-[0.98] 
                                  rounded-xl relative overflow-hidden 
                                  shadow-lg hover:shadow-xl 
                                  transition-all duration-300 ease-in-out
                                  disabled:opacity-50 disabled:cursor-not-allowed
                                  focus:outline-none focus:ring-2 focus:ring-leather-400"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                            />
                            <span className="relative z-10">Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Submit Request</span>
                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                          </>
                        )}

                        {/* Subtle glow effect on hover */}
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-leather-400/20 to-leather-400/20 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></span>
                      </Button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trust Indicators - Always Visible */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-leather-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-leather-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Free Consultation</h4>
                      <p className="text-sm text-gray-600">No obligation, expert advice</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">24hr Response</h4>
                      <p className="text-sm text-gray-600">Quick professional reply</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-leather-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-leather-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Design</h4>
                      <p className="text-sm text-gray-600">Professional guidance</p>
                    </div>
                  </div>
                </div>
                <div className="p-4"></div>
                
                
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConsultationModal;