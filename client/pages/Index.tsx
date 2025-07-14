import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CategoryTabs from "@/components/CategoryTabs";
import SmartWallsSection from "@/components/SmartWallsSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import VariantSwitcher from "@/components/VariantSwitcher";
import FeatureHotspots from "@/components/FeatureHotspots";
import SolutionsSection from "@/components/SolutionsSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import GalleryViewToggle from "@/components/GalleryViewToggle";
import FloatingContact from "@/components/FloatingContact";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Product Categories Section with Interactive Tabs */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text-platinum">Premium Wall</span>
              <span className="block gradient-text-gold">Collections</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Discover our curated selection of luxury wall coverings, each
              crafted to perfection with the finest materials and attention to
              detail.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <CategoryTabs />
        </div>
      </section>

      {/* Smart Walls Featured Section */}
      <SmartWallsSection />

      {/* Before/After Comparison */}
      {/* <section className="py-24 lg:py-32 bg-luxgray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <BeforeAfterSlider />
        </div>
      </section> */}

      {/* Interactive Feature Demonstration */}
      {/* <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <FeatureHotspots />
        </div>
      </section> */}

      {/* Smart Wall Customization */}
      {/* <section className="py-24 lg:py-32 bg-gradient-to-b from-luxgray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <VariantSwitcher />
        </div>
      </section> */}

      {/* Why Choose Us Section */}
      {/* <section className="py-24 lg:py-32 bg-luxgray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text-luxury">
                Why Choose The Wall Shop
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just suppliers – we're your partners in creating
              extraordinary spaces that reflect your vision and exceed your
              expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Materials",
                description:
                  "Only the finest materials sourced from trusted suppliers worldwide, ensuring lasting beauty and durability.",
                icon: "🏆",
              },
              {
                title: "Expert Installation",
                description:
                  "Certified installers with decades of experience ensure perfect results every time.",
                icon: "👨‍🔧",
              },
              {
                title: "Custom Design",
                description:
                  "Work with our design team to create unique solutions tailored to your space and style.",
                icon: "🎨",
              },
              {
                title: "Lifetime Warranty",
                description:
                  "We stand behind our products with comprehensive warranties and ongoing support.",
                icon: "🛡️",
              },
              {
                title: "Smart Technology",
                description:
                  "Industry-leading smart wall systems that integrate seamlessly with your lifestyle.",
                icon: "💡",
              },
              {
                title: "Sustainable Choice",
                description:
                  "Eco-friendly materials and processes that minimize environmental impact.",
                icon: "🌱",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <SolutionsSection />
      {/* Interactive Project Gallery */}
      <GalleryViewToggle />

      {/* Client Testimonials */}
      <TestimonialsCarousel />

      {/* Final CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-700 via-gray-900 to-black shadow-inner shadow-black/40 text-white">
  <div className="container mx-auto px-4 lg:px-8 text-center">
    <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
      <span className="gradient-text-gold">Ready to Transform</span>
      <span className="block gradient-text-platinum">Your Space?</span>
    </h2>
    <p className="text-xl lg:text-2xl text-luxgray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
      Let our design experts help you create the perfect wall solution.
      Book your free consultation today and discover the possibilities.
    </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
      {/* Bronze/Leather Button */}
      <Button
        onClick={() => scrollToSection("#contact")}
        variant="ghost"
        className="relative px-10 py-5 text-lg font-semibold group text-white rounded-lg overflow-hidden bg-gradient-to-br from-[#b69777] via-[#b89773] to-[#907252] shadow-md hover:shadow-lg transition-all duration-300"
      >
        <span className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity" />
        <span className="absolute inset-0 top-0 h-1/2 bg-white/10 rounded-t-lg pointer-events-none" />
        <span className="relative z-10">Book Free Consultation</span>
      </Button>

      {/* Light Marble Button */}
      <a href="tel:+441417393377" className="focus:outline-none">
        <Button
          variant="ghost"
          className="relative px-10 py-5 text-lg font-semibold group text-gray-900 rounded-lg overflow-hidden bg-[#f5f5f5] shadow-md hover:shadow-xl transition-all duration-300 border border-gray-300"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-300 opacity-30 rounded-lg pointer-events-none" />
          <span className="absolute inset-0 top-0 h-1/2 bg-white/30 rounded-t-lg pointer-events-none" />
          <span className="relative z-10">Call Now: +44 141 739 3377</span>
        </Button>
      </a>
    </div>

    {/* Company Contact & Address */}
    
  </div>
</section>


      {/* Footer */}
      <Footer />

      {/* Floating Contact Widget */}
      <FloatingContact />

      {/* Floating CTA */}
      <FloatingCTA />
    </div>
  );
}
