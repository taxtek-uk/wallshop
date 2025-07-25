import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Settings } from 'lucide-react';

const FinishSelector = ({ 
  selectedFinish, 
  onFinishChange 
}) => {
  const finishOptions = [
    {
      id: 'stone',
      name: 'Stone Effect',
      description: 'Natural stone texture',
      preview: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
      icon: Mountain
    },
    {
      id: 'metal',
      name: 'Metal Effect',
      description: 'Brushed metal finish',
      preview: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600',
      icon: Settings
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Wall Finish</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {finishOptions.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => onFinishChange(option.id)}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedFinish === option.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Selection indicator */}
            {selectedFinish === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}

            {/* Finish preview */}
            <div className="flex items-center gap-3 mb-2">
              <option.icon className="w-6 h-6 text-gray-700" />
              <div className={`w-12 h-12 rounded-lg border ${option.preview}`} />
            </div>

            {/* Finish info */}
            <div>
              <div className="font-semibold text-gray-900">{option.name}</div>
              <div className="text-sm text-gray-600">{option.description}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Current selection display */}
      <motion.div
        key={selectedFinish}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-3 bg-gray-50 rounded-lg"
      >
        <div className="text-sm text-gray-700">
          <strong>Selected:</strong> {finishOptions.find(f => f.id === selectedFinish)?.name}
        </div>
      </motion.div>
    </div>
  );
};

export default FinishSelector;