import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Volume2, BookOpen, Lightbulb } from 'lucide-react';

const AccessoryMenu = ({
  isOpen,
  moduleId,
  selectedAccessories,
  onClose,
  onAccessoryToggle
}) => {
  const availableAccessories = [
    {
      id: 'tv',
      name: 'TV Mount',
      icon: Tv,
      description: 'Wall-mounted television'
    },
    {
      id: 'soundbar',
      name: 'Soundbar',
      icon: Volume2,
      description: 'Audio enhancement system'
    },
    {
      id: 'shelves',
      name: 'Floating Shelves',
      icon: BookOpen,
      description: 'Storage and display shelves'
    },
    {
      id: 'lighting',
      name: 'Dimmable Lighting',
      icon: Lightbulb,
      description: 'Ambient LED lighting'
    }
  ];

  if (!isOpen || !moduleId) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Customize Module</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Select accessories for this wall module
            </p>
          </div>

          {/* Accessories list */}
          <div className="p-6">
            <div className="space-y-3">
              {availableAccessories.map((accessory) => {
                const isSelected = selectedAccessories.includes(accessory.id);
                
                return (
                  <motion.button
                    key={accessory.id}
                    onClick={() => onAccessoryToggle(accessory.id)}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon and checkbox */}
                      <div className="flex items-center gap-3">
                        <accessory.icon className="w-6 h-6 text-gray-700" />
                        <div className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                          ${isSelected 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                          }
                        `}>
                          {isSelected && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </div>
                      </div>

                      {/* Accessory info */}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{accessory.name}</div>
                        <div className="text-sm text-gray-600">{accessory.description}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Selected count */}
            <motion.div
              key={selectedAccessories.length}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 bg-gray-50 rounded-lg"
            >
              <div className="text-sm text-gray-700">
                <strong>Selected accessories:</strong> {selectedAccessories.length}
                {selectedAccessories.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedAccessories.map((accessoryId) => {
                      const accessory = availableAccessories.find(a => a.id === accessoryId);
                      const IconComponent = accessory?.icon;
                      return (
                        <span key={accessoryId} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {IconComponent && <IconComponent className="w-3 h-3" />} {accessory?.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <motion.button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Done
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccessoryMenu;