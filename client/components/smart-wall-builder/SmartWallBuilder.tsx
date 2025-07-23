import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import ModuleCard from '@/components/smart-wall-builder/ModuleCard';
import DropZone from '@/components/smart-wall-builder/DropZone';
import ModulePalette from '@/components/smart-wall-builder/ModulePalette';
import FinishSelector from '@/components/smart-wall-builder/FinishSelector';
import AccessoryMenu from '@/components/smart-wall-builder/AccessoryMenu';
import WallShowcase from '@/components/smart-wall-builder/WallShowcase';


const SmartWallBuilder = () => {
  // State management
  const [placedModules, setPlacedModules] = useState([]);
  const [wallFinish, setWallFinish] = useState('stone');
  const [activeId, setActiveId] = useState(null);
  const [accessoryMenuOpen, setAccessoryMenuOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  // Available module templates
  const moduleTemplates = {
    'module-400': { id: 'module-400', width: 400, accessories: [] },
    'module-600': { id: 'module-600', width: 600, accessories: [] },
    'module-800': { id: 'module-800', width: 800, accessories: [] },
    'module-1000': { id: 'module-1000', width: 1000, accessories: [] },
    'module-1100': { id: 'module-1100', width: 1100, accessories: [] },
    'module-1200': { id: 'module-1200', width: 1200, accessories: [] },
  };

  // Drag and drop handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && over.id === 'wall-dropzone') {
      const moduleId = active.id;
      
      // Check if module is already placed or if we've reached the limit
      if (placedModules.some(m => m.id === moduleId) || placedModules.length >= 4) {
        return;
      }

      // Create a new module instance with unique ID for placement
      const template = moduleTemplates[moduleId];
      if (template) {
        const newModule = {
          ...template,
          id: `placed-${moduleId}-${Date.now()}`, // Unique ID for placed module
          accessories: []
        };
        
        setPlacedModules(prev => [...prev, newModule]);
      }
    }
  };

  // Module interaction handlers
  const handleModuleClick = (moduleId) => {
    setSelectedModuleId(moduleId);
    setAccessoryMenuOpen(true);
  };

  const handleAccessoryToggle = (accessory) => {
    if (!selectedModuleId) return;

    setPlacedModules(prev => prev.map(module => {
      if (module.id === selectedModuleId) {
        const accessories = module.accessories.includes(accessory)
          ? module.accessories.filter(a => a !== accessory)
          : [...module.accessories, accessory];
        return { ...module, accessories };
      }
      return module;
    }));
  };

  const handleClearWall = () => {
    setPlacedModules([]);
  };

  const handleCloseAccessoryMenu = () => {
    setAccessoryMenuOpen(false);
    setSelectedModuleId(null);
  };

  // Get current module's accessories for the menu
  const selectedModule = placedModules.find(m => m.id === selectedModuleId);
  const selectedAccessories = selectedModule?.accessories || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        > */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Smart Wall Builder
          </h1>
          <p className="text-gray-600">
            Design your modular smart wall system with drag-and-drop functionality
          </p>
        {/* </motion.div> */}

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Wall Construction */}
            <div className="lg:col-span-2 space-y-6">
              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              > */}
                <DropZone
                  placedModules={placedModules}
                  finish={wallFinish}
                  onModuleClick={handleModuleClick}
                  onClearWall={handleClearWall}
                />
              {/* </motion.div> */}

              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              > */}
                <ModulePalette finish={wallFinish} />
              {/* </motion.div> */}
            </div>

            {/* Right Column - Controls */}
            <div className="space-y-6">
              {/* <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              > */}
                <FinishSelector
                  selectedFinish={wallFinish}
                  onFinishChange={setWallFinish}
                />
              {/* </motion.div> */}

              {/* Wall Showcase */}
              {/* <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              > */}
                <WallShowcase selectedFinish={wallFinish} />
              {/* </motion.div> */}

              {/* Wall Summary */}
              {/* <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              > */}
                <h3 className="text-lg font-semibold mb-4">Wall Summary</h3>
                
                {placedModules.length === 0 ? (
                  <p className="text-gray-500">No modules placed yet</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Modules:</span>
                      <span className="font-semibold">{placedModules.length}/4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Width:</span>
                      <span className="font-semibold">
                        {placedModules.reduce((sum, m) => sum + m.width, 0)}mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Finish:</span>
                      <span className="font-semibold capitalize">{wallFinish}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accessories:</span>
                      <span className="font-semibold">
                        {placedModules.reduce((sum, m) => sum + m.accessories.length, 0)}
                      </span>
                    </div>
                  </div>
                )}
              {/* </motion.div> */}
            </div>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId ? (
              <ModuleCard
                module={moduleTemplates[activeId]}
                finish={wallFinish}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Accessory Menu Modal */}
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