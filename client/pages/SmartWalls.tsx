import { useEffect } from "react";
import WallGallery from "@/components/WallGallery";
import SmartWallInstallation from "@/components/SmartWallInstallation";
import SmartWallInquiryForm from "@/components/SmartWallInquiryForm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Lightbulb,
  Film,
  ThermometerSun,
  ShieldCheck,
  Volume2,
  Layers,
  Users,
  Zap,
  Ruler,
  ArrowRight,
  Home,
  Building,
  Warehouse,
  Globe,
} from "lucide-react";
import ModularSmartWallsSection from "@/components/ModularSmartWallsSection";

const SmartWalls = () => {
  useEffect(() => {
    document.title =
      "Smart Walls - Integrated Automation Panels | The Wall Shop UK";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Discover smart walls with built-in automation, AV, climate, lighting, and security features. Control everything from one sleek surface. Future-ready living by The Wall Shop UK."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Smart Wall Panels",
      description:
        "Luxury smart walls with integrated automation – lighting, sound, climate, security – controlled via voice, app, or touchscreen.",
      brand: { "@type": "Brand", name: "The Wall Shop" },
      image: ["/images/smart-walls/hero.jpg"],
      sku: "SW-2025",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "200",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock",
      },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: "Intelligent Lighting",
      description:
        "Create ambient scenes and control all lights with voice, app, or automated schedules.",
    },
    {
      icon: Film,
      title: "Integrated AV",
      description:
        "Seamlessly control home cinemas, TVs, speakers, and multi-room media from one surface.",
    },
    {
      icon: ThermometerSun,
      title: "Smart Climate",
      description:
        "Zone-based heating & cooling with geolocation, sensors, and app control.",
    },
    {
      icon: ShieldCheck,
      title: "Security & CCTV",
      description:
        "Invisible protection with cameras, sensors, alarms, and remote access built into walls.",
    },
  ];

  const applications = [
    { icon: Home, title: "Modern Homes", description: "Smart living reimagined." },
    {
      icon: Building,
      title: "Corporate Offices",
      description: "Automated lighting, AV, and security in boardrooms and suites.",
    },
    {
      icon: Warehouse,
      title: "Hospitality Spaces",
      description: "Enhance ambience and efficiency in hotels and restaurants.",
    },
    {
      icon: Globe,
      title: "Public Areas",
      description: "Future-ready infrastructure for malls, airports and lounges.",
    },
  ];

  const process = [
    {
      icon: Users,
      title: "Consult",
      desc: "Share your vision. We plan it with you and provide smart demos.",
    },
    {
      icon: Ruler,
      title: "Design & Measure",
      desc: "CAD-based planning to fit exact wall specs and room layouts.",
    },
    {
      icon: Layers,
      title: "Build & Program",
      desc: "Bespoke production of modules with hidden cabling & smart logic.",
    },
    {
      icon: Zap,
      title: "Install & Support",
      desc: "Clean, certified installation with remote support & updates.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">
      <Navigation />

      {/* Hero */}
      <section
        className="pt-24 pb-16 relative"
        style={{
          backgroundImage: "url('/images/smart-wall-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-4 py-2 rounded-full text-sm font-semibold shadow mb-6">
                ⚙️ Smart Wall Systems
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white drop-shadow mb-6 leading-tight">
                The Future of Living is Built In
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Discover walls that think – control lighting, temperature, music,
                security, and ambiance with one integrated system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#inquiry">
                <Button className="bg-white text-[#b69777] hover:bg-[#f8f6f3] font-bold px-8 py-4 text-lg shadow">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                </a>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#b69777] px-8 py-4 text-lg font-bold"
                >
                  Request Demo
                </Button>
              </div>
            </div>
            <div>
              <img
                src="/images/smart-walls/smart-wall-pro.jpg"
                className="rounded-2xl shadow-2xl border-4 border-white max-w-md mx-auto"
                alt="Smart Wall Display"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
              What Makes Our Smart Walls Brilliant?
            </h2>
            <p className="text-xl text-[#6b5c47] mt-4 max-w-2xl mx-auto">
              A blend of beauty, brains, and bold innovation – experience automation
              that enhances architecture.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl bg-[#faf7f3] shadow hover:scale-105 transition-all border border-[#e2d5c4]"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#231c14]">{title}</h3>
                <p className="text-[#6b5c47] mt-2">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <ModularSmartWallsSection />
      </section>
      {/* Smart Wall Installation */}
      <SmartWallInstallation />
      {/* Applications */}
      <section className="py-16 bg-[#faf7f3]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
            Where Smart Walls Belong
          </h2>
          <p className="text-xl text-[#6b5c47] mb-12 max-w-3xl mx-auto">
            Designed for homes, tailored for offices, and built for the future.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map(({ icon: Icon, title, description }, i) => (
              <div
                key={i}
                className="p-8 bg-white border border-[#ece2d2] rounded-2xl shadow hover:shadow-xl text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white w-7 h-7" />
                </div>
                <h4 className="font-semibold text-lg text-[#231c14]">{title}</h4>
                <p className="text-[#6b5c47] mt-1">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <WallGallery/>
      </section>

      {/* Process */}
      

      {/* CTA */}
    <section id="inquiry"
        className="py-20 relative"
        style={{
          backgroundImage: "url('/images/smart-walls/inquiry-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Bright Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

        {/* Content */}
        <div className="relative z-10 px-4">
          <SmartWallInquiryForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartWalls;
