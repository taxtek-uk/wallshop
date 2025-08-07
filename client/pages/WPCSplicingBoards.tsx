import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Zap, 
  Award, 
  Wrench, 
  Puzzle, 
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
  X,
  User,
  MapPin,
  MessageSquare
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WPCSplicingBoards = () => {
  const [selectedPattern, setSelectedPattern] = useState('horizontal');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    roomSize: '',
    preferredPattern: '',
    message: ''
  });

  const patterns = [
    {
      id: 'horizontal',
      name: 'Horizontal Planks',
      description: 'Classic horizontal wood plank pattern',
      image: '/images/wpc-splicing-board.png'
    },
    {
      id: 'vertical',
      name: 'Vertical Boards',
      description: 'Modern vertical board arrangement',
      image: '/images/wpc-wall-panel-detail.png'
    },
    {
      id: 'herringbone',
      name: 'Herringbone',
      description: 'Sophisticated herringbone pattern',
      image: '/images/wpc-wall-panel-hero.png'
    },
    {
      id: 'chevron',
      name: 'Chevron',
      description: 'Contemporary chevron design',
      image: '/images/wpc-splicing-board.png'
    }
  ];

  const specifications = [
    { label: 'Thickness', value: '6mm / 9mm' },
    { label: 'Width', value: '150mm / 200mm' },
    { label: 'Length', value: '1200mm / 1800mm' },
    { label: 'Material', value: 'Premium WPC Composite' },
    { label: 'Joint System', value: 'Precision Click-Lock' },
    { label: 'Fire Rating', value: 'Class B1' },
    { label: 'Installation', value: 'Seamless Interlocking' },
    { label: 'Warranty', value: '12 Years Residential' }
  ];

  const features = [
    {
      icon: Puzzle,
      title: 'Seamless Installation',
      description: 'Advanced interlocking system creates perfectly aligned surfaces without visible joints or gaps.',
      benefit: 'Professional finish every time'
    },
    {
      icon: Layers,
      title: 'Modular Design',
      description: 'Flexible modular system allows for creative patterns and easy replacement of individual boards.',
      benefit: 'Design freedom and maintenance ease'
    },
    {
      icon: Wrench,
      title: 'Tool-Free Assembly',
      description: 'Precision-engineered click-lock mechanism requires no special tools or adhesives for installation.',
      benefit: 'Faster installation, lower costs'
    },
    {
      icon: Shield,
      title: 'Professional Finish',
      description: 'Micro-beveled edges and precision manufacturing ensure a flawless, professional appearance.',
      benefit: 'Premium aesthetic quality'
    },
    {
      icon: Settings,
      title: 'Adjustable System',
      description: 'Accommodates irregular wall surfaces and allows for thermal expansion without compromising appearance.',
      benefit: 'Versatile installation options'
    },
    {
      icon: Zap,
      title: 'Quick Installation',
      description: 'Rapid installation system reduces project time by up to 60% compared to traditional methods.',
      benefit: 'Reduced labor costs and downtime'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Wall Preparation',
      description: 'Ensure wall surface is clean, dry, and level. Install furring strips if required.',
      time: '30 minutes'
    },
    {
      step: 2,
      title: 'Starting Row',
      description: 'Install first row with proper spacing and alignment using laser level for precision.',
      time: '45 minutes'
    },
    {
      step: 3,
      title: 'Interlocking Assembly',
      description: 'Click subsequent boards into place, ensuring tight joints and proper alignment.',
      time: '2-3 hours'
    },
    {
      step: 4,
      title: 'Finishing Touches',
      description: 'Install edge trims, corner pieces, and final quality inspection.',
      time: '30 minutes'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Residential Interiors',
      description: 'Perfect for feature walls, accent panels, and complete room transformations.',
      examples: ['Living Room Feature Walls', 'Bedroom Accent Panels', 'Dining Room Wainscoting']
    },
    {
      icon: Building,
      title: 'Commercial Spaces',
      description: 'Professional-grade solution for offices, retail spaces, and public buildings.',
      examples: ['Office Reception Areas', 'Retail Store Displays', 'Conference Room Walls']
    },
    {
      icon: Hotel,
      title: 'Hospitality Design',
      description: 'Luxury finishes for hotels, restaurants, and entertainment venues.',
      examples: ['Hotel Room Headboards', 'Restaurant Feature Walls', 'Lobby Accent Panels']
    }
  ];

  const benefits = [
    'No visible joints or seams when properly installed',
    'Allows for creative pattern arrangements',
    'Easy replacement of individual damaged boards',
    'Accommodates building movement and settling',
    'Reduces installation time by up to 60%',
    'No special tools or adhesives required',
    'Consistent gap spacing for professional appearance',
    'Compatible with standard wall construction'
  ];

  const patternBenefits = {
    horizontal: ['Creates sense of width', 'Classic, timeless appeal', 'Easy installation'],
    vertical: ['Makes rooms appear taller', 'Modern, contemporary look', 'Emphasizes ceiling height'],
    herringbone: ['Sophisticated, luxury appearance', 'Creates visual interest', 'Hides minor imperfections'],
    chevron: ['Dynamic, energetic feel', 'Contemporary design statement', 'Creates focal point']
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Quote form submitted:', quoteForm);
    setIsQuoteModalOpen(false);
    // Reset form
    setQuoteForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      projectType: '',
      roomSize: '',
      preferredPattern: '',
      message: ''
    });
  };

  const handleInputChange = (field, value) => {
    setQuoteForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#b69777]/20 to-[#907252]/20"></div>
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
                <span className="text-white">WPC Splicing Boards</span>
              </nav>
              
              <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Modular Installation System
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                WPC Splicing{" "}
                <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                  Boards
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Revolutionary interlocking system that creates seamless wall surfaces with professional-grade installation. 
                Perfect alignment, no visible joints, and unlimited design possibilities.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">12 Year Warranty</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Tool-Free Installation</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Seamless Joints</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Protection Quote <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Installation Guide
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
                    src="/images/wpc-splicing-board.png"
                    alt="WPC Splicing Boards Installation"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Puzzle className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Seamless Joints</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Layers className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Modular Design</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Wrench className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Tool-Free Install</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Clock className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Quick Assembly</p>
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
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
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
                  className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6 text-center"
                >
                  Advanced Splicing Technology
                </motion.h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Experience seamless installation with our revolutionary interlocking system designed for professional results.
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
                      <div className="p-6 h-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#231c14] mb-3">{feature.title}</h3>
                        <p className="text-[#6b5c47] text-sm leading-relaxed mb-3">{feature.description}</p>
                        <div className="text-xs text-[#b69777] font-medium bg-[#b69777]/10 px-3 py-1 rounded-full">
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
                <h3 className="text-3xl font-extrabold text-[#231c14] mb-8">Installation & Performance Benefits</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <CheckCircle className="w-6 h-6 text-[#b69777] flex-shrink-0" />
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
                  className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6 text-center"
                >
                  Design Patterns & Layouts
                </motion.h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Choose from our collection of professional patterns to create the perfect aesthetic for your space.
                </p>
                <div className="grid lg:grid-cols-2 gap-8">
                  {patterns.map((pattern, i) => (
                    <motion.div
                      key={pattern.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedPattern === pattern.id
                          ? 'border-[#b69777] bg-gradient-to-br from-[#faf7f3] to-white shadow-2xl'
                          : 'border-[#e2d5c4] bg-white hover:border-[#b69777]'
                      }`}
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      <div className="aspect-video bg-[#f8f6f3] rounded-lg mb-4 overflow-hidden border border-[#e2d5c4]">
                        <img
                          src={pattern.image}
                          alt={pattern.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[#231c14] mb-2">{pattern.name}</h3>
                      <p className="text-[#6b5c47] mb-4">{pattern.description}</p>
                      
                      {selectedPattern === pattern.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <h4 className="font-semibold text-[#231c14]">Pattern Benefits:</h4>
                          {patternBenefits[pattern.id as keyof typeof patternBenefits].map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-[#b69777] flex-shrink-0" />
                              <span className="text-sm text-[#6b5c47]">{benefit}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="space-y-8">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6 text-center"
                >
                  Installation Process
                </motion.h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Professional installation in four simple steps for perfect results every time.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {installationSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.2 }}
                      className="text-center p-8 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-6 text-white text-2xl font-extrabold shadow-lg">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-[#231c14] mb-4">{step.title}</h3>
                      <p className="text-sm text-[#6b5c47] leading-relaxed mb-3">{step.description}</p>
                      <div className="text-xs text-[#b69777] font-medium bg-[#b69777]/10 px-3 py-1 rounded-full inline-block">
                        {step.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl font-extrabold text-[#231c14] mb-8">Technical Specifications</h2>
                  <div className="space-y-4">
                    {specifications.map((spec, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex justify-between items-center p-6 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-lg rounded-xl"
                      >
                        <span className="font-semibold text-[#231c14]">{spec.label}</span>
                        <span className="font-bold text-[#b69777]">{spec.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-extrabold text-[#231c14] mb-8">System Advantages</h3>
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-lg rounded-xl">
                      <h4 className="font-bold text-[#231c14] mb-3">Precision Engineering</h4>
                      <p className="text-sm text-[#6b5c47] leading-relaxed">
                        Micro-precision manufacturing ensures perfect alignment and seamless joints every time.
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-lg rounded-xl">
                      <h4 className="font-bold text-[#231c14] mb-3">Modular Flexibility</h4>
                      <p className="text-sm text-[#6b5c47] leading-relaxed">
                        Individual board replacement and creative pattern arrangements without system compromise.
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-lg rounded-xl">
                      <h4 className="font-bold text-[#231c14] mb-3">Professional Results</h4>
                      <p className="text-sm text-[#6b5c47] leading-relaxed">
                        Consistent quality and appearance that meets commercial-grade standards.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6 text-center"
          >
            Perfect for Every Application
          </motion.h2>
          <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
            From residential feature walls to commercial installations, our splicing boards deliver professional results.
          </p>
          <div className="grid lg:grid-cols-3 gap-12">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-10 bg-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-500 hover:shadow-2xl rounded-2xl"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <app.icon className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#231c14] mb-4">{app.title}</h3>
                <p className="text-[#6b5c47] mb-6 leading-relaxed">{app.description}</p>
                <ul className="space-y-3">
                  {app.examples.map((example, j) => (
                    <li key={j} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-[#b69777]"></div>
                      <span className="text-sm font-medium text-[#231c14]">{example}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#b69777]/20 to-[#907252]/20"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Ready for Professional{" "}
            <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
              Installation?
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Get a personalized quote for your WPC splicing board project. Our experts will help you choose 
            the perfect pattern and provide professional installation services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-12 py-6 text-xl rounded-full font-semibold flex items-center justify-center"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Get Protection Quote <ArrowRight className="ml-3 h-6 w-6" />
            </button>
            <button
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-12 py-6 text-xl rounded-full font-semibold flex items-center justify-center"
            >
              <Phone className="mr-3 h-6 w-6" />
              Call Us Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e2d5c4]"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-extrabold text-[#231c14]">
                Get Your Protection Quote
              </h3>
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="rounded-full p-2 hover:bg-[#f8f6f3] transition-colors duration-200"
              >
                <X className="h-6 w-6 text-[#6b5c47]" />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={quoteForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Phone Number
                  </label>
                  <Input
                    value={quoteForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Project Type
                  </label>
                  <Select value={quoteForm.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                    <SelectTrigger className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                  Project Address
                </label>
                <Input
                  value={quoteForm.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                  placeholder="Enter project address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Room Size (approx.)
                  </label>
                  <Input
                    value={quoteForm.roomSize}
                    onChange={(e) => handleInputChange('roomSize', e.target.value)}
                    className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                    placeholder="e.g., 4m x 3m"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Preferred Pattern
                  </label>
                  <Select value={quoteForm.preferredPattern} onValueChange={(value) => handleInputChange('preferredPattern', value)}>
                    <SelectTrigger className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4">
                      <SelectValue placeholder="Select pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      {patterns.map((pattern) => (
                        <SelectItem key={pattern.id} value={pattern.id}>
                          {pattern.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                  Additional Details
                </label>
                <Textarea
                  value={quoteForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4 min-h-[120px]"
                  placeholder="Tell us more about your project requirements..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-[#b69777] to-[#907252] hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Submit Quote Request
                </button>
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-[#b69777] text-[#231c14] hover:bg-[#f8f6f3] transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WPCSplicingBoards;