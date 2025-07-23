import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import stoneWallImage from '../../images/smart-wall-stone-modules.webp';
import metalWallImage from '../../images/smart-wall-metal-accessories.webp';
import { X } from 'lucide-react'; // optional close icon

const WallShowcase = ({ selectedFinish }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showcaseData = {
    stone: {
      image: stoneWallImage,
      title: 'Stone Effect Wall Construction',
      description: 'Four modular panels (800mm + 1000mm + 1000mm + 800mm) seamlessly slotted together',
      features: [
        'Natural stone texture finish',
        'Modular design for easy installation',
        '2100mm height for full wall coverage',
        'Seamless panel connections'
      ]
    },
    metal: {
      image: metalWallImage,
      title: 'Metal Effect Wall with Accessories',
      description: 'Complete smart wall system with integrated accessories and lighting',
      features: [
        'Brushed metal finish',
        'TV mount on left panel',
        'Soundbar integration',
        'Floating shelves for storage',
        'Dimmable LED lighting'
      ]
    }
  };

  const currentShowcase = showcaseData[selectedFinish];

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Wall Construction Preview</h3>

          {/* Image showcase */}
          <motion.div
            key={selectedFinish}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative mb-4 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={currentShowcase.image}
              alt={currentShowcase.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {currentShowcase.title}
            </div>
          </motion.div>

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
                <div>Total Width: 3600mm (3.6m)</div>
                <div>Height: 2100mm (2.1m)</div>
                <div>Module Configuration: 800 + 1000 + 1000 + 800mm</div>
              </div>
            </div>
          </div>
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
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentShowcase.image}
                alt={currentShowcase.title}
                className="w-full rounded-lg shadow-lg"
              />
              <button
                className="absolute top-3 right-3 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WallShowcase;
