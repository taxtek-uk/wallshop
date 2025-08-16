import React from 'react';
import { motion } from 'framer-motion';
import { Tablet, Shield, Home, Check, Plus } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { SmartDevicesFormData } from '@/types/quote';

export default function StepSmartDevices() {
  const { state, updateProductData } = useQuote();
  const smartDevicesData = (state.formData.smartDevices || {
    controlPanels: false,
    securitySensors: false,
    homeAutomation: false,
  }) as SmartDevicesFormData;

  const handleFieldChange = (field: keyof SmartDevicesFormData, value: any) => {
    const updatedData = { ...smartDevicesData, [field]: value };
    updateProductData('smart-devices', updatedData);
  };

  const handleFeatureToggle = (category: 'securityFeatures' | 'automationFeatures', feature: string) => {
    const currentFeatures = smartDevicesData[category] || [];
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    handleFieldChange(category, updatedFeatures);
  };

  const panelModelOptions = [
    'Touch Panel 7"', 'Touch Panel 10"', 'Touch Panel 15"', 'Wall Switch Panel', 'Portable Remote'
  ];

  const roomOptions = [
    'Living Room', 'Kitchen', 'Master Bedroom', 'Guest Bedroom', 'Bathroom', 'Home Office', 'Hallway', 'Multiple Rooms'
  ];

  const mountTypeOptions = [
    'Wall Mounted', 'Desk Stand', 'In-Wall Flush', 'Ceiling Mount'
  ];

  const securityFeatureOptions = [
    'Door/Window Sensors', 'Glass Break Detection', 'Flood Sensors', 'Temperature Monitoring', 'Carbon Monoxide Detection'
  ];

  const automationFeatureOptions = [
    'Smart Thermostats', 'Automated Blinds', 'Smart Locks', 'Garage Door Control', 'Irrigation System', 'Pool/Spa Control'
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
          Smart Devices Configuration
        </h2>
        <p className="text-stone-400 text-sm">
          Choose the smart devices and automation systems for your intelligent home.
        </p>
      </div>

      {/* Control Panels Section */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Tablet className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">Control Panels</h3>
              <p className="text-sm text-stone-600">Central control for your smart home systems</p>
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
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
          >
            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Panel Model
              </label>
              <select
                value={smartDevicesData.panelModel || ''}
                onChange={(e) => handleFieldChange('panelModel', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select panel model</option>
                {panelModelOptions.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Primary Room
              </label>
              <select
                value={smartDevicesData.panelRoom || ''}
                onChange={(e) => handleFieldChange('panelRoom', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select room</option>
                {roomOptions.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mocha-950 mb-2">
                Mount Type
              </label>
              <select
                value={smartDevicesData.panelMountType || ''}
                onChange={(e) => handleFieldChange('panelMountType', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg 
                  text-mocha-950 focus:outline-none focus:ring-2 focus:ring-leather-600"
              >
                <option value="">Select mount type</option>
                {mountTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Security & Sensors Section */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">Security & Sensors</h3>
              <p className="text-sm text-stone-600">Protect your home with smart security systems</p>
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
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-mocha-950">
                  Motion Detection
                </label>
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

              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-mocha-950">
                  Smoke Detection
                </label>
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

            <div>
              <h4 className="text-sm font-medium text-mocha-950 mb-3">Additional Security Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {securityFeatureOptions.map(feature => (
                  <button
                    key={feature}
                    onClick={() => handleFeatureToggle('securityFeatures', feature)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                      smartDevicesData.securityFeatures?.includes(feature)
                        ? 'bg-leather-50 border-leather-300 text-leather-700'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{feature}</span>
                    {smartDevicesData.securityFeatures?.includes(feature) ? (
                      <Check className="w-4 h-4 text-leather-600" />
                    ) : (
                      <Plus className="w-4 h-4 text-stone-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Home Automation Section */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-leather-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-leather-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-mocha-950">Home Automation</h3>
              <p className="text-sm text-stone-600">Automate your home for comfort and efficiency</p>
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
            className="mt-4"
          >
            <h4 className="text-sm font-medium text-mocha-950 mb-3">Automation Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {automationFeatureOptions.map(feature => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle('automationFeatures', feature)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    smartDevicesData.automationFeatures?.includes(feature)
                      ? 'bg-leather-50 border-leather-300 text-leather-700'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="text-sm font-medium">{feature}</span>
                  {smartDevicesData.automationFeatures?.includes(feature) ? (
                    <Check className="w-4 h-4 text-leather-600" />
                  ) : (
                    <Plus className="w-4 h-4 text-stone-400" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Integration Notes */}
      <div className="bg-clay-50 border border-clay-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-leather-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
          </div>
          <div className="text-sm text-mocha-950">
            <p className="font-medium mb-1">Smart Integration</p>
            <p className="text-stone-600">
              All smart devices can be integrated with popular platforms like Google Home, Amazon Alexa, 
              and Apple HomeKit for seamless voice control and automation.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

