import React from 'react';
import { motion } from 'framer-motion';
import { useQuote } from '@/contexts/QuoteContext';
import { CheckCircle } from 'lucide-react';

export default function StepReviewSubmit() {
  const { state } = useQuote();
  const { contact, smartWalls, smartDevices, wallPanels, carbonRockBoards } = state.formData;

  const Item = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between py-2">
      <span className="text-stone-500">{label}</span>
      <span className="text-mocha-950 font-medium text-right">{value || '—'}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
      data-seo-title="Review & Submit"
      data-seo-desc="Review your quotation details before submitting"
    >
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-lg"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-mocha-950 tracking-tight">Review & Submit</h1>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Please review your information. If everything looks correct, click "Submit Quote Request".
          </p>
        </div>
      </header>

      {/* Contact Summary */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-mocha-950 mb-4">Contact Information</h2>
        <div className="divide-y divide-stone-100">
          <Item label="Full Name" value={contact?.fullName} />
          <Item label="Email" value={contact?.email} />
          <Item label="Phone" value={contact?.phone} />
          <Item label="Installation Address" value={contact?.installationAddress} />
          <Item label="Notes" value={contact?.additionalNotes} />
        </div>
      </section>

      {/* Product Summaries */}
      {smartWalls && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-mocha-950 mb-4">Smart Walls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item label="Width" value={smartWalls.dimensions?.width ? `${smartWalls.dimensions.width}m` : ''} />
            <Item label="Height" value={smartWalls.dimensions?.height ? `${smartWalls.dimensions.height}m` : ''} />
            <Item label="Depth" value={smartWalls.dimensions?.depth === 'custom' ? `${smartWalls.dimensions.customDepth}mm (Custom)` : smartWalls.dimensions?.depth} />
            <Item label="Calculated Max Width" value={smartWalls.dimensions?.calculatedMaxWidth ? `${smartWalls.dimensions.calculatedMaxWidth.toFixed(2)}m` : ''} />
            <Item label="Selected Style" value={smartWalls.selectedStyle ? `${smartWalls.selectedStyle.category} - ${smartWalls.selectedStyle.finish}` : ''} />
            <Item label="Accessories" value={Object.entries(smartWalls.accessories || {}).filter(([, value]) => value).map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)).join(', ') || 'None'} />
            <Item label="Smart Devices" value={(smartWalls.smartDevices?.selectedDevices || []).map(d => d.name).join(', ') || 'None'} />
            <Item label="Gaming System" value={smartWalls.gamingSystem?.type || 'None'} />
            {smartWalls.gamingSystem?.type === 'Custom' && (
              <Item label="Gaming System Specs" value={smartWalls.gamingSystem?.specifications} />
            )}
          </div>
        </section>
      )}

      {smartDevices && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-mocha-950 mb-4">Smart Devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item label="Control Panels" value={smartDevices.controlPanels ? 'Yes' : 'No'} />
            <Item label="Security Sensors" value={smartDevices.securitySensors ? 'Yes' : 'No'} />
            <Item label="Home Automation" value={smartDevices.homeAutomation ? 'Yes' : 'No'} />
            <Item label="Selected Devices" value={(smartDevices.selectedDevices || []).map(d => d.name).join(', ')} />
          </div>
        </section>
      )}

      {wallPanels && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-mocha-950 mb-4">Wall Panels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item label="Panel Type" value={wallPanels.panelType} />
            <Item label="Finish" value={wallPanels.finish} />
            <Item label="Area" value={wallPanels.dimensions?.area ? `${wallPanels.dimensions.area} m²` : undefined} />
            <Item label="Installation" value={wallPanels.installation} />
          </div>
        </section>
      )}

      {carbonRockBoards && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-mocha-950 mb-4">Carbon Rock Boards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item label="Board Type" value={carbonRockBoards.boardType} />
            <Item label="Thickness" value={carbonRockBoards.thickness} />
            <Item label="Area" value={carbonRockBoards.dimensions?.area ? `${carbonRockBoards.dimensions.area} m²` : undefined} />
            <Item label="Installation" value={carbonRockBoards.installation} />
          </div>
        </section>
      )}
    </motion.div>
  );
}