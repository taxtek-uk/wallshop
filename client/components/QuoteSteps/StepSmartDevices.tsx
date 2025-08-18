import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tablet, Shield, Home, Check, Plus, Search, Filter, 
  Zap, Wifi, Camera, Lock, Thermometer, Lightbulb,
  Speaker, Smartphone, Router, ChevronDown, Info
} from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { SmartDevicesFormData } from '@/types/quote';

export default function StepSmartDevices() {
  const { state, updateProductData } = useQuote();
  const smartDevicesData: SmartDevicesFormData = {
    controlPanels: false,
    securitySensors: false,
    homeAutomation: false,
    securityFeatures: [],
    automationFeatures: [],
    selectedDevices: [],
    ...state.formData.smartDevices,
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleFieldChange = (field: keyof SmartDevicesFormData, value: any) => {
    const updatedData = { ...smartDevicesData, [field]: value };
    updateProductData('smart-devices', updatedData);
  };

  const handleFeatureToggle = (category: 'securityFeatures' | 'automationFeatures', feature: string) => {
    const current = Array.isArray(smartDevicesData[category]) ? smartDevicesData[category] as string[] : [];
    const set = new Set(current);
    if (set.has(feature)) set.delete(feature); else set.add(feature);
    handleFieldChange(category, Array.from(set));
  };

  const panelModelOptions = [
    { value: 'MixPad X', description: 'Premium 10" touchscreen with advanced features', popular: true },
    { value: 'MixPad 7 Ultra', description: '7" high-resolution display with enhanced processing', popular: false },
    { value: 'MixPad 7', description: 'Standard 7" touchscreen for everyday control', popular: false },
    { value: 'MixPad M5', description: 'Compact 5" panel for smaller spaces', popular: false },
    { value: 'MixPad S', description: 'Sleek wall-mounted smart switch', popular: false },
    { value: 'ZigBee Mini Hub', description: 'Wireless hub for device connectivity', popular: false }
  ];

  const roomOptions = [
    'Living Room', 'Kitchen', 'Master Bedroom', 'Guest Bedroom', 'Bathroom', 
    'Home Office', 'Hallway', 'Dining Room', 'Multiple Rooms'
  ];

  const mountTypeOptions = [
    { value: 'Wall Mounted', description: 'Standard wall installation', icon: Tablet },
    { value: 'Desk Stand', description: 'Portable desktop mounting', icon: Smartphone },
    { value: 'In-Wall Flush', description: 'Seamless flush installation', icon: Router },
    { value: 'Ceiling Mount', description: 'Overhead mounting solution', icon: Wifi }
  ];

  const securityFeatureOptions = [
    { name: 'Door/Window Sensors', description: 'Monitor entry points', icon: Lock, category: 'Security' },
    { name: 'Glass Break Detection', description: 'Advanced glass break sensors', icon: Shield, category: 'Security' },
    { name: 'Flood Sensors', description: 'Water leak detection', icon: Shield, category: 'Emergency' },
    { name: 'Temperature Monitoring', description: 'Environmental monitoring', icon: Thermometer, category: 'Sensors' },
    { name: 'Carbon Monoxide Detection', description: 'CO safety monitoring', icon: Shield, category: 'Emergency' }
  ];

  const automationFeatureOptions = [
    { name: 'Smart Thermostats', description: 'Intelligent climate control', icon: Thermometer, category: 'HVAC' },
    { name: 'Automated Blinds', description: 'Motorized window treatments', icon: Home, category: 'Controller' },
    { name: 'Smart Locks', description: 'Keyless entry systems', icon: Lock, category: 'Security' },
    { name: 'Garage Door Control', description: 'Remote garage operation', icon: Home, category: 'Controller' },
    { name: 'Irrigation System', description: 'Smart garden watering', icon: Home, category: 'Controller' },
    { name: 'Pool/Spa Control', description: 'Automated pool management', icon: Home, category: 'Controller' }
  ];

  // Enhanced device catalog with more details
  const deviceCatalog: { 
    name: string; 
    category: string; 
    description: string; 
    icon: any; 
    features: string[];
    popular?: boolean;
  }[] = [
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
      name: 'MixPad 7', 
      category: 'Control Panel', 
      description: 'Standard 7" touchscreen panel',
      icon: Tablet,
      features: ['7" Display', 'Touch Control', 'App Integration']
    },
    { 
      name: 'MixPad M5', 
      category: 'Control Panel', 
      description: 'Compact 5" control panel',
      icon: Smartphone,
      features: ['5" Compact Display', 'Wall Mount', 'Basic Controls']
    },
    { 
      name: 'Smart Lock V5 Face', 
      category: 'Security', 
      description: 'Facial recognition smart lock',
      icon: Lock,
      features: ['Face Recognition', 'Keyless Entry', 'Mobile App']
    },
    { 
      name: 'Smart Door Lock S2', 
      category: 'Security', 
      description: 'Keypad and app controlled lock',
      icon: Lock,
      features: ['Keypad Entry', 'App Control', 'Auto-Lock']
    },
    { 
      name: '2K Wireless Smart IP Camera S2', 
      category: 'Surveillance', 
      description: 'High-definition security camera',
      icon: Camera,
      features: ['2K Resolution', 'Night Vision', 'Motion Detection']
    },
    { 
      name: 'Door Window Sensor', 
      category: 'Sensors', 
      description: 'Entry point monitoring sensor',
      icon: Shield,
      features: ['Wireless', 'Long Battery Life', 'Instant Alerts']
    },
    { 
      name: 'Temperature Humidity Sensor', 
      category: 'Sensors', 
      description: 'Environmental monitoring sensor',
      icon: Thermometer,
      features: ['Temperature', 'Humidity', 'Data Logging']
    },
    { 
      name: 'Zigbee Smoke Sensor', 
      category: 'Emergency', 
      description: 'Smart smoke detection system',
      icon: Shield,
      features: ['Smoke Detection', 'Wireless Alerts', 'Battery Backup']
    },
    { 
      name: 'Sky Dome Pro Ceiling Light', 
      category: 'Lighting', 
      description: 'Smart ceiling lighting system',
      icon: Lightbulb,
      features: ['Dimmable', 'Color Changing', 'Voice Control']
    },
    { 
      name: 'SOPRO Smart Decorative Lights', 
      category: 'Lighting', 
      description: 'Decorative smart lighting',
      icon: Lightbulb,
      features: ['RGB Colors', 'App Control', 'Scene Modes']
    },
    { 
      name: 'Smart LED Light', 
      category: 'Lighting', 
      description: 'Basic smart LED bulb',
      icon: Lightbulb,
      features: ['Dimmable', 'Energy Efficient', 'App Control']
    },
    { 
      name: 'ZigBee RGB Relay', 
      category: 'Controller', 
      description: 'Smart lighting controller',
      icon: Zap,
      features: ['RGB Control', 'Wireless', 'Multiple Zones']
    },
    { 
      name: 'MixDimmer', 
      category: 'Controller', 
      description: 'Smart dimmer switch',
      icon: Zap,
      features: ['Dimming Control', 'Wall Mount', 'App Integration']
    },
    { 
      name: 'Smart Thermostat Pro', 
      category: 'HVAC', 
      description: 'Advanced climate control system',
      icon: Thermometer,
      features: ['Learning Algorithm', 'Energy Saving', 'Remote Control']
    },
    { 
      name: 'Smart Radiator Valves', 
      category: 'Heating', 
      description: 'Individual room heating control',
      icon: Thermometer,
      features: ['Room Control', 'Energy Efficient', 'Wireless']
    }
  ];

  const categories = ['all', 'Control Panel', 'Security', 'Surveillance', 'Sensors', 'Emergency', 'Lighting', 'Controller', 'HVAC', 'Heating'];

  const filteredDevices = deviceCatalog.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || device.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isSelected = (name: string) => (smartDevicesData.selectedDevices || []).some(d => d.name === name);
  
  const toggleDevice = (name: string, category: string) => {
    const current = smartDevicesData.selectedDevices || [];
    const exists = current.find(d => d.name === name);
    const next = exists ? current.filter(d => d.name !== name) : [...current, { name, category }];
    handleFieldChange('selectedDevices', next);
  };

  const selectedCount = (smartDevicesData.selectedDevices || []).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
      data-seo-title="Smart Devices Selection"
      data-seo-desc="Choose from premium smart home devices including control panels, security sensors, and home automation systems"
    >
      {/* Header Section */}
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-leather-600 to-leather-700 rounded-2xl shadow-lg"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-mocha-950 tracking-tight">
            Smart Devices Selection
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive range of <span className="font-semibold text-mocha-950">smart home devices</span> 
            including control panels, security sensors, and automation systems to create your perfect smart home ecosystem.
          </p>
        </div>
        
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-leather-100 text-leather-800 rounded-full text-sm font-medium"
          >
            <Check className="w-4 h-4" />
            {selectedCount} device{selectedCount !== 1 ? 's' : ''} selected
          </motion.div>
        )}
      </header>

      {/* Device Search and Filter */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200 appearance-none bg-white min-w-[160px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-stone-600">
            <span>Showing {filteredDevices.length} of {deviceCatalog.length} devices</span>
            <button
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="flex items-center gap-1 text-leather-600 hover:text-leather-700 font-medium"
            >
              Advanced Options
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Device Catalog */}
      <section className="space-y-6" aria-labelledby="device-catalog-heading">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
            <Tablet className="w-4 h-4 text-leather-600" />
          </div>
          <h2 id="device-catalog-heading" className="text-xl font-bold text-mocha-950">
            Device Catalog
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredDevices.map((device, index) => {
              const IconComponent = device.icon;
              const selected = isSelected(device.name);
              
              return (
                <motion.button
                  key={device.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleDevice(device.name, device.category)}
                  className={`group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    selected
                      ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-2 ring-leather-200 shadow-md'
                      : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  {/* Popular Badge */}
                  {device.popular && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    selected ? 'bg-leather-600 shadow-md' : 'bg-leather-100 group-hover:bg-leather-200'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${selected ? 'text-white' : 'text-leather-600'}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-bold text-mocha-950 text-sm leading-tight">
                        {device.name}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {device.description}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="flex items-center justify-start">
                      <span className="px-2 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-full">
                        {device.category}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      {device.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-600">
                          <div className="w-1 h-1 bg-leather-600 rounded-full flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                      {device.features.length > 2 && (
                        <div className="text-xs text-stone-500">
                          +{device.features.length - 2} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  <div className={`absolute bottom-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    selected 
                      ? 'bg-leather-600 text-white' 
                      : 'bg-stone-200 text-stone-400 group-hover:bg-stone-300'
                  }`}>
                    {selected ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-semibold text-mocha-950 mb-2">No devices found</h3>
            <p className="text-stone-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>

      {/* Advanced Configuration Options */}
      <AnimatePresence>
        {showAdvancedOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Control Panels Configuration */}
            <section className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                    <Tablet className="w-5 h-5 text-leather-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mocha-950">Control Panel Configuration</h3>
                    <p className="text-sm text-stone-600">Advanced settings for your control panels</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smartDevicesData.controlPanels}
                    onChange={(e) => handleFieldChange('controlPanels', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 
                    peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                    after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                    after:transition-all peer-checked:bg-leather-600"></div>
                </label>
              </div>

              {smartDevicesData.controlPanels && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  {/* Panel Model */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-mocha-950">
                      Panel Model
                    </label>
                    <div className="space-y-2">
                      {panelModelOptions.map(model => (
                        <button
                          key={model.value}
                          onClick={() => handleFieldChange('panelModel', model.value)}
                          className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                            smartDevicesData.panelModel === model.value
                              ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                              : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm">{model.value}</span>
                            <div className="flex items-center gap-2">
                              {model.popular && (
                                <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                                  Popular
                                </span>
                              )}
                              <span className="text-sm font-bold text-mocha-950">{model.price}</span>
                            </div>
                          </div>
                          <p className="text-xs text-stone-600">{model.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-mocha-950">
                      Primary Room
                    </label>
                    <select
                      value={smartDevicesData.panelRoom || ''}
                      onChange={(e) => handleFieldChange('panelRoom', e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl 
                        text-mocha-950 focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 transition-all duration-200"
                    >
                      <option value="">Select room</option>
                      {roomOptions.map(room => (
                        <option key={room} value={room}>{room}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mount Type */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-mocha-950">
                      Mount Type
                    </label>
                    <div className="space-y-2">
                      {mountTypeOptions.map(type => {
                        const IconComponent = type.icon;
                        return (
                          <button
                            key={type.value}
                            onClick={() => handleFieldChange('panelMountType', type.value)}
                            className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                              smartDevicesData.panelMountType === type.value
                                ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                                : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                            }`}
                          >
                            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-leather-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{type.value}</div>
                              <div className="text-xs text-stone-600">{type.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </section>

            {/* Security & Sensors */}
            <section className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-leather-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mocha-950">Security & Sensors</h3>
                    <p className="text-sm text-stone-600">Comprehensive security and monitoring systems</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smartDevicesData.securitySensors}
                    onChange={(e) => handleFieldChange('securitySensors', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 
                    peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                    after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                    after:transition-all peer-checked:bg-leather-600"></div>
                </label>
              </div>

              {smartDevicesData.securitySensors && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Quick Toggles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Camera className="w-5 h-5 text-leather-600" />
                        <span className="font-medium text-mocha-950">Motion Detection</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={smartDevicesData.motionDetection || false}
                          onChange={(e) => handleFieldChange('motionDetection', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 
                          peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full 
                          peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                          after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                          after:transition-all peer-checked:bg-leather-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-leather-600" />
                        <span className="font-medium text-mocha-950">Smoke Detection</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={smartDevicesData.smokeDetection || false}
                          onChange={(e) => handleFieldChange('smokeDetection', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 
                          peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full 
                          peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                          after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                          after:transition-all peer-checked:bg-leather-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-mocha-950 mb-4">Additional Security Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {securityFeatureOptions.map(feature => {
                        const IconComponent = feature.icon;
                        return (
                          <button
                            key={feature.name}
                            onClick={() => handleFeatureToggle('securityFeatures', feature.name)}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                              smartDevicesData.securityFeatures?.includes(feature.name)
                                ? 'bg-leather-50 border-leather-300 text-leather-700'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-4 h-4 text-leather-600" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-sm">{feature.name}</div>
                                <div className="text-xs text-stone-600">{feature.description}</div>
                              </div>
                            </div>
                            {smartDevicesData.securityFeatures?.includes(feature.name) ? (
                              <Check className="w-5 h-5 text-leather-600" />
                            ) : (
                              <Plus className="w-5 h-5 text-stone-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </section>

            {/* Home Automation */}
            <section className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                    <Home className="w-5 h-5 text-leather-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mocha-950">Home Automation</h3>
                    <p className="text-sm text-stone-600">Intelligent automation for comfort and efficiency</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smartDevicesData.homeAutomation}
                    onChange={(e) => handleFieldChange('homeAutomation', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 
                    peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                    after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                    after:transition-all peer-checked:bg-leather-600"></div>
                </label>
              </div>

              {smartDevicesData.homeAutomation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-mocha-950 mb-4">Automation Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {automationFeatureOptions.map(feature => {
                        const IconComponent = feature.icon;
                        return (
                          <button
                            key={feature.name}
                            onClick={() => handleFeatureToggle('automationFeatures', feature.name)}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                              smartDevicesData.automationFeatures?.includes(feature.name)
                                ? 'bg-leather-50 border-leather-300 text-leather-700'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-4 h-4 text-leather-600" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-sm">{feature.name}</div>
                                <div className="text-xs text-stone-600">{feature.description}</div>
                              </div>
                            </div>
                            {smartDevicesData.automationFeatures?.includes(feature.name) ? (
                              <Check className="w-5 h-5 text-leather-600" />
                            ) : (
                              <Plus className="w-5 h-5 text-stone-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Installation Notice */}
      <section className="bg-gradient-to-r from-clay-50 to-stone-50 border border-clay-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-leather-600 rounded-xl flex items-center justify-center shadow-sm">
              <Info className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-mocha-950">
              Professional Smart Home Integration
            </h3>
            <div className="prose prose-sm text-stone-700 max-w-none">
              <p className="leading-relaxed">
                Our <strong>certified smart home specialists</strong> ensure seamless integration of all your selected devices. 
                We provide comprehensive setup, configuration, and training to maximize your smart home experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-mocha-950 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    Installation & Setup
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Professional device installation</li>
                    <li>• Network configuration & optimization</li>
                    <li>• Device pairing & automation setup</li>
                    <li>• Comprehensive system testing</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-mocha-950 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Support & Training
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Personalized user training</li>
                    <li>• Mobile app setup & guidance</li>
                    <li>• Ongoing technical support</li>
                    <li>• System updates & maintenance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}