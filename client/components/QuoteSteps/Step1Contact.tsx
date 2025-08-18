import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, MessageSquare, Shield, CheckCircle } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';

export default function Step1Contact() {
  const { state, updateContact, clearErrors } = useQuote();
  const { contact } = state.formData;
  const { errors } = state;

  const handleInputChange = (field: string, value: string) => {
    updateContact({ [field]: value });
    // Clear specific field error when user starts typing
    if (errors[field]) {
      clearErrors();
    }
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value.replace(/\s/g, ''));
      default:
        return true;
    }
  };

  const getFieldStatus = (field: string, value: string) => {
    if (!value) return 'default';
    if (errors[field]) return 'error';
    if (validateField(field, value)) return 'success';
    return 'warning';
  };

  const renderFieldIcon = (field: string, value: string) => {
    const status = getFieldStatus(field, value);
    if (status === 'success' && value) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
      data-seo-title="Contact Information Form"
      data-seo-desc="Professional contact form for smart wall and luxury panel quote requests"
    >
      {/* Header Section */}
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-leather-600 to-leather-700 rounded-2xl shadow-lg"
        >
          <User className="w-8 h-8 text-white" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-mocha-950 tracking-tight">
            Let's Get Started
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Please provide your contact details so we can prepare your personalized quote for 
            <span className="font-semibold text-mocha-950"> smart walls, luxury panels, and premium home solutions</span>.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <section className="space-y-6" role="form" aria-label="Contact Information Form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Full Name */}
          <fieldset className="lg:col-span-2">
            <label 
              htmlFor="fullName" 
              className="flex items-center text-sm font-semibold text-mocha-950 mb-3 gap-2"
            >
              <User className="w-4 h-4 text-leather-600" />
              Full Name
              <span className="text-red-500" aria-label="required">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={contact.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-4 bg-white border-2 rounded-xl text-mocha-950 placeholder-stone-400 
                  focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                  transition-all duration-200 hover:border-stone-400 ${
                    errors.fullName 
                      ? 'border-red-500 bg-red-50' 
                      : getFieldStatus('fullName', contact.fullName) === 'success'
                      ? 'border-green-500 bg-green-50'
                      : 'border-stone-300'
                  }`}
                aria-describedby={errors.fullName ? 'fullName-error' : 'fullName-help'}
                aria-invalid={!!errors.fullName}
                autoComplete="name"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {renderFieldIcon('fullName', contact.fullName)}
              </div>
            </div>
            {errors.fullName ? (
              <p id="fullName-error" className="text-red-600 text-sm mt-2 flex items-center gap-1" role="alert">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.fullName}
              </p>
            ) : (
              <p id="fullName-help" className="text-stone-500 text-sm mt-2">
                Please provide your full name for personalized service
              </p>
            )}
          </fieldset>

          {/* Email */}
          <fieldset>
            <label 
              htmlFor="email" 
              className="flex items-center text-sm font-semibold text-mocha-950 mb-3 gap-2"
            >
              <Mail className="w-4 h-4 text-leather-600" />
              Email Address
              <span className="text-red-500" aria-label="required">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={contact.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className={`w-full px-4 py-4 bg-white border-2 rounded-xl text-mocha-950 placeholder-stone-400 
                  focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                  transition-all duration-200 hover:border-stone-400 ${
                    errors.email 
                      ? 'border-red-500 bg-red-50' 
                      : getFieldStatus('email', contact.email) === 'success'
                      ? 'border-green-500 bg-green-50'
                      : 'border-stone-300'
                  }`}
                aria-describedby={errors.email ? 'email-error' : 'email-help'}
                aria-invalid={!!errors.email}
                autoComplete="email"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {renderFieldIcon('email', contact.email)}
              </div>
            </div>
            {errors.email ? (
              <p id="email-error" className="text-red-600 text-sm mt-2 flex items-center gap-1" role="alert">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.email}
              </p>
            ) : (
              <p id="email-help" className="text-stone-500 text-sm mt-2">
                We'll send your quote and updates to this email
              </p>
            )}
          </fieldset>

          {/* Phone */}
          <fieldset>
            <label 
              htmlFor="phone" 
              className="flex items-center text-sm font-semibold text-mocha-950 mb-3 gap-2"
            >
              <Phone className="w-4 h-4 text-leather-600" />
              Phone Number
              <span className="text-red-500" aria-label="required">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contact.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+44 7XXX XXXXXX"
                className={`w-full px-4 py-4 bg-white border-2 rounded-xl text-mocha-950 placeholder-stone-400 
                  focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                  transition-all duration-200 hover:border-stone-400 ${
                    errors.phone 
                      ? 'border-red-500 bg-red-50' 
                      : getFieldStatus('phone', contact.phone) === 'success'
                      ? 'border-green-500 bg-green-50'
                      : 'border-stone-300'
                  }`}
                aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
                aria-invalid={!!errors.phone}
                autoComplete="tel"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {renderFieldIcon('phone', contact.phone)}
              </div>
            </div>
            {errors.phone ? (
              <p id="phone-error" className="text-red-600 text-sm mt-2 flex items-center gap-1" role="alert">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.phone}
              </p>
            ) : (
              <p id="phone-help" className="text-stone-500 text-sm mt-2">
                For quick consultation and project updates
              </p>
            )}
          </fieldset>

          {/* Installation Address */}
          <fieldset className="lg:col-span-2">
            <label 
              htmlFor="installationAddress" 
              className="flex items-center text-sm font-semibold text-mocha-950 mb-3 gap-2"
            >
              <MapPin className="w-4 h-4 text-leather-600" />
              Installation Address
              <span className="text-stone-500 text-sm font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="installationAddress"
                name="installationAddress"
                value={contact.installationAddress}
                onChange={(e) => handleInputChange('installationAddress', e.target.value)}
                placeholder="Enter the installation address (helps with accurate pricing)"
                className="w-full px-4 py-4 bg-white border-2 border-stone-300 rounded-xl text-mocha-950 
                  placeholder-stone-400 focus:outline-none focus:ring-4 focus:ring-leather-200 
                  focus:border-leather-600 transition-all duration-200 hover:border-stone-400"
                aria-describedby="installationAddress-help"
                autoComplete="address-line1"
              />
            </div>
            <p id="installationAddress-help" className="text-stone-500 text-sm mt-2 flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-stone-400" />
              Providing the installation location helps us calculate accurate delivery costs and installation requirements
            </p>
          </fieldset>

          {/* Additional Notes */}
          <fieldset className="lg:col-span-2">
            <label 
              htmlFor="additionalNotes" 
              className="flex items-center text-sm font-semibold text-mocha-950 mb-3 gap-2"
            >
              <MessageSquare className="w-4 h-4 text-leather-600" />
              Project Details & Requirements
              <span className="text-stone-500 text-sm font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={contact.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                rows={5}
                placeholder="Tell us about your project vision, timeline, specific requirements, or any questions you have..."
                className="w-full px-4 py-4 bg-white border-2 border-stone-300 rounded-xl text-mocha-950 
                  placeholder-stone-400 focus:outline-none focus:ring-4 focus:ring-leather-200 
                  focus:border-leather-600 transition-all duration-200 hover:border-stone-400 resize-vertical min-h-[120px]"
                aria-describedby="additionalNotes-help"
              />
            </div>
            <p id="additionalNotes-help" className="text-stone-500 text-sm mt-2 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 mt-0.5 text-stone-400" />
              Share your project goals, preferred timeline, budget considerations, or any specific features you're looking for
            </p>
          </fieldset>
        </div>
      </section>

      {/* Privacy & Security Notice */}
      <section 
        className="bg-gradient-to-r from-clay-50 to-stone-50 border border-clay-200 rounded-2xl p-6 shadow-sm"
        role="complementary"
        aria-labelledby="privacy-heading"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-leather-600 rounded-xl flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 id="privacy-heading" className="font-semibold text-mocha-950 text-lg">
              Your Privacy & Security Matter
            </h3>
            <div className="text-stone-700 space-y-1">
              <p className="leading-relaxed">
                We take your privacy seriously. Your information is used exclusively to prepare your personalized quote 
                and provide exceptional service throughout your project journey.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-sm">
                <span className="flex items-center gap-1.5 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  SSL Encrypted
                </span>
                <span className="flex items-center gap-1.5 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  GDPR Compliant
                </span>
                <span className="flex items-center gap-1.5 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  No Third-Party Sharing
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Service Promise */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-leather-100 text-leather-800 rounded-full text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Professional Service Guaranteed
        </div>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Our certified specialists will review your requirements and provide a detailed, 
          no-obligation quote within 24 hours. Experience the difference of working with 
          industry-leading experts in luxury wall solutions.
        </p>
      </section>
    </motion.div>
  );
}