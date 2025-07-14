import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// Bronze/Gold palette (sampled from your gradient):
const GRADIENT_FROM = "#b69777";
const GRADIENT_VIA = "#b89773";
const GRADIENT_TO = "#907252";
const TEXT_DARK = "#231c14";
const BG_OFFWHITE = "bg-gradient-to-br from-[#fafbfc] via-[#f5f6f7] to-[#f8f8f8]";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  project: string;
  image: string;
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Mitchell",
      role: "Interior Designer",
      company: "Mitchell Design Studio",
      content:
        "The Wall Shop's smart wall system completely transformed our client's living space. The seamless integration of technology with luxury finishes exceeded all expectations. Installation was flawless and the result is simply stunning.",
      rating: 5,
      project: "Modern Penthouse Smart Wall",
      image: "SM",
    },
    {
      id: "2",
      name: "David Chen",
      role: "Homeowner",
      company: "Private Residence",
      content:
        "We wanted a media wall that would be the centerpiece of our home. The Wall Shop delivered beyond our wildest dreams. The copper finish smart wall with integrated fireplace and sound system is absolutely incredible.",
      rating: 5,
      project: "Luxury Home Media Center",
      image: "DC",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      role: "Architect",
      company: "Rodriguez & Associates",
      content:
        "Professional service, premium materials, and flawless execution. The acoustic panels not only solved our sound issues but became a stunning design feature. Highly recommend for any luxury project.",
      rating: 5,
      project: "Corporate Office Acoustic Solution",
      image: "ER",
    },
    {
      id: "4",
      name: "Michael Thompson",
      role: "General Contractor",
      company: "Thompson Construction",
      content:
        "I've worked with many wall system providers, but The Wall Shop stands apart. Their carbon rock boards are incredibly durable yet easy to work with. The technical support during installation was exceptional.",
      rating: 5,
      project: "High-End Restaurant Renovation",
      image: "MT",
    },
    {
      id: "5",
      name: "Lisa Park",
      role: "Homeowner",
      company: "Private Residence",
      content:
        "The luxury wallpaper collection is extraordinary. The silk textures and metallic accents created exactly the ambiance we wanted. The team's attention to detail and customer service is unmatched.",
      rating: 5,
      project: "Master Bedroom Wallpaper Installation",
      image: "LP",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`py-16 lg:py-24 ${BG_OFFWHITE}`}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2
            className="text-4xl lg:text-5xl font-extrabold mb-5 leading-tight bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent drop-shadow-lg"
            style={{ letterSpacing: "0.01em" }}
          >
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-[#695c4c] max-w-2xl mx-auto">
            Trusted by interior designers, architects, and homeowners for premium wall solutions.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-2 border-[#b89773] rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-[#b69777]">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-[#b89773]/30 pointer-events-none z-0 animate-fadeInSlow">
              <Quote className="w-16 h-16 drop-shadow-xl" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center justify-center mb-5">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6"
                    style={{
                      color: GRADIENT_FROM,
                      fill: GRADIENT_FROM,
                      filter: "drop-shadow(0 2px 6px #b6977740)"
                    }}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl lg:text-2xl text-[#3b3127] text-center font-medium leading-relaxed mb-8">
                “{currentTestimonial.content}”
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                {/* Avatar */}
                <div
                  className="w-16 h-16 bg-gradient-to-tr from-[#b69777] to-[#907252] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border-4 border-[#f2e5d3]"
                  style={{
                    boxShadow: "0 2px 8px 0 #b6977730"
                  }}
                >
                  {currentTestimonial.image}
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-[#231c14] text-lg">{currentTestimonial.name}</h4>
                  <p className="font-semibold text-[#b89773]">{currentTestimonial.role}</p>
                  <p className="text-sm text-[#a59685]">{currentTestimonial.company}</p>
                </div>
              </div>

              {/* Project Tag */}
              <div className="text-center mt-5">
                <span className="inline-block bg-gradient-to-r from-[#f3ece6] to-[#ede1d3] text-[#b89773] px-4 py-2 rounded-full text-sm font-semibold shadow">
                  {currentTestimonial.project}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="w-12 h-12 bg-[#f5f0e9] hover:bg-gradient-to-tr hover:from-[#b69777] hover:to-[#907252] hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow group"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-gradient-to-br from-[#b69777] to-[#907252] scale-125 shadow"
                      : "bg-[#f2e5d3] hover:bg-[#b69777]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            {/* Next Button */}
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-[#f5f0e9] hover:bg-gradient-to-tr hover:from-[#b69777] hover:to-[#907252] hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow group"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Auto-play Indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-[#b89773] hover:text-[#907252] font-semibold transition-colors"
            >
              {isAutoPlaying ? "⏸ Pause auto-play" : "▶ Resume auto-play"}
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToSlide(index)}
              className={`p-3 rounded-xl border transition-all duration-200 hover:shadow-lg
                ${
                  index === currentIndex
                    ? "border-[#b69777] bg-[#f3ece6]"
                    : "border-[#ede1d3] hover:border-[#b69777]"
                }`}
              aria-label={`View testimonial from ${testimonial.name}`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${
                      index === currentIndex
                        ? "bg-gradient-to-tr from-[#b69777] to-[#907252] text-white"
                        : "bg-[#f8f6f3] text-[#b89773]"
                    }`}
                >
                  {testimonial.image}
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-medium text-[#231c14]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[#b89773] font-semibold">{testimonial.role}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[#b9a382] mb-6">
            Trusted by leading design professionals
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            {[
              "Mitchell Design Studio",
              "Rodriguez & Associates",
              "Thompson Construction",
              "Luxury Homes",
            ].map((company, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-[#f8f6f3] rounded-xl text-[15px] font-semibold text-[#b89773] border border-[#ede1d3]"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInSlow {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-fadeInSlow {
          animation: fadeInSlow 1.2s cubic-bezier(.25,.8,.44,1) both;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;
