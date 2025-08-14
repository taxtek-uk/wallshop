import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shirt, Layers, Zap, Award, Wrench, Puzzle, ArrowRight,
  CheckCircle, Download, Phone, Mail, Clock, Ruler, Settings,
  Home, Building, Hotel, X, User, MapPin, MessageSquare
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import QuoteModal from "@/components/QuoteModal";

const ClothPatternWallPanels = () => {
  const [selectedPattern, setSelectedPattern] = useState('1');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);




  const patterns = [
  { id: "1", name: "Linen Weave", description: "Linen Weave texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/1.jpg", popularity: "" },
  { id: "2", name: "Denim Texture", description: "Denim Texture texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/2.jpg", popularity: "" },
  { id: "3", name: "Chambray Grid", description: "Chambray Grid texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/3.jpg", popularity: "" },
  { id: "4", name: "Ivory Cotton", description: "Ivory Cotton texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/4.jpg", popularity: "" },
  { id: "5", name: "Silver Mesh", description: "Silver Mesh texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/5.jpg", popularity: "" },
  { id: "6", name: "Soft Gauze", description: "Soft Gauze texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/6.jpg", popularity: "" },
  { id: "7", name: "Contrast Linen Panel", description: "Contrast Linen Panel texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/7.jpg", popularity: "" },
  { id: "8", name: "Beige Canvas", description: "Beige Canvas texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/8.jpg", popularity: "" },
  { id: "9", name: "Rice Grain Weave", description: "Rice Grain Weave texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/9.jpg", popularity: "" },
  { id: "10", name: "Crosshatch Blend", description: "Crosshatch Blend texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/10.jpg", popularity: "" },
  { id: "11", name: "Alabaster Cotton", description: "Alabaster Cotton texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/11.jpg", popularity: "" },
  { id: "12", name: "Khaki Hemp", description: "Khaki Hemp texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/12.jpg", popularity: "" },
  { id: "13", name: "Pebble Mesh", description: "Pebble Mesh texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/13.jpg", popularity: "" },
  { id: "14", name: "Cream Wool", description: "Cream Wool texture for contemporary interior walls", img: "/images/carbon-rock-boards/fabric/14.jpg", popularity: "" }
];



  // Create selectedProduct object based on the selected pattern
