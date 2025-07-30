import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Calculator, AlertTriangle, CheckCircle, Info, Building2, Tv, Flame } from 'lucide-react';

const SmartWallConstructionPage = () => {
  const [wallDimensions, setWallDimensions] = useState({ width: 0, height: 0 });
  const [dimensionsSet, setDimensionsSet] = useState(false);
  const [placedModules, setPlacedModules] = useState([]);
  const [wallFinish, setWallFinish] = useState('stone');
  const [hasTV, setHasTV] = useState(false);
  const [hasFire, setHasFire] = useState(false);

  const moduleTemplates = [
    { id: 'module-400', width: 400, name: '400mm' },
    { id: 'module-600', width: 600, name: '600mm' },
    { id: 'module-800', width: 800, name: '800mm' },
    { id: 'module-1000', width: 1000, name: '1000mm' },
    { id: 'module-1100', width: 1100, name: '1100mm' },
    { id: 'module-1200', width: 1200, name: '1200mm' },
  ];

  const handleDimensionSubmit = () => {
    if (wallDimensions.width > 0 && wallDimensions.height > 0) {
      setDimensionsSet(true);
    }
  };

  const handleDimensionReset = () => {
    setDimensionsSet(false);
    setPlacedModules([]);
    setWallDimensions({ width: 0, height: 0 });
    setHasTV(false);
    setHasFire(false);
  };

  const addModule = (moduleTemplate) => {
    const currentWidth = placedModules.reduce((sum, m) => sum + m.width, 0);
    const newTotalWidth = currentWidth + moduleTemplate.width;

    if (newTotalWidth <= wallDimensions.width + 100) {
      const newModule = {
        ...moduleTemplate,
        id: `placed-${moduleTemplate.id}-${Date.now()}`,
        accessories: [],
      };
      setPlacedModules(prev => [...prev, newModule]);
    }
  };

  const removeModule = (moduleId) => {
    setPlacedModules(prev => prev.filter(m => m.id !== moduleId));
  };

  const clearWall = () => {
    setPlacedModules([]);
  };

  const currentTotalWidth = placedModules.reduce((sum, m) => sum + m.width, 0);
  const widthUtilization = dimensionsSet ? (currentTotalWidth / wallDimensions.width) * 100 : 0;
  const isOverCapacity = widthUtilization > 100;

  // Finish styles
  const finishStyles = {
    stone: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
    metal: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600'
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Smart Wall Builder
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Design your modular smart wall system with precision and intelligence.
          </p>
        </header>

        {/* Wall Dimensions Input Section */}
        {!dimensionsSet && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-10"
          >
            <div className="text-center mb-6">
              <Ruler className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Wall Dimensions</h2>
              <p className="text-gray-600">
                Start by entering your wall dimensions to get personalized module recommendations
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (mm)
                  </label>
                  <input
                    type="number"
                    value={wallDimensions.width || ''}
                    onChange={(e) => setWallDimensions(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5700"
                    min="1000"
                    max="10000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Min: 1000mm, Max: 10000mm</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (mm)
                  </label>
                  <input
                    type="number"
                    value={wallDimensions.height || ''}
                    onChange={(e) => setWallDimensions(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2500"
                    min="2200"
                    max="4000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Min: 2200mm, Max: 4000mm</p>
                </div>
              </div>

              {/* Special Requirements */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Special Requirements</h3>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hasTV}
                      onChange={(e) => setHasTV(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">TV Mount (requires 2x 1000mm)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hasFire}
                      onChange={(e) => setHasFire(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Fire (requires 2x 1000mm)</span>
                  </label>
                </div>
              </div>

              <motion.button
                onClick={handleDimensionSubmit}
                disabled={!wallDimensions.width || !wallDimensions.height}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calculator className="w-5 h-5 inline mr-2" />
                Start Building Your Wall
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* Main Builder Interface */}
        {dimensionsSet && (
          <div className="space-y-8">
            {/* Wall Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Wall Size:</span>
                    <span className="ml-2 text-blue-600 font-semibold">
                      {(wallDimensions.width / 1000).toFixed(1)}m × {(wallDimensions.height / 1000).toFixed(1)}m
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Used:</span>
                    <span className="ml-2 text-green-600 font-semibold">
                      {(currentTotalWidth / 1000).toFixed(1)}m ({widthUtilization.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Remaining:</span>
                    <span className="ml-2 text-orange-600 font-semibold">
                      {((wallDimensions.width - currentTotalWidth) / 1000).toFixed(1)}m
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleDimensionReset}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Change Dimensions
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      widthUtilization > 100 ? 'bg-red-500' : 
                      widthUtilization > 90 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(widthUtilization, 100)}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(widthUtilization, 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column - Wall Builder */}
              <div className="lg:col-span-2 space-y-8">
                {/* Wall Construction Area */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">
                      Wall Construction
                      {placedModules.length > 0 && (
                        <span className={`ml-2 ${isOverCapacity ? 'text-red-600' : 'text-blue-600'}`}>
                          ({(currentTotalWidth / 1000).toFixed(1)}m / {(wallDimensions.width / 1000).toFixed(1)}m)
                        </span>
                      )}
                    </div>
                    {placedModules.length > 0 && (
                      <motion.button
                        onClick={clearWall}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear Wall
                      </motion.button>
                    )}
                  </div>

                  {/* Drop Zone */}
                  <div className={`
                    relative min-h-[140px] border-2 border-dashed rounded-lg p-4 transition-all duration-200
                    ${isOverCapacity ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}
                  `}>
                    {/* Empty state */}
                    {placedModules.length === 0 && (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <Building2 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <div>Click modules below to add them to your wall</div>
                          <div className="text-sm mt-1">
                            Wall size: {(wallDimensions.width / 1000).toFixed(1)}m × {(wallDimensions.height / 1000).toFixed(1)}m
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Placed modules */}
                    {placedModules.length > 0 && (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex items-center gap-1 overflow-x-auto">
                          <AnimatePresence>
                            {placedModules.map((module, index) => (
                              <motion.div
                                key={module.id}
                                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 50 }}
                                transition={{ delay: index * 0.1 }}
                                className={`
                                  relative rounded-lg cursor-pointer transition-all duration-200 border-2
                                  ${finishStyles[wallFinish]} border-gray-600
                                `}
                                style={{
                                  width: `${(module.width / 400) * 80}px`,
                                  height: '100px',
                                  minWidth: `${(module.width / 400) * 80}px`,
                                }}
                                onClick={() => removeModule(module.id)}
                                whileHover={{ scale: 1.05 }}
                              >
                                <div className="absolute top-1 left-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                                  {module.width}mm
                                </div>
                                <div className="absolute bottom-1 right-1 text-white text-xs opacity-70">
                                  Click to remove
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}

                    {/* Capacity warning */}
                    {isOverCapacity && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center"
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Exceeds wall width
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Module Palette */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold mb-4">Available Wall Modules</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {moduleTemplates.map((module, index) => {
                      const remainingWidth = wallDimensions.width - currentTotalWidth;
                      const canFit = module.width <= remainingWidth + 100;
                      const isOptimal = module.width <= remainingWidth && module.width >= remainingWidth - 200;
                      
                      return (
                        <motion.div
                          key={module.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative"
                        >
                          <motion.button
                            onClick={() => addModule(module)}
                            disabled={!canFit}
                            className={`
                              w-full p-4 rounded-lg border-2 transition-all duration-200 text-center
                              ${canFit ? 'hover:scale-105 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                              ${finishStyles[wallFinish]} border-gray-600
                            `}
                            whileHover={canFit ? { scale: 1.05 } : {}}
                            whileTap={canFit ? { scale: 0.95 } : {}}
                          >
                            <div className="text-white font-semibold">{module.name}</div>
                            <div className="text-white text-xs mt-1">
                              {canFit ? (isOptimal ? 'Perfect fit!' : 'Will fit') : 'Too large'}
                            </div>
                          </motion.button>

                          {/* Status indicator */}
                          <div className="absolute -top-2 -right-2">
                            {isOptimal ? (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            ) : canFit ? (
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <Info className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Controls & Summary */}
              <div className="space-y-8">
                {/* Finish Selector */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Wall Finish</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setWallFinish('stone')}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        wallFinish === 'stone' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-gray-300 to-gray-500"></div>
                        <div className="text-left">
                          <div className="font-medium">Stone Effect</div>
                          <div className="text-sm text-gray-600">Natural stone texture</div>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setWallFinish('metal')}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        wallFinish === 'metal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-400 to-slate-600"></div>
                        <div className="text-left">
                          <div className="font-medium">Metal Effect</div>
                          <div className="text-sm text-gray-600">Brushed metal finish</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Wall Summary */}
                <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Wall Summary</h3>
                  {placedModules.length === 0 ? (
                    <p className="text-gray-500">No modules placed yet.</p>
                  ) : (
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex justify-between">
                        <span>Modules</span>
                        <span className="font-medium">{placedModules.length}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Total Width</span>
                        <span className="font-medium">
                          {(currentTotalWidth / 1000).toFixed(1)}m
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Wall Utilization</span>
                        <span className={`font-medium ${
                          widthUtilization > 100 ? 'text-red-600' : 
                          widthUtilization > 90 ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {widthUtilization.toFixed(1)}%
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Finish</span>
                        <span className="font-medium capitalize">{wallFinish}</span>
                      </li>
                    </ul>
                  )}

                  {/* Fit Status */}
                  {placedModules.length > 0 && (
                    <div className="mt-4 p-3 rounded-lg border">
                      {widthUtilization > 100 ? (
                        <div className="flex items-center text-red-600">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Modules exceed wall width</span>
                        </div>
                      ) : widthUtilization > 90 ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Excellent fit!</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-blue-600">
                          <Info className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Space available for more modules</span>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartWallConstructionPage;

