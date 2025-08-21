import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv, Lightbulb, Plus, Check, Zap, Palette, ArrowLeft,
  Mountain, Layers, Square, Calculator, Tablet, Lock, Camera,
  Thermometer, Search, Filter, Gamepad2, AlertTriangle, ChevronRight
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { SmartWallsFormData, DimensionalCalculation, TextureCategory, SmartDevice } from '@/types/quote';

type SectionId = 'dimensions' | 'styles' | 'accessories' | 'devices' | 'gaming';
type SectionItem = { id: SectionId; title: string; icon: LucideIcon };

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
      { id: 10, name: "Sunbleached Timber", img: "/images/carbon-rock-boards/wood/10.jpg", desc: "Light grey-brown tone like weathered wood" },
      { id: 11, name: "Rosewood Brown", img: "/images/carbon-rock-boards/wood/11.jpg", desc: "Warm reddish grain like tropical rosewood" },
      { id: 12, name: "Whitewashed Oak", img: "/images/carbon-rock-boards/wood/12.jpg", desc: "Pale oak with a whitewashed soft grain" },
      { id: 13, name: "Hazel Beech", img: "/images/carbon-rock-boards/wood/13.jpg", desc: "Light beech finish with smooth texture" },
      { id: 14, name: "Dark Walnut", img: "/images/carbon-rock-boards/wood/14.jpg", desc: "Strong walnut character with deep tones" },
      { id: 15, name: "Bamboo Slate", img: "/images/carbon-rock-boards/wood/15.jpg", desc: "Neutral bamboo-inspired texture in muted finish" },
      { id: 16, name: "Ash Greywood", img: "/images/carbon-rock-boards/wood/16.jpg", desc: "Soft ash grain with light grey overtone" },
      { id: 17, name: "Ivory Elm", img: "/images/carbon-rock-boards/wood/17.jpg", desc: "Smooth ivory tone with linear elm grain" },
      { id: 18, name: "Toasted Mahogany", img: "/images/carbon-rock-boards/wood/18.jpg", desc: "Dark toasted tone with rich mahogany grain" },
      { id: 19, name: "Copperwood", img: "/images/carbon-rock-boards/wood/19.jpg", desc: "Copper-tinged finish with clean grain lines" },
      { id: 20, name: "Chestnut Brown", img: "/images/carbon-rock-boards/wood/20.jpg", desc: "Balanced brown chestnut-inspired finish" }
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
      { id: 10, name: "Slate Blue", img: "/images/carbon-rock-boards/solid/10.jpg", desc: "Dark blue-grey with a sophisticated edge" },
      { id: 11, name: "Ivory", img: "/images/carbon-rock-boards/solid/11.jpg", desc: "Soft ivory tone perfect for elegant settings" },
      { id: 12, name: "Desert Sand", img: "/images/carbon-rock-boards/solid/12.jpg", desc: "Warm tan reminiscent of natural sands" },
      { id: 13, name: "Steel Grey", img: "/images/carbon-rock-boards/solid/13.jpg", desc: "Robust mid-grey with urban vibes" },
      { id: 14, name: "Charcoal Navy", img: "/images/carbon-rock-boards/solid/14.jpg", desc: "Deep navy blend with a charcoal base" },
      { id: 15, name: "Obsidian", img: "/images/carbon-rock-boards/solid/15.jpg", desc: "Matte black with premium depth and richness" },
      { id: 16, name: "Fog Silver", img: "/images/carbon-rock-boards/solid/16.jpg", desc: "Light grey with misty undertones" },
      { id: 17, name: "Pearl Cream", img: "/images/carbon-rock-boards/solid/17.jpg", desc: "Soft pearl-beige tone for warm ambience" },
      { id: 18, name: "Lavender Smoke", img: "/images/carbon-rock-boards/solid/18.jpg", desc: "Cool tone with leather-grey transitions" },
      { id: 19, name: "Silken Stone", img: "/images/carbon-rock-boards/solid/19.jpg", desc: "Light sandy grey with smooth finish" },
      { id: 20, name: "Deep leather", img: "/images/carbon-rock-boards/solid/20.jpg", desc: "Bold leather hue ideal for rich feature walls" }
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
      { id: 10, name: "T3202", img: "/images/carbon-rock-boards/stone/10.jpg", desc: "Stone texture T3202" },
      { id: 11, name: "T3203", img: "/images/carbon-rock-boards/stone/11.jpg", desc: "Stone texture T3203" },
      { id: 12, name: "T3204", img: "/images/carbon-rock-boards/stone/12.jpg", desc: "Stone texture T3204" },
      { id: 13, name: "T3205", img: "/images/carbon-rock-boards/stone/13.jpg", desc: "Stone texture T3205" },
      { id: 14, name: "T3206", img: "/images/carbon-rock-boards/stone/14.jpg", desc: "Stone texture T3206" },
      { id: 15, name: "T3207", img: "/images/carbon-rock-boards/stone/15.jpg", desc: "Stone texture T3207" },
      { id: 16, name: "S239-2", img: "/images/carbon-rock-boards/stone/16.jpg", desc: "Stone texture S239-2" },
      { id: 17, name: "Z7030", img: "/images/carbon-rock-boards/stone/17.jpg", desc: "Stone texture Z7030" },
      { id: 18, name: "S240", img: "/images/carbon-rock-boards/stone/18.jpg", desc: "Stone texture S240" },
      { id: 19, name: "S3004", img: "/images/carbon-rock-boards/stone/19.jpg", desc: "Stone texture S3004" }
    ]
  },
  {
    id: 'fabric',
    name: "Cloth Pattern Series",
    desc: "Soft textile pattern with acoustic value, premium quality.",
    icon: Palette,
    img: "/images/carbon-rock-boards/cloth.jpg",
    color: "from-neutral-100 to-stone-100",
    accent: "neutral-600",
    panels: [
      { id: 1, name: "Linen Weave", img: "/images/carbon-rock-boards/fabric/1.jpg", desc: "Linen Weave texture for contemporary interior walls" },
      { id: 2, name: "Denim Texture", img: "/images/carbon-rock-boards/fabric/2.jpg", desc: "Denim Texture texture for contemporary interior walls" },
      { id: 3, name: "Chambray Grid", img: "/images/carbon-rock-boards/fabric/3.jpg", desc: "Chambray Grid texture for contemporary interior walls" },
      { id: 4, name: "Ivory Cotton", img: "/images/carbon-rock-boards/fabric/4.jpg", desc: "Ivory Cotton texture for contemporary interior walls" },
      { id: 5, name: "Silver Mesh", img: "/images/carbon-rock-boards/fabric/5.jpg", desc: "Silver Mesh texture for contemporary interior walls" },
      { id: 6, name: "Soft Gauze", img: "/images/carbon-rock-boards/fabric/6.jpg", desc: "Soft Gauze texture for contemporary interior walls" },
      { id: 7, name: "Contrast Linen Panel", img: "/images/carbon-rock-boards/fabric/7.jpg", desc: "Contrast Linen Panel texture for contemporary interior walls" },
      { id: 8, name: "Beige Canvas", img: "/images/carbon-rock-boards/fabric/8.jpg", desc: "Beige Canvas texture for contemporary interior walls" },
      { id: 9, name: "Rice Grain Weave", img: "/images/carbon-rock-boards/fabric/9.jpg", desc: "Rice Grain Weave texture for contemporary interior walls" },
      { id: 10, name: "Crosshatch Blend", img: "/images/carbon-rock-boards/fabric/10.jpg", desc: "Crosshatch Blend texture for contemporary interior walls" },
      { id: 11, name: "Alabaster Cotton", img: "/images/carbon-rock-boards/fabric/11.jpg", desc: "Alabaster Cotton texture for contemporary interior walls" },
      { id: 12, name: "Khaki Hemp", img: "/images/carbon-rock-boards/fabric/12.jpg", desc: "Khaki Hemp texture for contemporary interior walls" },
      { id: 13, name: "Pebble Mesh", img: "/images/carbon-rock-boards/fabric/13.jpg", desc: "Pebble Mesh texture for contemporary interior walls" },
      { id: 14, name: "Cream Wool", img: "/images/carbon-rock-boards/fabric/14.jpg", desc: "Cream Wool texture for contemporary interior walls" },
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
      { id: 1, name: "Brushed Bronze", img: "/images/carbon-rock-boards/metal/1.jpg", desc: "Elegant bronze with a brushed satin finish" },
      { id: 2, name: "Antique Copper", img: "/images/carbon-rock-boards/metal/2.jpg", desc: "Warm copper tone with vintage character" },
      { id: 3, name: "Champagne Gold", img: "/images/carbon-rock-boards/metal/3.jpg", desc: "Subtle golden shimmer with soft elegance" },
      { id: 4, name: "Urban Brass", img: "/images/carbon-rock-boards/metal/4.jpg", desc: "Contemporary brass with matte warmth" },
      { id: 5, name: "Mirror Silver", img: "/images/carbon-rock-boards/metal/5.jpg", desc: "Sleek silver chrome for high reflectivity" },
      { id: 6, name: "Satin Titanium", img: "/images/carbon-rock-boards/metal/6.jpg", desc: "Modern titanium finish with silky texture" }
    ]
  },
  {
    id: 'mirror',
    name: "Mirror Series",
    desc: "Reflective brilliance with a sleek, high-gloss finish.",
    icon: Square,
    img: "/images/carbon-rock-boards/mirror.jpg",
    color: "from-blue-100 to-leather-100",
    accent: "blue-600",
    panels: [
      { id: 1, name: "Bronze Mirror", img: "/images/carbon-rock-boards/mirror/1.jpg", desc: "Warm bronze-tinted mirror with elegant shine" },
      { id: 2, name: "Copper Reflection", img: "/images/carbon-rock-boards/mirror/2.jpg", desc: "Vintage copper tone with smooth mirrored surface" },
      { id: 3, name: "Golden Glow", img: "/images/carbon-rock-boards/mirror/3.jpg", desc: "Champagne gold mirror finish with rich sheen" },
      { id: 4, name: "Brass Luxe", img: "/images/carbon-rock-boards/mirror/4.jpg", desc: "Sophisticated brass mirror with premium appeal" },
      { id: 5, name: "Silver Shine", img: "/images/carbon-rock-boards/mirror/5.jpg", desc: "Classic silver mirror with crystal-clear reflection" },
      { id: 6, name: "Titanium Gleam", img: "/images/carbon-rock-boards/mirror/6.jpg", desc: "Modern titanium mirror with subtle metallic tone" }
    ]
  }
];

