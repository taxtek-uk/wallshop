import { useState } from "react";
import { Calendar, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Floating CTA Button */}
      {/* <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="floating-cta rounded-full px-6 py-4 text-gray-900 font-semibold shadow-2xl transform transition-all duration-300 hover:scale-105 group"
        >
          <Calendar className="w-5 h-5 mr-2 icon-luxury-glow" />
          Book Consultation
          <Sparkles className="w-4 h-4 ml-2 animate-gentle-bounce" />

        </Button>
      </div> */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-gold-400 to-gold-500 text-gray-900 p-6 rounded-t-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gold-400/20 to-gold-500/20 rounded-t-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      Book Your Consultation
                    </h3>
                    <p className="text-sm opacity-90">
                      Let's discuss your luxury wall project
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-black/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Interest *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select your interest</option>
                  <option value="smart-walls">Smart Walls</option>
                  <option value="luxury-wallpapers">Luxury Wallpapers</option>
                  <option value="acoustic-panels">Acoustic Panels</option>
                  <option value="carbon-rock-boards">Carbon Rock Boards</option>
                  <option value="full-renovation">Full Renovation</option>
                  <option value="consultation-only">Consultation Only</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Describe your vision, space dimensions, timeline, or any specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="luxury"
                  className="w-full py-3 text-lg font-medium group"
                >
                  <span className="relative z-10">Schedule Consultation</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>
                    Free consultation • No obligation • Expert design advice
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  We'll contact you within 24 hours to schedule your
                  personalized consultation.
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCTA;
