import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Droplets, 
  Flame, 
  Layers, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Zap,
  Home,
  Building,
  Hotel,
  Warehouse
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WallPanels = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const productCategories = [
    {
      id: 'wpc',
      title: 'WPC Wall Panels',
      description: 'Premium wood-plastic composite panels offering the perfect blend of natural aesthetics and modern durability.',
      image: '/client/images/wpc-wall-panel-hero.png',
      features: ['Moisture Resistant', 'Eco-Friendly', 'Easy Installation'],
      price: 'From £45/m²',
      link: '/wall-panels/wpc',
      category: 'composite'
    },
    {
      id: 'anti-collision',
      title: 'Anti-collision Wall Panels',
      description: 'Heavy-duty protection panels designed for high-traffic areas requiring superior impact resistance.',
      image: '/client/images/anti-collision-wall-panel.png',
      features: ['Impact Resistant', 'Commercial Grade', 'Low Maintenance'],
      price: 'From £65/m²',
      link: '/wall-panels/anti-collision',
      category: 'protective'
    },
    {
      id: 'wpc-splicing',
      title: 'WPC Splicing Boards',
      description: 'Innovative interlocking system creating seamless wall surfaces with professional-grade installation.',
      image: '/client/images/wpc-splicing-board.png',
      features: ['Seamless Installation', 'Modular Design', 'Professional Finish'],
      price: 'From £52/m²',
      link: '/wall-panels/wpc-splicing',
      category: 'composite'
    },
    {
      id: 'wpc-hollow',
      title: 'WPC Hollow Seamless Locking',
      description: 'Lightweight hollow-core construction with advanced locking mechanism for efficient installation.',
      image: '/client/images/wpc-wall-panel-detail.png',
      features: ['Lightweight', 'Thermal Insulation', 'Quick Install'],
      price: 'From £48/m²',
      link: '/wall-panels/wpc-hollow',
      category: 'composite'
    },
    {
      id: 'fireproof',
      title: 'Class A Fireproof Boards',
      description: 'Superior fire-resistant panels meeting the highest safety standards for commercial and public spaces.',
      image: '/client/images/fireproof-board-commercial.png',
      features: ['Class A Fire Rating', 'Safety Certified', 'Commercial Grade'],
      price: 'From £75/m²',
      link: '/wall-panels/fireproof',
      category: 'safety'
    },
    {
      id: 'fluted',
      title: 'Fluted Wall Panels',
      description: 'Architectural texture panels featuring elegant vertical grooves for sophisticated interior design.',
      image: '/client/images/fluted-wall-panel.png',
      features: ['Architectural Design', 'Premium Texture', 'Modern Aesthetic'],
      price: 'From £58/m²',
      link: '/wall-panels/fluted',
      category: 'decorative'
    },
    {
      id: 'aluminum-fittings',
      title: 'Aluminum Alloy Fittings',
      description: 'Professional-grade mounting hardware and finishing accessories for seamless panel installation.',
      image: '/client/images/aluminum-fittings.png',
      features: ['Precision Engineering', 'Corrosion Resistant', 'Professional Grade'],
      price: 'From £15/unit',
      link: '/wall-panels/aluminum-fittings',
      category: 'accessories'
    },
    {
      id: 'wpc-hd-printing',
      title: 'WPC HD Printing Panels',
      description: 'High-definition printed panels offering unlimited design possibilities with photorealistic finishes.',
      image: '/client/images/wpc-wall-panel-hero.png',
      features: ['HD Printing', 'Custom Graphics', 'Fade Resistant'],
      price: 'From £68/m²',
      link: '/wall-panels/wpc-hd-printing',
      category: 'decorative'
    },
    {
      id: 'spc-background',
      title: 'SPC Background Walls',
      description: 'Stone-plastic composite panels providing exceptional durability for feature wall applications.',
      image: '/client/images/uhd-continuous-pattern.png',
      features: ['Stone-Plastic Composite', 'Feature Wall Ready', 'Superior Durability'],
      price: 'From £62/m²',
      link: '/wall-panels/spc-background',
      category: 'composite'
    },
    {
      id: 'uhd-continuous',
      title: 'UHD Continuous Pattern',
      description: 'Ultra-high-definition continuous patterns creating seamless luxury finishes across large surfaces.',
      image: '/client/images/uhd-continuous-pattern.png',
      features: ['UHD Patterns', 'Seamless Continuity', 'Luxury Finishes'],
      price: 'From £85/m²',
      link: '/wall-panels/uhd-continuous',
      category: 'luxury'
    },
    {
      id: 'spc-waterproof',
      title: 'SPC Waterproof Panels',
      description: 'Advanced waterproof panels perfect for bathrooms, kitchens, and high-moisture environments.',
      image: '/client/images/spc-waterproof-bathroom.png',
      features: ['100% Waterproof', 'Bathroom Ready', 'Mold Resistant'],
      price: 'From £55/m²',
      link: '/wall-panels/spc-waterproof',
      category: 'waterproof'
    },
    {
      id: 'spc-stone-crystal',
      title: 'SPC Stone Crystal Flooring',
      description: 'Premium stone-crystal composite flooring with exceptional durability and natural stone aesthetics.',
      image: '/client/images/plastic-wood-flooring.png',
      features: ['Stone Crystal Finish', 'Premium Durability', 'Natural Aesthetics'],
      price: 'From £72/m²',
      link: '/wall-panels/spc-stone-crystal',
      category: 'flooring'
    },
    {
      id: 'plastic-wood',
      title: 'Plastic Wood Flooring',
      description: 'Sustainable plastic-wood composite flooring combining environmental responsibility with performance.',
      image: '/client/images/plastic-wood-flooring.png',
      features: ['Eco-Friendly', 'Weather Resistant', 'Low Maintenance'],
      price: 'From £42/m²',
      link: '/wall-panels/plastic-wood',
      category: 'flooring'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: productCategories.length },
    { id: 'composite', name: 'WPC/SPC Composite', count: productCategories.filter(p => p.category === 'composite').length },
    { id: 'waterproof', name: 'Waterproof Solutions', count: productCategories.filter(p => p.category === 'waterproof').length },
    { id: 'decorative', name: 'Decorative Panels', count: productCategories.filter(p => p.category === 'decorative').length },
    { id: 'safety', name: 'Safety & Protection', count: productCategories.filter(p => p.category === 'safety').length },
    { id: 'luxury', name: 'Luxury Finishes', count: productCategories.filter(p => p.category === 'luxury').length },
    { id: 'flooring', name: 'Flooring Solutions', count: productCategories.filter(p => p.category === 'flooring').length },
    { id: 'accessories', name: 'Fittings & Accessories', count: productCategories.filter(p => p.category === 'accessories').length }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? productCategories 
    : productCategories.filter(product => product.category === activeCategory);

  const benefits = [
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'All panels meet the highest industry standards with comprehensive testing and certification.'
    },
    {
      icon: Zap,
      title: 'Easy Installation',
      description: 'Professional installation services with innovative mounting systems for quick, clean setup.'
    },
    {
      icon: Award,
      title: 'Comprehensive Warranty',
      description: 'Industry-leading warranty coverage with full support and maintenance services.'
    },
    {
      icon: Sparkles,
      title: 'Design Excellence',
      description: 'Cutting-edge aesthetics that transform spaces with sophisticated, modern appeal.'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Residential',
      description: 'Transform your home with premium wall solutions'
    },
    {
      icon: Building,
      title: 'Commercial',
      description: 'Professional-grade panels for business environments'
    },
    {
      icon: Hotel,
      title: 'Hospitality',
      description: 'Luxury finishes for hotels and restaurants'
    },
    {
      icon: Warehouse,
      title: 'Industrial',
      description: 'Durable solutions for demanding environments'
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
              <div className="bg-gradient-to-r from-clay-500 to-leather-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Premium Wall Panel Collection
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Transform Your Space with{" "}
                <span className="bg-gradient-to-r from-clay-400 via-taupe-300 to-leather-400 bg-clip-text text-transparent">
                  Premium Wall Panels
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Discover our comprehensive collection of wall panels, from waterproof solutions to luxury finishes. 
                Professional installation, comprehensive warranty, and design excellence in every panel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-gradient-to-r from-clay-500 to-leather-600 text-white hover:from-leather-600 hover:to-clay-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get Quote
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
                    src="/client/images/wpc-wall-panel-hero.png"
                    alt="Premium Wall Panels"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.slice(0, 4).map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20"
                    >
                      <benefit.icon className="w-6 h-6 text-clay-400 mx-auto mb-2" />
                      <p className="text-xs font-medium text-white/90">{benefit.title}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-clay-600 via-taupe-600 to-leather-600 bg-clip-text text-transparent mb-6">
              Why Choose TheWallShop Panels?
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect combination of innovation, quality, and design excellence that sets our wall panels apart.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="text-center p-8 h-full bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-clay-400 transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-clay-400 to-leather-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-mocha-900 mb-4">{benefit.title}</h3>
                  <p className="text-mocha-700 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Filter */}
      <section id="products" className="py-20 bg-gradient-to-br from-clay-50 to-taupe-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-clay-600 via-taupe-600 to-leather-600 bg-clip-text text-transparent mb-6">
              Our Complete Collection
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Browse our comprehensive range of premium wall panels, each designed for specific applications and environments.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-clay-500 to-leather-600 text-white shadow-lg'
                    : 'bg-white text-mocha-700 hover:bg-clay-100 border border-taupe-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white border-taupe-200 hover:border-clay-400 transition-all duration-300 hover:shadow-xl overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold text-mocha-900 group-hover:text-clay-600 transition-colors">
                        {product.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-clay-100 text-clay-700">
                        {product.price}
                      </Badge>
                    </div>
                    <CardDescription className="text-mocha-600 leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-clay-300 text-clay-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Link to={product.link}>
                      <Button className="w-full bg-gradient-to-r from-clay-500 to-leather-600 text-white hover:from-leather-600 hover:to-clay-500 transition-all duration-300 group-hover:shadow-lg">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-clay-600 via-taupe-600 to-leather-600 bg-clip-text text-transparent mb-6">
              Perfect for Every Application
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              Our wall panels are designed to excel in diverse environments, from residential homes to commercial spaces.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group text-center p-8 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-clay-400 transition-all duration-300 hover:shadow-xl rounded-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-clay-400 to-leather-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed">{app.description}</p>
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
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Get expert consultation and professional installation for your wall panel project. 
              Contact us today for a free quote and design consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-clay-500 to-leather-600 text-white hover:from-leather-600 hover:to-clay-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                View Gallery
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WallPanels;

