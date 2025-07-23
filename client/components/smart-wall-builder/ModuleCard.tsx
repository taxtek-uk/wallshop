import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

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
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  isPlaced = false, 
  finish = 'stone',
  onClick 
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: module.id,
    disabled: isPlaced,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // Calculate relative width for visual representation (base: 400mm = 100px)
  const visualWidth = (module.width / 400) * 100;

  // Finish styles
  const finishStyles = {
    stone: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 border-gray-600',
    metal: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 border-slate-700'
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        relative border-2 rounded-lg cursor-pointer transition-all duration-200
        ${isPlaced ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}
        ${isDragging ? 'opacity-50 z-50' : 'opacity-100'}
        ${finishStyles[finish]}
        ${isPlaced ? 'hover:shadow-lg' : 'hover:scale-105 hover:shadow-md'}
      `}
      style={{
        ...style,
        width: `${visualWidth}px`,
        height: isPlaced ? '120px' : '80px',
        minWidth: `${visualWidth}px`,
      }}
      onClick={onClick}
      whileHover={!isPlaced ? { scale: 1.05 } : {}}
      whileTap={!isPlaced ? { scale: 0.95 } : {}}
    >
      {/* Module label */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
        {module.width}mm
      </div>

      {/* Accessories display */}
      {isPlaced && module.accessories.length > 0 && (
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 p-2">
          {module.accessories.map((accessory, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
            >
              {accessory}
            </motion.div>
          ))}
        </div>
      )}

      {/* Click indicator for placed modules */}
      {isPlaced && (
        <div className="absolute bottom-2 right-2 text-white text-xs opacity-70">
          Click to customize
        </div>
      )}
    </motion.div>
  );
};

export default ModuleCard;
