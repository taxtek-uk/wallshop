import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Briefcase, Home, Building, CheckCircle, ArrowRight, Award, Shield, Palette, Clock } from 'lucide-react';

const AcousticPanels = () => {
  const [selectedApp, setSelectedApp] = useState('office');

  useEffect(() => {
    document.title = 'Decorative Acoustic Panels | Soundproof Wall Panels | The Wall Shop';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Premium decorative acoustic panels for superior soundproofing and stunning designs. Ideal for home studios, corporate offices, and commercial environments.'
      );
    }
  }, []);

  const applications = [
    {
      id: 'office',
      name: 'Corporate Offices',
      icon: Briefcase,
      description: 'Meeting rooms, open offices, collaborative spaces.',
    },
    {
      id: 'home',
      name: 'Home Studios',
      icon: Home,
      description: 'Recording studios, media rooms, home theaters.',
    },
    {
      id: 'commercial',
      name: 'Commercial Spaces',
      icon: Building,
      description: 'Restaurants, hotels, retail, public buildings.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

          {/* Hero Section */}
  <section className="pt-28 pb-20 relative overflow-hidden">
  {/* BG IMAGE */}
  <div className="absolute inset-0 w-full h-full z-0">
    <img
      src="/images/acoustic-panels/03.jpg"
      alt="Smart Walls Luxury Living"
      className="w-full h-full object-cover object-center"
      draggable={false}
    />
    {/* Overlay for contrast */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at 45% 45%, rgba(0,0,0,0.04) 10%, rgba(0,0,0,0.7) 100%),
          linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%)
        `
      }}
    />
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 lg:px-12 grid md:grid-cols-2 gap-12 relative z-10 items-center text-white">
    <div>
      <span className="inline-block bg-gray-700 text-white px-4 py-2 rounded-full mb-4">
        🔊 Premium Sound Control
      </span>
      <h1 className="text-5xl font-bold mb-4">
        Decorative Acoustic Panels
      </h1>
      <p className="text-white/90 mb-6">
        Enhance your spaces with state-of-the-art acoustic panels, designed to reduce noise and boost visual appeal.
      </p>
      <Button className="bg-gray-100 hover:bg-white text-black px-8 py-4 font-semibold">
        Request Quote <ArrowRight className="ml-2" />
      </Button>
    </div>
    <img
      src="/images/acoustic-panels/modular-smart-wall.png"
      alt="Acoustic Panel"
      className="rounded-xl shadow-xl w-full max-w-lg mx-auto"
    />
  </div>
</section>


      <section className="py-16 container mx-auto px-4 lg:px-12">
        <h2 className="text-4xl font-bold text-center mb-12">Ideal for Any Environment</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {applications.map((app) => (
            <div
              key={app.id}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                selectedApp === app.id ? 'bg-gray-800 text-white' : 'bg-white'
              }`}
              onClick={() => setSelectedApp(app.id)}
            >
              <app.icon className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{app.name}</h3>
              <p>{app.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
          <img src="/images/acoustic-panels/alphasorb-series-200-polyester-acoustic-panels.jpg" alt="Design Options" className="rounded-xl shadow-xl" />
          <div>
            <h2 className="text-4xl font-bold mb-4">Endless Design Options</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Palette className="w-8 h-8 mr-3" /> Custom Colors and Patterns
              </li>
              <li className="flex items-center">
                <Award className="w-8 h-8 mr-3" /> Premium Quality Materials
              </li>
              <li className="flex items-center">
                <Shield className="w-8 h-8 mr-3" /> Class A Fire Safety
              </li>
              <li className="flex items-center">
                <Clock className="w-8 h-8 mr-3" /> Fast, Professional Installation
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
        <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 font-semibold">
          Schedule Consultation
        </Button>
      </section>

      <Footer />
    </div>
  );
};

export default AcousticPanels;
