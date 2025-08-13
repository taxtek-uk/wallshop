import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  User,
  Home,
  Ruler,
  MessageSquare,
  Star,
  Shield,
  Award,
  Sparkles,
  Calendar,
  ArrowRight,
  Zap,
  Heart,
  Users,
  Building2,
  Palette,
  Sun,
  Moon,
  Plus,
  Minus,
  Package,
  Layers,
  Settings,
  Tv,
  Lightbulb,
  Thermometer,
  Camera,
  Speaker,
  Wifi,
  Monitor,
  Smartphone,
  Tablet,
  Headphones,
  Router,
  Battery,
  Cable,
  Wrench,
  Hammer,
  Screwdriver,
  Drill,
  PaintBucket,
  Brush,
  Scissors,
  Tape,
  Level,
  MeasuringTape,
  HardHat,
  SafetyVest,
  Glasses,
  Gloves,
  Mask,
  FirstAid,
  Fire,
  Lock,
  Key,
  DoorOpen,
  Window,
  Blinds,
  Curtains,
  Fan,
  AirVent,
  Heater,
  Snowflake,
  Droplets,
  Umbrella,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudHail,
  CloudFog,
  CloudSun,
  CloudMoon,
  Sunrise,
  Sunset,
  TreePine,
  Flower,
  Leaf,
  Grass,
  Mountain,
  River,
  Lake,
  Ocean,
  Beach,
  Desert,
  Forest,
  Jungle,
  Cactus,
  Mushroom,
  Bug,
  Butterfly,
  Bird,
  Fish,
  Cat,
  Dog,
  Rabbit,
  Squirrel,
  Deer,
  Bear,
  Wolf,
  Fox,
  Lion,
  Tiger,
  Elephant,
  Giraffe,
  Zebra,
  Horse,
  Cow,
  Pig,
  Sheep,
  Goat,
  Chicken,
  Duck,
  Turkey,
  Penguin,
  Owl,
  Eagle,
  Hawk,
  Dove,
  Parrot,
  Flamingo,
  Swan,
  Peacock,
  Rooster,
  Hen,
  Chick,
  Egg,
  Nest,
  Feather,
  Paw,
  Bone,
  Collar,
  Leash,
  Bowl,
  Toy,
  Ball,
  Frisbee,
  Stick,
  Rope,
  Chain,
  Anchor,
  Boat,
  Ship,
  Plane,
  Car,
  Truck,
  Bus,
  Train,
  Bicycle,
  Motorcycle,
  Scooter,
  Skateboard,
  Roller,
  Skates,
  Ski,
  Snowboard,
  Surfboard,
  Kayak,
  Canoe,
  Raft,
  Paddle,
  Oar,
  Sail,
  Mast,
  Flag,
  Banner,
  Sign,
  Post,
  Pole,
  Fence,
  Gate,
  Bridge,
  Tunnel,
  Road,
  Path,
  Trail,
  Sidewalk,
  Crosswalk,
  Intersection,
  Corner,
  Curve,
  Hill,
  Valley,
  Cliff,
  Cave,
  Rock,
  Stone,
  Pebble,
  Sand,
  Dirt,
  Mud,
  Clay,
  Cement,
  Concrete,
  Brick,
  Wood,
  Metal,
  Glass,
  Plastic,
  Rubber,
  Fabric,
  Leather,
  Paper,
  Cardboard,
  Foam,
  Sponge,
  Cotton,
  Wool,
  Silk,
  Linen,
  Denim,
  Canvas,
  Velvet,
  Satin,
  Lace,
  Ribbon,
  Thread,
  Needle,
  Pin,
  Button,
  Zipper,
  Snap,
  Hook,
  Loop,
  Buckle,
  Belt,
  Strap,
  Handle,
  Knob,
  Switch,
  Lever,
  Pedal,
  Wheel,
  Gear,
  Spring,
  Hinge,
  Joint,
  Connector,
  Adapter,
  Plug,
  Socket,
  Outlet,
  Extension,
  Cord,
  Wire,
  Circuit,
  Board,
  Chip,
  Processor,
  Memory,
  Storage,
  Drive,
  Disk,
  Tape,
  CD,
  DVD,
  USB,
  SD,
  Flash,
  Card,
  Reader,
  Writer,
  Scanner,
  Printer,
  Copier,
  Fax,
  Modem,
  Hub,
  Switch as NetworkSwitch,
  Bridge as NetworkBridge,
  Gateway,
  Firewall,
  Server,
  Client,
  Terminal,
  Console,
  Keyboard,
  Mouse,
  Trackpad,
  Touchscreen,
  Stylus,
  Pen,
  Pencil,
  Marker,
  Highlighter,
  Eraser,
  Ruler as RulerIcon,
  Compass,
  Protractor,
  Calculator,
  Abacus,
  Scale,
  Balance,
  Weight,
  Measure,
  Gauge,
  Meter,
  Thermometer as ThermometerIcon,
  Barometer,
  Hygrometer,
  Anemometer,
  Seismometer,
  Geiger,
  Microscope,
  Telescope,
  Binoculars,
  Magnifier,
  Lens,
  Mirror,
  Prism,
  Crystal,
  Diamond,
  Gem,
  Pearl,
  Gold,
  Silver,
  Copper,
  Bronze,
  Iron,
  Steel,
  Aluminum,
  Titanium,
  Platinum,
  Lead,
  Tin,
  Zinc,
  Nickel,
  Chromium,
  Cobalt,
  Manganese,
  Tungsten,
  Uranium,
  Plutonium,
  Radium,
  Helium,
  Neon,
  Argon,
  Krypton,
  Xenon,
  Radon,
  Hydrogen,
  Oxygen,
  Nitrogen,
  Carbon,
  Silicon,
  Phosphorus,
  Sulfur,
  Chlorine,
  Fluorine,
  Bromine,
  Iodine,
  Sodium,
  Potassium,
  Calcium,
  Magnesium,
  Lithium,
  Beryllium,
  Boron,
  Scandium,
  Vanadium,
  Molybdenum,
  Technetium,
  Ruthenium,
  Rhodium,
  Palladium,
  Cadmium,
  Indium,
  Antimony,
  Tellurium,
  Cesium,
  Barium,
  Lanthanum,
  Cerium,
  Praseodymium,
  Neodymium,
  Promethium,
  Samarium,
  Europium,
  Gadolinium,
  Terbium,
  Dysprosium,
  Holmium,
  Erbium,
  Thulium,
  Ytterbium,
  Lutetium,
  Hafnium,
  Tantalum,
  Rhenium,
  Osmium,
  Iridium,
  Mercury,
  Thallium,
  Bismuth,
  Polonium,
  Astatine,
  Francium,
  Actinium,
  Thorium,
  Protactinium,
  Neptunium,
  Americium,
  Curium,
  Berkelium,
  Californium,
  Einsteinium,
  Fermium,
  Mendelevium,
  Nobelium,
  Lawrencium,
  Rutherfordium,
  Dubnium,
  Seaborgium,
  Bohrium,
  Hassium,
  Meitnerium,
  Darmstadtium,
  Roentgenium,
  Copernicium,
  Nihonium,
  Flerovium,
  Moscovium,
  Livermorium,
  Tennessine,
  Oganesson
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: {
    name: string;
    price: string;
  };
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  quoteType?: string;
}

