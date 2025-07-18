import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import PanelGallery from "@/components/PanelGallery";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Sparkles,
  Flame,
  Hammer,
  Globe,
  Ruler,
  Building,
  Home,
  Layers,
  Zap,
  ArrowRight,
  MessagesSquare,
  Users,
  Warehouse,
  ChevronRight,
} from "lucide-react";

// AI Chatbot widget (basic floating bubble, triggers chat on click)
const AIChatWidget = () => (
  <>
    <div
      id="ai-chat-widget"
      className="fixed bottom-7 right-7 z-50"
      style={{ width: 74, height: 74 }}
    >
      <button
        className="w-full h-full rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] shadow-2xl flex flex-col items-center justify-center animate-bounce-slow hover:scale-105 transition"
        title="Ask AI"
        onClick={() => {
          // Replace this with your AI chat open logic
          alert("Launching The Wall Shop AI Chat Assistant...");
        }}
      >
        <Sparkles className="w-8 h-8 text-white mb-1" />
        <span className="text-xs font-bold text-white">Ask AI</span>
      </button>
    </div>
    <style>{`
      @keyframes bounce-slow {0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
      .animate-bounce-slow {animation:bounce-slow 2s infinite;}
    `}</style>
  </>
);

const CarbonRockBoards = () => {
  // --- SEO and Schema ---
  useEffect(() => {
    document.title =
      "Carbon Rock Boards - Next-Gen Wall Panels | Fireproof, Durable, Acoustic | The Wall Shop UK";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover Carbon Rock Boards: advanced wall panels engineered for safety, soundproofing, and style. Fire-resistant, ultra-strong, and perfect for homes, offices, and commercial projects. The Wall Shop UK."
      );
    }
    // Inject JSON-LD schema (AI-SEO)
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Carbon Rock Board",
      "image": [
        "/images/carbon-rock-boards/01.webp",
        "/images/carbon-rock-boards/02.webp"
      ],
      "description":
        "Carbon Rock Boards are next-generation wall panels engineered for fire safety, acoustic performance, and modern design. Ideal for residential, office, hotel, and public spaces.",
      "brand": { "@type": "Brand", "name": "The Wall Shop" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "130"
      },
      "sku": "CRB-2025"
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // --- Features, Applications, Process Data ---
  const features = [
    {
      icon: Shield,
      title: "Fireproof & Safe",
      description: "Certified A1 fire rating. Ultimate fire resistance for residential & commercial safety.",
    },
    {
      icon: Flame,
      title: "Thermal & Acoustic",
      description: "Reduces heat transfer and blocks sound. Ideal for quiet, comfortable interiors.",
    },
    {
      icon: Hammer,
      title: "Ultra Durable",
      description: "Impact, scratch, and moisture resistant. Perfect for high-traffic zones.",
    },
    {
      icon: Sparkles,
      title: "Modern Finish",
      description: "Sleek, natural stone look. Available in custom sizes & textures.",
    },
  ];

  const applications = [
    {
      icon: Home,
      title: "Luxury Homes",
      description: "Safe and stylish for living rooms, bedrooms, kitchens, and feature walls.",
    },
    {
      icon: Building,
      title: "Offices & Workspaces",
      description: "Soundproof and fire-rated for productive, modern work environments.",
    },
    {
      icon: Warehouse,
      title: "Hotels & Hospitality",
      description: "Elegant lobbies, corridors, and guest rooms with lasting protection.",
    },
    {
      icon: Globe,
      title: "Public & Retail",
      description: "Shopping malls, airports, schools, and more – wherever safety and design matter.",
    },
  ];

  const processSteps = [
    {
      icon: Users,
      title: "Consultation",
      desc: "Share your project needs. Get expert advice and samples.",
    },
    {
      icon: Ruler,
      title: "Precision Measurement",
      desc: "Our team ensures a perfect fit on-site or via your drawings.",
    },
    {
      icon: Layers,
      title: "Custom Production",
      desc: "Panels cut to your size & spec. Choice of textures and edge profiles.",
    },
    {
      icon: Zap,
      title: "Delivery & Install",
      desc: "Fast, safe UK-wide shipping and certified installation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">
      <Navigation />

      {/* Hero */}
<section
  className="pt-24 pb-16 relative"
  style={{
    backgroundImage: "url('/images/carbon-rock-boards/hero-img.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/60" />
  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        <span className="inline-block bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-4 py-2 rounded-full text-sm font-semibold shadow mb-6">
          🔥 Carbon Rock Boards
        </span>
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow">
          Next-Gen Decorative Wall Panels
        </h1>
        <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
          Stone | Wood | WPC | Mirror | Fluted | Acoustic
          <br />
          Reinvent your space with advanced stone, wood, WPC, and fabric finishes that blend safety and style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-semibold shadow bg-gradient-to-br from-[#b69777] to-[#907252] text-white"
          >
            Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-[#b69777] px-8 py-4 text-lg font-bold"
          >
            Request Free Sample
          </Button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative">
        <img
          src="/images/carbon-rock-boards/wpc.jpg"
          alt="Decorative Wall Panel Sample"
          className="rounded-2xl shadow-2xl w-full max-w-md mx-auto border-4 border-white"
          draggable={false}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            Premium Finish
          </span>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Features Section – Why Choose Carbon Rock Boards */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
        Why Choose Carbon Rock Boards?
      </h2>
      <p className="text-xl text-[#6b5c47] mt-4 max-w-2xl mx-auto">
        Engineered for performance. Designed for impact. Our panels combine fire resistance, sound insulation, and durable luxury for every space.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: Shield,
          title: "A1 Fire-Rated",
          description: "Certified fireproof technology for unbeatable protection in residential and commercial applications.",
        },
        {
          icon: Flame,
          title: "Thermal & Acoustic",
          description: "Excellent heat insulation and sound absorption for comfortable, quiet interiors.",
        },
        {
          icon: Hammer,
          title: "Ultra Durable",
          description: "Scratch-resistant, impact-proof, and moisture-tolerant—perfect for high-traffic zones.",
        },
        {
          icon: Sparkles,
          title: "Designer Finishes",
          description: "Choose from realistic wood, natural stone, metallics, and more to match any aesthetic.",
        },
      ].map((f, idx) => {
        const Icon = f.icon;
        return (
          <div
            key={idx}
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#f9f7f5] via-[#fcf9f5] to-[#ece2d2] shadow hover:scale-105 transition-all duration-300 border border-[#e2d5c4]"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-4 shadow-md">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#231c14] mb-1">{f.title}</h3>
            <p className="text-[#907252]">{f.description}</p>
          </div>
        );
      })}
    </div>
  </div>
</section>


      {/* Explore Our Panel Series – Visual Gallery */}
 

      <PanelGallery />

      {/* Application Scenarios */}
      <section className="py-16 bg-[#faf7f3]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
              Perfect Applications
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto">
              Carbon Rock Boards bring beauty and peace of mind to every space—where protection and design matter most.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((a, idx) => {
              const Icon = a.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white shadow hover:shadow-2xl transition-all duration-300 flex flex-col items-center border border-[#ece2d2]"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg text-[#231c14] mb-2">{a.title}</h4>
                  <p className="text-[#6b5c47] text-center">{a.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent text-center mb-14">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#b69777] to-[#907252] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow">
                    {i + 1}
                  </div>
                  <Icon className="w-8 h-8 text-[#b69777] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#231c14] mb-2">{step.title}</h3>
                  <p className="text-[#6b5c47]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-lg">
            Get a Quote or Free Sample
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            See the difference for yourself. Discover why architects and designers across the UK choose Carbon Rock Boards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#b69777] hover:bg-[#faf7f3] px-8 py-4 text-lg font-bold shadow"
            >
              Request Free Samples
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[#b69777] px-8 py-4 text-lg font-bold"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <AIChatWidget />

      {/* Soft fade animation */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.35,.8,.44,1) both; }
      `}</style>
    </div>
  );
};

export default CarbonRockBoards;
