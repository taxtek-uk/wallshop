import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Check, FileText, Send, 
  User, Layers, Zap, Grid, Settings, Clock, Shield,
  Mail, Phone, MapPin, Building, CheckCircle, AlertCircle,
  Download, Eye, Sparkles
} from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { ProductCategory } from '@/types/quote';
import Step1Contact from '@/components/QuoteSteps/Step1Contact';
import StepSmartWalls from '@/components/QuoteSteps/StepSmartWalls';
import StepSmartDevices from '@/components/QuoteSteps/StepSmartDevices';
import StepWallPanels from '@/components/QuoteSteps/StepWallPanels';
import StepCarbonRockBoards from '@/components/QuoteSteps/StepCarbonRockBoards';
import StepReviewSubmit from '@/components/QuoteSteps/StepReviewSubmit';
interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productCategory?: ProductCategory;
  selectedProduct?: any;
  // new: entry point to adapt flow
  entryPoint?: 'home' | 'smart-walls' | 'smart-devices' | 'wall-panels' | 'carbon-rock-boards';
}

export default function QuoteModal({ isOpen, onClose, productCategory, selectedProduct, entryPoint }: QuoteModalProps) {
  const location = useLocation();
  const { state, nextStep, prevStep, dispatch, validateCurrentStep } = useQuote();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialize product category when modal opens
  useEffect(() => {
    if (isOpen && productCategory) {
      dispatch({ type: 'SET_PRODUCT_CATEGORY', payload: productCategory });
    }
  }, [isOpen, productCategory, dispatch]);

  // Determine entry point automatically from URL if not provided
  const resolvedEntryPoint: NonNullable<QuoteModalProps['entryPoint']> = (() => {
    if (entryPoint) return entryPoint;
    const p = location.pathname;
    if (p.startsWith('/smart-walls')) return 'smart-walls';
    if (p.startsWith('/smart-devices')) return 'smart-devices';
    if (p.startsWith('/wall-panels')) return 'wall-panels';
    if (p.startsWith('/carbon-rock-boards')) return 'carbon-rock-boards';
    return 'home';
  })();

  // Build steps dynamically by entry point
  const steps = ((): { id: string; title: string; description: string; icon: any; component: any; color: string; required: boolean }[] => {
    const contact = {
      id: 'contact',
      title: 'Contact Information',
      description: 'Your details and project requirements',
      icon: User,
      component: Step1Contact,
      color: 'gray',
      required: true,
    } as const;

    const crb = {
      id: 'carbon-rock-boards',
      title: 'Carbon Rock Boards',
      description: 'Premium acoustic and decorative panels',
      icon: Layers,
      component: StepCarbonRockBoards,
      color: 'gray',
      required: false,
    } as const;

    const sd = {
      id: 'smart-devices',
      title: 'Smart Devices',
      description: 'Intelligent automation and control systems',
      icon: Zap,
      component: StepSmartDevices,
      color: 'gray',
      required: false,
    } as const;

    const sw = {
      id: 'smart-walls',
      title: 'Smart Walls',
      description: 'Integrated technology wall solutions',
      icon: Grid,
      component: StepSmartWalls,
      color: 'gray',
      required: false,
    } as const;

    const wp = {
      id: 'wall-panels',
      title: 'Wall Panels',
      description: 'Custom decorative and functional panels',
      icon: Settings,
      component: StepWallPanels,
      color: 'gray',
      required: false,
    } as const;

    const review = {
      id: 'review',
      title: 'Review & Submit',
      description: 'Confirm your details before submission',
      icon: Check,
      component: StepReviewSubmit,
      color: 'gray',
      required: false,
    } as const;

    switch (resolvedEntryPoint) {
      case 'smart-walls':
        return [contact, sw, review] as any;
      case 'smart-devices':
        return [contact, sd, review] as any;
      case 'wall-panels':
        return [contact, wp, review] as any;
      case 'carbon-rock-boards':
        return [contact, crb, review] as any;
      case 'home':
      default:
        // Show all 5 steps in order from Home
        return [contact, crb, sd, sw, wp] as any;
    }
  })();

  const currentStepData = steps[state.currentStep - 1] || steps[0];
  const StepComponent = currentStepData.component;

  const handleNext = () => {
    // Enforce contact step validation before proceeding past step 1
    if (state.currentStep === 1) {
      const valid = validateCurrentStep();
      if (!valid) return;
    }
    if (state.currentStep < steps.length) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    if (state.currentStep > 1) {
      prevStep();
    }
  };

  const submitQuote = async () => {
    // TODO: Implement actual quote submission logic
    // This would typically send the form data to an API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Quote submitted:', state.formData);
        resolve(true);
      }, 1000);
    });
  };

  const resetQuote = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await submitQuote();
      setSubmitSuccess(true);
      // Show success for at least 10 seconds, then refresh page
      setTimeout(() => {
        try {
          window.location.reload();
        } catch {}
      }, 10000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const getStepValidation = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step.required) return { isValid: true, message: 'Optional step' };
    
    switch (step.id) {
      case 'contact':
        const contact = state.formData.contact;
        const hasName = !!contact?.fullName && contact.fullName.trim().length > 1;
        const hasEmail = !!contact?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
        const hasPhone = !!contact?.phone && /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(contact.phone);
        
        if (!hasName || !hasEmail || !hasPhone) {
          return { isValid: false, message: 'Required fields missing' };
        }
        return { isValid: true, message: 'Complete' };
      
      default:
        return { isValid: true, message: 'Optional' };
    }
  };

  // Progress logic:
  // - For any flow, do linear step-based progress once Contact is valid
  // - Denominator is (totalSteps - 1) so the last step reads 100%
  // - While Contact is invalid, progress is 0
  const getOverallProgress = () => {
    const totalSteps = steps.length;
    if (totalSteps <= 1) return 0;

    const contactValid = getStepValidation(0).isValid;
    if (!contactValid) return 0;

    // Completed steps: past steps plus the contact step if valid
    let completed = state.currentStep - 1; // steps behind the current one
    if (state.currentStep === 1 && contactValid) completed = 1; // count contact when still on step 1

    // Clamp and compute percentage so that being on last step shows 100%
    completed = Math.max(1, Math.min(completed, totalSteps - 1));
    return (completed / (totalSteps - 1)) * 100;
  };

  const canSubmit = () => {
    return steps.every((step, index) => {
      if (!step.required) return true;
      return getStepValidation(index).isValid;
    });
  };

  const getSelectedProductsCount = () => {
    let count = 0;
    if (state.formData.carbonRockBoards && Object.keys(state.formData.carbonRockBoards).length > 0) count++;
    if (state.formData.smartDevices && Object.keys(state.formData.smartDevices).length > 0) count++;
    if (state.formData.smartWalls && Object.keys(state.formData.smartWalls).length > 0) count++;
    if (state.formData.wallPanels && Object.keys(state.formData.wallPanels).length > 0) count++;
    return count;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape' && !isSubmitting) {
        handleClose();
      } else if (e.key === 'ArrowLeft' && state.currentStep > 1) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && state.currentStep < steps.length) {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, state.currentStep, isSubmitting]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-6xl max-h-[95vh] mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-labelledby="quote-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <header className="relative bg-gradient-to-r from-mocha-950 to-leather-900 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 id="quote-modal-title" className="text-2xl font-bold">
                  Request Custom Quote
                </h1>
                <p className="text-white/80 text-sm">
                  Configure your premium interior solutions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Progress Indicator */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-white/60" />
                <span className="text-white/80">
                  {Math.round(getOverallProgress())}% Complete
                </span>
              </div>
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center 
                  transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close quote modal"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/60 mb-2">
              <span>Overall Progress</span>
              <span>{getSelectedProductsCount()} product{getSelectedProductsCount() !== 1 ? 's' : ''} selected</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${getOverallProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </header>

        {/* Step Navigation */}
        <nav className="bg-stone-50 border-b border-stone-200 p-4" role="tablist">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === state.currentStep - 1;
              const isCompleted = index < state.currentStep - 1;
              const validation = getStepValidation(index);
              
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    const targetStep = index + 1;
                    // Prevent jumping past contact without valid data
                    if (targetStep > 1 && state.currentStep === 1) {
                      const ok = validateCurrentStep();
                      if (!ok) return;
                    }
                    dispatch({ type: 'SET_STEP', payload: targetStep });
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium 
                    transition-all duration-200 whitespace-nowrap min-w-fit ${
                    isActive
                      ? 'bg-green-800 text-white shadow-lg ring-2 ring-black/30'
                      : isCompleted
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`step-${step.id}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-white/20'
                      : isCompleted
                      ? 'bg-green-600'
                      : 'bg-stone-200'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <IconComponent className={`w-3 h-3 ${
                        isActive ? 'text-white' : 'text-stone-600'
                      }`} />
                    )}
                  </div>
                  
                  <div className="text-left hidden sm:block">
                    <div className="font-semibold">{step.title}</div>
                    <div className={`text-xs ${
                      isActive ? 'text-white/80' : 'text-stone-500'
                    }`}>
                      {validation.message}
                    </div>
                  </div>
                  
                  {step.required && !validation.isValid && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-y-auto max-h-[60vh]">
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                id={`step-${currentStepData.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${currentStepData.id}`}
              >
                {/* Step Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${currentStepData.color}-500 to-${currentStepData.color}-600 
                    rounded-2xl flex items-center justify-center shadow-lg`}>
                    <currentStepData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-mocha-950">
                      {currentStepData.title}
                    </h2>
                    <p className="text-stone-600">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>

                {/* Step Content */}
                <StepComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-stone-50 border-t border-stone-200 p-6">
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <div className="flex items-center space-x-3 w-full justify-between sm:justify-start">
              <button
                onClick={handlePrevious}
                disabled={state.currentStep === 1 || isSubmitting}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-stone-300 
                  text-stone-700 rounded-xl hover:bg-stone-50 hover:border-stone-400 w-full sm:w-auto
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {state.currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-leather-600 
                    text-white rounded-xl hover:bg-leather-700 shadow-md hover:shadow-lg w-full sm:w-auto
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next step"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit() || isSubmitting}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 
                    text-white rounded-xl hover:from-green-700 hover:to-blue-700 shadow-md hover:shadow-lg w-full sm:w-auto
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Submit quote request"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Quote Request</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Step Indicator */}
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <span>Step {state.currentStep} of {steps.length}</span>
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === state.currentStep - 1
                        ? 'bg-leather-600'
                        : index < state.currentStep - 1
                        ? 'bg-green-500'
                        : 'bg-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Validation Messages */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Submission Error</span>
              </div>
              <p className="text-sm text-red-700 mt-1">{submitError}</p>
            </motion.div>
          )}

          {/* Success Message */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Quote Submitted Successfully!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  We'll review your requirements and send you a detailed quote within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Text */}
          <div className="mt-4 text-xs text-stone-500 text-center">
            <div className="flex items-center justify-center space-x-4">
              <span className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Secure & Confidential</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>24hr Response Time</span>
              </span>
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>No Obligation</span>
              </span>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
