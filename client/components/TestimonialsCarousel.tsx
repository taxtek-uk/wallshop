import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
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
    <section
      ref={sectionRef}
      className="relative py-24 bg-white text-gray-800 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Trusted by interior designers, architects, and homeowners for premium wall solutions.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="relative bg-gray-50 border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="absolute top-8 right-8 text-yellow-400/30 pointer-events-none z-0">
              <Quote className="w-16 h-16" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl text-center font-medium leading-relaxed mb-8">
                "{currentTestimonial.content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">
                  {currentTestimonial.image}
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                  <p className="font-semibold text-yellow-500">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-sm text-gray-500">{currentTestimonial.company}</p>
                </div>
              </div>
              <div className="text-center mt-6">
                <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {currentTestimonial.project}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-8 mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 bg-gray-100 border border-gray-300 hover:bg-yellow-400 hover:border-yellow-300 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow group"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-yellow-400 scale-125 shadow"
                      : "bg-gray-300 hover:bg-yellow-300 hover:scale-110"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-gray-100 border border-gray-300 hover:bg-yellow-400 hover:border-yellow-300 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow group"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-yellow-600 hover:text-yellow-500 font-semibold transition-colors duration-300"
            >
              {isAutoPlaying ? "⏸ Pause auto-play" : "▶ Resume auto-play"}
            </button>
          </div>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-4 mt-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToSlide(index)}
              className={`p-3 rounded-2xl border transition-all duration-300 hover:scale-105 backdrop-blur-md ${
                index === currentIndex
                  ? "border-yellow-300 bg-yellow-100 shadow"
                  : "border-gray-200 bg-white hover:border-yellow-200 hover:bg-yellow-50"
              }`}
              aria-label={`View testimonial from ${testimonial.name}`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {testimonial.image}
                </div>
                <div className="text-left">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      index === currentIndex ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className={`text-xs font-semibold transition-colors duration-300 ${
                      index === currentIndex ? "text-yellow-600" : "text-gray-500"
                    }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <p className="text-sm text-gray-500 mb-6">
            Trusted by leading design professionals
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {["Mitchell Design Studio", "Rodriguez & Associates", "Thompson Construction", "Luxury Homes"].map(
              (company, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-yellow-50 hover:border-yellow-200 transition-all duration-300"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;