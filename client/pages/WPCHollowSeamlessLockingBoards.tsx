import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Zap, 
  Award, 
  Wrench, 
  Lock, 
  ArrowRight,
  CheckCircle,
  Download,
  Phone,
  Mail,
  Clock,
  Shield,
  Ruler,
  Settings,
  Home,
  Building,
  Hotel,
  Lightbulb,
  Thermometer,
  Volume2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WPCHollowSeamlessLockingBoards = () => {
  const [selectedFinish, setSelectedFinish] = useState('natural-oak');

  const finishes = [
    {
      id: 'natural-oak',
      name: 'Natural Oak',
      description: 'Warm, natural wood grain with authentic oak texture',
      image: '/images/wpc-hollow-seamless-locking-board-hero.png'
    },
    {
      id: 'walnut-brown',
      name: 'Walnut Brown',
      description: 'Rich, deep brown with sophisticated walnut patterns',
      image: '/images/wpc-hollow-seamless-locking-board-detail.png'
    },
    {
      id: 'grey-ash',
      name: 'Grey Ash',
      description: 'Contemporary grey with subtle ash wood grain',
      image: '/images/wpc-hollow-seamless-locking-board-hero.png'
    },
    {
      id: 'white-pine',
      name: 'White Pine',
      description: 'Light, airy finish with clean pine wood texture',
      image: '/images/wpc-hollow-seamless-locking-board-detail.png'
    },
    {
      id: 'ebony-black',
      name: 'Ebony Black',
      description: 'Dramatic black finish with elegant wood grain',
      image: '/images/wpc-hollow-seamless-locking-board-hero.png'
    },
    {
      id: 'teak-gold',
      name: 'Teak Gold',
      description: 'Luxurious golden teak with premium wood patterns',
      image: '/images/wpc-hollow-seamless-locking-board-detail.png'
    }
  ];

  const specifications = [
    { label: 'Thickness', value: '15mm / 18mm' },
    { label: 'Width', value: '140mm / 160mm' },
    { label: 'Length', value: '2900mm / Custom' },
    { label: 'Material', value: 'WPC Hollow Core Composite' },
    { label: 'Joint System', value: 'Seamless Locking Mechanism' },
    { label: 'Fire Rating', value: 'Class B1' },
    { label: 'Weight', value: '2.8kg/m² (40% lighter)' },
    { label: 'Warranty', value: '15 Years Commercial' }
  ];

  const features = [
    {
      icon: Lock,
      title: 'Seamless Locking System',
      description: 'Revolutionary locking mechanism creates perfectly seamless joints with no visible gaps or lines.',
      benefit: 'Flawless continuous surface'
    },
    {
      icon: Layers,
      title: 'Hollow Core Technology',
      description: 'Advanced hollow core design reduces weight by 40% while maintaining structural integrity.',
      benefit: 'Easier handling and installation'
    },
    {
      icon: Thermometer,
      title: 'Superior Insulation',
      description: 'Hollow core structure provides excellent thermal and acoustic insulation properties.',
      benefit: 'Energy efficiency and sound dampening'
    },
    {
      icon: Shield,
      title: 'Enhanced Durability',
      description: 'WPC composite construction offers superior resistance to moisture, impact, and wear.',
      benefit: 'Long-lasting performance'
    },
    {
      icon: Lightbulb,
      title: 'Lightweight Design',
      description: 'Hollow core reduces material weight without compromising strength or stability.',
      benefit: 'Reduced structural load'
    },
    {
      icon: Zap,
      title: 'Rapid Installation',
      description: 'Seamless locking system enables faster installation with professional results every time.',
      benefit: 'Reduced labor costs and time'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Surface Preparation',
      description: 'Ensure wall surface is clean, dry, and level. Install mounting framework if required.',
      time: '45 minutes'
    },
    {
      step: 2,
      title: 'First Board Alignment',
      description: 'Position first board with precise alignment using laser level for perfect starting point.',
      time: '30 minutes'
    },
    {
      step: 3,
      title: 'Seamless Locking',
      description: 'Engage locking mechanism for subsequent boards, ensuring seamless connections.',
      time: '2-4 hours'
    },
    {
      step: 4,
      title: 'Final Inspection',
      description: 'Complete installation with edge trims and comprehensive quality inspection.',
      time: '30 minutes'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Residential Spaces',
      description: 'Perfect for feature walls, accent panels, and complete room makeovers with seamless finish.',
      examples: ['Living Room Feature Walls', 'Master Bedroom Accents', 'Home Office Panels']
    },
    {
      icon: Building,
      title: 'Commercial Projects',
      description: 'Professional-grade solution for offices, retail spaces, and corporate environments.',
      examples: ['Corporate Reception Areas', 'Retail Store Interiors', 'Conference Room Walls']
    },
    {
      icon: Hotel,
      title: 'Hospitality Industry',
      description: 'Luxury finishes for hotels, restaurants, and high-end entertainment venues.',
      examples: ['Hotel Lobby Features', 'Restaurant Interior Walls', 'Spa and Wellness Centers']
    }
  ];

  const benefits = [
    'Completely seamless appearance with no visible joints',
    '40% lighter than solid WPC panels',
    'Superior thermal and acoustic insulation',
    'Faster installation with locking mechanism',
    'Reduced structural load on buildings',
    'Enhanced moisture and impact resistance',
    'Professional finish suitable for high-end projects',
    'Compatible with standard wall construction methods'
  ];

  const technicalAdvantages = [
    {
      title: 'Hollow Core Engineering',
      description: 'Advanced hollow core design optimizes material usage while maintaining structural integrity.',
      specs: ['40% weight reduction', 'Enhanced insulation properties', 'Improved sound dampening']
    },
    {
      title: 'Seamless Locking Technology',
      description: 'Precision-engineered locking system creates invisible joints for continuous surface appearance.',
      specs: ['Zero visible gaps', 'Perfect alignment', 'Professional finish']
    },
    {
      title: 'WPC Composite Construction',
      description: 'Premium wood-plastic composite offers superior performance over traditional materials.',
      specs: ['Moisture resistant', 'Impact resistant', 'Dimensional stability']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-mocha-950 via-leather-800 to-olive-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-clay-500/20 to-taupe-500/20"></div>
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
                <span className="text-white">WPC Hollow Seamless Locking Boards</span>
              </nav>
              
              <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Hollow Core Technology
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                WPC Hollow Seamless Locking Boards
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Revolutionary hollow core technology meets seamless locking system. 40% lighter weight, 
                superior insulation, and completely invisible joints for the ultimate professional finish.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £58/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">15 Year Warranty</Badge>
                <Badge className="bg-white/20 text-white border-white/30">40% Lighter</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-blue-600 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Get Professional Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Technical Specifications
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
                    src="/images/wpc-hollow-seamless-locking-board-hero.png"
                    alt="WPC Hollow Seamless Locking Boards"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Lock className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Seamless Lock</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Layers className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Hollow Core</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Thermometer className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Insulation</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Volume2 className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Sound Dampening</p>
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
              <TabsTrigger value="finishes">Finishes</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Hollow Core Innovation</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                      <div className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                        {feature.benefit}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technical Advantages */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Technical Advantages</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {technicalAdvantages.map((advantage, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-taupe-200">
                      <h4 className="text-lg font-bold text-mocha-900 mb-3">{advantage.title}</h4>
                      <p className="text-mocha-700 text-sm mb-4">{advantage.description}</p>
                      <div className="space-y-2">
                        {advantage.specs.map((spec, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-mocha-700">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits List */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Performance Benefits</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-mocha-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="finishes" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Premium Wood Finishes</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {finishes.map((finish) => (
                    <motion.div
                      key={finish.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedFinish === finish.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-taupe-200 bg-white hover:border-green-300'
                      }`}
                      onClick={() => setSelectedFinish(finish.id)}
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={finish.image}
                          alt={finish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-mocha-900 mb-2">{finish.name}</h3>
                      <p className="text-mocha-700">{finish.description}</p>
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
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                      <p className="text-sm text-mocha-700 leading-relaxed mb-3">{step.description}</p>
                      <div className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                        {step.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 p-8 bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl">
                  <h3 className="text-2xl font-bold text-mocha-900 mb-4">Specialized Installation Service</h3>
                  <p className="text-mocha-700 mb-6 leading-relaxed">
                    Our certified installation specialists are trained in hollow core WPC technology and seamless 
                    locking systems. We guarantee perfect alignment, invisible joints, and professional results.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-mocha-700">Average installation: 3-5 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-mocha-700">Certified hollow core specialists</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-mocha-700">15-year installation warranty</span>
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Hollow Core System Details</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Core Structure</h4>
                      <p className="text-sm text-mocha-700">Advanced hollow chamber design with reinforced walls for optimal strength-to-weight ratio</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Locking Mechanism</h4>
                      <p className="text-sm text-mocha-700">Precision-engineered seamless locking system with invisible joint technology</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Insulation Properties</h4>
                      <p className="text-sm text-mocha-700">Superior thermal and acoustic insulation due to hollow core air chambers</p>
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
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-clay-600 via-taupe-600 to-leather-600 bg-clip-text text-transparent mb-6">
              Perfect Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              WPC Hollow Seamless Locking Boards excel in projects requiring lightweight, insulated, 
              and seamlessly finished wall systems.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-6">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed mb-6">{app.description}</p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-mocha-950 via-leather-800 to-olive-900">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Experience Hollow Core Innovation
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the future of wall panels with our WPC Hollow Seamless Locking Boards. 
              Lighter, stronger, and more efficient than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-blue-600 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Get Professional Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Technical Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WPCHollowSeamlessLockingBoards;