// Reusable confirmation dialog
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

type Props = {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
};

const StepSmartWalls: React.FC<Props> = ({ activeSection, setActiveSection }) => {
  const { state, updateSmartWallsFormData } = useQuote();
  const smartWallsData: SmartWallsFormData = state.formData.smartWalls || ({} as SmartWallsFormData);

  // Local UI state (NO shadowing of props)
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

  const commitSmartWalls = (patch: Partial<SmartWallsFormData>) => {
    updateSmartWallsFormData(patch);
  };

  const handleDimensionsChange = (field: keyof NonNullable<SmartWallsFormData['dimensions']>, value: any) => {
    const current = smartWallsData.dimensions || {};
    commitSmartWalls({ dimensions: { ...current, [field]: value } });
  };

  const handleStyleCategoryClick = (category: TextureCategory) => {
    setSelectedStyleCategory(category);
    setIsStyleDetailView(true);
  };

  const handleFinishSelect = (finish: { id: number; name: string; img: string; desc: string }) => {
    const currentFinishId = smartWallsData.style?.finish?.id || smartWallsData.selectedStyle?.finishId;
    const currentCategoryId = smartWallsData.style?.category || smartWallsData.selectedStyle?.categoryId;

    if (currentFinishId === String(finish.id) && currentCategoryId === selectedStyleCategory?.id) {
      commitSmartWalls({
        style: { category: undefined, categoryName: undefined, finish: undefined },
        selectedStyle: { category: '', categoryId: '', finish: '', finishId: '', finishImage: '', finishDescription: '' },
      });
      return;
    }

    commitSmartWalls({
      style: { category: selectedStyleCategory?.id, categoryName: selectedStyleCategory?.name, finish },
      selectedStyle: {
        category: selectedStyleCategory?.name || '',
        categoryId: selectedStyleCategory?.id || '',
        finish: finish.name,
        finishId: String(finish.id),
        finishImage: finish.img,
        finishDescription: finish.desc,
      },
    });

    setTimeout(() => setActiveSection('accessories'), 400);
  };

  const handleAccessoryToggle = (accessoryKey: keyof NonNullable<SmartWallsFormData['accessories']>) => {
    const current = smartWallsData.accessories || {};
    const updated = { ...current, [accessoryKey]: !current[accessoryKey] };

    commitSmartWalls({ accessories: updated, skippedAccessories: false });

    const hasAny = Object.values(updated).some(Boolean);

    if (!hasAny && current[accessoryKey]) {
      setConfirmationDialog({
        isOpen: true,
        type: 'accessories',
        title: 'Skip Accessories?',
        message: "Are you sure you don't want any accessories? Accessories enhance the Smart Wall experience.",
        confirmText: 'Yes, skip accessories',
        cancelText: 'Go back',
      });
    }
  };

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

    if (!isSelected) {
      setTimeout(() => setActiveSection('gaming'), 400);
    } else if (next.length === 0 && selectedDevices.length > 0) {
      setConfirmationDialog({
        isOpen: true,
        type: 'devices',
        title: 'Skip Smart Devices?',
        message: 'Are you sure you dont want any smart devices? The wall is only considered smart if it has accessories, smart devices, or both.',
        confirmText: 'Yes, skip devices',
        cancelText: 'Go back',
      });
    }
  };

  const handleConfirmationConfirm = () => {
    if (confirmationDialog.type === 'accessories') {
      commitSmartWalls({ skippedAccessories: true });
      setActiveSection('devices');
    } else if (confirmationDialog.type === 'devices') {
      commitSmartWalls({ skippedSmartDevices: true });
      setActiveSection('gaming');
    }
    setConfirmationDialog({ isOpen: false, type: null, title: '', message: '', confirmText: '', cancelText: '' });
  };
  const handleConfirmationCancel = () => {
    if (confirmationDialog.type === 'accessories') setActiveSection('accessories');
    if (confirmationDialog.type === 'devices') setActiveSection('devices');
    setConfirmationDialog({ isOpen: false, type: null, title: '', message: '', confirmText: '', cancelText: '' });
  };

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

  const sections: SectionItem[] = [
    { id: 'dimensions', title: 'Wall Dimensions', icon: Calculator },
    { id: 'styles',     title: 'Wall Style',       icon: Palette },
    { id: 'accessories',title: 'Accessories',      icon: Plus },
    { id: 'devices',    title: 'Smart Devices',    icon: Zap },
    { id: 'gaming',     title: 'Gaming Integration', icon: Gamepad2 }
  ];

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

      {/* Section Navigation */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-mocha-950">Smart Wall Configuration</h2>
          <p className="text-sm text-stone-600">Configure your smart wall step by step</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isActive ? 'bg-leather-600 text-white shadow-md' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{section.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dimensions */}
      {activeSection === 'dimensions' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-leather-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-leather-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-mocha-950">Available Wall Space</h2>
              <p className="text-stone-600">Please provide the dimensions of your available wall space. We'll calculate the optimal Smart Wall configuration for you.</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">Width (meters) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  step={0.1}
                  min={0.1}
                  max={10}
                  value={smartWallsData.dimensions?.width || ''}
                  onChange={(e) => handleDimensionsChange('width', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all"
                  placeholder="e.g., 3.5"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">Height (meters) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  step={0.1}
                  min={0.1}
                  max={5}
                  value={smartWallsData.dimensions?.height || ''}
                  onChange={(e) => handleDimensionsChange('height', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all"
                  placeholder="e.g., 2.6"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">Preferred Depth <span className="text-red-500">*</span></label>
                <select
                  value={smartWallsData.dimensions?.depth || '180mm'}
                  onChange={(e) => handleDimensionsChange('depth', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all bg-white"
                >
                  <option value="120mm">120mm (Slim Profile)</option>
                  <option value="150mm">150mm (Standard)</option>
                  <option value="180mm">180mm (Full Feature)</option>
                </select>
              </div>
            </div>

            {/* Dimensional Calculation Results */}
            {smartWallsData.dimensions?.width && smartWallsData.dimensions?.height && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gradient-to-br from-leather-50 to-leather-100 border border-leather-200 rounded-2xl p-6"
              >
                <h3 className="font-bold text-mocha-950 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-leather-600" />
                  Smart Wall Calculation Results
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-mocha-950 mb-2">Available Space</h4>
                    <div className="space-y-1 text-sm text-stone-700">
                      <p>Width: {smartWallsData.dimensions.width}m</p>
                      <p>Height: {smartWallsData.dimensions.height}m</p>
                      <p>Depth: {smartWallsData.dimensions.depth}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-mocha-950 mb-2">Optimal Smart Wall</h4>
                    <div className="space-y-1 text-sm text-stone-700">
                      <p>Max Width: {dimensionalCalculation.maxWidth.toFixed(1)}m</p>
                      <p>Height: {(smartWallsData.dimensions.height * 0.8).toFixed(1)}m</p>
                      <p>Final Depth: {smartWallsData.accessories?.tv ? '180mm' : smartWallsData.dimensions.depth}</p>
                    </div>
                  </div>
                </div>

                {dimensionalCalculation.warnings.length > 0 && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-1">Important Notes</h4>
                        <ul className="text-sm text-amber-700 space-y-1">
                          {dimensionalCalculation.warnings.map((warning, i) => (
                            <li key={i}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setActiveSection('styles')}
                disabled={!smartWallsData.dimensions?.width || !smartWallsData.dimensions?.height}
                className="flex items-center gap-2 px-6 py-3 bg-leather-600 text-white rounded-xl hover:bg-leather-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span>Next: Choose Style</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Style Selection */}
      {activeSection === 'styles' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {!isStyleDetailView ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-leather-600" />
                </div>
                <h2 className="text-xl font-bold text-mocha-950">Wall Style Selection</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {textureCategories.map((category) => {
                  const Icon = category.icon as any;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => handleStyleCategoryClick(category)}
                      className="group relative p-6 rounded-2xl border-2 border-stone-200 hover:border-stone-300 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-full h-32 bg-stone-200 rounded-lg mb-4 overflow-hidden">
                        <img src={category.img} alt={category.name} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-leather-100">
                        <Icon className="w-6 h-6 text-leather-600" />
                      </div>
                      <h3 className="font-bold text-mocha-950 text-lg mb-2">{category.name}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed">{category.desc}</p>
                    </motion.button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsStyleDetailView(false)} className="w-8 h-8 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center transition-colors">
                  <ArrowLeft className="w-4 h-4 text-stone-600" />
                </button>
                <h2 className="text-xl font-bold text-mocha-950">{selectedStyleCategory?.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedStyleCategory?.panels.map((finish) => {
                  const currentFinishId = smartWallsData.style?.finish?.id || smartWallsData.selectedStyle?.finishId;
                  const currentCategoryId = smartWallsData.style?.category || smartWallsData.selectedStyle?.categoryId;
                  const isSelected = currentFinishId === String(finish.id) && currentCategoryId === selectedStyleCategory?.id;

                  return (
                    <motion.button
                      key={finish.id}
                      onClick={() => handleFinishSelect(finish)}
                      className={`group relative p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                        isSelected ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200'
                                   : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
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
            </>
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
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200'
                               : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
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

          <div className="flex justify-end">
            <button
              onClick={() => setActiveSection('devices')}
              className="flex items-center gap-2 px-6 py-3 bg-leather-600 text-white rounded-xl hover:bg-leather-700 transition-all"
            >
              <span>Next: Smart Devices</span>
              <ChevronRight className="w-4 h-4" />
            </button>
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
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200'
                               : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
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

          <div className="flex justify-end">
            <button
              onClick={() => setActiveSection('gaming')}
              className="flex items-center gap-2 px-6 py-3 bg-leather-600 text-white rounded-xl hover:bg-leather-700 transition-all"
            >
              <span>Next: Gaming Integration</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200'
                               : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
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

          <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="font-bold text-mocha-950">Configuration Complete!</h3>
            </div>
            <p className="text-stone-600 mb-4">
              Your Smart Wall configuration is now complete. You can proceed to the next step to review your selections and submit your quote request.
            </p>
            <div className="text-sm text-stone-500">
              <p>• Wall dimensions and style selected</p>
              <p>• Accessories and smart devices configured</p>
              <p>• Gaming integration preferences set</p>
            </div>
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default StepSmartWalls;