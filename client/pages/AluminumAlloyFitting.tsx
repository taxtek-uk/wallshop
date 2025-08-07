import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Ruler, 
  Award, 
  Shield, 
  Wrench, 
  ArrowRight,
  CheckCircle,
  Download,
  Phone,
  Mail,
  Clock,
  Zap,
  Building,
  Home,
  Hotel,
  Users,
  Layers,
  Target
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AluminumAlloyFitting = () => {
  const [selectedProfile, setSelectedProfile] = useState('h-10t');

  const profiles = [
    {
      id: 'h-10t',
      name: 'H-10T Profile',
      description: 'Heavy-duty H-profile for 10mm panel thickness',
      image: '/public/images/aluminum-alloy-fitting-hero.png',
      dimensions: '10mm thickness',
      applications: ['WPC Wall Panels', 'Commercial Installations', 'High-Traffic Areas']
    },
    {
      id: 'h-15t',
      name: 'H-15T Profile',
      description: 'Robust H-profile for 15mm panel thickness',
      image: '/public/images/aluminum-alloy-fitting-detail.png',
      dimensions: '15mm thickness',
      applications: ['Thick Panel Systems', 'Industrial Applications', 'Heavy-Duty Installations']
    },
    {
      id: 'l-10x10',
      name: 'L-10×10 Profile',
      description: 'Versatile L-shaped profile for corner applications',
      image: '/public/images/aluminum-alloy-fitting-hero.png',
      dimensions: '10×10mm',
      applications: ['Corner Finishing', 'Edge Protection', 'Trim Applications']
    },
    {
      id: 'skirting',
      name: 'Skirting Line',
      description: 'Professional skirting profile for floor transitions',
      image: '/public/images/aluminum-alloy-fitting-detail.png',
      dimensions: '60mm height',
      applications: ['Floor Transitions', 'Wall Base Protection', 'Aesthetic Finishing']
    }
  ];

  const specifications = [
    { label: 'Material', value: 'Premium Aluminum Alloy' },
    { label: 'Finish Options', value: '8 Professional Finishes' },
    { label: 'Profile Types', value: 'H-10T, H-15T, L-10×10, Skirting' },
    { label: 'Standard Length', value: '3000mm (Custom Available)' },
    { label: 'Thickness Range', value: '1.2mm - 2.0mm Wall' },
    { label: 'Corrosion Resistance', value: 'Marine Grade Protection' },
    { label: 'Installation Method', value: 'Snap-Fit & Screw-Fix' },
    { label: 'Warranty', value: '25 Years Structural' }
  ];

  const features = [
    {
      icon: Settings,
      title: 'Precision Engineering',
      description: 'CNC-machined aluminum profiles with tolerances within ±0.1mm for perfect panel alignment.',
      benefit: 'Professional installation results'
    },
    {
      icon: Shield,
      title: 'Corrosion Resistance',
      description: 'Marine-grade aluminum alloy with advanced anodizing provides superior corrosion protection.',
      benefit: '25-year durability guarantee'
    },
    {
      icon: Zap,
      title: 'Quick Installation',
      description: 'Innovative snap-fit design enables rapid installation without specialized tools.',
      benefit: 'Reduced labor costs'
    },
    {
      icon: Layers,
      title: 'Versatile Compatibility',
      description: 'Compatible with all TheWallShop panel systems including WPC, SPC, and fireproof panels.',
      benefit: 'Universal system integration'
    },
    {
      icon: Target,
      title: 'Perfect Alignment',
      description: 'Engineered channels and guides ensure consistent panel spacing and perfect alignment.',
      benefit: 'Professional finish quality'
    },
    {
      icon: Award,
      title: 'Premium Finishes',
      description: 'Available in 8 professional finishes to complement any design aesthetic.',
      benefit: 'Design flexibility'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Profile Selection',
      description: 'Choose appropriate profile type based on panel thickness and application requirements.',
      time: '15 minutes'
    },
    {
      step: 2,
      title: 'Measurement & Cutting',
      description: 'Measure installation area and cut profiles to required lengths using aluminum cutting tools.',
      time: '30 minutes'
    },
    {
      step: 3,
      title: 'Profile Installation',
      description: 'Install profiles using snap-fit or screw-fix method depending on application.',
      time: '45 minutes'
    },
    {
      step: 4,
      title: 'Panel Integration',
      description: 'Insert wall panels into profile channels ensuring proper alignment and secure fit.',
      time: '60 minutes'
    }
  ];

  const applications = [
    {
      icon: Building,
      title: 'Commercial Projects',
      description: 'Professional installations for offices, retail spaces, and public buildings.',
      examples: ['Office Reception Areas', 'Retail Store Interiors', 'Public Building Lobbies']
    },
    {
      icon: Home,
      title: 'Residential Applications',
      description: 'High-quality finishing for luxury homes and residential developments.',
      examples: ['Living Room Feature Walls', 'Kitchen Backsplashes', 'Bathroom Wall Cladding']
    },
    {
      icon: Hotel,
      title: 'Hospitality Sector',
      description: 'Durable solutions for hotels, restaurants, and entertainment venues.',
      examples: ['Hotel Corridor Walls', 'Restaurant Interior Design', 'Entertainment Venue Cladding']
    }
  ];

  const finishes = [
    { name: 'Brushed Silver', color: '#C0C0C0', description: 'Classic brushed aluminum finish' },
    { name: 'Matte Black', color: '#2C2C2C', description: 'Contemporary matte black coating' },
    { name: 'Bronze Anodized', color: '#CD7F32', description: 'Warm bronze anodized finish' },
    { name: 'Champagne Gold', color: '#F7E7CE', description: 'Elegant champagne gold tone' },
    { name: 'Titanium Grey', color: '#686868', description: 'Modern titanium grey finish' },
    { name: 'White Powder', color: '#FFFFFF', description: 'Clean white powder coating' }
  ];

  const benefits = [
    'Precision-engineered for perfect panel alignment and professional results',
    'Marine-grade aluminum alloy provides superior corrosion resistance',
    'Quick snap-fit installation reduces labor time and costs',
    'Compatible with all TheWallShop panel systems for universal integration',
    'Available in 8 professional finishes to complement any design',
    'CNC-machined tolerances ensure consistent quality and fit',
    '25-year structural warranty provides long-term peace of mind',
    'Suitable for both residential and commercial applications'
  ];

  const technicalDetails = [
    {
      title: 'Material Composition',
      description: 'Premium 6063-T5 aluminum alloy with enhanced strength and corrosion resistance.',
      specs: ['Tensile Strength: 205 MPa', 'Yield Strength: 170 MPa', 'Elongation: 12%']
    },
    {
      title: 'Surface Treatment',
      description: 'Advanced anodizing and powder coating processes for superior durability.',
      specs: ['Anodizing Thickness: 15-25μm', 'Powder Coating: 60-80μm', 'Salt Spray Test: 1000+ hours']
    },
    {
      title: 'Dimensional Accuracy',
      description: 'CNC machining ensures precise dimensions and consistent quality.',
      specs: ['Tolerance: ±0.1mm', 'Straightness: ≤1mm/m', 'Surface Roughness: Ra ≤1.6μm']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"></div>
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
                <span className="text-white">Aluminum Alloy Fitting</span>
              </nav>
              
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Precision Engineering
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Aluminum Alloy Fitting
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Precision-engineered aluminum profiles for professional wall panel installation. 
                Marine-grade alloy construction with CNC-machined accuracy ensures perfect alignment and lasting durability.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £25/m</Badge>
                <Badge className="bg-white/20 text-white border-white/30">8 Finishes</Badge>
                <Badge className="bg-white/20 text-white border-white/30">25 Year Warranty</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Technical Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Profile Catalog
                </Button>
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
                    src="/public/images/aluminum-alloy-fitting-hero.png"
                    alt="Aluminum Alloy Fitting"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Settings className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Precision Engineering</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Shield className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Corrosion Resistant</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Quick Installation</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Award className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">25 Year Warranty</p>
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
              <TabsTrigger value="profiles">Profiles</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Engineering Excellence</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                      <div className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                        {feature.benefit}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Technical Excellence</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {technicalDetails.map((detail, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-taupe-200">
                      <h4 className="text-lg font-bold text-mocha-900 mb-3">{detail.title}</h4>
                      <p className="text-mocha-700 text-sm mb-4">{detail.description}</p>
                      <div className="space-y-2">
                        {detail.specs.map((spec, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-sm text-mocha-700">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Finishes */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Professional Finish Options</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {finishes.map((finish, i) => (
                    <div key={i} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-taupe-200 shadow-sm"
                        style={{ backgroundColor: finish.color }}
                      ></div>
                      <h4 className="font-semibold text-mocha-900 text-sm mb-1">{finish.name}</h4>
                      <p className="text-xs text-mocha-600">{finish.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profiles" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Profile Types</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {profiles.map((profile) => (
                    <motion.div
                      key={profile.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedProfile === profile.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-taupe-200 bg-white hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedProfile(profile.id)}
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-mocha-900 mb-2">{profile.name}</h3>
                      <p className="text-mocha-700 mb-4">{profile.description}</p>
                      
                      {selectedProfile === profile.id && (
                        <div className="space-y-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-mocha-900">Dimensions</p>
                            <p className="text-lg font-bold text-blue-600">{profile.dimensions}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mocha-900 mb-2">Applications:</p>
                            <div className="space-y-1">
                              {profile.applications.map((app, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-sm text-mocha-700">{app}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Professional Installation Process</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {installationSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="text-center p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                      <p className="text-sm text-mocha-700 leading-relaxed mb-3">{step.description}</p>
                      <div className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                        {step.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 p-8 bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl">
                  <h3 className="text-2xl font-bold text-mocha-900 mb-4">Professional Installation Service</h3>
                  <p className="text-mocha-700 mb-6 leading-relaxed">
                    Our certified installers specialize in aluminum profile systems, ensuring precise alignment 
                    and professional results. We guarantee perfect integration with all panel types.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-mocha-700">Complete installation: 2-4 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-mocha-700">Certified aluminum specialists</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Wrench className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-mocha-700">Professional tools included</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-mocha-900 mb-8">Technical Specifications</h2>
                  <div className="space-y-4">
                    {specifications.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                        <span className="font-medium text-mocha-900">{spec.label}</span>
                        <span className="text-mocha-700 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Aluminum Profile Benefits</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Marine Grade Alloy</h4>
                      <p className="text-sm text-mocha-700">6063-T5 aluminum alloy provides superior strength and corrosion resistance</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">CNC Precision</h4>
                      <p className="text-sm text-mocha-700">Computer-controlled machining ensures consistent quality and perfect fit</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Universal Compatibility</h4>
                      <p className="text-sm text-mocha-700">Compatible with all TheWallShop panel systems for seamless integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-br from-clay-50 to-taupe-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Professional Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              Aluminum alloy fittings provide the structural foundation for professional wall panel installations 
              across residential, commercial, and hospitality projects.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-6">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed mb-6">{app.description}</p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-mocha-700">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Professional Installation Solutions
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Ensure perfect panel alignment with our precision-engineered aluminum fittings. 
              Professional consultation and installation services available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Technical Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Request Profile Samples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AluminumAlloyFitting;

