import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Eye, Zap } from 'lucide-react';
import WallAssemblyAnimation from './WallAssemblyAnimation';
import smartWallAssemblyDiagram from '../../images/smart-wall-assembly-diagram.png';
import smartWallModulesShowcase from '../../images/smart-wall-modules-showcase.png';
import smartWallConnectionDetail from '../../images/smart-wall-connection-detail.png';

interface WallShowcaseProps {
  selectedFinish: 'stone' | 'metal';
  placedModules?: any[];
  wallDimensions?: { width: number; height: number };
}

const WallShowcase: React.FC<WallShowcaseProps> = ({ 
  selectedFinish, 
  placedModules = [],
  wallDimensions = { width: 3600, height: 2100 }
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'animation'>('preview');

  // Use generated images as fallback
  const showcaseData = {
    stone: {
      image: smartWallModulesShowcase,
      title: 'Stone Effect Wall Construction',
      description: 'Four modular panels seamlessly slotted together with natural stone texture',
      features: [
        'Natural stone texture finish',
        'Modular design for easy installation',
        '2100mm height for full wall coverage',
        'Seamless panel connections',
        'Integrated smart home features'
      ]
    },
    metal: {
      image: smartWallModulesShowcase,
      title: 'Metal Effect Wall with Accessories',
      description: 'Complete smart wall system with integrated accessories and lighting',
      features: [
        'Brushed metal finish',
        'TV mount integration',
        'Soundbar compatibility',
        'Floating shelves for storage',
        'Dimmable LED lighting',
        'Smart home connectivity'
      ]
    }
  };

  const currentShowcase = showcaseData[selectedFinish];
  const hasModules = placedModules.length > 0;

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          {/* Header with tabs */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Wall Preview</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeTab === 'preview' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('animation')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeTab === 'animation' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Play className="w-4 h-4 inline mr-1" />
                Assembly
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image showcase */}
                <motion.div
                  key={selectedFinish}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-4 cursor-pointer group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <img
                    src={smartWallAssemblyDiagram}
                    alt={currentShowcase.title}
                    className="w-full h-64 object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {currentShowcase.title}
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </motion.div>

                {/* Current Configuration Display */}
                {hasModules && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Your Configuration</h4>
                    <div className="text-xs text-blue-700 space-y-1">
                      <div>Modules: {placedModules.map(m => `${m.width}mm`).join(' + ')}</div>
                      <div>Total Width: {(placedModules.reduce((sum, m) => sum + m.width, 0) / 1000).toFixed(1)}m</div>
                      <div>Finish: {selectedFinish.charAt(0).toUpperCase() + selectedFinish.slice(1)}</div>
                    </div>
                  </motion.div>
                )}

                {/* Description */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{currentShowcase.description}</p>

                  {/* Features list */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {currentShowcase.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-xs text-gray-600 flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Dimensions info */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Wall Dimensions:</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Your Wall: {(wallDimensions.width / 1000).toFixed(1)}m × {(wallDimensions.height / 1000).toFixed(1)}m</div>
                      {hasModules && (
                        <>
                          <div>Used Width: {(placedModules.reduce((sum, m) => sum + m.width, 0) / 1000).toFixed(1)}m</div>
                          <div>Utilization: {((placedModules.reduce((sum, m) => sum + m.width, 0) / wallDimensions.width) * 100).toFixed(1)}%</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'animation' && (
              <motion.div
                key="animation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {hasModules ? (
                  <WallAssemblyAnimation
                    modules={placedModules}
                    finish={selectedFinish}
                    wallWidth={wallDimensions.width}
                    isVisible={activeTab === 'animation'}
                    onAnimationComplete={() => {
                      // Could trigger confetti or success message
                    }}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Zap className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No Modules to Animate</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Add some modules to your wall to see the assembly animation
                    </p>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View Preview Instead
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={smartWallConnectionDetail}
                alt="Smart Wall Connection Detail"
                className="w-full rounded-lg shadow-lg"
              />
              <button
                className="absolute top-3 right-3 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Smart Wall Connection System</h3>
                <p className="text-sm opacity-90">
                  Precision-engineered connection points ensure seamless module assembly with secure, 
                  invisible joints that maintain the wall's clean aesthetic while providing robust structural integrity.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WallShowcase;

