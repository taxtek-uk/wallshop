import React from "react";
import { Tv, Music, Flame, Lightbulb, Sofa, Speaker } from "lucide-react";

const useCases = [
  {
    title: "Luxury Living Rooms",
    icon: Sofa,
    description:
      "Elevate your lounge with a Smart Wall that integrates your TV, speakers, electric fire, and ambient lighting — all controlled via one system.",
    image: "/images/luxury-living-room.webp",
  },
  {
    title: "Home Theaters",
    icon: Tv,
    description:
      "Create the ultimate cinematic experience with immersive sound, dimmable lighting, and flush TV mounting — all built into one stylish wall.",
    image: "/images/home-cenima.webp",
  },
  {
    title: "Modern Offices",
    icon: Lightbulb,
    description:
      "Bring modern design and functionality to your workspace — with integrated displays, shelving, acoustic panels, and lighting.",
    image: "/images/projects/corporate-office-acoustic-solution.webp",
  },
];

export default function SmartWallUseCasesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-extrabold text-center text-[#231c14] mb-12 max-w-3xl mx-auto">
          Where Smart Walls Make an Impact
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {useCases.map(({ title, icon: Icon, description, image }, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center shadow">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#231c14]">{title}</h3>
                </div>
                <p className="text-[#8e7762] text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
