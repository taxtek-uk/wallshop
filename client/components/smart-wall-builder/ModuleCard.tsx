import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Tv, Flame, Zap } from 'lucide-react';

export interface ModuleData {
  id: string;
  width: number; // in mm
  accessories: string[];
}

interface ModuleCardProps {
  module: ModuleData;
  isPlaced?: boolean;
  finish?: 'stone' | 'metal';
  onClick?: () => void;
  scale?: number;
  showConnectors?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  isPlaced = false, 
  finish = 'stone',
  onClick,
  scale = 1,
  showConnectors = false
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: module.id,
    disabled: isPlaced,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // Calculate relative width for visual representation (base: 400mm = 100px)
  const baseWidth = (module.width / 400) * 100;
  const visualWidth = baseWidth * scale;
  const visualHeight = isPlaced ? 120 * scale : 80 * scale;

  // Finish styles with enhanced gradients
  const finishStyles = {
    stone: {
      background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 50%, #6b7280 100%)',
      border: '2px solid #4b5563',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    metal: {
      background: 'linear-gradient(135deg, #cbd5e1 0%, #64748b 50%, #475569 100%)',
      border: '2px solid #334155',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    }
  };

  const currentStyle = finishStyles[finish];

  // Determine if this is a special module (TV or Fire)
  const hasTV = module.accessories.includes('tv');
  const hasFire = module.accessories.includes('fire');
  const isSpecialModule = hasTV || hasFire;

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        width: `${visualWidth}px`,
        height: `${visualHeight}px`,
        minWidth: `${visualWidth}px`,
        background: currentStyle.background,
        border: currentStyle.border,
        boxShadow: isDragging ? '0 8px 25px rgba(0, 0, 0, 0.3)' : currentStyle.shadow,
      }}
      {...listeners}
      {...attributes}
      className={`
        relative rounded-lg cursor-pointer transition-all duration-300 overflow-hidden
        ${isPlaced ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}
        ${isDragging ? 'opacity-50 z-50 rotate-3' : 'opacity-100'}
        ${isSpecialModule ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
      `}
      onClick={onClick}
      whileHover={!isPlaced ? { 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.2 }
      } : {
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={!isPlaced ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Module label with enhanced styling */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
        <span className="font-semibold">{module.width}mm</span>
      </div>

      {/* Special module indicators */}
      {isSpecialModule && (
        <div className="absolute top-2 right-2 flex gap-1">
          {hasTV && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <Tv className="w-3 h-3 text-white" />
            </motion.div>
          )}
          {hasFire && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <Flame className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </div>
      )}

      {/* Connectors for placed modules */}
      {isPlaced && showConnectors && (
        <>
          {/* Left connector */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-8 bg-gray-600 rounded-l-full opacity-70" />
          {/* Right connector */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-8 bg-gray-600 rounded-r-full opacity-70" />
        </>
      )}

      {/* Accessories display with  layout */}
      {isPlaced && module.accessories.length > 0 && (
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 p-2">
          {module.accessories.slice(0, 4).map((accessory, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm backdrop-blur-sm bg-opacity-90"
            >
              {accessory}
            </motion.div>
          ))}
          {module.accessories.length > 4 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full shadow-sm"
            >
              +{module.accessories.length - 4}
            </motion.div>
          )}
        </div>
      )}

      {/* Click indicator for placed modules */}
      {isPlaced && (
        <div className="absolute bottom-2 right-2 text-white text-xs opacity-70 bg-black bg-opacity-50 px-2 py-1 rounded">
          <Zap className="w-3 h-3 inline mr-1" />
          Customize
        </div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity duration-300" />

      {/* 3D depth effect */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-black bg-opacity-20 rounded-b-lg" />
    </motion.div>
  );
};

export default ModuleCard;

