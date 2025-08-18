import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Check, FileText, Send, 
  User, Layers, Zap, Grid, Settings, Clock, Shield,
  Mail, Phone, MapPin, Sparkles, CheckCircle, AlertCircle
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
  entryPoint?: 'home' | 'smart-walls' | 'smart-devices' | 'wall-panels' | 'carbon-rock-boards';
}

export default function QuoteModal({ isOpen, onClose, productCategory, entryPoint }: QuoteModalProps) {
  const location = useLocation();
  const { state, nextStep, prevStep, dispatch, validateCurrentStep } = useQuote();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  // Initialize product category when modal opens
  useEffect(() => {
    if (isOpen && productCategory) {
      dispatch({ type: 'SET_PRODUCT_CATEGORY', payload: productCategory });
    }
  }, [isOpen, productCategory, dispatch]);

  // Entry point resolution
  const resolvedEntryPoint: NonNullable<QuoteModalProps['entryPoint']> = (() => {
    if (entryPoint) return entryPoint;
    const p = location.pathname;
    if (p.startsWith('/smart-walls')) return 'smart-walls';
    if (p.startsWith('/smart-devices')) return 'smart-devices';
    if (p.startsWith('/wall-panels')) return 'wall-panels';
    if (p.startsWith('/carbon-rock-boards')) return 'carbon-rock-boards';
    return 'home';
  })();

  // Steps builder
  const steps = (() => {
    const contact = { id: 'contact', title: 'Your Contact Details', description: 'We’ll use these to prepare and send your quote', icon: User, component: Step1Contact, color: 'sky', required: true } as const;
    const review = { id: 'review', title: 'Review & Submit', description: 'Check everything before sending', icon: FileText, component: StepReviewSubmit, color: 'emerald', required: false } as const;
    const crb = { id: 'carbon-rock-boards', title: 'Carbon Rock Boards', description: 'Premium acoustic and decorative panels', icon: Layers, component: StepCarbonRockBoards, color: 'gray', required: false } as const;
    const sd = { id: 'smart-devices', title: 'Smart Devices', description: 'Automation and control systems', icon: Zap, component: StepSmartDevices, color: 'gray', required: false } as const;
    const sw = { id: 'smart-walls', title: 'Smart Walls', description: 'Integrated technology wall solutions', icon: Grid, component: StepSmartWalls, color: 'gray', required: false } as const;
    const wp = { id: 'wall-panels', title: 'Wall Panels', description: 'Luxury wallpapers and acoustic panels', icon: Settings, component: StepWallPanels, color: 'gray', required: false } as const;

    switch (resolvedEntryPoint) {
      case 'smart-walls': return [contact, sw, sd, wp, crb, review];
      case 'smart-devices': return [contact, sd, sw, wp, crb, review];
      case 'wall-panels': return [contact, wp, sw, sd, crb, review];
      case 'carbon-rock-boards': return [contact, crb, sw, sd, wp, review];
      case 'home':
      default: return [contact, sw, sd, wp, crb]; // no review step
    }
  })();

  const currentStepData = steps[state.currentStep - 1];
  const StepComponent = currentStepData.component;

  const getOverallProgress = () => Math.round(((state.currentStep - 1) / steps.length) * 100);

  const canSubmit = () => {
    const c = state.formData.contact;
    const hasName = !!c?.fullName && c.fullName.trim().length > 1;
    const hasEmail = !!c?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email);
    const hasPhone = !!c?.phone && /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(c.phone);
    return hasName && hasEmail && hasPhone;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (state.currentStep < steps.length) nextStep();
  };

  const handlePrevious = () => { if (state.currentStep > 1) prevStep(); };

  // Submit to API
  const submitQuote = async () => {
    const { formData } = state;
    const payload = {
      fullName: formData.contact?.fullName || "",
      email: formData.contact?.email || "",
      phone: formData.contact?.phone || "",
      installationAddress: formData.contact?.installationAddress || "",
      additionalNotes: formData.contact?.additionalNotes || "",
      productCategory: state.formData.productCategory || "general",
      entryPoint: resolvedEntryPoint,
      smartWalls: formData.smartWalls || null,
      smartDevices: formData.smartDevices || null,
      wallPanels: formData.wallPanels || null,
      carbonRockBoards: formData.carbonRockBoards || null,
      clientMeta: {
        urlPath: location.pathname,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        submittedAt: new Date().toISOString(),
      },
    };

    const res = await fetch("/api/sendQuote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      let errMsg = `Submission failed (${res.status})`;
      try {
        const json = JSON.parse(text);
        if (json?.message) errMsg = json.message;
        if (json?.fields) errMsg += ` — ${json.fields.join(", ")}`;
      } catch { if (text) errMsg += ` — ${text}`; }
      throw new Error(errMsg);
    }
    return await res.json();
  };

  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitQuote();
      setSubmitSuccess(true);
      const ref = result?.referenceId || result?.quoteId || "";
      setSubmitMessage(
        `Thanks! Your quote request has been sent.${ref ? ` Reference: ${ref}` : ""}`
      );
      setTimeout(() => { try { window.location.reload(); } catch {} }, 6000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit quote");
    } finally { setIsSubmitting(false); }
  };

  const isLastStep = state.currentStep === steps.length;
  const showReviewStep = steps.some(s => s.id === 'review');
  const showSubmitOnThisStep = showReviewStep ? isLastStep : isLastStep;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div className="relative w-full max-w-6xl max-h-[95vh] mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <header className="bg-gradient-to-r from-mocha-950 to-leather-900 text-white p-6 flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">Request a Quote</h1>
              <p className="text-white/80">Fast, obligation-free quotation</p>
              <div className="w-full h-2 bg-white/10 rounded mt-4">
                <motion.div className="h-2 bg-gradient-to-r from-emerald-400 to-sky-400" animate={{ width: `${getOverallProgress()}%` }} />
              </div>
            </div>
            <button onClick={onClose}><X /></button>
          </header>

          {/* Step */}
          <div className="p-8">
            <StepComponent />

            {/* Controls */}
            <div className="mt-10 flex justify-between">
              <button onClick={handlePrevious} disabled={state.currentStep === 1 || isSubmitting} className="px-6 py-3 bg-stone-100 rounded-xl">Back</button>
              {!showSubmitOnThisStep ? (
                <button onClick={handleNext} disabled={isSubmitting} className="px-6 py-3 bg-leather-600 text-white rounded-xl">Next</button>
              ) : (
                <button onClick={handleSubmit} disabled={!canSubmit() || isSubmitting} className="px-6 py-3 bg-green-600 text-white rounded-xl">
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                </button>
              )}
            </div>

            {/* Alerts */}
            {submitError && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex">
                <AlertCircle className="mr-2" /> {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex">
                <CheckCircle className="mr-2" /> {submitMessage} — We’ll reply within 24h.
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="bg-stone-50 p-4 text-sm flex flex-wrap justify-between">
            <span><Mail className="inline w-4 h-4" /> info@thewallshop.co.uk</span>
            <span><Phone className="inline w-4 h-4" /> +44 141 739 3377</span>
            <span><MapPin className="inline w-4 h-4" /> SMK Business Centre, Glasgow</span>
            <span><Clock className="inline w-4 h-4" /> Mon–Fri, 9am–6pm PST</span>
            <span><Sparkles className="inline w-4 h-4" /> No Obligation</span>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
