import React, { useState, useEffect, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
  features: string[];
  image: string;
  size: string;
  duration: string;
}

const projectImages: Record<string, string> = {
  "1": "/images/projects/modern-penthouse-smart-wall.webp",
  "2": "/images/projects/hotel-lobby-wallpaper.webp",
  "3": "/images/projects/corporate-office-acoustic-solution.webp",
  "4": "/images/carbon-rock-boards/gallery/showroom/showroom-corner-feature.jpg",
  "5": "/images/projects/home-cenima.webp",
  "6": "/images/projects/botique.webp",
};

const projects: Project[] = [
  {
    id: "1",
    title: "Modern Penthouse Smart Wall",
    category: "smart",
    location: "Manhattan, NY",
    date: "January 2024",
    description:
      'Complete smart wall transformation featuring integrated 75" OLED display, electric fireplace, and hidden audio system with copper finish.',
    features: [
      "4K OLED Display",
      "Electric Fireplace",
      "Hidden Audio",
      "Copper Finish",
    ],
    image: projectImages["1"],
    size: "12ft x 8ft",
    duration: "1 day installation",
  },
  {
    id: "2",
    title: "Luxury Hotel Lobby Wallpaper",
    category: "wallpaper",
    location: "Miami, FL",
    date: "February 2024",
    description:
      "Hand-painted silk wallpaper installation with gold metallic accents creating an opulent entrance experience.",
    features: [
      "Hand-painted Silk",
      "Gold Accents",
      "Custom Design",
      "Fire Resistant",
    ],
    image: projectImages["2"],
    size: "2,000 sq ft",
    duration: "3 days installation",
  },
  {
    id: "3",
    title: "Corporate Office Acoustic Solution",
    category: "acoustic",
    location: "San Francisco, CA",
    date: "March 2024",
    description:
      "Professional acoustic panel installation for open office environment, reducing noise levels by 60%.",
    features: [
      "NRC 0.95",
      "Custom Colors",
      "Modular Design",
      "Easy Maintenance",
    ],
    image: projectImages["3"],
    size: "5,000 sq ft",
    duration: "2 days installation",
  },
  {
    id: "4",
    title: "Carbon Rock Feature Wall",
    category: "carbon",
    location: "Chicago, IL",
    date: "April 2024",
    description:
      "Ultra-lightweight carbon rock panels creating a dramatic feature wall with industrial appeal.",
    features: [
      "Ultra-lightweight",
      "Weather Resistant",
      "Matte Finish",
      "Easy Clean",
    ],
    image: projectImages["4"],
    size: "20ft x 10ft",
    duration: "4 hours installation",
  },
  {
    id: "5",
    title: "Private Cinema Smart Wall System",
    category: "smart",
    location: "Beverly Hills, CA",
    date: "May 2024",
    description:
      "Custom home cinema with motorized screen integration, surround sound, and ambient lighting control.",
    features: [
      "Motorized Screen",
      "7.1 Surround",
      "LED Lighting",
      "Voice Control",
    ],
    image: projectImages["5"],
    size: "16ft x 12ft",
    duration: "1 day installation",
  },
  {
    id: "6",
    title: "Boutique Store Textured Wallpaper",
    category: "wallpaper",
    location: "SoHo, NY",
    date: "June 2024",
    description:
      "Three-dimensional textured wallpaper creating tactile shopping experience with luxury appeal.",
    features: [
      "3D Texture",
      "Touch Appeal",
      "Luxury Feel",
      "Durable Surface",
    ],
    image: projectImages["6"],
    size: "1,200 sq ft",
    duration: "2 days installation",
  },
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "smart", name: "Smart Walls" },
  { id: "wallpaper", name: "Wallpapers" },
  { id: "acoustic", name: "Acoustic Panels" },
  { id: "carbon", name: "Carbon Rock" },
];

const GalleryViewToggle = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-white text-neutral-900 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block   bg-clip-text text-gray-800 drop-shadow-md">
              Project Gallery
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light">
            Explore our portfolio of successful installations and transformations.
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`} style={{ transitionDelay: "0.2s" }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-md border ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-400/50 shadow-md shadow-amber-500/25 scale-105"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100 hover:scale-105 hover:text-neutral hover:border-neutral-400"
              }`}
              style={{ minWidth: 140 }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/80 text-neutral-800 text-xs font-semibold rounded-full uppercase tracking-wider">
                  {categories.find((c) => c.id === project.category)?.name}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-[#b89773] transition-colors duration-300">
                  {project.title}
                </h3>

                <div className="flex items-center text-sm text-neutral-500 gap-4 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </span>
                </div>

                <p className="text-neutral-600 text-sm mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="bg-neutral-100 text-neutral-700 text-xs px-3 py-1 rounded-full font-medium border border-neutral-200"
                    >
                      {feature}
                    </span>
                  ))}
                  {project.features.length > 3 && (
                    <span className="bg-neutral-200 text-neutral-700 text-xs px-3 py-1 rounded-full font-medium border border-neutral-300">
                      +{project.features.length - 3} more
                    </span>
                  )}
                </div>

                <div className="text-xs text-neutral-500 mt-auto">
                  {project.size} &nbsp; • &nbsp; {project.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryViewToggle;
