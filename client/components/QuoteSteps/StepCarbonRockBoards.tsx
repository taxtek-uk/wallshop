import React from 'react';
import { motion } from 'framer-motion';
import { Volume, Square, Ruler, Wrench } from 'lucide-react';
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
      description: 'Sound absorption and noise reduction',
      icon: Volume
    },
    { 
      value: 'mirror', 
      label: 'Mirror Boards', 
      description: 'Reflective surface with tinted options',
      icon: Square
    },
    { 
      value: 'standard', 
      label: 'Standard Boards', 
      description: 'Versatile carbon rock panels',
      icon: Square
    },
  ];

  const nrcRatingOptions = [
    { value: '0.85', label: 'NRC 0.85 - High Absorption' },
    { value: '0.70', label: 'NRC 0.70 - Good Absorption' },
    { value: '0.55', label: 'NRC 0.55 - Moderate Absorption' },
    { value: '0.40', label: 'NRC 0.40 - Basic Absorption' },
  ];

  const fabricColorOptions = [
    'Charcoal', 'Light Grey', 'Cream', 'Black', 'Navy Blue', 'Forest Green', 'Burgundy', 'Custom Color'
  ];

  const mirrorTintOptions = [
    'Clear', 'Bronze', 'Grey', 'Blue', 'Green', 'Rose Gold', 'Black'
  ];

  const thicknessOptions = [
    '6mm', '9mm', '12mm', '15mm', '18mm', '20mm', '25mm'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-mocha-950 mb-2">
          Carbon Rock Boards Configuration
        </h2>
        <p className="text-stone-400 text-sm">
          Configure your carbon rock boards with specialized features and finishes.
        </p>
      </div>

      {/* Board Type Selection */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-mocha-950 mb-6">Board Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {boardTypeOptions.map(option => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => handleFieldChange('boardType', option.value)}
                className={`p-6 rounded-lg border text-center transition-all duration-200 ${
                  carbonRockData.boardType === option.value
                    ? 'bg-leather-50 border-leather-300 ring-2 ring-leather-200'
                    : 'bg-white border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-leather-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-leather-600" />
                </div>
                <h4 className="font-semibold text-mocha-950 mb-2">{option.label}</h4>
                <p className="text-sm text-stone-600">{option.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Acoustic Board Configuration */}
      {carbonRockData.boardType === 'acoustic' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-stone-200 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Volume className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">Acoustic Configuration</h3>
              <p className="text-sm text-stone-600">Customize sound absorption properties</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-3">
                NRC Rating (Noise Reduction Coefficient)
              </label>
              <div className="space-y-2">
                {nrcRatingOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleFieldChange('acousticNrcRating', option.value)}
                    className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                      carbonRockData.acousticNrcRating === option.value
                        ? 'bg-leather-50 border-leather-300 text-leather-700'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-3">
                Fabric Color
              </label>
              <div className="grid grid-cols-2 gap-2">
                {fabricColorOptions.map(color => (
                  <button
                    key={color}
                    onClick={() => handleFieldChange('acousticFabricColor', color)}
                    className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                      carbonRockData.acousticFabricColor === color
                        ? 'bg-leather-50 border-leather-300 text-leather-700'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{color}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-clay-50 border border-clay-200 rounded-lg">
            <h4 className="font-medium text-mocha-950 mb-2">Acoustic Performance Guide</h4>
            <ul className="text-sm text-stone-600 space-y-1">
              <li>• <strong>NRC 0.85+:</strong> Ideal for recording studios, conference rooms</li>
              <li>• <strong>NRC 0.70:</strong> Perfect for offices, restaurants, open spaces</li>
              <li>• <strong>NRC 0.55:</strong> Good for residential living areas</li>
              <li>• <strong>NRC 0.40:</strong> Basic noise reduction for general use</li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Mirror Board Configuration */}
      {carbonRockData.boardType === 'mirror' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-stone-200 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Square className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">Mirror Configuration</h3>
              <p className="text-sm text-stone-600">Select tint and reflective properties</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-mocha-950 mb-3">
              Mirror Tint
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mirrorTintOptions.map(tint => (
                <button
                  key={tint}
                  onClick={() => handleFieldChange('mirrorTint', tint)}
                  className={`p-4 rounded-lg border text-center transition-all duration-200 ${
                    carbonRockData.mirrorTint === tint
                      ? 'bg-leather-50 border-leather-300 text-leather-700'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="text-sm font-medium">{tint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-clay-50 border border-clay-200 rounded-lg">
            <h4 className="font-medium text-mocha-950 mb-2">Mirror Tint Guide</h4>
            <ul className="text-sm text-stone-600 space-y-1">
              <li>• <strong>Clear:</strong> Maximum reflection, bright spaces</li>
              <li>• <strong>Bronze/Grey:</strong> Reduces glare, warm/cool tones</li>
              <li>• <strong>Blue/Green:</strong> Decorative tints for accent walls</li>
              <li>• <strong>Rose Gold:</strong> Luxury finish for premium spaces</li>
              <li>• <strong>Black:</strong> One-way mirror effect, privacy applications</li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Thickness Selection */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-mocha-950 mb-4">Board Thickness</h3>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
          {thicknessOptions.map(thickness => (
            <button
              key={thickness}
              onClick={() => handleFieldChange('thickness', thickness)}
              className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                carbonRockData.thickness === thickness
                  ? 'bg-leather-50 border-leather-300 text-leather-700'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="text-sm font-medium">{thickness}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-stone-500 mt-2">
          Thicker boards provide better durability and acoustic performance
        </p>
      </div>

      {/* Dimensions */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
            <Ruler className="w-5 h-5 text-leather-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-mocha-950">Dimensions</h3>
            <p className="text-sm text-stone-600">Specify the board dimensions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-mocha-950 mb-2">
              Width (meters)
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={carbonRockData.dimensions.width || ''}
              onChange={(e) => handleDimensionChange('width', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 2.4"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-mocha-950 mb-2">
              Height (meters)
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={carbonRockData.dimensions.height || ''}
              onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 1.2"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-mocha-950 mb-2">
              Total Area (m²)
            </label>
            <input
              type="text"
              value={carbonRockData.dimensions.area.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 bg-stone-100 border border-stone-300 rounded-lg 
                text-mocha-950 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Installation */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
            <Wrench className="w-5 h-5 text-leather-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-mocha-950">Installation</h3>
            <p className="text-sm text-stone-600">Choose your installation preference</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleFieldChange('installation', 'professional')}
            className={`p-4 rounded-lg border text-left transition-all duration-200 ${
              carbonRockData.installation === 'professional'
                ? 'bg-leather-50 border-leather-300 ring-2 ring-leather-200'
                : 'bg-white border-stone-200 hover:bg-stone-50'
            }`}
          >
            <h4 className="font-semibold text-mocha-950 mb-1">Professional Installation</h4>
            <p className="text-sm text-stone-600">
              Specialized installation for carbon rock boards with proper mounting and sealing
            </p>
          </button>

          <button
            onClick={() => handleFieldChange('installation', 'diy')}
            className={`p-4 rounded-lg border text-left transition-all duration-200 ${
              carbonRockData.installation === 'diy'
                ? 'bg-leather-50 border-leather-300 ring-2 ring-leather-200'
                : 'bg-white border-stone-200 hover:bg-stone-50'
            }`}
          >
            <h4 className="font-semibold text-mocha-950 mb-1">DIY Installation</h4>
            <p className="text-sm text-stone-600">
              Complete installation kit with detailed instructions and technical support
            </p>
          </button>
        </div>
      </div>

      {/* Technical Note */}
      <div className="bg-clay-50 border border-clay-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
          </div>
          <div className="text-sm text-mocha-950">
            <p className="font-medium mb-1">Technical Specifications</p>
            <p className="text-stone-600">
              Carbon rock boards are engineered for durability and performance. All boards meet 
              fire safety standards and come with a 10-year warranty. Custom sizes and special 
              finishes are available upon request.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

