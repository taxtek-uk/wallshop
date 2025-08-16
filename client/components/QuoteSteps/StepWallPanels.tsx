import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Ruler, Palette, Wrench } from 'lucide-react';
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
    { value: 'fluted', label: 'Fluted Panels', description: 'Vertical grooves for modern texture' },
    { value: 'hd-printing', label: 'HD Printing', description: 'High-definition printed patterns' },
    { value: 'textured', label: 'Textured Panels', description: 'Various surface textures' },
    { value: 'smooth', label: 'Smooth Panels', description: 'Clean, minimalist finish' },
  ];

  const flutedGrooveOptions = ['3mm', '6mm', '9mm', '12mm', '15mm'];
  const flutedSpacingOptions = ['10mm', '15mm', '20mm', '25mm', '30mm'];
  
  const hdPrintingPatterns = [
    'Wood Grain', 'Marble Veining', 'Concrete Texture', 'Fabric Weave', 
    'Stone Pattern', 'Metal Brushed', 'Custom Design'
  ];

  const textureTypes = [
    'Brushed', 'Hammered', 'Sandblasted', 'Embossed', 'Ribbed', 'Perforated'
  ];

  const finishOptions = [
    'Matte', 'Satin', 'Semi-Gloss', 'High Gloss', 'Natural', 'Stained'
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
          Wall Panels Configuration
        </h2>
        <p className="text-stone-400 text-sm">
          Design your perfect wall panels with custom patterns, textures, and finishes.
        </p>
      </div>

      {/* Panel Type Selection */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-leather-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-mocha-950">Panel Type</h3>
            <p className="text-sm text-stone-600">Choose your preferred panel style</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panelTypeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleFieldChange('panelType', option.value)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                wallPanelsData.panelType === option.value
                  ? 'bg-leather-50 border-leather-300 ring-2 ring-leather-200'
                  : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <h4 className="font-semibold text-mocha-950 mb-1">{option.label}</h4>
              <p className="text-sm text-stone-600">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Panel Configuration */}
      {wallPanelsData.panelType === 'fluted' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-stone-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-mocha-950 mb-4">Fluted Panel Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Groove Depth
              </label>
              <select
                value={wallPanelsData.flutedGrooveDepth || ''}
                onChange={(e) => handleFieldChange('flutedGrooveDepth', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select groove depth</option>
                {flutedGrooveOptions.map(depth => (
                  <option key={depth} value={depth}>{depth}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Groove Spacing
              </label>
              <select
                value={wallPanelsData.flutedSpacing || ''}
                onChange={(e) => handleFieldChange('flutedSpacing', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select spacing</option>
                {flutedSpacingOptions.map(spacing => (
                  <option key={spacing} value={spacing}>{spacing}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {wallPanelsData.panelType === 'hd-printing' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-stone-200 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">HD Printing Pattern</h3>
              <p className="text-sm text-stone-600">Choose your printed design</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hdPrintingPatterns.map(pattern => (
              <button
                key={pattern}
                onClick={() => handleFieldChange('hdPrintingPattern', pattern)}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  wallPanelsData.hdPrintingPattern === pattern
                    ? 'bg-leather-50 border-leather-300 text-leather-700'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="text-sm font-medium">{pattern}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {wallPanelsData.panelType === 'textured' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-stone-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-mocha-950 mb-4">Texture Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {textureTypes.map(texture => (
              <button
                key={texture}
                onClick={() => handleFieldChange('textureType', texture)}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  wallPanelsData.textureType === texture
                    ? 'bg-leather-50 border-leather-300 text-leather-700'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="text-sm font-medium">{texture}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Finish Selection */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-mocha-950 mb-4">Finish</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {finishOptions.map(finish => (
            <button
              key={finish}
              onClick={() => handleFieldChange('finish', finish)}
              className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                wallPanelsData.finish === finish
                  ? 'bg-leather-50 border-leather-300 text-leather-700'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="text-sm font-medium">{finish}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
            <Ruler className="w-5 h-5 text-leather-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-mocha-950">Dimensions</h3>
            <p className="text-sm text-stone-600">Specify the panel dimensions</p>
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
              value={wallPanelsData.dimensions.width || ''}
              onChange={(e) => handleDimensionChange('width', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 3.5"
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
              value={wallPanelsData.dimensions.height || ''}
              onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 2.4"
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
              value={wallPanelsData.dimensions.area.toFixed(2)}
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
              wallPanelsData.installation === 'professional'
                ? 'bg-leather-50 border-leather-300 ring-2 ring-leather-200'
                : 'bg-white border-stone-200 hover:bg-stone-50'
            }`}
          >
            <h4 className="font-semibold text-mocha-950 mb-1">Professional Installation</h4>
            <p className="text-sm text-stone-600">
              Our certified installers handle everything from measurement to completion
            </p>
          </button>

          <button
            onClick={() => handleFieldChange('installation', 'diy')}
            className={`p-4 rounded-lg border text-left transition-all duration-200 ${
              wallPanelsData.installation === 'diy'
                ? 'bg-leather-50 border-leather-300 ring-2 ring-leather-200'
                : 'bg-white border-stone-200 hover:bg-stone-50'
            }`}
          >
            <h4 className="font-semibold text-mocha-950 mb-1">DIY Installation</h4>
            <p className="text-sm text-stone-600">
              We'll provide detailed instructions and support for self-installation
            </p>
          </button>
        </div>
      </div>

      {/* Estimation Note */}
      <div className="bg-clay-50 border border-clay-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
          </div>
          <div className="text-sm text-mocha-950">
            <p className="font-medium mb-1">Accurate Measurements</p>
            <p className="text-stone-600">
              For the most accurate quote, we recommend a site survey. Our team can visit to take 
              precise measurements and assess any specific installation requirements.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

