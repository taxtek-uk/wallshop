import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Clock, CheckCircle, User, Home, Ruler, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: {
    name: string;
    price: string;
  };
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    area: '',
    message: '',
    urgency: 'standard'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        projectType: '',
        area: '',
        message: '',
        urgency: 'standard'
      });
      onClose();
    }, 3000);
  };

  const projectTypes = [
    'Residential - Living Room',
    'Residential - Bedroom',
    'Residential - Kitchen',
    'Residential - Bathroom',
    'Commercial - Office',
    'Commercial - Retail',
    'Commercial - Restaurant',
    'Industrial - Warehouse',
    'Other'
  ];

  const urgencyOptions = [
    { value: 'urgent', label: 'Urgent (24-48 hours)', badge: 'URGENT' },
    { value: 'standard', label: 'Standard (3-5 days)', badge: 'STANDARD' },
    { value: 'flexible', label: 'Flexible (1-2 weeks)', badge: 'FLEXIBLE' }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="border-0 shadow-2xl">
            <CardHeader className="relative bg-gradient-to-r from-stone-600 to-stone-500 text-white rounded-t-lg">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Get Your Free Quote</CardTitle>
                  <CardDescription className="text-stone-100">
                    Professional consultation and detailed pricing for your project
                  </CardDescription>
                </div>
              </div>
              
              {selectedProduct && (
                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Selected Product: {selectedProduct.name}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {selectedProduct.price}
                  </Badge>
                </div>
              )}
            </CardHeader>

            <CardContent className="p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your interest. Our expert team will review your requirements and contact you within 24 hours.
                  </p>
                  <div className="bg-stone-50 rounded-lg p-4">
                    <p className="text-sm text-stone-600">
                      <strong>What happens next?</strong><br />
                      • Our team reviews your project details<br />
                      • We prepare a detailed quote and recommendations<br />
                      • You'll receive a call or email within 24 hours<br />
                      • Free consultation to discuss your project
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-stone-600" />
                        Personal Information
                      </h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+44 7XXX XXXXXX"
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Address
                        </label>
                        <Input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="City, Postcode"
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Project Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Home className="w-5 h-5 text-stone-600" />
                        Project Details
                      </h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Type *
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                        >
                          <option value="">Select project type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Approximate Area (m²)
                        </label>
                        <Input
                          type="number"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          placeholder="e.g., 25"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeline Preference
                        </label>
                        <div className="space-y-2">
                          {urgencyOptions.map((option) => (
                            <label key={option.value} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                              <input
                                type="radio"
                                name="urgency"
                                value={option.value}
                                checked={formData.urgency === option.value}
                                onChange={handleInputChange}
                                className="text-stone-600 focus:ring-stone-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{option.label}</span>
                                  <Badge 
                                    variant={option.value === 'urgent' ? 'destructive' : option.value === 'standard' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {option.badge}
                                  </Badge>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us more about your project, specific requirements, or any questions you have..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="bg-stone-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Our Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-stone-600" />
                        <span>+44 141 739 3377</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-stone-600" />
                        <span>info@thewallshop.co.uk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-stone-600" />
                        <span>Mon-Fri: 9 AM-6 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-stone-600" />
                        <span>UK Wide Service</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-stone-600 to-stone-500 hover:from-stone-700 hover:to-stone-600"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        'Get Free Quote'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteModal;

