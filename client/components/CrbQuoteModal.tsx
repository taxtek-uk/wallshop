import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Loader2, Layers, Square, Gem, TreePine} from "lucide-react";




const textureCategories = [
  {
    id: 'fabric',
    name: "Cloth Pattern Series",
    desc: "Soft textile pattern with acoustic value.",
    icon: Layers,
    img: "/images/carbon-rock-boards/cloth.jpg",
    color: "from-leather-100 to-mocha-100",
    accent: "leather-600",
    panels: [
      { id: "T6301", name: "Chambray Grid", img: "/images/carbon-rock-boards/fabric/3.jpg", desc: "Chambray Grid texture for contemporary interior walls", stock: 10 },
      { id: "S6029", name: "Rice Grain Weave", img: "/images/carbon-rock-boards/fabric/9.jpg", desc: "Rice Grain Weave texture for contemporary interior walls", stock: 10 },
      { id: "T6102", name: "Silver Mesh", img: "/images/carbon-rock-boards/fabric/5.jpg", desc: "Silver Mesh texture for contemporary interior walls", stock: 10 },
      { id: "T6306", name: "Alabaster Cotton", img: "/images/carbon-rock-boards/fabric/11.jpg", desc: "Alabaster Cotton texture for contemporary interior walls", stock: 10 },
      { id: "S6020", name: "Soft Gauze", img: "/images/carbon-rock-boards/fabric/6.jpg", desc: "Soft Gauze texture for contemporary interior walls", stock: 10 }
    ]
  },
  {
    id: 'wood',
    name: "Wood Grain Series",
    desc: "Warm wood aesthetics with durable surface.",
    icon: TreePine,
    img: "/images/carbon-rock-boards/wood.jpg",
    color: "from-amber-100 to-orange-100",
    accent: "amber-600",
    panels: [
      { id: "T9016", name: "Ash Grey", img: "/images/carbon-rock-boards/wood/16.jpg", desc: "Soft ash grain with light grey overtone", stock: 10 },
      { id: "T9051", name: "Walnut Mist", img: "/images/carbon-rock-boards/wood/2.jpg", desc: "Mid-brown walnut tone with subtle striations", stock: 10 },
      { id: "T9222", name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast", stock: 10 },
      { id: "T9012", name: "leatherwood Brown", img: "/images/carbon-rock-boards/wood/11.jpg", desc: "Warm reddish grain like tropical leatherwood", stock: 10 },
      { id: "T9015", name: "Weathered Storm", img: "/images/carbon-rock-boards/wood/5.jpg", desc: "Weathered wood texture with a stormy tone", stock: 10 },
      { id: "T9053", name: "Walnut Stream", img: "/images/carbon-rock-boards/wood/14.jpg", desc: "Strong walnut character with deep flowing grain", stock: 10 }
    ]
  },
  {
    id: 'solid',
    name: "Solid Color Series",
    desc: "Industrial elegance with raw, minimalist tones.",
    icon: Square,
    img: "/images/carbon-rock-boards/wpc.jpg",
    color: "from-slate-100 to-gray-100",
    accent: "slate-600",
    panels: [
      { id: "T8201", name: "Warm Blush", img: "/images/carbon-rock-boards/solid/1.jpg", desc: "A soft blush hue for cozy minimalism", stock: 10 },
      { id: "T8026", name: "Ash Silver", img: "/images/carbon-rock-boards/solid/2.jpg", desc: "Neutral silver-gray with a clean industrial look", stock: 10 },
      { id: "T8107", name: "Slate Blue", img: "/images/carbon-rock-boards/solid/10.jpg", desc: "Dark blue-grey with a sophisticated edge", stock: 10 },
      { id: "T8039", name: "Ivory", img: "/images/carbon-rock-boards/solid/11.jpg", desc: "Soft ivory tone perfect for elegant settings", stock: 10 },
      { id: "T8103", name: "Pearl Cream", img: "/images/carbon-rock-boards/solid/17.jpg", desc: "Soft pearl-beige tone for warm ambience", stock: 10 },
      { id: "T8036", name: "Desert Sand", img: "/images/carbon-rock-boards/solid/12.jpg", desc: "Warm tan reminiscent of natural sands", stock: 10 },
      { id: "T8008", name: "Obsidian", img: "/images/carbon-rock-boards/solid/15.jpg", desc: "Matte black with premium depth and richness", stock: 10 }
    ]
  },
  {
    id: 'stone',
    name: "Stone Grain Series",
    desc: "Classic stone surface with timeless elegance.",
    icon: Gem,
    img: "/images/carbon-rock-boards/stone.jpg",
    color: "from-stone-100 to-slate-100",
    accent: "stone-600",
    panels: [
      { id: "S3231", name: "White & Gold", img: "/images/carbon-rock-boards/stone/1.jpg", desc: "Stone texture White & Gold", stock: 0 },
      { id: "S3232", name: "Black & Blue", img: "/images/carbon-rock-boards/stone/2.jpg", desc: "Stone texture Black & Blue", stock: 0 },
      { id: "S240", name: "S240", img: "/images/carbon-rock-boards/stone/3.jpg", desc: "Stone texture S240", stock: 0 },
      { id: "T3205", name: "Mid Grey & Dark Grey", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture Mid Grey & Dark Grey", stock: 0 },
      { id: "T3017", name: "Mid Grey & White", img: "/images/carbon-rock-boards/stone/5.jpg", desc: "Stone texture Mid Grey & White", stock: 0 },
      { id: "T3204", name: "Dark Grey & Black", img: "/images/carbon-rock-boards/stone/6.jpg", desc: "Stone texture Dark Grey & Black", stock: 0 },
      { id: "T3207", name: "T3207", img: "/images/carbon-rock-boards/stone/7.jpg", desc: "Stone texture T3207", stock: 0 },
      { id: "T3024", name: "Dark Grey & White", img: "/images/carbon-rock-boards/stone/8.jpg", desc: "Stone texture Dark Grey & White", stock: 0 }
    ]
  },
  {
    id: 'metallic',
    name: "Metal Series",
    desc: "Luxury feel with metallic luster and reflectivity.",
    icon: Layers,
    img: "/images/carbon-rock-boards/metal.jpg",
    color: "from-amber-100 to-yellow-100",
    accent: "amber-600",
    panels: [
      { id: "M1001", name: "Brushed Bronze", img: "/images/carbon-rock-boards/metal/1.jpg", desc: "Elegant bronze with a brushed satin finish", stock: 10 },
      { id: "M1002", name: "Antique Copper", img: "/images/carbon-rock-boards/metal/2.jpg", desc: "Warm copper tone with vintage character", stock: 10 },
      { id: "M1003", name: "Champagne Gold", img: "/images/carbon-rock-boards/metal/3.jpg", desc: "Subtle golden shimmer with soft elegance", stock: 10 },
      { id: "M1004", name: "Urban Brass", img: "/images/carbon-rock-boards/metal/4.jpg", desc: "Contemporary brass with matte warmth", stock: 10 },
      { id: "M1005", name: "Mirror Silver", img: "/images/carbon-rock-boards/metal/5.jpg", desc: "Sleek silver chrome for high reflectivity", stock: 10 },
      { id: "M1006", name: "Satin Titanium", img: "/images/carbon-rock-boards/metal/6.jpg", desc: "Modern titanium finish with silky texture", stock: 10 }
    ]
  },
  {
    id: 'mirror',
    name: "Mirror Series",
    desc: "Reflective brilliance with a sleek, high-gloss finish.",
    icon: Square,
    img: "/images/carbon-rock-boards/mirror.jpg",
    color: "from-leather-100 to-leather-100",
    accent: "stone-600",
    panels: [
      { id: "MR2001", name: "Bronze Mirror", img: "/images/carbon-rock-boards/mirror/1.jpg", desc: "Warm bronze-tinted mirror with elegant shine", stock: 10 },
      { id: "MR2002", name: "Copper Reflection", img: "/images/carbon-rock-boards/mirror/2.jpg", desc: "Vintage copper tone with smooth mirrored surface", stock: 10 },
      { id: "MR2003", name: "Golden Glow", img: "/images/carbon-rock-boards/mirror/3.jpg", desc: "Champagne gold mirror finish with rich sheen", stock: 10 },
      { id: "MR2004", name: "Brass Luxe", img: "/images/carbon-rock-boards/mirror/4.jpg", desc: "Matte brass reflection with subtle warmth", stock: 10 },
      { id: "MR2005", name: "Crystal Silver", img: "/images/carbon-rock-boards/mirror/5.jpg", desc: "Sleek silver mirror with crisp reflectivity", stock: 10 },
      { id: "MR2006", name: "Titanium Gloss", img: "/images/carbon-rock-boards/mirror/6.jpg", desc: "Cool titanium mirror with polished finish", stock: 10 }
    ]
  }
];

// Brand colors: dark charcoal (#1A1A1A), gold (#C5A572), white

type CrbQuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productCategory?: string; // optional
};

type FormData = {
  width: string;
  height: string;
  totalArea: number;
  thickness: string;
  boardWidth: string;
  boardHeight: string;
  totalBoards: number;
  efficiency: number;
  waste: number;
  style: string;
  finish: string;
  installation: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
};

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function CrbQuoteModal({ isOpen, onClose, productCategory }: CrbQuoteModalProps) {
  const [step, setStep] = useState(1);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    width: "",
    height: "",
    totalArea: 0,
    thickness: "",
    boardWidth: "",
    boardHeight: "",
    totalBoards: 0,
    efficiency: 0,
    waste: 0,
    style: "",
    finish: "",
    installation: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
  });

  // Auto calculate total area
  useEffect(() => {
    if (formData.width && formData.height) {
      setFormData((prev) => ({
        ...prev,
        totalArea: parseFloat(prev.width) * parseFloat(prev.height),
      }));
    }
  }, [formData.width, formData.height]);

  // Auto calculate boards
  useEffect(() => {
    if (formData.totalArea && formData.boardWidth && formData.boardHeight) {
      const boardArea = (parseFloat(formData.boardWidth) / 1000) * (parseFloat(formData.boardHeight) / 1000);
      const totalBoards = Math.ceil(formData.totalArea / boardArea);
      const efficiency = Number(((formData.totalArea / (totalBoards * boardArea)) * 100).toFixed(1));
      const waste = Number((100 - efficiency).toFixed(1));
      setFormData((prev) => ({ ...prev, totalBoards, efficiency, waste }));
    }
  }, [formData.totalArea, formData.boardWidth, formData.boardHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinishSelect = (finishId: string) => {
    setFormData((prev) => ({ ...prev, finish: finishId }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.width && formData.height);
      case 2:
        return !!(formData.thickness && formData.boardWidth && formData.boardHeight);
      case 3:
        return !!(formData.style && formData.finish);
      case 4:
        return !!(formData.installation);
      case 5:
        return !!(formData.name && formData.email && formData.phone && formData.location);
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/sendCrbQuote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      setSubmissionState('success');
    } catch (error) {
      setSubmissionState('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 6));
    }
  };
  
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const resetModal = () => {
    setStep(1);
    setSubmissionState('idle');
    setErrorMessage('');
    setFormData({
      width: "",
      height: "",
      totalArea: 0,
      thickness: "",
      boardWidth: "",
      boardHeight: "",
      totalBoards: 0,
      efficiency: 0,
      waste: 0,
      style: "",
      finish: "",
      installation: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  const selectedCategory = textureCategories.find(cat => cat.id === formData.style);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-leather-500 via-mocha-600 to-leather-700 px-6 py-4 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-leather-500/90 via-mocha-600/90 to-leather-700/90"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">Carbon Rock Boards Quote</h1>
                <p className="text-leather-100 text-sm opacity-90">Get your personalized quotation</p>
              </div>
              <button 
                onClick={handleClose} 
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {submissionState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quote Request Submitted!</h2>
                <p className="text-gray-600 mb-4">
                  Thank you for your interest. Our team will review your requirements and contact you within 24 hours with a detailed quotation.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    📧 A copy of your request has been sent to your email address for your records.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-leather-500 to-mocha-600 hover:from-leather-600 hover:to-mocha-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
              </motion.div>
            ) : submissionState === 'error' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Submission Failed</h2>
                <p className="text-gray-600 mb-6">{errorMessage}</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setSubmissionState('idle')}
                    className="bg-gradient-to-r from-leather-500 to-mocha-600 hover:from-leather-600 hover:to-mocha-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Progress indicator */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                        i <= step 
                          ? 'bg-gradient-to-r from-leather-500 to-mocha-600 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {i}
                      </div>
                      {i < 6 && (
                        <div className={`w-8 h-0.5 mx-2 transition-all duration-200 ${
                          i < step ? 'bg-gradient-to-r from-leather-500 to-mocha-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Project Dimensions</h2>
                          <p className="text-gray-600 text-sm mb-6">Enter the dimensions of your wall or project area</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Width (meters) *</label>
                            <input 
                              type="number" 
                              name="width" 
                              value={formData.width} 
                              onChange={handleChange} 
                              placeholder="3.5" 
                              step="0.1" 
                              min="0.1"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Height (meters) *</label>
                            <input 
                              type="number" 
                              name="height" 
                              value={formData.height} 
                              onChange={handleChange} 
                              placeholder="2.4" 
                              step="0.1" 
                              min="0.1"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                              required 
                            />
                          </div>
                        </div>
                        {formData.width && formData.height && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center"
                          >
                            <p className="text-gray-600 text-sm">Total Area</p>
                            <p className="text-2xl font-semibold text-gray-800">{formData.totalArea.toFixed(2)} m²</p>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Board Specifications</h2>
                          <p className="text-gray-600 text-sm mb-6">Choose your board thickness and dimensions</p>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Thickness *</label>
                            <select 
                              name="thickness" 
                              value={formData.thickness} 
                              onChange={handleChange} 
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                              required
                            >
                              <option value="">Select Thickness</option>
                              <option value="6">5mm</option>
                              <option value="8">8mm</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Board Width (mm) *</label>
                              <select 
                                name="boardWidth" 
                                value={formData.boardWidth} 
                                onChange={handleChange} 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                                required
                              >
                                <option value="">Select Width</option>
                                <option value="1000">1000mm</option>
                                <option value="1220">1220mm</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Board Height (mm) *</label>
                              <select 
                                name="boardHeight" 
                                value={formData.boardHeight} 
                                onChange={handleChange} 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                                required
                              >
                                <option value="">Select Height</option>
                                <option value="3000">3000mm</option>
                                <option value="2800">2800mm</option>
                                <option value="2600">2600mm</option>
                                <option value="2400">2400mm</option>
                              </select>
                            </div>
                          </div>
                          {formData.totalArea && formData.boardWidth && formData.boardHeight && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2"
                            >
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="text-center">
                                  <p className="text-gray-600">Boards Needed</p>
                                  <p className="text-xl font-semibold text-gray-800">{formData.totalBoards}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-gray-600">Efficiency</p>
                                  <p className="text-xl font-semibold text-green-600">{formData.efficiency}%</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-gray-600">Waste</p>
                                  <p className="text-xl font-semibold text-orange-600">{formData.waste}%</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Style & Finish</h2>
                          <p className="text-gray-600 text-sm mb-6">Choose your preferred style and finish</p>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Style Category</label>
                            <select 
                              name="style" 
                              value={formData.style} 
                              onChange={handleChange} 
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                              required
                            >
                              <option value="">Select Style</option>
                              {textureCategories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>
                          {selectedCategory && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-4"
                            >
                              <label className="block text-sm font-medium text-gray-700">Select Finish</label>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {selectedCategory.panels.map(panel => (
                                  <div key={panel.id} className="flex flex-col items-center space-y-2">
                                     <motion.div
                                      onClick={() => handleFinishSelect(panel.id)}
                                      className={`relative aspect-square w-full cursor-pointer transition-all duration-200 transform hover:scale-105 overflow-hidden rounded-full ${formData.finish === panel.id ? 'ring-4 ring-offset-2 ring-leather-500' : 'ring-1 ring-gray-200'}`}
                                      whileTap={{ scale: 0.95 }}
                                      >
                                      <img 
                                        src={panel.img} 
                                        alt={panel.name} 
                                        className="w-full h-full object-cover rounded-full" 
                                      />
                                      {formData.finish === panel.id && (
                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center text-white">
                                          <CheckCircle size={16} />
                                        </div>
                                      )}
                                    </motion.div>

                                    {/* ✅ Name and Finish ID under image */}
                                    <div className="text-center">
                                      <p className="text-xs text-gray-500 mt-2">{panel.id}</p>
                                      <p className="text-sm font-medium text-gray-800">{panel.name}</p>
                                     
                                    </div>
                                  </div>
                                ))}
                              </div>

                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Installation Preference</h2>
                          <p className="text-gray-600 text-sm mb-6">How would you like to install your boards?</p>
                        </div>
                        <div className="space-y-3">
                          <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
                            <input 
                              type="radio" 
                              name="installation" 
                              value="professional" 
                              onChange={handleChange}
                              className="mt-1 text-leather-600 focus:ring-leather-500"
                            />
                            <div>
                              <div className="font-medium text-gray-800">Professional Installation</div>
                              <div className="text-sm text-gray-600">Our certified installers will handle everything (Recommended)</div>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
                            <input 
                              type="radio" 
                              name="installation" 
                              value="diy" 
                              onChange={handleChange}
                              className="mt-1 text-leather-600 focus:ring-leather-500"
                            />
                            <div>
                              <div className="font-medium text-gray-800">DIY Installation Kit</div>
                              <div className="text-sm text-gray-600">Includes detailed instructions and all necessary hardware</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Contact Information</h2>
                          <p className="text-gray-600 text-sm mb-6">We'll use this information to send your quotation</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                            <input 
                              type="text" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleChange} 
                              placeholder="John Smith" 
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                            <input 
                              type="email" 
                              name="email" 
                              value={formData.email} 
                              onChange={handleChange} 
                              placeholder="john@example.com" 
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                            <input 
                              type="tel" 
                              name="phone" 
                              value={formData.phone} 
                              onChange={handleChange} 
                              placeholder="+44 7123 456789" 
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
                            <input 
                              type="text" 
                              name="company" 
                              value={formData.company} 
                              onChange={handleChange} 
                              placeholder="Your Company Ltd" 
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Project Location *</label>
                            <input 
                              type="text" 
                              name="location" 
                              value={formData.location} 
                              onChange={handleChange} 
                              placeholder="London, UK" 
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-leather-500 focus:border-transparent transition-all duration-200 bg-white"
                              required 
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 6 && (
                      <div className="text-center space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Review & Submit</h2>
                          <p className="text-gray-600 text-sm mb-6">Please review your information before submitting</p>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Dimensions:</span>
                              <span className="ml-2 font-medium text-gray-800">{formData.width}m × {formData.height}m</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Total Area:</span>
                              <span className="ml-2 font-medium text-gray-800">{formData.totalArea.toFixed(2)} m²</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Thickness:</span>
                              <span className="ml-2 font-medium text-gray-800">{formData.thickness}mm</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Board Size:</span>
                              <span className="ml-2 font-medium text-gray-800">{formData.boardWidth}×{formData.boardHeight}mm</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Style:</span>
                              <span className="ml-2 font-medium text-gray-800">{selectedCategory?.name}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Finish:</span>
                              <span className="ml-2 font-medium text-gray-800">{selectedCategory?.panels.find(p => p.id === formData.finish)?.name}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Installation:</span>
                              <span className="ml-2 font-medium text-gray-800">{formData.installation === 'professional' ? 'Professional' : 'DIY Kit'}</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={submissionState === 'submitting'}
                          className="bg-gradient-to-r from-leather-500 to-mocha-600 hover:from-leather-600 hover:to-mocha-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl"
                        >
                          {submissionState === 'submitting' ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            'Get Free Quotation'
                          )}
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-gray-100">
                  {step > 1 ? (
                    <button 
                      type="button" 
                      onClick={prevStep} 
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
                    >
                      Back
                    </button>
                  ) : <div />}
                  
                  {step < 6 && (
                    <button 
                      type="button" 
                      onClick={nextStep} 
                      disabled={!validateStep(step)}
                      className="px-6 py-3 bg-gradient-to-r from-leather-500 to-mocha-600 hover:from-leather-600 hover:to-mocha-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Next
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
}