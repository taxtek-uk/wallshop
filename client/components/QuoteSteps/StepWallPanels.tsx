import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Ruler, Palette, Wrench, Info, CheckCircle, Zap, 
  Shield, Eye, Paintbrush, Settings, ChevronDown, Grid,
  Image, Sparkles
} from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { WallPanelsFormData } from '@/types/quote';

export default function StepWallPanels() {
  const { state, updateProductData } = useQuote();
  const wallPanelsData = (state.formData.wallPanels || {
    panelType: 'fluted',
    finish: '',
    dimensions: { width: 0, height: 0, area: 0 },
    installation: 'professional',
  }) as WallPanelsFormData;

  const [activeSection, setActiveSection] = useState<string>('type');

  const handleFieldChange = (field: keyof WallPanelsFormData, value: any) => {
    const updatedData = { ...wallPanelsData, [field]: value };
    updateProductData('wall-panels', updatedData);
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: number) => {
    const newDimensions = { ...wallPanelsData.dimensions, [dimension]: value };
    newDimensions.area = newDimensions.width * newDimensions.height;
    handleFieldChange('dimensions', newDimensions);
  };

  const panelTypeOptions = [
    { 
      value: 'fluted', 
      label: 'Fluted Panels', 
      description: 'Elegant vertical grooves for sophisticated texture and modern appeal',
      icon: Grid,
      features: ['Customizable groove depth', 'Various spacing options', 'Premium wood finishes'],
      popular: true
    },
    { 
      value: 'hd-printing', 
      label: 'HD Printing', 
      description: 'High-definition printed patterns with photorealistic detail',
      icon: Image,
      features: ['Photorealistic patterns', 'Custom designs available', 'Fade-resistant inks'],
      popular: false
    },
    { 
      value: 'textured', 
      label: 'Textured Panels', 
      description: 'Three-dimensional surface textures for tactile and visual interest',
      icon: Palette,
      features: ['Multiple texture options', 'Enhanced durability', 'Easy maintenance'],
      popular: false
    },
    { 
      value: 'smooth', 
      label: 'Smooth Panels', 
      description: 'Clean, minimalist finish for contemporary and timeless designs',
      icon: Sparkles,
      features: ['Seamless appearance', 'Paint-ready surface', 'Versatile styling'],
      popular: false
    },
  ];

  const flutedGrooveOptions = [
    { value: '3mm', description: 'Subtle definition', visual: 'Fine lines' },
    { value: '6mm', description: 'Balanced texture', visual: 'Medium depth' },
    { value: '9mm', description: 'Pronounced grooves', visual: 'Deep channels' },
    { value: '12mm', description: 'Bold statement', visual: 'Maximum depth' },
    { value: '15mm', description: 'Ultra dramatic', visual: 'Architectural impact' }
  ];

  const flutedSpacingOptions = [
    { value: '10mm', description: 'Dense pattern', density: 'High' },
    { value: '15mm', description: 'Standard spacing', density: 'Medium' },
    { value: '20mm', description: 'Open pattern', density: 'Low' },
    { value: '25mm', description: 'Wide spacing', density: 'Extra Low' },
    { value: '30mm', description: 'Minimal lines', density: 'Minimal' }
  ];
  
  const hdPrintingPatterns = [
    { name: 'Wood Grain', description: 'Natural wood textures', category: 'Natural', popular: true },
    { name: 'Marble Veining', description: 'Luxury stone patterns', category: 'Stone', popular: true },
    { name: 'Concrete Texture', description: 'Industrial concrete finish', category: 'Industrial', popular: false },
    { name: 'Fabric Weave', description: 'Textile-inspired patterns', category: 'Textile', popular: false },
    { name: 'Stone Pattern', description: 'Natural stone surfaces', category: 'Stone', popular: false },
    { name: 'Metal Brushed', description: 'Brushed metal finishes', category: 'Metal', popular: false },
    { name: 'Custom Design', description: 'Bespoke pattern creation', category: 'Custom', popular: false }
  ];

  const textureTypes = [
    { name: 'Brushed', description: 'Directional brush texture', intensity: 'Subtle' },
    { name: 'Hammered', description: 'Metallic hammer marks', intensity: 'Medium' },
    { name: 'Sandblasted', description: 'Fine grain texture', intensity: 'Medium' },
    { name: 'Embossed', description: 'Raised pattern design', intensity: 'Bold' },
    { name: 'Ribbed', description: 'Linear ridge pattern', intensity: 'Bold' },
    { name: 'Perforated', description: 'Decorative hole pattern', intensity: 'Architectural' }
  ];

  const finishOptions = [
    { name: 'Matte', description: 'Non-reflective, sophisticated', sheen: '0-5%', popular: true },
    { name: 'Satin', description: 'Subtle sheen, easy to clean', sheen: '10-25%', popular: true },
    { name: 'Semi-Gloss', description: 'Moderate reflection', sheen: '35-70%', popular: false },
    { name: 'High Gloss', description: 'Maximum reflection', sheen: '70-85%', popular: false },
    { name: 'Natural', description: 'Unfinished, raw material', sheen: 'Variable', popular: false },
    { name: 'Stained', description: 'Color-enhanced natural', sheen: 'Variable', popular: false }
  ];

  const navigationSections = [
    { id: 'type', label: 'Panel Type', icon: Layers },
    { id: 'configuration', label: 'Configuration', icon: Settings },
    { id: 'finish', label: 'Finish & Color', icon: Palette },
    { id: 'dimensions', label: 'Dimensions', icon: Ruler },
    { id: 'installation', label: 'Installation', icon: Wrench }
  ];

  const getConfigurationProgress = () => {
    let progress = 0;
    if (wallPanelsData.panelType) progress += 20;
    if (wallPanelsData.finish) progress += 20;
    if (wallPanelsData.dimensions.area > 0) progress += 20;
    if (wallPanelsData.installation) progress += 20;
    
    // Type-specific configuration
    if (wallPanelsData.panelType === 'fluted' && wallPanelsData.flutedGrooveDepth && wallPanelsData.flutedSpacing) progress += 20;
    else if (wallPanelsData.panelType === 'hd-printing' && wallPanelsData.hdPrintingPattern) progress += 20;
    else if (wallPanelsData.panelType === 'textured' && wallPanelsData.textureType) progress += 20;
    else if (wallPanelsData.panelType === 'smooth') progress += 20;
    
    return Math.min(progress, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
      data-seo-title="Wall Panels Configuration"
      data-seo-desc="Design custom wall panels with fluted, HD printing, textured, and smooth options for luxury interior solutions"
    >
      {/* Header Section */}
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-leather-600 to-leather-700 rounded-2xl shadow-lg"
        >
          <Layers className="w-8 h-8 text-white" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-mocha-950 tracking-tight">
            Wall Panels Configuration
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Design your perfect <span className="font-semibold text-mocha-950">wall panels</span> with 
            custom patterns, textures, and finishes that transform any space into a sophisticated environment.
          </p>
        </div>
        
        {/* Progress Indicator */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm text-stone-600 mb-2">
            <span>Configuration Progress</span>
            <span className="font-semibold">{getConfigurationProgress()}%</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2">
            <motion.div
              className="bg-leather-600 h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${getConfigurationProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
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
        {/* Panel Type Selection */}
        {activeSection === 'type' && (
          <motion.section
            key="type"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                <Layers className="w-4 h-4 text-leather-600" />
              </div>
              <h2 className="text-xl font-bold text-mocha-950">
                Panel Type Selection
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {panelTypeOptions.map((option, index) => {
                const IconComponent = option.icon;
                const isSelected = wallPanelsData.panelType === option.value;
                
                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleFieldChange('panelType', option.value)}
                    className={`group relative p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      isSelected
                        ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-4 ring-leather-200 shadow-lg'
                        : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                    }`}
                    aria-pressed={isSelected}
                    role="radio"
                  >
                    {/* Popular Badge */}
                    {option.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          Popular
                        </span>
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                      isSelected ? 'bg-leather-600 shadow-lg' : 'bg-leather-100 group-hover:bg-leather-200'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-leather-600'}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-mocha-950 group-hover:text-leather-700 transition-colors">
                          {option.label}
                        </h3>
                        <p className="text-sm text-stone-600 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-2">
                        {option.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-6 right-6 w-8 h-8 bg-leather-600 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Configuration Section */}
        {activeSection === 'configuration' && (
          <motion.section
            key="configuration"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Fluted Panel Configuration */}
            {wallPanelsData.panelType === 'fluted' && (
              <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                    <Grid className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mocha-950">Fluted Panel Configuration</h3>
                    <p className="text-sm text-stone-600">Customize groove depth and spacing for your desired aesthetic</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Groove Depth */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-mocha-950">Groove Depth</h4>
                    <div className="space-y-3">
                      {flutedGrooveOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleFieldChange('flutedGrooveDepth', option.value)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                            wallPanelsData.flutedGrooveDepth === option.value
                              ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                              : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-mocha-950">{option.value}</span>
                            <span className="px-2 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-full">
                              {option.visual}
                            </span>
                          </div>
                          <p className="text-sm text-stone-600">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Groove Spacing */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-mocha-950">Groove Spacing</h4>
                    <div className="space-y-3">
                      {flutedSpacingOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleFieldChange('flutedSpacing', option.value)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                            wallPanelsData.flutedSpacing === option.value
                              ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                              : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-mocha-950">{option.value}</span>
                            <span className="px-2 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-full">
                              {option.density} Density
                            </span>
                          </div>
                          <p className="text-sm text-stone-600">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-mocha-950 mb-3">Visual Impact Guide</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
                        <div className="space-y-2">
                          <div><strong>3-6mm depth:</strong> Subtle texture, contemporary feel</div>
                          <div><strong>9-12mm depth:</strong> Bold definition, architectural presence</div>
                        </div>
                        <div className="space-y-2">
                          <div><strong>10-15mm spacing:</strong> Dense pattern, rich texture</div>
                          <div><strong>20-30mm spacing:</strong> Open design, modern aesthetic</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* HD Printing Configuration */}
            {wallPanelsData.panelType === 'hd-printing' && (
              <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Image className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mocha-950">HD Printing Pattern Selection</h3>
                    <p className="text-sm text-stone-600">Choose from photorealistic patterns or create custom designs</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {hdPrintingPatterns.map((pattern) => (
                    <button
                      key={pattern.name}
                      onClick={() => handleFieldChange('hdPrintingPattern', pattern.name)}
                      className={`group relative p-5 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-lg ${
                        wallPanelsData.hdPrintingPattern === pattern.name
                          ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                          : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                      }`}
                    >
                      {pattern.popular && (
                        <div className="absolute top-2 right-2">
                          <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                            Popular
                          </span>
                        </div>
                      )}

                      {/* Pattern Preview */}
                      <div className="w-16 h-12 mx-auto mb-3 rounded-lg overflow-hidden border border-stone-300 bg-gradient-to-br from-stone-100 to-stone-200">
                        <div className={`w-full h-full ${
                          pattern.name === 'Wood Grain' ? 'bg-gradient-to-br from-amber-200 to-amber-400' :
                          pattern.name === 'Marble Veining' ? 'bg-gradient-to-br from-stone-200 to-stone-400' :
                          pattern.name === 'Concrete Texture' ? 'bg-gradient-to-br from-stone-300 to-stone-500' :
                          pattern.name === 'Fabric Weave' ? 'bg-gradient-to-br from-blue-200 to-blue-400' :
                          pattern.name === 'Stone Pattern' ? 'bg-gradient-to-br from-stone-400 to-stone-600' :
                          pattern.name === 'Metal Brushed' ? 'bg-gradient-to-br from-stone-300 to-stone-500' :
                          'bg-gradient-to-br from-purple-200 to-purple-400'
                        }`} />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-sm font-semibold text-mocha-950">{pattern.name}</span>
                        <p className="text-xs text-stone-600">{pattern.description}</p>
                        <div className="text-xs">
                          <span className="px-2 py-1 bg-stone-100 text-stone-700 rounded-full">
                            {pattern.category}
                          </span>
                        </div>
                      </div>

                      {wallPanelsData.hdPrintingPattern === pattern.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 left-3 w-5 h-5 bg-leather-600 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom Design Info */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Paintbrush className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-mocha-950 mb-3">Custom Design Service</h4>
                      <p className="text-sm text-stone-700 mb-3">
                        Create bespoke patterns from your own designs, logos, or artwork. Our design team can work with 
                        you to develop unique patterns that perfectly match your vision.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
                        <div className="space-y-1">
                          <div>• High-resolution printing (up to 1440 DPI)</div>
                          <div>• Fade-resistant UV-stable inks</div>
                          <div>• Seamless pattern matching</div>
                        </div>
                        <div className="space-y-1">
                          <div>• Design consultation included</div>
                          <div>• Digital proofs provided</div>
                          <div>• Multiple size options available</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Textured Panels Configuration */}
            {wallPanelsData.panelType === 'textured' && (
              <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mocha-950">Texture Type Selection</h3>
                    <p className="text-sm text-stone-600">Choose from various three-dimensional surface textures</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {textureTypes.map((texture) => (
                    <button
                      key={texture.name}
                      onClick={() => handleFieldChange('textureType', texture.name)}
                      className={`p-5 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-lg ${
                        wallPanelsData.textureType === texture.name
                          ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                          : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                      }`}
                    >
                      {/* Texture Preview */}
                      <div className="w-16 h-12 mx-auto mb-3 rounded-lg border border-stone-300 bg-gradient-to-br from-stone-100 to-stone-300 relative overflow-hidden">
                        <div className={`absolute inset-0 ${
                          texture.name === 'Brushed' ? 'bg-gradient-to-r from-transparent via-white to-transparent opacity-30' :
                          texture.name === 'Hammered' ? 'bg-radial-gradient from-white to-transparent opacity-20' :
                          texture.name === 'Sandblasted' ? 'bg-noise opacity-40' :
                          texture.name === 'Embossed' ? 'bg-gradient-to-br from-white via-transparent to-stone-400 opacity-50' :
                          texture.name === 'Ribbed' ? 'bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 opacity-60' :
                          'bg-dot-pattern opacity-30'
                        }`} />
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-sm font-semibold text-mocha-950">{texture.name}</span>
                        <p className="text-xs text-stone-600">{texture.description}</p>
                        <div className="text-xs">
                          <span className={`px-2 py-1 rounded-full ${
                            texture.intensity === 'Subtle' ? 'bg-green-100 text-green-800' :
                            texture.intensity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            texture.intensity === 'Bold' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {texture.intensity}
                          </span>
                        </div>
                      </div>

                      {wallPanelsData.textureType === texture.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-5 h-5 bg-leather-600 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Smooth Panels Info */}
            {wallPanelsData.panelType === 'smooth' && (
              <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-stone-500 to-stone-600 rounded-xl flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mocha-950">Smooth Panel Configuration</h3>
                    <p className="text-sm text-stone-600">Clean, minimalist panels ready for your chosen finish</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-mocha-950">Surface Quality</h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-stone-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-mocha-950">Premium Smooth Finish</span>
                        </div>
                        <p className="text-sm text-stone-600">
                          Perfectly smooth surface ready for paint, wallpaper, or decorative finishes
                        </p>
                      </div>
                      <div className="p-4 bg-stone-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-mocha-950">Seamless Joints</span>
                        </div>
                        <p className="text-sm text-stone-600">
                          Invisible panel joints for a continuous, uninterrupted surface
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-mocha-950">Applications</h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-stone-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <Paintbrush className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-mocha-950">Paint Ready</span>
                        </div>
                        <p className="text-sm text-stone-600">
                          Ideal base for any paint color or decorative coating
                        </p>
                      </div>
                      <div className="p-4 bg-stone-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <Palette className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-mocha-950">Versatile Styling</span>
                        </div>
                        <p className="text-sm text-stone-600">
                          Perfect canvas for wallpaper, vinyl wraps, or artistic treatments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        )}

        {/* Finish & Color Section */}
        {activeSection === 'finish' && (
          <motion.section
            key="finish"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-leather-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-mocha-950">Finish Selection</h2>
                <p className="text-sm text-stone-600">Choose the perfect finish for your wall panels</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {finishOptions.map((finish) => (
                <button
                  key={finish.name}
                  onClick={() => handleFieldChange('finish', finish.name)}
                  className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
                    wallPanelsData.finish === finish.name
                      ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                      : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  {finish.popular && (
                    <div className="absolute top-3 right-3">
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Finish Preview */}
                  <div className={`w-full h-8 mb-4 rounded-lg border border-stone-300 ${
                    finish.name === 'Matte' ? 'bg-stone-200' :
                    finish.name === 'Satin' ? 'bg-gradient-to-r from-stone-200 to-stone-300' :
                    finish.name === 'Semi-Gloss' ? 'bg-gradient-to-r from-stone-300 to-stone-400 shadow-inner' :
                    finish.name === 'High Gloss' ? 'bg-gradient-to-r from-stone-400 to-stone-500 shadow-lg' :
                    finish.name === 'Natural' ? 'bg-gradient-to-r from-amber-200 to-amber-300' :
                    'bg-gradient-to-r from-amber-300 to-amber-400'
                  }`} />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-mocha-950">{finish.name}</span>
                      <span className="text-xs text-stone-500">{finish.sheen} sheen</span>
                    </div>
                    <p className="text-sm text-stone-600">{finish.description}</p>
                  </div>

                  {wallPanelsData.finish === finish.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 left-3 w-5 h-5 bg-leather-600 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Finish Guide */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-mocha-950 mb-3">Finish Selection Guide</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
                    <div className="space-y-2">
                      <div><strong>Matte/Satin:</strong> Sophisticated, hides imperfections, easy maintenance</div>
                      <div><strong>Semi/High Gloss:</strong> Durable, easy to clean, reflects light</div>
                    </div>
                    <div className="space-y-2">
                      <div><strong>Natural:</strong> Showcases material beauty, requires sealing</div>
                      <div><strong>Stained:</strong> Enhanced color depth, natural wood grain visible</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Dimensions Section */}
        {activeSection === 'dimensions' && (
          <motion.section
            key="dimensions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
                <Ruler className="w-5 h-5 text-leather-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-mocha-950">Panel Dimensions</h2>
                <p className="text-sm text-stone-600">Specify precise measurements for accurate pricing and material calculation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="panel-width" className="block text-sm font-semibold text-mocha-950">
                  Width (meters)
                </label>
                <input
                  type="number"
                  id="panel-width"
                  min="0.1"
                  step="0.1"
                  value={wallPanelsData.dimensions.width || ''}
                  onChange={(e) => handleDimensionChange('width', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 3.5"
                  className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl text-mocha-950 
                    focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                    transition-all duration-200 hover:border-stone-400"
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="panel-height" className="block text-sm font-semibold text-mocha-950">
                  Height (meters)
                </label>
                <input
                  type="number"
                  id="panel-height"
                  min="0.1"
                  step="0.1"
                  value={wallPanelsData.dimensions.height || ''}
                  onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 2.4"
                  className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl text-mocha-950 
                    focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                    transition-all duration-200 hover:border-stone-400"
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="panel-area" className="block text-sm font-semibold text-mocha-950">
                  Total Area (m²)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="panel-area"
                    value={wallPanelsData.dimensions.area.toFixed(2)}
                    readOnly
                    className="w-full px-4 py-3 bg-stone-100 border-2 border-stone-300 rounded-xl text-mocha-950 cursor-not-allowed"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Measurement Tips */}
            {wallPanelsData.dimensions.area > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-mocha-950 mb-3">Measurement Confirmation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
                      <div className="space-y-1">
                        <div><strong>Total Coverage:</strong> {wallPanelsData.dimensions.area.toFixed(2)} m²</div>
                        <div><strong>Estimated Panels:</strong> ~{Math.ceil(wallPanelsData.dimensions.area / 2.4)} standard panels</div>
                      </div>
                      <div className="space-y-1">
                        <div><strong>Waste Factor:</strong> 10% recommended for cuts and fitting</div>
                        <div><strong>Final Area:</strong> {(wallPanelsData.dimensions.area * 1.1).toFixed(2)} m² (with waste)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Installation Section */}
        {activeSection === 'installation' && (
          <motion.section
            key="installation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-4 h-4 text-leather-600" />
              </div>
              <h2 className="text-xl font-bold text-mocha-950">
                Installation Service
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <button
                onClick={() => handleFieldChange('installation', 'professional')}
                className={`group p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-xl ${
                  wallPanelsData.installation === 'professional'
                    ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-4 ring-leather-200 shadow-lg'
                    : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
                role="radio"
                aria-checked={wallPanelsData.installation === 'professional'}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                    wallPanelsData.installation === 'professional' ? 'bg-leather-600 shadow-lg' : 'bg-leather-100 group-hover:bg-leather-200'
                  }`}>
                    <Shield className={`w-8 h-8 ${wallPanelsData.installation === 'professional' ? 'text-white' : 'text-leather-600'}`} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-mocha-950">Professional Installation</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Complete professional installation service with certified technicians, precision mounting, 
                      and comprehensive quality assurance for perfect results.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Expert measurement & planning</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Professional tools & equipment</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Quality guarantee & warranty</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Site preparation included</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Clean-up & finishing</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Post-installation support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleFieldChange('installation', 'diy')}
                className={`group p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-xl ${
                  wallPanelsData.installation === 'diy'
                    ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-4 ring-leather-200 shadow-lg'
                    : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
                role="radio"
                aria-checked={wallPanelsData.installation === 'diy'}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                    wallPanelsData.installation === 'diy' ? 'bg-leather-600 shadow-lg' : 'bg-leather-100 group-hover:bg-leather-200'
                  }`}>
                    <Wrench className={`w-8 h-8 ${wallPanelsData.installation === 'diy' ? 'text-white' : 'text-leather-600'}`} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-mocha-950">DIY Installation Kit</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                        Cost Effective
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Comprehensive DIY installation package with detailed instructions, all necessary hardware, 
                      and dedicated technical support throughout your project.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Step-by-step installation guide</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>All mounting hardware included</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Video tutorials available</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Technical support hotline</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Tool recommendations list</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Installation troubleshooting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Professional Service Promise */}
      <section className="bg-gradient-to-r from-clay-50 to-stone-50 border border-clay-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-leather-600 rounded-xl flex items-center justify-center shadow-sm">
              <Info className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-mocha-950">
              Precision Manufacturing & Quality Assurance
            </h3>
            <div className="prose prose-sm text-stone-700 max-w-none">
              <p className="leading-relaxed">
                Our <strong>wall panels</strong> are manufactured to the highest standards using premium materials 
                and advanced production techniques. Every panel undergoes rigorous quality control to ensure 
                consistent finish, precise dimensions, and long-lasting durability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-mocha-950 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    Quality Standards
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Premium grade materials only</li>
                    <li>• Precision CNC manufacturing</li>
                    <li>• Multi-point quality inspection</li>
                    <li>• Environmental compliance certified</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-mocha-950 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Service Excellence
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Site survey & consultation</li>
                    <li>• Custom sizing available</li>
                    <li>• Professional installation teams</li>
                    <li>• Comprehensive warranty coverage</li>
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