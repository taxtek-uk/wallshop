import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv, Lightbulb, Plus, Check, Zap, Palette, ArrowLeft,
  Mountain, Layers, Square, Calculator, Tablet, Lock, Camera,
  Thermometer, Search, Filter, Gamepad2, AlertTriangle
} from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { SmartWallsFormData, DimensionalCalculation, TextureCategory, SmartDevice } from '@/types/quote';

// Inline helper: dimensional calculation (unchanged logic from original)
function calculateMaxWallDimensions(
  width: number,
  height: number,
  depth: string,
  hasTV: boolean
): DimensionalCalculation {
  const warnings: string[] = [];
  let isValid = true;

  if (hasTV && (depth === '120mm' || depth === '150mm')) {
    warnings.push('TV modules require minimum 180mm depth');
    isValid = false;
  }

  const standardModules = [1000, 900, 800, 400];
  const widthMm = width * 1000;
  let remainingWidth = widthMm;
  const modules: Array<{ size: number; count: number }> = [];

  for (const moduleSize of standardModules) {
    if (remainingWidth >= moduleSize) {
      const count = Math.floor(remainingWidth / moduleSize);
      if (count > 0) {
        modules.push({ size: moduleSize, count });
        remainingWidth -= count * moduleSize;
      }
    }
  }

  const achievableWidthMm = widthMm - remainingWidth;
  const maxWidth = achievableWidthMm / 1000;

  if (remainingWidth > 0) {
    warnings.push(`${remainingWidth}mm cannot be accommodated with standard modules`);
  }

  return { maxWidth, modules, warnings, isValid: isValid && remainingWidth === 0 };
}

// Device catalog (same as original source)
const deviceCatalog: SmartDevice[] = [
  { name: 'MixPad X', category: 'Control Panel', description: 'Premium 10" touchscreen control center', icon: Tablet, features: ['10" HD Display', 'Voice Control', 'Wireless Connectivity'], popular: true },
  { name: 'MixPad 7 Ultra', category: 'Control Panel', description: '7" advanced control panel', icon: Tablet, features: ['7" Display', 'Enhanced Processing', 'Multi-Zone Control'] },
  { name: 'Smart Lock V5 Face', category: 'Security', description: 'Facial recognition smart lock', icon: Lock, features: ['Face Recognition', 'Keyless Entry', 'Mobile App'] },
  { name: '2K Wireless Smart IP Camera S2', category: 'Surveillance', description: 'High-definition security camera', icon: Camera, features: ['2K Resolution', 'Night Vision', 'Motion Detection'] },
  { name: 'Temperature Humidity Sensor', category: 'Sensors', description: 'Environmental monitoring sensor', icon: Thermometer, features: ['Temperature', 'Humidity', 'Data Logging'] },
  { name: 'Sky Dome Pro Ceiling Light', category: 'Lighting', description: 'Smart ceiling lighting system', icon: Lightbulb, features: ['Dimmable', 'Color Changing', 'Voice Control'] },
  { name: 'Smart Thermostat Pro', category: 'HVAC', description: 'Advanced climate control system', icon: Thermometer, features: ['Learning Algorithm', 'Energy Saving', 'Remote Control'] }
];

// Texture categories (truncated for brevity, keep original content in your file)
const textureCategories: TextureCategory[] = [
  {
    id: 'wood',
    name: 'Wood Grain Series',
    desc: 'Warm wood aesthetics with durable surface.',
    icon: Layers,
    img: '/images/carbon-rock-boards/wood.jpg',
    color: 'from-amber-100 to-orange-100',
    accent: 'amber-600',
    panels: [
      { id: 1, name: 'Natural Oak', img: '/images/carbon-rock-boards/wood/1.jpg', desc: 'Classic oak texture with soft grain pattern' },
      { id: 2, name: 'Walnut Mist', img: '/images/carbon-rock-boards/wood/2.jpg', desc: 'Mid-brown walnut tone with subtle striations' },
      { id: 3, name: 'Smoked Ash', img: '/images/carbon-rock-boards/wood/3.jpg', desc: 'Dark smoked ash grain with rich contrast' },
    ]
  },
  {
    id: 'solid',
    name: 'Solid Color Series',
    desc: 'Industrial elegance with raw, minimalist tones.',
    icon: Palette,
    img: '/images/carbon-rock-boards/wpc.jpg',
    color: 'from-slate-100 to-gray-100',
    accent: 'slate-600',
    panels: [
      { id: 1, name: 'Warm Blush', img: '/images/carbon-rock-boards/solid/1.jpg', desc: 'A soft blush hue for cozy minimalism' },
      { id: 2, name: 'Ash Silver', img: '/images/carbon-rock-boards/solid/2.jpg', desc: 'Neutral silver-gray with a clean industrial look' },
    ]
  },
  {
    id: 'stone',
    name: 'Stone Grain Series',
    desc: 'Classic stone surface with timeless elegance.',
    icon: Mountain,
    img: '/images/carbon-rock-boards/stone.jpg',
    color: 'from-stone-100 to-slate-100',
    accent: 'stone-600',
    panels: [
      { id: 1, name: 'T3006', img: '/images/carbon-rock-boards/stone/1.jpg', desc: 'Stone texture T3006' },
    ]
  },
  {
    id: 'mirror',
    name: 'Mirror Series',
    desc: 'Reflective brilliance with a sleek, high-gloss finish.',
    icon: Square,
    img: '/images/carbon-rock-boards/mirror.jpg',
    color: 'from-blue-100 to-leather-100',
    accent: 'blue-600',
    panels: [
      { id: 1, name: 'Bronze Mirror', img: '/images/carbon-rock-boards/mirror/1.jpg', desc: 'Warm bronze-tinted mirror with elegant shine' },
    ]
  },
];