interface ModuleItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface WallCoveringItem {
  id: string;
  name: string;
  type: string;
  area: number;
  price: number;
}

interface SmartDeviceItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

interface AccessoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  suppliedBy: 'client' | 'wallshop';
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    area: '',
    message: '',
    urgency: 'standard',
    quoteType: 'smart-wall',
  });

  const [modules, setModules] = useState<ModuleItem[]>([
    { id: '1', name: '1000mm Central Module', size: '1000mm', quantity: 2, price: 450 },
  ]);

  const [wallCoverings, setWallCoverings] = useState<WallCoveringItem[]>([]);
  const [smartDevices, setSmartDevices] = useState<SmartDeviceItem[]>([]);
  const [accessories, setAccessories] = useState<AccessoryItem[]>([]);

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeFeature, setActiveFeature] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const stepTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        stepTitleRef.current?.focus();
      }, 300);
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % 4);
      }, 3000);
      return () => {
        document.body.style.overflow = 'unset';
        clearInterval(interval);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const validateStep = useCallback(() => {
    const errors: FormErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) errors.name = 'Full name is required.';
      if (!formData.email.trim()) errors.email = 'Email is required.';
      else if (!emailRegex.test(formData.email)) errors.email = 'Please enter a valid email.';
      if (!formData.phone.trim()) errors.phone = 'Phone number is required.';
      else if (!phoneRegex.test(formData.phone)) errors.phone = 'Please enter a valid phone number.';
    }
    if (currentStep === 2) {
      if (!formData.projectType) errors.projectType = 'Please select a project type.';
      if (!formData.quoteType) errors.quoteType = 'Please select a quote type.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setTimeout(() => {
        stepTitleRef.current?.focus();
      }, 100);
    }
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setTimeout(() => {
      stepTitleRef.current?.focus();
    }, 100);
  }, []);

  // Module management functions
  const addModule = () => {
    const newModule: ModuleItem = {
      id: Date.now().toString(),
      name: '1000mm Module',
      size: '1000mm',
      quantity: 1,
      price: 450,
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (id: string, field: keyof ModuleItem, value: any) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, [field]: value } : module
    ));
  };

  const removeModule = (id: string) => {
    setModules(modules.filter(module => module.id !== id));
  };

  // Wall covering management functions
  const addWallCovering = () => {
    const newCovering: WallCoveringItem = {
      id: Date.now().toString(),
      name: 'Wood Grain Panel',
      type: 'Wood Grain',
      area: 10,
      price: 85,
    };
    setWallCoverings([...wallCoverings, newCovering]);
  };

  const updateWallCovering = (id: string, field: keyof WallCoveringItem, value: any) => {
    setWallCoverings(wallCoverings.map(covering => 
      covering.id === id ? { ...covering, [field]: value } : covering
    ));
  };

  const removeWallCovering = (id: string) => {
    setWallCoverings(wallCoverings.filter(covering => covering.id !== id));
  };

  // Smart device management functions
  const addSmartDevice = () => {
    const newDevice: SmartDeviceItem = {
      id: Date.now().toString(),
      name: 'Smart Switch',
      category: 'Control',
      quantity: 1,
      price: 125,
    };
    setSmartDevices([...smartDevices, newDevice]);
  };

  const updateSmartDevice = (id: string, field: keyof SmartDeviceItem, value: any) => {
    setSmartDevices(smartDevices.map(device => 
      device.id === id ? { ...device, [field]: value } : device
    ));
  };

  const removeSmartDevice = (id: string) => {
    setSmartDevices(smartDevices.filter(device => device.id !== id));
  };

  // Accessory management functions
  const addAccessory = (suppliedBy: 'client' | 'wallshop') => {
    const newAccessory: AccessoryItem = {
      id: Date.now().toString(),
      name: suppliedBy === 'client' ? 'TV Mount' : 'Installation Kit',
      category: suppliedBy === 'client' ? 'Mounting' : 'Tools',
      quantity: 1,
      price: suppliedBy === 'client' ? 0 : 45,
      suppliedBy,
    };
    setAccessories([...accessories, newAccessory]);
  };

  const updateAccessory = (id: string, field: keyof AccessoryItem, value: any) => {
    setAccessories(accessories.map(accessory => 
      accessory.id === id ? { ...accessory, [field]: value } : accessory
    ));
  };

  const removeAccessory = (id: string) => {
    setAccessories(accessories.filter(accessory => accessory.id !== id));
  };

  // Calculate totals
  const calculateTotal = () => {
    const moduleTotal = modules.reduce((sum, module) => sum + (module.price * module.quantity), 0);
    const coveringTotal = wallCoverings.reduce((sum, covering) => sum + (covering.price * covering.area), 0);
    const deviceTotal = smartDevices.reduce((sum, device) => sum + (device.price * device.quantity), 0);
    const accessoryTotal = accessories
      .filter(acc => acc.suppliedBy === 'wallshop')
      .reduce((sum, accessory) => sum + (accessory.price * accessory.quantity), 0);
    
    return moduleTotal + coveringTotal + deviceTotal + accessoryTotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsSubmitting(true);

    try {
      const quoteData = {
        ...formData,
        selectedProduct,
        modules,
        wallCoverings,
        smartDevices,
        accessories,
        total: calculateTotal(),
      };

      const res = await fetch('/api/send-quote-working', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });

      let result;
      try {
        result = await res.json();
      } catch (jsonError) {
        throw new Error('Invalid response from server');
      }

      if (!res.ok) {
        throw new Error(result?.error || 'Failed to send quote');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          projectType: '',
          area: '',
          message: '',
          urgency: 'standard',
          quoteType: 'smart-wall',
        });
        setModules([{ id: '1', name: '1000mm Central Module', size: '1000mm', quantity: 2, price: 450 }]);
        setWallCoverings([]);
        setSmartDevices([]);
        setAccessories([]);
        setCurrentStep(1);
        onClose();
      }, 4000);
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit quote request. Please try again later.';
      alert(errorMessage);
    }
  };

  const quoteTypes = useMemo(
    () => [
      { value: 'smart-wall', label: 'Smart Wall Quote', description: 'Complete smart wall system with modules, coverings, devices, and accessories' },
      { value: 'rock-board-only', label: 'Rock Board Quote Only', description: 'Rock board materials and installation only' },
      { value: 'wall-board-only', label: 'Wall Board Quote Only', description: 'Wall board materials and installation only' },
      { value: 'smart-devices-only', label: 'Smart Devices Quote Only', description: 'Smart devices and automation systems only' },
    ],
    []
  );

  const projectTypes = useMemo(
    () => [
      { value: 'residential-living', label: 'Residential - Living Room', icon: Home },
      { value: 'residential-bedroom', label: 'Residential - Bedroom', icon: Home },
      { value: 'residential-kitchen', label: 'Residential - Kitchen', icon: Home },
      { value: 'residential-bathroom', label: 'Residential - Bathroom', icon: Home },
      { value: 'commercial-office', label: 'Commercial - Office', icon: Building2 },
      { value: 'commercial-retail', label: 'Commercial - Retail', icon: Building2 },
      { value: 'commercial-restaurant', label: 'Commercial - Restaurant', icon: Building2 },
      { value: 'industrial-warehouse', label: 'Industrial - Warehouse', icon: Building2 },
      { value: 'other', label: 'Other / Custom Project', icon: Palette },
    ],
    []
  );

  const urgencyOptions = useMemo(
    () => [
      {
        value: 'urgent',
        label: 'Urgent Priority',
        subtitle: '24-48 hours response',
        badge: 'URGENT',
        color: 'from-red-500 to-orange-500',
        icon: Zap,
      },
      {
        value: 'standard',
        label: 'Standard Timeline',
        subtitle: '3-5 business days',
        badge: 'STANDARD',
        color: 'from-[#b69777] to-[#907252]',
        icon: Calendar,
      },
      {
        value: 'flexible',
        label: 'Flexible Schedule',
        subtitle: '1-2 weeks planning',
        badge: 'FLEXIBLE',
        color: 'from-green-500 to-emerald-500',
        icon: Clock,
      },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: Shield,
        title: 'Lifetime Warranty',
        description: 'Comprehensive protection for your investment',
        active: activeFeature === 0,
      },
      {
        icon: Award,
        title: 'Expert Installation',
        description: 'Certified professionals with 10+ years experience',
        active: activeFeature === 1,
      },
      {
        icon: Users,
        title: '24/7 Support',
        description: 'Round-the-clock assistance when you need it',
        active: activeFeature === 2,
      },
      {
        icon: Star,
        title: '5-Star Rated',
        description: 'Trusted by 10,000+ satisfied customers',
        active: activeFeature === 3,
      },
    ],
    [activeFeature]
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto transition-colors duration-500 ${
          darkMode ? 'bg-black bg-opacity-95' : 'bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, duration: 0.6 }}
          className={`relative w-full max-w-6xl lg:max-w-7xl my-4 sm:my-8 ${
            darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-[#e2d5c4]'
          } rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={`relative text-white overflow-hidden ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                : 'bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]'
            }`}
          >
            <div className="absolute inset-0 opacity-20">
              <div
                className={`absolute inset-0 ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30'
                    : 'bg-gradient-to-r from-[#b69777]/30 to-[#907252]/30'
                }`}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 z-50 group"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 pr-12 sm:pr-16">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-[#b69777] to-[#907252] rounded-xl sm:rounded-2xl shadow-lg w-fit">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h1
                      id="quote-modal-title"
                      tabIndex={-1}
                      ref={stepTitleRef}
                      className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1 sm:mb-2 bg-gradient-to-r from-white via-[#f8f6f3] to-[#b69777] bg-clip-text text-transparent"
                    >
                      Get Your Comprehensive Quote
                    </h1>
                    <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                      Professional consultation & detailed pricing for your complete smart wall project
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quote Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {quoteTypes.map((type) => (
                    <motion.div
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                        formData.quoteType === type.value
                          ? 'bg-gradient-to-br from-[#b69777]/20 to-[#907252]/10 border-[#b69777] text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, quoteType: type.value }))}
                    >
                      <h4 className="font-semibold text-sm mb-1">{type.label}</h4>
                      <p className="text-xs opacity-80">{type.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`text-center p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-500 ${
                      feature.active
                        ? 'bg-gradient-to-br from-[#b69777]/20 to-[#907252]/10 border border-[#b69777]/50 sm:scale-105'
                        : darkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <feature.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 transition-colors duration-500 ${
                        feature.active ? 'text-[#b69777]' : darkMode ? 'text-gray-400' : 'text-white/70'
                      }`}
                      aria-hidden="true"
                    />
                    <h4
                      className={`text-xs sm:text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-white'
                      } mb-1`}
                    >
                      {feature.title}
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-white/70'} hidden sm:block`}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className={`p-4 sm:p-6 lg:p-8 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-[#231c14]'}`}>
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="text-center py-8 sm:py-12"
                role="alert"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15, stiffness: 300 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl"
                  aria-hidden="true"
                >
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-3 sm:mb-4"
                >
                  Comprehensive Quote Request Submitted!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4"
                >
                  Thank you! Our expert team will review your detailed requirements and contact you within 24 hours with a comprehensive quote including all modules, coverings, devices, and accessories.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 p-4 bg-gradient-to-r from-[#b69777]/10 to-[#907252]/10 rounded-xl border border-[#b69777]/20"
                >
                  <p className="text-sm font-medium">
                    Estimated Total: £{calculateTotal().toLocaleString()}
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            formErrors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-[#b69777] focus:border-transparent`}
                          placeholder="Enter your full name"
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-[#b69777] focus:border-transparent`}
                          placeholder="Enter your email address"
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-[#b69777] focus:border-transparent`}
                          placeholder="Enter your phone number"
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-2">
                          Project Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b69777] focus:border-transparent"
                          placeholder="Enter project address"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                    
                    <div>
                      <label className="block text-sm font-medium mb-4">Project Type *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projectTypes.map((type) => (
                          <motion.div
                            key={type.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                              formData.projectType === type.value
                                ? 'border-[#b69777] bg-[#b69777]/10'
                                : 'border-gray-300 hover:border-[#b69777]/50'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, projectType: type.value }))}
                          >
                            <type.icon className="w-6 h-6 mb-2 text-[#b69777]" />
                            <h4 className="font-medium text-sm">{type.label}</h4>
                          </motion.div>
                        ))}
                      </div>
                      {formErrors.projectType && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.projectType}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="area" className="block text-sm font-medium mb-2">
                          Project Area (sq ft)
                        </label>
                        <input
                          type="number"
                          id="area"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b69777] focus:border-transparent"
                          placeholder="Enter area in square feet"
                        />
                      </div>

                      <div>
                        <label htmlFor="urgency" className="block text-sm font-medium mb-2">
                          Project Timeline
                        </label>
                        <select
                          id="urgency"
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b69777] focus:border-transparent"
                        >
                          {urgencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label} - {option.subtitle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Quote Configuration */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-2xl font-bold mb-6">Quote Configuration</h2>

                    {/* Modules Section */}
                    {(formData.quoteType === 'smart-wall' || formData.quoteType === 'wall-board-only') && (
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Modules Required
                          </h3>
                          <button
                            type="button"
                            onClick={addModule}
                            className="bg-[#b69777] text-white px-4 py-2 rounded-lg hover:bg-[#907252] transition-colors flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Module
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {modules.map((module) => (
                            <div key={module.id} className="bg-white p-4 rounded-lg border flex items-center gap-4">
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                  type="text"
                                  value={module.name}
                                  onChange={(e) => updateModule(module.id, 'name', e.target.value)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Module name"
                                />
                                <input
                                  type="text"
                                  value={module.size}
                                  onChange={(e) => updateModule(module.id, 'size', e.target.value)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Size"
                                />
                                <input
                                  type="number"
                                  value={module.quantity}
                                  onChange={(e) => updateModule(module.id, 'quantity', parseInt(e.target.value) || 0)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Qty"
                                  min="1"
                                />
                                <input
                                  type="number"
                                  value={module.price}
                                  onChange={(e) => updateModule(module.id, 'price', parseFloat(e.target.value) || 0)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Price £"
                                  step="0.01"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeModule(module.id)}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Wall Coverings Section */}
                    {(formData.quoteType === 'smart-wall' || formData.quoteType === 'wall-board-only') && (
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Layers className="w-5 h-5" />
                            Wall Covering Required
                          </h3>
                          <button
                            type="button"
                            onClick={addWallCovering}
                            className="bg-[#b69777] text-white px-4 py-2 rounded-lg hover:bg-[#907252] transition-colors flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Covering
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {wallCoverings.map((covering) => (
                            <div key={covering.id} className="bg-white p-4 rounded-lg border flex items-center gap-4">
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                  type="text"
                                  value={covering.name}
                                  onChange={(e) => updateWallCovering(covering.id, 'name', e.target.value)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Covering name"
                                />
                                <select
                                  value={covering.type}
                                  onChange={(e) => updateWallCovering(covering.id, 'type', e.target.value)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                >
                                  <option value="Wood Grain">Wood Grain</option>
                                  <option value="Cloth Pattern">Cloth Pattern</option>
                                  <option value="Stone">Stone</option>
                                  <option value="Metal">Metal</option>
                                  <option value="Other">Other</option>
                                </select>
                                <input
                                  type="number"
                                  value={covering.area}
                                  onChange={(e) => updateWallCovering(covering.id, 'area', parseFloat(e.target.value) || 0)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Area (sq ft)"
                                  step="0.1"
                                />
                                <input
                                  type="number"
                                  value={covering.price}
                                  onChange={(e) => updateWallCovering(covering.id, 'price', parseFloat(e.target.value) || 0)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Price £/sq ft"
                                  step="0.01"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeWallCovering(covering.id)}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Smart Devices Section */}
                    {(formData.quoteType === 'smart-wall' || formData.quoteType === 'smart-devices-only') && (
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Smart Devices Required
                          </h3>
                          <button
                            type="button"
                            onClick={addSmartDevice}
                            className="bg-[#b69777] text-white px-4 py-2 rounded-lg hover:bg-[#907252] transition-colors flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Device
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {smartDevices.map((device) => (
                            <div key={device.id} className="bg-white p-4 rounded-lg border flex items-center gap-4">
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                  type="text"
                                  value={device.name}
                                  onChange={(e) => updateSmartDevice(device.id, 'name', e.target.value)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Device name"
                                />
                                <select
                                  value={device.category}
                                  onChange={(e) => updateSmartDevice(device.id, 'category', e.target.value)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                >
                                  <option value="Control">Control</option>
                                  <option value="Lighting">Lighting</option>
                                  <option value="Security">Security</option>
                                  <option value="HVAC">HVAC</option>
                                  <option value="Entertainment">Entertainment</option>
                                  <option value="Other">Other</option>
                                </select>
                                <input
                                  type="number"
                                  value={device.quantity}
                                  onChange={(e) => updateSmartDevice(device.id, 'quantity', parseInt(e.target.value) || 0)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Qty"
                                  min="1"
                                />
                                <input
                                  type="number"
                                  value={device.price}
                                  onChange={(e) => updateSmartDevice(device.id, 'price', parseFloat(e.target.value) || 0)}
                                  className="px-3 py-2 border rounded focus:ring-2 focus:ring-[#b69777]"
                                  placeholder="Price £"
                                  step="0.01"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeSmartDevice(device.id)}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Accessories Section */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Wrench className="w-5 h-5" />
                        Accessories
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Client Supplied Accessories */}
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-gray-700">Accessory Supplied by Client</h4>
                            <button
                              type="button"
                              onClick={() => addAccessory('client')}
                              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              Add
                            </button>
                          </div>
                          <div className="space-y-3">
                            {accessories.filter(acc => acc.suppliedBy === 'client').map((accessory) => (
                              <div key={accessory.id} className="bg-white p-3 rounded border flex items-center gap-3">
                                <div className="flex-1 grid grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={accessory.name}
                                    onChange={(e) => updateAccessory(accessory.id, 'name', e.target.value)}
                                    className="px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Item name"
                                  />
                                  <input
                                    type="number"
                                    value={accessory.quantity}
                                    onChange={(e) => updateAccessory(accessory.id, 'quantity', parseInt(e.target.value) || 0)}
                                    className="px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Qty"
                                    min="1"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeAccessory(accessory.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Wall Shop Supplied Accessories */}
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-gray-700">Accessory Supplied by The Wall Shop</h4>
                            <button
                              type="button"
                              onClick={() => addAccessory('wallshop')}
                              className="bg-[#b69777] text-white px-3 py-1 rounded text-sm hover:bg-[#907252] transition-colors flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              Add
                            </button>
                          </div>
                          <div className="space-y-3">
                            {accessories.filter(acc => acc.suppliedBy === 'wallshop').map((accessory) => (
                              <div key={accessory.id} className="bg-white p-3 rounded border flex items-center gap-3">
                                <div className="flex-1 grid grid-cols-3 gap-2">
                                  <input
                                    type="text"
                                    value={accessory.name}
                                    onChange={(e) => updateAccessory(accessory.id, 'name', e.target.value)}
                                    className="px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-[#b69777]"
                                    placeholder="Item name"
                                  />
                                  <input
                                    type="number"
                                    value={accessory.quantity}
                                    onChange={(e) => updateAccessory(accessory.id, 'quantity', parseInt(e.target.value) || 0)}
                                    className="px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-[#b69777]"
                                    placeholder="Qty"
                                    min="1"
                                  />
                                  <input
                                    type="number"
                                    value={accessory.price}
                                    onChange={(e) => updateAccessory(accessory.id, 'price', parseFloat(e.target.value) || 0)}
                                    className="px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-[#b69777]"
                                    placeholder="Price £"
                                    step="0.01"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeAccessory(accessory.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total Estimate */}
                    <div className="bg-[#b69777]/10 p-6 rounded-lg border border-[#b69777]/20">
                      <h3 className="text-xl font-bold text-[#b69777] mb-2">Estimated Total</h3>
                      <p className="text-3xl font-extrabold text-[#231c14]">
                        £{calculateTotal().toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        *This is a preliminary estimate. Final pricing will be provided in your detailed quote.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Additional Information */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Project Details & Special Requirements
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#b69777] focus:border-transparent"
                        placeholder="Please describe your project in detail, including any special requirements, preferences, or questions you may have..."
                      />
                    </div>

                    <div className="bg-[#b69777]/10 p-6 rounded-lg border border-[#b69777]/20">
                      <h3 className="text-lg font-semibold text-[#b69777] mb-4">Quote Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Quote Type:</span>
                          <span className="font-medium">
                            {quoteTypes.find(t => t.value === formData.quoteType)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Project Type:</span>
                          <span className="font-medium">
                            {projectTypes.find(t => t.value === formData.projectType)?.label}
                          </span>
                        </div>
                        {formData.area && (
                          <div className="flex justify-between">
                            <span>Project Area:</span>
                            <span className="font-medium">{formData.area} sq ft</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Timeline:</span>
                          <span className="font-medium">
                            {urgencyOptions.find(u => u.value === formData.urgency)?.label}
                          </span>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between text-lg font-bold text-[#b69777]">
                          <span>Estimated Total:</span>
                          <span>£{calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#b69777] text-white px-6 py-3 rounded-lg hover:bg-[#907252] transition-colors flex items-center gap-2"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#b69777] text-white px-8 py-3 rounded-lg hover:bg-[#907252] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Quote Request
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          step <= currentStep ? 'bg-[#b69777]' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteModal;

