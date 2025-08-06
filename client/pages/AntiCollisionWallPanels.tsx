import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Award, 
  Wrench, 
  Building, 
  ArrowRight,
  CheckCircle,
  Download,
  Phone,
  Mail,
  AlertTriangle,
  Users,
  Clock,
  Stethoscope,
  GraduationCap,
  ShoppingCart,
  Car
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AntiCollisionWallPanels = () => {
  const [selectedApplication, setSelectedApplication] = useState('healthcare');

  const applications = [
    {
      id: 'healthcare',
      name: 'Healthcare Facilities',
      icon: Stethoscope,
      description: 'Hospitals, clinics, and medical centers requiring maximum protection',
      features: ['Antimicrobial surface', 'Easy sanitization', 'Impact resistance', 'Chemical resistance']
    },
    {
      id: 'education',
      name: 'Educational Institutions',
      icon: GraduationCap,
      description: 'Schools, universities, and training facilities with high foot traffic',
      features: ['Vandal resistance', 'Easy maintenance', 'Durable finish', 'Safety compliance']
    },
    {
      id: 'retail',
      name: 'Retail & Commercial',
      icon: ShoppingCart,
      description: 'Shopping centers, warehouses, and commercial buildings',
      features: ['Heavy-duty protection', 'Professional appearance', 'Cost-effective', 'Long-term durability']
    },
    {
      id: 'transport',
      name: 'Transportation Hubs',
      icon: Car,
      description: 'Airports, train stations, and public transportation facilities',
      features: ['High-impact resistance', 'Weather resistance', 'Fire safety', 'Low maintenance']
    }
  ];

  const specifications = [
    { label: 'Thickness', value: '8mm / 12mm' },
    { label: 'Width', value: '1220mm' },
    { label: 'Length', value: '2440mm / Custom' },
    { label: 'Material', value: 'Reinforced WPC Composite' },
    { label: 'Impact Rating', value: 'Class 1 Heavy Duty' },
    { label: 'Fire Rating', value: 'Class A Fireproof' },
    { label: 'Installation', value: 'Mechanical Fixing System' },
    { label: 'Warranty', value: '20 Years Commercial' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Maximum Impact Protection',
      description: 'Engineered to withstand heavy impacts from trolleys, wheelchairs, and equipment without damage.',
      benefit: 'Reduces maintenance costs and extends wall life'
    },
    {
      icon: Zap,
      title: 'Reinforced Core Structure',
      description: 'Advanced composite construction with reinforced core for superior strength and durability.',
      benefit: 'Exceptional performance in demanding environments'
    },
    {
      icon: Building,
      title: 'Commercial Grade Quality',
      description: 'Meets stringent commercial building standards with certified performance ratings.',
      benefit: 'Compliance with building codes and regulations'
    },
    {
      icon: Award,
      title: 'Antimicrobial Surface',
      description: 'Integrated antimicrobial technology prevents bacterial growth and maintains hygiene.',
      benefit: 'Ideal for healthcare and food service environments'
    },
    {
      icon: Wrench,
      title: 'Easy Maintenance',
      description: 'Non-porous surface resists stains and allows for easy cleaning with standard products.',
      benefit: 'Reduces ongoing maintenance time and costs'
    },
    {
      icon: Users,
      title: 'Safety Certified',
      description: 'Comprehensive safety testing including fire resistance and low VOC emissions.',
      benefit: 'Safe for occupied spaces and sensitive environments'
    }
  ];

  const protectionLevels = [
    {
      level: 'Standard Protection',
      thickness: '8mm',
      applications: ['Office corridors', 'Retail spaces', 'Light commercial'],
      impactRating: 'Medium duty',
      price: 'From £65/m²'
    },
    {
      level: 'Heavy Duty Protection',
      thickness: '12mm',
      applications: ['Hospitals', 'Schools', 'Industrial facilities'],
      impactRating: 'Heavy duty',
      price: 'From £85/m²'
    },
    {
      level: 'Maximum Protection',
      thickness: '15mm',
      applications: ['Loading docks', 'Warehouses', 'High-traffic areas'],
      impactRating: 'Extreme duty',
      price: 'From £105/m²'
    }
  ];

  const installationBenefits = [
    'Rapid installation reduces downtime',
    'No special tools required for mounting',
    'Modular system allows for easy replacement',
    'Compatible with existing wall structures',
    'Professional installation team available',
    'Minimal disruption to operations',
    'Quality assurance and testing included',
    'Comprehensive project management'
  ];

  const performanceData = [
    { metric: 'Impact Resistance', value: '40 Joules', standard: 'BS EN 14904' },
    { metric: 'Fire Rating', value: 'Class A', standard: 'BS 476-7' },
    { metric: 'Slip Resistance', value: 'R10', standard: 'DIN 51130' },
    { metric: 'Chemical Resistance', value: 'Class 3', standard: 'EN 12720' },
    { metric: 'Abrasion Resistance', value: 'AC4', standard: 'EN 13329' },
    { metric: 'Thermal Stability', value: '-20°C to +60°C', standard: 'EN 1264' }
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
                <span className="text-white">Anti-collision Wall Panels</span>
              </nav>
              
              <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Heavy Duty Protection
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Anti-collision Wall Panels
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Ultimate protection for high-traffic areas. Our anti-collision panels provide superior impact resistance, 
                durability, and safety for commercial, healthcare, and industrial environments.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £65/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">20 Year Warranty</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Class A Fire Rating</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-orange-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Get Protection Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Technical Data
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
                    src="/client/images/anti-collision-wall-panel.png"
                    alt="Anti-collision Wall Panels in Hospital Corridor"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Shield className="w-6 h-6 text-red-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Impact Resistant</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Safety Certified</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Building className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Commercial Grade</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Award className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">20 Year Warranty</p>
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
              <TabsTrigger value="protection">Protection Levels</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Advanced Protection Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-red-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                      <div className="text-xs text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full">
                        {feature.benefit}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Installation Benefits */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Installation & Maintenance Benefits</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {installationBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-mocha-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="protection" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Choose Your Protection Level</h2>
                <div className="grid lg:grid-cols-3 gap-8">
                  {protectionLevels.map((level, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="bg-white border-2 border-taupe-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-mocha-900 mb-2">{level.level}</h3>
                        <div className="text-3xl font-extrabold text-red-600 mb-2">{level.thickness}</div>
                        <Badge className="bg-red-100 text-red-700">{level.impactRating}</Badge>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-mocha-900">Ideal for:</h4>
                        {level.applications.map((app, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <span className="text-sm text-mocha-700">{app}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-mocha-900 mb-4">{level.price}</div>
                        <Button className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-orange-600 hover:to-red-500">
                          Select This Level
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Industry Applications</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {applications.map((app) => (
                    <motion.div
                      key={app.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedApplication === app.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-taupe-200 bg-white hover:border-red-300'
                      }`}
                      onClick={() => setSelectedApplication(app.id)}
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center mr-4">
                          <app.icon className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-mocha-900">{app.name}</h3>
                      </div>
                      <p className="text-mocha-700 mb-4 leading-relaxed">{app.description}</p>
                      <div className="space-y-2">
                        {app.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <span className="text-sm text-mocha-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      {selectedApplication === app.id && (
                        <div className="mt-4 flex items-center text-red-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Selected Application</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-8">
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Performance Standards</h3>
                  <div className="space-y-4">
                    {performanceData.map((data, i) => (
                      <div key={i} className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-mocha-900">{data.metric}</h4>
                          <span className="text-red-600 font-bold">{data.value}</span>
                        </div>
                        <p className="text-xs text-mocha-600">Tested to {data.standard}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
              Protect Your Investment
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Don't let wall damage cost you thousands in repairs. Invest in anti-collision protection 
              that pays for itself through reduced maintenance and extended wall life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-orange-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Get Protection Quote
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

export default AntiCollisionWallPanels;

