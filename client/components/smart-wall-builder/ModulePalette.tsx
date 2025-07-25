import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import ModuleCard, { ModuleData } from './ModuleCard';

interface WallDimensions {
  width: number;
  height: number;
}

interface ModulePaletteProps {
  finish: 'stone' | 'metal';
  wallDimensions: WallDimensions;
  currentWidth: number;
}

const ModulePalette: React.FC<ModulePaletteProps> = ({ 
  finish, 
  wallDimensions, 
  currentWidth 
}) => {
  // Available module sizes
  const availableModules: ModuleData[] = [
    { id: 'module-400', width: 400, accessories: [] },
    { id: 'module-600', width: 600, accessories: [] },
    { id: 'module-800', width: 800, accessories: [] },
    { id: 'module-1000', width: 1000, accessories: [] },
    { id: 'module-1100', width: 1100, accessories: [] },
    { id: 'module-1200', width: 1200, accessories: [] },
  ];

  // Calculate module compatibility
  const modulesWithStatus = useMemo(() => {
    const remainingWidth = wallDimensions.width - currentWidth;
    
    return availableModules.map(module => {
      const canFit = module.width <= remainingWidth + 100; // Allow small tolerance
      const isOptimal = module.width <= remainingWidth && module.width >= remainingWidth - 200;
      const wouldExceed = module.width > remainingWidth;
      
      return {
        ...module,
        canFit,
        isOptimal,
        wouldExceed,
        remainingAfter: remainingWidth - module.width
      };
    });
  }, [wallDimensions.width, currentWidth]);

  const remainingWidth = wallDimensions.width - currentWidth;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Available Wall Modules</h3>
        <div className="text-sm text-gray-600">
          Remaining space: <span className="font-medium text-blue-600">
            {(remainingWidth / 1000).toFixed(1)}m
          </span>
        </div>
      </div>

      {/* Status Legend */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center">
            <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
            <span>Optimal fit</span>
          </div>
          <div className="flex items-center">
            <Info className="w-3 h-3 text-blue-600 mr-1" />
            <span>Will fit</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="w-3 h-3 text-red-600 mr-1" />
            <span>Too large</span>
          </div>
        </div>
      </div>
      
      {/* Desktop grid layout */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {modulesWithStatus.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Module Status Indicator */}
            <div className="absolute -top-2 -right-2 z-10">
              {module.isOptimal ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              ) : module.canFit ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <Info className="w-4 h-4 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <AlertTriangle className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>

            {/* Module Card with opacity based on fit */}
            <div className={`${!module.canFit ? 'opacity-50 pointer-events-none' : ''}`}>
              <ModuleCard module={module} finish={finish} />
            </div>

            {/* Fit Information */}
            <div className="mt-2 text-xs text-center">
              {module.isOptimal ? (
                <span className="text-green-600 font-medium">Perfect fit!</span>
              ) : module.canFit ? (
                <span className="text-blue-600">
                  {(module.remainingAfter / 1000).toFixed(1)}m remaining
                </span>
              ) : (
                <span className="text-red-600">
                  {(Math.abs(module.remainingAfter) / 1000).toFixed(1)}m too large
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile horizontal scroll layout */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {modulesWithStatus.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 relative"
            >
              {/* Module Status Indicator */}
              <div className="absolute -top-2 -right-2 z-10">
                {module.isOptimal ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                ) : module.canFit ? (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Info className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div className={`${!module.canFit ? 'opacity-50 pointer-events-none' : ''}`}>
                <ModuleCard module={module} finish={finish} />
              </div>

              {/* Fit Information */}
              <div className="mt-2 text-xs text-center">
                {module.isOptimal ? (
                  <span className="text-green-600 font-medium">Perfect!</span>
                ) : module.canFit ? (
                  <span className="text-blue-600">
                    {(module.remainingAfter / 1000).toFixed(1)}m left
                  </span>
                ) : (
                  <span className="text-red-600">Too large</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Smart Suggestions */}
      {remainingWidth > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <h4 className="text-sm font-medium text-blue-800 mb-2">Smart Suggestions</h4>
          <div className="text-sm text-blue-700 space-y-1">
            {modulesWithStatus.filter(m => m.isOptimal).length > 0 ? (
              <div>
                • <strong>Optimal modules:</strong> {
                  modulesWithStatus
                    .filter(m => m.isOptimal)
                    .map(m => `${m.width}mm`)
                    .join(', ')
                } for best fit
              </div>
            ) : null}
            
            {remainingWidth >= 400 && (
              <div>
                • Consider combining smaller modules for precise fit
              </div>
            )}
            
            {remainingWidth < 400 && remainingWidth > 0 && (
              <div>
                • Small gap remaining - consider adjusting existing modules
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <div className="text-sm text-gray-700">
          <strong>Instructions:</strong>
          <ul className="mt-1 space-y-1">
            <li>• Drag modules to the construction area above</li>
            <li>• Green indicators show optimal fit modules</li>
            <li>• Blue indicators show modules that will fit</li>
            <li>• Red indicators show modules too large for remaining space</li>
            <li>• Click placed modules to add accessories</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ModulePalette;

