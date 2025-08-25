import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Suspense, lazy } from "react";

// Lazy-load below-the-fold sections to reduce initial bundle size
const IntroSection = lazy(() => import("@/components/home/IntroSection"));
const FeaturedProducts = lazy(() => import("@/components/home/FeaturedProducts"));
const WallboardGallerySection = lazy(() => import("@/components/home/WallboardGallerySection"));
const ImageGallery = lazy(() => import("@/components/home/ImageGallery"));
const SmartWallsSection = lazy(() => import("@/components/SmartWallsSection"));
const SolutionsSection = lazy(() => import("@/components/SolutionsSection"));
const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const GalleryViewToggle = lazy(() => import("@/components/GalleryViewToggle"));
const FloatingContact = lazy(() => import("@/components/FloatingContact"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));
const Footer = lazy(() => import("@/components/Footer"));
const ModularSmartWallsSection = lazy(() => import("@/components/ModularSmartWallsSection"));

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

      {/* Below-the-fold sections lazy-loaded */}
      <Suspense fallback={null}>
        {/* Intro Section */}
        <IntroSection />
        {/* Featured Products */}
        <FeaturedProducts />
        <WallboardGallerySection />

        {/* Product Categories Section with Interactive Tabs */}
        {/* <section className="py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
        
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
  
            <CategoryTabs />
          </div>
        </section> */}
        <ModularSmartWallsSection />

        {/* Smart Walls Featured Section */}
        {/* <SmartWallsSection /> */}

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
        <section id="smart-walls">
          <ImageGallery />
        </section>
        <SolutionsSection />
        {/* Interactive Project Gallery */}
        <GalleryViewToggle />

        {/* Client Testimonials */}
        <TestimonialsCarousel />

        {/* Footer */}
        <Footer />

        {/* Floating Contact Widget */}
        <FloatingContact />

        {/* Floating CTA */}
        <FloatingCTA />
      </Suspense>
    </div>
  );
}
