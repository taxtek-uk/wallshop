import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Zap, AlertTriangle } from 'lucide-react';
import ModuleCard from './ModuleCard';

interface WallDimensions {
  width: number;
  height: number;
}

interface DropZoneProps {
  placedModules: any[];
  finish: 'stone' | 'metal';
  onModuleClick: (moduleId: string) => void;
  onClearWall: () => void;
  wallDimensions: WallDimensions;
}

const DropZone: React.FC<DropZoneProps> = ({ 
  placedModules, 
  finish, 
  onModuleClick, 
  onClearWall,
  wallDimensions
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'wall-dropzone',
  });

  // Calculate total width and utilization
  const totalWidth = placedModules.reduce((sum, module) => sum + module.width, 0);
  const utilization = (totalWidth / wallDimensions.width) * 100;
  const isOverCapacity = utilization > 100;
  const remainingWidth = wallDimensions.width - totalWidth;

  // Calculate visual scale for the drop zone
  const maxDisplayWidth = 800; // Maximum width for display
  const scaleRatio = Math.min(maxDisplayWidth / wallDimensions.width, 1);
  const displayWidth = wallDimensions.width * scaleRatio;
  const displayHeight = 140;

  return (
    <div className="w-full">
      {/* Header with total width and clear button */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Wall Construction
          {placedModules.length > 0 && (
            <span className={`ml-2 ${isOverCapacity ? 'text-red-600' : 'text-blue-600'}`}>
              ({(totalWidth / 1000).toFixed(1)}m / {(wallDimensions.width / 1000).toFixed(1)}m)
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

      {/* Wall Dimensions Display */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="font-medium text-blue-800">
              Wall: {(wallDimensions.width / 1000).toFixed(1)}m × {(wallDimensions.height / 1000).toFixed(1)}m
            </span>
            {remainingWidth > 0 && (
              <span className="text-blue-600">
                Remaining: {(remainingWidth / 1000).toFixed(1)}m
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isOverCapacity ? (
              <div className="flex items-center text-red-600">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Over capacity</span>
              </div>
            ) : utilization > 90 ? (
              <div className="flex items-center text-green-600">
                <Zap className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Optimal fit</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Drop zone area with scale representation */}
      <motion.div
        ref={setNodeRef}
        className={`
          relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 mx-auto
          ${isOver ? 'border-blue-500 bg-blue-50' : 
            isOverCapacity ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}
        `}
        style={{
          width: `${displayWidth}px`,
          minHeight: `${displayHeight}px`,
          maxWidth: '100%'
        }}
        animate={{
          backgroundColor: isOver ? '#eff6ff' : isOverCapacity ? '#fef2f2' : '#f9fafb',
          borderColor: isOver ? '#3b82f6' : isOverCapacity ? '#fca5a5' : '#d1d5db',
        }}
      >
        {/* Scale indicator */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          Scale: {(scaleRatio * 100).toFixed(0)}%
        </div>

        {/* Wall outline */}
        <div 
          className="absolute inset-4 border border-gray-400 border-dashed rounded opacity-30"
          style={{
            width: `${displayWidth - 32}px`,
            height: `${displayHeight - 32}px`
          }}
        />

        {/* Empty state */}
        {placedModules.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Building2 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <div>Drag wall modules here to start building</div>
              <div className="text-sm mt-1">
                Wall size: {(wallDimensions.width / 1000).toFixed(1)}m × {(wallDimensions.height / 1000).toFixed(1)}m
              </div>
            </div>
          </div>
        )}

        {/* Placed modules with sliding animation */}
        {placedModules.length > 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-1 overflow-visible">
              <AnimatePresence>
                {placedModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      x: -50,
                      rotateY: -90 
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: 0,
                      rotateY: 0 
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      x: 50,
                      rotateY: 90 
                    }}
                    transition={{ 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      zIndex: 10,
                      transition: { duration: 0.2 }
                    }}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <ModuleCard
                      module={module}
                      isPlaced={true}
                      finish={finish}
                      onClick={() => onModuleClick(module.id)}
                      scale={scaleRatio}
                    />
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

        {/* Drop indicator */}
        {isOver && !isOverCapacity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 rounded-lg"
          >
            <div className="text-blue-600 font-semibold flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Drop module here
            </div>
          </motion.div>
        )}

        {/* Utilization bar */}
        {placedModules.length > 0 && (
          <div className="absolute bottom-2 left-4 right-4">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <motion.div
                className={`h-1 rounded-full transition-all duration-500 ${
                  utilization > 100 ? 'bg-red-500' : 
                  utilization > 90 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(utilization, 100)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(utilization, 100)}%` }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Module count and width info */}
      <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
        <span>Modules: {placedModules.length}</span>
        <span>
          Utilization: 
          <span className={`ml-1 font-medium ${
            utilization > 100 ? 'text-red-600' : 
            utilization > 90 ? 'text-green-600' : 'text-blue-600'
          }`}>
            {utilization.toFixed(1)}%
          </span>
        </span>
        {totalWidth > 0 && (
          <span>Total: {(totalWidth / 1000).toFixed(1)}m</span>
        )}
      </div>
    </div>
  );
};

export default DropZone;

