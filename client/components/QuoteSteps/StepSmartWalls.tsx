import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tv, Volume2, Lightbulb, Plus, Check, Zap, Shield, Info, 
  ChevronDown, Settings, Ruler, Home, Building, MapPin,
  Wrench, CheckCircle, Monitor, Speaker, Palette
} from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { SmartWallsFormData } from '@/types/quote';

export default function StepSmartWalls() {
  const { state, updateProductData } = useQuote();
  const smartWallsData: SmartWallsFormData = {
    tvIntegration: false,
    speakers: false,
    lighting: false,
    additionalFeatures: [],
    ...state.formData.smartWalls,
  };

  const [activeSection, setActiveSection] = useState<string>('overview');

  const handleFieldChange = (field: keyof SmartWallsFormData, value: any) => {
    const updatedData = { ...smartWallsData, [field]: value };
    updateProductData('smart-walls', updatedData);
  };

  const handleFeatureToggle = (feature: string) => {
    const current = Array.isArray(smartWallsData.additionalFeatures) ? smartWallsData.additionalFeatures : [];
    const set = new Set(current);
    if (set.has(feature)) set.delete(feature); else set.add(feature);
    handleFieldChange('additionalFeatures', Array.from(set));
  };

  const handleProjectDetailsChange = (field: keyof NonNullable<SmartWallsFormData['projectDetails']>, value: any) => {
    const current = smartWallsData.projectDetails || { 
      propertyType: 'residential', 
      purpose: 'decorative', 
      installation: 'supply-install' 
    } as NonNullable<SmartWallsFormData['projectDetails']>;
    handleFieldChange('projectDetails', { ...current, [field]: value });
  };

  const handleWallSpecsChange = (field: keyof NonNullable<SmartWallsFormData['wallSpecifications']>, value: any) => {
    const current = smartWallsData.wallSpecifications || { 
      width: 0, 
      height: 0, 
      thickness: '', 
      layout: 'straight' 
    } as NonNullable<SmartWallsFormData['wallSpecifications']>;
    handleFieldChange('wallSpecifications', { ...current, [field]: value });
  };

  const handleTechnicalNeedsChange = (field: keyof NonNullable<SmartWallsFormData['technicalNeeds']>, value: boolean) => {
    const current = smartWallsData.technicalNeeds || { 
      soundproofing: false, 
      fireRating: false, 
      accessibility: false, 
      ecoMaterials: false 
    } as NonNullable<SmartWallsFormData['technicalNeeds']>;
    handleFieldChange('technicalNeeds', { ...current, [field]: value });
  };

  const screenSizeOptions = [
    { value: '32"', description: 'Compact spaces, bedrooms', popular: false },
    { value: '43"', description: 'Small to medium rooms', popular: false },
    { value: '55"', description: 'Living rooms, offices', popular: true },
    { value: '65"', description: 'Large living spaces', popular: true },
    { value: '75"', description: 'Premium home theaters', popular: false },
    { value: '85"', description: 'Commercial spaces', popular: false },
    { value: '100"+', description: 'Luxury installations', popular: false }
  ];

  const mountTypeOptions = [
    { value: 'Fixed Wall Mount', description: 'Secure, low-profile mounting', icon: Monitor },
    { value: 'Tilting Mount', description: 'Adjustable viewing angle', icon: Monitor },
    { value: 'Full Motion Mount', description: 'Maximum flexibility', icon: Monitor },
    { value: 'Ceiling Mount', description: 'Overhead installation', icon: Monitor }
  ];

  const speakerTypeOptions = [
    { value: 'In-Wall Speakers', description: 'Seamless integration', icon: Speaker, popular: true },
    { value: 'Soundbar Integration', description: 'Premium audio bar', icon: Speaker, popular: false },
    { value: 'Bookshelf Speakers', description: 'Traditional setup', icon: Speaker, popular: false },
    { value: 'Floor Standing', description: 'Audiophile quality', icon: Speaker, popular: false }
  ];

  const lightingTypeOptions = [
    { value: 'LED Strip Lighting', description: 'Ambient backlighting', popular: true },
    { value: 'Recessed Spotlights', description: 'Focused illumination', popular: false },
    { value: 'Accent Lighting', description: 'Decorative highlights', popular: false },
    { value: 'Smart Bulbs', description: 'Color-changing options', popular: false }
  ];

  const additionalFeatureOptions = [
    { name: 'Cable Management', description: 'Hidden cable routing', icon: Settings, category: 'Infrastructure' },
    { name: 'Wireless Charging Pad', description: 'Built-in device charging', icon: Zap, category: 'Technology' },
    { name: 'USB Outlets', description: 'Integrated power ports', icon: Zap, category: 'Technology' },
    { name: 'Smart Home Hub Integration', description: 'Central control system', icon: Home, category: 'Technology' },
    { name: 'Temperature Control', description: 'Climate management', icon: Settings, category: 'Environment' },
    { name: 'Air Quality Monitoring', description: 'Environmental sensors', icon: Shield, category: 'Environment' },
    { name: 'Security Camera Integration', description: 'Surveillance system', icon: Shield, category: 'Security' }
  ];

  const propertyTypeOptions = [
    { value: 'residential', label: 'Residential', description: 'Home installations', icon: Home },
    { value: 'commercial', label: 'Commercial', description: 'Business spaces', icon: Building },
    { value: 'hospitality', label: 'Hospitality', description: 'Hotels, restaurants', icon: Building },
    { value: 'retail', label: 'Retail', description: 'Shops, showrooms', icon: Building }
  ];

  const purposeOptions = [
    { value: 'decorative', label: 'Decorative', description: 'Aesthetic enhancement' },
    { value: 'functional', label: 'Functional', description: 'Practical applications' },
    { value: 'acoustic', label: 'Acoustic', description: 'Sound management' },
    { value: 'privacy', label: 'Privacy', description: 'Space division' }
  ];

  const installationOptions = [
    { value: 'supply-install', label: 'Supply & Install', description: 'Complete service package', recommended: true },
    { value: 'supply-only', label: 'Supply Only', description: 'Materials only', recommended: false },
    { value: 'consultation', label: 'Consultation', description: 'Design advice only', recommended: false }
  ];

  const thicknessOptions = ['50mm', '75mm', '100mm', '125mm', '150mm', 'Custom'];
  const layoutOptions = [
    { value: 'straight', label: 'Straight Wall', description: 'Standard linear installation' },
    { value: 'curved', label: 'Curved Wall', description: 'Curved or angled design' },
    { value: 'corner', label: 'Corner Installation', description: 'L-shaped configuration' },
    { value: 'island', label: 'Island Wall', description: 'Freestanding partition' }
  ];

  const navigationSections = [
    { id: 'overview', label: 'Project Overview', icon: Info },
    { id: 'tv', label: 'TV Integration', icon: Tv },
    { id: 'audio', label: 'Audio System', icon: Volume2 },
    { id: 'lighting', label: 'Smart Lighting', icon: Lightbulb },
    { id: 'features', label: 'Additional Features', icon: Plus },
    { id: 'specifications', label: 'Specifications', icon: Ruler }
  ];

  const getActiveFeaturesCount = () => {
    let count = 0;
    if (smartWallsData.tvIntegration) count++;
    if (smartWallsData.speakers) count++;
    if (smartWallsData.lighting) count++;
    count += (smartWallsData.additionalFeatures || []).length;
    return count;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
      data-seo-title="Smart Walls Configuration"
      data-seo-desc="Configure premium smart wall systems with TV integration, audio systems, smart lighting, and advanced home automation features"
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
            Smart Walls Configuration
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Design your perfect <span className="font-semibold text-mocha-950">smart wall system</span> with 
            integrated technology, premium finishes, and intelligent automation tailored to your space.
          </p>
        </div>
        
        {getActiveFeaturesCount() > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-leather-100 text-leather-800 rounded-full text-sm font-medium"
          >
            <Check className="w-4 h-4" />
            {getActiveFeaturesCount()} feature{getActiveFeaturesCount() !== 1 ? 's' : ''} configured
          </motion.div>
        )}
      </header>

      {/* Navigation */}
      <nav className="bg-white border border-stone-200 rounded-2xl p-2 shadow-sm">
        <div className="flex flex-wrap gap-1">
          {navigationSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-leather-600 text-white shadow-md'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {/* Project Overview */}
        {activeSection === 'overview' && (
          <motion.section
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Project Details */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-leather-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-mocha-950">Project Details</h2>
                  <p className="text-sm text-stone-600">Tell us about your smart wall project</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Property Type */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-mocha-950">
                    Property Type
                  </label>
                  <div className="space-y-2">
                    {propertyTypeOptions.map(option => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleProjectDetailsChange('propertyType', option.value)}
                          className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                            smartWallsData.projectDetails?.propertyType === option.value
                              ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                              : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-leather-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{option.label}</div>
                            <div className="text-xs text-stone-600">{option.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Purpose */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-mocha-950">
                    Primary Purpose
                  </label>
                  <div className="space-y-2">
                    {purposeOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleProjectDetailsChange('purpose', option.value)}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                          smartWallsData.projectDetails?.purpose === option.value
                            ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                            : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                        }`}
                      >
                        <div className="font-semibold text-sm">{option.label}</div>
                        <div className="text-xs text-stone-600">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Installation Type */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-mocha-950">
                    Service Type
                  </label>
                  <div className="space-y-2">
                    {installationOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleProjectDetailsChange('installation', option.value)}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 relative ${
                          smartWallsData.projectDetails?.installation === option.value
                            ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                            : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                        }`}
                      >
                        {option.recommended && (
                          <div className="absolute top-2 right-2">
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                              Recommended
                            </span>
                          </div>
                        )}
                        <div className="font-semibold text-sm">{option.label}</div>
                        <div className="text-xs text-stone-600">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mt-6 space-y-3">
                <label htmlFor="project-location" className="flex items-center text-sm font-semibold text-mocha-950 gap-2">
                  <MapPin className="w-4 h-4 text-leather-600" />
                  Project Location
                </label>
                <input
                  type="text"
                  id="project-location"
                  value={smartWallsData.projectDetails?.location || ''}
                  onChange={(e) => handleProjectDetailsChange('location', e.target.value)}
                  placeholder="e.g., Living room, Office reception, Hotel lobby..."
                  className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl text-mocha-950 
                    focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                    transition-all duration-200 hover:border-stone-400"
                />
              </div>
            </div>

            {/* Wall Specifications */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-leather-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-mocha-950">Wall Specifications</h2>
                  <p className="text-sm text-stone-600">Define the physical requirements for your smart wall</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dimensions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-mocha-950">Dimensions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="wall-width" className="block text-sm font-medium text-mocha-950">
                        Width (meters)
                      </label>
                      <input
                        type="number"
                        id="wall-width"
                        min="0.1"
                        step="0.1"
                        value={smartWallsData.wallSpecifications?.width || ''}
                        onChange={(e) => handleWallSpecsChange('width', parseFloat(e.target.value) || 0)}
                        placeholder="e.g., 4.5"
                        className="w-full px-3 py-3 bg-white border-2 border-stone-300 rounded-xl 
                          text-mocha-950 focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                          transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="wall-height" className="block text-sm font-medium text-mocha-950">
                        Height (meters)
                      </label>
                      <input
                        type="number"
                        id="wall-height"
                        min="0.1"
                        step="0.1"
                        value={smartWallsData.wallSpecifications?.height || ''}
                        onChange={(e) => handleWallSpecsChange('height', parseFloat(e.target.value) || 0)}
                        placeholder="e.g., 2.7"
                        className="w-full px-3 py-3 bg-white border-2 border-stone-300 rounded-xl 
                          text-mocha-950 focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                          transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  {/* Calculated Area */}
                  {(smartWallsData.wallSpecifications?.width && smartWallsData.wallSpecifications?.height) && (
                    <div className="p-4 bg-leather-50 border border-leather-200 rounded-xl">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-mocha-950">
                          Total Area: {(smartWallsData.wallSpecifications.width * smartWallsData.wallSpecifications.height).toFixed(2)} m²
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-mocha-950">Configuration</h3>
                  
                  {/* Thickness */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-mocha-950">
                      Wall Thickness
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {thicknessOptions.map(thickness => (
                        <button
                          key={thickness}
                          onClick={() => handleWallSpecsChange('thickness', thickness)}
                          className={`p-2 rounded-lg border-2 text-center text-sm font-medium transition-all duration-200 ${
                            smartWallsData.wallSpecifications?.thickness === thickness
                              ? 'border-leather-300 bg-leather-50 text-leather-700'
                              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          {thickness}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Layout */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-mocha-950">
                      Layout Type
                    </label>
                    <div className="space-y-2">
                      {layoutOptions.map(layout => (
                        <button
                          key={layout.value}
                          onClick={() => handleWallSpecsChange('layout', layout.value)}
                          className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                            smartWallsData.wallSpecifications?.layout === layout.value
                              ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                              : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          <div className="font-semibold text-sm">{layout.label}</div>
                          <div className="text-xs text-stone-600">{layout.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Requirements */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-leather-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-mocha-950">Technical Requirements</h2>
                  <p className="text-sm text-stone-600">Special requirements and compliance needs</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-leather-600" />
                    <div>
                      <div className="font-medium text-mocha-950">Soundproofing</div>
                      <div className="text-sm text-stone-600">Acoustic insulation</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smartWallsData.technicalNeeds?.soundproofing || false}
                      onChange={(e) => handleTechnicalNeedsChange('soundproofing', e.target.checked)}
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
                    <div>
                      <div className="font-medium text-mocha-950">Fire Rating</div>
                      <div className="text-sm text-stone-600">Fire safety compliance</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smartWallsData.technicalNeeds?.fireRating || false}
                      onChange={(e) => handleTechnicalNeedsChange('fireRating', e.target.checked)}
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
                    <Home className="w-5 h-5 text-leather-600" />
                    <div>
                      <div className="font-medium text-mocha-950">Accessibility</div>
                      <div className="text-sm text-stone-600">ADA compliance</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smartWallsData.technicalNeeds?.accessibility || false}
                      onChange={(e) => handleTechnicalNeedsChange('accessibility', e.target.checked)}
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
                    <Palette className="w-5 h-5 text-leather-600" />
                    <div>
                      <div className="font-medium text-mocha-950">Eco Materials</div>
                      <div className="text-sm text-stone-600">Sustainable options</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smartWallsData.technicalNeeds?.ecoMaterials || false}
                      onChange={(e) => handleTechnicalNeedsChange('ecoMaterials', e.target.checked)}
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
            </div>
          </motion.section>
        )}

        {/* TV Integration Section */}
        {activeSection === 'tv' && (
          <motion.section
            key="tv"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <Tv className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-mocha-950">TV Integration</h2>
                  <p className="text-sm text-stone-600">Mount and integrate your display seamlessly into the smart wall</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smartWallsData.tvIntegration}
                  onChange={(e) => handleFieldChange('tvIntegration', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                  after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                  after:transition-all peer-checked:bg-leather-600"></div>
              </label>
            </div>

            {smartWallsData.tvIntegration && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Screen Size */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-mocha-950">Screen Size</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {screenSizeOptions.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => handleFieldChange('screenSize', size.value)}
                        className={`group relative p-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md ${
                          smartWallsData.screenSize === size.value
                            ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                            : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                        }`}
                      >
                        {size.popular && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                              Popular
                            </span>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <span className="text-lg font-bold text-mocha-950">{size.value}</span>
                          <p className="text-xs text-stone-600">{size.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mount Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-mocha-950">Mount Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mountTypeOptions.map(type => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => handleFieldChange('mountType', type.value)}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                            smartWallsData.mountType === type.value
                              ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                              : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-leather-600" />
                            </div>
                            <span className="font-semibold text-sm">{type.value}</span>
                          </div>
                          <p className="text-xs text-stone-600">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Equipment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="av-equipment" className="block text-sm font-semibold text-mocha-950">
                      AV Equipment
                    </label>
                    <input
                      type="text"
                      id="av-equipment"
                      value={smartWallsData.avEquipment || ''}
                      onChange={(e) => handleFieldChange('avEquipment', e.target.value)}
                      placeholder="e.g., Apple TV, Sky Box, Blu-ray player..."
                      className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl 
                        text-mocha-950 focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                        transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="gaming-consoles" className="block text-sm font-semibold text-mocha-950">
                      Gaming Consoles
                    </label>
                    <input
                      type="text"
                      id="gaming-consoles"
                      value={smartWallsData.consoles || ''}
                      onChange={(e) => handleFieldChange('consoles', e.target.value)}
                      placeholder="e.g., PlayStation 5, Xbox Series X..."
                      className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl 
                        text-mocha-950 focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                        transition-all duration-200"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Audio System Section */}
        {activeSection === 'audio' && (
          <motion.section
            key="audio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-mocha-950">Audio System</h2>
                  <p className="text-sm text-stone-600">Integrate speakers for immersive sound experience</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smartWallsData.speakers}
                  onChange={(e) => handleFieldChange('speakers', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                  after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                  after:transition-all peer-checked:bg-leather-600"></div>
              </label>
            </div>

            {smartWallsData.speakers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Speaker Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-mocha-950">Speaker Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {speakerTypeOptions.map(type => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => handleFieldChange('speakerType', type.value)}
                          className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                            smartWallsData.speakerType === type.value
                              ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                              : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          {type.popular && (
                            <div className="absolute top-2 right-2">
                              <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                                Popular
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-leather-600" />
                            </div>
                            <span className="font-semibold text-sm">{type.value}</span>
                          </div>
                          <p className="text-xs text-stone-600">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="speaker-quantity" className="block text-sm font-semibold text-mocha-950">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="speaker-quantity"
                      min="1"
                      max="20"
                      value={smartWallsData.speakerQuantity || ''}
                      onChange={(e) => handleFieldChange('speakerQuantity', parseInt(e.target.value))}
                      placeholder="Number of speakers"
                      className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl 
                        text-mocha-950 focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                        transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="surround-setup" className="block text-sm font-semibold text-mocha-950">
                      Surround Setup
                    </label>
                    <select
                      id="surround-setup"
                      value={smartWallsData.surroundSetup || ''}
                      onChange={(e) => handleFieldChange('surroundSetup', e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl 
                        text-mocha-950 focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                        transition-all duration-200"
                    >
                      <option value="">Select setup</option>
                      <option value="2.0 Stereo">2.0 Stereo</option>
                      <option value="2.1 with Subwoofer">2.1 with Subwoofer</option>
                      <option value="5.1 Surround">5.1 Surround</option>
                      <option value="7.1 Surround">7.1 Surround</option>
                      <option value="Atmos">Dolby Atmos</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                    <div>
                      <div className="font-medium text-mocha-950">Wireless Audio</div>
                      <div className="text-sm text-stone-600">Bluetooth/WiFi connectivity</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smartWallsData.wirelessAudio || false}
                        onChange={(e) => handleFieldChange('wirelessAudio', e.target.checked)}
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
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Smart Lighting Section */}
        {activeSection === 'lighting' && (
          <motion.section
            key="lighting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-mocha-950">Smart Lighting</h2>
                  <p className="text-sm text-stone-600">Add ambient and accent lighting to enhance your smart wall</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smartWallsData.lighting}
                  onChange={(e) => handleFieldChange('lighting', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-leather-300 rounded-full peer peer-checked:after:translate-x-full 
                  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                  after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                  after:transition-all peer-checked:bg-leather-600"></div>
              </label>
            </div>

            {smartWallsData.lighting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Lighting Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-mocha-950">Lighting Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {lightingTypeOptions.map(type => (
                      <button
                        key={type.value}
                        onClick={() => handleFieldChange('lightingType', type.value)}
                        className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                          smartWallsData.lightingType === type.value
                            ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                            : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                        }`}
                      >
                        {type.popular && (
                          <div className="absolute top-2 right-2">
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                              Popular
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Lightbulb className="w-4 h-4 text-yellow-600" />
                          </div>
                          <span className="font-semibold text-sm">{type.value}</span>
                        </div>
                        <p className="text-xs text-stone-600">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lighting Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                    <div>
                      <div className="font-medium text-mocha-950">Color Control</div>
                      <div className="text-sm text-stone-600">RGB color changing capability</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smartWallsData.colorControl || false}
                        onChange={(e) => handleFieldChange('colorControl', e.target.checked)}
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
                    <div>
                      <div className="font-medium text-mocha-950">Dimming Control</div>
                      <div className="text-sm text-stone-600">Adjustable brightness levels</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smartWallsData.dimmingControl || false}
                        onChange={(e) => handleFieldChange('dimmingControl', e.target.checked)}
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
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Additional Features Section */}
        {activeSection === 'features' && (
          <motion.section
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-mocha-950">Additional Features</h2>
                <p className="text-sm text-stone-600">Enhance your smart wall with premium add-ons and integrations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalFeatureOptions.map(feature => {
                const IconComponent = feature.icon;
                return (
                  <button
                    key={feature.name}
                    onClick={() => handleFeatureToggle(feature.name)}
                    className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      smartWallsData.additionalFeatures?.includes(feature.name)
                        ? 'bg-leather-50 border-leather-300 text-leather-700 ring-2 ring-leather-200'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-leather-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm">{feature.name}</div>
                        <div className="text-xs text-stone-600">{feature.description}</div>
                        <div className="text-xs text-stone-500 mt-1">
                          <span className="px-1.5 py-0.5 bg-stone-100 rounded">{feature.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      smartWallsData.additionalFeatures?.includes(feature.name)
                        ? 'bg-leather-600 text-white'
                        : 'bg-stone-200 text-stone-400'
                    }`}>
                      {smartWallsData.additionalFeatures?.includes(feature.name) ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Specifications Summary */}
        {activeSection === 'specifications' && (
          <motion.section
            key="specifications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-leather-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-mocha-950">Configuration Summary</h2>
                  <p className="text-sm text-stone-600">Review your smart wall specifications</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-mocha-950 border-b border-stone-200 pb-2">
                    Project Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Property Type:</span>
                      <span className="font-medium text-mocha-950">
                        {smartWallsData.projectDetails?.propertyType || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Purpose:</span>
                      <span className="font-medium text-mocha-950">
                        {smartWallsData.projectDetails?.purpose || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Service Type:</span>
                      <span className="font-medium text-mocha-950">
                        {smartWallsData.projectDetails?.installation || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Location:</span>
                      <span className="font-medium text-mocha-950">
                        {smartWallsData.projectDetails?.location || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Wall Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-mocha-950 border-b border-stone-200 pb-2">
                    Wall Specifications
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Dimensions:</span>
                      <span className="font-medium text-mocha-950">
                        {smartWallsData.wallSpecifications?.width && smartWallsData.wallSpecifications?.height
                          ? `${smartWallsData.wallSpecifications.width}m × ${smartWallsData.wallSpecifications.height}m`
                          : 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Thickness:</span>
                      <span className="font-medium text-mocha-950">
                        {smartWallsData.wallSpecifications?.thickness || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Layout:</span>
                      <span className="font-medium text-mocha-950">
                        {smartWallsData.wallSpecifications?.layout || 'Not specified'}
                      </span>
                    </div>
                    {smartWallsData.wallSpecifications?.width && smartWallsData.wallSpecifications?.height && (
                      <div className="flex justify-between">
                        <span className="text-stone-600">Total Area:</span>
                        <span className="font-medium text-mocha-950">
                          {(smartWallsData.wallSpecifications.width * smartWallsData.wallSpecifications.height).toFixed(2)} m²
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features Summary */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h3 className="text-lg font-semibold text-mocha-950 mb-4">Selected Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {smartWallsData.tvIntegration && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Tv className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-sm">TV Integration</div>
                        <div className="text-xs text-stone-600">
                          {smartWallsData.screenSize && `${smartWallsData.screenSize} display`}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {smartWallsData.speakers && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <Volume2 className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-sm">Audio System</div>
                        <div className="text-xs text-stone-600">
                          {smartWallsData.speakerType || 'Speakers configured'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {smartWallsData.lighting && (
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-sm">Smart Lighting</div>
                        <div className="text-xs text-stone-600">
                          {smartWallsData.lightingType || 'Lighting configured'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(smartWallsData.additionalFeatures || []).map(feature => (
                    <div key={feature} className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Plus className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-sm">{feature}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {getActiveFeaturesCount() === 0 && (
                  <div className="text-center py-8 text-stone-500">
                    <Plus className="w-12 h-12 mx-auto mb-3 text-stone-300" />
                    <p>No features selected yet. Use the navigation above to configure your smart wall.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
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
              Professional Smart Wall Installation
            </h3>
            <div className="prose prose-sm text-stone-700 max-w-none">
              <p className="leading-relaxed">
                Our <strong>certified installation specialists</strong> ensure flawless integration of all smart wall components. 
                From structural mounting to technology integration, we deliver a seamless, professional finish that exceeds expectations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-mocha-950 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    Expert Installation
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Structural assessment & preparation</li>
                    <li>• Precision mounting & alignment</li>
                    <li>• Cable management & concealment</li>
                    <li>• Quality testing & calibration</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-mocha-950 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Technology Integration
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Smart home system setup</li>
                    <li>• Network configuration & optimization</li>
                    <li>• User training & support</li>
                    <li>• Ongoing maintenance programs</li>
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
