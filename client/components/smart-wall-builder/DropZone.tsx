import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2 } from 'lucide-react';
import ModuleCard from './ModuleCard';

const DropZone = ({ 
  placedModules, 
  finish, 
  onModuleClick, 
  onClearWall 
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'wall-dropzone',
  });

  // Calculate total width
  const totalWidth = placedModules.reduce((sum, module) => sum + module.width, 0);

  return (
    <div className="w-full">
      {/* Header with total width and clear button */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Wall Construction
          {placedModules.length > 0 && (
            <span className="ml-2 text-blue-600">
              ({totalWidth}mm total)
            </span>
          )}
        </div>
        {placedModules.length > 0 && (
          <motion.button
            onClick={onClearWall}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Wall
          </motion.button>
        )}
      </div>

      {/* Drop zone area */}
      <motion.div
        ref={setNodeRef}
        className={`
          relative min-h-[140px] border-2 border-dashed rounded-lg p-4 transition-all duration-200
          ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          ${placedModules.length >= 4 ? 'border-red-300 bg-red-50' : ''}
        `}
        animate={{
          backgroundColor: isOver ? '#eff6ff' : '#f9fafb',
          borderColor: isOver ? '#3b82f6' : '#d1d5db',
        }}
      >
        {/* Empty state */}
        {placedModules.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Building2 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <div>Drag wall modules here to start building</div>
              <div className="text-sm mt-1">Maximum 4 modules</div>
            </div>
          </div>
        )}

        {/* Placed modules */}
        {placedModules.length > 0 && (
          <div className="flex items-center gap-1 overflow-x-auto">
            <AnimatePresence>
              {placedModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ModuleCard
                    module={module}
                    isPlaced={true}
                    finish={finish}
                    onClick={() => onModuleClick(module.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Module limit warning */}
        {placedModules.length >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            Maximum modules reached
          </motion.div>
        )}

        {/* Drop indicator */}
        {isOver && placedModules.length < 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 rounded-lg"
          >
            <div className="text-blue-600 font-semibold">Drop module here</div>
          </motion.div>
        )}
      </motion.div>

      {/* Module count and width info */}
      <div className="mt-2 text-sm text-gray-600 flex justify-between">
        <span>Modules: {placedModules.length}/4</span>
        {totalWidth > 0 && (
          <span>Total width: {(totalWidth / 1000).toFixed(1)}m</span>
        )}
      </div>
    </div>
  );
};

export default DropZone;