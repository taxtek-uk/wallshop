import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv, Lightbulb, Plus, Check, Zap, Palette, ArrowLeft,
  Mountain, Layers, Square, Calculator, Tablet, Lock, Camera,
  Thermometer, Search, Filter, Gamepad2, AlertTriangle, ChevronRight
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSmartWallsQuote } from '@/contexts/QuoteContext';
import { 
  SmartWallsFormData, 
  DimensionalCalculation, 
  TextureCategory, 
  SmartDevice,
  QuoteStep,
  StyleCategory,
  SmartDevices
} from '@/types/quote';

// Helper functions as specified in the PDF
type Unit = 'mm' | 'm';

function normalizeToMm(inputRaw: string | number): number | null {
  if (inputRaw === '' || inputRaw === null || inputRaw === undefined) return null;
  const str = String(inputRaw).trim().toLowerCase();
  const isMeters = str.endsWith('m');
  const n = parseFloat(str.replace(/m$/, ''));
  if (Number.isNaN(n)) return null;
  return isMeters ? Math.round(n * 1000) : Math.round(n);
}

function isValidWidthMm(mm: number | null): boolean {
  return mm !== null && mm >= 1000 && mm <= 6000;
}

function isValidHeightMm(mm: number | null): boolean {
  return mm !== null && mm >= 2200 && mm <= 4000;
}

// Device catalog from StepSmartDevices
const deviceCatalog: SmartDevice[] = [
  { 
    name: 'MixPad X', 
    category: 'Control Panel', 
    description: 'Premium 10" touchscreen control center',
    icon: Tablet,
    features: ['10" HD Display', 'Voice Control', 'Wireless Connectivity'],
    popular: true
  },
  { 
    name: 'MixPad 7 Ultra', 
    category: 'Control Panel', 
    description: '7" advanced control panel',
    icon: Tablet,
    features: ['7" Display', 'Enhanced Processing', 'Multi-Zone Control']
  },
  { 
    name: 'Smart Lock V5 Face', 
    category: 'Security', 
    description: 'Facial recognition smart lock',
    icon: Lock,
    features: ['Face Recognition', 'Keyless Entry', 'Mobile App']
  },
  { 
    name: '2K Wireless Smart IP Camera S2', 
    category: 'Surveillance', 
    description: 'High-definition security camera',
    icon: Camera,
    features: ['2K Resolution', 'Night Vision', 'Motion Detection']
  },
  { 
    name: 'Temperature Humidity Sensor', 
    category: 'Sensors', 
    description: 'Environmental monitoring sensor',
    icon: Thermometer,
    features: ['Temperature', 'Humidity', 'Data Logging']
  },
  { 
    name: 'Sky Dome Pro Ceiling Light', 
    category: 'Lighting', 
    description: 'Smart ceiling lighting system',
    icon: Lightbulb,
    features: ['Dimmable', 'Color Changing', 'Voice Control']
  },
  { 
    name: 'Smart Thermostat Pro', 
    category: 'HVAC', 
    description: 'Advanced climate control system',
    icon: Thermometer,
    features: ['Learning Algorithm', 'Energy Saving', 'Remote Control']
  }
];

