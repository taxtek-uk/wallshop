import React from 'react';
import { motion } from 'framer-motion';
import ModuleCard, { ModuleData } from './ModuleCard';

interface ModulePaletteProps {
  finish: 'stone' | 'metal';
}

const ModulePalette: React.FC<ModulePaletteProps> = ({ finish }) => {
  // Available module sizes
  const availableModules: ModuleData[] = [
    { id: 'module-400', width: 400, accessories: [] },
    { id: 'module-600', width: 600, accessories: [] },
    { id: 'module-800', width: 800, accessories: [] },
    { id: 'module-1000', width: 1000, accessories: [] },
    { id: 'module-1100', width: 1100, accessories: [] },
    { id: 'module-1200', width: 1200, accessories: [] },
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Available Wall Modules</h3>
      
      {/* Desktop grid layout */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {availableModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-center"
          >
            <ModuleCard module={module} finish={finish} />
          </motion.div>
        ))}
      </div>

      {/* Mobile horizontal scroll layout */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {availableModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0"
            >
              <ModuleCard module={module} finish={finish} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
      >
        <div className="text-sm text-blue-800">
          <strong>Instructions:</strong>
          <ul className="mt-1 space-y-1">
            <li>• Drag modules to the construction area above</li>
            <li>• Maximum 4 modules per wall</li>
            <li>• Click placed modules to add accessories</li>
            <li>• Change wall finish using the selector</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ModulePalette;
