import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import VariantSwitcher from "@/components/VariantSwitcher";
import FeatureHotspots from "@/components/FeatureHotspots";
import { Button } from "@/components/ui/button";
import ModularSmartWallsSection from "@/components/ModularSmartWallsSection";
import SmartWallBenefitsSection from "@/components/SmartWallBenefitsSection";
import SmartWallUseCasesSection from "@/components/SmartWallUseCasesSection";
import SmartWallComparisonSection from "@/components/SmartWallComparisonSection";
import ImageGallerySection from "@/components/ImageGallerySection";
import {
  Tv,
  Flame,
  Lightbulb,
  Volume2,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  CalendarCheck,
  Phone,  
  MoveHorizontal,
  Box,
  PlugZap,
} from "lucide-react";

 
const SmartWalls = () => {
  const [selectedModule, setSelectedModule] = useState("tv");
   useEffect(() => {
    document.title =
      "Smart Media Walls UK - Modular Living Room Wall Systems | The Wall Shop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Premium smart media wall systems with integrated TV, fireplace, lighting, sound and security modules. Modular design, 100+ finishes, quick installation. Transform your living room in the UK.",
      );
    }
  }, []);

  const modules = [
  
    {
      id: "tv",
      name: "Integrated Display",
      icon: Tv,
      description: "Ultra-slim 4K OLED displays seamlessly built into panels",
      features: ["4K OLED Technology", "Ultra-thin Design", "Smart TV Ready"],
      color: "bg-gradient-to-br from-[#b69777] to-[#907252]",
    },
    {
      id: "fireplace",
      name: "Smart Fireplace",
      icon: Flame,
      description: "Electric fireplace with remote temperature control",
      features: ["Instant Control", "Realistic Flames", "Energy Efficient"],
      color: "bg-gradient-to-br from-orange-500 to-orange-300",
    },
    {
      id: "lighting",
      name: "LED Lighting",
      icon: Lightbulb,
      description: "Programmable ambient lighting with 16M colors",
      features: ["16M Colors", "Music Sync", "Smart Control"],
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    },
    {
      id: "audio",
      name: "Hidden Audio",
      icon: Volume2,
      description: "Invisible speakers with spatial sound technology",
      features: ["Spatial Audio", "Wireless", "Hi-Fi Quality"],
      color: "bg-gradient-to-br from-purple-500 to-indigo-500",
    },
    {
      id: "security",
      name: "Security Hub",
      icon: Shield,
      description: "Integrated cameras and access control systems",
      features: ["HD Cameras", "Motion Detection", "Remote Access"],
      color: "bg-gradient-to-br from-rose-400 to-pink-600",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Quick Installation",
      description: "4-hour setup vs 3-5 days traditional",
      stat: "1 Day",
    },
    {
      icon: Zap,
      title: "Smart Integration",
      description: "Works with Alexa, Google, Apple",
      stat: "100%",
    },
    {
      icon: CheckCircle,
      title: "Custom Finishes",
      description: "Choose from premium materials",
      stat: "100+",
    },
    {
      icon: Star,
      title: "Warranty",
      description: "Comprehensive product guarantee",
      stat: "3 Years",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Williams",
      role: "Homeowner, Chelsea",
      content:
        "The smart wall transformed our living room completely. Installation was so quick and clean - no mess, no fuss.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Interior Designer",
      content:
        "My clients love the seamless integration. It's like the technology just disappears into the design.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Navigation />

      {/* Hero Section */}
  <section className="pt-28 pb-20 relative overflow-hidden">
      {/* BG IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0 select-none">
        <img
          src="/images/smart-wall-technology.webp"
          alt="Smart Walls Luxury Living"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
        {/* Black hollow overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 45% 45%, rgba(0,0,0,0.04) 10%, rgba(0,0,0,0.6) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.60) 100%)
            `,
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Text Column */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                ⚡ Revolutionary Smart Wall Technology
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                Smart Media Walls
              </span>
              <span className="block text-white/80">That Transform Spaces</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
              Integrate TV, fireplace, lighting, sound and smart home controls
              into one beautiful, modular wall system. Professional installation in just 4 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="luxury"
                size="lg"
                className="px-8 py-4 text-lg font-medium group bg-gradient-to-br from-[#b69777] to-[#907252] text-white shadow-xl hover:brightness-110 transition"
                onClick={() => alert("Book Free Consultation clicked!")}
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Uncomment below if you want a demo button */}
              {/* <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-[#b69777] px-8 py-4 text-lg font-medium group"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button> */}
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-mocha-950 via-leather-600 to-olive-500 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-3 grid-rows-3 gap-3 h-80">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Tv className="w-8 h-8 text-white" />
                </div>
                <div className="col-span-2 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-xs mb-1">75&quot; OLED</div>
                    <div className="w-16 h-10 bg-blue-900 rounded mx-auto"></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <div className="col-span-2 bg-gradient-to-br from-leather-600 to-olive-500 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-xs">Control Hub</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Optional: uncomment to add floating badge */}
            {/* <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold">
              100+
              <div className="text-xs absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Finishes
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </section>


     
      {/* Smart Walls Benefits Section */}
      <SmartWallBenefitsSection />

       {/* Modular Smart Walls Section */}
      <ModularSmartWallsSection
      />          
      {/* Benefits Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-[#f8f6f3] hover:bg-[#f3ece6] shadow transition-all duration-300 border border-[#ede1d3]"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center shadow">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#b69777] to-[#907252] bg-clip-text text-transparent mb-2">
                    {benefit.stat}
                  </div>
                  <h3 className="text-lg font-semibold text-[#231c14] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#8e7762]">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Smart Walls Use Cases Section */}
      <SmartWallUseCasesSection />

      {/* Smart Wall Comparison Section */}
      <SmartWallComparisonSection />

      {/* Modules Section */}
      <section className="py-20  bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
              Integrated Modules
            </h2>
            <p className="text-xl text-[#231c14] max-w-3xl mx-auto">
              Choose from our range of smart modules to create your perfect entertainment and living space.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Module Selection */}
            <div className="space-y-5">
              {modules.map((module) => {
                const IconComponent = module.icon;
                const isSelected = selectedModule === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className={`w-full p-7 rounded-2xl text-left flex items-center gap-4 border transition-all duration-300
                      ${isSelected
                        ? "bg-white shadow-xl border-[#b69777] scale-105"
                        : "bg-[#f3ece6] border-[#ede1d3] hover:bg-white"
                      }`}
                  >
                    <div className={`w-14 h-14 ${module.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#231c14] mb-1">{module.name}</h3>
                      <p className="text-[#8e7762] mb-2">{module.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {module.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#faf7f3] text-[#b69777] px-2 py-1 rounded font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Module Preview */}
            <div className="bg-white rounded-2xl p-10 shadow-xl border border-[#ede1d3] flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#b69777] to-[#907252] bg-clip-text text-transparent mb-7">
                {modules.find((m) => m.id === selectedModule)?.name}
              </h3>
              <div className="bg-gradient-to-br from-[#b69777] to-[#907252] rounded-xl h-56 w-full flex items-center justify-center mb-7">
                {modules.map((module) => {
                  if (module.id === selectedModule) {
                    const IconComponent = module.icon;
                    return (
                      <div key={module.id} className="text-center text-white">
                        <IconComponent className="w-20 h-20 mx-auto mb-3" />
                        <div className="text-lg font-semibold">{module.name}</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="space-y-2 w-full">
                <h4 className="font-semibold text-[#231c14]">Key Features:</h4>
                <ul className="space-y-2">
                  {modules.find((m) => m.id === selectedModule)?.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[#8e7762]">
                      <CheckCircle className="w-4 h-4 text-[#b69777] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <FeatureHotspots />
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-16 bg-[#f3ece6]">
        <div className="container mx-auto px-4 lg:px-8">
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <VariantSwitcher />
        </div>
      </section>

      <ImageGallerySection/>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-[#f3ece6] via-[#faf7f3] to-[#f8f6f3]">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent text-center mb-14">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-[#ede1d3] rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#b69777] fill-[#b69777]"
                    />
                  ))}
                </div>
                <blockquote className="text-lg text-[#231c14] mb-5 italic">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-bold text-[#231c14]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[#b89773]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
          <section className="relative py-24 bg-gradient-to-br from-[#b69777] to-[#907252] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('/images/smart-wall-cta-bg.webp')] bg-cover bg-center"></div>
      <div className="relative container mx-auto px-6 lg:px-12 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <CalendarCheck className="w-6 h-6 text-white" />
            <span className="uppercase tracking-wide font-medium text-sm">
              Free Consultation
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Ready to Design Your Smart Wall?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Speak with our expert team to plan your dream wall — tailored to your space,
            style, and smart tech needs. No obligations, just smart ideas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#907252] font-semibold rounded-full shadow-lg hover:bg-[#f4efe9] transition"
            >
              Book Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>

            <a
              href="tel:+441417393377"
              className="inline-flex items-center justify-center px-6 py-4 border border-white text-white rounded-full hover:bg-white hover:text-[#907252] transition"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call +44 141 739 3377
            </a>
          </div>
        </div>
      </div>
    </section>

      <Footer />
    </div>
  );
};

export default SmartWalls;