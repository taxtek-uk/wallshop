import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Shield, 
  Award, 
  Building2, 
  AlertTriangle, 
  ArrowRight,
  CheckCircle,
  Download,
  Phone,
  Mail,
  Clock,
  FileCheck,
  Ruler,
  Settings,
  Hospital,
  School,
  Factory,
  Users,
  Zap,
  Eye
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ClassAFireproofBoards = () => {
  const [selectedApplication, setSelectedApplication] = useState('healthcare');

  const applications = [
    {
      id: 'healthcare',
      name: 'Healthcare Facilities',
      description: 'Critical fire safety for hospitals and medical centers',
      image: '/images/class-a-fireproof-board-hero.png',
      requirements: ['Class A fire rating mandatory', 'Non-toxic smoke emission', 'Easy decontamination']
    },
    {
      id: 'education',
      name: 'Educational Buildings',
      description: 'Protecting schools and universities with superior fire resistance',
      image: '/images/class-a-fireproof-board-detail.png',
      requirements: ['Student safety compliance', 'Durable high-traffic areas', 'Low maintenance']
    },
    {
      id: 'commercial',
      name: 'Commercial Offices',
      description: 'Professional fire safety for corporate environments',
      image: '/images/class-a-fireproof-board-hero.png',
      requirements: ['Building code compliance', 'Professional aesthetics', 'Insurance requirements']
    },
    {
      id: 'industrial',
      name: 'Industrial Facilities',
      description: 'Heavy-duty fire protection for manufacturing and processing',
      image: '/images/class-a-fireproof-board-detail.png',
      requirements: ['Extreme fire resistance', 'Chemical resistance', 'Impact durability']
    }
  ];

  const specifications = [
    { label: 'Fire Rating', value: 'Class A (Highest)' },
    { label: 'Thickness', value: '6mm / 9mm / 12mm' },
    { label: 'Width', value: '1220mm Standard' },
    { label: 'Length', value: '2440mm / Custom' },
    { label: 'Material', value: 'Mineral Fiber Composite' },
    { label: 'Smoke Index', value: '≤75 (Low Smoke)' },
    { label: 'Flame Spread', value: '≤25 (Class A)' },
    { label: 'Warranty', value: '20 Years Fire Performance' }
  ];

  const features = [
    {
      icon: Flame,
      title: 'Class A Fire Rating',
      description: 'Highest level of fire resistance with flame spread index ≤25 and smoke development ≤450.',
      benefit: 'Maximum fire safety protection'
    },
    {
      icon: Shield,
      title: 'Non-Combustible Core',
      description: 'Mineral fiber core construction prevents ignition and stops fire spread effectively.',
      benefit: 'Superior fire barrier performance'
    },
    {
      icon: Eye,
      title: 'Low Smoke Emission',
      description: 'Minimal smoke production during fire exposure maintains visibility for safe evacuation.',
      benefit: 'Enhanced life safety protection'
    },
    {
      icon: FileCheck,
      title: 'Code Compliance',
      description: 'Meets and exceeds all major building codes and fire safety regulations worldwide.',
      benefit: 'Guaranteed regulatory approval'
    },
    {
      icon: Users,
      title: 'Non-Toxic Properties',
      description: 'Zero toxic gas emission during fire exposure ensures occupant safety and health.',
      benefit: 'Safe for all occupancy types'
    },
    {
      icon: Zap,
      title: 'Electrical Safety',
      description: 'Non-conductive properties provide additional electrical fire safety protection.',
      benefit: 'Multi-hazard protection'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Fire Safety Assessment',
      description: 'Comprehensive evaluation of fire safety requirements and building code compliance.',
      time: '1-2 hours'
    },
    {
      step: 2,
      title: 'Substrate Preparation',
      description: 'Prepare fire-rated substrate and install fire-stopping materials as required.',
      time: '2-3 hours'
    },
    {
      step: 3,
      title: 'Panel Installation',
      description: 'Install fireproof boards with fire-rated adhesives and mechanical fasteners.',
      time: '4-6 hours'
    },
    {
      step: 4,
      title: 'Fire Safety Inspection',
      description: 'Complete fire safety inspection and documentation for code compliance.',
      time: '1 hour'
    }
  ];

  const certifications = [
    {
      name: 'ASTM E84',
      description: 'Standard Test Method for Surface Burning Characteristics',
      status: 'Class A Certified'
    },
    {
      name: 'UL 723',
      description: 'Standard for Test for Surface Burning Characteristics',
      status: 'Listed Product'
    },
    {
      name: 'NFPA 286',
      description: 'Standard Methods of Fire Tests for Evaluating Contribution',
      status: 'Compliant'
    },
    {
      name: 'EN 13501-1',
      description: 'European Fire Classification Standard',
      status: 'A2-s1,d0 Rating'
    }
  ];

  const benefits = [
    'Highest Class A fire rating for maximum protection',
    'Non-combustible mineral fiber core construction',
    'Low smoke emission for safe evacuation',
    'Zero toxic gas emission during fire exposure',
    'Meets all major building codes and standards',
    'Non-conductive for electrical fire safety',
    'Suitable for all occupancy classifications',
    'Professional installation with fire safety documentation'
  ];

  const firePerformanceData = [
    {
      test: 'Flame Spread Index',
      standard: 'ASTM E84',
      result: '≤25',
      classification: 'Class A'
    },
    {
      test: 'Smoke Development',
      standard: 'ASTM E84',
      result: '≤450',
      classification: 'Class A'
    },
    {
      test: 'Heat Release Rate',
      standard: 'NFPA 286',
      result: '≤300 kW',
      classification: 'Compliant'
    },
    {
      test: 'Total Heat Release',
      standard: 'NFPA 286',
      result: '≤15 MJ',
      classification: 'Compliant'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-red-900 via-orange-800 to-red-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20"></div>
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
                <span className="text-white">Class A Fireproof Boards</span>
              </nav>
              
              <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Maximum Fire Safety
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Class A Fireproof Boards
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Ultimate fire protection with Class A rating. Non-combustible mineral fiber construction 
                provides maximum fire resistance for critical safety applications.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £75/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Class A Rated</Badge>
                <Badge className="bg-white/20 text-white border-white/30">20 Year Warranty</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-orange-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Fire Safety Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Fire Test Reports
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
                    src="/images/class-a-fireproof-board-hero.png"
                    alt="Class A Fireproof Boards"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Flame className="w-6 h-6 text-red-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Class A Rating</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Shield className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Non-Combustible</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Eye className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Low Smoke</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <FileCheck className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Code Compliant</p>
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
              <TabsTrigger value="features">Fire Safety</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Maximum Fire Protection</h2>
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

              {/* Fire Performance Data */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Fire Performance Test Results</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-red-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Test Parameter</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Standard</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Result</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Classification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {firePerformanceData.map((data, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-mocha-900">{data.test}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-mocha-700">{data.standard}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-mocha-700">{data.result}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {data.classification}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Fire Safety Certifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {certifications.map((cert, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-taupe-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-mocha-900">{cert.name}</h4>
                        <Badge className="bg-green-100 text-green-800">{cert.status}</Badge>
                      </div>
                      <p className="text-mocha-700 text-sm">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Critical Fire Safety Applications</h2>
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
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={app.image}
                          alt={app.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-mocha-900 mb-2">{app.name}</h3>
                      <p className="text-mocha-700 mb-4">{app.description}</p>
                      
                      {selectedApplication === app.id && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-mocha-900">Key Requirements:</h4>
                          {app.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                              <span className="text-sm text-mocha-700">{req}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Fire-Safe Installation Process</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {installationSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="text-center p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                      <p className="text-sm text-mocha-700 leading-relaxed mb-3">{step.description}</p>
                      <div className="text-xs text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full">
                        {step.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 p-8 bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl">
                  <h3 className="text-2xl font-bold text-mocha-900 mb-4">Certified Fire Safety Installation</h3>
                  <p className="text-mocha-700 mb-6 leading-relaxed">
                    Our fire safety certified installers ensure complete compliance with all fire codes and regulations. 
                    Every installation includes comprehensive documentation and fire safety certification.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-mocha-700">Full installation: 6-8 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-mocha-700">Fire safety certified installers</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileCheck className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-mocha-700">Complete compliance documentation</span>
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Fire Safety Features</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Mineral Fiber Core</h4>
                      <p className="text-sm text-mocha-700">Non-combustible mineral fiber construction prevents ignition and fire spread</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Low Smoke Emission</h4>
                      <p className="text-sm text-mocha-700">Minimal smoke production maintains visibility during emergency evacuation</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Zero Toxic Gases</h4>
                      <p className="text-sm text-mocha-700">No toxic gas emission during fire exposure ensures occupant safety</p>
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
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              Critical Safety Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              Class A Fireproof Boards are essential for buildings where maximum fire safety is required by code or critical for occupant protection.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { icon: Hospital, title: 'Healthcare', desc: 'Hospitals, clinics, medical facilities' },
              { icon: School, title: 'Education', desc: 'Schools, universities, training centers' },
              { icon: Building2, title: 'Commercial', desc: 'Offices, retail, public buildings' },
              { icon: Factory, title: 'Industrial', desc: 'Manufacturing, processing facilities' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{item.title}</h3>
                <p className="text-mocha-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-900 via-orange-800 to-red-800">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Protect What Matters Most
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Don't compromise on fire safety. Choose Class A Fireproof Boards for maximum protection 
              and complete peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-orange-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Fire Safety Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Request Fire Test Reports
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClassAFireproofBoards;

