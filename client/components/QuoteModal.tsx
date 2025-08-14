import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  Home,
  Building2,
  Palette,
  Sun,
  Moon,
  Plus,
  ArrowRight,
  Calendar,
  Users,
} from "lucide-react";

// ===== Types =====
type ModuleItem = {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
};

type WallCovering = {
  id: string;
  name: string;
  type: string;
  area: number; // sqm
  price: number; // per sqm
};

type SmartDevice = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
};

type Accessory = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  suppliedBy: "client" | "wallshop";
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  projectType: string;
  area: string;
  message: string;
  urgency: "standard" | "urgent" | "flexible";
  quoteType: "smart-wall" | "rock-board-only" | "wall-board-only" | "smart-devices-only";
};

type FormErrors = Partial<Record<keyof FormData, string>>;

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: unknown;
}

// ===== Component =====
const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    projectType: "",
    area: "",
    message: "",
    urgency: "standard",
    quoteType: "smart-wall",
  });

  const [modules, setModules] = useState<ModuleItem[]>([
    { id: "1", name: "1000mm Central Module", size: "1000mm", quantity: 2, price: 450 },
  ]);

  const [wallCoverings, setWallCoverings] = useState<WallCovering[]>([]);
  const [smartDevices, setSmartDevices] = useState<SmartDevice[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [darkMode, setDarkMode] = useState(false);

  const stepTitleRef = useRef<HTMLHeadingElement | null>(null);

  // lock body scroll + focus + cleanup
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => stepTitleRef.current?.focus(), 300);
    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(t);
    };
  }, [isOpen]);

  // dark mode helper (applies/removes 'dark' class on <html>)
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const validateStep = useCallback((): boolean => {
    const errors: FormErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) errors.name = "Full name is required.";
      if (!formData.email.trim()) errors.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Please enter a valid email.";
      if (!formData.phone.trim()) errors.phone = "Phone number is required.";
      else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(formData.phone)) errors.phone = "Please enter a valid phone number.";
    }
    if (currentStep === 2) {
      if (!formData.quoteType) errors.quoteType = "Please select a quote type.";
      if (!formData.projectType) errors.projectType = "Please select a project type.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    if (validateStep()) {
      setCurrentStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev));
      setTimeout(() => stepTitleRef.current?.focus(), 100);
    }
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));
    setTimeout(() => stepTitleRef.current?.focus(), 100);
  }, []);

  // ===== Modules =====
  const addModule = () => {
    const newModule: ModuleItem = {
      id: String(Date.now()),
      name: "1000mm Module",
      size: "1000mm",
      quantity: 1,
      price: 450,
    };
    setModules((prev) => [...prev, newModule]);
  };

  const updateModule = (id: string, field: keyof ModuleItem, value: string | number) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const removeModule = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  // ===== Wall Coverings =====
  const addWallCovering = () => {
    const newCovering: WallCovering = {
      id: String(Date.now()),
      name: "Wood Grain Panel",
      type: "Wood Grain",
      area: 10,
      price: 85,
    };
    setWallCoverings((prev) => [...prev, newCovering]);
  };

  const updateWallCovering = (id: string, field: keyof WallCovering, value: string | number) => {
    setWallCoverings((prev) => prev.map((w) => (w.id === id ? { ...w, [field]: value } : w)));
  };

  const removeWallCovering = (id: string) => {
    setWallCoverings((prev) => prev.filter((w) => w.id !== id));
  };

  // ===== Smart Devices =====
  const addSmartDevice = () => {
    const newDevice: SmartDevice = {
      id: String(Date.now()),
      name: "Smart Switch",
      category: "Control",
      quantity: 1,
      price: 125,
    };
    setSmartDevices((prev) => [...prev, newDevice]);
  };

  const updateSmartDevice = (id: string, field: keyof SmartDevice, value: string | number) => {
    setSmartDevices((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const removeSmartDevice = (id: string) => {
    setSmartDevices((prev) => prev.filter((d) => d.id !== id));
  };

  // ===== Accessories =====
  const addAccessory = (suppliedBy: Accessory["suppliedBy"]) => {
    const newAccessory: Accessory = {
      id: String(Date.now()),
      name: suppliedBy === "client" ? "TV Mount" : "Installation Kit",
      category: suppliedBy === "client" ? "Mounting" : "Tools",
      quantity: 1,
      price: suppliedBy === "client" ? 0 : 45,
      suppliedBy,
    };
    setAccessories((prev) => [...prev, newAccessory]);
  };

  const updateAccessory = (id: string, field: keyof Accessory, value: string | number) => {
    setAccessories((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const removeAccessory = (id: string) => {
    setAccessories((prev) => prev.filter((a) => a.id !== id));
  };

  // ===== Totals =====
  const calculateTotal = () => {
    const moduleTotal = modules.reduce((sum, m) => sum + m.price * m.quantity, 0);
    const coveringTotal = wallCoverings.reduce((sum, w) => sum + w.price * w.area, 0);
    const deviceTotal = smartDevices.reduce((sum, d) => sum + d.price * d.quantity, 0);
    const accessoryTotal = accessories
      .filter((a) => a.suppliedBy === "wallshop")
      .reduce((sum, a) => sum + a.price * a.quantity, 0);
    return moduleTotal + coveringTotal + deviceTotal + accessoryTotal;
  };

  // ===== Options =====
  const quoteTypes = useMemo(
    () => [
      { value: "smart-wall", label: "Smart Wall Quote", description: "Complete smart wall system with modules, coverings, devices, and accessories" },
      { value: "rock-board-only", label: "Rock Board Quote Only", description: "Rock board materials and installation only" },
      { value: "wall-board-only", label: "Wall Board Quote Only", description: "Wall board materials and installation only" },
      { value: "smart-devices-only", label: "Smart Devices Quote Only", description: "Smart devices and automation systems only" },
    ] as const,
    []
  );

  const projectTypes = useMemo(
    () => [
      { value: "residential-living", label: "Residential - Living Room", icon: Home },
      { value: "residential-bedroom", label: "Residential - Bedroom", icon: Home },
      { value: "residential-kitchen", label: "Residential - Kitchen", icon: Home },
      { value: "residential-bathroom", label: "Residential - Bathroom", icon: Home },
      { value: "commercial-office", label: "Commercial - Office", icon: Building2 },
      { value: "commercial-retail", label: "Commercial - Retail", icon: Building2 },
      { value: "commercial-restaurant", label: "Commercial - Restaurant", icon: Building2 },
      { value: "industrial-warehouse", label: "Industrial - Warehouse", icon: Building2 },
      { value: "other", label: "Other / Custom Project", icon: Palette },
    ] as const,
    []
  );

  // ===== Submit =====
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // last validation pass
    setCurrentStep(4);
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        selectedProduct,
        modules,
        wallCoverings,
        smartDevices,
        accessories,
        total: calculateTotal(),
      };
      // TODO: replace with actual API call
      // console.log("Submitting Quote Data:", payload);
      await new Promise((r) => setTimeout(r, 1200));
      setIsSubmitting(false);
      setIsSubmitted(true);

      // reset and auto-close
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          projectType: "",
          area: "",
          message: "",
          urgency: "standard",
          quoteType: "smart-wall",
        });
        setModules([{ id: "1", name: "1000mm Central Module", size: "1000mm", quantity: 2, price: 450 }]);
        setWallCoverings([]);
        setSmartDevices([]);
        setAccessories([]);
        setCurrentStep(1);
        onClose();
      }, 1800);
    } catch (err) {
      setIsSubmitting(false);
      const message =
        err instanceof Error ? err.message : "Failed to submit quote request. Please try again later.";
      alert(message);
    }
  };

  // ===== Step Views =====
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 ref={stepTitleRef} tabIndex={-1} className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              Contact Details
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Please provide your contact details for the quote.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formErrors.email && <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formErrors.phone && <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                  Installation Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter the installation address"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any specific requirements, preferences, or questions..."
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 ref={stepTitleRef} tabIndex={-1} className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              Quote Configuration
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Select the quote type and your project type.</p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Quote Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quoteTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.quoteType === type.value
                        ? "border-blue-500 ring-2 ring-blue-500 bg-gray-50 dark:bg-gray-700"
                        : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="quoteType"
                      value={type.value}
                      checked={formData.quoteType === type.value}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="block text-lg font-medium text-gray-900 dark:text-gray-200">{type.label}</span>
                      <span className="block text-sm text-gray-600 dark:text-gray-400">{type.description}</span>
                    </div>
                  </label>
                ))}
              </div>
              {formErrors.quoteType && <p className="text-red-600 text-xs mt-1">{formErrors.quoteType}</p>}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Project Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 text-center ${
                      formData.projectType === type.value
                        ? "border-blue-500 ring-2 ring-blue-500 bg-gray-50 dark:bg-gray-700"
                        : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={type.value}
                      checked={formData.projectType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="mb-2">
                      <type.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <span className="block text-md font-medium text-gray-900 dark:text-gray-200">{type.label}</span>
                  </label>
                ))}
              </div>
              {formErrors.projectType && <p className="text-red-600 text-xs mt-1">{formErrors.projectType}</p>}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 ref={stepTitleRef} tabIndex={-1} className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              Module Configuration
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Specify modules for your wall space. Smart walls start with two central 1000mm modules.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Modules Required</h3>
              {modules.map((module) => (
                <div key={module.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-300 dark:border-gray-700">
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Module Name</label>
                      <input
                        type="text"
                        value={module.name}
                        onChange={(e) => updateModule(module.id, "name", e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Size</label>
                      <input
                        type="text"
                        value={module.size}
                        onChange={(e) => updateModule(module.id, "size", e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={module.quantity}
                        min={0}
                        onChange={(e) => updateModule(module.id, "quantity", Number.isNaN(Number(e.target.value)) ? 0 : parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModule(module.id)}
                    className="p-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                    aria-label="Remove module"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addModule}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" /> Add Module
              </button>
            </div>

            {/* Wall Coverings */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Wall Covering Required</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={wallCoverings.length > 0}
                  onChange={(e) => (e.target.checked ? addWallCovering() : setWallCoverings([]))}
                  className="h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-300">Include premium wall covering (100+ finishes)</span>
              </label>
              {wallCoverings.length > 0 && (
                <div className="space-y-4 mt-4">
                  {wallCoverings.map((covering) => (
                    <div key={covering.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-300 dark:border-gray-700">
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Covering Name</label>
                          <input
                            type="text"
                            value={covering.name}
                            onChange={(e) => updateWallCovering(covering.id, "name", e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Type</label>
                          <input
                            type="text"
                            value={covering.type}
                            onChange={(e) => updateWallCovering(covering.id, "type", e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Area (sqm)</label>
                          <input
                            type="number"
                            value={covering.area}
                            min={0}
                            step={0.1}
                            onChange={(e) =>
                              updateWallCovering(covering.id, "area", Number.isNaN(Number(e.target.value)) ? 0 : parseFloat(e.target.value))
                            }
                            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeWallCovering(covering.id)}
                        className="p-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                        aria-label="Remove covering"
                      >
                        <X className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addWallCovering}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" /> Add Wall Covering
                  </button>
                </div>
              )}
            </div>

            {/* Smart Devices */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Smart Devices Required</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={smartDevices.length > 0}
                  onChange={(e) => (e.target.checked ? addSmartDevice() : setSmartDevices([]))}
                  className="h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-300">Include smart devices & automation</span>
              </label>
              {smartDevices.length > 0 && (
                <div className="space-y-4 mt-4">
                  {smartDevices.map((device) => (
                    <div key={device.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-300 dark:border-gray-700">
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Device Name</label>
                          <input
                            type="text"
                            value={device.name}
                            onChange={(e) => updateSmartDevice(device.id, "name", e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Category</label>
                          <input
                            type="text"
                            value={device.category}
                            onChange={(e) => updateSmartDevice(device.id, "category", e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Quantity</label>
                          <input
                            type="number"
                            value={device.quantity}
                            min={0}
                            onChange={(e) =>
                              updateSmartDevice(device.id, "quantity", Number.isNaN(Number(e.target.value)) ? 0 : parseInt(e.target.value, 10))
                            }
                            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSmartDevice(device.id)}
                        className="p-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                        aria-label="Remove device"
                      >
                        <X className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSmartDevice}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" /> Add Smart Device
                  </button>
                </div>
              )}
            </div>

            {/* Accessories */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Accessories</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={accessories.length > 0}
                  onChange={(e) => (e.target.checked ? addAccessory("wallshop") : setAccessories([]))}
                  className="h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-300">Include accessories</span>
              </label>

              {accessories.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Client supplied */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-300">Supplied by Client</h4>
                    {accessories
                      .filter((a) => a.suppliedBy === "client")
                      .map((acc) => (
                        <div key={acc.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-300 dark:border-gray-700">
                          <div className="flex-grow grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Accessory Name</label>
                              <input
                                type="text"
                                value={acc.name}
                                onChange={(e) => updateAccessory(acc.id, "name", e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Quantity</label>
                              <input
                                type="number"
                                value={acc.quantity}
                                min={0}
                                onChange={(e) =>
                                  updateAccessory(acc.id, "quantity", Number.isNaN(Number(e.target.value)) ? 0 : parseInt(e.target.value, 10))
                                }
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAccessory(acc.id)}
                            className="p-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                            aria-label="Remove accessory"
                          >
                            <X className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => addAccessory("client")}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Plus className="h-5 w-5 mr-2" /> Add Client Accessory
                    </button>
                  </div>

                  {/* Wall Shop supplied */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-300">Supplied by The Wall Shop</h4>
                    {accessories
                      .filter((a) => a.suppliedBy === "wallshop")
                      .map((acc) => (
                        <div key={acc.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-300 dark:border-gray-700">
                          <div className="flex-grow grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Accessory Name</label>
                              <input
                                type="text"
                                value={acc.name}
                                onChange={(e) => updateAccessory(acc.id, "name", e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Quantity</label>
                              <input
                                type="number"
                                value={acc.quantity}
                                min={0}
                                onChange={(e) =>
                                  updateAccessory(acc.id, "quantity", Number.isNaN(Number(e.target.value)) ? 0 : parseInt(e.target.value, 10))
                                }
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAccessory(acc.id)}
                            className="p-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                            aria-label="Remove accessory"
                          >
                            <X className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => addAccessory("wallshop")}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Plus className="h-5 w-5 mr-2" /> Add Wall Shop Accessory
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 ref={stepTitleRef} tabIndex={-1} className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              Review & Submit
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Review your configuration and submit.</p>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Smart Wall Quote</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Quote ID: TWS-MEAPR51X-ITRM6</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Configuration Summary</h4>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-900 dark:text-gray-300 font-medium">Wall Modules</p>
                  <p className="text-gray-700 dark:text-gray-400">{modules.map((m) => `${m.quantity}x ${m.name}`).join(", ")}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-900 dark:text-gray-300 font-medium">Wall Covering</p>
                  {wallCoverings.length > 0 ? (
                    <p className="text-gray-700 dark:text-gray-400">
                      {wallCoverings.map((wc) => `${wc.area}sqm ${wc.name}`).join(", ")}
                    </p>
                  ) : (
                    <span className="text-yellow-600 text-sm">Required</span>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-900 dark:text-gray-300 font-medium">Smart Devices</p>
                  {smartDevices.length > 0 ? (
                    <p className="text-gray-700 dark:text-gray-400">
                      {smartDevices.map((sd) => `${sd.quantity}x ${sd.name}`).join(", ")}
                    </p>
                  ) : (
                    <span className="text-gray-500 text-sm">None selected</span>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-900 dark:text-gray-300 font-medium">Accessories</p>
                  {accessories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-800 dark:text-gray-400 font-medium">Supplied by Client:</p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
                          {accessories.filter((a) => a.suppliedBy === "client").map((a) => (
                            <li key={a.id}>
                              {a.quantity}x {a.name}
                            </li>
                          ))}
                          {accessories.filter((a) => a.suppliedBy === "client").length === 0 && <li>None</li>}
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-800 dark:text-gray-400 font-medium">Supplied by The Wall Shop:</p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
                          {accessories.filter((a) => a.suppliedBy === "wallshop").map((a) => (
                            <li key={a.id}>
                              {a.quantity}x {a.name}
                            </li>
                          ))}
                          {accessories.filter((a) => a.suppliedBy === "wallshop").length === 0 && <li>None</li>}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">None selected</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-medium">Name</p>
                    <p className="text-gray-700 dark:text-gray-400">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-medium">Email</p>
                    <p className="text-gray-700 dark:text-gray-400">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-medium">Phone</p>
                    <p className="text-gray-700 dark:text-gray-400">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-medium">Address</p>
                    <p className="text-gray-700 dark:text-gray-400">{formData.address || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-medium">Quote Processing</p>
                    <p className="text-gray-700 dark:text-gray-400 text-sm">Our design team will review within 24 hours.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-medium">Detailed Quote Delivery</p>
                    <p className="text-gray-700 dark:text-gray-400 text-sm">Expected delivery: Thursday 21 August 2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 dark:text-gray-300 font-medium">Free Consultation</p>
                    <p className="text-gray-700 dark:text-gray-400 text-sm">Schedule a consultation to discuss details.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-600 text-white p-4 rounded-md flex items-center space-x-3">
                <CheckCircle className="h-6 w-6" />
                <p className="font-medium">Ready to Submit</p>
                <p className="text-sm">Click “Submit Quote Request” to proceed.</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 border border-gray-200 dark:border-gray-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle className="h-24 w-24 text-green-600 mb-6" />
            <h2 id="quote-modal-title" className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Quote Request Submitted!</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">Thanks! We’ll get back to you shortly.</p>
            <p className="text-gray-500 text-sm">This modal will close automatically.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h1 id="quote-modal-title" className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Smart Wall Quote Builder</h1>
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 dark:text-gray-400">{Math.round((currentStep / 4) * 100)}% Complete</span>
                <button
                  type="button"
                  onClick={() => setDarkMode((d) => !d)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  aria-pressed={darkMode}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      currentStep === n ? "bg-blue-600" : currentStep > n ? "bg-green-600" : "bg-gray-400"
                    }`}
                    aria-current={currentStep === n ? "step" : undefined}
                  >
                    {currentStep > n ? <CheckCircle className="h-5 w-5" /> : n}
                  </div>
                  {n < 4 && <div className={`h-1 w-16 mx-2 ${currentStep > n ? "bg-green-600" : "bg-gray-300 dark:bg-gray-700"}`} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {/* Footer actions */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" /> Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center ${
                    currentStep === 1 && !formData.name && !formData.email && !formData.phone ? "ml-auto" : ""
                  }`}
                >
                  Next <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center ml-auto disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                </button>
              )}
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-xs mt-4 text-center">
              Privacy Notice: Your contact information will only be used to provide a quote and follow-up about your smart wall installation.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default QuoteModal;
