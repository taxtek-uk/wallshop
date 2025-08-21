import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tv, Volume2, Lightbulb, Plus, Check, Zap, Shield, Info, 
  ChevronDown, Settings, Ruler, Home, Building, MapPin, Grid,
  Wrench, CheckCircle, Monitor, Speaker, Palette, ArrowLeft,
  Mountain, Layers, Square, Eye, Calculator,
  Tablet, Lock, Camera, Thermometer, Search, Filter,
  Wifi, Router, Smartphone, Gamepad2, AlertTriangle
} from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { SmartWallsFormData, DimensionalCalculation, TextureCategory, SmartDevice } from '@/types/quote';

// Using SmartWallsFormData from '@/types/quote' directly to avoid duplicate type definitions

function calculateMaxWallDimensions(
  width: number, 
  height: number, 
  depth: string,
  hasTV: boolean
): DimensionalCalculation {
  const warnings: string[] = [];
  let isValid = true;

  // Validate TV depth requirement
  if (hasTV && (depth === '120mm' || depth === '150mm')) {
    warnings.push('TV modules require minimum 180mm depth');
    isValid = false;
  }

  // Standard modules in descending order for optimal configuration
  const standardModules = [1000, 900, 800, 400]; // in mm
  const widthMm = width * 1000; // convert to mm
  
  let remainingWidth = widthMm;
  const modules: Array<{ size: number; count: number }> = [];
  
  // Calculate optimal module configuration
  for (const moduleSize of standardModules) {
    if (remainingWidth >= moduleSize) {
      const count = Math.floor(remainingWidth / moduleSize);
      if (count > 0) {
        modules.push({ size: moduleSize, count });
        remainingWidth -= count * moduleSize;
      }
    }
  }
  
  // Calculate actual achievable width
  const achievableWidthMm = widthMm - remainingWidth;
  const maxWidth = achievableWidthMm / 1000; // convert back to meters
  
  if (remainingWidth > 0) {
    warnings.push(`${remainingWidth}mm cannot be accommodated with standard modules`);
  }

  return {
    maxWidth,
    modules,
    warnings,
    isValid: isValid && remainingWidth === 0
  };
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
      { id: 4, name: "Brass Luxe", img: "/images/carbon-rock-boards/mirror/4.jpg", desc: "Premium brass mirror with sophisticated appeal" },
      { id: 5, name: "Silver Chrome", img: "/images/carbon-rock-boards/mirror/5.jpg", desc: "Classic chrome mirror for modern spaces" },
      { id: 6, name: "Titanium Shine", img: "/images/carbon-rock-boards/mirror/6.jpg", desc: "Contemporary titanium mirror with subtle depth" }
    ]
  }
];

// Gaming systems
const gamingSystems = [
  { value: 'PlayStation', label: 'PlayStation 5', description: 'Latest PlayStation console with 4K gaming' },
  { value: 'Xbox', label: 'Xbox Series X', description: 'Microsoft\'s flagship gaming console' },
  { value: 'Nintendo', label: 'Nintendo Switch', description: 'Versatile handheld and docked gaming' },
  { value: 'PC Setup', label: 'PC Gaming Setup', description: 'Custom PC gaming configuration' },
  { value: 'Custom', label: 'Custom Gaming System', description: 'Specify your custom requirements' }
];

