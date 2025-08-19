import React from 'react';
import { motion } from 'framer-motion';
import { Volume, Square, Ruler, Wrench, Info, CheckCircle, Zap, Shield } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { CarbonRockBoardsFormData } from '@/types/quote';

export default function StepCarbonRockBoards() {
  const { state, updateProductData } = useQuote();
  const carbonRockData = (state.formData.carbonRockBoards || {
    boardType: 'standard',
    thickness: '12mm',
    dimensions: { width: 0, height: 0, area: 0 },
    installation: 'professional',
  }) as CarbonRockBoardsFormData;

  const handleFieldChange = (field: keyof CarbonRockBoardsFormData, value: any) => {
    const updatedData = { ...carbonRockData, [field]: value };
    updateProductData('carbon-rock-boards', updatedData);
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: number) => {
    const newDimensions = { ...carbonRockData.dimensions, [dimension]: value };
    newDimensions.area = newDimensions.width * newDimensions.height;
    handleFieldChange('dimensions', newDimensions);
  };

  const boardTypeOptions = [
    { 
      value: 'acoustic', 
      label: 'Acoustic Boards', 
      description: 'Superior sound absorption and noise reduction for professional environments',
      icon: Volume,
      features: ['NRC 0.85+ Rating', 'Fire Resistant', 'Fabric Finish Options'],
      badge: 'Premium'
    },
    { 
      value: 'mirror', 
      label: 'Mirror Boards', 
      description: 'High-quality reflective surfaces with premium tinting options',
      icon: Square,
      features: ['Multiple Tints', 'Shatter Resistant', 'Easy Maintenance'],
      badge: 'Luxury'
    },
    { 
      value: 'standard', 
      label: 'Standard Boards', 
      description: 'Versatile carbon rock panels for diverse applications',
      icon: Shield,
      features: ['Durable Construction', 'Weather Resistant', 'Cost Effective'],
      badge: 'Popular'
    },
  ];

  const nrcRatingOptions = [
    { value: '0.85', label: 'NRC 0.85', description: 'High Absorption - Recording Studios, Conference Rooms', color: 'bg-green-100 text-green-800' },
    { value: '0.70', label: 'NRC 0.70', description: 'Good Absorption - Offices, Restaurants, Open Spaces', color: 'bg-blue-100 text-blue-800' },
    { value: '0.55', label: 'NRC 0.55', description: 'Moderate Absorption - Residential Living Areas', color: 'bg-yellow-100 text-yellow-800' },
    { value: '0.40', label: 'NRC 0.40', description: 'Basic Absorption - General Use Applications', color: 'bg-stone-100 text-stone-800' },
  ];

  const fabricColorOptions = [
    { name: 'Charcoal', color: '#374151', textColor: 'text-white' },
    { name: 'Light Grey', color: '#9CA3AF', textColor: 'text-stone-800' },
    { name: 'Cream', color: '#FEF3C7', textColor: 'text-stone-800' },
    { name: 'Black', color: '#111827', textColor: 'text-white' },
    { name: 'Navy Blue', color: '#1E3A8A', textColor: 'text-white' },
    { name: 'Forest Green', color: '#166534', textColor: 'text-white' },
    { name: 'Burgundy', color: '#7C2D12', textColor: 'text-white' },
    { name: 'Custom Color', color: 'linear-gradient(45deg, #f59e0b, #ef4444, #8b5cf6)', textColor: 'text-white' }
  ];

  const mirrorTintOptions = [
    { name: 'Clear', description: 'Maximum reflection, bright spaces', opacity: '0%' },
    { name: 'Bronze', description: 'Warm tone, reduces glare', opacity: '20%' },
    { name: 'Grey', description: 'Cool tone, neutral appearance', opacity: '25%' },
    { name: 'Blue', description: 'Decorative tint for accent walls', opacity: '30%' },
    { name: 'Green', description: 'Natural tint for calming spaces', opacity: '30%' },
    { name: 'Rose Gold', description: 'Luxury finish for premium spaces', opacity: '35%' },
    { name: 'Black', description: 'One-way mirror, privacy applications', opacity: '80%' }
  ];

  const thicknessOptions = [
    { value: '5mm', description: 'Standard applications', recommended: true },
    { value: '8mm', description: 'Enhanced durability', recommended: false }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
      data-seo-title="Carbon Rock Boards Configuration"
      data-seo-desc="Configure premium carbon rock boards with acoustic, mirror, and standard options for luxury wall solutions"
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
            Carbon Rock Boards Configuration
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Configure your premium <span className="font-semibold text-mocha-950">carbon rock boards</span> with 
            specialized features, finishes, and performance characteristics tailored to your project requirements.
          </p>
        </div>
      </header>

      {/* Board Type Selection */}
      <section className="space-y-6" aria-labelledby="board-type-heading">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
            <Square className="w-4 h-4 text-leather-600" />
          </div>
          <h2 id="board-type-heading" className="text-xl font-bold text-mocha-950">
            Board Type Selection
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {boardTypeOptions.map((option, index) => {
            const IconComponent = option.icon;
            const isSelected = carbonRockData.boardType === option.value;
            
            return (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleFieldChange('boardType', option.value)}
                className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isSelected
                    ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-4 ring-leather-200 shadow-lg'
                    : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
                aria-pressed={isSelected}
                role="radio"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    option.badge === 'Premium' ? 'bg-green-100 text-green-800' :
                    option.badge === 'Luxury' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {option.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isSelected ? 'bg-leather-600 shadow-lg' : 'bg-leather-100 group-hover:bg-leather-200'
                }`}>
                  <IconComponent className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-leather-600'}`} />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-mocha-950 group-hover:text-leather-700 transition-colors">
                    {option.label}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {option.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-1.5">
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
                    className="absolute bottom-4 right-4 w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Acoustic Board Configuration */}
      {carbonRockData.boardType === 'acoustic' && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
          aria-labelledby="acoustic-config-heading"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Volume className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 id="acoustic-config-heading" className="text-xl font-bold text-mocha-950">
                Acoustic Performance Configuration
              </h3>
              <p className="text-sm text-stone-600">Customize sound absorption properties for optimal acoustic performance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* NRC Rating */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-mocha-950 mb-4">
                NRC Rating (Noise Reduction Coefficient)
              </h4>
              <div className="space-y-3">
                {nrcRatingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFieldChange('acousticNrcRating', option.value)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                      carbonRockData.acousticNrcRating === option.value
                        ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                        : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-mocha-950">{option.label}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${option.color}`}>
                        {option.value === '0.85' ? 'Best' : option.value === '0.70' ? 'Good' : option.value === '0.55' ? 'Standard' : 'Basic'}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Colors */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-mocha-950 mb-4">
                Fabric Color Selection
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {fabricColorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleFieldChange('acousticFabricColor', color.name)}
                    className={`group relative p-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md overflow-hidden ${
                      carbonRockData.acousticFabricColor === color.name
                        ? 'border-leather-300 ring-2 ring-leather-200'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                    style={{
                      background: color.name === 'Custom Color' ? color.color : `${color.color}20`
                    }}
                  >
                    {/* Color Preview */}
                    <div 
                      className="w-8 h-8 rounded-lg mx-auto mb-2 shadow-sm border border-stone-200"
                      style={{ 
                        background: color.name === 'Custom Color' ? color.color : color.color 
                      }}
                    />
                    <span className={`text-sm font-medium ${color.textColor === 'text-white' ? 'text-stone-800' : color.textColor}`}>
                      {color.name}
                    </span>
                    
                    {carbonRockData.acousticFabricColor === color.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 bg-leather-600 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Guide */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-mocha-950 mb-3">Acoustic Performance Guide</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <strong>NRC 0.85+:</strong> Recording studios, conference rooms, premium offices
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <strong>NRC 0.70:</strong> Open offices, restaurants, retail spaces
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <strong>NRC 0.55:</strong> Residential living areas, bedrooms
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-stone-500 rounded-full"></div>
                      <strong>NRC 0.40:</strong> General applications, basic noise reduction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Mirror Board Configuration */}
      {carbonRockData.boardType === 'mirror' && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm"
          aria-labelledby="mirror-config-heading"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Square className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 id="mirror-config-heading" className="text-xl font-bold text-mocha-950">
                Mirror Configuration
              </h3>
              <p className="text-sm text-stone-600">Select tint options and reflective properties for your mirror boards</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-mocha-950">
              Mirror Tint Selection
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mirrorTintOptions.map((tint) => (
                <button
                  key={tint.name}
                  onClick={() => handleFieldChange('mirrorTint', tint.name)}
                  className={`group relative p-5 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-lg ${
                    carbonRockData.mirrorTint === tint.name
                      ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                      : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  {/* Mirror Preview */}
                  <div className="relative w-16 h-12 mx-auto mb-3 rounded-lg overflow-hidden border border-stone-300 bg-gradient-to-br from-stone-100 to-stone-200">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-stone-400 to-stone-600"
                      style={{ 
                        opacity: tint.name === 'Clear' ? '0.1' : 
                               tint.name === 'Black' ? '0.8' : '0.3',
                        background: tint.name === 'Bronze' ? 'linear-gradient(to bottom right, #92400e, #78350f)' :
                                   tint.name === 'Grey' ? 'linear-gradient(to bottom right, #6b7280, #4b5563)' :
                                   tint.name === 'Blue' ? 'linear-gradient(to bottom right, #3b82f6, #1d4ed8)' :
                                   tint.name === 'Green' ? 'linear-gradient(to bottom right, #10b981, #059669)' :
                                   tint.name === 'Rose Gold' ? 'linear-gradient(to bottom right, #f59e0b, #d97706)' :
                                   tint.name === 'Black' ? 'linear-gradient(to bottom right, #111827, #000000)' :
                                   'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-mocha-950">{tint.name}</span>
                    <p className="text-xs text-stone-600 leading-tight">{tint.description}</p>
                  </div>

                  {carbonRockData.mirrorTint === tint.name && (
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

            {/* Mirror Guide */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-mocha-950 mb-3">Mirror Tint Applications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
                    <div className="space-y-2">
                      <div><strong>Clear:</strong> Maximum reflection, bright spaces, gyms</div>
                      <div><strong>Bronze/Grey:</strong> Reduces glare, warm/cool tones</div>
                      <div><strong>Blue/Green:</strong> Decorative accents, feature walls</div>
                    </div>
                    <div className="space-y-2">
                      <div><strong>Rose Gold:</strong> Luxury finishes, premium interiors</div>
                      <div><strong>Black:</strong> One-way mirror effect, privacy applications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Thickness Selection */}
      <section className="space-y-6" aria-labelledby="thickness-heading">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
            <Ruler className="w-4 h-4 text-leather-600" />
          </div>
          <h2 id="thickness-heading" className="text-xl font-bold text-mocha-950">
            Board Thickness Selection
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {thicknessOptions.map((thickness) => (
            <button
              key={thickness.value}
              onClick={() => handleFieldChange('thickness', thickness.value)}
              className={`group relative p-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md ${
                carbonRockData.thickness === thickness.value
                  ? 'border-leather-300 bg-leather-50 ring-2 ring-leather-200'
                  : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              {thickness.recommended && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="space-y-2">
                <span className="text-lg font-bold text-mocha-950">{thickness.value}</span>
                <p className="text-xs text-stone-600">{thickness.description}</p>
              </div>

              {carbonRockData.thickness === thickness.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-4 h-4 bg-leather-600 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-2.5 h-2.5 text-white" />
                </motion.div>
              )}
            </button>
          ))}
        </div>
        
        <p className="text-sm text-stone-500 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Thicker boards provide enhanced durability, better acoustic performance, and superior structural integrity
        </p>
      </section>

      {/* Dimensions */}
      <section className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm" aria-labelledby="dimensions-heading">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-leather-100 rounded-xl flex items-center justify-center">
            <Ruler className="w-5 h-5 text-leather-600" />
          </div>
          <div>
            <h3 id="dimensions-heading" className="text-xl font-bold text-mocha-950">
              Board Dimensions
            </h3>
            <p className="text-sm text-stone-600">Specify precise measurements for accurate pricing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="board-width" className="block text-sm font-semibold text-mocha-950">
              Width (meters)
            </label>
            <input
              type="number"
              id="board-width"
              min="0.1"
              step="0.1"
              value={carbonRockData.dimensions.width || ''}
              onChange={(e) => handleDimensionChange('width', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 2.4"
              className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl text-mocha-950 
                focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                transition-all duration-200 hover:border-stone-400"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="board-height" className="block text-sm font-semibold text-mocha-950">
              Height (meters)
            </label>
            <input
              type="number"
              id="board-height"
              min="0.1"
              step="0.1"
              value={carbonRockData.dimensions.height || ''}
              onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 1.2"
              className="w-full px-4 py-3 bg-white border-2 border-stone-300 rounded-xl text-mocha-950 
                focus:outline-none focus:ring-4 focus:ring-leather-200 focus:border-leather-600 
                transition-all duration-200 hover:border-stone-400"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="board-area" className="block text-sm font-semibold text-mocha-950">
              Total Area (m²)
            </label>
            <div className="relative">
              <input
                type="text"
                id="board-area"
                value={carbonRockData.dimensions.area.toFixed(2)}
                readOnly
                className="w-full px-4 py-3 bg-stone-100 border-2 border-stone-300 rounded-xl text-mocha-950 cursor-not-allowed"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Options */}
      <section className="space-y-6" aria-labelledby="installation-heading">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-leather-100 rounded-lg flex items-center justify-center">
            <Wrench className="w-4 h-4 text-leather-600" />
          </div>
          <h2 id="installation-heading" className="text-xl font-bold text-mocha-950">
            Installation Service
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <button
            onClick={() => handleFieldChange('installation', 'professional')}
            className={`group p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
              carbonRockData.installation === 'professional'
                ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-4 ring-leather-200 shadow-md'
                : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
            }`}
            role="radio"
            aria-checked={carbonRockData.installation === 'professional'}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                carbonRockData.installation === 'professional' ? 'bg-leather-600' : 'bg-leather-100 group-hover:bg-leather-200'
              }`}>
                <Shield className={`w-6 h-6 ${carbonRockData.installation === 'professional' ? 'text-white' : 'text-leather-600'}`} />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-mocha-950">Professional Installation</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Specialized installation service for carbon rock boards with proper mounting, sealing, 
                  and finishing by certified technicians.
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Expert installation team</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Quality guarantee & warranty</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Professional tools & materials</span>
                  </div>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleFieldChange('installation', 'diy')}
            className={`group p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
              carbonRockData.installation === 'diy'
                ? 'bg-gradient-to-br from-leather-50 to-leather-100 border-leather-300 ring-4 ring-leather-200 shadow-md'
                : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
            }`}
            role="radio"
            aria-checked={carbonRockData.installation === 'diy'}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                carbonRockData.installation === 'diy' ? 'bg-leather-600' : 'bg-leather-100 group-hover:bg-leather-200'
              }`}>
                <Wrench className={`w-6 h-6 ${carbonRockData.installation === 'diy' ? 'text-white' : 'text-leather-600'}`} />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-mocha-950">DIY Installation Kit</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    Cost Effective
                  </span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Complete installation kit with detailed instructions, mounting hardware, 
                  and dedicated technical support throughout your project.
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Comprehensive installation guide</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>All mounting hardware included</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Technical support hotline</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="bg-gradient-to-r from-clay-50 to-stone-50 border border-clay-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-leather-600 rounded-xl flex items-center justify-center shadow-sm">
              <Info className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-mocha-950">
              Technical Specifications & Warranty
            </h3>
            <div className="prose prose-sm text-stone-700 max-w-none">
              <p className="leading-relaxed">
                Our <strong>carbon rock boards</strong> are engineered for exceptional durability and performance. 
                All boards meet stringent fire safety standards (Class A fire rating) and environmental regulations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-mocha-950 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    Quality Assurance
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 10-year comprehensive warranty</li>
                    <li>• Fire safety certified (Class A)</li>
                    <li>• Moisture resistant construction</li>
                    <li>• UV stable finish options</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-mocha-950 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Customization Options
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Custom sizes available</li>
                    <li>• Special finishes on request</li>
                    <li>• Bespoke color matching</li>
                    <li>• Project-specific solutions</li>
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