// Reusable confirmation dialog. Uses Framer Motion for smooth in/out and follows rounded design system.
const ConfirmationDialog: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-mocha-950 mb-2">{title}</h3>
              <p className="text-stone-600 mb-6">{message}</p>
              <div className="flex gap-3 justify-end">
                <button onClick={onCancel} className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium">{cancelText}</button>
                <button onClick={onConfirm} className="px-6 py-2 bg-leather-600 hover:bg-leather-700 text-white font-medium rounded-xl">{confirmText}</button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

interface StepSmartWallsProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function StepSmartWalls({ activeSection, setActiveSection }: StepSmartWallsProps) {
  // IMPORTANT: Use the existing QuoteContext API to avoid type errors elsewhere
  const { state, updateSmartWallsFormData } = useQuote();
  const smartWallsData: SmartWallsFormData = state.formData.smartWalls || {} as SmartWallsFormData;

  // Local UI state
  const [isStyleDetailView, setIsStyleDetailView] = useState(false);
  const [selectedStyleCategory, setSelectedStyleCategory] = useState<TextureCategory | null>(null);
  const [deviceSearchTerm, setDeviceSearchTerm] = useState('');
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState('All');
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    type: 'accessories' | 'devices' | null;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
  }>({ isOpen: false, type: null, title: '', message: '', confirmText: '', cancelText: '' });

  // Centralized update that preserves other smartWalls fields
  const commitSmartWalls = (patch: Partial<SmartWallsFormData>) => {
    updateSmartWallsFormData(patch);
  };

  // Dimensions handlers
  const handleDimensionsChange = (field: keyof NonNullable<SmartWallsFormData['dimensions']>, value: any) => {
    const current = smartWallsData.dimensions || {};
    commitSmartWalls({ dimensions: { ...current, [field]: value } });
  };

  // Style category tap
  const handleStyleCategoryClick = (category: TextureCategory) => {
    setSelectedStyleCategory(category);
    setIsStyleDetailView(true);
  };

  // Finish select -> save both new style model AND legacy selectedStyle for compatibility, then auto-nav
  const handleFinishSelect = (finish: { id: number; name: string; img: string; desc: string }) => {
    // Save modern shape
    commitSmartWalls({
      // Newer shape used by this step
      style: {
        category: selectedStyleCategory?.id,
        categoryName: selectedStyleCategory?.name,
        finish,
      },
      // Legacy fields to avoid breaking existing email/steps
      selectedStyle: {
        category: selectedStyleCategory?.name || '',
        categoryId: selectedStyleCategory?.id || '',
        finish: finish.name,
        finishId: String(finish.id),
        finishImage: finish.img,
        finishDescription: finish.desc,
      },
    });

    // Smooth auto-nav to Accessories (slight delay keeps transition natural)
    setTimeout(() => setActiveSection('accessories'), 400);
  };

  // Accessories toggle with skip confirmation
  const handleAccessoryToggle = (
    accessoryKey: keyof NonNullable<SmartWallsFormData['accessories']>
  ) => {
    const current = smartWallsData.accessories || {};
    const updated = { ...current, [accessoryKey]: !current[accessoryKey] };

    commitSmartWalls({ accessories: updated, skippedAccessories: false }); // ensure explicit intent

    const hasAny = Object.values(updated).some(Boolean);

    // If user just turned something ON, flow naturally to Smart Devices
    if (!current[accessoryKey] && updated[accessoryKey]) {
      setTimeout(() => setActiveSection('devices'), 400);
    }
    // If last one was turned OFF, confirm skipping Accessories
    else if (!hasAny && current[accessoryKey]) {
      setConfirmationDialog({
        isOpen: true,
        type: 'accessories',
        title: 'Skip Accessories?',
        message: "Are you sure you don’t want any accessories? Accessories enhance the Smart Wall experience.",
        confirmText: 'Yes, skip accessories',
        cancelText: 'Go back',
      });
    }
  };

  // Smart devices toggle — conforms to legacy structure: smartDevices.selectedDevices: {name, category}[]
  const selectedDevices = smartWallsData.smartDevices?.selectedDevices || [];

  const handleSmartDeviceToggle = (deviceName: string) => {
    const isSelected = selectedDevices.some((d) => d.name === deviceName);
    let next: { name: string; category: string }[];

    if (isSelected) {
      next = selectedDevices.filter((d) => d.name !== deviceName);
    } else {
      const device = deviceCatalog.find((d) => d.name === deviceName);
      if (!device) return;
      next = [...selectedDevices, { name: device.name, category: device.category }];
    }

    const currentSD = smartWallsData.smartDevices || {
      selectedDevices: [],
      controlPanels: false,
      securitySensors: false,
      homeAutomation: false,
    };

    commitSmartWalls({ smartDevices: { ...currentSD, selectedDevices: next }, skippedSmartDevices: false });

    // Auto-nav forward if adding first device
    if (!isSelected) {
      setTimeout(() => setActiveSection('gaming'), 400);
    }
    // If user removed the last device, confirm skipping Smart Devices
    else if (next.length === 0 && selectedDevices.length > 0) {
      setConfirmationDialog({
        isOpen: true,
        type: 'devices',
        title: 'Skip Smart Devices?',
        message: 'Are you sure you don’t want any smart devices? The wall is only considered smart if it has accessories, smart devices, or both.',
        confirmText: 'Yes, skip devices',
        cancelText: 'Go back',
      });
    }
  };

  // Confirmation actions for skipping Accessories / Smart Devices
  const handleConfirmationConfirm = () => {
    if (confirmationDialog.type === 'accessories') {
      commitSmartWalls({ skippedAccessories: true });
      setActiveSection('devices');
    } else if (confirmationDialog.type === 'devices') {
      commitSmartWalls({ skippedSmartDevices: true });
      setActiveSection('gaming'); // or next step in your flow
    }
    setConfirmationDialog({ isOpen: false, type: null, title: '', message: '', confirmText: '', cancelText: '' });
  };
  const handleConfirmationCancel = () => {
    if (confirmationDialog.type === 'accessories') setActiveSection('accessories');
    if (confirmationDialog.type === 'devices') setActiveSection('devices');
    setConfirmationDialog({ isOpen: false, type: null, title: '', message: '', confirmText: '', cancelText: '' });
  };

  // Derived UI values
  const dimensionalCalculation = useMemo(() => {
    if (!smartWallsData.dimensions?.width) return { maxWidth: 0, modules: [], warnings: [], isValid: false };
    return calculateMaxWallDimensions(
      smartWallsData.dimensions.width,
      smartWallsData.dimensions.height || 2.1,
      smartWallsData.dimensions.depth || '180mm',
      Boolean(smartWallsData.accessories?.tv)
    );
  }, [smartWallsData.dimensions, smartWallsData.accessories?.tv]);

  const filteredDevices = useMemo(() => {
    return deviceCatalog.filter((device) => {
      const s = deviceSearchTerm.toLowerCase();
      const inText = device.name.toLowerCase().includes(s) || device.description.toLowerCase().includes(s);
      const inCategory = selectedDeviceCategory === 'All' || device.category === selectedDeviceCategory;
      return inText && inCategory;
    });
  }, [deviceSearchTerm, selectedDeviceCategory]);

  const deviceCategories = useMemo(() => ['All', ...Array.from(new Set(deviceCatalog.map((d) => d.category)))], []);

  // UI starts here
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Global confirmation dialog overlay */}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        title={confirmationDialog.title}
        message={confirmationDialog.message}
        confirmText={confirmationDialog.confirmText}
        cancelText={confirmationDialog.cancelText}
        onConfirm={handleConfirmationConfirm}
        onCancel={handleConfirmationCancel}
      />

      {/* Dimensions */}
      {activeSection === 'dimensions' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-leather-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-leather-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-mocha-950">Wall Dimensions</h2>
              <p className="text-stone-600">Start by entering your wall dimensions to get personalized module recommendations.</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">Width (meters) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  step="0.1"
                  min={0.1}
                  max={10}
                  value={smartWallsData.dimensions?.width || ''}
                  onChange={(e) => handleDimensionsChange('width', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all"
                  placeholder="e.g., 3.5"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">Height (meters)</label>
                <input type="number" value={smartWallsData.dimensions?.height || 2.1} disabled className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50 text-stone-600" />
                <p className="text-xs text-stone-500">Fixed at 2.1m for smart walls</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">Depth</label>
                <select
                  value={smartWallsData.dimensions?.depth || '180mm'}
                  onChange={(e) => handleDimensionsChange('depth', e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all"
                >
                  <option value="120mm">120mm</option>
                  <option value="150mm">150mm</option>
                  <option value="180mm">180mm (Recommended)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            {smartWallsData.dimensions?.depth === 'custom' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">Custom Depth (mm)</label>
                <input
                  type="number"
                  min={100}
                  max={300}
                  value={smartWallsData.dimensions?.customDepth || ''}
                  onChange={(e) => handleDimensionsChange('customDepth', parseInt(e.target.value) || 0)}
                  className="w-full max-w-xs px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all"
                  placeholder="e.g., 200"
                />
              </motion.div>
            )}

            {smartWallsData.dimensions?.width > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-leather-50 to-leather-50 border border-leather-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-5 h-5 text-leather-600" />
                  <h3 className="font-bold text-leather-900">Calculation Results</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-leather-700">Maximum Achievable Width</p>
                    <p className="text-2xl font-bold text-leather-900">{dimensionalCalculation.maxWidth.toFixed(2)}m</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-leather-700">Module Configuration</p>
                    <div className="space-y-1">
                      {dimensionalCalculation.modules.map((m, i) => (
                        <p key={i} className="text-sm text-leather-800">{m.count}× {m.size}mm modules</p>
                      ))}
                    </div>
                  </div>
                </div>
                {!!dimensionalCalculation.warnings.length && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-800">Warnings</span>
                    </div>
                    {dimensionalCalculation.warnings.map((w, i) => (
                      <p key={i} className="text-sm text-red-700">{w}</p>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* Style */}
      {activeSection === 'style' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-leather-600" />
            </div>
            <h2 className="text-xl font-bold text-mocha-950">Style Selection</h2>
          </div>

          {!isStyleDetailView ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {textureCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => handleStyleCategoryClick(category)}
                    className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${category.color} border-stone-200 hover:border-stone-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 bg-${category.accent} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                      <Icon className="w-6 h-6 text-leather-600" />
                    </div>
                    <h3 className="font-bold text-mocha-950 text-lg mb-2">{category.name}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">{category.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500">{category.panels.length} options</span>
                      <ArrowLeft className="w-4 h-4 text-stone-400 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsStyleDetailView(false)} className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Categories
                </button>
                <h3 className="text-xl font-bold text-mocha-950">{selectedStyleCategory?.name}</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedStyleCategory?.panels.map((finish) => {
                  // Support both new and legacy storage
                  const currentFinishId = smartWallsData.style?.finish?.id ?? (smartWallsData.selectedStyle?.finishId ? Number(smartWallsData.selectedStyle.finishId) : undefined);
                  const isSelected = currentFinishId === finish.id;

                  return (
                    <motion.button
                      key={finish.id}
                      onClick={() => handleFinishSelect(finish)}
                      className={`group relative p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isSelected ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200' : 'bg-white border-stone-200 hover:border-stone-300'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                      <div className="w-full h-24 bg-stone-200 rounded-lg mb-3 overflow-hidden">
                        <img src={finish.img} alt={finish.name} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                      <h4 className="font-bold text-mocha-950 text-sm mb-1">{finish.name}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{finish.desc}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.section>
      )}

      {/* Accessories */}
      {activeSection === 'accessories' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-leather-600" />
            </div>
            <h2 className="text-xl font-bold text-mocha-950">Accessories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'tv', label: 'TV Integration', icon: Tv, description: 'Integrated TV mounting and cable management', popular: true },
              { key: 'fireplace', label: 'Fireplace', icon: Layers, description: 'Electric fireplace integration with smart controls' },
              { key: 'soundbar', label: 'Soundbar', icon: Lightbulb, description: 'Premium audio integration with hidden wiring' },
              { key: 'shelving', label: 'Shelving', icon: Layers, description: 'Floating shelves with integrated lighting' },
            ].map((acc) => {
              const Icon = acc.icon as any;
              const isSelected = Boolean(smartWallsData.accessories?.[acc.key as keyof NonNullable<SmartWallsFormData['accessories']>]);
              return (
                <motion.button
                  key={acc.key}
                  onClick={() => handleAccessoryToggle(acc.key as keyof NonNullable<SmartWallsFormData['accessories']>)}
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isSelected ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200' : 'bg-white border-stone-200 hover:border-stone-300'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {acc.popular && (
                    <div className="absolute top-3 right-3"><span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Popular</span></div>
                  )}
                  {isSelected && (
                    <div className="absolute top-3 right-3"><div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div></div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isSelected ? 'bg-leather-600' : 'bg-leather-100'}`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-leather-600'}`} />
                  </div>
                  <h3 className="font-bold text-mocha-950 text-lg mb-2">{acc.label}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{acc.description}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Smart Devices */}
      {activeSection === 'devices' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-leather-600" />
            </div>
            <h2 className="text-xl font-bold text-mocha-950">Smart Devices</h2>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={deviceSearchTerm}
                  onChange={(e) => setDeviceSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <select
                  value={selectedDeviceCategory}
                  onChange={(e) => setSelectedDeviceCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 bg-white"
                >
                  {deviceCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => {
              const Icon = device.icon as any;
              const isSelected = selectedDevices.some((d) => d.name === device.name);
              return (
                <motion.button
                  key={device.name}
                  onClick={() => handleSmartDeviceToggle(device.name)}
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isSelected ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200' : 'bg-white border-stone-200 hover:border-stone-300'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {device.popular && (
                    <div className="absolute top-3 right-3"><span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Popular</span></div>
                  )}
                  {isSelected && (
                    <div className="absolute top-3 right-3"><div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div></div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isSelected ? 'bg-leather-600' : 'bg-leather-100'}`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-leather-600'}`} />
                  </div>
                  <h3 className="font-bold text-mocha-950 text-lg mb-2">{device.name}</h3>
                  <p className="text-stone-600 text-sm mb-3">{device.description}</p>
                  <div className="space-y-1">
                    {device.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-leather-400 rounded-full" />
                        <span className="text-xs text-stone-500">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {filteredDevices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-stone-400" /></div>
              <h3 className="text-lg font-semibold text-stone-600 mb-2">No devices found</h3>
              <p className="text-stone-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.section>
      )}

      {/* Gaming System */}
      {activeSection === 'gaming' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-leather-600" />
            </div>
            <h2 className="text-xl font-bold text-mocha-950">Gaming System</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: null as null, label: "No Gaming System", description: "Skip gaming integration for this wall" },
              { type: 'PlayStation' as const, label: 'PlayStation 5', description: 'Sony PlayStation 5 with integrated mounting and cable management' },
              { type: 'Xbox' as const, label: 'Xbox Series X', description: 'Microsoft Xbox Series X with ventilation and storage solutions' },
              { type: 'Custom' as const, label: 'Custom Gaming Setup', description: 'Custom gaming system with specific requirements' },
            ].map((system) => {
              const isSelected = smartWallsData.gamingSystem?.type === system.type;
              return (
                <motion.button
                  key={String(system.type ?? 'None')}
                  onClick={() => commitSmartWalls({ gamingSystem: { ...smartWallsData.gamingSystem, type: system.type } })}
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isSelected ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200' : 'bg-white border-stone-200 hover:border-stone-300'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3"><div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div></div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isSelected ? 'bg-leather-600' : 'bg-leather-100'}`}>
                    <Gamepad2 className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-leather-600'}`} />
                  </div>
                  <h3 className="font-bold text-mocha-950 text-lg mb-2">{system.label}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{system.description}</p>
                </motion.button>
              );
            })}
          </div>

          {smartWallsData.gamingSystem?.type === 'Custom' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-mocha-950 mb-4">Custom Gaming System Specifications</h3>
              <textarea
                value={smartWallsData.gamingSystem?.specifications || ''}
                onChange={(e) => commitSmartWalls({ gamingSystem: { ...smartWallsData.gamingSystem, specifications: e.target.value } })}
                placeholder="Please describe your custom gaming system requirements, including hardware specifications, display preferences, and any special installation needs..."
                className="w-full h-32 px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all resize-none"
              />
            </motion.div>
          )}
        </motion.section>
      )}
    </motion.div>
  );
}