const selectedProduct = {
  id: selectedPattern,
  name: `Cloth Pattern Wall Panels - ${
    patterns.find(p => p.id === selectedPattern)?.name || 'Natural Linen'
  }`,
  category: 'Wall Panels',
  subcategory: 'Cloth Pattern',
  description:
    patterns.find(p => p.id === selectedPattern)?.description ||
    'Classic linen weave with subtle texture and neutral tones.',
  price: 'Custom Quote',
  features: [
    'Authentic Textile Feel',
    'Multi-Dimensional Texture',
    'Stain Resistant Surface',
    'Acoustic Properties',
    'Professional Installation',
    'Design Versatility'
  ]
};

  

  const specifications = [
    { label: 'Material', value: 'High-Definition Textile Pattern PVC' },
    { label: 'Standard Sizes', value: '1200mm x 2400mm, 600mm x 2400mm' },
    { label: 'Thickness Options', value: '5mm, 8mm, 10mm' },
    { label: 'Fire Rating', value: 'Class B1 (DIN 4102)' },
    { label: 'Stain Resistance', value: 'Anti-Stain Coating' },
    { label: 'Texture Depth', value: '0.5-1.2mm Relief' },
    { label: 'Installation', value: 'Adhesive or Mechanical' },
    { label: 'Warranty', value: '12 Years Commercial' }
  ];

  const features = [
    {
      icon: Shirt,
      title: 'Authentic Textile Feel',
      description: 'Advanced embossing technology creates realistic fabric textures that look and feel like genuine textiles.',
      benefit: 'Luxurious tactile experience'
    },
    {
      icon: Layers,
      title: 'Multi-Dimensional Texture',
      description: 'Deep embossed patterns with varying relief depths create authentic fabric-like appearance.',
      benefit: 'Rich visual and tactile depth'
    },
    {
      icon: Zap,
      title: 'Stain Resistant Surface',
      description: 'Special protective coating resists stains, spills, and everyday wear while maintaining appearance.',
      benefit: 'Easy maintenance and cleaning'
    },
    {
      icon: Award,
      title: 'Acoustic Properties',
      description: 'Textured surface helps reduce sound reflection and improve room acoustics naturally.',
      benefit: 'Enhanced sound quality'
    },
    {
      icon: Wrench,
      title: 'Professional Installation',
      description: 'Designed for both adhesive and mechanical installation methods to suit any project requirement.',
      benefit: 'Flexible installation options'
    },
    {
      icon: Puzzle,
      title: 'Design Versatility',
      description: 'Perfect for creating accent walls, feature panels, and sophisticated interior environments.',
      benefit: 'Unlimited design possibilities'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Surface Assessment',
      description: 'Evaluate wall condition and prepare surface for optimal adhesion and appearance.',
      time: '30 minutes'
    },
    {
      step: 2,
      title: 'Pattern Planning',
      description: 'Plan panel layout considering pattern alignment and room proportions for best visual impact.',
      time: '45 minutes'
    },
    {
      step: 3,
      title: 'Panel Application',
      description: 'Apply panels using recommended adhesive or mechanical fasteners, ensuring proper alignment.',
      time: '3-5 hours'
    },
    {
      step: 4,
      title: 'Edge Finishing',
      description: 'Install trim pieces and edge treatments for a professional, seamless appearance.',
      time: '1 hour'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Luxury Residences',
      description: 'Create sophisticated accent walls in bedrooms, living areas, and home offices.',
      examples: ['Master Bedrooms', 'Study Rooms', 'Dining Areas']
    },
    {
      icon: Building,
      title: 'Corporate Environments',
      description: 'Enhance professional spaces with elegant textile-inspired wall treatments.',
      examples: ['Executive Offices', 'Conference Rooms', 'Reception Areas']
    },
    {
      icon: Hotel,
      title: 'Hospitality & Retail',
      description: 'Provide guests and customers with premium textile aesthetics and comfort.',
      examples: ['Hotel Suites', 'Boutiques', 'High-End Restaurants']
    }
  ];

  const benefits = [
    'Authentic fabric appearance without textile maintenance issues',
    'Stain and moisture resistant for long-lasting beauty',
    'Fire-resistant properties for enhanced safety compliance',
    'Acoustic benefits help improve room sound quality',
    'Easy to clean with standard household products',
    'Durable construction withstands high-traffic environments',
    'Hypoallergenic surface ideal for sensitive individuals',
    'Consistent pattern quality without fabric irregularities'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8b7aa8]/20 to-[#6b5b95]/20"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <nav className="text-white/70 mb-4">
                <Link to="/wall-panels" className="hover:text-white transition-colors">Wall Panels</Link>
                <span className="mx-2">/</span>
                <span className="text-white">Cloth Pattern Wall Panels</span>
              </nav>

              <div className="bg-gradient-to-r from-[#8b7aa8] to-[#6b5b95] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Premium Textile Patterns
              </div>

              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Cloth Pattern Wall{" "}
                <span className="bg-gradient-to-r from-[#8b7aa8] via-[#7a6ba1] to-[#6b5b95] bg-clip-text text-transparent">
                  Panels
                </span>
              </h1>

              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Bring the sophisticated elegance of fine textiles to your walls with our premium cloth pattern panels. Experience luxury fabric aesthetics without the maintenance.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">12 Year Warranty</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Stain Resistant</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Acoustic Benefits</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-gradient-to-r from-[#8b7aa8] to-[#6b5b95] text-white hover:from-[#6b5b95] hover:to-[#8b7aa8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Textile Quote <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Pattern Catalog
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden mb-6 shadow-md">
                  <img
                    src="/images/carbon-rock-boards/cloth.jpg"
                    alt="Cloth Pattern Wall Panel"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Shirt className="w-6 h-6 text-[#8b7aa8] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Textile Feel</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Zap className="w-6 h-6 text-[#8b7aa8] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Stain Resistant</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Award className="w-6 h-6 text-[#8b7aa8] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Acoustic</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Ruler className="w-6 h-6 text-[#8b7aa8] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Custom Sizes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="patterns">Cloth Patterns</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#8b7aa8] via-[#7a6ba1] to-[#6b5b95] bg-clip-text text-transparent mb-6 text-center"
                >
                  Key Features & Benefits
                </motion.h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Our cloth pattern wall panels deliver the sophisticated elegance of fine textiles with modern durability and convenience.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <div className="p-6 h-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#8b7aa8] transition-all duration-300 hover:shadow-xl rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b7aa8] to-[#6b5b95] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#231c14] mb-3">{feature.title}</h3>
                        <p className="text-[#6b5c47] text-sm leading-relaxed mb-3">{feature.description}</p>
                        <div className="text-xs text-[#8b7aa8] font-medium bg-[#8b7aa8]/10 px-3 py-1 rounded-full">
                          {feature.benefit}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] rounded-3xl p-12 shadow-xl"
              >
                <h3 className="text-3xl font-extrabold text-[#231c14] mb-8">Overall Benefits of Cloth Pattern Panels</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <CheckCircle className="w-6 h-6 text-[#8b7aa8] flex-shrink-0" />
                      <span className="text-[#231c14] font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-8">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#8b7aa8] via-[#7a6ba1] to-[#6b5b95] bg-clip-text text-transparent mb-6 text-center"
                >
                  Available Cloth Patterns
                </motion.h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Choose from our curated collection of premium textile patterns, each designed to bring sophisticated elegance to your space.
                </p>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {patterns.map((pattern, i) => (
                    <motion.div
                      key={pattern.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl ${
                        selectedPattern === pattern.id
                          ? 'border-[#8b7aa8] bg-gradient-to-br from-[#faf7f3] to-white shadow-2xl'
                          : 'border-[#e2d5c4] bg-white hover:border-[#8b7aa8]'
                      }`}
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      {/* Pattern image */}
                      <div className="aspect-square rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                        <img
                          src={pattern.img}
                          alt={pattern.name}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Pattern title */}
                      <h3 className="text-lg font-bold text-[#231c14] mb-2">{pattern.name}</h3>

                      {/* Pattern description */}
                      <p className="text-sm text-[#6b5c47] mb-3">{pattern.description}</p>

                      {/* Pattern popularity */}
                      <div className="text-xs text-[#8b7aa8] font-medium bg-[#8b7aa8]/10 px-3 py-1 rounded-full">
                        {pattern.popularity}
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </TabsContent>

            <TabsContent value="installation" className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#8b7aa8] via-[#7a6ba1] to-[#6b5b95] bg-clip-text text-transparent mb-6 text-center"
              >
                Professional Installation
              </motion.h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                Our cloth pattern panels are designed for professional installation to ensure optimal appearance and longevity.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {installationSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7aa8] to-[#6b5b95] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-[#231c14] mb-3">{step.title}</h3>
                    <p className="text-[#6b5c47] text-sm leading-relaxed mb-3">{step.description}</p>
                    <div className="flex items-center justify-center text-xs text-[#8b7aa8] font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#8b7aa8] via-[#7a6ba1] to-[#6b5b95] bg-clip-text text-transparent mb-6 text-center"
              >
                Technical Specifications
              </motion.h2>
              <div className="bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] rounded-3xl p-12 shadow-xl">
                <div className="grid md:grid-cols-2 gap-8">
                  {specifications.map((spec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex justify-between items-center py-3 border-b border-[#e2d5c4] last:border-b-0"
                    >
                      <span className="font-medium text-[#231c14]">{spec.label}</span>
                      <span className="text-[#6b5c47] text-right">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-br from-[#faf7f3] to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#8b7aa8] via-[#7a6ba1] to-[#6b5b95] bg-clip-text text-transparent mb-6 text-center"
          >
            Perfect Applications
          </motion.h2>
          <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
            Cloth pattern wall panels are ideal for creating sophisticated, textile-inspired environments in various settings.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="p-8 h-full bg-white border border-[#e2d5c4] hover:border-[#8b7aa8] transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7aa8] to-[#6b5b95] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <app.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-4">{app.title}</h3>
                  <p className="text-[#6b5c47] leading-relaxed mb-6">{app.description}</p>
                  <div className="space-y-2">
                    {app.examples.map((example, j) => (
                      <div key={j} className="flex items-center text-sm text-[#8b7aa8]">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8b7aa8]/20 to-[#6b5b95]/20"></div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold text-white mb-6"
          >
            Ready to Add Textile Elegance?
          </motion.h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12">
            Get a personalized quote for your cloth pattern wall panel project and discover the sophisticated beauty of textile-inspired interiors.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className="bg-gradient-to-r from-[#8b7aa8] to-[#6b5b95] text-white hover:from-[#6b5b95] hover:to-[#8b7aa8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Get Your Quote Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link
              to="/request-free-sample"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Request Free Sample
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ClothPatternWallPanels;

