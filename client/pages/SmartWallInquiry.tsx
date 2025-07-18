import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Ruler,
  MonitorSmartphone,
  Tv,
  Flame,
  Volume2,
  Lightbulb,
  PanelBottom,
  Gamepad2,
  Send,
} from "lucide-react";

const wallStyles = [
  "Metal Style",
  "Mirror Style",
  "Cloth Style",
  "Solid Colour",
  "Stone / Marble",
];

const features = [
  { label: "Integrated TV", icon: Tv },
  { label: "Fireplace", icon: Flame },
  { label: "Soundbar", icon: Volume2 },
  { label: "Shelving", icon: PanelBottom },
  { label: "Dimmable Lighting", icon: Lightbulb },
];

export default function SmartWallInquiry() {
  useEffect(() => {
    document.title =
      "Smart Wall Inquiry - Customise Your Dream Feature Wall | The Wall Shop UK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Start your Smart Wall journey. Select your panel style, features, control options and provide dimensions. Get a seamless, clean installation by The Wall Shop UK."
      );
    }
  }, []);

  const [formData, setFormData] = useState({
    wallStyle: "",
    selectedFeatures: [] as string[],
    controlType: "",
    hasDimensions: "",
    dimensions: "",
    socketPosition: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.selectedFeatures.includes(feature);
      return {
        ...prev,
        selectedFeatures: exists
          ? prev.selectedFeatures.filter((f) => f !== feature)
          : [...prev.selectedFeatures, feature],
      };
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">
      <Navigation />

      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#b69777] to-[#907252] bg-clip-text text-transparent">
            Smart Wall Design Inquiry
          </h1>
          <p className="text-center text-[#6b5c47] text-lg max-w-3xl mx-auto mb-12">
            Customise your perfect feature wall. Choose your finish, add smart features, and submit your wall details. We’ll handle the rest – clean, seamless installation guaranteed.
          </p>

          <form className="bg-[#fcf9f5] p-8 rounded-2xl shadow-lg border border-[#e2d5c4] max-w-4xl mx-auto space-y-8">
            {/* Style */}
            <div>
              <label className="block font-semibold text-[#231c14] mb-2">
                Choose Wall Style
              </label>
              <select
                value={formData.wallStyle}
                onChange={(e) => handleChange("wallStyle", e.target.value)}
                className="w-full border border-[#cbbba5] rounded px-4 py-3 bg-white focus:outline-none"
              >
                <option value="">-- Select Style --</option>
                {wallStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Features */}
            <div>
              <label className="block font-semibold text-[#231c14] mb-4">
                Select Required Features
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {features.map(({ label, icon: Icon }) => (
                  <button
                    type="button"
                    key={label}
                    className={`flex items-center justify-start gap-3 p-4 rounded-xl border-2 ${
                      formData.selectedFeatures.includes(label)
                        ? "border-[#b69777] bg-[#f5efe7]"
                        : "border-gray-300"
                    } hover:border-[#b69777] transition`}
                    onClick={() => toggleFeature(label)}
                  >
                    <Icon className="w-5 h-5 text-[#b69777]" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div>
              <label className="block font-semibold text-[#231c14] mb-2">
                Preferred Control Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="control"
                    value="Wall Control"
                    checked={formData.controlType === "Wall Control"}
                    onChange={(e) =>
                      handleChange("controlType", e.target.value)
                    }
                  />
                  <MonitorSmartphone className="w-4 h-4 text-[#b69777]" />
                  Wall Control
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="control"
                    value="Remote Control"
                    checked={formData.controlType === "Remote Control"}
                    onChange={(e) =>
                      handleChange("controlType", e.target.value)
                    }
                  />
                  <Gamepad2 className="w-4 h-4 text-[#b69777]" />
                  Remote Control
                </label>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block font-semibold text-[#231c14] mb-2">
                Do you have wall dimensions?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasDimensions"
                    value="Yes"
                    checked={formData.hasDimensions === "Yes"}
                    onChange={(e) =>
                      handleChange("hasDimensions", e.target.value)
                    }
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasDimensions"
                    value="No"
                    checked={formData.hasDimensions === "No"}
                    onChange={(e) =>
                      handleChange("hasDimensions", e.target.value)
                    }
                  />
                  No, I need a survey
                </label>
              </div>

              {formData.hasDimensions === "Yes" && (
                <div className="mt-4 grid gap-4">
                  <input
                    type="text"
                    placeholder="Enter wall dimensions (e.g., 4m x 2.4m)"
                    value={formData.dimensions}
                    onChange={(e) =>
                      handleChange("dimensions", e.target.value)
                    }
                    className="w-full border border-[#cbbba5] rounded px-4 py-3 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Enter socket position details"
                    value={formData.socketPosition}
                    onChange={(e) =>
                      handleChange("socketPosition", e.target.value)
                    }
                    className="w-full border border-[#cbbba5] rounded px-4 py-3 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-[#cbbba5] rounded px-4 py-3 bg-white"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border border-[#cbbba5] rounded px-4 py-3 bg-white"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-[#cbbba5] rounded px-4 py-3 bg-white"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <textarea
                placeholder="Additional Notes"
                rows={3}
                className="border border-[#cbbba5] rounded px-4 py-3 bg-white"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="px-8 py-4 text-lg font-bold">
                <Send className="mr-2 h-5 w-5" /> Submit Inquiry
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
