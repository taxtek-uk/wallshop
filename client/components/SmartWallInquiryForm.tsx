import { useState } from "react";
import {
  Tv,
  Flame,
  Volume2,
  Lightbulb,
  PanelBottom,
  MonitorSmartphone,
  Gamepad,
  Ruler,
  Send,
  Layers,
  Check,
} from "lucide-react";

const wallStyles = [
  "Metal Style",
  "Mirror Style",
  "Cloth Style",
  "Solid Colour",
  "Stone / Marble",
];

const features = [
  { label: "TV", icon: Tv },
  { label: "Fire", icon: Flame },
  { label: "Soundbar", icon: Volume2 },
  { label: "Shelving", icon: PanelBottom },
  { label: "Dimmable Lighting", icon: Lightbulb },
];

export default function SmartWallInquiryForm() {
  const [form, setForm] = useState({
    style: "",
    features: [] as string[],
    control: "",
    hasDimensions: "",
    dimensions: "",
    socket: "",
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleFeature = (f: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-[#e5ddd2] animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-center mb-2 text-[#231c14]">
        Smart Wall Inquiry
      </h2>
      <p className="text-center text-[#6b5c47] mb-8">
        Select your panel style, smart features and wall preferences. We'll guide you through the next steps!
      </p>

      {/* Wall Style */}
      <div className="mb-6">
        <label className="block font-semibold text-[#231c14] mb-2">
          Wall Finish Style
        </label>
        <select
          value={form.style}
          onChange={(e) => handleChange("style", e.target.value)}
          className="w-full rounded-xl border border-[#d6c7b5] px-4 py-3 text-sm focus:ring-2 focus:ring-[#b69777] bg-[#fefefe]"
        >
          <option value="">-- Select --</option>
          {wallStyles.map((style) => (
            <option key={style}>{style}</option>
          ))}
        </select>
      </div>

      {/* Features */}
      <div className="mb-6">
        <label className="block font-semibold text-[#231c14] mb-3">
          Smart Features
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {features.map(({ label, icon: Icon }) => {
            const selected = form.features.includes(label);
            return (
              <button
                type="button"
                key={label}
                className={`relative flex items-center justify-start gap-2 border px-4 py-3 rounded-xl transition-all ${
                  selected ? "bg-[#f5efe7] border-[#b69777]" : "bg-white border-gray-300"
                } hover:border-[#b69777]`}
                onClick={() => toggleFeature(label)}
              >
                <Icon className="w-5 h-5 text-[#b69777]" />
                <span className="text-sm font-medium">{label}</span>
                {selected && (
                  <Check className="absolute top-2 right-2 w-4 h-4 text-[#b69777]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control */}
      <div className="mb-6">
        <label className="block font-semibold text-[#231c14] mb-2">
          Control Method
        </label>
        <div className="flex gap-6 flex-wrap">
          {[
            { label: "Wall Control", icon: MonitorSmartphone },
            { label: "Remote Control", icon: Gamepad },
          ].map(({ label, icon: Icon }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="control"
                value={label}
                checked={form.control === label}
                onChange={(e) => handleChange("control", e.target.value)}
                className="accent-[#b69777]"
              />
              <Icon className="w-5 h-5 text-[#b69777]" />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div className="mb-6">
        <label className="block font-semibold text-[#231c14] mb-2">
          Do you have wall measurements?
        </label>
        <div className="flex gap-6 flex-wrap">
          {["Yes", "No, I need a survey"].map((label) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasDimensions"
                value={label}
                checked={form.hasDimensions === label}
                onChange={(e) => handleChange("hasDimensions", e.target.value)}
                className="accent-[#b69777]"
              />
              {label}
            </label>
          ))}
        </div>

        {form.hasDimensions === "Yes" && (
          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="e.g. 4.2m x 2.5m"
              value={form.dimensions}
              onChange={(e) => handleChange("dimensions", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#d6c7b5] bg-[#fefefe]"
            />
            <input
              type="text"
              placeholder="Socket position (e.g. 0.5m from floor, right side)"
              value={form.socket}
              onChange={(e) => handleChange("socket", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#d6c7b5] bg-[#fefefe]"
            />
          </div>
        )}
      </div>

      {/* Contact */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="px-4 py-3 rounded-xl border border-[#d6c7b5] bg-[#fefefe]"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="px-4 py-3 rounded-xl border border-[#d6c7b5] bg-[#fefefe]"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="px-4 py-3 rounded-xl border border-[#d6c7b5] bg-[#fefefe]"
        />
        <input
          type="text"
          placeholder="Preferred Time to Call (e.g. 2–4 PM)"
          value={form.preferredTime}
          onChange={(e) => handleChange("preferredTime", e.target.value)}
          className="px-4 py-3 rounded-xl border border-[#d6c7b5] bg-[#fefefe]"
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <textarea
          placeholder="Notes or special requests"
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-[#d6c7b5] bg-[#fefefe] resize-none"
        />
      </div>

      {/* Submit */}
      <div className="text-center mt-8">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-gradient-to-br from-[#b69777] to-[#907252] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all"
        >
          <Send className="w-5 h-5" />
          Submit Inquiry
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out both;
        }
      `}</style>
    </div>
  );
}