export default function StepSmartWalls() {
  const { state, updateProductData } = useQuote();
  const smartWallsData = (state.formData.smartWalls || {
    dimensions: { width: 0, height: 2.1, depth: '180mm', calculatedMaxWidth: 0 },
    selectedStyle: { category: '', categoryId: '', finish: '', finishId: '', finishImage: '', finishDescription: '' },
    accessories: { tv: false, fireplace: false, soundbar: false, shelving: false },
    smartDevices: { selectedDevices: [], controlPanels: false, securitySensors: false, homeAutomation: false },
    gamingSystem: { type: null },
    tvIntegration: false, speakers: false, lighting: false, additionalFeatures: []
  }) as SmartWallsFormData;

  // State for multi-step flow with tabs
  const [activeSection, setActiveSection] = useState<'dimensions' | 'style' | 'accessories' | 'devices' | 'gaming'>('dimensions');
  const [isStyleDetailView, setIsStyleDetailView] = useState(false);
  const [selectedStyleCategory, setSelectedStyleCategory] = useState<TextureCategory | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<any>(null);
  const [deviceSearchTerm, setDeviceSearchTerm] = useState('');
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState('all');
  const [showConfirmationPopup, setShowConfirmationPopup] = useState<'accessories' | 'devices' | null>(null);

  // Validation states
  const [dimensionErrors, setDimensionErrors] = useState<{width?: string; height?: string}>({});

  const dimensionalCalculation = useMemo(() => {
    if (smartWallsData.dimensions?.width > 0) {
      return calculateMaxWallDimensions(
        smartWallsData.dimensions.width,
        smartWallsData.dimensions.height || 2.1,
        smartWallsData.dimensions.depth || '180mm',
        smartWallsData.accessories?.tv || false
      );
    }
    return { maxWidth: 0, modules: [], warnings: [], isValid: false };
  }, [smartWallsData.dimensions, smartWallsData.accessories?.tv]);

  const handleFieldChange = (field: keyof SmartWallsFormData, value: any) => {
    const updatedData = { ...smartWallsData, [field]: value };
    updateProductData('smart-walls', updatedData);
  };

  const handleDimensionsChange = (field: string, value: any) => {
    const newDimensions = { ...smartWallsData.dimensions, [field]: value };
    
    // Validation
    const errors: {width?: string; height?: string} = {};
    
    if (field === 'width') {
      const widthMm = value * 1000;
      if (value < 1 || widthMm < 1000) {
        errors.width = 'Width must be at least 1000mm (1.0m)';
      } else if (widthMm > 6000) {
        errors.width = 'Our standard system supports up to 6.0 metres. For larger walls, please consider a custom quotation by our representative.';
      }
    }
    
    if (field === 'height') {
      const heightMm = value * 1000;
      if (value < 2.2 || heightMm < 2200) {
        errors.height = 'Height must be at least 2200mm (2.2m)';
      } else if (heightMm > 4000) {
        errors.height = 'Height cannot exceed 4000mm (4.0m)';
      }
    }
    
    setDimensionErrors(errors);
    
    // Update dimensions even if there are errors (for real-time feedback)
    newDimensions.calculatedMaxWidth = dimensionalCalculation.maxWidth;
    handleFieldChange('dimensions', newDimensions);
  };

  const handleStyleCategoryClick = (category: TextureCategory) => {
    setSelectedStyleCategory(category);
    setIsStyleDetailView(true);
  };

  const handleFinishSelect = (finish: any) => {
    setSelectedFinish(finish);
    const selectedStyle = {
      category: selectedStyleCategory?.name || '',
      categoryId: selectedStyleCategory?.id || '',
      finish: finish.name,
      finishId: finish.id.toString(),
      finishImage: finish.img,
      finishDescription: finish.desc
    };
    handleFieldChange('selectedStyle', selectedStyle);
    
    // Auto-scroll to bottom and reveal next button
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 300);
  };

  const handleAccessoryToggle = (accessory: keyof NonNullable<SmartWallsFormData['accessories']>) => {
    const newAccessories = {
      ...smartWallsData.accessories,
      [accessory]: !smartWallsData.accessories?.[accessory]
    };
    handleFieldChange('accessories', newAccessories);
  };

  const handleDeviceToggle = (device: SmartDevice) => {
    const currentDevices = smartWallsData.smartDevices?.selectedDevices || [];
    const isSelected = currentDevices.some(d => d.name === device.name);
    
    let newDevices;
    if (isSelected) {
      newDevices = currentDevices.filter(d => d.name !== device.name);
    } else {
      newDevices = [...currentDevices, { name: device.name, category: device.category }];
    }
    
    const newSmartDevices = {
      ...smartWallsData.smartDevices,
      selectedDevices: newDevices
    };
    handleFieldChange('smartDevices', newSmartDevices);
  };

  const handleGamingSystemSelect = (system: string) => {
    const newGamingSystem = { ...smartWallsData.gamingSystem, type: system as any };
    handleFieldChange('gamingSystem', newGamingSystem);
  };

  // Check if dimensions are valid
  const isDimensionsValid = () => {
    const width = smartWallsData.dimensions?.width || 0;
    const height = smartWallsData.dimensions?.height || 0;
    const widthMm = width * 1000;
    const heightMm = height * 1000;
    
    return widthMm >= 1000 && widthMm <= 6000 && heightMm >= 2200 && heightMm <= 4000 && Object.keys(dimensionErrors).length === 0;
  };

  // Check if style is selected
  const isStyleSelected = () => {
    return smartWallsData.selectedStyle?.finish && smartWallsData.selectedStyle?.category;
  };

  // Check if accessories are selected
  const hasAccessoriesSelected = () => {
    const accessories = smartWallsData.accessories;
    return accessories?.tv || accessories?.fireplace || accessories?.soundbar || accessories?.shelving;
  };

  // Check if smart devices are selected
  const hasSmartDevicesSelected = () => {
    return (smartWallsData.smartDevices?.selectedDevices?.length || 0) > 0;
  };

  // Filter devices
  const filteredDevices = deviceCatalog.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(deviceSearchTerm.toLowerCase()) ||
                         device.category.toLowerCase().includes(deviceSearchTerm.toLowerCase());
    const matchesCategory = selectedDeviceCategory === 'all' || device.category === selectedDeviceCategory;
    return matchesSearch && matchesCategory;
  });

  const deviceCategories = ['all', ...Array.from(new Set(deviceCatalog.map(d => d.category)))];

  const handleNextSection = (from: string, to: string) => {
    if (from === 'accessories' && !hasAccessoriesSelected()) {
      setShowConfirmationPopup('accessories');
      return;
    }
    if (from === 'devices' && !hasSmartDevicesSelected()) {
      setShowConfirmationPopup('devices');
      return;
    }
    setActiveSection(to as any);
  };

  const handleConfirmationResponse = (confirmed: boolean, type: 'accessories' | 'devices') => {
    setShowConfirmationPopup(null);
    if (confirmed) {
      if (type === 'accessories') {
        setActiveSection('devices');
      } else if (type === 'devices') {
        setActiveSection('gaming');
      }
    }
  };

  // Tab navigation data
  const tabs = [
    { id: 'dimensions', label: 'Dimensions', icon: Ruler, completed: isDimensionsValid() },
    { id: 'style', label: 'Style', icon: Palette, completed: isStyleSelected() },
    { id: 'accessories', label: 'Accessories', icon: Plus, completed: hasAccessoriesSelected() },
    { id: 'devices', label: 'Smart Devices', icon: Zap, completed: hasSmartDevicesSelected() },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, completed: !!smartWallsData.gamingSystem?.type }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirmationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-mocha-950">
                  {showConfirmationPopup === 'accessories' 
                    ? "Are you sure you don't want to integrate any accessory into your smart wall?"
                    : "Are you sure you don't want to integrate any Smart Device into your smart wall?"
                  }
                </h3>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handleConfirmationResponse(false, showConfirmationPopup)}
                    className="flex-1 px-6 py-3 bg-stone-200 hover:bg-stone-300 rounded-xl font-semibold text-mocha-950 transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => handleConfirmationResponse(true, showConfirmationPopup)}
                    className="flex-1 px-6 py-3 bg-leather-600 hover:bg-leather-700 rounded-xl font-semibold text-white transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-leather-600 to-leather-700 rounded-2xl shadow-lg"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-mocha-950 tracking-tight">Smart Walls Configuration</h1>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Configure your premium smart wall system with integrated technology and custom finishes.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border border-stone-200 rounded-2xl p-2 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => {
            const IconComponent = tab.icon;
            const isActive = activeSection === tab.id;
            const isAccessible = index === 0 || tabs[index - 1].completed;
            
            return (
              <button
                key={tab.id}
                onClick={() => isAccessible ? setActiveSection(tab.id as any) : null}
                disabled={!isAccessible}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-leather-600 text-white shadow-md'
                    : isAccessible
                    ? 'bg-stone-100 text-mocha-950 hover:bg-stone-200'
                    : 'bg-stone-50 text-stone-400 cursor-not-allowed'
                } ${tab.completed && !isActive ? 'ring-2 ring-green-200' : ''}`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.completed && !isActive && (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wall Dimensions Section */}
      {activeSection === 'dimensions' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-leather-100 rounded-lg flex items-center justify-center">
              <Ruler className="w-6 h-6 text-leather-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-mocha-950">Wall Dimensions</h2>
              <p className="text-stone-600">
                Start by entering your wall dimensions to get personalized module recommendations.
              </p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Dimension Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">
                  Width (meters) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1.0"
                  max="10"
                  value={smartWallsData.dimensions?.width || ''}
                  onChange={(e) => handleDimensionsChange('width', parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200 ${
                    dimensionErrors.width ? 'border-red-300 bg-red-50' : 'border-stone-300'
                  }`}
                  placeholder="e.g., 3.5"
                />
                {dimensionErrors.width && (
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {dimensionErrors.width}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">
                  Height (meters) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="2.2"
                  max="4.0"
                  value={smartWallsData.dimensions?.height || 2.1}
                  onChange={(e) => handleDimensionsChange('height', parseFloat(e.target.value) || 2.1)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200 ${
                    dimensionErrors.height ? 'border-red-300 bg-red-50' : 'border-stone-300'
                  }`}
                  placeholder="e.g., 2.4"
                />
                {dimensionErrors.height && (
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {dimensionErrors.height}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-mocha-950">
                  Depth
                </label>
                <select
                  value={smartWallsData.dimensions?.depth || '180mm'}
                  onChange={(e) => handleDimensionsChange('depth', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200"
                >
                  <option value="120mm">120mm</option>
                  <option value="150mm">150mm</option>
                  <option value="180mm">180mm (Recommended)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            {/* Custom Depth Input */}
            {smartWallsData.dimensions?.depth === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-mocha-950">
                  Custom Depth (mm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="300"
                  value={smartWallsData.dimensions?.customDepth || ''}
                  onChange={(e) => handleDimensionsChange('customDepth', parseInt(e.target.value) || 0)}
                  className="w-full max-w-xs px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200"
                  placeholder="e.g., 200"
                />
              </motion.div>
            )}

            {/* Calculation Results */}
            {smartWallsData.dimensions?.width > 0 && isDimensionsValid() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-leather-50 to-leather-50 border border-leather-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-5 h-5 text-leather-600" />
                  <h3 className="font-bold text-leather-900">Calculation Results</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-leather-700">Maximum Achievable Width</p>
                    <p className="text-2xl font-bold text-leather-900">
                      {dimensionalCalculation.maxWidth.toFixed(2)}m
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-leather-700">Module Configuration</p>
                    <div className="space-y-1">
                      {dimensionalCalculation.modules.map((module, index) => (
                        <p key={index} className="text-sm text-leather-800">
                          {module.count}× {module.size}mm modules
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Warnings */}
                {dimensionalCalculation.warnings.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-800">Warnings</span>
                    </div>
                    {dimensionalCalculation.warnings.map((warning, index) => (
                      <p key={index} className="text-sm text-red-700">{warning}</p>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Next Button */}
            {isDimensionsValid() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <button
                  onClick={() => setActiveSection('style')}
                  className="px-8 py-3 bg-leather-600 hover:bg-leather-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  Next: Choose Style
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* Style Selection Section */}
      {activeSection === 'style' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-leather-600" />
            </div>
            <h2 className="text-xl font-bold text-mocha-950">Style Selection</h2>
          </div>

          {/* Display all styles/finishes with category headings in one screen */}
          <div className="space-y-8">
            {textureCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-stone-200">
                    <div className={`w-8 h-8 bg-${category.accent} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-4 h-4 text-leather-600" />
                    </div>
                    <h3 className="text-lg font-bold text-mocha-950">{category.name}</h3>
                    <span className="text-sm text-stone-500">({category.panels.length} options)</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {category.panels.map((finish) => {
                      const isSelected = smartWallsData.selectedStyle?.finishId === finish.id.toString() && 
                                        smartWallsData.selectedStyle?.categoryId === category.id;
                      return (
                        <motion.button
                          key={`${category.id}-${finish.id}`}
                          onClick={() => {
                            const selectedStyle = {
                              category: category.name,
                              categoryId: category.id,
                              finish: finish.name,
                              finishId: finish.id.toString(),
                              finishImage: finish.img,
                              finishDescription: finish.desc
                            };
                            handleFieldChange('selectedStyle', selectedStyle);
                          }}
                          className={`group relative p-3 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                            isSelected
                              ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200'
                              : 'bg-white border-stone-200 hover:border-stone-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 z-10">
                              <div className="w-5 h-5 bg-leather-600 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}

                          <div className="w-full h-20 bg-stone-200 rounded-lg mb-2 overflow-hidden">
                            <img 
                              src={finish.img} 
                              alt={finish.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                          
                          <h4 className="font-semibold text-mocha-950 text-xs mb-1">{finish.name}</h4>
                          <p className="text-xs text-stone-600 leading-tight line-clamp-2">{finish.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Button */}
          {isStyleSelected() && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end pt-6"
            >
              <button
                onClick={() => setActiveSection('accessories')}
                className="px-8 py-3 bg-leather-600 hover:bg-leather-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                Next: Choose Accessories
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </motion.div>
          )}
        </motion.section>
      )}

      {/* Accessories Section */}
      {activeSection === 'accessories' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-leather-600" />
            </div>
            <h2 className="text-xl font-bold text-mocha-950">Accessories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                key: 'tv', 
                label: 'TV Integration', 
                icon: Tv, 
                description: 'Integrated TV mounting and cable management',
                popular: true 
              },
              { 
                key: 'fireplace', 
                label: 'Fireplace', 
                icon: Home, 
                description: 'Electric fireplace integration with smart controls' 
              },
              { 
                key: 'soundbar', 
                label: 'Soundbar', 
                icon: Speaker, 
                description: 'Premium audio integration with hidden wiring' 
              },
              { 
                key: 'shelving', 
                label: 'Shelving', 
                icon: Layers, 
                description: 'Floating shelves with integrated lighting' 
              }
            ].map((accessory) => {
              const IconComponent = accessory.icon;
              const isSelected = smartWallsData.accessories?.[accessory.key] || false;
              
              return (
                <motion.button
                  key={accessory.key}
                  onClick={() => handleAccessoryToggle(accessory.key as keyof NonNullable<SmartWallsFormData['accessories']>)}
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected
                      ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {accessory.popular && !isSelected && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Popular
                      </span>
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isSelected ? 'bg-leather-600 shadow-md' : 'bg-leather-100 group-hover:bg-leather-200'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-leather-600'}`} />
                  </div>

                  <h3 className="font-bold text-mocha-950 text-lg mb-2">{accessory.label}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{accessory.description}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-6">
            <button
              onClick={() => handleNextSection('accessories', 'devices')}
              className="px-8 py-3 bg-leather-600 hover:bg-leather-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              Next: Choose Smart Device
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </motion.section>
      )}

      {/* Smart Devices Section */}
      {activeSection === 'devices' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-leather-600" />
            </div>
            <h2 className="text-xl font-bold text-mocha-950">Smart Devices</h2>
          </div>

          {/* Device Search and Filter */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={deviceSearchTerm}
                  onChange={(e) => setDeviceSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <select
                  value={selectedDeviceCategory}
                  onChange={(e) => setSelectedDeviceCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200 bg-white"
                >
                  {deviceCategories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Device Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => {
              const IconComponent = device.icon;
              const isSelected = smartWallsData.smartDevices?.selectedDevices?.some(d => d.name === device.name) || false;
              
              return (
                <motion.button
                  key={device.name}
                  onClick={() => handleDeviceToggle(device)}
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected
                      ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {device.popular && !isSelected && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Popular
                      </span>
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isSelected ? 'bg-leather-600 shadow-md' : 'bg-leather-100 group-hover:bg-leather-200'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-leather-600'}`} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-mocha-950 text-lg">{device.name}</h3>
                    <p className="text-xs text-leather-600 font-medium">{device.category}</p>
                    <p className="text-stone-600 text-sm leading-relaxed">{device.description}</p>
                    
                    <div className="space-y-1">
                      {device.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Next Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            {hasSmartDevicesSelected() && (
              <>
                <button
                  onClick={() => setActiveSection('gaming')}
                  className="px-6 py-3 bg-leather-600 hover:bg-leather-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  Next: Choose Gaming System
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
               
              </>
            )}
            {!hasSmartDevicesSelected() && (
              <button
                onClick={() => handleNextSection('devices', 'gaming')}
                className="px-8 py-3 bg-leather-600 hover:bg-leather-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                Continue
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            )}
          </div>
        </motion.section>
      )}

      {/* Gaming System Section */}
      {activeSection === 'gaming' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-leather-600" />
            </div>
            <h2 className="text-xl font-bold text-mocha-950">Gaming System</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamingSystems.map((system) => {
              const isSelected = smartWallsData.gamingSystem?.type === system.value;
              
              return (
                <motion.button
                  key={system.value}
                  onClick={() => handleGamingSystemSelect(system.value)}
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected
                      ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200'
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

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isSelected ? 'bg-leather-600 shadow-md' : 'bg-leather-100 group-hover:bg-leather-200'
                  }`}>
                    <Gamepad2 className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-leather-600'}`} />
                  </div>

                  <h3 className="font-bold text-mocha-950 text-lg mb-2">{system.label}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{system.description}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Custom Gaming System Specifications */}
          {smartWallsData.gamingSystem?.type === 'Custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-bold text-mocha-950 mb-4">Custom Gaming System Specifications</h3>
              <textarea
                value={smartWallsData.gamingSystem?.specifications || ''}
                onChange={(e) => handleFieldChange('gamingSystem', { 
                  ...smartWallsData.gamingSystem, 
                  specifications: e.target.value 
                })}
                placeholder="Please describe your custom gaming system requirements, including hardware specifications, display preferences, and any special installation needs..."
                className="w-full h-32 px-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200 resize-none"
              />
            </motion.div>
          )}

          {/* Next Button */}
          {smartWallsData.gamingSystem?.type && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end pt-6"
            >
               
            </motion.div>
          )}
        </motion.section>
      )}
    </motion.div>
  );
}