import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-mocha-950 mb-2">
          Let's Get Started
        </h2>
        <p className="text-stone-400 text-sm">
          Please provide your contact details so we can prepare your personalized quote.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label 
            htmlFor="fullName" 
            className="block text-sm font-medium text-mocha-950 mb-2"
          >
            <User className="inline w-4 h-4 mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            value={contact.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 bg-white border rounded-lg text-mocha-950 placeholder-stone-400 
              focus:outline-none focus:ring-2 focus:ring-leather-600 focus:border-leather-600 
              transition-colors duration-200 ${
                errors.fullName ? 'border-red-500' : 'border-stone-300'
              }`}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-red-600 text-xs mt-1" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-mocha-950 mb-2"
          >
            <Mail className="inline w-4 h-4 mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={contact.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className={`w-full px-4 py-3 bg-white border rounded-lg text-mocha-950 placeholder-stone-400 
              focus:outline-none focus:ring-2 focus:ring-leather-600 focus:border-leather-600 
              transition-colors duration-200 ${
                errors.email ? 'border-red-500' : 'border-stone-300'
              }`}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" className="text-red-600 text-xs mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label 
            htmlFor="phone" 
            className="block text-sm font-medium text-mocha-950 mb-2"
          >
            <Phone className="inline w-4 h-4 mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={contact.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+44 7XXX XXXXXX"
            className={`w-full px-4 py-3 bg-white border rounded-lg text-mocha-950 placeholder-stone-400 
              focus:outline-none focus:ring-2 focus:ring-leather-600 focus:border-leather-600 
              transition-colors duration-200 ${
                errors.phone ? 'border-red-500' : 'border-stone-300'
              }`}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p id="phone-error" className="text-red-600 text-xs mt-1" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Installation Address */}
        <div className="md:col-span-2">
          <label 
            htmlFor="installationAddress" 
            className="block text-sm font-medium text-mocha-950 mb-2"
          >
            <MapPin className="inline w-4 h-4 mr-2" />
            Installation Address
          </label>
          <input
            type="text"
            id="installationAddress"
            value={contact.installationAddress}
            onChange={(e) => handleInputChange('installationAddress', e.target.value)}
            placeholder="Enter the installation address (optional)"
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-mocha-950 
              placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-leather-600 
              focus:border-leather-600 transition-colors duration-200"
          />
          <p className="text-xs text-stone-400 mt-1">
            This helps us provide more accurate installation quotes
          </p>
        </div>

        {/* Additional Notes */}
        <div className="md:col-span-2">
          <label 
            htmlFor="additionalNotes" 
            className="block text-sm font-medium text-mocha-950 mb-2"
          >
            <MessageSquare className="inline w-4 h-4 mr-2" />
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            value={contact.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            rows={4}
            placeholder="Any specific requirements, preferences, or questions? (optional)"
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-mocha-950 
              placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-leather-600 
              focus:border-leather-600 transition-colors duration-200 resize-vertical"
          />
          <p className="text-xs text-stone-400 mt-1">
            Tell us about your project vision, timeline, or any special considerations
          </p>
        </div>
      </div>

      <div className="bg-clay-50 border border-clay-200 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
          </div>
          <div className="text-sm text-mocha-950">
            <p className="font-medium mb-1">Your Privacy Matters</p>
            <p className="text-stone-600">
              We'll only use your information to prepare your quote and follow up on your inquiry. 
              We never share your details with third parties.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

