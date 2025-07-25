import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface ModuleData {
  id: string;
  width: number;
  accessories: string[];
}

interface WallAssemblyAnimationProps {
  modules: ModuleData[];
  finish: 'stone' | 'metal';
  wallWidth: number;
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

const WallAssemblyAnimation: React.FC<WallAssemblyAnimationProps> = ({
  modules,
  finish,
  wallWidth,
  isVisible,
  onAnimationComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showConnections, setShowConnections] = useState(false);

  // Animation steps
  const animationSteps = [
    'preparation', // Show empty wall
    'sliding', // Modules slide in from sides
    'connecting', // Show connection animations
    'accessories', // Add accessories
    'complete' // Final assembled wall
  ];

  useEffect(() => {
    if (isVisible && modules.length > 0) {
      setIsPlaying(true);
      setCurrentStep(0);
    }
  }, [isVisible, modules]);

  useEffect(() => {
    if (isPlaying && currentStep < animationSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        if (currentStep === 1) setShowConnections(true);
        if (currentStep === animationSteps.length - 2) {
          setIsPlaying(false);
          onAnimationComplete?.();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, animationSteps.length, onAnimationComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setShowConnections(false);
  };

  if (!isVisible || modules.length === 0) return null;

  // Calculate scale and positioning
  const maxDisplayWidth = 600;
  const scaleRatio = Math.min(maxDisplayWidth / wallWidth, 1);
  const displayWidth = wallWidth * scaleRatio;

  // Finish styles
  const finishStyles = {
    stone: {
      background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 50%, #6b7280 100%)',
      border: '2px solid #4b5563'
    },
    metal: {
      background: 'linear-gradient(135deg, #cbd5e1 0%, #64748b 50%, #475569 100%)',
      border: '2px solid #334155'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Assembly Animation</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePlayPause}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Animation Stage */}
      <div 
        className="relative bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 mx-auto overflow-hidden"
        style={{ width: `${displayWidth}px`, height: '200px' }}
      >
        {/* Wall Background */}
        <motion.div
          className="absolute inset-4 border border-gray-400 border-dashed rounded opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep >= 0 ? 0.3 : 0 }}
        />

        {/* Assembly Area Label */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          Assembly Area: {(wallWidth / 1000).toFixed(1)}m
        </div>

        {/* Step Indicator */}
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Step {currentStep + 1}/5: {animationSteps[currentStep]}
        </div>

        {/* Modules Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-1">
            <AnimatePresence>
              {modules.map((module, index) => {
                const moduleWidth = (module.width / 400) * 80 * scaleRatio;
                const slideDelay = index * 0.3;
                
                return (
                  <motion.div
                    key={module.id}
                    className="relative rounded-lg overflow-hidden"
                    style={{
                      width: `${moduleWidth}px`,
                      height: '120px',
                      ...finishStyles[finish]
                    }}
                    initial={{ 
                      x: index % 2 === 0 ? -300 : 300,
                      opacity: 0,
                      rotateY: index % 2 === 0 ? -45 : 45
                    }}
                    animate={currentStep >= 1 ? {
                      x: 0,
                      opacity: 1,
                      rotateY: 0
                    } : {}}
                    transition={{
                      delay: slideDelay,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 1
                    }}
                  >
                    {/* Module Label */}
                    <div className="absolute top-1 left-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                      {module.width}mm
                    </div>

                    {/* Connection Points */}
                    {showConnections && currentStep >= 2 && (
                      <>
                        {index > 0 && (
                          <motion.div
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-6 bg-yellow-400 rounded-l-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2 + index * 0.2 }}
                          />
                        )}
                        {index < modules.length - 1 && (
                          <motion.div
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-6 bg-yellow-400 rounded-r-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2 + index * 0.2 }}
                          />
                        )}
                      </>
                    )}

                    {/* Accessories Animation */}
                    {currentStep >= 3 && module.accessories.length > 0 && (
                      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 p-1">
                        {module.accessories.slice(0, 2).map((accessory, accIndex) => (
                          <motion.div
                            key={accIndex}
                            className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 3 + accIndex * 0.3 }}
                          >
                            {accessory}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Assembly Glow Effect */}
                    {currentStep >= 2 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 opacity-0"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ 
                          delay: 2 + index * 0.2,
                          duration: 1,
                          repeat: 1
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Connection Sparks */}
        {showConnections && currentStep >= 2 && (
          <div className="absolute inset-0 pointer-events-none">
            {modules.slice(0, -1).map((_, index) => (
              <motion.div
                key={`spark-${index}`}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ 
                  left: `${((index + 1) / modules.length) * 100}%`,
                  transform: 'translateX(-50%) translateY(-50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  delay: 2.5 + index * 0.2,
                  duration: 0.8,
                  repeat: 2
                }}
              >
                <Zap className="w-6 h-6 text-yellow-400" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Completion Effect */}
        {currentStep >= 4 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 opacity-0 rounded-lg"
            animate={{ 
              opacity: [0, 0.2, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Assembly Progress</span>
          <span>{Math.round(((currentStep + 1) / animationSteps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Step Description */}
      <div className="mt-3 text-sm text-gray-600 text-center">
        {currentStep === 0 && "Preparing assembly area..."}
        {currentStep === 1 && "Modules sliding into position..."}
        {currentStep === 2 && "Connecting modules together..."}
        {currentStep === 3 && "Adding accessories and features..."}
        {currentStep === 4 && "Assembly complete! Your smart wall is ready."}
      </div>
    </motion.div>
  );
};

export default WallAssemblyAnimation;
