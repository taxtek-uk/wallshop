import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { QuoteProvider, useQuote } from '@/contexts/QuoteContext';
import { ProductCategory, QuoteModalProps } from '@/types/quote';
import Step1Contact from '@/components/QuoteSteps/Step1Contact';
import StepSmartWalls from '@/components/QuoteSteps/StepSmartWalls';
import StepSmartDevices from '@/components/QuoteSteps/StepSmartDevices';
import StepWallPanels from '@/components/QuoteSteps/StepWallPanels';
import StepCarbonRockBoards from '@/components/QuoteSteps/StepCarbonRockBoards';

// Product category selection component
function ProductCategoryStep() {
  const { state, dispatch } = useQuote();
  
  const categories = [
    {
      id: 'smart-walls' as ProductCategory,
      title: 'Smart Walls',
      description: 'Complete smart wall systems with integrated technology',
      features: ['TV Integration', 'Audio Systems', 'Smart Lighting', 'Cable Management'],
    },
    {
      id: 'smart-devices' as ProductCategory,
      title: 'Smart Devices',
      description: 'Control panels, sensors, and home automation',
      features: ['Control Panels', 'Security Sensors', 'Home Automation', 'Smart Integration'],
    },
    {
      id: 'wall-panels' as ProductCategory,
      title: 'Wall Panels',
      description: 'Decorative and functional wall panel solutions',
      features: ['Fluted Panels', 'HD Printing', 'Custom Textures', 'Various Finishes'],
    },
    {
      id: 'carbon-rock-boards' as ProductCategory,
      title: 'Carbon Rock Boards',
      description: 'High-performance carbon rock board systems',
      features: ['Acoustic Boards', 'Mirror Boards', 'Standard Boards', 'Custom Sizes'],
    },
  ];

  const handleCategorySelect = (category: ProductCategory) => {
    dispatch({ type: 'SET_PRODUCT_CATEGORY', payload: category });
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
          What can we help you with?
        </h2>
        <p className="text-stone-400 text-sm">
          Select the product category that best matches your project needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`p-6 rounded-lg border text-left transition-all duration-200 hover:shadow-lg ${
              state.formData.productCategory === category.id
                ? 'bg-leather-50 border-leather-300 ring-2 ring-leather-200'
                : 'bg-white border-stone-200 hover:bg-stone-50'
            }`}
          >
            <h3 className="text-lg font-semibold text-mocha-950 mb-2">{category.title}</h3>
            <p className="text-sm text-stone-600 mb-4">{category.description}</p>
            <div className="space-y-1">
              {category.features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-stone-500">
                  <Check className="w-3 h-3 text-leather-600 mr-2" />
                  {feature}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Success step component
function SuccessStep() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-mocha-950 mb-4">
        Quote Request Submitted!
      </h2>
      <p className="text-stone-600 mb-6 max-w-md mx-auto">
        Thank you for your interest in The Wall Shop. We've received your quote request 
        and will get back to you within 24 hours with a detailed proposal.
      </p>
      <div className="bg-clay-50 border border-clay-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-sm text-mocha-950">
          <strong>What happens next?</strong><br />
          Our team will review your requirements and prepare a customized quote. 
          You'll receive an email with detailed pricing and next steps.
        </p>
      </div>
    </motion.div>
  );
}

// Main modal content component
function QuoteModalContent({ isOpen, onClose, productCategory }: QuoteModalProps) {
  const { state, nextStep, prevStep, validateCurrentStep, dispatch } = useQuote();
  const modalRef = useRef<HTMLDivElement>(null);

  // Set initial product category if provided
  useEffect(() => {
    if (productCategory && productCategory !== state.formData.productCategory) {
      dispatch({ type: 'SET_PRODUCT_CATEGORY', payload: productCategory });
    }
  }, [productCategory, state.formData.productCategory, dispatch]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal for accessibility
      setTimeout(() => modalRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || 'Failed to submit quote request');
      }

      dispatch({ type: 'SET_SUBMITTED', payload: true });
      
      // Auto-close after showing success
      setTimeout(() => {
        dispatch({ type: 'RESET_FORM' });
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Quote submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit quote request. Please try again.');
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  const renderCurrentStep = () => {
    if (state.isSubmitted) {
      return <SuccessStep />;
    }

    switch (state.currentStep) {
      case 1:
        return <Step1Contact />;
      case 2:
        return <ProductCategoryStep />;
      case 3:
        switch (state.formData.productCategory) {
          case 'smart-walls':
            return <StepSmartWalls />;
          case 'smart-devices':
            return <StepSmartDevices />;
          case 'wall-panels':
            return <StepWallPanels />;
          case 'carbon-rock-boards':
            return <StepCarbonRockBoards />;
          default:
            return <ProductCategoryStep />;
        }
      default:
        return <Step1Contact />;
    }
  };

  const getStepTitle = () => {
    if (state.isSubmitted) return 'Success';
    
    switch (state.currentStep) {
      case 1: return 'Contact Information';
      case 2: return 'Product Category';
      case 3: return `${state.formData.productCategory?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Configuration`;
      default: return 'Quote Request';
    }
  };

  const canGoNext = state.currentStep < 3;
  const canGoBack = state.currentStep > 1 && !state.isSubmitted;
  const isLastStep = state.currentStep === 3;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="quote-modal-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-leather-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 id="quote-modal-title" className="text-xl font-bold text-mocha-950">
                  {getStepTitle()}
                </h1>
                {!state.isSubmitted && (
                  <p className="text-sm text-stone-500">
                    Step {state.currentStep} of 3
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          {!state.isSubmitted && (
            <div className="px-6 py-4 bg-stone-50">
              <div className="w-full bg-stone-200 rounded-full h-2">
                <motion.div
                  className="bg-leather-600 h-2 rounded-full"
                  initial={{ width: '33%' }}
                  animate={{ width: `${(state.currentStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {renderCurrentStep()}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {!state.isSubmitted && (
            <div className="flex items-center justify-between p-6 border-t border-stone-200 bg-stone-50">
              <button
                onClick={prevStep}
                disabled={!canGoBack}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  canGoBack
                    ? 'text-stone-600 hover:text-stone-800 hover:bg-stone-200'
                    : 'text-stone-300 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center space-x-3">
                {Object.keys(state.errors).length > 0 && (
                  <p className="text-sm text-red-600">
                    Please fix the errors above
                  </p>
                )}
                
                {isLastStep ? (
                  <button
                    onClick={handleSubmit}
                    disabled={state.isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2 bg-leather-600 text-white rounded-lg 
                      hover:bg-leather-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {state.isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                      canGoNext
                        ? 'bg-leather-600 text-white hover:bg-leather-700'
                        : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Main exported component with provider
export default function QuoteModal(props: QuoteModalProps) {
  return (
    <QuoteProvider>
      <AnimatePresence>
        {props.isOpen && <QuoteModalContent {...props} />}
      </AnimatePresence>
    </QuoteProvider>
  );
}

