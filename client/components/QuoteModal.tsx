import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Check, FileText, Send,
  User, Layers, Zap, Grid, Settings, Clock, Shield,
  AlertCircle, Sparkles
} from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { ProductCategory, QuoteStep } from '@/types/quote';
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
  entryPoint?: 'home' | 'smart-walls' | 'smart-devices' | 'wall-panels' | 'carbon-rock-boards';
}

type StepDef = {
  id: string;
  title: string;
  description: string;
  icon: any;
  component: any;
  required: boolean;
  colorKey: 'emerald' | 'sky' | 'slate' | 'amber' | 'indigo';
};

export default function QuoteModal({
  isOpen,
  onClose,
  productCategory,
  selectedProduct,
  entryPoint,
}: QuoteModalProps) {
  const location = useLocation();
  const { state, nextStep, prevStep, dispatch, validateCurrentStep } = useQuote();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  // === SmartWalls local state with strict typing ===
  const [smartWallsSection, setSmartWallsSection] = useState<QuoteStep>('dimensions');

  // Strict typed setter for SmartWalls sections
  const setSection = (section: QuoteStep) => {
    setSmartWallsSection(section);
  };

  // --- Tailwind-safe color map (avoid dynamic class names) ---
  const colorBgMap: Record<StepDef['colorKey'], string> = {
    emerald: 'from-emerald-500 to-emerald-600',
    sky: 'from-sky-500 to-sky-600',
    slate: 'from-slate-500 to-slate-600',
    amber: 'from-amber-500 to-amber-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

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
  const steps: StepDef[] = (() => {
    const contact: StepDef = {
      id: 'contact',
      title: 'Contact Information',
      description: 'Your details and project requirements',
      icon: User,
      component: Step1Contact,
      required: true,
      colorKey: 'sky',
    };

    const crb: StepDef = {
      id: 'carbon-rock-boards',
      title: 'Carbon Rock Boards',
      description: 'Premium acoustic and decorative panels',
      icon: Layers,
      component: StepCarbonRockBoards,
      required: false,
      colorKey: 'slate',
    };

    const sd: StepDef = {
      id: 'smart-devices',
      title: 'Smart Devices',
      description: 'Intelligent automation and control systems',
      icon: Zap,
      component: StepSmartDevices,
      required: false,
      colorKey: 'amber',
    };

    const sw: StepDef = {
      id: 'smart-walls',
      title: 'Smart Walls',
      description: 'Integrated technology wall solutions',
      icon: Grid,
      component: StepSmartWalls,
      required: false,
      colorKey: 'indigo',
    };

    const wp: StepDef = {
      id: 'wall-panels',
      title: 'Wall Panels',
      description: 'Custom decorative and functional panels',
      icon: Settings,
      component: StepWallPanels,
      required: false,
      colorKey: 'slate',
    };

    const review: StepDef = {
      id: 'review',
      title: 'Review & Submit',
      description: 'Confirm your details before submission',
      icon: FileText,
      component: StepReviewSubmit,
      required: false,
      colorKey: 'emerald',
    };

    switch (resolvedEntryPoint) {
      case 'smart-walls':
        return [contact, sw, review];
      case 'smart-devices':
        return [contact, sd, review];
      case 'wall-panels':
        return [contact, wp, review];
      case 'carbon-rock-boards':
        return [contact, crb, review];
      case 'home':
      default:
        return [contact, crb, sd, sw, wp, review];
    }
  })();

  // Current step
  const currentStepData = steps[state.currentStep - 1] || steps[0];
  const StepComponent = currentStepData.component;
  const isSmartWalls = currentStepData?.id === 'smart-walls';

  // Validation helper for steps
  const getStepValidation = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step.required) return { isValid: true, message: 'Optional' };

    switch (step.id) {
      case 'contact': {
        const c = state.formData.contact;
        const hasName = !!c?.fullName && c.fullName.trim().length > 1;
        const hasEmail = !!c?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email);
        const hasPhone =
          !!c?.phone && /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(c.phone);
        if (!hasName || !hasEmail || !hasPhone) {
          return { isValid: false, message: 'Required fields missing' };
        }
        return { isValid: true, message: 'Complete' };
      }
      case 'smart-walls': {
        const sw = state.formData.smartWalls;
        const hasDimensions = sw?.legacyDimensions?.width && sw.legacyDimensions.width > 0 && 
                             sw?.legacyDimensions?.height && sw.legacyDimensions.height > 0;
        const hasStyle = !!sw?.legacySelectedStyle?.finish;
        if (!hasDimensions || !hasStyle) {
          return { isValid: false, message: 'Dimensions and style are required' };
        }
        return { isValid: true, message: 'Complete' };
      }
      default:
        return { isValid: true, message: 'Complete' };
    }
  };

  // Progress calculation
  const getOverallProgress = () => {
    const completedSteps = steps.filter((_, index) => getStepValidation(index).isValid).length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  const getSelectedProductsCount = () => {
    let count = 0;
    if (state.formData.smartWalls && getStepValidation(steps.findIndex(s => s.id === 'smart-walls')).isValid) count++;
    if (state.formData.smartDevices) count++;
    if (state.formData.wallPanels) count++;
    if (state.formData.carbonRockBoards) count++;
    return count;
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  // Submit handler
  const submitQuote = async () => {
    const endpoint = '/api/quote';
    const payload = {
      contact: state.formData.contact,
      productCategory: state.formData.productCategory,
      smartWalls: state.formData.smartWalls,
      smartDevices: state.formData.smartDevices,
      wallPanels: state.formData.wallPanels,
      carbonRockBoards: state.formData.carbonRockBoards,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      try {
        const text = await res.text();
        const json = JSON.parse(text);
        if (json?.message) errMsg = json.message;
        if (json?.fields) errMsg += ` — ${json.fields.join(', ')}`;
      } catch {
        if (res.statusText) errMsg += ` — ${res.statusText}`;
      }
      throw new Error(errMsg);
    }

    const raw = await res.text();
    let data: any = {};
    if (raw) {
      try { data = JSON.parse(raw); } catch { /* ignore JSON error */ }
    }
    return data;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitQuote();
      setSubmitSuccess(true);

      const ref = result?.referenceId || result?.quoteId || '';
      setSubmitMessage(
        `Thanks! Your quote request has been sent.${ref ? ` Reference: ${ref}` : ''}`
      );

      dispatch({ type: 'RESET_FORM' });
      dispatch({ type: 'SET_STEP', payload: 1 });
      
      setTimeout(() => {
        try { onClose(); } catch {}
      }, 1200);

    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only allow submit when required steps valid AND on the last step
  const canSubmit = () => {
    const allRequiredOk = steps.every((step, index) => {
      if (!step.required) return true;
      return getStepValidation(index).isValid;
    });
    const isLastStep = state.currentStep === steps.length;
    return allRequiredOk && isLastStep;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !isSubmitting && onClose()}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-6xl max-h-[95vh] mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-labelledby="quote-modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <header className="relative bg-gradient-to-r from-mocha-950 to-leather-900 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 id="quote-modal-title" className="text-2xl font-bold truncate">
                  Request Custom Quote
                </h1>
                <p className="text-white/80 text-sm truncate">
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
                onClick={() => !isSubmitting && onClose()}
                disabled={isSubmitting}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <span>
                {getSelectedProductsCount()} product{getSelectedProductsCount() !== 1 ? 's' : ''} selected
              </span>
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
        <nav className="bg-stone-50 border-b border-stone-200 p-4" role="tablist" aria-label="Quote steps">
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
                    if (targetStep > 1 && state.currentStep === 1) {
                      const ok = validateCurrentStep();
                      if (!ok) return;
                    }
                    if (
                      targetStep > 2 &&
                      state.currentStep === 2 &&
                      state.formData.productCategory === "smart-walls"
                    ) {
                      const ok = getStepValidation(1).isValid;
                      if (!ok) return;
                    }
                    dispatch({ type: "SET_STEP", payload: targetStep });
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap min-w-fit ${
                    isActive
                      ? "bg-leather-900 shadow-lg ring-2 ring-black/30 !text-white"
                      : isCompleted
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`step-${step.id}`}
                  id={`tab-${step.id}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isActive
                        ? "bg-white/20"
                        : isCompleted
                        ? "bg-green-600"
                        : "bg-stone-200"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <IconComponent
                        className={`w-3 h-3 ${isActive ? "text-white" : "text-stone-600"}`}
                      />
                    )}
                  </div>

                  <div className="text-left hidden sm:block">
                    <div
                      className={`font-semibold ${
                        isActive ? "!text-white" : "text-mocha-950"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`text-xs ${
                        isActive
                          ? "!text-white/80"
                          : isCompleted
                          ? "text-green-700"
                          : "text-stone-500"
                      }`}
                    >
                      {isActive
                        ? "Current Step"
                        : isCompleted
                        ? "Completed"
                        : validation.message}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-50">
          <AnimatePresence mode="wait">
            {isSmartWalls ? (
              <StepSmartWalls
                activeSection={smartWallsSection}
                setActiveSection={setSection}
              />
            ) : (
              <StepComponent key={state.currentStep} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="bg-stone-50 border-t border-stone-200 p-6">
          <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
            {/* Navigation */}
            <div className="flex items-center gap-3 w-full justify-between sm:justify-start">
              <button
                onClick={handlePrevious}
                disabled={state.currentStep === 1 || isSubmitting}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 hover:border-stone-400 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {state.currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-leather-600 text-white rounded-xl hover:bg-leather-700 shadow-md hover:shadow-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next step"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit() || isSubmitting}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 shadow-md hover:shadow-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
              <span>
                Step {state.currentStep} of {steps.length}
              </span>
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
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Error */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
              role="alert"
            >
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Submission Error</span>
              </div>
              <p className="text-sm text-red-700 mt-1">{submitError}</p>
            </motion.div>
          )}

          {/* Success */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl"
                role="status"
              >
                <div className="flex items-center space-x-2 text-green-800">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Quote Submitted Successfully!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  {submitMessage || "We'll review your requirements and send you a detailed quote within 24 hours."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </footer>
      </motion.div>
    </div>
  );
}

