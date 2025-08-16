import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Volume2, Lightbulb, Plus, Check } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { SmartWallsFormData } from '@/types/quote';

export default function StepSmartWalls() {
  const { state, updateProductData } = useQuote();
  const smartWallsData = (state.formData.smartWalls || {
    tvIntegration: false,
    speakers: false,
    lighting: false,
    additionalFeatures: [],
  }) as SmartWallsFormData;

  const handleFieldChange = (field: keyof SmartWallsFormData, value: any) => {
    const updatedData = { ...smartWallsData, [field]: value };
    updateProductData('smart-walls', updatedData);
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = smartWallsData.additionalFeatures || [];
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    handleFieldChange('additionalFeatures', updatedFeatures);
  };

  const screenSizeOptions = [
    '32"', '40"', '43"', '50"', '55"', '65"', '75"', '85"', '100"+'
  ];

  const mountTypeOptions = [
    'Fixed Wall Mount', 'Tilting Mount', 'Full Motion Mount', 'Ceiling Mount'
  ];

  const speakerTypeOptions = [
    'In-Wall Speakers', 'Soundbar Integration', 'Bookshelf Speakers', 'Floor Standing'
  ];

  const lightingTypeOptions = [
    'LED Strip Lighting', 'Recessed Spotlights', 'Accent Lighting', 'Smart Bulbs'
  ];

  const additionalFeatureOptions = [
    'Cable Management', 'Wireless Charging Pad', 'USB Outlets', 'Smart Home Hub Integration',
    'Temperature Control', 'Air Quality Monitoring', 'Security Camera Integration'
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
          Smart Walls Configuration
        </h2>
        <p className="text-stone-400 text-sm">
          Let's customize your smart wall system with the perfect features for your space.
        </p>
      </div>

      {/* TV Integration Section */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Tv className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">TV Integration</h3>
              <p className="text-sm text-stone-600">Mount and integrate your display seamlessly</p>
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
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
          >
            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Screen Size
              </label>
              <select
                value={smartWallsData.screenSize || ''}
                onChange={(e) => handleFieldChange('screenSize', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select screen size</option>
                {screenSizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Mount Type
              </label>
              <select
                value={smartWallsData.mountType || ''}
                onChange={(e) => handleFieldChange('mountType', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select mount type</option>
                {mountTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                AV Equipment
              </label>
              <input
                type="text"
                value={smartWallsData.avEquipment || ''}
                onChange={(e) => handleFieldChange('avEquipment', e.target.value)}
                placeholder="e.g., Apple TV, Sky Box, etc."
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Gaming Consoles
              </label>
              <input
                type="text"
                value={smartWallsData.consoles || ''}
                onChange={(e) => handleFieldChange('consoles', e.target.value)}
                placeholder="e.g., PlayStation, Xbox, etc."
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Speakers Section */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">Audio System</h3>
              <p className="text-sm text-stone-600">Integrate speakers for immersive sound</p>
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
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
          >
            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Speaker Type
              </label>
              <select
                value={smartWallsData.speakerType || ''}
                onChange={(e) => handleFieldChange('speakerType', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select speaker type</option>
                {speakerTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={smartWallsData.speakerQuantity || ''}
                onChange={(e) => handleFieldChange('speakerQuantity', parseInt(e.target.value))}
                placeholder="Number of speakers"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Surround Setup
              </label>
              <select
                value={smartWallsData.surroundSetup || ''}
                onChange={(e) => handleFieldChange('surroundSetup', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select setup</option>
                <option value="2.0 Stereo">2.0 Stereo</option>
                <option value="2.1 with Subwoofer">2.1 with Subwoofer</option>
                <option value="5.1 Surround">5.1 Surround</option>
                <option value="7.1 Surround">7.1 Surround</option>
                <option value="Atmos">Dolby Atmos</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Lighting Section */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">Smart Lighting</h3>
              <p className="text-sm text-stone-600">Add ambient and accent lighting</p>
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
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
          >
            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Lighting Type
              </label>
              <select
                value={smartWallsData.lightingType || ''}
                onChange={(e) => handleFieldChange('lightingType', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select lighting type</option>
                {lightingTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-mocha-950">
                Color Control
              </label>
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
          </motion.div>
        )}
      </div>

      {/* Additional Features */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-mocha-950 mb-4">Additional Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {additionalFeatureOptions.map(feature => (
            <button
              key={feature}
              onClick={() => handleFeatureToggle(feature)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                smartWallsData.additionalFeatures?.includes(feature)
                  ? 'bg-leather-50 border-leather-300 text-leather-700'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="text-sm font-medium">{feature}</span>
              {smartWallsData.additionalFeatures?.includes(feature) ? (
                <Check className="w-4 h-4 text-leather-600" />
              ) : (
                <Plus className="w-4 h-4 text-stone-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