// Texture categories (condensed for space)
const textureCategories: TextureCategory[] = [
  {
    id: 'wood',
    name: "Wood Grain Series",
    desc: "Warm wood aesthetics with durable surface.",
    icon: Layers,
    img: "/images/carbon-rock-boards/wood.jpg",
    color: "from-amber-100 to-orange-100",
    accent: "amber-600",
    panels: [
      { id: 1, name: "Natural Oak", img: "/images/carbon-rock-boards/wood/1.jpg", desc: "Classic oak texture with soft grain pattern" },
      { id: 2, name: "Walnut Mist", img: "/images/carbon-rock-boards/wood/2.jpg", desc: "Mid-brown walnut tone with subtle striations" },
      { id: 3, name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast" },
      { id: 4, name: "Golden Maple", img: "/images/carbon-rock-boards/wood/4.jpg", desc: "Warm maple hue with straight grain" },
      { id: 5, name: "Weathered Cedar", img: "/images/carbon-rock-boards/wood/5.jpg", desc: "Textured cedar look with aged character" },
      { id: 6, name: "Rustic Pine", img: "/images/carbon-rock-boards/wood/6.jpg", desc: "Light pine tone with visible knots and streaks" },
      { id: 7, name: "Charcoal Oak", img: "/images/carbon-rock-boards/wood/7.jpg", desc: "Deep grey oak with modern finish" },
      { id: 8, name: "Amber Teak", img: "/images/carbon-rock-boards/wood/8.jpg", desc: "Teak-inspired golden tones and natural flow" },
      { id: 9, name: "Espresso Birch", img: "/images/carbon-rock-boards/wood/9.jpg", desc: "Bold espresso hue on tight birch grains" },
      { id: 10, name: "Sunbleached Timber", img: "/images/carbon-rock-boards/wood/10.jpg", desc: "Light grey-brown tone like weathered wood" }
    ]
  },
  {
    id: 'solid',
    name: "Solid Color Series",
    desc: "Industrial elegance with raw, minimalist tones.",
    icon: Palette,
    img: "/images/carbon-rock-boards/wpc.jpg",
    color: "from-slate-100 to-gray-100",
    accent: "slate-600",
    panels: [
      { id: 1, name: "Warm Blush", img: "/images/carbon-rock-boards/solid/1.jpg", desc: "A soft blush hue for cozy minimalism" },
      { id: 2, name: "Ash Silver", img: "/images/carbon-rock-boards/solid/2.jpg", desc: "Neutral silver-gray with a clean industrial look" },
      { id: 3, name: "Muted Graphite", img: "/images/carbon-rock-boards/solid/3.jpg", desc: "Balanced dark silver tone for sleek walls" },
      { id: 4, name: "Jet Black", img: "/images/carbon-rock-boards/solid/4.jpg", desc: "Deep black ideal for bold modern interiors" },
      { id: 5, name: "Rose Brick", img: "/images/carbon-rock-boards/solid/5.jpg", desc: "Warm reddish tone inspired by natural clay" },
      { id: 6, name: "Burnt Orange", img: "/images/carbon-rock-boards/solid/6.jpg", desc: "Bright terracotta with energetic character" },
      { id: 7, name: "Sky Blue", img: "/images/carbon-rock-boards/solid/7.jpg", desc: "A cool pastel blue evoking calm environments" },
      { id: 8, name: "Frost White", img: "/images/carbon-rock-boards/solid/8.jpg", desc: "Pure white with a crisp clean finish" },
      { id: 9, name: "Stone Clay", img: "/images/carbon-rock-boards/solid/9.jpg", desc: "Earthy stone shade with balanced neutrality" },
      { id: 10, name: "Slate Blue", img: "/images/carbon-rock-boards/solid/10.jpg", desc: "Dark blue-grey with a sophisticated edge" }
    ]
  },
  {
    id: 'stone',
    name: "Stone Grain Series",
    desc: "Classic stone surface with timeless elegance.",
    icon: Mountain,
    img: "/images/carbon-rock-boards/stone.jpg",
    color: "from-stone-100 to-slate-100",
    accent: "stone-600",
    panels: [
      { id: 1, name: "T3006", img: "/images/carbon-rock-boards/stone/1.jpg", desc: "Stone texture T3006" },
      { id: 2, name: "T3012", img: "/images/carbon-rock-boards/stone/2.jpg", desc: "Stone texture T3012" },
      { id: 3, name: "T3017", img: "/images/carbon-rock-boards/stone/3.jpg", desc: "Stone texture T3017" },
      { id: 4, name: "T3018", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture T3018" },
      { id: 5, name: "T3019", img: "/images/carbon-rock-boards/stone/5.jpg", desc: "Stone texture T3019" },
      { id: 6, name: "T3023", img: "/images/carbon-rock-boards/stone/6.jpg", desc: "Stone texture T3023" },
      { id: 7, name: "T3024", img: "/images/carbon-rock-boards/stone/7.jpg", desc: "Stone texture T3024" },
      { id: 8, name: "T3025", img: "/images/carbon-rock-boards/stone/8.jpg", desc: "Stone texture T3025" },
      { id: 9, name: "T3201", img: "/images/carbon-rock-boards/stone/9.jpg", desc: "Stone texture T3201" },
      { id: 10, name: "T3202", img: "/images/carbon-rock-boards/stone/10.jpg", desc: "Stone texture T3202" }
    ]
  },
  {
    id: 'cloth',
    name: "Cloth Series",
    desc: "Soft textile-inspired finishes.",
    icon: Layers,
    img: "/images/carbon-rock-boards/cloth.jpg",
    color: "from-blue-100 to-indigo-100",
    accent: "blue-600",
    panels: [
      { id: 1, name: "Linen White", img: "/images/carbon-rock-boards/cloth/1.jpg", desc: "Clean linen texture" },
      { id: 2, name: "Canvas Grey", img: "/images/carbon-rock-boards/cloth/2.jpg", desc: "Neutral canvas finish" },
      { id: 3, name: "Silk Cream", img: "/images/carbon-rock-boards/cloth/3.jpg", desc: "Smooth silk-like surface" },
      { id: 4, name: "Velvet Navy", img: "/images/carbon-rock-boards/cloth/4.jpg", desc: "Rich velvet texture" },
      { id: 5, name: "Cotton Beige", img: "/images/carbon-rock-boards/cloth/5.jpg", desc: "Soft cotton appearance" }
    ]
  },
  {
    id: 'metal',
    name: "Metal Series",
    desc: "Industrial metal finishes.",
    icon: Square,
    img: "/images/carbon-rock-boards/metal.jpg",
    color: "from-gray-100 to-zinc-100",
    accent: "gray-600",
    panels: [
      { id: 1, name: "Brushed Steel", img: "/images/carbon-rock-boards/metal/1.jpg", desc: "Brushed steel finish" },
      { id: 2, name: "Copper Patina", img: "/images/carbon-rock-boards/metal/2.jpg", desc: "Aged copper look" },
      { id: 3, name: "Aluminum Matte", img: "/images/carbon-rock-boards/metal/3.jpg", desc: "Matte aluminum surface" },
      { id: 4, name: "Bronze Antique", img: "/images/carbon-rock-boards/metal/4.jpg", desc: "Antique bronze finish" },
      { id: 5, name: "Iron Rust", img: "/images/carbon-rock-boards/metal/5.jpg", desc: "Rustic iron texture" }
    ]
  },
  {
    id: 'mirror',
    name: "Mirror Series",
    desc: "Reflective mirror finishes.",
    icon: Square,
    img: "/images/carbon-rock-boards/mirror.jpg",
    color: "from-slate-100 to-gray-100",
    accent: "slate-600",
    panels: [
      { id: 1, name: "Silver Mirror", img: "/images/carbon-rock-boards/mirror/1.jpg", desc: "Classic silver mirror" },
      { id: 2, name: "Bronze Mirror", img: "/images/carbon-rock-boards/mirror/2.jpg", desc: "Warm bronze mirror" },
      { id: 3, name: "Smoke Mirror", img: "/images/carbon-rock-boards/mirror/3.jpg", desc: "Tinted smoke mirror" },
      { id: 4, name: "Antique Mirror", img: "/images/carbon-rock-boards/mirror/4.jpg", desc: "Vintage antique mirror" },
      { id: 5, name: "Black Mirror", img: "/images/carbon-rock-boards/mirror/5.jpg", desc: "Deep black mirror" }
    ]
  }
];

interface StepSmartWallsProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function StepSmartWalls({ activeSection, setActiveSection }: StepSmartWallsProps) {
  const context = useSmartWallsQuote();
  const { currentStep, data, setStep, updateDimensions, updateStyle, toggleDevice } = context;
  
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  
  // Local state for input values (display purposes)
  const [widthInput, setWidthInput] = useState<string>('');
  const [heightInput, setHeightInput] = useState<string>('');
  
  // Debounced update function
  const debouncedUpdate = useCallback(
    debounce((widthMm: number | null, heightMm: number | null) => {
      updateDimensions({ widthMm, heightMm });
    }, 250),
    [updateDimensions]
  );

  // Initialize input values from context
  useEffect(() => {
    if (data.dimensions.widthMm !== null) {
      setWidthInput(String(data.dimensions.widthMm));
    }
    if (data.dimensions.heightMm !== null) {
      setHeightInput(String(data.dimensions.heightMm));
    }
  }, [data.dimensions]);

  // Handle width input change
  const handleWidthChange = (value: string) => {
    setWidthInput(value);
    const widthMm = normalizeToMm(value);
    debouncedUpdate(widthMm, data.dimensions.heightMm);
  };

  // Handle height input change
  const handleHeightChange = (value: string) => {
    setHeightInput(value);
    const heightMm = normalizeToMm(value);
    debouncedUpdate(data.dimensions.widthMm, heightMm);
  };

  // Handle style selection
  const handleStyleSelect = (category: StyleCategory, styleId: string) => {
    const currentStyle = data.selectedStyle;
    
    // If same style is selected, deselect
    if (currentStyle.category === category && currentStyle.styleId === styleId) {
      updateStyle({ category: null, styleId: null });
    } else {
      updateStyle({ category, styleId });
    }
    
    // Scroll to next button
    setTimeout(() => {
      nextButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  // Handle device toggle
  const handleDeviceToggle = (deviceKey: keyof SmartDevices) => {
    toggleDevice(deviceKey);
  };

  // Validation
  const { widthMm, heightMm } = data.dimensions;
  const isWidthValid = isValidWidthMm(widthMm);
  const isHeightValid = isValidHeightMm(heightMm);
  const showWidthWarning = widthMm !== null && widthMm > 6000;
  const isFormValid = isWidthValid && isHeightValid && !showWidthWarning;

  // Section navigation
  const sections = [
    { id: 'dimensions', title: 'Dimensions', icon: Calculator },
    { id: 'styles', title: 'Style & Finish', icon: Palette },
    { id: 'accessories', title: 'Accessories', icon: Plus },
    { id: 'devices', title: 'Smart Devices', icon: Zap },
    { id: 'gaming', title: 'Gaming', icon: Gamepad2 }
  ];

  const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
  const canProceed = activeSection === 'dimensions' ? isFormValid : true;

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setActiveSection(sections[currentSectionIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setActiveSection(sections[currentSectionIndex - 1].id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const isCompleted = index < currentSectionIndex;
          
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isActive
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : isCompleted
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{section.title}</span>
              {isCompleted && <Check className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {/* Dimensions Section */}
      {activeSection === 'dimensions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4">Wall Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Width Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (mm or m)
                </label>
                <input
                  type="text"
                  value={widthInput}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  placeholder="e.g., 5000 or 5m"
                  aria-invalid={!isWidthValid && widthInput !== ''}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    !isWidthValid && widthInput !== '' ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {!isWidthValid && widthInput !== '' && (
                  <p className="mt-1 text-sm text-red-600">
                    Width must be between 1,000mm and 6,000mm (1.0m - 6.0m)
                  </p>
                )}
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (mm or m)
                </label>
                <input
                  type="text"
                  value={heightInput}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  placeholder="e.g., 2800 or 2.8m"
                  aria-invalid={!isHeightValid && heightInput !== ''}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    !isHeightValid && heightInput !== '' ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {!isHeightValid && heightInput !== '' && (
                  <p className="mt-1 text-sm text-red-600">
                    Height must be between 2,200mm and 4,000mm (2.2m - 4.0m)
                  </p>
                )}
              </div>
            </div>

            {/* Warning for width > 6m */}
            {showWidthWarning && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg" aria-live="polite">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-amber-800 font-medium">Custom Quotation Required</p>
                    <p className="text-amber-700 text-sm mt-1">
                      Our standard system supports up to 6.0 metres. For larger walls, please
                      consider a custom quotation by our representative.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Styles Section */}
      {activeSection === 'styles' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4">Style & Finish Selection</h3>
            <div className="space-y-8">
              {textureCategories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="w-6 h-6 text-gray-600" />
                    <div>
                      <h4 className="text-lg font-medium">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.desc}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {category.panels.map((panel) => {
                      const isSelected = 
                        data.selectedStyle.category === category.id && 
                        data.selectedStyle.styleId === String(panel.id);
                      
                      return (
                        <button
                          key={panel.id}
                          onClick={() => handleStyleSelect(category.id as StyleCategory, String(panel.id))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleStyleSelect(category.id as StyleCategory, String(panel.id));
                            }
                          }}
                          role="button"
                          aria-pressed={isSelected}
                          className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            isSelected
                              ? 'border-blue-500 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={panel.img}
                            alt={panel.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                            <p className="text-white text-sm font-medium">{panel.name}</p>
                            <p className="text-white text-xs opacity-90">{panel.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Accessories Section */}
      {activeSection === 'accessories' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4">Accessories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(data.devices).map(([key, isSelected]) => {
                const deviceKey = key as keyof SmartDevices;
                const icons = { tv: Tv, fireplace: Lightbulb, soundbar: Zap, shelving: Layers };
                const labels = { tv: 'TV Integration', fireplace: 'Fireplace', soundbar: 'Soundbar', shelving: 'Shelving' };
                const Icon = icons[deviceKey];
                
                return (
                  <button
                    key={deviceKey}
                    onClick={() => handleDeviceToggle(deviceKey)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {labels[deviceKey]}
                      </span>
                      {isSelected && <Check className="w-5 h-5 text-blue-600 ml-auto" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Smart Devices Section */}
      {activeSection === 'devices' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4">Smart Devices</h3>
            <p className="text-gray-600 mb-6">Select multiple devices for your smart wall system.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deviceCatalog.map((device, index) => {
                const Icon = device.icon;
                return (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-6 h-6 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{device.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{device.description}</p>
                        <div className="space-y-1">
                          {device.features.map((feature, idx) => (
                            <p key={idx} className="text-xs text-gray-500">• {feature}</p>
                          ))}
                        </div>
                        {device.popular && (
                          <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Gaming Section */}
      {activeSection === 'gaming' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4">Gaming Setup</h3>
            <p className="text-gray-600 mb-6">Configure your gaming system integration.</p>
            <div className="text-center py-12 text-gray-500">
              <Gamepad2 className="w-12 h-12 mx-auto mb-4" />
              <p>Gaming configuration options will be available here.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={handlePrev}
          disabled={currentSectionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        
        <button
          ref={nextButtonRef}
          onClick={handleNext}
          disabled={!canProceed || currentSectionIndex === sections.length - 1}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: {currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1].title : 'Complete'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

