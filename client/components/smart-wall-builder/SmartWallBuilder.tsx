import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Calculator, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import ModuleCard from './ModuleCard';
import DropZone from './DropZone';
import ModulePalette from './ModulePalette';
import FinishSelector from './FinishSelector';
import AccessoryMenu from './AccessoryMenu';
import WallShowcase from './WallShowcase';

const SmartWallBuilder = () => {
  const [wallDimensions, setWallDimensions] = useState({ width: 0, height: 0 });
  const [dimensionsSet, setDimensionsSet] = useState(false);
  const [placedModules, setPlacedModules] = useState([]);
  const [wallFinish, setWallFinish] = useState<'stone' | 'metal'>('stone');
  const [activeId, setActiveId] = useState(null);
  const [accessoryMenuOpen, setAccessoryMenuOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [hasTV, setHasTV] = useState(false);
  const [hasFire, setHasFire] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const moduleTemplates = {
    'module-400': { id: 'module-400', width: 400, accessories: [] },
    'module-600': { id: 'module-600', width: 600, accessories: [] },
    'module-800': { id: 'module-800', width: 800, accessories: [] },
    'module-1000': { id: 'module-1000', width: 1000, accessories: [] },
    'module-1100': { id: 'module-1100', width: 1100, accessories: [] },
    'module-1200': { id: 'module-1200', width: 1200, accessories: [] },
  };

  // Calculate module recommendations based on wall dimensions
  useEffect(() => {
    if (wallDimensions.width > 0) {
      const newRecommendations = calculateSimpleRecommendations();
      setRecommendations(newRecommendations);
    }
  }, [wallDimensions, hasTV, hasFire]);

  const calculateSimpleRecommendations = () => {
    const targetWidth = wallDimensions.width;
    const recommendations = [];
    
    // Simple recommendation logic
    if (hasTV) {
      const remainingWidth = targetWidth - 2000; // TV takes 2000mm
      if (remainingWidth > 0) {
        const sideWidth = remainingWidth / 2;
        if (sideWidth >= 800) {
          recommendations.push({
            modules: ['module-1000', 'module-800', 'module-1000', 'module-1000', 'module-800', 'module-1000'],
            totalWidth: 5600,
            description: 'TV Setup: 1000+800mm + TV(1000+1000)mm + 800+1000mm',
            isOptimal: true
          });
        }
      }
    } else {
      // General recommendations
      if (targetWidth >= 3600) {
        recommendations.push({
          modules: ['module-800', 'module-1000', 'module-1000', 'module-800'],
          totalWidth: 3600,
          description: '800 + 1000 + 1000 + 800mm modules',
          isOptimal: true
        });
      }
    }

    return recommendations;
  };

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

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over?.id === 'wall-dropzone') {
      const moduleId = active.id;

      if (placedModules.some(m => m.id === moduleId)) {
        return;
      }

      const template = moduleTemplates[moduleId];
      if (template) {
        const currentWidth = placedModules.reduce((sum, m) => sum + m.width, 0);
        const newTotalWidth = currentWidth + template.width;

        // Check if module fits
        if (newTotalWidth <= wallDimensions.width + 100) { // Allow small tolerance
          const newModule = {
            ...template,
            id: `placed-${moduleId}-${Date.now()}`,
            accessories: [],
          };
          setPlacedModules(prev => [...prev, newModule]);
        }
      }
    }
  };

  const handleModuleClick = (moduleId) => {
    setSelectedModuleId(moduleId);
    setAccessoryMenuOpen(true);
  };

  const handleAccessoryToggle = (accessory) => {
    if (!selectedModuleId) return;

    setPlacedModules(prev =>
      prev.map(module => {
        if (module.id === selectedModuleId) {
          const accessories = module.accessories.includes(accessory)
            ? module.accessories.filter(a => a !== accessory)
            : [...module.accessories, accessory];
          return { ...module, accessories };
        }
        return module;
      })
    );
  };

  const handleClearWall = () => setPlacedModules([]);
  const handleCloseAccessoryMenu = () => {
    setAccessoryMenuOpen(false);
    setSelectedModuleId(null);
  };

  const selectedModule = placedModules.find(m => m.id === selectedModuleId);
  const selectedAccessories = selectedModule?.accessories || [];
  const currentTotalWidth = placedModules.reduce((sum, m) => sum + m.width, 0);
  const widthUtilization = dimensionsSet ? (currentTotalWidth / wallDimensions.width) * 100 : 0;

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
                    placeholder="2100"
                    min="1800"
                    max="3000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Min: 1800mm, Max: 3000mm</p>
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
                Calculate Module Recommendations
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* Main Builder Interface */}
        {dimensionsSet && (
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {/* Wall Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6"
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
                <DropZone
                  placedModules={placedModules}
                  finish={wallFinish}
                  onModuleClick={handleModuleClick}
                  onClearWall={handleClearWall}
                  wallDimensions={wallDimensions}
                />
                <ModulePalette 
                  finish={wallFinish} 
                  wallDimensions={wallDimensions}
                  currentWidth={currentTotalWidth}
                />
              </div>

              {/* Right Column - Controls & Summary */}
              <div className="space-y-8">
                {/* Module Recommendations */}
                {recommendations.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-blue-600" />
                      Recommendations
                    </h3>
                    <div className="space-y-3">
                      {recommendations.slice(0, 3).map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border ${
                            rec.isOptimal ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {rec.description}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                Total: {(rec.totalWidth / 1000).toFixed(1)}m
                              </div>
                            </div>
                            {rec.isOptimal && (
                              <CheckCircle className="w-4 h-4 text-green-600 ml-2 flex-shrink-0" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                <FinishSelector
                  selectedFinish={wallFinish}
                  onFinishChange={setWallFinish}
                />

                <WallShowcase 
                  selectedFinish={wallFinish} 
                  placedModules={placedModules}
                  wallDimensions={wallDimensions}
                />

                {/* Enhanced Wall Summary */}
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
                          widthUtilization > 90 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {widthUtilization.toFixed(1)}%
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Finish</span>
                        <span className="font-medium capitalize">{wallFinish}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Accessories</span>
                        <span className="font-medium">
                          {placedModules.reduce((sum, m) => sum + m.accessories.length, 0)}
                        </span>
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

            {/* Drag Overlay */}
            <DragOverlay>
              {activeId && (
                <ModuleCard
                  module={moduleTemplates[activeId]}
                  finish={wallFinish}
                />
              )}
            </DragOverlay>
          </DndContext>
        )}

        {/* Accessory Menu */}
        <AccessoryMenu
          isOpen={accessoryMenuOpen}
          moduleId={selectedModuleId}
          selectedAccessories={selectedAccessories}
          onClose={handleCloseAccessoryMenu}
          onAccessoryToggle={handleAccessoryToggle}
        />
      </div>
    </div>
  );
};

export default SmartWallBuilder;

