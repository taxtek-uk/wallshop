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
  const [placedModules, setPlacedModules] = useState([]);
  const [wallFinish, setWallFinish] = useState<'stone' | 'metal'>('stone');
  const [activeId, setActiveId] = useState(null);
  const [accessoryMenuOpen, setAccessoryMenuOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  const moduleTemplates = {
    'module-400': { id: 'module-400', width: 400, accessories: [] },
    'module-600': { id: 'module-600', width: 600, accessories: [] },
    'module-800': { id: 'module-800', width: 800, accessories: [] },
    'module-1000': { id: 'module-1000', width: 1000, accessories: [] },
    'module-1100': { id: 'module-1100', width: 1100, accessories: [] },
    'module-1200': { id: 'module-1200', width: 1200, accessories: [] },
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over?.id === 'wall-dropzone') {
      const moduleId = active.id;

      if (placedModules.some(m => m.id === moduleId) || placedModules.length >= 4) {
        return;
      }

      const template = moduleTemplates[moduleId];
      if (template) {
        const newModule = {
          ...template,
          id: `placed-${moduleId}-${Date.now()}`,
          accessories: [],
        };
        setPlacedModules(prev => [...prev, newModule]);
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

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Smart Wall Builder
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Design your modular smart wall system with intuitive drag-and-drop functionality.
          </p>
        </header>

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Wall Builder */}
            <div className="lg:col-span-2 space-y-8">
              <DropZone
                placedModules={placedModules}
                finish={wallFinish}
                onModuleClick={handleModuleClick}
                onClearWall={handleClearWall}
              />
              <ModulePalette finish={wallFinish} />
            </div>

            {/* Right Column - Controls & Summary */}
            <div className="space-y-8">
              <FinishSelector
                selectedFinish={wallFinish}
                onFinishChange={setWallFinish}
              />

              <WallShowcase selectedFinish={wallFinish} />

              {/* Wall Summary */}
              <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Wall Summary</h3>
                {placedModules.length === 0 ? (
                  <p className="text-gray-500">No modules placed yet.</p>
                ) : (
                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="flex justify-between">
                      <span>Modules</span>
                      <span className="font-medium">{placedModules.length} / 4</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Width</span>
                      <span className="font-medium">
                        {placedModules.reduce((sum, m) => sum + m.width, 0)} mm
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
