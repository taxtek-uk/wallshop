import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Brand colors: dark charcoal (#1A1A1A), gold (#C5A572), white

type CrbQuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productCategory?: string; // optional
};
 

export default function CrbQuoteModal({ isOpen, onClose, productCategory }: CrbQuoteModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    width: "",
    height: "",
    totalArea: 0,
    thickness: "",
    boardWidth: "",
    boardHeight: "",
    totalBoards: 0,
    efficiency: 0,
    waste: 0,
    style: "",
    finish: "",
    installation: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Auto calculate total area
  useEffect(() => {
    if (formData.width && formData.height) {
      setFormData((prev) => ({
        ...prev,
        totalArea: parseFloat(prev.width) * parseFloat(prev.height),
      }));
    }
  }, [formData.width, formData.height]);

  // Auto calculate boards
  useEffect(() => {
    if (formData.totalArea && formData.boardWidth && formData.boardHeight) {
      const boardArea = (parseFloat(formData.boardWidth) / 1000) * (parseFloat(formData.boardHeight) / 1000);
      const totalBoards = Math.ceil(formData.totalArea / boardArea);
      const efficiency = Number(((formData.totalArea / (totalBoards * boardArea)) * 100).toFixed(1));
      const waste = Number((100 - efficiency).toFixed(1));
      setFormData((prev) => ({ ...prev, totalBoards, efficiency, waste }));
    }
  }, [formData.totalArea, formData.boardWidth, formData.boardHeight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you’d call Resend API to send email
    setSubmitted(true);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative"
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Step {step} of 6</span>
              <div className="h-1 flex-1 mx-4 bg-gray-200 rounded">
                <div className="h-1 bg-[#C5A572] rounded" style={{ width: `${(step / 6) * 100}%` }}></div>
              </div>
            </div>

            {/* Step Sections */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Project Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" name="width" value={formData.width} onChange={handleChange} placeholder="Width (m)" className="border p-2 rounded w-full" required />
                  <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (m)" className="border p-2 rounded w-full" required />
                </div>
                {formData.totalArea > 0 && <p className="mt-2 text-sm text-gray-700">Total Area: {formData.totalArea.toFixed(2)} m²</p>}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Board Options</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Thickness</label>
                    <select name="thickness" value={formData.thickness} onChange={handleChange} className="border p-2 rounded w-full">
                      <option value="">Select Thickness</option>
                      <option value="5">5mm</option>
                      <option value="8">8mm</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select name="boardWidth" value={formData.boardWidth} onChange={handleChange} className="border p-2 rounded">
                      <option value="">Board Width</option>
                      <option value="1000">1000mm</option>
                      <option value="1220">1220mm</option>
                    </select>
                    <select name="boardHeight" value={formData.boardHeight} onChange={handleChange} className="border p-2 rounded">
                      <option value="">Board Height</option>
                      <option value="2400">2400mm</option>
                      <option value="2600">2600mm</option>
                      <option value="2800">2800mm</option>
                      <option value="3000">3000mm</option>
                    </select>
                  </div>
                  {formData.totalBoards > 0 && (
                    <p className="text-sm text-gray-700">
                      Boards Needed: {formData.totalBoards} | Efficiency: {formData.efficiency}% | Waste: {formData.waste}%
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Style & Finish</h2>
                <div className="space-y-4">
                  <select name="style" value={formData.style} onChange={handleChange} className="border p-2 rounded w-full">
                    <option value="">Select Style</option>
                    <option value="cloth">Cloth Pattern</option>
                    <option value="wood">Wood Grain</option>
                    <option value="solid">Solid Grain</option>
                    <option value="stone">Stone Grain</option>
                    <option value="metal">Metal</option>
                    <option value="mirror">Mirror</option>
                  </select>
                  <input type="text" name="finish" value={formData.finish} onChange={handleChange} placeholder="Enter Finish (e.g., Linen, Bronze, etc.)" className="border p-2 rounded w-full" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Installation Preference</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="installation" value="professional" onChange={handleChange} /> Professional Installation (recommended)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="installation" value="diy" onChange={handleChange} /> DIY Installation Kit
                  </label>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Contact Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" required />
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company (optional)" className="border p-2 rounded" />
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Project Location" className="border p-2 rounded col-span-2" required />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Submit</h2>
                <button type="submit" className="bg-[#C5A572] text-white px-6 py-3 rounded-lg hover:bg-[#b18e5e] transition">
                  Get a Free Quotation
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-4 py-2 border rounded">
                  Back
                </button>
              ) : <div />}
              {step < 6 && (
                <button type="button" onClick={nextStep} className="px-4 py-2 bg-[#1A1A1A] text-white rounded">
                  Next
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Thank You!</h2>
            <p className="text-gray-700">Our team will contact you shortly with a quotation.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
