import { useState } from "react";
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
  "1": "/images/projects/modern-penthouse-smart-wall.webp",     // Modern Penthouse Smart Wall
  "2": "/images/projects/hotel-lobby-wallpaper.webp",            // Luxury Hotel Lobby Wallpaper
  "3": "/images/projects/corporate-office-acoustic-solution.webp", // Corporate Office Acoustic Solution
  "4": "/images/projects/carbon-rock-restaurant.webp",           // Restaurant Carbon Rock Feature Wall
  "5": "/images/projects/home-cenima.webp",                      // Private Cinema Smart Wall System
  "6": "/images/projects/botique.webp",                          // Boutique Store Textured Wallpaper
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
    title: "Restaurant Carbon Rock Feature Wall",
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

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Project Gallery
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Explore our portfolio of successful installations and transformations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-200 shadow-sm 
                ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              style={{ minWidth: 120 }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-neutral-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col group overflow-hidden"
            >
              {/* Image */}
              <div className="h-60 w-full bg-neutral-100 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-white/80 text-xs font-bold rounded px-3 py-1 uppercase tracking-widest text-neutral-800 shadow">
                  {categories.find((c) => c.id === project.category)?.name}
                </span>
              </div>
              {/* Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-neutral-900 mb-1">
                  {project.title}
                </h3>
                <div className="flex items-center text-sm text-neutral-500 gap-4 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </span>
                </div>
                <p className="text-neutral-700 text-sm mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="bg-black/10 text-black text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                  {project.features.length > 3 && (
                    <span className="bg-neutral-200 text-neutral-600 text-xs px-2 py-1 rounded-full font-medium">
                      +{project.features.length - 3} more
                    </span>
                  )}
                </div>
                <div className="text-xs text-neutral-400 mt-auto">
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